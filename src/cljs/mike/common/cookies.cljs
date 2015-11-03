(ns mike.common.cookies
  (:refer-clojure :exclude [get keys])
  (:require [clojure.string :refer [blank? capitalize]]
            [goog.net.cookies :as cookies]))

(defn get
  [k]
  (.get goog.net.cookies (name k)))

(defn keys
  []
  (js->clj (.getKeys goog.net.cookies)))
