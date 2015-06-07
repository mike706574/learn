(ns mike.handler
  (:require [compojure.core :refer [routing defroutes routes GET]]
            [ring.middleware.resource :refer [wrap-resource]]
            [ring.middleware.file-info :refer [wrap-file-info]]
            [ring.middleware.json :refer [wrap-json-response]]
            [ring.util.response :refer [response]]
            [hiccup.middleware :refer [wrap-base-url]]
            [compojure.handler :as handler]
            [compojure.route :as route]
            [mike.view.home :refer [home]]
            [mike.view.stegosaurus :refer [stegosaurus]]
            [mike.view.triceratops :refer [triceratops]]
            [mike.sentence.factory :refer [build-sentence-repo]]
            [mike.sentence.api :as api]
            [clojure.java.io :as io]
            [clojure.edn :as edn]))

(defn init []
  (println "mike is starting"))

(defn destroy []
  (println "mike is shutting down"))

(def config-file (io/file (io/resource "config.edn")))
(def config (edn/read-string (slurp config-file)))
(def sentence-repo (build-sentence-repo config))

(defn sentence-resource
  []
  (response (api/get-random-sentence sentence-repo)))

(defroutes app-routes
  (route/resources "/")
  (GET "/" [] (home))
  (GET "/stegosaurus" [] (stegosaurus sentence-repo))
  (GET "/triceratops" [] (triceratops))
  (GET "/api/sentence" [] (sentence-resource)) 
  (GET "/foo" [] (response {:foo "BAR"}))
  (route/not-found "Not Found"))

(def app
  (wrap-json-response
   (wrap-base-url
    (handler/site
     (routes app-routes)))))

;; what i really want??
;; (defn route-request
;;   [request]
;;   (routing
;;    (route/resources "/")
;;    (GET "/" [] (home))
;;    (GET "/stegosaurus" [] (partial stegosaurus (build-sentence-repo config)))
;;    (GET "/triceratops" [] (triceratops))
;;    (route/not-found "Not Found")))

;; (def app
;;   (wrap-base-url (handler/site route-request)))
