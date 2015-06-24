(ns mike.browse
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [mike.common :as joe]
            [lang.sentence.api :as api :refer [yaks]]
            [reagent.core :as reagent]
            [cljs-http.client :as http]
            [cljs.core.async :refer [<!]])) 

(enable-console-print!)

(defn load-page
  [yak number sentences sentence-count state]
  (println "SC:" sentence-count)
  (merge state {:yak yak
                :info (yaks yak)
                :page-number number
                :page-sentences sentences
                :sentence-count sentence-count
                :loading false}))

(defn show-page-hey
  [state yak number sentence-count]
  (println "Fetching new page...")
  (go
    (let [page-size (:page-size @state)
          start (+ number (* (dec number) (dec page-size)))
          end (dec (+ start page-size)) 
          response (<! (joe/get-sentence-range yak start end))
          sentences (:body response)]
      (println "Saving new page...")
      (swap! state (partial load-page yak number sentences sentence-count)))))

(defn show-page
  [state yak number]
  (show-page-hey state yak number (:sentence-count @state)))

(defn show-page-new-yak
  [state yak number]
  (go
    (let [response (<! (joe/get-language yak))]
      (show-page-hey state yak number (:sentence-count (:body response))))))

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

(defn render
  [state]
  (let [{:keys [yak info page-number page-sentences page-size loading sentence-count] :as current-state} @state
        languages (:languages info)
        page-count (quot sentence-count page-size)]
    (println info)
    [:div        
     (joe/language-select #(show-page-new-yak state (keyword (-> % .-target .-value)) 1))
     [:h2 (:name info)]
     [:p (str "Total sentences: " sentence-count)]
     [:p (str "Page " page-number " of " (quot sentence-count page-size))]
     [:table
      [:thead
       [:tr
        (cons [:th {:key :id} "ID"] (map column-header languages))]]
      [:tbody
       (map (partial sentence-row languages) page-sentences)]]
     ;; TODO: Handle right boundary
     (when (not= 1 page-number)
       [:input {:type "button"
                :value "First"
                :on-click #(show-page state yak 1)}])

     (when (< 1 page-number)
       [:input {:type "button"
                :value "Previous"
                :on-click #(show-page state yak (dec page-number))}])
     (when (not= page-number page-count)
       [:input {:type "button"
                :value "Next"
                :on-click #(show-page state yak (inc page-number))}])
     (when (not= page-number page-count)
       [:input {:type "button"
                :value "Last"
                :on-click #(show-page state yak page-count)}])    
     (when loading [:span "Loading..."])]))

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
