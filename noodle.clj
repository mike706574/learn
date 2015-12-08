(ns mike.noodle
  (:refer-clojure :exclude [read replace])
  (:require [mike.dynamite :as d]
            [mike.misc :as m]
            [mike.jaguar :as j]
            [mike.memory :as memory]
            [mike.entity.api :refer [EntityRepo]]
            [clojure.string :refer [join replace]]
            [clojure.core.async :refer [go <!!]]
            [clojure.java.jdbc :as jdbc]
            [clojure.edn :as e]
            [clojure.set :refer [rename-keys]]
            [clojure.walk :refer [keywordize-keys]]
            [clj-time.core :as time]
            [clj-time.coerce :as coerce]))

(defmacro go-try
  [& body]
  `(go
     (try
       ~(conj body `do)
       (catch Exception e#
         (clojure.stacktrace/print-stack-trace e#)
         e#))))

(defn create-noodle-table!
  [config]
  (let [command (str "create table noodle"
                     "(id int not null auto_increment, "
                     "user varchar(32) not null, "
                     "data longtext null,"
                     "published bool not null, "
                     "created timestamp default 0, "
                     "modified timestamp not null default current_timestamp on update current_timestamp, "
                     "primary key (id))"
                     "default character set utf8 collate utf8_unicode_ci")]
    (jdbc/execute! config [command])))

(defn read
  [config id]
  (when-let [row (first (jdbc/query config ["select id, user, data, created, modified, published from noodle where id = ?" id]))]
    (if-let [data (:data row)]
      (assoc row :data (e/read-string data))
      row)))

(defn create!
  [config user]
  (jdbc/with-db-transaction [tx config]
    (let [noodle {:user user :published false :created (j/now)}
          id (d/insert! tx "noodle" noodle)]
      (read tx id))))

(defn publish!
  [config id data]
  (jdbc/with-db-transaction [tx config]
    (jdbc/update! config "noodle" {:published true :data (pr-str data)} ["id = ?" id])
    (read tx id)))

(def config {:subprotocol "mysql"
             :subname "//localhost:3306/entity_dev"
             :user "root"
             :password "goose"})

(defn kick
  [config user sentences]
  (let [{:keys [id created] :as noodle} (create! config user)]
    (println "Created noodle" id "at" (j/date-to-string created))
    (go-try
     (println "Starting query" user)
     (let [sentences (memory/query-many sentences [:it :spa])]
       (let [{:keys [modified]} (publish! config id sentences)]
         (println modified)
         (println "Published noodle" id "at" (j/date-to-string modified)))))
    noodle))
