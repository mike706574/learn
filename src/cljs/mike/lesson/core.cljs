(ns mike.lesson.core
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [mike.common.core :as joe]
            [mike.common.state :refer [loading! commit! done! error! fatal!]]
            [mike.common.component :as com]
            [mike.component :as xcom]
            [mike.entity.api :as api]
            [reagent.core :as reagent]
            [clojure.string :refer [blank? capitalize]]
            [cljs.core.async :refer [<!]]
            [mike.entity.http :refer [HttpEntityRepo]]))

(enable-console-print!)

(def repo (HttpEntityRepo. "http://localhost:8080/api/" "mike"))

(def lesson-template {:name {:value ""
                             :dirty? false
                             :validate joe/not-blank?}
                      :description {:value ""
                                    :dirty? false
                                    :validate joe/not-blank?}
                      :length {:value "10"
                               :dirty? false
                               :type :number
                               :validate joe/is-number?}})

(defn load-lessons!
  [state type-id]
  (go
    (let [{:keys [status body message]} (<! (api/get-lessons repo type-id))]
      (if (joe/ok? status)
        (done! state :type-id type-id :lessons body)
        (error! state message)))))

(defn get-blank-entity
  [type]
  (let [attributes (:attributes type)]
    (joe/mapm (fn [attribute]
                [(:id attribute) {:value "" :dirty? false :validate joe/not-blank?}]) attributes)))

(defn get-blank-entity
  [type-id types]
  (get-blank-entity (get-type type-id types)))

(defn get-type
  [type-id types]
  (get types (keyword type-id)))

(defn load-type!
  [state type-id]
  (loading! state)
  (go
    (let [new-entity (get-blank-entity type (:types @state))] 
      (commit! state :type-id type-id :type type :new-entity new-entity)
      (load-lessons! state type-id))))

(defn load-types!
  [state]
  (go
    (let [{:keys [status body message]} (<! (api/get-types repo))]
      (if (joe/ok? status)
        (if (empty? body)
          (fatal! state "No types!")
          (let [type-id (keyword (:id (val (first body))))]
            (commit! state :types body)
            (load-type! state type-id)))
        (error! state message)))))

(defn create-lesson!
  [state]
  (loading! state)
  (go
    (let [{:keys [type-id new-lesson length]} @state
          ;; TODO: this sucks
          name (:value (:name new-lesson))
          description (:value (:description new-lesson))
          length (:value (:length new-lesson))
          {:keys [status body]} (<! (api/create-lesson! repo type-id name description length))]
      (if (joe/ok? status)
        (do (commit! state :new-lesson lesson-template)
            (load-lessons! state type-id))          
        (swap! state assoc :error true)))))

(defn delete-lesson!
  [state lesson-id]
  (loading! state)
  (go
    (let [type-id (:type-id @state)
          {:keys [status body message]} (<! (api/delete-lesson! repo type-id lesson-id))]
      (if (joe/ok? status)
        (load-lessons! state type-id)          
        (error! state message)))))

(defn view-lesson!
  [state lesson-id]
  (loading! state)
  (go
    (let [type-id (:type-id @state)
          {:keys [status body message]} (<! (api/get-lesson repo type-id lesson-id))]
      (if (joe/ok? status)
        (done! state :mode :view :lesson-id lesson-id :lesson body)
        (error! state message)))))

(defn remove-from-lesson!
  [state entity-id]
  (loading! state)
  (go (let [{:keys [type-id lesson-id]} @state
            {:keys [status body message]} (<! (api/remove-from-lesson! repo type-id lesson-id entity-id))]
        (if (joe/ok? status)
          (view-lesson! state lesson-id)
          (error! state message)))))
;; views
(defn render-lessons
  [state]
  (println "render lessons")
  (let [{:keys [type-id types lessons] :as current-state} @state]
    [:div
     (com/fun-select #(load-type! state %) (joe/fmap :label types) type-id)
     (com/fun-form state "Create a Lesson" :new-lesson create-lesson!)
     [:h3 "Lessons"]
     (if (empty? lessons)
       [:span "No lessons stored."]
       (com/table lessons [[:property :id]
                           [:property :user]
                           [:property :description]
                           [:property :length]
                           [:action :delete "Delete" delete-lesson! [state :id]]
                           [:action :view "View" view-lesson! [state :id]]]))]))

(defn add-to-lesson!
  [state entity-id lesson-id]
  (loading! state)
  (go
    (let [type-id (:type-id @state)
          {:keys [status body message]} (<! (api/add-to-lesson! repo type-id lesson-id entity-id))]
      (if (joe/ok? status) 
        (view-lesson! state lesson-id)
        (error! state message)))))

(defn add-entity!
  [state]
  (loading! state)
  (go
    (let [{:keys [type-id new-entity types page-number lesson-id]} @state
          new-entity (joe/fmap :value new-entity)]
      (let [{:keys [status body message]} (<! (api/add-entity! repo type-id new-entity))]
        (if (joe/ok? status)
          (let [blank-entity (get-blank-entity (type-id types))]
            (commit! state :new-entity blank-entity)
            (add-to-lesson! state (:id body) lesson-id))
          (error! state message))))))

(defn render-lesson
  [state]
  (let [{:keys [type-id lesson entities lesson-id type] :as current-state} @state
        attributes (:attributes type)
        columns (concat [[:property :id]]
                        (mapv (fn [attr] [:property (keyword (:id attr))]) attributes)
                        [[:action :delete "Remove" remove-from-lesson! [state :id]]])]
    [:div 
     (com/fun-form state "Add an entity to the lesson dude" :new-entity add-entity!)
     (com/table (:entities lesson) columns)]))

(defn app
  []
  (println "Initializing...")
  (let [state (reagent/atom {:user "mike"
                             :mode :browse
                             :new-lesson lesson-template
                             :loading true})]
    (load-types! state)
    (fn []
      (println "Rendering...")
      (com/app state xcom/nav {:browse render-lessons
                               :view render-lesson}))))

(def start (com/boot app "app"))
