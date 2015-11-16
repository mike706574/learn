(ns mike.jaguar
  (:require [clj-time.core :as time]
            [clj-time.coerce :as coerce]))

(defn runtime [& args] (throw (RuntimeException. (apply str args))))

(defn now [] (coerce/to-date (time/now)))
