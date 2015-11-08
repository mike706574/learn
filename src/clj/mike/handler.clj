(ns mike.handler
  (:require [compojure.core :refer [routing defroutes routes GET POST DELETE PUT]]
            [ring.middleware.json :refer [wrap-json-body]]
            [ring.middleware.params :refer [wrap-params]]
            [ring.middleware.cookies :refer [wrap-cookies]]
            [ring.middleware.defaults :refer [wrap-defaults]]
            [cemerick.friend :as friend]
            [cemerick.friend.credentials :as creds]
            [cemerick.friend.workflows :as workflows] 
            [ring.util.response :refer [redirect] :as resp]
            [hiccup.middleware :refer [wrap-base-url]]
            [hiccup.page :as h]
            [hiccup.element :as e]
            [hiccup.form :refer [radio-button text-field label email-field password-field check-box form-to submit-button]]
            [compojure.handler :as handler]
            [compojure.route :as cr]
            [mike.entity.api :as api]
            [mike.entity.jdbc :as what]
            [mike.entity.http :as lol]
            [mike.http :as pete]
            [mike.auth :as auth]
            [clj-http.client :as http] 
            [clojure.walk :refer [prewalk]] 
            [clojure.data.json :as json]
            [clojure.java.io :as io]
            [clojure.edn :as edn]
            [clojure.string :refer [blank?]]
            [clojure.core.async :refer [<!!]]
            [clojure.pprint :refer [pprint]]
            [mike.component :as component])
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

(defn- signup-form
  [flash]
  [:div {:class "row"}
   [:div {:class "columns small-12"}
    [:h3 "Sign up "
     [:small "(Any user/pass combination will do, as you are creating a new account or profile.)"]]
    [:div {:class "row"}
     [:form {:method "POST" :action "signup" :class "columns small-4"}
      [:div "Username" [:input {:type "text" :name "username" :required "required"}]]
      [:div "Password" [:input {:type "password" :name "password" :required "required"}]]
      [:div "Confirm" [:input {:type "password" :name "confirm" :required "required"}]]
      [:div "Make you an admin? " [:input {:type "checkbox" :name "admin"}]]
      [:div
       [:input {:type "submit" :class "button" :value "Sign up"}]
       [:span {:style "padding:0 0 0 10px;color:red;"} flash]]]]]])

(def login-form
  [:div {:class "row"}
   [:div {:class "columns small-12"}
    [:h3 "Login"]
    [:div {:class "row"}
     [:form {:method "POST" :action "login" :class "columns small-4"}
      [:div "Username" [:input {:type "text" :name "username"}]]
      [:div "Password" [:input {:type "password" :name "password"}]]
      [:div [:input {:type "submit" :class "button" :value "Login"}]]]]]])

(defn sprint [m] 
  (let [w (StringWriter.)]
    (pprint m w)
    (.toString w)))

(def en-it-type
  {:id :en-it
   :label "English/Italian"
   :description "Bilingual sentence pairs: English and Italian"
   :attributes [{:id "english"
                 :label "English"
                 :schema :str
                 :description "The sentence in English"}
                {:id "italian"
                 :label "Italian"
                 :schema :str
                 :description "The sentence in Italian"}]})

(def en-sp-type
  {:id :en-sp
   :label "English/Spanish"
   :description "Bilingual sentence pairs: English and Spanish"
   :attributes [{:id "english"
                 :label "English"
                 :schema :str
                 :description "The sentence in English"}
                {:id "spanish"
                 :label "Spanish"
                 :schema :str
                 :description "The sentence in Spanish"}]})

;;(def jello (HttpEntityRepo. "http://localhost:8080/repo/"))

;; (def not-found-page
;;   (html5
;;    [:head
;;     [:meta {:charset "utf-8"}]
;;     [:meta {:name "viewport" :content "initial-scale=1.0,width=device-width"}]
;;     (include-css "css/mike.css")
;;     [:title "not found"]]
;;    [:body
;;     [:p "insert 404 page here"]]))

(defn date-to-string
  [date]
  (.format (SimpleDateFormat. "MM/dd/yyyy HH:mm:ss") date))

(defn convert-if-date
  [x]
  (if (instance? java.sql.Timestamp x) (date-to-string x) x))

(defn parse-int [s] (Integer/parseInt s))

(def config-file (io/file (io/resource "test_config.edn")))

(def config (edn/read-string (slurp config-file)))

(def test-config {:entity-database {:subprotocol "mysql"
                                    :subname "//localhost:3306/entity_dev"
                                    :user "entity"
                                    :password "entity"}
                  :auth-database {:subprotocol "mysql"
                                  :subname "//localhost:3306/auth_dev"
                                  :user "auth"
                                  :password "auth"}})

(def auth-db (:auth-database test-config))

(def db (:entity-database test-config))

(defn page
  [title filename app]
  (h/html5
   [:head
    [:meta {:charset "utf-8"}]
    [:meta {:http-equiv "X-UA-Compatible", :content "IE=edge"}]
    [:meta
     {:name "viewport", :content "width=device-width, initial-scale=1"}]
    [:meta {:name "description", :content ""}]
    [:meta {:name "author", :content ""}]
    [:title title]
    [:link {:href "css/bootstrap.min.css", :rel "stylesheet"}]
    [:link {:href "css/sb-admin.css", :rel "stylesheet"}]
    [:link {:href "font-awesome/css/font-awesome.min.css",:rel "stylesheet",:type "text/css"}]]
   [:body
    [:div#app]
    [:script {:type "text/javascript" :src (str "/js/" filename "/goog/base.js")}]
    [:script {:type "text/javascript" :src (str "/js/" filename ".js")}]
    [:script {:type "text/javascript"} (str "goog.require(\"" app  ".core\");")]
    [:script {:type "text/javascript"} (str app ".core.start();")]
    [:script {:type "text/javascript" :src "js/jquery.js"}]
    [:script {:type "text/javascript" :src "js/bootstrap.min.js"}]]))

(defn head
  [title]
  [:head
   [:meta {:charset "utf-8"}]
   [:meta {:name "viewport" :content "initial-scale=1.0,width=device-width"}]
   (h/include-css "css/mike.css")
   [:link {:type "text/css", :href "/css/mike.css", :rel "stylesheet"}]
   [:title title]]) 

(defn resource-view
  [a]
  (let [{:keys [status message body]} a]
  (h/html5
   (head "resource")
   [:body
    component/nav
    [:h3 "status: " status]
    [:h3 "message: "]
    [:pre message]
    [:h3 "body:"]
    [:pre (sprint body)]])))

(defn to-response
  [response accept]
  (let [result (<!! response)]
    (when (:exception result)
      (println "EXCEPTION: "(:exception result)))    
    (let [content-type (case accept :json "application/json" "text/html")
          body (case accept
                 :json (json/write-str (prewalk convert-if-date (dissoc result :exception)))
                 (resource-view result))] 
    {:status 200
     :headers {"content-type" content-type}
     :body body})))

(defn repo [db user] (JdbcEntityRepo. db user))

;; TODO: this sucks
;; (defroutes site-routes
;;   (GET "/" []
;;        (println "OK")
;;        (file-response "index.html" {:root "pages"}))
;;   (GET "/lesson" []
;;        (println "WRAP ACCEPT: " (java.util.Date.))
;;        (page "Lesson" "lesson" "mike.lesson"))

;;   (cr/not-found "404"))

;; TODO: validate things
(defroutes api-routes
  (POST "/api/type"
        {body :body user :user accept :accept}
        (println "BODY:" body)
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
                (println "TODO: get entity range for tag")
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
        (println "BODY:" body)
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
    (h/html5
     [:head]
     [:body
      [:h2 "Sign up and authenticated redirect"]
      [:p "This app demonstrates form-based sign-up and redirect to an authenticated space."]
      [:h3 "Current Status " [:small "(this will change when you log in/out)"]]
      [:p (if-let [identity (friend/identity req)]
            (apply str "Logged in, with these roles: "
               (-> identity friend/current-authentication :roles pr-str))
            "anonymous user")]
      (signup-form (:flash req))
      [:h3 "Authorization demos"]
      [:p "Each of these links require particular roles (or, any authentication) to access. "
       "If you're not authenticated, you will be redirected to a dedicated login page. "
       "If you're already authenticated, but do not meet the authorization requirements "
       "(e.g. you don't have the proper role), then you'll get an Unauthorized HTTP response."]
      [:ul [:li (e/link-to (context-uri req "role-user") "Requires the `user` role")]
       [:li (e/link-to (context-uri req "role-admin") "Requires the `admin` role")]
       [:li (e/link-to (context-uri req "requires-authentication")
                       "Requires any authentication, no specific role requirement")]]
      [:h3 "Logging out"]
      [:p (e/link-to (context-uri req "logout") "Click here to log out") "."]]))
  (GET "/lesson" request
       (resp/file-response "resources/public/lesson.html"))
  (GET "/login" req
       (resp/file-response "resources/public/login.html"))
  
  (POST "/signup" {{:keys [username password confirm admin] :as params} :params :as req}
        (println "USERNAME" username)
        (cond
          (blank? username) (flash-redirect req "Username is required!")
          (blank? password) (flash-redirect req "Password is required!")
          (not= password confirm) (flash-redirect req "Passwords don't match!")
          :else (let [{:keys [status body]} (auth/create-user! auth-db username password admin)]
                  (println "BODY: " body)
                  (if (= status :ok)
                    (friend/merge-authentication
                     (resp/redirect (context-uri req username))
                     body)
                    (flash-redirect req body)))))
  (GET "/logout" req
       (friend/logout* (resp/redirect (str (:context req) "/")) ))
  (GET "/requires-authentication" req
       (friend/authenticated "Thanks for authenticating!"))
  (GET "/role-user" {username :username :as req}
       (println "WHOA"        #{::auth/user})
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

(defn wrap-user
  [handler]
  (fn [request]
    (let [{:keys [current authentications]} (get-in request [:session :cemerick.friend/identity])
          authentication (get authentications current)
          username (:username authentication)]
      (handler (assoc request :username username)))))

(def user-routes
  (wrap-user site-routes))

(def site-handler
  (handler/site
   (friend/authenticate
    user-routes
    {:allow-anon? true
     :login-uri "/login"
     :default-landing-uri "/"
     :unauthorized-handler #(-> (h/html5 [:h2 "You do not have sufficient privileges to access " (:uri %)])
                                resp/response
                                (resp/status 401))
     :credential-fn #(creds/bcrypt-credential-fn (partial auth/get-user auth-db) %)
     :workflows [(workflows/interactive-form)]})))

(defn wrap-accept
  [handler]
  (println "WRAP ACCEPT: " (java.util.Date.))
  (fn [{headers :headers :as request}]
    (let [accept-header (get headers "accept")
          json? (= accept-header "application/json")
          accept (if json? :json :what)]
      (handler (assoc request :accept accept)))))

(def api-handler
  (wrap-accept 
   (wrap-json-body
    (handler/api api-routes)
    {:keywords? true})))

(defn app
  [{:keys [headers request-method accept uri method] :as request}]
  ;; TODO: real logging
  (println "***"  request-method uri accept)
  (if (.startsWith uri "/api")
    (api-handler request)
    (site-handler request)))

(def init #(println "mike is starting"))
(def destroy #(println "mike is shutting down"))
