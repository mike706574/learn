(ns mike.jaguar
  (:require [clj-time.core :as t]
            [clj-time.coerce :as tc]
            [clojure.walk :as w]
            [clojure.pprint :as p])
  (:import [java.io StringWriter]
           [java.text SimpleDateFormat]))


(defn spprint [m] 
  (let [w (StringWriter.)]
    (p/pprint m w)
    (.toString w)))

(defn date-to-string
  [date]
  (.format (SimpleDateFormat. "MM/dd/yyyy HH:mm:ss") date))

(defn coerce
  [x]
  (if (instance? java.sql.Timestamp x)
    (date-to-string x)
    x))

(defn coerce-tree [x] (w/prewalk coerce x))

(defn runtime [& args] (throw (ex-info (apply str args))))

(defn now [] (tc/to-date (t/now)))

(defn parse-boolean
  [x]
  (case x
    "true" true
    "false" false
    (throw (ex-info "I don't even know."))))

(defn lines
  [path]
  (with-open [rdr (clojure.java.io/reader path)]
    (doall (line-seq rdr))))
