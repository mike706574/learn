(defproject mike "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :dependencies [[org.clojure/clojure "1.7.0-RC1"]
                 [org.clojure/core.async "0.1.346.0-17112a-alpha"]
                 [org.clojure/tools.logging "0.3.1"]
                 [org.clojure/data.json "0.2.6"]
                 ;; db
                 [mysql/mysql-connector-java "5.1.35"]
                 [org.clojure/java.jdbc "0.3.7"]
                 ;; ws
                 [ring "1.4.0-RC1"]
                 [ring-server "0.4.0"]
                 [ring/ring-json "0.3.1"]
                 [ring/ring-defaults "0.1.5"]
                 [compojure "1.3.4"]
                 [hiccup "1.0.5"]
                 ;; cljs
                 [cljs-http "0.1.34"]
                 [org.clojure/clojurescript "0.0-3308"]
                 [reagent "0.5.0"]
                 [reagent-forms "0.5.1"]
                 [org.clojars.pet/lang "0.0.2-SNAPSHOT"]]
  :plugins [[lein-ring "0.8.12"]
            [lein-cljsbuild "1.0.6"]
            [lein-beanstalk "0.2.7"]]
  :ring {:handler mike.handler/app
         :init mike.handler/init
         :destroy mike.handler/destroy}
  :source-paths ["src/clj" "src/cljc"]
  :profiles {:uberjar {:aot :all}
             :production {:ring {:open-browser? false, :stacktraces? false, :auto-reload? false}}
             :dev {:dependencies [[ring-mock "0.1.5"] [ring/ring-devel "1.3.1"]]}}
  :cljsbuild {:builds {:browse-dev {:source-paths ["src/cljc" "src/cljs/mike/common" "src/cljs/mike/browse"]
                                    :compiler {:optimizations :none
                                               :output-to "resources/public/js/browse.js"
                                               :output-dir "resources/public/js/browse"
                                               :asset-path "js/out"
                                               :pretty-print true
                                               :source-map true}}
                       :browse-prod {:source-paths ["src/cljc" "src/cljs/mike/common" "src/cljs/mike/browse"]
                                     :compiler {:output-to "resources/public/js/browse.js"
                                                :optimizations :advanced
                                                :pretty-print false
                                                :output-wrapper false
                                                :closure-warnings {:non-standard-jsdoc :off}}}
                       
                       :flash-dev {:source-paths ["src/cljc" "src/cljs" "src/cljs/mike/flash" ]
                                   :compiler {:optimizations :none
                                              :output-to "resources/public/js/flash.js"
                                              :output-dir "resources/public/js/flash"
                                              :asset-path "js/out"
                                              :pretty-print true
                                              :source-map true}}
                       :flash-prod {:source-paths ["src/cljc" "src/cljs/mike/common" "src/cljs/mike/flash"]
                                    :compiler {:output-to "resources/public/js/flash.js"
                                               :optimizations :advanced
                                               :pretty-print false
                                               :output-wrapper false
                                               :closure-warnings {:non-standard-jsdoc :off}}}}})
