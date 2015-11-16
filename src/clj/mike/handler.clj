(ns mike.handler
  (:require [compojure.core :refer [routing defroutes routes GET POST DELETE PUT]]
            [ring.middleware.json :refer [wrap-json-body]]
            [cemerick.friend :as friend]
            [cemerick.friend.credentials :as creds]
            [cemerick.friend.workflows :as workflows] 
            [ring.util.response :as resp]
            [hiccup.middleware :refer [wrap-base-url]]
            [hiccup.page :as h]
            [hiccup.element :as e]
            [compojure.handler :as handler]
            [compojure.route :as cr]
            [mike.entity.api :as api]
            [mike.entity.jdbc :as jj]
            [mike.entity.http]
            [mike.layout :as l]
            [mike.auth :as auth]
            [mike.config :as c]
            [clj-http.client :as http] 
            [clojure.walk :refer [prewalk]] 
            [clojure.data.json :as json]
            [clojure.string :refer [blank?]]
            [clojure.core.async :refer [<!!]]
            [clojure.pprint :refer [pprint]])
  (:import [java.text SimpleDateFormat]
           [mike.entity.jdbc JdbcEntityRepo]
           [mike.entity.http HttpEntityRepo]
           [java.net URI]
           [java.io StringWriter]
           [java.sql Timestamp]))

(defn resolve-uri
  [context uri]
  (let [context (if (instance? URI context) context (URI. context))]
    (.resolve context uri)))

(defn context-uri
  "Resolves a [uri] against the :context URI (if found) in the provided
   Ring request.  (Only useful in conjunction with compojure.core/context.)"
  [{:keys [context]} uri]
  (if-let [base (and context (str context "/"))]
    (str (resolve-uri base uri))
    uri))

(defn sprint [m] 
  (let [w (StringWriter.)]
    (pprint m w)
    (.toString w)))

(defn date-to-string
  [date]
  (.format (SimpleDateFormat. "MM/dd/yyyy HH:mm:ss") date))

(defn convert-if-date
  [x]
  (if (instance? java.sql.Timestamp x) (date-to-string x) x))

(defn parse-int [s] (Integer/parseInt s))

(def config (c/load "prod"))
(def api-url (:api-url config))
(def auth-db (:auth-database config))
(def db (:entity-database config))

(defn resource-view
  [a]
  (let [{:keys [status message body]} a]
  (h/html5
   [:head
    [:meta {:charset "utf-8"}]
    [:meta {:name "viewport" :content "initial-scale=1.0,width=device-width"}]
    [:title "Resource"]]
   [:body
    [:h3 "status: " status]
    [:h3 "message: "]
    [:pre message]
    [:h3 "body:"]
    [:pre (sprint body)]])))

(defn to-response
  [response accept]
  (let [result (<!! response)]
    (when (:exception result))    
    (let [content-type (case accept :json "application/json" "text/html")
          body (case accept
                 :json (json/write-str (prewalk convert-if-date (dissoc result :exception)))
                 (resource-view result))] 
    {:status 200
     :headers {"content-type" content-type}
     :body body})))

(defn repo [db user] (JdbcEntityRepo. db user))

