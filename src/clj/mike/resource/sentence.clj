(ns mike.resource.sentence
  (:require [lang.sentence.factory :refer [build-sentence-repo]]
            [lang.sentence.api :as api]
            [clojure.core.async :refer [<!!]]
            [clojure.data.json :as json]))

(defn parse-int
  [str]
  (Integer/parseInt str))

(defn succeed
  [body]
  {:status 200
   :headers {"Content-Type" "application/json"}
   :body (json/write-str body)})

(defn fail
  [message]
  {:status 400
   :headers {"Content-Type" "application/json"}
   :body (json/write-str message)})

(defn sid
  [repo lp id]
  (<!! (api/get-sentence repo (keyword lp) (Integer/parseInt id))))

(defn srandom
  [repo lp]
  (<!! (api/get-random-sentence repo (keyword lp))))

(defn srandoms
  [repo lp n]
  (<!! (api/get-random-sentences repo (keyword lp) (parse-int n))))

(defn srange
  [repo lp start end]
  (<!! (api/get-sentence-range repo (keyword lp) (parse-int start) (parse-int end))))

(defn language-resource
  [repo id]
  (if id
    (let [language (api/get-language id)
          sentence-count (api/count-sentences repo lp)]
      (succeed (assoc info :sentence-count sentence-count)))
    (fail "NONONO")))

(defn sentence-resource
  [repo {:keys [lp id]}]
  (if lp
    (if id
      (succeed (sid repo lp id))
      (succeed (srandom repo lp)))
    (fail "MISSING LANGUAGE PAIR")))

(defn sentences-resource
  [repo {:keys [lp n start end]}]
  (if lp
    (if n
      (succeed (srandoms repo lp n))
      (if (and start end)
        (succeed (srange repo lp start end))
        (fail "BAD COMBINATION")))
    (fail "MISSING LANGUAGE PAIR")))

