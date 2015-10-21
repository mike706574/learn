(ns mike.handler
  (:require [compojure.core :refer [routing defroutes routes GET POST DELETE]]
            [ring.middleware.json :refer [wrap-json-body]]
            [hiccup.middleware :refer [wrap-base-url]]
            [hiccup.page :refer [html5]]
            [hiccup.element :refer [link-to]]
            [compojure.handler :as handler]
            [compojure.route :as route]
            [lang.sentence.api :as api]
            [lang.sentence.jdbc :as jdbc]
            [lang.entity.api :as ocean]
            [lang.entity.jdbc :as what]
            [pet.http :as pete]
            [clj-http.client :as http] 
            [clojure.walk :refer [prewalk]] 
            [clojure.data.json :as json]
            [clojure.java.io :as io]
            [clojure.edn :as edn]
            [clojure.core.async :refer [<!!]])
  (:import [lang.entity.jdbc JdbcEntityRepo]
           [lang.sentence.jdbc JdbcSentenceRepo]
           [java.text SimpleDateFormat]
           [java.sql Timestamp]))

(defn date-to-string
  [date]
  (.format (SimpleDateFormat. "MM/dd/yyyy HH:mm:ss") date))

(defn convert-if-date
  [x]
  (if (instance? java.sql.Timestamp x) (date-to-string x) x))

(defn parse-int [s] (Integer/parseInt s))

(def config-file (io/file (io/resource "test_config.edn")))
(def config (edn/read-string (slurp config-file)))
(def repo (JdbcSentenceRepo. (:sentence-repo-database config)))

(def entity-config (:entity-database config))

;;(what/create! entity-config)

(def whale (JdbcEntityRepo. (:entity-database config)))

(defn to-response
  [response]
  (let [result (<!! response)]
    (if (= :ok (:status result))
      {:status 200
       :headers {"Content-Type" "application/json"}
       :body (json/write-str (prewalk convert-if-date result))}
      (do (println result)
          {:status 409}))
    

    

    )
  )

(defn home
  []
  (html5
   [:head
    [:meta {:charset "utf-8"}]
    [:meta {:name "viewport" :content "initial-scale=1.0,width=device-width"}]
    [:title "Home"]]
   [:body
    [:p "hi this is mike"]
    [:ul
     [:li (link-to "http://localhost:8080/types" "types")]
     [:li (link-to "http://localhost:8080/add" "add")]
     [:li (link-to "http://localhost:8080/browse" "browse")]
     [:li (link-to "http://localhost:8080/lesson" "lesson")]] 
    [:span "dev"]
    [:ul
     [:li (link-to "http://localhost:8080/dev/flash" "flash")]
     [:li (link-to "http://localhost:8080/dev/browse" "browse")]
     [:li (link-to "http://localhost:8080/dev/whale" "whale")]
     [:li (link-to "http://localhost:8080/dev/add" "add")]]
    [:span "things"]
    [:ul
     [:li (link-to "http://mike.elasticbeanstalk.com/prod/flash" "flash")]
     [:li (link-to "http://mike.elasticbeanstalk.com/prod/browse" "browse")]]

    ]))

