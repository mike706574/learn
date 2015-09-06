(ns mike.resource.sentence
  (:require [lang.sentence.factory :refer [build-sentence-repo]]
            [lang.sentence.api :as api :refer [yaks]]
            [clojure.core.async :refer [<!!]]
            [clojure.data.json :as json]))

(defn parse-int
  [str]
  (Integer/parseInt str))


(defn sid
  [repo yak id]
  (<!! (api/get-sentence repo (keyword yak) (Integer/parseInt id))))

(defn srandom
  [repo yak]
  (<!! (api/get-random-sentence repo (keyword yak))))

(defn srandoms
  [repo yak n]
  (<!! (api/get-random-sentences repo (keyword yak) (parse-int n))))

(defn srange
  [repo yak start end]
  (<!! (api/get-sentence-range repo (keyword yak) (parse-int start) (parse-int end))))

(defn language
  [repo {:keys [yak]}]
  (println "LANGUAGE:" yak)
  (if yak
    (let [sentence-count (api/count-sentences repo yak)
          yak (yaks yak)]
      (succeed (assoc yak :sentence-count sentence-count)))
    (fail "Missing yak")))

(defn sentence
  [repo {:keys [yak id]}]
  (println "sentence")
  (if yak
    (if id
      (succeed (sid repo yak id))
      (succeed (srandom repo yak)))
    (fail "Missing yak")))

(defn sentences
  [repo {:keys [yak n start end]}]
  (if yak
    (if n
      (succeed (<!! (api/get-random-sentences
                     repo
                     (keyword yak)
                     (parse-int n))))
      (if (and start end)
        (succeed (<!! (api/get-sentence-range
                       repo
                       (keyword yak)
                       (parse-int start)(parse-int end))))
        (fail "BAD COMBINATION")))
    (fail "Missing yak")))

(defn sentences2
  [repo {:keys [yak n start end]}]
  (if n
    (<!! (api/get-random-sentences
          repo
          (keyword yak)
          (parse-int n)))
    (if (and start end)
      (<!! (api/get-sentence-range
            repo
            (keyword yak)
            (parse-int start)
            (parse-int end)))
      {:status :bad-request :message "BAD COMBINATION"})))
    


(def not-nil? (complement nil?))

(defn find-first
  [f coll]
  (first (filter f coll)))

(defn find-missing
  [m ks]
  (find-first #(nil? (m %)) ks))

(defn get-tag
  [repo {:keys [yak tag]}]
  (println "GETTING TAG")
  (if (nil? yak)
    (fail "give me a yak!!!")
    (if (nil? tag)
      (fail "give me a tag!!!")
      (do
        (println tag yak)
        (<!! (api/get-tagged-sentences repo (keyword yak) tag))))))

(defn post-tag
  [repo {:keys [body] :as request}]
  (if (nil? body)
    (fail "post something gosh darnit!!!")
    (if (map? body)
      (if-let [missing (find-missing body [:yak :id :tag])] 
        (fail (str "Missing " missing))
        (let [{:keys [yak id tag]} body]
          (api/tag-sentence repo (keyword yak) id tag)
          (succeed body)))
      (fail "you done did it wrong now boy"))))

  
