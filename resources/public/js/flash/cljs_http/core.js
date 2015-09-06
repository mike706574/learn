// Compiled by ClojureScript 0.0-3308 {}
goog.provide('cljs_http.core');
goog.require('cljs.core');
goog.require('goog.net.ErrorCode');
goog.require('goog.net.EventType');
goog.require('cljs.core.async');
goog.require('cljs_http.util');
goog.require('goog.net.Jsonp');
goog.require('clojure.string');
goog.require('goog.net.XhrIo');
cljs_http.core.pending_requests = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
/**
 * Attempt to close the given channel and abort the pending HTTP request
 * with which it is associated.
 */
cljs_http.core.abort_BANG_ = (function cljs_http$core$abort_BANG_(channel){
var temp__4423__auto__ = cljs.core.deref.call(null,cljs_http.core.pending_requests).call(null,channel);
if(cljs.core.truth_(temp__4423__auto__)){
var req = temp__4423__auto__;
cljs.core.swap_BANG_.call(null,cljs_http.core.pending_requests,cljs.core.dissoc,channel);

cljs.core.async.close_BANG_.call(null,channel);

if(cljs.core.truth_(req.hasOwnProperty("abort"))){
return req.abort();
} else {
return new cljs.core.Keyword(null,"jsonp","jsonp",226119588).cljs$core$IFn$_invoke$arity$1(req).cancel(new cljs.core.Keyword(null,"request","request",1772954723).cljs$core$IFn$_invoke$arity$1(req));
}
} else {
return null;
}
});
cljs_http.core.aborted_QMARK_ = (function cljs_http$core$aborted_QMARK_(xhr){
return cljs.core._EQ_.call(null,xhr.getLastErrorCode(),goog.net.ErrorCode.ABORT);
});
/**
 * Takes an XhrIo object and applies the default-headers to it.
 */
