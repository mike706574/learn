(ns mike.misc
  (:require [clojure.string :refer [blank? capitalize]]
            [goog.net.cookies :as cookies]
            [cemerick.url :as curl]
            [clojure.walk :refer [keywordize-keys]]))

(enable-console-print!)

;; browser
(defn redirect!
  [url]
  (-> js/document .-location
      (set! url)))

(defn get-value [e] (-> e .-target .-value))

(defn get-url
  []
  (curl/url (.-href (.-location js/window))))

(defn get-query-params
  []
  (keywordize-keys (:query (get-url))))


;; TODO: doesn't work
(def is-number? (comp not js/isNaN))

(defn is-integer?
  [s]
  (and (is-number? s) (integer? (js/parseInt s))))

;; webservice
(defn ok? [status] (= (keyword status) :ok))
(def bad? (comp not ok?))

;; generic
(def third #(nth % 2))

(def not-nil? (comp not nil?)) 
(def not-blank? (comp not blank?)) 
(def not-empty? (comp not empty?))

(defn maps [f coll] (into #{} (map f coll)))
(defn mapm [f coll] (into {} (map f coll)))

(defn find-first [f coll] (first (filter f coll)))

(defn mapback
  [f coll]
  (into (empty coll) (map f coll)))

(defn fmap
  [f m]
  (into (empty m) (for [[k v] m] [k (f v)])))

(defn kmap
  [f m]
  (into (empty m) (for [[k v] m] [(f k) v])))

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
