(ns mike.common.component
  (:require [reagent.core :as reagent]
            [mike.common.state :refer [swap-in! commit!]]
            [mike.common.misc :as misc]
            [mike.common.cookies :as cookies]
            [clojure.string :refer [blank? capitalize join]]))

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

(defn side-navbar
  [links current]
  [:ul.nav.navbar-nav.side-nav
   (map (fn [[k label path icon]]
          (let [link-class (when (= k current) "active")
                icon-class (get-fa-icon icon)]
            [:li {:key k :class link-class}
             [:a {:href path}
              [:i {:class icon-class}]
              [:span (str " " label)]]])) links)])

(def app-navbar
  (partial
   side-navbar
   [[:flash "Flash" "/flash" :dashboard]
    [:lesson "Lesson" "/lesson" :wrench]
    [:browse "Browse" "/browse" :desktop]
    [:types "Types" "/types" :file]]))

;; TODO: where do i belong?
(defn page-header
  [state title]
  (let [{:keys [error message]} @state]
   [:div.row
    [:div.col-lg-12
     [:h1.page-header title]
     (when message
       (if error
         [:div.alert.alert-danger.close [:strong message]]
         [:div.alert.alert-info.close [:strong message]]))]]))

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



(defn in-range?
  [range value]
  (and (>= value (first range)) (<= value (second range))))

(defn validate-selection
  [{:keys [value options optional?]}]
  (println value)
  (if (blank? value)
    (when (not optional?) "Required!") 
    (when (not (contains? (misc/maps key options) value))
      "Not a valid option!")))

(defn validate-number
  [{:keys [value range]}]
  (let [[min max] range] 
    (cond
      (blank? value) "Required!"
      (not (misc/is-number? value)) "NaN!"
      (and min (< (js/parseInt value) min)) "Less than min!"
      (and max (> (js/parseInt value) max)) "Greater than max!")))

(defn validate-text
  [{:keys [value optional?]}]
  (when (and (blank? value) (not optional?)) "Required!"))

(defn validate-property
  [{:keys [value type required options range] :as property}]
  (let [validate (case type
                   :select validate-selection
                   :number validate-number
                   :text validate-text
                   (throw (js/Error. (str "Invalid form input type: " type))))
        message (validate property)
        valid? (nil? message)]
    (assoc property :valid? valid? :message message)))

(defn validate-form
  [properties]
  (let [validated-properties (misc/fmap validate-property properties)
        all-valid? (every? #(:valid? (val %)) validated-properties)]
    [validated-properties all-valid?]))

(defn form
  [state form-key validated-properties]
  [:form {:role :form}
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
                                                                 :value (get-value %)
                                                                 )}]])))])
(defn fun-form
  [state heading form-key submit!]
  (let [data (form-key @state)
        [validated all-valid?] (validate-form data)]
    [:div
     [:h3 heading]
     [:form {:role :form}
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
    (if (= :fatal mode)

      (render-fatal message)
       (if-let [f (modes mode)]
         (f state)
         (render-fatal "Invalid mode: " (name mode))))))

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
  [state current username modes]
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
     (app-navbar current)]]
   [:div#page-wrapper
    (sub-app state modes)
    (modal state)]]) 

(defn render-select
  [state form-key k v {:keys [options optional?]}]
  [:select.form-control {:on-change #(swap-in! state [form-key k] assoc :dirty? true :value (get-value %))
                         :value v}
   (when optional?
     [:option {:k :none :value ""}])
   (map build-option options)])

(defn render-text-box
  [state form-key k v property]
  [:input.form-control
   {:id k
    :name k
    :value v
    :type :text
    :on-change #(swap-in! state [form-key k] merge {:dirty? true
                                                    :value (get-value %)
                                                    :last-value v})}])

(defn render-number-box
  [state form-key k v property]
  (let [[min max] (:range property)]
    [:input.form-control
     {:id k
      :name k
      :value v
      :min min
      :max max
      :type :number
      :on-change #(swap-in! state [form-key k] assoc :dirty? true :value (get-value %))}]))

(defn build-class
  [coll]
  (join " " coll))


(def clean-group "form-group")
(def success-group "form-group has-success")
(def error-group "form-group has-error")

(def success-text-group "form-group has-success has-feedback")
(def error-text-group "form-group has-error has-feedback")

(def success-glyph "glyphicon glyphicon-ok form-control-feedback")
(def error-glyph "glyphicon glyphicon-remove form-control-feedback")

(defn form2
  [state heading submit-label form-key submit!]
  (let [data (form-key @state)
        [validated all-valid?] (validate-form data)]
    [:div
     [:h3 heading]
     [:form {:role :form}
      (doall
       (for [[k property] validated]
         (let [{:keys [value dirty? valid? type message label] :or {type :text}} property
               render-input (case type
                              :select render-select
                              :text render-text-box
                              :number render-number-box
                              (throw (js/Error. (str "Invalid form input type: " type))))
               has-error? (and dirty? (not valid?))
               text? (= type :text)
               group-class (if text?
                             (if dirty? (if has-error? error-text-group success-text-group) clean-group)
                             (if dirty? (if has-error? error-group success-group) clean-group))]

           [:div {:key k :class group-class}
            [:label {:for k} label]
            ;; (cond
            ;;   (not dirty?) [:label {:for k} label]
            ;;   has-error? [:label {:class "control-label" :for k} (str label " - " message)]
            ;;   :else [:label {:class "control-label" :for k} (str label)])
            (render-input state form-key k value property)
            (when (and text? dirty?) [:span {:class (when dirty? (if has-error? error-glyph success-glyph))
                                             :aria-hidden true}])])))
      [:button {:type "button"
                 :id :submit
                 :class (if all-valid? "btn btn-default" "btn btn-default disabled")
                 :disabled (not all-valid?) 
                 :value "Add"
                 :on-click #(submit! state)} submit-label]]]))

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
