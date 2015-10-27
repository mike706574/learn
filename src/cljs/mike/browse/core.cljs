(ns mike.browse.core
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [mike.common.core :as joe]
            [mike.common.state :refer [loading! commit! done! error! swap-in!]]
            [mike.component :as component]
            [lang.entity.api :as api]
            [clojure.string :refer [blank? capitalize]]
            [reagent.core :as reagent]
            [cljs.core.async :refer [<!]]
            [lang.entity.http :refer [HttpEntityRepo]])) 

(enable-console-print!)

;; TODO: why keep this as state?
(def repo (HttpEntityRepo. "http://localhost:8080/api/" "mike"))

(defn get-type [type-id types] (joe/find-first #(= type-id (:id %)) types))

(defn get-blank-entity
  [type-id types]
  (let [attributes (:attributes (get-type type-id types))]
    (joe/mapm (fn [attribute]
                [(:id attribute) {:value "" :dirty? false :validate joe/not-blank?}]) attributes)))

(defn load-page!
  [state type-id page-number]
  (loading! state)
  (println "Trying to load page" page-number "for type ID" type-id)
  (go
    (let [{:keys [status body message]} (<! (api/count-entities repo type-id))]
      (if (joe/ok? status)
        (if (= body 0)
          (done! state :type-id type-id :page-number 1 :entity-count 0)
          ;; this is logic and should be refactored out and tested
          (let [page-size (:page-size @state)
                entity-count body
                start (+ page-number (* (dec page-number) (dec page-size)))
                end (dec (+ start page-size))
                end (min entity-count end)
                {:keys [status body message]} (<! (api/get-entity-range repo type-id start end))]
            (if (joe/ok? status)
              (done! state :type-id type-id :page-number page-number :entity-count entity-count :entities body)
              (error! state message))))
        (error! state message)))))

(defn load-type!
  [state type-id]
  (loading! state)
  (go
    (let [types (:types @state)
          new-entity (get-blank-entity type-id types)]
      (commit! state :type-id type-id :new-entity new-entity )
      (load-page! state type-id 1))))

(defn load-types!
  [state]
  (loading! state)
  (go
    (let [{:keys [status body message]} (<! (api/get-types repo))]
      (if (joe/ok? status)
        (let [type-id (:id (first body))
              types body]
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
      (if (joe/ok? status) 
        (load-page! state type-id 1)
        (error! state message)))))

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
          new-entity (joe/fmap :value new-entity)]
      (let [{:keys [status body message]} (<! (api/add-entity! repo type-id new-entity))]
        (if (joe/ok? status)
          (let [blank-entity (get-blank-entity type-id types)]
            (commit! state :new-entity blank-entity)
            (load-page! state type-id page-number))
          (error! state message))))))

(defn load-lessons!
  [state entity-id]
  (loading! state)
  (go
    (let [type-id (:type-id @state)
          {:keys [status body message]} (<! (api/get-lessons repo type-id))]
      (if (joe/ok? status)
        (done! state :lessons body :mode :lesson :entity-id entity-id)
        (error! state message)))))

(defn validate-property
  [{:keys [value type required validate] :as property}] 
  (assoc property :valid? (validate value)))

(defn render-browse
  [state]
  (let [{:keys [type-id types page-number entities new-entity page-size entity-count] :as current-state} @state
        {:keys [label attributes]} (get-type type-id types)
        page-count (get-page-count entity-count page-size)
        type-options (joe/mapm (fn [{:keys [id label]}] [id label]) types)
        [validated-entity all-valid?] (joe/validate-form new-entity)]
    [:div
     (joe/fun-select #(load-page! state % 1) type-options type-id)
     [:h3 "Add: " label]
     (joe/render-form state :new-entity validated-entity)
     [:input {:type "button"
              :id :create
              :disabled (not all-valid?) 
              :value "Add"
              :on-click #(do (println "HEY HEY")
                             (add-entity! state))}]
     [:h2 label]
     (if (= 0 page-count)
       [:p "No entities stored."]
       [:div
        [:p (str "Total: " entity-count)]
        [:p (str "Page " page-number " of " page-count)]
        [:table
         [:thead
          [:tr
           (let [left [[:th {:key :id} "ID"]
                       [:th {:key :user} "User"]]
                 mid (into [] (for [{:keys [id label]} attributes]
                                [:th {:key id} label])) 
                 right [[:th {:key :delete} "Delete"]]]
             (concat left mid right))]]
         [:tbody
          (for [{:keys [id user] :as entity} entities]
            [:tr {:key id}
             (let [left [[:td {:key :id} id]
                         [:td {:key :user} user]]
                   mid (into [] (for [attribute attributes]
                                  [:td {:key (:id attribute)}
                                   (get entity (keyword (:id attribute)))]))
                   right [[:td {:key :delete} (joe/button :delete "Delete" #(delete-entity! state id))]
                          [:td {:key :add-to-lesson} (joe/button :delete "Add to Lesson" #(load-lessons! state id))]

                          ]]
               (concat left mid right))])]]
        (joe/navigation-buttons page-number page-count (partial load-page! state type-id))])]))

(defn add-to-lesson!
  [state entity-id lesson-id]
  (loading! state)
  (go
    (let [type-id (:type-id @state)
          {:keys [status body message]} (<! (api/add-to-lesson! repo type-id lesson-id entity-id))]
      (if (joe/ok? status) 
        (done! state :mode :browse)
        (error! state message)))))

(defn render-lessons
  [state]
  (let [{:keys [entity-id lessons]} @state]
    (if (empty? lessons)
      [:span "No lessons stored."]
      (joe/render-table
       lessons [[:property :id]
                [:property :user]
                [:property :description]
                [:property :length]
                [:action :add-to-lesson "Add to Lesson" add-to-lesson! [state entity-id :id]]]))))

(defn render
  [state]
  (let [{:keys [error loading message mode]} @state]
    [:div
     component/nav
     (when error [:h3 "Error!"])
     (when message [:span message])
     (if loading
       [:span "Loading.."]
       (case mode
         :browse (render-browse state)
         :lesson (render-lessons state)))]))

(defn app
  []
  (println "Initializing...")
  (let [state (reagent/atom {:page-number 1 :page-size 10
                             :mode :browse
                             :loading true})]
    (load-types! state)
    (fn []
      (println "Rendering...")
      (render state))))

(defn start
  []
  (reagent/render-component
   [app]
   (.getElementById js/document "app")))
