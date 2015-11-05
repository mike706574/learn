(ns mike.common.entity
  (:require [mike.common.state :refer [swap-in! commit!]]
            [mike.common.misc :as misc]
            [mike.common.cookies :as cookies]
            [clojure.string :refer [blank? capitalize join]]))

(defn get-blank-entity
  [{attributes :attributes}]
  (misc/mapm (fn [{:keys [id label]}]
               [id {:value "" :dirty? false :label label :type :text}]) attributes))
