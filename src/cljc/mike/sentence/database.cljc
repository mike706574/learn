(ns mike.sentence.database
  (:require [mike.penance.api :refer [SentenceRepo] :as mapi]
            [clojure.java.jdbc :as db]
            [clojure.java.io :refer [reader]]
            [clojure.pprint :refer [pprint]]
            [clojure.string :as string]
            [clojure.core.async :refer [chan go >! <! <!!]]))

(def italian-key :italian_sentence)
(def italian-txt "/home/mike/ita.txt")
(def italian-csv "/home/mike/ita.csv")

;; ALTER DATABASE mike  CHARACTER SET utf8 COLLATE utf8_unicode_ci;
;; ALTER TABLE italian_sentence CONVERT TO CHARACTER SET utf8 COLLATE utf8_unicode_ci;

(defn create-sentence-table!
  [config table-key]
  (db/db-do-commands
   config
   (db/create-table-ddl
    table-key
    [:id "int auto_increment primary key"]
    [:english "text"]
    [:italian "text"]
    :table-spec "default character set utf8 collate
 utf8_unicode_ci")))

(defn drop-sentence-table!
  [config table-key]
  (db/db-do-commands
   config
   (db/drop-table-ddl table-key)))

(defn clear-sentences!
  [config table-key]
  (db/delete! config table-key []))

(defn insert-sentence!
  [config table-key sentence]
;;  (println "insert")
  (db/insert! config table-key sentence))

(defn parse-sentence
  [s]
  (let [[english italian] (string/split s #"\t")]
    {:english english :italian italian}))

(defn load-sentences-slowly!
  [config path]
  (with-open [rdr (reader path)]
    (let [insert-sentence-here! (partial insert-sentence! config)
          parse-and-insert! (comp insert-sentence-here! parse-sentence)]
      (dorun (map parse-and-insert! (line-seq rdr))))))

(defn enclose
  [outer inner]
  (str outer inner outer))

(def double-quote (partial enclose "\""))

(defn convert-and-spit!
  [output line]
  (let [[english italian] (string/split line #"\t")
        csv-line (str (double-quote english) "," (double-quote italian) "\n")]
    (spit output csv-line :append true)))

(defn reformat!
  [input output ] 
  (with-open [rdr (reader input)]
    (dorun (map (partial convert-and-spit! output) (line-seq rdr)))))

(defn load-sentences-quickly!
  [config table-key path]
  (let [command (str "load data local infile ? into table "
                     (name table-key)
                     " fields terminated by ','"
                     " enclosed by '\"'"
                     " lines terminated by '\\n'"
                     " (english, italian)")]
    (db/execute! config [command path])))

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
