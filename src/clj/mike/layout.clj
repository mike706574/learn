(ns mike.layout
  (:refer-clojure :exclude [type])
  (:require [hiccup.page :as p]))

(def scripts
  (p/include-js "../bower_components/jquery/dist/jquery.min.js"
                "../bower_components/bootstrap/dist/js/bootstrap.min.js"
                "../bower_components/metisMenu/dist/metisMenu.min.js"
                "../dist/js/sb-admin-2.js"))

(defn generic-head
  [title]
  [:head
   [:meta {:charset "utf-8"}]
   [:meta {:http-equiv "X-UA-Compatible" :content "IE=edge"}]
   [:meta {:name "viewport" :content "width=device-width, initial-scale=1"}]
   [:meta {:name "description" :content ""}]
   [:meta {:name "author" :content ""}]
   [:title title]
   (p/include-css "../bower_components/bootstrap/dist/css/bootstrap.min.css"
                  "../bower_components/metisMenu/dist/metisMenu.min.css"
                  "../dist/css/sb-admin-2.css"
                  "../bower_components/font-awesome/css/font-awesome.min.css")])

(defn side-link
  [current [k label link icon]]
  [:li
   [:a {:class (if (= k current) "active" "")
        :href link}
    [:i {:class (str "fa fa-fw " icon)}]
    (str " " label " ")]])

(defn side-bar
  [current]
  [:div.navbar-default.sidebar
   {:role "navigation"}
   [:div.sidebar-nav.navbar-collapse
    [:ul#side-menu.nav
     (cons
      [:li.sidebar-search
       [:div.input-group.custom-search-form
        [:input.form-control
         {:type "text" :placeholder "Search..."}]
        [:span.input-group-btn
         [:button.btn.btn-default
          {:type "button"}
          [:i.fa.fa-search]]]]]
      (map #(side-link current %) [[:dashboard "Dashboard" "/dashboard" "fa-dashboard"]
                                   [:lessons "Lessons" "/lessons" "fa-table"]
                                   [:types "Types" "/types" "fa-wrench"]]))]]])

(defn top-right
  [username]
  [:ul.nav.navbar-top-links.navbar-right
   [:li
    [:a {:href "/todo"}
     [:i.fa.fa-user.fa-fw]
     (str " " username " ")]]
   [:li
    [:a {:href "/logout"}
     [:i.fa.fa-remove.fa-fw]
     " Log Out "]]])

(defn top-bar
  [username current]
  [:nav.navbar.navbar-default.navbar-static-top
   {:role "navigation", :style "margin-bottom: 0"}
   [:div.navbar-header
    [:button.navbar-toggle
     {:type "button",
      :data-toggle "collapse",
      :data-target ".navbar-collapse"}
     [:span.sr-only "Toggle navigation"]
     [:span.icon-bar]
     [:span.icon-bar]
     [:span.icon-bar]]
    [:a.navbar-brand {:href "index.html"} "Kangaroo"]]
   (top-right username)
   (side-bar current)])

(defn dashboard-body
  [username]
  [:body
   [:div#wrapper
    (top-bar username :dashboard)
    [:div#page-wrapper
     [:div.row
      [:div.col-lg-12 [:h1.page-header "Dashboard"]]] 
     [:div.row
      [:div.col-lg-3.col-md-6
       [:div.panel.panel-primary
        [:div.panel-heading
         [:div.row
          [:div.col-xs-3 [:i.fa.fa-comments.fa-5x]]
          [:div.col-xs-9.text-right
           [:div.huge "26"]
           [:div "New Comments!"]]]]
        [:a {:href "#"}]
        [:div.panel-footer
         [:span.pull-left "View Details"]
         [:span.pull-right [:i.fa.fa-arrow-circle-right]]
         [:div.clearfix]]]]
      [:div.col-lg-3.col-md-6
       [:div.panel.panel-green
        [:div.panel-heading
         [:div.row
          [:div.col-xs-3 [:i.fa.fa-tasks.fa-5x]]
          [:div.col-xs-9.text-right
           [:div.huge "12"]
           [:div "New Tasks!"]]]]
        [:a {:href "#"}]
        [:div.panel-footer
         [:span.pull-left "View Details"]
         [:span.pull-right [:i.fa.fa-arrow-circle-right]]
         [:div.clearfix]]]]
      [:div.col-lg-3.col-md-6
       [:div.panel.panel-yellow
        [:div.panel-heading
         [:div.row
          [:div.col-xs-3 [:i.fa.fa-shopping-cart.fa-5x]]
          [:div.col-xs-9.text-right
           [:div.huge "124"]
           [:div "New Orders!"]]]]
        [:a {:href "#"}]
        [:div.panel-footer
         [:span.pull-left "View Details"]
         [:span.pull-right [:i.fa.fa-arrow-circle-right]]
         [:div.clearfix]]]]
      [:div.col-lg-3.col-md-6
       [:div.panel.panel-red
        [:div.panel-heading
         [:div.row
          [:div.col-xs-3 [:i.fa.fa-support.fa-5x]]
          [:div.col-xs-9.text-right
           [:div.huge "13"]
           [:div "Support Tickets!"]]]]
        [:a {:href "#"}]
        [:div.panel-footer
         [:span.pull-left "View Details"]
         [:span.pull-right [:i.fa.fa-arrow-circle-right]]
         [:div.clearfix]]]]]]]
   scripts])

