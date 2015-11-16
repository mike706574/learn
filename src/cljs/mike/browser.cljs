(ns mike.browser
  (:require [clojure.string :refer [blank? capitalize]]
            [goog.net.cookies :as cookies]
            [cemerick.url :as curl]
            [clojure.walk :refer [keywordize-keys]]))

(enable-console-print!)

;; browser
(defn redirect!
  [url]
  (-> js/document .-location
      (set! url)))

(defn get-value [e] (-> e .-target .-value))

(defn get-url
  []
  (curl/url (.-href (.-location js/window))))

(defn get-query-params
  []
  (keywordize-keys (:query (get-url))))


;; TODO: doesn't work
(def is-number? (comp not js/isNaN))

(defn is-integer?
  [s]
  (and (is-number? s) (integer? (js/parseInt s))))
