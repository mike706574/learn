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
var seq__10313 = cljs.core.seq.call(null,cljs.core.map.call(null,cljs_http.util.camelize,cljs.core.keys.call(null,headers)));
var chunk__10318 = null;
var count__10319 = (0);
var i__10320 = (0);
while(true){
if((i__10320 < count__10319)){
var h_name = cljs.core._nth.call(null,chunk__10318,i__10320);
var seq__10321_10325 = cljs.core.seq.call(null,cljs.core.vals.call(null,headers));
var chunk__10322_10326 = null;
var count__10323_10327 = (0);
var i__10324_10328 = (0);
while(true){
if((i__10324_10328 < count__10323_10327)){
var h_val_10329 = cljs.core._nth.call(null,chunk__10322_10326,i__10324_10328);
xhr.headers.set(h_name,h_val_10329);

var G__10330 = seq__10321_10325;
var G__10331 = chunk__10322_10326;
var G__10332 = count__10323_10327;
var G__10333 = (i__10324_10328 + (1));
seq__10321_10325 = G__10330;
chunk__10322_10326 = G__10331;
count__10323_10327 = G__10332;
i__10324_10328 = G__10333;
continue;
} else {
var temp__4423__auto___10334 = cljs.core.seq.call(null,seq__10321_10325);
if(temp__4423__auto___10334){
var seq__10321_10335__$1 = temp__4423__auto___10334;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10321_10335__$1)){
var c__5105__auto___10336 = cljs.core.chunk_first.call(null,seq__10321_10335__$1);
var G__10337 = cljs.core.chunk_rest.call(null,seq__10321_10335__$1);
var G__10338 = c__5105__auto___10336;
var G__10339 = cljs.core.count.call(null,c__5105__auto___10336);
var G__10340 = (0);
seq__10321_10325 = G__10337;
chunk__10322_10326 = G__10338;
count__10323_10327 = G__10339;
i__10324_10328 = G__10340;
continue;
} else {
var h_val_10341 = cljs.core.first.call(null,seq__10321_10335__$1);
xhr.headers.set(h_name,h_val_10341);

var G__10342 = cljs.core.next.call(null,seq__10321_10335__$1);
var G__10343 = null;
var G__10344 = (0);
var G__10345 = (0);
seq__10321_10325 = G__10342;
chunk__10322_10326 = G__10343;
count__10323_10327 = G__10344;
i__10324_10328 = G__10345;
continue;
}
} else {
}
}
break;
}

