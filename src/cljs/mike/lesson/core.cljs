(ns mike.lesson.core
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [mike.common.misc :as misc]
            [mike.common.state :refer [loading! commit! done! error! fatal! in-order! one!]]
            [mike.common.component :as com]
            [mike.common.cookies :as cookies]
            [mike.common.form :as form]
            [mike.common.entity :as monkey]
            [mike.entity.api :as api]
            [reagent.core :as reagent]
            [clojure.string :refer [blank? capitalize]]
            [cljs.core.async :refer [<!]]
            [mike.entity.http :refer [HttpEntityRepo]]))

(enable-console-print!)

(def repo (HttpEntityRepo. "http://localhost:8080/api/" "mike"))

(def lesson-template {:name {:value "" :label "Name" :type :text}
                      :description {:value "" :label "Description" :type :text}
                      :length {:value "10" :label "Length" :type :number :range [1 100]}})


(defn get-lesson-template
  [type]
  (let [attributes (:attributes type)
        options (misc/mapm (fn [{:keys [id label]}] [id label]) attributes)
        with-start (assoc lesson-template :start {:value ""
                                                  :label "Start"
                                                  :type :select
                                                  :optional? true
                                                  :options options})]
    (println "WS:" with-start)
    (misc/fmap #(assoc % :dirty? false) with-start)))

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
   [[:created-lesson go-create-lesson! [repo :type-id :new-lesson]]
    [:new-lesson get-lesson-template [:type] :no-channel]
    [:lessons api/get-lessons [repo :type-id]]]))

(defn load-initial!
  [state]
  (in-order! state [[:types api/get-types [repo]]
                    [:type-id #(key (first %)) [:types] :no-channel]
                    [:type #(%1 %2) [:type-id :types] :no-channel]
                    [:new-entity monkey/get-blank-entity [:type] :no-channel]
                    [:new-lesson get-lesson-template [:type] :no-channel]
                    [:lessons api/get-lessons [repo :type-id]]]))

(defn load-type!
  [state type-id]
  (in-order! state [[:type-id type-id]
                    [:new-entity monkey/get-blank-entity [:type-id] :no-channel]
                    [:new-lesson get-lesson-template [:type] :no-channel]
                    [:lessons api/get-lessons [repo :type-id]]]))

(defn delete-lesson!
  [state lesson-id]
  (in-order! state [[nil api/delete-lesson! [repo :type-id lesson-id]]
                    [:lessons api/get-lessons [repo :type-id]]]))

(defn view-lesson!
  [state lesson-id]
  (in-order! state [[:lesson-id lesson-id]
                    [:lesson api/get-lesson [repo :type-id :lesson-id]]
                    [:mode :view]]))

(defn remove-from-lesson!
  [state entity-id]
  (in-order! state [[:entity-id entity-id]
                    [nil api/remove-from-lesson! [repo :type-id :lesson-id :entity-id]]
                    [:lesson api/get-lesson [repo :type-id :lesson-id]]]))

(defn render-lessons
  [state]
  (let [{:keys [type-id types lessons creating-lesson]} @state]
    [:div.container-fluid
     (com/page-header state "Lessons")
     (com/fun-select #(load-type! state %) (misc/fmap :label types) type-id) 
     (form/cool state "Create a Lesson" "Create" :new-lesson create-lesson!)
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
          (let [blank-entity (monkey/get-blank-entity (type-id types))]
            (println "BE:" blank-entity)
            (commit! state :new-entity blank-entity)
            (add-to-lesson! state (:id body) lesson-id))
          (error! state message))))))

(defn render-lesson
  [state]
  (let [{:keys [type-id lesson entities lesson-id type error message new-entity] :as current-state} @state
        attributes (:attributes type)
        columns (concat [[:property :id]]
                        (mapv (fn [attr] [:property (keyword (:id attr))]) attributes)
                        [[:action :delete "Remove" remove-from-lesson! [state :id]]])
        {:keys [name start length entities]} lesson]
    [:div.container-fluid
     (com/page-header state (str "Lesson: " name)) 
     (com/button :to-sessions "Back to Lessons" #(in-order!
                                                  state
                                                  [[lesson api/get-lesson [repo :type-id :lesson-id]]
                                                   [:mode :browse]]))
     (form/cool state "Add an entity" "Add" :new-entity add-entity!)
     [:div.row 
        [:div.col-lg-12
         [:h3 "Entities"]
         (if (empty? entities)
           [:p "No entities."]
           (com/table entities columns))]]]))

(defn empty-div [state] [:div])

(defn app
  [username]
  (println "Initializing...") 
  (let [logged-in? (cookies/get :logged-in)
        username (cookies/get :username)]
    (when (or (not logged-in?) (not username))
      (misc/redirect! "/login")) 
    (let [state (reagent/atom {:user username
                               :mode :browse 
                               :new-lesson lesson-template
                               :loading true})] 
      (load-initial! state)
      (fn []
        (println "Rendering...")
        (com/full-app
         state
         :lesson
         username
         {:initial empty-div
          :browse render-lessons
          :view render-lesson})))))

(def start (com/boot app "app"))

(start)

;; (defn init
;;   [state]
;;   (load-types! state)
;;   (swap! state assoc :mode browse :new-lesson lesson-template))

;; (def start #(com/boot2 "app" init {:browse render-lessons
;;                                    :view render-lesson}))
