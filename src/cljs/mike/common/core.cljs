(ns mike.common.core
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [lang.sentence.api :refer [yaks] :as api]
            [cljs-http.client :as httpok]
            [pet.http :as http]
            [cljs.core.async :refer [<!]]))

(def base-path "http://localhost:8080/api/")
(def sentence-path (str base-path "sentence"))
(def sentences-path (str base-path "sentences"))
(def tag-path (str base-path "tag"))
(def tags-path (str base-path "tags"))

(defn maps [f coll] (into #{} (map f coll)))
(defn mapm [f coll] (into {} (map f coll)))

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

(defn on-change-select
  [on-change options]
  [:select {:on-change on-change}
   (map build-option options)])

(defn yak-select
  [on-change]
  (on-change-select on-change (fmap :name yaks)))

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

(defn get-value [e] (-> e .-target .-value))

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

(defn flip-box
  [title selected options flip next]
  [:div
   [:h2 title]
   [:div [:span (selected options)]]
   [:div
    [:input {:type "button"
             :value "Flip"
             :on-click flip}]
    [:input {:type "button"
             :value "Next"
             :on-click next}]]])

(defn flip-box2
  [title selected selected-name options flip next]
  [:div
   [:h2 title]
   [:span selected-name]
   [:div [:span (selected options)]]
   [:div
    [:input {:type "button"
             :value "Flip"
             :on-click flip}]
    [:input {:type "button"
             :value "Next"
             :on-click next}]]])

(defn get-random-sentence
  [yak]
  (go (let [response (<! (http/get sentence-path {:query-params {:yak (name yak)}}))]
        (:body (:body response)))))

(defn get-tags
  [yak]
  (go (let [response (<! (http/get tags-path {:query-params {:yak (name yak)}}))]
        (into #{} (:body (:body response))))))

(defn get-sentences-for-tag
  [yak tag]
  (go (let [response (<! (http/get tag-path {:query-params {:yak (name yak) :tag tag}}))]
        (into #{} (:body (:body response))))))

(defn tag-sentence
  [yak tag id]
  (go (let [response (<! (http/post tag-path {:query-params {:yak (name yak) :tag tag :id id}}))]
        (:body response))))

(defn get-language
  [yak]
  (go
    (let [response (<! (http/get (str base-path "language") {:query-params {:yak (name yak)}}))]
      (:body response))))

(defn get-sentence-range
  [yak start end]
  (go
    (let [response (<! (http/get sentences-path {:query-params {:yak (name yak) :start start :end end}}))]
      (:body response))))
