(defproject mike "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :dependencies [[org.clojure/clojure "1.7.0-RC1"]
                 [org.clojure/core.async "0.1.346.0-17112a-alpha"]
                 [com.cognitect/transit-clj "0.8.275"]
                 ;; db
                 [mysql/mysql-connector-java "5.1.35"]
                 [org.clojure/java.jdbc "0.3.7"]
                 ;; ws
                 [ring "1.4.0-RC1"]
                 [ring/ring-json "0.3.1"]
                 [compojure "1.1.6"]
                 [hiccup "1.0.5"]
                 ;; cljs
                 [org.clojure/clojurescript "0.0-3308"]
                 [com.cognitect/transit-cljs "0.8.220"]
                 [cljs-http "0.1.34"]
                 [reagent "0.5.0"]]
  :plugins [[lein-ring "0.8.12"]
            [lein-cljsbuild "1.0.6"]
            [lein-beanstalk "0.2.7"]]
  :ring {:handler mike.handler/app
         :init mike.handler/init
         :destroy mike.handler/destroy}
  :source-paths ["src/clj"]
  :profiles {:uberjar {:aot :all}
             :production {:ring {:open-browser? false, :stacktraces? false, :auto-reload? false}}
             :dev {:dependencies [[ring-mock "0.1.5"] [ring/ring-devel "1.3.1"]]}}
  :cljsbuild {:builds {:dev {:source-paths ["src/cljs"]
                             :compiler {:optimizations :none
                                        :output-to "resources/public/js/app.js"
                                        :output-dir "resources/public/js/"
                                        :pretty-print true
                                        :source-map true}}
                       :prod {:source-paths ["src/cljs"]
                              :compiler {:output-to "resources/public/js/app.js"
                                         :optimizations :advanced
                                         :pretty-print false
                                         :output-wrapper false
                                         :closure-warnings {:non-standard-jsdoc :off}}}}})
