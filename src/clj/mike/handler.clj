(ns mike.handler
  (:require [compojure.core :refer [routing defroutes routes GET POST DELETE PUT]]
            [ring.middleware.json :refer [wrap-json-body]]
            [ring.middleware.params :refer [wrap-params]]
            [ring.middleware.cookies :refer [wrap-cookies]]
            [ring.middleware.defaults :refer [wrap-defaults]]
            [ring.util.response :refer [redirect]]
            [hiccup.middleware :refer [wrap-base-url]]
            [hiccup.page :refer [html5 include-css]]
            [hiccup.element :refer [link-to]]
            [hiccup.form :refer [radio-button text-field label email-field password-field check-box form-to submit-button]]
            [compojure.handler :as handler]
            [compojure.route :as route]
            [mike.entity.api :as api]
            [mike.entity.jdbc :as what]
            [mike.entity.http :as lol]
            [mike.http :as pete]
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
           [java.io StringWriter]
           [java.sql Timestamp]))

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

(def not-found-page
  (html5
   [:head
    [:meta {:charset "utf-8"}]
    [:meta {:name "viewport" :content "initial-scale=1.0,width=device-width"}]
    (include-css "css/mike.css")
    [:title "not found"]]
   [:body
    [:p "insert 404 page here"]]))

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
                                    :password "entity"}})


(def db (:entity-database test-config))

