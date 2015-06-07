(ns mike.sentence.factory
  (:require [mike.sentence.http]
            #?(:clj [mike.sentence.jdbc]))
  (:import [mike.sentence.http HttpSentenceRepo]
           #?(:clj [mike.sentence.jdbc JdbcSentenceRepo])))

(defn throw-generic
  [message]
  #?(:clj (throw (Exception. message))
     :cljs (throw (js/Error. message))))

(defn build-sentence-repo
  [config]
  (let [type (:sentence-repo-type config)]
    (case type
      :jdbc
      #?(:clj (JdbcSentenceRepo. (:sentence-repo-database config))
         :cljs (throw-generic (str "JDBC sentence repo is not supported in ClojureScript.")))
      :http (HttpSentenceRepo. config)
      (throw-generic (str "Invalid sentence repo type: " (name type))))))

