(ns mike.common.component
  (:require [reagent.core :as reagent]
            [mike.common.state :refer [swap-in! commit!]]
            [mike.common.misc :as misc]
            [mike.common.cookies :as cookies]
            [clojure.string :refer [blank? capitalize]]))

;; TODO: where do i belong?
(defn get-value [e] (-> e .-target .-value))
            
(defn- build-option
  [e]
  (let [k (key e)]
    [:option {:key k :value k} (val e)]))

(defn fun-select
  [f options selected]
  [:select.form-control {:on-change #(f (get-value %)) :value selected}
   (map build-option options)])

(defn on-change-select
  [on-change options]
  [:select {:on-change on-change}
   (map build-option options)])

(defn button
  [id label f]
  [:input.btn.btn-default {:type "button"
                           :id id
                           :value label
                           :on-click f}])

(defn navigation-buttons
  [page-number page-count show-fn]
  (when (not= 0 page-count) 
    [:div
     (when (not= 1 page-number)
       [:input {:type "button" :value "First" :on-click #(show-fn 1)}])
     (when (< 1 page-number)
       [:input {:type "button" :value "Previous" :on-click #(show-fn (dec page-number))}])
     (when (not= page-number page-count)
       [:input {:type "button" :value "Next" :on-click #(show-fn (inc page-number))}])
     (when (not= page-number page-count)
       [:input {:type "button" :value "Last" :on-click #(show-fn page-count)}])]))

;; (defn flip-box
;;   [yak selected sentence flip next]
;;   (let [info nil
;;         title (:name info)
;;         label (get-label selected (:languages info))]
;;     [:div
;;      [:h2 title]
;;      [:h5 label]
;;      [:p (selected sentence)]
;;      [:div
;;       [:input {:type "button" :value "Flip" :on-click flip}]
;;       [:input {:type "button" :value "Next" :on-click next}]]]))

;; (defn flip-box2
;;   [title selected selected-name options flip next]
;;   [:div
;;    [:h2 title]
;;    [:span selected-name]
;;    [:div [:span (selected options)]]
;;    [:div
;;     [:input {:type "button" :value "Flip" :on-click flip}]
;;     [:input {:type "button" :value "Next" :on-click next}]]])

(defn text-box
  [state k]
  [:input {:type "text"
           :id k
           :value (k @state)
           :on-change #(swap! state assoc k (get-value %))}])

(defn label
  ([target]
   (label target (capitalize (name target)))) 
  ([target text]
  [:label {:for target} (str text ": ")]))

(defn text-box-in
  [state id ks] 
  [:input {:type "text"
           :id id
           :value (get-in @state ks)
           :on-change #(swap! state assoc-in ks (get-value %))}])

(defn build-action
  [row column]
  (let [f (nth column 3)
        no-args? (= 4 (count column))]
    (if no-args?
      #(f row)
      (let [template (nth column 4)
            args (map #(if (keyword? %) (% row) %) template)]
        #(apply f args)))))

(defn build-property
  [row column]
  (let [k (second column)
        label (or (misc/third column) )]

    )
  
  )

(defn labelize [k] (str (capitalize (name k))))

(defn build-th
  [col]
  (let [type (first col)
        k (second col)]
    [:th {:key k}
     (case type
       :property (if (= (count col) 3)
                   (misc/third col)
                   (labelize k)) 
       :action "")]))

(defn build-td
  [row col]
  (let [type (first col)
        k (second col)]
    [:td {:key k}
     (case type
       :property (k row)
       :action (let [label (nth col 2)]
                 (button k label (build-action row col))))]))

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

(defn validate-selection
  [options value]
  (or (blank? value) (contains? (misc/maps key options) value)))

(defn validate-property
  [{:keys [value type required validate options] :as property}]
  (let [valid? (if (= :select type)
                 (validate-selection options value)
                 (validate value))]
    (assoc property :valid? valid?)))

(defn validate-form
  [properties]
  (let [validated-properties (misc/fmap validate-property properties)
        all-valid? (every? #(:valid? (val %)) validated-properties)]
    [validated-properties all-valid?]))

(defn form
  [state form-key validated-properties]
  [:form
   (doall
    (for [[k property] validated-properties]
      (let [{:keys [value dirty? valid? type] :or {type :text}} property
            number? (= type :number)
            empty-number? (and number? dirty? (blank? value))
            invalid? (and dirty? (not valid?))
            class (if (or invalid? empty-number?) "invalid" "")]
        [:div.form-group {:key k}
         (label k)
         [:input {:type type :id k :name k :value value :class class
                  :on-change #(swap-in! state [form-key k] assoc :dirty? true
                                                                 :value (get-value %))}]])))])
(defn fun-form
  [state heading form-key submit!]
  (let [data (form-key @state)
        [validated all-valid?] (validate-form data)]
    [:div
     [:h3 heading]
     [:form
     (doall
      (for [[k property] validated]
        (let [{:keys [value dirty? valid? type] :or {type :text}} property
              number? (= type :number)
            empty-number? (and number? dirty? (blank? value))
            invalid? (and dirty? (not valid?))
            class (if (or invalid? empty-number?) "invalid" "")]
          [:div.form-group {:key k}
           (label k)
           [:input {:type type :id k :name k :value value :class class
                    :on-change #(swap-in! state [form-key k] assoc :dirty? true :value (get-value %))}]])))]
     [:input {:type "button"
              :id :create
              :disabled (not all-valid?) 
              :value "Add"
              :on-click #(submit! state)}]]))

(defn render-fatal
  [& args]
  [:div
   [:h2 "Fatal error!"]
   [:p (apply str args)]])

(defn app
  [state header modes]
  (let [{:keys [error loading message mode]} @state]
    (println "Rendering mode:" (name mode))
    [:div
     header
     (if (= :fatal mode)
       (render-fatal message)
       [:div 
        (when error [:h3 "Error!"])
        (when message [:span message])
        (if loading
          [:span "Loading..."]
          (if-let [f (modes mode)]
            (f state)
            (render-fatal "Invalid mode: " (name mode))))])]))

(defn app2
  [state modes]
  (let [{:keys [error loading message mode]} @state]
    (println "Rendering mode:" (name mode))
    [:div
     (if (= :fatal mode)
       (render-fatal message)
       [:div 
        (when error [:h3 "Error!"])
        (when message [:span message])
        (if loading
          [:span "Loading..."]
          (if-let [f (modes mode)]
            (f state)
            (render-fatal "Invalid mode: " (name mode))))])]))

(defn tabs
  [state header modes]
  (let [{:keys [error fatal loading message mode]} @state]
    [:div
     header     
     (if fatal
       (render-fatal message)
       [:div
        [:ul {:class "nav"}
         (for [m (keys modes)]
           [:li {:key m}
            (button
             m
             (if (= mode m) (str "[CURRENT]" (name m)) (name m))
             #(commit! state :mode m))])]
        (when error [:h3 "Error!"])
        (when message [:span message])
        (if loading
          [:span "Loading..."]
          (if-let [f (modes mode)]
            (f state) 
            (render-fatal "Invalid mode: " (name mode))))])]))


(defn boot 
  [component id]
  (fn []
    (reagent/render-component 
      [component] 
      (.getElementById js/document id))))

(defn sub-app
  [state modes]
  (let [{:keys [error loading message mode]} @state]
    (println "Rendering mode:" (name mode))
    [:div.container-fluid
     (if (= :fatal mode)
       (render-fatal message)
       [:div 
        (when error [:h3 "Error!"])
        (when message [:span message])
        (if-let [f (modes mode)]
          (f state)
          (render-fatal "Invalid mode: " (name mode)))])]))

(defn modal
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

(defn full-app
  [state username modes]
  [:div#wrapper
   [:nav.navbar.navbar-inverse.navbar-fixed-top
    {:role "navigation"}
    [:div.navbar-header
     [:button.navbar-toggle
      {:type "button",
       :data-toggle "collapse",
       :data-target ".navbar-ex1-collapse"}
      [:span.sr-only "Toggle navigation"]
      [:span.icon-bar]
      [:span.icon-bar]
      [:span.icon-bar]]
     [:a.navbar-brand {:href "index.html"} "something"]]
    [:ul.nav.navbar-right.top-nav
     [:li.dropdown
      [:a.dropdown-toggle
       {:href "#", :data-toggle "dropdown"}
       [:i.fa.fa-envelope]
       " "
       [:b.caret]]
      [:ul.dropdown-menu.message-dropdown
       [:li.message-preview
        [:a {:href "#"}]
        [:div.media
         [:span.pull-left
          [:img.media-object
           {:src "http://placehold.it/50x50", :alt ""}]]
         [:div.media-body
          [:h5.media-heading [:strong username]]
          [:p.small.text-muted
           [:i.fa.fa-clock-o]
           " Yesterday at 4:32 PM"]
          [:p "Lorem ipsum dolor sit amet, consectetur..."]]]]
       [:li.message-preview
        [:a {:href "#"}]
        [:div.media
         [:span.pull-left
          [:img.media-object
           {:src "http://placehold.it/50x50", :alt ""}]]
         [:div.media-body
          [:h5.media-heading [:strong username]]
          [:p.small.text-muted
           [:i.fa.fa-clock-o]
           " Yesterday at 4:32 PM"]
          [:p "Lorem ipsum dolor sit amet, consectetur..."]]]]
       [:li.message-preview
        [:a {:href "#"}]
        [:div.media
         [:span.pull-left
          [:img.media-object
           {:src "http://placehold.it/50x50", :alt ""}]]
         [:div.media-body
          [:h5.media-heading [:strong username]]
          [:p.small.text-muted
           [:i.fa.fa-clock-o]
           " Yesterday at 4:32 PM"]
          [:p "Lorem ipsum dolor sit amet, consectetur..."]]]]
       [:li.message-footer [:a {:href "#"} "Read All New Messages"]]]]
     [:li.dropdown
      [:a.dropdown-toggle
       {:href "#", :data-toggle "dropdown"}
       [:i.fa.fa-bell]
       " "
       [:b.caret]]
      [:ul.dropdown-menu.alert-dropdown
       [:li
        [:a
         {:href "#"}
         "Alert Name "
         [:span.label.label-default "Alert Badge"]]]
       [:li
        [:a
         {:href "#"}
         "Alert Name "
         [:span.label.label-primary "Alert Badge"]]]
       [:li
        [:a
         {:href "#"}
         "Alert Name "
         [:span.label.label-success "Alert Badge"]]]
       [:li
        [:a
         {:href "#"}
         "Alert Name "
         [:span.label.label-info "Alert Badge"]]]
       [:li
        [:a
         {:href "#"}
         "Alert Name "
         [:span.label.label-warning "Alert Badge"]]]
       [:li
        [:a
         {:href "#"}
         "Alert Name "
         [:span.label.label-danger "Alert Badge"]]]
       [:li.divider]
       [:li [:a {:href "#"} "View All"]]]]
     [:li.dropdown
      [:a.dropdown-toggle
       {:href "#", :data-toggle "dropdown"}
       [:i.fa.fa-user]
       (str " " username " ")
       [:b.caret]]
      [:ul.dropdown-menu
       [:li [:a {:href "#"} [:i.fa.fa-fw.fa-user] " Profile"]]
       [:li [:a {:href "#"} [:i.fa.fa-fw.fa-envelope] " Inbox"]]
       [:li [:a {:href "#"} [:i.fa.fa-fw.fa-gear] " Settings"]]
       [:li.divider]
       [:li [:a {:href "/logout"} [:i.fa.fa-fw.fa-power-off] " Log Out"]]]]]
    [:div.collapse.navbar-collapse.navbar-ex1-collapse
     [:ul.nav.navbar-nav.side-nav
      [:li
       [:a
        {:href "index.html"}
        [:i.fa.fa-fw.fa-dashboard]
        " Dashboard"]]
      [:li
       [:a
        {:href "charts.html"}
        [:i.fa.fa-fw.fa-bar-chart-o]
        " Charts"]]
      [:li
       [:a {:href "tables.html"} [:i.fa.fa-fw.fa-table] " Tables"]]
      [:li [:a {:href "forms.html"} [:i.fa.fa-fw.fa-edit] " Forms"]]
      [:li
       [:a
        {:href "bootstrap-elements.html"}
        [:i.fa.fa-fw.fa-desktop]
        " Bootstrap Elements"]]
      [:li
       [:a
        {:href "bootstrap-grid.html"}
        [:i.fa.fa-fw.fa-wrench]
        " Bootstrap Grid"]]
      [:li
       [:a
        {:href "javascript:;",
         :data-toggle "collapse",
         :data-target "#demo"}
        [:i.fa.fa-fw.fa-arrows-v]
        " Dropdown "
        [:i.fa.fa-fw.fa-caret-down]]
       [:ul#demo.collapse
        [:li [:a {:href "#"} "Dropdown Item"]]
        [:li [:a {:href "#"} "Dropdown Item"]]]]
      [:li.active
       [:a
        {:href "blank-page.html"}
        [:i.fa.fa-fw.fa-file]
        " Blank Page"]]
      [:li
       [:a
        {:href "index-rtl.html"}
        [:i.fa.fa-fw.fa-dashboard]
        " RTL Dashboard"]]]]]
   [:div#page-wrapper
    (sub-app state modes)
    (modal state)]]) 

(defn render-select
  [state form-key k property]
  (let [{:keys [value dirty? valid? options]} property
        invalid? (and dirty? (not valid?))
        class (if invalid? "form-group has-error" "form-group")
]
    (println "OK")
    (println value)
    [:div {:key k class class}
     [:label {:for k} (labelize k)]
     [:select.form-control {:on-change #(swap-in! state [form-key k] assoc :dirty? true :value (get-value %))
                            :value value}
      [:option {:k :none :value nil} "None"]
      (map build-option options)]]))

(defn form2
  [state heading label form-key submit!]
  (let [data (form-key @state)
        [validated all-valid?] (validate-form data)]
    [:div
     [:h3 heading]
     [:form
      (doall
       (for [[k property] validated]
         (let [{:keys [value dirty? valid? type] :or {type :text}} property]
           (if (= :select (keyword type))
             (render-select state form-key  k property)
             (let [number? (= type :number)
                   empty-number? (and number? dirty? (blank? value))
                   invalid? (and dirty? (not valid?))
                   class (if (or invalid? empty-number?) "form-group has-error" "form-group")] 
               [:div {:key k :class class}
                [:label {:for k} (labelize k)]
                [:input.form-control
                 {:type type
                  :id k
                  :name k
                  :value value
                  :class class
                  :on-change #(swap-in! state [form-key k] assoc :dirty? true :value (get-value %))

                  }]])))))
      [:button.btn.btn-default {:type "button"
                                :id :create
                                :disabled (not all-valid?) 
                                :value "Add"
                                :on-click #(submit! state)} label]]]))

;; (defn redirect!
;;   [url]
;;   (-> js/document .-location
;;       (set! url)))

;; (defn boot2-component
;;   [init modes]
;;   (println "Initializing...") 
;;   (let [logged-in? (cookies/get :logged-in)
;;         username (cookies/get :username)]
;;     (when (or (not logged-in?) (not username))
;;       (redirect! "/login")) 
;;     (let [state (reagent/atom {:username username
;;                                :loading true})]
;;       (init state)
;;       (fn []
;;         (println "Rendering...")
;;         (full-app state username modes)))))

;; (defn boot2
;;   [id init modes]
;;   (println "BOOT2")
;;   (fn []
;;     (reagent/render-component 
;;       [(partial boot2-component init modes)] 
;;       (.getElementById js/document id))))
