// Compiled by ClojureScript 0.0-3308 {}
goog.provide('lang.sentence.api');
goog.require('cljs.core');
lang.sentence.api.yaks = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"en-it","en-it",1847779843),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1843675177),"English & Italian",new cljs.core.Keyword(null,"languages","languages",1471910331),cljs.core.PersistentHashSet.fromArray([new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"english","english",1087501909),new cljs.core.Keyword(null,"label","label",1718410804),"English",new cljs.core.Keyword(null,"name","name",1843675177),"english"], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"italian","italian",2087411663),new cljs.core.Keyword(null,"label","label",1718410804),"Italian",new cljs.core.Keyword(null,"name","name",1843675177),"italian"], null)], true)], null),new cljs.core.Keyword(null,"en-sp","en-sp",1162354288),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1843675177),"English & Spanish",new cljs.core.Keyword(null,"languages","languages",1471910331),cljs.core.PersistentHashSet.fromArray([new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"english","english",1087501909),new cljs.core.Keyword(null,"label","label",1718410804),"English",new cljs.core.Keyword(null,"name","name",1843675177),"english"], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"spanish","spanish",-600919236),new cljs.core.Keyword(null,"label","label",1718410804),"Spanish",new cljs.core.Keyword(null,"name","name",1843675177),"spanish"], null)], true)], null)], null);

/**
 * A repository of sentences.
 */
lang.sentence.api.SentenceRepo = (function (){var obj13115 = {};
return obj13115;
})();

/**
 * Gets the number of sentences.
 */
lang.sentence.api.count_sentences = (function lang$sentence$api$count_sentences(repo,yak){
if((function (){var and__4308__auto__ = repo;
if(and__4308__auto__){
return repo.lang$sentence$api$SentenceRepo$count_sentences$arity$2;
} else {
return and__4308__auto__;
}
})()){
return repo.lang$sentence$api$SentenceRepo$count_sentences$arity$2(repo,yak);
} else {
var x__4956__auto__ = (((repo == null))?null:repo);
return (function (){var or__4320__auto__ = (lang.sentence.api.count_sentences[goog.typeOf(x__4956__auto__)]);
if(or__4320__auto__){
return or__4320__auto__;
} else {
var or__4320__auto____$1 = (lang.sentence.api.count_sentences["_"]);
if(or__4320__auto____$1){
return or__4320__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"SentenceRepo.count-sentences",repo);
}
}
})().call(null,repo,yak);
}
});

/**
 * Gets a sentence by id.
 */
lang.sentence.api.get_sentence = (function lang$sentence$api$get_sentence(repo,yak,id){
if((function (){var and__4308__auto__ = repo;
if(and__4308__auto__){
return repo.lang$sentence$api$SentenceRepo$get_sentence$arity$3;
} else {
return and__4308__auto__;
}
})()){
return repo.lang$sentence$api$SentenceRepo$get_sentence$arity$3(repo,yak,id);
} else {
var x__4956__auto__ = (((repo == null))?null:repo);
return (function (){var or__4320__auto__ = (lang.sentence.api.get_sentence[goog.typeOf(x__4956__auto__)]);
if(or__4320__auto__){
return or__4320__auto__;
} else {
var or__4320__auto____$1 = (lang.sentence.api.get_sentence["_"]);
if(or__4320__auto____$1){
return or__4320__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"SentenceRepo.get-sentence",repo);
}
}
})().call(null,repo,yak,id);
}
});

/**
 * Gets a range of sentences with ids from start to end.
 */
lang.sentence.api.get_sentence_range = (function lang$sentence$api$get_sentence_range(repo,yak,start,end){
if((function (){var and__4308__auto__ = repo;
if(and__4308__auto__){
return repo.lang$sentence$api$SentenceRepo$get_sentence_range$arity$4;
} else {
return and__4308__auto__;
}
})()){
return repo.lang$sentence$api$SentenceRepo$get_sentence_range$arity$4(repo,yak,start,end);
} else {
var x__4956__auto__ = (((repo == null))?null:repo);
return (function (){var or__4320__auto__ = (lang.sentence.api.get_sentence_range[goog.typeOf(x__4956__auto__)]);
if(or__4320__auto__){
return or__4320__auto__;
} else {
var or__4320__auto____$1 = (lang.sentence.api.get_sentence_range["_"]);
if(or__4320__auto____$1){
return or__4320__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"SentenceRepo.get-sentence-range",repo);
}
}
})().call(null,repo,yak,start,end);
}
});

/**
 * Get a random sentence.
 */
lang.sentence.api.get_random_sentence = (function lang$sentence$api$get_random_sentence(repo,yak){
if((function (){var and__4308__auto__ = repo;
if(and__4308__auto__){
return repo.lang$sentence$api$SentenceRepo$get_random_sentence$arity$2;
} else {
return and__4308__auto__;
}
})()){
return repo.lang$sentence$api$SentenceRepo$get_random_sentence$arity$2(repo,yak);
} else {
var x__4956__auto__ = (((repo == null))?null:repo);
return (function (){var or__4320__auto__ = (lang.sentence.api.get_random_sentence[goog.typeOf(x__4956__auto__)]);
if(or__4320__auto__){
return or__4320__auto__;
} else {
var or__4320__auto____$1 = (lang.sentence.api.get_random_sentence["_"]);
if(or__4320__auto____$1){
return or__4320__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"SentenceRepo.get-random-sentence",repo);
}
}
})().call(null,repo,yak);
}
});