var G__10346 = seq__10313;
var G__10347 = chunk__10318;
var G__10348 = count__10319;
var G__10349 = (i__10320 + (1));
seq__10313 = G__10346;
chunk__10318 = G__10347;
count__10319 = G__10348;
i__10320 = G__10349;
continue;
} else {
var temp__4423__auto__ = cljs.core.seq.call(null,seq__10313);
if(temp__4423__auto__){
var seq__10313__$1 = temp__4423__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10313__$1)){
var c__5105__auto__ = cljs.core.chunk_first.call(null,seq__10313__$1);
var G__10350 = cljs.core.chunk_rest.call(null,seq__10313__$1);
var G__10351 = c__5105__auto__;
var G__10352 = cljs.core.count.call(null,c__5105__auto__);
var G__10353 = (0);
seq__10313 = G__10350;
chunk__10318 = G__10351;
count__10319 = G__10352;
i__10320 = G__10353;
continue;
} else {
var h_name = cljs.core.first.call(null,seq__10313__$1);
var seq__10314_10354 = cljs.core.seq.call(null,cljs.core.vals.call(null,headers));
var chunk__10315_10355 = null;
var count__10316_10356 = (0);
var i__10317_10357 = (0);
while(true){
if((i__10317_10357 < count__10316_10356)){
var h_val_10358 = cljs.core._nth.call(null,chunk__10315_10355,i__10317_10357);
xhr.headers.set(h_name,h_val_10358);

var G__10359 = seq__10314_10354;
var G__10360 = chunk__10315_10355;
var G__10361 = count__10316_10356;
var G__10362 = (i__10317_10357 + (1));
seq__10314_10354 = G__10359;
chunk__10315_10355 = G__10360;
count__10316_10356 = G__10361;
i__10317_10357 = G__10362;
continue;
} else {
var temp__4423__auto___10363__$1 = cljs.core.seq.call(null,seq__10314_10354);
if(temp__4423__auto___10363__$1){
var seq__10314_10364__$1 = temp__4423__auto___10363__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10314_10364__$1)){
var c__5105__auto___10365 = cljs.core.chunk_first.call(null,seq__10314_10364__$1);
var G__10366 = cljs.core.chunk_rest.call(null,seq__10314_10364__$1);
var G__10367 = c__5105__auto___10365;
var G__10368 = cljs.core.count.call(null,c__5105__auto___10365);
var G__10369 = (0);
seq__10314_10354 = G__10366;
chunk__10315_10355 = G__10367;
count__10316_10356 = G__10368;
i__10317_10357 = G__10369;
continue;
} else {
var h_val_10370 = cljs.core.first.call(null,seq__10314_10364__$1);
xhr.headers.set(h_name,h_val_10370);

var G__10371 = cljs.core.next.call(null,seq__10314_10364__$1);
var G__10372 = null;
var G__10373 = (0);
var G__10374 = (0);
seq__10314_10354 = G__10371;
chunk__10315_10355 = G__10372;
count__10316_10356 = G__10373;
i__10317_10357 = G__10374;
continue;
}
} else {
}
}
break;
}

var G__10375 = cljs.core.next.call(null,seq__10313__$1);
var G__10376 = null;
var G__10377 = (0);
var G__10378 = (0);
seq__10313 = G__10375;
chunk__10318 = G__10376;
count__10319 = G__10377;
i__10320 = G__10378;
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
cljs_http.core.build_xhr = (function cljs_http$core$build_xhr(p__10379){
var map__10382 = p__10379;
var map__10382__$1 = ((cljs.core.seq_QMARK_.call(null,map__10382))?cljs.core.apply.call(null,cljs.core.hash_map,map__10382):map__10382);
var request = map__10382__$1;
var with_credentials_QMARK_ = cljs.core.get.call(null,map__10382__$1,new cljs.core.Keyword(null,"with-credentials?","with-credentials?",-1773202222));
var default_headers = cljs.core.get.call(null,map__10382__$1,new cljs.core.Keyword(null,"default-headers","default-headers",-43146094));
var timeout = (function (){var or__4320__auto__ = new cljs.core.Keyword(null,"timeout","timeout",-318625318).cljs$core$IFn$_invoke$arity$1(request);
if(cljs.core.truth_(or__4320__auto__)){
return or__4320__auto__;
} else {
return (0);
}
})();
var send_credentials = (((with_credentials_QMARK_ == null))?true:with_credentials_QMARK_);
var G__10383 = (new goog.net.XhrIo());
cljs_http.core.apply_default_headers_BANG_.call(null,G__10383,default_headers);

G__10383.setTimeoutInterval(timeout);

G__10383.setWithCredentials(send_credentials);

return G__10383;
});
cljs_http.core.error_kw = cljs.core.PersistentHashMap.fromArrays([(0),(7),(1),(4),(6),(3),(2),(9),(5),(8)],[new cljs.core.Keyword(null,"no-error","no-error",1984610064),new cljs.core.Keyword(null,"abort","abort",521193198),new cljs.core.Keyword(null,"access-denied","access-denied",959449406),new cljs.core.Keyword(null,"custom-error","custom-error",-1565161123),new cljs.core.Keyword(null,"http-error","http-error",-1040049553),new cljs.core.Keyword(null,"ff-silent-error","ff-silent-error",189390514),new cljs.core.Keyword(null,"file-not-found","file-not-found",-65398940),new cljs.core.Keyword(null,"offline","offline",-107631935),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"timeout","timeout",-318625318)]);
/**
 * Execute the HTTP request corresponding to the given Ring request
 * map and return a core.async channel.
 */
