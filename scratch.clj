;; EXPERIMENT

;; (defn load-type!
;;   [state]
;;   (commit! state :loading-type? true)
;;   (loading! state)
;;   (go
;;     (let [type-id (:type-id @state)
;;           {:keys [status body message]} (<! (api/get-type repo type-id))]
;;       (if (joe/ok? status)
;;         (done! state :type :body :loading-type? false)
;;         (error! state message)))))

;; (defn load-session!
;;   [state session-id]
;;   (commit! state :loading-session? true)
;;   (go
;;     (let [type-id (:type-id @state)
;;           {:keys [status body message]} (<! (api/get-session repo type-id session-id))]
;;       (if (joe/ok? status)
;;         (commit! state :session body :loading-session? false)
;;         (error! state message)))))

;; (defn load-lessons!
;;   [state]
;;   (commit! state :loading-lessons? true)
;;   (go
;;     (let [{:keys [type-id]} @state
;;           {:keys [status body message]} (<! (api/get-lessons repo type-id))] 
;;       (if (joe/ok? status)
;;         (commit! state :loading-lessons? false :lessons body)
;;         (error! state message)))))

;; (defn continue!
;;   [state session]
;;   (go (let [{:keys [id lesson-id]} session
;;             thing (<! (async/merge
;;                        [(api/get-session repo type-id session-id)
;;                         (api/get-lesson repo type-id)]))

            
;;             ]
;;         (println (<! c4)) 
;;         (println "HI"))))

;; END EXPERIMENT



;; (defn load-lesson!
;;   [state lesson-id]
;;   (commit! state :loading-lesson? true)
;;   (go
;;     (loading-these! state lesson-keys)
;;     (let [{:keys [type-id]} @state
;;           results (<! (async/merge
;;                        (api/get-lesson repo type-id lesson-id)
;;                        (api/get-lesson-entities repo type-id lesson-id)))]
;;       (if (all-ok? results)
;;         (merge! state (done-loading lesson-keys) (bodies lesson-keys results))
;;         (merge! state (done-loading lesson-keys) :mode :fatal :message "Failed to load lesson)")
      
;;       (if (joe/ok? status)
;;         (commit! state :loading-lesson? false :lesson body)
;;         (error! state message)))))) 

            ;; thing (<! (async/merge
            ;;            [(api/get-session repo type-id session-id)
            ;;             (api/get-lesson repo type-id)]))


(defn all-ok?
  [results]
  (every? #(= :ok (:status %)) results))


(def lesson-keys [:lesson :entities])
(defn bodies [ks results] (zipmap ks (map :body results)))


;; (defn continue!
;;   [state session]
;;   (go (let [{:keys [id lesson-id]} session
;;             thing (<! (async/merge
;;                        [(api/get-session repo type-id session-id)
;;                         (api/get-lesson repo type-id)]))

            
;;             ]
;;         (println (<! c4)) 
;;         (println "HI"))))


(defn all-ok?
  [results]
  (every? #(= :ok (:status %)) results))


(def lesson-keys [:lesson :entities])
(defn bodies [ks results] (zipmap ks (map :body results)))
