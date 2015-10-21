(ns mike.browse.core
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [mike.common.core :as joe]
            [lang.entity.api :as api]
            [reagent.core :as reagent]
            [cljs.core.async :refer [<!]]
            [lang.entity.http :refer [HttpEntityRepo]])) 

(enable-console-print!)

(def repo (HttpEntityRepo. "http://localhost:8080/whale/"))

(defn get-type [type-id types] (joe/find-first #(= type-id (:id %)) types))

(defn load-page!
  [state type-id page-number]
  (go
    (let [{:keys [status body]} (<! (api/count-entities repo type-id))]
      (if (joe/ok? status)
        (if (= body 0)
          (swap! state assoc
                 :type-id type-id
                 :page-number 0
                 :entity-count 0
                 :entities nil
                 :loading false) 
          (let [page-size (:page-size @state)
                entity-count body
                start (+ page-number (* (dec page-number) (dec page-size)))
                end (dec (+ start page-size))
                end (min entity-count end)
                {:keys [status body]} (<! (api/get-entity-range repo type-id start end))]
            (if (joe/ok? status)
              (swap! state assoc
                   :type-id type-id
                   :page-number page-number
                   :entity-count entity-count
                   :entities body
                   :loading false)
            (swap! state assoc :error true :loading false)))
        (swap! state assoc :error true))))))

(defn load-types!
  [state]
  (go
    (let [{:keys [status body]} (<! (api/get-types repo))]
      (if (joe/ok? status)
        (let [type-id (:id (first body))]
          (swap! state assoc :types body :type-id type-id)
          (load-page! state type-id 1)) 
        (swap! state assoc :error true :loading false)))))

(defn get-page-count
  [entity-count page-size]
  (println "EC:" entity-count)
  (println "PS:" page-size)
  (let [q (quot entity-count page-size)
        m (mod entity-count page-size)]
    (println q)
    (println m)
    (if (not= 0 m) (inc q) q)))

(defn render-things
  [state]
  (let [{:keys [type-id types page-number entities page-size entity-count] :as current-state} @state
        type (get-type type-id types)
        attributes (:attributes type)
        page-count (get-page-count entity-count page-size)]
    (println page-count)
      [:div
       (println types)
       (joe/fun-select
        #(load-page! state % 1)
        (joe/mapm (fn [{:keys [id label]}] [id label]) types))
       [:h2 (:label type)]
       (if (= 0 page-count)
         [:p "No entities stored."]
         [:div
          [:p (str "Total sentences: " entity-count)]
          [:p (str "Page " page-number " of " page-count)]
          [:table
           [:thead
            [:tr
             (cons [:th {:key :id} "ID"]
                   (conj
                    (into [] (for [attribute attributes] [:th {:key (:id attribute)} (:label attribute)])) 
                    [:th {:key :delete} "Delete"])

                   )]]
           [:tbody
            (for [entity entities]
              [:tr {:key (:id entity)}
               (cons [:td {:key :id} (:id entity)]
                     (conj 
                      (into [] (for [attribute attributes]
                           [:td {:key (:id attribute)}
                            (get entity (keyword (:id attribute)))])) 
                      [:td {:key :delete} (joe/button :delete "Delete" identity)])



                     )])]]
          (joe/navigation-buttons page-number page-count (partial load-page! state type-id))])]))

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
  (let [state (reagent/atom {:page-number 1 :page-size 10 :loading true})]
    (load-types! state)
    (fn []
      (println "Rendering...")
      (render state))))

(defn start
  []
  (reagent/render-component
   [app]
   (.getElementById js/document "app")))
