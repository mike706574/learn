(ns cljs.mike.flip
  (:require [reagent.core :as reagent]))

(defn app
  []
  [:h2 "Hello world!"])

(defn start
  []
  (reagent/render-component
   [app]
   (.getElementById js/document "app")))

(start)
