(ns mike.browse.core
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [mike.common.misc :as misc]
            [mike.common.cookies :as cookies]
            [mike.common.state :refer [loading! commit! done! error! swap-in! in-order!]]
            [mike.common.component :as com]
            [mike.component :as xcom]
            [mike.entity.api :as api]
            [clojure.string :refer [blank? capitalize]]
            [reagent.core :as reagent]
            [cljs.core.async :refer [<!]]
            [mike.entity.http :refer [HttpEntityRepo]])) 

(enable-console-print!)

;; TODO: why keep this as state?
(def repo (HttpEntityRepo. "http://localhost:8080/api/" "mike"))

(defn get-blank-entity
  [type]
  (let [attributes (:attributes type)]
    (misc/mapm (fn [attribute]
                [(:id attribute) {:value "" :dirty? false :validate misc/not-blank?}]) attributes)))

(defn load-page!
  [state type-id page-number]
  (loading! state)
  (println "Trying to load page" page-number "for type ID" type-id)
  (go
    (let [{:keys [status body message]} (<! (api/count-entities repo type-id))]
      (if (misc/ok? status)
        (if (= body 0)
          (done! state :type-id type-id :page-number 1 :entity-count 0)
          ;; this is logic and should be refactored out and tested
          (let [page-size (:page-size @state)
                entity-count body
                start (+ page-number (* (dec page-number) (dec page-size)))
                end (dec (+ start page-size))
                end (min entity-count end)
                {:keys [status body message]} (<! (api/get-entity-range repo type-id start end))]
            (if (misc/ok? status)
              (done! state :type-id type-id :page-number page-number :entity-count entity-count :entities body)
              (error! state message))))
        (error! state message)))))

(defn load-type!
  [state type-id]
  (loading! state)
  (go
    (let [types (:types @state)
          type (type-id types)
          new-entity (get-blank-entity type)]
      (commit! state :type-id type-id :type type :new-entity new-entity )
      (load-page! state type-id 1))))

(defn load-types!
  [state]
  (loading! state)
  (go
    (let [{:keys [status body message]} (<! (api/get-types repo))]
      (if (misc/ok? status)
        (let [types body
              type-id (keyword (:id (val (first types))))]
          (if (empty? types)
            (error! state "dude add some types")
            (do (commit! state :types body)
                (load-type! state type-id)))) 
        (error! state message)))))

(defn delete-entity!
  [state entity-id]
  (loading! state)
  (go
    (let [type-id (:type-id @state)
          {:keys [status body message]} (<! (api/delete-entity! repo type-id entity-id))]
      (if (misc/ok? status) 
        (load-page! state type-id 1)
        (error! state message)))))

;; TODO: generic page count calculation
(defn get-page-count
  [entity-count page-size]
  (let [q (quot entity-count page-size)
        m (mod entity-count page-size)]
    (if (not= 0 m) (inc q) q)))

(defn add-entity!
  [state]
  (loading! state)
  (go
    (let [{:keys [type-id new-entity types page-number]} @state
          new-entity (misc/fmap :value new-entity)]
      (let [{:keys [status body message]} (<! (api/add-entity! repo type-id new-entity))]
        (if (misc/ok? status)
          (let [blank-entity (get-blank-entity (type-id types))]
            (commit! state :new-entity blank-entity)
            (load-page! state type-id page-number))
          (error! state message))))))

(defn load-lessons!
  [state entity-id]
  (loading! state)
  (go
    (let [type-id (:type-id @state)
          {:keys [status body message]} (<! (api/get-lessons repo type-id))]
      (if (misc/ok? status)
        (done! state :lessons body :mode :lesson :entity-id entity-id)
        (error! state message)))))


(defn load-entity!
  [state entity]
  (in-order! state [[:entity entity]
                    [:stats api/get-stats-for-user [repo :type-id [:entity :id] :user]]
                    [:mode :entity]]))

(defn render-browse
  [state]
  (let [{:keys [type-id types page-number entities page-size entity-count] :as current-state} @state
        {:keys [label attributes]} (type-id types)
        page-count (get-page-count entity-count page-size)
        type-options (misc/fmap :label types)]
    (println type-options)
    [:div
     (com/fun-select #(load-page! state % 1) type-options type-id)
     (com/fun-form state (str "Add: " label) :new-entity add-entity!)
     [:h2 label]
     (if (= 0 page-count)
       [:p "No entities stored."]
       [:div
        [:p (str "Total: " entity-count)]
        [:p (str "Page " page-number " of " page-count)]
        (let [columns (concat [[:property :id]]
                              (mapv #(vector :property (keyword (:id %))) attributes)
                              [[:action :delete "Delete" delete-entity! [state :id]]
                               [:action :add-to-lesson "Add to Lesson" load-lessons! [state :id]]
                               [:action :view "View" #(load-entity! state %)]])]
          (com/table entities columns))])]))
        
(defn add-to-lesson!
  [state entity-id lesson-id]
  (loading! state)
  (go
    (let [type-id (:type-id @state)
          {:keys [status body message]} (<! (api/add-to-lesson! repo type-id lesson-id entity-id))]
      (if (misc/ok? status) 
        (done! state :mode :browse)
        (error! state message)))))

(defn render-lessons
  [state]
  (let [{:keys [entity-id lessons]} @state]
    (if (empty? lessons)
      [:span "No lessons stored."]
      (com/table lessons [[:property :id]
                          [:property :user]
                          [:property :description]
                          [:property :length]
                          [:action :add-to-lesson "Add to Lesson" add-to-lesson! [state entity-id :id]]]))))

;; {:id x, :label x, :description x, :user mike, :created 11/01/2015 18:13:04, :attributes [{:id a, :label a, :description a, :schema str} {:id b, :label b, :description b, :schema str}]}

(defn render-entity
  [state]
  (let [{:keys [entity stats type]} @state
        {:keys [correct total]} stats
        {:keys [label attributes]} type
        {:keys [id created modified user]} entity]
    [:div
     (com/button :to-sessions "Back to Browse" #(commit! state :mode :browse))
     [:h2 "Type: " label]
     [:h2 "Entity: " id]
     [:p "Created by " user " at " created]
     [:p "Last modified at " modified]
     [:p correct " out of " total]
     [:h4 "Data:"]
     [:ul
      (doall
       (map (fn [attribute]
              (let [{id :id label :label} attribute
                    value (entity (keyword id))]
                [:li {:key id}
                 (str label ": " value)])) attributes))]
     

     ]

    ))

(defn app
  []
  (println "Initializing...")
  (let [state (reagent/atom {:page-number 1 :page-size 10
                             :mode :browse
                             :user (cookies/get :username)
                             :loading true})]
    (load-types! state)
    (fn []
      (com/app state xcom/nav {:browse render-browse
                               :lesson render-lessons
                               :entity render-entity}))))

 (def start (com/boot app "app"))
