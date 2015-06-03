(ns mike.sentence.webservice
  (:require [mike.sentence.api :refer [SentenceRepo] :as api]
            [clojure.pprint :refer [pprint]]
            [clojure.string :as string]
            [clojure.core.async :refer [chan go >! <! <!!]]))

(defrecord WebserviceSentenceRepo [config]
  SentenceRepo
  (get-random-sentence [_] nil)
  (aget-random-sentence [_ channel] nil)
  (get-random-sentences [_ n] nil)
