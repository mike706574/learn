(ns mike.common.table
  (:require [reagent.core :as reagent]
            [mike.common.state :refer [swap-in! commit!]]
            [mike.common.component :as com]
            [mike.common.core :as joe]
            [clojure.string :refer [blank? capitalize]]))

(defn build-action-fn
  [row col]
  (let [f (nth col 3)
        no-args? (= 4 (count col))]
    (if no-args?
      #(f row)
      (let [template (nth col 4)
            args (map #(if (keyword? %) (% row) %) template)]
        #(apply f args)))))

(defn build-action-row
  [row col]
  (let [k (second col)
        label (nth col 2)]
    (com/button k label (build-action-fn row col))))

(defn build-property-row
  [row col]
  (let [k (second col)]
    (k row)))

;; not really needed

;; (declare build-row)

;; (defn build-condition-row
;;   [row col]
;;   (let [all (nthrest col 2)
;;         conditions (into {} (partition 2 all))
;;         match (first (filter (fn [c] (let [f (key c)] (f row))) conditions))
;;         final (if match
;;                 (val match)
;;                 (if (odd? all)
;;                   (last all)
;;                   (throw (js/Error. "No matching condition found for table!"))))]
;;     (build-row final)))

(defn build-row
  [row col]
  (let [type (first col)]
    (case type
      :property (build-property-row row col)
      :action (build-action-row row col)
;;      :condition (build-condition-row row col)
      (throw (js/Error. (str  "Invalid row type: " type))))))

(defn table
  [rows cols]
  [:table
   [:thead
    [:tr
     (for [col cols]
       (let [type (first col)
             k (second col)
             label (str (capitalize (name k)))]
         [:th {:key k} label]))]]
   [:tbody
    (for [row rows]
      [:tr {:key (:id row)}
       (for [col cols]
         (let [k (second col)]
           [:td {:key k}
            (build-row row col)]))])]])
