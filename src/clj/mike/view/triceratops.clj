(ns mike.view.triceratops
  (:require [mike.storage :as storage]
            [mike.layout.core :as layout]))

(defn triceratops
  []
  (layout/js-app "Triceratops!" "js/app.js"))
