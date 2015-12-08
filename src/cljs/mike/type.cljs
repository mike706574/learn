(ns mike.type
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [mike.misc :as m]
            [mike.state :as s]
            [mike.page :as p]
            [mike.http :refer [fun-client] :as h]
            [mike.table :as t]
            [mike.browser :as b]
            [mike.component :as c]
            [clojure.string :refer [blank? capitalize]]
            [reagent.core :as r]
            [mike.entity.api :as api]
            [cljs.core.async :refer [<!]]
            [mike.entity.http :refer [HttpEntityRepo]]))

(enable-console-print!)

(def repo (atom nil))

(def empty-attribute {:id "" :label "" :schema "str" :description ""})

(defn delete-type!
  [state type-id]
  (s/batch! state [[s/Channel nil api/delete-type! [@repo type-id]]
                   [s/Channel :types api/get-types [@repo]]
                   [s/Merge {:error false
                             :body "Deleted type!"}]]))

(defn type-panel
  [state {:keys [id label description attributes]} selectable? deletable?]
  [:div.panel.panel-default
   {:key id} 
   [:div.panel-heading label] 
   [:div.panel-body
    [:p description]
    ;; TODO: replace table with list if it doesn't work well skinny screens
    (t/table2 attributes [[:property :label "Label"]
                          [:property :description "Description"]])
    (when deletable?
      [:button.btn.btn-danger
       {:type "button" :on-click #(delete-type! state id)} "Delete"])

    (when selectable?
      [:form.pull-right {:action "/current-type" :method "post"}
       [:input {:type "hidden" :name "type-id" :value id}]
       [:input.btn.btn-primary {:type "submit" :value "Select"}]])]])

(defn render-browse
  [state]
  (let [{:keys [types type-id error message]} @state
        current-type (get types type-id)] 
    (if current-type
      (let [current-type (get types type-id)
            other-types (vals (dissoc types type-id))]
        [:div {:style {"marginTop" "15px"}}
         [:h4 "Current Type"]
         [:p "This is the type you currently have selected."]
         (type-panel state (get types type-id) false false)
         [:h4 "Other Types"]
         (if (empty? other-types)
           [:p "There aren't any other types!"]
           [:p "These are the other types."])
         (for [type other-types] (type-panel state type true true))])
       (if (empty? types)
         [:div {:style {"marginTop" "15px"}} [:p "There are no types!"]]
         [:div {:style {"marginTop" "15px"}}
          (for [type (vals types)] (type-panel state type true true))]))))
       
(defn create-type!
  [state]
  (s/batch! state [[s/Channel nil api/create-type! [@repo :new-type]]
                   [s/Function :body str ["Created type " [:new-type :label] "!"]]
                   [s/Merge {:error false
                             :new-type {}}]
                   [s/Channel :types api/get-types [@repo]]
                   [s/SetMode :browse]]))

(defn render-create
  [state]
  (let [{:keys [new-type error message]} @state
        {:keys [id label description attributes]} new-type]
    [:div {:style {"marginTop" "15px"}} 
     [:p "Enter this stuff and add some attributes!"]
     [:form {:role :form}  
      [:div.form-group
       [:label {:for :label} "Label"]
       [:input.form-control
        {:type :text
         :placeholder "Label"
         :value label
         :required true
         :on-change #(s/set-in! state [:new-type :label] (b/get-value %))}]]
      [:div.form-group
       [:label {:for :description} "Description"]
       [:input.form-control
        {:type :text
         :placeholder "Description"
         :value description
         :required true
         :on-change #(s/set-in! state [:new-type :description] (b/get-value %))}]]
      (if (empty? attributes)
        [:h4 "No attributes."]
        [:div
         (doall
          (for [index (range (count attributes)) ]
            (let [{:keys [id label description schema]} (nth attributes index)]
              [:div.panel.panel-default {:key index}
               [:div.panel-heading (str "Attribute #" (inc index))]
               [:div.panel-body 
                [:div.form-group
                 [:label {:for :label} "Identifier"]
                 [:input.form-control
                  {:type :text
                   :name :id
                   :placeholder "Identifier"
                   :required true
                   :value id
                   :on-change #(s/set-in! state [:new-type :attributes index :id] (b/get-value %))}]]
                [:div.form-group
                 [:label {:for :label} "Label"]
                 [:input.form-control
                  {:type :text
                   :name :label
                   :placeholder "Label"
                   :value label
                   :on-change #(s/set-in! state [:new-type :attributes index :label] (b/get-value %))}]] 
;;                 [:div.form-group
;;                  [:label {:for :schema} "Schema"]
;;                  [:select.form-control
;;                   {:key :schema
;;                    :id :schema
;;                    :on-change #(s/set-in! state [:new-type :attributes index :schema] (b/get-value %))}
;;                   [:option {:value "str"} "String"]
;;                   [:option {:value "int"} "Integer"]]]
                [:div.form-group
                 [:label {:for :description} "Description"]
                 [:input.form-control
                  {:type :text
                   :name :description
                   :placeholder "Description"
                   :value description
                   :on-change #(s/set-in! state [:new-type :attributes index :description] (b/get-value %))}]]
                [:button.btn.btn-danger
                 {:type "button"
                  :on-click #(s/swap-in!
                              state
                              [:new-type :attributes]
                              (fn [x] (m/remove-by-index x index)))} "Delete"]]])))])
      [:div.button-group {:style {"marginBottom" "25px"}}
       [:input.btn.btn-default {:type "button"
                                :value "Add Attribute" 
                                :on-click #(s/swap-in!
                                            state
                                            [:new-type :attributes]
                                            (fn [x] (into [] (conj x empty-attribute))))}]
       [:input.btn.btn-primary.pull-right {:type "submit"
                                           :value "Create" 
                                           :on-click (fn [e]
                                                       (.preventDefault e)
                                                       (create-type! state))}]]]]))
(defn app
  [api-url username type-id]
;;  (println "Initializing... " {:api-url api-url :username username :type-id type-id})
  (reset! repo (HttpEntityRepo. api-url username "friend"))
  (let [state (r/atom {:user username
                       :mode :browse
                       :new-type {}
                       :type-id (keyword (str type-id))
                       :modes {:browse {:title "Types" :label "Types" :render render-browse}
                               :create {:title "Create" :label "Create Type" :render render-create}}})]
    (s/batch! state [[s/Channel :types api/get-types [@repo]]
                     [s/Value :loading false]])
    (fn []
;;      (println "Rendering...")
      (p/page2 state "Types"))))

(defn ^:export start [api-url username type-id]
;;  (println "Starting app...")
  (r/render [(partial app api-url username type-id)] (js/document.getElementById "page-wrapper")))

(defn ^:export reload []
;;  (println "Reloading app...") 
  (r/render [(partial app "http://localhost:8080/api/" "mike" 1)] (js/document.getElementById "page-wrapper")))
