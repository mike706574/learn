// Compiled by ClojureScript 0.0-3308 {}
goog.provide('cljs.core.async');
goog.require('cljs.core');
goog.require('cljs.core.async.impl.channels');
goog.require('cljs.core.async.impl.dispatch');
goog.require('cljs.core.async.impl.ioc_helpers');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.buffers');
goog.require('cljs.core.async.impl.timers');
cljs.core.async.fn_handler = (function cljs$core$async$fn_handler(f){
if(typeof cljs.core.async.t10485 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t10485 = (function (fn_handler,f,meta10486){
this.fn_handler = fn_handler;
this.f = f;
this.meta10486 = meta10486;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t10485.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_10487,meta10486__$1){
var self__ = this;
var _10487__$1 = this;
return (new cljs.core.async.t10485(self__.fn_handler,self__.f,meta10486__$1));
});

cljs.core.async.t10485.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_10487){
var self__ = this;
var _10487__$1 = this;
return self__.meta10486;
});

cljs.core.async.t10485.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t10485.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
});

cljs.core.async.t10485.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
});

cljs.core.async.t10485.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"fn-handler","fn-handler",648785851,null),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"meta10486","meta10486",-323074328,null)], null);
});

cljs.core.async.t10485.cljs$lang$type = true;

cljs.core.async.t10485.cljs$lang$ctorStr = "cljs.core.async/t10485";

cljs.core.async.t10485.cljs$lang$ctorPrWriter = (function (this__4899__auto__,writer__4900__auto__,opt__4901__auto__){
return cljs.core._write.call(null,writer__4900__auto__,"cljs.core.async/t10485");
});

cljs.core.async.__GT_t10485 = (function cljs$core$async$fn_handler_$___GT_t10485(fn_handler__$1,f__$1,meta10486){
return (new cljs.core.async.t10485(fn_handler__$1,f__$1,meta10486));
});

}

return (new cljs.core.async.t10485(cljs$core$async$fn_handler,f,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Returns a fixed buffer of size n. When full, puts will block/park.
 */
cljs.core.async.buffer = (function cljs$core$async$buffer(n){
return cljs.core.async.impl.buffers.fixed_buffer.call(null,n);
});
/**
 * Returns a buffer of size n. When full, puts will complete but
 * val will be dropped (no transfer).
 */
cljs.core.async.dropping_buffer = (function cljs$core$async$dropping_buffer(n){
return cljs.core.async.impl.buffers.dropping_buffer.call(null,n);
});
/**
 * Returns a buffer of size n. When full, puts will complete, and be
 * buffered, but oldest elements in buffer will be dropped (not
 * transferred).
 */
cljs.core.async.sliding_buffer = (function cljs$core$async$sliding_buffer(n){
return cljs.core.async.impl.buffers.sliding_buffer.call(null,n);
});
/**
 * Returns true if a channel created with buff will never block. That is to say,
 * puts into this buffer will never cause the buffer to be full.
 */
cljs.core.async.unblocking_buffer_QMARK_ = (function cljs$core$async$unblocking_buffer_QMARK_(buff){
var G__10489 = buff;
if(G__10489){
var bit__4994__auto__ = null;
if(cljs.core.truth_((function (){var or__4320__auto__ = bit__4994__auto__;
if(cljs.core.truth_(or__4320__auto__)){
return or__4320__auto__;
} else {
return G__10489.cljs$core$async$impl$protocols$UnblockingBuffer$;
}
})())){
return true;
} else {
if((!G__10489.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,G__10489);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,G__10489);
}
});
/**
 * Creates a channel with an optional buffer, an optional transducer (like (map f),
 * (filter p) etc or a composition thereof), and an optional exception handler.
 * If buf-or-n is a number, will create and use a fixed buffer of that size. If a
 * transducer is supplied a buffer must be specified. ex-handler must be a
 * fn of one argument - if an exception occurs during transformation it will be called
 * with the thrown value as an argument, and any non-nil return value will be placed
 * in the channel.
 */
cljs.core.async.chan = (function cljs$core$async$chan(){
var G__10491 = arguments.length;
switch (G__10491) {
case 0:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.chan.call(null,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1 = (function (buf_or_n){
return cljs.core.async.chan.call(null,buf_or_n,null,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2 = (function (buf_or_n,xform){
return cljs.core.async.chan.call(null,buf_or_n,xform,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3 = (function (buf_or_n,xform,ex_handler){
var buf_or_n__$1 = ((cljs.core._EQ_.call(null,buf_or_n,(0)))?null:buf_or_n);
if(cljs.core.truth_(xform)){
if(cljs.core.truth_(buf_or_n__$1)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("buffer must be supplied when transducer is"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,new cljs.core.Symbol(null,"buf-or-n","buf-or-n",-1646815050,null)))].join('')));
}
} else {
}

return cljs.core.async.impl.channels.chan.call(null,((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer.call(null,buf_or_n__$1):buf_or_n__$1),xform,ex_handler);
});

cljs.core.async.chan.cljs$lang$maxFixedArity = 3;
/**
 * Returns a channel that will close after msecs
 */
cljs.core.async.timeout = (function cljs$core$async$timeout(msecs){
return cljs.core.async.impl.timers.timeout.call(null,msecs);
});
/**
 * takes a val from port. Must be called inside a (go ...) block. Will
 * return nil if closed. Will park if nothing is available.
 * Returns true unless port is already closed
 */
cljs.core.async._LT__BANG_ = (function cljs$core$async$_LT__BANG_(port){
throw (new Error("<! used not in (go ...) block"));
});
/**
 * Asynchronously takes a val from port, passing to fn1. Will pass nil
 * if closed. If on-caller? (default true) is true, and value is
 * immediately available, will call fn1 on calling thread.
 * Returns nil.
 */
cljs.core.async.take_BANG_ = (function cljs$core$async$take_BANG_(){
var G__10494 = arguments.length;
switch (G__10494) {
case 2:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,fn1){
return cljs.core.async.take_BANG_.call(null,port,fn1,true);
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,fn1,on_caller_QMARK_){
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.fn_handler.call(null,fn1));
if(cljs.core.truth_(ret)){
var val_10496 = cljs.core.deref.call(null,ret);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,val_10496);
} else {
cljs.core.async.impl.dispatch.run.call(null,((function (val_10496,ret){
return (function (){
return fn1.call(null,val_10496);
});})(val_10496,ret))
);
}
} else {
}

return null;
});

cljs.core.async.take_BANG_.cljs$lang$maxFixedArity = 3;
cljs.core.async.nop = (function cljs$core$async$nop(_){
return null;
});
cljs.core.async.fhnop = cljs.core.async.fn_handler.call(null,cljs.core.async.nop);
/**
 * puts a val into port. nil values are not allowed. Must be called
 * inside a (go ...) block. Will park if no buffer space is available.
 * Returns true unless port is already closed.
 */
cljs.core.async._GT__BANG_ = (function cljs$core$async$_GT__BANG_(port,val){
throw (new Error(">! used not in (go ...) block"));
});
/**
 * Asynchronously puts a val into port, calling fn0 (if supplied) when
 * complete. nil values are not allowed. Will throw if closed. If
 * on-caller? (default true) is true, and the put is immediately
 * accepted, will call fn0 on calling thread.  Returns nil.
 */
cljs.core.async.put_BANG_ = (function cljs$core$async$put_BANG_(){
var G__10498 = arguments.length;
switch (G__10498) {
case 2:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,val){
var temp__4421__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fhnop);
if(cljs.core.truth_(temp__4421__auto__)){
var ret = temp__4421__auto__;
return cljs.core.deref.call(null,ret);
} else {
return true;
}
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,val,fn1){
return cljs.core.async.put_BANG_.call(null,port,val,fn1,true);
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (port,val,fn1,on_caller_QMARK_){
var temp__4421__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fn_handler.call(null,fn1));
if(cljs.core.truth_(temp__4421__auto__)){
var retb = temp__4421__auto__;
var ret = cljs.core.deref.call(null,retb);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,ret);
} else {
cljs.core.async.impl.dispatch.run.call(null,((function (ret,retb,temp__4421__auto__){
return (function (){
return fn1.call(null,ret);
});})(ret,retb,temp__4421__auto__))
);
}

return ret;
} else {
return true;
}
});

cljs.core.async.put_BANG_.cljs$lang$maxFixedArity = 4;
cljs.core.async.close_BANG_ = (function cljs$core$async$close_BANG_(port){
return cljs.core.async.impl.protocols.close_BANG_.call(null,port);
});
cljs.core.async.random_array = (function cljs$core$async$random_array(n){
var a = (new Array(n));
var n__5205__auto___10500 = n;
var x_10501 = (0);
while(true){
if((x_10501 < n__5205__auto___10500)){
(a[x_10501] = (0));

var G__10502 = (x_10501 + (1));
x_10501 = G__10502;
continue;
} else {
}
break;
}

var i = (1);
while(true){
if(cljs.core._EQ_.call(null,i,n)){
return a;
} else {
var j = cljs.core.rand_int.call(null,i);
(a[i] = (a[j]));

(a[j] = i);

var G__10503 = (i + (1));
i = G__10503;
continue;
}
break;
}
});
cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.call(null,true);
if(typeof cljs.core.async.t10507 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t10507 = (function (alt_flag,flag,meta10508){
this.alt_flag = alt_flag;
this.flag = flag;
this.meta10508 = meta10508;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t10507.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (flag){
return (function (_10509,meta10508__$1){
var self__ = this;
var _10509__$1 = this;
return (new cljs.core.async.t10507(self__.alt_flag,self__.flag,meta10508__$1));
});})(flag))
;

cljs.core.async.t10507.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (flag){
return (function (_10509){
var self__ = this;
var _10509__$1 = this;
return self__.meta10508;
});})(flag))
;

cljs.core.async.t10507.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t10507.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref.call(null,self__.flag);
});})(flag))
;

cljs.core.async.t10507.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.flag,null);

return true;
});})(flag))
;

cljs.core.async.t10507.getBasis = ((function (flag){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"alt-flag","alt-flag",-1794972754,null),new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta10508","meta10508",1359290547,null)], null);
});})(flag))
;

cljs.core.async.t10507.cljs$lang$type = true;

cljs.core.async.t10507.cljs$lang$ctorStr = "cljs.core.async/t10507";

cljs.core.async.t10507.cljs$lang$ctorPrWriter = ((function (flag){
return (function (this__4899__auto__,writer__4900__auto__,opt__4901__auto__){
return cljs.core._write.call(null,writer__4900__auto__,"cljs.core.async/t10507");
});})(flag))
;

cljs.core.async.__GT_t10507 = ((function (flag){
return (function cljs$core$async$alt_flag_$___GT_t10507(alt_flag__$1,flag__$1,meta10508){
return (new cljs.core.async.t10507(alt_flag__$1,flag__$1,meta10508));
});})(flag))
;

}

return (new cljs.core.async.t10507(cljs$core$async$alt_flag,flag,cljs.core.PersistentArrayMap.EMPTY));
});
cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
if(typeof cljs.core.async.t10513 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t10513 = (function (alt_handler,flag,cb,meta10514){
this.alt_handler = alt_handler;
this.flag = flag;
this.cb = cb;
this.meta10514 = meta10514;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t10513.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_10515,meta10514__$1){
var self__ = this;
var _10515__$1 = this;
return (new cljs.core.async.t10513(self__.alt_handler,self__.flag,self__.cb,meta10514__$1));
});

cljs.core.async.t10513.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_10515){
var self__ = this;
var _10515__$1 = this;
return self__.meta10514;
});

cljs.core.async.t10513.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t10513.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.flag);
});

cljs.core.async.t10513.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit.call(null,self__.flag);

return self__.cb;
});

cljs.core.async.t10513.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"alt-handler","alt-handler",963786170,null),new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta10514","meta10514",-667563077,null)], null);
});

cljs.core.async.t10513.cljs$lang$type = true;

cljs.core.async.t10513.cljs$lang$ctorStr = "cljs.core.async/t10513";

cljs.core.async.t10513.cljs$lang$ctorPrWriter = (function (this__4899__auto__,writer__4900__auto__,opt__4901__auto__){
return cljs.core._write.call(null,writer__4900__auto__,"cljs.core.async/t10513");
});

cljs.core.async.__GT_t10513 = (function cljs$core$async$alt_handler_$___GT_t10513(alt_handler__$1,flag__$1,cb__$1,meta10514){
return (new cljs.core.async.t10513(alt_handler__$1,flag__$1,cb__$1,meta10514));
});

}

return (new cljs.core.async.t10513(cljs$core$async$alt_handler,flag,cb,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * returns derefable [val port] if immediate, nil if enqueued
 */
cljs.core.async.do_alts = (function cljs$core$async$do_alts(fret,ports,opts){
var flag = cljs.core.async.alt_flag.call(null);
var n = cljs.core.count.call(null,ports);
var idxs = cljs.core.async.random_array.call(null,n);
var priority = new cljs.core.Keyword(null,"priority","priority",1431093715).cljs$core$IFn$_invoke$arity$1(opts);
var ret = (function (){var i = (0);
while(true){
if((i < n)){
var idx = (cljs.core.truth_(priority)?i:(idxs[i]));
var port = cljs.core.nth.call(null,ports,idx);
var wport = ((cljs.core.vector_QMARK_.call(null,port))?port.call(null,(0)):null);
var vbox = (cljs.core.truth_(wport)?(function (){var val = port.call(null,(1));
return cljs.core.async.impl.protocols.put_BANG_.call(null,wport,val,cljs.core.async.alt_handler.call(null,flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (p1__10516_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__10516_SHARP_,wport], null));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.alt_handler.call(null,flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__10517_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__10517_SHARP_,port], null));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));
if(cljs.core.truth_(vbox)){
return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref.call(null,vbox),(function (){var or__4320__auto__ = wport;
if(cljs.core.truth_(or__4320__auto__)){
return or__4320__auto__;
} else {
return port;
}
})()], null));
} else {
var G__10518 = (i + (1));
i = G__10518;
continue;
}
} else {
return null;
}
break;
}
})();
var or__4320__auto__ = ret;
if(cljs.core.truth_(or__4320__auto__)){
return or__4320__auto__;
} else {
if(cljs.core.contains_QMARK_.call(null,opts,new cljs.core.Keyword(null,"default","default",-1987822328))){
var temp__4423__auto__ = (function (){var and__4308__auto__ = cljs.core.async.impl.protocols.active_QMARK_.call(null,flag);
if(cljs.core.truth_(and__4308__auto__)){
return cljs.core.async.impl.protocols.commit.call(null,flag);
} else {
return and__4308__auto__;
}
})();
if(cljs.core.truth_(temp__4423__auto__)){
var got = temp__4423__auto__;
return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"default","default",-1987822328).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"default","default",-1987822328)], null));
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Completes at most one of several channel operations. Must be called
 * inside a (go ...) block. ports is a vector of channel endpoints,
 * which can be either a channel to take from or a vector of
 * [channel-to-put-to val-to-put], in any combination. Takes will be
 * made as if by <!, and puts will be made as if by >!. Unless
 * the :priority option is true, if more than one port operation is
 * ready a non-deterministic choice will be made. If no operation is
 * ready and a :default value is supplied, [default-val :default] will
 * be returned, otherwise alts! will park until the first operation to
 * become ready completes. Returns [val port] of the completed
 * operation, where val is the value taken for takes, and a
 * boolean (true unless already closed, as per put!) for puts.
 * 
 * opts are passed as :key val ... Supported options:
 * 
 * :default val - the value to use if none of the operations are immediately ready
 * :priority true - (default nil) when true, the operations will be tried in order.
 * 
 * Note: there is no guarantee that the port exps or val exprs will be
 * used, nor in what order should they be, so they should not be
 * depended upon for side effects.
 */
cljs.core.async.alts_BANG_ = (function cljs$core$async$alts_BANG_(){
var argseq__5360__auto__ = ((((1) < arguments.length))?(new cljs.core.IndexedSeq(Array.prototype.slice.call(arguments,(1)),(0))):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5360__auto__);
});

cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__10521){
var map__10522 = p__10521;
var map__10522__$1 = ((cljs.core.seq_QMARK_.call(null,map__10522))?cljs.core.apply.call(null,cljs.core.hash_map,map__10522):map__10522);
var opts = map__10522__$1;
throw (new Error("alts! used not in (go ...) block"));
});

cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1);

cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq10519){
var G__10520 = cljs.core.first.call(null,seq10519);
var seq10519__$1 = cljs.core.next.call(null,seq10519);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__10520,seq10519__$1);
});
/**
 * Takes elements from the from channel and supplies them to the to
 * channel. By default, the to channel will be closed when the from
 * channel closes, but can be determined by the close?  parameter. Will
 * stop consuming the from channel if the to channel closes
 */
