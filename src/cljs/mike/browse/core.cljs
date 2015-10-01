(ns mike.browse.core
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [mike.common.core :as joe]
            [lang.sentence.api :as api :refer [yaks]]
            [reagent.core :as reagent]
            [cljs-http.client :as http]
            [cljs.core.async :refer [<!]]
            [lang.sentence.http :refer [HttpSentenceRepo]])) 

(enable-console-print!)

(def repo (HttpSentenceRepo. "http://localhost:8080/api/"))

(defn load-page
  [yak number sentences sentence-count state]
  (merge state {:yak yak
                :info (yaks yak)
                :page-number number
                :page-sentences sentences
                :sentence-count sentence-count
                :loading false}))

(defn show-page-hey
  [state yak number sentence-count]
  (go
    (let [page-size (:page-size @state)
          start (+ number (* (dec number) (dec page-size)))
          end (dec (+ start page-size)) 
          response (<! (api/get-sentence-range repo yak start end))
          sentences (:body response)]
      (swap! state (partial load-page yak number sentences sentence-count)))))

(defn show-page
  [state yak number]
  (show-page-hey state yak number (:sentence-count @state)))

(defn show-page-new-yak
  [state yak number]
  (go
    (let [response (:body (<! (api/get-language repo yak)))]
      (println "COUNT: " (:count response))
      (show-page-hey state yak number (:count response)))))

(defn column-header
  [column]
  [:th {:key (:key column)} (:label column)])

(defn sentence-cell
  [sentence language]
  (let [language-key (:key language)]
    [:td {:key language-key} (sentence language-key)]))

(defn sentence-row
  [languages sentence]
  (let [sentence-id (:id sentence)]
    [:tr {:key sentence-id}
     (cons [:td {:key :id} sentence-id] (map (partial sentence-cell sentence) languages))]))

(defn get-page-count
  [sentence-count page-size]
  (let [q (quot sentence-count page-size)
        m (mod sentence-count page-size)]
    (if (not= 0 m) (inc q) q)))

(defn render
  [state]
  (let [{:keys [yak info page-number page-sentences page-size loading sentence-count] :as current-state} @state
        languages (:languages info)
        page-count (get-page-count sentence-count page-size)]
      [:div
       (joe/yak-select2 #(show-page-new-yak state % 1))
       [:h2 (:name info)]
       (if (= 0 page-count)
         [:p "No sentences stored."]
         [:div
          [:p (str "Total sentences: " sentence-count)]
          [:p (str "Page " page-number " of " (quot sentence-count page-size))]
          [:table
           [:thead
            [:tr
          (cons [:th {:key :id} "ID"] (map column-header languages))]]
           [:tbody
            (map (partial sentence-row languages) page-sentences)]]
          (joe/navigation-buttons page-number page-count (partial show-page state yak))])
       (when loading [:p "Loading..."])]))

(defn app
  []
  (println "Initializing...")
  (let [state (reagent/atom {:yak :en-it :page-number 1 :page-size 10 :loading true})]
    (show-page-new-yak state :en-it 1)
    (fn []
      (println "Rendering...")
      (render state))))

(defn start
  []
  (reagent/render-component
   [app]
   (.getElementById js/document "app")))
