(ns mike.flash
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [lang.sentence.api :as api :refer [yaks]]
            [reagent.core :as reagent]
            [cljs-http.client :as http]
            [cljs.core.async :refer [<!]]))

(enable-console-print!)

(def path "http://localhost:8080/api/sentence")

(def state (reagent/atom {:yak :en-it
                          :start :english
                          :selected :english
                          :loading false}))

(defn language-option
  [yak]
  [:option {:value (key yak)} (:name (val yak))])

(defn new-sentence
  [sentence yak state]
  (println "NEW SENTENCE" sentence)
  (merge state {:yak yak
                :sentence sentence
                :loading false
                :selected (:start state)}))

(defn fetch-sentence
  [state yak]
  (swap! state assoc :loading true)
  (go (let [response (<! (http/get path {:query-params {:yak (name yak)}}))]
        (swap! state (partial new-sentence (:body response) yak)))))

(defn swap-selection
  [state]
  (let [yak (:yak state)
        yak-info (yaks yak)
        languages (:languages yak-info)
        language-keys (into #{} (map :key languages)) 
        current (:selected state)
        ;; BAD
        new (first (disj language-keys current))]
    (assoc state :selected new)))

(defn app
  []
  (let [{:keys [yak sentence selected loading] :as current-state} @state
        yak-info (yaks yak)]
    (println yak)
    [:div
     [:select {:on-change #(fetch-sentence state (keyword (-> % .-target .-value)))}
      (map language-option yaks)]
     [:h2 (:name yak-info)]
     [:div [:span (selected sentence)]]
     [:div
      [:input {:type "button"
               :value "Flip"
               :on-click (fn [e] (when (not loading)
                                   (swap! state swap-selection)))}]
      [:input {:type "button"
               :value "Next"
               :on-click (fn [e] (when (not loading)
                                   (fetch-sentence state yak)))}]]]))

(defn start
  []
  (fetch-sentence state :en-it)
  (reagent/render-component
   [app]
   (.getElementById js/document "app")))
