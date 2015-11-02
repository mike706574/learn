(ns mike.http
  #?(:cljs (:require-macros [cljs.core.async.macros :refer [go]]))
  (:require [clojure.walk :refer [keywordize-keys]]
            #?(:clj [clojure.data.json :as json]) 
            #?(:clj [clj-http.client :as http]
                    :cljs [cljs-http.client :as http])
            #?(:clj [clojure.core.async :refer [go]])))

(defn handle-exceptions
  [request]
  (assoc request :throw-exceptions (or (:throw-exceptions request) false)))

(defn parse-json
  [body]
  #?(:clj (json/read-str body)
     :cljs body))

(defn handle-json-body
  [{body :body :as response}]
  (assoc response :body (keywordize-keys (parse-json body))))

#?(:clj
   (defn get
     [resource & [request]]
     (go (let [request (handle-exceptions request)]
           (http/get resource request)))))  

#?(:cljs
   (defn get
     [resource & [request]]
     (let [request (handle-exceptions request)]
       (http/get resource request))))

#?(:clj
   (defn post
     [resource & [request]]
     (go (let [request (handle-exceptions request)]
           (http/post resource request)))))

#?(:cljs
   (defn post
     [resource & [request]]
     (let [request (handle-exceptions request)]
       (http/post resource request))))

#?(:clj
   (defn put
     [resource & [request]]
     (go (let [request (handle-exceptions request)]
           (http/put resource request)))))

#?(:cljs
   (defn put
     [resource & [request]]
     (let [request (handle-exceptions request)]
       (http/put resource request))))

#?(:clj
   (defn delete
     [resource & [request]]
     (go (let [request (handle-exceptions request)]
           (http/delete resource request)))))

#?(:cljs
   (defn delete
     [resource & [request]]
     (let [request (handle-exceptions request)]
       (http/delete resource request))))
