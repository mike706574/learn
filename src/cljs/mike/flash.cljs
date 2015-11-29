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

(def repo (atom nil))

(defn create-session!
  [state lesson-id]
  (s/batch! state [[s/Channel :session api/create-session! [@repo :type-id lesson-id]]
                   [s/Channel :lesson api/get-lesson [@repo :type-id [:session :lesson-id]]]
                   [s/Channel :entity api/get-entity [@repo :type-id [:session :entity-id]]]
                   [s/Value :mode :session]]))

(defn answer-question!
  [state correct?]
  (s/loading! state :something)
  (go
    (let [{:keys [type-id session]} @state
          {:keys [id entity-id]} session
          {:keys [status body message]} (<! (api/record-answer! @repo type-id id entity-id :ok correct?))] 
      (if (s/ok? status)
        (s/done! state :session body)
        (s/error! state message)))))

(defn load-types!
  [state]
  (s/batch! state [[s/Channel :types api/get-types [@repo]]
                   [s/Assert "No types! Go add some!" #(m/not-empty? %) [:types]]
                   [s/Function :type-id #(key (first %)) [:types]]
                   [s/Function :type #(%1 %2) [:type-id :types]]
                   [s/Channel :sessions api/get-sessions [@repo :type-id]]
                   [s/Channel :lessons api/get-lessons [@repo :type-id]]
                   [s/Function :with-lesson-names (fn [sessions lessons]
                                                    (map
                                                     (fn [session]
                                                       (assoc
                                                        session
                                                        :lesson-name
                                                        (:name (get lessons (:lesson-id session)))))
                                                     sessions))
                    [:sessions :lessons]]
                   [s/Print]
                   [s/Function :grouped-sessions #(group-by :done %) [:with-lesson-names]]
                   [s/Function :active-sessions #(get % false) [:grouped-sessions :lessons]]
                   [s/Function :completed-sessions #(get % true) [:grouped-sessions]]
]))

(defn render-session
  [state]
  (let [{:keys [type-id lesson loading-session? loading-lesson? loading-type? session entity attribute]} @state]
    (let [{:keys [name length entities]} lesson
          {:keys [id correct total done entity-id]} session]
      [:div {:style {"marginTop" "20px"}}
       [:input.btn.btn-default {:type "button"
                                :value "Back to Sessions"
                                :on-click #(assoc state :mode :sessions)}]
       [:p "Session ID: " id]
       [:h3 "Lesson: " name]
       [:p correct " correct out of " total] 
       (if done
         [:div
          [:p "DONE"]]
         [:div
          [:p "Playing to " length] 
          [:p "Entity ID:" entity-id]

          [:input.btn.btn-default {:type "button"
                                   :value "Correct"
                                   :on-click (fn [] (answer-question! state true))}]
          [:input.btn.btn-default {:type "button"
                                   :value "Wrong"
                                   :on-click (fn [] (answer-question! state false))}]])
       [:input.btn.btn-default {:type "button"
                                :value "Back to Sessions"
                                :on-click #(assoc state :mode :sessions)}]])))

(defn session!
  [state id]
  (s/batch! state [[s/SpawnMode id name name render-session {:flag :loading-session
                                                             :secondary "Session"}]
                   [s/Channel :session api/get-session [@repo :type-id id]]
                   [s/Channel :lesson api/get-lesson [@repo :type-id [:session :lesson-id]]]
                   [s/Channel :entity api/get-entity [@repo :type-id [:session :entity-id]]] 
                   [s/Value :loading-session false]]))
                           
(defn render-sessions
  [state]
  (let [{:keys [type-id types loading-sessions active-sessions
                completed-sessions loading-lessons lessons]} @state 
        type-options (m/fmap :label types)]
    (println active-sessions)
    [:div {:style {"marginTop" "20px"}}
     [:h4 "HELLO"]
     (if loading-lessons
       [:p "Loading lessons..."]
       [:div 
        [:h2 "Start a Session"]
        (if (empty? lessons)
          [:span "No lessons."]
          (t/table2 lessons [[:property :id "ID"]
                             [:property :user "User"]
                             [:property :name "Name"] 
                             [:property :description "Description"]
                             [:action :start "Start" create-session! [state :id]]]))])
     (if loading-sessions
       [:p "Loading sessions..."]
       [:div 
        [:h2 "Active Sessions"]
        (if (empty? active-sessions)
          [:span "No active sessions."]
          (t/table2 active-sessions [[:property :id "ID"]
                                     [:property :lesson-name "Lesson"]
                                     [:property :correct "Correct"]
                                     [:property :total "Total"]
                                     [:action :continue "Continue" session! [state :id]]]))
        [:h2 "Completed Sessions"]
        (if (empty? completed-sessions)
          [:span "No completed sessions."]
          (t/table2 completed-sessions [[:property :id "ID"]
                                        [:property :lesson-name "Lesson"]
                                        [:property :correct "Correct"]
                                        [:property :total "Total"]]))])

     ]))

(defn render-entity [state] [:div])

(defn render-home
  [state]
  [:div
   [:h3 "What?"]
   [:p "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan erat at risus mattis euismod. Morbi at egestas quam. Quisque posuere non arcu tempus vulputate. Nulla sed eleifend urna, eu tempor justo. Fusce et turpis sed massa imperdiet gravida. Vivamus nec placerat arcu. Etiam pharetra a est nec rhoncus. Praesent gravida lorem ut sem ullamcorper venenatis. Duis pulvinar nunc sit amet consequat euismod. Quisque id consequat mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec eget dictum nunc. Donec tempus sodales nunc, commodo hendrerit nibh tincidunt ac. Aliquam pulvinar in leo et mattis. Proin lacus lectus, tempor et scelerisque sit amet, posuere sed purus. "]])

(defn app
  [api-url username reload]
  (println "Initializing... " (str "{:api-url " api-url " :username" username "}"))
  (reset! repo (HttpEntityRepo. api-url username "friend")) 
  (let [state (r/atom {:user username
                       :mode :home
                       :modes {:home {:title "Flashcards"
                                      :label "Flashcards"
                                      :render render-home}
                               :sessions {:title "Sessions?"
                                          :label "Sessions?"
                                          :render render-sessions}
                               :session {:title "Session?"
                                         :label "Session?"
                                         :render render-session}
                               :entity {:title "Entity?"
                                        :label "Entity?"
                                        :render render-entity}}})]
    (load-types! state)
    (fn []
      (println "Rendering mode" (:mode @state) "...")
      (p/page2 state "Flashcards" reload))))

(defn ^:export reload []
  (println "Reloading app...")
  (r/render [(partial app "http://localhost:8080/api/" "mike" nil)] (js/document.getElementById "page-wrapper")))

(defn ^:export start [api-url username]
  (println "Starting app...")
  (r/render [(partial app api-url username reload)] (js/document.getElementById "page-wrapper")))
