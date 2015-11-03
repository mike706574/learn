(ns mike.entity.jdbc-test
  (:require [mike.entity.api :as api]
            [mike.entity.jdbc :refer [create! destroy! create-user!] :as jdbc]
            [mike.dynamite :as dynamite]
            [clojure.core.async :refer [<!!]]
            [clojure.test :refer :all]
            [clojure.java.io :as io]
            [clojure.edn :as edn])
  (:import [mike.entity.jdbc JdbcEntityRepo]))

;; (clojure.test/test-vars [#'mike.entity.jdbc-test/lessons])

;; TODO: find me a real home
(defn fmap
  [f m]
  (into (empty m) (for [[k v] m] [k (f v)])))

(def config {:subprotocol "mysql"
             :subname "//localhost:3306/entity_test"
             :user "entity"
             :password "entity"})

(def repo (JdbcEntityRepo. config "mike"))

(def dconfig {:subprotocol "mysql"
             :subname "//localhost:3306/entity_dev"
             :user "entity"
             :password "entity"})

(def drepo (JdbcEntityRepo. dconfig "mike"))

(def en-it-type
  {:id :en-it
   :label "English/Italian"
   :description "Bilingual sentence pairs: English and Italian"
   :attributes [{:id "english"
                 :label "English"
                 :schema :str
                 :description "The sentence in English"}
                {:id "italian"
                 :label "Italian"
                 :schema :str
                 :description "The sentence in Italian"}]})

(def en-sp-type
  {:id :en-sp
   :label "English/Spanish"
   :description "Bilingual sentence pairs: English and Spanish"
   :attributes [{:id "english"
                 :label "English"
                 :schema :str
                 :description "The sentence in English"}
                {:id "spanish"
                 :label "Spanish"
                 :schema :str
                 :description "The sentence in Spanish"}]})

(deftest types
  (testing "create, get, and delete a type"
    (create! config)

    (let [{:keys [status body]} (<!! (api/get-types repo))]
      (is (= :ok status))
      (is (= {} body)))

    (let [{:keys [status body]} (<!! (api/get-type repo :en-it))]
      (is (= :missing status)))

    (is (= {:status :ok} (<!! (api/create-type! repo en-it-type))))
    (let [{:keys [status body]} (<!! (api/get-type repo :en-it))]
      (is (= :ok status))
      (is (= "mike" (:user body)))
      (is (= en-it-type (dissoc body :user :created))))

    (is (= {:status :ok} (<!! (api/create-type! repo en-sp-type))))
    (let [{:keys [status body]} (<!! (api/get-type repo :en-sp))]
      (is (= :ok status))
      (is (= "mike" (:user body)))
      (is (= en-sp-type (dissoc body :user :created))))

    (let [{:keys [status body]} (<!! (api/get-type repo :en-it))]
      (is (= :ok status))
      (is (= "mike" (:user body)))
      (is (= en-it-type (dissoc body :user :created))))
    
    (let [{:keys [status body]} (<!! (api/get-types repo))]
      (is (= :ok status))
      (doseq [type body] (is (= "mike" (:user (val type)))))
      (is (= {:en-it en-it-type :en-sp en-sp-type} (fmap #(dissoc % :user :created) body))))

    (is (= {:status :ok} (<!! (api/delete-type! repo :en-sp)))) 
    (is (= {:status :ok} (<!! (api/delete-type! repo :en-it)))) 
    (destroy! config)))

(defn no-dates [body] (dissoc body :created :modified))
(defn no-meta [body] (dissoc body :created :modified :id))
(defn data-only [body] (dissoc body :user :created :modified :id))

(deftest entities
  (testing "create, get, update, and delete an entity"
    (let [id (atom nil)] 
      (create! config)
      (is (= {:status :ok} (<!! (api/create-type! repo en-it-type))))

      (is (= {:status :ok :body 0} (<!! (api/count-entities repo :en-it))))
      
      (let [{:keys [status body]} (<!! (api/add-entity! repo :en-it {:english "Hello!" :italian "Buongiorno!"}))]
        (is (= :ok status))
        (reset! id (:id body))
        (is (= {:english "Hello!" :italian "Buongiorno!" :user "mike"} (no-meta body))))

      (is (= {:status :ok :body 1} (<!! (api/count-entities repo :en-it))))
      
      (let [{:keys [status body]} (<!! (api/get-entity repo :en-it @id))]
        (is (= :ok status))
        (is (= @id (:id body)))
        (is (= {:english "Hello!" :italian "Buongiorno!" :user "mike"} (no-meta body))))
      
      (let [{:keys [status body]} (<!! (api/update-entity! repo :en-it @id {:italian "Ciao!"}))]
        (is (= :ok status))
        (is (= @id (:id body)))
        (is (= {:english "Hello!" :italian "Ciao!" :user "mike"} (no-meta body))))

      (let [{:keys [status body]} (<!! (api/get-entity repo :en-it @id))]
        (is (= :ok status))
        (is (= @id (:id body)))
        (is (= {:english "Hello!" :italian "Ciao!" :user "mike"} (no-meta body))))
      
      ;; TODO: consider having deletes return deleted entity?
      (is (= {:status :ok} (<!! (api/delete-entity! repo :en-it @id))))

      (is (= :empty (:status (<!! (api/get-entity repo :en-it @id)))))

      (is (= {:status :ok} (<!! (api/delete-type! repo :en-it))))
      (destroy! config))))

(def test-entities [{:english "one" :italian "uno"}
                    {:english "two" :italian "due"}
                    {:english "three" :italian "tre"}
                    {:english "four" :italian "quattro"}
                    {:english "five" :italian "cinque"}])

(deftest entity-range
  (testing "get entity range"
    (create! config)
    (is (= {:status :ok} (<!! (api/create-type! repo en-it-type))))

    (doseq [entity test-entities]
      (is (= :ok (:status (<!! (api/add-entity! repo :en-it entity))))))

    (let [{:keys [status body]} (<!! (api/get-entity-range repo :en-it 1 5))]
      (is (= :ok status))
      (is (= test-entities (map data-only body))))
    
    (is (= {:status :ok} (<!! (api/delete-type! repo :en-it))))
    (destroy! config)))

(deftest random-entity
  (testing "get random entity"
    (create! config)
    (is (= {:status :ok} (<!! (api/create-type! repo en-it-type))))

    (doseq [entity test-entities]
      (let [{:keys [status body]} (<!! (api/add-entity! repo :en-it entity))]
        (is (= :ok status))))

    (dotimes [n 10]
      (let [{:keys [status body]} (<!! (api/get-random-entity repo :en-it))]
        (is (= :ok status))
        (is (contains? (set test-entities) (data-only body)))))
    
    (is (= {:status :ok} (<!! (api/delete-type! repo :en-it))))
    (destroy! config)))

(deftest random-entities
  (testing "get random entities"
    (create! config)
    (is (= {:status :ok} (<!! (api/create-type! repo en-it-type))))

    (doseq [entity test-entities]
      (is (= :ok (:status (<!! (api/add-entity! repo :en-it entity))))))

    (dotimes [n 5]
      (let [{:keys [status body]} (<!! (api/get-random-entities repo :en-it (inc n)))]
        (is (= :ok status))
        (doseq [entity (map data-only body)]
          (is (contains? (set test-entities) entity)))))
    
    (is (= {:status :ok} (<!! (api/delete-type! repo :en-it))))
    (destroy! config)))

(deftest tags
  (testing "add, delete, and check tags"
    (create! config)
    (is (= {:status :ok} (<!! (api/create-type! repo en-it-type))))

    (is (= :ok (:status (<!! (api/add-entity! repo :en-it {:english "Hello!" :italian "Buongiorno!"})))))
    (is (= {:status :ok :body []} (<!! (api/get-entity-tags repo :en-it 1))))
    
    (is (= :ok (:status (<!! (api/tag-entity! repo :en-it 1 "Beginner")))))
    (is (= {:status :ok :body ["Beginner"]} (<!! (api/get-entity-tags repo :en-it 1))))

    (is (= :ok (:status (<!! (api/delete-tag! repo :en-it "Beginner")))))
    (is (= {:status :ok :body []} (<!! (api/get-entity-tags repo :en-it 1))))

    (is (= :ok (:status (<!! (api/tag-entity! repo :en-it 1 "Beginner")))))
    (is (= {:status :ok :body ["Beginner"]} (<!! (api/get-entity-tags repo :en-it 1))))

    (let [{:keys [status body]} (<!! (api/untag-entity! repo :en-it 1 "Beginner"))]
      (is (= :ok status))
      (is (= nil body))) 
    
    (is (= {:status :ok :body []} (<!! (api/get-entity-tags repo :en-it 1))))
    
    (is (= {:status :ok} (<!! (api/delete-type! repo :en-it))))
    (destroy! config)))

(deftest entities-for-user
  (testing "get all entities for user"
    (create! config)
    (is (= {:status :ok} (<!! (api/create-type! repo en-it-type))))

    (let [{:keys [status body]} (<!! (api/get-entities-for-user repo :en-it "mike"))]
      (is (= :ok status))
      (is (= [] body)))

    (doseq [entity test-entities]
      (let [{:keys [status body]} (<!! (api/add-entity! repo :en-it entity))]
        (is (= :ok status))))

    (let [{:keys [status body]} (<!! (api/get-entities-for-user repo :en-it "mike"))]
      (is (= :ok status))
      (is (= test-entities (map data-only body))))
        
    (is (= {:status :ok} (<!! (api/delete-type! repo :en-it))))
    (destroy! config))) 

(def untagged-entities
  [{:english "cat" :italian "gatto"}
   {:english "dog" :italian "cane"}
   {:english "whale" :italian "balena"}])

(deftest entities-with-tag
  (testing "get all entities with tag"
    (create! config)
    (is (= {:status :ok} (<!! (api/create-type! repo en-it-type))))

    (doseq [entity test-entities]
      (let [{:keys [status body]} (<!! (api/add-entity! repo :en-it entity))]
        (is (= :ok status))
        (is (= :ok (:status (<!! (api/tag-entity! repo :en-it (:id body) "Beginner")))))))

    (doseq [entity untagged-entities]
      (is (= :ok (:status (<!! (api/add-entity! repo :en-it entity))))))   

    (let [{:keys [status body]} (<!! (api/get-entities-with-tag repo :en-it "Beginner"))]
      (is (= :ok status))
      (is (= (set test-entities) (set (mapv data-only body))))) 

    (dotimes [n 10]
      (let [{:keys [status body] :as lol} (<!! (api/get-random-entity-with-tag repo :en-it "Beginner"))]
        (is (= :ok status))
        (is (contains? (set test-entities) (data-only body)))))

    (dotimes [n 5]
      (let [{:keys [status body]} (<!! (api/get-random-entities-with-tag repo :en-it "Beginner"(inc n)))] 
        (is (= :ok status))
        (doseq [entity (map data-only body)]
          (is (contains? (set test-entities) entity)))))
    
    (is (= {:status :ok} (<!! (api/delete-type! repo :en-it))))
    (destroy! config)))

(deftest tagged-entity-deletion
  (testing "delete a tagged entity"
    (create! config)
    (is (= {:status :ok} (<!! (api/create-type! repo en-it-type))))

    (is (= :ok (:status (<!! (api/add-entity! repo :en-it {:english "Hello!" :italian "Buongiorno!"})))))
    (is (= {:status :ok :body []} (<!! (api/get-entity-tags repo :en-it 1))))
    
    (is (= :ok (:status (<!! (api/tag-entity! repo :en-it 1 "Beginner")))))
    (is (= {:status :ok :body ["Beginner"]} (<!! (api/get-entity-tags repo :en-it 1))))

    (is (= {:status :ok} (<!! (api/delete-entity! repo :en-it 1))))    
    
    (is (= {:status :ok} (<!! (api/delete-type! repo :en-it))))
    (destroy! config)))

(deftest answers
  (testing "record answers"
    (create! config)
    (is (= {:status :ok} (<!! (api/create-type! repo en-it-type))))

    (is (= :ok (:status (<!! (api/add-entity! repo :en-it {:english "Hello!" :italian "Buongiorno!"})))))

    (let [{:keys [status body]} (<!! (api/get-stats repo :en-it 1))]
      (is (= :ok status))
      (is (= {:correct 0 :total 0} body)))

    (let [{:keys [status body]} (<!! (api/get-stats-for-user repo :en-it 1 "mike"))]
      (is (= :ok status))
      (is (= {:correct 0 :total 0} body)))

    (is (= :ok (:status (<!! (api/record-individual-answer! repo :en-it 1 true)))))

    (let [{:keys [status body]} (<!! (api/get-stats-for-user repo :en-it 1 "mike")) ]
      (is (= :ok status))
      (is (= {:correct 1 :total 1} body)))

    (let [{:keys [status body]} (<!! (api/get-stats repo :en-it 1)) ]
      (is (= :ok status))
      (is (= {:correct 1 :total 1} body))) 


    (is (= :ok (:status (<!! (api/record-individual-answer! repo :en-it 1 false)))))

    (let [{:keys [status body]} (<!! (api/get-stats-for-user repo :en-it 1 "mike")) ]
      (is (= :ok status))
      (is (= {:correct 1 :total 2} body)))

    (let [{:keys [status body]} (<!! (api/get-stats repo :en-it 1)) ]
      (is (= :ok status))
      (is (= {:correct 1 :total 2} body))) 

    (is (= :ok (:status (<!! (api/record-individual-answer! repo :en-it 1 false)))))

    (let [{:keys [status body]} (<!! (api/get-stats-for-user repo :en-it 1 "mike")) ]
      (is (= :ok status))
      (is (= {:correct 1 :total 3} body)))

    (let [{:keys [status body]} (<!! (api/get-stats repo :en-it 1)) ]
      (is (= :ok status))
      (is (= {:correct 1 :total 3} body))) 

    (is (= :ok (:status (<!! (api/record-individual-answer! repo :en-it 1 true)))))

    (let [{:keys [status body]} (<!! (api/get-stats-for-user repo :en-it 1 "mike")) ]
      (is (= :ok status))
      (is (= {:correct 2 :total 4} body)))

    (let [{:keys [status body]} (<!! (api/get-stats repo :en-it 1)) ]
      (is (= :ok status))
      (is (= {:correct 2 :total 4} body))) 
    
    (is (= {:status :ok} (<!! (api/delete-type! repo :en-it))))
    (destroy! config)))


(deftest lessons
  (testing "lessons? what?"
    (let [$entity-id (atom nil)
          $lesson-id (atom nil)
          $session-id (atom nil)
          entity {:english "Hello!" :italian "Buongiorno!"} ]
      (create! config)
      (is (= {:status :ok} (<!! (api/create-type! repo en-it-type))))
      
      (let [{:keys [status body]} (<!! (api/add-entity! repo :en-it entity))]
        (is (= :ok status))
        (reset! $entity-id (:id body)))

      (let [{:keys [status body]} (<!! (api/get-lessons repo :en-it))]
        (is (= :ok status))
        (is (= [] body)))
      
      (let [{:keys [status body exception]} (<!! (api/create-lesson! repo :en-it
                                                                     {:name "Beginner"
                                                                      :description "A beginner lesson"
                                                                      :length 3}))]
        (is (= :ok status))
        (let [{:keys [id name user description entities]} body]
          (is (= "mike" user))
          (is (= "Beginner" name))
          (is (= "A beginner lesson" description))
          (reset! $lesson-id (:id body))))

      (let [{:keys [status body]} (<!! (api/get-lessons repo :en-it))]
        (is (= :ok status))
        (is (= 1 (count body)))
        (let [{:keys [id name user description]} (first body)]
          (is (= @$lesson-id id))
          (is (= "Beginner" name))
          (is (= "mike" user))
          (is (= "A beginner lesson" description))))

      (let [{:keys [status body]} (<!! (api/get-lesson repo :en-it @$lesson-id))]
        (is (= :ok status))
        (let [{:keys [id name user description entities]} body]
          (is (= @$lesson-id id))
          (is (= "Beginner" name))
          (is (= "mike" user))
          (is (= "A beginner lesson" description))
          (is (= [] entities))))

      (let [{:keys [status body]} (<!! (api/get-lesson-info repo :en-it @$lesson-id))]
        (is (= :ok status))
        (let [{:keys [id name user description]} body]
          (is (= @$lesson-id id))
          (is (= "Beginner" name))
          (is (= "mike" user))
          (is (= "A beginner lesson" description))))

      (let [{:keys [status body]} (<!! (api/get-lesson-entities repo :en-it @$lesson-id))]
        (is (= :ok status))
        (is (= [] body)))

      (let [{:keys [status body]} (<!! (api/add-to-lesson! repo :en-it @$lesson-id @$entity-id))]
        (is (= :ok status)))

      (let [{:keys [status body]} (<!! (api/get-lesson repo :en-it @$lesson-id))]
        (is (= :ok status))
        (let [{:keys [id name user description entities]} body]
          (is (= @$lesson-id id))
          (is (= "Beginner" name))
          (is (= "mike" user))
          (is (= "A beginner lesson" description))
          (is (= [(data-only entity)] (map data-only entities)))))

      (let [{:keys [status body]} (<!! (api/get-lesson-info repo :en-it @$lesson-id))]
        (is (= :ok status))
        (let [{:keys [id name user description]} body]
          (is (= @$lesson-id id))
          (is (= "Beginner" name))
          (is (= "mike" user))
          (is (= "A beginner lesson" description))))

      (let [{:keys [status body]} (<!! (api/get-lesson-entities repo :en-it @$lesson-id))]
        (is (= :ok status))
        (is (= [(data-only entity)] (map data-only body))))
      
      (let [{:keys [status body]} (<!! (api/get-sessions repo :en-it))]
        (is (= :ok status))
        (is (= [] body)))

      (let [{:keys [status body exception]} (<!! (api/create-session! repo :en-it @$lesson-id))]
        (is (= :ok status))
        (let [{:keys [id user correct total done]} body]
          (is (= @$lesson-id id))
          (is (= "mike" user))
          (is (= 0 correct))
          (is (= 0 total))
          (is (not done))
          (reset! $session-id (:id body))))

      (let [{:keys [status body]} (<!! (api/get-session repo :en-it @$session-id))]
        (is (= :ok status))
        (let [{:keys [id lesson-id user correct total done]} body]
          (is (= @$session-id id))
          (is (= @$lesson-id lesson-id))
          (is (= "mike" user))
          (is (= 0 correct))
          (is (= 0 total))
          (is (not done))))

      (let [{:keys [status body]} (<!! (api/get-sessions repo :en-it))]
        (is (= :ok status))
        (is (= [{:id @$session-id
                 :user "mike"
                 :correct 0
                 :total 0
                 :length 3
                 :done false
                 :lesson-id @$lesson-id
                 :entity-id @$entity-id}]
               (mapv no-dates body))))

      (let [{:keys [status body exception]} (<!! (api/record-answer! repo :en-it @$session-id @$entity-id false))]
        (is (= :ok status))
        (let [{:keys [id lesson-id user correct total done]} body]
          (is (= @$session-id id))
          (is (= @$lesson-id lesson-id))
          (is (= "mike" user))
          (is (= 0 correct))
          (is (= 1 total))
          (is (not done))))

      (let [{:keys [status body]} (<!! (api/record-answer! repo :en-it @$session-id @$entity-id true))]
        (is (= :ok status))
        (let [{:keys [id lesson-id user correct total done]} body]
          (is (= @$session-id id))
          (is (= @$lesson-id lesson-id))
          (is (= "mike" user))
          (is (= 1 correct))
          (is (= 2 total))
          (is (not done))))

      (let [{:keys [status body]} (<!! (api/record-answer! repo :en-it @$session-id @$entity-id true))]
        (is (= :ok status))
        (let [{:keys [id lesson-id user correct total done]} body]
          (is (= @$session-id id))
          (is (= @$lesson-id lesson-id))
          (is (= "mike" user))
          (is (= 2 correct))
          (is (= 3 total))
          (is done)))

      (let [{:keys [status body]} (<!! (api/get-session repo :en-it @$session-id))]
        (is (= :ok status))
        (let [{:keys [id lesson-id user correct total done]} body]
          (is (= @$session-id id))
          (is (= @$lesson-id lesson-id))
          (is (= "mike" user))
          (is (= 2 correct))
          (is (= 3 total))
          (is done)))

      (let [{:keys [status body]} (<!! (api/delete-lesson! repo :en-it @$entity-id))]
        (is (= :ok status)))

      (let [{:keys [status body]} (<!! (api/get-lessons repo :en-it))]
        (is (= :ok status))
        (is (= [] body)))

      (is (= {:status :ok} (<!! (api/delete-type! repo :en-it))))      
      (destroy! config))))

(defn kill-that!
  [config]
  (dynamite/drop-tables-quietly! config ["en_it_session"
                                         "en_it_lesson_entity"
                                         "en_it_answer"
                                         "en_it_lesson"
                                         "en_it_tag"
                                         "en_it_entity"
                                         "en_sp_session"
                                         "en_sp_lesson_entity"
                                         "en_sp_answer"
                                         "en_sp_lesson"
                                         "en_sp_tag"
                                         "en_sp_entity"])
  (destroy! config))
  
(defn kill! [] (kill-that! config))
