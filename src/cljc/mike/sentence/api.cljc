(ns mike.sentence.api)

(defprotocol SentenceRepo
  "A protocol for sentence storage"
  (get-random-sentence [r]
    "Get a random sentence.")
  (get-random-sentences [r n]
    "Get n random sentences.")
  (aget-random-sentence [r]
    "Get a random sequence asynchrononously. Returns a channel which will receive the sentence upon completion.")
  (aget-random-sentences [r n]
    "Gets n random sentences asynchronously. Returns a channel which will receive the sentences upon completion."))
