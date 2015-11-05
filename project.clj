(defproject mike "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :dependencies [[org.clojure/clojure "1.7.0"]
                 [org.clojure/core.async "0.1.346.0-17112a-alpha"]
                 [org.clojure/tools.logging "0.3.1"]
                 [org.clojure/data.json "0.2.6"]
                 ;; db
                 [mysql/mysql-connector-java "5.1.35"]
                 [org.clojure/java.jdbc "0.3.7"]
                 ;; ws
                 [ring "1.4.0"]
                 [ring-server "0.4.0"]
                 [ring/ring-json "0.4.0"]
                 [ring/ring-defaults "0.1.5"]
                 [ring-middleware-accept "2.0.3"]
                 [compojure "1.3.4"]
                 [hiccup "1.0.5"]
                 [clj-http "1.1.2"]
                 [com.cemerick/url "0.1.1"]
                 [prismatic/schema "1.0.3"]
                 ;; cljs
                 [cljs-http "0.1.37"]
                 [org.clojure/clojurescript "1.7.145"]
                 [reagent "0.5.0"]
                 [reagent-forms "0.5.1"]
                 [org.clojars.frozenlock/reagent-modals "0.2.3"]]
  :plugins [[lein-ring "0.8.12"]
            [lein-cljsbuild "1.0.6"]
            [lein-beanstalk "0.2.7"]]
  :ring {:handler mike.handler/app
         :init mike.handler/init
         :destroy mike.handler/destroy}
  :source-paths ["src/clj" "src/cljc"]
  :profiles {:uberjar {:aot :all}
             :production {:ring {:open-browser? false :stacktraces? false :auto-reload? false}}
             :dev {:dependencies [[ring-mock "0.1.5"] [ring/ring-devel "1.3.1"]]}}
  :cljsbuild {:builds {:browse-dev {:source-paths ["src/clj" "src/cljs/mike/common" "src/cljs/mike/browse"]
                                    :compiler {:optimizations :none
                                               :output-to "resources/public/js/browse.js"
                                               :output-dir "resources/public/js/browse"
                                               :asset-path "js/out"
                                               :pretty-print true
                                               :source-map true}}
                       :browse-prod {:source-paths ["src/clj" "src/cljs/mike/common" "src/cljs/mike/browse"]
                                     :compiler {:output-to "resources/public/js/browse.js"
                                                :optimizations :advanced
                                                :pretty-print false
                                                :output-wrapper false
                                                :closure-warnings {:non-standard-jsdoc :off}}}
                       
                       :flash-dev {:source-paths ["src/clj" "src/cljs/mike/common" "src/cljs/mike/flash"]
                                   :compiler {:optimizations :none
                                              :output-to "resources/public/js/flash.js"
                                              :output-dir "resources/public/js/flash"
                                              :asset-path "js/out"
                                              :pretty-print true
                                              :source-map true}}
                       :flash-prod {:source-paths ["src/cljs/mike/common" "src/cljs/mike/flash"]
                                    :compiler {:output-to "resources/public/js/flash.js"
                                               :optimizations :advanced
                                               :pretty-print false
                                               :output-wrapper false
                                               :closure-warnings {:non-standard-jsdoc :off}}}
                       :exp-dev {:source-paths ["src/clj" "src/cljs/mike/common" "src/cljs/mike/exp"]
                                 :compiler {:optimizations :none
                                            :output-to "resources/public/js/exp.js"
                                            :output-dir "resources/public/js/exp"
                                            :asset-path "js/out"
                                            :pretty-print true
                                            :source-map true}}
                       :ferret-dev {:source-paths ["src/clj" "src/cljs/mike/common" "src/cljs/mike/ferret"]
                                    :compiler {:optimizations :none
                                               :output-to "resources/public/js/ferret.js"
                                               :output-dir "resources/public/js/ferret"
                                               :asset-path "js/out"
                                               :pretty-print true
                                               :source-map true}}
                       :whale-dev {:source-paths ["src/clj" "src/cljs/mike/common" "src/cljs/mike/whale"]
                                   :compiler {:optimizations :none
                                              :output-to "resources/public/js/whale.js"
                                              :output-dir "resources/public/js/whale"
                                              :asset-path "js/out"
                                              :pretty-print true
                                              :source-map true}}

                       :types-dev {:source-paths ["src/clj" "src/cljs/mike/common" "src/cljs/mike/types"]
                                   :compiler {:optimizations :none
                                              :output-to "resources/public/js/types.js"
                                              :output-dir "resources/public/js/types"
                                              :asset-path "js/out"
                                              :pretty-print true
                                              :source-map true}}

                       :type-dev {:source-paths ["src/clj" "src/cljs/mike/common" "src/cljs/mike/type"]
                                  :compiler {:optimizations :none
                                             :output-to "resources/public/js/type.js"
                                             :output-dir "resources/public/js/type"
                                             :asset-path "js/out"
                                             :pretty-print true
                                             :source-map true}}

                       :lesson-dev {:source-paths ["src/clj" "src/cljs/mike/common" "src/cljs/mike/lesson"]
                                    :compiler {:optimizations :none
                                               :output-to "resources/public/js/lesson.js"
                                               :output-dir "resources/public/js/lesson"
                                               :asset-path "js/out"
                                               :pretty-print true
                                               :source-map true}}
                       :lesson-prod {:source-paths ["src/clj" "src/cljs/mike/common" "src/cljs/mike/lesson"]
                                     :compiler {:output-to "resources/public/js/lesson.js"
                                                :optimizations :advanced
                                                :pretty-print false
                                                :output-wrapper false
                                                :closure-warnings {:non-standard-jsdoc :off}}}
                       }
              }
  )
