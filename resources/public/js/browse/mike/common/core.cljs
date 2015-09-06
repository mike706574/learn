(ns mike.common.core
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [lang.sentence.api :refer [yaks] :as api]
            [cljs-http.client :as http]
            [cljs.core.async :refer [<!]]))

(def base-path "http://localhost:8080/api/")
(def sentence-path (str base-path "sentence"))
(def sentences-path (str base-path "sentences"))

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


(defn navigation-buttons
  [page-number page-count show-fn]
  [:div
   (when (not= 1 page-number)
     [:input {:type "button" :value "First" :on-click #(show-fn 1)}])
   (when (< 1 page-number)
     [:input {:type "button" :value "Previous" :on-click #(show-fn (dec page-number))}])
   (when (not= page-number page-count)
     [:input {:type "button" :value "Next" :on-click #(show-fn (inc page-number))}])
   (when (not= page-number page-count)
     [:input {:type "button" :value "Last" :on-click #(show-fn page-count)}])])

(defn get-random-sentence
  [yak]
  (http/get sentence-path {:query-params {:yak (name yak)}}))

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
