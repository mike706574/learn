(ns mike.entity.jdbc
  (:refer-clojure :exclude [replace])
  (:require [mike.dynamite :as dyn]
            [mike.entity.api :refer [EntityRepo]]
            [clojure.string :refer [join replace]]
            [clojure.core.async :refer [go]]
            [clojure.java.jdbc :as jdbc]
            [clojure.set :refer [rename-keys]]
            [clojure.walk :refer [keywordize-keys]]))

;; TODO: find homes
(defn mapm [f coll] (into {} (map f coll)))

;; TODO: what does this do? somebody probably already done
(defn replace-key
  [m old-key new-key f]
  (let [old-value (get m old-key)
        old-removed (dissoc m old-key)]
    (assoc old-removed new-key (f old-value))))

(def attribute-table "attributes")
(def type-table "types")

(defn sqlify [x] (replace (name x) #"-" "_"))

(defn create-type-table!
  [config]
  (let [command (str "create table "
                     type-table
                     "(id varchar(64) primary key, "
                     "label varchar(64) not null, "
                     "description text not null, "
                     "user varchar(32) not null, "
                     "created timestamp not null default '0000-00-00 00:00:00')"
                     "default character set utf8 collate utf8_unicode_ci")]
    (try
      (jdbc/execute! config [command])
      {:status :ok}
      (catch Exception e {:status :error :exception e}))))

(defn create-attribute-table!
  [config]
  (let [command (str "create table "
                     attribute-table
                     "(id varchar(64) not null, "
                     "type varchar(64) not null, "
                     "label varchar(64) not null, "
                     "description text not null, "
                     "schema_id varchar(64) not null, "
                     "primary key (id, type), "
                     "foreign key (type) references "
                     type-table
                     "(id) on delete cascade)"
                     "default character set utf8 collate utf8_unicode_ci")]
    (try
      (jdbc/execute! config [command])
      {:status :ok})))

(defn try-dropping-tables!
  [config tables]
  (doseq [table tables]
    (try
      (dyn/drop-table! config table)
      (catch Exception e))))

(defn destroy!
  [config]
  (try-dropping-tables! config [attribute-table type-table]))

(defn create!
  [config]
  (destroy! config)
  (create-type-table! config)
  (create-attribute-table! config))

(defn type-exists? [config id]
  (dyn/id-taken? config type-table (name id)))

(defn tag-table [type-id] (str (sqlify type-id) "_tag"))
(defn lesson-table [type-id] (str (sqlify type-id) "_lesson"))
(defn lesson-entity-table [type-id] (str (sqlify type-id) "_lesson_entity"))
(defn entity-table [type-id] (str (sqlify type-id) "_entity"))
(defn answer-table [type-id] (str (sqlify type-id) "_answer"))
(defn session-table [type-id] (str (sqlify type-id) "_session"))

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
  [attribute-spec]
  (let [id (:id attribute-spec)
        schema (:schema attribute-spec)
        sql-type (get-sql-type schema)]
    (str id " " sql-type " not null")))

(defn create-entity-table!
  [config type-spec]
  (let [type-id (:id type-spec)
        attribute-specs (:attributes type-spec)
        attribute-ids (map :id attribute-specs)
        command (str "create table "
                     (entity-table type-id)
                     "(id int not null primary key, "
                     "user varchar(32) not null, "
                     "created timestamp not null default '0000-00-00 00:00:00', "
                     "modified timestamp not null default current_timestamp on update current_timestamp, "
                     (join "," (map build-attribute-sql attribute-specs))
                     ") default character set utf8 collate utf8_unicode_ci")]
    (jdbc/execute! config [command])))

(defn create-tag-table!
  [config type-id]
  (let [command (str "create table "
                     (tag-table type-id)
                     "(id int not null, "
                     "tag varchar(64) not null, "
                     "created timestamp not null default '0000-00-00 00:00:00', "
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
                     "start varchar(64) null, "
                     "length int not null, "
                     "description varchar(256) not null, "
                     "created timestamp not null default '0000-00-00 00:00:00', "
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
                     "created timestamp not null default '0000-00-00 00:00:00', "
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
                     "start varchar(64) null, "
                     "correct int not null, "
                     "total int not null, "
                     "created timestamp not null default '0000-00-00 00:00:00', "
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
                     "user varchar(32) not null, "
                     "correct int not null, "
                     "start varchar(64) null, "
                     "total int not null, "
                     "length int not null, "
                     "done bool not null, "
                     "created timestamp not null default '0000-00-00 00:00:00', "
                     "modified timestamp not null default current_timestamp on update current_timestamp, "
                     "primary key (id),"
                     "foreign key (lesson_id) references " (lesson-table type-id) "(id) on delete cascade, "
                     "foreign key (entity_id) references " (entity-table type-id) "(id) on delete cascade, "
                     "foreign key (start) references " attribute-table "(id) on delete cascade) " 
                     "default character set utf8 collate utf8_unicode_ci")]
    (jdbc/execute! config [command])))

(defmacro deft
  [fn-symbol args & body]
  `(def ~fn-symbol
     (fn ~args
       (go
         (try
           (if (nil? (second ~args))
             {:status :bad-request :message "Type was nil!"}
             
             (if (type-exists? (first ~args) (keyword (second ~args)))
               ~(conj body `do)
               {:status :missing :message (str "Invalid type ID: " (name (second ~args)))}))
           (catch Exception e# {:status :error :message (.getMessage e#) :exception e#}))))))

(defn set-up-type!
  [config user type-spec]
  (jdbc/with-db-connection [conn config]
    (let [type-id (:id type-spec)
          type-name (name type-id)
          type-info (-> type-spec
                        (dissoc :attributes)
                        (assoc :id type-name
                              :user user
                               :created nil))]
      (jdbc/insert! conn type-table type-info)
      (doseq [attribute-spec (:attributes type-spec)]
        (let [schema-id (get-sql-type (:schema attribute-spec))
              attribute-info (-> attribute-spec
                                 (assoc :type type-name :schema_id schema-id )
                                 (dissoc :schema))]
          (jdbc/insert! conn attribute-table attribute-info)))
      (create-entity-table! conn type-spec)
      (create-tag-table! conn type-id)
      (create-lesson-table! conn type-id)
      (create-lesson-entity-table! conn type-id)
      (create-answer-table! conn type-id)
      (create-session-table! conn type-id))))

(defn create-type!
  [config user {:keys [id attributes] :as type-spec}]
  (cond
    (empty? attributes) {:status :invalid :message "At least one attribute is required."} 
    (type-exists? config id) {:status :invalid :message (str "ID " id " is taken.")} 
    :else
    (try
      (set-up-type! config user type-spec)
      {:status :ok}
      (catch Exception e
        {:status :error
         :message (str "Failed to create type: " (name (:id type-spec)))
         :exception e}))))

(deft delete-type!
  [config type-id]
  (if (type-exists? config type-id)
    (jdbc/with-db-connection [conn config]
      (try 
        (dyn/drop-tables! config [(session-table type-id)
                                  (answer-table type-id)
                                  (lesson-entity-table type-id)
                                  (lesson-table type-id)
                                  (tag-table type-id)
                                  (entity-table type-id)]) 
        (jdbc/delete! config attribute-table ["type = ?" (name type-id)])
        (jdbc/delete! config type-table ["id = ?" (name type-id)]) 
        {:status :ok}
        (catch Exception e
          {:status :error
           :message (str "Failed to delete type:" (name type-id))
           :exception e})))
    {:status :missing :message "That type doesn't exist."}))

(defn select-type
  [config type-id]
  (let [query "select * from attributes where type = ?"
        attributes (jdbc/query config [query (name type-id)])
        attributes (into [] (map (fn [attribute]
                                   (replace-key (dissoc attribute :type) :schema_id :schema get-schema)))
                         attributes)
        query "select * from types where id = ?"
        info (first (jdbc/query config [query (name type-id)]))]
    (assoc info :id (keyword type-id) :attributes attributes)))

(deft get-type
  [config type-id]
  {:status :ok :body (select-type config type-id)})

(defn get-types
  [config]
  (let [type-ids (jdbc/query config ["select id from types"] :row-fn #(keyword (:id %)))]
    {:status :ok :body (mapm (fn [type-id] [type-id (select-type config type-id)]) type-ids)}))

(deft count-entities
  [config type-id]
  {:status :ok :body (dyn/count-rows config (entity-table type-id))}) 

(defn select-entities-by-id-range
  [config type-id start-id end-id]
  (let [query (str "select * from " (entity-table type-id) " where id between ? and ?")]
    (jdbc/query config [query start-id end-id])))

(deft add-entity!
  [config type-id user entity]
  (let [table (entity-table type-id)
        row-count (dyn/count-rows config table )
        entity-id (inc row-count)
        prepared-entity (dissoc (assoc entity :user user :id entity-id :created nil)
                                :type-id) 
        result (jdbc/insert! config table prepared-entity)]
    (dyn/get-row-by-id config table :id entity-id)))

(deft get-entity
  [config type-id id]
  (dyn/get-row-by-id config (entity-table type-id) :id id))

(deft get-random-entity
  [config type-id]
  (dyn/get-random-row config (entity-table type-id) :id))

(deft get-random-entities
  [config type-id n]
  (dyn/get-random-rows config (entity-table type-id) :id n))

(deft get-entities-by-id-range
  [config type-id start-id end-id]
  (dyn/get-rows-in-range config (entity-table type-id) :id start-id end-id))

(deft update-entity!
  [config type-id entity-id entity]
  (let [table (entity-table type-id)
        stored-entity (dyn/select-by-id config table entity-id)]
    (if (nil? stored-entity)
      {:status :missing :message (str "No entity of type " (name type-id) " found with ID " entity-id)}
      (let [merged-entity (merge stored-entity entity)
            cleaned-entity (dissoc merged-entity :created :modified :id)]
        (jdbc/update! config table cleaned-entity ["id = ?" entity-id]) 
        {:status :ok :body (dyn/select-by-id config table entity-id)}))))

;; potentially dangerous
(deft delete-entity!
  [config type-id entity-id]
  (if (< entity-id 0)
    {:status :error :message "That's a negative entity ID!"}
    (let [row-count (dyn/count-rows config (entity-table type-id))]
      (if (> entity-id row-count)
        {:status :error :message (str "No entity of type " (name type-id) " with ID " entity-id)}
        (if (= row-count entity-id)
          (do (jdbc/delete! config (entity-table type-id) ["id = ?" entity-id])
              {:status :ok}) 
          (let [table (entity-table type-id)
                last-entity (dyn/select-by-id config table row-count)
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
  (if-let [entity (dyn/select-by-id config (entity-table type-id) entity-id)]
    (if (has-tag? config type-id  entity-id tag)
      {:status :exists}
      (let [table (tag-table type-id)]
        (jdbc/insert! config table {:id entity-id :tag tag :created nil})
        {:status :ok :body {:entity entity :tag tag}}))
    {:status :missing}))

(deft untag-entity!
  [config type-id entity-id tag]
  (if-let [entity (dyn/select-by-id config (entity-table type-id) entity-id)]
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
  (if-let [entity (dyn/select-by-id config (entity-table type-id) entity-id)]
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
      {:status :ok :body (dyn/select-by-ids config (entity-table type-id) entity-ids)})))

(deft get-entities-for-user
  [config type-id user]
  {:status :ok :body (dyn/select-equal config (entity-table type-id) :user user)})

(deft get-random-entity-with-tag
  [config type-id tag]
  (let [entity-ids (get-tag-ids config type-id tag)]
    (if (empty? entity-ids)
      {:status :missing}
      (dyn/get-row-by-id config (entity-table type-id) :id (rand-nth entity-ids)))))

(deft get-random-entities-with-tag
  [config type-id tag n]
  (let [tag-ids (get-tag-ids config type-id tag)]
    (if (empty? tag-ids)
      {:status :missing}
      (if (< (count tag-ids) n)
        {:status :not-enough}
        (let [entity-ids (dyn/take-unique-random n tag-ids)]
          {:status :ok :body (dyn/select-by-ids config (entity-table type-id) entity-ids)})))))

(deft remove-from-lesson!
  [config type-id lesson-id entity-id]
  (jdbc/delete! config (lesson-entity-table type-id) ["lesson = ? and entity = ?" lesson-id entity-id])
  {:status :ok})

;; lesson access
(defn select-lesson-info
  [config type-id lesson-id]
  (dyn/select-by-id config (lesson-table type-id) lesson-id))

(defn select-lesson-entity-ids
  [config type-id lesson-id]
  (map :entity (dyn/select-equal config (lesson-entity-table type-id) :lesson lesson-id)))

(defn select-lesson-entities
  [config type-id lesson-id]
  (let [ids (select-lesson-entity-ids config type-id lesson-id)]
    (dyn/select-by-ids config (entity-table type-id) ids)))

(deft get-lesson-info
  [config type-id lesson-id]
  (if-let [info (select-lesson-info config type-id lesson-id)]
    {:status :ok :body info}
    {:status :missing :message (str "No lesson of type " (name type-id) " found with ID " lesson-id)}))

(deft get-lesson
  [config type-id lesson-id]
  (if-let [lesson (select-lesson-info config type-id lesson-id)]
    (let [entities (select-lesson-entities config type-id lesson-id)]
      {:status :ok :body (assoc lesson :entities entities)})
    {:status :missing :message (str "No lesson of type " (name type-id) " found with ID " lesson-id)}))

(deft get-lesson-entities
  [config type-id lesson-id]
  (if-let [info (select-lesson-info config type-id lesson-id)]
    {:status :ok :body (select-lesson-entities config type-id lesson-id)}
    {:status :missing :message (str "No lesson of type " (name type-id) " found with ID " lesson-id)}))

(deft get-lessons-for-user
  [config type-id user]
  (let [lessons (dyn/select-equal config (lesson-table type-id) :user user)]
    {:status :ok :body lessons}))

(deft remove-from-lesson!
  [config type-id lesson-id entity-id]
  (jdbc/delete! config (lesson-entity-table type-id) ["lesson = ? and entity = ?" lesson-id entity-id])
  {:status :ok})

(deft get-lessons
  [config type-id]
  (let [lessons (dyn/select-all config (lesson-table type-id))]
    {:status :ok :body lessons}))

(deft create-lesson!
  [config type-id user lesson]
  (println "LEEZZON:" lesson)
  (let [row-count (dyn/count-rows config (lesson-table type-id))
        prepared-lesson (assoc lesson :user user :created nil)
        lesson-id (dyn/insert! config (lesson-table type-id) prepared-lesson)]
    {:status :ok :body (select-lesson-info config type-id lesson-id)}))

(deft add-to-lesson!
  [config type-id lesson-id entity-id]
  (jdbc/insert! config (lesson-entity-table type-id) {:lesson lesson-id :entity entity-id :created nil})
  {:status :ok})

(deft remove-from-lesson!
  [config type-id lesson-id entity-id]
  (jdbc/delete! config (lesson-entity-table type-id) ["lesson = ? and entity = ?" lesson-id entity-id])
  {:status :ok})

(defn parse-session
  [session]
  (rename-keys session {:lesson_id :lesson-id :entity_id :entity-id}))

(defn select-session
  [config type-id session-id]
  (let [row (dyn/select-by-id config (session-table type-id) session-id)]
    (parse-session row)))

(deft get-session
  [config type-id id]
  (let [session (select-session config type-id id)]
    (if session
      {:status :ok :body session}
      {:status :missing :message (str "No session of type " (name type-id) " found with ID " id)})))

(deft get-sessions
  [config type-id user-id]
  {:status :ok :body (dyn/select-all config (session-table type-id) :row-fn parse-session)})

(deft get-sessions-for-user
  [config type-id user-id] 
  {:status :ok :body (dyn/select-equal config (session-table type-id) :user user-id)})

(defn get-random-lesson-entity-id
  [config type-id lesson-id]
  (rand-nth (select-lesson-entity-ids config type-id lesson-id)))

(deft create-session!
  [config type-id user lesson-id]
  (let [info (select-lesson-info config type-id lesson-id)
        entity-id (get-random-lesson-entity-id config type-id lesson-id)
        session {:lesson_id lesson-id
                 :entity_id entity-id
                 :user user
                 :correct 0
                 :total 0
                 :length (:length info)
                 :done 0
                 :created nil}
        session-id (dyn/insert! config (session-table type-id) session)]
    {:status :ok :body (select-session config type-id session-id)}))

(defn record-entity-answer!
  [config type-id entity-id user correct?]
  (let [table (answer-table type-id)
        ;; TODO: select-where
        query (str "select * from " table " where id = ? and user = ?")
        row (first (jdbc/query config [query entity-id user]))]
    (if (nil? row)
      (let [correct (if correct? 1 0)]
        (jdbc/insert! config table {:id entity-id :user user :correct correct :total 1 :created nil}))
      (let [previous (:correct row)
            correct (if correct? (inc previous) previous) 
            total (inc (:total row))] 
        (jdbc/update! config table {:correct correct :total total} ["id = ? and user = ?" entity-id user])))))

(deft record-individual-answer!
  [config type-id entity-id user correct?]
  (record-entity-answer! config type-id entity-id user correct?)
  {:status :ok})

(deft record-answer!
  [config type-id user session-id entity-id correct?]
  (let [{done? :done session-entity-id :entity-id :as session} (select-session config type-id session-id)]
    (println entity-id " VS " session-entity-id)
    (cond
      (nil? session) {:status :what :message "TODO: no session"}
      done? {:status :what :message "TODO: already done?"}
      (not= entity-id session-entity-id) {:status :what :message "TODO: entity mismatch?"}
      :else (let [{:keys [total length correct lesson-id]} session
                  total (inc total)
                  correct (if correct? (inc correct) correct)
                  done? (= total length)
                  table (session-table type-id)
                  new-entity-id (get-random-lesson-entity-id config type-id lesson-id)]
              (jdbc/update! config table {:correct correct
                                          :total total
                                          :done done?
                                          :entity_id new-entity-id} ["id = ?" session-id])
              (record-entity-answer! config type-id entity-id user correct?)
              (println "NEW ENTITY ID:" new-entity-id)
              {:status :ok :body (select-session config type-id session-id)}))))

(deft get-stats
  [config type-id entity-id user]
  (if-let [entity (dyn/select-by-id config (entity-table type-id) entity-id)]
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
  (remove-from-lesson! [_ type-id lesson-id entity-id] (remove-from-lesson! config type-id lesson-id entity-id))

  (create-session! [_ type-id lesson-id] (create-session! config type-id user lesson-id))
  (record-answer! [_ type-id session-id entity-id correct?] 
    (record-answer! config type-id user session-id entity-id correct?))
  (get-session [_ type-id session-id] (get-session config type-id session-id))

  (get-sessions [_ type-id] (get-sessions config type-id user))
  (get-sessions-for-user [_ type-id user-id] (get-sessions-for-user config type-id user))
  
  (record-individual-answer! [_ type-id entity-id correct?]
    (record-individual-answer! config type-id entity-id user correct?))
  
  (get-stats [_ type-id entity-id] (get-stats config type-id entity-id user))
  
  (get-entities-for-user [_ type-id other-user] (get-entities-for-user config type-id other-user))
  (get-lessons-for-user [_ type-id other-user] (get-entities-for-user config type-id other-user))
  (get-stats-for-user [_ type-id entity-id other-user] (get-stats config type-id entity-id other-user)))

;; (def user-table "users")

;; (defn create-user-table!
;;   [config]
;;   (let [command (str "create table "
;;                      user-table
;;                      "(id varchar(32) primary key, "
;;                      "password varchar(32) not null, "
;;                      "created timestamp not null default '0000-00-00 00:00:00')"
;;                      "default character set utf8 collate utf8_unicode_ci")]
;;     (try
;;       (jdbc/execute! config [command])
;;       {:status :ok}
;;       (catch Exception e {:status :error :exception e}))))

;; (defn create-user!
;;   [config id password]
;;   (jdbc/insert! config user-table {:id id :password password})
;;   {:status :ok})

;; (defn delete-user!
;;   [config id password]
;;   (jdbc/delete! config user-table ["id = ?" id]
;;   {:status :ok}))
