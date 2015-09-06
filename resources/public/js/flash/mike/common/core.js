// Compiled by ClojureScript 0.0-3308 {}
goog.provide('mike.common.core');
goog.require('cljs.core');
goog.require('lang.sentence.api');
goog.require('cljs_http.client');
goog.require('cljs.core.async');
mike.common.core.base_path = "http://localhost:8080/api/";
mike.common.core.sentence_path = [cljs.core.str(mike.common.core.base_path),cljs.core.str("sentence")].join('');
mike.common.core.sentences_path = [cljs.core.str(mike.common.core.base_path),cljs.core.str("sentences")].join('');
mike.common.core.maps = (function mike$common$core$maps(f,coll){
return cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.map.call(null,f,coll));
});
mike.common.core.fmap = (function mike$common$core$fmap(f,m){
return cljs.core.into.call(null,cljs.core.empty.call(null,m),(function (){var iter__5074__auto__ = (function mike$common$core$fmap_$_iter__20323(s__20324){
return (new cljs.core.LazySeq(null,(function (){
var s__20324__$1 = s__20324;
while(true){
var temp__4423__auto__ = cljs.core.seq.call(null,s__20324__$1);
if(temp__4423__auto__){
var s__20324__$2 = temp__4423__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__20324__$2)){
var c__5072__auto__ = cljs.core.chunk_first.call(null,s__20324__$2);
var size__5073__auto__ = cljs.core.count.call(null,c__5072__auto__);
var b__20326 = cljs.core.chunk_buffer.call(null,size__5073__auto__);
if((function (){var i__20325 = (0);
while(true){
if((i__20325 < size__5073__auto__)){
var vec__20329 = cljs.core._nth.call(null,c__5072__auto__,i__20325);
var k = cljs.core.nth.call(null,vec__20329,(0),null);
var v = cljs.core.nth.call(null,vec__20329,(1),null);
cljs.core.chunk_append.call(null,b__20326,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,f.call(null,v)], null));

var G__20331 = (i__20325 + (1));
i__20325 = G__20331;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20326),mike$common$core$fmap_$_iter__20323.call(null,cljs.core.chunk_rest.call(null,s__20324__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20326),null);
}
} else {
var vec__20330 = cljs.core.first.call(null,s__20324__$2);
var k = cljs.core.nth.call(null,vec__20330,(0),null);
var v = cljs.core.nth.call(null,vec__20330,(1),null);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,f.call(null,v)], null),mike$common$core$fmap_$_iter__20323.call(null,cljs.core.rest.call(null,s__20324__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5074__auto__.call(null,m);
})());
});
mike.common.core.build_option = (function mike$common$core$build_option(e){
var k = cljs.core.key.call(null,e);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),k,new cljs.core.Keyword(null,"value","value",305978217),k], null),cljs.core.val.call(null,e)], null);
});
mike.common.core.on_change_select = (function mike$common$core$on_change_select(on_change,options){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"select","select",1147833503),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-change","on-change",-732046149),on_change], null),cljs.core.map.call(null,mike.common.core.build_option,options)], null);
});
mike.common.core.yak_select = (function mike$common$core$yak_select(on_change){
return mike.common.core.on_change_select.call(null,on_change,mike.common.core.fmap.call(null,new cljs.core.Keyword(null,"name","name",1843675177),lang.sentence.api.yaks));
});
mike.common.core.get_first_index = (function mike$common$core$get_first_index(item,coll){
return cljs.core.first.call(null,cljs.core.keep_indexed.call(null,(function (p1__20333_SHARP_,p2__20332_SHARP_){
if(cljs.core._EQ_.call(null,item,p2__20332_SHARP_)){
return p1__20333_SHARP_;
} else {
return null;
}
}),coll));
});
mike.common.core.get_after = (function mike$common$core$get_after(v,item){
var index = mike.common.core.get_first_index.call(null,item,v);
if((index == null)){
return null;
} else {
var next_index = (index + (1));
if(cljs.core._EQ_.call(null,next_index,cljs.core.count.call(null,v))){
return cljs.core.first.call(null,v);
} else {
return cljs.core.get.call(null,v,next_index);
}
}
});
mike.common.core.get_value = (function mike$common$core$get_value(e){
return e.target.value;
});
mike.common.core.navigation_buttons = (function mike$common$core$navigation_buttons(page_number,page_count,show_fn){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),((cljs.core.not_EQ_.call(null,(1),page_number))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"button",new cljs.core.Keyword(null,"value","value",305978217),"First",new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return show_fn.call(null,(1));
})], null)], null):null),((((1) < page_number))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"button",new cljs.core.Keyword(null,"value","value",305978217),"Previous",new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return show_fn.call(null,(page_number - (1)));
})], null)], null):null),((cljs.core.not_EQ_.call(null,page_number,page_count))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"button",new cljs.core.Keyword(null,"value","value",305978217),"Next",new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return show_fn.call(null,(page_number + (1)));
})], null)], null):null),((cljs.core.not_EQ_.call(null,page_number,page_count))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"button",new cljs.core.Keyword(null,"value","value",305978217),"Last",new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return show_fn.call(null,page_count);
})], null)], null):null)], null);
});
mike.common.core.flip_box = (function mike$common$core$flip_box(title,selected,options,flip,next){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),title], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),selected.call(null,options)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"button",new cljs.core.Keyword(null,"value","value",305978217),"Flip",new cljs.core.Keyword(null,"on-click","on-click",1632826543),flip], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"button",new cljs.core.Keyword(null,"value","value",305978217),"Next",new cljs.core.Keyword(null,"on-click","on-click",1632826543),next], null)], null)], null)], null);
});
mike.common.core.get_random_sentence = (function mike$common$core$get_random_sentence(yak){
var c__6804__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto__){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto__){
return (function (state_20369){
var state_val_20370 = (state_20369[(1)]);
if((state_val_20370 === (1))){
var inst_20356 = [new cljs.core.Keyword(null,"query-params","query-params",900640534)];
var inst_20357 = [new cljs.core.Keyword(null,"yak","yak",-1460679683)];
var inst_20358 = cljs.core.name.call(null,yak);
var inst_20359 = [inst_20358];
var inst_20360 = cljs.core.PersistentHashMap.fromArrays(inst_20357,inst_20359);
var inst_20361 = [inst_20360];
var inst_20362 = cljs.core.PersistentHashMap.fromArrays(inst_20356,inst_20361);
var inst_20363 = cljs_http.client.get.call(null,mike.common.core.sentence_path,inst_20362);
var state_20369__$1 = state_20369;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_20369__$1,(2),inst_20363);
} else {
if((state_val_20370 === (2))){
var inst_20365 = (state_20369[(2)]);
var inst_20366 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(inst_20365);
var inst_20367 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(inst_20366);
var state_20369__$1 = state_20369;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_20369__$1,inst_20367);
} else {
return null;
}
}
});})(c__6804__auto__))
;
return ((function (switch__6742__auto__,c__6804__auto__){
return (function() {
var mike$common$core$get_random_sentence_$_state_machine__6743__auto__ = null;
var mike$common$core$get_random_sentence_$_state_machine__6743__auto____0 = (function (){
var statearr_20374 = [null,null,null,null,null,null,null];
(statearr_20374[(0)] = mike$common$core$get_random_sentence_$_state_machine__6743__auto__);

(statearr_20374[(1)] = (1));

return statearr_20374;
});
var mike$common$core$get_random_sentence_$_state_machine__6743__auto____1 = (function (state_20369){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_20369);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e20375){if((e20375 instanceof Object)){
var ex__6746__auto__ = e20375;
var statearr_20376_20378 = state_20369;
(statearr_20376_20378[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_20369);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e20375;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__20379 = state_20369;
state_20369 = G__20379;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
mike$common$core$get_random_sentence_$_state_machine__6743__auto__ = function(state_20369){
switch(arguments.length){
case 0:
return mike$common$core$get_random_sentence_$_state_machine__6743__auto____0.call(this);
case 1:
return mike$common$core$get_random_sentence_$_state_machine__6743__auto____1.call(this,state_20369);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
mike$common$core$get_random_sentence_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = mike$common$core$get_random_sentence_$_state_machine__6743__auto____0;
mike$common$core$get_random_sentence_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = mike$common$core$get_random_sentence_$_state_machine__6743__auto____1;
return mike$common$core$get_random_sentence_$_state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto__))
})();
var state__6806__auto__ = (function (){var statearr_20377 = f__6805__auto__.call(null);
(statearr_20377[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto__);

return statearr_20377;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto__))
);

return c__6804__auto__;
});
mike.common.core.get_language = (function mike$common$core$get_language(yak){
var c__6804__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto__){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto__){
return (function (state_20415){
var state_val_20416 = (state_20415[(1)]);
if((state_val_20416 === (1))){
var inst_20402 = [cljs.core.str(mike.common.core.base_path),cljs.core.str("language")].join('');
var inst_20403 = [new cljs.core.Keyword(null,"query-params","query-params",900640534)];
var inst_20404 = [new cljs.core.Keyword(null,"yak","yak",-1460679683)];
var inst_20405 = cljs.core.name.call(null,yak);
var inst_20406 = [inst_20405];
var inst_20407 = cljs.core.PersistentHashMap.fromArrays(inst_20404,inst_20406);
var inst_20408 = [inst_20407];
var inst_20409 = cljs.core.PersistentHashMap.fromArrays(inst_20403,inst_20408);
var inst_20410 = cljs_http.client.get.call(null,inst_20402,inst_20409);
var state_20415__$1 = state_20415;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_20415__$1,(2),inst_20410);
} else {
if((state_val_20416 === (2))){
var inst_20412 = (state_20415[(2)]);
var inst_20413 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(inst_20412);
var state_20415__$1 = state_20415;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_20415__$1,inst_20413);
} else {
return null;
}
}
});})(c__6804__auto__))
;
return ((function (switch__6742__auto__,c__6804__auto__){
return (function() {
var mike$common$core$get_language_$_state_machine__6743__auto__ = null;
var mike$common$core$get_language_$_state_machine__6743__auto____0 = (function (){
var statearr_20420 = [null,null,null,null,null,null,null];
(statearr_20420[(0)] = mike$common$core$get_language_$_state_machine__6743__auto__);

(statearr_20420[(1)] = (1));

return statearr_20420;
});
var mike$common$core$get_language_$_state_machine__6743__auto____1 = (function (state_20415){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_20415);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e20421){if((e20421 instanceof Object)){
var ex__6746__auto__ = e20421;
var statearr_20422_20424 = state_20415;
(statearr_20422_20424[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_20415);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e20421;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__20425 = state_20415;
state_20415 = G__20425;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
mike$common$core$get_language_$_state_machine__6743__auto__ = function(state_20415){
switch(arguments.length){
case 0:
return mike$common$core$get_language_$_state_machine__6743__auto____0.call(this);
case 1:
return mike$common$core$get_language_$_state_machine__6743__auto____1.call(this,state_20415);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
mike$common$core$get_language_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = mike$common$core$get_language_$_state_machine__6743__auto____0;
mike$common$core$get_language_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = mike$common$core$get_language_$_state_machine__6743__auto____1;
return mike$common$core$get_language_$_state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto__))
})();
var state__6806__auto__ = (function (){var statearr_20423 = f__6805__auto__.call(null);
(statearr_20423[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto__);

return statearr_20423;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto__))
);

return c__6804__auto__;
});
mike.common.core.get_sentence_range = (function mike$common$core$get_sentence_range(yak,start,end){
var c__6804__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto__){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto__){
return (function (state_20459){
var state_val_20460 = (state_20459[(1)]);
if((state_val_20460 === (1))){
var inst_20447 = [new cljs.core.Keyword(null,"query-params","query-params",900640534)];
var inst_20448 = [new cljs.core.Keyword(null,"yak","yak",-1460679683),new cljs.core.Keyword(null,"start","start",-355208981),new cljs.core.Keyword(null,"end","end",-268185958)];
var inst_20449 = cljs.core.name.call(null,yak);
var inst_20450 = [inst_20449,start,end];
var inst_20451 = cljs.core.PersistentHashMap.fromArrays(inst_20448,inst_20450);
var inst_20452 = [inst_20451];
var inst_20453 = cljs.core.PersistentHashMap.fromArrays(inst_20447,inst_20452);
var inst_20454 = cljs_http.client.get.call(null,mike.common.core.sentences_path,inst_20453);
var state_20459__$1 = state_20459;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_20459__$1,(2),inst_20454);
} else {
if((state_val_20460 === (2))){
var inst_20456 = (state_20459[(2)]);
var inst_20457 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(inst_20456);
var state_20459__$1 = state_20459;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_20459__$1,inst_20457);
} else {
return null;
}
}
});})(c__6804__auto__))
;
return ((function (switch__6742__auto__,c__6804__auto__){
return (function() {
var mike$common$core$get_sentence_range_$_state_machine__6743__auto__ = null;
var mike$common$core$get_sentence_range_$_state_machine__6743__auto____0 = (function (){
var statearr_20464 = [null,null,null,null,null,null,null];
(statearr_20464[(0)] = mike$common$core$get_sentence_range_$_state_machine__6743__auto__);

(statearr_20464[(1)] = (1));

return statearr_20464;
});
var mike$common$core$get_sentence_range_$_state_machine__6743__auto____1 = (function (state_20459){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_20459);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e20465){if((e20465 instanceof Object)){
var ex__6746__auto__ = e20465;
var statearr_20466_20468 = state_20459;
(statearr_20466_20468[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_20459);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e20465;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__20469 = state_20459;
state_20459 = G__20469;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
mike$common$core$get_sentence_range_$_state_machine__6743__auto__ = function(state_20459){
switch(arguments.length){
case 0:
return mike$common$core$get_sentence_range_$_state_machine__6743__auto____0.call(this);
case 1:
return mike$common$core$get_sentence_range_$_state_machine__6743__auto____1.call(this,state_20459);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
mike$common$core$get_sentence_range_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = mike$common$core$get_sentence_range_$_state_machine__6743__auto____0;
mike$common$core$get_sentence_range_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = mike$common$core$get_sentence_range_$_state_machine__6743__auto____1;
return mike$common$core$get_sentence_range_$_state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto__))
})();
var state__6806__auto__ = (function (){var statearr_20467 = f__6805__auto__.call(null);
(statearr_20467[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto__);

return statearr_20467;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto__))
);

return c__6804__auto__;
});

//# sourceMappingURL=core.js.map