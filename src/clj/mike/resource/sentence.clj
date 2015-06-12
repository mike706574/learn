(ns mike.resource.sentence
  (:require [lang.sentence.factory :refer [build-sentence-repo]]
            [lang.sentence.api :as api]
            [clojure.data.json :as json]))

(defn sentence-resource
  [sentence-repo]
  (let [sentence (api/get-random-sentence sentence-repo)]
    {:status 200
     :headers {"Content-Type" "application/json"}
     :body (json/write-str sentence)}))
