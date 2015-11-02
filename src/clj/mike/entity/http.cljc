(ns mike.entity.http
  #?(:cljs (:require-macros [cljs.core.async.macros :refer [go]]))
  (:require #?(:clj [clojure.core.async :refer [<! <!! go]]
               :cljs [cljs.core.async :refer [<!]])
            [mike.entity.api :as api :refer [EntityRepo]]
            [mike.http :as http]
            #?(:clj [clojure.data.json :as json])
            [clojure.string :refer [join]]
            [clojure.walk :refer [keywordize-keys]]))

(defn json-body
  [body]
  #?(:clj (json/write-str body)
     :cljs (js/JSON.stringify (clj->js body))))

(defn unkey [x] (if (keyword? x) (name x) x))

(defn build-url [path & parts]
  (str path (join "/" (map unkey parts))))

(defn delete
  [user url]
  (go (let [data {:headers {"lang-user" user
                            "accept" "application/json"}} 
            {:keys [status body]} (<! (http/delete url data))]
        (keywordize-keys (http/parse-json body)))))

(defn post
  [user url body]
  (go (let [data {:body (json-body body)
                  :content-type "application/json"
                  :headers {"content-type" "application/json"
                            "lang-user" user
                            "accept" "application/json"}}
            {:keys [status body]} (<! (http/post url data))]
        (keywordize-keys (http/parse-json body)))))

(defn put
  ([user url]
   (put user url {}))
  ([user url body]
   (go (let [data {:headers {"lang-user" user
                             "content-type" "application/json"
                             "accept" "application/json"}
                   :body (json-body body)}
            {:keys [status body]} (<! (http/put url data))]
        (keywordize-keys (http/parse-json body))))))

(defn get
  ([user url]
   (get user url {}))
  ([user url query-params]
   (go
     (let [{:keys [status body]} (<! (http/get url {:query-params query-params
                                                    :headers {"lang-user" user
                                                              "accept" "application/json"}}))]
       (keywordize-keys (http/parse-json body))))))

(defrecord HttpEntityRepo [path user]
  EntityRepo
  (create-type! [_ type-spec] (post user (build-url path "type") type-spec))
  (delete-type! [_ type-id] (delete user (build-url path "type" type-id)))
  (get-type [_ type-id] (get user (build-url path "type" type-id))) 
  (get-types [_] (get user (build-url path "types")))

  (count-entities [_ type-id]
    (get user (build-url path "type" type-id "entity-count"))) 
  (add-entity! [_ type-id entity]
    (post user (build-url path "type" type-id "entity") entity))
  (update-entity! [_ type-id entity-id entity]
    nil) 
  (delete-entity! [_ type-id entity-id]
    (delete user (build-url path "type" type-id "entity" entity-id)))

  (get-entity [_ type-id entity-id]
    (get user (build-url path "type" type-id "entity" entity-id)))
  (get-random-entity [_ type-id]
    (get user (build-url path "type" type-id "entity")))
  (get-random-entities [_ type-id n]
    (get user (build-url path "type" type-id "entities") {:n n}))
  (get-entity-range [_ type-id start end]
    (get user (build-url path "type" type-id "entities") {:start start :end end}))

  (tag-entity! [_ type-id entity-id tag] nil)
  (untag-entity! [_ type-id entity-id tag] nil)
  (delete-tag! [_ type-id tag] nil)
  (get-entity-tags [_ type-id entity-id] nil)
  
  (get-entities-with-tag [_ type-id tag] nil)
  (get-random-entity-with-tag [_ type-id tag] nil)
  (get-random-entities-with-tag [_ type-id tag n] nil)

  (get-lesson [_ type-id lesson-id]
    (get user (build-url path "type" type-id "lesson" lesson-id)))
  (get-lesson-info [_ type-id lesson-id]
    (get user (build-url path "type" type-id "lesson" lesson-id "info")))
  (get-lesson-entities [_ type-id lesson-id]
    (get user (build-url path "type" type-id "lesson" lesson-id "entities"))) 
  (get-lessons [_ type-id]
    (get user (build-url path "type" type-id "lessons")))
  (create-lesson! [_ type-id name description length]
    (post user (build-url path "type" type-id "lesson") {:name name
                                                         :description description
                                                         :length length}))
  (delete-lesson! [config type-id lesson-id]
    (delete user (build-url path "type" type-id "lesson" lesson-id)))
  (add-to-lesson! [_ type-id lesson-id entity-id]
    (put user (build-url path "type" type-id "lesson" lesson-id "entity" entity-id)))
  (remove-from-lesson! [_ type-id lesson-id entity-id]
    (delete user (build-url path "type" type-id "lesson" lesson-id "entity" entity-id)))
  
  (create-session! [_ type-id lesson-id]
    (post user (build-url path "type" type-id "session") {:lesson-id lesson-id}))
  (record-answer! [_ type-id session-id entity-id correct?]
    (put user (build-url path "type" type-id "session" session-id) {:entity-id entity-id :correct correct?}))
  (get-session [_ type-id session-id]
    (get user (build-url path "type" type-id "session" session-id)))

  (get-sessions [_ type-id] "Get all sessions."
    (get user (build-url path "type" type-id "sessions")))
  (get-sessions-for-user [_ type-id user-id]
    (get user (build-url path "type" type-id "sessions") {:user-id user-id}))
  
  (record-individual-answer! [_ type-id entity-id correct?] nil)
  (get-stats [_ type-id entity-id] nil)

  (get-entities-for-user [_ type-id other-user] nil)
  (get-lessons-for-user [_ type-id other-user] nil)
  (get-stats-for-user [_ type-id entity-id user-id]
    (get user (build-url path "type" type-id "entity" entity-id "stats" user-id))))
