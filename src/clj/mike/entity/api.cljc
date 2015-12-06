(ns mike.entity.api)

(defprotocol EntityRepo
  "?"
  (create-type! [repo type-spec] "Create a type.")
  (delete-type! [repo type-id] "Destroy a type")
  (get-type [repo type-id] "Get a type.")
  (get-types [repo] "Get all types.")

  (count-entities [repo type-id] "Get entity count.") 
  (add-entity! [repo type-id entity] "Add an entity.")
  (update-entity! [repo type-id entity-id entity] "Update an entity.")
  (delete-entity! [repo type-id entity-id] "Delete an entity.")

  (get-entity [repo type-id entity-id] "Get an entity by ID.")
  (get-random-entity [repo type-id] "Get a random entity.")
  (get-random-entities [repo type-id n] "Get n random entities.")
  (get-entity-range [repo type-id start-id end-id] "Get a range of entities.")

  (tag-entity! [repo type-id entity-id tag] "Tag an entity.")
  (untag-entity! [repo type-id entity-id tag] "Untag an entity.")
  (delete-tag! [repo type-id tag] "Delete a tag.")
  (get-entity-tags [repo type-id entity-id] "Get all tags for an entity.")
  
  (get-entities-with-tag [repo type-id tag] "Get all entities with a tag.")
  (get-random-entity-with-tag [repo type-id tag] "Get a random entity with a tag.")
  (get-random-entities-with-tag [repo type-id tag n] "Get n random entities with a tag.")

  (get-lesson [repo type-id lesson-id] "Get a lesson.")
  (get-lesson-info [repo type-id lesson-id] "Get lesson info.")
  (get-lesson-entities [repo type-id lesson-id] "Get all lessons.")

  (get-lessons [repo type-id] "Get all lessons.")
  
  (create-lesson! [repo type-id lesson] "Create a lesson.")
  (delete-lesson! [repo type-id lesson-id] "Delete a lesson.")
  (add-to-lesson! [repo type-id name description] "Add an entity to a lesson.")
  (remove-from-lesson! [repo type-id lesson-id entity-id] "Remove an entity from a lesson.")
  ;;  (record-lesson-answer! [_ type-id ] "Record an answer for a lesson.")

  (create-session! [repo type-id lesson-id] "Start a lesson.")
  (record-answer! [repo type-id session-id entity-id start correct?] "Answer a question for a lesson.")
  (get-session [repo type-id session-id] "Get a lesson session.")

  (get-sessions [repo type-id] "Get all sessions.")
  (get-sessions-for-user [repo type-id criteria] "Get user sessions.")

  (record-individual-answer! [repo type-id entity-id start correct?] "Record an answer.")
  (get-stats [repo type-id entity-id] "Get stats.")

  (get-entities-for-user [repo type-id other-user] "Get entities for a user.")
  (get-lessons-for-user [repo type-id other-user] "Get all lessons for a user.")
  (get-stats-for-user [repo type-id entity-id other-user] "Get stats."))
