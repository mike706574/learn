(ns mike.config
  (:refer-clojure :exclude [load]) 
  (:require [clojure.java.io :as io]
            [clojure.edn :as edn]))

(defn load [type] (edn/read-string (slurp (io/resource (str type ".edn")))))