cljs_http.core.xhr = (function cljs_http$core$xhr(p__10384){
var map__10410 = p__10384;
var map__10410__$1 = ((cljs.core.seq_QMARK_.call(null,map__10410))?cljs.core.apply.call(null,cljs.core.hash_map,map__10410):map__10410);
var request = map__10410__$1;
var request_method = cljs.core.get.call(null,map__10410__$1,new cljs.core.Keyword(null,"request-method","request-method",1764796830));
var headers = cljs.core.get.call(null,map__10410__$1,new cljs.core.Keyword(null,"headers","headers",-835030129));
var body = cljs.core.get.call(null,map__10410__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var with_credentials_QMARK_ = cljs.core.get.call(null,map__10410__$1,new cljs.core.Keyword(null,"with-credentials?","with-credentials?",-1773202222));
var cancel = cljs.core.get.call(null,map__10410__$1,new cljs.core.Keyword(null,"cancel","cancel",-1964088360));
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

xhr__$1.listen(goog.net.EventType.COMPLETE,((function (channel,request_url,method,headers__$1,xhr__$1,map__10410,map__10410__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel){
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
});})(channel,request_url,method,headers__$1,xhr__$1,map__10410,map__10410__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel))
);

xhr__$1.send(request_url,method,body,headers__$1);

if(cljs.core.truth_(cancel)){
var c__6804__auto___10435 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto___10435,channel,request_url,method,headers__$1,xhr__$1,map__10410,map__10410__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto___10435,channel,request_url,method,headers__$1,xhr__$1,map__10410,map__10410__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel){
return (function (state_10421){
var state_val_10422 = (state_10421[(1)]);
if((state_val_10422 === (1))){
var state_10421__$1 = state_10421;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10421__$1,(2),cancel);
} else {
if((state_val_10422 === (2))){
var inst_10412 = (state_10421[(2)]);
var inst_10413 = xhr__$1.isComplete();
var inst_10414 = cljs.core.not.call(null,inst_10413);
var state_10421__$1 = (function (){var statearr_10423 = state_10421;
(statearr_10423[(7)] = inst_10412);

return statearr_10423;
})();
if(inst_10414){
var statearr_10424_10436 = state_10421__$1;
(statearr_10424_10436[(1)] = (3));

} else {
var statearr_10425_10437 = state_10421__$1;
(statearr_10425_10437[(1)] = (4));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10422 === (3))){
var inst_10416 = xhr__$1.abort();
var state_10421__$1 = state_10421;
var statearr_10426_10438 = state_10421__$1;
(statearr_10426_10438[(2)] = inst_10416);

(statearr_10426_10438[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10422 === (4))){
var state_10421__$1 = state_10421;
var statearr_10427_10439 = state_10421__$1;
(statearr_10427_10439[(2)] = null);

(statearr_10427_10439[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10422 === (5))){
var inst_10419 = (state_10421[(2)]);
var state_10421__$1 = state_10421;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10421__$1,inst_10419);
} else {
return null;
}
}
}
}
}
});})(c__6804__auto___10435,channel,request_url,method,headers__$1,xhr__$1,map__10410,map__10410__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel))
;
return ((function (switch__6742__auto__,c__6804__auto___10435,channel,request_url,method,headers__$1,xhr__$1,map__10410,map__10410__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel){
return (function() {
var cljs_http$core$xhr_$_state_machine__6743__auto__ = null;
var cljs_http$core$xhr_$_state_machine__6743__auto____0 = (function (){
var statearr_10431 = [null,null,null,null,null,null,null,null];
(statearr_10431[(0)] = cljs_http$core$xhr_$_state_machine__6743__auto__);

(statearr_10431[(1)] = (1));

return statearr_10431;
});
var cljs_http$core$xhr_$_state_machine__6743__auto____1 = (function (state_10421){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_10421);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e10432){if((e10432 instanceof Object)){
var ex__6746__auto__ = e10432;
var statearr_10433_10440 = state_10421;
(statearr_10433_10440[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10421);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10432;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__10441 = state_10421;
state_10421 = G__10441;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs_http$core$xhr_$_state_machine__6743__auto__ = function(state_10421){
switch(arguments.length){
case 0:
return cljs_http$core$xhr_$_state_machine__6743__auto____0.call(this);
case 1:
return cljs_http$core$xhr_$_state_machine__6743__auto____1.call(this,state_10421);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs_http$core$xhr_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs_http$core$xhr_$_state_machine__6743__auto____0;
cljs_http$core$xhr_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs_http$core$xhr_$_state_machine__6743__auto____1;
return cljs_http$core$xhr_$_state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto___10435,channel,request_url,method,headers__$1,xhr__$1,map__10410,map__10410__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel))
})();
var state__6806__auto__ = (function (){var statearr_10434 = f__6805__auto__.call(null);
(statearr_10434[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto___10435);

return statearr_10434;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto___10435,channel,request_url,method,headers__$1,xhr__$1,map__10410,map__10410__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel))
);

} else {
}

return channel;
});
/**
 * Execute the JSONP request corresponding to the given Ring request
 * map and return a core.async channel.
 */
cljs_http.core.jsonp = (function cljs_http$core$jsonp(p__10442){
var map__10458 = p__10442;
var map__10458__$1 = ((cljs.core.seq_QMARK_.call(null,map__10458))?cljs.core.apply.call(null,cljs.core.hash_map,map__10458):map__10458);
var request = map__10458__$1;
var timeout = cljs.core.get.call(null,map__10458__$1,new cljs.core.Keyword(null,"timeout","timeout",-318625318));
var callback_name = cljs.core.get.call(null,map__10458__$1,new cljs.core.Keyword(null,"callback-name","callback-name",336964714));
var cancel = cljs.core.get.call(null,map__10458__$1,new cljs.core.Keyword(null,"cancel","cancel",-1964088360));
var channel = cljs.core.async.chan.call(null);
var jsonp__$1 = (new goog.net.Jsonp(cljs_http.util.build_url.call(null,request),callback_name));
jsonp__$1.setRequestTimeout(timeout);

var req_10473 = jsonp__$1.send(null,((function (channel,jsonp__$1,map__10458,map__10458__$1,request,timeout,callback_name,cancel){
return (function cljs_http$core$jsonp_$_success_callback(data){
var response = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"status","status",-1997798413),(200),new cljs.core.Keyword(null,"success","success",1890645906),true,new cljs.core.Keyword(null,"body","body",-2049205669),cljs.core.js__GT_clj.call(null,data,new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true)], null);
cljs.core.async.put_BANG_.call(null,channel,response);

cljs.core.swap_BANG_.call(null,cljs_http.core.pending_requests,cljs.core.dissoc,channel);

if(cljs.core.truth_(cancel)){
cljs.core.async.close_BANG_.call(null,cancel);
} else {
}

return cljs.core.async.close_BANG_.call(null,channel);
});})(channel,jsonp__$1,map__10458,map__10458__$1,request,timeout,callback_name,cancel))
,((function (channel,jsonp__$1,map__10458,map__10458__$1,request,timeout,callback_name,cancel){
return (function cljs_http$core$jsonp_$_error_callback(){
cljs.core.swap_BANG_.call(null,cljs_http.core.pending_requests,cljs.core.dissoc,channel);

if(cljs.core.truth_(cancel)){
cljs.core.async.close_BANG_.call(null,cancel);
} else {
}

return cljs.core.async.close_BANG_.call(null,channel);
});})(channel,jsonp__$1,map__10458,map__10458__$1,request,timeout,callback_name,cancel))
);
cljs.core.swap_BANG_.call(null,cljs_http.core.pending_requests,cljs.core.assoc,channel,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"jsonp","jsonp",226119588),jsonp__$1,new cljs.core.Keyword(null,"request","request",1772954723),req_10473], null));

