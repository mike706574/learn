(ns mike.sentence.api)

(defprotocol SentenceRepo
  "A protocol for sentence storage"
  (get-random-sentence [r] "Get a random sentence")
  (aget-random-sentence [r channel] "Get a random sequence and put in on the channel")
  (get-random-sentences [r n] "Get some random sentences"))
