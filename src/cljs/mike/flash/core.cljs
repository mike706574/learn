(ns mike.flash.core
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [mike.common.misc :as misc]
            [mike.common.state :refer [loading! commit! done! error! swap-in! fatal! merge! in-order!]]
            [mike.common.entity :as monkey]
            [mike.common.component :as com]
            [mike.component :as xcom]
            [mike.entity.api :as api]
            [mike.entity.http :refer [HttpEntityRepo]]
            [clojure.string :refer [blank? capitalize]]
            [reagent.core :as reagent]
            [mike.common.cookies :as cookies]
            [cljs.core.async :refer [<!] :as async]
))

(enable-console-print!)

(def repo (HttpEntityRepo. "http://localhost:8080/api/" "mike"))

(defn load-lessons!
  [state type-id]
  (commit! state :loading-lessons? true)
  (go (let [{:keys [status body message]} (<! (api/get-lessons repo type-id))]
        (if (misc/ok? status)
          (commit! state :loading-lessons? false :lessons body)
          (error! state message)))))

(defn load-sessions!
  [state type-id]
  (commit! state :loading-sessions? true)
  (go (let [{:keys [status body message]} (<! (api/get-sessions repo type-id))] 
        (if (misc/ok? status)
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
          {:keys [status body message]} (<! (api/record-answer! repo type-id id entity-id correct?))] 
      (if (misc/ok? status)
        (done! state :session body)
        (error! state message)))))

(defn load-type!
  [state type-id]
  (load-sessions! state type-id)
  (load-lessons! state type-id)
  (done! state :mode :sessions :type-id type-id :type ((:types @state) type-id)))

(defn load-types!
  [state]
  (loading! state)
  (go (let [{:keys [status body message]} (<! (api/get-types repo))]
        (if (misc/ok? status) 
          (if (empty? body)
            (fatal! state "No types found!")
            (let [type-id (key (first body))]
              (commit! state :types body)
              (load-type! state type-id)))
          (fatal! state message)))))

;; (defn load-initial!
;;   [state]
;;   (in-order! state [[:types api/get-types [repo]]
;;                     [:type-id #(key (first %)) [:types] :no-channel]
;;                     [:new-entity monkey/get-blank-entity [:type-id] :no-channel]
;;                     [:new-lesson get-lesson-template [:type] :no-channel]
;;                     [:lessons api/get-lessons [repo :type-id]]]))


(defn create-session!
  [state lesson-id]
  (in-order! state [[:session api/create-session! [repo :type-id lesson-id]]
                    [:lesson api/get-lesson [repo :type-id [:session :lesson-id]]]
                    [:entity api/get-entity [repo :type-id [:session :entity-id]]]
                    [:mode :session]]))

(defn session!
  [state session-id]
  (in-order! state [[:session api/get-session [repo :type-id session-id]]
                    [:lesson api/get-lesson [repo :type-id [:session :lesson-id]]]
                    [:entity api/get-entity [repo :type-id [:session :entity-id]]]
                    [:mode :session]]))

(defn render-session
  [state]
  (let [{:keys [type-id lesson loading-session? loading-lesson? loading-type? session entity attribute]} @state]
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
          (com/button :wrong "Wrong" (fn [] (answer-question! state false)))])
       (com/button :new-question "Back to Sessions" (fn []
                                                      (load-type! state type-id)
                                                      (commit! state :mode :sessions)))])))

(defn render-sessions
  [state]
  (let [{:keys [type-id types loading-sessions active-sessions
                completed-sessions loading-lessons lessons]} @state 
        type-options (misc/fmap :label types)]
    [:div.container-fluid
     (com/page-header state "Sessions")
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
                                      [:action :continue "Continue"
                                       (fn [{id :id}]
                                         (session! state id)
                                         (commit! state :mode :session))]]))
        [:h2 "Completed Sessions"]
        (if (empty? completed-sessions)
          [:span "No completed sessions."]
          (com/table completed-sessions [[:property :id]
                                         [:property :lesson-id]
                                         [:property :correct]
                                         [:property :total]]))])]))

(defn empty-div [state] [:div])

(defn render-entity [state] [:div])

(defn app
  [username]
  (println "Initializing...") 
  (let [logged-in? (cookies/get :logged-in)
        username (cookies/get :username)]
    (when (or (not logged-in?) (not username))
      (misc/redirect! "/login")) 
    (let [state (reagent/atom {:user username
                               :mode :initial})] 
      (load-types! state)
      (fn []
        (println "Rendering...")
        (com/full-app state
                      :flash
                      username
                      {:initial empty-div
                       :session render-session
                       :sessions render-sessions
                       :entity render-entity})))))

 (def start (com/boot app "app"))
