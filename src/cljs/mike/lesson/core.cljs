(ns mike.lesson.core
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [mike.common.core :as joe]
            [mike.common.state :refer [loading! commit! done! error! swap-in!]]
            [mike.component :as component]
            [lang.entity.api :as api]
            [reagent.core :as reagent]
            [clojure.string :refer [blank? capitalize]]
            [cljs.core.async :refer [<!]]
            [lang.entity.http :refer [HttpEntityRepo]]))

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

;; actions
(defn load-lessons!
  [state type-id]
  (go
    (let [{:keys [status body message]} (<! (api/get-lessons repo type-id))]
      (if (joe/ok? status)
        (done! state :type-id type-id :lessons body)
        (error! state message)))))

(defn load-types!
  [state]
  (go
    (let [{:keys [status body message]} (<! (api/get-types repo))]
      (if (joe/ok? status)
        (let [type-id (:id (first body))]
          (commit! state :types body :type-id type-id)
          (load-lessons! state type-id))
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
  ;; 3 calls whhhhhhy
  (go
    (let [type-id (:type-id @state)
          {:keys [status body message]} (<! (api/get-lesson repo type-id lesson-id))]
      (if (joe/ok? status)
        (let [lesson body
              {:keys [status body message]} (<! (api/get-lesson-entities repo type-id lesson-id))]
          (if (joe/ok? status)
            (let [entities body
                  {:keys [status body message]} (<! (api/get-type repo type-id))]
              (if (joe/ok? status)
                (done! state :mode :view :lesson-id lesson-id :lesson lesson :entities entities :type body)
                (error! state message)))
            (error! state message)))
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
     (let [{:keys [type-id types lessons new-lesson] :as current-state} @state
           [validated-lesson all-valid?] (joe/validate-form new-lesson)]
    [:div
     (joe/fun-select #(load-lessons! state %) (joe/mapm (fn [{:keys [id label]}] [id label]) types) type-id)
     [:h3 "Create a Lesson"]
     (joe/render-form state :new-lesson validated-lesson)
     [:input {:type "button"
              :id :create
              :disabled (not all-valid?) 
              :value "Create"
              :on-click #(create-lesson! state)}]
     [:h3 "Lessons"]
     (if (empty? lessons)
       [:span "No lessons stored."]
       (joe/render-table lessons [[:property :id]
                                  [:property :user]
                                  [:property :description]
                                  [:property :length]
                                  [:action :delete "Delete" delete-lesson! [state :id]]
                                  [:action :view "View" view-lesson! [state :id]]]))]))
                                
(defn render-lesson
  [state]
  (let [{:keys [type-id lesson entities lesson-id type] :as current-state} @state
        attributes (:attributes type)
        columns (concat [[:property :id]]
                        (mapv (fn [attr] [:property (keyword (:id attr))]) attributes)
                        [[:action :delete "Remove" remove-from-lesson! [state :id]]])]
    (joe/render-table entities columns)))

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
      (render state component/nav {:browse render-lessons
                                   :view render-lesson}))))
    
(defn start
  []
  (reagent/render-component
   [app]
   (.getElementById js/document "app")))
