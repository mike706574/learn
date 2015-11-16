(ns mike.auth
  (:require [mike.dynamite :as d]
            [mike.config :as c]
            [cemerick.friend.credentials :as creds]
            [clojure.java.jdbc :as jdbc]
            [clj-time.core :as time]
            [clj-time.coerce :as coerce]))

;; dupe
(defn now [] (coerce/to-date (time/now)))

(derive ::admin ::user)

(def user-table "users")
(def role-table "roles")

(def config (c/load "prod"))

(def auth-db (:auth-database config))

(defn create-user-table!
  [config]
  (let [command (str "create table "
                     user-table
                     "(username varchar(32) primary key, "
                     "password char(60) not null, "
                     "created timestamp not null default '0000-00-00 00:00:00')"
                     "default character set utf8 collate utf8_unicode_ci")]
    (jdbc/execute! config [command])
    {:status :ok}))

(defn create-role-table!
  [config]
  (let [command (str "create table "
                     role-table
                     "(username varchar(32) not null, "
                     "role varchar(32) not null, "
                     "created timestamp not null default '0000-00-00 00:00:00', "
                     "primary key (username, role), "
                     "foreign key (username) references "
                     user-table
                     "(username) on delete cascade )"
                     "default character set utf8 collate utf8_unicode_ci")]
    (jdbc/execute! config [command])
    {:status :ok}))

(defn- parse-role
  [{role :role}]
  (case role
    "admin" ::admin
    (throw (RuntimeException. (str "Unrecognized role:" role)))))

(defn get-user
  [config username]
  (println "1 GET USER")
  (when-let [user (d/select-by-column config user-table :username username)]
    (let [roles (into #{::user} (d/select-equal config role-table :username username :row-fn parse-role))]
      (println "2 GET USER")
      (assoc user :roles roles))))

(defn delete-user!
  [config username]
  (jdbc/delete! config user-table ["username = ?" username]))

(defn create-user!
  [config username password admin?]
  (jdbc/with-db-transaction [transaction config]
    (if (d/select-by-column transaction user-table :username username)
      {:status :failure :body "Username already taken!"}
      (let [user {:username username
                  :password (creds/hash-bcrypt password)
                  :created (now)}]
        (jdbc/insert! transaction user-table user)
        (when admin? (jdbc/insert! transaction role-table {:username username :role "admin" :created (now)}))
        {:status :ok :body (get-user transaction username)}))))

(defn set-up!
  [config]
  (create-user-table! config)
  (create-role-table! config)
  (create-user! config "admin" "admin" true))
