(ns mike.test.handler
  (:use clojure.test
        ring.mock.request)
  (:require [lang.sentence.api :as api]
            [lang.sentence.jdbc :as jdbc])
  (:import [lang.sentence.jdbc JdbcSentenceRepo]))

(def config {:sentence-repo-type :jdbc
             :sentence-repo-database {:subprotocol "mysql"
                                      :subname "//localhost:3306/lang"
                                      :user "lang"
                                      :password "lang"}})

(def repo (JdbcSentenceRepo. (:sentence-repo-database config)))

(defn thing
  []
  (api/count-sentences repo :en-it))

(deftest test-thing
  (testing "test ok"
    (is (= {} (thing)))))
