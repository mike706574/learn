(ns mike.flip
  (:require [reagent.core :as reagent]))

(defn app
  []
  [:section#thing
   [:div.row
    [:div.large-12.columns.centered-text
     [:h1 "HELLO" ]]]])

(defn start
  []
  (reagent/render-component
   [app]
   (.getElementById js/document "app")))

(start)
