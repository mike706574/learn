(ns mike.entity.jdbc
  (:refer-clojure :exclude [replace])
  (:require [mike.dynamite :as d]
            [mike.misc :as m]
            [mike.jaguar :as j]
            [mike.entity.api :refer [EntityRepo]]
            [clojure.string :refer [join replace]]
            [clojure.core.async :refer [go <!!]]
            [clojure.java.jdbc :as jdbc]
            [clojure.set :refer [rename-keys]]
            [clojure.walk :refer [keywordize-keys]]
            [clj-time.core :as time]
            [clj-time.coerce :as coerce])
  (:import [org.apache.commons.lang3 StringUtils]))

;; TODO: what does this do? somebody probably already done
(defn replace-key
  [m old-key new-key f]
  (let [old-value (get m old-key)
        old-removed (dissoc m old-key)]
    (assoc old-removed new-key (f old-value))))

(def attribute-table "attributes")
(def type-table "types")

(defn create-type-table!
  [config]
  (let [command (str "create table "
                     type-table
                     "(id int not null auto_increment primary key, "
                     "label varchar(64) not null, "
                     "description text not null, "
                     "user varchar(32) not null, "
                     "created timestamp not null default '0000-00-00 00:00:00', "
                     "unique key user_type (label, user))"
                     "default character set utf8 collate utf8_unicode_ci")]
    (jdbc/execute! config [command])
    {:status :ok}))

(defn create-attribute-table!
  [config]
  (let [command (str "create table "
                     attribute-table
                     "(id varchar(64) not null, "
                     "type int not null, "
                     "label varchar(64) not null, "
                     "description text not null, "
                     "schema_id varchar(64) not null, "
                     "primary key (id, type), "
                     "foreign key (type) references "
                     type-table
                     "(id) on delete cascade)"
                     "default character set utf8 collate utf8_unicode_ci")]
      (jdbc/execute! config [command])
      {:status :ok}))

(defn try-dropping-tables!
  [config tables]
  (doseq [table tables]
    (try
      (d/drop-table! config table)
      (catch Exception e))))

(defn type-exists? [config id]
  (d/id-taken? config type-table id))

(defn tag-table [type-id] (str type-id "_tag"))
(defn lesson-table [type-id] (str type-id "_lesson"))
(defn lesson-entity-table [type-id] (str type-id "_lesson_entity"))
(defn entity-table [type-id] (str type-id "_entity"))
(defn answer-table [type-id] (str type-id "_answer"))
(defn session-table [type-id] (str type-id "_session"))