(defn dashboard
  [username]
  (p/html5
   (generic-head "Dashboard")
   (dashboard-body username)))

(defn spatula
  [title namespace api-url username]
  (p/html5
   (generic-head "Lessons")
   [:body
    [:div#wrapper
     (top-bar username :lessons)
     [:div#page-wrapper
      [:div#app.container-fluid
       [:div.row
        [:div.col-lg-12
         [:h1.page-header "Lessons"]
         [:h4
          [:span.fa.fa-refresh.fa-spin.fa-fw.margin-bottom]
          " Loading page..."]]]]]]
    scripts
    (p/include-js "js/client.js")
    [:script (str "mike." namespace ".start('" api-url "','" username "');")]]))

(defn login
  []
  (p/html5
   (generic-head "Log In")
   [:body
    [:div.container
     [:div.row
      [:div.col-md-4.col-md-offset-4
       [:div.login-panel.panel.panel-default
        [:div.panel-heading [:h3.panel-title "Please Sign In"]]
        [:div.panel-body
         [:form
          {:role "form" :method "POST" :action "login"}
          [:fieldset
           [:div.form-group
            [:input.form-control
             {:placeholder "Username"
              :name "username"
              :type "text"
              :autofocus "autofocus"}]]
           [:div.form-group
            [:input.form-control
             {:placeholder "Password"
              :name "password"
              :type "password"
              :value ""}]]
           [:input.btn.btn-lg.btn-success.btn-block
            {:type "submit" :value "Log in"}]]]
         [:div
          {:style "padding-top: 15px; font-size: 90%"}
          "Don't have an account? "
          [:a {:href "signup"} "Sign up!"]]]]]]]
    scripts]))

(defn signup
  []
  (p/html5
   (generic-head "Sign Up")
   [:body
    [:div.container
     [:div.row
      [:div.col-md-4.col-md-offset-4
       [:div.login-panel.panel.panel-default
        [:div.panel-heading [:h3.panel-title "Sign Up"]]
        [:div.panel-body
         [:form
          {:role "form" :method "POST" :action "signup"}
          [:fieldset
           [:div.form-group
            [:input.form-control
             {:required "required"
              :placeholder "Username"
              :name "username"
              :type "text"
              :minlength "2"
              :maxlength "32"
              :autofocus "autofocus"}]]
           [:div.form-group
            [:input.form-control
             {:required "required"
              :placeholder "Password"
              :name "password"
              :type "password"
              :minlength "8"
              :maxlength "32"
              :value ""}]]
           [:div.form-group
            [:input.form-control
             {:required "required"
              :placeholder "Confirm"
              :name "confirm"
              :type "password"
              :minlength "8"
              :maxlength "32"
              :value ""}]] 
           [:input.btn.btn-lg.btn-success.btn-block
            {:type "submit" :value "Sign up"}]]]
         [:div
          {:style "padding-top: 15px; font-size:90%"} "Already have an account? "
          [:a {:href "login"} "Log in!"]]]]]]]
    scripts]))