/**
 * Get n random sentences.
 */
lang.sentence.api.get_random_sentences = (function lang$sentence$api$get_random_sentences(repo,yak,n){
if((function (){var and__4308__auto__ = repo;
if(and__4308__auto__){
return repo.lang$sentence$api$SentenceRepo$get_random_sentences$arity$3;
} else {
return and__4308__auto__;
}
})()){
return repo.lang$sentence$api$SentenceRepo$get_random_sentences$arity$3(repo,yak,n);
} else {
var x__4956__auto__ = (((repo == null))?null:repo);
return (function (){var or__4320__auto__ = (lang.sentence.api.get_random_sentences[goog.typeOf(x__4956__auto__)]);
if(or__4320__auto__){
return or__4320__auto__;
} else {
var or__4320__auto____$1 = (lang.sentence.api.get_random_sentences["_"]);
if(or__4320__auto____$1){
return or__4320__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"SentenceRepo.get-random-sentences",repo);
}
}
})().call(null,repo,yak,n);
}
});

/**
 * Tag a sentence.
 */
lang.sentence.api.tag_sentence = (function lang$sentence$api$tag_sentence(repo,yak,id,tag){
if((function (){var and__4308__auto__ = repo;
if(and__4308__auto__){
return repo.lang$sentence$api$SentenceRepo$tag_sentence$arity$4;
} else {
return and__4308__auto__;
}
})()){
return repo.lang$sentence$api$SentenceRepo$tag_sentence$arity$4(repo,yak,id,tag);
} else {
var x__4956__auto__ = (((repo == null))?null:repo);
return (function (){var or__4320__auto__ = (lang.sentence.api.tag_sentence[goog.typeOf(x__4956__auto__)]);
if(or__4320__auto__){
return or__4320__auto__;
} else {
var or__4320__auto____$1 = (lang.sentence.api.tag_sentence["_"]);
if(or__4320__auto____$1){
return or__4320__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"SentenceRepo.tag-sentence",repo);
}
}
})().call(null,repo,yak,id,tag);
}
});

/**
 * Get sentences by tag.
 */
lang.sentence.api.get_tagged_sentences = (function lang$sentence$api$get_tagged_sentences(repo,yak,tag){
if((function (){var and__4308__auto__ = repo;
if(and__4308__auto__){
return repo.lang$sentence$api$SentenceRepo$get_tagged_sentences$arity$3;
} else {
return and__4308__auto__;
}
})()){
return repo.lang$sentence$api$SentenceRepo$get_tagged_sentences$arity$3(repo,yak,tag);
} else {
var x__4956__auto__ = (((repo == null))?null:repo);
return (function (){var or__4320__auto__ = (lang.sentence.api.get_tagged_sentences[goog.typeOf(x__4956__auto__)]);
if(or__4320__auto__){
return or__4320__auto__;
} else {
var or__4320__auto____$1 = (lang.sentence.api.get_tagged_sentences["_"]);
if(or__4320__auto____$1){
return or__4320__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"SentenceRepo.get-tagged-sentences",repo);
}
}
})().call(null,repo,yak,tag);
}
});

/**
 * Get a random sentence by tag.
 */
lang.sentence.api.get_tagged_random_sentence = (function lang$sentence$api$get_tagged_random_sentence(repo,yak,tag){
if((function (){var and__4308__auto__ = repo;
if(and__4308__auto__){
return repo.lang$sentence$api$SentenceRepo$get_tagged_random_sentence$arity$3;
} else {
return and__4308__auto__;
}
})()){
return repo.lang$sentence$api$SentenceRepo$get_tagged_random_sentence$arity$3(repo,yak,tag);
} else {
var x__4956__auto__ = (((repo == null))?null:repo);
return (function (){var or__4320__auto__ = (lang.sentence.api.get_tagged_random_sentence[goog.typeOf(x__4956__auto__)]);
if(or__4320__auto__){
return or__4320__auto__;
} else {
var or__4320__auto____$1 = (lang.sentence.api.get_tagged_random_sentence["_"]);
if(or__4320__auto____$1){
return or__4320__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"SentenceRepo.get-tagged-random-sentence",repo);
}
}
})().call(null,repo,yak,tag);
}
});

/**
 * get random sentences by tag.
 */
lang.sentence.api.get_tagged_random_sentences = (function lang$sentence$api$get_tagged_random_sentences(repo,yak,tag,n){
if((function (){var and__4308__auto__ = repo;
if(and__4308__auto__){
return repo.lang$sentence$api$SentenceRepo$get_tagged_random_sentences$arity$4;
} else {
return and__4308__auto__;
}
})()){
return repo.lang$sentence$api$SentenceRepo$get_tagged_random_sentences$arity$4(repo,yak,tag,n);
} else {
var x__4956__auto__ = (((repo == null))?null:repo);
return (function (){var or__4320__auto__ = (lang.sentence.api.get_tagged_random_sentences[goog.typeOf(x__4956__auto__)]);
if(or__4320__auto__){
return or__4320__auto__;
} else {
var or__4320__auto____$1 = (lang.sentence.api.get_tagged_random_sentences["_"]);
if(or__4320__auto____$1){
return or__4320__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"SentenceRepo.get-tagged-random-sentences",repo);
}
}
})().call(null,repo,yak,tag,n);
}
});


//# sourceMappingURL=api.js.map