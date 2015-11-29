(ns mike.entity.http
  (:refer-clojure :exclude [get])
  #?(:cljs (:require-macros [cljs.core.async.macros :refer [go]]))
  (:require #?(:clj [clojure.core.async :refer [<! <!! go]]
                    :cljs [cljs.core.async :refer [<!]])
            [mike.entity.api :as api :refer [EntityRepo]]
            [mike.http :refer [fun-client] :as http]
            #?(:clj [clojure.data.json :as json])
            [clojure.string :refer [join blank?]]
            [clojure.walk :refer [keywordize-keys]]))

(defn unkey [x] (if (keyword? x) (name x) x))

(defn build-url [path & parts]
  (str path (join "/" (map unkey parts))))

(defn handle-response
  [response]
  (go (let [{:keys [status body]} (<! response)]
        (case status
          401 {:status :unauthorized :body "Unauthorized!"}
          body))))

(defn delete
  [username password url] 
  (handle-response (http/delete (fun-client) url {:headers {"accept" "application/json"}
                                                  :basic-auth [username password]}))) 

(defn post
  [username password url body]
  (println "IM HERE" username password)
  (handle-response (http/post (fun-client) url {:body body
                                                :content-type "application/json"
                                                :basic-auth [username password]
                                                :headers {"content-type" "application/json"
                                                          "accept" "application/json"}})))  

(defn put
  ([username password url]
   (put username url {}))
  ([username password url body]
   (handle-response (http/pet (fun-client) url {:headers {"content-type" "application/json"
                                                          "accept" "application/json"}
                                                :basic-auth [username password]
                                                :body body})))) 

(defn get
  ([username password url]
   (get username password url {}))
  ([username password url query-params]
   (println "U:" username "P: password")
   (handle-response (http/get (fun-client) url {:query-params query-params
                                                :basic-auth [username password]
                                                :headers {"accept" "application/json"}}))))

(defrecord HttpEntityRepo [path user password]
  EntityRepo
  (create-type! [_ type-spec] (post user password (build-url path "type") type-spec))
  (delete-type! [_ type-id] (delete user password (build-url path "type" type-id)))
  (get-type [_ type-id] (get user password (build-url path "type" type-id))) 
  (get-types [_]
    (println "GETTING TYPES " user password )
    (get user password (build-url path "types")))

  (count-entities [_ type-id]
    (get user password (build-url path "type" type-id "entity-count"))) 
  (add-entity! [_ type-id entity]
    (post user password (build-url path "type" type-id "entity") entity))
  (update-entity! [_ type-id entity-id entity]
    nil) 
  (delete-entity! [_ type-id entity-id]
    (delete user password (build-url path "type" type-id "entity" entity-id)))

  (get-entity [_ type-id entity-id]
    (get user password (build-url path "type" type-id "entity" entity-id)))
  (get-random-entity [_ type-id]
    (get user password (build-url path "type" type-id "entity")))
  (get-random-entities [_ type-id n]
    (get user password (build-url path "type" type-id "entities") {:n n}))
  (get-entity-range [_ type-id start end]
    (get user password (build-url path "type" type-id "entities") {:start start :end end}))

  (tag-entity! [_ type-id entity-id tag] nil)
  (untag-entity! [_ type-id entity-id tag] nil)
  (delete-tag! [_ type-id tag] nil)
  (get-entity-tags [_ type-id entity-id] nil)
  
  (get-entities-with-tag [_ type-id tag] nil)
  (get-random-entity-with-tag [_ type-id tag] nil)
  (get-random-entities-with-tag [_ type-id tag n] nil)

  (get-lesson [_ type-id lesson-id]
    (get user password (build-url path "type" type-id "lesson" lesson-id)))
  (get-lesson-info [_ type-id lesson-id]
    (get user password (build-url path "type" type-id "lesson" lesson-id "info")))
  (get-lesson-entities [_ type-id lesson-id]
    (get user password (build-url path "type" type-id "lesson" lesson-id "entities"))) 
  (get-lessons [_ type-id]
    (get user password (build-url path "type" type-id "lessons")))
  (create-lesson! [_ type-id lesson]
    (post user password (build-url path "type" type-id "lesson") lesson))
  (delete-lesson! [config type-id lesson-id]
    (delete user password (build-url path "type" type-id "lesson" lesson-id)))
  (add-to-lesson! [_ type-id lesson-id entity-id]
    (put user password (build-url path "type" type-id "lesson" lesson-id "entity" entity-id)))
  (remove-from-lesson! [_ type-id lesson-id entity-id]
    (delete user password (build-url path "type" type-id "lesson" lesson-id "entity" entity-id)))
  
  (create-session! [_ type-id lesson-id]
    (post user password (build-url path "type" type-id "session") {:lesson-id lesson-id}))
  (record-answer! [_ type-id session-id entity-id start correct?]
    (put user password (build-url path "type" type-id "session" session-id) {:entity-id entity-id
                                                                    :correct correct?
                                                                    :start start}))
  (get-session [_ type-id session-id]
    (get user password (build-url path "type" type-id "session" session-id)))

  (get-sessions [_ type-id] "Get all sessions."
    (get user password (build-url path "type" type-id "sessions")))
  (get-sessions-for-user [_ type-id user-id]
    (get user password (build-url path "type" type-id "sessions") {:user-id user-id}))
  
  (record-individual-answer! [_ type-id entity-id start correct?] nil)
  (get-stats [_ type-id entity-id] nil)

  (get-entities-for-user [_ type-id other-user] nil)
  (get-lessons-for-user [_ type-id other-user] nil)
  (get-stats-for-user [_ type-id entity-id user-id]
    (get user password (build-url path "type" type-id "entity" entity-id "stats" user-id))))
