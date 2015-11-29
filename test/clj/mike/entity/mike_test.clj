(ns mike.entity.mike-test
  (:require [clojure.test :as t]
            [clojure.stacktrace :as stack]))

(defmulti ^{:dynamic true} mike-report :type)

(defn- file-and-line 
  [^Throwable exception depth]
  (let [stacktrace (.getStackTrace exception)]
    (if (< depth (count stacktrace))
      (let [^StackTraceElement s (nth stacktrace depth)]
        {:file (.getFileName s) :line (.getLineNumber s)})
      {:file nil :line nil})))

(defmethod mike-report :default [m]
  (t/with-test-out (prn m)))

(defmethod mike-report :pass [m]
  (t/with-test-out
    (t/inc-report-counter :pass)
    (println "PASS\n")))

(defmethod mike-report :fail [m]
  (t/with-test-out
    (t/inc-report-counter :fail)
    
;;    (println "FAIL in" (t/testing-vars-str m))
    (when (seq t/*testing-contexts*) (println (t/testing-contexts-str)))
    (when-let [message (:message m)] (println message))
    (println "FAIL" (pr-str (:actual m)) "\n")))

(defmethod mike-report :error [m]
  (t/with-test-out
   (t/inc-report-counter :error)
   (println "\nERROR in" (t/testing-vars-str m))
   (when (seq t/*testing-contexts*) (println (t/testing-contexts-str)))
   (when-let [message (:message m)] (println message))
   (println "expected:" (pr-str (:expected m)))
   (print "  actual: ")
   (let [actual (:actual m)]
     (if (instance? Throwable actual)
       (stack/print-cause-trace actual t/*stack-trace-depth*)
       (prn actual)))))

(defmethod mike-report :summary [m]
  (t/with-test-out
   (println "\nRan" (:test m) "tests containing"
            (+ (:pass m) (:fail m) (:error m)) "assertions.")
   (println (:fail m) "failures," (:error m) "errors.")))

(defmethod mike-report :begin-test-ns [m]
  (t/with-test-out
   (println "\nSUITE" (ns-name (:ns m)) "\n")))

;; Ignore these message types:
(defmethod mike-report :end-test-ns [m])
(defmethod mike-report :begin-test-var [m])
(defmethod mike-report :end-test-var [m]
  (println "END"))

(defmacro with-mike
  [& body]
  `(binding [t/report mike-report]
     (let [result# (do ~@body)]
       result#)))
 
