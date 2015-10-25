(ns mike.component)

(def base "http://localhost:8080/")

(defn link
  [resource]
  [:a {:href (str base resource)} resource])

(defn inline-item
  [body]
  [:li {:style {"display" "inline"}}] body)

(def nav 
  [:ul {:class "nav"}
   [:li (link "add")]
   [:li (link "browse")]
   [:li (link "lesson")]
   [:li (link "types")]
])
