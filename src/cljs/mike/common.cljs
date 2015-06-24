(ns mike.common
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [lang.sentence.api :refer [yaks] :as api]
            [cljs-http.client :as http]
            [cljs.core.async :refer [<!]]))

(def base-path "http://localhost:8080/api/")
(def sentence-path (str base-path "sentence"))
(def sentences-path (str base-path "sentences"))

(defn language-option
  [yak]
  (let [k (key yak)
        v (val yak)]
    [:option {:key k :value k} (:name v)]))

(defn language-select
  [on-change]
  [:select {:on-change on-change}
   (map language-option yaks)])

(defn get-random-sentence
  [yak]
  (http/get sentence-path {:query-params {:yak (name yak)}}))

(defn get-language
  [yak]
  (http/get (str base-path "language") {:query-params {:yak (name yak)}}))

(defn get-sentence-range
  [yak start end]
  (http/get sentences-path {:query-params {:yak (name yak) :start start :end end}}))
