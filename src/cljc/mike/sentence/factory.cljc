(ns mike.sentence.factory
  (:require [mike.penance.webservice]
            #?(:clj [mike.sentence.database]))
  (:import [mike.penance.webservice WebserviceSentenceRepo]
           #?(:clj [mike.sentence.database DatabaseSentenceRepo])))

(defn blow-up
  [sentence-repo-type]
  (let [message (str "Invalid sentence repo type: " (name sentence-repo-type))]
    #?(:clj (throw (Exception. message)))
    #?(:cljs (throw (js/Error. message)))))

(defn build-sentence-repo
  [config]
  (let [type (:sentence-repo-type config)]
    (case type
      #?(:clj :database (DatabaseSentenceRepo. (:sentence-repo-database config))) 
      :webservice (WebserviceSentenceRepo. config)
      (blow-up type))))

