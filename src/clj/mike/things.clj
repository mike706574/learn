(ns mike.handler
  (:require [mike.misc :as m]
            [mike.jaguar :as j]
            [mike.entity.api :as api]
            [mike.entity.jdbc]
            [mike.entity.http]
            [mike.auth :as auth]
            [mike.config :as c]
            [clojure.data.json :as json]
            [clojure.string :refer [blank?]]
            [clojure.core.async :refer [<!!]]
            [clojure.pprint :refer [pprint]])
  (:import [mike.entity.jdbc JdbcEntityRepo]
           [mike.entity.http HttpEntityRepo]))

(def environment "dev")
(def config (c/load environment))
(def auth-db (:auth-database config))
(def entity-db (:entity-database config))
(def repo #(JdbcEntityRepo. entity-db "admin"))

