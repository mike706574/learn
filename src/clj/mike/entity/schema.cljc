(ns mike.entity.schema)

;; ;; no helpers
;; (def AttributeSpecification {:id {:type :keyword-or-string :required true}
;;                              :label {:type :string :required true}
;;                              :schema {:type :enum :required true :subtype :keyword-or-string :options #{:str :int}}
;;                              :description {:type :string :required true}})

;; (def TypeSpecification {:id {:type :keyword-or-string :required true}
;;                         :label {:type :string :required true}
;;                         :description {:type :string :required true}
;;                         :attributes {:type :uniform-list
;;                                      :required true
;;                                      :subtype AttributeSpecification
;;                                      :min-length 1}})

;; ;; helpers
;; (def Key :keyword-or-string)
;; (def Text :string)

;; (defn Choice [subtype options] {:type :enum :required true :subtype subtype :options options})
;; (defn Min [min] [min nil])
;; (defn Max [max] [nil max])
;; (defn Range [min max] [min max])
;; (defn UniformList [subtype range] {:type :uniform-list :required true :subtype subtype :range range})

;; (def AttributeSpecification {:id Key
;;                              :label Text
;;                              :schema (Choice Key #{:str :int})
;;                              :description Str})

;; (def TypeSpecification {:id Key
;;                         :label Text
;;                         :description Text
;;                         :attributes (UniformList AttributeSpecification (Min 1))})