(defn sqlify [x] (replace (name x) #"-" "_"))

(defn get-sql-type
  [schema]
  (case (keyword schema)
    :int "int"
    :str "text"
    (throw (Exception. (str "Unsupported attribute type: " schema)))))

(defn get-schema
  [sql-type]
  (case sql-type
    "int" :int
    "text" :str
    (throw (Exception. (str "Unsupported SQL type: " sql-type)))))

(defn build-attribute-sql
  [{:keys [id schema_id]}]
  (let [name (name id)]
    (cond
      (not (StringUtils/isAlphanumeric name)) (throw (RuntimeException. "Attribute IDs must be alphanumeric!"))
      (not (Character/isLetter (first name))) (throw (RuntimeException. "The first character in an attribute ID must be a letter!"))
      :else (str "`" name "` " schema_id " not null"))))

(defn create-entity-table!
  [config type-id attributes]
  (let [command (str "create table "
                     (entity-table type-id)
                     "(id int not null primary key, "
                     "user varchar(32) not null, "
                     "created timestamp default 0, "
                     "modified timestamp not null default current_timestamp on update current_timestamp, "
                     (join "," (map build-attribute-sql attributes))
                     ") default character set utf8 collate utf8_unicode_ci")]
    (jdbc/execute! config [command])))

(defn create-tag-table!
  [config type-id]
  (let [command (str "create table "
                     (tag-table type-id)
                     "(id int not null, "
                     "tag varchar(64) not null, "
                     "created timestamp default 0, "
                     "modified timestamp not null default current_timestamp on update current_timestamp, "
                     "primary key (id, tag), "
                     "foreign key (id) references "
                     (entity-table type-id)
                     "(id) on delete cascade) "
                     "default character set utf8 collate utf8_unicode_ci")]
    (jdbc/execute! config [command])))

(defn create-lesson-table!
  [config type-id]
  (let [command (str "create table "
                     (lesson-table type-id)
                     "(id int not null auto_increment primary key, " 
                     "name varchar(64) not null, "
                     "user varchar(32) not null, "
                     "start varchar(64), "
                     "length int not null, "
                     "description varchar(256) not null, "
                     "created timestamp default 0, "
                     "modified timestamp not null default current_timestamp on update current_timestamp, "
                     "foreign key (start) references " attribute-table "(id) on delete cascade)" 
                     "default character set utf8 collate utf8_unicode_ci")]
    (jdbc/execute! config [command])))

(defn create-lesson-entity-table!
  [config type-id]
  (let [command (str "create table "
                     (lesson-entity-table type-id)
                     "(lesson int not null, "
                     "entity int not null, "
                     "created timestamp default 0, "
                     "modified timestamp not null default current_timestamp on update current_timestamp, "
                     "primary key (lesson, entity), "
                     "foreign key (lesson) references " (lesson-table type-id) "(id) on delete cascade, "
                     "foreign key (entity) references " (entity-table type-id) "(id) on delete cascade) " 
                     "default character set utf8 collate utf8_unicode_ci")]
    (jdbc/execute! config [command])))

(defn create-answer-table!
  [config type-id]
  (let [command (str "create table "
                     (answer-table type-id)
                     "(id int not null, "
                     "user varchar(32) not null, "
                     "start varchar(64) not null, "
                     "correct int not null, "
                     "total int not null, "
                     "created timestamp default 0, "
                     "modified timestamp not null default current_timestamp on update current_timestamp, "
                     "primary key (id, start, user), "
                     "foreign key (id) references " (entity-table type-id) "(id) on delete cascade, "
                     "foreign key (start) references " attribute-table "(id) on delete cascade) "
                     "default character set utf8 collate utf8_unicode_ci")]
    (jdbc/execute! config [command])))

(defn create-session-table!
  [config type-id]
  (let [command (str "create table "
                     (session-table type-id)
                     "(id int not null auto_increment, "
                     "lesson_id int not null, "
                     "entity_id int not null, "
                     "entity_start varchar(64), "
                     "user varchar(32) not null, "
                     "correct int not null, "
                     "total int not null, "
                     "length int not null, "
                     "done bool not null, "
                     "created timestamp default 0, "
                     "modified timestamp not null default current_timestamp on update current_timestamp, "
                     "primary key (id),"
                     "foreign key (lesson_id) references " (lesson-table type-id) "(id) on delete cascade, "
                     "foreign key (entity_id) references " (entity-table type-id) "(id) on delete cascade) "
                     "default character set utf8 collate utf8_unicode_ci")]
    (jdbc/execute! config [command])))

(defmacro deft
  [fn-symbol args & body]
  `(def ~fn-symbol
     (fn ~args
       (go
         (try
           (if (nil? (second ~args))
             {:status :bad-request :body "Type was nil!"} 
             (if (type-exists? (first ~args) (second ~args))
               ~(conj body `do)
               {:status :missing :body (str "Invalid type ID: " (second ~args))}))
           (catch Exception e# {:status :error :body (.getMessage e#) :exception e#}))))))

(defn set-up-type!
  [config user type-spec]
  (jdbc/with-db-transaction [conn config]
    (let [type-info (-> type-spec
                        (dissoc :attributes)
                        (assoc :user user
                               :created (j/now)))
          type-id (d/insert! conn type-table type-info)
          attribute-specs (:attributes type-spec)
          attributes (map #(-> %
                               (assoc :type type-id
                                      :schema_id (get-sql-type (:schema %)))
                               (dissoc :schema)) attribute-specs)]
      (doseq [attribute attributes]
        (d/insert! conn attribute-table attribute))
      (create-entity-table! conn type-id attributes)
      (create-tag-table! conn type-id)
      (create-lesson-table! conn type-id)
      (create-lesson-entity-table! conn type-id)
      (create-answer-table! conn type-id)
      (create-session-table! conn type-id)
      type-id)))

