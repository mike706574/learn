(ns mike.flash
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [reagent.core :as reagent]
            [cljs-http.client :as http]
            [cljs.core.async :refer [<!]]
            [cljs.pprint :refer [pprint]]))

(enable-console-print!)

(def path "http://localhost:8080/api/sentence")

(def state (reagent/atom {:start :english
                          :selected :english
                          :loading false
                          :sentence {:id 0 :english "Hi!" :italian "Ciao!"}}))

(defn new-sentence
  [sentence state]
  (merge state {:sentence sentence
                :loading false
                :selected (:start state)}))

(defn fetch-sentence
  []
  (swap! state assoc :loading true)
  (go (let [response (<! (http/get path {:query-params {:yak "en-it"}}))]
        (swap! state (partial new-sentence (:body response))))))

(defn swap-selection
  [state]
  (let [current (:selected state)
        new (case current
              :english :italian
              :italian :english)]
    (assoc state :selected new)))

(defn app
  []
  (let [{:keys [sentence selected loading] :as current-state} @state]
    (println current-state)
    [:div
     [:div [:span (selected sentence)]]
     [:div
      [:input {:type "button"
               :value "Flip"
               :on-click (fn [e] (when (not loading)
                                   (swap! state swap-selection)))}]
      [:input {:type "button"
               :value "Next"
               :on-click (fn [e] (when (not loading)
                                   (fetch-sentence)))}]]
     [:div
      [:p (pprint current-state)]]
     [:div "HELLO"]]))

(defn start
  []
  (fetch-sentence)
  (reagent/render-component
   [app]
   (.getElementById js/document "app")))
