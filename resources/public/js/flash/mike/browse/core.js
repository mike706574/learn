// Compiled by ClojureScript 0.0-3308 {}
goog.provide('mike.browse.core');
goog.require('cljs.core');
goog.require('mike.common.core');
goog.require('lang.sentence.api');
goog.require('reagent.core');
goog.require('cljs_http.client');
goog.require('cljs.core.async');
cljs.core.enable_console_print_BANG_.call(null);
mike.browse.core.load_page = (function mike$browse$core$load_page(yak,number,sentences,sentence_count,state){
return cljs.core.merge.call(null,state,new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"yak","yak",-1460679683),yak,new cljs.core.Keyword(null,"info","info",-317069002),lang.sentence.api.yaks.call(null,yak),new cljs.core.Keyword(null,"page-number","page-number",556880104),number,new cljs.core.Keyword(null,"page-sentences","page-sentences",1688901370),sentences,new cljs.core.Keyword(null,"sentence-count","sentence-count",209324147),sentence_count,new cljs.core.Keyword(null,"loading","loading",-737050189),false], null));
});
mike.browse.core.show_page_hey = (function mike$browse$core$show_page_hey(state,yak,number,sentence_count){
var c__6804__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto__){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto__){
return (function (state_20511){
var state_val_20512 = (state_20511[(1)]);
if((state_val_20512 === (1))){
var inst_20496 = cljs.core.deref.call(null,state);
var inst_20497 = new cljs.core.Keyword(null,"page-size","page-size",223836073).cljs$core$IFn$_invoke$arity$1(inst_20496);
var inst_20498 = (number - (1));
var inst_20499 = (inst_20497 - (1));
var inst_20500 = (inst_20498 * inst_20499);
var inst_20501 = (number + inst_20500);
var inst_20502 = (inst_20501 + inst_20497);
var inst_20503 = (inst_20502 - (1));
var inst_20504 = mike.common.core.get_sentence_range.call(null,yak,inst_20501,inst_20503);
var state_20511__$1 = state_20511;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_20511__$1,(2),inst_20504);
} else {
if((state_val_20512 === (2))){
var inst_20506 = (state_20511[(2)]);
var inst_20507 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(inst_20506);
var inst_20508 = cljs.core.partial.call(null,mike.browse.core.load_page,yak,number,inst_20507,sentence_count);
var inst_20509 = cljs.core.swap_BANG_.call(null,state,inst_20508);
var state_20511__$1 = state_20511;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_20511__$1,inst_20509);
} else {
return null;
}
}
});})(c__6804__auto__))
;
return ((function (switch__6742__auto__,c__6804__auto__){
return (function() {
var mike$browse$core$show_page_hey_$_state_machine__6743__auto__ = null;
var mike$browse$core$show_page_hey_$_state_machine__6743__auto____0 = (function (){
var statearr_20516 = [null,null,null,null,null,null,null];
(statearr_20516[(0)] = mike$browse$core$show_page_hey_$_state_machine__6743__auto__);

(statearr_20516[(1)] = (1));

return statearr_20516;
});
var mike$browse$core$show_page_hey_$_state_machine__6743__auto____1 = (function (state_20511){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_20511);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e20517){if((e20517 instanceof Object)){
var ex__6746__auto__ = e20517;
var statearr_20518_20520 = state_20511;
(statearr_20518_20520[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_20511);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e20517;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__20521 = state_20511;
state_20511 = G__20521;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
mike$browse$core$show_page_hey_$_state_machine__6743__auto__ = function(state_20511){
switch(arguments.length){
case 0:
return mike$browse$core$show_page_hey_$_state_machine__6743__auto____0.call(this);
case 1:
return mike$browse$core$show_page_hey_$_state_machine__6743__auto____1.call(this,state_20511);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
mike$browse$core$show_page_hey_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = mike$browse$core$show_page_hey_$_state_machine__6743__auto____0;
mike$browse$core$show_page_hey_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = mike$browse$core$show_page_hey_$_state_machine__6743__auto____1;
return mike$browse$core$show_page_hey_$_state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto__))
})();
var state__6806__auto__ = (function (){var statearr_20519 = f__6805__auto__.call(null);
(statearr_20519[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto__);

return statearr_20519;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto__))
);

return c__6804__auto__;
});
mike.browse.core.show_page = (function mike$browse$core$show_page(state,yak,number){
return mike.browse.core.show_page_hey.call(null,state,yak,number,new cljs.core.Keyword(null,"sentence-count","sentence-count",209324147).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,state)));
});
mike.browse.core.show_page_new_yak = (function mike$browse$core$show_page_new_yak(state,yak,number){
var c__6804__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto__){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto__){
return (function (state_20545){
var state_val_20546 = (state_20545[(1)]);
if((state_val_20546 === (1))){
var inst_20538 = mike.common.core.get_language.call(null,yak);
var state_20545__$1 = state_20545;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_20545__$1,(2),inst_20538);
} else {
if((state_val_20546 === (2))){
var inst_20540 = (state_20545[(2)]);
var inst_20541 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(inst_20540);
var inst_20542 = new cljs.core.Keyword(null,"sentence-count","sentence-count",209324147).cljs$core$IFn$_invoke$arity$1(inst_20541);
var inst_20543 = mike.browse.core.show_page_hey.call(null,state,yak,number,inst_20542);
var state_20545__$1 = state_20545;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_20545__$1,inst_20543);
} else {
return null;
}
}
});})(c__6804__auto__))
;
return ((function (switch__6742__auto__,c__6804__auto__){
return (function() {
var mike$browse$core$show_page_new_yak_$_state_machine__6743__auto__ = null;
var mike$browse$core$show_page_new_yak_$_state_machine__6743__auto____0 = (function (){
var statearr_20550 = [null,null,null,null,null,null,null];
(statearr_20550[(0)] = mike$browse$core$show_page_new_yak_$_state_machine__6743__auto__);

(statearr_20550[(1)] = (1));

return statearr_20550;
});
var mike$browse$core$show_page_new_yak_$_state_machine__6743__auto____1 = (function (state_20545){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_20545);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e20551){if((e20551 instanceof Object)){
var ex__6746__auto__ = e20551;
var statearr_20552_20554 = state_20545;
(statearr_20552_20554[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_20545);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e20551;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__20555 = state_20545;
state_20545 = G__20555;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
mike$browse$core$show_page_new_yak_$_state_machine__6743__auto__ = function(state_20545){
switch(arguments.length){
case 0:
return mike$browse$core$show_page_new_yak_$_state_machine__6743__auto____0.call(this);
case 1:
return mike$browse$core$show_page_new_yak_$_state_machine__6743__auto____1.call(this,state_20545);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
mike$browse$core$show_page_new_yak_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = mike$browse$core$show_page_new_yak_$_state_machine__6743__auto____0;
mike$browse$core$show_page_new_yak_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = mike$browse$core$show_page_new_yak_$_state_machine__6743__auto____1;
return mike$browse$core$show_page_new_yak_$_state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto__))
})();
var state__6806__auto__ = (function (){var statearr_20553 = f__6805__auto__.call(null);
(statearr_20553[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto__);

return statearr_20553;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto__))
);

return c__6804__auto__;
});
mike.browse.core.column_header = (function mike$browse$core$column_header(column){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(column)], null),new cljs.core.Keyword(null,"label","label",1718410804).cljs$core$IFn$_invoke$arity$1(column)], null);
});
mike.browse.core.sentence_cell = (function mike$browse$core$sentence_cell(sentence,language){
var language_key = new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(language);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),language_key], null),sentence.call(null,language_key)], null);
});
mike.browse.core.sentence_row = (function mike$browse$core$sentence_row(languages,sentence){
var sentence_id = new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(sentence);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),sentence_id], null),cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"id","id",-1388402092)], null),sentence_id], null),cljs.core.map.call(null,cljs.core.partial.call(null,mike.browse.core.sentence_cell,sentence),languages))], null);
});
mike.browse.core.render = (function mike$browse$core$render(state){
var map__20558 = cljs.core.deref.call(null,state);
var map__20558__$1 = ((cljs.core.seq_QMARK_.call(null,map__20558))?cljs.core.apply.call(null,cljs.core.hash_map,map__20558):map__20558);
var current_state = map__20558__$1;
var yak = cljs.core.get.call(null,map__20558__$1,new cljs.core.Keyword(null,"yak","yak",-1460679683));
var info = cljs.core.get.call(null,map__20558__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var page_number = cljs.core.get.call(null,map__20558__$1,new cljs.core.Keyword(null,"page-number","page-number",556880104));
var page_sentences = cljs.core.get.call(null,map__20558__$1,new cljs.core.Keyword(null,"page-sentences","page-sentences",1688901370));
var page_size = cljs.core.get.call(null,map__20558__$1,new cljs.core.Keyword(null,"page-size","page-size",223836073));
var loading = cljs.core.get.call(null,map__20558__$1,new cljs.core.Keyword(null,"loading","loading",-737050189));
var sentence_count = cljs.core.get.call(null,map__20558__$1,new cljs.core.Keyword(null,"sentence-count","sentence-count",209324147));
var languages = new cljs.core.Keyword(null,"languages","languages",1471910331).cljs$core$IFn$_invoke$arity$1(info);
var page_count = cljs.core.quot.call(null,sentence_count,page_size);
return new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),mike.common.core.yak_select.call(null,((function (map__20558,map__20558__$1,current_state,yak,info,page_number,page_sentences,page_size,loading,sentence_count,languages,page_count){
return (function (p1__20556_SHARP_){
return mike.browse.core.show_page_new_yak.call(null,state,cljs.core.keyword.call(null,p1__20556_SHARP_.target.value),(1));
});})(map__20558,map__20558__$1,current_state,yak,info,page_number,page_sentences,page_size,loading,sentence_count,languages,page_count))
),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),[cljs.core.str("Total sentences: "),cljs.core.str(sentence_count)].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),[cljs.core.str("Page "),cljs.core.str(page_number),cljs.core.str(" of "),cljs.core.str(cljs.core.quot.call(null,sentence_count,page_size))].join('')], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"table","table",-564943036),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"thead","thead",-291875296),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"id","id",-1388402092)], null),"ID"], null),cljs.core.map.call(null,mike.browse.core.column_header,languages))], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tbody","tbody",-80678300),cljs.core.map.call(null,cljs.core.partial.call(null,mike.browse.core.sentence_row,languages),page_sentences)], null)], null),cljs.core.println.call(null,"HI"),mike.common.core.navigation_buttons.call(null,page_number,page_count,cljs.core.partial.call(null,mike.browse.core.show_page,state,yak)),(cljs.core.truth_(loading)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),"Loading..."], null):null)], null);
});
mike.browse.core.app = (function mike$browse$core$app(){
cljs.core.println.call(null,"Initializing...");

var state = reagent.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"yak","yak",-1460679683),new cljs.core.Keyword(null,"en-it","en-it",1847779843),new cljs.core.Keyword(null,"page-number","page-number",556880104),(1),new cljs.core.Keyword(null,"page-size","page-size",223836073),(10),new cljs.core.Keyword(null,"loading","loading",-737050189),true], null));
mike.browse.core.show_page_new_yak.call(null,state,new cljs.core.Keyword(null,"en-it","en-it",1847779843),(1));

return ((function (state){
return (function (){
cljs.core.println.call(null,"Rendering...");

return mike.browse.core.render.call(null,state);
});
;})(state))
});
mike.browse.core.start = (function mike$browse$core$start(){
return reagent.core.render_component.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [mike.browse.core.app], null),document.getElementById("app"));
});

//# sourceMappingURL=core.js.map