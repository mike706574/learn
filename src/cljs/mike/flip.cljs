(ns mike.flip
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require ;;[lang.sentence.api :refer [SentenceRepo] :as api]
            ;;[lang.sentence.factory :refer [build-sentence-repo]]
            [reagent.core :as reagent]
            [cljs-http.client :as http]
            [cljs.core.async :refer [<!]]))

(def path "http://mike.elasticbeanstalk.com/api/sentence")
;; (def config {:sentence-repo-type :http
;;              :sentence-resource-path "localhost:8080/api"})

;; (def sentence-repo (build-sentence-repo config))

;; (defn app
;;   []
;;   (let [sentence (api/get-random-sentence sentence-repo)]
;;     [:section#thing
;;      [:div.row
;;       [:div.large-12.columns.centered-text
;;        [:h1 (str "HELLO" (:italian sentence))]]]]))

(def selection-atom (reagent/atom :italian))
(def sentence-atom (reagent/atom nil))

(defn fetch-sentence
  []
  (reset! sentence-atom nil)
  (go (let [response (<! (http/get path))]
        (reset! sentence-atom (:body response)))))

(defn thing
  []
  [:section.snake
   [:div.row
    [:div.small-8.columns
     [:input {:type "button"
              :value "Next"
              :on-click fetch-sentence}]]]])

(defn swap-selection
  [selection]
  (case selection
    :english :italian
    :italian :english))

(defn app
  []
  (let [sentence @sentence-atom
        selection @selection-atom]
    (if (nil? sentence)
      [:h1 "Loading"]
      [:div
       [:section#thing {:on-click #(swap! selection-atom swap-selection)}
        [:div.row
         [:div.large-12.columns.centered-text
          [:h1 (selection sentence)]]]]
       (thing)])))

(defn start
  []
  (fetch-sentence)
  (reagent/render-component
   [app]
   (.getElementById js/document "app")))

(start)
