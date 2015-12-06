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
            [mike.misc :as m]
            [mike.jaguar :as j]
            [mike.entity.api :as api]
            [mike.entity.jdbc]
            [mike.entity.http]
            [mike.layout :as l]
            [mike.auth :as auth]
            [mike.config :as c]
            [clojure.data.json :as json]
            [clojure.string :refer [blank?]]
            [clojure.core.async :refer [<!!]]
            [clojure.pprint :refer [pprint]])
  (:import [mike.entity.jdbc JdbcEntityRepo]
           [mike.entity.http HttpEntityRepo]))

(def environment "dev")
(def config (c/load environment))
(def api-url (:api-url config))
(def auth-db (:auth-database config))
(def entity-db (:entity-database config))

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
    [:pre (j/spprint body)]])))

(defn to-response
  [response request]
  (let [result (<!! response)]
    (when (:exception result)
      (println "*** A WILD ERROR APPEARS ***\n")
      (println "- EXCEPTION -")
      (pprint (:exception result))
      (println "\n- REQUEST -\n")
      (pprint request)
      (println "\n\n\n"))
    (let [accept (:accept request)
          content-type (case accept :json "application/json" "text/html")
          body (case accept
                 :json (json/write-str (j/coerce-tree result))
                 (resource-view (dissoc result :exception)))]
    {:status 200
     :headers {"content-type" content-type}
     :body body})))

(defn ok? [status] (= (keyword status) :ok))

(def cake (JdbcEntityRepo. entity-db "mike"))

