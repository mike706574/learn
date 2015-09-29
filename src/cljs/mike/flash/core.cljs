(ns mike.flash.core
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [mike.common.core :as joe]
            [lang.sentence.api :as api]
            [reagent.core :as reagent]
            [cljs-http.client :as http]
            [cljs.core.async :refer [<!]]
            [lang.sentence.http :refer [HttpSentenceRepo]]))

(enable-console-print!)

(def repo (HttpSentenceRepo. "http://mike.elasticbeanstalk.com/api/"))

(def state (reagent/atom {:loading false}))

(defn choose-set
  [yak state]
  (let [{languages :languages title :name} (api/yaks yak)
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
            sentence (:body (<! (api/get-random-sentence repo yak)))]
        (swap! state assoc :sentence sentence :loading false))))

(defn swap-selection
  [state]
  (let [{:keys [selected keys]} state]
    (assoc state :selected (joe/get-after keys selected))))

(defn app
  []
  (let [{:keys [yak title sentence selected loading] :as current-state} @state]
    [:div
     (joe/yak-select #(do (choose-set (keyword (joe/get-value %)) state) 
                          (fetch-sentence state)))
     (let [info (api/yaks yak)
           title (:name info)
           label (joe/get-label selected (:languages info))]
       (if (nil? sentence)
         [:div
          [:h2 title]
          [:p "No sentences found."]]
         [:div
          [:h2 title]
          [:p (selected sentence)]
          [:p "(" label ")"] 
          [:input {:type "button" :value "Flip" :on-click #(swap! state swap-selection)}]
          [:input {:type "button" :value "Next" :on-click #(fetch-sentence state)}]]))
     (when loading [:p "Loading..."])]))

(defn start
  []
  (let [default-yak :en-it]
    (choose-set default-yak state)
    (fetch-sentence state)
    (reagent/render-component
     [app]
     (.getElementById js/document "app"))))

(start)
