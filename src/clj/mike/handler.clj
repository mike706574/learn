(ns mike.handler
  (:require [compojure.core :refer [routing defroutes routes GET POST]]
            [ring.middleware.json :refer [wrap-json-body]]
            [hiccup.middleware :refer [wrap-base-url]]
            [hiccup.page :refer [html5]]
            [hiccup.element :refer [link-to]]
            [compojure.handler :as handler]
            [compojure.route :as route]
            [lang.sentence.api :as api]
            [lang.sentence.jdbc :as jdbc]
            [clojure.data.json :as json]
            [clojure.java.io :as io]
            [clojure.edn :as edn]
            [clojure.core.async :refer [<!!]])
  (:import [lang.sentence.jdbc JdbcSentenceRepo]))

(defn parse-int [s] (Integer/parseInt s))

(def config-file (io/file (io/resource "test_config.edn")))
(def config (edn/read-string (slurp config-file)))
(def repo (JdbcSentenceRepo. (:sentence-repo-database config)))

(defn to-response
  [response]
  {:status 200
   :headers {"Content-Type" "application/json"}
   :body (json/write-str (<!! response))})

(defn home
  []
  (html5
   [:head
    [:meta {:charset "utf-8"}]
    [:meta {:name "viewport" :content "initial-scale=1.0,width=device-width"}]
    [:title "Home"]]
   [:body
    [:p "hi this is mike"]
    [:span "dev"]
    [:ul
     [:li (link-to "http://localhost:8080/dev/flash" "flash")]
     [:li (link-to "http://localhost:8080/dev/browse" "browse")]]
    [:span "prod"]
    [:ul
     [:li (link-to "http://localhost:8080/prod/flash" "flash")]
     [:li (link-to "http://localhost:8080/prod/browse" "browse")]]]))

(def head
  [:head
   [:meta {:charset "utf-8"}]
   [:meta {:name "viewport" :content "initial-scale=1.0,width=device-width"}]
   [:title title]])

(defn reagent-dev
  [title filename app]
  (html5
   head
   [:body
    [:div#app]
    [:script {:type "text/javascript" :src (str "/js/" filename "/goog/base.js")}]
    [:script {:type "text/javascript" :src (str "/js/" filename ".js")}]
    [:script {:type "text/javascript"} (str "goog.require(\"" app  ".core\");")]
    [:script {:type "text/javascript"} (str app ".core.start();")]]))

(defn reagent-prod
  [title app]
  (html5
   head
   [:body
    [:div#app]
    [:script {:type "text/javascript" :src (str "/js/" app ".js")}]]))

(defroutes app-routes
  (route/resources "/")
  (GET "/" [] (home))
  
  (GET "/prod/flash" [] (reagent-prod "Flash" "flash"))
  (GET "/prod/browse" [] (reagent-prod "Browse" "browse"))

  (GET "/dev/flash" [] (reagent-dev "Flash" "flash" "mike.flash"))
  (GET "/dev/browse" [] (reagent-dev "Browse" "browse" "mike.browse"))
  (GET "/dev/exp" [] (reagent-dev "Exp" "exp" "mike.exp"))
  
  (GET "/api/language" {{yak :yak} :params}
       (to-response (api/get-language repo yak)))
  
  (GET "/api/sentence" {{yak :yak id :id tag :tag} :params}
       (let [c (if (nil? id)
                 (if tag
                   (api/get-tagged-random-sentence repo yak tag)
                   (api/get-random-sentence repo yak))
                 (api/get-sentence repo yak id))]
         (to-response c)))
  
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
        (to-response (api/tag-sentence repo (keyword yak) id tag)))
  
  (GET "/api/tags" {{yak :yak} :params} (to-response (api/get-tags repo yak)))
   
  (route/not-found "Not Found"))

(defn init [] (println "mike is starting"))
(defn destroy [] (println "mike is shutting down"))

(def app
  (wrap-base-url
   (wrap-json-body
    (handler/site app-routes) {:keywords? true})))
