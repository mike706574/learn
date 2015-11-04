(ns mike.lesson.core
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [mike.common.misc :as misc]
            [mike.common.state :refer [loading! commit! done! error! fatal! in-order!]]
            [mike.common.component :as com]
            [mike.common.cookies :as cookies]
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
                             :validate misc/not-blank?}
                      :description {:value ""
                                    :dirty? false
                                    :validate misc/not-blank?}
                      :length {:value "10"
                               :dirty? false
                               :type :number
                               :validate misc/is-number?}})

(defn load-lessons!
  [state type-id]
  (go
    (let [{:keys [status body message]} (<! (api/get-lessons repo type-id))]
      (if (misc/ok? status)
        (done! state :type-id type-id :lessons body)
        (error! state message)))))

(defn get-blank-entity
  [type]
  (let [attributes (:attributes type)]
    (misc/mapm (fn [attribute]
                [(:id attribute) {:value "" :dirty? false :validate misc/not-blank?}]) attributes)))

(defn get-lesson-template
  [type-id types]
  (let [type (types type-id)
        attributes (:attributes type)
        options (misc/mapm (fn [{:keys [id label]}] [id label]) attributes)]
    (assoc lesson-template :start {:value ""
                                   :dirty? false
                                   :type :select
                                   :options options})))

(defn load-type!
  [state type-id]
  (loading! state)
  (go
    (let [types (:types @state)
          type (types type-id)
          new-entity (get-blank-entity type)
          new-lesson (get-lesson-template type-id types)]
      (commit! state :type-id type-id :type type :new-entity new-entity :new-lesson new-lesson)
      (load-lessons! state type-id))))

(defn load-types!
  [state]
  (go
    (let [{:keys [status body message]} (<! (api/get-types repo))]
      (if (misc/ok? status)
        (if (empty? body)
          (fatal! state "No types!")
          (let [type-id (keyword (:id (val (first body))))]
            (commit! state :types body)
            (load-type! state type-id)))
        (error! state message)))))

(defn go-create-lesson!
  [repo type-id lesson]
  (let [lesson (misc/fmap :value lesson)
        lesson (if (blank? (:start lesson))
                 (dissoc lesson :start)
                 lesson)]
    (api/create-lesson! repo type-id lesson)))

(defn create-lesson!
  [state]
  (in-order!
   state
   [[:creating-lesson true]
    [:created-lesson go-create-lesson! [repo :type-id :new-lesson]]
    [:new-lesson get-lesson-template [:type-id :types] :no-channel]
    [:lessons api/get-lessons [repo :type-id]]
    [:creating-lesson false]]))

(defn delete-lesson!
  [state lesson-id]
  (loading! state)
  (go
    (let [type-id (:type-id @state)
          {:keys [status body message]} (<! (api/delete-lesson! repo type-id lesson-id))]
      (if (misc/ok? status)
        (load-lessons! state type-id)          
        (error! state message)))))

(defn view-lesson!
  [state lesson-id]
  (loading! state)
  (go
    (let [type-id (:type-id @state)
          {:keys [status body message]} (<! (api/get-lesson repo type-id lesson-id))]
      (if (misc/ok? status)
        (done! state :mode :view :lesson-id lesson-id :lesson body)
        (error! state message)))))

(defn remove-from-lesson!
  [state entity-id]
  (loading! state)
  (go (let [{:keys [type-id lesson-id]} @state
            {:keys [status body message]} (<! (api/remove-from-lesson! repo type-id lesson-id entity-id))]
        (if (misc/ok? status)
          (view-lesson! state lesson-id)
          (error! state message)))))

;; views

(defn page-header
  [title]
   [:div.row
    [:div.col-lg-12
     [:h1.page-header title]]])

(defn render-lessons
  [state]
  (let [{:keys [type-id types lessons creating-lesson]} @state]
    [:div.container-fluid
     (page-header "Lessons")
     [:p "TODO: Move type selection somewhere else"]
     (com/fun-select #(load-type! state %) (misc/fmap :label types) type-id) 

     (com/form2 state "Create a Lesson" "Create" :new-lesson create-lesson!)
     (when creating-lesson
       [:p "Creating lesson..."]) 
     [:h3 "Lessons"]
     (if (empty? lessons)
       [:span "No lessons stored."]
       (com/table lessons [[:property :id "ID"]
                           [:property :name "Name"]
                           [:property :user "Creator"]
                           [:property :description "Description"]
                           [:property :length "Length"]
                           [:action :delete "Delete" delete-lesson! [state :id]]
                           [:action :view "View" view-lesson! [state :id]]]))]))

(defn add-to-lesson!
  [state entity-id lesson-id]
  (loading! state)
  (go
    (let [type-id (:type-id @state)
          {:keys [status body message]} (<! (api/add-to-lesson! repo type-id lesson-id entity-id))]
      (if (misc/ok? status) 
        (view-lesson! state lesson-id)
        (error! state message)))))

(defn add-entity!
  [state]
  (loading! state)
  (go
    (let [{:keys [type-id new-entity types page-number lesson-id]} @state
          new-entity (misc/fmap :value new-entity)]
      (let [{:keys [status body message]} (<! (api/add-entity! repo type-id new-entity))]
        (if (misc/ok? status)
          (let [blank-entity (get-blank-entity (type-id types))]
            (commit! state :new-entity blank-entity)
            (add-to-lesson! state (:id body) lesson-id))
          (error! state message))))))

(defn render-lesson
  [state]
  (println "RENDERING LESSON!!!")
  (let [{:keys [type-id lesson entities lesson-id type] :as current-state} @state
        attributes (:attributes type)
        columns (concat [[:property :id]]
                        (mapv (fn [attr] [:property (keyword (:id attr))]) attributes)
                        [[:action :delete "Remove" remove-from-lesson! [state :id]]])
        {:keys [name start length entities]} lesson]
    (println "START:" start "LENGTH:" length)
    [:div.container-fluid
     (page-header (str "Lesson: " name)) 
     (com/button :to-sessions "Back to Lessons" #(commit! state :mode :browse)) 
     (com/form2 state "Add an entity" "Add" :new-entity add-entity!)
     [:div.row 
        [:div.col-lg-12
         [:h3 "Entities"]
         (if (empty? entities)
           [:p "No entities."]
           (com/table entities columns))]]]))

(defn redirect!
  [url]
  (-> js/document .-location
      (set! url)))

(defn app
  [username]
  (println "Initializing...") 
  (let [logged-in? (cookies/get :logged-in)
        username (cookies/get :username)]
    (when (or (not logged-in?) (not username))
      (redirect! "/login")) 
    (let [state (reagent/atom {:user username
                               :mode :browse
                               
                               :new-lesson lesson-template
                               :loading true})] 
      (load-types! state)
      (fn []
        (println "Rendering...")
        (com/full-app state
                      username
                      {:browse render-lessons
                       :view render-lesson})))))

(def start (com/boot app "app"))


;; (defn init
;;   [state]
;;   (load-types! state)
;;   (swap! state assoc :mode browse :new-lesson lesson-template))

;; (def start #(com/boot2 "app" init {:browse render-lessons
;;                                    :view render-lesson}))