(defroutes api-routes
  (POST "/api/type"
        {body :body user :user accept :accept}
        (to-response (api/create-type! (repo db user) (assoc body :user user)) accept))

  (DELETE "/api/type/:type-id"
          {{type-id :type-id} :params user :user accept :accept}
          (to-response (api/delete-type! (repo db user) type-id) accept))

  (GET "/api/type/:type-id"
       {{type-id :type-id} :params user :user accept :accept}
       (to-response (api/get-type (repo db user) type-id) accept))

  (GET "/api/types"
       {user :user accept :accept}
       (to-response (api/get-types (repo db user)) accept))

  (GET "/api/type/:type-id/entity-count"
       {{type-id :type-id} :params user :user accept :accept}
       (to-response (api/count-entities (repo db user) type-id) accept))

  (GET "/api/type/:type-id/entity/:entity-id"
       {{:keys [type-id entity-id]} :params user :user accept :accept}
       (to-response (api/get-entity (repo db user) type-id (parse-int entity-id)) accept)) 

  (GET "/api/type/:type-id/entity" 
       {{:keys [type-id tag]} :params user :user accept :accept}
       (to-response
        (if (nil? tag)
          (api/get-random-entity (repo db user) type-id)
          (api/get-random-entity-with-tag (repo db user) type-id tag)) accept))
  
  (DELETE "/api/type/:type-id/entity/:entity-id"
          {{:keys [type-id entity-id]} :params user :user accept :accept}
          (to-response (api/delete-entity! (repo db user) type-id (parse-int entity-id)) accept))

  (POST "/api/type/:type-id/entity"
        {{type-id :type-id} :params body :body user :user accept :accept}
        (to-response (api/add-entity! (repo db user) type-id body) accept))
  
  (GET "/api/type/:type-id/entities"
       {{:keys [type-id n start end tag]} :params user :user accept :accept}
       (let [type-id (keyword type-id)] 
         (to-response
          (if n
            (if tag
              (api/get-random-entities-with-tag (repo db user) type-id tag (parse-int n))
              (api/get-random-entities (repo db user) type-id (parse-int n))) 
            (if (and start end)
              (api/get-entity-range (repo db user) type-id (parse-int start) (parse-int end))
              (if tag
                {:status :bad-request :message "BAD COMBINATION"}))) accept)))

  ;; LESSONS
  (GET "/api/type/:type-id/lesson/:lesson-id"
       {{:keys [type-id lesson-id]} :params user :user accept :accept}
       (Thread/sleep 2000)
       (to-response (api/get-lesson (repo db user) type-id (parse-int lesson-id)) accept))

  (GET "/api/type/:type-id/lesson/:lesson-id/info"
       {{:keys [type-id lesson-id]} :params user :user accept :accept}
       (to-response (api/get-lesson-info (repo db user) type-id lesson-id) accept))

  (GET "/api/type/:type-id/lesson/:lesson-id/entities"
       {{:keys [type-id lesson-id]} :params user :user accept :accept}
       (to-response (api/get-lesson-entities (repo db user) type-id lesson-id) accept))

  (GET "/api/type/:type-id/lessons"
       {{:keys [type-id]} :params user :user accept :accept}
       (to-response (api/get-lessons (repo db user) type-id) accept))
    
  (POST "/api/type/:type-id/lesson"
        {body :body {type-id :type-id} :params user :user accept :accept}
        (to-response (api/create-lesson! (repo db user) type-id body) accept))

  (DELETE "/api/type/:type-id/lesson/:lesson-id"
       {{:keys [type-id lesson-id]} :params user :user accept :accept}
       (to-response
        (api/delete-lesson! (repo db user) type-id (parse-int lesson-id)) accept))

  (PUT "/api/type/:type-id/lesson/:lesson-id/entity/:entity-id"
       {{:keys [type-id lesson-id entity-id]} :params user :user accept :accept}
       (to-response (api/add-to-lesson! (repo db user) type-id (parse-int lesson-id) (parse-int entity-id)) accept))

  (DELETE "/api/type/:type-id/lesson/:lesson-id/entity/:entity-id"
          {{:keys [type-id lesson-id entity-id]} :params user :user accept :accept}
          (to-response (api/remove-from-lesson! (repo db user) type-id (parse-int lesson-id) (parse-int entity-id)) accept))

  ;; SESSIONS
  (POST "/api/type/:type-id/session"
        {{:keys [type-id]} :params {lesson-id :lesson-id} :body user :user accept :accept}
        (to-response (api/create-session! (repo db user) type-id lesson-id) accept))

  (PUT "/api/type/:type-id/session/:session-id"
       {{:keys [type-id session-id] :as params} :params {entity-id :entity-id correct :correct :as body} :body user :user accept :accept headers :headers}
       (to-response (api/record-answer! (repo db user) type-id session-id entity-id correct) accept))

  (GET "/api/type/:type-id/session/:session-id"
       {{:keys [type-id session-id]} :params user :user accept :accept}
       (to-response (api/get-session (repo db user) type-id (parse-int session-id)) accept))

  (GET "/api/type/:type-id/sessions"
       {{:keys [type-id user-id]} :params user :user accept :accept}
       (to-response
        (if user-id
          (api/get-sessions-for-user (repo db user) type-id user-id)
          (api/get-sessions (repo db user) type-id))
        accept))

  ;; STATS
  (GET "/api/type/:type-id/entity/:entity-id/stats/:other-user"
       {{:keys [type-id entity-id other-user]} :params user :user accept :accept}
       (to-response
        (api/get-stats-for-user (repo db user) type-id entity-id other-user)
        accept))

  ;; TODO: think about this
  (cr/not-found {:status 200
                 :headers {"Content-Type" "application/json"}
                 :body (json/write-str {:message "NOT FOUND"})}))

