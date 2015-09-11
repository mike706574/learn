(ns mike.handler
  (:require [compojure.core :refer [routing defroutes routes GET POST]]
            [ring.util.response :refer [response]]
            [ring.middleware.params :refer [wrap-params]]
            [ring.middleware.json :refer [wrap-json-body]]
            [hiccup.middleware :refer [wrap-base-url]]
            [compojure.handler :as handler]
            [compojure.route :as route]
            [mike.view :as view]
            [mike.layout.core :refer [reagent reagent-prod]]
            [mike.view.home :refer [home]]
            [lang.sentence.factory :refer [build-sentence-repo]]
            [lang.sentence.api :as api]
            [clojure.data.json :as json]
            [clojure.java.io :as io]
            [clojure.edn :as edn]
            [clojure.core.async :refer [<!!]]
            [mike.frog :as frog])
  (:import [lang.sentence.jdbc JdbcSentenceRepo]))

(defn init []
  (println "mike is starting"))

(defn destroy []
  (println "mike is shutting down"))

(def config-file (io/file (io/resource "test_config.edn")))
(def config (edn/read-string (slurp config-file)))
(def repo (JdbcSentenceRepo. (:sentence-repo-database config)))

(defn to-status-code
  [status]
  (case status
    :ok 200
    :bad-request 400
    :missing 404
    :conflict 409
    500))

(defmacro <<
  [form]
  `(:body (<!! ~form)))

(defn ok
  []
  (api/count-sentences repo :en-it))

(defn to-response
  [{status :status :as body}]
  
  {:status (to-status-code status)
   :headers {"Content-Type" "application/json"}
   :body (json/write-str body)})

(defn parse-int [s] (Integer/parseInt s))

(defroutes app-routes
  (route/resources "/")
  (GET "/" [] (home))
;;  (GET "/stegosaurus" [] (view/stegosaurus repo))
;;  (GET "/triceratops" [] (view/triceratops))
  (GET "/frog" [] (frog/ribbit "Clojure"))
  
  (GET "/prod/flash" [] (reagent-prod "Flash" "flash"))
  (GET "/prod/browse" [] (reagent-prod "Browse" "browse"))

  (GET "/lang/flash" [] (reagent "Flash" "flash" "mike.flash"))
  (GET "/lang/browse" [] (reagent "Browse" "browse" "mike.browse"))
  (GET "/lang/exp" [] (reagent "Exp" "exp" "mike.exp"))
  (GET "/lang/ferret" [] (reagent "Ferret" "ferret" "mike.ferret"))
  
  (GET "/api/language" {{yak :yak} :params} (to-response
                                             (let [sentence-count (:body (<!! (api/count-sentences repo yak)))
                                                   yakin (api/yaks (keyword yak))
                                                   body (assoc  yakin :sentence-count sentence-count)]
                                               {:status :ok :body body})))
  
  (GET "/api/sentence" {{yak :yak id :id tag :tag} :params}
       (let [c (if (nil? id)
                 (if tag
                   (api/get-tagged-random-sentence repo yak tag)
                   (api/get-random-sentence repo yak))
                 (api/get-sentence repo yak id))]
         (to-response (<!! c))))
  (GET "/api/sentences" {{:keys [yak n start end tag]} :params}
       (to-response
        (if n
          (if tag
            (<!! (api/get-tagged-random-sentences repo (keyword yak) tag (parse-int n)))
            (<!! (api/get-random-sentences repo (keyword yak) (parse-int n)))) 
          (if (and start end)
            (<!! (api/get-sentence-range repo (keyword yak) (parse-int start) (parse-int end)))
            (if tag
              (<!! (api/get-tagged-sentences repo yak tag))
              {:status :bad-request :message "BAD COMBINATION"})))))
  
  (GET "/api/tag" {{yak :yak tag :tag} :params} (to-response (<!! (api/get-tagged-sentences repo (keyword yak) tag))))
  (POST "/api/tag" {{yak :yak tag :tag id :id} :params}
        (to-response (<!! (api/tag-sentence repo (keyword yak) id tag))))
  (GET "/api/tags" {{yak :yak} :params} (to-response (<!! (api/get-tags repo yak))))
   
  (route/not-found "Not Found"))

(def app
  (wrap-base-url
   (wrap-json-body
    (handler/site app-routes) {:keywords? true})))





