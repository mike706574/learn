(ns lang.sentence.api)

(def yaks
  {:en-it {:name "English & Italian" 
           :languages #{{:key :english :label "English" :name "english" }
                        {:key :italian :label "Italian" :name "italian" }}}
   :en-sp {:name "English & Spanish"
           :languages #{{:key :english :label "English" :name "english" }
                        {:key :spanish :label "Spanish" :name "spanish" }}}})

(defprotocol SentenceRepo
  "A repository of sentences."
  (count-sentences [repo yak] "Gets the number of sentences.")
  (get-sentence [repo yak id] "Gets a sentence by id.")
  (get-sentence-range [repo yak start end] "Gets a range of sentences with ids from start to end.")
  (get-random-sentence [repo yak] "Get a random sentence.")
  (get-random-sentences [repo yak n] "Get n random sentences.")
  (tag-sentence [repo yak id tag] "Tag a sentence.")
  (get-tagged-sentences [repo yak tag] "Get sentences by tag.")
  (get-tagged-random-sentence [repo yak tag] "Get a random sentence by tag.")
  (get-tagged-random-sentences [repo yak tag n] "get random sentences by tag."))
