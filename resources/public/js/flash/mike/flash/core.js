// Compiled by ClojureScript 0.0-3308 {}
goog.provide('mike.flash.core');
goog.require('cljs.core');
goog.require('reagent.core');
goog.require('cljs_http.client');
goog.require('lang.sentence.api');
goog.require('cljs.core.async');
goog.require('mike.common.core');
goog.require('mike.frog');
cljs.core.enable_console_print_BANG_.call(null);
mike.flash.core.state = reagent.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"loading","loading",-737050189),false], null));
mike.flash.core.choose_set = (function mike$flash$core$choose_set(yak,state){
var map__20605 = lang.sentence.api.yaks.call(null,yak);
var map__20605__$1 = ((cljs.core.seq_QMARK_.call(null,map__20605))?cljs.core.apply.call(null,cljs.core.hash_map,map__20605):map__20605);
var languages = cljs.core.get.call(null,map__20605__$1,new cljs.core.Keyword(null,"languages","languages",1471910331));
var title = cljs.core.get.call(null,map__20605__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var keys = cljs.core.mapv.call(null,new cljs.core.Keyword(null,"key","key",-1516042587),languages);
return cljs.core.swap_BANG_.call(null,state,cljs.core.merge,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"yak","yak",-1460679683),yak,new cljs.core.Keyword(null,"title","title",636505583),title,new cljs.core.Keyword(null,"languages","languages",1471910331),languages,new cljs.core.Keyword(null,"keys","keys",1068423698),keys,new cljs.core.Keyword(null,"selected","selected",574897764),cljs.core.first.call(null,keys)], null));
});
mike.flash.core.fetch_sentence = (function mike$flash$core$fetch_sentence(state){
cljs.core.swap_BANG_.call(null,state,cljs.core.assoc,new cljs.core.Keyword(null,"loading","loading",-737050189),true);

var c__6804__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto__){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto__){
return (function (state_20629){
var state_val_20630 = (state_20629[(1)]);
if((state_val_20630 === (1))){
var inst_20622 = cljs.core.deref.call(null,state);
var inst_20623 = new cljs.core.Keyword(null,"yak","yak",-1460679683).cljs$core$IFn$_invoke$arity$1(inst_20622);
var inst_20624 = mike.common.core.get_random_sentence.call(null,inst_20623);
var state_20629__$1 = state_20629;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_20629__$1,(2),inst_20624);
} else {
if((state_val_20630 === (2))){
var inst_20626 = (state_20629[(2)]);
var inst_20627 = cljs.core.swap_BANG_.call(null,state,cljs.core.assoc,new cljs.core.Keyword(null,"sentence","sentence",2033657256),inst_20626,new cljs.core.Keyword(null,"loading","loading",-737050189),false);
var state_20629__$1 = state_20629;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_20629__$1,inst_20627);
} else {
return null;
}
}
});})(c__6804__auto__))
;
return ((function (switch__6742__auto__,c__6804__auto__){
return (function() {
var mike$flash$core$fetch_sentence_$_state_machine__6743__auto__ = null;
var mike$flash$core$fetch_sentence_$_state_machine__6743__auto____0 = (function (){
var statearr_20634 = [null,null,null,null,null,null,null];
(statearr_20634[(0)] = mike$flash$core$fetch_sentence_$_state_machine__6743__auto__);

(statearr_20634[(1)] = (1));

return statearr_20634;
});
var mike$flash$core$fetch_sentence_$_state_machine__6743__auto____1 = (function (state_20629){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_20629);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e20635){if((e20635 instanceof Object)){
var ex__6746__auto__ = e20635;
var statearr_20636_20638 = state_20629;
(statearr_20636_20638[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_20629);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e20635;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__20639 = state_20629;
state_20629 = G__20639;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
mike$flash$core$fetch_sentence_$_state_machine__6743__auto__ = function(state_20629){
switch(arguments.length){
case 0:
return mike$flash$core$fetch_sentence_$_state_machine__6743__auto____0.call(this);
case 1:
return mike$flash$core$fetch_sentence_$_state_machine__6743__auto____1.call(this,state_20629);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
mike$flash$core$fetch_sentence_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = mike$flash$core$fetch_sentence_$_state_machine__6743__auto____0;
mike$flash$core$fetch_sentence_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = mike$flash$core$fetch_sentence_$_state_machine__6743__auto____1;
return mike$flash$core$fetch_sentence_$_state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto__))
})();
var state__6806__auto__ = (function (){var statearr_20637 = f__6805__auto__.call(null);
(statearr_20637[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto__);

return statearr_20637;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto__))
);

return c__6804__auto__;
});
mike.flash.core.swap_selection = (function mike$flash$core$swap_selection(state){
var map__20641 = state;
var map__20641__$1 = ((cljs.core.seq_QMARK_.call(null,map__20641))?cljs.core.apply.call(null,cljs.core.hash_map,map__20641):map__20641);
var selected = cljs.core.get.call(null,map__20641__$1,new cljs.core.Keyword(null,"selected","selected",574897764));
var keys = cljs.core.get.call(null,map__20641__$1,new cljs.core.Keyword(null,"keys","keys",1068423698));
return cljs.core.assoc.call(null,state,new cljs.core.Keyword(null,"selected","selected",574897764),mike.common.core.get_after.call(null,keys,selected));
});
mike.flash.core.app = (function mike$flash$core$app(){
var map__20644 = cljs.core.deref.call(null,mike.flash.core.state);
var map__20644__$1 = ((cljs.core.seq_QMARK_.call(null,map__20644))?cljs.core.apply.call(null,cljs.core.hash_map,map__20644):map__20644);
var current_state = map__20644__$1;
var title = cljs.core.get.call(null,map__20644__$1,new cljs.core.Keyword(null,"title","title",636505583));
var sentence = cljs.core.get.call(null,map__20644__$1,new cljs.core.Keyword(null,"sentence","sentence",2033657256));
var selected = cljs.core.get.call(null,map__20644__$1,new cljs.core.Keyword(null,"selected","selected",574897764));
var loading = cljs.core.get.call(null,map__20644__$1,new cljs.core.Keyword(null,"loading","loading",-737050189));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),((!((sentence == null)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),mike.common.core.yak_select.call(null,((function (map__20644,map__20644__$1,current_state,title,sentence,selected,loading){
return (function (p1__20642_SHARP_){
mike.flash.core.choose_set.call(null,cljs.core.keyword.call(null,mike.common.core.get_value.call(null,p1__20642_SHARP_)),mike.flash.core.state);

return mike.flash.core.fetch_sentence.call(null,mike.flash.core.state);
});})(map__20644,map__20644__$1,current_state,title,sentence,selected,loading))
),mike.common.core.flip_box.call(null,title,selected,sentence,((function (map__20644,map__20644__$1,current_state,title,sentence,selected,loading){
return (function (){
return cljs.core.swap_BANG_.call(null,mike.flash.core.state,mike.flash.core.swap_selection);
});})(map__20644,map__20644__$1,current_state,title,sentence,selected,loading))
,((function (map__20644,map__20644__$1,current_state,title,sentence,selected,loading){
return (function (){
return mike.flash.core.fetch_sentence.call(null,mike.flash.core.state);
});})(map__20644,map__20644__$1,current_state,title,sentence,selected,loading))
)], null):null),(cljs.core.truth_(loading)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),"Loading..."], null):null)], null);
});
mike.flash.core.start = (function mike$flash$core$start(){
var default_yak = new cljs.core.Keyword(null,"en-it","en-it",1847779843);
mike.flash.core.choose_set.call(null,default_yak,mike.flash.core.state);

mike.flash.core.fetch_sentence.call(null,mike.flash.core.state);

return reagent.core.render_component.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [mike.flash.core.app], null),document.getElementById("app"));
});

//# sourceMappingURL=core.js.map