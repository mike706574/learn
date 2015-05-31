(ns mike.handler
  (:require [compojure.core :refer [defroutes routes GET]]
            [ring.middleware.resource :refer [wrap-resource]]
            [ring.middleware.file-info :refer [wrap-file-info]]
            [hiccup.middleware :refer [wrap-base-url]]
            [compojure.handler :as handler]
            [compojure.route :as route]
            [mike.views.home :refer [home]]))

(defn init []
  (println "mike is starting"))

(defn destroy []
  (println "mike is shutting down"))

(defroutes app-routes
  (route/resources "/")
  (GET "/" [] (home))
  (route/not-found "Not Found"))

(def app
  (wrap-base-url
   (handler/site
    (routes app-routes))))
