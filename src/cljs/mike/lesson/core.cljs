(ns mike.lesson.core
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [mike.common.core :as joe]
            [lang.entity.api :as api]
            [reagent.core :as reagent]
            [cljs.core.async :refer [<!]]
            [lang.entity.http :refer [HttpEntityRepo]])) 

(enable-console-print!)

(def repo (HttpEntityRepo. "http://localhost:8080/whale/"))

(defn load-lessons!
  [state type-id]
  (go
    (let [{:keys [status body]} (<! (api/get-lessons-for-user repo type-id "mike"))]
      (if (joe/ok? status)
        (swap! state assoc
               :type-id type-id
               :lessons body
               :loading false)
        (swap! state assoc :error true)))))

(defn load-types!
  [state]
  (go
    (let [{:keys [status body]} (<! (api/get-types repo))]
      (if (joe/ok? status)
        (let [type-id (:id (first body))]
          (swap! state assoc :types body :type-id type-id)
          (load-lessons! state type-id)) 
        (swap! state assoc :error true :loading false)))))

(defn create-lesson!
  [state]
  (go
    (let [{:keys [type-id user name description]} @state]
      (let [{:keys [status body]} (<! (api/create-lesson! repo type-id user name description))]
        (if (joe/ok? status)
          (do (swap! state assoc :name "" :description "")
              (load-lessons! state type-id))
          
          (swap! state assoc :error true)
          )))))

(defn render-things
  [state]
  (let [{:keys [types lessons] :as current-state} @state]
    (println lessons)
    [:div
     (joe/fun-select
      #(load-lessons! state %)
      (joe/mapm (fn [{:keys [id label]}] [id label]) types))
     [:h3 "Make lesson"]
     [:ul
      [:li
       [:label {:for :name} "Name: "]
       (joe/text-box state :name)]
      [:li
       [:label {:for :description} "Description: "]
       (joe/text-box state :description)]]
     (joe/button :create-lesson "Create" #(create-lesson! state))
     [:ul
      (for [{:keys [id name description user]} lessons]
        [:li {:key id}
         [:h4 name]
         [:ul
          [:li "ID: " id]
          [:li "Description: " description]]])]]))

(defn render
  [state]
  (let [{:keys [error loading message]} @state]
    [:div
;;     [:span "MESSAGE: " message]
     (if error
       [:h2 "ERROR"]
       (if loading
         [:h2 "LOADING"]
         (render-things state)))]))

(defn app
  []
  (println "Initializing...")
  (let [state (reagent/atom {:user "mike" :loading true})]
    (load-types! state)
    (fn []
      (println "Rendering...")
      (render state))))

(defn start
  []
  (reagent/render-component
   [app]
   (.getElementById js/document "app")))
