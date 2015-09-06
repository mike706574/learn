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
return (function (state_13266){
var state_val_13267 = (state_13266[(1)]);
if((state_val_13267 === (1))){
var inst_13251 = cljs.core.deref.call(null,state);
var inst_13252 = new cljs.core.Keyword(null,"page-size","page-size",223836073).cljs$core$IFn$_invoke$arity$1(inst_13251);
var inst_13253 = (number - (1));
var inst_13254 = (inst_13252 - (1));
var inst_13255 = (inst_13253 * inst_13254);
var inst_13256 = (number + inst_13255);
var inst_13257 = (inst_13256 + inst_13252);
var inst_13258 = (inst_13257 - (1));
var inst_13259 = mike.common.core.get_sentence_range.call(null,yak,inst_13256,inst_13258);
var state_13266__$1 = state_13266;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13266__$1,(2),inst_13259);
} else {
if((state_val_13267 === (2))){
var inst_13261 = (state_13266[(2)]);
var inst_13262 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(inst_13261);
var inst_13263 = cljs.core.partial.call(null,mike.browse.core.load_page,yak,number,inst_13262,sentence_count);
var inst_13264 = cljs.core.swap_BANG_.call(null,state,inst_13263);
var state_13266__$1 = state_13266;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13266__$1,inst_13264);
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
var statearr_13271 = [null,null,null,null,null,null,null];
(statearr_13271[(0)] = mike$browse$core$show_page_hey_$_state_machine__6743__auto__);

(statearr_13271[(1)] = (1));

return statearr_13271;
});
var mike$browse$core$show_page_hey_$_state_machine__6743__auto____1 = (function (state_13266){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_13266);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e13272){if((e13272 instanceof Object)){
var ex__6746__auto__ = e13272;
var statearr_13273_13275 = state_13266;
(statearr_13273_13275[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13266);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e13272;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13276 = state_13266;
state_13266 = G__13276;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
mike$browse$core$show_page_hey_$_state_machine__6743__auto__ = function(state_13266){
switch(arguments.length){
case 0:
return mike$browse$core$show_page_hey_$_state_machine__6743__auto____0.call(this);
case 1:
return mike$browse$core$show_page_hey_$_state_machine__6743__auto____1.call(this,state_13266);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
mike$browse$core$show_page_hey_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = mike$browse$core$show_page_hey_$_state_machine__6743__auto____0;
mike$browse$core$show_page_hey_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = mike$browse$core$show_page_hey_$_state_machine__6743__auto____1;
return mike$browse$core$show_page_hey_$_state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto__))
})();
var state__6806__auto__ = (function (){var statearr_13274 = f__6805__auto__.call(null);
(statearr_13274[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto__);

return statearr_13274;
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
return (function (state_13300){
var state_val_13301 = (state_13300[(1)]);
if((state_val_13301 === (1))){
var inst_13293 = mike.common.core.get_language.call(null,yak);
var state_13300__$1 = state_13300;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13300__$1,(2),inst_13293);
} else {
if((state_val_13301 === (2))){
var inst_13295 = (state_13300[(2)]);
var inst_13296 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(inst_13295);
var inst_13297 = new cljs.core.Keyword(null,"sentence-count","sentence-count",209324147).cljs$core$IFn$_invoke$arity$1(inst_13296);
var inst_13298 = mike.browse.core.show_page_hey.call(null,state,yak,number,inst_13297);
var state_13300__$1 = state_13300;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13300__$1,inst_13298);
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
var statearr_13305 = [null,null,null,null,null,null,null];
(statearr_13305[(0)] = mike$browse$core$show_page_new_yak_$_state_machine__6743__auto__);

(statearr_13305[(1)] = (1));

return statearr_13305;
});
var mike$browse$core$show_page_new_yak_$_state_machine__6743__auto____1 = (function (state_13300){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_13300);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e13306){if((e13306 instanceof Object)){
var ex__6746__auto__ = e13306;
var statearr_13307_13309 = state_13300;
(statearr_13307_13309[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13300);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e13306;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13310 = state_13300;
state_13300 = G__13310;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
mike$browse$core$show_page_new_yak_$_state_machine__6743__auto__ = function(state_13300){
switch(arguments.length){
case 0:
return mike$browse$core$show_page_new_yak_$_state_machine__6743__auto____0.call(this);
case 1:
return mike$browse$core$show_page_new_yak_$_state_machine__6743__auto____1.call(this,state_13300);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
mike$browse$core$show_page_new_yak_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = mike$browse$core$show_page_new_yak_$_state_machine__6743__auto____0;
mike$browse$core$show_page_new_yak_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = mike$browse$core$show_page_new_yak_$_state_machine__6743__auto____1;
return mike$browse$core$show_page_new_yak_$_state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto__))
})();
var state__6806__auto__ = (function (){var statearr_13308 = f__6805__auto__.call(null);
(statearr_13308[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto__);

return statearr_13308;
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
var map__13313 = cljs.core.deref.call(null,state);
var map__13313__$1 = ((cljs.core.seq_QMARK_.call(null,map__13313))?cljs.core.apply.call(null,cljs.core.hash_map,map__13313):map__13313);
var current_state = map__13313__$1;
var yak = cljs.core.get.call(null,map__13313__$1,new cljs.core.Keyword(null,"yak","yak",-1460679683));
var info = cljs.core.get.call(null,map__13313__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var page_number = cljs.core.get.call(null,map__13313__$1,new cljs.core.Keyword(null,"page-number","page-number",556880104));
var page_sentences = cljs.core.get.call(null,map__13313__$1,new cljs.core.Keyword(null,"page-sentences","page-sentences",1688901370));
var page_size = cljs.core.get.call(null,map__13313__$1,new cljs.core.Keyword(null,"page-size","page-size",223836073));
var loading = cljs.core.get.call(null,map__13313__$1,new cljs.core.Keyword(null,"loading","loading",-737050189));
var sentence_count = cljs.core.get.call(null,map__13313__$1,new cljs.core.Keyword(null,"sentence-count","sentence-count",209324147));
var languages = new cljs.core.Keyword(null,"languages","languages",1471910331).cljs$core$IFn$_invoke$arity$1(info);
var page_count = cljs.core.quot.call(null,sentence_count,page_size);
return new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),mike.common.core.yak_select.call(null,((function (map__13313,map__13313__$1,current_state,yak,info,page_number,page_sentences,page_size,loading,sentence_count,languages,page_count){
return (function (p1__13311_SHARP_){
return mike.browse.core.show_page_new_yak.call(null,state,cljs.core.keyword.call(null,p1__13311_SHARP_.target.value),(1));
});})(map__13313,map__13313__$1,current_state,yak,info,page_number,page_sentences,page_size,loading,sentence_count,languages,page_count))
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