(ns mike.flip
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require ;;[lang.sentence.api :refer [SentenceRepo] :as api]
            ;;[lang.sentence.factory :refer [build-sentence-repo]]
            [reagent.core :as reagent]
            [cljs-http.client :as http]
            [cljs.core.async :refer [<!]]))

(enable-console-print!)
;;(def path "http://mike.elasticbeanstalk.com/api/sentence")
(def path "http://localhost:8080/api/sentence")

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
(def start-atom (reagent/atom :english))

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
  (println "HI MOM")
  (go (let [response (<! (http/get path {:query-params {"lp" "en-it"}}))]
        (swap! state (partial new-sentence (:body response))))))

(defn thing
  [sentence]
  [:section.snake
   [:div.row
    [:div.small-8.columns
     [:input {:type "button"
              :value "Next"
              :on-click fetch-sentence}]
     [:p (str "This is sentence #" (:id sentence))]]]])

(defn swap-selection
  [selection]
  (case selection
    :english :italian
    :italian :english))

(defn app
  []
  (let [my-state @state
        {:keys [sentence selected loading]} @state]
    (println my-state)
    [:div
     [:section#thing {:on-click (fn [e] (when (not loading)
                                          (swap! state swap-selection)))}
      [:div.row
       [:div.large-12.columns.centered-text
        [:h1 (selected sentence)]]]]
     [:section.snake
      [:div.row
       [:div.small-8.columns
        [:input {:type "button"
                 :value "Next"
                 :on-click (fn [e] (when (not loading)
                                     (fetch-sentence)))}]
        [:p (str "This is sentence #" (:id sentence))]]]]]))

(defn start
  []
  (fetch-sentence)
  (reagent/render-component
   [app]
   (.getElementById js/document "app")))

;;(start)


