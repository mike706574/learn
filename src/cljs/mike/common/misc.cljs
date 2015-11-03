(ns mike.common.misc
  (:require [clojure.string :refer [blank? capitalize]]
            [goog.net.cookies :as cookies]))

(enable-console-print!)

(def third #(nth % 2))

(def not-blank? (comp not blank?))

(def is-number? (comp not js/isNaN))

(def not-empty? (comp not empty?))

;; dis dont work
(defn is-integer?
  [s]
  (and (is-number? s) (integer? (js/parseInt s))))

(defn maps [f coll] (into #{} (map f coll)))
(defn mapm [f coll] (into {} (map f coll)))

(defn ok? [status] (= (keyword status) :ok))
(def bad? (comp not ok?))

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
