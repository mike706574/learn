(ns mike.repl
  (:require [ring.server.standalone :refer [serve]])
  (:use mike.handler
        [ring.middleware file-info file]))

(defonce server (atom nil))

(defn get-handler [] (-> #'app (wrap-file "resources") (wrap-file-info)))

(defn start-server
  [& [port]]
  (let [port (if port (Integer/parseInt port) 8080)]
    (reset! server
            (serve (get-handler)
                   {:port port
                    :init init
                    :auto-reload? true
                    :destroy destroy
                    :join true}))
    (println (str "You can view the site at http://localhost:" port))))

(defn get-first-index
  [item coll]
  (first (keep-indexed #(when (= item %2) %1) coll))) 

(defn get-after
  [item v]
  (let [index (get-first-index item v)]
    (if (nil? index)
      nil
      (let [next-index (inc index)]
        (if (= next-index (count v))
          (first v)
          (get v next-index))))))

(defn get-next
  [element s]
  (into [] s)

  )

(defn stop-server [] 
  (.stop @server)
  (reset! server nil))
