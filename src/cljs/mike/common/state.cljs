(ns mike.common.state)

(defn loading! [state] (swap! state assoc :loading true))

(defn commit!
  [state & params]
  (apply (partial swap! state assoc) params))

(defn done!
  [state & params]
  (apply (partial swap! state assoc :loading false :error false) params))

(defn error!
  [state message]
  (swap! state assoc :loading false :error true :message message))

(defn swap-in!
  [state ks f & args]
  (println ks)
  (println args)
  (swap! state update-in ks #(apply f (conj args %))))
