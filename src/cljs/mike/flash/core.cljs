(ns mike.flash.core
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [mike.common.core :as joe]
            [mike.common.state :refer [loading! commit! done! error! swap-in! fatal! merge!]]
            [mike.common.component :as com]
            [mike.component :as xcom]
            [mike.entity.api :as api]
            [mike.entity.http :refer [HttpEntityRepo]]
            [cemerick.url :as curl]
            [clojure.string :refer [blank? capitalize]]
            [reagent.core :as reagent]
            [cljs.core.async :refer [<!] :as async]
            [clojure.walk :refer [keywordize-keys]]))

(enable-console-print!)

(def repo (HttpEntityRepo. "http://localhost:8080/api/" "mike"))

(defn get-url
  []
  (curl/url (.-href (.-location js/window))))

(defn get-query-params
  []
  (keywordize-keys (:query (get-url))))

(defn load-lessons!
  [state type-id]
  (commit! state :loading-lessons? true)
  (go
    (let [{:keys [status body message]} (<! (api/get-lessons repo type-id))] 
      (if (joe/ok? status)
        (commit! state :loading-lessons? false :lessons body)
        (error! state message)))))

(defn load-sessions!
  [state type-id]
  (commit! state :loading-sessions? true)
  (go
    (let [{:keys [status body message]} (<! (api/get-sessions repo type-id))] 
      (if (joe/ok? status)
        (let [sessions (group-by :done body)]
          (merge! state {:loading-sessions? false
                         :active-sessions (get sessions false)
                         :completed-sessions (get sessions true)})) 
        (error! state message)))))

(defn answer-question!
  [state correct?]
  (loading! state)
  (go
    (let [{:keys [type-id session]} @state
          {:keys [id entity-id]} session
          _ (println type-id id entity-id)
          {:keys [status body message]} (<! (api/record-answer! repo type-id id entity-id correct?))] 
      (if (joe/ok? status)
        (done! state :session body)
        (error! state message)))))

(defn load-type!
  [state type-id]
  (load-sessions! state type-id)
  (load-lessons! state type-id)
  (done! state :type-id type-id))

(defn load-types!
  [state]
  (loading! state)
  (go
    (let [{:keys [status body message]} (<! (api/get-types repo))]
      (if (joe/ok? status) 
        (if (empty? body)
          (fatal! state "No types found!")
          (let [type-id (key (first body))]
            (commit! state :types body)
            (load-type! state type-id)))
        (fatal! state message)))))

(defn session!
  [state session-id]
  (println "LOADING SESSION" session-id)
  (loading! state)
  (go (let [{:keys [type-id lesson-id]} @state
            {:keys [status body message]} (<! (api/get-session repo type-id session-id))]
        (if (joe/bad? status)
          (error! state message)
          (let [session body
                lesson-id (:lesson-id session)
                {:keys [status body]} (<! (api/get-lesson repo type-id lesson-id))]
            (if (joe/bad? status)
              (error! state message)
              (done! state :session session :lesson body) 
))))))

(defn create-session!
  [state lesson-id]
  (commit! state :creating-session? true)
  (go
    (let [{:keys [type-id]} @state
          {:keys [status body message]} (<! (api/create-session! repo type-id lesson-id))]
      (if (joe/ok? status)
        (let [session-id (:id body)]
          (session! state session-id)
          (commit! state :mode :session :creating-session? false))
        (error! state message)))))

(defn render-session
  [state]
  (let [{:keys [type-id lesson loading-session? loading-lesson? loading-type? session entity attribute]} @state]
    (if (or loading-lesson? loading-session? loading-type?)
      [:span "Loading..."]
      (let [{:keys [name length entities]} lesson
            {:keys [id correct total done entity-id]} session]
        [:div
         (com/button :to-sessions "Back to Sessions" (fn []
                                                       (load-type! state type-id)
                                                       (commit! state :mode :sessions)))
         [:p "Session ID: " id]
         [:h3 "Lesson: " name]
         [:p correct " correct out of " total] 
         (if done
           [:div
            [:p "DONE"]]
           [:div
            [:p "Playing to " length] 
            [:p "Entity ID:" entity-id]
            (com/button :correct "Correct" (fn [] (answer-question! state true))) 
            (com/button :wrong "Wrong" (fn [] (answer-question! state false))) 
            (com/button :new-question "Back to Sessions" (fn []
                                                           (load-type! state type-id)
                                                           (commit! state :mode :sessions)))]
           )]))))

(defn render-sessions
  [state]
  (let [{:keys [type-id types loading-sessions active-sessions
                completed-sessions loading-lessons lessons]} @state 
        type-options (joe/fmap :label types)]
    [:div
     (com/fun-select #(load-type! state (keyword %)) type-options type-id)
     (if loading-lessons
       [:p "Loading lessons..."]
       [:div 
        [:h2 "Start a Session"]
        (if (empty? lessons)
          [:span "No lessons."]
          (com/table lessons [[:property :id]
                              [:property :user]
                              [:property :name] 
                              [:property :description]
                              [:action :start "Start" create-session! [state :id]]]))])

     (if loading-sessions
       [:p "Loading sessions..."]
       [:div 
        [:h2 "Active Sessions"]
        (if (empty? active-sessions)
          [:span "No active sessions."]
          (com/table active-sessions [[:property :id]
                                      [:property :lesson-id]
                                      [:property :correct]
                                      [:property :total]
                                      [:action :continue "Continue" (fn [{id :id}]
                                                                      (session! state id)
                                                                      (commit! state :mode :session))]]))
        [:h2 "Completed Sessions"]
        (if (empty? completed-sessions)
          [:span "No completed sessions."]
          (com/table completed-sessions [[:property :id]
                                         [:property :lesson-id]
                                         [:property :correct]
                                         [:property :total]]))

        ])

     ]))

(defn app
  []
  (println "Initializing...")
  (let [state (reagent/atom {:mode :sessions})]
    (load-types! state)
    (fn []
      (println "Rendering...")
      (com/app state xcom/nav {:session render-session
                               :sessions render-sessions}))))

 (def start (com/boot app "app"))