(defn select-type
  [config type-id]
  (let [query "select * from attributes where type = ?"
        attributes (jdbc/query config [query type-id])
        attributes (into [] (map (fn [attribute]
                                   (replace-key (dissoc attribute :type) :schema_id :schema get-schema)))
                         attributes)
        query "select * from types where id = ?"
        info (first (jdbc/query config [query type-id]))]
    (assoc info :id type-id :attributes attributes)))

(deft get-type
  [config type-id]
  {:status :ok :body (select-type config type-id)})

(defn create-type!
  [config user {:keys [label description attributes] :as type-spec}] 
  (cond
    ;; TODO: better/more validation
    (nil? label) {:status :invalid :body "A label is required."}
    (nil? description) {:status :invalid :body "A description is required."}
    (empty? attributes) {:status :invalid :body "At least one attribute is required."} 
    :else
    (try
      (let [type-id (set-up-type! config user type-spec)]
        {:status :ok :body (select-type config type-id)})
      (catch Exception e
        {:status :error
         :body (str "Failed to create type: " label)
         :exception e}))))

(deft delete-type!
  [config type-id]
  (if (type-exists? config type-id)
    (jdbc/with-db-connection [conn config]
      (try 
        (d/drop-tables! config [(session-table type-id)
                                  (answer-table type-id)
                                  (lesson-entity-table type-id)
                                  (lesson-table type-id)
                                  (tag-table type-id)
                                  (entity-table type-id)]) 
        (jdbc/delete! config attribute-table ["type = ?" type-id])
        (jdbc/delete! config type-table ["id = ?" type-id]) 
        {:status :ok}
        (catch Exception e
          {:status :error
           :body (str "Failed to delete type:" type-id)
           :exception e})))
    {:status :missing :body "That type doesn't exist."}))

(defn get-types
  [config]
  (let [type-ids (jdbc/query config ["select id from types"] :row-fn :id)]
    {:status :ok :body (m/mapm (fn [type-id] [type-id (select-type config type-id)]) type-ids)}))

(deft count-entities
  [config type-id]
  {:status :ok :body (d/count-rows config (entity-table type-id))}) 

(defn select-entities-by-id-range
  [config type-id start-id end-id]
  (let [query (str "select * from " (entity-table type-id) " where id between ? and ?")]
    (jdbc/query config [query start-id end-id])))

(defn get-attribute-id
  [config type-id label]
  (let [command "select id from attributes where type = ? and label = ?"]
    (jdbc/query config [command type-id label])))

(deft add-entity!
  [config type-id user entity]
  (let [table (entity-table type-id)
        row-count (d/count-rows config table )
        entity-id (inc row-count)
        prepared-entity (dissoc (assoc entity :user user :id entity-id :created (j/now)) :type-id)
        result (jdbc/insert! config table prepared-entity)]
    (d/get-row-by-id config table :id entity-id)))

(deft get-entity
  [config type-id id]
  (d/get-row-by-id config (entity-table type-id) :id id))

(deft get-random-entity
  [config type-id]
  (d/get-random-row config (entity-table type-id) :id))

(deft get-random-entities
  [config type-id n]
  (d/get-random-rows config (entity-table type-id) :id n))

(deft get-entities-by-id-range
  [config type-id start-id end-id]
  (d/get-rows-in-range config (entity-table type-id) :id start-id end-id))

(deft update-entity!
  [config type-id entity-id entity]
  (let [table (entity-table type-id)
        stored-entity (d/select-by-id config table entity-id)]
    (if (nil? stored-entity)
      {:status :missing :body (str "No entity of type " type-id " found with ID " entity-id)}
      (let [merged-entity (merge stored-entity entity)
            cleaned-entity (dissoc merged-entity :created :modified :id)]
        (jdbc/update! config table cleaned-entity ["id = ?" entity-id]) 
        {:status :ok :body (d/select-by-id config table entity-id)}))))