cljs.core.async.pipe = (function cljs$core$async$pipe(){
var G__10524 = arguments.length;
switch (G__10524) {
case 2:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2 = (function (from,to){
return cljs.core.async.pipe.call(null,from,to,true);
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3 = (function (from,to,close_QMARK_){
var c__6804__auto___10573 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto___10573){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto___10573){
return (function (state_10548){
var state_val_10549 = (state_10548[(1)]);
if((state_val_10549 === (7))){
var inst_10544 = (state_10548[(2)]);
var state_10548__$1 = state_10548;
var statearr_10550_10574 = state_10548__$1;
(statearr_10550_10574[(2)] = inst_10544);

(statearr_10550_10574[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10549 === (1))){
var state_10548__$1 = state_10548;
var statearr_10551_10575 = state_10548__$1;
(statearr_10551_10575[(2)] = null);

(statearr_10551_10575[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10549 === (4))){
var inst_10527 = (state_10548[(7)]);
var inst_10527__$1 = (state_10548[(2)]);
var inst_10528 = (inst_10527__$1 == null);
var state_10548__$1 = (function (){var statearr_10552 = state_10548;
(statearr_10552[(7)] = inst_10527__$1);

return statearr_10552;
})();
if(cljs.core.truth_(inst_10528)){
var statearr_10553_10576 = state_10548__$1;
(statearr_10553_10576[(1)] = (5));

} else {
var statearr_10554_10577 = state_10548__$1;
(statearr_10554_10577[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10549 === (13))){
var state_10548__$1 = state_10548;
var statearr_10555_10578 = state_10548__$1;
(statearr_10555_10578[(2)] = null);

(statearr_10555_10578[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10549 === (6))){
var inst_10527 = (state_10548[(7)]);
var state_10548__$1 = state_10548;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_10548__$1,(11),to,inst_10527);
} else {
if((state_val_10549 === (3))){
var inst_10546 = (state_10548[(2)]);
var state_10548__$1 = state_10548;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10548__$1,inst_10546);
} else {
if((state_val_10549 === (12))){
var state_10548__$1 = state_10548;
var statearr_10556_10579 = state_10548__$1;
(statearr_10556_10579[(2)] = null);

(statearr_10556_10579[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10549 === (2))){
var state_10548__$1 = state_10548;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10548__$1,(4),from);
} else {
if((state_val_10549 === (11))){
var inst_10537 = (state_10548[(2)]);
var state_10548__$1 = state_10548;
if(cljs.core.truth_(inst_10537)){
var statearr_10557_10580 = state_10548__$1;
(statearr_10557_10580[(1)] = (12));

} else {
var statearr_10558_10581 = state_10548__$1;
(statearr_10558_10581[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10549 === (9))){
var state_10548__$1 = state_10548;
var statearr_10559_10582 = state_10548__$1;
(statearr_10559_10582[(2)] = null);

(statearr_10559_10582[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10549 === (5))){
var state_10548__$1 = state_10548;
if(cljs.core.truth_(close_QMARK_)){
var statearr_10560_10583 = state_10548__$1;
(statearr_10560_10583[(1)] = (8));

} else {
var statearr_10561_10584 = state_10548__$1;
(statearr_10561_10584[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10549 === (14))){
var inst_10542 = (state_10548[(2)]);
var state_10548__$1 = state_10548;
var statearr_10562_10585 = state_10548__$1;
(statearr_10562_10585[(2)] = inst_10542);

(statearr_10562_10585[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10549 === (10))){
var inst_10534 = (state_10548[(2)]);
var state_10548__$1 = state_10548;
var statearr_10563_10586 = state_10548__$1;
(statearr_10563_10586[(2)] = inst_10534);

(statearr_10563_10586[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10549 === (8))){
var inst_10531 = cljs.core.async.close_BANG_.call(null,to);
var state_10548__$1 = state_10548;
var statearr_10564_10587 = state_10548__$1;
(statearr_10564_10587[(2)] = inst_10531);

(statearr_10564_10587[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__6804__auto___10573))
;
return ((function (switch__6742__auto__,c__6804__auto___10573){
return (function() {
var cljs$core$async$state_machine__6743__auto__ = null;
var cljs$core$async$state_machine__6743__auto____0 = (function (){
var statearr_10568 = [null,null,null,null,null,null,null,null];
(statearr_10568[(0)] = cljs$core$async$state_machine__6743__auto__);

(statearr_10568[(1)] = (1));

return statearr_10568;
});
var cljs$core$async$state_machine__6743__auto____1 = (function (state_10548){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_10548);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e10569){if((e10569 instanceof Object)){
var ex__6746__auto__ = e10569;
var statearr_10570_10588 = state_10548;
(statearr_10570_10588[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10548);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10569;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__10589 = state_10548;
state_10548 = G__10589;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs$core$async$state_machine__6743__auto__ = function(state_10548){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__6743__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__6743__auto____1.call(this,state_10548);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__6743__auto____0;
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__6743__auto____1;
return cljs$core$async$state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto___10573))
})();
var state__6806__auto__ = (function (){var statearr_10571 = f__6805__auto__.call(null);
(statearr_10571[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto___10573);

return statearr_10571;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto___10573))
);


return to;
});

cljs.core.async.pipe.cljs$lang$maxFixedArity = 3;
cljs.core.async.pipeline_STAR_ = (function cljs$core$async$pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,type){
if((n > (0))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"pos?","pos?",-244377722,null),new cljs.core.Symbol(null,"n","n",-2092305744,null))))].join('')));
}

var jobs = cljs.core.async.chan.call(null,n);
var results = cljs.core.async.chan.call(null,n);
var process = ((function (jobs,results){
return (function (p__10773){
var vec__10774 = p__10773;
var v = cljs.core.nth.call(null,vec__10774,(0),null);
var p = cljs.core.nth.call(null,vec__10774,(1),null);
var job = vec__10774;
if((job == null)){
cljs.core.async.close_BANG_.call(null,results);

return null;
} else {
var res = cljs.core.async.chan.call(null,(1),xf,ex_handler);
var c__6804__auto___10956 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto___10956,res,vec__10774,v,p,job,jobs,results){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto___10956,res,vec__10774,v,p,job,jobs,results){
return (function (state_10779){
var state_val_10780 = (state_10779[(1)]);
if((state_val_10780 === (1))){
var state_10779__$1 = state_10779;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_10779__$1,(2),res,v);
} else {
if((state_val_10780 === (2))){
var inst_10776 = (state_10779[(2)]);
var inst_10777 = cljs.core.async.close_BANG_.call(null,res);
var state_10779__$1 = (function (){var statearr_10781 = state_10779;
(statearr_10781[(7)] = inst_10776);

return statearr_10781;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10779__$1,inst_10777);
} else {
return null;
}
}
});})(c__6804__auto___10956,res,vec__10774,v,p,job,jobs,results))
;
return ((function (switch__6742__auto__,c__6804__auto___10956,res,vec__10774,v,p,job,jobs,results){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____0 = (function (){
var statearr_10785 = [null,null,null,null,null,null,null,null];
(statearr_10785[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__);

(statearr_10785[(1)] = (1));

return statearr_10785;
});
var cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____1 = (function (state_10779){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_10779);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e10786){if((e10786 instanceof Object)){
var ex__6746__auto__ = e10786;
var statearr_10787_10957 = state_10779;
(statearr_10787_10957[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10779);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10786;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__10958 = state_10779;
state_10779 = G__10958;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__ = function(state_10779){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____1.call(this,state_10779);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto___10956,res,vec__10774,v,p,job,jobs,results))
})();
var state__6806__auto__ = (function (){var statearr_10788 = f__6805__auto__.call(null);
(statearr_10788[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto___10956);

return statearr_10788;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto___10956,res,vec__10774,v,p,job,jobs,results))
);


cljs.core.async.put_BANG_.call(null,p,res);

return true;
}
});})(jobs,results))
;
var async = ((function (jobs,results,process){
return (function (p__10789){
var vec__10790 = p__10789;
var v = cljs.core.nth.call(null,vec__10790,(0),null);
var p = cljs.core.nth.call(null,vec__10790,(1),null);
var job = vec__10790;
if((job == null)){
cljs.core.async.close_BANG_.call(null,results);

return null;
} else {
var res = cljs.core.async.chan.call(null,(1));
xf.call(null,v,res);

cljs.core.async.put_BANG_.call(null,p,res);

return true;
}
});})(jobs,results,process))
;
var n__5205__auto___10959 = n;
var __10960 = (0);
while(true){
if((__10960 < n__5205__auto___10959)){
var G__10791_10961 = (((type instanceof cljs.core.Keyword))?type.fqn:null);
switch (G__10791_10961) {
case "compute":
var c__6804__auto___10963 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__10960,c__6804__auto___10963,G__10791_10961,n__5205__auto___10959,jobs,results,process,async){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (__10960,c__6804__auto___10963,G__10791_10961,n__5205__auto___10959,jobs,results,process,async){
return (function (state_10804){
var state_val_10805 = (state_10804[(1)]);
if((state_val_10805 === (1))){
var state_10804__$1 = state_10804;
var statearr_10806_10964 = state_10804__$1;
(statearr_10806_10964[(2)] = null);

(statearr_10806_10964[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10805 === (2))){
var state_10804__$1 = state_10804;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10804__$1,(4),jobs);
} else {
if((state_val_10805 === (3))){
var inst_10802 = (state_10804[(2)]);
var state_10804__$1 = state_10804;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10804__$1,inst_10802);
} else {
if((state_val_10805 === (4))){
var inst_10794 = (state_10804[(2)]);
var inst_10795 = process.call(null,inst_10794);
var state_10804__$1 = state_10804;
if(cljs.core.truth_(inst_10795)){
var statearr_10807_10965 = state_10804__$1;
(statearr_10807_10965[(1)] = (5));

} else {
var statearr_10808_10966 = state_10804__$1;
(statearr_10808_10966[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10805 === (5))){
var state_10804__$1 = state_10804;
var statearr_10809_10967 = state_10804__$1;
(statearr_10809_10967[(2)] = null);

(statearr_10809_10967[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10805 === (6))){
var state_10804__$1 = state_10804;
var statearr_10810_10968 = state_10804__$1;
(statearr_10810_10968[(2)] = null);

(statearr_10810_10968[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10805 === (7))){
var inst_10800 = (state_10804[(2)]);
var state_10804__$1 = state_10804;
var statearr_10811_10969 = state_10804__$1;
(statearr_10811_10969[(2)] = inst_10800);

(statearr_10811_10969[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(__10960,c__6804__auto___10963,G__10791_10961,n__5205__auto___10959,jobs,results,process,async))
;
return ((function (__10960,switch__6742__auto__,c__6804__auto___10963,G__10791_10961,n__5205__auto___10959,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____0 = (function (){
var statearr_10815 = [null,null,null,null,null,null,null];
(statearr_10815[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__);

(statearr_10815[(1)] = (1));

return statearr_10815;
});
var cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____1 = (function (state_10804){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_10804);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e10816){if((e10816 instanceof Object)){
var ex__6746__auto__ = e10816;
var statearr_10817_10970 = state_10804;
(statearr_10817_10970[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10804);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10816;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__10971 = state_10804;
state_10804 = G__10971;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__ = function(state_10804){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____1.call(this,state_10804);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__;
})()
;})(__10960,switch__6742__auto__,c__6804__auto___10963,G__10791_10961,n__5205__auto___10959,jobs,results,process,async))
})();
var state__6806__auto__ = (function (){var statearr_10818 = f__6805__auto__.call(null);
(statearr_10818[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto___10963);

return statearr_10818;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(__10960,c__6804__auto___10963,G__10791_10961,n__5205__auto___10959,jobs,results,process,async))
);


break;
case "async":
var c__6804__auto___10972 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__10960,c__6804__auto___10972,G__10791_10961,n__5205__auto___10959,jobs,results,process,async){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (__10960,c__6804__auto___10972,G__10791_10961,n__5205__auto___10959,jobs,results,process,async){
return (function (state_10831){
var state_val_10832 = (state_10831[(1)]);
if((state_val_10832 === (1))){
var state_10831__$1 = state_10831;
var statearr_10833_10973 = state_10831__$1;
(statearr_10833_10973[(2)] = null);

(statearr_10833_10973[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10832 === (2))){
var state_10831__$1 = state_10831;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10831__$1,(4),jobs);
} else {
if((state_val_10832 === (3))){
var inst_10829 = (state_10831[(2)]);
var state_10831__$1 = state_10831;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10831__$1,inst_10829);
} else {
if((state_val_10832 === (4))){
var inst_10821 = (state_10831[(2)]);
var inst_10822 = async.call(null,inst_10821);
var state_10831__$1 = state_10831;
if(cljs.core.truth_(inst_10822)){
var statearr_10834_10974 = state_10831__$1;
(statearr_10834_10974[(1)] = (5));

} else {
var statearr_10835_10975 = state_10831__$1;
(statearr_10835_10975[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10832 === (5))){
var state_10831__$1 = state_10831;
var statearr_10836_10976 = state_10831__$1;
(statearr_10836_10976[(2)] = null);

(statearr_10836_10976[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10832 === (6))){
var state_10831__$1 = state_10831;
var statearr_10837_10977 = state_10831__$1;
(statearr_10837_10977[(2)] = null);

(statearr_10837_10977[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10832 === (7))){
var inst_10827 = (state_10831[(2)]);
var state_10831__$1 = state_10831;
var statearr_10838_10978 = state_10831__$1;
(statearr_10838_10978[(2)] = inst_10827);

(statearr_10838_10978[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(__10960,c__6804__auto___10972,G__10791_10961,n__5205__auto___10959,jobs,results,process,async))
;
return ((function (__10960,switch__6742__auto__,c__6804__auto___10972,G__10791_10961,n__5205__auto___10959,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____0 = (function (){
var statearr_10842 = [null,null,null,null,null,null,null];
(statearr_10842[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__);

(statearr_10842[(1)] = (1));

return statearr_10842;
});
var cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____1 = (function (state_10831){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_10831);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e10843){if((e10843 instanceof Object)){
var ex__6746__auto__ = e10843;
var statearr_10844_10979 = state_10831;
(statearr_10844_10979[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10831);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10843;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__10980 = state_10831;
state_10831 = G__10980;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__ = function(state_10831){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____1.call(this,state_10831);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__;
})()
;})(__10960,switch__6742__auto__,c__6804__auto___10972,G__10791_10961,n__5205__auto___10959,jobs,results,process,async))
})();
var state__6806__auto__ = (function (){var statearr_10845 = f__6805__auto__.call(null);
(statearr_10845[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto___10972);

return statearr_10845;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(__10960,c__6804__auto___10972,G__10791_10961,n__5205__auto___10959,jobs,results,process,async))
);


break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(type)].join('')));

}

var G__10981 = (__10960 + (1));
__10960 = G__10981;
continue;
} else {
}
break;
}

var c__6804__auto___10982 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto___10982,jobs,results,process,async){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto___10982,jobs,results,process,async){
return (function (state_10867){
var state_val_10868 = (state_10867[(1)]);
if((state_val_10868 === (1))){
var state_10867__$1 = state_10867;
var statearr_10869_10983 = state_10867__$1;
(statearr_10869_10983[(2)] = null);

(statearr_10869_10983[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10868 === (2))){
var state_10867__$1 = state_10867;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10867__$1,(4),from);
} else {
if((state_val_10868 === (3))){
var inst_10865 = (state_10867[(2)]);
var state_10867__$1 = state_10867;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10867__$1,inst_10865);
} else {
if((state_val_10868 === (4))){
var inst_10848 = (state_10867[(7)]);
var inst_10848__$1 = (state_10867[(2)]);
var inst_10849 = (inst_10848__$1 == null);
var state_10867__$1 = (function (){var statearr_10870 = state_10867;
(statearr_10870[(7)] = inst_10848__$1);

return statearr_10870;
})();
if(cljs.core.truth_(inst_10849)){
var statearr_10871_10984 = state_10867__$1;
(statearr_10871_10984[(1)] = (5));

} else {
var statearr_10872_10985 = state_10867__$1;
(statearr_10872_10985[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10868 === (5))){
var inst_10851 = cljs.core.async.close_BANG_.call(null,jobs);
var state_10867__$1 = state_10867;
var statearr_10873_10986 = state_10867__$1;
(statearr_10873_10986[(2)] = inst_10851);

(statearr_10873_10986[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10868 === (6))){
var inst_10853 = (state_10867[(8)]);
var inst_10848 = (state_10867[(7)]);
var inst_10853__$1 = cljs.core.async.chan.call(null,(1));
var inst_10854 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_10855 = [inst_10848,inst_10853__$1];
var inst_10856 = (new cljs.core.PersistentVector(null,2,(5),inst_10854,inst_10855,null));
var state_10867__$1 = (function (){var statearr_10874 = state_10867;
(statearr_10874[(8)] = inst_10853__$1);

return statearr_10874;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_10867__$1,(8),jobs,inst_10856);
} else {
if((state_val_10868 === (7))){
var inst_10863 = (state_10867[(2)]);
var state_10867__$1 = state_10867;
var statearr_10875_10987 = state_10867__$1;
(statearr_10875_10987[(2)] = inst_10863);

(statearr_10875_10987[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10868 === (8))){
var inst_10853 = (state_10867[(8)]);
var inst_10858 = (state_10867[(2)]);
var state_10867__$1 = (function (){var statearr_10876 = state_10867;
(statearr_10876[(9)] = inst_10858);

return statearr_10876;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_10867__$1,(9),results,inst_10853);
} else {
if((state_val_10868 === (9))){
var inst_10860 = (state_10867[(2)]);
var state_10867__$1 = (function (){var statearr_10877 = state_10867;
(statearr_10877[(10)] = inst_10860);

return statearr_10877;
})();
var statearr_10878_10988 = state_10867__$1;
(statearr_10878_10988[(2)] = null);

(statearr_10878_10988[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
});})(c__6804__auto___10982,jobs,results,process,async))
;
return ((function (switch__6742__auto__,c__6804__auto___10982,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____0 = (function (){
var statearr_10882 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_10882[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__);

(statearr_10882[(1)] = (1));

return statearr_10882;
});
var cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____1 = (function (state_10867){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_10867);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e10883){if((e10883 instanceof Object)){
var ex__6746__auto__ = e10883;
var statearr_10884_10989 = state_10867;
(statearr_10884_10989[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10867);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10883;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__10990 = state_10867;
state_10867 = G__10990;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__ = function(state_10867){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____1.call(this,state_10867);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto___10982,jobs,results,process,async))
})();
var state__6806__auto__ = (function (){var statearr_10885 = f__6805__auto__.call(null);
(statearr_10885[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto___10982);

return statearr_10885;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto___10982,jobs,results,process,async))
);


var c__6804__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto__,jobs,results,process,async){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto__,jobs,results,process,async){
return (function (state_10923){
var state_val_10924 = (state_10923[(1)]);
if((state_val_10924 === (7))){
var inst_10919 = (state_10923[(2)]);
var state_10923__$1 = state_10923;
var statearr_10925_10991 = state_10923__$1;
(statearr_10925_10991[(2)] = inst_10919);

(statearr_10925_10991[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10924 === (20))){
var state_10923__$1 = state_10923;
var statearr_10926_10992 = state_10923__$1;
(statearr_10926_10992[(2)] = null);

(statearr_10926_10992[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10924 === (1))){
var state_10923__$1 = state_10923;
var statearr_10927_10993 = state_10923__$1;
(statearr_10927_10993[(2)] = null);

(statearr_10927_10993[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10924 === (4))){
var inst_10888 = (state_10923[(7)]);
var inst_10888__$1 = (state_10923[(2)]);
var inst_10889 = (inst_10888__$1 == null);
var state_10923__$1 = (function (){var statearr_10928 = state_10923;
(statearr_10928[(7)] = inst_10888__$1);

return statearr_10928;
})();
if(cljs.core.truth_(inst_10889)){
var statearr_10929_10994 = state_10923__$1;
(statearr_10929_10994[(1)] = (5));

} else {
var statearr_10930_10995 = state_10923__$1;
(statearr_10930_10995[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10924 === (15))){
var inst_10901 = (state_10923[(8)]);
var state_10923__$1 = state_10923;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_10923__$1,(18),to,inst_10901);
} else {
if((state_val_10924 === (21))){
var inst_10914 = (state_10923[(2)]);
var state_10923__$1 = state_10923;
var statearr_10931_10996 = state_10923__$1;
(statearr_10931_10996[(2)] = inst_10914);

(statearr_10931_10996[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10924 === (13))){
var inst_10916 = (state_10923[(2)]);
var state_10923__$1 = (function (){var statearr_10932 = state_10923;
(statearr_10932[(9)] = inst_10916);

return statearr_10932;
})();
var statearr_10933_10997 = state_10923__$1;
(statearr_10933_10997[(2)] = null);

(statearr_10933_10997[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10924 === (6))){
var inst_10888 = (state_10923[(7)]);
var state_10923__$1 = state_10923;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10923__$1,(11),inst_10888);
} else {
if((state_val_10924 === (17))){
var inst_10909 = (state_10923[(2)]);
var state_10923__$1 = state_10923;
if(cljs.core.truth_(inst_10909)){
var statearr_10934_10998 = state_10923__$1;
(statearr_10934_10998[(1)] = (19));

} else {
var statearr_10935_10999 = state_10923__$1;
(statearr_10935_10999[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10924 === (3))){
var inst_10921 = (state_10923[(2)]);
var state_10923__$1 = state_10923;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10923__$1,inst_10921);
} else {
if((state_val_10924 === (12))){
var inst_10898 = (state_10923[(10)]);
var state_10923__$1 = state_10923;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10923__$1,(14),inst_10898);
} else {
if((state_val_10924 === (2))){
var state_10923__$1 = state_10923;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10923__$1,(4),results);
} else {
if((state_val_10924 === (19))){
var state_10923__$1 = state_10923;
var statearr_10936_11000 = state_10923__$1;
(statearr_10936_11000[(2)] = null);

(statearr_10936_11000[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10924 === (11))){
var inst_10898 = (state_10923[(2)]);
var state_10923__$1 = (function (){var statearr_10937 = state_10923;
(statearr_10937[(10)] = inst_10898);

return statearr_10937;
})();
var statearr_10938_11001 = state_10923__$1;
(statearr_10938_11001[(2)] = null);

(statearr_10938_11001[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10924 === (9))){
var state_10923__$1 = state_10923;
var statearr_10939_11002 = state_10923__$1;
(statearr_10939_11002[(2)] = null);

(statearr_10939_11002[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10924 === (5))){
var state_10923__$1 = state_10923;
if(cljs.core.truth_(close_QMARK_)){
var statearr_10940_11003 = state_10923__$1;
(statearr_10940_11003[(1)] = (8));

} else {
var statearr_10941_11004 = state_10923__$1;
(statearr_10941_11004[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10924 === (14))){
var inst_10903 = (state_10923[(11)]);
var inst_10901 = (state_10923[(8)]);
var inst_10901__$1 = (state_10923[(2)]);
var inst_10902 = (inst_10901__$1 == null);
var inst_10903__$1 = cljs.core.not.call(null,inst_10902);
var state_10923__$1 = (function (){var statearr_10942 = state_10923;
(statearr_10942[(11)] = inst_10903__$1);

(statearr_10942[(8)] = inst_10901__$1);

return statearr_10942;
})();
if(inst_10903__$1){
var statearr_10943_11005 = state_10923__$1;
(statearr_10943_11005[(1)] = (15));

} else {
var statearr_10944_11006 = state_10923__$1;
(statearr_10944_11006[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10924 === (16))){
var inst_10903 = (state_10923[(11)]);
var state_10923__$1 = state_10923;
var statearr_10945_11007 = state_10923__$1;
(statearr_10945_11007[(2)] = inst_10903);

(statearr_10945_11007[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10924 === (10))){
var inst_10895 = (state_10923[(2)]);
var state_10923__$1 = state_10923;
var statearr_10946_11008 = state_10923__$1;
(statearr_10946_11008[(2)] = inst_10895);

(statearr_10946_11008[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10924 === (18))){
var inst_10906 = (state_10923[(2)]);
var state_10923__$1 = state_10923;
var statearr_10947_11009 = state_10923__$1;
(statearr_10947_11009[(2)] = inst_10906);

(statearr_10947_11009[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10924 === (8))){
var inst_10892 = cljs.core.async.close_BANG_.call(null,to);
var state_10923__$1 = state_10923;
var statearr_10948_11010 = state_10923__$1;
(statearr_10948_11010[(2)] = inst_10892);

(statearr_10948_11010[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__6804__auto__,jobs,results,process,async))
;
return ((function (switch__6742__auto__,c__6804__auto__,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____0 = (function (){
var statearr_10952 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_10952[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__);

(statearr_10952[(1)] = (1));

return statearr_10952;
});
var cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____1 = (function (state_10923){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_10923);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e10953){if((e10953 instanceof Object)){
var ex__6746__auto__ = e10953;
var statearr_10954_11011 = state_10923;
(statearr_10954_11011[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10923);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10953;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__11012 = state_10923;
state_10923 = G__11012;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__ = function(state_10923){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____1.call(this,state_10923);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto__,jobs,results,process,async))
})();
var state__6806__auto__ = (function (){var statearr_10955 = f__6805__auto__.call(null);
(statearr_10955[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto__);

return statearr_10955;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto__,jobs,results,process,async))
);

return c__6804__auto__;
});
/**
 * Takes elements from the from channel and supplies them to the to
 * channel, subject to the async function af, with parallelism n. af
 * must be a function of two arguments, the first an input value and
 * the second a channel on which to place the result(s). af must close!
 * the channel before returning.  The presumption is that af will
 * return immediately, having launched some asynchronous operation
 * whose completion/callback will manipulate the result channel. Outputs
 * will be returned in order relative to  the inputs. By default, the to
 * channel will be closed when the from channel closes, but can be
 * determined by the close?  parameter. Will stop consuming the from
 * channel if the to channel closes.
 */
cljs.core.async.pipeline_async = (function cljs$core$async$pipeline_async(){
var G__11014 = arguments.length;
switch (G__11014) {
case 4:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4 = (function (n,to,af,from){
return cljs.core.async.pipeline_async.call(null,n,to,af,from,true);
});

cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5 = (function (n,to,af,from,close_QMARK_){
return cljs.core.async.pipeline_STAR_.call(null,n,to,af,from,close_QMARK_,null,new cljs.core.Keyword(null,"async","async",1050769601));
});

cljs.core.async.pipeline_async.cljs$lang$maxFixedArity = 5;
/**
 * Takes elements from the from channel and supplies them to the to
 * channel, subject to the transducer xf, with parallelism n. Because
 * it is parallel, the transducer will be applied independently to each
 * element, not across elements, and may produce zero or more outputs
 * per input.  Outputs will be returned in order relative to the
 * inputs. By default, the to channel will be closed when the from
 * channel closes, but can be determined by the close?  parameter. Will
 * stop consuming the from channel if the to channel closes.
 * 
 * Note this is supplied for API compatibility with the Clojure version.
 * Values of N > 1 will not result in actual concurrency in a
 * single-threaded runtime.
 */
cljs.core.async.pipeline = (function cljs$core$async$pipeline(){
var G__11017 = arguments.length;
switch (G__11017) {
case 4:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4 = (function (n,to,xf,from){
return cljs.core.async.pipeline.call(null,n,to,xf,from,true);
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5 = (function (n,to,xf,from,close_QMARK_){
return cljs.core.async.pipeline.call(null,n,to,xf,from,close_QMARK_,null);
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6 = (function (n,to,xf,from,close_QMARK_,ex_handler){
return cljs.core.async.pipeline_STAR_.call(null,n,to,xf,from,close_QMARK_,ex_handler,new cljs.core.Keyword(null,"compute","compute",1555393130));
});

cljs.core.async.pipeline.cljs$lang$maxFixedArity = 6;
/**
 * Takes a predicate and a source channel and returns a vector of two
 * channels, the first of which will contain the values for which the
 * predicate returned true, the second those for which it returned
 * false.
 * 
 * The out channels will be unbuffered by default, or two buf-or-ns can
 * be supplied. The channels will close after the source channel has
 * closed.
 */
cljs.core.async.split = (function cljs$core$async$split(){
var G__11020 = arguments.length;
switch (G__11020) {
case 2:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.split.call(null,p,ch,null,null);
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$4 = (function (p,ch,t_buf_or_n,f_buf_or_n){
var tc = cljs.core.async.chan.call(null,t_buf_or_n);
var fc = cljs.core.async.chan.call(null,f_buf_or_n);
var c__6804__auto___11072 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto___11072,tc,fc){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto___11072,tc,fc){
return (function (state_11046){
var state_val_11047 = (state_11046[(1)]);
if((state_val_11047 === (7))){
var inst_11042 = (state_11046[(2)]);
var state_11046__$1 = state_11046;
var statearr_11048_11073 = state_11046__$1;
(statearr_11048_11073[(2)] = inst_11042);

(statearr_11048_11073[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11047 === (1))){
var state_11046__$1 = state_11046;
var statearr_11049_11074 = state_11046__$1;
(statearr_11049_11074[(2)] = null);

(statearr_11049_11074[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11047 === (4))){
var inst_11023 = (state_11046[(7)]);
var inst_11023__$1 = (state_11046[(2)]);
var inst_11024 = (inst_11023__$1 == null);
var state_11046__$1 = (function (){var statearr_11050 = state_11046;
(statearr_11050[(7)] = inst_11023__$1);

return statearr_11050;
})();
if(cljs.core.truth_(inst_11024)){
var statearr_11051_11075 = state_11046__$1;
(statearr_11051_11075[(1)] = (5));

} else {
var statearr_11052_11076 = state_11046__$1;
(statearr_11052_11076[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11047 === (13))){
var state_11046__$1 = state_11046;
var statearr_11053_11077 = state_11046__$1;
(statearr_11053_11077[(2)] = null);

(statearr_11053_11077[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11047 === (6))){
var inst_11023 = (state_11046[(7)]);
var inst_11029 = p.call(null,inst_11023);
var state_11046__$1 = state_11046;
if(cljs.core.truth_(inst_11029)){
var statearr_11054_11078 = state_11046__$1;
(statearr_11054_11078[(1)] = (9));

} else {
var statearr_11055_11079 = state_11046__$1;
(statearr_11055_11079[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11047 === (3))){
var inst_11044 = (state_11046[(2)]);
var state_11046__$1 = state_11046;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_11046__$1,inst_11044);
} else {
if((state_val_11047 === (12))){
var state_11046__$1 = state_11046;
var statearr_11056_11080 = state_11046__$1;
(statearr_11056_11080[(2)] = null);

(statearr_11056_11080[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11047 === (2))){
var state_11046__$1 = state_11046;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_11046__$1,(4),ch);
} else {
if((state_val_11047 === (11))){
var inst_11023 = (state_11046[(7)]);
var inst_11033 = (state_11046[(2)]);
var state_11046__$1 = state_11046;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_11046__$1,(8),inst_11033,inst_11023);
} else {
if((state_val_11047 === (9))){
var state_11046__$1 = state_11046;
var statearr_11057_11081 = state_11046__$1;
(statearr_11057_11081[(2)] = tc);

(statearr_11057_11081[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11047 === (5))){
var inst_11026 = cljs.core.async.close_BANG_.call(null,tc);
var inst_11027 = cljs.core.async.close_BANG_.call(null,fc);
var state_11046__$1 = (function (){var statearr_11058 = state_11046;
(statearr_11058[(8)] = inst_11026);

return statearr_11058;
})();
var statearr_11059_11082 = state_11046__$1;
(statearr_11059_11082[(2)] = inst_11027);

(statearr_11059_11082[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11047 === (14))){
var inst_11040 = (state_11046[(2)]);
var state_11046__$1 = state_11046;
var statearr_11060_11083 = state_11046__$1;
(statearr_11060_11083[(2)] = inst_11040);

(statearr_11060_11083[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11047 === (10))){
var state_11046__$1 = state_11046;
var statearr_11061_11084 = state_11046__$1;
(statearr_11061_11084[(2)] = fc);

(statearr_11061_11084[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11047 === (8))){
var inst_11035 = (state_11046[(2)]);
var state_11046__$1 = state_11046;
if(cljs.core.truth_(inst_11035)){
var statearr_11062_11085 = state_11046__$1;
(statearr_11062_11085[(1)] = (12));

} else {
var statearr_11063_11086 = state_11046__$1;
(statearr_11063_11086[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__6804__auto___11072,tc,fc))
;
return ((function (switch__6742__auto__,c__6804__auto___11072,tc,fc){
return (function() {
var cljs$core$async$state_machine__6743__auto__ = null;
var cljs$core$async$state_machine__6743__auto____0 = (function (){
var statearr_11067 = [null,null,null,null,null,null,null,null,null];
(statearr_11067[(0)] = cljs$core$async$state_machine__6743__auto__);

(statearr_11067[(1)] = (1));

return statearr_11067;
});
var cljs$core$async$state_machine__6743__auto____1 = (function (state_11046){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_11046);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e11068){if((e11068 instanceof Object)){
var ex__6746__auto__ = e11068;
var statearr_11069_11087 = state_11046;
(statearr_11069_11087[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11046);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e11068;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__11088 = state_11046;
state_11046 = G__11088;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs$core$async$state_machine__6743__auto__ = function(state_11046){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__6743__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__6743__auto____1.call(this,state_11046);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__6743__auto____0;
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__6743__auto____1;
return cljs$core$async$state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto___11072,tc,fc))
})();
var state__6806__auto__ = (function (){var statearr_11070 = f__6805__auto__.call(null);
(statearr_11070[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto___11072);

return statearr_11070;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto___11072,tc,fc))
);


return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tc,fc], null);
});

cljs.core.async.split.cljs$lang$maxFixedArity = 4;
/**
 * f should be a function of 2 arguments. Returns a channel containing
 * the single result of applying f to init and the first item from the
 * channel, then applying f to that result and the 2nd item, etc. If
 * the channel closes without yielding items, returns init and f is not
 * called. ch must close before reduce produces a result.
 */
cljs.core.async.reduce = (function cljs$core$async$reduce(f,init,ch){
var c__6804__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto__){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto__){
return (function (state_11135){
var state_val_11136 = (state_11135[(1)]);
if((state_val_11136 === (1))){
var inst_11121 = init;
var state_11135__$1 = (function (){var statearr_11137 = state_11135;
(statearr_11137[(7)] = inst_11121);

return statearr_11137;
})();
var statearr_11138_11153 = state_11135__$1;
(statearr_11138_11153[(2)] = null);

(statearr_11138_11153[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11136 === (2))){
var state_11135__$1 = state_11135;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_11135__$1,(4),ch);
} else {
if((state_val_11136 === (3))){
var inst_11133 = (state_11135[(2)]);
var state_11135__$1 = state_11135;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_11135__$1,inst_11133);
} else {
if((state_val_11136 === (4))){
var inst_11124 = (state_11135[(8)]);
var inst_11124__$1 = (state_11135[(2)]);
var inst_11125 = (inst_11124__$1 == null);
var state_11135__$1 = (function (){var statearr_11139 = state_11135;
(statearr_11139[(8)] = inst_11124__$1);

return statearr_11139;
})();
if(cljs.core.truth_(inst_11125)){
var statearr_11140_11154 = state_11135__$1;
(statearr_11140_11154[(1)] = (5));

} else {
var statearr_11141_11155 = state_11135__$1;
(statearr_11141_11155[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11136 === (5))){
var inst_11121 = (state_11135[(7)]);
var state_11135__$1 = state_11135;
var statearr_11142_11156 = state_11135__$1;
(statearr_11142_11156[(2)] = inst_11121);

(statearr_11142_11156[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11136 === (6))){
var inst_11124 = (state_11135[(8)]);
var inst_11121 = (state_11135[(7)]);
var inst_11128 = f.call(null,inst_11121,inst_11124);
var inst_11121__$1 = inst_11128;
var state_11135__$1 = (function (){var statearr_11143 = state_11135;
(statearr_11143[(7)] = inst_11121__$1);

return statearr_11143;
})();
var statearr_11144_11157 = state_11135__$1;
(statearr_11144_11157[(2)] = null);

(statearr_11144_11157[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11136 === (7))){
var inst_11131 = (state_11135[(2)]);
var state_11135__$1 = state_11135;
var statearr_11145_11158 = state_11135__$1;
(statearr_11145_11158[(2)] = inst_11131);

(statearr_11145_11158[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(c__6804__auto__))
;
return ((function (switch__6742__auto__,c__6804__auto__){
return (function() {
var cljs$core$async$reduce_$_state_machine__6743__auto__ = null;
var cljs$core$async$reduce_$_state_machine__6743__auto____0 = (function (){
var statearr_11149 = [null,null,null,null,null,null,null,null,null];
(statearr_11149[(0)] = cljs$core$async$reduce_$_state_machine__6743__auto__);

(statearr_11149[(1)] = (1));

return statearr_11149;
});
var cljs$core$async$reduce_$_state_machine__6743__auto____1 = (function (state_11135){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_11135);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e11150){if((e11150 instanceof Object)){
var ex__6746__auto__ = e11150;
var statearr_11151_11159 = state_11135;
(statearr_11151_11159[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11135);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e11150;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__11160 = state_11135;
state_11135 = G__11160;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__6743__auto__ = function(state_11135){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__6743__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__6743__auto____1.call(this,state_11135);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__6743__auto____0;
cljs$core$async$reduce_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__6743__auto____1;
return cljs$core$async$reduce_$_state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto__))
})();
var state__6806__auto__ = (function (){var statearr_11152 = f__6805__auto__.call(null);
(statearr_11152[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto__);

return statearr_11152;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto__))
);

return c__6804__auto__;
});
/**
 * Puts the contents of coll into the supplied channel.
 * 
 * By default the channel will be closed after the items are copied,
 * but can be determined by the close? parameter.
 * 
 * Returns a channel which will close after the items are copied.
 */
cljs.core.async.onto_chan = (function cljs$core$async$onto_chan(){
var G__11162 = arguments.length;
switch (G__11162) {
case 2:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan.call(null,ch,coll,true);
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
var c__6804__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto__){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto__){
return (function (state_11187){
var state_val_11188 = (state_11187[(1)]);
if((state_val_11188 === (7))){
var inst_11169 = (state_11187[(2)]);
var state_11187__$1 = state_11187;
var statearr_11189_11213 = state_11187__$1;
(statearr_11189_11213[(2)] = inst_11169);

(statearr_11189_11213[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11188 === (1))){
var inst_11163 = cljs.core.seq.call(null,coll);
var inst_11164 = inst_11163;
var state_11187__$1 = (function (){var statearr_11190 = state_11187;
(statearr_11190[(7)] = inst_11164);

return statearr_11190;
})();
var statearr_11191_11214 = state_11187__$1;
(statearr_11191_11214[(2)] = null);

(statearr_11191_11214[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11188 === (4))){
var inst_11164 = (state_11187[(7)]);
var inst_11167 = cljs.core.first.call(null,inst_11164);
var state_11187__$1 = state_11187;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_11187__$1,(7),ch,inst_11167);
} else {
if((state_val_11188 === (13))){
var inst_11181 = (state_11187[(2)]);
var state_11187__$1 = state_11187;
var statearr_11192_11215 = state_11187__$1;
(statearr_11192_11215[(2)] = inst_11181);

(statearr_11192_11215[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11188 === (6))){
var inst_11172 = (state_11187[(2)]);
var state_11187__$1 = state_11187;
if(cljs.core.truth_(inst_11172)){
var statearr_11193_11216 = state_11187__$1;
(statearr_11193_11216[(1)] = (8));

} else {
var statearr_11194_11217 = state_11187__$1;
(statearr_11194_11217[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11188 === (3))){
var inst_11185 = (state_11187[(2)]);
var state_11187__$1 = state_11187;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_11187__$1,inst_11185);
} else {
if((state_val_11188 === (12))){
var state_11187__$1 = state_11187;
var statearr_11195_11218 = state_11187__$1;
(statearr_11195_11218[(2)] = null);

(statearr_11195_11218[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11188 === (2))){
var inst_11164 = (state_11187[(7)]);
var state_11187__$1 = state_11187;
if(cljs.core.truth_(inst_11164)){
var statearr_11196_11219 = state_11187__$1;
(statearr_11196_11219[(1)] = (4));

} else {
var statearr_11197_11220 = state_11187__$1;
(statearr_11197_11220[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11188 === (11))){
var inst_11178 = cljs.core.async.close_BANG_.call(null,ch);
var state_11187__$1 = state_11187;
var statearr_11198_11221 = state_11187__$1;
(statearr_11198_11221[(2)] = inst_11178);

(statearr_11198_11221[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11188 === (9))){
var state_11187__$1 = state_11187;
if(cljs.core.truth_(close_QMARK_)){
var statearr_11199_11222 = state_11187__$1;
(statearr_11199_11222[(1)] = (11));

} else {
var statearr_11200_11223 = state_11187__$1;
(statearr_11200_11223[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11188 === (5))){
var inst_11164 = (state_11187[(7)]);
var state_11187__$1 = state_11187;
var statearr_11201_11224 = state_11187__$1;
(statearr_11201_11224[(2)] = inst_11164);

(statearr_11201_11224[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11188 === (10))){
var inst_11183 = (state_11187[(2)]);
var state_11187__$1 = state_11187;
var statearr_11202_11225 = state_11187__$1;
(statearr_11202_11225[(2)] = inst_11183);

(statearr_11202_11225[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11188 === (8))){
var inst_11164 = (state_11187[(7)]);
var inst_11174 = cljs.core.next.call(null,inst_11164);
var inst_11164__$1 = inst_11174;
var state_11187__$1 = (function (){var statearr_11203 = state_11187;
(statearr_11203[(7)] = inst_11164__$1);

return statearr_11203;
})();
var statearr_11204_11226 = state_11187__$1;
(statearr_11204_11226[(2)] = null);

(statearr_11204_11226[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__6804__auto__))
;
return ((function (switch__6742__auto__,c__6804__auto__){
return (function() {
var cljs$core$async$state_machine__6743__auto__ = null;
var cljs$core$async$state_machine__6743__auto____0 = (function (){
var statearr_11208 = [null,null,null,null,null,null,null,null];
(statearr_11208[(0)] = cljs$core$async$state_machine__6743__auto__);

(statearr_11208[(1)] = (1));

return statearr_11208;
});
var cljs$core$async$state_machine__6743__auto____1 = (function (state_11187){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_11187);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e11209){if((e11209 instanceof Object)){
var ex__6746__auto__ = e11209;
var statearr_11210_11227 = state_11187;
(statearr_11210_11227[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11187);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e11209;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__11228 = state_11187;
state_11187 = G__11228;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs$core$async$state_machine__6743__auto__ = function(state_11187){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__6743__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__6743__auto____1.call(this,state_11187);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__6743__auto____0;
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__6743__auto____1;
return cljs$core$async$state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto__))
})();
var state__6806__auto__ = (function (){var statearr_11211 = f__6805__auto__.call(null);
(statearr_11211[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto__);

return statearr_11211;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto__))
);

return c__6804__auto__;
});

cljs.core.async.onto_chan.cljs$lang$maxFixedArity = 3;
/**
 * Creates and returns a channel which contains the contents of coll,
 * closing when exhausted.
 */
cljs.core.async.to_chan = (function cljs$core$async$to_chan(coll){
var ch = cljs.core.async.chan.call(null,cljs.core.bounded_count.call(null,(100),coll));
cljs.core.async.onto_chan.call(null,ch,coll);

return ch;
});

cljs.core.async.Mux = (function (){var obj11230 = {};
return obj11230;
})();

cljs.core.async.muxch_STAR_ = (function cljs$core$async$muxch_STAR_(_){
if((function (){var and__4308__auto__ = _;
if(and__4308__auto__){
return _.cljs$core$async$Mux$muxch_STAR_$arity$1;
} else {
return and__4308__auto__;
}
})()){
return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else {
var x__4956__auto__ = (((_ == null))?null:_);
return (function (){var or__4320__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__4956__auto__)]);
if(or__4320__auto__){
return or__4320__auto__;
} else {
var or__4320__auto____$1 = (cljs.core.async.muxch_STAR_["_"]);
if(or__4320__auto____$1){
return or__4320__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"Mux.muxch*",_);
}
}
})().call(null,_);
}
});


cljs.core.async.Mult = (function (){var obj11232 = {};
return obj11232;
})();

cljs.core.async.tap_STAR_ = (function cljs$core$async$tap_STAR_(m,ch,close_QMARK_){
if((function (){var and__4308__auto__ = m;
if(and__4308__auto__){
return m.cljs$core$async$Mult$tap_STAR_$arity$3;
} else {
return and__4308__auto__;
}
})()){
return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else {
var x__4956__auto__ = (((m == null))?null:m);
return (function (){var or__4320__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__4956__auto__)]);
if(or__4320__auto__){
return or__4320__auto__;
} else {
var or__4320__auto____$1 = (cljs.core.async.tap_STAR_["_"]);
if(or__4320__auto____$1){
return or__4320__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"Mult.tap*",m);
}
}
})().call(null,m,ch,close_QMARK_);
}
});

cljs.core.async.untap_STAR_ = (function cljs$core$async$untap_STAR_(m,ch){
if((function (){var and__4308__auto__ = m;
if(and__4308__auto__){
return m.cljs$core$async$Mult$untap_STAR_$arity$2;
} else {
return and__4308__auto__;
}
})()){
return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else {
var x__4956__auto__ = (((m == null))?null:m);
return (function (){var or__4320__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__4956__auto__)]);
if(or__4320__auto__){
return or__4320__auto__;
} else {
var or__4320__auto____$1 = (cljs.core.async.untap_STAR_["_"]);
if(or__4320__auto____$1){
return or__4320__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"Mult.untap*",m);
}
}
})().call(null,m,ch);
}
});

cljs.core.async.untap_all_STAR_ = (function cljs$core$async$untap_all_STAR_(m){
if((function (){var and__4308__auto__ = m;
if(and__4308__auto__){
return m.cljs$core$async$Mult$untap_all_STAR_$arity$1;
} else {
return and__4308__auto__;
}
})()){
return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else {
var x__4956__auto__ = (((m == null))?null:m);
return (function (){var or__4320__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__4956__auto__)]);
if(or__4320__auto__){
return or__4320__auto__;
} else {
var or__4320__auto____$1 = (cljs.core.async.untap_all_STAR_["_"]);
if(or__4320__auto____$1){
return or__4320__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"Mult.untap-all*",m);
}
}
})().call(null,m);
}
});

/**
 * Creates and returns a mult(iple) of the supplied channel. Channels
 * containing copies of the channel can be created with 'tap', and
 * detached with 'untap'.
 * 
 * Each item is distributed to all taps in parallel and synchronously,
 * i.e. each tap must accept before the next item is distributed. Use
 * buffering/windowing to prevent slow taps from holding up the mult.
 * 
 * Items received when there are no taps get dropped.
 * 
 * If a tap puts to a closed channel, it will be removed from the mult.
 */
cljs.core.async.mult = (function cljs$core$async$mult(ch){
var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var m = (function (){
if(typeof cljs.core.async.t11454 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t11454 = (function (mult,ch,cs,meta11455){
this.mult = mult;
this.ch = ch;
this.cs = cs;
this.meta11455 = meta11455;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t11454.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs){
return (function (_11456,meta11455__$1){
var self__ = this;
var _11456__$1 = this;
return (new cljs.core.async.t11454(self__.mult,self__.ch,self__.cs,meta11455__$1));
});})(cs))
;

cljs.core.async.t11454.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs){
return (function (_11456){
var self__ = this;
var _11456__$1 = this;
return self__.meta11455;
});})(cs))
;

cljs.core.async.t11454.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t11454.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(cs))
;

cljs.core.async.t11454.prototype.cljs$core$async$Mult$ = true;

cljs.core.async.t11454.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = ((function (cs){
return (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
});})(cs))
;

cljs.core.async.t11454.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = ((function (cs){
return (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch__$1);

return null;
});})(cs))
;

cljs.core.async.t11454.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
});})(cs))
;

cljs.core.async.t11454.getBasis = ((function (cs){
return (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"mult","mult",-1187640995,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta11455","meta11455",1204433177,null)], null);
});})(cs))
;

cljs.core.async.t11454.cljs$lang$type = true;

cljs.core.async.t11454.cljs$lang$ctorStr = "cljs.core.async/t11454";

cljs.core.async.t11454.cljs$lang$ctorPrWriter = ((function (cs){
return (function (this__4899__auto__,writer__4900__auto__,opt__4901__auto__){
return cljs.core._write.call(null,writer__4900__auto__,"cljs.core.async/t11454");
});})(cs))
;

cljs.core.async.__GT_t11454 = ((function (cs){
return (function cljs$core$async$mult_$___GT_t11454(mult__$1,ch__$1,cs__$1,meta11455){
return (new cljs.core.async.t11454(mult__$1,ch__$1,cs__$1,meta11455));
});})(cs))
;

}

return (new cljs.core.async.t11454(cljs$core$async$mult,ch,cs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var dchan = cljs.core.async.chan.call(null,(1));
var dctr = cljs.core.atom.call(null,null);
var done = ((function (cs,m,dchan,dctr){
return (function (_){
if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.call(null,dchan,true);
} else {
return null;
}
});})(cs,m,dchan,dctr))
;
var c__6804__auto___11675 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto___11675,cs,m,dchan,dctr,done){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto___11675,cs,m,dchan,dctr,done){
return (function (state_11587){
var state_val_11588 = (state_11587[(1)]);
if((state_val_11588 === (7))){
var inst_11583 = (state_11587[(2)]);
var state_11587__$1 = state_11587;
var statearr_11589_11676 = state_11587__$1;
(statearr_11589_11676[(2)] = inst_11583);

(statearr_11589_11676[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (20))){
var inst_11488 = (state_11587[(7)]);
var inst_11498 = cljs.core.first.call(null,inst_11488);
var inst_11499 = cljs.core.nth.call(null,inst_11498,(0),null);
var inst_11500 = cljs.core.nth.call(null,inst_11498,(1),null);
var state_11587__$1 = (function (){var statearr_11590 = state_11587;
(statearr_11590[(8)] = inst_11499);

return statearr_11590;
})();
if(cljs.core.truth_(inst_11500)){
var statearr_11591_11677 = state_11587__$1;
(statearr_11591_11677[(1)] = (22));

} else {
var statearr_11592_11678 = state_11587__$1;
(statearr_11592_11678[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (27))){
var inst_11535 = (state_11587[(9)]);
var inst_11459 = (state_11587[(10)]);
var inst_11530 = (state_11587[(11)]);
var inst_11528 = (state_11587[(12)]);
var inst_11535__$1 = cljs.core._nth.call(null,inst_11528,inst_11530);
var inst_11536 = cljs.core.async.put_BANG_.call(null,inst_11535__$1,inst_11459,done);
var state_11587__$1 = (function (){var statearr_11593 = state_11587;
(statearr_11593[(9)] = inst_11535__$1);

return statearr_11593;
})();
if(cljs.core.truth_(inst_11536)){
var statearr_11594_11679 = state_11587__$1;
(statearr_11594_11679[(1)] = (30));

} else {
var statearr_11595_11680 = state_11587__$1;
(statearr_11595_11680[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (1))){
var state_11587__$1 = state_11587;
var statearr_11596_11681 = state_11587__$1;
(statearr_11596_11681[(2)] = null);

(statearr_11596_11681[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (24))){
var inst_11488 = (state_11587[(7)]);
var inst_11505 = (state_11587[(2)]);
var inst_11506 = cljs.core.next.call(null,inst_11488);
var inst_11468 = inst_11506;
var inst_11469 = null;
var inst_11470 = (0);
var inst_11471 = (0);
var state_11587__$1 = (function (){var statearr_11597 = state_11587;
(statearr_11597[(13)] = inst_11469);

(statearr_11597[(14)] = inst_11505);

(statearr_11597[(15)] = inst_11471);

(statearr_11597[(16)] = inst_11470);

(statearr_11597[(17)] = inst_11468);

return statearr_11597;
})();
var statearr_11598_11682 = state_11587__$1;
(statearr_11598_11682[(2)] = null);

(statearr_11598_11682[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (39))){
var state_11587__$1 = state_11587;
var statearr_11602_11683 = state_11587__$1;
(statearr_11602_11683[(2)] = null);

(statearr_11602_11683[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (4))){
var inst_11459 = (state_11587[(10)]);
var inst_11459__$1 = (state_11587[(2)]);
var inst_11460 = (inst_11459__$1 == null);
var state_11587__$1 = (function (){var statearr_11603 = state_11587;
(statearr_11603[(10)] = inst_11459__$1);

return statearr_11603;
})();
if(cljs.core.truth_(inst_11460)){
var statearr_11604_11684 = state_11587__$1;
(statearr_11604_11684[(1)] = (5));

} else {
var statearr_11605_11685 = state_11587__$1;
(statearr_11605_11685[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (15))){
var inst_11469 = (state_11587[(13)]);
var inst_11471 = (state_11587[(15)]);
var inst_11470 = (state_11587[(16)]);
var inst_11468 = (state_11587[(17)]);
var inst_11484 = (state_11587[(2)]);
var inst_11485 = (inst_11471 + (1));
var tmp11599 = inst_11469;
var tmp11600 = inst_11470;
var tmp11601 = inst_11468;
var inst_11468__$1 = tmp11601;
var inst_11469__$1 = tmp11599;
var inst_11470__$1 = tmp11600;
var inst_11471__$1 = inst_11485;
var state_11587__$1 = (function (){var statearr_11606 = state_11587;
(statearr_11606[(13)] = inst_11469__$1);

(statearr_11606[(18)] = inst_11484);

(statearr_11606[(15)] = inst_11471__$1);

(statearr_11606[(16)] = inst_11470__$1);

(statearr_11606[(17)] = inst_11468__$1);

return statearr_11606;
})();
var statearr_11607_11686 = state_11587__$1;
(statearr_11607_11686[(2)] = null);

(statearr_11607_11686[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (21))){
var inst_11509 = (state_11587[(2)]);
var state_11587__$1 = state_11587;
var statearr_11611_11687 = state_11587__$1;
(statearr_11611_11687[(2)] = inst_11509);

(statearr_11611_11687[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (31))){
var inst_11535 = (state_11587[(9)]);
var inst_11539 = done.call(null,null);
var inst_11540 = cljs.core.async.untap_STAR_.call(null,m,inst_11535);
var state_11587__$1 = (function (){var statearr_11612 = state_11587;
(statearr_11612[(19)] = inst_11539);

return statearr_11612;
})();
var statearr_11613_11688 = state_11587__$1;
(statearr_11613_11688[(2)] = inst_11540);

(statearr_11613_11688[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (32))){
var inst_11527 = (state_11587[(20)]);
var inst_11530 = (state_11587[(11)]);
var inst_11528 = (state_11587[(12)]);
var inst_11529 = (state_11587[(21)]);
var inst_11542 = (state_11587[(2)]);
var inst_11543 = (inst_11530 + (1));
var tmp11608 = inst_11527;
var tmp11609 = inst_11528;
var tmp11610 = inst_11529;
var inst_11527__$1 = tmp11608;
var inst_11528__$1 = tmp11609;
var inst_11529__$1 = tmp11610;
var inst_11530__$1 = inst_11543;
var state_11587__$1 = (function (){var statearr_11614 = state_11587;
(statearr_11614[(20)] = inst_11527__$1);

(statearr_11614[(11)] = inst_11530__$1);

(statearr_11614[(12)] = inst_11528__$1);

(statearr_11614[(22)] = inst_11542);

(statearr_11614[(21)] = inst_11529__$1);

return statearr_11614;
})();
var statearr_11615_11689 = state_11587__$1;
(statearr_11615_11689[(2)] = null);

(statearr_11615_11689[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (40))){
var inst_11555 = (state_11587[(23)]);
var inst_11559 = done.call(null,null);
var inst_11560 = cljs.core.async.untap_STAR_.call(null,m,inst_11555);
var state_11587__$1 = (function (){var statearr_11616 = state_11587;
(statearr_11616[(24)] = inst_11559);

return statearr_11616;
})();
var statearr_11617_11690 = state_11587__$1;
(statearr_11617_11690[(2)] = inst_11560);

(statearr_11617_11690[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (33))){
var inst_11546 = (state_11587[(25)]);
var inst_11548 = cljs.core.chunked_seq_QMARK_.call(null,inst_11546);
var state_11587__$1 = state_11587;
if(inst_11548){
var statearr_11618_11691 = state_11587__$1;
(statearr_11618_11691[(1)] = (36));

} else {
var statearr_11619_11692 = state_11587__$1;
(statearr_11619_11692[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (13))){
var inst_11478 = (state_11587[(26)]);
var inst_11481 = cljs.core.async.close_BANG_.call(null,inst_11478);
var state_11587__$1 = state_11587;
var statearr_11620_11693 = state_11587__$1;
(statearr_11620_11693[(2)] = inst_11481);

(statearr_11620_11693[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (22))){
var inst_11499 = (state_11587[(8)]);
var inst_11502 = cljs.core.async.close_BANG_.call(null,inst_11499);
var state_11587__$1 = state_11587;
var statearr_11621_11694 = state_11587__$1;
(statearr_11621_11694[(2)] = inst_11502);

(statearr_11621_11694[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (36))){
var inst_11546 = (state_11587[(25)]);
var inst_11550 = cljs.core.chunk_first.call(null,inst_11546);
var inst_11551 = cljs.core.chunk_rest.call(null,inst_11546);
var inst_11552 = cljs.core.count.call(null,inst_11550);
var inst_11527 = inst_11551;
var inst_11528 = inst_11550;
var inst_11529 = inst_11552;
var inst_11530 = (0);
var state_11587__$1 = (function (){var statearr_11622 = state_11587;
(statearr_11622[(20)] = inst_11527);

(statearr_11622[(11)] = inst_11530);

(statearr_11622[(12)] = inst_11528);

(statearr_11622[(21)] = inst_11529);

return statearr_11622;
})();
var statearr_11623_11695 = state_11587__$1;
(statearr_11623_11695[(2)] = null);

(statearr_11623_11695[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (41))){
var inst_11546 = (state_11587[(25)]);
var inst_11562 = (state_11587[(2)]);
var inst_11563 = cljs.core.next.call(null,inst_11546);
var inst_11527 = inst_11563;
var inst_11528 = null;
var inst_11529 = (0);
var inst_11530 = (0);
var state_11587__$1 = (function (){var statearr_11624 = state_11587;
(statearr_11624[(20)] = inst_11527);

(statearr_11624[(27)] = inst_11562);

(statearr_11624[(11)] = inst_11530);

(statearr_11624[(12)] = inst_11528);

(statearr_11624[(21)] = inst_11529);

return statearr_11624;
})();
var statearr_11625_11696 = state_11587__$1;
(statearr_11625_11696[(2)] = null);

(statearr_11625_11696[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (43))){
var state_11587__$1 = state_11587;
var statearr_11626_11697 = state_11587__$1;
(statearr_11626_11697[(2)] = null);

(statearr_11626_11697[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (29))){
var inst_11571 = (state_11587[(2)]);
var state_11587__$1 = state_11587;
var statearr_11627_11698 = state_11587__$1;
(statearr_11627_11698[(2)] = inst_11571);

(statearr_11627_11698[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (44))){
var inst_11580 = (state_11587[(2)]);
var state_11587__$1 = (function (){var statearr_11628 = state_11587;
(statearr_11628[(28)] = inst_11580);

return statearr_11628;
})();
var statearr_11629_11699 = state_11587__$1;
(statearr_11629_11699[(2)] = null);

(statearr_11629_11699[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (6))){
var inst_11519 = (state_11587[(29)]);
var inst_11518 = cljs.core.deref.call(null,cs);
var inst_11519__$1 = cljs.core.keys.call(null,inst_11518);
var inst_11520 = cljs.core.count.call(null,inst_11519__$1);
var inst_11521 = cljs.core.reset_BANG_.call(null,dctr,inst_11520);
var inst_11526 = cljs.core.seq.call(null,inst_11519__$1);
var inst_11527 = inst_11526;
var inst_11528 = null;
var inst_11529 = (0);
var inst_11530 = (0);
var state_11587__$1 = (function (){var statearr_11630 = state_11587;
(statearr_11630[(29)] = inst_11519__$1);

(statearr_11630[(20)] = inst_11527);

(statearr_11630[(30)] = inst_11521);

(statearr_11630[(11)] = inst_11530);

(statearr_11630[(12)] = inst_11528);

(statearr_11630[(21)] = inst_11529);

return statearr_11630;
})();
var statearr_11631_11700 = state_11587__$1;
(statearr_11631_11700[(2)] = null);

(statearr_11631_11700[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (28))){
var inst_11546 = (state_11587[(25)]);
var inst_11527 = (state_11587[(20)]);
var inst_11546__$1 = cljs.core.seq.call(null,inst_11527);
var state_11587__$1 = (function (){var statearr_11632 = state_11587;
(statearr_11632[(25)] = inst_11546__$1);

return statearr_11632;
})();
if(inst_11546__$1){
var statearr_11633_11701 = state_11587__$1;
(statearr_11633_11701[(1)] = (33));

} else {
var statearr_11634_11702 = state_11587__$1;
(statearr_11634_11702[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (25))){
var inst_11530 = (state_11587[(11)]);
var inst_11529 = (state_11587[(21)]);
var inst_11532 = (inst_11530 < inst_11529);
var inst_11533 = inst_11532;
var state_11587__$1 = state_11587;
if(cljs.core.truth_(inst_11533)){
var statearr_11635_11703 = state_11587__$1;
(statearr_11635_11703[(1)] = (27));

} else {
var statearr_11636_11704 = state_11587__$1;
(statearr_11636_11704[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (34))){
var state_11587__$1 = state_11587;
var statearr_11637_11705 = state_11587__$1;
(statearr_11637_11705[(2)] = null);

(statearr_11637_11705[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (17))){
var state_11587__$1 = state_11587;
var statearr_11638_11706 = state_11587__$1;
(statearr_11638_11706[(2)] = null);

(statearr_11638_11706[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (3))){
var inst_11585 = (state_11587[(2)]);
var state_11587__$1 = state_11587;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_11587__$1,inst_11585);
} else {
if((state_val_11588 === (12))){
var inst_11514 = (state_11587[(2)]);
var state_11587__$1 = state_11587;
var statearr_11639_11707 = state_11587__$1;
(statearr_11639_11707[(2)] = inst_11514);

(statearr_11639_11707[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (2))){
var state_11587__$1 = state_11587;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_11587__$1,(4),ch);
} else {
if((state_val_11588 === (23))){
var state_11587__$1 = state_11587;
var statearr_11640_11708 = state_11587__$1;
(statearr_11640_11708[(2)] = null);

(statearr_11640_11708[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (35))){
var inst_11569 = (state_11587[(2)]);
var state_11587__$1 = state_11587;
var statearr_11641_11709 = state_11587__$1;
(statearr_11641_11709[(2)] = inst_11569);

(statearr_11641_11709[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (19))){
var inst_11488 = (state_11587[(7)]);
var inst_11492 = cljs.core.chunk_first.call(null,inst_11488);
var inst_11493 = cljs.core.chunk_rest.call(null,inst_11488);
var inst_11494 = cljs.core.count.call(null,inst_11492);
var inst_11468 = inst_11493;
var inst_11469 = inst_11492;
var inst_11470 = inst_11494;
var inst_11471 = (0);
var state_11587__$1 = (function (){var statearr_11642 = state_11587;
(statearr_11642[(13)] = inst_11469);

(statearr_11642[(15)] = inst_11471);

(statearr_11642[(16)] = inst_11470);

(statearr_11642[(17)] = inst_11468);

return statearr_11642;
})();
var statearr_11643_11710 = state_11587__$1;
(statearr_11643_11710[(2)] = null);

(statearr_11643_11710[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (11))){
var inst_11488 = (state_11587[(7)]);
var inst_11468 = (state_11587[(17)]);
var inst_11488__$1 = cljs.core.seq.call(null,inst_11468);
var state_11587__$1 = (function (){var statearr_11644 = state_11587;
(statearr_11644[(7)] = inst_11488__$1);

return statearr_11644;
})();
if(inst_11488__$1){
var statearr_11645_11711 = state_11587__$1;
(statearr_11645_11711[(1)] = (16));

} else {
var statearr_11646_11712 = state_11587__$1;
(statearr_11646_11712[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (9))){
var inst_11516 = (state_11587[(2)]);
var state_11587__$1 = state_11587;
var statearr_11647_11713 = state_11587__$1;
(statearr_11647_11713[(2)] = inst_11516);

(statearr_11647_11713[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (5))){
var inst_11466 = cljs.core.deref.call(null,cs);
var inst_11467 = cljs.core.seq.call(null,inst_11466);
var inst_11468 = inst_11467;
var inst_11469 = null;
var inst_11470 = (0);
var inst_11471 = (0);
var state_11587__$1 = (function (){var statearr_11648 = state_11587;
(statearr_11648[(13)] = inst_11469);

(statearr_11648[(15)] = inst_11471);

(statearr_11648[(16)] = inst_11470);

(statearr_11648[(17)] = inst_11468);

return statearr_11648;
})();
var statearr_11649_11714 = state_11587__$1;
(statearr_11649_11714[(2)] = null);

(statearr_11649_11714[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (14))){
var state_11587__$1 = state_11587;
var statearr_11650_11715 = state_11587__$1;
(statearr_11650_11715[(2)] = null);

(statearr_11650_11715[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (45))){
var inst_11577 = (state_11587[(2)]);
var state_11587__$1 = state_11587;
var statearr_11651_11716 = state_11587__$1;
(statearr_11651_11716[(2)] = inst_11577);

(statearr_11651_11716[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (26))){
var inst_11519 = (state_11587[(29)]);
var inst_11573 = (state_11587[(2)]);
var inst_11574 = cljs.core.seq.call(null,inst_11519);
var state_11587__$1 = (function (){var statearr_11652 = state_11587;
(statearr_11652[(31)] = inst_11573);

return statearr_11652;
})();
if(inst_11574){
var statearr_11653_11717 = state_11587__$1;
(statearr_11653_11717[(1)] = (42));

} else {
var statearr_11654_11718 = state_11587__$1;
(statearr_11654_11718[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (16))){
var inst_11488 = (state_11587[(7)]);
var inst_11490 = cljs.core.chunked_seq_QMARK_.call(null,inst_11488);
var state_11587__$1 = state_11587;
if(inst_11490){
var statearr_11655_11719 = state_11587__$1;
(statearr_11655_11719[(1)] = (19));

} else {
var statearr_11656_11720 = state_11587__$1;
(statearr_11656_11720[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (38))){
var inst_11566 = (state_11587[(2)]);
var state_11587__$1 = state_11587;
var statearr_11657_11721 = state_11587__$1;
(statearr_11657_11721[(2)] = inst_11566);

(statearr_11657_11721[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (30))){
var state_11587__$1 = state_11587;
var statearr_11658_11722 = state_11587__$1;
(statearr_11658_11722[(2)] = null);

(statearr_11658_11722[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (10))){
var inst_11469 = (state_11587[(13)]);
var inst_11471 = (state_11587[(15)]);
var inst_11477 = cljs.core._nth.call(null,inst_11469,inst_11471);
var inst_11478 = cljs.core.nth.call(null,inst_11477,(0),null);
var inst_11479 = cljs.core.nth.call(null,inst_11477,(1),null);
var state_11587__$1 = (function (){var statearr_11659 = state_11587;
(statearr_11659[(26)] = inst_11478);

return statearr_11659;
})();
if(cljs.core.truth_(inst_11479)){
var statearr_11660_11723 = state_11587__$1;
(statearr_11660_11723[(1)] = (13));

} else {
var statearr_11661_11724 = state_11587__$1;
(statearr_11661_11724[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (18))){
var inst_11512 = (state_11587[(2)]);
var state_11587__$1 = state_11587;
var statearr_11662_11725 = state_11587__$1;
(statearr_11662_11725[(2)] = inst_11512);

(statearr_11662_11725[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (42))){
var state_11587__$1 = state_11587;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_11587__$1,(45),dchan);
} else {
if((state_val_11588 === (37))){
var inst_11546 = (state_11587[(25)]);
var inst_11459 = (state_11587[(10)]);
var inst_11555 = (state_11587[(23)]);
var inst_11555__$1 = cljs.core.first.call(null,inst_11546);
var inst_11556 = cljs.core.async.put_BANG_.call(null,inst_11555__$1,inst_11459,done);
var state_11587__$1 = (function (){var statearr_11663 = state_11587;
(statearr_11663[(23)] = inst_11555__$1);

return statearr_11663;
})();
if(cljs.core.truth_(inst_11556)){
var statearr_11664_11726 = state_11587__$1;
(statearr_11664_11726[(1)] = (39));

} else {
var statearr_11665_11727 = state_11587__$1;
(statearr_11665_11727[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11588 === (8))){
var inst_11471 = (state_11587[(15)]);
var inst_11470 = (state_11587[(16)]);
var inst_11473 = (inst_11471 < inst_11470);
var inst_11474 = inst_11473;
var state_11587__$1 = state_11587;
if(cljs.core.truth_(inst_11474)){
var statearr_11666_11728 = state_11587__$1;
(statearr_11666_11728[(1)] = (10));

} else {
var statearr_11667_11729 = state_11587__$1;
(statearr_11667_11729[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__6804__auto___11675,cs,m,dchan,dctr,done))
;
return ((function (switch__6742__auto__,c__6804__auto___11675,cs,m,dchan,dctr,done){
return (function() {
var cljs$core$async$mult_$_state_machine__6743__auto__ = null;
var cljs$core$async$mult_$_state_machine__6743__auto____0 = (function (){
var statearr_11671 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_11671[(0)] = cljs$core$async$mult_$_state_machine__6743__auto__);

(statearr_11671[(1)] = (1));

return statearr_11671;
});
var cljs$core$async$mult_$_state_machine__6743__auto____1 = (function (state_11587){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_11587);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e11672){if((e11672 instanceof Object)){
var ex__6746__auto__ = e11672;
var statearr_11673_11730 = state_11587;
(statearr_11673_11730[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11587);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e11672;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__11731 = state_11587;
state_11587 = G__11731;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__6743__auto__ = function(state_11587){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__6743__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__6743__auto____1.call(this,state_11587);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__6743__auto____0;
cljs$core$async$mult_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__6743__auto____1;
return cljs$core$async$mult_$_state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto___11675,cs,m,dchan,dctr,done))
})();
var state__6806__auto__ = (function (){var statearr_11674 = f__6805__auto__.call(null);
(statearr_11674[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto___11675);

return statearr_11674;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto___11675,cs,m,dchan,dctr,done))
);


return m;
});
/**
 * Copies the mult source onto the supplied channel.
 * 
 * By default the channel will be closed when the source closes,
 * but can be determined by the close? parameter.
 */
cljs.core.async.tap = (function cljs$core$async$tap(){
var G__11733 = arguments.length;
switch (G__11733) {
case 2:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2 = (function (mult,ch){
return cljs.core.async.tap.call(null,mult,ch,true);
});

cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3 = (function (mult,ch,close_QMARK_){
cljs.core.async.tap_STAR_.call(null,mult,ch,close_QMARK_);

return ch;
});

cljs.core.async.tap.cljs$lang$maxFixedArity = 3;
/**
 * Disconnects a target channel from a mult
 */
cljs.core.async.untap = (function cljs$core$async$untap(mult,ch){
return cljs.core.async.untap_STAR_.call(null,mult,ch);
});
/**
 * Disconnects all target channels from a mult
 */
cljs.core.async.untap_all = (function cljs$core$async$untap_all(mult){
return cljs.core.async.untap_all_STAR_.call(null,mult);
});

cljs.core.async.Mix = (function (){var obj11736 = {};
return obj11736;
})();

cljs.core.async.admix_STAR_ = (function cljs$core$async$admix_STAR_(m,ch){
if((function (){var and__4308__auto__ = m;
if(and__4308__auto__){
return m.cljs$core$async$Mix$admix_STAR_$arity$2;
} else {
return and__4308__auto__;
}
})()){
return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else {
var x__4956__auto__ = (((m == null))?null:m);
return (function (){var or__4320__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__4956__auto__)]);
if(or__4320__auto__){
return or__4320__auto__;
} else {
var or__4320__auto____$1 = (cljs.core.async.admix_STAR_["_"]);
if(or__4320__auto____$1){
return or__4320__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"Mix.admix*",m);
}
}
})().call(null,m,ch);
}
});

cljs.core.async.unmix_STAR_ = (function cljs$core$async$unmix_STAR_(m,ch){
if((function (){var and__4308__auto__ = m;
if(and__4308__auto__){
return m.cljs$core$async$Mix$unmix_STAR_$arity$2;
} else {
return and__4308__auto__;
}
})()){
return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else {
var x__4956__auto__ = (((m == null))?null:m);
return (function (){var or__4320__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__4956__auto__)]);
if(or__4320__auto__){
return or__4320__auto__;
} else {
var or__4320__auto____$1 = (cljs.core.async.unmix_STAR_["_"]);
if(or__4320__auto____$1){
return or__4320__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"Mix.unmix*",m);
}
}
})().call(null,m,ch);
}
});

cljs.core.async.unmix_all_STAR_ = (function cljs$core$async$unmix_all_STAR_(m){
if((function (){var and__4308__auto__ = m;
if(and__4308__auto__){
return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1;
} else {
return and__4308__auto__;
}
})()){
return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else {
var x__4956__auto__ = (((m == null))?null:m);
return (function (){var or__4320__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__4956__auto__)]);
if(or__4320__auto__){
return or__4320__auto__;
} else {
var or__4320__auto____$1 = (cljs.core.async.unmix_all_STAR_["_"]);
if(or__4320__auto____$1){
return or__4320__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"Mix.unmix-all*",m);
}
}
})().call(null,m);
}
});

cljs.core.async.toggle_STAR_ = (function cljs$core$async$toggle_STAR_(m,state_map){
if((function (){var and__4308__auto__ = m;
if(and__4308__auto__){
return m.cljs$core$async$Mix$toggle_STAR_$arity$2;
} else {
return and__4308__auto__;
}
})()){
return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else {
var x__4956__auto__ = (((m == null))?null:m);
return (function (){var or__4320__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__4956__auto__)]);
if(or__4320__auto__){
return or__4320__auto__;
} else {
var or__4320__auto____$1 = (cljs.core.async.toggle_STAR_["_"]);
if(or__4320__auto____$1){
return or__4320__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"Mix.toggle*",m);
}
}
})().call(null,m,state_map);
}
});

cljs.core.async.solo_mode_STAR_ = (function cljs$core$async$solo_mode_STAR_(m,mode){
if((function (){var and__4308__auto__ = m;
if(and__4308__auto__){
return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2;
} else {
return and__4308__auto__;
}
})()){
return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else {
var x__4956__auto__ = (((m == null))?null:m);
return (function (){var or__4320__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__4956__auto__)]);
if(or__4320__auto__){
return or__4320__auto__;
} else {
var or__4320__auto____$1 = (cljs.core.async.solo_mode_STAR_["_"]);
if(or__4320__auto____$1){
return or__4320__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"Mix.solo-mode*",m);
}
}
})().call(null,m,mode);
}
});

cljs.core.async.ioc_alts_BANG_ = (function cljs$core$async$ioc_alts_BANG_(){
var argseq__5360__auto__ = ((((3) < arguments.length))?(new cljs.core.IndexedSeq(Array.prototype.slice.call(arguments,(3)),(0))):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__5360__auto__);
});

cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__11741){
var map__11742 = p__11741;
var map__11742__$1 = ((cljs.core.seq_QMARK_.call(null,map__11742))?cljs.core.apply.call(null,cljs.core.hash_map,map__11742):map__11742);
var opts = map__11742__$1;
var statearr_11743_11746 = state;
(statearr_11743_11746[cljs.core.async.impl.ioc_helpers.STATE_IDX] = cont_block);


var temp__4423__auto__ = cljs.core.async.do_alts.call(null,((function (map__11742,map__11742__$1,opts){
return (function (val){
var statearr_11744_11747 = state;
(statearr_11744_11747[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state);
});})(map__11742,map__11742__$1,opts))
,ports,opts);
if(cljs.core.truth_(temp__4423__auto__)){
var cb = temp__4423__auto__;
var statearr_11745_11748 = state;
(statearr_11745_11748[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = cljs.core.deref.call(null,cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
});

cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3);

cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq11737){
var G__11738 = cljs.core.first.call(null,seq11737);
var seq11737__$1 = cljs.core.next.call(null,seq11737);
var G__11739 = cljs.core.first.call(null,seq11737__$1);
var seq11737__$2 = cljs.core.next.call(null,seq11737__$1);
var G__11740 = cljs.core.first.call(null,seq11737__$2);
var seq11737__$3 = cljs.core.next.call(null,seq11737__$2);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__11738,G__11739,G__11740,seq11737__$3);
});
/**
 * Creates and returns a mix of one or more input channels which will
 * be put on the supplied out channel. Input sources can be added to
 * the mix with 'admix', and removed with 'unmix'. A mix supports
 * soloing, muting and pausing multiple inputs atomically using
 * 'toggle', and can solo using either muting or pausing as determined
 * by 'solo-mode'.
 * 
 * Each channel can have zero or more boolean modes set via 'toggle':
 * 
 * :solo - when true, only this (ond other soloed) channel(s) will appear
 * in the mix output channel. :mute and :pause states of soloed
 * channels are ignored. If solo-mode is :mute, non-soloed
 * channels are muted, if :pause, non-soloed channels are
 * paused.
 * 
 * :mute - muted channels will have their contents consumed but not included in the mix
 * :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
 */
cljs.core.async.mix = (function cljs$core$async$mix(out){
var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var solo_modes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pause","pause",-2095325672),null,new cljs.core.Keyword(null,"mute","mute",1151223646),null], null), null);
var attrs = cljs.core.conj.call(null,solo_modes,new cljs.core.Keyword(null,"solo","solo",-316350075));
var solo_mode = cljs.core.atom.call(null,new cljs.core.Keyword(null,"mute","mute",1151223646));
var change = cljs.core.async.chan.call(null);
var changed = ((function (cs,solo_modes,attrs,solo_mode,change){
return (function (){
return cljs.core.async.put_BANG_.call(null,change,true);
});})(cs,solo_modes,attrs,solo_mode,change))
;
var pick = ((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (attr,chs){
return cljs.core.reduce_kv.call(null,((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (ret,c,v){
if(cljs.core.truth_(attr.call(null,v))){
return cljs.core.conj.call(null,ret,c);
} else {
return ret;
}
});})(cs,solo_modes,attrs,solo_mode,change,changed))
,cljs.core.PersistentHashSet.EMPTY,chs);
});})(cs,solo_modes,attrs,solo_mode,change,changed))
;
var calc_state = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick){
return (function (){
var chs = cljs.core.deref.call(null,cs);
var mode = cljs.core.deref.call(null,solo_mode);
var solos = pick.call(null,new cljs.core.Keyword(null,"solo","solo",-316350075),chs);
var pauses = pick.call(null,new cljs.core.Keyword(null,"pause","pause",-2095325672),chs);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"solos","solos",1441458643),solos,new cljs.core.Keyword(null,"mutes","mutes",1068806309),pick.call(null,new cljs.core.Keyword(null,"mute","mute",1151223646),chs),new cljs.core.Keyword(null,"reads","reads",-1215067361),cljs.core.conj.call(null,(((cljs.core._EQ_.call(null,mode,new cljs.core.Keyword(null,"pause","pause",-2095325672))) && (!(cljs.core.empty_QMARK_.call(null,solos))))?cljs.core.vec.call(null,solos):cljs.core.vec.call(null,cljs.core.remove.call(null,pauses,cljs.core.keys.call(null,chs)))),change)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick))
;
var m = (function (){
if(typeof cljs.core.async.t11868 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t11868 = (function (change,mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta11869){
this.change = change;
this.mix = mix;
this.solo_mode = solo_mode;
this.pick = pick;
this.cs = cs;
this.calc_state = calc_state;
this.out = out;
this.changed = changed;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.meta11869 = meta11869;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t11868.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_11870,meta11869__$1){
var self__ = this;
var _11870__$1 = this;
return (new cljs.core.async.t11868(self__.change,self__.mix,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta11869__$1));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t11868.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_11870){
var self__ = this;
var _11870__$1 = this;
return self__.meta11869;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t11868.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t11868.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t11868.prototype.cljs$core$async$Mix$ = true;

cljs.core.async.t11868.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t11868.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t11868.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t11868.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.partial.call(null,cljs.core.merge_with,cljs.core.merge),state_map);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t11868.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,mode){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.solo_modes.call(null,mode))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("mode must be one of: "),cljs.core.str(self__.solo_modes)].join('')),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"mode","mode",-2000032078,null))))].join('')));
}

cljs.core.reset_BANG_.call(null,self__.solo_mode,mode);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t11868.getBasis = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (){
return new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"change","change",477485025,null),new cljs.core.Symbol(null,"mix","mix",2121373763,null),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"meta11869","meta11869",541851180,null)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t11868.cljs$lang$type = true;

cljs.core.async.t11868.cljs$lang$ctorStr = "cljs.core.async/t11868";

cljs.core.async.t11868.cljs$lang$ctorPrWriter = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (this__4899__auto__,writer__4900__auto__,opt__4901__auto__){
return cljs.core._write.call(null,writer__4900__auto__,"cljs.core.async/t11868");
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.__GT_t11868 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function cljs$core$async$mix_$___GT_t11868(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta11869){
return (new cljs.core.async.t11868(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta11869));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

}

return (new cljs.core.async.t11868(change,cljs$core$async$mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__6804__auto___11987 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto___11987,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto___11987,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (state_11940){
var state_val_11941 = (state_11940[(1)]);
if((state_val_11941 === (7))){
var inst_11884 = (state_11940[(7)]);
var inst_11889 = cljs.core.apply.call(null,cljs.core.hash_map,inst_11884);
var state_11940__$1 = state_11940;
var statearr_11942_11988 = state_11940__$1;
(statearr_11942_11988[(2)] = inst_11889);

(statearr_11942_11988[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11941 === (20))){
var inst_11899 = (state_11940[(8)]);
var state_11940__$1 = state_11940;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_11940__$1,(23),out,inst_11899);
} else {
if((state_val_11941 === (1))){
var inst_11874 = (state_11940[(9)]);
var inst_11874__$1 = calc_state.call(null);
var inst_11875 = cljs.core.seq_QMARK_.call(null,inst_11874__$1);
var state_11940__$1 = (function (){var statearr_11943 = state_11940;
(statearr_11943[(9)] = inst_11874__$1);

return statearr_11943;
})();
if(inst_11875){
var statearr_11944_11989 = state_11940__$1;
(statearr_11944_11989[(1)] = (2));

} else {
var statearr_11945_11990 = state_11940__$1;
(statearr_11945_11990[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11941 === (24))){
var inst_11892 = (state_11940[(10)]);
var inst_11884 = inst_11892;
var state_11940__$1 = (function (){var statearr_11946 = state_11940;
(statearr_11946[(7)] = inst_11884);

return statearr_11946;
})();
var statearr_11947_11991 = state_11940__$1;
(statearr_11947_11991[(2)] = null);

(statearr_11947_11991[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11941 === (4))){
var inst_11874 = (state_11940[(9)]);
var inst_11880 = (state_11940[(2)]);
var inst_11881 = cljs.core.get.call(null,inst_11880,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_11882 = cljs.core.get.call(null,inst_11880,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_11883 = cljs.core.get.call(null,inst_11880,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_11884 = inst_11874;
var state_11940__$1 = (function (){var statearr_11948 = state_11940;
(statearr_11948[(7)] = inst_11884);

(statearr_11948[(11)] = inst_11882);

(statearr_11948[(12)] = inst_11881);

(statearr_11948[(13)] = inst_11883);

return statearr_11948;
})();
var statearr_11949_11992 = state_11940__$1;
(statearr_11949_11992[(2)] = null);

(statearr_11949_11992[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11941 === (15))){
var state_11940__$1 = state_11940;
var statearr_11950_11993 = state_11940__$1;
(statearr_11950_11993[(2)] = null);

(statearr_11950_11993[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11941 === (21))){
var inst_11892 = (state_11940[(10)]);
var inst_11884 = inst_11892;
var state_11940__$1 = (function (){var statearr_11951 = state_11940;
(statearr_11951[(7)] = inst_11884);

return statearr_11951;
})();
var statearr_11952_11994 = state_11940__$1;
(statearr_11952_11994[(2)] = null);

(statearr_11952_11994[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11941 === (13))){
var inst_11936 = (state_11940[(2)]);
var state_11940__$1 = state_11940;
var statearr_11953_11995 = state_11940__$1;
(statearr_11953_11995[(2)] = inst_11936);

(statearr_11953_11995[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11941 === (22))){
var inst_11934 = (state_11940[(2)]);
var state_11940__$1 = state_11940;
var statearr_11954_11996 = state_11940__$1;
(statearr_11954_11996[(2)] = inst_11934);

(statearr_11954_11996[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11941 === (6))){
var inst_11938 = (state_11940[(2)]);
var state_11940__$1 = state_11940;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_11940__$1,inst_11938);
} else {
if((state_val_11941 === (25))){
var state_11940__$1 = state_11940;
var statearr_11955_11997 = state_11940__$1;
(statearr_11955_11997[(2)] = null);

(statearr_11955_11997[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11941 === (17))){
var inst_11914 = (state_11940[(14)]);
var state_11940__$1 = state_11940;
var statearr_11956_11998 = state_11940__$1;
(statearr_11956_11998[(2)] = inst_11914);

(statearr_11956_11998[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11941 === (3))){
var inst_11874 = (state_11940[(9)]);
var state_11940__$1 = state_11940;
var statearr_11957_11999 = state_11940__$1;
(statearr_11957_11999[(2)] = inst_11874);

(statearr_11957_11999[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11941 === (12))){
var inst_11900 = (state_11940[(15)]);
var inst_11914 = (state_11940[(14)]);
var inst_11893 = (state_11940[(16)]);
var inst_11914__$1 = inst_11893.call(null,inst_11900);
var state_11940__$1 = (function (){var statearr_11958 = state_11940;
(statearr_11958[(14)] = inst_11914__$1);

return statearr_11958;
})();
if(cljs.core.truth_(inst_11914__$1)){
var statearr_11959_12000 = state_11940__$1;
(statearr_11959_12000[(1)] = (17));

} else {
var statearr_11960_12001 = state_11940__$1;
(statearr_11960_12001[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11941 === (2))){
var inst_11874 = (state_11940[(9)]);
var inst_11877 = cljs.core.apply.call(null,cljs.core.hash_map,inst_11874);
var state_11940__$1 = state_11940;
var statearr_11961_12002 = state_11940__$1;
(statearr_11961_12002[(2)] = inst_11877);

(statearr_11961_12002[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11941 === (23))){
var inst_11925 = (state_11940[(2)]);
var state_11940__$1 = state_11940;
if(cljs.core.truth_(inst_11925)){
var statearr_11962_12003 = state_11940__$1;
(statearr_11962_12003[(1)] = (24));

} else {
var statearr_11963_12004 = state_11940__$1;
(statearr_11963_12004[(1)] = (25));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11941 === (19))){
var inst_11922 = (state_11940[(2)]);
var state_11940__$1 = state_11940;
if(cljs.core.truth_(inst_11922)){
var statearr_11964_12005 = state_11940__$1;
(statearr_11964_12005[(1)] = (20));

} else {
var statearr_11965_12006 = state_11940__$1;
(statearr_11965_12006[(1)] = (21));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11941 === (11))){
var inst_11899 = (state_11940[(8)]);
var inst_11905 = (inst_11899 == null);
var state_11940__$1 = state_11940;
if(cljs.core.truth_(inst_11905)){
var statearr_11966_12007 = state_11940__$1;
(statearr_11966_12007[(1)] = (14));

} else {
var statearr_11967_12008 = state_11940__$1;
(statearr_11967_12008[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11941 === (9))){
var inst_11892 = (state_11940[(10)]);
var inst_11892__$1 = (state_11940[(2)]);
var inst_11893 = cljs.core.get.call(null,inst_11892__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_11894 = cljs.core.get.call(null,inst_11892__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_11895 = cljs.core.get.call(null,inst_11892__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_11940__$1 = (function (){var statearr_11968 = state_11940;
(statearr_11968[(16)] = inst_11893);

(statearr_11968[(17)] = inst_11894);

(statearr_11968[(10)] = inst_11892__$1);

return statearr_11968;
})();
return cljs.core.async.ioc_alts_BANG_.call(null,state_11940__$1,(10),inst_11895);
} else {
if((state_val_11941 === (5))){
var inst_11884 = (state_11940[(7)]);
var inst_11887 = cljs.core.seq_QMARK_.call(null,inst_11884);
var state_11940__$1 = state_11940;
if(inst_11887){
var statearr_11969_12009 = state_11940__$1;
(statearr_11969_12009[(1)] = (7));

} else {
var statearr_11970_12010 = state_11940__$1;
(statearr_11970_12010[(1)] = (8));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11941 === (14))){
var inst_11900 = (state_11940[(15)]);
var inst_11907 = cljs.core.swap_BANG_.call(null,cs,cljs.core.dissoc,inst_11900);
var state_11940__$1 = state_11940;
var statearr_11971_12011 = state_11940__$1;
(statearr_11971_12011[(2)] = inst_11907);

(statearr_11971_12011[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11941 === (26))){
var inst_11930 = (state_11940[(2)]);
var state_11940__$1 = state_11940;
var statearr_11972_12012 = state_11940__$1;
(statearr_11972_12012[(2)] = inst_11930);

(statearr_11972_12012[(1)] = (22));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11941 === (16))){
var inst_11910 = (state_11940[(2)]);
var inst_11911 = calc_state.call(null);
var inst_11884 = inst_11911;
var state_11940__$1 = (function (){var statearr_11973 = state_11940;
(statearr_11973[(7)] = inst_11884);

(statearr_11973[(18)] = inst_11910);

return statearr_11973;
})();
var statearr_11974_12013 = state_11940__$1;
(statearr_11974_12013[(2)] = null);

(statearr_11974_12013[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11941 === (10))){
var inst_11899 = (state_11940[(8)]);
var inst_11900 = (state_11940[(15)]);
var inst_11898 = (state_11940[(2)]);
var inst_11899__$1 = cljs.core.nth.call(null,inst_11898,(0),null);
var inst_11900__$1 = cljs.core.nth.call(null,inst_11898,(1),null);
var inst_11901 = (inst_11899__$1 == null);
var inst_11902 = cljs.core._EQ_.call(null,inst_11900__$1,change);
var inst_11903 = (inst_11901) || (inst_11902);
var state_11940__$1 = (function (){var statearr_11975 = state_11940;
(statearr_11975[(8)] = inst_11899__$1);

(statearr_11975[(15)] = inst_11900__$1);

return statearr_11975;
})();
if(cljs.core.truth_(inst_11903)){
var statearr_11976_12014 = state_11940__$1;
(statearr_11976_12014[(1)] = (11));

} else {
var statearr_11977_12015 = state_11940__$1;
(statearr_11977_12015[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11941 === (18))){
var inst_11900 = (state_11940[(15)]);
var inst_11893 = (state_11940[(16)]);
var inst_11894 = (state_11940[(17)]);
var inst_11917 = cljs.core.empty_QMARK_.call(null,inst_11893);
var inst_11918 = inst_11894.call(null,inst_11900);
var inst_11919 = cljs.core.not.call(null,inst_11918);
var inst_11920 = (inst_11917) && (inst_11919);
var state_11940__$1 = state_11940;
var statearr_11978_12016 = state_11940__$1;
(statearr_11978_12016[(2)] = inst_11920);

(statearr_11978_12016[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11941 === (8))){
var inst_11884 = (state_11940[(7)]);
var state_11940__$1 = state_11940;
var statearr_11979_12017 = state_11940__$1;
(statearr_11979_12017[(2)] = inst_11884);

(statearr_11979_12017[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__6804__auto___11987,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
;
return ((function (switch__6742__auto__,c__6804__auto___11987,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function() {
var cljs$core$async$mix_$_state_machine__6743__auto__ = null;
var cljs$core$async$mix_$_state_machine__6743__auto____0 = (function (){
var statearr_11983 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_11983[(0)] = cljs$core$async$mix_$_state_machine__6743__auto__);

(statearr_11983[(1)] = (1));

return statearr_11983;
});
var cljs$core$async$mix_$_state_machine__6743__auto____1 = (function (state_11940){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_11940);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e11984){if((e11984 instanceof Object)){
var ex__6746__auto__ = e11984;
var statearr_11985_12018 = state_11940;
(statearr_11985_12018[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11940);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e11984;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12019 = state_11940;
state_11940 = G__12019;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__6743__auto__ = function(state_11940){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__6743__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__6743__auto____1.call(this,state_11940);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__6743__auto____0;
cljs$core$async$mix_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__6743__auto____1;
return cljs$core$async$mix_$_state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto___11987,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
})();
var state__6806__auto__ = (function (){var statearr_11986 = f__6805__auto__.call(null);
(statearr_11986[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto___11987);

return statearr_11986;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto___11987,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
);


return m;
});
/**
 * Adds ch as an input to the mix
 */
cljs.core.async.admix = (function cljs$core$async$admix(mix,ch){
return cljs.core.async.admix_STAR_.call(null,mix,ch);
});
/**
 * Removes ch as an input to the mix
 */
cljs.core.async.unmix = (function cljs$core$async$unmix(mix,ch){
return cljs.core.async.unmix_STAR_.call(null,mix,ch);
});
/**
 * removes all inputs from the mix
 */
cljs.core.async.unmix_all = (function cljs$core$async$unmix_all(mix){
return cljs.core.async.unmix_all_STAR_.call(null,mix);
});
/**
 * Atomically sets the state(s) of one or more channels in a mix. The
 * state map is a map of channels -> channel-state-map. A
 * channel-state-map is a map of attrs -> boolean, where attr is one or
 * more of :mute, :pause or :solo. Any states supplied are merged with
 * the current state.
 * 
 * Note that channels can be added to a mix via toggle, which can be
 * used to add channels in a particular (e.g. paused) state.
 */
cljs.core.async.toggle = (function cljs$core$async$toggle(mix,state_map){
return cljs.core.async.toggle_STAR_.call(null,mix,state_map);
});
/**
 * Sets the solo mode of the mix. mode must be one of :mute or :pause
 */
cljs.core.async.solo_mode = (function cljs$core$async$solo_mode(mix,mode){
return cljs.core.async.solo_mode_STAR_.call(null,mix,mode);
});

cljs.core.async.Pub = (function (){var obj12021 = {};
return obj12021;
})();

cljs.core.async.sub_STAR_ = (function cljs$core$async$sub_STAR_(p,v,ch,close_QMARK_){
if((function (){var and__4308__auto__ = p;
if(and__4308__auto__){
return p.cljs$core$async$Pub$sub_STAR_$arity$4;
} else {
return and__4308__auto__;
}
})()){
return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else {
var x__4956__auto__ = (((p == null))?null:p);
return (function (){var or__4320__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__4956__auto__)]);
if(or__4320__auto__){
return or__4320__auto__;
} else {
var or__4320__auto____$1 = (cljs.core.async.sub_STAR_["_"]);
if(or__4320__auto____$1){
return or__4320__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"Pub.sub*",p);
}
}
})().call(null,p,v,ch,close_QMARK_);
}
});

cljs.core.async.unsub_STAR_ = (function cljs$core$async$unsub_STAR_(p,v,ch){
if((function (){var and__4308__auto__ = p;
if(and__4308__auto__){
return p.cljs$core$async$Pub$unsub_STAR_$arity$3;
} else {
return and__4308__auto__;
}
})()){
return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else {
var x__4956__auto__ = (((p == null))?null:p);
return (function (){var or__4320__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__4956__auto__)]);
if(or__4320__auto__){
return or__4320__auto__;
} else {
var or__4320__auto____$1 = (cljs.core.async.unsub_STAR_["_"]);
if(or__4320__auto____$1){
return or__4320__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub*",p);
}
}
})().call(null,p,v,ch);
}
});

cljs.core.async.unsub_all_STAR_ = (function cljs$core$async$unsub_all_STAR_(){
var G__12023 = arguments.length;
switch (G__12023) {
case 1:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (p){
if((function (){var and__4308__auto__ = p;
if(and__4308__auto__){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1;
} else {
return and__4308__auto__;
}
})()){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else {
var x__4956__auto__ = (((p == null))?null:p);
return (function (){var or__4320__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__4956__auto__)]);
if(or__4320__auto__){
return or__4320__auto__;
} else {
var or__4320__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);
if(or__4320__auto____$1){
return or__4320__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
})().call(null,p);
}
});

cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (p,v){
if((function (){var and__4308__auto__ = p;
if(and__4308__auto__){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2;
} else {
return and__4308__auto__;
}
})()){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else {
var x__4956__auto__ = (((p == null))?null:p);
return (function (){var or__4320__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__4956__auto__)]);
if(or__4320__auto__){
return or__4320__auto__;
} else {
var or__4320__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);
if(or__4320__auto____$1){
return or__4320__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
})().call(null,p,v);
}
});

cljs.core.async.unsub_all_STAR_.cljs$lang$maxFixedArity = 2;

/**
 * Creates and returns a pub(lication) of the supplied channel,
 * partitioned into topics by the topic-fn. topic-fn will be applied to
 * each value on the channel and the result will determine the 'topic'
 * on which that value will be put. Channels can be subscribed to
 * receive copies of topics using 'sub', and unsubscribed using
 * 'unsub'. Each topic will be handled by an internal mult on a
 * dedicated channel. By default these internal channels are
 * unbuffered, but a buf-fn can be supplied which, given a topic,
 * creates a buffer with desired properties.
 * 
 * Each item is distributed to all subs in parallel and synchronously,
 * i.e. each sub must accept before the next item is distributed. Use
 * buffering/windowing to prevent slow subs from holding up the pub.
 * 
 * Items received when there are no matching subs get dropped.
 * 
 * Note that if buf-fns are used then each topic is handled
 * asynchronously, i.e. if a channel is subscribed to more than one
 * topic it should not expect them to be interleaved identically with
 * the source.
 */
cljs.core.async.pub = (function cljs$core$async$pub(){
var G__12027 = arguments.length;
switch (G__12027) {
case 2:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2 = (function (ch,topic_fn){
return cljs.core.async.pub.call(null,ch,topic_fn,cljs.core.constantly.call(null,null));
});

cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3 = (function (ch,topic_fn,buf_fn){
var mults = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var ensure_mult = ((function (mults){
return (function (topic){
var or__4320__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,mults),topic);
if(cljs.core.truth_(or__4320__auto__)){
return or__4320__auto__;
} else {
return cljs.core.get.call(null,cljs.core.swap_BANG_.call(null,mults,((function (or__4320__auto__,mults){
return (function (p1__12025_SHARP_){
if(cljs.core.truth_(p1__12025_SHARP_.call(null,topic))){
return p1__12025_SHARP_;
} else {
return cljs.core.assoc.call(null,p1__12025_SHARP_,topic,cljs.core.async.mult.call(null,cljs.core.async.chan.call(null,buf_fn.call(null,topic))));
}
});})(or__4320__auto__,mults))
),topic);
}
});})(mults))
;
var p = (function (){
if(typeof cljs.core.async.t12028 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t12028 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta12029){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta12029 = meta12029;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t12028.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (mults,ensure_mult){
return (function (_12030,meta12029__$1){
var self__ = this;
var _12030__$1 = this;
return (new cljs.core.async.t12028(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta12029__$1));
});})(mults,ensure_mult))
;

cljs.core.async.t12028.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (mults,ensure_mult){
return (function (_12030){
var self__ = this;
var _12030__$1 = this;
return self__.meta12029;
});})(mults,ensure_mult))
;

cljs.core.async.t12028.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t12028.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(mults,ensure_mult))
;

cljs.core.async.t12028.prototype.cljs$core$async$Pub$ = true;

cljs.core.async.t12028.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = self__.ensure_mult.call(null,topic);
return cljs.core.async.tap.call(null,m,ch__$1,close_QMARK_);
});})(mults,ensure_mult))
;

cljs.core.async.t12028.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1){
var self__ = this;
var p__$1 = this;
var temp__4423__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,self__.mults),topic);
if(cljs.core.truth_(temp__4423__auto__)){
var m = temp__4423__auto__;
return cljs.core.async.untap.call(null,m,ch__$1);
} else {
return null;
}
});})(mults,ensure_mult))
;

cljs.core.async.t12028.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_.call(null,self__.mults,cljs.core.PersistentArrayMap.EMPTY);
});})(mults,ensure_mult))
;

cljs.core.async.t12028.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = ((function (mults,ensure_mult){
return (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.call(null,self__.mults,cljs.core.dissoc,topic);
});})(mults,ensure_mult))
;

cljs.core.async.t12028.getBasis = ((function (mults,ensure_mult){
return (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta12029","meta12029",736238891,null)], null);
});})(mults,ensure_mult))
;

cljs.core.async.t12028.cljs$lang$type = true;

cljs.core.async.t12028.cljs$lang$ctorStr = "cljs.core.async/t12028";

cljs.core.async.t12028.cljs$lang$ctorPrWriter = ((function (mults,ensure_mult){
return (function (this__4899__auto__,writer__4900__auto__,opt__4901__auto__){
return cljs.core._write.call(null,writer__4900__auto__,"cljs.core.async/t12028");
});})(mults,ensure_mult))
;

cljs.core.async.__GT_t12028 = ((function (mults,ensure_mult){
return (function cljs$core$async$__GT_t12028(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta12029){
return (new cljs.core.async.t12028(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta12029));
});})(mults,ensure_mult))
;

}

return (new cljs.core.async.t12028(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__6804__auto___12151 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto___12151,mults,ensure_mult,p){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto___12151,mults,ensure_mult,p){
return (function (state_12102){
var state_val_12103 = (state_12102[(1)]);
if((state_val_12103 === (7))){
var inst_12098 = (state_12102[(2)]);
var state_12102__$1 = state_12102;
var statearr_12104_12152 = state_12102__$1;
(statearr_12104_12152[(2)] = inst_12098);

(statearr_12104_12152[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12103 === (20))){
var state_12102__$1 = state_12102;
var statearr_12105_12153 = state_12102__$1;
(statearr_12105_12153[(2)] = null);

(statearr_12105_12153[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12103 === (1))){
var state_12102__$1 = state_12102;
var statearr_12106_12154 = state_12102__$1;
(statearr_12106_12154[(2)] = null);

(statearr_12106_12154[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12103 === (24))){
var inst_12081 = (state_12102[(7)]);
var inst_12090 = cljs.core.swap_BANG_.call(null,mults,cljs.core.dissoc,inst_12081);
var state_12102__$1 = state_12102;
var statearr_12107_12155 = state_12102__$1;
(statearr_12107_12155[(2)] = inst_12090);

(statearr_12107_12155[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12103 === (4))){
var inst_12033 = (state_12102[(8)]);
var inst_12033__$1 = (state_12102[(2)]);
var inst_12034 = (inst_12033__$1 == null);
var state_12102__$1 = (function (){var statearr_12108 = state_12102;
(statearr_12108[(8)] = inst_12033__$1);

return statearr_12108;
})();
if(cljs.core.truth_(inst_12034)){
var statearr_12109_12156 = state_12102__$1;
(statearr_12109_12156[(1)] = (5));

} else {
var statearr_12110_12157 = state_12102__$1;
(statearr_12110_12157[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12103 === (15))){
var inst_12075 = (state_12102[(2)]);
var state_12102__$1 = state_12102;
var statearr_12111_12158 = state_12102__$1;
(statearr_12111_12158[(2)] = inst_12075);

(statearr_12111_12158[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12103 === (21))){
var inst_12095 = (state_12102[(2)]);
var state_12102__$1 = (function (){var statearr_12112 = state_12102;
(statearr_12112[(9)] = inst_12095);

return statearr_12112;
})();
var statearr_12113_12159 = state_12102__$1;
(statearr_12113_12159[(2)] = null);

(statearr_12113_12159[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12103 === (13))){
var inst_12057 = (state_12102[(10)]);
var inst_12059 = cljs.core.chunked_seq_QMARK_.call(null,inst_12057);
var state_12102__$1 = state_12102;
if(inst_12059){
var statearr_12114_12160 = state_12102__$1;
(statearr_12114_12160[(1)] = (16));

} else {
var statearr_12115_12161 = state_12102__$1;
(statearr_12115_12161[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12103 === (22))){
var inst_12087 = (state_12102[(2)]);
var state_12102__$1 = state_12102;
if(cljs.core.truth_(inst_12087)){
var statearr_12116_12162 = state_12102__$1;
(statearr_12116_12162[(1)] = (23));

} else {
var statearr_12117_12163 = state_12102__$1;
(statearr_12117_12163[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12103 === (6))){
var inst_12081 = (state_12102[(7)]);
var inst_12033 = (state_12102[(8)]);
var inst_12083 = (state_12102[(11)]);
var inst_12081__$1 = topic_fn.call(null,inst_12033);
var inst_12082 = cljs.core.deref.call(null,mults);
var inst_12083__$1 = cljs.core.get.call(null,inst_12082,inst_12081__$1);
var state_12102__$1 = (function (){var statearr_12118 = state_12102;
(statearr_12118[(7)] = inst_12081__$1);

(statearr_12118[(11)] = inst_12083__$1);

return statearr_12118;
})();
if(cljs.core.truth_(inst_12083__$1)){
var statearr_12119_12164 = state_12102__$1;
(statearr_12119_12164[(1)] = (19));

} else {
var statearr_12120_12165 = state_12102__$1;
(statearr_12120_12165[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12103 === (25))){
var inst_12092 = (state_12102[(2)]);
var state_12102__$1 = state_12102;
var statearr_12121_12166 = state_12102__$1;
(statearr_12121_12166[(2)] = inst_12092);

(statearr_12121_12166[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12103 === (17))){
var inst_12057 = (state_12102[(10)]);
var inst_12066 = cljs.core.first.call(null,inst_12057);
var inst_12067 = cljs.core.async.muxch_STAR_.call(null,inst_12066);
var inst_12068 = cljs.core.async.close_BANG_.call(null,inst_12067);
var inst_12069 = cljs.core.next.call(null,inst_12057);
var inst_12043 = inst_12069;
var inst_12044 = null;
var inst_12045 = (0);
var inst_12046 = (0);
var state_12102__$1 = (function (){var statearr_12122 = state_12102;
(statearr_12122[(12)] = inst_12043);

(statearr_12122[(13)] = inst_12044);

(statearr_12122[(14)] = inst_12068);

(statearr_12122[(15)] = inst_12046);

(statearr_12122[(16)] = inst_12045);

return statearr_12122;
})();
var statearr_12123_12167 = state_12102__$1;
(statearr_12123_12167[(2)] = null);

(statearr_12123_12167[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12103 === (3))){
var inst_12100 = (state_12102[(2)]);
var state_12102__$1 = state_12102;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12102__$1,inst_12100);
} else {
if((state_val_12103 === (12))){
var inst_12077 = (state_12102[(2)]);
var state_12102__$1 = state_12102;
var statearr_12124_12168 = state_12102__$1;
(statearr_12124_12168[(2)] = inst_12077);

(statearr_12124_12168[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12103 === (2))){
var state_12102__$1 = state_12102;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12102__$1,(4),ch);
} else {
if((state_val_12103 === (23))){
var state_12102__$1 = state_12102;
var statearr_12125_12169 = state_12102__$1;
(statearr_12125_12169[(2)] = null);

(statearr_12125_12169[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12103 === (19))){
var inst_12033 = (state_12102[(8)]);
var inst_12083 = (state_12102[(11)]);
var inst_12085 = cljs.core.async.muxch_STAR_.call(null,inst_12083);
var state_12102__$1 = state_12102;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12102__$1,(22),inst_12085,inst_12033);
} else {
if((state_val_12103 === (11))){
var inst_12043 = (state_12102[(12)]);
var inst_12057 = (state_12102[(10)]);
var inst_12057__$1 = cljs.core.seq.call(null,inst_12043);
var state_12102__$1 = (function (){var statearr_12126 = state_12102;
(statearr_12126[(10)] = inst_12057__$1);

return statearr_12126;
})();
if(inst_12057__$1){
var statearr_12127_12170 = state_12102__$1;
(statearr_12127_12170[(1)] = (13));

} else {
var statearr_12128_12171 = state_12102__$1;
(statearr_12128_12171[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12103 === (9))){
var inst_12079 = (state_12102[(2)]);
var state_12102__$1 = state_12102;
var statearr_12129_12172 = state_12102__$1;
(statearr_12129_12172[(2)] = inst_12079);

(statearr_12129_12172[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12103 === (5))){
var inst_12040 = cljs.core.deref.call(null,mults);
var inst_12041 = cljs.core.vals.call(null,inst_12040);
var inst_12042 = cljs.core.seq.call(null,inst_12041);
var inst_12043 = inst_12042;
var inst_12044 = null;
var inst_12045 = (0);
var inst_12046 = (0);
var state_12102__$1 = (function (){var statearr_12130 = state_12102;
(statearr_12130[(12)] = inst_12043);

(statearr_12130[(13)] = inst_12044);

(statearr_12130[(15)] = inst_12046);

(statearr_12130[(16)] = inst_12045);

return statearr_12130;
})();
var statearr_12131_12173 = state_12102__$1;
(statearr_12131_12173[(2)] = null);

(statearr_12131_12173[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12103 === (14))){
var state_12102__$1 = state_12102;
var statearr_12135_12174 = state_12102__$1;
(statearr_12135_12174[(2)] = null);

(statearr_12135_12174[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12103 === (16))){
var inst_12057 = (state_12102[(10)]);
var inst_12061 = cljs.core.chunk_first.call(null,inst_12057);
var inst_12062 = cljs.core.chunk_rest.call(null,inst_12057);
var inst_12063 = cljs.core.count.call(null,inst_12061);
var inst_12043 = inst_12062;
var inst_12044 = inst_12061;
var inst_12045 = inst_12063;
var inst_12046 = (0);
var state_12102__$1 = (function (){var statearr_12136 = state_12102;
(statearr_12136[(12)] = inst_12043);

(statearr_12136[(13)] = inst_12044);

(statearr_12136[(15)] = inst_12046);

(statearr_12136[(16)] = inst_12045);

return statearr_12136;
})();
var statearr_12137_12175 = state_12102__$1;
(statearr_12137_12175[(2)] = null);

(statearr_12137_12175[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12103 === (10))){
var inst_12043 = (state_12102[(12)]);
var inst_12044 = (state_12102[(13)]);
var inst_12046 = (state_12102[(15)]);
var inst_12045 = (state_12102[(16)]);
var inst_12051 = cljs.core._nth.call(null,inst_12044,inst_12046);
var inst_12052 = cljs.core.async.muxch_STAR_.call(null,inst_12051);
var inst_12053 = cljs.core.async.close_BANG_.call(null,inst_12052);
var inst_12054 = (inst_12046 + (1));
var tmp12132 = inst_12043;
var tmp12133 = inst_12044;
var tmp12134 = inst_12045;
var inst_12043__$1 = tmp12132;
var inst_12044__$1 = tmp12133;
var inst_12045__$1 = tmp12134;
var inst_12046__$1 = inst_12054;
var state_12102__$1 = (function (){var statearr_12138 = state_12102;
(statearr_12138[(12)] = inst_12043__$1);

(statearr_12138[(17)] = inst_12053);

(statearr_12138[(13)] = inst_12044__$1);

(statearr_12138[(15)] = inst_12046__$1);

(statearr_12138[(16)] = inst_12045__$1);

return statearr_12138;
})();
var statearr_12139_12176 = state_12102__$1;
(statearr_12139_12176[(2)] = null);

(statearr_12139_12176[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12103 === (18))){
var inst_12072 = (state_12102[(2)]);
var state_12102__$1 = state_12102;
var statearr_12140_12177 = state_12102__$1;
(statearr_12140_12177[(2)] = inst_12072);

(statearr_12140_12177[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12103 === (8))){
var inst_12046 = (state_12102[(15)]);
var inst_12045 = (state_12102[(16)]);
var inst_12048 = (inst_12046 < inst_12045);
var inst_12049 = inst_12048;
var state_12102__$1 = state_12102;
if(cljs.core.truth_(inst_12049)){
var statearr_12141_12178 = state_12102__$1;
(statearr_12141_12178[(1)] = (10));

} else {
var statearr_12142_12179 = state_12102__$1;
(statearr_12142_12179[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__6804__auto___12151,mults,ensure_mult,p))
;
return ((function (switch__6742__auto__,c__6804__auto___12151,mults,ensure_mult,p){
return (function() {
var cljs$core$async$state_machine__6743__auto__ = null;
var cljs$core$async$state_machine__6743__auto____0 = (function (){
var statearr_12146 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_12146[(0)] = cljs$core$async$state_machine__6743__auto__);

(statearr_12146[(1)] = (1));

return statearr_12146;
});
var cljs$core$async$state_machine__6743__auto____1 = (function (state_12102){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_12102);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e12147){if((e12147 instanceof Object)){
var ex__6746__auto__ = e12147;
var statearr_12148_12180 = state_12102;
(statearr_12148_12180[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12102);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e12147;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12181 = state_12102;
state_12102 = G__12181;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs$core$async$state_machine__6743__auto__ = function(state_12102){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__6743__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__6743__auto____1.call(this,state_12102);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__6743__auto____0;
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__6743__auto____1;
return cljs$core$async$state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto___12151,mults,ensure_mult,p))
})();
var state__6806__auto__ = (function (){var statearr_12149 = f__6805__auto__.call(null);
(statearr_12149[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto___12151);

return statearr_12149;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto___12151,mults,ensure_mult,p))
);


return p;
});

cljs.core.async.pub.cljs$lang$maxFixedArity = 3;
/**
 * Subscribes a channel to a topic of a pub.
 * 
 * By default the channel will be closed when the source closes,
 * but can be determined by the close? parameter.
 */
cljs.core.async.sub = (function cljs$core$async$sub(){
var G__12183 = arguments.length;
switch (G__12183) {
case 3:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3 = (function (p,topic,ch){
return cljs.core.async.sub.call(null,p,topic,ch,true);
});

cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4 = (function (p,topic,ch,close_QMARK_){
return cljs.core.async.sub_STAR_.call(null,p,topic,ch,close_QMARK_);
});

cljs.core.async.sub.cljs$lang$maxFixedArity = 4;
/**
 * Unsubscribes a channel from a topic of a pub
 */
cljs.core.async.unsub = (function cljs$core$async$unsub(p,topic,ch){
return cljs.core.async.unsub_STAR_.call(null,p,topic,ch);
});
/**
 * Unsubscribes all channels from a pub, or a topic of a pub
 */
cljs.core.async.unsub_all = (function cljs$core$async$unsub_all(){
var G__12186 = arguments.length;
switch (G__12186) {
case 1:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1 = (function (p){
return cljs.core.async.unsub_all_STAR_.call(null,p);
});

cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2 = (function (p,topic){
return cljs.core.async.unsub_all_STAR_.call(null,p,topic);
});

cljs.core.async.unsub_all.cljs$lang$maxFixedArity = 2;
/**
 * Takes a function and a collection of source channels, and returns a
 * channel which contains the values produced by applying f to the set
 * of first items taken from each source channel, followed by applying
 * f to the set of second items from each channel, until any one of the
 * channels is closed, at which point the output channel will be
 * closed. The returned channel will be unbuffered by default, or a
 * buf-or-n can be supplied
 */
cljs.core.async.map = (function cljs$core$async$map(){
var G__12189 = arguments.length;
switch (G__12189) {
case 2:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.map.cljs$core$IFn$_invoke$arity$2 = (function (f,chs){
return cljs.core.async.map.call(null,f,chs,null);
});

cljs.core.async.map.cljs$core$IFn$_invoke$arity$3 = (function (f,chs,buf_or_n){
var chs__$1 = cljs.core.vec.call(null,chs);
var out = cljs.core.async.chan.call(null,buf_or_n);
var cnt = cljs.core.count.call(null,chs__$1);
var rets = cljs.core.object_array.call(null,cnt);
var dchan = cljs.core.async.chan.call(null,(1));
var dctr = cljs.core.atom.call(null,null);
var done = cljs.core.mapv.call(null,((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (i){
return ((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (ret){
(rets[i] = ret);

if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.call(null,dchan,rets.slice((0)));
} else {
return null;
}
});
;})(chs__$1,out,cnt,rets,dchan,dctr))
});})(chs__$1,out,cnt,rets,dchan,dctr))
,cljs.core.range.call(null,cnt));
var c__6804__auto___12259 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto___12259,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto___12259,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (state_12228){
var state_val_12229 = (state_12228[(1)]);
if((state_val_12229 === (7))){
var state_12228__$1 = state_12228;
var statearr_12230_12260 = state_12228__$1;
(statearr_12230_12260[(2)] = null);

(statearr_12230_12260[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12229 === (1))){
var state_12228__$1 = state_12228;
var statearr_12231_12261 = state_12228__$1;
(statearr_12231_12261[(2)] = null);

(statearr_12231_12261[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12229 === (4))){
var inst_12192 = (state_12228[(7)]);
var inst_12194 = (inst_12192 < cnt);
var state_12228__$1 = state_12228;
if(cljs.core.truth_(inst_12194)){
var statearr_12232_12262 = state_12228__$1;
(statearr_12232_12262[(1)] = (6));

} else {
var statearr_12233_12263 = state_12228__$1;
(statearr_12233_12263[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12229 === (15))){
var inst_12224 = (state_12228[(2)]);
var state_12228__$1 = state_12228;
var statearr_12234_12264 = state_12228__$1;
(statearr_12234_12264[(2)] = inst_12224);

(statearr_12234_12264[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12229 === (13))){
var inst_12217 = cljs.core.async.close_BANG_.call(null,out);
var state_12228__$1 = state_12228;
var statearr_12235_12265 = state_12228__$1;
(statearr_12235_12265[(2)] = inst_12217);

(statearr_12235_12265[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12229 === (6))){
var state_12228__$1 = state_12228;
var statearr_12236_12266 = state_12228__$1;
(statearr_12236_12266[(2)] = null);

(statearr_12236_12266[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12229 === (3))){
var inst_12226 = (state_12228[(2)]);
var state_12228__$1 = state_12228;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12228__$1,inst_12226);
} else {
if((state_val_12229 === (12))){
var inst_12214 = (state_12228[(8)]);
var inst_12214__$1 = (state_12228[(2)]);
var inst_12215 = cljs.core.some.call(null,cljs.core.nil_QMARK_,inst_12214__$1);
var state_12228__$1 = (function (){var statearr_12237 = state_12228;
(statearr_12237[(8)] = inst_12214__$1);

return statearr_12237;
})();
if(cljs.core.truth_(inst_12215)){
var statearr_12238_12267 = state_12228__$1;
(statearr_12238_12267[(1)] = (13));

} else {
var statearr_12239_12268 = state_12228__$1;
(statearr_12239_12268[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12229 === (2))){
var inst_12191 = cljs.core.reset_BANG_.call(null,dctr,cnt);
var inst_12192 = (0);
var state_12228__$1 = (function (){var statearr_12240 = state_12228;
(statearr_12240[(7)] = inst_12192);

(statearr_12240[(9)] = inst_12191);

return statearr_12240;
})();
var statearr_12241_12269 = state_12228__$1;
(statearr_12241_12269[(2)] = null);

(statearr_12241_12269[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12229 === (11))){
var inst_12192 = (state_12228[(7)]);
var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_12228,(10),Object,null,(9));
var inst_12201 = chs__$1.call(null,inst_12192);
var inst_12202 = done.call(null,inst_12192);
var inst_12203 = cljs.core.async.take_BANG_.call(null,inst_12201,inst_12202);
var state_12228__$1 = state_12228;
var statearr_12242_12270 = state_12228__$1;
(statearr_12242_12270[(2)] = inst_12203);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12228__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12229 === (9))){
var inst_12192 = (state_12228[(7)]);
var inst_12205 = (state_12228[(2)]);
var inst_12206 = (inst_12192 + (1));
var inst_12192__$1 = inst_12206;
var state_12228__$1 = (function (){var statearr_12243 = state_12228;
(statearr_12243[(7)] = inst_12192__$1);

(statearr_12243[(10)] = inst_12205);

return statearr_12243;
})();
var statearr_12244_12271 = state_12228__$1;
(statearr_12244_12271[(2)] = null);

(statearr_12244_12271[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12229 === (5))){
var inst_12212 = (state_12228[(2)]);
var state_12228__$1 = (function (){var statearr_12245 = state_12228;
(statearr_12245[(11)] = inst_12212);

return statearr_12245;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12228__$1,(12),dchan);
} else {
if((state_val_12229 === (14))){
var inst_12214 = (state_12228[(8)]);
var inst_12219 = cljs.core.apply.call(null,f,inst_12214);
var state_12228__$1 = state_12228;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12228__$1,(16),out,inst_12219);
} else {
if((state_val_12229 === (16))){
var inst_12221 = (state_12228[(2)]);
var state_12228__$1 = (function (){var statearr_12246 = state_12228;
(statearr_12246[(12)] = inst_12221);

return statearr_12246;
})();
var statearr_12247_12272 = state_12228__$1;
(statearr_12247_12272[(2)] = null);

(statearr_12247_12272[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12229 === (10))){
var inst_12196 = (state_12228[(2)]);
var inst_12197 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);
var state_12228__$1 = (function (){var statearr_12248 = state_12228;
(statearr_12248[(13)] = inst_12196);

return statearr_12248;
})();
var statearr_12249_12273 = state_12228__$1;
(statearr_12249_12273[(2)] = inst_12197);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12228__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12229 === (8))){
var inst_12210 = (state_12228[(2)]);
var state_12228__$1 = state_12228;
var statearr_12250_12274 = state_12228__$1;
(statearr_12250_12274[(2)] = inst_12210);

(statearr_12250_12274[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__6804__auto___12259,chs__$1,out,cnt,rets,dchan,dctr,done))
;
return ((function (switch__6742__auto__,c__6804__auto___12259,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function() {
var cljs$core$async$state_machine__6743__auto__ = null;
var cljs$core$async$state_machine__6743__auto____0 = (function (){
var statearr_12254 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_12254[(0)] = cljs$core$async$state_machine__6743__auto__);

(statearr_12254[(1)] = (1));

return statearr_12254;
});
var cljs$core$async$state_machine__6743__auto____1 = (function (state_12228){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_12228);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e12255){if((e12255 instanceof Object)){
var ex__6746__auto__ = e12255;
var statearr_12256_12275 = state_12228;
(statearr_12256_12275[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12228);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e12255;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12276 = state_12228;
state_12228 = G__12276;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs$core$async$state_machine__6743__auto__ = function(state_12228){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__6743__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__6743__auto____1.call(this,state_12228);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__6743__auto____0;
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__6743__auto____1;
return cljs$core$async$state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto___12259,chs__$1,out,cnt,rets,dchan,dctr,done))
})();
var state__6806__auto__ = (function (){var statearr_12257 = f__6805__auto__.call(null);
(statearr_12257[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto___12259);

return statearr_12257;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto___12259,chs__$1,out,cnt,rets,dchan,dctr,done))
);


return out;
});

cljs.core.async.map.cljs$lang$maxFixedArity = 3;
/**
 * Takes a collection of source channels and returns a channel which
 * contains all values taken from them. The returned channel will be
 * unbuffered by default, or a buf-or-n can be supplied. The channel
 * will close after all the source channels have closed.
 */
cljs.core.async.merge = (function cljs$core$async$merge(){
var G__12279 = arguments.length;
switch (G__12279) {
case 1:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1 = (function (chs){
return cljs.core.async.merge.call(null,chs,null);
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2 = (function (chs,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__6804__auto___12334 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto___12334,out){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto___12334,out){
return (function (state_12309){
var state_val_12310 = (state_12309[(1)]);
if((state_val_12310 === (7))){
var inst_12288 = (state_12309[(7)]);
var inst_12289 = (state_12309[(8)]);
var inst_12288__$1 = (state_12309[(2)]);
var inst_12289__$1 = cljs.core.nth.call(null,inst_12288__$1,(0),null);
var inst_12290 = cljs.core.nth.call(null,inst_12288__$1,(1),null);
var inst_12291 = (inst_12289__$1 == null);
var state_12309__$1 = (function (){var statearr_12311 = state_12309;
(statearr_12311[(7)] = inst_12288__$1);

(statearr_12311[(8)] = inst_12289__$1);

(statearr_12311[(9)] = inst_12290);

return statearr_12311;
})();
if(cljs.core.truth_(inst_12291)){
var statearr_12312_12335 = state_12309__$1;
(statearr_12312_12335[(1)] = (8));

} else {
var statearr_12313_12336 = state_12309__$1;
(statearr_12313_12336[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12310 === (1))){
var inst_12280 = cljs.core.vec.call(null,chs);
var inst_12281 = inst_12280;
var state_12309__$1 = (function (){var statearr_12314 = state_12309;
(statearr_12314[(10)] = inst_12281);

return statearr_12314;
})();
var statearr_12315_12337 = state_12309__$1;
(statearr_12315_12337[(2)] = null);

(statearr_12315_12337[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12310 === (4))){
var inst_12281 = (state_12309[(10)]);
var state_12309__$1 = state_12309;
return cljs.core.async.ioc_alts_BANG_.call(null,state_12309__$1,(7),inst_12281);
} else {
if((state_val_12310 === (6))){
var inst_12305 = (state_12309[(2)]);
var state_12309__$1 = state_12309;
var statearr_12316_12338 = state_12309__$1;
(statearr_12316_12338[(2)] = inst_12305);

(statearr_12316_12338[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12310 === (3))){
var inst_12307 = (state_12309[(2)]);
var state_12309__$1 = state_12309;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12309__$1,inst_12307);
} else {
if((state_val_12310 === (2))){
var inst_12281 = (state_12309[(10)]);
var inst_12283 = cljs.core.count.call(null,inst_12281);
var inst_12284 = (inst_12283 > (0));
var state_12309__$1 = state_12309;
if(cljs.core.truth_(inst_12284)){
var statearr_12318_12339 = state_12309__$1;
(statearr_12318_12339[(1)] = (4));

} else {
var statearr_12319_12340 = state_12309__$1;
(statearr_12319_12340[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12310 === (11))){
var inst_12281 = (state_12309[(10)]);
var inst_12298 = (state_12309[(2)]);
var tmp12317 = inst_12281;
var inst_12281__$1 = tmp12317;
var state_12309__$1 = (function (){var statearr_12320 = state_12309;
(statearr_12320[(10)] = inst_12281__$1);

(statearr_12320[(11)] = inst_12298);

return statearr_12320;
})();
var statearr_12321_12341 = state_12309__$1;
(statearr_12321_12341[(2)] = null);

(statearr_12321_12341[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12310 === (9))){
var inst_12289 = (state_12309[(8)]);
var state_12309__$1 = state_12309;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12309__$1,(11),out,inst_12289);
} else {
if((state_val_12310 === (5))){
var inst_12303 = cljs.core.async.close_BANG_.call(null,out);
var state_12309__$1 = state_12309;
var statearr_12322_12342 = state_12309__$1;
(statearr_12322_12342[(2)] = inst_12303);

(statearr_12322_12342[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12310 === (10))){
var inst_12301 = (state_12309[(2)]);
var state_12309__$1 = state_12309;
var statearr_12323_12343 = state_12309__$1;
(statearr_12323_12343[(2)] = inst_12301);

(statearr_12323_12343[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12310 === (8))){
var inst_12288 = (state_12309[(7)]);
var inst_12281 = (state_12309[(10)]);
var inst_12289 = (state_12309[(8)]);
var inst_12290 = (state_12309[(9)]);
var inst_12293 = (function (){var cs = inst_12281;
var vec__12286 = inst_12288;
var v = inst_12289;
var c = inst_12290;
return ((function (cs,vec__12286,v,c,inst_12288,inst_12281,inst_12289,inst_12290,state_val_12310,c__6804__auto___12334,out){
return (function (p1__12277_SHARP_){
return cljs.core.not_EQ_.call(null,c,p1__12277_SHARP_);
});
;})(cs,vec__12286,v,c,inst_12288,inst_12281,inst_12289,inst_12290,state_val_12310,c__6804__auto___12334,out))
})();
var inst_12294 = cljs.core.filterv.call(null,inst_12293,inst_12281);
var inst_12281__$1 = inst_12294;
var state_12309__$1 = (function (){var statearr_12324 = state_12309;
(statearr_12324[(10)] = inst_12281__$1);

return statearr_12324;
})();
var statearr_12325_12344 = state_12309__$1;
(statearr_12325_12344[(2)] = null);

(statearr_12325_12344[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});})(c__6804__auto___12334,out))
;
return ((function (switch__6742__auto__,c__6804__auto___12334,out){
return (function() {
var cljs$core$async$state_machine__6743__auto__ = null;
var cljs$core$async$state_machine__6743__auto____0 = (function (){
var statearr_12329 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_12329[(0)] = cljs$core$async$state_machine__6743__auto__);

(statearr_12329[(1)] = (1));

return statearr_12329;
});
var cljs$core$async$state_machine__6743__auto____1 = (function (state_12309){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_12309);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e12330){if((e12330 instanceof Object)){
var ex__6746__auto__ = e12330;
var statearr_12331_12345 = state_12309;
(statearr_12331_12345[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12309);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e12330;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12346 = state_12309;
state_12309 = G__12346;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs$core$async$state_machine__6743__auto__ = function(state_12309){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__6743__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__6743__auto____1.call(this,state_12309);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__6743__auto____0;
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__6743__auto____1;
return cljs$core$async$state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto___12334,out))
})();
var state__6806__auto__ = (function (){var statearr_12332 = f__6805__auto__.call(null);
(statearr_12332[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto___12334);

return statearr_12332;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto___12334,out))
);


return out;
});

cljs.core.async.merge.cljs$lang$maxFixedArity = 2;
/**
 * Returns a channel containing the single (collection) result of the
 * items taken from the channel conjoined to the supplied
 * collection. ch must close before into produces a result.
 */
cljs.core.async.into = (function cljs$core$async$into(coll,ch){
return cljs.core.async.reduce.call(null,cljs.core.conj,coll,ch);
});
/**
 * Returns a channel that will return, at most, n items from ch. After n items
 * have been returned, or ch has been closed, the return chanel will close.
 * 
 * The output channel is unbuffered by default, unless buf-or-n is given.
 */
cljs.core.async.take = (function cljs$core$async$take(){
var G__12348 = arguments.length;
switch (G__12348) {
case 2:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.take.call(null,n,ch,null);
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__6804__auto___12396 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto___12396,out){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto___12396,out){
return (function (state_12372){
var state_val_12373 = (state_12372[(1)]);
if((state_val_12373 === (7))){
var inst_12354 = (state_12372[(7)]);
var inst_12354__$1 = (state_12372[(2)]);
var inst_12355 = (inst_12354__$1 == null);
var inst_12356 = cljs.core.not.call(null,inst_12355);
var state_12372__$1 = (function (){var statearr_12374 = state_12372;
(statearr_12374[(7)] = inst_12354__$1);

return statearr_12374;
})();
if(inst_12356){
var statearr_12375_12397 = state_12372__$1;
(statearr_12375_12397[(1)] = (8));

} else {
var statearr_12376_12398 = state_12372__$1;
(statearr_12376_12398[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12373 === (1))){
var inst_12349 = (0);
var state_12372__$1 = (function (){var statearr_12377 = state_12372;
(statearr_12377[(8)] = inst_12349);

return statearr_12377;
})();
var statearr_12378_12399 = state_12372__$1;
(statearr_12378_12399[(2)] = null);

(statearr_12378_12399[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12373 === (4))){
var state_12372__$1 = state_12372;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12372__$1,(7),ch);
} else {
if((state_val_12373 === (6))){
var inst_12367 = (state_12372[(2)]);
var state_12372__$1 = state_12372;
var statearr_12379_12400 = state_12372__$1;
(statearr_12379_12400[(2)] = inst_12367);

(statearr_12379_12400[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12373 === (3))){
var inst_12369 = (state_12372[(2)]);
var inst_12370 = cljs.core.async.close_BANG_.call(null,out);
var state_12372__$1 = (function (){var statearr_12380 = state_12372;
(statearr_12380[(9)] = inst_12369);

return statearr_12380;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12372__$1,inst_12370);
} else {
if((state_val_12373 === (2))){
var inst_12349 = (state_12372[(8)]);
var inst_12351 = (inst_12349 < n);
var state_12372__$1 = state_12372;
if(cljs.core.truth_(inst_12351)){
var statearr_12381_12401 = state_12372__$1;
(statearr_12381_12401[(1)] = (4));

} else {
var statearr_12382_12402 = state_12372__$1;
(statearr_12382_12402[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12373 === (11))){
var inst_12349 = (state_12372[(8)]);
var inst_12359 = (state_12372[(2)]);
var inst_12360 = (inst_12349 + (1));
var inst_12349__$1 = inst_12360;
var state_12372__$1 = (function (){var statearr_12383 = state_12372;
(statearr_12383[(8)] = inst_12349__$1);

(statearr_12383[(10)] = inst_12359);

return statearr_12383;
})();
var statearr_12384_12403 = state_12372__$1;
(statearr_12384_12403[(2)] = null);

(statearr_12384_12403[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12373 === (9))){
var state_12372__$1 = state_12372;
var statearr_12385_12404 = state_12372__$1;
(statearr_12385_12404[(2)] = null);

(statearr_12385_12404[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12373 === (5))){
var state_12372__$1 = state_12372;
var statearr_12386_12405 = state_12372__$1;
(statearr_12386_12405[(2)] = null);

(statearr_12386_12405[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12373 === (10))){
var inst_12364 = (state_12372[(2)]);
var state_12372__$1 = state_12372;
var statearr_12387_12406 = state_12372__$1;
(statearr_12387_12406[(2)] = inst_12364);

(statearr_12387_12406[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12373 === (8))){
var inst_12354 = (state_12372[(7)]);
var state_12372__$1 = state_12372;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12372__$1,(11),out,inst_12354);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});})(c__6804__auto___12396,out))
;
return ((function (switch__6742__auto__,c__6804__auto___12396,out){
return (function() {
var cljs$core$async$state_machine__6743__auto__ = null;
var cljs$core$async$state_machine__6743__auto____0 = (function (){
var statearr_12391 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_12391[(0)] = cljs$core$async$state_machine__6743__auto__);

(statearr_12391[(1)] = (1));

return statearr_12391;
});
var cljs$core$async$state_machine__6743__auto____1 = (function (state_12372){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_12372);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e12392){if((e12392 instanceof Object)){
var ex__6746__auto__ = e12392;
var statearr_12393_12407 = state_12372;
(statearr_12393_12407[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12372);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e12392;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12408 = state_12372;
state_12372 = G__12408;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs$core$async$state_machine__6743__auto__ = function(state_12372){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__6743__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__6743__auto____1.call(this,state_12372);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__6743__auto____0;
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__6743__auto____1;
return cljs$core$async$state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto___12396,out))
})();
var state__6806__auto__ = (function (){var statearr_12394 = f__6805__auto__.call(null);
(statearr_12394[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto___12396);

return statearr_12394;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto___12396,out))
);


return out;
});

cljs.core.async.take.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
if(typeof cljs.core.async.t12416 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t12416 = (function (map_LT_,f,ch,meta12417){
this.map_LT_ = map_LT_;
this.f = f;
this.ch = ch;
this.meta12417 = meta12417;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t12416.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_12418,meta12417__$1){
var self__ = this;
var _12418__$1 = this;
return (new cljs.core.async.t12416(self__.map_LT_,self__.f,self__.ch,meta12417__$1));
});

cljs.core.async.t12416.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_12418){
var self__ = this;
var _12418__$1 = this;
return self__.meta12417;
});

cljs.core.async.t12416.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t12416.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t12416.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t12416.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t12416.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,(function (){
if(typeof cljs.core.async.t12419 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t12419 = (function (map_LT_,f,ch,meta12417,_,fn1,meta12420){
this.map_LT_ = map_LT_;
this.f = f;
this.ch = ch;
this.meta12417 = meta12417;
this._ = _;
this.fn1 = fn1;
this.meta12420 = meta12420;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t12419.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (___$1){
return (function (_12421,meta12420__$1){
var self__ = this;
var _12421__$1 = this;
return (new cljs.core.async.t12419(self__.map_LT_,self__.f,self__.ch,self__.meta12417,self__._,self__.fn1,meta12420__$1));
});})(___$1))
;

cljs.core.async.t12419.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (___$1){
return (function (_12421){
var self__ = this;
var _12421__$1 = this;
return self__.meta12420;
});})(___$1))
;

cljs.core.async.t12419.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t12419.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.fn1);
});})(___$1))
;

cljs.core.async.t12419.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit.call(null,self__.fn1);
return ((function (f1,___$2,___$1){
return (function (p1__12409_SHARP_){
return f1.call(null,(((p1__12409_SHARP_ == null))?null:self__.f.call(null,p1__12409_SHARP_)));
});
;})(f1,___$2,___$1))
});})(___$1))
;

cljs.core.async.t12419.getBasis = ((function (___$1){
return (function (){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"map<","map<",-1235808357,null),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta12417","meta12417",881766163,null),new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta12420","meta12420",-850743975,null)], null);
});})(___$1))
;

cljs.core.async.t12419.cljs$lang$type = true;

cljs.core.async.t12419.cljs$lang$ctorStr = "cljs.core.async/t12419";

cljs.core.async.t12419.cljs$lang$ctorPrWriter = ((function (___$1){
return (function (this__4899__auto__,writer__4900__auto__,opt__4901__auto__){
return cljs.core._write.call(null,writer__4900__auto__,"cljs.core.async/t12419");
});})(___$1))
;

cljs.core.async.__GT_t12419 = ((function (___$1){
return (function cljs$core$async$map_LT__$___GT_t12419(map_LT___$1,f__$1,ch__$1,meta12417__$1,___$2,fn1__$1,meta12420){
return (new cljs.core.async.t12419(map_LT___$1,f__$1,ch__$1,meta12417__$1,___$2,fn1__$1,meta12420));
});})(___$1))
;

}

return (new cljs.core.async.t12419(self__.map_LT_,self__.f,self__.ch,self__.meta12417,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY));
})()
);
if(cljs.core.truth_((function (){var and__4308__auto__ = ret;
if(cljs.core.truth_(and__4308__auto__)){
return !((cljs.core.deref.call(null,ret) == null));
} else {
return and__4308__auto__;
}
})())){
return cljs.core.async.impl.channels.box.call(null,self__.f.call(null,cljs.core.deref.call(null,ret)));
} else {
return ret;
}
});

cljs.core.async.t12416.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t12416.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
});

cljs.core.async.t12416.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"map<","map<",-1235808357,null),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta12417","meta12417",881766163,null)], null);
});

cljs.core.async.t12416.cljs$lang$type = true;

cljs.core.async.t12416.cljs$lang$ctorStr = "cljs.core.async/t12416";

cljs.core.async.t12416.cljs$lang$ctorPrWriter = (function (this__4899__auto__,writer__4900__auto__,opt__4901__auto__){
return cljs.core._write.call(null,writer__4900__auto__,"cljs.core.async/t12416");
});

cljs.core.async.__GT_t12416 = (function cljs$core$async$map_LT__$___GT_t12416(map_LT___$1,f__$1,ch__$1,meta12417){
return (new cljs.core.async.t12416(map_LT___$1,f__$1,ch__$1,meta12417));
});

}

return (new cljs.core.async.t12416(cljs$core$async$map_LT_,f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
if(typeof cljs.core.async.t12425 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t12425 = (function (map_GT_,f,ch,meta12426){
this.map_GT_ = map_GT_;
this.f = f;
this.ch = ch;
this.meta12426 = meta12426;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t12425.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_12427,meta12426__$1){
var self__ = this;
var _12427__$1 = this;
return (new cljs.core.async.t12425(self__.map_GT_,self__.f,self__.ch,meta12426__$1));
});

cljs.core.async.t12425.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_12427){
var self__ = this;
var _12427__$1 = this;
return self__.meta12426;
});

cljs.core.async.t12425.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t12425.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t12425.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t12425.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t12425.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t12425.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,self__.f.call(null,val),fn1);
});

cljs.core.async.t12425.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"map>","map>",1676369295,null),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta12426","meta12426",-1212490502,null)], null);
});

cljs.core.async.t12425.cljs$lang$type = true;

cljs.core.async.t12425.cljs$lang$ctorStr = "cljs.core.async/t12425";

cljs.core.async.t12425.cljs$lang$ctorPrWriter = (function (this__4899__auto__,writer__4900__auto__,opt__4901__auto__){
return cljs.core._write.call(null,writer__4900__auto__,"cljs.core.async/t12425");
});

cljs.core.async.__GT_t12425 = (function cljs$core$async$map_GT__$___GT_t12425(map_GT___$1,f__$1,ch__$1,meta12426){
return (new cljs.core.async.t12425(map_GT___$1,f__$1,ch__$1,meta12426));
});

}

return (new cljs.core.async.t12425(cljs$core$async$map_GT_,f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
if(typeof cljs.core.async.t12431 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t12431 = (function (filter_GT_,p,ch,meta12432){
this.filter_GT_ = filter_GT_;
this.p = p;
this.ch = ch;
this.meta12432 = meta12432;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t12431.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_12433,meta12432__$1){
var self__ = this;
var _12433__$1 = this;
return (new cljs.core.async.t12431(self__.filter_GT_,self__.p,self__.ch,meta12432__$1));
});

cljs.core.async.t12431.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_12433){
var self__ = this;
var _12433__$1 = this;
return self__.meta12432;
});

cljs.core.async.t12431.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t12431.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t12431.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t12431.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t12431.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t12431.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t12431.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.p.call(null,val))){
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box.call(null,cljs.core.not.call(null,cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch)));
}
});

cljs.core.async.t12431.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"filter>","filter>",-37644455,null),new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta12432","meta12432",-1915193708,null)], null);
});

cljs.core.async.t12431.cljs$lang$type = true;

cljs.core.async.t12431.cljs$lang$ctorStr = "cljs.core.async/t12431";

cljs.core.async.t12431.cljs$lang$ctorPrWriter = (function (this__4899__auto__,writer__4900__auto__,opt__4901__auto__){
return cljs.core._write.call(null,writer__4900__auto__,"cljs.core.async/t12431");
});

cljs.core.async.__GT_t12431 = (function cljs$core$async$filter_GT__$___GT_t12431(filter_GT___$1,p__$1,ch__$1,meta12432){
return (new cljs.core.async.t12431(filter_GT___$1,p__$1,ch__$1,meta12432));
});

}

return (new cljs.core.async.t12431(cljs$core$async$filter_GT_,p,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_GT_ = (function cljs$core$async$remove_GT_(p,ch){
return cljs.core.async.filter_GT_.call(null,cljs.core.complement.call(null,p),ch);
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_LT_ = (function cljs$core$async$filter_LT_(){
var G__12435 = arguments.length;
switch (G__12435) {
case 2:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.filter_LT_.call(null,p,ch,null);
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__6804__auto___12478 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto___12478,out){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto___12478,out){
return (function (state_12456){
var state_val_12457 = (state_12456[(1)]);
if((state_val_12457 === (7))){
var inst_12452 = (state_12456[(2)]);
var state_12456__$1 = state_12456;
var statearr_12458_12479 = state_12456__$1;
(statearr_12458_12479[(2)] = inst_12452);

(statearr_12458_12479[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12457 === (1))){
var state_12456__$1 = state_12456;
var statearr_12459_12480 = state_12456__$1;
(statearr_12459_12480[(2)] = null);

(statearr_12459_12480[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12457 === (4))){
var inst_12438 = (state_12456[(7)]);
var inst_12438__$1 = (state_12456[(2)]);
var inst_12439 = (inst_12438__$1 == null);
var state_12456__$1 = (function (){var statearr_12460 = state_12456;
(statearr_12460[(7)] = inst_12438__$1);

return statearr_12460;
})();
if(cljs.core.truth_(inst_12439)){
var statearr_12461_12481 = state_12456__$1;
(statearr_12461_12481[(1)] = (5));

} else {
var statearr_12462_12482 = state_12456__$1;
(statearr_12462_12482[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12457 === (6))){
var inst_12438 = (state_12456[(7)]);
var inst_12443 = p.call(null,inst_12438);
var state_12456__$1 = state_12456;
if(cljs.core.truth_(inst_12443)){
var statearr_12463_12483 = state_12456__$1;
(statearr_12463_12483[(1)] = (8));

} else {
var statearr_12464_12484 = state_12456__$1;
(statearr_12464_12484[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12457 === (3))){
var inst_12454 = (state_12456[(2)]);
var state_12456__$1 = state_12456;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12456__$1,inst_12454);
} else {
if((state_val_12457 === (2))){
var state_12456__$1 = state_12456;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12456__$1,(4),ch);
} else {
if((state_val_12457 === (11))){
var inst_12446 = (state_12456[(2)]);
var state_12456__$1 = state_12456;
var statearr_12465_12485 = state_12456__$1;
(statearr_12465_12485[(2)] = inst_12446);

(statearr_12465_12485[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12457 === (9))){
var state_12456__$1 = state_12456;
var statearr_12466_12486 = state_12456__$1;
(statearr_12466_12486[(2)] = null);

(statearr_12466_12486[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12457 === (5))){
var inst_12441 = cljs.core.async.close_BANG_.call(null,out);
var state_12456__$1 = state_12456;
var statearr_12467_12487 = state_12456__$1;
(statearr_12467_12487[(2)] = inst_12441);

(statearr_12467_12487[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12457 === (10))){
var inst_12449 = (state_12456[(2)]);
var state_12456__$1 = (function (){var statearr_12468 = state_12456;
(statearr_12468[(8)] = inst_12449);

return statearr_12468;
})();
var statearr_12469_12488 = state_12456__$1;
(statearr_12469_12488[(2)] = null);

(statearr_12469_12488[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12457 === (8))){
var inst_12438 = (state_12456[(7)]);
var state_12456__$1 = state_12456;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12456__$1,(11),out,inst_12438);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});})(c__6804__auto___12478,out))
;
return ((function (switch__6742__auto__,c__6804__auto___12478,out){
return (function() {
var cljs$core$async$state_machine__6743__auto__ = null;
var cljs$core$async$state_machine__6743__auto____0 = (function (){
var statearr_12473 = [null,null,null,null,null,null,null,null,null];
(statearr_12473[(0)] = cljs$core$async$state_machine__6743__auto__);

(statearr_12473[(1)] = (1));

return statearr_12473;
});
var cljs$core$async$state_machine__6743__auto____1 = (function (state_12456){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_12456);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e12474){if((e12474 instanceof Object)){
var ex__6746__auto__ = e12474;
var statearr_12475_12489 = state_12456;
(statearr_12475_12489[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12456);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e12474;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12490 = state_12456;
state_12456 = G__12490;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs$core$async$state_machine__6743__auto__ = function(state_12456){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__6743__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__6743__auto____1.call(this,state_12456);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__6743__auto____0;
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__6743__auto____1;
return cljs$core$async$state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto___12478,out))
})();
var state__6806__auto__ = (function (){var statearr_12476 = f__6805__auto__.call(null);
(statearr_12476[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto___12478);

return statearr_12476;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto___12478,out))
);


return out;
});

cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(){
var G__12492 = arguments.length;
switch (G__12492) {
case 2:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.remove_LT_.call(null,p,ch,null);
});

cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
return cljs.core.async.filter_LT_.call(null,cljs.core.complement.call(null,p),ch,buf_or_n);
});

cljs.core.async.remove_LT_.cljs$lang$maxFixedArity = 3;
cljs.core.async.mapcat_STAR_ = (function cljs$core$async$mapcat_STAR_(f,in$,out){
var c__6804__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto__){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto__){
return (function (state_12659){
var state_val_12660 = (state_12659[(1)]);
if((state_val_12660 === (7))){
var inst_12655 = (state_12659[(2)]);
var state_12659__$1 = state_12659;
var statearr_12661_12702 = state_12659__$1;
(statearr_12661_12702[(2)] = inst_12655);

(statearr_12661_12702[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12660 === (20))){
var inst_12625 = (state_12659[(7)]);
var inst_12636 = (state_12659[(2)]);
var inst_12637 = cljs.core.next.call(null,inst_12625);
var inst_12611 = inst_12637;
var inst_12612 = null;
var inst_12613 = (0);
var inst_12614 = (0);
var state_12659__$1 = (function (){var statearr_12662 = state_12659;
(statearr_12662[(8)] = inst_12613);

(statearr_12662[(9)] = inst_12614);

(statearr_12662[(10)] = inst_12636);

(statearr_12662[(11)] = inst_12611);

(statearr_12662[(12)] = inst_12612);

return statearr_12662;
})();
var statearr_12663_12703 = state_12659__$1;
(statearr_12663_12703[(2)] = null);

(statearr_12663_12703[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12660 === (1))){
var state_12659__$1 = state_12659;
var statearr_12664_12704 = state_12659__$1;
(statearr_12664_12704[(2)] = null);

(statearr_12664_12704[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12660 === (4))){
var inst_12600 = (state_12659[(13)]);
var inst_12600__$1 = (state_12659[(2)]);
var inst_12601 = (inst_12600__$1 == null);
var state_12659__$1 = (function (){var statearr_12665 = state_12659;
(statearr_12665[(13)] = inst_12600__$1);

return statearr_12665;
})();
if(cljs.core.truth_(inst_12601)){
var statearr_12666_12705 = state_12659__$1;
(statearr_12666_12705[(1)] = (5));

} else {
var statearr_12667_12706 = state_12659__$1;
(statearr_12667_12706[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12660 === (15))){
var state_12659__$1 = state_12659;
var statearr_12671_12707 = state_12659__$1;
(statearr_12671_12707[(2)] = null);

(statearr_12671_12707[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12660 === (21))){
var state_12659__$1 = state_12659;
var statearr_12672_12708 = state_12659__$1;
(statearr_12672_12708[(2)] = null);

(statearr_12672_12708[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12660 === (13))){
var inst_12613 = (state_12659[(8)]);
var inst_12614 = (state_12659[(9)]);
var inst_12611 = (state_12659[(11)]);
var inst_12612 = (state_12659[(12)]);
var inst_12621 = (state_12659[(2)]);
var inst_12622 = (inst_12614 + (1));
var tmp12668 = inst_12613;
var tmp12669 = inst_12611;
var tmp12670 = inst_12612;
var inst_12611__$1 = tmp12669;
var inst_12612__$1 = tmp12670;
var inst_12613__$1 = tmp12668;
var inst_12614__$1 = inst_12622;
var state_12659__$1 = (function (){var statearr_12673 = state_12659;
(statearr_12673[(8)] = inst_12613__$1);

(statearr_12673[(9)] = inst_12614__$1);

(statearr_12673[(14)] = inst_12621);

(statearr_12673[(11)] = inst_12611__$1);

(statearr_12673[(12)] = inst_12612__$1);

return statearr_12673;
})();
var statearr_12674_12709 = state_12659__$1;
(statearr_12674_12709[(2)] = null);

(statearr_12674_12709[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12660 === (22))){
var state_12659__$1 = state_12659;
var statearr_12675_12710 = state_12659__$1;
(statearr_12675_12710[(2)] = null);

(statearr_12675_12710[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12660 === (6))){
var inst_12600 = (state_12659[(13)]);
var inst_12609 = f.call(null,inst_12600);
var inst_12610 = cljs.core.seq.call(null,inst_12609);
var inst_12611 = inst_12610;
var inst_12612 = null;
var inst_12613 = (0);
var inst_12614 = (0);
var state_12659__$1 = (function (){var statearr_12676 = state_12659;
(statearr_12676[(8)] = inst_12613);

(statearr_12676[(9)] = inst_12614);

(statearr_12676[(11)] = inst_12611);

(statearr_12676[(12)] = inst_12612);

return statearr_12676;
})();
var statearr_12677_12711 = state_12659__$1;
(statearr_12677_12711[(2)] = null);

(statearr_12677_12711[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12660 === (17))){
var inst_12625 = (state_12659[(7)]);
var inst_12629 = cljs.core.chunk_first.call(null,inst_12625);
var inst_12630 = cljs.core.chunk_rest.call(null,inst_12625);
var inst_12631 = cljs.core.count.call(null,inst_12629);
var inst_12611 = inst_12630;
var inst_12612 = inst_12629;
var inst_12613 = inst_12631;
var inst_12614 = (0);
var state_12659__$1 = (function (){var statearr_12678 = state_12659;
(statearr_12678[(8)] = inst_12613);

(statearr_12678[(9)] = inst_12614);

(statearr_12678[(11)] = inst_12611);

(statearr_12678[(12)] = inst_12612);

return statearr_12678;
})();
var statearr_12679_12712 = state_12659__$1;
(statearr_12679_12712[(2)] = null);

(statearr_12679_12712[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12660 === (3))){
var inst_12657 = (state_12659[(2)]);
var state_12659__$1 = state_12659;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12659__$1,inst_12657);
} else {
if((state_val_12660 === (12))){
var inst_12645 = (state_12659[(2)]);
var state_12659__$1 = state_12659;
var statearr_12680_12713 = state_12659__$1;
(statearr_12680_12713[(2)] = inst_12645);

(statearr_12680_12713[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12660 === (2))){
var state_12659__$1 = state_12659;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12659__$1,(4),in$);
} else {
if((state_val_12660 === (23))){
var inst_12653 = (state_12659[(2)]);
var state_12659__$1 = state_12659;
var statearr_12681_12714 = state_12659__$1;
(statearr_12681_12714[(2)] = inst_12653);

(statearr_12681_12714[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12660 === (19))){
var inst_12640 = (state_12659[(2)]);
var state_12659__$1 = state_12659;
var statearr_12682_12715 = state_12659__$1;
(statearr_12682_12715[(2)] = inst_12640);

(statearr_12682_12715[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12660 === (11))){
var inst_12611 = (state_12659[(11)]);
var inst_12625 = (state_12659[(7)]);
var inst_12625__$1 = cljs.core.seq.call(null,inst_12611);
var state_12659__$1 = (function (){var statearr_12683 = state_12659;
(statearr_12683[(7)] = inst_12625__$1);

return statearr_12683;
})();
if(inst_12625__$1){
var statearr_12684_12716 = state_12659__$1;
(statearr_12684_12716[(1)] = (14));

} else {
var statearr_12685_12717 = state_12659__$1;
(statearr_12685_12717[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12660 === (9))){
var inst_12647 = (state_12659[(2)]);
var inst_12648 = cljs.core.async.impl.protocols.closed_QMARK_.call(null,out);
var state_12659__$1 = (function (){var statearr_12686 = state_12659;
(statearr_12686[(15)] = inst_12647);

return statearr_12686;
})();
if(cljs.core.truth_(inst_12648)){
var statearr_12687_12718 = state_12659__$1;
(statearr_12687_12718[(1)] = (21));

} else {
var statearr_12688_12719 = state_12659__$1;
(statearr_12688_12719[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12660 === (5))){
var inst_12603 = cljs.core.async.close_BANG_.call(null,out);
var state_12659__$1 = state_12659;
var statearr_12689_12720 = state_12659__$1;
(statearr_12689_12720[(2)] = inst_12603);

(statearr_12689_12720[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12660 === (14))){
var inst_12625 = (state_12659[(7)]);
var inst_12627 = cljs.core.chunked_seq_QMARK_.call(null,inst_12625);
var state_12659__$1 = state_12659;
if(inst_12627){
var statearr_12690_12721 = state_12659__$1;
(statearr_12690_12721[(1)] = (17));

} else {
var statearr_12691_12722 = state_12659__$1;
(statearr_12691_12722[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12660 === (16))){
var inst_12643 = (state_12659[(2)]);
var state_12659__$1 = state_12659;
var statearr_12692_12723 = state_12659__$1;
(statearr_12692_12723[(2)] = inst_12643);

(statearr_12692_12723[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12660 === (10))){
var inst_12614 = (state_12659[(9)]);
var inst_12612 = (state_12659[(12)]);
var inst_12619 = cljs.core._nth.call(null,inst_12612,inst_12614);
var state_12659__$1 = state_12659;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12659__$1,(13),out,inst_12619);
} else {
if((state_val_12660 === (18))){
var inst_12625 = (state_12659[(7)]);
var inst_12634 = cljs.core.first.call(null,inst_12625);
var state_12659__$1 = state_12659;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12659__$1,(20),out,inst_12634);
} else {
if((state_val_12660 === (8))){
var inst_12613 = (state_12659[(8)]);
var inst_12614 = (state_12659[(9)]);
var inst_12616 = (inst_12614 < inst_12613);
var inst_12617 = inst_12616;
var state_12659__$1 = state_12659;
if(cljs.core.truth_(inst_12617)){
var statearr_12693_12724 = state_12659__$1;
(statearr_12693_12724[(1)] = (10));

} else {
var statearr_12694_12725 = state_12659__$1;
(statearr_12694_12725[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__6804__auto__))
;
return ((function (switch__6742__auto__,c__6804__auto__){
return (function() {
var cljs$core$async$mapcat_STAR__$_state_machine__6743__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__6743__auto____0 = (function (){
var statearr_12698 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_12698[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__6743__auto__);

(statearr_12698[(1)] = (1));

return statearr_12698;
});
var cljs$core$async$mapcat_STAR__$_state_machine__6743__auto____1 = (function (state_12659){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_12659);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e12699){if((e12699 instanceof Object)){
var ex__6746__auto__ = e12699;
var statearr_12700_12726 = state_12659;
(statearr_12700_12726[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12659);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e12699;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12727 = state_12659;
state_12659 = G__12727;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__6743__auto__ = function(state_12659){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__6743__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__6743__auto____1.call(this,state_12659);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__6743__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__6743__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto__))
})();
var state__6806__auto__ = (function (){var statearr_12701 = f__6805__auto__.call(null);
(statearr_12701[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto__);

return statearr_12701;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto__))
);

return c__6804__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(){
var G__12729 = arguments.length;
switch (G__12729) {
case 2:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2 = (function (f,in$){
return cljs.core.async.mapcat_LT_.call(null,f,in$,null);
});

cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = (function (f,in$,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
cljs.core.async.mapcat_STAR_.call(null,f,in$,out);

return out;
});

cljs.core.async.mapcat_LT_.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_GT_ = (function cljs$core$async$mapcat_GT_(){
var G__12732 = arguments.length;
switch (G__12732) {
case 2:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2 = (function (f,out){
return cljs.core.async.mapcat_GT_.call(null,f,out,null);
});

cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = (function (f,out,buf_or_n){
var in$ = cljs.core.async.chan.call(null,buf_or_n);
cljs.core.async.mapcat_STAR_.call(null,f,in$,out);

return in$;
});

cljs.core.async.mapcat_GT_.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.unique = (function cljs$core$async$unique(){
var G__12735 = arguments.length;
switch (G__12735) {
case 1:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1 = (function (ch){
return cljs.core.async.unique.call(null,ch,null);
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2 = (function (ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__6804__auto___12785 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto___12785,out){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto___12785,out){
return (function (state_12759){
var state_val_12760 = (state_12759[(1)]);
if((state_val_12760 === (7))){
var inst_12754 = (state_12759[(2)]);
var state_12759__$1 = state_12759;
var statearr_12761_12786 = state_12759__$1;
(statearr_12761_12786[(2)] = inst_12754);

(statearr_12761_12786[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12760 === (1))){
var inst_12736 = null;
var state_12759__$1 = (function (){var statearr_12762 = state_12759;
(statearr_12762[(7)] = inst_12736);

return statearr_12762;
})();
var statearr_12763_12787 = state_12759__$1;
(statearr_12763_12787[(2)] = null);

(statearr_12763_12787[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12760 === (4))){
var inst_12739 = (state_12759[(8)]);
var inst_12739__$1 = (state_12759[(2)]);
var inst_12740 = (inst_12739__$1 == null);
var inst_12741 = cljs.core.not.call(null,inst_12740);
var state_12759__$1 = (function (){var statearr_12764 = state_12759;
(statearr_12764[(8)] = inst_12739__$1);

return statearr_12764;
})();
if(inst_12741){
var statearr_12765_12788 = state_12759__$1;
(statearr_12765_12788[(1)] = (5));

} else {
var statearr_12766_12789 = state_12759__$1;
(statearr_12766_12789[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12760 === (6))){
var state_12759__$1 = state_12759;
var statearr_12767_12790 = state_12759__$1;
(statearr_12767_12790[(2)] = null);

(statearr_12767_12790[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12760 === (3))){
var inst_12756 = (state_12759[(2)]);
var inst_12757 = cljs.core.async.close_BANG_.call(null,out);
var state_12759__$1 = (function (){var statearr_12768 = state_12759;
(statearr_12768[(9)] = inst_12756);

return statearr_12768;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12759__$1,inst_12757);
} else {
if((state_val_12760 === (2))){
var state_12759__$1 = state_12759;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12759__$1,(4),ch);
} else {
if((state_val_12760 === (11))){
var inst_12739 = (state_12759[(8)]);
var inst_12748 = (state_12759[(2)]);
var inst_12736 = inst_12739;
var state_12759__$1 = (function (){var statearr_12769 = state_12759;
(statearr_12769[(7)] = inst_12736);

(statearr_12769[(10)] = inst_12748);

return statearr_12769;
})();
var statearr_12770_12791 = state_12759__$1;
(statearr_12770_12791[(2)] = null);

(statearr_12770_12791[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12760 === (9))){
var inst_12739 = (state_12759[(8)]);
var state_12759__$1 = state_12759;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12759__$1,(11),out,inst_12739);
} else {
if((state_val_12760 === (5))){
var inst_12736 = (state_12759[(7)]);
var inst_12739 = (state_12759[(8)]);
var inst_12743 = cljs.core._EQ_.call(null,inst_12739,inst_12736);
var state_12759__$1 = state_12759;
if(inst_12743){
var statearr_12772_12792 = state_12759__$1;
(statearr_12772_12792[(1)] = (8));

} else {
var statearr_12773_12793 = state_12759__$1;
(statearr_12773_12793[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12760 === (10))){
var inst_12751 = (state_12759[(2)]);
var state_12759__$1 = state_12759;
var statearr_12774_12794 = state_12759__$1;
(statearr_12774_12794[(2)] = inst_12751);

(statearr_12774_12794[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12760 === (8))){
var inst_12736 = (state_12759[(7)]);
var tmp12771 = inst_12736;
var inst_12736__$1 = tmp12771;
var state_12759__$1 = (function (){var statearr_12775 = state_12759;
(statearr_12775[(7)] = inst_12736__$1);

return statearr_12775;
})();
var statearr_12776_12795 = state_12759__$1;
(statearr_12776_12795[(2)] = null);

(statearr_12776_12795[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});})(c__6804__auto___12785,out))
;
return ((function (switch__6742__auto__,c__6804__auto___12785,out){
return (function() {
var cljs$core$async$state_machine__6743__auto__ = null;
var cljs$core$async$state_machine__6743__auto____0 = (function (){
var statearr_12780 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_12780[(0)] = cljs$core$async$state_machine__6743__auto__);

(statearr_12780[(1)] = (1));

return statearr_12780;
});
var cljs$core$async$state_machine__6743__auto____1 = (function (state_12759){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_12759);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e12781){if((e12781 instanceof Object)){
var ex__6746__auto__ = e12781;
var statearr_12782_12796 = state_12759;
(statearr_12782_12796[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12759);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e12781;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12797 = state_12759;
state_12759 = G__12797;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs$core$async$state_machine__6743__auto__ = function(state_12759){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__6743__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__6743__auto____1.call(this,state_12759);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__6743__auto____0;
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__6743__auto____1;
return cljs$core$async$state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto___12785,out))
})();
var state__6806__auto__ = (function (){var statearr_12783 = f__6805__auto__.call(null);
(statearr_12783[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto___12785);

return statearr_12783;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto___12785,out))
);


return out;
});

cljs.core.async.unique.cljs$lang$maxFixedArity = 2;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(){
var G__12799 = arguments.length;
switch (G__12799) {
case 2:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.partition.call(null,n,ch,null);
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__6804__auto___12868 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto___12868,out){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto___12868,out){
return (function (state_12837){
var state_val_12838 = (state_12837[(1)]);
if((state_val_12838 === (7))){
var inst_12833 = (state_12837[(2)]);
var state_12837__$1 = state_12837;
var statearr_12839_12869 = state_12837__$1;
(statearr_12839_12869[(2)] = inst_12833);

(statearr_12839_12869[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12838 === (1))){
var inst_12800 = (new Array(n));
var inst_12801 = inst_12800;
var inst_12802 = (0);
var state_12837__$1 = (function (){var statearr_12840 = state_12837;
(statearr_12840[(7)] = inst_12801);

(statearr_12840[(8)] = inst_12802);

return statearr_12840;
})();
var statearr_12841_12870 = state_12837__$1;
(statearr_12841_12870[(2)] = null);

(statearr_12841_12870[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12838 === (4))){
var inst_12805 = (state_12837[(9)]);
var inst_12805__$1 = (state_12837[(2)]);
var inst_12806 = (inst_12805__$1 == null);
var inst_12807 = cljs.core.not.call(null,inst_12806);
var state_12837__$1 = (function (){var statearr_12842 = state_12837;
(statearr_12842[(9)] = inst_12805__$1);

return statearr_12842;
})();
if(inst_12807){
var statearr_12843_12871 = state_12837__$1;
(statearr_12843_12871[(1)] = (5));

} else {
var statearr_12844_12872 = state_12837__$1;
(statearr_12844_12872[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12838 === (15))){
var inst_12827 = (state_12837[(2)]);
var state_12837__$1 = state_12837;
var statearr_12845_12873 = state_12837__$1;
(statearr_12845_12873[(2)] = inst_12827);

(statearr_12845_12873[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12838 === (13))){
var state_12837__$1 = state_12837;
var statearr_12846_12874 = state_12837__$1;
(statearr_12846_12874[(2)] = null);

(statearr_12846_12874[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12838 === (6))){
var inst_12802 = (state_12837[(8)]);
var inst_12823 = (inst_12802 > (0));
var state_12837__$1 = state_12837;
if(cljs.core.truth_(inst_12823)){
var statearr_12847_12875 = state_12837__$1;
(statearr_12847_12875[(1)] = (12));

} else {
var statearr_12848_12876 = state_12837__$1;
(statearr_12848_12876[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12838 === (3))){
var inst_12835 = (state_12837[(2)]);
var state_12837__$1 = state_12837;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12837__$1,inst_12835);
} else {
if((state_val_12838 === (12))){
var inst_12801 = (state_12837[(7)]);
var inst_12825 = cljs.core.vec.call(null,inst_12801);
var state_12837__$1 = state_12837;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12837__$1,(15),out,inst_12825);
} else {
if((state_val_12838 === (2))){
var state_12837__$1 = state_12837;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12837__$1,(4),ch);
} else {
if((state_val_12838 === (11))){
var inst_12817 = (state_12837[(2)]);
var inst_12818 = (new Array(n));
var inst_12801 = inst_12818;
var inst_12802 = (0);
var state_12837__$1 = (function (){var statearr_12849 = state_12837;
(statearr_12849[(10)] = inst_12817);

(statearr_12849[(7)] = inst_12801);

(statearr_12849[(8)] = inst_12802);

return statearr_12849;
})();
var statearr_12850_12877 = state_12837__$1;
(statearr_12850_12877[(2)] = null);

(statearr_12850_12877[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12838 === (9))){
var inst_12801 = (state_12837[(7)]);
var inst_12815 = cljs.core.vec.call(null,inst_12801);
var state_12837__$1 = state_12837;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12837__$1,(11),out,inst_12815);
} else {
if((state_val_12838 === (5))){
var inst_12805 = (state_12837[(9)]);
var inst_12810 = (state_12837[(11)]);
var inst_12801 = (state_12837[(7)]);
var inst_12802 = (state_12837[(8)]);
var inst_12809 = (inst_12801[inst_12802] = inst_12805);
var inst_12810__$1 = (inst_12802 + (1));
var inst_12811 = (inst_12810__$1 < n);
var state_12837__$1 = (function (){var statearr_12851 = state_12837;
(statearr_12851[(12)] = inst_12809);

(statearr_12851[(11)] = inst_12810__$1);

return statearr_12851;
})();
if(cljs.core.truth_(inst_12811)){
var statearr_12852_12878 = state_12837__$1;
(statearr_12852_12878[(1)] = (8));

} else {
var statearr_12853_12879 = state_12837__$1;
(statearr_12853_12879[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12838 === (14))){
var inst_12830 = (state_12837[(2)]);
var inst_12831 = cljs.core.async.close_BANG_.call(null,out);
var state_12837__$1 = (function (){var statearr_12855 = state_12837;
(statearr_12855[(13)] = inst_12830);

return statearr_12855;
})();
var statearr_12856_12880 = state_12837__$1;
(statearr_12856_12880[(2)] = inst_12831);

(statearr_12856_12880[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12838 === (10))){
var inst_12821 = (state_12837[(2)]);
var state_12837__$1 = state_12837;
var statearr_12857_12881 = state_12837__$1;
(statearr_12857_12881[(2)] = inst_12821);

(statearr_12857_12881[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12838 === (8))){
var inst_12810 = (state_12837[(11)]);
var inst_12801 = (state_12837[(7)]);
var tmp12854 = inst_12801;
var inst_12801__$1 = tmp12854;
var inst_12802 = inst_12810;
var state_12837__$1 = (function (){var statearr_12858 = state_12837;
(statearr_12858[(7)] = inst_12801__$1);

(statearr_12858[(8)] = inst_12802);

return statearr_12858;
})();
var statearr_12859_12882 = state_12837__$1;
(statearr_12859_12882[(2)] = null);

(statearr_12859_12882[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__6804__auto___12868,out))
;
return ((function (switch__6742__auto__,c__6804__auto___12868,out){
return (function() {
var cljs$core$async$state_machine__6743__auto__ = null;
var cljs$core$async$state_machine__6743__auto____0 = (function (){
var statearr_12863 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_12863[(0)] = cljs$core$async$state_machine__6743__auto__);

(statearr_12863[(1)] = (1));

return statearr_12863;
});
var cljs$core$async$state_machine__6743__auto____1 = (function (state_12837){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_12837);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e12864){if((e12864 instanceof Object)){
var ex__6746__auto__ = e12864;
var statearr_12865_12883 = state_12837;
(statearr_12865_12883[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12837);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e12864;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12884 = state_12837;
state_12837 = G__12884;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs$core$async$state_machine__6743__auto__ = function(state_12837){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__6743__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__6743__auto____1.call(this,state_12837);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__6743__auto____0;
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__6743__auto____1;
return cljs$core$async$state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto___12868,out))
})();
var state__6806__auto__ = (function (){var statearr_12866 = f__6805__auto__.call(null);
(statearr_12866[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto___12868);

return statearr_12866;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto___12868,out))
);


return out;
});

cljs.core.async.partition.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(){
var G__12886 = arguments.length;
switch (G__12886) {
case 2:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2 = (function (f,ch){
return cljs.core.async.partition_by.call(null,f,ch,null);
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3 = (function (f,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__6804__auto___12959 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto___12959,out){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto___12959,out){
return (function (state_12928){
var state_val_12929 = (state_12928[(1)]);
if((state_val_12929 === (7))){
var inst_12924 = (state_12928[(2)]);
var state_12928__$1 = state_12928;
var statearr_12930_12960 = state_12928__$1;
(statearr_12930_12960[(2)] = inst_12924);

(statearr_12930_12960[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12929 === (1))){
var inst_12887 = [];
var inst_12888 = inst_12887;
var inst_12889 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_12928__$1 = (function (){var statearr_12931 = state_12928;
(statearr_12931[(7)] = inst_12889);

(statearr_12931[(8)] = inst_12888);

return statearr_12931;
})();
var statearr_12932_12961 = state_12928__$1;
(statearr_12932_12961[(2)] = null);

(statearr_12932_12961[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12929 === (4))){
var inst_12892 = (state_12928[(9)]);
var inst_12892__$1 = (state_12928[(2)]);
var inst_12893 = (inst_12892__$1 == null);
var inst_12894 = cljs.core.not.call(null,inst_12893);
var state_12928__$1 = (function (){var statearr_12933 = state_12928;
(statearr_12933[(9)] = inst_12892__$1);

return statearr_12933;
})();
if(inst_12894){
var statearr_12934_12962 = state_12928__$1;
(statearr_12934_12962[(1)] = (5));

} else {
var statearr_12935_12963 = state_12928__$1;
(statearr_12935_12963[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12929 === (15))){
var inst_12918 = (state_12928[(2)]);
var state_12928__$1 = state_12928;
var statearr_12936_12964 = state_12928__$1;
(statearr_12936_12964[(2)] = inst_12918);

(statearr_12936_12964[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12929 === (13))){
var state_12928__$1 = state_12928;
var statearr_12937_12965 = state_12928__$1;
(statearr_12937_12965[(2)] = null);

(statearr_12937_12965[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12929 === (6))){
var inst_12888 = (state_12928[(8)]);
var inst_12913 = inst_12888.length;
var inst_12914 = (inst_12913 > (0));
var state_12928__$1 = state_12928;
if(cljs.core.truth_(inst_12914)){
var statearr_12938_12966 = state_12928__$1;
(statearr_12938_12966[(1)] = (12));

} else {
var statearr_12939_12967 = state_12928__$1;
(statearr_12939_12967[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12929 === (3))){
var inst_12926 = (state_12928[(2)]);
var state_12928__$1 = state_12928;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12928__$1,inst_12926);
} else {
if((state_val_12929 === (12))){
var inst_12888 = (state_12928[(8)]);
var inst_12916 = cljs.core.vec.call(null,inst_12888);
var state_12928__$1 = state_12928;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12928__$1,(15),out,inst_12916);
} else {
if((state_val_12929 === (2))){
var state_12928__$1 = state_12928;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12928__$1,(4),ch);
} else {
if((state_val_12929 === (11))){
var inst_12892 = (state_12928[(9)]);
var inst_12896 = (state_12928[(10)]);
var inst_12906 = (state_12928[(2)]);
var inst_12907 = [];
var inst_12908 = inst_12907.push(inst_12892);
var inst_12888 = inst_12907;
var inst_12889 = inst_12896;
var state_12928__$1 = (function (){var statearr_12940 = state_12928;
(statearr_12940[(11)] = inst_12906);

(statearr_12940[(7)] = inst_12889);

(statearr_12940[(8)] = inst_12888);

(statearr_12940[(12)] = inst_12908);

return statearr_12940;
})();
var statearr_12941_12968 = state_12928__$1;
(statearr_12941_12968[(2)] = null);

(statearr_12941_12968[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12929 === (9))){
var inst_12888 = (state_12928[(8)]);
var inst_12904 = cljs.core.vec.call(null,inst_12888);
var state_12928__$1 = state_12928;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12928__$1,(11),out,inst_12904);
} else {
if((state_val_12929 === (5))){
var inst_12892 = (state_12928[(9)]);
var inst_12896 = (state_12928[(10)]);
var inst_12889 = (state_12928[(7)]);
var inst_12896__$1 = f.call(null,inst_12892);
var inst_12897 = cljs.core._EQ_.call(null,inst_12896__$1,inst_12889);
var inst_12898 = cljs.core.keyword_identical_QMARK_.call(null,inst_12889,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var inst_12899 = (inst_12897) || (inst_12898);
var state_12928__$1 = (function (){var statearr_12942 = state_12928;
(statearr_12942[(10)] = inst_12896__$1);

return statearr_12942;
})();
if(cljs.core.truth_(inst_12899)){
var statearr_12943_12969 = state_12928__$1;
(statearr_12943_12969[(1)] = (8));

} else {
var statearr_12944_12970 = state_12928__$1;
(statearr_12944_12970[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12929 === (14))){
var inst_12921 = (state_12928[(2)]);
var inst_12922 = cljs.core.async.close_BANG_.call(null,out);
var state_12928__$1 = (function (){var statearr_12946 = state_12928;
(statearr_12946[(13)] = inst_12921);

return statearr_12946;
})();
var statearr_12947_12971 = state_12928__$1;
(statearr_12947_12971[(2)] = inst_12922);

(statearr_12947_12971[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12929 === (10))){
var inst_12911 = (state_12928[(2)]);
var state_12928__$1 = state_12928;
var statearr_12948_12972 = state_12928__$1;
(statearr_12948_12972[(2)] = inst_12911);

(statearr_12948_12972[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12929 === (8))){
var inst_12892 = (state_12928[(9)]);
var inst_12896 = (state_12928[(10)]);
var inst_12888 = (state_12928[(8)]);
var inst_12901 = inst_12888.push(inst_12892);
var tmp12945 = inst_12888;
var inst_12888__$1 = tmp12945;
var inst_12889 = inst_12896;
var state_12928__$1 = (function (){var statearr_12949 = state_12928;
(statearr_12949[(7)] = inst_12889);

(statearr_12949[(14)] = inst_12901);

(statearr_12949[(8)] = inst_12888__$1);

return statearr_12949;
})();
var statearr_12950_12973 = state_12928__$1;
(statearr_12950_12973[(2)] = null);

(statearr_12950_12973[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__6804__auto___12959,out))
;
return ((function (switch__6742__auto__,c__6804__auto___12959,out){
return (function() {
var cljs$core$async$state_machine__6743__auto__ = null;
var cljs$core$async$state_machine__6743__auto____0 = (function (){
var statearr_12954 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_12954[(0)] = cljs$core$async$state_machine__6743__auto__);

(statearr_12954[(1)] = (1));

return statearr_12954;
});
var cljs$core$async$state_machine__6743__auto____1 = (function (state_12928){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_12928);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e12955){if((e12955 instanceof Object)){
var ex__6746__auto__ = e12955;
var statearr_12956_12974 = state_12928;
(statearr_12956_12974[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12928);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e12955;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12975 = state_12928;
state_12928 = G__12975;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs$core$async$state_machine__6743__auto__ = function(state_12928){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__6743__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__6743__auto____1.call(this,state_12928);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__6743__auto____0;
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__6743__auto____1;
return cljs$core$async$state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto___12959,out))
})();
var state__6806__auto__ = (function (){var statearr_12957 = f__6805__auto__.call(null);
(statearr_12957[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto___12959);

return statearr_12957;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto___12959,out))
);


return out;
});

cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3;

//# sourceMappingURL=async.js.map