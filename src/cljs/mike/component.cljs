(ns mike.component (:require 
            [mike.browser :as b]
            [clojure.string :refer [blank? capitalize join]]))

(enable-console-print!)
            
(defn- build-option
  [e]
  (let [k (key e)]
    [:option {:key k :value k} (val e)]))

(defn fselect
  [f options selected]
  [:select.form-control {:on-change #(f (b/get-value %)) :value selected}
   (map build-option options)])

(defn loading-header
  [target]
  [:h4 [:span.fa.fa-refresh.fa-spin.fa-fw.margin-bottom] (str " Loading " target "...")])

;; TODO: find right size or make configurable
(defn loading-header2
  [target]
  [:h5 [:span.fa.fa-refresh.fa-spin.fa-fw.margin-bottom] (str " Loading " target "...")])

(defn loading-alert
  [message]
  [:div.alert.alert-info {:role "alert"}
   [:span.fa.fa-refresh.fa-spin {:aria-hidden true}]
   [:span.sr-only "Loading!"]
   message])

(defn error-alert
  [message]
  [:div.alert.alert-danger {:role "alert" :style {:margin-top "18px"}}
   [:span.glyphicon.glyphicon-exclamation-sign {:aria-hidden true}]
   [:span.sr-only "Error!"] " " message])

(defn button
  [v f]
  [:input.btn.btn-default {:type "button" :value v
                           :on-click f}])

(defn success-alert
  [message]
;;   <div class="alert alert-warning alert-dismissible" role="alert">
;;   <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
;;   <strong>Warning!</strong> Better check yourself, you're not looking too good.
;; </div>

  [:div.alert.alert-success.alert-dismissible {:role "alert" :style {:marginTop "18px"}}
 ;;  [:button.close {:type "button" :data-dismiss "alert" :aria-label "Close"}]
   [:span.glyphicon.glyphicon-ok {:aria-hidden true}] [:span.sr-only "Success!"] " " message])

(defn message-box
  ;; TODO: error should be error?, loading should be loading?
  [error message]
  (when message
    (if error
      (error-alert message)
      (success-alert message))))











