(ns mike.common.state)

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
