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

(defn text-box
  [state ks]
  [:input {:type "text"
           :value (get-in @state ks)
           :on-change #(swap! state assoc-in ks (joe/get-value %))}])

(defn build-sentence
  [yak]
  (let [languages (:languages (api/yaks yak))]
    (into {} (map (fn [language] [(:key language) ""]) languages))))

(defn render
  [state]
  (let [{:keys [yak sentence] :as current-state} @state
        info (api/yaks yak)
        languages (:languages info)]
    (println languages)
    (println sentence)
    [:div
     (joe/yak-select2 #(swap! state assoc :yak % :sentence (build-sentence %)))
     [:span (name yak)]
     [:ul 
      (doall (map (fn [{:keys [key label]}]
                    [:li {:key key} label (text-box state [:sentence key])]) languages))]
     (println sentence)
     [:input {:type "button" :value "Add" :on-click #(api/add-sentence repo yak sentence)}]
     
     ]
    
    
    

    
    ))

(defn app
  []
  (println "Initializing...")
  (let [state (reagent/atom {:yak :en-it :sentence (build-sentence :en-it) :loading true})]
    (fn []
      (println "Rendering...")
      (render state))))

(defn start
  []
  (reagent/render-component
   [app]
   (.getElementById js/document "app")))
