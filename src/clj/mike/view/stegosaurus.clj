(ns mike.view.stegosaurus
  (:require [mike.sentence.api :as api]
            [mike.layout.core :as layout]))

(defn stegosaurus
  [sentence-repo]
  (layout/common
   "Stegosaurus!"
   (let [sentence (api/get-random-sentence sentence-repo)]
     [:section#thing
      [:div.row
       [:div.large-12.columns.centered-text
        [:h1 (:italian sentence)]]]])))
