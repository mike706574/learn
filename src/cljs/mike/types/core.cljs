(ns mike.types.core
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [mike.common.core :as joe]
            [mike.common.state :refer [loading! commit! done! error!]]
            [reagent.core :as reagent]
            [lang.entity.api :as api]
            [cljs.core.async :refer [<!]]
            [lang.entity.http :refer [HttpEntityRepo]]))

(enable-console-print!)

(def repo (HttpEntityRepo. "http://localhost:8080/api/" "mike"))

(defn load-types
  [state]
  (go
    (let [{:keys [status body]} (<! (api/get-types repo))]
      (if (joe/ok? status)
        (done! state :types body)
        (error! state "ERROR!")))))

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
  (let [{:keys [error loading message]} @state]
    [:div
     (when error [:h3 "Error!"])
     (when message [:span message])
     (if loading
       [:span "Loading.."]
       (render-types state))]))

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
