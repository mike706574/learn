(ns mike.common.component
  (:require [reagent.core :as reagent]
            [mike.common.state :refer [swap-in!]]
            [clojure.string :refer [blank? capitalize]]))

;; TODO: where do i belong?
(defn get-value [e] (-> e .-target .-value))
            
(defn- build-option
  [e]
  (let [k (key e)]
    [:option {:key k :value k} (val e)]))

(defn fun-select
  [f options selected]
  [:select {:on-change #(f (get-value %)) :value selected}
   (map build-option options)])

(defn on-change-select
  [on-change options]
  [:select {:on-change on-change}
   (map build-option options)])

(defn button
  [id label f]
  [:input {:type "button"
           :id id
           :value label
           :on-click f}])

(defn navigation-buttons
  [page-number page-count show-fn]
  (when (not= 0 page-count) 
    [:div
     (when (not= 1 page-number)
       [:input {:type "button" :value "First" :on-click #(show-fn 1)}])
     (when (< 1 page-number)
       [:input {:type "button" :value "Previous" :on-click #(show-fn (dec page-number))}])
     (when (not= page-number page-count)
       [:input {:type "button" :value "Next" :on-click #(show-fn (inc page-number))}])
     (when (not= page-number page-count)
       [:input {:type "button" :value "Last" :on-click #(show-fn page-count)}])]))

;; (defn flip-box
;;   [yak selected sentence flip next]
;;   (let [info nil
;;         title (:name info)
;;         label (get-label selected (:languages info))]
;;     [:div
;;      [:h2 title]
;;      [:h5 label]
;;      [:p (selected sentence)]
;;      [:div
;;       [:input {:type "button" :value "Flip" :on-click flip}]
;;       [:input {:type "button" :value "Next" :on-click next}]]]))

;; (defn flip-box2
;;   [title selected selected-name options flip next]
;;   [:div
;;    [:h2 title]
;;    [:span selected-name]
;;    [:div [:span (selected options)]]
;;    [:div
;;     [:input {:type "button" :value "Flip" :on-click flip}]
;;     [:input {:type "button" :value "Next" :on-click next}]]])

(defn text-box
  [state k]
  [:input {:type "text"
           :id k
           :value (k @state)
           :on-change #(swap! state assoc k (get-value %))}])

(defn label
  [target]
  [:label {:for target}
   (str (capitalize (name target)) ": ")])

(defn text-box-in
  [state id ks] 
  [:input {:type "text"
           :id id
           :value (get-in @state ks)
           :on-change #(swap! state assoc-in ks (get-value %))}])

(defn table
  [rows columns]
  [:table
   [:thead
    [:tr
     (for [column columns]
       (let [type (first column)
             k (second column)
           label (str (capitalize (name k)))]
         [:th {:key k} label]))]]
   [:tbody
    (for [row rows]
      [:tr {:key (:id row)}
       (for [column columns]
         (let [type (first column)
               k (second column)]
           [:td {:key k}
            (case type
              :property (k row) 
              :action (let [label (nth column 2)
                            f (nth column 3)
                            template (nth column 4) 
                            args (map #(if (keyword? %) (% row) %) template)]
                        (button k label #(apply f args))))]))])]])

(defn form
  [state form-key validated-properties]
  [:form
   (doall
    (for [[k property] validated-properties]
      (let [{:keys [value dirty? valid? type] :or {type :text}} property
            number? (= type :number)
            empty-number? (and number? dirty? (blank? value))
            invalid? (and dirty? (not valid?))
            class (if (or invalid? empty-number?) "invalid" "")]
        [:div {:key k}
         (label k)
         [:input {:type type :id k :name k :value value :class class
                  :on-change #(swap-in! state [form-key k] assoc :dirty? true
                                                                 :value (get-value %))}]])))])
                                                               
(defn app
  [state header modes]
  (let [{:keys [error loading message mode]} @state]
    [:div
     header
     (when error [:h3 "Error!"])
     (when message [:span message])
     (if loading
       [:span "Loading..."]
       (let [f (modes mode)]
        (f state)))]))
      
(defn boot 
  [component id]
  (fn []
    (reagent/render-component 
      [component] 
      (.getElementById js/document id))))
