(ns mike.ferret.core
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [mike.common.misc :as misc]
            [lang.sentence.api :as api :refer [yaks]]
            [reagent.core :as reagent]
            [cljs-http.client :as http]
            [cljs.core.async :refer [<!]]))

(enable-console-print!)

(defn get-tags
  [state]
  (go (swap! state assoc :tags (<! (misc/get-tags :en-it)))))

(defn get-sentences
  [state tag]
  (go (swap! state assoc :sentences (<! (misc/get-sentences-for-tag :en-it tag)))))

(defn render
  [state]
  (let [tags (misc/mapm (fn [tag] [tag tag]) (:tags @state))]
    (println @state)
    (misc/on-change-select #(get-sentences state (misc/get-value %)) tags)))

(defn app
  []
  (println "Initializing...")
  (let [state (reagent/atom {:tags #{}})]
    (get-tags state)
    (fn []
      (println "Rendering...")
      (render state))))

(defn start
  []
  (reagent/render-component
   [app]
   (.getElementById js/document "app")))
