(ns mike.common.core
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [lang.sentence.api :as api]
            [cljs-http.client :as httpok]
            [pet.http :as http]
            [cljs.core.async :refer [<!]]))

(enable-console-print!)

(def base-path "http://localhost:8080/api/")
(def sentence-path (str base-path "sentence"))
(def sentences-path (str base-path "sentences"))
(def tag-path (str base-path "tag"))
(def tags-path (str base-path "tags"))

(defn maps [f coll] (into #{} (map f coll)))
(defn mapm [f coll] (into {} (map f coll)))

(defn ok? [status] (= (keyword status) :ok))

(defn find-first [f coll] (first (filter f coll)))

(defn mapback
  [f coll]
  (into (empty coll) (map f coll)))

(defn fmap
  [f m]
  (into (empty m) (for [[k v] m] [k (f v)])))

(defn build-option
  [e]
  (let [k (key e)]
    [:option {:key k :value k} (val e)]))

(defn get-value [e] (-> e .-target .-value))

(defn fun-select
  [f options]
  [:select {:on-change #(f (get-value %))}
   (map build-option options)])

(defn on-change-select
  [on-change options]
  [:select {:on-change on-change}
   (map build-option options)])

(defn yak-select
  [on-change]
  (on-change-select on-change (fmap :name api/yaks)))

(defn yak-select2
  [on-change]
  (on-change-select (fn [e] (on-change (keyword (get-value e)))) (fmap :name api/yaks)))

(defn get-first-index
  [item coll]
  (first (keep-indexed #(when (= item %2) %1) coll)))

(defn get-after
  [v item]
  (let [index (get-first-index item v)]
    (if (nil? index)
      nil
      (let [next-index (inc index)]
        (if (= next-index (count v))
          (first v)
          (get v next-index))))))

(defn button
  [id label f]
  [:input {:type "button"
           :id id
           :value label
           :on-click f}])

(defn navigation-buttons
  [page-number page-count show-fn]
  (when (not= 0 page-count) 
    [:div
     (when (not= 1 page-number)
       [:input {:type "button" :value "First" :on-click #(show-fn 1)}])
     (when (< 1 page-number)
       [:input {:type "button" :value "Previous" :on-click #(show-fn (dec page-number))}])
     (when (not= page-number page-count)
       [:input {:type "button" :value "Next" :on-click #(show-fn (inc page-number))}])
     (when (not= page-number page-count)
       [:input {:type "button" :value "Last" :on-click #(show-fn page-count)}])]))

(defn get-label
  [selected languages]
  (let [lang-map (mapm (fn [x] [(:key x) x]) languages)
        language (selected lang-map)]
    (:label language)))

(defn flip-box
  [yak selected sentence flip next]
  (let [info (api/yaks yak)
        title (:name info)
        label (get-label selected (:languages info))]
    (println "OK" title)
    [:div
     [:h2 title]
     [:h5 label]
     [:p (selected sentence)]
     [:div
      [:input {:type "button" :value "Flip" :on-click flip}]
      [:input {:type "button" :value "Next" :on-click next}]]]))

(defn flip-box2
  [title selected selected-name options flip next]
  [:div
   [:h2 title]
   [:span selected-name]
   [:div [:span (selected options)]]
   [:div
    [:input {:type "button" :value "Flip" :on-click flip}]
    [:input {:type "button" :value "Next" :on-click next}]]])

(defn text-box
  [state k]
  [:input {:type "text"
           :id k
           :value (k @state)
           :on-change #(swap! state assoc k (get-value %))}])

(defn text-box-in
  [state id ks]
  [:input {:type "text"
           :id id
           :value (get-in @state ks)
           :on-change #(swap! state assoc-in ks (get-value %))}])
