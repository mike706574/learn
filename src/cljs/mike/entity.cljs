(ns mike.entity
  (:require [mike.state :refer [swap-in! commit!]]
            [mike.misc :as misc]
            [mike.cookies :as cookies]
            [clojure.string :refer [blank? capitalize join]]))

(defn get-blank-entity
  [{attributes :attributes}]
  (misc/mapm (fn [{:keys [id label]}]
               [id {:value "" :dirty? false :label label :type :text}]) attributes))
