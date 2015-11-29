(ns mike.entity.ok-test
  (:require [clojure.pprint :refer [pprint]]
            [clojure.test :as t]
            [mike.entity.mike-test :refer [with-mike]]))

(def ^:dynamic *var-context*)

(defn test-name
  [vars]
  (apply str (interpose "." (reverse (map #(:name (meta %)) vars)))))

;; This multimethod will override test-is/report
(defmulti ^:dynamic mike-report :type)

(defmethod mike-report :begin-test-ns [m]
  (t/with-test-out
    (let [suite-name (name (ns-name (:ns m)))]
      (println ":begin-test-ns")
      (println suite-name)
      (println))))

(defmethod mike-report :end-test-ns [_])

(defmethod mike-report :begin-test-var [m]
  (t/with-test-out
   (let [var (:var m)]
     (binding [*var-context* (conj *var-context* var)]
       (let [test-name (test-name *var-context*)]
         (println :begin-test-var)
         (println test-name)
         (println))))))

(defmethod mike-report :end-test-var [_])

(defmethod mike-report :pass [m]
  (t/with-test-out
   (t/inc-report-counter :pass)
   (println ":pass")
   (println m)
   (println)))

(defmethod mike-report :fail [m]
  (t/with-test-out
   (t/inc-report-counter :fail)
   (let [{:keys [file line expected actual]} m
         actual-value (nth (second actual) 2)
         ]
     
     (println (str file " #" line))
     (println actual-value)
     (println expected))))

(defmethod mike-report :error [m]
  (t/with-test-out
    (t/inc-report-counter :error)
    (println ":error")))

(defmethod mike-report :default [_])

(defmacro with-mike
  [& body]
  `(binding [t/report mike-report
             *var-context* (list)]
     (let [result# (do ~@body)]
       result#)))
  
(t/deftest ok
  (t/testing "lol" 
    (t/is (= 1 (+ 1 1)))))

{:one-plus-two [1 [+ 1 2]]} 

(defmacro build-test
  [[expected f args]]
  (println expected)
  '(t/deftest ok
     (is (= 1 1))
)

  )

(macroexpand '(build-test []))



(defmacro deft
  [fn-symbol args & body]
  `(def ~fn-symbol
     (fn ~args
       (go
         (try
           (if (nil? (second ~args))
             {:status :bad-request :message "Type was nil!"}
             
             (if (type-exists? (first ~args) (keyword (second ~args)))
               ~(conj body `do)
               {:status :missing :message (str "Invalid type ID: " (name (second ~args)))}))
           (catch Exception e# {:status :error :message (.getMessage e#) :exception e#}))))))










