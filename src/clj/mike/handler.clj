(ns mike.handler
  (:require [compojure.core :refer [routing defroutes routes GET]]
            [ring.util.response :refer [response]]
            [hiccup.middleware :refer [wrap-base-url]]
            [compojure.handler :as handler]
            [compojure.route :as route]
            [mike.resource.sentence :refer [sentence-resource]]
            [mike.view.home :refer [home]]
            [mike.view.stegosaurus :refer [stegosaurus]]
            [mike.view.triceratops :refer [triceratops]]
            [lang.sentence.factory :refer [build-sentence-repo]]
            [lang.sentence.api :as api]
            [clojure.java.io :as io]
            [clojure.edn :as edn]))

(defn init []
  (println "mike is starting"))

(defn destroy []
  (println "mike is shutting down"))

(def config-file (io/file (io/resource "config.edn")))
(def config (edn/read-string (slurp config-file)))
(def sentence-repo (build-sentence-repo config))

(defroutes app-routes
  (route/resources "/")
  (GET "/" [] (home))
  (GET "/stegosaurus" [] (stegosaurus sentence-repo))
  (GET "/triceratops" [] (triceratops))
  (GET "/api/sentence" [] (sentence-resource sentence-repo)) 
  (GET "/foo" []  {:status 200 :body "FOO"})
  (route/not-found "Not Found"))

(def app
   (wrap-base-url
    (handler/site
     (routes app-routes))))

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