(def username #(:username (friend/current-authentication)))
(def repo #(JdbcEntityRepo. entity-db (username)))
(defn type []
  (when-let [type-id (auth/get-current-type auth-db (username))]
    
    (let [{:keys [status body exception] :as result} (<!! (api/get-type (repo) type-id))]
      (case status
        :ok body
        :missing (do (println "Type" type-id "was probably deleted...?")
                     (auth/set-current-type! auth-db (username) nil)
                     nil)
        (throw (ex-info "Error fetching user type!" result))))))

(defroutes api-routes  
  (POST "/api/type"
        {body :body :as request}
        (to-response
         (api/create-type! (repo) (assoc body :user (username))) request))

  (DELETE "/api/type/:type-id"
          {{type-id :type-id} :params :as request}
          (to-response (api/delete-type! (repo) type-id) request))

  (GET "/api/type/:type-id"
       {{type-id :type-id} :params :as request}
       (to-response (api/get-type (repo) type-id) request))

  (GET "/api/types"
       {user :user :as request}
       (to-response (api/get-types (repo)) request))

  (GET "/api/type/:type-id/entity-count"
       {{type-id :type-id} :params :as request}
       (to-response (api/count-entities (repo) type-id) request))

  (GET "/api/type/:type-id/entity/:entity-id"
       {{:keys [type-id entity-id]} :params :as request}
       (to-response (api/get-entity (repo) type-id (m/parse-int entity-id)) request))

  (GET "/api/type/:type-id/entity" 
       {{:keys [type-id tag]} :params :as request}
       (to-response
        (if (nil? tag)
          (api/get-random-entity (repo) type-id)
          (api/get-random-entity-with-tag (repo) type-id tag)) request))
  
  (DELETE "/api/type/:type-id/entity/:entity-id"
          {{:keys [type-id entity-id]} :params :as request}
          (to-response (api/delete-entity! (repo) type-id (m/parse-int entity-id)) request))

  (POST "/api/type/:type-id/entity"
        {{type-id :type-id} :params body :body :as request}
        (to-response (api/add-entity! (repo) type-id body) request))
  
  (GET "/api/type/:type-id/entities"
       {{:keys [type-id n start end tag]} :params :as request}
       (let [type-id (keyword type-id)] 
         (to-response
          (if n
            (if tag
              (api/get-random-entities-with-tag (repo) type-id tag (m/parse-int n))
              (api/get-random-entities (repo) type-id (m/parse-int n))) 
            (if (and start end)
              (api/get-entity-range (repo) type-id (m/parse-int start) (m/parse-int end))
              (if tag
                {:status :bad-request :body "Invalid paremeters given."}))) request)))

  ;; LESSONS
  (GET "/api/type/:type-id/lesson/:lesson-id"
       {{:keys [type-id lesson-id]} :params :as request}
       (Thread/sleep 2000)
       (to-response (api/get-lesson (repo) type-id (m/parse-int lesson-id)) request))

  (GET "/api/type/:type-id/lesson/:lesson-id/info"
       {{:keys [type-id lesson-id]} :params :as request}
       (to-response (api/get-lesson-info (repo) type-id lesson-id) request))

  (GET "/api/type/:type-id/lesson/:lesson-id/entities"
       {{:keys [type-id lesson-id]} :params :as request}
       (to-response (api/get-lesson-entities (repo) type-id lesson-id) request))

  (GET "/api/type/:type-id/lessons"
       {{:keys [type-id]} :params :as request}
       (to-response (api/get-lessons (repo) type-id) request))
    
  (POST "/api/type/:type-id/lesson"
        {body :body {type-id :type-id} :params :as request}
        (to-response (api/create-lesson! (repo) type-id body) request))

  (DELETE "/api/type/:type-id/lesson/:lesson-id"
       {{:keys [type-id lesson-id]} :params :as request}
       (to-response
        (api/delete-lesson! (repo) type-id (m/parse-int lesson-id)) request))

  (PUT "/api/type/:type-id/lesson/:lesson-id/entity/:entity-id"
       {{:keys [type-id lesson-id entity-id]} :params :as request}
       (to-response (api/add-to-lesson! (repo) type-id (m/parse-int lesson-id) (m/parse-int entity-id)) request))

  (DELETE "/api/type/:type-id/lesson/:lesson-id/entity/:entity-id"
          {{:keys [type-id lesson-id entity-id]} :params :as request}
          (to-response (api/remove-from-lesson! (repo) type-id (m/parse-int lesson-id) (m/parse-int entity-id)) request))

  ;; SESSIONS
  (POST "/api/type/:type-id/session"
        {{:keys [type-id]} :params {lesson-id :lesson-id} :body :as request}
        (to-response (api/create-session! (repo) type-id lesson-id) request))

  (PUT "/api/type/:type-id/session/:session-id"
       {{:keys [type-id session-id] :as params} :params {start :start entity-id :entity-id correct :correct :as body} :body :as request} 
       ;;why
       (to-response (api/record-answer! (repo) type-id session-id entity-id start correct) request))

  (GET "/api/type/:type-id/session/:session-id"
       {{:keys [type-id session-id]} :params :as request}
       (to-response (api/get-session (repo) type-id (m/parse-int session-id)) request))

  (GET "/api/type/:type-id/sessions"
       {{:keys [type-id done] :as params} :params :as request}
       (to-response
        (api/get-sessions-for-user (repo) type-id params)
        request))

  ;; STATS
  (GET "/api/type/:type-id/entity/:entity-id/stats/:other-user"
       {{:keys [type-id entity-id other-user]} :params :as request}
       (to-response
        (api/get-stats-for-user (repo) type-id entity-id other-user)
        request))

  ;; TODO: think about this
  (cr/not-found {:status 200
                 :headers {"Content-Type" "application/json"}
                 :body (json/write-str {:message "NOT FOUND"})}))

(defn flash-redirect
  [path message]
  (assoc (resp/redirect path) :flash {:message message}))

(defn type-page
  [title namespace]
  (if-let [type (type)]
    (l/spatula title namespace api-url (username) type)
    (resp/redirect "/types")))
    
(defroutes site-routes
  (cr/resources "/")
  
  (GET "/" request
       (friend/authenticated
        (l/dashboard (username) (type))))
  
  (POST "/current-type" {{type-id :type-id} :params}
        (friend/authenticated
         (auth/set-current-type! auth-db (username) type-id)
         (resp/redirect "/")))
    
  (GET "/types" request
       (friend/authenticated
        (let [username (username)]
          (l/spatula "Types" "type" api-url username (type)))))
  
  (GET "/lessons" request
       (friend/authenticated
        (type-page "Lessons" "lesson")))

  (GET "/flash" request
       (friend/authenticated
        (type-page "Flashcards" "flash")))

  (GET "/alligator" request
       (friend/authenticated
        (type-page "Alligator" "alligator")))

  (GET "/login" {params :query-params}
       (let [username (get params "username")
             failed? (= (get params "login_failed") "Y")
             taken? (when failed? (auth/taken? auth-db username))]
         (l/login username failed? taken?)))
  
  (GET "/signup" {errors :flash params :query-params}
       (l/signup errors))
  
  (POST "/signup" {{:keys [username password confirm admin] :as params} :params :as req}
        (let [errors (m/filterm val {:username (cond (blank? username) :missing
                                                     (auth/taken? auth-db username) :taken)
                                     :password (cond (blank? password) :missing
                                                     (not= password confirm) :mismatch)})]
          (if (empty? errors)
            (let [{:keys [status body]} (auth/create-user! auth-db username password admin)]
              (if (= status :ok)
                (friend/merge-authentication (resp/redirect "/") body)
                (assoc (resp/redirect "/signup") :flash body)))
            (assoc (resp/redirect "/signup") :flash errors))))

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

  (cr/not-found (l/missing)))

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

(defn wrap-api
  [handler]
  ;; TODO: ?
  (fn [{headers :headers :as request}]
    (let [accept-header (get headers "accept")
          json? (= accept-header "application/json")
          accept (if json? :json nil)
          user (get headers "lang-user")]
      (handler (assoc request :accept accept :user user)))))

(def api-handler
  (wrap-api
   (wrap-json-body
    (handler/api
     (friend/authenticate
      api-routes
      {:allow-anon? false
       ;; TODO: what?
       :unauthenticated-handler #(workflows/http-basic-deny "api" %)
       :workflows [(workflows/http-basic
                    :credential-fn #(let [{:keys [username password]} %]
                                      (when (= password "friend")
                                        {:identity username :username username}))
                    :realm "api")]}))
    {:keywords? true})))

(defn app
  [{:keys [headers request-method accept uri method] :as request}]
  ;; todo: real logging
  (if (.startsWith uri "/api")
    (api-handler request)
    (site-handler request)))

(def init #(println "mike is starting"))
(def destroy #(println "mike is shutting down"))
