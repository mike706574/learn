(ns mike.lesson.core
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [mike.common.core :as joe]
            [mike.common.state :refer [loading! commit! done! error! swap-in!]]
            [mike.component :as component]
            [lang.entity.api :as api]
            [reagent.core :as reagent]
            [clojure.string :refer [blank?]]
            [cljs.core.async :refer [<!]]
            [lang.entity.http :refer [HttpEntityRepo]]))

(enable-console-print!)

(def repo (HttpEntityRepo. "http://localhost:8080/api/" "mike"))

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
    (println "HI HI")
    (let [{:keys [type-id lesson length]} @state
          name (:v (:name lesson))
          description (:v (:description lesson))
          length (:v (:length lesson))
          {:keys [status body]} (<! (api/create-lesson! repo type-id name description length))]
      (println "HI")
      (if (joe/ok? status)
        (do (commit! state :name "" :description "" :length "")
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

(def not-blank? (comp not blank?))

(defn validate-property
  [{:keys [v type required validate] :as property}] 
  (assoc property :valid? (validate v)))

(defn render-things
  [state]
     (let [{:keys [type-id types lessons lesson] :as current-state} @state
        validated-lesson (joe/fmap validate-property lesson)
        all-valid? (every? #(:valid? (val %)) validated-lesson)]
    [:div
     (joe/fun-select
      #(load-lessons! state %)
      (joe/mapm (fn [{:keys [id label]}] [id label]) types)
      type-id)
     [:h3 "Create a Lesson"]
     [:ul
      (doall (for [[k property] validated-lesson]
               (let [{:keys [v dirty? valid?]} property]
                 [:li {:key k}
                  (joe/label k)
                  [:input {:type "text" :id k :name k :value v
                           :on-change #(swap-in! state [:lesson k] assoc :dirty? true :v (joe/get-value %))}]
                  (when (and dirty? (not valid?)) [:span "INVALID!"])])))]
     [:input {:type "button"
              :id :create
              :disabled (not all-valid?) 
              :value "Create"
              :on-click #(do (println "HEY HEY")
                             (create-lesson! state))}]
     [:h3 "Lessons"]
     (if (empty? lessons)
       [:span "No lessons stored."]
       [:table
      [:thead
       [:tr
        [:th {:key :id} "ID"]
        [:th {:key :user} "User"]
        [:th {:key :name} "Name"]
        [:th {:key :description} "Description"]
        [:th {:key :length} "Length"]
        [:th {:key :delete} "Delete"]]]
      [:tbody
       (for [{:keys [id user name description length] :as lesson} lessons]
         [:tr {:key id}
          [:td {:key :id} id]
          [:td {:key :user} user]
          [:td {:key :name} name]
          [:td {:key :description} description]
          [:td {:key :length} length]
          [:td {:key :delete} (joe/button :delete "Delete" #(delete-lesson! state id))]])]])]))
     

(defn render
  [state]
  (let [{:keys [error loading message]} @state]
    [:div
     component/nav
     (when error [:h3 "Error!"])
     (when message [:span message])
     (if loading
       [:span "LOADING"]
       (render-things state))]))

(defn app
  []
  (println "Initializing...")
  (let [state (reagent/atom {:user "mike"
                             :lesson {:name {:v "" :dirty? false :validate not-blank?}
                                      :description {:v "" :dirty? false :validate not-blank?}
                                      :length {:v "" :dirty? false :validate not-blank?}}
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