(defn flash-redirect
  [request message]
  (assoc (resp/redirect (str (:context request) "/")) :flash message))

(defroutes site-routes
  (cr/resources "/")
  
  (GET "/" req
       (friend/authenticated
        (l/dashboard (:username (friend/current-authentication)))))
  
  (GET "/lessons" request
       (friend/authenticated
        (l/spatula "Lessons" "lesson" api-url (:username (friend/current-authentication)))))

  (GET "/types" request
       (friend/authenticated
        (l/spatula "Types" "type" api-url (:username (friend/current-authentication)))))
  
  (GET "/login" req
       (l/login))
  
  (GET "/signup" req
       (l/signup))
  
  (POST "/signup" {{:keys [username password confirm admin] :as params} :params :as req}
        (cond
          (blank? username) (flash-redirect req "Username is required!")
          (blank? password) (flash-redirect req "Password is required!")
          (not= password confirm) (flash-redirect req "Passwords don't match!")
          :else (let [{:keys [status body]} (auth/create-user! auth-db username password admin)]
                  (if (= status :ok)
                    (friend/merge-authentication (resp/redirect (context-uri req username)) body)
                    (flash-redirect req body)))))
  (GET "/logout" req
       (friend/logout* (resp/redirect "/login")))
  (GET "/requires-authentication" req
       (friend/authenticated "Thanks for authenticating!"))
  (GET "/role-user" {username :username :as req}
       (friend/authorize
        #{::auth/user} 
        (h/html5
         [:head]
         [:body
          [:h2 "Hello, " username "!"]])))
  (GET "/role-admin" req
       (friend/authorize #{::auth/admin} "You're an admin!"))
  (GET "/:user" {session :session :as req}
       (friend/authenticated
        (let [user (:user (req :params))]
          (if (= user (:username (friend/current-authentication)))
            (h/html5
             [:head]
             [:body
              [:h2 (str "Hello, new user " user "!")]
              [:p "Return to the " (e/link-to (context-uri req "/") "example") 
               ", or " (e/link-to (context-uri req "logout") "log out") "."]])
            (resp/redirect (str (:context req) "/"))))))

  (cr/not-found "404"))

(def site-handler
  (handler/site
   (friend/authenticate
    site-routes
    {:allow-anon? true
     :login-uri "/login"
     :default-landing-uri "/"
     :unauthorized-handler #(-> (h/html5 [:h2 "You do not have sufficient privileges to access " (:uri %)])
                                resp/response
                                (resp/status 401))
     :credential-fn #(creds/bcrypt-credential-fn (partial auth/get-user auth-db) %)
     :workflows [(workflows/interactive-form)]})))

(def handle-site (fn [request]
                   (site-handler request)))


(defn wrap-api
  [handler]
  (fn [{headers :headers :as request}]
    (let [accept-header (get headers "accept")
          json? (= accept-header "application/json")
          accept (if json? :json nil)
          user (get headers "lang-user")]
      (println "API:" user)
      (handler (assoc request :accept accept :user user)))))

(def api-handler
  (wrap-api
   (wrap-json-body
    (handler/api api-routes)
    {:keywords? true})))

(defn app
  [{:keys [headers request-method accept uri method] :as request}]
  ;; todo: real logging
  (println "Request:" request-method uri accept)
  (if (.startsWith uri "/api")
    (api-handler request)
    (handle-site request)))

(def init #(println "mike is starting"))
(def destroy #(println "mike is shutting down"))
