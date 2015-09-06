// Compiled by ClojureScript 0.0-3308 {}
goog.provide('mike.common');
goog.require('cljs.core');
goog.require('lang.sentence.api');
goog.require('cljs_http.client');
goog.require('cljs.core.async');
mike.common.base_path = "http://localhost:8080/api/";
mike.common.sentence_path = [cljs.core.str(mike.common.base_path),cljs.core.str("sentence")].join('');
mike.common.sentences_path = [cljs.core.str(mike.common.base_path),cljs.core.str("sentences")].join('');
mike.common.language_option = (function mike$common$language_option(yak){
var k = cljs.core.key.call(null,yak);
var v = cljs.core.val.call(null,yak);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),k,new cljs.core.Keyword(null,"value","value",305978217),k], null),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(v)], null);
});
mike.common.language_select = (function mike$common$language_select(on_change){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"select","select",1147833503),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-change","on-change",-732046149),on_change], null),cljs.core.map.call(null,mike.common.language_option,lang.sentence.api.yaks)], null);
});
mike.common.get_random_sentence = (function mike$common$get_random_sentence(yak){
return cljs_http.client.get.call(null,mike.common.sentence_path,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"query-params","query-params",900640534),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"yak","yak",-1460679683),cljs.core.name.call(null,yak)], null)], null));
});
mike.common.get_language = (function mike$common$get_language(yak){
return cljs_http.client.get.call(null,[cljs.core.str(mike.common.base_path),cljs.core.str("language")].join(''),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"query-params","query-params",900640534),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"yak","yak",-1460679683),cljs.core.name.call(null,yak)], null)], null));
});
mike.common.get_sentence_range = (function mike$common$get_sentence_range(yak,start,end){
return cljs_http.client.get.call(null,mike.common.sentences_path,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"query-params","query-params",900640534),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"yak","yak",-1460679683),cljs.core.name.call(null,yak),new cljs.core.Keyword(null,"start","start",-355208981),start,new cljs.core.Keyword(null,"end","end",-268185958),end], null)], null));
});

//# sourceMappingURL=common.js.map