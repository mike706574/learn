(ns mike.lesson
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [mike.misc :as m]
            [mike.page :as p]
            [mike.component :as c]
            [mike.state :as s]
            [mike.table :as t]
            [mike.form :as f]
            [mike.entity :as e]
            [mike.entity.api :as api]
            [reagent.core :as r]
            [clojure.string :refer [blank? capitalize]]
            [cljs.core.async :refer [<!]]
            [mike.entity.http :refer [HttpEntityRepo]]))

(enable-console-print!)

(def repo (atom nil))

(def lesson-template {:name {:value "" :label "Name" :type :text}
                      :description {:value "" :label "Description" :type :text}
                      :length {:value "10" :label "Length" :type :number :range [1 100]}})

(defn get-lesson-template
  [type]
  (let [attributes (:attributes type)
        options (m/mapm (fn [{:keys [id label]}] [id label]) attributes)
        with-start (assoc lesson-template :start {:value ""
                                                  :label "Start"
                                                  :type :select
                                                  :optional? true
                                                  :options options})]
    with-start))


(defn build-lesson!
  [lesson-data]
  (let [values (m/fmap :value lesson-data)]
    (if (blank? (:start values)) (dissoc values :start) values)))

(defn create-lesson!
  [state]
  (s/batch! state [[s/Function :lesson build-lesson! [:lesson-data]]
                   [s/Channel :created-lesson api/create-lesson! [@repo :type-id :lesson]]
                   [s/Function :lesson-data get-lesson-template [:type] :no-channel]
                   [s/Channel :lessons api/get-lessons [@repo :type-id]]
                   [s/Value :body "Created lesson!"]
                   [s/SetMode :browse]]))

(defn load-lessons!
  [state]
  (s/batch! state [[s/Value :loading-lessons true]
                   [s/Channel :type api/get-type [@repo :type-id]]
                   [s/Function :lesson-data get-lesson-template [:type]]
                   [s/Function :entity-data e/get-blank-entity [:type]]
                   [s/Channel :lessons api/get-lessons [@repo :type-id]]
                   [s/Value :loading-lessons false]]))

(defn refresh-lessons!
  [state]
  (s/single! state :lessons api/get-lessons [@repo :type-id]))

;; (defn load-type!
;;   [state type-id]
;;   (s/in-order! state [[:type-id type-id]
;;                       [:entity-data e/get-blank-entity [:type-id] :no-channel]
;;                       [:lesson-data get-lesson-template [:type] :no-channel]
;;                       [:lessons api/get-lessons [repo :type-id]]]))

(defn delete-lesson!
  [state lesson-id]
  ;; TODO: what does delete lesson give you back?
  (s/batch! state [[s/Channel nil api/delete-lesson! [@repo :type-id :lesson-id]]
                   [s/Value :message "Deleted lesson!"]]))

(defn remove-from-lesson!
  [state entity-id]
  (s/batch! state [[s/Value :entity-id entity-id]
                   [s/Channel nil api/remove-from-lesson! [@repo :type-id [:lesson :id] :entity-id]]
                   [s/Channel :lesson api/get-lesson [@repo :type-id [:lesson :id]]]
                   [s/Value :body "Removed entity!"]]))

