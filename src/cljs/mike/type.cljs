(ns mike.type
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [mike.misc :as m]
            [mike.state :as s]
            [mike.page :as p]
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

;; todo: make this work!
(def schema-options {"str" "String"
                     "int" "Integer"})

(def attribute-template
  {:id {:value "" :label "ID" :type :text}
   :label {:value "" :label "Label" :type :text}
   :description {:value "" :label "Description" :type :text}
   :schema {:value "" :label "Schema" :type :select :options schema-options}})

(def type-template {:id {:value "" :label "ID" :type :text}
                    :label {:value "" :label "Label" :type :text}
                    :description {:value "" :label "Description" :type :text}
                    :attributes {:value [] :label "Attributes" :type :list :template attribute-template}})
;; end

(def empty-attribute {:id "" :label "" :schema "str" :description ""})

(defn delete-type!
  [state type-id]
  (s/batch! state [[s/Channel nil api/delete-type! [@repo type-id]]
                   [s/Channel :types api/get-types [@repo]]
                   [s/Value :message "Deleted type!"]]))

(defn render-browse
  [state]
  (let [{:keys [types error message]} @state]
    [:div
     (if (empty? types)
       [:h4 {:style {:marginTop "15px"}} "No types."]
       (t/table2 (vals types) [[:property :id "ID"]
                               [:property :label "Name"]
                               [:property :description "Description"]
                               [:property #(count (:attributes %)) "Attributes" ]
                               [:action :delete "Delete" delete-type! [state :id]]]))]))

(defn create-type!
  [state]
  (s/batch! state [[s/Channel nil api/create-type! [@repo :new-type]]
                   [s/Value :message "Created type."]]))

(defn render-create
  [state]
  (let [{:keys [new-type error message]} @state
        {:keys [id label description attributes]} new-type]
    [:div
     [:h3 "Info"]
     [:form {:role :form}
      [:div.form-group
       [:label {:for :id} "Identifier"]
       [:input.form-control
        {:type :text
         :name :id
         :placeholder "Identifier"
         :value id
         :required true
         :on-change #(s/set-in! state [:new-type :id] (b/get-value %))}]] 
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
      [:h3 "Attributes"]
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
                [:div.form-group
                 [:label {:for :schema} "Schema"]
                 [:select.form-control
                  {:key :schema
                   :id :schema
                   :on-change #(s/set-in! state [:new-type :attributes index :schema] (b/get-value %))}
                  [:option {:value "str"} "String"]                 [:option {:value "int"} "Integer"]]]
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
  [api-url username]
  (println "Initializing... " (str "{:api-url " api-url " :username" username "}"))
  (reset! repo (HttpEntityRepo. api-url "mike"))
  (let [state (r/atom {:user username
                       :mode :browse
                       :new-type {}
                       :modes {:browse {:title "Browse" :label "Browse" :render render-browse}
                              :create {:title "Create" :label "Create" :render render-create}}})]
    (s/single! state :types api/get-types [@repo])
    (fn []
      (println "Rendering...")
      (p/page2 state "Types"))))

(defn ^:export start [api-url username]
  (println "Starting app...")
  (r/render [(partial app api-url username)] (js/document.getElementById "page-wrapper")))

(defn ^:export reload []
  (println "Reloading app...")
  (r/render [(partial app "http://localhost:8080/" "mike")] (js/document.getElementById "page-wrapper")))
