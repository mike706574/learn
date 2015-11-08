(ns mike.table
  (:require [mike.misc :as m]
            [clojure.string :refer [capitalize]]))

(defn build-action
  [row column]
  (let [f (nth column 3)
        template (nth column 4)
        args (if (vector? template)
               (map #(if (keyword? %) (% row) %) template)
               (vector template row))]
    #(apply f args)))

(defn build-td
  [row col]
  (let [type (first col)
        k (second col)]
    [:td {:key k}
     (case type
       :property (k row)
       :action (let [label (nth col 2)]
                 [:input.btn.btn-default {:type "button"
                                          :id k
                                          :value label
                                          :on-click (build-action row col)}]))]))

(defn labelize [k] (str (capitalize (name k))))

(defn build-th
  [col]
  (let [type (first col)
        k (second col)]
    [:th {:key k}
     (case type
       :property (if (= (count col) 3)
                   (m/third col)
                   (labelize k))
       :action "")]))

(defn table
  [rows cols]
  [:table.table.table-striped
   [:thead
    [:tr
     (for [col cols] (build-th col))]]
   [:tbody
    (for [row rows]
      [:tr {:key (:id row)}
       (for [col cols] (build-td row col))])]])
