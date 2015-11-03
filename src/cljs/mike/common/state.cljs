(ns mike.common.state
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [cljs.core.async :refer [<!]]
            [mike.common.misc :as misc]))

(defn loading! [state] (swap! state assoc :loading true))

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
  (loading! state)
  (go (let [args (map #(resolve-arg state %) args)
            {:keys [status body message]} (<! (apply f args))]
        (if (misc/ok? status)
          (done! state k body)
          (error! state message)))))

(defn snickerdoodle?
  [call]
  (let [thing (second call)]
    (println "THING:" thing)
    (println (type thing)) 
    (println (str (type thing)) )
    (println (ifn? thing))
    (or (keyword? thing)
        (map? thing)
        (not (ifn? thing))


        )))

(defn in-order!
  [state calls]
  (loading! state)
  (go (loop [remaining-calls calls
             updated @state
             changes {}]
        (if (empty? remaining-calls)
          (swap! state merge (assoc changes :loading false :error false))
          (let [call (first remaining-calls)
                k (first call)
                ;; TODO: kind of hacky here
                {:keys [status body message]} (if (snickerdoodle? call)
                                                {:status :ok :body (second call)}
                                                (let [f (second call)
                                                      template (misc/third call) 
                                                      args (map #(resolve-arg updated %) template)]
                                                  (<! (apply f args))))]
            (if (misc/ok? status)
              (recur (rest remaining-calls) (assoc updated k body) (assoc changes k body))
              (error! state message)))))))
