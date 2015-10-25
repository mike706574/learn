(ns mike.add.core
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [mike.common.core :as joe]
            [reagent.core :as reagent]
            [clojure.string :refer [blank?]]
            [lang.entity.api :as api]
            [cljs.core.async :refer [<!]]
            [lang.entity.http :refer [HttpEntityRepo]]))

(enable-console-print!)

(def repo (HttpEntityRepo. "http://localhost:8080/api/"))

(defn get-type [type-id types] (joe/find-first #(= type-id (:id %)) types))

(defn get-blank-entity
  [type-id types]
  (let [attributes (:attributes (get-type type-id types))]
    (joe/mapm (fn [attribute] [(:id attribute) ""]) attributes)))

(defn load-types!
  [state]
  (go
    (let [{:keys [status body]} (<! (api/get-types repo))]
      (if (joe/ok? status)
        (let [type-id (:id (first body))] 
          (swap! state assoc
                 :types body
                 :type-id type-id 
                 :entity (get-blank-entity type-id body)
                 :loading false)) 
        (swap! state assoc :error true :loading false)))))

(defn add-entity!
  [state]
  (go
    (let [{:keys [type-id entity types]} @state]
      (println "ENTITY:" entity)
      (let [{:keys [status body]} (<! (api/add-entity! repo type-id entity))]
        (if (joe/ok? status)
          (swap! state assoc :entity (get-blank-entity type-id types))
          (swap! state assoc :error true)
          
)))))

(defn render-things
  [state]
  (let [{:keys [type-id types entity]} @state
        {:keys [label attributes]} (get-type type-id types)]
    [:div
     (joe/fun-select
      #(let [bob (get-blank-entity type-id types)]
         (println bob)
         (swap! state assoc :type-id % :entity)) 
      (joe/mapm (fn [{:keys [id label]}] [id label]) types))
     [:h3 "Add: " label]
     [:ul
      (doall
       (for [attribute attributes]
           (let [{:keys [id label]} attribute
                 attribute-name (name id)]
             [:li {:key id}
              [:label {:for id} label ": "]
              (joe/text-box-in state id [:entity id])])))]
     (joe/button :add "Add"  #(add-entity! state))
])
  
    )

(defn render
  [state]
  (let [{:keys [error loading message]} @state]
    [:div
     (when (not (blank? message))
       [:span message]) 
     (if error
       [:h2 "ERROR"]
       (if loading
         [:h2 "LOADING"]
         (render-things state)))]
    ))


(defn app
  []
  (println "Initializing...") 
  (let [state (reagent/atom {:error false :loading true :message nil})]
    (load-types! state)
    (fn []
      (println "Rendering...")
      (render state))))

(defn start
  []
  (reagent/render-component
   [app]
   (.getElementById js/document "app")))