cljs_http.core.apply_default_headers_BANG_ = (function cljs_http$core$apply_default_headers_BANG_(xhr,headers){
var seq__10409 = cljs.core.seq.call(null,cljs.core.map.call(null,cljs_http.util.camelize,cljs.core.keys.call(null,headers)));
var chunk__10414 = null;
var count__10415 = (0);
var i__10416 = (0);
while(true){
if((i__10416 < count__10415)){
var h_name = cljs.core._nth.call(null,chunk__10414,i__10416);
var seq__10417_10421 = cljs.core.seq.call(null,cljs.core.vals.call(null,headers));
var chunk__10418_10422 = null;
var count__10419_10423 = (0);
var i__10420_10424 = (0);
while(true){
if((i__10420_10424 < count__10419_10423)){
var h_val_10425 = cljs.core._nth.call(null,chunk__10418_10422,i__10420_10424);
xhr.headers.set(h_name,h_val_10425);

var G__10426 = seq__10417_10421;
var G__10427 = chunk__10418_10422;
var G__10428 = count__10419_10423;
var G__10429 = (i__10420_10424 + (1));
seq__10417_10421 = G__10426;
chunk__10418_10422 = G__10427;
count__10419_10423 = G__10428;
i__10420_10424 = G__10429;
continue;
} else {
var temp__4423__auto___10430 = cljs.core.seq.call(null,seq__10417_10421);
if(temp__4423__auto___10430){
var seq__10417_10431__$1 = temp__4423__auto___10430;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10417_10431__$1)){
var c__5105__auto___10432 = cljs.core.chunk_first.call(null,seq__10417_10431__$1);
var G__10433 = cljs.core.chunk_rest.call(null,seq__10417_10431__$1);
var G__10434 = c__5105__auto___10432;
var G__10435 = cljs.core.count.call(null,c__5105__auto___10432);
var G__10436 = (0);
seq__10417_10421 = G__10433;
chunk__10418_10422 = G__10434;
count__10419_10423 = G__10435;
i__10420_10424 = G__10436;
continue;
} else {
var h_val_10437 = cljs.core.first.call(null,seq__10417_10431__$1);
xhr.headers.set(h_name,h_val_10437);

var G__10438 = cljs.core.next.call(null,seq__10417_10431__$1);
var G__10439 = null;
var G__10440 = (0);
var G__10441 = (0);
seq__10417_10421 = G__10438;
chunk__10418_10422 = G__10439;
count__10419_10423 = G__10440;
i__10420_10424 = G__10441;
continue;
}
} else {
}
}
break;
}

var G__10442 = seq__10409;
var G__10443 = chunk__10414;
var G__10444 = count__10415;
var G__10445 = (i__10416 + (1));
seq__10409 = G__10442;
chunk__10414 = G__10443;
count__10415 = G__10444;
i__10416 = G__10445;
continue;
} else {
var temp__4423__auto__ = cljs.core.seq.call(null,seq__10409);
if(temp__4423__auto__){
var seq__10409__$1 = temp__4423__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10409__$1)){
var c__5105__auto__ = cljs.core.chunk_first.call(null,seq__10409__$1);
var G__10446 = cljs.core.chunk_rest.call(null,seq__10409__$1);
var G__10447 = c__5105__auto__;
var G__10448 = cljs.core.count.call(null,c__5105__auto__);
var G__10449 = (0);
seq__10409 = G__10446;
chunk__10414 = G__10447;
count__10415 = G__10448;
i__10416 = G__10449;
continue;
} else {
var h_name = cljs.core.first.call(null,seq__10409__$1);
var seq__10410_10450 = cljs.core.seq.call(null,cljs.core.vals.call(null,headers));
var chunk__10411_10451 = null;
var count__10412_10452 = (0);
var i__10413_10453 = (0);
while(true){
if((i__10413_10453 < count__10412_10452)){
var h_val_10454 = cljs.core._nth.call(null,chunk__10411_10451,i__10413_10453);
xhr.headers.set(h_name,h_val_10454);

var G__10455 = seq__10410_10450;
var G__10456 = chunk__10411_10451;
var G__10457 = count__10412_10452;
var G__10458 = (i__10413_10453 + (1));
seq__10410_10450 = G__10455;
chunk__10411_10451 = G__10456;
count__10412_10452 = G__10457;
i__10413_10453 = G__10458;
continue;
} else {
var temp__4423__auto___10459__$1 = cljs.core.seq.call(null,seq__10410_10450);
if(temp__4423__auto___10459__$1){
var seq__10410_10460__$1 = temp__4423__auto___10459__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10410_10460__$1)){
var c__5105__auto___10461 = cljs.core.chunk_first.call(null,seq__10410_10460__$1);
var G__10462 = cljs.core.chunk_rest.call(null,seq__10410_10460__$1);
var G__10463 = c__5105__auto___10461;
var G__10464 = cljs.core.count.call(null,c__5105__auto___10461);
var G__10465 = (0);
seq__10410_10450 = G__10462;
chunk__10411_10451 = G__10463;
count__10412_10452 = G__10464;
i__10413_10453 = G__10465;
continue;
} else {
var h_val_10466 = cljs.core.first.call(null,seq__10410_10460__$1);
xhr.headers.set(h_name,h_val_10466);

var G__10467 = cljs.core.next.call(null,seq__10410_10460__$1);
var G__10468 = null;
var G__10469 = (0);
var G__10470 = (0);
seq__10410_10450 = G__10467;
chunk__10411_10451 = G__10468;
count__10412_10452 = G__10469;
i__10413_10453 = G__10470;
continue;
}
} else {
}
}
break;
}

var G__10471 = cljs.core.next.call(null,seq__10409__$1);
var G__10472 = null;
var G__10473 = (0);
var G__10474 = (0);
seq__10409 = G__10471;
chunk__10414 = G__10472;
count__10415 = G__10473;
i__10416 = G__10474;
continue;
}
} else {
return null;
}
}
break;
}
});
/**
 * Builds an XhrIo object from the request parameters.
 */
