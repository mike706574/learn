// Compiled by ClojureScript 0.0-3308 {}
goog.provide('mike.flip');
goog.require('cljs.core');
goog.require('reagent.core');
goog.require('cljs_http.client');
goog.require('cljs.core.async');
cljs.core.enable_console_print_BANG_.call(null);
mike.flip.path = "http://localhost:8080/api/sentence";
mike.flip.selection_atom = reagent.core.atom.call(null,new cljs.core.Keyword(null,"italian","italian",2087411663));
mike.flip.sentence_atom = reagent.core.atom.call(null,null);
mike.flip.start_atom = reagent.core.atom.call(null,new cljs.core.Keyword(null,"english","english",1087501909));
mike.flip.state = reagent.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"start","start",-355208981),new cljs.core.Keyword(null,"english","english",1087501909),new cljs.core.Keyword(null,"selected","selected",574897764),new cljs.core.Keyword(null,"english","english",1087501909),new cljs.core.Keyword(null,"loading","loading",-737050189),false,new cljs.core.Keyword(null,"sentence","sentence",2033657256),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"id","id",-1388402092),(0),new cljs.core.Keyword(null,"english","english",1087501909),"Hi!",new cljs.core.Keyword(null,"italian","italian",2087411663),"Ciao!"], null)], null));
mike.flip.new_sentence = (function mike$flip$new_sentence(sentence,state){
return cljs.core.merge.call(null,state,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"sentence","sentence",2033657256),sentence,new cljs.core.Keyword(null,"loading","loading",-737050189),false,new cljs.core.Keyword(null,"selected","selected",574897764),new cljs.core.Keyword(null,"start","start",-355208981).cljs$core$IFn$_invoke$arity$1(state)], null));
});
mike.flip.fetch_sentence = (function mike$flip$fetch_sentence(){
cljs.core.swap_BANG_.call(null,mike.flip.state,cljs.core.assoc,new cljs.core.Keyword(null,"loading","loading",-737050189),true);

cljs.core.println.call(null,"HI MOM");

var c__6804__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto__){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto__){
return (function (state_9604){
var state_val_9605 = (state_9604[(1)]);
if((state_val_9605 === (1))){
var inst_9591 = [new cljs.core.Keyword(null,"query-params","query-params",900640534)];
var inst_9592 = ["yak"];
var inst_9593 = ["en-it"];
var inst_9594 = cljs.core.PersistentHashMap.fromArrays(inst_9592,inst_9593);
var inst_9595 = [inst_9594];
var inst_9596 = cljs.core.PersistentHashMap.fromArrays(inst_9591,inst_9595);
var inst_9597 = cljs_http.client.get.call(null,mike.flip.path,inst_9596);
var state_9604__$1 = state_9604;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_9604__$1,(2),inst_9597);
} else {
if((state_val_9605 === (2))){
var inst_9599 = (state_9604[(2)]);
var inst_9600 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(inst_9599);
var inst_9601 = cljs.core.partial.call(null,mike.flip.new_sentence,inst_9600);
var inst_9602 = cljs.core.swap_BANG_.call(null,mike.flip.state,inst_9601);
var state_9604__$1 = state_9604;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_9604__$1,inst_9602);
} else {
return null;
}
}
});})(c__6804__auto__))
;
return ((function (switch__6742__auto__,c__6804__auto__){
return (function() {
var mike$flip$fetch_sentence_$_state_machine__6743__auto__ = null;
var mike$flip$fetch_sentence_$_state_machine__6743__auto____0 = (function (){
var statearr_9609 = [null,null,null,null,null,null,null];
(statearr_9609[(0)] = mike$flip$fetch_sentence_$_state_machine__6743__auto__);

(statearr_9609[(1)] = (1));

return statearr_9609;
});
var mike$flip$fetch_sentence_$_state_machine__6743__auto____1 = (function (state_9604){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_9604);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e9610){if((e9610 instanceof Object)){
var ex__6746__auto__ = e9610;
var statearr_9611_9613 = state_9604;
(statearr_9611_9613[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_9604);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e9610;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__9614 = state_9604;
state_9604 = G__9614;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
mike$flip$fetch_sentence_$_state_machine__6743__auto__ = function(state_9604){
switch(arguments.length){
case 0:
return mike$flip$fetch_sentence_$_state_machine__6743__auto____0.call(this);
case 1:
return mike$flip$fetch_sentence_$_state_machine__6743__auto____1.call(this,state_9604);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
mike$flip$fetch_sentence_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = mike$flip$fetch_sentence_$_state_machine__6743__auto____0;
mike$flip$fetch_sentence_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = mike$flip$fetch_sentence_$_state_machine__6743__auto____1;
return mike$flip$fetch_sentence_$_state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto__))
})();
var state__6806__auto__ = (function (){var statearr_9612 = f__6805__auto__.call(null);
(statearr_9612[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto__);

return statearr_9612;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto__))
);

return c__6804__auto__;
});
mike.flip.thing = (function mike$flip$thing(sentence){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"section.snake","section.snake",1918682066),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.row","div.row",133678515),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.small-8.columns","div.small-8.columns",2028471097),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"button",new cljs.core.Keyword(null,"value","value",305978217),"Next",new cljs.core.Keyword(null,"on-click","on-click",1632826543),mike.flip.fetch_sentence], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),[cljs.core.str("This is sentence #"),cljs.core.str(new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(sentence))].join('')], null)], null)], null)], null);
});
mike.flip.swap_selection = (function mike$flip$swap_selection(selection){
var G__9616 = (((selection instanceof cljs.core.Keyword))?selection.fqn:null);
switch (G__9616) {
case "english":
return new cljs.core.Keyword(null,"italian","italian",2087411663);

break;
case "italian":
return new cljs.core.Keyword(null,"english","english",1087501909);

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(selection)].join('')));

}
});
mike.flip.app = (function mike$flip$app(){
var my_state = cljs.core.deref.call(null,mike.flip.state);
var map__9619 = cljs.core.deref.call(null,mike.flip.state);
var map__9619__$1 = ((cljs.core.seq_QMARK_.call(null,map__9619))?cljs.core.apply.call(null,cljs.core.hash_map,map__9619):map__9619);
var sentence = cljs.core.get.call(null,map__9619__$1,new cljs.core.Keyword(null,"sentence","sentence",2033657256));
var selected = cljs.core.get.call(null,map__9619__$1,new cljs.core.Keyword(null,"selected","selected",574897764));
var loading = cljs.core.get.call(null,map__9619__$1,new cljs.core.Keyword(null,"loading","loading",-737050189));
cljs.core.println.call(null,my_state);

return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"section#thing","section#thing",-899836273),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (my_state,map__9619,map__9619__$1,sentence,selected,loading){
return (function (e){
if(cljs.core.not.call(null,loading)){
return cljs.core.swap_BANG_.call(null,mike.flip.state,mike.flip.swap_selection);
} else {
return null;
}
});})(my_state,map__9619,map__9619__$1,sentence,selected,loading))
], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.row","div.row",133678515),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.large-12.columns.centered-text","div.large-12.columns.centered-text",-1741944671),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h1","h1",-1896887462),selected.call(null,sentence)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"section.snake","section.snake",1918682066),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.row","div.row",133678515),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.small-8.columns","div.small-8.columns",2028471097),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"button",new cljs.core.Keyword(null,"value","value",305978217),"Next",new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (my_state,map__9619,map__9619__$1,sentence,selected,loading){
return (function (e){
if(cljs.core.not.call(null,loading)){
return mike.flip.fetch_sentence.call(null);
} else {
return null;
}
});})(my_state,map__9619,map__9619__$1,sentence,selected,loading))
], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),[cljs.core.str("This is sentence #"),cljs.core.str(new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(sentence))].join('')], null)], null)], null)], null)], null);
});
mike.flip.start = (function mike$flip$start(){
mike.flip.fetch_sentence.call(null);

return reagent.core.render_component.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [mike.flip.app], null),document.getElementById("app"));
});

//# sourceMappingURL=flip.js.map