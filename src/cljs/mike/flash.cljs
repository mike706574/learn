(ns mike.flash
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [mike.misc :as m]
            [mike.page :as p]
            [mike.component :as c]
            [mike.state :as s]
            [mike.table :as t]
            [mike.entity.api :as api]
            [mike.entity.http :refer [HttpEntityRepo]]
            [clojure.string :refer [blank? capitalize]]
            [reagent.core :as r]
            [cljs.core.async :refer [<!]]))

(enable-console-print!)

(declare render-session)

(defn create-session!
  [state id name]
  (s/batch! state [[s/Channel :session api/create-session! [:repo :type-id id]]
                   [s/SpawnMode :session name name render-session {:flag :loading-session
                                                                   :secondary "Session"}]
                   [s/Channel :entity api/get-entity [:repo :type-id [:session :entity-id]]]
                   [s/Function :current :entity-start [:session :entity-start]]
                   [s/Value :mode :session]]))

(defn answer-question!
  [state correct?]
  ;; TODO: hacky
  (when (not (:loading-question @state)) 
    (swap! state assoc :loading-question true)
    (s/batch! state [[s/Value :loading-question true]
                     [s/Channel :session api/record-answer! [:repo
                                                             :type-id
                                                             [:session :id]
                                                             [:session :entity-id]
                                                               [:session :entity-start] correct?]]
                     [s/Channel :entity api/get-entity [:repo :type-id [:session :entity-id]]]
                     [s/Function :current :entity-start [:session :entity-start]]
                     [s/Value :loading-question false]])))

(defn session!
  [state session]
  (let [{:keys [id name]} session]
    (s/batch! state [[s/Value :loading-session? true]
                     [s/SpawnMode id name name render-session {:flag :loading-session
                                                               :secondary "Session"}]
                     [s/Channel :session api/get-session [:repo :type-id id]]
                     [s/Function :current :entity-start [:session]]
                     [s/Channel :entity api/get-entity [:repo :type-id [:session :entity-id]]]
                     [s/Value :loading-session? false]])))

(defn load-history!
  [state]
  (s/batch! state [[s/Channel :completed-sessions api/get-sessions-for-user [:repo :type-id {:done true}]]]))

(defn load-sessions!
  [state]
  (s/batch! state [[s/Channel :type api/get-type [:repo :type-id]]
                   [s/Channel :active-sessions api/get-sessions-for-user [:repo :type-id {:done false}]]
                   [s/Channel :lessons api/get-lessons [:repo :type-id]]]))

