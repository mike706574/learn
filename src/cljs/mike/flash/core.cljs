(ns mike.flash.core
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [mike.common.core :as joe]
            [lang.sentence.api :as api :refer [yaks]]
            [reagent.core :as reagent]
            [cljs-http.client :as http]
            [cljs.core.async :refer [<!]]
            [mike.frog :as frog]
            [lang.sentence.http :refer [HttpSentenceRepo]]))

(enable-console-print!)

(def repo (HttpSentenceRepo. "http://localhost:8080/api/"))

(def state (reagent/atom {:loading false}))

(defn choose-set
  [yak state]o
  (let [{languages :languages title :name} (yaks yak)
        keys (mapv :key languages)]
    (swap! state merge {:yak yak
                        :title title
                        :languages languages
                        :keys keys
                        :selected (first keys)})))

(defn fetch-sentence
  [state]
  (swap! state assoc :loading true)
  (go (let [yak (:yak @state)
            sentence (<! (api/get-random-sentence repo yak))]
        (swap! state assoc :sentence sentence :loading false))))

(defn swap-selection
  [state]
  (let [{:keys [selected keys]} state]
    (assoc state :selected (joe/get-after keys selected))))

(defn app
  []
  (let [{:keys [title sentence selected loading] :as current-state} @state]
    [:div 
     (when (not (nil? sentence))
       [:div
        [:span (name selected) ]
        (joe/yak-select #(do (choose-set (keyword (joe/get-value %)) state) 
                             (fetch-sentence state)))
        (joe/flip-box title selected sentence #(swap! state swap-selection) #(fetch-sentence state))])
     (when loading [:span "Loading..."])]))

(defn start
  []
  (let [default-yak :en-it]
    (choose-set default-yak state)
    (fetch-sentence state)
    (reagent/render-component
     [app]
     (.getElementById js/document "app"))))