;; potentially dangerous
(deft delete-entity!
  [config type-id entity-id]
  (if (< entity-id 0)
    {:status :error :body "That's a negative entity ID!"}
    (let [row-count (d/count-rows config (entity-table type-id))]
      (if (> entity-id row-count)
        {:status :error :body (str "No entity of type " type-id " with ID " entity-id)}
        (if (= row-count entity-id)
          (do (jdbc/delete! config (entity-table type-id) ["id = ?" entity-id])
              {:status :ok}) 
          (let [table (entity-table type-id)
                last-entity (d/select-by-id config table row-count)
                new-entity (dissoc (assoc last-entity :id entity-id) :modified)]
            (jdbc/delete! config table ["id = ?" entity-id])
            (jdbc/update! config table new-entity ["id = ?" row-count])
            {:status :ok}))))))

(deft delete-lesson!
  [config type-id lesson-id]
  (jdbc/delete! config (lesson-table type-id) ["id = ?" lesson-id])
  {:status :ok})

(defn has-tag?
  [config type-id entity-id tag]
  (let [query (str "select * from " (tag-table type-id) " where id = ? and tag = ?")
        result (jdbc/query config [query entity-id tag])]
    (> (count result) 0)))

(deft tag-entity!
  [config type-id entity-id tag]
  (if-let [entity (d/select-by-id config (entity-table type-id) entity-id)]
    (if (has-tag? config type-id  entity-id tag)
      {:status :exists}
      (let [table (tag-table type-id)]
        (jdbc/insert! config table {:id entity-id :tag tag :created (j/now)})
        {:status :ok :body {:entity entity :tag tag}}))
    {:status :missing}))

(deft untag-entity!
  [config type-id entity-id tag]
  (if-let [entity (d/select-by-id config (entity-table type-id) entity-id)]
    (if (has-tag? config type-id  entity-id tag)
      (let [query "id = ? and tag = ?"]
        (jdbc/delete! config (tag-table type-id) [query entity-id tag])
        {:status :ok})
      {:status :missing}) ;; TODO: can't tell difference between tag and entity missing
    {:status :missing}))

(deft delete-tag!
  [config type-id tag]
  ;; TODO: check if tag exists first? Or count number of entities tagged? 
  (jdbc/delete! config (tag-table type-id) ["tag = ?" tag]) 
  {:status :ok :body tag})

(deft get-entity-tags
  [config type-id entity-id]
  (if-let [entity (d/select-by-id config (entity-table type-id) entity-id)]
    (let [query (str "select tag from " (tag-table type-id) " where id = ?")
          tags (vec (jdbc/query config [query entity-id] :row-fn :tag))]
      {:status :ok :body tags})
    {:status :missing}))

(defn get-tag-ids
  [config type-id tag]
  (let [query (str "select id from " (tag-table type-id) " where tag = ?")]
    (map :id (jdbc/query config [query tag]))))

(deft get-entities-with-tag
  [config type-id tag]
  (let [entity-ids (get-tag-ids config type-id tag)]
    (if (empty? entity-ids)
      {:status :ok :body []}
      {:status :ok :body (d/select-by-ids config (entity-table type-id) entity-ids)})))

(deft get-entities-for-user
  [config type-id user]
  {:status :ok :body (d/select-equal config (entity-table type-id) :user user)})

(deft get-random-entity-with-tag
  [config type-id tag]
  (let [entity-ids (get-tag-ids config type-id tag)]
    (if (empty? entity-ids)
      {:status :missing}
      (d/get-row-by-id config (entity-table type-id) :id (rand-nth entity-ids)))))

(deft get-random-entities-with-tag
  [config type-id tag n]
  (let [tag-ids (get-tag-ids config type-id tag)]
    (if (empty? tag-ids)
      {:status :missing}
      (if (< (count tag-ids) n)
        {:status :not-enough}
        (let [entity-ids (d/take-unique-random n tag-ids)]
          {:status :ok :body (d/select-by-ids config (entity-table type-id) entity-ids)})))))

(deft remove-from-lesson!
  [config type-id lesson-id entity-id]
  (jdbc/delete! config (lesson-entity-table type-id) ["lesson = ? and entity = ?" lesson-id entity-id])
  {:status :ok})

