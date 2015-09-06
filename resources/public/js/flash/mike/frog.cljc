(ns mike.frog)

(defn ribbit
  [name]
  #?(:clj (println "Ribbit," name ".")
     :cljs (.log js/console (str "Ribbit, " name "."))))
