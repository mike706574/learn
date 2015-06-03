(ns mike.sentence.database
  (:require [mike.sentence.api :refer [SentenceRepo] :as api]
            [clojure.java.jdbc :as db]
            [clojure.core.async :refer [chan go >! <! <!!]]))

(def italian-key :italian_sentence)

(defn random-sentences
  [config table-key c]
  (let [table-name (name table-key)
        command (str "select id, english, italian from " table-name " as r1 join"
                     " (select ceil(rand() * (select max(id) from " table-name ")) as rid) as r2"
                     " where r1.id >= r2.rid"
                     " order by r1.id asc limit " c)]
    (db/query config [command])))

(defn- random-sentence
  [config table-key]
  (first (random-sentences config table-key 1)))

(defn- async-random-sentence
  [config table-key channel]
  (println "Asyncronously fetching random sentence")
  (go (Thread/sleep 10000)
      (let [random-sentence (random-sentence config table-key)]
        (println (str "I got " random-sentence ", putting it on the channel now"))
        (>! channel random-sentence))))
  
(defrecord DatabaseSentenceRepo [config]
  SentenceRepo
  (get-random-sentence [_] (random-sentence config italian-key))
  (aget-random-sentence [_ channel] (async-random-sentence config italian-key channel))
  (get-random-sentences [_ n] (random-sentences config italian-key n)))