cljs_http.core.build_xhr = (function cljs_http$core$build_xhr(p__10475){
var map__10478 = p__10475;
var map__10478__$1 = ((cljs.core.seq_QMARK_.call(null,map__10478))?cljs.core.apply.call(null,cljs.core.hash_map,map__10478):map__10478);
var request = map__10478__$1;
var with_credentials_QMARK_ = cljs.core.get.call(null,map__10478__$1,new cljs.core.Keyword(null,"with-credentials?","with-credentials?",-1773202222));
var default_headers = cljs.core.get.call(null,map__10478__$1,new cljs.core.Keyword(null,"default-headers","default-headers",-43146094));
var timeout = (function (){var or__4320__auto__ = new cljs.core.Keyword(null,"timeout","timeout",-318625318).cljs$core$IFn$_invoke$arity$1(request);
if(cljs.core.truth_(or__4320__auto__)){
return or__4320__auto__;
} else {
return (0);
}
})();
var send_credentials = (((with_credentials_QMARK_ == null))?true:with_credentials_QMARK_);
var G__10479 = (new goog.net.XhrIo());
cljs_http.core.apply_default_headers_BANG_.call(null,G__10479,default_headers);

G__10479.setTimeoutInterval(timeout);

G__10479.setWithCredentials(send_credentials);

return G__10479;
});
cljs_http.core.error_kw = cljs.core.PersistentHashMap.fromArrays([(0),(7),(1),(4),(6),(3),(2),(9),(5),(8)],[new cljs.core.Keyword(null,"no-error","no-error",1984610064),new cljs.core.Keyword(null,"abort","abort",521193198),new cljs.core.Keyword(null,"access-denied","access-denied",959449406),new cljs.core.Keyword(null,"custom-error","custom-error",-1565161123),new cljs.core.Keyword(null,"http-error","http-error",-1040049553),new cljs.core.Keyword(null,"ff-silent-error","ff-silent-error",189390514),new cljs.core.Keyword(null,"file-not-found","file-not-found",-65398940),new cljs.core.Keyword(null,"offline","offline",-107631935),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"timeout","timeout",-318625318)]);
/**
 * Execute the HTTP request corresponding to the given Ring request
 * map and return a core.async channel.
 */
cljs_http.core.xhr = (function cljs_http$core$xhr(p__10480){
var map__10506 = p__10480;
var map__10506__$1 = ((cljs.core.seq_QMARK_.call(null,map__10506))?cljs.core.apply.call(null,cljs.core.hash_map,map__10506):map__10506);
var request = map__10506__$1;
var request_method = cljs.core.get.call(null,map__10506__$1,new cljs.core.Keyword(null,"request-method","request-method",1764796830));
var headers = cljs.core.get.call(null,map__10506__$1,new cljs.core.Keyword(null,"headers","headers",-835030129));
var body = cljs.core.get.call(null,map__10506__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var with_credentials_QMARK_ = cljs.core.get.call(null,map__10506__$1,new cljs.core.Keyword(null,"with-credentials?","with-credentials?",-1773202222));
var cancel = cljs.core.get.call(null,map__10506__$1,new cljs.core.Keyword(null,"cancel","cancel",-1964088360));
var channel = cljs.core.async.chan.call(null);
var request_url = cljs_http.util.build_url.call(null,request);
var method = cljs.core.name.call(null,(function (){var or__4320__auto__ = request_method;
if(cljs.core.truth_(or__4320__auto__)){
return or__4320__auto__;
} else {
return new cljs.core.Keyword(null,"get","get",1683182755);
}
})());
var headers__$1 = cljs_http.util.build_headers.call(null,headers);
var xhr__$1 = cljs_http.core.build_xhr.call(null,request);
cljs.core.swap_BANG_.call(null,cljs_http.core.pending_requests,cljs.core.assoc,channel,xhr__$1);

xhr__$1.listen(goog.net.EventType.COMPLETE,((function (channel,request_url,method,headers__$1,xhr__$1,map__10506,map__10506__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel){
return (function (evt){
var target = evt.target;
var response = new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"status","status",-1997798413),target.getStatus(),new cljs.core.Keyword(null,"success","success",1890645906),target.isSuccess(),new cljs.core.Keyword(null,"body","body",-2049205669),target.getResponseText(),new cljs.core.Keyword(null,"headers","headers",-835030129),cljs_http.util.parse_headers.call(null,target.getAllResponseHeaders()),new cljs.core.Keyword(null,"trace-redirects","trace-redirects",-1149427907),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [request_url,target.getLastUri()], null),new cljs.core.Keyword(null,"error-code","error-code",180497232),cljs_http.core.error_kw.call(null,target.getLastErrorCode()),new cljs.core.Keyword(null,"error-text","error-text",2021893718),target.getLastError()], null);
if(cljs.core.not.call(null,cljs_http.core.aborted_QMARK_.call(null,xhr__$1))){
cljs.core.async.put_BANG_.call(null,channel,response);
} else {
}

cljs.core.swap_BANG_.call(null,cljs_http.core.pending_requests,cljs.core.dissoc,channel);

if(cljs.core.truth_(cancel)){
cljs.core.async.close_BANG_.call(null,cancel);
} else {
}

return cljs.core.async.close_BANG_.call(null,channel);
});})(channel,request_url,method,headers__$1,xhr__$1,map__10506,map__10506__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel))
);

