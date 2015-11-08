(ns mike.lesson
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [mike.misc :as misc]
            [mike.page :as p]
            [mike.component :as c]
            [mike.state :as s]
            [mike.table :as t]
            [mike.cookies :as cookies]
            [mike.form :as f]
            [mike.entity :as e]
            [mike.entity.api :as api]
            [reagent.core :as r]
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


(defn build-lesson!
  [lesson-data]
  (let [values (misc/fmap :value lesson-data)]
    (if (blank? (:start values)) (dissoc values :start) values)))

(defn create-lesson!
  [state]
  (s/batch! state [[s/Function :lesson build-lesson! [:lesson-data]]
                   [s/Channel :created-lesson api/create-lesson! [repo :type-id :lesson]]
                   [s/Function :lesson-data get-lesson-template [:type] :no-channel]
                   [s/Channel :lessons api/get-lessons [repo :type-id]]
                   [s/Value :message "Created lesson!"]]))

(defn load-lessons!
  [state]
  (s/loading! state "things")
  (s/batch! state [[s/Channel :types api/get-types [repo]]
                   [s/Function :type-id #(key (first %)) [:types]]
                   [s/Function :type #(%1 %2) [:type-id :types]]
                   [s/Function :lesson-data get-lesson-template [:type]]
                   [s/Function :entity-data e/get-blank-entity [:type]]
                   [s/Channel :lessons api/get-lessons [repo :type-id]]
                   [s/Value :loading false]]))

(defn refresh-lessons!
  [state]
  (s/single! state :lessons api/get-lessons [repo :type-id]))

;; (defn load-type!
;;   [state type-id]
;;   (s/in-order! state [[:type-id type-id]
;;                       [:entity-data e/get-blank-entity [:type-id] :no-channel]
;;                       [:lesson-data get-lesson-template [:type] :no-channel]
;;                       [:lessons api/get-lessons [repo :type-id]]]))

(defn delete-lesson!
  [state lesson-id]
  ;; TODO: what does delete lesson give you back?
  (s/batch! state [[s/Channel nil api/delete-lesson! [repo :type-id :lesson-id]]
                   [s/Value :message "Deleted lesson!"]]))

(defn load-lesson!
  [state lesson]
  (s/merge! state {:mode :lesson :lesson-id (:id lesson) :lesson lesson :loading-lesson true})
  ;; TODO: no need for batch here?
  (s/batch! state [[s/Channel :lesson api/get-lesson [repo :type-id :lesson-id]]
                   [s/Value :loading-lesson false]]))

(defn remove-from-lesson!
  [state entity-id]
  (s/batch! state [[s/Value :entity-id entity-id]
                   [s/Channel nil api/remove-from-lesson! [repo :type-id :lesson-id :entity-id]]
                   [s/Channel :lesson api/get-lesson [repo :type-id :lesson-id]]
                   [s/Value :message "Removed entity!"]]))

(defn add-entity!
  [state]
  ;; TODO: handle loading
  ;; TODO: add-to-lesson! should return lesson probably
  (s/batch! state [[s/Function :entity #(misc/fmap :value %) [:entity-data]]
                   [s/Channel :created-entity api/add-entity! [repo :type-id :entity]]
                   [s/Channel nil api/add-to-lesson! [repo :type-id :lesson-id [:created-entity :id]]]
                   [s/Channel :lesson api/get-lesson [repo :type-id :lesson-id]]
                   [s/Value :message "Added entity!"]]))

;; TODO: move to component
(defn message-box
  ;; TODO: error should be error?, loading should be loading?
  [error message]
  (when message
    (if error
      (c/error-alert message)
      (c/success-alert message))))

(defn render-lesson
  [state]
  (let [{:keys [lesson loading-lesson entities lesson-id type error message entity-data] :as current-state} @state
        attributes (:attributes type)
        columns (concat [[:property :id "ID"]]
                        (mapv (fn [attr] [:property (keyword (:id attr))]) attributes)
                        [[:action :delete "Remove" remove-from-lesson! [state :id]]])
        {:keys [name start length entities]} lesson]
    [:div.col-lg-12
     ;; TODO: extract to fn
     [:div.btn-group.btn-breadcrumb
      [:span.btn.btn-default {:on-click #(println "TODO: go home")} [:span.glyphicon.glyphicon-home]]
      [:span.btn.btn-default {:on-click #(println "TODO: go to dashboard")} (:label type)]
      [:span.btn.btn-default {:on-click #(swap! state assoc :mode :lessons)} "Lessons"]
      [:span.btn.btn-primary name]]
     (message-box error message)
     ;; TODO: make editable
     [:p "Start:" start]
     [:p "Name:" length] 
     (f/cool state "Add an entity" "Add" :entity-data add-entity!) 
     [:h3 "Entities"]
     (if loading-lesson
       (c/loading-header "entities")
       (if (empty? entities)
         [:p "No entities."]
         (t/table entities columns)))]))
     

(defn render-lessons
  [state]
  (let [{:keys [error message type-id type types lessons creating-lesson]} @state]
    [:div.col-lg-12
     [:div.btn-group.btn-breadcrumb
      [:span.btn.btn-default {:on-click #(println "TODO: go home")} [:span.glyphicon.glyphicon-home]]
      [:span.btn.btn-default {:on-click #(println "TODO: go to dashboard")} (:label type)]
      [:span.btn.btn-primary "Lessons"]]
     (message-box error message)
;;     (c/fselect #(load-type! state %) (misc/fmap :label types) type-id) 
     (f/cool state "Create a Lesson" "Create" :lesson-data create-lesson!)
     (when creating-lesson
       [:p "Creating lesson..."]) 
     [:h3 "Lessons"]
     [:input.btn.btn-default {:type "button" :value "Refresh"
                              :on-click #(s/single! state :lessons api/get-lessons [repo :type-id])}]
     (if (empty? lessons)
       [:span "No lessons stored."]
       (t/table lessons [[:property :id "ID"]
                         [:property :name "Name"]
                         [:property :user "Creator"]
                         [:property :description "Description"]
                         [:property :length "Length"]
                         [:action :delete "Delete" delete-lesson! [state :id]]
                         [:row-action :lesson "View" load-lesson! state]]))]))

;; (defn render-s
;;   [state]
;;   [:div.col-lg-12
;;    [:p "Lorem ipsum dolor sit amet, ipsum conubia nunc amet nisl potenti, semper nulla blandit, dui orci sed penatibus integer donec, mattis urna blandit condimentum in convallis nec. Quisque consequat sagittis posuere integer, vestibulum luctus velit porro urna sit bibendum, maecenas sed donec mauris elit cursus pellentesque. Praesent curabitur et imperdiet praesent ligula pellentesque. Wisi delectus, turpis eget nec posuere aenean enim. Velit mi mi velit velit libero. In laoreet tincidunt et, mauris mauris ut etiam in dignissim, maecenas ante et, vel tristique ut libero, quam a. Magna faucibus quam tortor adipiscing ac, leo ipsum nisl vestibulum, sunt pellentesque ut in nonummy porttitor eu, vel phasellus vel torquent leo gravida quam, a massa orci pede est. Cum nec vel duis in ante, volutpat nullam arcu quam lobortis sed luctus, eget morbi curabitur arcu etiam aliquam nullam, purus fermentum eleifend eu. Ligula tincidunt ante id id a. Lacus qui, dolor integer, neque ad tortor, per phasellus, faucibus sed."]
;;    [:input.btn.btn-default {:type "button"
;;                             :value "Lesson"
;;                             :on-click #(swap! state assoc :mode :lesson)}]])


;; (defn render-lesson
;;   [state]
;;   [:div.col-lg-12
;;    [:p "A barrel of monkeys!"]])

(defn app
  [username]
  (println "Initializing...") 
;;   (let [logged-in? (cookies/get :logged-in)
;;         username (cookies/get :username)]
;;     (when (or (not logged-in?) (not username))
;;       (println "REDIRECT")
;; ;;      (misc/redirect! "/login.html")
;;       )
    
    (let [state (r/atom {:user "mike"
                         :mode :lessons})]
      (load-lessons! state)
      (fn []
        (println "Rendering...")
        (p/page state {:lessons {:title "Lessons"
                                 :render render-lessons}
                       :lesson {:title ["Lesson: " [:lesson :name]]
                                :render render-lesson}}))))

(defn ^:export start []
  (println "Starting app...")
  (r/render [app] (js/document.getElementById "page-wrapper")))
