(ns mike.exp.core
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [mike.common.core :as joe]
            [lang.sentence.api :as api :refer [yaks]]
            [reagent.core :as reagent]
            [cljs-http.client :as http]
            [cljs.core.async :refer [<!]]))

(enable-console-print!)

(def repo (HttpSentenceRepo. "http://localhost:8080/api/"))

(def history (atom []))

(def state (reagent/atom {:loading false :tag "" :tag-message ""}))

(defn get-label
  [selected languages]
  (let [lang-map (joe/mapm (fn [x] [(:key x) x]) languages)
        language (selected lang-map)]
    (:label language)))

(defn go-to-selection
  [selection state]
  (assoc state :selected selection))

(defn swap-selection
  [state]
  (let [{:keys [selected keys languages]} state
        next (joe/get-after keys selected)]
    (go-to-selection next state)))

(defn choose-set
  [yak state]
  (let [{languages :languages title :name} (yaks yak)
        keys (mapv :key languages)
        selected (first keys)]
    (swap! state merge {:yak yak
                        :title title
                        :languages languages
                        :keys keys
                        :selected selected})))

(defn fetch-sentence
  [state]
  (swap! state assoc :loading true)
  (go (let [yak (:yak @state)
            sentence (<! (api/get-random-sentence repo yak))]
        (swap! state assoc :sentence sentence :loading false :tag-message "")
        (swap! history conj @state))))

(defn go-back
  []
  (when (> (count @history) 1)
    (swap! history pop)
    (reset! state (last @history))))

(defn text-box
  [state k]
  [:input {:type "text"
           :value (k @state)
           :on-change #(swap! state assoc k (joe/get-value %))}])

(defn button
  [label f]
  [:input {:type "button"
           :value label
           :on-click f}])

(defn build-message
  [status success-message fail-message]
  (if (= "ok" status) success-message fail-message))

(defn tag-sentence
  [state]
  (go (let [{:keys [yak tag sentence]} @state 
            {:keys [status message]} (<! (api/tag-sentence repo yak tag (:id sentence)))
            message (build-message status "Added tag" message)]
        (swap! state assoc :tag-message message))))

(defn app
  [] 
  (let [{:keys [title sentence selected-title selected loading languages yak tag tag-message] :as current-state} @state
        selected-title (get-label selected languages)]
    [:div 
     (when (not (nil? sentence))
       [:div 
        (joe/yak-select #(do (choose-set (keyword (joe/get-value %)) state) 
                             (fetch-sentence state)))
        (joe/flip-box2 title selected selected-title sentence #(swap! state swap-selection) #(fetch-sentence state))
        [:br]
        (button "Back" go-back)
        [:br]
        [:br]
        (text-box state :tag)
        (button "Tag" #(tag-sentence state))
        [:br]
        (when (not (empty? tag-message))
          [:span tag-message])
        [:br]
])
     

     (when loading [:span "Loading..."])
     ]))

(defn start
  []
  (let [default-yak :en-it]
    (choose-set default-yak state)
    (fetch-sentence state)
    (reagent/render-component
     [app]
     (.getElementById js/document "app"))))

