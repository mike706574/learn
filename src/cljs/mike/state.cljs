(ns mike.state
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [cljs.core.async :refer [<!]]
            [mike.misc :as m]))

;; generic
(defn always [v] (fn [& args] v))

(defn ok? [status] (= (keyword status) :ok))
(def bad? (comp not ok?))

(defn loading!
  [state target]
  (swap! state (comp #(merge % {:error false
                                :loading true
                                :loading-target target})
                     #(dissoc % :message))))

(defn commit!
  [state & params]
  (apply (partial swap! state assoc) params))

(defn merge!
  [state & maps]
  (apply (partial swap! state merge) maps))

(defn done!
  [state & params]
  (apply (partial swap! state assoc :loading false :error false) params))

(defn error!
  [state message]
  (swap! state assoc :loading false :error true :message message))

(defn fatal!
  [state body]
  (swap! state assoc :loading false :mode :fatal :body body))

(defn swap-in!
  [state ks f & args]
  (swap! state update-in ks #(apply f (conj args %))))

(defn set-in!
  [state ks v]
  (swap! state update-in ks (always v)))

(defn mode!
  [state mode]
  ;; TODO: do i want to do this ALWAYS?
  (swap! state assoc :mode mode :error false :body nil))

(defn loading-keyword [k] (keyword (str "loading-" (name k) "?")))
(defn loading-map [loading? ks] (zipmap (map loading-keyword ks) (repeat loading?)))

(def start-loading (partial loading-map true))
(def done-loading (partial loading-map false))

(defn resolve-arg
  [state arg]
  (cond (keyword? arg) (get state arg)
        (vector? arg) (get-in state arg)
        :else arg))

(defn load!
  [state k f args]
  (loading! state (name k))
  (go (let [args (map #(resolve-arg state %) args)
            {:keys [status body message]} (<! (apply f args))]
        (if (ok? status)
          (done! state k body)
          (error! state message)))))

(defn snickerdoodle?
  [call]
  (let [thing (second call)]
    (or (keyword? thing)
        (map? thing)
        (not (ifn? thing)))))

;; deprecated
(defn one!
  [state k f template]
  (loading! state (name k))
  (go
    (let [current-state @state
          args (map #(resolve-arg current-state %) template)
          {:keys [status body message]} (<! (apply f args))]
      (if (ok? status)
        (if (nil? k)
          (done! state)
          (done! state k body))
        (error! state message)))))

(defn single!
  [state k f template]
  (go
    (let [current-state @state
          args (map #(resolve-arg current-state %) template)
          {:keys [status body message]} (<! (apply f args))]
      (if (ok? status)
        (when (m/not-nil? k)
          (swap! state assoc k body))
        (error! state message)))))

;; deprecated
(defn in-order!
  [state calls]
  (loading! state "stuff")
  (go (loop [remaining-calls calls
             updated @state
             changes {}]
        (if (empty? remaining-calls)
          (swap! state merge (assoc changes :loading false :error false))
          (let [call (first remaining-calls)
                k (first call)
                ;; TODO: kind of hacky here refactor it
                {:keys [status body message]} (if (snickerdoodle? call)
                                                {:status :ok :body (second call)}
                                                (let [f (second call)
                                                      template (m/third call) 
                                                      args (map #(resolve-arg updated %) template)
                                                      has-4? (= 4 (count call))]
                                                  (if (and has-4? (= :no-channel (nth call 3))) 
                                                    {:status :ok :body (apply f args)}
                                                    (<! (apply f args)))))]
            (if (ok? status)
              (if (nil? k)
                (recur (rest remaining-calls) updated changes)
                (recur (rest remaining-calls) (assoc updated k body) (assoc changes k body)))
              (error! state message)))))))

(def Function :function)
(def Channel :channel)
(def Value :value)
(def Merge :merge)
(def Assert :assert)
(def SetMode :set-mode)
(def SpawnMode :spawn-mode)
(def CreateMode :create-mode)
(def RemoveMode :delete-mode)
(def Loading :loading)
(def Print :print)

(defn batch!
  [state calls]
  (go
    (loop [remaining-calls calls
           updated @state
           changes {}]
      (if (empty? remaining-calls)
        (swap! state merge changes)
        (let [call (first remaining-calls)
              type (first call)
              params (rest call)
              remaining-calls (rest remaining-calls)]
          (case type
            :value (let [[k v] params]
                     (recur remaining-calls (assoc updated k v) (assoc changes k v)))

            :print (do (println "STATE:" updated)
                       (recur remaining-calls updated changes))

            :function (let [[k f template] params
                            args (map #(resolve-arg updated %) template)
                            v (apply f args)]
                        (if (nil? k)
                          (recur remaining-calls updated changes)
                          (recur remaining-calls (assoc updated k v) (assoc changes k v))))

            ;; todo: think about this
            :assert (let [[message f template] params
                          args (map #(resolve-arg updated %) template)]
                      (if (apply f args)
                        (recur remaining-calls updated changes)
                        (swap! state assoc :mode :fatal :message message)))

            :channel (let [[k f template] params
                           args (map #(resolve-arg updated %) template)
                           {:keys [status body]} (<! (apply f args))]
                       (if (ok? status)
                         (if (nil? k)
                           (recur remaining-calls updated changes)
                           (recur remaining-calls (assoc updated k body) (assoc changes k body))) 
                         (do (println "Failed to set key:" k)
                             (println "Status:" status)
                             (println "Body:" body)
                             (swap! state assoc :error true :body body))))

            :set-mode (let [mode (first params)]
                        (recur remaining-calls
                               (assoc updated :mode mode :message nil)
                               (assoc changes :mode mode :message nil)))
            
            :create-mode (let [[k title render] params
                               updated-modes (assoc (:modes updated) k {:title title :render render})] 
                           (recur remaining-calls
                                  (assoc updated :modes updated-modes)
                                  (assoc changes :modes updated-modes)))

            :spawn-mode (let [[k title label render options] params
                              {:keys [secondary flag]} options
                               updated-modes (assoc (:modes updated) k {:title title
                                                                        :label label
                                                                        :render render
                                                                        :secondary secondary})
                               dx {:modes updated-modes :mode k}
                               dy (if flag (assoc dx flag true) dx)
                               changes (merge changes dy)]
                          (swap! state merge changes)
                          (recur remaining-calls (merge updated dy) changes))

            :remove-mode (let [[k] params
                               updated-modes (dissoc (:modes updated) k)] 
                           (recur remaining-calls
                                  (assoc updated :modes updated-modes)
                                  (assoc changes :modes updated-modes)))
            
            :merge (let [m (first params)]
                     (recur remaining-calls (merge updated m) (merge changes m)))

            ;; :commit (do (swap! state merge changes)
            ;;             (recur remaining-calls updated changes))
            
            ;; :loading (let [updated (assoc updated :loading true)
            ;;                changes (assoc changes :loading true)]
            ;;            (swap! state merge changes)
            ;;            (recur remaining-calls updated changes))
            ))))))
