(ns mike.add.core
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [mike.common.core :as joe]
            [lang.sentence.api :as api :refer [yaks]]
            [reagent.core :as reagent]
            [cljs-http.client :as http]
            [cljs.core.async :refer [<!]]
            [lang.sentence.http :refer [HttpSentenceRepo]])) 

(enable-console-print!)

(def repo (HttpSentenceRepo. "http://localhost:8080/api/"))

(defn render
  [state]
  (let [{:keys [yak] :as current-state} @state
        info (api/yaks yak)
        languages (:languages info)]
    (println languages)
    [:div "HI"]
    ))

(defn app
  []
  (println "Initializing...")
  (let [state (reagent/atom {:yak :en-it :loading true})]
    (fn []
      (println "Rendering...")
      (render state))))

(defn start
  []
  (reagent/render-component
   [app]
   (.getElementById js/document "app")))
