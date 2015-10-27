(ns mike.handler
  (:require [compojure.core :refer [routing defroutes routes GET POST DELETE PUT]]
            [ring.middleware.json :refer [wrap-json-body]]
            [hiccup.middleware :refer [wrap-base-url]]
            [hiccup.page :refer [html5 include-css]]
            [hiccup.element :refer [link-to]]
            [compojure.handler :as handler]
            [compojure.route :as route]
            [lang.entity.api :as api]
            [lang.entity.jdbc :as what]
            [lang.entity.http :as lol]
            [pet.http :as pete]
            [clj-http.client :as http] 
            [clojure.walk :refer [prewalk]] 
            [clojure.data.json :as json]
            [clojure.java.io :as io]
            [clojure.edn :as edn]
            [clojure.string :refer [blank?]]
            [clojure.core.async :refer [<!!]]
            [mike.component :as component])
  (:import [java.text SimpleDateFormat]
           [lang.entity.jdbc JdbcEntityRepo]
           [lang.entity.http HttpEntityRepo]
           [java.sql Timestamp]))

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

(defn date-to-string
  [date]
  (.format (SimpleDateFormat. "MM/dd/yyyy HH:mm:ss") date))

(defn convert-if-date
  [x]
  (if (instance? java.sql.Timestamp x) (date-to-string x) x))

(defn parse-int [s] (Integer/parseInt s))

(def config-file (io/file (io/resource "test_config.edn")))
(def config (edn/read-string (slurp config-file)))

(def db (:entity-database config))

(defn to-response
  [response]
  (let [result (<!! response)]
    (println "Result: " result)
    {:status 200
     :headers {"Content-Type" "application/json"}
     :body (json/write-str (prewalk convert-if-date result))}
))

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

(defn head
  [title]
  [:head
   [:meta {:charset "utf-8"}]
   [:meta {:name "viewport" :content "initial-scale=1.0,width=device-width"}]
   (include-css "css/mike.css")
   [:title title]])

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

(defn repo [db user] (JdbcEntityRepo. db user))


(defroutes views
  (GET "/" [] (home)) 
  (GET "/types" [] (reagent-dev "Types" "types" "mike.types"))
  (GET "/add" [] (reagent-dev "Add" "add" "mike.add"))
  (GET "/browse" [] (reagent-dev "Browse" "browse" "mike.browse"))
  (GET "/lesson" [] (reagent-dev "Lesson" "lesson" "mike.lesson"))
  )

;; TODO: validate things
(defroutes api
  (POST "/api/type"
        {body :body user :user}
        (to-response (api/create-type! (repo db user) body)))

  (DELETE "/api/type/:type-id"
          {{type-id :type-id} :params user :user}
          (to-response (api/delete-type! (repo db user) type-id)))

  (GET "/api/type/:type-id"
       {{type-id :type-id} :params user :user}
       (to-response (api/get-type (repo db user) type-id)))

  (GET "/api/types"
       {user :user}
       (to-response (api/get-types (repo db user))))

  (GET "/api/type/:type-id/entity-count"
       {{type-id :type-id} :params user :user}
       (to-response (api/count-entities (repo db user) type-id)))

  (GET "/api/type/:type-id/entity/:entity-id"
       {{:keys [type-id entity-id]} :params user :user}
       (to-response
        (api/get-entity-by-id (repo db user) type-id (parse-int entity-id)))) 

  (GET "/api/type/:type-id/entity" 
       {{:keys [type-id entity-id tag]} :params user :user}
       (to-response
        (if (nil? tag)
          (api/get-random-entity (repo db user) type-id)
          (api/get-random-entity-with-tag (repo db user) type-id tag))))

  (DELETE "/api/type/:type-id/entity/:entity-id"
          {{:keys [type-id entity-id]} :params user :user}
          (to-response (api/delete-entity! (repo db user) type-id (parse-int entity-id))))

  (POST "/api/type/:type-id/entity"
        {{type-id :type-id} :params body :body user :user}
        (let [x (api/add-entity! (repo db user) type-id body)]
          (to-response x)))

  
  (GET "/api/type/:type-id/entities"
       {{:keys [type-id n start end tag]} :params user :user}
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
                {:status :bad-request :message "BAD COMBINATION"}))))))

  ;; LESSONS
  (GET "/api/type/:type-id/lesson/:lesson-id"
       {{:keys [type-id lesson-id]} :params user :user}
       (to-response
        (api/get-lesson (repo db user) type-id (parse-int lesson-id))))

  (GET "/api/type/:type-id/lessons"
       {{:keys [type-id]} :params user :user}
       (to-response (api/get-lessons (repo db user) type-id)))

  (POST "/api/type/:type-id/lesson"
        {{:keys [name description length] :as body} :body {type-id :type-id} :params  user :user}
        (to-response (api/create-lesson! (repo db user) type-id name description (parse-int length))))

  (DELETE "/api/type/:type-id/lesson/:lesson-id"
       {{:keys [type-id lesson-id]} :params user :user}
       (to-response
        (api/delete-lesson! (repo db user) type-id (parse-int lesson-id))))

  (PUT "/api/type/:type-id/lesson/:lesson-id/entity/:entity-id"
       {{:keys [type-id lesson-id entity-id]} :params user :user}
       (to-response (api/add-to-lesson! (repo db user) type-id (parse-int lesson-id) (parse-int entity-id))))

  (DELETE "/api/type/:type-id/lesson/:lesson-id/entity/:entity-id"
          {{:keys [type-id lesson-id entity-id]} :params user :user}
          (to-response (api/remove-from-lesson! (repo db user) type-id (parse-int lesson-id) (parse-int entity-id))))

  (GET "/api/type/:type-id/lesson/:lesson-id/entities"
          {{:keys [type-id lesson-id]} :params user :user}
          (to-response (api/get-lesson-entities (repo db user) type-id (parse-int lesson-id))))

  ;; SESSIONS
  (POST "/api/type/:type-id/session"
        {{:keys [type-id]} :params {lesson-id :lesson-id} :body user :user}
        (to-response (api/start-lesson! (repo db user) type-id (parse-int lesson-id))))

  (PUT "/api/type/:type-id/session/:session-id"
       {{:keys [type-id session-id]} :params {entity-id :entity-id correct :correct} :body user :user}
       (to-response (api/record-answer! (repo db user) type-id (parse-int session-id) (parse-int entity-id) correct)))

  (GET "/api/type/:type-id/session/:session-id"
       {{:keys [type-id session-id]} :params user :user}
       (to-response (api/get-session (repo db user) type-id (parse-int session-id)))))

(defn init [] (println "mike is starting"))
(defn destroy [] (println "mike is shutting down"))

(defn wrap-user
  [handler]
  (fn [request]
    (let [headers (:headers request)
          user (get headers "lang-user")]
      (if (nil? user)
        {:status 401 :body "You suck!"}
        (handler (assoc request :user user))))))

(def app
  (wrap-base-url
   (wrap-json-body
    (handler/site
     (routes
      (route/resources "/")
      views
      (wrap-user api)
      (route/not-found "Not Found")))
    {:keywords? true})))
