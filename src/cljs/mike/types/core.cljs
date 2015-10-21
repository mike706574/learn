(ns mike.types.core
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [mike.common.core :as joe]
            [reagent.core :as reagent]
            [lang.entity.api :as api]
            [cljs.core.async :refer [<!]]
            [lang.entity.http :refer [HttpEntityRepo]]))

(enable-console-print!)

(def repo (HttpEntityRepo. "http://localhost:8080/whale/"))

(defn load-types
  [state]
  (go
    (let [{:keys [status body]} (<! (api/get-types repo))]
      (if (joe/ok? status)
        (swap! state assoc :types body :loading false)
        (swap! state assoc :error true :loading false)))))

(defn render-types
  [state]
  (let [types (:types @state)]
    [:div 
     [:h3 "Types"]
     [:ul
      (for [{:keys [label id description attributes]} types]
        [:li {:key id}
         [:h4 label]
         [:ul
          [:li "ID: " id]
          [:li "Description: " description]
          [:li "Attributes"]
          [:ul
           (for [{:keys [id label schema description]} attributes]
             [:li {:key id}
              [:h5 label]
              [:ul 
               [:li {:key id} "ID: " id]
               [:li {:key description} "Description: " description]
               [:li {:key schema} "Schema: " schema]]])]]])]]))


(defn render
  [state]
  (let [{:keys [error loading]} @state]
    (println "HEY" error)
    (if error
      [:h2 "ERROR"]
      (if loading
        [:h2 "LOADING"]
        (render-types state)))))

(defn app
  []
  (println "Initializing...") 
  (let [state (reagent/atom {:error false :loading true})]
    (load-types state)
    (fn []
      (println "Rendering...")
      (render state))))

(defn start
  []
  (reagent/render-component
   [app]
   (.getElementById js/document "app")))
