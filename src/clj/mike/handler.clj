(ns mike.handler
  (:require [compojure.core :refer [routing defroutes routes GET]]
            [ring.util.response :refer [response]]
            [ring.middleware.params :refer [wrap-params]]
            [hiccup.middleware :refer [wrap-base-url]]
            [compojure.handler :as handler]
            [compojure.route :as route]
            [mike.resource.sentence :as resource]
            [mike.view :as view]
            [mike.layout.core :refer [reagent]]
            [mike.view.home :refer [home]]
            [lang.sentence.factory :refer [build-sentence-repo]]
            [lang.sentence.api :as api]
            [clojure.java.io :as io]
            [clojure.edn :as edn]))

(defn init []
  (println "mike is starting"))

(defn destroy []
  (println "mike is shutting down"))

(def config-file (io/file (io/resource "test_config.edn")))
(def config (edn/read-string (slurp config-file)))
(def repo (build-sentence-repo config))

(defroutes app-routes
  (route/resources "/")
  (GET "/" [] (home))
;;  (GET "/stegosaurus" [] (view/stegosaurus repo))
;;  (GET "/triceratops" [] (view/triceratops))
  
  (GET "/lang/flash" [] (reagent "Flash" "mike.flash"))
  (GET "/lang/browse" [] (reagent "Browse" "mike.browse"))

  (GET "/api/language"  {params :params} (resource/language repo params))
  (GET "/api/sentence"  {params :params} (resource/sentence repo params))
  (GET "/api/sentences" {params :params} (resource/sentences repo params))
  
  (route/not-found "Not Found"))

(def app
   (wrap-base-url
    (handler/site app-routes)))

;; what i really want??
;; (defn route-request
;;   [request]
;;   (routing
;;    (route/resources "/")
;;    (GET "/" [] (home))
;;    (GET "/stegosaurus" [] (partial stegosaurus (build-repo config)))
;;    (GET "/triceratops" [] (triceratops))
;;    (route/not-found "Not Found")))

;; (def app
;;   (wrap-base-url (handler/site route-request)))
