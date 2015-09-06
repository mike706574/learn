(ns mike.layout.core
  (:require [mike.layout.top-bar :refer [top-bar]]
            [hiccup.page :refer [html5 include-css include-js]]
            [clojure.string :refer [trim join]]))

(def dinosaur-links
  [{:label "Flash" :href "/lang/flash"}
   {:label "Browse" :href "/lang/browse"}])

(def top-bar-items
  [{:type :link-dropdown :label "Things" :href "#" :items dinosaur-links}])

(defn snake-section
  [{:keys [id heading paragraph] :or {label nil-text href nil-text}}]
  [:section.snake {:id id}
   [:div.row
    [:div.small-8.columns
     [:h3 heading
      [:p paragraph]]]]])

(defn footer-bottom []
  [:section.ferret
   [:div.row
    [:div.large-6.columns
     [:p "This is the bottom part of the footer."]]
    [:div.large-6.columns
     [:ul.inline-list.right
      [:li {:href "#"} "Link 1"]
      [:li {:href "#"} "Link 2"]
      [:li {:href "#"} "Link 3"]
      [:li {:href "#"} "Link 4"]]]]])

(defn footer-top []
  (snake-section {:id :snake2
                  :heading "This is another heading!"
                  :paragraph "This is the top part of the footer."}))
(defn head
  [title]
  [:head
    [:meta {:charset "utf-8"}]
    [:meta {:name "viewport" :content "initial-scale=1.0,width=device-width"}]
    [:title title]
    (include-css "css/normalize.css" "css/foundation.min.css" "css/screen.css")
    (include-js "js/vendor/modernizr.js")])

(defn common
  [title & body]
  (html5
   (head title)
   [:body
    (top-bar title top-bar-items)
    body 
    (footer-top)
    (footer-bottom)
    (include-js "js/vendor/jquery.js" "js/foundation.min.js")
    [:script "$(document).foundation();"]]))

(defn reagent
  [title filename app]
  (html5
   [:head
    [:meta {:charset "utf-8"}]
    [:meta {:name "viewport" :content "initial-scale=1.0,width=device-width"}]
    [:title title]]
   [:body
    [:div#app]
    [:script {:type "text/javascript" :src (str "/js/" filename "/goog/base.js")}]
    [:script {:type "text/javascript" :src (str "/js/" filename ".js")}]
    [:script {:type "text/javascript"} (str "goog.require(\"" app  ".core\");")]
    [:script {:type "text/javascript"} (str app ".core.start();")]]))

(defn reagent-prod
  [title app]
  (html5
   [:head
    [:meta {:charset "utf-8"}]
    [:meta {:name "viewport" :content "initial-scale=1.0,width=device-width"}]
    [:title title]]
   [:body
    [:div#app]
    [:script {:type "text/javascript" :src (str "/js/" app ".js")}]]))

(defn another-simple-js-app
  [title path]
  (html5
   [:head
    [:meta {:charset "utf-8"}]
    [:meta {:name "viewport" :content "initial-scale=1.0,width=device-width"}]
    [:title title]]
   [:body
    [:div#app]
    (include-js path)]))

(defn js-app
  [title path]
  (html5
   (head title)
   [:body
    (top-bar title top-bar-items)
    [:div#app]
    (footer-top)
    (footer-bottom)
    (include-js "js/vendor/jquery.js" "js/foundation.min.js")
    [:script "$(document).foundation();"]
    (include-js path)]))

