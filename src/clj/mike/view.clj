(ns mike.view
  (:require [lang.sentence.api :as api]
            [clojure.core.async :refer [<!!]]
            [mike.layout.core :as layout]))

(defn flash
  []
  (layout/reagent "Flashcards" "mike.flash"))

(defn browse
  []
  (layout/reagent "Browse" "mike.browse"))

(defn triceratops
  []
  (layout/js-app "Flashcards" "js/app.js"))


(defn stegosaurus
  [sentence-repo]
  (layout/common
   "Stegosaurus!"
   (let [sentence (<!! (api/get-random-sentence :en-it sentence-repo))]
     [:section#thing
      [:div.row
       [:div.large-12.columns.centered-text
        [:h1 (:italian sentence)]]]])))