;; lesson access
(defn select-lesson-info
  [config type-id lesson-id]
  (d/select-by-id config (lesson-table type-id) lesson-id))

(defn select-lesson-entity-ids
  [config type-id lesson-id]
  (map :entity (d/select-equal config (lesson-entity-table type-id) :lesson lesson-id)))

(defn select-lesson-entities
  [config type-id lesson-id]
  (let [ids (select-lesson-entity-ids config type-id lesson-id)]
    (d/select-by-ids config (entity-table type-id) ids)))

(deft get-lesson-info
  [config type-id lesson-id]
  (if-let [info (select-lesson-info config type-id lesson-id)]
    {:status :ok :body info}
    {:status :missing :body (str "No lesson of type " type-id " found with ID " lesson-id)}))

(deft get-lesson
  [config type-id lesson-id]
  (if-let [lesson (select-lesson-info config type-id lesson-id)]
    (let [entities (select-lesson-entities config type-id lesson-id)]
      {:status :ok :body (assoc lesson :entities entities)})
    {:status :missing :body (str "No lesson of type " type-id " found with ID " lesson-id)}))

(deft get-lesson-entities
  [config type-id lesson-id]
  (if-let [info (select-lesson-info config type-id lesson-id)]
    {:status :ok :body (select-lesson-entities config type-id lesson-id)}
    {:status :missing :body (str "No lesson of type " type-id " found with ID " lesson-id)}))

(deft get-lessons-for-user
  [config type-id user]
  (let [lessons (d/select-equal config (lesson-table type-id) :user user)]
    {:status :ok :body lessons}))

(deft remove-from-lesson!
  [config type-id lesson-id entity-id]
  (jdbc/delete! config (lesson-entity-table type-id) ["lesson = ? and entity = ?" lesson-id entity-id])
  {:status :ok})

(deft get-lessons
  [config type-id]
  (let [lessons (d/select-all config (lesson-table type-id))]
    {:status :ok :body lessons}))

(deft create-lesson!
  [config type-id user lesson]
  (let [row-count (d/count-rows config (lesson-table type-id))
        prepared-lesson (assoc lesson :user user :created (j/now))
        lesson-id (d/insert! config (lesson-table type-id) prepared-lesson)]
    {:status :ok :body (select-lesson-info config type-id lesson-id)}))

(deft add-to-lesson!
  [config type-id lesson-id entity-id]
  (jdbc/insert! config (lesson-entity-table type-id) {:lesson lesson-id :entity entity-id :created (j/now)})
  {:status :ok})

(deft remove-from-lesson!
  [config type-id lesson-id entity-id]
  (jdbc/delete! config (lesson-entity-table type-id) ["lesson = ? and entity = ?" lesson-id entity-id])
  {:status :ok})

(defn parse-session
  [session]
  (rename-keys session {:lesson_id :lesson-id :entity_id :entity-id :entity_start :entity-start}))

(defn add-lesson-name
  [config type-id session]
  (let [lesson-info (select-lesson-info config type-id (:lesson-id session))
        lesson-name (:name lesson-info)]
    (assoc session :lesson-name lesson-name)))

