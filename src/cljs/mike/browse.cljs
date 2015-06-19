(ns mike.browse
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [lang.sentence.api :as api]
            [reagent.core :as reagent]
            [cljs-http.client :as http]
            [cljs.core.async :refer [<!]])) 

(def language-pairs
  {:en-it {:name "English & Italian" 
           :languages #{{:key :english :label "English" :name "english" }
                        {:key :italian :label "Italian" :name "italian" }}}
   :en-sp {:name "English & Spanish"
           :languages #{{:key :english :label "English" :name "english" }
                        {:key :italian :label "Italian" :name "italian" }}}})

(enable-console-print!)

(def path "http://localhost:8080/api/sentences")

(defn load-page
  [lp number sentences state]
  (merge state {:lp lp
                :page-number number
                :page-sentences sentences}))

(defn show-page
  [state lp number]
  (go
    (let [start (+ number (* (dec number) 10))
          end (+ start 10)
          response (<! (http/get path {:query-params {:lp (name lp) :start start :end end}}))
          sentences (:body response)]
      (swap! state (partial load-page lp number sentences)))))

(defn big-thing
  [state]
  (let [{:keys [lp page-number page-sentences] :as current-state} @state
        lp-info (language-pairs lp)]
    (println "LP:" lp)
    (println "MY INFO:" (language-pairs lp))
    (println "API INFO:" (api/language-pairs lp))
    [:div
     [:select {:on-change #(show-page state (keyword (-> % .-target .-value)) 1)}
      [:option {:value "en-it"} "Italian"]
      [:option {:value "en-sp"} "Spanish"]]
     [:h2 (:name lp-info)]
     [:span (str "Page number: " page-number)]
     [:table
      [:thead
       [:tr
        [:th "ID"]
        [:th "A"]
        [:th "B"]]]
      [:tbody
       (for [sentence page-sentences]
         (let [{:keys [id english italian]} sentence]
           [:tr {:key id}
            [:td id]
            [:td english]
            [:td italian]]))]]
     [:input {:type "button"
              :value "Previous"
              :on-click #(show-page state lp (dec page-number))}]
     [:input {:type "button"
              :value "Next"
              :on-click #(show-page state lp (inc page-number))}]]))


(defn app
  []
  (println "Initializing...")
  (let [state (reagent/atom {:lp :en-it :page-number 1})]
    (show-page state :en-it 1)
    (fn []
      (println "Rendering...")
      (big-thing state))))

(defn start
  []
  (reagent/render-component
   [app]
   (.getElementById js/document "app")))
