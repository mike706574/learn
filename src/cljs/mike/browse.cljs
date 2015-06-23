(ns mike.browse
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [lang.sentence.api :as api :refer [yaks]]
            [reagent.core :as reagent]
            [cljs-http.client :as http]
            [cljs.core.async :refer [<!]])) 

(enable-console-print!)

(def path "http://localhost:8080/api/sentences")

(defn load-page
  [yak number sentences state]
  (merge state {:yak yak
                :page-number number
                :page-sentences sentences}))

(defn show-page
  [state yak number]
  (go
    (let [start (+ number (* (dec number) 10))
          end (+ start 10)
          response (<! (http/get path {:query-params {:yak (name yak) :start start :end end}}))
          sentences (:body response)]
      (swap! state (partial load-page yak number sentences)))))

(defn language-option
  [yak]
  [:option {:value (key yak)} (:name (val yak))])

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

(defn big-thing
  [state]
  (let [{:keys [yak page-number page-sentences] :as current-state} @state
        yak-info (yaks yak)
        languages (:languages yak-info)]
    (println languages)
    [:div
     [:select {:on-change #(show-page state (keyword (-> % .-target .-value)) 1)}
      (map language-option yaks)]
     [:h2 (:name yak-info)]
     [:span (str "Page number: " page-number)]
     [:table
      [:thead
       [:tr
        (cons [:th {:key :id} "ID"] (map column-header languages))]]
      [:tbody
       (map (partial sentence-row languages) page-sentences)]]
     ;; TODO: Handle right boundary
     (when (< 1 page-number)
       [:input {:type "button"
                :value "Previous"
                :on-click #(show-page state yak (dec page-number))}])
     [:input {:type "button"
              :value "Next"
              :on-click #(show-page state yak (inc page-number))}]]))

(defn app
  []
  (println "Initializing...")
  (let [state (reagent/atom {:yak :en-it :page-number 1})]
    (show-page state :en-it 1)
    (fn []
      (println "Rendering...")
      (big-thing state))))

(defn start
  []
  (reagent/render-component
   [app]
   (.getElementById js/document "app")))
