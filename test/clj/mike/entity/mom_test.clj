(ns mike.entity.mom-test
  (:require [clojure.pprint :refer [pprint]]
            [clojure.test :refer [deftest testing is run-tests]]
            [mike.entity.mike-test :refer [with-mike]]
            [clojure.data :refer [diff]]))

(defn build-thing
  [a b c]
  {:a a :b b :c c})

(def tests
  {"one plus two" [1 ['+ 1 2]]
   "two plus two" [4 ['+ 2 2]]
   "build thing" [{:d 5} ['build-thing 1 2 3]]})

(defn correct-test
  [[name body]]
  (let [[expected [f & args]] body 
        actual (apply (resolve f) args)]
    [name [actual (vec (cons f args))]])) 

(defn correct-tests
  [tests]
  (into {} (map correct-test tests)))

(deftest test-runner
  (doseq [test tests]
    (let [[name body] test
          [expected [f & args]] body]
      (println "RUN" name)
      (println (str "SPEC (" f " " args ")"))
      (is (= expected (apply (resolve f) args))))))

(macroexpand '(deftest test-thing (is (= 1 1))))

(def dog (comp pprint diff))

(def a {:tracking-info {:request "80405"} :job-status {:status "Running" :assigned-to "Mike"}})
(def b {:tracking-info {:request "80405"} :job-status {:status "Completed" :assigned-to "Mike"}})

{:trackinginfo {:request "80405"} :job-status {:status "Running" :assigned-to "Mike"}}

(def ok (java.util.HashMap.))
(.put ok "OK" "HI")

{"OK" "HI"}

(diff a b)



