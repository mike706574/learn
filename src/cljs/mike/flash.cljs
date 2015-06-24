(ns mike.flash
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [mike.common :as joe]
            [lang.sentence.api :as api :refer [yaks]]
            [reagent.core :as reagent]
            [cljs-http.client :as http]
            [cljs.core.async :refer [<!]]))

(enable-console-print!)

(def state (reagent/atom {}))

(defn language-option
  [yak]
  (let [k (key yak)
        v (val yak)]
    [:option {:key k :value k} (:name v)]))

(defn new-sentence
  [sentence yak state]
  (merge state {:yak yak
                :info (yaks yak)
                :sentence sentence
                :loading false
                :selected (:start state)}))

(defn fetch-sentence
  [state yak]
  (swap! state assoc :loading true)
  (go (let [response (<! (joe/get-random-sentence yak))]
        (swap! state (partial new-sentence (:body response) yak)))))

(defn swap-selection
  [state]
  (let [languages (:languages (:info state))
        language-keys (into #{} (map :key languages)) 
        ;; BAD
        new (first (disj language-keys (:selected state)))]
    (assoc state :selected new)))

(defn app
  []
  (let [{:keys [yak info sentence selected loading] :as current-state} @state]
    [:div
     (joe/language-select #(fetch-sentence state (keyword (-> % .-target .-value))))
     [:h2 (:name info)]
     [:div [:span (selected sentence)]]
     [:div
      [:input {:type "button"
               :value "Flip"
               :on-click (fn [e] (swap! state swap-selection))}]
      [:input {:type "button"
               :value "Next"
               :on-click (fn [e] (fetch-sentence state yak))}]]
     (when loading [:span "Loading..."])]))

(defn start
  []
  (let [yak :en-it
        info (yaks yak)
        start (:key (first (:languages info)))]
    (swap! state merge {:info info
                        :start start
                        :selected start
                        :loading true})
    (fetch-sentence state yak)
    (reagent/render-component
     [app]
     (.getElementById js/document "app"))))

  