if(cljs.core.truth_(cancel)){
var c__6804__auto___10474 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto___10474,req_10473,channel,jsonp__$1,map__10458,map__10458__$1,request,timeout,callback_name,cancel){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto___10474,req_10473,channel,jsonp__$1,map__10458,map__10458__$1,request,timeout,callback_name,cancel){
return (function (state_10463){
var state_val_10464 = (state_10463[(1)]);
if((state_val_10464 === (1))){
var state_10463__$1 = state_10463;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10463__$1,(2),cancel);
} else {
if((state_val_10464 === (2))){
var inst_10460 = (state_10463[(2)]);
var inst_10461 = jsonp__$1.cancel(req_10473);
var state_10463__$1 = (function (){var statearr_10465 = state_10463;
(statearr_10465[(7)] = inst_10460);

return statearr_10465;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10463__$1,inst_10461);
} else {
return null;
}
}
});})(c__6804__auto___10474,req_10473,channel,jsonp__$1,map__10458,map__10458__$1,request,timeout,callback_name,cancel))
;
return ((function (switch__6742__auto__,c__6804__auto___10474,req_10473,channel,jsonp__$1,map__10458,map__10458__$1,request,timeout,callback_name,cancel){
return (function() {
var cljs_http$core$jsonp_$_state_machine__6743__auto__ = null;
var cljs_http$core$jsonp_$_state_machine__6743__auto____0 = (function (){
var statearr_10469 = [null,null,null,null,null,null,null,null];
(statearr_10469[(0)] = cljs_http$core$jsonp_$_state_machine__6743__auto__);

(statearr_10469[(1)] = (1));

return statearr_10469;
});
var cljs_http$core$jsonp_$_state_machine__6743__auto____1 = (function (state_10463){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_10463);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e10470){if((e10470 instanceof Object)){
var ex__6746__auto__ = e10470;
var statearr_10471_10475 = state_10463;
(statearr_10471_10475[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10463);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10470;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__10476 = state_10463;
state_10463 = G__10476;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs_http$core$jsonp_$_state_machine__6743__auto__ = function(state_10463){
switch(arguments.length){
case 0:
return cljs_http$core$jsonp_$_state_machine__6743__auto____0.call(this);
case 1:
return cljs_http$core$jsonp_$_state_machine__6743__auto____1.call(this,state_10463);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs_http$core$jsonp_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs_http$core$jsonp_$_state_machine__6743__auto____0;
cljs_http$core$jsonp_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs_http$core$jsonp_$_state_machine__6743__auto____1;
return cljs_http$core$jsonp_$_state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto___10474,req_10473,channel,jsonp__$1,map__10458,map__10458__$1,request,timeout,callback_name,cancel))
})();
var state__6806__auto__ = (function (){var statearr_10472 = f__6805__auto__.call(null);
(statearr_10472[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto___10474);

return statearr_10472;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto___10474,req_10473,channel,jsonp__$1,map__10458,map__10458__$1,request,timeout,callback_name,cancel))
);

} else {
}

return channel;
});
/**
 * Execute the HTTP request corresponding to the given Ring request
 * map and return a core.async channel.
 */
cljs_http.core.request = (function cljs_http$core$request(p__10477){
var map__10479 = p__10477;
var map__10479__$1 = ((cljs.core.seq_QMARK_.call(null,map__10479))?cljs.core.apply.call(null,cljs.core.hash_map,map__10479):map__10479);
var request__$1 = map__10479__$1;
var request_method = cljs.core.get.call(null,map__10479__$1,new cljs.core.Keyword(null,"request-method","request-method",1764796830));
if(cljs.core._EQ_.call(null,request_method,new cljs.core.Keyword(null,"jsonp","jsonp",226119588))){
return cljs_http.core.jsonp.call(null,request__$1);
} else {
return cljs_http.core.xhr.call(null,request__$1);
}
});

//# sourceMappingURL=core.js.map