(defn add-entity!
  [state]
  ;; TODO: handle loading
  ;; TODO: add-to-lesson! should return lesson probably
  (s/batch! state [[s/Function :entity #(m/fmap :value %) [:entity-data]]
                   [s/Channel :created-entity api/add-entity! [@repo :type-id :entity]]
                   [s/Channel nil api/add-to-lesson! [@repo :type-id [:lesson :id] [:created-entity :id]]]
                   [s/Channel :lesson api/get-lesson [@repo :type-id [:lesson :id]]]
                   [s/Value :body "Added entity!"]]))

(defn render-lesson
  [state]
  (let [{:keys [lesson loading-lesson entities lesson-id lesson-name type error message entity-data] :as current-state} @state
        attributes (:attributes type)
        columns (concat [[:property :id "ID"]]
                        (mapv (fn [attr] [:property (keyword (:id attr)) (:label attr)]) attributes)
                        [[:action :delete "Remove" remove-from-lesson! [state :id]]])
        {:keys [name start length entities]} lesson
        start-label (:label (m/find-first #(= start (:id %)) (:attributes type)))]
    [:div {:style {"marginTop" "20px"}}
     (if loading-lesson
       (c/loading-header "lesson")
       ;; TODO: make editable 
       [:div
        [:h3 "Properties"]
        [:form 
         [:div.form-group
          [:label {:for "start"} "Start"]
          [:input.form-control {:type "text" :name "start" :readOnly true :value start-label}]]
         [:div.form-group
         [:label {:for "length"} "Length"]
          [:input.form-control {:type "text" :name "length" :readOnly true :value length}]]]
        [:h3 "Add Entity"]
        (f/cool state "Add an entity" "Add" :entity-data add-entity!)
        [:h3 "Entities"]
        (if (empty? entities)
          [:p "No entities."]
          (t/table2 entities columns))])]))

(defn load-lesson!
  [state lesson]
  (let [{:keys [id name]} lesson]
    (s/batch! state [[s/Value :lesson-name name]
                     [s/SpawnMode :lesson name name render-lesson {:flag :loading-lesson
                                                                   :secondary "Lesson"}]
                     [s/Channel :lesson api/get-lesson [@repo :type-id id]]
                     [s/Value :loading-lesson false]])))

(defn render-create
  [state]
  (let [{:keys [error message type-id type types lessons lesson-data creating-lesson type]} @state]
    [:div {:style {"marginTop" "20px"}}
     (f/cool state "Create Lesson" "Create" :lesson-data create-lesson!)
     (when creating-lesson
       [:p "Creating lesson..."])])
)
(defn render-browse
  [state]
  (let [{:keys [error message type-id type types lessons loading-lessons creating-lesson]} @state]
    [:div {:style {"marginTop" "20px"}}
     [:input.btn.btn-default
      {:type "button"
       :value "Refresh"
       :on-click #(s/batch! state [[s/Value :loading-lessons true]
                                   [s/Channel :lessons api/get-lessons [@repo :type-id]]
                                   [s/Value :loading-lessons false]])}]
     (if loading-lessons
       (c/loading-header "lesson") 
        (if (empty? lessons)
          [:h4 "No lessons."]
          (t/table2 lessons [[:property :id "ID"]
                            [:property :name "Name"]
                            [:property :user "Creator"]
                            [:property :description "Description"]
                            [:property :length "Length"]
                            [:action :delete "Delete" delete-lesson! [state :id]]
                            [:action :lesson "View" load-lesson! state]])))]))

(defn render-home
  [state]
  [:div
   [:h3 "What?"]
   [:p "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan erat at risus mattis euismod. Morbi at egestas quam. Quisque posuere non arcu tempus vulputate. Nulla sed eleifend urna, eu tempor justo. Fusce et turpis sed massa imperdiet gravida. Vivamus nec placerat arcu. Etiam pharetra a est nec rhoncus. Praesent gravida lorem ut sem ullamcorper venenatis. Duis pulvinar nunc sit amet consequat euismod. Quisque id consequat mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec eget dictum nunc. Donec tempus sodales nunc, commodo hendrerit nibh tincidunt ac. Aliquam pulvinar in leo et mattis. Proin lacus lectus, tempor et scelerisque sit amet, posuere sed purus. "]])

(defn app
  [api-url username type-id]
  (println "Initializing... " {:api-url api-url :username username :type-id type-id})
  (reset! repo (HttpEntityRepo. api-url username "friend"))
  (let [state (r/atom {:user username
                       :mode :home
                       :type-id (keyword (str type-id)) 
                       :modes {:home {:title "Lessons"
                                      :label "Lessons"
                                      :render render-home}
                               :browse {:title "Browse"
                                        :label "Browse Lessons"
                                        :render render-browse}
                               :create {:title "Create"
                                        :label "Create Lesson"
                                        :render render-create}}})]
    (load-lessons! state)
    (fn []
      (println "Rendering mode" (:mode @state) "...")
      (p/page2 state "Lessons"))))

(def info (partial println "[Lesson]"))

(defn ^:export start [api-url username type-id]
  (info "[Lesson] Starting app...")
  (r/render [(partial app api-url username type-id)] (js/document.getElementById "page-wrapper")))

(defn ^:export reload []
  (info "[Lesson] Reloading app...")
  (r/render [(partial app "http://localhost:8080/api/" "mike" 1)] (js/document.getElementById "page-wrapper")))
