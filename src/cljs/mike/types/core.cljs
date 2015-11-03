(ns mike.types.core
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [mike.common.misc :as misc]
            [mike.common.state :refer [loading! commit! done! error! swap-in!]]
            [mike.common.component :as com]
            [mike.component :as xcom]
            [clojure.string :refer [blank? capitalize]]
            [reagent.core :as reagent]
            [mike.entity.api :as api]
            [cljs.core.async :refer [<!]]
            [mike.entity.http :refer [HttpEntityRepo]]))

(enable-console-print!)

(def repo (HttpEntityRepo. "http://localhost:8080/api/" "mike"))

(defn load-types!
  [state]
  (go
    (let [{:keys [status body]} (<! (api/get-types repo))]
      (if (misc/ok? status)
        (commit! state :types body)
        (error! state "ERROR!")))))

(defn delete-type!
  [state type-id]
  (go
    (let [{:keys [status body]} (<! (api/delete-type! repo type-id))]
      (if (misc/ok? status)
        (do
          (done! state :message (str "Deleted type: " type-id))
          (load-types! state))
        (error! state "ERROR!")))))

(defn render-types
  [state]
  (let [types (:types @state)]
    [:div
     (if (empty? types)
       [:h3 "NO TYPES"]
       [:div
        [:h3 "Types"] 
        [:ul
         (for [{:keys [label id description attributes] :as ok} (vals types)] 
           [:li {:key id}
            (com/button :delete "Delete Type" #(delete-type! state id))
            [:h4 label]
            [:ul
             [:li "ID: " id]
             [:li "Description: " description]
             [:li "Attributes"]
             [:ul
              (for [{:keys [id label schema description]} attributes]
                [:li {:key id}
                 [:h5 label]
                 [:ul 
                  [:li {:key :id} "ID: " id]
                  [:li {:key :label} "Label: " label]
                  [:li {:key :description} "Description: " description]
                  [:li {:key :schema} "Schema: " schema]]])]]])] 
        ])]))

(def empty-attribute
  {:id {:value ""}
   :label {:value ""}
   :schema {:value "str"}
   :description {:value ""}})

(defn remove-by-index [coll pos] (vec (concat (subvec coll 0 pos) (subvec coll (inc pos)))))

(defn all-values-not-blank?
  [m ks]
  (every? #(misc/not-blank? (% m)) ks))

(defn all-maps-not-blank?
  [ms ks]
  (every? #(all-values-not-blank? % ks) ms))

(defn invalid-attributes?
  [attributes]
  (some #(let [{:keys [id label schema description]} %]
           (or (blank? (:value (:id %)))
               (blank? (:value (:label %)))
               (blank? (:value (:schema %)))
               (blank? (:value (:description %))))) attributes))

(def attribute-props [:id :label :schema :description])

(defn dirty-attribute
  [attribute]
  (reduce #(assoc-in %1 [%2 :dirty?] true) attribute attribute-props))

(defn dirty-attributes
  [attributes]
  (mapv dirty-attribute attributes))

(defn create-type!
  [state]
  (go
    (let [{:keys [id label description attributes]} @state
          no-attributes? (empty? attributes)
          invalid-info? (some #(blank? (:value %)) [id label description])
          invalid? (or no-attributes? invalid-info? (invalid-attributes? attributes))]
      (if invalid?
        (commit!
         state
         :attributes (dirty-attributes attributes)
         :id (assoc id :dirty? true)
         :label (assoc label :dirty? true)
         :description (assoc description :dirty? true)
         :message (if no-attributes?
                    "YOU NEED ATTRIBUTES AND FILLED IN BOXES" "FILL IN THE RED BOXES"))
        (do
          (loading! state)
          (let [type-id (:value id)
                type {:id type-id
                      :label (:value label)
                      :description (:value description)
                      :attributes (map #(misc/fmap :value %) attributes)}
                {:keys [status body message]} (<! (api/create-type! repo type))]
            (if (misc/ok? status)
              (do
                (done! state :message (str "Created type: " type-id)
                       :id (:value "")
                       :label  (:value "")
                       :description (:value "")
                       :attributes []
                       )
                (load-types! state))
              (error! state message))))))))

(defn attribute-input
  [state index k label]
  (let [{:keys [value dirty?]} (k (get (:attributes @state) index))
        class (if (and dirty? (blank? value)) "invalid" "")]
    [:div {:key k}
     (com/label k label)
     [:input {:type :text :id k :name k :value value :class class
              :on-change #(swap-in!
                         state
                         [:attributes index k]
                         (fn [x]
                           (assoc x :value (com/get-value %) :dirty? true)))}]]))

(defn blank-class
  [value dirty?]
  (if (and dirty? (blank? value)) "invalid" ""))

(defn render-things
  [state]
  (let [{:keys [attribute-index id label description attributes]} @state]
    (println attributes)
    [:div
     [:div
      (let [{:keys [value dirty?]} id]
        [:div
         (com/label :id "ID")
         [:input {:type :text :id :label :name :id :value value :class (blank-class value dirty?)
                  :on-change #(swap! state assoc :id {:value (com/get-value %) :dirty? true})}]]) 
      (let [{:keys [value dirty?]} label]
        [:div
         (com/label :label)
         [:input {:type :text :id :label :name :label :value value :class (blank-class value dirty?)
                  :on-change #(swap! state assoc :label {:value (com/get-value %) :dirty? true})}]]) 
      (let [{:keys [value dirty?]} description]
        [:div
         (com/label :description)
         [:input {:type :text :id :description :name :description :value value :class (blank-class value dirty?)
                  :on-change #(swap! state assoc :description {:value (com/get-value %) :dirty? true})}]])
      (if (empty? attributes)
        [:p "No attributes"]
        [:ul
         (doall
          (for [index (range (count attributes))]
            [:li {:key index}
             (attribute-input state index :id "ID")
             (attribute-input state index :label "Label")
             [:div
              (com/label :schema "Schema")
              [:select {:on-change #(swap-in! state [:attributes index] assoc :schema
                                              {:value (com/get-value %) :dirty? true})}
               [:option {:value "str"} "String"]
               [:option {:value "int"} "Integer"]]]
             (attribute-input state index :description "Description")
             (com/button
              :delete-attribute
              "Delete"
              #(swap! state update :attributes
                      (fn [x] (remove-by-index x index))))]))])
      (com/button :add-attribute "Add Attribute" #(swap! state update :attributes
                                                         (fn [x] (conj x empty-attribute))))
      [:br]]
      (com/button :create "Create Type" #(create-type! state))]))

(defn app
  []
  (println "Initializing...")
  (let [state (reagent/atom {:mode :add
                             :attributes []})]
    (load-types! state)
    (fn []
      (println "Rendering...")
      (com/tabs state xcom/nav {:add render-things
                                :view render-types}))))
                             
 (def start (com/boot app "app"))
