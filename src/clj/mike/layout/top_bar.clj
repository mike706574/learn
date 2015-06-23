(ns mike.layout.top-bar
  (:require [hiccup.page :refer [html5 include-css include-js]]
            [clojure.string :refer [trim join]]))

(defn link-dropdown-item
  [{:keys [label href]}]
  [:li [:a {:href href} label]])

(defmulti top-bar-item
  (fn [m] (:type m)))

(defmethod top-bar-item :link-dropdown
  [{:keys [label href items]}]
  [:li.has-dropdown.not-click
   ;; THIS SHOULD NOT BE A LINK
   [:a.bold-font {:href href} label]
   [:ul.dropdown
    (map link-dropdown-item items)]])

(defmethod top-bar-item :button
  [{:keys [label href]}]
  [:li.has-form
   [:a.small.button {:href href} label]])

(defn top-bar-section
  [config]
  [:section.top-bar-section
   [:ul.right
    (interleave
     (repeat [:li.divider])
     (map top-bar-item config))]])

(defn top-bar
  [title top-bar-items]
  [:nav.top-bar {:data-topbar ""}
   [:ul.title-area
    [:li.name
     [:h1
      [:a.bold-font {:href "/"} title]]]
    [:li.toggle-topbar.menu-icon
     [:a {:href "#"} [:span "menu"]]]]
   (top-bar-section top-bar-items)])
