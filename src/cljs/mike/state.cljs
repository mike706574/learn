(ns mike.state
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [cljs.core.async :refer [<!]]
            [mike.misc :as m]))

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
  [state message]
  (swap! state assoc :loading false :mode :fatal :message message))

(defn swap-in!
  [state ks f & args]
  (swap! state update-in ks #(apply f (conj args %))))

(defn mode!
  [state mode]
  (swap! state :mode mode))

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
        (if (m/ok? status)
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
      (if (m/ok? status)
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
      (if (m/ok? status)
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
            (if (m/ok? status)
              (if (nil? k)
                (recur (rest remaining-calls) updated changes)
                (recur (rest remaining-calls) (assoc updated k body) (assoc changes k body)))
              (error! state message)))))))

(def Function :function)
(def Channel :channel)
(def Value :value)
(def Merge :merge)

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
              params (rest call)]
          (case type
            :value (let [[k v] params]
                     (recur (rest remaining-calls) (assoc updated k v) (assoc changes k v)))

            :function (let [[k f template] params
                            args (map #(resolve-arg updated %) template)
                            v (apply f args)]
                        (if (nil? k)
                          (recur (rest remaining-calls) updated changes)
                          (recur (rest remaining-calls) (assoc updated k v) (assoc changes k v))))

            :channel (let [[k f template] params
                           args (map #(resolve-arg updated %) template)
                           {:keys [status body message]} (<! (apply f args))]
                       (if (m/ok? status)
                         (if (nil? k)
                           (recur (rest remaining-calls) updated changes)
                           (recur (rest remaining-calls) (assoc updated k body) (assoc changes k body)))
                         (error! state message)))
            
            :merge (let [m (first params)]
                     (recur (rest remaining-calls) (merge updated m) (merge changes m)))
            ))))))