(defn page
  [title filename app]
  (html5
   [:head
    [:meta {:charset "utf-8"}]
    [:meta {:http-equiv "X-UA-Compatible", :content "IE=edge"}]
    [:meta
     {:name "viewport", :content "width=device-width, initial-scale=1"}]
    [:meta {:name "description", :content ""}]
    [:meta {:name "author", :content ""}]
    [:title title]
    "<!-- Bootstrap Core CSS -->"
    [:link {:href "css/bootstrap.min.css", :rel "stylesheet"}]
    "<!-- Custom CSS -->"
    [:link {:href "css/sb-admin.css", :rel "stylesheet"}]
    "<!-- Custom Fonts -->"
    [:link
     {:href "font-awesome/css/font-awesome.min.css",
      :rel "stylesheet",
      :type "text/css"}]
    [:script {:src "https://code.jquery.com/jquery-2.1.1.min.js"}]
    [:script {:src "https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"}]]
   [:body
    [:div#app]
    [:script {:type "text/javascript" :src (str "/js/" filename "/goog/base.js")}]
    [:script {:type "text/javascript" :src (str "/js/" filename ".js")}]
    [:script {:type "text/javascript"} (str "goog.require(\"" app  ".core\");")]
    [:script {:type "text/javascript"} (str app ".core.start();")]]))

(defn head
  [title]
  [:head
   [:meta {:charset "utf-8"}]
   [:meta {:name "viewport" :content "initial-scale=1.0,width=device-width"}]
   (include-css "css/mike.css")
   [:link {:type "text/css", :href "/css/mike.css", :rel "stylesheet"}]
   [:title title]]) 

(defn resource-view
  [a]
  (let [{:keys [status message body]} a]
  (html5
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

(defn home
  []
  (html5
   [:head
    [:meta {:charset "utf-8"}]
    [:meta {:name "viewport" :content "initial-scale=1.0,width=device-width"}]
    (include-css "css/mike.css")
    [:title "Home"]]
   [:body
    [:p "hi this is mike"]
    component/nav]))

(defn reagent-dev
  [title filename app]
  (html5
   (head title)
   [:body
    [:div#app]
    [:script {:type "text/javascript" :src (str "/js/" filename "/goog/base.js")}]
    [:script {:type "text/javascript" :src (str "/js/" filename ".js")}]
    [:script {:type "text/javascript"} (str "goog.require(\"" app  ".core\");")]
    [:script {:type "text/javascript"} (str app ".core.start();")]]))

(defn reagent-prod
  [title app]
  (html5
   (head title)
   [:body
    [:div#app]
    [:script {:type "text/javascript" :src (str "/js/" app ".js")}]]))

(defn entity-page
  [title filename app]
  (html5
   (head title)
   [:body
    [:div#app]
    [:script {:type "text/javascript" :src (str "/js/" filename "/goog/base.js")}]
    [:script {:type "text/javascript" :src (str "/js/" filename ".js")}]
    [:script {:type "text/javascript"} (str "goog.require(\"" app  ".core\");")]
    [:script {:type "text/javascript"} (str app ".core.start();")]]))

(defn repo [db user] (JdbcEntityRepo. db user))

;; TODO: this sucks
(defroutes site-routes
  (GET "/" [] (home))
  (GET "/types" [] (reagent-dev "Types" "types" "mike.types"))
  (GET "/type" [] (reagent-dev "Type" "type" "mike.types"))
  (GET "/flash" [] (reagent-dev "Flash" "flash" "mike.flash"))
  (GET "/browse" [] (reagent-dev "Browse" "browse" "mike.browse"))
  (GET "/lesson" [] (reagent-dev "Lesson" "lesson" "mike.lesson"))
  (GET "/test" [] (page "Lesson" "lesson" "mike.lesson"))

  (route/not-found not-found-page))

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
  (route/not-found {:status 200
                    :headers {"Content-Type" "application/json"}
                    :body (json/write-str {:message "NOT FOUND"})}))

(defn init [] (println "mike is starting"))
(defn destroy [] (println "mike is shutting down"))

(def html-routes
  (routes
   (route/resources "/")
   site-routes
   (route/not-found not-found-page)))

(defn login-page
  [message]
  (html5
   [:head
    [:meta {:charset "utf-8"}]
    [:meta {:name "viewport" :content "initial-scale=1.0,width=device-width"}]
    (include-css "css/mike.css")
    [:title "not found"]]
   [:body
    [:span message]
    (form-to
     ["POST" "/login"]
     (label "username" "Username: ")
     (text-field "username")
     (label "password" "Password: ")
     (password-field "password")
     (submit-button "Submit"))]))

(defn handle-site
  [request]
  (let [{:keys [cookies uri request-method params]} request
        logged-in? (= "true" (:value (get cookies "logged-in")))]

    (println "*** SITE ACCESS ***")
    (println "Cookies: " cookies)
    (println "Logged in? " logged-in?)
    (if logged-in?
      (case uri
        "/login" {:status 400 :body "you're already logged in what are you doing"}
        "/logout" {:status 302 :headers {"Location" "/login"} :cookies {:logged-in "false"}}
        (html-routes request))
      (case uri
        "/login" (case request-method
                   :get {:status 200 :body (login-page "Please login.")}
                   :post (let [username (:username params)]
                           (if (nil? username)
                             (do
                               (println "Invalid username: " username)
                               {:status 400 :body (login-page "Do it right.")})
                             (do
                               (println "Logging in:" username)
                               {:status 303 :headers {"Location" "/"} :cookies {:username username
                                                                                :logged-in "true"}})))
                   {:status 404 :body "WHAT?"})
        "/logout" "you aren't logged in why are you trying to log out?"
        {:status 303 :headers {"Location" "/login"} :cookies {:logged-in "false"}}))))

(def site-handler
  (wrap-base-url
   (handler/site
    handle-site)))

(defn wrap-api-user
  [handler]
  (fn [request]
    (println "*** SITE ACCESS ***")
    (let [headers (:headers request)
          user (get headers "lang-user")]
      (if (nil? user)
;;        {:status 401 :body "You suck!"}
        (handler (assoc request :user "guest"))
        (handler (assoc request :user user))))))

(def api-handler
  (wrap-api-user
   (wrap-json-body
    (handler/api api-routes)
    {:keywords? true})))

(defn main-handler
  [request]
  (let [{:keys [headers request-method accept uri method]} request
        accept (get headers "accept")]
    (println "***"  request-method uri accept)
    (if (.startsWith uri "/api")
      (api-handler request)
      (site-handler request))))

(defn wrap-accept
  [handler]
  (fn [{headers :headers :as request}]
    (let [accept-header (get headers "accept")
          json? (= accept-header "application/json")
          accept (if json? :json :what)]
      (handler (assoc request :accept accept)))))

(def app (wrap-accept main-handler))
