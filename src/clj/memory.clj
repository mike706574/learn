(ns mike.memory
  (:require [clojure.core.async :refer [<! <!! go]]
            [mike.http :refer [fun-client] :as http]
            [mike.jaguar :as j]
            [mike.misc :as m]
            [clojure.data.json :as json]
            [clojure.string :refer [join blank?]]
            [clojure.walk :refer [keywordize-keys]]))

(def url "http://mymemory.translated.net/api/get")

(def de "mike706574@gmail.com")

(def valid-langs #{:it :spa})

(defn single-query
  [term lang]
  (println (str "[" lang "] " (m/cite term) " - Starting query"))
  (let [query-params {:q term
                      :langpair (str "en|" (name lang))
                      :de de}
        {:keys [status body]} (<!! (http/get (fun-client) url {:query-params query-params}))]

    (if (= 200 status)
      (let [result (get-in body [:responseData :translatedText])]
        (println (str "[" lang "] " (cite term) " - Finished query"))
        result)
      (throw (ex-info (str status) body)))))

(defn multi-query
  [term langs]
  (doseq [lang langs]
    (when (not (contains? valid-langs lang))
      (throw (RuntimeException. (str "Invalid language code: " (name lang))))))
  (assoc (m/mapm
          (fn [lang]
            [lang (single-query term lang)]) langs) :en term))

(def it-sp [:it :spa])

(defn query-many
  [terms langs]
  (mapv #(multi-query % langs) terms))
