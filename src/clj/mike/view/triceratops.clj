(ns mike.view.triceratops
  (:require [mike.layout.core :as layout]))

(defn triceratops
  []
  (layout/js-app "Flashcards" "js/app.js"))
