(ns mike.whale.core
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [mike.common.misc :as misc]
            [reagent.core :as reagent] 
            [cljs.core.async :refer [<!]]))

(enable-console-print!)

(defn render
  [state]
  [:span "HI MOM"])

(defn app
  []
  (println "Initializing...")
  (let [state (reagent/atom {})]
    (fn []
      (println "Rendering...")
      (render state))))

(defn start
  []
  (reagent/render-component
   [app]
   (.getElementById js/document "app")))
