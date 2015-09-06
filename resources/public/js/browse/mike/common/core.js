// Compiled by ClojureScript 0.0-3308 {}
goog.provide('mike.common.core');
goog.require('cljs.core');
goog.require('lang.sentence.api');
goog.require('cljs_http.client');
goog.require('cljs.core.async');
mike.common.core.base_path = "http://localhost:8080/api/";
mike.common.core.sentence_path = [cljs.core.str(mike.common.core.base_path),cljs.core.str("sentence")].join('');
mike.common.core.sentences_path = [cljs.core.str(mike.common.core.base_path),cljs.core.str("sentences")].join('');
mike.common.core.fmap = (function mike$common$core$fmap(f,m){
return cljs.core.into.call(null,cljs.core.empty.call(null,m),(function (){var iter__5074__auto__ = (function mike$common$core$fmap_$_iter__13126(s__13127){
return (new cljs.core.LazySeq(null,(function (){
var s__13127__$1 = s__13127;
while(true){
var temp__4423__auto__ = cljs.core.seq.call(null,s__13127__$1);
if(temp__4423__auto__){
var s__13127__$2 = temp__4423__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__13127__$2)){
var c__5072__auto__ = cljs.core.chunk_first.call(null,s__13127__$2);
var size__5073__auto__ = cljs.core.count.call(null,c__5072__auto__);
var b__13129 = cljs.core.chunk_buffer.call(null,size__5073__auto__);
if((function (){var i__13128 = (0);
while(true){
if((i__13128 < size__5073__auto__)){
var vec__13132 = cljs.core._nth.call(null,c__5072__auto__,i__13128);
var k = cljs.core.nth.call(null,vec__13132,(0),null);
var v = cljs.core.nth.call(null,vec__13132,(1),null);
cljs.core.chunk_append.call(null,b__13129,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,f.call(null,v)], null));

var G__13134 = (i__13128 + (1));
i__13128 = G__13134;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__13129),mike$common$core$fmap_$_iter__13126.call(null,cljs.core.chunk_rest.call(null,s__13127__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__13129),null);
}
} else {
var vec__13133 = cljs.core.first.call(null,s__13127__$2);
var k = cljs.core.nth.call(null,vec__13133,(0),null);
var v = cljs.core.nth.call(null,vec__13133,(1),null);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,f.call(null,v)], null),mike$common$core$fmap_$_iter__13126.call(null,cljs.core.rest.call(null,s__13127__$2)));
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
mike.common.core.get_random_sentence = (function mike$common$core$get_random_sentence(yak){
return cljs_http.client.get.call(null,mike.common.core.sentence_path,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"query-params","query-params",900640534),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"yak","yak",-1460679683),cljs.core.name.call(null,yak)], null)], null));
});
mike.common.core.get_language = (function mike$common$core$get_language(yak){
var c__6804__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto__){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto__){
return (function (state_13170){
var state_val_13171 = (state_13170[(1)]);
if((state_val_13171 === (1))){
var inst_13157 = [cljs.core.str(mike.common.core.base_path),cljs.core.str("language")].join('');
var inst_13158 = [new cljs.core.Keyword(null,"query-params","query-params",900640534)];
var inst_13159 = [new cljs.core.Keyword(null,"yak","yak",-1460679683)];
var inst_13160 = cljs.core.name.call(null,yak);
var inst_13161 = [inst_13160];
var inst_13162 = cljs.core.PersistentHashMap.fromArrays(inst_13159,inst_13161);
var inst_13163 = [inst_13162];
var inst_13164 = cljs.core.PersistentHashMap.fromArrays(inst_13158,inst_13163);
var inst_13165 = cljs_http.client.get.call(null,inst_13157,inst_13164);
var state_13170__$1 = state_13170;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13170__$1,(2),inst_13165);
} else {
if((state_val_13171 === (2))){
var inst_13167 = (state_13170[(2)]);
var inst_13168 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(inst_13167);
var state_13170__$1 = state_13170;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13170__$1,inst_13168);
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
var statearr_13175 = [null,null,null,null,null,null,null];
(statearr_13175[(0)] = mike$common$core$get_language_$_state_machine__6743__auto__);

(statearr_13175[(1)] = (1));

return statearr_13175;
});
var mike$common$core$get_language_$_state_machine__6743__auto____1 = (function (state_13170){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_13170);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e13176){if((e13176 instanceof Object)){
var ex__6746__auto__ = e13176;
var statearr_13177_13179 = state_13170;
(statearr_13177_13179[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13170);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e13176;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13180 = state_13170;
state_13170 = G__13180;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
mike$common$core$get_language_$_state_machine__6743__auto__ = function(state_13170){
switch(arguments.length){
case 0:
return mike$common$core$get_language_$_state_machine__6743__auto____0.call(this);
case 1:
return mike$common$core$get_language_$_state_machine__6743__auto____1.call(this,state_13170);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
mike$common$core$get_language_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = mike$common$core$get_language_$_state_machine__6743__auto____0;
mike$common$core$get_language_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = mike$common$core$get_language_$_state_machine__6743__auto____1;
return mike$common$core$get_language_$_state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto__))
})();
var state__6806__auto__ = (function (){var statearr_13178 = f__6805__auto__.call(null);
(statearr_13178[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto__);

return statearr_13178;
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
return (function (state_13214){
var state_val_13215 = (state_13214[(1)]);
if((state_val_13215 === (1))){
var inst_13202 = [new cljs.core.Keyword(null,"query-params","query-params",900640534)];
var inst_13203 = [new cljs.core.Keyword(null,"yak","yak",-1460679683),new cljs.core.Keyword(null,"start","start",-355208981),new cljs.core.Keyword(null,"end","end",-268185958)];
var inst_13204 = cljs.core.name.call(null,yak);
var inst_13205 = [inst_13204,start,end];
var inst_13206 = cljs.core.PersistentHashMap.fromArrays(inst_13203,inst_13205);
var inst_13207 = [inst_13206];
var inst_13208 = cljs.core.PersistentHashMap.fromArrays(inst_13202,inst_13207);
var inst_13209 = cljs_http.client.get.call(null,mike.common.core.sentences_path,inst_13208);
var state_13214__$1 = state_13214;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13214__$1,(2),inst_13209);
} else {
if((state_val_13215 === (2))){
var inst_13211 = (state_13214[(2)]);
var inst_13212 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(inst_13211);
var state_13214__$1 = state_13214;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13214__$1,inst_13212);
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
var statearr_13219 = [null,null,null,null,null,null,null];
(statearr_13219[(0)] = mike$common$core$get_sentence_range_$_state_machine__6743__auto__);

(statearr_13219[(1)] = (1));

return statearr_13219;
});
var mike$common$core$get_sentence_range_$_state_machine__6743__auto____1 = (function (state_13214){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_13214);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e13220){if((e13220 instanceof Object)){
var ex__6746__auto__ = e13220;
var statearr_13221_13223 = state_13214;
(statearr_13221_13223[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13214);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e13220;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13224 = state_13214;
state_13214 = G__13224;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
mike$common$core$get_sentence_range_$_state_machine__6743__auto__ = function(state_13214){
switch(arguments.length){
case 0:
return mike$common$core$get_sentence_range_$_state_machine__6743__auto____0.call(this);
case 1:
return mike$common$core$get_sentence_range_$_state_machine__6743__auto____1.call(this,state_13214);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
mike$common$core$get_sentence_range_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = mike$common$core$get_sentence_range_$_state_machine__6743__auto____0;
mike$common$core$get_sentence_range_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = mike$common$core$get_sentence_range_$_state_machine__6743__auto____1;
return mike$common$core$get_sentence_range_$_state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto__))
})();
var state__6806__auto__ = (function (){var statearr_13222 = f__6805__auto__.call(null);
(statearr_13222[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto__);

return statearr_13222;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto__))
);

return c__6804__auto__;
});

//# sourceMappingURL=core.js.map