(defn head
  [title]
  [:head
   [:meta {:charset "utf-8"}]
   [:meta {:name "viewport" :content "initial-scale=1.0,width=device-width"}]
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

(defn type-page
  []
  (html5
   (head "Types")
   [:body
    [:div
      [:h3 "Types"]
     [:ul
     (for [{:keys [label id description attributes]} (:body (<!! (ocean/get-types whale)))]
       [:li
        [:h4 label]
        [:ul
         [:li "ID: " id]
         [:li "Description: " description]
         [:li "Attributes"]
         (for [{:keys [id label schema description]} attributes]
           [:div
            [:h5 label]
            [:ul 
             [:li "ID: " id]
             [:li "Description: " description]
             [:li "Schema: " schema]]])]])]]]

   ))

(defroutes app-routes
  (route/resources "/")
  
  (GET "/" [] (home))

  (GET "/prod/flash" [] (reagent-prod "Flash" "flash"))
  (GET "/prod/browse" [] (reagent-prod "Browse" "browse"))

  (GET "/dev/flash" [] (reagent-dev "Flash" "flash" "mike.flash"))
  (GET "/dev/browse" [] (reagent-dev "Browse" "browse" "mike.browse"))
  (GET "/dev/exp" [] (reagent-dev "Exp" "exp" "mike.exp"))
  (GET "/dev/add" [] (reagent-dev "Add" "add" "mike.add"))
  (GET "/dev/whale" [] (reagent-dev "Whale" "whale" "mike.whale"))

  (GET "/types" [] (reagent-dev "Types" "types" "mike.types"))
  (GET "/add" [] (reagent-dev "Add" "add" "mike.add"))
  (GET "/browse" [] (reagent-dev "Browse" "browse" "mike.browse"))
  (GET "/lesson" [] (reagent-dev "Lesson" "lesson" "mike.lesson"))
  
  (POST "/whale/type" {body :body}
        (to-response (ocean/create-type! whale body)))

  (DELETE "/whale/type" {{type-id :type-id} :params}
          (to-response (ocean/delete-type! whale type-id)))

  (GET "/whale/type" {{type-id :type-id} :params}
       (to-response (ocean/get-type whale type-id)))

  (GET "/whale/types" []
       (to-response (ocean/get-types whale)))

  (GET "/whale/entity-count" {{type-id :type-id} :params}
        (to-response (ocean/count-entities whale type-id)))

;; TODO HERE
  (POST "/whale/entity" {body :body}
        (let [type-id (:type-id body)]
          (println "TYPE ID =" type-id)
          (to-response (ocean/add-entity! whale type-id body))))
  
  (GET "/whale/entities" {{:keys [type-id n start end tag]} :params}
       ;; TODO: Handle no type-id
       (let [type-id (keyword type-id)] 
         (to-response
          (if n
            (if tag
              (ocean/get-random-entities-with-tag whale type-id tag (parse-int n))
              (ocean/get-random-entities whale type-id (parse-int n))) 
            (if (and start end)
              (ocean/get-entity-range whale type-id (parse-int start) (parse-int end))
              (if tag
                (println "TODO: get entity range for tag")
                {:status :bad-request :message "BAD COMBINATION"}))))))
  
  (POST "/whale/lesson" {{:keys [type-id user name description]} :body}
        (to-response (ocean/create-lesson! whale type-id user name description)))

  (GET "/whale/lessons" {{:keys [type-id user]} :params}
        (to-response (ocean/get-lessons-for-user whale type-id user)))

  





  

  
  (GET "/api/language" {{yak :yak} :params}
       (to-response (api/get-language repo yak)))
  
  (GET "/api/sentence" {{yak :yak id :id tag :tag} :params}
       (let [c (if (nil? id)
                 (if tag
                   (api/get-tagged-random-sentence repo yak tag)
                   (api/get-random-sentence repo yak))
                 (api/get-sentence repo yak id))]
         (to-response c)))
  
  (POST "/api/sentence" {params :params body :body}
        (let [yak (:yak body)
              sentence (dissoc body :yak)]
          (to-response (api/add-sentence repo yak sentence)))) 

  (GET "/api/sentences" {{:keys [yak n start end tag]} :params}
       (to-response
        (if n
          (if tag
            (api/get-tagged-random-sentences repo (keyword yak) tag (parse-int n))
            (api/get-random-sentences repo (keyword yak) (parse-int n))) 
          (if (and start end)
            (api/get-sentence-range repo (keyword yak) (parse-int start) (parse-int end))
            (if tag
              (api/get-tagged-sentences repo yak tag)
              {:status :bad-request :message "BAD COMBINATION"})))))
  
  (GET "/api/tag" {{yak :yak tag :tag} :params}
       (to-response (api/get-tagged-sentences repo (keyword yak) tag)))
  
  (POST "/api/tag" {{yak :yak tag :tag id :id} :params}
        (to-response (api/tag-sentence repo (keyword yak) id tag))
        (to-response (api/tag-sentence repo (keyword yak) id tag)))

  (GET "/api/tags" {{yak :yak} :params} (to-response (api/get-tags repo yak)))
  
  (route/not-found "Not Found"))

(defn init [] (println "mike is starting"))
(defn destroy [] (println "mike is shutting down"))

(def app
  (wrap-base-url
   (wrap-json-body
    (handler/site app-routes) {:keywords? true})))

;;(println (http/delete "http://localhost:8080/whale/type?type-id=thing"))

;;(println (http/get "http://localhost:8080/whale/type?type-id=thing"))




;; (println
;;   (http/post
;;    "http://localhost:8080/whale/type"
;;    {:content-type :json
;;     :body
;;     (json/write-str{:id "thing"
;;                     :label "Thing"
;;                     :description "A thing"
;;                     :attributes [{:id "color"
;;                                   :label "Color"
;;                                   :schema :str
;;                                   :description "The color of the thing"}]})})) 