(defn flip
  [state]

  (let [{:keys [type current]} @state
        {:keys [attributes]} type
        current-attribute (m/find-first #(= current (:id %)) attributes)
        next (:id (m/get-after attributes current-attribute))]
    (swap! state assoc :current next)))

(defn render-session
  [state]
  (let [{:keys [type-id mode type loading-question session entity attribute current]} @state]
    (let [{:keys [id lesson-id name correct total done length entity-id entity-start]} session]
      (println entity "@@@ " entity-start "@@@" current)
      [:div {:style {"marginTop" "20px"}}
       (if done
         [:div
          [:h4 correct " out of " total " / Done"] 
          [:div.panel.panel-default
           {:style {"maxWidth" "30em"
                    "minHeight" "18em"
                    "userSelect" "none"
                    "MozUserSelect" "none"
                    "cursor" "pointer"}}
           [:p
            {:style {"textAlign" "center"
                     "margin" "3.5em 2em 0 2em"
                     "fontSize" "1.75em"
                     "userSelect" "none"
                     "MozUserSelect" "none"}}
            "Done!"]
           [:p
            {:style {"textAlign" "center"
                     "margin" "0 2em 0.5em 2em"
                     "fontSize" "1em"
                     "userSelect" "none"
                     "MozUserSelect" "none"}}
            correct " out of " total " - " (* (/ correct total) 100) "%"]
           [:div
            {:style {"textAlign" "center"}}
            [:button.btn.btn-primary
             {:style {"textAlign" "center"
                      "marginRight" "5px"}
              :type "button"
              :on-click #(s/kill-mode! state mode :sessions)}
             "OK!"]
            [:button.btn.btn-default
             {:style {"textAlign" "center"}
              :type "button"
              :on-click #(create-session! state lesson-id name)}
             "Again!"]]]]
         [:div
          [:h4 correct " out of " total " / Playing to " length]
          [:div
           [:div.panel.panel-default
            {:style {"maxWidth" "30em"
                     "minHeight" "18em"
                     "userSelect" "none"
                     "MozUserSelect" "none"
                     "cursor" "pointer"}
             :on-click #(flip state)}
            [:p
             {:style {"textAlign" "center"
                      "margin" "3.5em 2em"
                      "fontSize" "2em"
                      "userSelect" "none"
                      "MozUserSelect" "none"}}
             (get entity (keyword current))]] 
           [:p
            [:button.btn.btn-warning
             {:type "button"
              :style {"marginRight" "5px"}
              :on-click #(flip state)} "Flip"]
            [:button.btn.btn-primary
             {:type "button"
              :on-click #(answer-question! state true)
              :style {"marginRight" "5px"}}
             "Correct"]
            [:button.btn.btn-danger
             {:type "button" :on-click #(answer-question! state false)}
             "Wrong"]]]])])))

(defn lesson-panel
  [state {:keys [id user length name description] :as lesson}]
  [:div.panel.panel-primary
   {:key id}
   [:div.panel-heading
    [:h3.panel-title.pull-left {:style {"whiteSpace" "nowrap"
                                        "overflow" "hidden"
                                        "textOverflow" "ellipsis"
                                        "lineHeight" "normal"
                                        "width" "75%"
                                        "paddingTop" "8px"}} name]
    [:button.btn.btn-default.pull-right "Start"]
    [:div.clearfix]]
   [:div.panel-body
    [:p {:style {"marginBottom" "0"}} description]]])

(defn render-sessions
  [state]
  (let [{:keys [type-id types loading-sessions active-sessions
                completed-sessions loading-lessons lessons]} @state 
        type-options (m/fmap :label types)]
    [:div {:style {"marginTop" "20px"}}
     (if loading-lessons
       (c/loading-header "lessons")
       [:div 
        [:h2 "Start a Session"]
        [:p "Here are the lessons."]
        (if (empty? lessons)
          [:span "No lessons."]
          (t/table2 lessons [[:property :user "User"]
                             [:property :name "Name"]
                             [:action :start "Start" create-session! [state :id :name]]]))])
     (if loading-sessions
       (c/loading-header "sessions")
       [:div 
        [:h2 "Active Sessions"]
        (if (empty? active-sessions)
          [:span "No active sessions."]
          (t/table2 active-sessions [[:property :id "ID"]
                                     [:property :name "Lesson"]
                                     [:property (fn [{:keys [correct total]}]
                                                  (str correct " of " total)) "Progress"]
                                     [:property :length "Length"]
                                     [:action :continue "Continue" session! state]]))])]))

(defn render-history
  [state]
  (let [{:keys [type-id types loading-history completed-sessions]} @state ]
    [:div {:style {"marginTop" "20px"}}
     [:h2 "Completed Sessions"]
     (if loading-history
       (c/loading-header "sessions") 
       (if (empty? completed-sessions)
         [:span "No completed sessions."]
         (t/table2 completed-sessions [[:property :id "ID"]
                                       [:property :name "Lesson"]
                                       [:property (fn [{:keys [correct total]}]
                                                    (str correct " of " total)) "Score"]
                                        [:property :length "Length"]])))]))

(defn render-entity [state] [:div])

(defn render-home
  [state]
  [:div
   [:h3 "What?"]
   [:p "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan erat at risus mattis euismod. Morbi at egestas quam. Quisque posuere non arcu tempus vulputate. Nulla sed eleifend urna, eu tempor justo. Fusce et turpis sed massa imperdiet gravida. Vivamus nec placerat arcu. Etiam pharetra a est nec rhoncus. Praesent gravida lorem ut sem ullamcorper venenatis. Duis pulvinar nunc sit amet consequat euismod. Quisque id consequat mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec eget dictum nunc. Donec tempus sodales nunc, commodo hendrerit nibh tincidunt ac. Aliquam pulvinar in leo et mattis. Proin lacus lectus, tempor et scelerisque sit amet, posuere sed purus. "]])

(defn app
  [api-url username type-id]
;;  (println "Initializing... " {:api-url api-url :username username :type-id type-id})
  (let [state (r/atom {:user username
                       :repo (HttpEntityRepo. api-url username "friend")
                       :mode :sessions
                       :initial-loading true
                       :type-id (keyword (str type-id))
                       :modes {:sessions {:title "Flashcards"
                                          :label "Flashcards"
                                          :on-load load-sessions!
                                          :render render-sessions}
                               :history {:title "History"
                                         :label "History"
                                         :on-load load-history!
                                         :render render-history}

                               }
                       
                       })]
    (load-sessions! state)
    (fn []
;;      (println "Rendering mode" (:mode @state) "...")
      (p/page2 state "Flashcards"))))

;; (def info (partial println "[Flash]"))

(defn ^:export start [api-url username type-id]
;;  (info "Starting app...")
  (r/render [(partial app api-url username type-id)] (js/document.getElementById "page-wrapper")))

(defn ^:export reload []
;;  (info "Reloading app...")
  (r/render [(partial app "http://localhost:8080/api/" "mike" 1)] (js/document.getElementById "page-wrapper")))