xhr__$1.send(request_url,method,body,headers__$1);

if(cljs.core.truth_(cancel)){
var c__6804__auto___10531 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto___10531,channel,request_url,method,headers__$1,xhr__$1,map__10506,map__10506__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto___10531,channel,request_url,method,headers__$1,xhr__$1,map__10506,map__10506__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel){
return (function (state_10517){
var state_val_10518 = (state_10517[(1)]);
if((state_val_10518 === (1))){
var state_10517__$1 = state_10517;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10517__$1,(2),cancel);
} else {
if((state_val_10518 === (2))){
var inst_10508 = (state_10517[(2)]);
var inst_10509 = xhr__$1.isComplete();
var inst_10510 = cljs.core.not.call(null,inst_10509);
var state_10517__$1 = (function (){var statearr_10519 = state_10517;
(statearr_10519[(7)] = inst_10508);

return statearr_10519;
})();
if(inst_10510){
var statearr_10520_10532 = state_10517__$1;
(statearr_10520_10532[(1)] = (3));

} else {
var statearr_10521_10533 = state_10517__$1;
(statearr_10521_10533[(1)] = (4));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10518 === (3))){
var inst_10512 = xhr__$1.abort();
var state_10517__$1 = state_10517;
var statearr_10522_10534 = state_10517__$1;
(statearr_10522_10534[(2)] = inst_10512);

(statearr_10522_10534[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10518 === (4))){
var state_10517__$1 = state_10517;
var statearr_10523_10535 = state_10517__$1;
(statearr_10523_10535[(2)] = null);

(statearr_10523_10535[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10518 === (5))){
var inst_10515 = (state_10517[(2)]);
var state_10517__$1 = state_10517;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10517__$1,inst_10515);
} else {
return null;
}
}
}
}
}
});})(c__6804__auto___10531,channel,request_url,method,headers__$1,xhr__$1,map__10506,map__10506__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel))
;
return ((function (switch__6742__auto__,c__6804__auto___10531,channel,request_url,method,headers__$1,xhr__$1,map__10506,map__10506__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel){
return (function() {
var cljs_http$core$xhr_$_state_machine__6743__auto__ = null;
var cljs_http$core$xhr_$_state_machine__6743__auto____0 = (function (){
var statearr_10527 = [null,null,null,null,null,null,null,null];
(statearr_10527[(0)] = cljs_http$core$xhr_$_state_machine__6743__auto__);

(statearr_10527[(1)] = (1));

return statearr_10527;
});
var cljs_http$core$xhr_$_state_machine__6743__auto____1 = (function (state_10517){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_10517);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e10528){if((e10528 instanceof Object)){
var ex__6746__auto__ = e10528;
var statearr_10529_10536 = state_10517;
(statearr_10529_10536[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10517);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10528;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__10537 = state_10517;
state_10517 = G__10537;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs_http$core$xhr_$_state_machine__6743__auto__ = function(state_10517){
switch(arguments.length){
case 0:
return cljs_http$core$xhr_$_state_machine__6743__auto____0.call(this);
case 1:
return cljs_http$core$xhr_$_state_machine__6743__auto____1.call(this,state_10517);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs_http$core$xhr_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs_http$core$xhr_$_state_machine__6743__auto____0;
cljs_http$core$xhr_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs_http$core$xhr_$_state_machine__6743__auto____1;
return cljs_http$core$xhr_$_state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto___10531,channel,request_url,method,headers__$1,xhr__$1,map__10506,map__10506__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel))
})();
var state__6806__auto__ = (function (){var statearr_10530 = f__6805__auto__.call(null);
(statearr_10530[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto___10531);

return statearr_10530;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto___10531,channel,request_url,method,headers__$1,xhr__$1,map__10506,map__10506__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel))
);

} else {
}

return channel;
});
/**
 * Execute the JSONP request corresponding to the given Ring request
 * map and return a core.async channel.
 */
cljs_http.core.jsonp = (function cljs_http$core$jsonp(p__10538){
var map__10554 = p__10538;
var map__10554__$1 = ((cljs.core.seq_QMARK_.call(null,map__10554))?cljs.core.apply.call(null,cljs.core.hash_map,map__10554):map__10554);
var request = map__10554__$1;
var timeout = cljs.core.get.call(null,map__10554__$1,new cljs.core.Keyword(null,"timeout","timeout",-318625318));
var callback_name = cljs.core.get.call(null,map__10554__$1,new cljs.core.Keyword(null,"callback-name","callback-name",336964714));
var cancel = cljs.core.get.call(null,map__10554__$1,new cljs.core.Keyword(null,"cancel","cancel",-1964088360));
var channel = cljs.core.async.chan.call(null);
var jsonp__$1 = (new goog.net.Jsonp(cljs_http.util.build_url.call(null,request),callback_name));
jsonp__$1.setRequestTimeout(timeout);

var req_10569 = jsonp__$1.send(null,((function (channel,jsonp__$1,map__10554,map__10554__$1,request,timeout,callback_name,cancel){
return (function cljs_http$core$jsonp_$_success_callback(data){
var response = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"status","status",-1997798413),(200),new cljs.core.Keyword(null,"success","success",1890645906),true,new cljs.core.Keyword(null,"body","body",-2049205669),cljs.core.js__GT_clj.call(null,data,new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true)], null);
cljs.core.async.put_BANG_.call(null,channel,response);

cljs.core.swap_BANG_.call(null,cljs_http.core.pending_requests,cljs.core.dissoc,channel);

if(cljs.core.truth_(cancel)){
cljs.core.async.close_BANG_.call(null,cancel);
} else {
}

return cljs.core.async.close_BANG_.call(null,channel);
});})(channel,jsonp__$1,map__10554,map__10554__$1,request,timeout,callback_name,cancel))
,((function (channel,jsonp__$1,map__10554,map__10554__$1,request,timeout,callback_name,cancel){
return (function cljs_http$core$jsonp_$_error_callback(){
cljs.core.swap_BANG_.call(null,cljs_http.core.pending_requests,cljs.core.dissoc,channel);

if(cljs.core.truth_(cancel)){
cljs.core.async.close_BANG_.call(null,cancel);
} else {
}

return cljs.core.async.close_BANG_.call(null,channel);
});})(channel,jsonp__$1,map__10554,map__10554__$1,request,timeout,callback_name,cancel))
);
cljs.core.swap_BANG_.call(null,cljs_http.core.pending_requests,cljs.core.assoc,channel,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"jsonp","jsonp",226119588),jsonp__$1,new cljs.core.Keyword(null,"request","request",1772954723),req_10569], null));

