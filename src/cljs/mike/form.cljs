(ns mike.form
  (:require [mike.state :refer [swap-in!]]
            [mike.misc :as misc]
            [clojure.string :refer [blank?]]))

;; TODO: duped
(defn- build-option
  [e]
  (let [k (key e)]
    [:option {:key k :value k} (val e)]))

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

(defn render-select
  [state form-key k v {:keys [options optional?]}]
  [:select.form-control {:on-change #(swap-in! state [form-key k] assoc :dirty? true :value (misc/get-value %))
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
                                                    :value (misc/get-value %)
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
      :on-change #(swap-in! state [form-key k] assoc :dirty? true :value (misc/get-value %))}]))

(def clean-group "form-group")
(def success-group "form-group has-success")
(def error-group "form-group has-error")

(def success-text-group "form-group has-success has-feedback")
(def error-text-group "form-group has-error has-feedback")

(def success-glyph "glyphicon glyphicon-ok form-control-feedback")
(def error-glyph "glyphicon glyphicon-remove form-control-feedback")

(defn cool
  [state heading submit-label form-key submit!]
  (let [data (form-key @state)
        [validated all-valid?] (validate-form data)]
    (println "FK:" form-key)
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
