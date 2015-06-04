(ns mike.sentence.database
  (:require [mike.sentence.api :refer [SentenceRepo] :as api]
            [clojure.java.jdbc :as db]
            [clojure.core.async :refer [go]]))

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
  [config table-key]
  (go (random-sentence config table-key)))

(defn- async-random-sentences
  [config table-key n]
  (go (random-sentences config table-key n)))

(defrecord DatabaseSentenceRepo [config]
  SentenceRepo
  (get-random-sentence [_] (random-sentence config italian-key))
  (get-random-sentences [_ n] (random-sentences config italian-key n))
  (aget-random-sentence [_] (async-random-sentence config italian-key channel))
  (aget-random-sentence [_] (async-random-sentence config italian-key channel)))