if(cljs.core.truth_(cancel)){
var c__6804__auto___10570 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto___10570,req_10569,channel,jsonp__$1,map__10554,map__10554__$1,request,timeout,callback_name,cancel){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto___10570,req_10569,channel,jsonp__$1,map__10554,map__10554__$1,request,timeout,callback_name,cancel){
return (function (state_10559){
var state_val_10560 = (state_10559[(1)]);
if((state_val_10560 === (1))){
var state_10559__$1 = state_10559;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10559__$1,(2),cancel);
} else {
if((state_val_10560 === (2))){
var inst_10556 = (state_10559[(2)]);
var inst_10557 = jsonp__$1.cancel(req_10569);
var state_10559__$1 = (function (){var statearr_10561 = state_10559;
(statearr_10561[(7)] = inst_10556);

return statearr_10561;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10559__$1,inst_10557);
} else {
return null;
}
}
});})(c__6804__auto___10570,req_10569,channel,jsonp__$1,map__10554,map__10554__$1,request,timeout,callback_name,cancel))
;
return ((function (switch__6742__auto__,c__6804__auto___10570,req_10569,channel,jsonp__$1,map__10554,map__10554__$1,request,timeout,callback_name,cancel){
return (function() {
var cljs_http$core$jsonp_$_state_machine__6743__auto__ = null;
var cljs_http$core$jsonp_$_state_machine__6743__auto____0 = (function (){
var statearr_10565 = [null,null,null,null,null,null,null,null];
(statearr_10565[(0)] = cljs_http$core$jsonp_$_state_machine__6743__auto__);

(statearr_10565[(1)] = (1));

return statearr_10565;
});
var cljs_http$core$jsonp_$_state_machine__6743__auto____1 = (function (state_10559){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_10559);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e10566){if((e10566 instanceof Object)){
var ex__6746__auto__ = e10566;
var statearr_10567_10571 = state_10559;
(statearr_10567_10571[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10559);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10566;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__10572 = state_10559;
state_10559 = G__10572;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs_http$core$jsonp_$_state_machine__6743__auto__ = function(state_10559){
switch(arguments.length){
case 0:
return cljs_http$core$jsonp_$_state_machine__6743__auto____0.call(this);
case 1:
return cljs_http$core$jsonp_$_state_machine__6743__auto____1.call(this,state_10559);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs_http$core$jsonp_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs_http$core$jsonp_$_state_machine__6743__auto____0;
cljs_http$core$jsonp_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs_http$core$jsonp_$_state_machine__6743__auto____1;
return cljs_http$core$jsonp_$_state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto___10570,req_10569,channel,jsonp__$1,map__10554,map__10554__$1,request,timeout,callback_name,cancel))
})();
var state__6806__auto__ = (function (){var statearr_10568 = f__6805__auto__.call(null);
(statearr_10568[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto___10570);

return statearr_10568;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto___10570,req_10569,channel,jsonp__$1,map__10554,map__10554__$1,request,timeout,callback_name,cancel))
);

} else {
}

return channel;
});
/**
 * Execute the HTTP request corresponding to the given Ring request
 * map and return a core.async channel.
 */
cljs_http.core.request = (function cljs_http$core$request(p__10573){
var map__10575 = p__10573;
var map__10575__$1 = ((cljs.core.seq_QMARK_.call(null,map__10575))?cljs.core.apply.call(null,cljs.core.hash_map,map__10575):map__10575);
var request__$1 = map__10575__$1;
var request_method = cljs.core.get.call(null,map__10575__$1,new cljs.core.Keyword(null,"request-method","request-method",1764796830));
if(cljs.core._EQ_.call(null,request_method,new cljs.core.Keyword(null,"jsonp","jsonp",226119588))){
return cljs_http.core.jsonp.call(null,request__$1);
} else {
return cljs_http.core.xhr.call(null,request__$1);
}
});

//# sourceMappingURL=core.js.map