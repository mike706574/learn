(ns mike.http
  (:refer-clojure :exclude [get put]) 
  #?(:cljs (:require-macros [cljs.core.async.macros :refer [go]]))
  (:require [clojure.walk :refer [keywordize-keys]]
            [clojure.string :refer [blank?]]
            #?(:clj [clojure.data.json :as json]) 
            #?(:clj [clj-http.client :as http]
                    :cljs [cljs-http.client :as http])
            #?(:clj [clojure.core.async :refer [go]])))

(defprotocol Giraffe
  "?"
  (get [client url request] "GET")
  (pet [client url request] "PUT")
  (post [client url request] "POST")
  (delete [client url request] "DELETE"))

(defrecord BabyGiraffe [wrap-request wrap-response]
  Giraffe
  (get [_ url request]
    #?(:clj (go (wrap-response (http/get url (wrap-request request))))
       :cljs (wrap-response (http/get url (wrap-request request)))))

  (pet [_ url request]
    #?(:clj (go (wrap-response (http/put url (wrap-request request))))
       :cljs (wrap-response (http/put url (wrap-request request)))))
  
  (post [_ url request]
    #?(:clj (go (wrap-response (http/post url (wrap-request request))))
       :cljs (wrap-response (http/post url (wrap-request request)))))

  (delete [_ url request]
    #?(:clj (go (wrap-response (http/delete url (wrap-request request))))
       :cljs (wrap-response (http/delete url (wrap-request request))))))

(defn from-json
  [body]
  #?(:clj (json/read-str body)
     :cljs body))

(defn to-json
  [body]
  #?(:clj (json/write-str body)
     :cljs (js/JSON.stringify (clj->js body))))

(defn no-exceptions
  [request]
  (assoc request :throw-exceptions false))

(defn json-response-body
  [{:keys [status body] :as response}]
  (if (blank? body)
    response
    (update response :body (comp keywordize-keys from-json))))

(defn json-request-body
  [request]
  (if (:body request)
    (update request :body to-json)
    request))

;; TODO: clj-http and cljs-http basic-auth format is different, which sucks
(defn basic-auth
  [request]
  #?(:cljs (let [credentials (:basic-auth request)]
             (if credentials
               (assoc request :basic-auth {:username (first credentials)
                                           :password (second credentials)})
               request))
     :clj request))

(defn fun-client [] (BabyGiraffe. (comp no-exceptions basic-auth json-request-body) json-response-body))
