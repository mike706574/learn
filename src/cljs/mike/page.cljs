(ns mike.page
  (:require [mike.component :as c]))

(defn get-fa-icon
  [k]
  (case k
    :dashboard "fa fa-fw fa-dashboard"
    :bar-chart-o "fa fa-fw fa-bar-chart-o"
    :table "fa fa-fw fa-bar-chart-o"
    :edit "fa fa-fw fa-edit"
    :desktop "fa fa-fw fa-desktop"
    :wrench "fa fa-fw fa-wrench"
    :file "fa fa-fw fa-file"
    (throw (js/Error. (str "Invalid FA icon: " k)))))

(defn fatal-error
  [& args]
  [:div
   [:h2 "Fatal error!"]
   [:p (apply str args)]])

(defn build-nav
  [links current]
  [:ul.nav.navbar-nav.side-nav
   (map (fn [[k label path icon]]
          (let [link-class (when (= k current) "active")
                icon-class (get-fa-icon icon)]
            [:li {:key k :class link-class}
             [:a {:href path}
              [:i {:class icon-class}]
              [:span (str " " label)]]])) links)])

(def nav (partial build-nav [[:flash "Flash" "/flash" :dashboard]
                             [:lesson "Lesson" "/lesson" :wrench]
                             [:browse "Browse" "/browse" :desktop]
                             [:types "Types" "/types" :file]]))

(defn loading
  [state]
  (when (:loading @state)
    [:div 
     [:div.modal-backdrop.fade.in ]
     [:div.modal.fade.in
      {:data-backdrop "static"
       :data-keyboard "false"
       :tabIndex -1
       :role "dialog"
       :aria-hidden "false"
       :style {"paddingTop" "15%" "overflowY" "visible" "display" "block"}}
      [:div.modal-dialog.modal-m 
       [:div.modal-content
        [:div.modal-header [:h3 {:style {"margin" "0"}} "Loading"]]
        [:div.modal-body
         [:div.progress.progress-striped.active
          {:style {"marginBottom" "0"}}
          [:div.progress-bar {:style {"width" "100%"}}]]]]]]]))

(defn build-title
  [current-state title]
  (if (vector? title)
    (apply str (map (fn [part] (if (vector? part) (get-in current-state part) part)) title))
    title))

(defn page
  [state modes]
  (let [{:keys [loading loading-target message mode] :as current-state} @state
        {:keys [title render]} (get modes mode)
        title (build-title current-state title)]
    [:div.container-fluid
     [:div.row
      [:div.col-lg-12
       [:h1.page-header title]
       (when loading (c/loading-header loading-target))]]
     (when (not loading)
       [:div.row (render state)])]))