(defn add-lesson-names
  [config type-id sessions] 
  (let [lessons (d/select-all config (lesson-table type-id))
        lesson-map (m/mapm (fn [lesson] [(:id lesson) lesson]) lessons)]
    (map #(assoc % :lesson-name (:name (get lesson-map (:lesson-id %)))) sessions)))

(defn session-query
  [type-id]
  (str "select s.id, s.user, s.created, s.modified, s.done, s.correct, s.total, s.entity_id as `entity-id`, s.entity_start as `entity-start`, l.id as `lesson-id`, l.name, l.description, l.start, l.length from " (session-table type-id) " as s LEFT JOIN " (lesson-table type-id) " as l on s.lesson_id = l.id"))

(defn select-session
  [config type-id id]
  (first (jdbc/query config [(str (session-query type-id) " where s.id = ?") id])))

(deft get-session
  [config type-id id]
  (if-let [session (select-session config type-id id)]
    {:status :ok :body session}
    {:status :missing :body (str "No session of type " type-id " found with ID " id)}))

(deft get-sessions
  [config type-id user-id] 
  {:status :ok :body (jdbc/query config [(session-query type-id)])})

(def entity-db {:subprotocol "mysql"
                :subname "//localhost:3306/entity_dev"
                :user "root"
                :password "goose"})




(deft get-sessions-for-user
  [config type-id user-id {:keys [done] :as things}]
  (if (nil? done)
    {:status :ok :body (jdbc/query config [(str (session-query type-id) " where s.user = ?") user-id])}
    
    {:status :ok :body (jdbc/query config [(str (session-query type-id) " where s.user = ? and s.done = ?") user-id (j/parse-boolean done)])}))

(deft get-completed-sessions-for-user
  [config type-id user-id]
    {:status :ok :body (jdbc/query config [(str (session-query type-id) " where s.user = ? and s.done = ?") user-id false])})

(defn get-random-lesson-entity-id
  [config type-id lesson-id]
  (let [lesson-entity-ids (select-lesson-entity-ids config type-id lesson-id)]
    (if (empty? lesson-entity-ids)
      nil
      (rand-nth lesson-entity-ids))))

(defn get-entity-start
  [config type-id start]
  (if start
    start
    (let [type (select-type config type-id)
          attributes (:attributes type)
          ids (map :id attributes)]
      (rand-nth ids))))

(deft create-session!
  [config type-id user lesson-id]
  (let [{:keys [name start length]} (select-lesson-info config type-id lesson-id)
        entity-id (get-random-lesson-entity-id config type-id lesson-id)
        entity-start (get-entity-start config type-id start)]
    (if entity-id
      (let [session {:lesson_id lesson-id
                     :entity_id entity-id
                     :entity_start entity-start
                     :user user
                     :correct 0
                     :total 0
                     :length length
                     :done 0
                     :created (j/now)}
            session-id (d/insert! config (session-table type-id) session)] 
        {:status :ok :body (select-session config type-id session-id)})
      {:status :bad :body (str "Lesson " name " is empty!" )})))

(defn record-entity-answer!
  [config type-id entity-id user start correct?]
  (let [start (name start)
        table (answer-table type-id)
        ;; TODO: select-where
        query (str "select * from " table " where id = ? and user = ? and start = ?")
        row (first (jdbc/query config [query entity-id user start]))]
    (if (nil? row)
      (let [correct (if correct? 1 0)]
        (jdbc/insert! config table {:id entity-id :user user :correct correct :total 1 :start start :created (j/now)}))
      (let [previous (:correct row)
            correct (if correct? (inc previous) previous) 
            total (inc (:total row))]
        (jdbc/update! config table {:correct correct :total total} ["id = ? and user = ? and start = ?" entity-id user start])))))

(deft record-individual-answer!
  [config type-id entity-id user start correct?]select-session
  (record-entity-answer! config type-id entity-id user start correct?)
  {:status :ok})

(deft record-answer!
  [config type-id user session-id entity-id entity-start correct?]
  (println "record-answer!")
  (println "Session:" session-id)
  (println entity-id)
  (let [{done? :done session-entity-id :entity-id :as session} (select-session config type-id session-id)]
    (println "DONE?" done?)
    (cond
      (nil? session) {:status :what :body "TODO: no session"}
      done? {:status :what :body "TODO: already done?"}
      (not= entity-id session-entity-id) {:status :invalid :body
                                          (str "Expected entity " session-entity-id " but got " entity-id)}
      :else (let [{:keys [total length correct lesson-id start]} session
                  total (inc total)
                  correct (if correct? (inc correct) correct)
                  done? (= total length)
                  table (session-table type-id)
                  new-start (get-entity-start config type-id start)
                  new-entity-id (get-random-lesson-entity-id config type-id lesson-id)]
              (jdbc/update! config table {:correct correct
                                          :total total
                                          :done done?
                                          :entity_id new-entity-id} ["id = ?" session-id]
                                          :entity_start new-start)
              (println entity-start)
              (record-entity-answer! config type-id entity-id user entity-start correct?)
              {:status :ok :body (select-session config type-id session-id)}))))

(deft get-stats
  [config type-id entity-id user]
  (if-let [entity (d/select-by-id config (entity-table type-id) entity-id)]
    (let [table (answer-table type-id)
          query (str "select * from " table " where id = ? and user = ?")
          row (first (jdbc/query config [query entity-id user]))]
      (if (nil? row)
        {:status :ok :body {:correct 0 :total 0}}
        {:status :ok :body {:correct (:correct row) :total (:total row)}}))
    {:status :missing}))

(defrecord JdbcEntityRepo [config user]
  EntityRepo
  (create-type! [_ type-spec] (go (create-type! config user type-spec)))
  (get-types [_] (go (get-types config)))
  
  (delete-type! [_ type-id] (delete-type! config type-id))
  (get-type [_ type-id] (get-type config type-id))

  (count-entities [_ type-id] (count-entities config type-id))
  (add-entity! [_ type-id entity] (add-entity! config type-id user entity))
  (update-entity! [_ type-id entity-id entity] (update-entity! config type-id entity-id entity))
  (delete-entity! [_ type-id entity-id] (delete-entity! config type-id entity-id))

  (get-entity [_ type-id entity-id] (get-entity config type-id entity-id))
  (get-random-entity [_ type-id] (get-random-entity config type-id))
  (get-random-entities [_ type-id n] (get-random-entities config type-id n))
  (get-entity-range [_ type-id start end] (get-entities-by-id-range config type-id start end))

  ;; is there any point in tags?
  (tag-entity! [_ type-id entity-id tag] (tag-entity! config type-id entity-id tag))
  (untag-entity! [_ type-id entity-id tag] (untag-entity! config type-id entity-id tag))
  (delete-tag! [_ type-id tag] (delete-tag! config type-id tag))
  (get-entity-tags [_ type-id entity-id] (get-entity-tags config type-id entity-id))
  
  (get-entities-with-tag [_ type-id tag] (get-entities-with-tag config type-id tag))
  (get-random-entity-with-tag [_ type-id tag] (get-random-entity-with-tag config type-id tag))
  (get-random-entities-with-tag [_ type-id tag n] (get-random-entities-with-tag config type-id tag n))

  (get-lesson [_ type-id lesson-id] (get-lesson config type-id lesson-id))
  (get-lesson-info [_ type-id lesson-id] (get-lesson-info config type-id lesson-id))
  (get-lesson-entities [_ type-id lesson-id] (get-lesson-entities config type-id lesson-id))
  (get-lessons [_ type-id] (get-lessons config type-id))
  
  (create-lesson! [_ type-id lesson]
    (create-lesson! config type-id user lesson))
  (delete-lesson! [_ type-id lesson-id]
    (delete-lesson! config type-id lesson-id))
  (add-to-lesson! [_ type-id lesson-id entity-id] (add-to-lesson! config type-id lesson-id entity-id))
  (remove-from-lesson! [_ type-id lesson-id entity-id]
    (remove-from-lesson! config type-id lesson-id entity-id))

  (create-session! [_ type-id lesson-id] (create-session! config type-id user lesson-id))
  (record-answer! [_ type-id session-id entity-id start correct?] 
    (record-answer! config type-id user session-id entity-id start correct?))
  (get-session [_ type-id session-id] (get-session config type-id session-id))

  (get-sessions [_ type-id] (get-sessions config type-id user))
  (get-sessions-for-user [_ type-id criteria] (get-sessions-for-user config type-id user criteria))
  
  (record-individual-answer! [_ type-id entity-id start correct?]
    (record-individual-answer! config type-id entity-id user start correct?))
  
  (get-stats [_ type-id entity-id] (get-stats config type-id entity-id user))
  
  (get-entities-for-user [_ type-id other-user] (get-entities-for-user config type-id other-user))
  (get-lessons-for-user [_ type-id other-user] (get-entities-for-user config type-id other-user))
  (get-stats-for-user [_ type-id entity-id other-user] (get-stats config type-id entity-id other-user)))
