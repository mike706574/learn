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
if(typeof cljs.core.async.t10581 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t10581 = (function (fn_handler,f,meta10582){
this.fn_handler = fn_handler;
this.f = f;
this.meta10582 = meta10582;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t10581.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_10583,meta10582__$1){
var self__ = this;
var _10583__$1 = this;
return (new cljs.core.async.t10581(self__.fn_handler,self__.f,meta10582__$1));
});

cljs.core.async.t10581.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_10583){
var self__ = this;
var _10583__$1 = this;
return self__.meta10582;
});

cljs.core.async.t10581.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t10581.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
});

cljs.core.async.t10581.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
});

cljs.core.async.t10581.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"fn-handler","fn-handler",648785851,null),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"meta10582","meta10582",395699096,null)], null);
});

cljs.core.async.t10581.cljs$lang$type = true;

cljs.core.async.t10581.cljs$lang$ctorStr = "cljs.core.async/t10581";

cljs.core.async.t10581.cljs$lang$ctorPrWriter = (function (this__4899__auto__,writer__4900__auto__,opt__4901__auto__){
return cljs.core._write.call(null,writer__4900__auto__,"cljs.core.async/t10581");
});

cljs.core.async.__GT_t10581 = (function cljs$core$async$fn_handler_$___GT_t10581(fn_handler__$1,f__$1,meta10582){
return (new cljs.core.async.t10581(fn_handler__$1,f__$1,meta10582));
});

}

return (new cljs.core.async.t10581(cljs$core$async$fn_handler,f,cljs.core.PersistentArrayMap.EMPTY));
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
var G__10585 = buff;
if(G__10585){
var bit__4994__auto__ = null;
if(cljs.core.truth_((function (){var or__4320__auto__ = bit__4994__auto__;
if(cljs.core.truth_(or__4320__auto__)){
return or__4320__auto__;
} else {
return G__10585.cljs$core$async$impl$protocols$UnblockingBuffer$;
}
})())){
return true;
} else {
if((!G__10585.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,G__10585);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,G__10585);
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
var G__10587 = arguments.length;
switch (G__10587) {
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
var G__10590 = arguments.length;
switch (G__10590) {
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
var val_10592 = cljs.core.deref.call(null,ret);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,val_10592);
} else {
cljs.core.async.impl.dispatch.run.call(null,((function (val_10592,ret){
return (function (){
return fn1.call(null,val_10592);
});})(val_10592,ret))
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
var G__10594 = arguments.length;
switch (G__10594) {
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
var n__5205__auto___10596 = n;
var x_10597 = (0);
while(true){
if((x_10597 < n__5205__auto___10596)){
(a[x_10597] = (0));

var G__10598 = (x_10597 + (1));
x_10597 = G__10598;
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

var G__10599 = (i + (1));
i = G__10599;
continue;
}
break;
}
});
cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.call(null,true);
if(typeof cljs.core.async.t10603 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t10603 = (function (alt_flag,flag,meta10604){
this.alt_flag = alt_flag;
this.flag = flag;
this.meta10604 = meta10604;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t10603.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (flag){
return (function (_10605,meta10604__$1){
var self__ = this;
var _10605__$1 = this;
return (new cljs.core.async.t10603(self__.alt_flag,self__.flag,meta10604__$1));
});})(flag))
;

cljs.core.async.t10603.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (flag){
return (function (_10605){
var self__ = this;
var _10605__$1 = this;
return self__.meta10604;
});})(flag))
;

cljs.core.async.t10603.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t10603.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref.call(null,self__.flag);
});})(flag))
;

cljs.core.async.t10603.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.flag,null);

return true;
});})(flag))
;

cljs.core.async.t10603.getBasis = ((function (flag){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"alt-flag","alt-flag",-1794972754,null),new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta10604","meta10604",-1016705111,null)], null);
});})(flag))
;

cljs.core.async.t10603.cljs$lang$type = true;

cljs.core.async.t10603.cljs$lang$ctorStr = "cljs.core.async/t10603";

cljs.core.async.t10603.cljs$lang$ctorPrWriter = ((function (flag){
return (function (this__4899__auto__,writer__4900__auto__,opt__4901__auto__){
return cljs.core._write.call(null,writer__4900__auto__,"cljs.core.async/t10603");
});})(flag))
;

cljs.core.async.__GT_t10603 = ((function (flag){
return (function cljs$core$async$alt_flag_$___GT_t10603(alt_flag__$1,flag__$1,meta10604){
return (new cljs.core.async.t10603(alt_flag__$1,flag__$1,meta10604));
});})(flag))
;

}

return (new cljs.core.async.t10603(cljs$core$async$alt_flag,flag,cljs.core.PersistentArrayMap.EMPTY));
});
cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
if(typeof cljs.core.async.t10609 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t10609 = (function (alt_handler,flag,cb,meta10610){
this.alt_handler = alt_handler;
this.flag = flag;
this.cb = cb;
this.meta10610 = meta10610;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t10609.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_10611,meta10610__$1){
var self__ = this;
var _10611__$1 = this;
return (new cljs.core.async.t10609(self__.alt_handler,self__.flag,self__.cb,meta10610__$1));
});

cljs.core.async.t10609.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_10611){
var self__ = this;
var _10611__$1 = this;
return self__.meta10610;
});

cljs.core.async.t10609.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t10609.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.flag);
});

cljs.core.async.t10609.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit.call(null,self__.flag);

return self__.cb;
});

cljs.core.async.t10609.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"alt-handler","alt-handler",963786170,null),new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta10610","meta10610",-1828933585,null)], null);
});

cljs.core.async.t10609.cljs$lang$type = true;

cljs.core.async.t10609.cljs$lang$ctorStr = "cljs.core.async/t10609";

cljs.core.async.t10609.cljs$lang$ctorPrWriter = (function (this__4899__auto__,writer__4900__auto__,opt__4901__auto__){
return cljs.core._write.call(null,writer__4900__auto__,"cljs.core.async/t10609");
});

cljs.core.async.__GT_t10609 = (function cljs$core$async$alt_handler_$___GT_t10609(alt_handler__$1,flag__$1,cb__$1,meta10610){
return (new cljs.core.async.t10609(alt_handler__$1,flag__$1,cb__$1,meta10610));
});

}

return (new cljs.core.async.t10609(cljs$core$async$alt_handler,flag,cb,cljs.core.PersistentArrayMap.EMPTY));
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
return (function (p1__10612_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__10612_SHARP_,wport], null));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.alt_handler.call(null,flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__10613_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__10613_SHARP_,port], null));
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
var G__10614 = (i + (1));
i = G__10614;
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

cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__10617){
var map__10618 = p__10617;
var map__10618__$1 = ((cljs.core.seq_QMARK_.call(null,map__10618))?cljs.core.apply.call(null,cljs.core.hash_map,map__10618):map__10618);
var opts = map__10618__$1;
throw (new Error("alts! used not in (go ...) block"));
});

cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1);

cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq10615){
var G__10616 = cljs.core.first.call(null,seq10615);
var seq10615__$1 = cljs.core.next.call(null,seq10615);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__10616,seq10615__$1);
});
/**
 * Takes elements from the from channel and supplies them to the to
 * channel. By default, the to channel will be closed when the from
 * channel closes, but can be determined by the close?  parameter. Will
 * stop consuming the from channel if the to channel closes
 */
cljs.core.async.pipe = (function cljs$core$async$pipe(){
var G__10620 = arguments.length;
switch (G__10620) {
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
var c__6804__auto___10669 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto___10669){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto___10669){
return (function (state_10644){
var state_val_10645 = (state_10644[(1)]);
if((state_val_10645 === (7))){
var inst_10640 = (state_10644[(2)]);
var state_10644__$1 = state_10644;
var statearr_10646_10670 = state_10644__$1;
(statearr_10646_10670[(2)] = inst_10640);

(statearr_10646_10670[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10645 === (1))){
var state_10644__$1 = state_10644;
var statearr_10647_10671 = state_10644__$1;
(statearr_10647_10671[(2)] = null);

(statearr_10647_10671[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10645 === (4))){
var inst_10623 = (state_10644[(7)]);
var inst_10623__$1 = (state_10644[(2)]);
var inst_10624 = (inst_10623__$1 == null);
var state_10644__$1 = (function (){var statearr_10648 = state_10644;
(statearr_10648[(7)] = inst_10623__$1);

return statearr_10648;
})();
if(cljs.core.truth_(inst_10624)){
var statearr_10649_10672 = state_10644__$1;
(statearr_10649_10672[(1)] = (5));

} else {
var statearr_10650_10673 = state_10644__$1;
(statearr_10650_10673[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10645 === (13))){
var state_10644__$1 = state_10644;
var statearr_10651_10674 = state_10644__$1;
(statearr_10651_10674[(2)] = null);

(statearr_10651_10674[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10645 === (6))){
var inst_10623 = (state_10644[(7)]);
var state_10644__$1 = state_10644;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_10644__$1,(11),to,inst_10623);
} else {
if((state_val_10645 === (3))){
var inst_10642 = (state_10644[(2)]);
var state_10644__$1 = state_10644;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10644__$1,inst_10642);
} else {
if((state_val_10645 === (12))){
var state_10644__$1 = state_10644;
var statearr_10652_10675 = state_10644__$1;
(statearr_10652_10675[(2)] = null);

(statearr_10652_10675[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10645 === (2))){
var state_10644__$1 = state_10644;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10644__$1,(4),from);
} else {
if((state_val_10645 === (11))){
var inst_10633 = (state_10644[(2)]);
var state_10644__$1 = state_10644;
if(cljs.core.truth_(inst_10633)){
var statearr_10653_10676 = state_10644__$1;
(statearr_10653_10676[(1)] = (12));

} else {
var statearr_10654_10677 = state_10644__$1;
(statearr_10654_10677[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10645 === (9))){
var state_10644__$1 = state_10644;
var statearr_10655_10678 = state_10644__$1;
(statearr_10655_10678[(2)] = null);

(statearr_10655_10678[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10645 === (5))){
var state_10644__$1 = state_10644;
if(cljs.core.truth_(close_QMARK_)){
var statearr_10656_10679 = state_10644__$1;
(statearr_10656_10679[(1)] = (8));

} else {
var statearr_10657_10680 = state_10644__$1;
(statearr_10657_10680[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10645 === (14))){
var inst_10638 = (state_10644[(2)]);
var state_10644__$1 = state_10644;
var statearr_10658_10681 = state_10644__$1;
(statearr_10658_10681[(2)] = inst_10638);

(statearr_10658_10681[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10645 === (10))){
var inst_10630 = (state_10644[(2)]);
var state_10644__$1 = state_10644;
var statearr_10659_10682 = state_10644__$1;
(statearr_10659_10682[(2)] = inst_10630);

(statearr_10659_10682[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10645 === (8))){
var inst_10627 = cljs.core.async.close_BANG_.call(null,to);
var state_10644__$1 = state_10644;
var statearr_10660_10683 = state_10644__$1;
(statearr_10660_10683[(2)] = inst_10627);

(statearr_10660_10683[(1)] = (10));


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
});})(c__6804__auto___10669))
;
return ((function (switch__6742__auto__,c__6804__auto___10669){
return (function() {
var cljs$core$async$state_machine__6743__auto__ = null;
var cljs$core$async$state_machine__6743__auto____0 = (function (){
var statearr_10664 = [null,null,null,null,null,null,null,null];
(statearr_10664[(0)] = cljs$core$async$state_machine__6743__auto__);

(statearr_10664[(1)] = (1));

return statearr_10664;
});
var cljs$core$async$state_machine__6743__auto____1 = (function (state_10644){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_10644);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e10665){if((e10665 instanceof Object)){
var ex__6746__auto__ = e10665;
var statearr_10666_10684 = state_10644;
(statearr_10666_10684[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10644);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10665;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__10685 = state_10644;
state_10644 = G__10685;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs$core$async$state_machine__6743__auto__ = function(state_10644){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__6743__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__6743__auto____1.call(this,state_10644);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__6743__auto____0;
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__6743__auto____1;
return cljs$core$async$state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto___10669))
})();
var state__6806__auto__ = (function (){var statearr_10667 = f__6805__auto__.call(null);
(statearr_10667[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto___10669);

return statearr_10667;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto___10669))
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
return (function (p__10869){
var vec__10870 = p__10869;
var v = cljs.core.nth.call(null,vec__10870,(0),null);
var p = cljs.core.nth.call(null,vec__10870,(1),null);
var job = vec__10870;
if((job == null)){
cljs.core.async.close_BANG_.call(null,results);

return null;
} else {
var res = cljs.core.async.chan.call(null,(1),xf,ex_handler);
var c__6804__auto___11052 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto___11052,res,vec__10870,v,p,job,jobs,results){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto___11052,res,vec__10870,v,p,job,jobs,results){
return (function (state_10875){
var state_val_10876 = (state_10875[(1)]);
if((state_val_10876 === (1))){
var state_10875__$1 = state_10875;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_10875__$1,(2),res,v);
} else {
if((state_val_10876 === (2))){
var inst_10872 = (state_10875[(2)]);
var inst_10873 = cljs.core.async.close_BANG_.call(null,res);
var state_10875__$1 = (function (){var statearr_10877 = state_10875;
(statearr_10877[(7)] = inst_10872);

return statearr_10877;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10875__$1,inst_10873);
} else {
return null;
}
}
});})(c__6804__auto___11052,res,vec__10870,v,p,job,jobs,results))
;
return ((function (switch__6742__auto__,c__6804__auto___11052,res,vec__10870,v,p,job,jobs,results){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____0 = (function (){
var statearr_10881 = [null,null,null,null,null,null,null,null];
(statearr_10881[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__);

(statearr_10881[(1)] = (1));

return statearr_10881;
});
var cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____1 = (function (state_10875){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_10875);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e10882){if((e10882 instanceof Object)){
var ex__6746__auto__ = e10882;
var statearr_10883_11053 = state_10875;
(statearr_10883_11053[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10875);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10882;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__11054 = state_10875;
state_10875 = G__11054;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__ = function(state_10875){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____1.call(this,state_10875);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto___11052,res,vec__10870,v,p,job,jobs,results))
})();
var state__6806__auto__ = (function (){var statearr_10884 = f__6805__auto__.call(null);
(statearr_10884[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto___11052);

return statearr_10884;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto___11052,res,vec__10870,v,p,job,jobs,results))
);


cljs.core.async.put_BANG_.call(null,p,res);

return true;
}
});})(jobs,results))
;
var async = ((function (jobs,results,process){
return (function (p__10885){
var vec__10886 = p__10885;
var v = cljs.core.nth.call(null,vec__10886,(0),null);
var p = cljs.core.nth.call(null,vec__10886,(1),null);
var job = vec__10886;
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
var n__5205__auto___11055 = n;
var __11056 = (0);
while(true){
if((__11056 < n__5205__auto___11055)){
var G__10887_11057 = (((type instanceof cljs.core.Keyword))?type.fqn:null);
switch (G__10887_11057) {
case "compute":
var c__6804__auto___11059 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__11056,c__6804__auto___11059,G__10887_11057,n__5205__auto___11055,jobs,results,process,async){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (__11056,c__6804__auto___11059,G__10887_11057,n__5205__auto___11055,jobs,results,process,async){
return (function (state_10900){
var state_val_10901 = (state_10900[(1)]);
if((state_val_10901 === (1))){
var state_10900__$1 = state_10900;
var statearr_10902_11060 = state_10900__$1;
(statearr_10902_11060[(2)] = null);

(statearr_10902_11060[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10901 === (2))){
var state_10900__$1 = state_10900;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10900__$1,(4),jobs);
} else {
if((state_val_10901 === (3))){
var inst_10898 = (state_10900[(2)]);
var state_10900__$1 = state_10900;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10900__$1,inst_10898);
} else {
if((state_val_10901 === (4))){
var inst_10890 = (state_10900[(2)]);
var inst_10891 = process.call(null,inst_10890);
var state_10900__$1 = state_10900;
if(cljs.core.truth_(inst_10891)){
var statearr_10903_11061 = state_10900__$1;
(statearr_10903_11061[(1)] = (5));

} else {
var statearr_10904_11062 = state_10900__$1;
(statearr_10904_11062[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10901 === (5))){
var state_10900__$1 = state_10900;
var statearr_10905_11063 = state_10900__$1;
(statearr_10905_11063[(2)] = null);

(statearr_10905_11063[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10901 === (6))){
var state_10900__$1 = state_10900;
var statearr_10906_11064 = state_10900__$1;
(statearr_10906_11064[(2)] = null);

(statearr_10906_11064[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10901 === (7))){
var inst_10896 = (state_10900[(2)]);
var state_10900__$1 = state_10900;
var statearr_10907_11065 = state_10900__$1;
(statearr_10907_11065[(2)] = inst_10896);

(statearr_10907_11065[(1)] = (3));


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
});})(__11056,c__6804__auto___11059,G__10887_11057,n__5205__auto___11055,jobs,results,process,async))
;
return ((function (__11056,switch__6742__auto__,c__6804__auto___11059,G__10887_11057,n__5205__auto___11055,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____0 = (function (){
var statearr_10911 = [null,null,null,null,null,null,null];
(statearr_10911[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__);

(statearr_10911[(1)] = (1));

return statearr_10911;
});
var cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____1 = (function (state_10900){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_10900);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e10912){if((e10912 instanceof Object)){
var ex__6746__auto__ = e10912;
var statearr_10913_11066 = state_10900;
(statearr_10913_11066[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10900);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10912;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__11067 = state_10900;
state_10900 = G__11067;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__ = function(state_10900){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____1.call(this,state_10900);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__;
})()
;})(__11056,switch__6742__auto__,c__6804__auto___11059,G__10887_11057,n__5205__auto___11055,jobs,results,process,async))
})();
var state__6806__auto__ = (function (){var statearr_10914 = f__6805__auto__.call(null);
(statearr_10914[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto___11059);

return statearr_10914;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(__11056,c__6804__auto___11059,G__10887_11057,n__5205__auto___11055,jobs,results,process,async))
);


break;
case "async":
var c__6804__auto___11068 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__11056,c__6804__auto___11068,G__10887_11057,n__5205__auto___11055,jobs,results,process,async){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (__11056,c__6804__auto___11068,G__10887_11057,n__5205__auto___11055,jobs,results,process,async){
return (function (state_10927){
var state_val_10928 = (state_10927[(1)]);
if((state_val_10928 === (1))){
var state_10927__$1 = state_10927;
var statearr_10929_11069 = state_10927__$1;
(statearr_10929_11069[(2)] = null);

(statearr_10929_11069[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10928 === (2))){
var state_10927__$1 = state_10927;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10927__$1,(4),jobs);
} else {
if((state_val_10928 === (3))){
var inst_10925 = (state_10927[(2)]);
var state_10927__$1 = state_10927;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10927__$1,inst_10925);
} else {
if((state_val_10928 === (4))){
var inst_10917 = (state_10927[(2)]);
var inst_10918 = async.call(null,inst_10917);
var state_10927__$1 = state_10927;
if(cljs.core.truth_(inst_10918)){
var statearr_10930_11070 = state_10927__$1;
(statearr_10930_11070[(1)] = (5));

} else {
var statearr_10931_11071 = state_10927__$1;
(statearr_10931_11071[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10928 === (5))){
var state_10927__$1 = state_10927;
var statearr_10932_11072 = state_10927__$1;
(statearr_10932_11072[(2)] = null);

(statearr_10932_11072[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10928 === (6))){
var state_10927__$1 = state_10927;
var statearr_10933_11073 = state_10927__$1;
(statearr_10933_11073[(2)] = null);

(statearr_10933_11073[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10928 === (7))){
var inst_10923 = (state_10927[(2)]);
var state_10927__$1 = state_10927;
var statearr_10934_11074 = state_10927__$1;
(statearr_10934_11074[(2)] = inst_10923);

(statearr_10934_11074[(1)] = (3));


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
});})(__11056,c__6804__auto___11068,G__10887_11057,n__5205__auto___11055,jobs,results,process,async))
;
return ((function (__11056,switch__6742__auto__,c__6804__auto___11068,G__10887_11057,n__5205__auto___11055,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____0 = (function (){
var statearr_10938 = [null,null,null,null,null,null,null];
(statearr_10938[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__);

(statearr_10938[(1)] = (1));

return statearr_10938;
});
var cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____1 = (function (state_10927){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_10927);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e10939){if((e10939 instanceof Object)){
var ex__6746__auto__ = e10939;
var statearr_10940_11075 = state_10927;
(statearr_10940_11075[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10927);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10939;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__11076 = state_10927;
state_10927 = G__11076;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__ = function(state_10927){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____1.call(this,state_10927);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__;
})()
;})(__11056,switch__6742__auto__,c__6804__auto___11068,G__10887_11057,n__5205__auto___11055,jobs,results,process,async))
})();
var state__6806__auto__ = (function (){var statearr_10941 = f__6805__auto__.call(null);
(statearr_10941[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto___11068);

return statearr_10941;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(__11056,c__6804__auto___11068,G__10887_11057,n__5205__auto___11055,jobs,results,process,async))
);


break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(type)].join('')));

}

var G__11077 = (__11056 + (1));
__11056 = G__11077;
continue;
} else {
}
break;
}

var c__6804__auto___11078 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto___11078,jobs,results,process,async){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto___11078,jobs,results,process,async){
return (function (state_10963){
var state_val_10964 = (state_10963[(1)]);
if((state_val_10964 === (1))){
var state_10963__$1 = state_10963;
var statearr_10965_11079 = state_10963__$1;
(statearr_10965_11079[(2)] = null);

(statearr_10965_11079[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10964 === (2))){
var state_10963__$1 = state_10963;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10963__$1,(4),from);
} else {
if((state_val_10964 === (3))){
var inst_10961 = (state_10963[(2)]);
var state_10963__$1 = state_10963;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10963__$1,inst_10961);
} else {
if((state_val_10964 === (4))){
var inst_10944 = (state_10963[(7)]);
var inst_10944__$1 = (state_10963[(2)]);
var inst_10945 = (inst_10944__$1 == null);
var state_10963__$1 = (function (){var statearr_10966 = state_10963;
(statearr_10966[(7)] = inst_10944__$1);

return statearr_10966;
})();
if(cljs.core.truth_(inst_10945)){
var statearr_10967_11080 = state_10963__$1;
(statearr_10967_11080[(1)] = (5));

} else {
var statearr_10968_11081 = state_10963__$1;
(statearr_10968_11081[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10964 === (5))){
var inst_10947 = cljs.core.async.close_BANG_.call(null,jobs);
var state_10963__$1 = state_10963;
var statearr_10969_11082 = state_10963__$1;
(statearr_10969_11082[(2)] = inst_10947);

(statearr_10969_11082[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10964 === (6))){
var inst_10949 = (state_10963[(8)]);
var inst_10944 = (state_10963[(7)]);
var inst_10949__$1 = cljs.core.async.chan.call(null,(1));
var inst_10950 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_10951 = [inst_10944,inst_10949__$1];
var inst_10952 = (new cljs.core.PersistentVector(null,2,(5),inst_10950,inst_10951,null));
var state_10963__$1 = (function (){var statearr_10970 = state_10963;
(statearr_10970[(8)] = inst_10949__$1);

return statearr_10970;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_10963__$1,(8),jobs,inst_10952);
} else {
if((state_val_10964 === (7))){
var inst_10959 = (state_10963[(2)]);
var state_10963__$1 = state_10963;
var statearr_10971_11083 = state_10963__$1;
(statearr_10971_11083[(2)] = inst_10959);

(statearr_10971_11083[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10964 === (8))){
var inst_10949 = (state_10963[(8)]);
var inst_10954 = (state_10963[(2)]);
var state_10963__$1 = (function (){var statearr_10972 = state_10963;
(statearr_10972[(9)] = inst_10954);

return statearr_10972;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_10963__$1,(9),results,inst_10949);
} else {
if((state_val_10964 === (9))){
var inst_10956 = (state_10963[(2)]);
var state_10963__$1 = (function (){var statearr_10973 = state_10963;
(statearr_10973[(10)] = inst_10956);

return statearr_10973;
})();
var statearr_10974_11084 = state_10963__$1;
(statearr_10974_11084[(2)] = null);

(statearr_10974_11084[(1)] = (2));


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
});})(c__6804__auto___11078,jobs,results,process,async))
;
return ((function (switch__6742__auto__,c__6804__auto___11078,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____0 = (function (){
var statearr_10978 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_10978[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__);

(statearr_10978[(1)] = (1));

return statearr_10978;
});
var cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____1 = (function (state_10963){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_10963);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e10979){if((e10979 instanceof Object)){
var ex__6746__auto__ = e10979;
var statearr_10980_11085 = state_10963;
(statearr_10980_11085[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10963);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10979;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__11086 = state_10963;
state_10963 = G__11086;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__ = function(state_10963){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____1.call(this,state_10963);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto___11078,jobs,results,process,async))
})();
var state__6806__auto__ = (function (){var statearr_10981 = f__6805__auto__.call(null);
(statearr_10981[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto___11078);

return statearr_10981;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto___11078,jobs,results,process,async))
);


var c__6804__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto__,jobs,results,process,async){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto__,jobs,results,process,async){
return (function (state_11019){
var state_val_11020 = (state_11019[(1)]);
if((state_val_11020 === (7))){
var inst_11015 = (state_11019[(2)]);
var state_11019__$1 = state_11019;
var statearr_11021_11087 = state_11019__$1;
(statearr_11021_11087[(2)] = inst_11015);

(statearr_11021_11087[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11020 === (20))){
var state_11019__$1 = state_11019;
var statearr_11022_11088 = state_11019__$1;
(statearr_11022_11088[(2)] = null);

(statearr_11022_11088[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11020 === (1))){
var state_11019__$1 = state_11019;
var statearr_11023_11089 = state_11019__$1;
(statearr_11023_11089[(2)] = null);

(statearr_11023_11089[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11020 === (4))){
var inst_10984 = (state_11019[(7)]);
var inst_10984__$1 = (state_11019[(2)]);
var inst_10985 = (inst_10984__$1 == null);
var state_11019__$1 = (function (){var statearr_11024 = state_11019;
(statearr_11024[(7)] = inst_10984__$1);

return statearr_11024;
})();
if(cljs.core.truth_(inst_10985)){
var statearr_11025_11090 = state_11019__$1;
(statearr_11025_11090[(1)] = (5));

} else {
var statearr_11026_11091 = state_11019__$1;
(statearr_11026_11091[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11020 === (15))){
var inst_10997 = (state_11019[(8)]);
var state_11019__$1 = state_11019;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_11019__$1,(18),to,inst_10997);
} else {
if((state_val_11020 === (21))){
var inst_11010 = (state_11019[(2)]);
var state_11019__$1 = state_11019;
var statearr_11027_11092 = state_11019__$1;
(statearr_11027_11092[(2)] = inst_11010);

(statearr_11027_11092[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11020 === (13))){
var inst_11012 = (state_11019[(2)]);
var state_11019__$1 = (function (){var statearr_11028 = state_11019;
(statearr_11028[(9)] = inst_11012);

return statearr_11028;
})();
var statearr_11029_11093 = state_11019__$1;
(statearr_11029_11093[(2)] = null);

(statearr_11029_11093[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11020 === (6))){
var inst_10984 = (state_11019[(7)]);
var state_11019__$1 = state_11019;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_11019__$1,(11),inst_10984);
} else {
if((state_val_11020 === (17))){
var inst_11005 = (state_11019[(2)]);
var state_11019__$1 = state_11019;
if(cljs.core.truth_(inst_11005)){
var statearr_11030_11094 = state_11019__$1;
(statearr_11030_11094[(1)] = (19));

} else {
var statearr_11031_11095 = state_11019__$1;
(statearr_11031_11095[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11020 === (3))){
var inst_11017 = (state_11019[(2)]);
var state_11019__$1 = state_11019;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_11019__$1,inst_11017);
} else {
if((state_val_11020 === (12))){
var inst_10994 = (state_11019[(10)]);
var state_11019__$1 = state_11019;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_11019__$1,(14),inst_10994);
} else {
if((state_val_11020 === (2))){
var state_11019__$1 = state_11019;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_11019__$1,(4),results);
} else {
if((state_val_11020 === (19))){
var state_11019__$1 = state_11019;
var statearr_11032_11096 = state_11019__$1;
(statearr_11032_11096[(2)] = null);

(statearr_11032_11096[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11020 === (11))){
var inst_10994 = (state_11019[(2)]);
var state_11019__$1 = (function (){var statearr_11033 = state_11019;
(statearr_11033[(10)] = inst_10994);

return statearr_11033;
})();
var statearr_11034_11097 = state_11019__$1;
(statearr_11034_11097[(2)] = null);

(statearr_11034_11097[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11020 === (9))){
var state_11019__$1 = state_11019;
var statearr_11035_11098 = state_11019__$1;
(statearr_11035_11098[(2)] = null);

(statearr_11035_11098[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11020 === (5))){
var state_11019__$1 = state_11019;
if(cljs.core.truth_(close_QMARK_)){
var statearr_11036_11099 = state_11019__$1;
(statearr_11036_11099[(1)] = (8));

} else {
var statearr_11037_11100 = state_11019__$1;
(statearr_11037_11100[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11020 === (14))){
var inst_10997 = (state_11019[(8)]);
var inst_10999 = (state_11019[(11)]);
var inst_10997__$1 = (state_11019[(2)]);
var inst_10998 = (inst_10997__$1 == null);
var inst_10999__$1 = cljs.core.not.call(null,inst_10998);
var state_11019__$1 = (function (){var statearr_11038 = state_11019;
(statearr_11038[(8)] = inst_10997__$1);

(statearr_11038[(11)] = inst_10999__$1);

return statearr_11038;
})();
if(inst_10999__$1){
var statearr_11039_11101 = state_11019__$1;
(statearr_11039_11101[(1)] = (15));

} else {
var statearr_11040_11102 = state_11019__$1;
(statearr_11040_11102[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11020 === (16))){
var inst_10999 = (state_11019[(11)]);
var state_11019__$1 = state_11019;
var statearr_11041_11103 = state_11019__$1;
(statearr_11041_11103[(2)] = inst_10999);

(statearr_11041_11103[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11020 === (10))){
var inst_10991 = (state_11019[(2)]);
var state_11019__$1 = state_11019;
var statearr_11042_11104 = state_11019__$1;
(statearr_11042_11104[(2)] = inst_10991);

(statearr_11042_11104[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11020 === (18))){
var inst_11002 = (state_11019[(2)]);
var state_11019__$1 = state_11019;
var statearr_11043_11105 = state_11019__$1;
(statearr_11043_11105[(2)] = inst_11002);

(statearr_11043_11105[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11020 === (8))){
var inst_10988 = cljs.core.async.close_BANG_.call(null,to);
var state_11019__$1 = state_11019;
var statearr_11044_11106 = state_11019__$1;
(statearr_11044_11106[(2)] = inst_10988);

(statearr_11044_11106[(1)] = (10));


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
var statearr_11048 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_11048[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__);

(statearr_11048[(1)] = (1));

return statearr_11048;
});
var cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____1 = (function (state_11019){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_11019);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e11049){if((e11049 instanceof Object)){
var ex__6746__auto__ = e11049;
var statearr_11050_11107 = state_11019;
(statearr_11050_11107[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11019);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e11049;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__11108 = state_11019;
state_11019 = G__11108;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__ = function(state_11019){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____1.call(this,state_11019);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__6743__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto__,jobs,results,process,async))
})();
var state__6806__auto__ = (function (){var statearr_11051 = f__6805__auto__.call(null);
(statearr_11051[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto__);

return statearr_11051;
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
var G__11110 = arguments.length;
switch (G__11110) {
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
var G__11113 = arguments.length;
switch (G__11113) {
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
var G__11116 = arguments.length;
switch (G__11116) {
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
var c__6804__auto___11168 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto___11168,tc,fc){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto___11168,tc,fc){
return (function (state_11142){
var state_val_11143 = (state_11142[(1)]);
if((state_val_11143 === (7))){
var inst_11138 = (state_11142[(2)]);
var state_11142__$1 = state_11142;
var statearr_11144_11169 = state_11142__$1;
(statearr_11144_11169[(2)] = inst_11138);

(statearr_11144_11169[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11143 === (1))){
var state_11142__$1 = state_11142;
var statearr_11145_11170 = state_11142__$1;
(statearr_11145_11170[(2)] = null);

(statearr_11145_11170[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11143 === (4))){
var inst_11119 = (state_11142[(7)]);
var inst_11119__$1 = (state_11142[(2)]);
var inst_11120 = (inst_11119__$1 == null);
var state_11142__$1 = (function (){var statearr_11146 = state_11142;
(statearr_11146[(7)] = inst_11119__$1);

return statearr_11146;
})();
if(cljs.core.truth_(inst_11120)){
var statearr_11147_11171 = state_11142__$1;
(statearr_11147_11171[(1)] = (5));

} else {
var statearr_11148_11172 = state_11142__$1;
(statearr_11148_11172[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11143 === (13))){
var state_11142__$1 = state_11142;
var statearr_11149_11173 = state_11142__$1;
(statearr_11149_11173[(2)] = null);

(statearr_11149_11173[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11143 === (6))){
var inst_11119 = (state_11142[(7)]);
var inst_11125 = p.call(null,inst_11119);
var state_11142__$1 = state_11142;
if(cljs.core.truth_(inst_11125)){
var statearr_11150_11174 = state_11142__$1;
(statearr_11150_11174[(1)] = (9));

} else {
var statearr_11151_11175 = state_11142__$1;
(statearr_11151_11175[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11143 === (3))){
var inst_11140 = (state_11142[(2)]);
var state_11142__$1 = state_11142;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_11142__$1,inst_11140);
} else {
if((state_val_11143 === (12))){
var state_11142__$1 = state_11142;
var statearr_11152_11176 = state_11142__$1;
(statearr_11152_11176[(2)] = null);

(statearr_11152_11176[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11143 === (2))){
var state_11142__$1 = state_11142;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_11142__$1,(4),ch);
} else {
if((state_val_11143 === (11))){
var inst_11119 = (state_11142[(7)]);
var inst_11129 = (state_11142[(2)]);
var state_11142__$1 = state_11142;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_11142__$1,(8),inst_11129,inst_11119);
} else {
if((state_val_11143 === (9))){
var state_11142__$1 = state_11142;
var statearr_11153_11177 = state_11142__$1;
(statearr_11153_11177[(2)] = tc);

(statearr_11153_11177[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11143 === (5))){
var inst_11122 = cljs.core.async.close_BANG_.call(null,tc);
var inst_11123 = cljs.core.async.close_BANG_.call(null,fc);
var state_11142__$1 = (function (){var statearr_11154 = state_11142;
(statearr_11154[(8)] = inst_11122);

return statearr_11154;
})();
var statearr_11155_11178 = state_11142__$1;
(statearr_11155_11178[(2)] = inst_11123);

(statearr_11155_11178[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11143 === (14))){
var inst_11136 = (state_11142[(2)]);
var state_11142__$1 = state_11142;
var statearr_11156_11179 = state_11142__$1;
(statearr_11156_11179[(2)] = inst_11136);

(statearr_11156_11179[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11143 === (10))){
var state_11142__$1 = state_11142;
var statearr_11157_11180 = state_11142__$1;
(statearr_11157_11180[(2)] = fc);

(statearr_11157_11180[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11143 === (8))){
var inst_11131 = (state_11142[(2)]);
var state_11142__$1 = state_11142;
if(cljs.core.truth_(inst_11131)){
var statearr_11158_11181 = state_11142__$1;
(statearr_11158_11181[(1)] = (12));

} else {
var statearr_11159_11182 = state_11142__$1;
(statearr_11159_11182[(1)] = (13));

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
});})(c__6804__auto___11168,tc,fc))
;
return ((function (switch__6742__auto__,c__6804__auto___11168,tc,fc){
return (function() {
var cljs$core$async$state_machine__6743__auto__ = null;
var cljs$core$async$state_machine__6743__auto____0 = (function (){
var statearr_11163 = [null,null,null,null,null,null,null,null,null];
(statearr_11163[(0)] = cljs$core$async$state_machine__6743__auto__);

(statearr_11163[(1)] = (1));

return statearr_11163;
});
var cljs$core$async$state_machine__6743__auto____1 = (function (state_11142){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_11142);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e11164){if((e11164 instanceof Object)){
var ex__6746__auto__ = e11164;
var statearr_11165_11183 = state_11142;
(statearr_11165_11183[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11142);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e11164;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__11184 = state_11142;
state_11142 = G__11184;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs$core$async$state_machine__6743__auto__ = function(state_11142){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__6743__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__6743__auto____1.call(this,state_11142);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__6743__auto____0;
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__6743__auto____1;
return cljs$core$async$state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto___11168,tc,fc))
})();
var state__6806__auto__ = (function (){var statearr_11166 = f__6805__auto__.call(null);
(statearr_11166[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto___11168);

return statearr_11166;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto___11168,tc,fc))
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
return (function (state_11231){
var state_val_11232 = (state_11231[(1)]);
if((state_val_11232 === (1))){
var inst_11217 = init;
var state_11231__$1 = (function (){var statearr_11233 = state_11231;
(statearr_11233[(7)] = inst_11217);

return statearr_11233;
})();
var statearr_11234_11249 = state_11231__$1;
(statearr_11234_11249[(2)] = null);

(statearr_11234_11249[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11232 === (2))){
var state_11231__$1 = state_11231;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_11231__$1,(4),ch);
} else {
if((state_val_11232 === (3))){
var inst_11229 = (state_11231[(2)]);
var state_11231__$1 = state_11231;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_11231__$1,inst_11229);
} else {
if((state_val_11232 === (4))){
var inst_11220 = (state_11231[(8)]);
var inst_11220__$1 = (state_11231[(2)]);
var inst_11221 = (inst_11220__$1 == null);
var state_11231__$1 = (function (){var statearr_11235 = state_11231;
(statearr_11235[(8)] = inst_11220__$1);

return statearr_11235;
})();
if(cljs.core.truth_(inst_11221)){
var statearr_11236_11250 = state_11231__$1;
(statearr_11236_11250[(1)] = (5));

} else {
var statearr_11237_11251 = state_11231__$1;
(statearr_11237_11251[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11232 === (5))){
var inst_11217 = (state_11231[(7)]);
var state_11231__$1 = state_11231;
var statearr_11238_11252 = state_11231__$1;
(statearr_11238_11252[(2)] = inst_11217);

(statearr_11238_11252[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11232 === (6))){
var inst_11217 = (state_11231[(7)]);
var inst_11220 = (state_11231[(8)]);
var inst_11224 = f.call(null,inst_11217,inst_11220);
var inst_11217__$1 = inst_11224;
var state_11231__$1 = (function (){var statearr_11239 = state_11231;
(statearr_11239[(7)] = inst_11217__$1);

return statearr_11239;
})();
var statearr_11240_11253 = state_11231__$1;
(statearr_11240_11253[(2)] = null);

(statearr_11240_11253[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11232 === (7))){
var inst_11227 = (state_11231[(2)]);
var state_11231__$1 = state_11231;
var statearr_11241_11254 = state_11231__$1;
(statearr_11241_11254[(2)] = inst_11227);

(statearr_11241_11254[(1)] = (3));


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
var statearr_11245 = [null,null,null,null,null,null,null,null,null];
(statearr_11245[(0)] = cljs$core$async$reduce_$_state_machine__6743__auto__);

(statearr_11245[(1)] = (1));

return statearr_11245;
});
var cljs$core$async$reduce_$_state_machine__6743__auto____1 = (function (state_11231){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_11231);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e11246){if((e11246 instanceof Object)){
var ex__6746__auto__ = e11246;
var statearr_11247_11255 = state_11231;
(statearr_11247_11255[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11231);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e11246;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__11256 = state_11231;
state_11231 = G__11256;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__6743__auto__ = function(state_11231){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__6743__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__6743__auto____1.call(this,state_11231);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__6743__auto____0;
cljs$core$async$reduce_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__6743__auto____1;
return cljs$core$async$reduce_$_state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto__))
})();
var state__6806__auto__ = (function (){var statearr_11248 = f__6805__auto__.call(null);
(statearr_11248[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto__);

return statearr_11248;
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
var G__11258 = arguments.length;
switch (G__11258) {
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
return (function (state_11283){
var state_val_11284 = (state_11283[(1)]);
if((state_val_11284 === (7))){
var inst_11265 = (state_11283[(2)]);
var state_11283__$1 = state_11283;
var statearr_11285_11309 = state_11283__$1;
(statearr_11285_11309[(2)] = inst_11265);

(statearr_11285_11309[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11284 === (1))){
var inst_11259 = cljs.core.seq.call(null,coll);
var inst_11260 = inst_11259;
var state_11283__$1 = (function (){var statearr_11286 = state_11283;
(statearr_11286[(7)] = inst_11260);

return statearr_11286;
})();
var statearr_11287_11310 = state_11283__$1;
(statearr_11287_11310[(2)] = null);

(statearr_11287_11310[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11284 === (4))){
var inst_11260 = (state_11283[(7)]);
var inst_11263 = cljs.core.first.call(null,inst_11260);
var state_11283__$1 = state_11283;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_11283__$1,(7),ch,inst_11263);
} else {
if((state_val_11284 === (13))){
var inst_11277 = (state_11283[(2)]);
var state_11283__$1 = state_11283;
var statearr_11288_11311 = state_11283__$1;
(statearr_11288_11311[(2)] = inst_11277);

(statearr_11288_11311[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11284 === (6))){
var inst_11268 = (state_11283[(2)]);
var state_11283__$1 = state_11283;
if(cljs.core.truth_(inst_11268)){
var statearr_11289_11312 = state_11283__$1;
(statearr_11289_11312[(1)] = (8));

} else {
var statearr_11290_11313 = state_11283__$1;
(statearr_11290_11313[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11284 === (3))){
var inst_11281 = (state_11283[(2)]);
var state_11283__$1 = state_11283;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_11283__$1,inst_11281);
} else {
if((state_val_11284 === (12))){
var state_11283__$1 = state_11283;
var statearr_11291_11314 = state_11283__$1;
(statearr_11291_11314[(2)] = null);

(statearr_11291_11314[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11284 === (2))){
var inst_11260 = (state_11283[(7)]);
var state_11283__$1 = state_11283;
if(cljs.core.truth_(inst_11260)){
var statearr_11292_11315 = state_11283__$1;
(statearr_11292_11315[(1)] = (4));

} else {
var statearr_11293_11316 = state_11283__$1;
(statearr_11293_11316[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11284 === (11))){
var inst_11274 = cljs.core.async.close_BANG_.call(null,ch);
var state_11283__$1 = state_11283;
var statearr_11294_11317 = state_11283__$1;
(statearr_11294_11317[(2)] = inst_11274);

(statearr_11294_11317[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11284 === (9))){
var state_11283__$1 = state_11283;
if(cljs.core.truth_(close_QMARK_)){
var statearr_11295_11318 = state_11283__$1;
(statearr_11295_11318[(1)] = (11));

} else {
var statearr_11296_11319 = state_11283__$1;
(statearr_11296_11319[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11284 === (5))){
var inst_11260 = (state_11283[(7)]);
var state_11283__$1 = state_11283;
var statearr_11297_11320 = state_11283__$1;
(statearr_11297_11320[(2)] = inst_11260);

(statearr_11297_11320[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11284 === (10))){
var inst_11279 = (state_11283[(2)]);
var state_11283__$1 = state_11283;
var statearr_11298_11321 = state_11283__$1;
(statearr_11298_11321[(2)] = inst_11279);

(statearr_11298_11321[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11284 === (8))){
var inst_11260 = (state_11283[(7)]);
var inst_11270 = cljs.core.next.call(null,inst_11260);
var inst_11260__$1 = inst_11270;
var state_11283__$1 = (function (){var statearr_11299 = state_11283;
(statearr_11299[(7)] = inst_11260__$1);

return statearr_11299;
})();
var statearr_11300_11322 = state_11283__$1;
(statearr_11300_11322[(2)] = null);

(statearr_11300_11322[(1)] = (2));


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
var statearr_11304 = [null,null,null,null,null,null,null,null];
(statearr_11304[(0)] = cljs$core$async$state_machine__6743__auto__);

(statearr_11304[(1)] = (1));

return statearr_11304;
});
var cljs$core$async$state_machine__6743__auto____1 = (function (state_11283){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_11283);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e11305){if((e11305 instanceof Object)){
var ex__6746__auto__ = e11305;
var statearr_11306_11323 = state_11283;
(statearr_11306_11323[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11283);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e11305;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__11324 = state_11283;
state_11283 = G__11324;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs$core$async$state_machine__6743__auto__ = function(state_11283){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__6743__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__6743__auto____1.call(this,state_11283);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__6743__auto____0;
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__6743__auto____1;
return cljs$core$async$state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto__))
})();
var state__6806__auto__ = (function (){var statearr_11307 = f__6805__auto__.call(null);
(statearr_11307[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto__);

return statearr_11307;
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

cljs.core.async.Mux = (function (){var obj11326 = {};
return obj11326;
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


cljs.core.async.Mult = (function (){var obj11328 = {};
return obj11328;
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
if(typeof cljs.core.async.t11550 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t11550 = (function (mult,ch,cs,meta11551){
this.mult = mult;
this.ch = ch;
this.cs = cs;
this.meta11551 = meta11551;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t11550.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs){
return (function (_11552,meta11551__$1){
var self__ = this;
var _11552__$1 = this;
return (new cljs.core.async.t11550(self__.mult,self__.ch,self__.cs,meta11551__$1));
});})(cs))
;

cljs.core.async.t11550.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs){
return (function (_11552){
var self__ = this;
var _11552__$1 = this;
return self__.meta11551;
});})(cs))
;

cljs.core.async.t11550.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t11550.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(cs))
;

cljs.core.async.t11550.prototype.cljs$core$async$Mult$ = true;

cljs.core.async.t11550.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = ((function (cs){
return (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
});})(cs))
;

cljs.core.async.t11550.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = ((function (cs){
return (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch__$1);

return null;
});})(cs))
;

cljs.core.async.t11550.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
});})(cs))
;

cljs.core.async.t11550.getBasis = ((function (cs){
return (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"mult","mult",-1187640995,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta11551","meta11551",-586749894,null)], null);
});})(cs))
;

cljs.core.async.t11550.cljs$lang$type = true;

cljs.core.async.t11550.cljs$lang$ctorStr = "cljs.core.async/t11550";

cljs.core.async.t11550.cljs$lang$ctorPrWriter = ((function (cs){
return (function (this__4899__auto__,writer__4900__auto__,opt__4901__auto__){
return cljs.core._write.call(null,writer__4900__auto__,"cljs.core.async/t11550");
});})(cs))
;

cljs.core.async.__GT_t11550 = ((function (cs){
return (function cljs$core$async$mult_$___GT_t11550(mult__$1,ch__$1,cs__$1,meta11551){
return (new cljs.core.async.t11550(mult__$1,ch__$1,cs__$1,meta11551));
});})(cs))
;

}

return (new cljs.core.async.t11550(cljs$core$async$mult,ch,cs,cljs.core.PersistentArrayMap.EMPTY));
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
var c__6804__auto___11771 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto___11771,cs,m,dchan,dctr,done){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto___11771,cs,m,dchan,dctr,done){
return (function (state_11683){
var state_val_11684 = (state_11683[(1)]);
if((state_val_11684 === (7))){
var inst_11679 = (state_11683[(2)]);
var state_11683__$1 = state_11683;
var statearr_11685_11772 = state_11683__$1;
(statearr_11685_11772[(2)] = inst_11679);

(statearr_11685_11772[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (20))){
var inst_11584 = (state_11683[(7)]);
var inst_11594 = cljs.core.first.call(null,inst_11584);
var inst_11595 = cljs.core.nth.call(null,inst_11594,(0),null);
var inst_11596 = cljs.core.nth.call(null,inst_11594,(1),null);
var state_11683__$1 = (function (){var statearr_11686 = state_11683;
(statearr_11686[(8)] = inst_11595);

return statearr_11686;
})();
if(cljs.core.truth_(inst_11596)){
var statearr_11687_11773 = state_11683__$1;
(statearr_11687_11773[(1)] = (22));

} else {
var statearr_11688_11774 = state_11683__$1;
(statearr_11688_11774[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (27))){
var inst_11624 = (state_11683[(9)]);
var inst_11631 = (state_11683[(10)]);
var inst_11555 = (state_11683[(11)]);
var inst_11626 = (state_11683[(12)]);
var inst_11631__$1 = cljs.core._nth.call(null,inst_11624,inst_11626);
var inst_11632 = cljs.core.async.put_BANG_.call(null,inst_11631__$1,inst_11555,done);
var state_11683__$1 = (function (){var statearr_11689 = state_11683;
(statearr_11689[(10)] = inst_11631__$1);

return statearr_11689;
})();
if(cljs.core.truth_(inst_11632)){
var statearr_11690_11775 = state_11683__$1;
(statearr_11690_11775[(1)] = (30));

} else {
var statearr_11691_11776 = state_11683__$1;
(statearr_11691_11776[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (1))){
var state_11683__$1 = state_11683;
var statearr_11692_11777 = state_11683__$1;
(statearr_11692_11777[(2)] = null);

(statearr_11692_11777[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (24))){
var inst_11584 = (state_11683[(7)]);
var inst_11601 = (state_11683[(2)]);
var inst_11602 = cljs.core.next.call(null,inst_11584);
var inst_11564 = inst_11602;
var inst_11565 = null;
var inst_11566 = (0);
var inst_11567 = (0);
var state_11683__$1 = (function (){var statearr_11693 = state_11683;
(statearr_11693[(13)] = inst_11601);

(statearr_11693[(14)] = inst_11564);

(statearr_11693[(15)] = inst_11567);

(statearr_11693[(16)] = inst_11566);

(statearr_11693[(17)] = inst_11565);

return statearr_11693;
})();
var statearr_11694_11778 = state_11683__$1;
(statearr_11694_11778[(2)] = null);

(statearr_11694_11778[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (39))){
var state_11683__$1 = state_11683;
var statearr_11698_11779 = state_11683__$1;
(statearr_11698_11779[(2)] = null);

(statearr_11698_11779[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (4))){
var inst_11555 = (state_11683[(11)]);
var inst_11555__$1 = (state_11683[(2)]);
var inst_11556 = (inst_11555__$1 == null);
var state_11683__$1 = (function (){var statearr_11699 = state_11683;
(statearr_11699[(11)] = inst_11555__$1);

return statearr_11699;
})();
if(cljs.core.truth_(inst_11556)){
var statearr_11700_11780 = state_11683__$1;
(statearr_11700_11780[(1)] = (5));

} else {
var statearr_11701_11781 = state_11683__$1;
(statearr_11701_11781[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (15))){
var inst_11564 = (state_11683[(14)]);
var inst_11567 = (state_11683[(15)]);
var inst_11566 = (state_11683[(16)]);
var inst_11565 = (state_11683[(17)]);
var inst_11580 = (state_11683[(2)]);
var inst_11581 = (inst_11567 + (1));
var tmp11695 = inst_11564;
var tmp11696 = inst_11566;
var tmp11697 = inst_11565;
var inst_11564__$1 = tmp11695;
var inst_11565__$1 = tmp11697;
var inst_11566__$1 = tmp11696;
var inst_11567__$1 = inst_11581;
var state_11683__$1 = (function (){var statearr_11702 = state_11683;
(statearr_11702[(18)] = inst_11580);

(statearr_11702[(14)] = inst_11564__$1);

(statearr_11702[(15)] = inst_11567__$1);

(statearr_11702[(16)] = inst_11566__$1);

(statearr_11702[(17)] = inst_11565__$1);

return statearr_11702;
})();
var statearr_11703_11782 = state_11683__$1;
(statearr_11703_11782[(2)] = null);

(statearr_11703_11782[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (21))){
var inst_11605 = (state_11683[(2)]);
var state_11683__$1 = state_11683;
var statearr_11707_11783 = state_11683__$1;
(statearr_11707_11783[(2)] = inst_11605);

(statearr_11707_11783[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (31))){
var inst_11631 = (state_11683[(10)]);
var inst_11635 = done.call(null,null);
var inst_11636 = cljs.core.async.untap_STAR_.call(null,m,inst_11631);
var state_11683__$1 = (function (){var statearr_11708 = state_11683;
(statearr_11708[(19)] = inst_11635);

return statearr_11708;
})();
var statearr_11709_11784 = state_11683__$1;
(statearr_11709_11784[(2)] = inst_11636);

(statearr_11709_11784[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (32))){
var inst_11624 = (state_11683[(9)]);
var inst_11623 = (state_11683[(20)]);
var inst_11625 = (state_11683[(21)]);
var inst_11626 = (state_11683[(12)]);
var inst_11638 = (state_11683[(2)]);
var inst_11639 = (inst_11626 + (1));
var tmp11704 = inst_11624;
var tmp11705 = inst_11623;
var tmp11706 = inst_11625;
var inst_11623__$1 = tmp11705;
var inst_11624__$1 = tmp11704;
var inst_11625__$1 = tmp11706;
var inst_11626__$1 = inst_11639;
var state_11683__$1 = (function (){var statearr_11710 = state_11683;
(statearr_11710[(9)] = inst_11624__$1);

(statearr_11710[(20)] = inst_11623__$1);

(statearr_11710[(21)] = inst_11625__$1);

(statearr_11710[(22)] = inst_11638);

(statearr_11710[(12)] = inst_11626__$1);

return statearr_11710;
})();
var statearr_11711_11785 = state_11683__$1;
(statearr_11711_11785[(2)] = null);

(statearr_11711_11785[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (40))){
var inst_11651 = (state_11683[(23)]);
var inst_11655 = done.call(null,null);
var inst_11656 = cljs.core.async.untap_STAR_.call(null,m,inst_11651);
var state_11683__$1 = (function (){var statearr_11712 = state_11683;
(statearr_11712[(24)] = inst_11655);

return statearr_11712;
})();
var statearr_11713_11786 = state_11683__$1;
(statearr_11713_11786[(2)] = inst_11656);

(statearr_11713_11786[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (33))){
var inst_11642 = (state_11683[(25)]);
var inst_11644 = cljs.core.chunked_seq_QMARK_.call(null,inst_11642);
var state_11683__$1 = state_11683;
if(inst_11644){
var statearr_11714_11787 = state_11683__$1;
(statearr_11714_11787[(1)] = (36));

} else {
var statearr_11715_11788 = state_11683__$1;
(statearr_11715_11788[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (13))){
var inst_11574 = (state_11683[(26)]);
var inst_11577 = cljs.core.async.close_BANG_.call(null,inst_11574);
var state_11683__$1 = state_11683;
var statearr_11716_11789 = state_11683__$1;
(statearr_11716_11789[(2)] = inst_11577);

(statearr_11716_11789[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (22))){
var inst_11595 = (state_11683[(8)]);
var inst_11598 = cljs.core.async.close_BANG_.call(null,inst_11595);
var state_11683__$1 = state_11683;
var statearr_11717_11790 = state_11683__$1;
(statearr_11717_11790[(2)] = inst_11598);

(statearr_11717_11790[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (36))){
var inst_11642 = (state_11683[(25)]);
var inst_11646 = cljs.core.chunk_first.call(null,inst_11642);
var inst_11647 = cljs.core.chunk_rest.call(null,inst_11642);
var inst_11648 = cljs.core.count.call(null,inst_11646);
var inst_11623 = inst_11647;
var inst_11624 = inst_11646;
var inst_11625 = inst_11648;
var inst_11626 = (0);
var state_11683__$1 = (function (){var statearr_11718 = state_11683;
(statearr_11718[(9)] = inst_11624);

(statearr_11718[(20)] = inst_11623);

(statearr_11718[(21)] = inst_11625);

(statearr_11718[(12)] = inst_11626);

return statearr_11718;
})();
var statearr_11719_11791 = state_11683__$1;
(statearr_11719_11791[(2)] = null);

(statearr_11719_11791[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (41))){
var inst_11642 = (state_11683[(25)]);
var inst_11658 = (state_11683[(2)]);
var inst_11659 = cljs.core.next.call(null,inst_11642);
var inst_11623 = inst_11659;
var inst_11624 = null;
var inst_11625 = (0);
var inst_11626 = (0);
var state_11683__$1 = (function (){var statearr_11720 = state_11683;
(statearr_11720[(9)] = inst_11624);

(statearr_11720[(27)] = inst_11658);

(statearr_11720[(20)] = inst_11623);

(statearr_11720[(21)] = inst_11625);

(statearr_11720[(12)] = inst_11626);

return statearr_11720;
})();
var statearr_11721_11792 = state_11683__$1;
(statearr_11721_11792[(2)] = null);

(statearr_11721_11792[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (43))){
var state_11683__$1 = state_11683;
var statearr_11722_11793 = state_11683__$1;
(statearr_11722_11793[(2)] = null);

(statearr_11722_11793[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (29))){
var inst_11667 = (state_11683[(2)]);
var state_11683__$1 = state_11683;
var statearr_11723_11794 = state_11683__$1;
(statearr_11723_11794[(2)] = inst_11667);

(statearr_11723_11794[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (44))){
var inst_11676 = (state_11683[(2)]);
var state_11683__$1 = (function (){var statearr_11724 = state_11683;
(statearr_11724[(28)] = inst_11676);

return statearr_11724;
})();
var statearr_11725_11795 = state_11683__$1;
(statearr_11725_11795[(2)] = null);

(statearr_11725_11795[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (6))){
var inst_11615 = (state_11683[(29)]);
var inst_11614 = cljs.core.deref.call(null,cs);
var inst_11615__$1 = cljs.core.keys.call(null,inst_11614);
var inst_11616 = cljs.core.count.call(null,inst_11615__$1);
var inst_11617 = cljs.core.reset_BANG_.call(null,dctr,inst_11616);
var inst_11622 = cljs.core.seq.call(null,inst_11615__$1);
var inst_11623 = inst_11622;
var inst_11624 = null;
var inst_11625 = (0);
var inst_11626 = (0);
var state_11683__$1 = (function (){var statearr_11726 = state_11683;
(statearr_11726[(30)] = inst_11617);

(statearr_11726[(29)] = inst_11615__$1);

(statearr_11726[(9)] = inst_11624);

(statearr_11726[(20)] = inst_11623);

(statearr_11726[(21)] = inst_11625);

(statearr_11726[(12)] = inst_11626);

return statearr_11726;
})();
var statearr_11727_11796 = state_11683__$1;
(statearr_11727_11796[(2)] = null);

(statearr_11727_11796[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (28))){
var inst_11623 = (state_11683[(20)]);
var inst_11642 = (state_11683[(25)]);
var inst_11642__$1 = cljs.core.seq.call(null,inst_11623);
var state_11683__$1 = (function (){var statearr_11728 = state_11683;
(statearr_11728[(25)] = inst_11642__$1);

return statearr_11728;
})();
if(inst_11642__$1){
var statearr_11729_11797 = state_11683__$1;
(statearr_11729_11797[(1)] = (33));

} else {
var statearr_11730_11798 = state_11683__$1;
(statearr_11730_11798[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (25))){
var inst_11625 = (state_11683[(21)]);
var inst_11626 = (state_11683[(12)]);
var inst_11628 = (inst_11626 < inst_11625);
var inst_11629 = inst_11628;
var state_11683__$1 = state_11683;
if(cljs.core.truth_(inst_11629)){
var statearr_11731_11799 = state_11683__$1;
(statearr_11731_11799[(1)] = (27));

} else {
var statearr_11732_11800 = state_11683__$1;
(statearr_11732_11800[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (34))){
var state_11683__$1 = state_11683;
var statearr_11733_11801 = state_11683__$1;
(statearr_11733_11801[(2)] = null);

(statearr_11733_11801[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (17))){
var state_11683__$1 = state_11683;
var statearr_11734_11802 = state_11683__$1;
(statearr_11734_11802[(2)] = null);

(statearr_11734_11802[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (3))){
var inst_11681 = (state_11683[(2)]);
var state_11683__$1 = state_11683;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_11683__$1,inst_11681);
} else {
if((state_val_11684 === (12))){
var inst_11610 = (state_11683[(2)]);
var state_11683__$1 = state_11683;
var statearr_11735_11803 = state_11683__$1;
(statearr_11735_11803[(2)] = inst_11610);

(statearr_11735_11803[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (2))){
var state_11683__$1 = state_11683;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_11683__$1,(4),ch);
} else {
if((state_val_11684 === (23))){
var state_11683__$1 = state_11683;
var statearr_11736_11804 = state_11683__$1;
(statearr_11736_11804[(2)] = null);

(statearr_11736_11804[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (35))){
var inst_11665 = (state_11683[(2)]);
var state_11683__$1 = state_11683;
var statearr_11737_11805 = state_11683__$1;
(statearr_11737_11805[(2)] = inst_11665);

(statearr_11737_11805[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (19))){
var inst_11584 = (state_11683[(7)]);
var inst_11588 = cljs.core.chunk_first.call(null,inst_11584);
var inst_11589 = cljs.core.chunk_rest.call(null,inst_11584);
var inst_11590 = cljs.core.count.call(null,inst_11588);
var inst_11564 = inst_11589;
var inst_11565 = inst_11588;
var inst_11566 = inst_11590;
var inst_11567 = (0);
var state_11683__$1 = (function (){var statearr_11738 = state_11683;
(statearr_11738[(14)] = inst_11564);

(statearr_11738[(15)] = inst_11567);

(statearr_11738[(16)] = inst_11566);

(statearr_11738[(17)] = inst_11565);

return statearr_11738;
})();
var statearr_11739_11806 = state_11683__$1;
(statearr_11739_11806[(2)] = null);

(statearr_11739_11806[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (11))){
var inst_11584 = (state_11683[(7)]);
var inst_11564 = (state_11683[(14)]);
var inst_11584__$1 = cljs.core.seq.call(null,inst_11564);
var state_11683__$1 = (function (){var statearr_11740 = state_11683;
(statearr_11740[(7)] = inst_11584__$1);

return statearr_11740;
})();
if(inst_11584__$1){
var statearr_11741_11807 = state_11683__$1;
(statearr_11741_11807[(1)] = (16));

} else {
var statearr_11742_11808 = state_11683__$1;
(statearr_11742_11808[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (9))){
var inst_11612 = (state_11683[(2)]);
var state_11683__$1 = state_11683;
var statearr_11743_11809 = state_11683__$1;
(statearr_11743_11809[(2)] = inst_11612);

(statearr_11743_11809[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (5))){
var inst_11562 = cljs.core.deref.call(null,cs);
var inst_11563 = cljs.core.seq.call(null,inst_11562);
var inst_11564 = inst_11563;
var inst_11565 = null;
var inst_11566 = (0);
var inst_11567 = (0);
var state_11683__$1 = (function (){var statearr_11744 = state_11683;
(statearr_11744[(14)] = inst_11564);

(statearr_11744[(15)] = inst_11567);

(statearr_11744[(16)] = inst_11566);

(statearr_11744[(17)] = inst_11565);

return statearr_11744;
})();
var statearr_11745_11810 = state_11683__$1;
(statearr_11745_11810[(2)] = null);

(statearr_11745_11810[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (14))){
var state_11683__$1 = state_11683;
var statearr_11746_11811 = state_11683__$1;
(statearr_11746_11811[(2)] = null);

(statearr_11746_11811[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (45))){
var inst_11673 = (state_11683[(2)]);
var state_11683__$1 = state_11683;
var statearr_11747_11812 = state_11683__$1;
(statearr_11747_11812[(2)] = inst_11673);

(statearr_11747_11812[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (26))){
var inst_11615 = (state_11683[(29)]);
var inst_11669 = (state_11683[(2)]);
var inst_11670 = cljs.core.seq.call(null,inst_11615);
var state_11683__$1 = (function (){var statearr_11748 = state_11683;
(statearr_11748[(31)] = inst_11669);

return statearr_11748;
})();
if(inst_11670){
var statearr_11749_11813 = state_11683__$1;
(statearr_11749_11813[(1)] = (42));

} else {
var statearr_11750_11814 = state_11683__$1;
(statearr_11750_11814[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (16))){
var inst_11584 = (state_11683[(7)]);
var inst_11586 = cljs.core.chunked_seq_QMARK_.call(null,inst_11584);
var state_11683__$1 = state_11683;
if(inst_11586){
var statearr_11751_11815 = state_11683__$1;
(statearr_11751_11815[(1)] = (19));

} else {
var statearr_11752_11816 = state_11683__$1;
(statearr_11752_11816[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (38))){
var inst_11662 = (state_11683[(2)]);
var state_11683__$1 = state_11683;
var statearr_11753_11817 = state_11683__$1;
(statearr_11753_11817[(2)] = inst_11662);

(statearr_11753_11817[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (30))){
var state_11683__$1 = state_11683;
var statearr_11754_11818 = state_11683__$1;
(statearr_11754_11818[(2)] = null);

(statearr_11754_11818[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (10))){
var inst_11567 = (state_11683[(15)]);
var inst_11565 = (state_11683[(17)]);
var inst_11573 = cljs.core._nth.call(null,inst_11565,inst_11567);
var inst_11574 = cljs.core.nth.call(null,inst_11573,(0),null);
var inst_11575 = cljs.core.nth.call(null,inst_11573,(1),null);
var state_11683__$1 = (function (){var statearr_11755 = state_11683;
(statearr_11755[(26)] = inst_11574);

return statearr_11755;
})();
if(cljs.core.truth_(inst_11575)){
var statearr_11756_11819 = state_11683__$1;
(statearr_11756_11819[(1)] = (13));

} else {
var statearr_11757_11820 = state_11683__$1;
(statearr_11757_11820[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (18))){
var inst_11608 = (state_11683[(2)]);
var state_11683__$1 = state_11683;
var statearr_11758_11821 = state_11683__$1;
(statearr_11758_11821[(2)] = inst_11608);

(statearr_11758_11821[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (42))){
var state_11683__$1 = state_11683;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_11683__$1,(45),dchan);
} else {
if((state_val_11684 === (37))){
var inst_11555 = (state_11683[(11)]);
var inst_11642 = (state_11683[(25)]);
var inst_11651 = (state_11683[(23)]);
var inst_11651__$1 = cljs.core.first.call(null,inst_11642);
var inst_11652 = cljs.core.async.put_BANG_.call(null,inst_11651__$1,inst_11555,done);
var state_11683__$1 = (function (){var statearr_11759 = state_11683;
(statearr_11759[(23)] = inst_11651__$1);

return statearr_11759;
})();
if(cljs.core.truth_(inst_11652)){
var statearr_11760_11822 = state_11683__$1;
(statearr_11760_11822[(1)] = (39));

} else {
var statearr_11761_11823 = state_11683__$1;
(statearr_11761_11823[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11684 === (8))){
var inst_11567 = (state_11683[(15)]);
var inst_11566 = (state_11683[(16)]);
var inst_11569 = (inst_11567 < inst_11566);
var inst_11570 = inst_11569;
var state_11683__$1 = state_11683;
if(cljs.core.truth_(inst_11570)){
var statearr_11762_11824 = state_11683__$1;
(statearr_11762_11824[(1)] = (10));

} else {
var statearr_11763_11825 = state_11683__$1;
(statearr_11763_11825[(1)] = (11));

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
});})(c__6804__auto___11771,cs,m,dchan,dctr,done))
;
return ((function (switch__6742__auto__,c__6804__auto___11771,cs,m,dchan,dctr,done){
return (function() {
var cljs$core$async$mult_$_state_machine__6743__auto__ = null;
var cljs$core$async$mult_$_state_machine__6743__auto____0 = (function (){
var statearr_11767 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_11767[(0)] = cljs$core$async$mult_$_state_machine__6743__auto__);

(statearr_11767[(1)] = (1));

return statearr_11767;
});
var cljs$core$async$mult_$_state_machine__6743__auto____1 = (function (state_11683){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_11683);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e11768){if((e11768 instanceof Object)){
var ex__6746__auto__ = e11768;
var statearr_11769_11826 = state_11683;
(statearr_11769_11826[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11683);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e11768;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__11827 = state_11683;
state_11683 = G__11827;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__6743__auto__ = function(state_11683){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__6743__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__6743__auto____1.call(this,state_11683);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__6743__auto____0;
cljs$core$async$mult_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__6743__auto____1;
return cljs$core$async$mult_$_state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto___11771,cs,m,dchan,dctr,done))
})();
var state__6806__auto__ = (function (){var statearr_11770 = f__6805__auto__.call(null);
(statearr_11770[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto___11771);

return statearr_11770;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto___11771,cs,m,dchan,dctr,done))
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
var G__11829 = arguments.length;
switch (G__11829) {
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

cljs.core.async.Mix = (function (){var obj11832 = {};
return obj11832;
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

cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__11837){
var map__11838 = p__11837;
var map__11838__$1 = ((cljs.core.seq_QMARK_.call(null,map__11838))?cljs.core.apply.call(null,cljs.core.hash_map,map__11838):map__11838);
var opts = map__11838__$1;
var statearr_11839_11842 = state;
(statearr_11839_11842[cljs.core.async.impl.ioc_helpers.STATE_IDX] = cont_block);


var temp__4423__auto__ = cljs.core.async.do_alts.call(null,((function (map__11838,map__11838__$1,opts){
return (function (val){
var statearr_11840_11843 = state;
(statearr_11840_11843[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state);
});})(map__11838,map__11838__$1,opts))
,ports,opts);
if(cljs.core.truth_(temp__4423__auto__)){
var cb = temp__4423__auto__;
var statearr_11841_11844 = state;
(statearr_11841_11844[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = cljs.core.deref.call(null,cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
});

cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3);

cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq11833){
var G__11834 = cljs.core.first.call(null,seq11833);
var seq11833__$1 = cljs.core.next.call(null,seq11833);
var G__11835 = cljs.core.first.call(null,seq11833__$1);
var seq11833__$2 = cljs.core.next.call(null,seq11833__$1);
var G__11836 = cljs.core.first.call(null,seq11833__$2);
var seq11833__$3 = cljs.core.next.call(null,seq11833__$2);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__11834,G__11835,G__11836,seq11833__$3);
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
if(typeof cljs.core.async.t11964 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t11964 = (function (change,mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta11965){
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
this.meta11965 = meta11965;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t11964.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_11966,meta11965__$1){
var self__ = this;
var _11966__$1 = this;
return (new cljs.core.async.t11964(self__.change,self__.mix,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta11965__$1));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t11964.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_11966){
var self__ = this;
var _11966__$1 = this;
return self__.meta11965;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t11964.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t11964.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t11964.prototype.cljs$core$async$Mix$ = true;

cljs.core.async.t11964.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t11964.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t11964.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t11964.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.partial.call(null,cljs.core.merge_with,cljs.core.merge),state_map);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t11964.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
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

cljs.core.async.t11964.getBasis = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (){
return new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"change","change",477485025,null),new cljs.core.Symbol(null,"mix","mix",2121373763,null),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"meta11965","meta11965",-609308110,null)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t11964.cljs$lang$type = true;

cljs.core.async.t11964.cljs$lang$ctorStr = "cljs.core.async/t11964";

cljs.core.async.t11964.cljs$lang$ctorPrWriter = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (this__4899__auto__,writer__4900__auto__,opt__4901__auto__){
return cljs.core._write.call(null,writer__4900__auto__,"cljs.core.async/t11964");
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.__GT_t11964 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function cljs$core$async$mix_$___GT_t11964(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta11965){
return (new cljs.core.async.t11964(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta11965));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

}

return (new cljs.core.async.t11964(change,cljs$core$async$mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__6804__auto___12083 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto___12083,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto___12083,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (state_12036){
var state_val_12037 = (state_12036[(1)]);
if((state_val_12037 === (7))){
var inst_11980 = (state_12036[(7)]);
var inst_11985 = cljs.core.apply.call(null,cljs.core.hash_map,inst_11980);
var state_12036__$1 = state_12036;
var statearr_12038_12084 = state_12036__$1;
(statearr_12038_12084[(2)] = inst_11985);

(statearr_12038_12084[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12037 === (20))){
var inst_11995 = (state_12036[(8)]);
var state_12036__$1 = state_12036;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12036__$1,(23),out,inst_11995);
} else {
if((state_val_12037 === (1))){
var inst_11970 = (state_12036[(9)]);
var inst_11970__$1 = calc_state.call(null);
var inst_11971 = cljs.core.seq_QMARK_.call(null,inst_11970__$1);
var state_12036__$1 = (function (){var statearr_12039 = state_12036;
(statearr_12039[(9)] = inst_11970__$1);

return statearr_12039;
})();
if(inst_11971){
var statearr_12040_12085 = state_12036__$1;
(statearr_12040_12085[(1)] = (2));

} else {
var statearr_12041_12086 = state_12036__$1;
(statearr_12041_12086[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12037 === (24))){
var inst_11988 = (state_12036[(10)]);
var inst_11980 = inst_11988;
var state_12036__$1 = (function (){var statearr_12042 = state_12036;
(statearr_12042[(7)] = inst_11980);

return statearr_12042;
})();
var statearr_12043_12087 = state_12036__$1;
(statearr_12043_12087[(2)] = null);

(statearr_12043_12087[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12037 === (4))){
var inst_11970 = (state_12036[(9)]);
var inst_11976 = (state_12036[(2)]);
var inst_11977 = cljs.core.get.call(null,inst_11976,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_11978 = cljs.core.get.call(null,inst_11976,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_11979 = cljs.core.get.call(null,inst_11976,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_11980 = inst_11970;
var state_12036__$1 = (function (){var statearr_12044 = state_12036;
(statearr_12044[(11)] = inst_11979);

(statearr_12044[(12)] = inst_11978);

(statearr_12044[(7)] = inst_11980);

(statearr_12044[(13)] = inst_11977);

return statearr_12044;
})();
var statearr_12045_12088 = state_12036__$1;
(statearr_12045_12088[(2)] = null);

(statearr_12045_12088[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12037 === (15))){
var state_12036__$1 = state_12036;
var statearr_12046_12089 = state_12036__$1;
(statearr_12046_12089[(2)] = null);

(statearr_12046_12089[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12037 === (21))){
var inst_11988 = (state_12036[(10)]);
var inst_11980 = inst_11988;
var state_12036__$1 = (function (){var statearr_12047 = state_12036;
(statearr_12047[(7)] = inst_11980);

return statearr_12047;
})();
var statearr_12048_12090 = state_12036__$1;
(statearr_12048_12090[(2)] = null);

(statearr_12048_12090[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12037 === (13))){
var inst_12032 = (state_12036[(2)]);
var state_12036__$1 = state_12036;
var statearr_12049_12091 = state_12036__$1;
(statearr_12049_12091[(2)] = inst_12032);

(statearr_12049_12091[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12037 === (22))){
var inst_12030 = (state_12036[(2)]);
var state_12036__$1 = state_12036;
var statearr_12050_12092 = state_12036__$1;
(statearr_12050_12092[(2)] = inst_12030);

(statearr_12050_12092[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12037 === (6))){
var inst_12034 = (state_12036[(2)]);
var state_12036__$1 = state_12036;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12036__$1,inst_12034);
} else {
if((state_val_12037 === (25))){
var state_12036__$1 = state_12036;
var statearr_12051_12093 = state_12036__$1;
(statearr_12051_12093[(2)] = null);

(statearr_12051_12093[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12037 === (17))){
var inst_12010 = (state_12036[(14)]);
var state_12036__$1 = state_12036;
var statearr_12052_12094 = state_12036__$1;
(statearr_12052_12094[(2)] = inst_12010);

(statearr_12052_12094[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12037 === (3))){
var inst_11970 = (state_12036[(9)]);
var state_12036__$1 = state_12036;
var statearr_12053_12095 = state_12036__$1;
(statearr_12053_12095[(2)] = inst_11970);

(statearr_12053_12095[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12037 === (12))){
var inst_11989 = (state_12036[(15)]);
var inst_12010 = (state_12036[(14)]);
var inst_11996 = (state_12036[(16)]);
var inst_12010__$1 = inst_11989.call(null,inst_11996);
var state_12036__$1 = (function (){var statearr_12054 = state_12036;
(statearr_12054[(14)] = inst_12010__$1);

return statearr_12054;
})();
if(cljs.core.truth_(inst_12010__$1)){
var statearr_12055_12096 = state_12036__$1;
(statearr_12055_12096[(1)] = (17));

} else {
var statearr_12056_12097 = state_12036__$1;
(statearr_12056_12097[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12037 === (2))){
var inst_11970 = (state_12036[(9)]);
var inst_11973 = cljs.core.apply.call(null,cljs.core.hash_map,inst_11970);
var state_12036__$1 = state_12036;
var statearr_12057_12098 = state_12036__$1;
(statearr_12057_12098[(2)] = inst_11973);

(statearr_12057_12098[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12037 === (23))){
var inst_12021 = (state_12036[(2)]);
var state_12036__$1 = state_12036;
if(cljs.core.truth_(inst_12021)){
var statearr_12058_12099 = state_12036__$1;
(statearr_12058_12099[(1)] = (24));

} else {
var statearr_12059_12100 = state_12036__$1;
(statearr_12059_12100[(1)] = (25));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12037 === (19))){
var inst_12018 = (state_12036[(2)]);
var state_12036__$1 = state_12036;
if(cljs.core.truth_(inst_12018)){
var statearr_12060_12101 = state_12036__$1;
(statearr_12060_12101[(1)] = (20));

} else {
var statearr_12061_12102 = state_12036__$1;
(statearr_12061_12102[(1)] = (21));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12037 === (11))){
var inst_11995 = (state_12036[(8)]);
var inst_12001 = (inst_11995 == null);
var state_12036__$1 = state_12036;
if(cljs.core.truth_(inst_12001)){
var statearr_12062_12103 = state_12036__$1;
(statearr_12062_12103[(1)] = (14));

} else {
var statearr_12063_12104 = state_12036__$1;
(statearr_12063_12104[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12037 === (9))){
var inst_11988 = (state_12036[(10)]);
var inst_11988__$1 = (state_12036[(2)]);
var inst_11989 = cljs.core.get.call(null,inst_11988__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_11990 = cljs.core.get.call(null,inst_11988__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_11991 = cljs.core.get.call(null,inst_11988__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_12036__$1 = (function (){var statearr_12064 = state_12036;
(statearr_12064[(15)] = inst_11989);

(statearr_12064[(17)] = inst_11990);

(statearr_12064[(10)] = inst_11988__$1);

return statearr_12064;
})();
return cljs.core.async.ioc_alts_BANG_.call(null,state_12036__$1,(10),inst_11991);
} else {
if((state_val_12037 === (5))){
var inst_11980 = (state_12036[(7)]);
var inst_11983 = cljs.core.seq_QMARK_.call(null,inst_11980);
var state_12036__$1 = state_12036;
if(inst_11983){
var statearr_12065_12105 = state_12036__$1;
(statearr_12065_12105[(1)] = (7));

} else {
var statearr_12066_12106 = state_12036__$1;
(statearr_12066_12106[(1)] = (8));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12037 === (14))){
var inst_11996 = (state_12036[(16)]);
var inst_12003 = cljs.core.swap_BANG_.call(null,cs,cljs.core.dissoc,inst_11996);
var state_12036__$1 = state_12036;
var statearr_12067_12107 = state_12036__$1;
(statearr_12067_12107[(2)] = inst_12003);

(statearr_12067_12107[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12037 === (26))){
var inst_12026 = (state_12036[(2)]);
var state_12036__$1 = state_12036;
var statearr_12068_12108 = state_12036__$1;
(statearr_12068_12108[(2)] = inst_12026);

(statearr_12068_12108[(1)] = (22));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12037 === (16))){
var inst_12006 = (state_12036[(2)]);
var inst_12007 = calc_state.call(null);
var inst_11980 = inst_12007;
var state_12036__$1 = (function (){var statearr_12069 = state_12036;
(statearr_12069[(18)] = inst_12006);

(statearr_12069[(7)] = inst_11980);

return statearr_12069;
})();
var statearr_12070_12109 = state_12036__$1;
(statearr_12070_12109[(2)] = null);

(statearr_12070_12109[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12037 === (10))){
var inst_11996 = (state_12036[(16)]);
var inst_11995 = (state_12036[(8)]);
var inst_11994 = (state_12036[(2)]);
var inst_11995__$1 = cljs.core.nth.call(null,inst_11994,(0),null);
var inst_11996__$1 = cljs.core.nth.call(null,inst_11994,(1),null);
var inst_11997 = (inst_11995__$1 == null);
var inst_11998 = cljs.core._EQ_.call(null,inst_11996__$1,change);
var inst_11999 = (inst_11997) || (inst_11998);
var state_12036__$1 = (function (){var statearr_12071 = state_12036;
(statearr_12071[(16)] = inst_11996__$1);

(statearr_12071[(8)] = inst_11995__$1);

return statearr_12071;
})();
if(cljs.core.truth_(inst_11999)){
var statearr_12072_12110 = state_12036__$1;
(statearr_12072_12110[(1)] = (11));

} else {
var statearr_12073_12111 = state_12036__$1;
(statearr_12073_12111[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12037 === (18))){
var inst_11989 = (state_12036[(15)]);
var inst_11990 = (state_12036[(17)]);
var inst_11996 = (state_12036[(16)]);
var inst_12013 = cljs.core.empty_QMARK_.call(null,inst_11989);
var inst_12014 = inst_11990.call(null,inst_11996);
var inst_12015 = cljs.core.not.call(null,inst_12014);
var inst_12016 = (inst_12013) && (inst_12015);
var state_12036__$1 = state_12036;
var statearr_12074_12112 = state_12036__$1;
(statearr_12074_12112[(2)] = inst_12016);

(statearr_12074_12112[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12037 === (8))){
var inst_11980 = (state_12036[(7)]);
var state_12036__$1 = state_12036;
var statearr_12075_12113 = state_12036__$1;
(statearr_12075_12113[(2)] = inst_11980);

(statearr_12075_12113[(1)] = (9));


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
});})(c__6804__auto___12083,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
;
return ((function (switch__6742__auto__,c__6804__auto___12083,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function() {
var cljs$core$async$mix_$_state_machine__6743__auto__ = null;
var cljs$core$async$mix_$_state_machine__6743__auto____0 = (function (){
var statearr_12079 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_12079[(0)] = cljs$core$async$mix_$_state_machine__6743__auto__);

(statearr_12079[(1)] = (1));

return statearr_12079;
});
var cljs$core$async$mix_$_state_machine__6743__auto____1 = (function (state_12036){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_12036);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e12080){if((e12080 instanceof Object)){
var ex__6746__auto__ = e12080;
var statearr_12081_12114 = state_12036;
(statearr_12081_12114[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12036);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e12080;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12115 = state_12036;
state_12036 = G__12115;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__6743__auto__ = function(state_12036){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__6743__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__6743__auto____1.call(this,state_12036);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__6743__auto____0;
cljs$core$async$mix_$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__6743__auto____1;
return cljs$core$async$mix_$_state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto___12083,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
})();
var state__6806__auto__ = (function (){var statearr_12082 = f__6805__auto__.call(null);
(statearr_12082[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto___12083);

return statearr_12082;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto___12083,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
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

cljs.core.async.Pub = (function (){var obj12117 = {};
return obj12117;
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
var G__12119 = arguments.length;
switch (G__12119) {
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
var G__12123 = arguments.length;
switch (G__12123) {
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
return (function (p1__12121_SHARP_){
if(cljs.core.truth_(p1__12121_SHARP_.call(null,topic))){
return p1__12121_SHARP_;
} else {
return cljs.core.assoc.call(null,p1__12121_SHARP_,topic,cljs.core.async.mult.call(null,cljs.core.async.chan.call(null,buf_fn.call(null,topic))));
}
});})(or__4320__auto__,mults))
),topic);
}
});})(mults))
;
var p = (function (){
if(typeof cljs.core.async.t12124 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t12124 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta12125){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta12125 = meta12125;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t12124.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (mults,ensure_mult){
return (function (_12126,meta12125__$1){
var self__ = this;
var _12126__$1 = this;
return (new cljs.core.async.t12124(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta12125__$1));
});})(mults,ensure_mult))
;

cljs.core.async.t12124.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (mults,ensure_mult){
return (function (_12126){
var self__ = this;
var _12126__$1 = this;
return self__.meta12125;
});})(mults,ensure_mult))
;

cljs.core.async.t12124.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t12124.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(mults,ensure_mult))
;

cljs.core.async.t12124.prototype.cljs$core$async$Pub$ = true;

cljs.core.async.t12124.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = self__.ensure_mult.call(null,topic);
return cljs.core.async.tap.call(null,m,ch__$1,close_QMARK_);
});})(mults,ensure_mult))
;

cljs.core.async.t12124.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = ((function (mults,ensure_mult){
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

cljs.core.async.t12124.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_.call(null,self__.mults,cljs.core.PersistentArrayMap.EMPTY);
});})(mults,ensure_mult))
;

cljs.core.async.t12124.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = ((function (mults,ensure_mult){
return (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.call(null,self__.mults,cljs.core.dissoc,topic);
});})(mults,ensure_mult))
;

cljs.core.async.t12124.getBasis = ((function (mults,ensure_mult){
return (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta12125","meta12125",-1646339524,null)], null);
});})(mults,ensure_mult))
;

cljs.core.async.t12124.cljs$lang$type = true;

cljs.core.async.t12124.cljs$lang$ctorStr = "cljs.core.async/t12124";

cljs.core.async.t12124.cljs$lang$ctorPrWriter = ((function (mults,ensure_mult){
return (function (this__4899__auto__,writer__4900__auto__,opt__4901__auto__){
return cljs.core._write.call(null,writer__4900__auto__,"cljs.core.async/t12124");
});})(mults,ensure_mult))
;

cljs.core.async.__GT_t12124 = ((function (mults,ensure_mult){
return (function cljs$core$async$__GT_t12124(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta12125){
return (new cljs.core.async.t12124(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta12125));
});})(mults,ensure_mult))
;

}

return (new cljs.core.async.t12124(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__6804__auto___12247 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto___12247,mults,ensure_mult,p){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto___12247,mults,ensure_mult,p){
return (function (state_12198){
var state_val_12199 = (state_12198[(1)]);
if((state_val_12199 === (7))){
var inst_12194 = (state_12198[(2)]);
var state_12198__$1 = state_12198;
var statearr_12200_12248 = state_12198__$1;
(statearr_12200_12248[(2)] = inst_12194);

(statearr_12200_12248[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12199 === (20))){
var state_12198__$1 = state_12198;
var statearr_12201_12249 = state_12198__$1;
(statearr_12201_12249[(2)] = null);

(statearr_12201_12249[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12199 === (1))){
var state_12198__$1 = state_12198;
var statearr_12202_12250 = state_12198__$1;
(statearr_12202_12250[(2)] = null);

(statearr_12202_12250[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12199 === (24))){
var inst_12177 = (state_12198[(7)]);
var inst_12186 = cljs.core.swap_BANG_.call(null,mults,cljs.core.dissoc,inst_12177);
var state_12198__$1 = state_12198;
var statearr_12203_12251 = state_12198__$1;
(statearr_12203_12251[(2)] = inst_12186);

(statearr_12203_12251[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12199 === (4))){
var inst_12129 = (state_12198[(8)]);
var inst_12129__$1 = (state_12198[(2)]);
var inst_12130 = (inst_12129__$1 == null);
var state_12198__$1 = (function (){var statearr_12204 = state_12198;
(statearr_12204[(8)] = inst_12129__$1);

return statearr_12204;
})();
if(cljs.core.truth_(inst_12130)){
var statearr_12205_12252 = state_12198__$1;
(statearr_12205_12252[(1)] = (5));

} else {
var statearr_12206_12253 = state_12198__$1;
(statearr_12206_12253[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12199 === (15))){
var inst_12171 = (state_12198[(2)]);
var state_12198__$1 = state_12198;
var statearr_12207_12254 = state_12198__$1;
(statearr_12207_12254[(2)] = inst_12171);

(statearr_12207_12254[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12199 === (21))){
var inst_12191 = (state_12198[(2)]);
var state_12198__$1 = (function (){var statearr_12208 = state_12198;
(statearr_12208[(9)] = inst_12191);

return statearr_12208;
})();
var statearr_12209_12255 = state_12198__$1;
(statearr_12209_12255[(2)] = null);

(statearr_12209_12255[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12199 === (13))){
var inst_12153 = (state_12198[(10)]);
var inst_12155 = cljs.core.chunked_seq_QMARK_.call(null,inst_12153);
var state_12198__$1 = state_12198;
if(inst_12155){
var statearr_12210_12256 = state_12198__$1;
(statearr_12210_12256[(1)] = (16));

} else {
var statearr_12211_12257 = state_12198__$1;
(statearr_12211_12257[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12199 === (22))){
var inst_12183 = (state_12198[(2)]);
var state_12198__$1 = state_12198;
if(cljs.core.truth_(inst_12183)){
var statearr_12212_12258 = state_12198__$1;
(statearr_12212_12258[(1)] = (23));

} else {
var statearr_12213_12259 = state_12198__$1;
(statearr_12213_12259[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12199 === (6))){
var inst_12179 = (state_12198[(11)]);
var inst_12177 = (state_12198[(7)]);
var inst_12129 = (state_12198[(8)]);
var inst_12177__$1 = topic_fn.call(null,inst_12129);
var inst_12178 = cljs.core.deref.call(null,mults);
var inst_12179__$1 = cljs.core.get.call(null,inst_12178,inst_12177__$1);
var state_12198__$1 = (function (){var statearr_12214 = state_12198;
(statearr_12214[(11)] = inst_12179__$1);

(statearr_12214[(7)] = inst_12177__$1);

return statearr_12214;
})();
if(cljs.core.truth_(inst_12179__$1)){
var statearr_12215_12260 = state_12198__$1;
(statearr_12215_12260[(1)] = (19));

} else {
var statearr_12216_12261 = state_12198__$1;
(statearr_12216_12261[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12199 === (25))){
var inst_12188 = (state_12198[(2)]);
var state_12198__$1 = state_12198;
var statearr_12217_12262 = state_12198__$1;
(statearr_12217_12262[(2)] = inst_12188);

(statearr_12217_12262[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12199 === (17))){
var inst_12153 = (state_12198[(10)]);
var inst_12162 = cljs.core.first.call(null,inst_12153);
var inst_12163 = cljs.core.async.muxch_STAR_.call(null,inst_12162);
var inst_12164 = cljs.core.async.close_BANG_.call(null,inst_12163);
var inst_12165 = cljs.core.next.call(null,inst_12153);
var inst_12139 = inst_12165;
var inst_12140 = null;
var inst_12141 = (0);
var inst_12142 = (0);
var state_12198__$1 = (function (){var statearr_12218 = state_12198;
(statearr_12218[(12)] = inst_12139);

(statearr_12218[(13)] = inst_12142);

(statearr_12218[(14)] = inst_12164);

(statearr_12218[(15)] = inst_12141);

(statearr_12218[(16)] = inst_12140);

return statearr_12218;
})();
var statearr_12219_12263 = state_12198__$1;
(statearr_12219_12263[(2)] = null);

(statearr_12219_12263[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12199 === (3))){
var inst_12196 = (state_12198[(2)]);
var state_12198__$1 = state_12198;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12198__$1,inst_12196);
} else {
if((state_val_12199 === (12))){
var inst_12173 = (state_12198[(2)]);
var state_12198__$1 = state_12198;
var statearr_12220_12264 = state_12198__$1;
(statearr_12220_12264[(2)] = inst_12173);

(statearr_12220_12264[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12199 === (2))){
var state_12198__$1 = state_12198;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12198__$1,(4),ch);
} else {
if((state_val_12199 === (23))){
var state_12198__$1 = state_12198;
var statearr_12221_12265 = state_12198__$1;
(statearr_12221_12265[(2)] = null);

(statearr_12221_12265[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12199 === (19))){
var inst_12179 = (state_12198[(11)]);
var inst_12129 = (state_12198[(8)]);
var inst_12181 = cljs.core.async.muxch_STAR_.call(null,inst_12179);
var state_12198__$1 = state_12198;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12198__$1,(22),inst_12181,inst_12129);
} else {
if((state_val_12199 === (11))){
var inst_12139 = (state_12198[(12)]);
var inst_12153 = (state_12198[(10)]);
var inst_12153__$1 = cljs.core.seq.call(null,inst_12139);
var state_12198__$1 = (function (){var statearr_12222 = state_12198;
(statearr_12222[(10)] = inst_12153__$1);

return statearr_12222;
})();
if(inst_12153__$1){
var statearr_12223_12266 = state_12198__$1;
(statearr_12223_12266[(1)] = (13));

} else {
var statearr_12224_12267 = state_12198__$1;
(statearr_12224_12267[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12199 === (9))){
var inst_12175 = (state_12198[(2)]);
var state_12198__$1 = state_12198;
var statearr_12225_12268 = state_12198__$1;
(statearr_12225_12268[(2)] = inst_12175);

(statearr_12225_12268[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12199 === (5))){
var inst_12136 = cljs.core.deref.call(null,mults);
var inst_12137 = cljs.core.vals.call(null,inst_12136);
var inst_12138 = cljs.core.seq.call(null,inst_12137);
var inst_12139 = inst_12138;
var inst_12140 = null;
var inst_12141 = (0);
var inst_12142 = (0);
var state_12198__$1 = (function (){var statearr_12226 = state_12198;
(statearr_12226[(12)] = inst_12139);

(statearr_12226[(13)] = inst_12142);

(statearr_12226[(15)] = inst_12141);

(statearr_12226[(16)] = inst_12140);

return statearr_12226;
})();
var statearr_12227_12269 = state_12198__$1;
(statearr_12227_12269[(2)] = null);

(statearr_12227_12269[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12199 === (14))){
var state_12198__$1 = state_12198;
var statearr_12231_12270 = state_12198__$1;
(statearr_12231_12270[(2)] = null);

(statearr_12231_12270[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12199 === (16))){
var inst_12153 = (state_12198[(10)]);
var inst_12157 = cljs.core.chunk_first.call(null,inst_12153);
var inst_12158 = cljs.core.chunk_rest.call(null,inst_12153);
var inst_12159 = cljs.core.count.call(null,inst_12157);
var inst_12139 = inst_12158;
var inst_12140 = inst_12157;
var inst_12141 = inst_12159;
var inst_12142 = (0);
var state_12198__$1 = (function (){var statearr_12232 = state_12198;
(statearr_12232[(12)] = inst_12139);

(statearr_12232[(13)] = inst_12142);

(statearr_12232[(15)] = inst_12141);

(statearr_12232[(16)] = inst_12140);

return statearr_12232;
})();
var statearr_12233_12271 = state_12198__$1;
(statearr_12233_12271[(2)] = null);

(statearr_12233_12271[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12199 === (10))){
var inst_12139 = (state_12198[(12)]);
var inst_12142 = (state_12198[(13)]);
var inst_12141 = (state_12198[(15)]);
var inst_12140 = (state_12198[(16)]);
var inst_12147 = cljs.core._nth.call(null,inst_12140,inst_12142);
var inst_12148 = cljs.core.async.muxch_STAR_.call(null,inst_12147);
var inst_12149 = cljs.core.async.close_BANG_.call(null,inst_12148);
var inst_12150 = (inst_12142 + (1));
var tmp12228 = inst_12139;
var tmp12229 = inst_12141;
var tmp12230 = inst_12140;
var inst_12139__$1 = tmp12228;
var inst_12140__$1 = tmp12230;
var inst_12141__$1 = tmp12229;
var inst_12142__$1 = inst_12150;
var state_12198__$1 = (function (){var statearr_12234 = state_12198;
(statearr_12234[(12)] = inst_12139__$1);

(statearr_12234[(13)] = inst_12142__$1);

(statearr_12234[(15)] = inst_12141__$1);

(statearr_12234[(17)] = inst_12149);

(statearr_12234[(16)] = inst_12140__$1);

return statearr_12234;
})();
var statearr_12235_12272 = state_12198__$1;
(statearr_12235_12272[(2)] = null);

(statearr_12235_12272[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12199 === (18))){
var inst_12168 = (state_12198[(2)]);
var state_12198__$1 = state_12198;
var statearr_12236_12273 = state_12198__$1;
(statearr_12236_12273[(2)] = inst_12168);

(statearr_12236_12273[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12199 === (8))){
var inst_12142 = (state_12198[(13)]);
var inst_12141 = (state_12198[(15)]);
var inst_12144 = (inst_12142 < inst_12141);
var inst_12145 = inst_12144;
var state_12198__$1 = state_12198;
if(cljs.core.truth_(inst_12145)){
var statearr_12237_12274 = state_12198__$1;
(statearr_12237_12274[(1)] = (10));

} else {
var statearr_12238_12275 = state_12198__$1;
(statearr_12238_12275[(1)] = (11));

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
});})(c__6804__auto___12247,mults,ensure_mult,p))
;
return ((function (switch__6742__auto__,c__6804__auto___12247,mults,ensure_mult,p){
return (function() {
var cljs$core$async$state_machine__6743__auto__ = null;
var cljs$core$async$state_machine__6743__auto____0 = (function (){
var statearr_12242 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_12242[(0)] = cljs$core$async$state_machine__6743__auto__);

(statearr_12242[(1)] = (1));

return statearr_12242;
});
var cljs$core$async$state_machine__6743__auto____1 = (function (state_12198){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_12198);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e12243){if((e12243 instanceof Object)){
var ex__6746__auto__ = e12243;
var statearr_12244_12276 = state_12198;
(statearr_12244_12276[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12198);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e12243;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12277 = state_12198;
state_12198 = G__12277;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs$core$async$state_machine__6743__auto__ = function(state_12198){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__6743__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__6743__auto____1.call(this,state_12198);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__6743__auto____0;
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__6743__auto____1;
return cljs$core$async$state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto___12247,mults,ensure_mult,p))
})();
var state__6806__auto__ = (function (){var statearr_12245 = f__6805__auto__.call(null);
(statearr_12245[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto___12247);

return statearr_12245;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto___12247,mults,ensure_mult,p))
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
var G__12279 = arguments.length;
switch (G__12279) {
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
var G__12282 = arguments.length;
switch (G__12282) {
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
var G__12285 = arguments.length;
switch (G__12285) {
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
var c__6804__auto___12355 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto___12355,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto___12355,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (state_12324){
var state_val_12325 = (state_12324[(1)]);
if((state_val_12325 === (7))){
var state_12324__$1 = state_12324;
var statearr_12326_12356 = state_12324__$1;
(statearr_12326_12356[(2)] = null);

(statearr_12326_12356[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12325 === (1))){
var state_12324__$1 = state_12324;
var statearr_12327_12357 = state_12324__$1;
(statearr_12327_12357[(2)] = null);

(statearr_12327_12357[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12325 === (4))){
var inst_12288 = (state_12324[(7)]);
var inst_12290 = (inst_12288 < cnt);
var state_12324__$1 = state_12324;
if(cljs.core.truth_(inst_12290)){
var statearr_12328_12358 = state_12324__$1;
(statearr_12328_12358[(1)] = (6));

} else {
var statearr_12329_12359 = state_12324__$1;
(statearr_12329_12359[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12325 === (15))){
var inst_12320 = (state_12324[(2)]);
var state_12324__$1 = state_12324;
var statearr_12330_12360 = state_12324__$1;
(statearr_12330_12360[(2)] = inst_12320);

(statearr_12330_12360[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12325 === (13))){
var inst_12313 = cljs.core.async.close_BANG_.call(null,out);
var state_12324__$1 = state_12324;
var statearr_12331_12361 = state_12324__$1;
(statearr_12331_12361[(2)] = inst_12313);

(statearr_12331_12361[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12325 === (6))){
var state_12324__$1 = state_12324;
var statearr_12332_12362 = state_12324__$1;
(statearr_12332_12362[(2)] = null);

(statearr_12332_12362[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12325 === (3))){
var inst_12322 = (state_12324[(2)]);
var state_12324__$1 = state_12324;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12324__$1,inst_12322);
} else {
if((state_val_12325 === (12))){
var inst_12310 = (state_12324[(8)]);
var inst_12310__$1 = (state_12324[(2)]);
var inst_12311 = cljs.core.some.call(null,cljs.core.nil_QMARK_,inst_12310__$1);
var state_12324__$1 = (function (){var statearr_12333 = state_12324;
(statearr_12333[(8)] = inst_12310__$1);

return statearr_12333;
})();
if(cljs.core.truth_(inst_12311)){
var statearr_12334_12363 = state_12324__$1;
(statearr_12334_12363[(1)] = (13));

} else {
var statearr_12335_12364 = state_12324__$1;
(statearr_12335_12364[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12325 === (2))){
var inst_12287 = cljs.core.reset_BANG_.call(null,dctr,cnt);
var inst_12288 = (0);
var state_12324__$1 = (function (){var statearr_12336 = state_12324;
(statearr_12336[(7)] = inst_12288);

(statearr_12336[(9)] = inst_12287);

return statearr_12336;
})();
var statearr_12337_12365 = state_12324__$1;
(statearr_12337_12365[(2)] = null);

(statearr_12337_12365[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12325 === (11))){
var inst_12288 = (state_12324[(7)]);
var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_12324,(10),Object,null,(9));
var inst_12297 = chs__$1.call(null,inst_12288);
var inst_12298 = done.call(null,inst_12288);
var inst_12299 = cljs.core.async.take_BANG_.call(null,inst_12297,inst_12298);
var state_12324__$1 = state_12324;
var statearr_12338_12366 = state_12324__$1;
(statearr_12338_12366[(2)] = inst_12299);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12324__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12325 === (9))){
var inst_12288 = (state_12324[(7)]);
var inst_12301 = (state_12324[(2)]);
var inst_12302 = (inst_12288 + (1));
var inst_12288__$1 = inst_12302;
var state_12324__$1 = (function (){var statearr_12339 = state_12324;
(statearr_12339[(7)] = inst_12288__$1);

(statearr_12339[(10)] = inst_12301);

return statearr_12339;
})();
var statearr_12340_12367 = state_12324__$1;
(statearr_12340_12367[(2)] = null);

(statearr_12340_12367[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12325 === (5))){
var inst_12308 = (state_12324[(2)]);
var state_12324__$1 = (function (){var statearr_12341 = state_12324;
(statearr_12341[(11)] = inst_12308);

return statearr_12341;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12324__$1,(12),dchan);
} else {
if((state_val_12325 === (14))){
var inst_12310 = (state_12324[(8)]);
var inst_12315 = cljs.core.apply.call(null,f,inst_12310);
var state_12324__$1 = state_12324;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12324__$1,(16),out,inst_12315);
} else {
if((state_val_12325 === (16))){
var inst_12317 = (state_12324[(2)]);
var state_12324__$1 = (function (){var statearr_12342 = state_12324;
(statearr_12342[(12)] = inst_12317);

return statearr_12342;
})();
var statearr_12343_12368 = state_12324__$1;
(statearr_12343_12368[(2)] = null);

(statearr_12343_12368[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12325 === (10))){
var inst_12292 = (state_12324[(2)]);
var inst_12293 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);
var state_12324__$1 = (function (){var statearr_12344 = state_12324;
(statearr_12344[(13)] = inst_12292);

return statearr_12344;
})();
var statearr_12345_12369 = state_12324__$1;
(statearr_12345_12369[(2)] = inst_12293);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12324__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12325 === (8))){
var inst_12306 = (state_12324[(2)]);
var state_12324__$1 = state_12324;
var statearr_12346_12370 = state_12324__$1;
(statearr_12346_12370[(2)] = inst_12306);

(statearr_12346_12370[(1)] = (5));


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
});})(c__6804__auto___12355,chs__$1,out,cnt,rets,dchan,dctr,done))
;
return ((function (switch__6742__auto__,c__6804__auto___12355,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function() {
var cljs$core$async$state_machine__6743__auto__ = null;
var cljs$core$async$state_machine__6743__auto____0 = (function (){
var statearr_12350 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_12350[(0)] = cljs$core$async$state_machine__6743__auto__);

(statearr_12350[(1)] = (1));

return statearr_12350;
});
var cljs$core$async$state_machine__6743__auto____1 = (function (state_12324){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_12324);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e12351){if((e12351 instanceof Object)){
var ex__6746__auto__ = e12351;
var statearr_12352_12371 = state_12324;
(statearr_12352_12371[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12324);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e12351;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12372 = state_12324;
state_12324 = G__12372;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs$core$async$state_machine__6743__auto__ = function(state_12324){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__6743__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__6743__auto____1.call(this,state_12324);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__6743__auto____0;
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__6743__auto____1;
return cljs$core$async$state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto___12355,chs__$1,out,cnt,rets,dchan,dctr,done))
})();
var state__6806__auto__ = (function (){var statearr_12353 = f__6805__auto__.call(null);
(statearr_12353[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto___12355);

return statearr_12353;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto___12355,chs__$1,out,cnt,rets,dchan,dctr,done))
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
var G__12375 = arguments.length;
switch (G__12375) {
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
var c__6804__auto___12430 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto___12430,out){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto___12430,out){
return (function (state_12405){
var state_val_12406 = (state_12405[(1)]);
if((state_val_12406 === (7))){
var inst_12385 = (state_12405[(7)]);
var inst_12384 = (state_12405[(8)]);
var inst_12384__$1 = (state_12405[(2)]);
var inst_12385__$1 = cljs.core.nth.call(null,inst_12384__$1,(0),null);
var inst_12386 = cljs.core.nth.call(null,inst_12384__$1,(1),null);
var inst_12387 = (inst_12385__$1 == null);
var state_12405__$1 = (function (){var statearr_12407 = state_12405;
(statearr_12407[(9)] = inst_12386);

(statearr_12407[(7)] = inst_12385__$1);

(statearr_12407[(8)] = inst_12384__$1);

return statearr_12407;
})();
if(cljs.core.truth_(inst_12387)){
var statearr_12408_12431 = state_12405__$1;
(statearr_12408_12431[(1)] = (8));

} else {
var statearr_12409_12432 = state_12405__$1;
(statearr_12409_12432[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12406 === (1))){
var inst_12376 = cljs.core.vec.call(null,chs);
var inst_12377 = inst_12376;
var state_12405__$1 = (function (){var statearr_12410 = state_12405;
(statearr_12410[(10)] = inst_12377);

return statearr_12410;
})();
var statearr_12411_12433 = state_12405__$1;
(statearr_12411_12433[(2)] = null);

(statearr_12411_12433[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12406 === (4))){
var inst_12377 = (state_12405[(10)]);
var state_12405__$1 = state_12405;
return cljs.core.async.ioc_alts_BANG_.call(null,state_12405__$1,(7),inst_12377);
} else {
if((state_val_12406 === (6))){
var inst_12401 = (state_12405[(2)]);
var state_12405__$1 = state_12405;
var statearr_12412_12434 = state_12405__$1;
(statearr_12412_12434[(2)] = inst_12401);

(statearr_12412_12434[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12406 === (3))){
var inst_12403 = (state_12405[(2)]);
var state_12405__$1 = state_12405;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12405__$1,inst_12403);
} else {
if((state_val_12406 === (2))){
var inst_12377 = (state_12405[(10)]);
var inst_12379 = cljs.core.count.call(null,inst_12377);
var inst_12380 = (inst_12379 > (0));
var state_12405__$1 = state_12405;
if(cljs.core.truth_(inst_12380)){
var statearr_12414_12435 = state_12405__$1;
(statearr_12414_12435[(1)] = (4));

} else {
var statearr_12415_12436 = state_12405__$1;
(statearr_12415_12436[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12406 === (11))){
var inst_12377 = (state_12405[(10)]);
var inst_12394 = (state_12405[(2)]);
var tmp12413 = inst_12377;
var inst_12377__$1 = tmp12413;
var state_12405__$1 = (function (){var statearr_12416 = state_12405;
(statearr_12416[(10)] = inst_12377__$1);

(statearr_12416[(11)] = inst_12394);

return statearr_12416;
})();
var statearr_12417_12437 = state_12405__$1;
(statearr_12417_12437[(2)] = null);

(statearr_12417_12437[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12406 === (9))){
var inst_12385 = (state_12405[(7)]);
var state_12405__$1 = state_12405;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12405__$1,(11),out,inst_12385);
} else {
if((state_val_12406 === (5))){
var inst_12399 = cljs.core.async.close_BANG_.call(null,out);
var state_12405__$1 = state_12405;
var statearr_12418_12438 = state_12405__$1;
(statearr_12418_12438[(2)] = inst_12399);

(statearr_12418_12438[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12406 === (10))){
var inst_12397 = (state_12405[(2)]);
var state_12405__$1 = state_12405;
var statearr_12419_12439 = state_12405__$1;
(statearr_12419_12439[(2)] = inst_12397);

(statearr_12419_12439[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12406 === (8))){
var inst_12386 = (state_12405[(9)]);
var inst_12385 = (state_12405[(7)]);
var inst_12377 = (state_12405[(10)]);
var inst_12384 = (state_12405[(8)]);
var inst_12389 = (function (){var cs = inst_12377;
var vec__12382 = inst_12384;
var v = inst_12385;
var c = inst_12386;
return ((function (cs,vec__12382,v,c,inst_12386,inst_12385,inst_12377,inst_12384,state_val_12406,c__6804__auto___12430,out){
return (function (p1__12373_SHARP_){
return cljs.core.not_EQ_.call(null,c,p1__12373_SHARP_);
});
;})(cs,vec__12382,v,c,inst_12386,inst_12385,inst_12377,inst_12384,state_val_12406,c__6804__auto___12430,out))
})();
var inst_12390 = cljs.core.filterv.call(null,inst_12389,inst_12377);
var inst_12377__$1 = inst_12390;
var state_12405__$1 = (function (){var statearr_12420 = state_12405;
(statearr_12420[(10)] = inst_12377__$1);

return statearr_12420;
})();
var statearr_12421_12440 = state_12405__$1;
(statearr_12421_12440[(2)] = null);

(statearr_12421_12440[(1)] = (2));


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
});})(c__6804__auto___12430,out))
;
return ((function (switch__6742__auto__,c__6804__auto___12430,out){
return (function() {
var cljs$core$async$state_machine__6743__auto__ = null;
var cljs$core$async$state_machine__6743__auto____0 = (function (){
var statearr_12425 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_12425[(0)] = cljs$core$async$state_machine__6743__auto__);

(statearr_12425[(1)] = (1));

return statearr_12425;
});
var cljs$core$async$state_machine__6743__auto____1 = (function (state_12405){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_12405);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e12426){if((e12426 instanceof Object)){
var ex__6746__auto__ = e12426;
var statearr_12427_12441 = state_12405;
(statearr_12427_12441[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12405);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e12426;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12442 = state_12405;
state_12405 = G__12442;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs$core$async$state_machine__6743__auto__ = function(state_12405){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__6743__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__6743__auto____1.call(this,state_12405);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__6743__auto____0;
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__6743__auto____1;
return cljs$core$async$state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto___12430,out))
})();
var state__6806__auto__ = (function (){var statearr_12428 = f__6805__auto__.call(null);
(statearr_12428[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto___12430);

return statearr_12428;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto___12430,out))
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
var G__12444 = arguments.length;
switch (G__12444) {
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
var c__6804__auto___12492 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto___12492,out){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto___12492,out){
return (function (state_12468){
var state_val_12469 = (state_12468[(1)]);
if((state_val_12469 === (7))){
var inst_12450 = (state_12468[(7)]);
var inst_12450__$1 = (state_12468[(2)]);
var inst_12451 = (inst_12450__$1 == null);
var inst_12452 = cljs.core.not.call(null,inst_12451);
var state_12468__$1 = (function (){var statearr_12470 = state_12468;
(statearr_12470[(7)] = inst_12450__$1);

return statearr_12470;
})();
if(inst_12452){
var statearr_12471_12493 = state_12468__$1;
(statearr_12471_12493[(1)] = (8));

} else {
var statearr_12472_12494 = state_12468__$1;
(statearr_12472_12494[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12469 === (1))){
var inst_12445 = (0);
var state_12468__$1 = (function (){var statearr_12473 = state_12468;
(statearr_12473[(8)] = inst_12445);

return statearr_12473;
})();
var statearr_12474_12495 = state_12468__$1;
(statearr_12474_12495[(2)] = null);

(statearr_12474_12495[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12469 === (4))){
var state_12468__$1 = state_12468;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12468__$1,(7),ch);
} else {
if((state_val_12469 === (6))){
var inst_12463 = (state_12468[(2)]);
var state_12468__$1 = state_12468;
var statearr_12475_12496 = state_12468__$1;
(statearr_12475_12496[(2)] = inst_12463);

(statearr_12475_12496[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12469 === (3))){
var inst_12465 = (state_12468[(2)]);
var inst_12466 = cljs.core.async.close_BANG_.call(null,out);
var state_12468__$1 = (function (){var statearr_12476 = state_12468;
(statearr_12476[(9)] = inst_12465);

return statearr_12476;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12468__$1,inst_12466);
} else {
if((state_val_12469 === (2))){
var inst_12445 = (state_12468[(8)]);
var inst_12447 = (inst_12445 < n);
var state_12468__$1 = state_12468;
if(cljs.core.truth_(inst_12447)){
var statearr_12477_12497 = state_12468__$1;
(statearr_12477_12497[(1)] = (4));

} else {
var statearr_12478_12498 = state_12468__$1;
(statearr_12478_12498[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12469 === (11))){
var inst_12445 = (state_12468[(8)]);
var inst_12455 = (state_12468[(2)]);
var inst_12456 = (inst_12445 + (1));
var inst_12445__$1 = inst_12456;
var state_12468__$1 = (function (){var statearr_12479 = state_12468;
(statearr_12479[(10)] = inst_12455);

(statearr_12479[(8)] = inst_12445__$1);

return statearr_12479;
})();
var statearr_12480_12499 = state_12468__$1;
(statearr_12480_12499[(2)] = null);

(statearr_12480_12499[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12469 === (9))){
var state_12468__$1 = state_12468;
var statearr_12481_12500 = state_12468__$1;
(statearr_12481_12500[(2)] = null);

(statearr_12481_12500[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12469 === (5))){
var state_12468__$1 = state_12468;
var statearr_12482_12501 = state_12468__$1;
(statearr_12482_12501[(2)] = null);

(statearr_12482_12501[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12469 === (10))){
var inst_12460 = (state_12468[(2)]);
var state_12468__$1 = state_12468;
var statearr_12483_12502 = state_12468__$1;
(statearr_12483_12502[(2)] = inst_12460);

(statearr_12483_12502[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12469 === (8))){
var inst_12450 = (state_12468[(7)]);
var state_12468__$1 = state_12468;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12468__$1,(11),out,inst_12450);
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
});})(c__6804__auto___12492,out))
;
return ((function (switch__6742__auto__,c__6804__auto___12492,out){
return (function() {
var cljs$core$async$state_machine__6743__auto__ = null;
var cljs$core$async$state_machine__6743__auto____0 = (function (){
var statearr_12487 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_12487[(0)] = cljs$core$async$state_machine__6743__auto__);

(statearr_12487[(1)] = (1));

return statearr_12487;
});
var cljs$core$async$state_machine__6743__auto____1 = (function (state_12468){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_12468);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e12488){if((e12488 instanceof Object)){
var ex__6746__auto__ = e12488;
var statearr_12489_12503 = state_12468;
(statearr_12489_12503[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12468);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e12488;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12504 = state_12468;
state_12468 = G__12504;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs$core$async$state_machine__6743__auto__ = function(state_12468){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__6743__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__6743__auto____1.call(this,state_12468);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__6743__auto____0;
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__6743__auto____1;
return cljs$core$async$state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto___12492,out))
})();
var state__6806__auto__ = (function (){var statearr_12490 = f__6805__auto__.call(null);
(statearr_12490[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto___12492);

return statearr_12490;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto___12492,out))
);


return out;
});

cljs.core.async.take.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
if(typeof cljs.core.async.t12512 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t12512 = (function (map_LT_,f,ch,meta12513){
this.map_LT_ = map_LT_;
this.f = f;
this.ch = ch;
this.meta12513 = meta12513;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t12512.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_12514,meta12513__$1){
var self__ = this;
var _12514__$1 = this;
return (new cljs.core.async.t12512(self__.map_LT_,self__.f,self__.ch,meta12513__$1));
});

cljs.core.async.t12512.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_12514){
var self__ = this;
var _12514__$1 = this;
return self__.meta12513;
});

cljs.core.async.t12512.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t12512.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t12512.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t12512.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t12512.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,(function (){
if(typeof cljs.core.async.t12515 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t12515 = (function (map_LT_,f,ch,meta12513,_,fn1,meta12516){
this.map_LT_ = map_LT_;
this.f = f;
this.ch = ch;
this.meta12513 = meta12513;
this._ = _;
this.fn1 = fn1;
this.meta12516 = meta12516;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t12515.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (___$1){
return (function (_12517,meta12516__$1){
var self__ = this;
var _12517__$1 = this;
return (new cljs.core.async.t12515(self__.map_LT_,self__.f,self__.ch,self__.meta12513,self__._,self__.fn1,meta12516__$1));
});})(___$1))
;

cljs.core.async.t12515.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (___$1){
return (function (_12517){
var self__ = this;
var _12517__$1 = this;
return self__.meta12516;
});})(___$1))
;

cljs.core.async.t12515.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t12515.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.fn1);
});})(___$1))
;

cljs.core.async.t12515.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit.call(null,self__.fn1);
return ((function (f1,___$2,___$1){
return (function (p1__12505_SHARP_){
return f1.call(null,(((p1__12505_SHARP_ == null))?null:self__.f.call(null,p1__12505_SHARP_)));
});
;})(f1,___$2,___$1))
});})(___$1))
;

cljs.core.async.t12515.getBasis = ((function (___$1){
return (function (){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"map<","map<",-1235808357,null),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta12513","meta12513",1227975759,null),new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta12516","meta12516",1256931743,null)], null);
});})(___$1))
;

cljs.core.async.t12515.cljs$lang$type = true;

cljs.core.async.t12515.cljs$lang$ctorStr = "cljs.core.async/t12515";

cljs.core.async.t12515.cljs$lang$ctorPrWriter = ((function (___$1){
return (function (this__4899__auto__,writer__4900__auto__,opt__4901__auto__){
return cljs.core._write.call(null,writer__4900__auto__,"cljs.core.async/t12515");
});})(___$1))
;

cljs.core.async.__GT_t12515 = ((function (___$1){
return (function cljs$core$async$map_LT__$___GT_t12515(map_LT___$1,f__$1,ch__$1,meta12513__$1,___$2,fn1__$1,meta12516){
return (new cljs.core.async.t12515(map_LT___$1,f__$1,ch__$1,meta12513__$1,___$2,fn1__$1,meta12516));
});})(___$1))
;

}

return (new cljs.core.async.t12515(self__.map_LT_,self__.f,self__.ch,self__.meta12513,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY));
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

cljs.core.async.t12512.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t12512.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
});

cljs.core.async.t12512.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"map<","map<",-1235808357,null),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta12513","meta12513",1227975759,null)], null);
});

cljs.core.async.t12512.cljs$lang$type = true;

cljs.core.async.t12512.cljs$lang$ctorStr = "cljs.core.async/t12512";

cljs.core.async.t12512.cljs$lang$ctorPrWriter = (function (this__4899__auto__,writer__4900__auto__,opt__4901__auto__){
return cljs.core._write.call(null,writer__4900__auto__,"cljs.core.async/t12512");
});

cljs.core.async.__GT_t12512 = (function cljs$core$async$map_LT__$___GT_t12512(map_LT___$1,f__$1,ch__$1,meta12513){
return (new cljs.core.async.t12512(map_LT___$1,f__$1,ch__$1,meta12513));
});

}

return (new cljs.core.async.t12512(cljs$core$async$map_LT_,f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
if(typeof cljs.core.async.t12521 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t12521 = (function (map_GT_,f,ch,meta12522){
this.map_GT_ = map_GT_;
this.f = f;
this.ch = ch;
this.meta12522 = meta12522;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t12521.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_12523,meta12522__$1){
var self__ = this;
var _12523__$1 = this;
return (new cljs.core.async.t12521(self__.map_GT_,self__.f,self__.ch,meta12522__$1));
});

cljs.core.async.t12521.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_12523){
var self__ = this;
var _12523__$1 = this;
return self__.meta12522;
});

cljs.core.async.t12521.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t12521.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t12521.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t12521.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t12521.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t12521.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,self__.f.call(null,val),fn1);
});

cljs.core.async.t12521.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"map>","map>",1676369295,null),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta12522","meta12522",-1374606833,null)], null);
});

cljs.core.async.t12521.cljs$lang$type = true;

cljs.core.async.t12521.cljs$lang$ctorStr = "cljs.core.async/t12521";

cljs.core.async.t12521.cljs$lang$ctorPrWriter = (function (this__4899__auto__,writer__4900__auto__,opt__4901__auto__){
return cljs.core._write.call(null,writer__4900__auto__,"cljs.core.async/t12521");
});

cljs.core.async.__GT_t12521 = (function cljs$core$async$map_GT__$___GT_t12521(map_GT___$1,f__$1,ch__$1,meta12522){
return (new cljs.core.async.t12521(map_GT___$1,f__$1,ch__$1,meta12522));
});

}

return (new cljs.core.async.t12521(cljs$core$async$map_GT_,f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
if(typeof cljs.core.async.t12527 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t12527 = (function (filter_GT_,p,ch,meta12528){
this.filter_GT_ = filter_GT_;
this.p = p;
this.ch = ch;
this.meta12528 = meta12528;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t12527.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_12529,meta12528__$1){
var self__ = this;
var _12529__$1 = this;
return (new cljs.core.async.t12527(self__.filter_GT_,self__.p,self__.ch,meta12528__$1));
});

cljs.core.async.t12527.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_12529){
var self__ = this;
var _12529__$1 = this;
return self__.meta12528;
});

cljs.core.async.t12527.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t12527.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t12527.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t12527.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t12527.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t12527.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t12527.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.p.call(null,val))){
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box.call(null,cljs.core.not.call(null,cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch)));
}
});

cljs.core.async.t12527.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"filter>","filter>",-37644455,null),new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta12528","meta12528",-1104786278,null)], null);
});

cljs.core.async.t12527.cljs$lang$type = true;

cljs.core.async.t12527.cljs$lang$ctorStr = "cljs.core.async/t12527";

cljs.core.async.t12527.cljs$lang$ctorPrWriter = (function (this__4899__auto__,writer__4900__auto__,opt__4901__auto__){
return cljs.core._write.call(null,writer__4900__auto__,"cljs.core.async/t12527");
});

cljs.core.async.__GT_t12527 = (function cljs$core$async$filter_GT__$___GT_t12527(filter_GT___$1,p__$1,ch__$1,meta12528){
return (new cljs.core.async.t12527(filter_GT___$1,p__$1,ch__$1,meta12528));
});

}

return (new cljs.core.async.t12527(cljs$core$async$filter_GT_,p,ch,cljs.core.PersistentArrayMap.EMPTY));
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
var G__12531 = arguments.length;
switch (G__12531) {
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
var c__6804__auto___12574 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto___12574,out){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto___12574,out){
return (function (state_12552){
var state_val_12553 = (state_12552[(1)]);
if((state_val_12553 === (7))){
var inst_12548 = (state_12552[(2)]);
var state_12552__$1 = state_12552;
var statearr_12554_12575 = state_12552__$1;
(statearr_12554_12575[(2)] = inst_12548);

(statearr_12554_12575[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12553 === (1))){
var state_12552__$1 = state_12552;
var statearr_12555_12576 = state_12552__$1;
(statearr_12555_12576[(2)] = null);

(statearr_12555_12576[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12553 === (4))){
var inst_12534 = (state_12552[(7)]);
var inst_12534__$1 = (state_12552[(2)]);
var inst_12535 = (inst_12534__$1 == null);
var state_12552__$1 = (function (){var statearr_12556 = state_12552;
(statearr_12556[(7)] = inst_12534__$1);

return statearr_12556;
})();
if(cljs.core.truth_(inst_12535)){
var statearr_12557_12577 = state_12552__$1;
(statearr_12557_12577[(1)] = (5));

} else {
var statearr_12558_12578 = state_12552__$1;
(statearr_12558_12578[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12553 === (6))){
var inst_12534 = (state_12552[(7)]);
var inst_12539 = p.call(null,inst_12534);
var state_12552__$1 = state_12552;
if(cljs.core.truth_(inst_12539)){
var statearr_12559_12579 = state_12552__$1;
(statearr_12559_12579[(1)] = (8));

} else {
var statearr_12560_12580 = state_12552__$1;
(statearr_12560_12580[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12553 === (3))){
var inst_12550 = (state_12552[(2)]);
var state_12552__$1 = state_12552;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12552__$1,inst_12550);
} else {
if((state_val_12553 === (2))){
var state_12552__$1 = state_12552;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12552__$1,(4),ch);
} else {
if((state_val_12553 === (11))){
var inst_12542 = (state_12552[(2)]);
var state_12552__$1 = state_12552;
var statearr_12561_12581 = state_12552__$1;
(statearr_12561_12581[(2)] = inst_12542);

(statearr_12561_12581[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12553 === (9))){
var state_12552__$1 = state_12552;
var statearr_12562_12582 = state_12552__$1;
(statearr_12562_12582[(2)] = null);

(statearr_12562_12582[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12553 === (5))){
var inst_12537 = cljs.core.async.close_BANG_.call(null,out);
var state_12552__$1 = state_12552;
var statearr_12563_12583 = state_12552__$1;
(statearr_12563_12583[(2)] = inst_12537);

(statearr_12563_12583[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12553 === (10))){
var inst_12545 = (state_12552[(2)]);
var state_12552__$1 = (function (){var statearr_12564 = state_12552;
(statearr_12564[(8)] = inst_12545);

return statearr_12564;
})();
var statearr_12565_12584 = state_12552__$1;
(statearr_12565_12584[(2)] = null);

(statearr_12565_12584[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12553 === (8))){
var inst_12534 = (state_12552[(7)]);
var state_12552__$1 = state_12552;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12552__$1,(11),out,inst_12534);
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
});})(c__6804__auto___12574,out))
;
return ((function (switch__6742__auto__,c__6804__auto___12574,out){
return (function() {
var cljs$core$async$state_machine__6743__auto__ = null;
var cljs$core$async$state_machine__6743__auto____0 = (function (){
var statearr_12569 = [null,null,null,null,null,null,null,null,null];
(statearr_12569[(0)] = cljs$core$async$state_machine__6743__auto__);

(statearr_12569[(1)] = (1));

return statearr_12569;
});
var cljs$core$async$state_machine__6743__auto____1 = (function (state_12552){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_12552);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e12570){if((e12570 instanceof Object)){
var ex__6746__auto__ = e12570;
var statearr_12571_12585 = state_12552;
(statearr_12571_12585[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12552);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e12570;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12586 = state_12552;
state_12552 = G__12586;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs$core$async$state_machine__6743__auto__ = function(state_12552){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__6743__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__6743__auto____1.call(this,state_12552);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__6743__auto____0;
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__6743__auto____1;
return cljs$core$async$state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto___12574,out))
})();
var state__6806__auto__ = (function (){var statearr_12572 = f__6805__auto__.call(null);
(statearr_12572[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto___12574);

return statearr_12572;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto___12574,out))
);


return out;
});

cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(){
var G__12588 = arguments.length;
switch (G__12588) {
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
return (function (state_12755){
var state_val_12756 = (state_12755[(1)]);
if((state_val_12756 === (7))){
var inst_12751 = (state_12755[(2)]);
var state_12755__$1 = state_12755;
var statearr_12757_12798 = state_12755__$1;
(statearr_12757_12798[(2)] = inst_12751);

(statearr_12757_12798[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12756 === (20))){
var inst_12721 = (state_12755[(7)]);
var inst_12732 = (state_12755[(2)]);
var inst_12733 = cljs.core.next.call(null,inst_12721);
var inst_12707 = inst_12733;
var inst_12708 = null;
var inst_12709 = (0);
var inst_12710 = (0);
var state_12755__$1 = (function (){var statearr_12758 = state_12755;
(statearr_12758[(8)] = inst_12709);

(statearr_12758[(9)] = inst_12732);

(statearr_12758[(10)] = inst_12707);

(statearr_12758[(11)] = inst_12710);

(statearr_12758[(12)] = inst_12708);

return statearr_12758;
})();
var statearr_12759_12799 = state_12755__$1;
(statearr_12759_12799[(2)] = null);

(statearr_12759_12799[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12756 === (1))){
var state_12755__$1 = state_12755;
var statearr_12760_12800 = state_12755__$1;
(statearr_12760_12800[(2)] = null);

(statearr_12760_12800[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12756 === (4))){
var inst_12696 = (state_12755[(13)]);
var inst_12696__$1 = (state_12755[(2)]);
var inst_12697 = (inst_12696__$1 == null);
var state_12755__$1 = (function (){var statearr_12761 = state_12755;
(statearr_12761[(13)] = inst_12696__$1);

return statearr_12761;
})();
if(cljs.core.truth_(inst_12697)){
var statearr_12762_12801 = state_12755__$1;
(statearr_12762_12801[(1)] = (5));

} else {
var statearr_12763_12802 = state_12755__$1;
(statearr_12763_12802[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12756 === (15))){
var state_12755__$1 = state_12755;
var statearr_12767_12803 = state_12755__$1;
(statearr_12767_12803[(2)] = null);

(statearr_12767_12803[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12756 === (21))){
var state_12755__$1 = state_12755;
var statearr_12768_12804 = state_12755__$1;
(statearr_12768_12804[(2)] = null);

(statearr_12768_12804[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12756 === (13))){
var inst_12709 = (state_12755[(8)]);
var inst_12707 = (state_12755[(10)]);
var inst_12710 = (state_12755[(11)]);
var inst_12708 = (state_12755[(12)]);
var inst_12717 = (state_12755[(2)]);
var inst_12718 = (inst_12710 + (1));
var tmp12764 = inst_12709;
var tmp12765 = inst_12707;
var tmp12766 = inst_12708;
var inst_12707__$1 = tmp12765;
var inst_12708__$1 = tmp12766;
var inst_12709__$1 = tmp12764;
var inst_12710__$1 = inst_12718;
var state_12755__$1 = (function (){var statearr_12769 = state_12755;
(statearr_12769[(14)] = inst_12717);

(statearr_12769[(8)] = inst_12709__$1);

(statearr_12769[(10)] = inst_12707__$1);

(statearr_12769[(11)] = inst_12710__$1);

(statearr_12769[(12)] = inst_12708__$1);

return statearr_12769;
})();
var statearr_12770_12805 = state_12755__$1;
(statearr_12770_12805[(2)] = null);

(statearr_12770_12805[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12756 === (22))){
var state_12755__$1 = state_12755;
var statearr_12771_12806 = state_12755__$1;
(statearr_12771_12806[(2)] = null);

(statearr_12771_12806[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12756 === (6))){
var inst_12696 = (state_12755[(13)]);
var inst_12705 = f.call(null,inst_12696);
var inst_12706 = cljs.core.seq.call(null,inst_12705);
var inst_12707 = inst_12706;
var inst_12708 = null;
var inst_12709 = (0);
var inst_12710 = (0);
var state_12755__$1 = (function (){var statearr_12772 = state_12755;
(statearr_12772[(8)] = inst_12709);

(statearr_12772[(10)] = inst_12707);

(statearr_12772[(11)] = inst_12710);

(statearr_12772[(12)] = inst_12708);

return statearr_12772;
})();
var statearr_12773_12807 = state_12755__$1;
(statearr_12773_12807[(2)] = null);

(statearr_12773_12807[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12756 === (17))){
var inst_12721 = (state_12755[(7)]);
var inst_12725 = cljs.core.chunk_first.call(null,inst_12721);
var inst_12726 = cljs.core.chunk_rest.call(null,inst_12721);
var inst_12727 = cljs.core.count.call(null,inst_12725);
var inst_12707 = inst_12726;
var inst_12708 = inst_12725;
var inst_12709 = inst_12727;
var inst_12710 = (0);
var state_12755__$1 = (function (){var statearr_12774 = state_12755;
(statearr_12774[(8)] = inst_12709);

(statearr_12774[(10)] = inst_12707);

(statearr_12774[(11)] = inst_12710);

(statearr_12774[(12)] = inst_12708);

return statearr_12774;
})();
var statearr_12775_12808 = state_12755__$1;
(statearr_12775_12808[(2)] = null);

(statearr_12775_12808[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12756 === (3))){
var inst_12753 = (state_12755[(2)]);
var state_12755__$1 = state_12755;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12755__$1,inst_12753);
} else {
if((state_val_12756 === (12))){
var inst_12741 = (state_12755[(2)]);
var state_12755__$1 = state_12755;
var statearr_12776_12809 = state_12755__$1;
(statearr_12776_12809[(2)] = inst_12741);

(statearr_12776_12809[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12756 === (2))){
var state_12755__$1 = state_12755;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12755__$1,(4),in$);
} else {
if((state_val_12756 === (23))){
var inst_12749 = (state_12755[(2)]);
var state_12755__$1 = state_12755;
var statearr_12777_12810 = state_12755__$1;
(statearr_12777_12810[(2)] = inst_12749);

(statearr_12777_12810[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12756 === (19))){
var inst_12736 = (state_12755[(2)]);
var state_12755__$1 = state_12755;
var statearr_12778_12811 = state_12755__$1;
(statearr_12778_12811[(2)] = inst_12736);

(statearr_12778_12811[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12756 === (11))){
var inst_12721 = (state_12755[(7)]);
var inst_12707 = (state_12755[(10)]);
var inst_12721__$1 = cljs.core.seq.call(null,inst_12707);
var state_12755__$1 = (function (){var statearr_12779 = state_12755;
(statearr_12779[(7)] = inst_12721__$1);

return statearr_12779;
})();
if(inst_12721__$1){
var statearr_12780_12812 = state_12755__$1;
(statearr_12780_12812[(1)] = (14));

} else {
var statearr_12781_12813 = state_12755__$1;
(statearr_12781_12813[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12756 === (9))){
var inst_12743 = (state_12755[(2)]);
var inst_12744 = cljs.core.async.impl.protocols.closed_QMARK_.call(null,out);
var state_12755__$1 = (function (){var statearr_12782 = state_12755;
(statearr_12782[(15)] = inst_12743);

return statearr_12782;
})();
if(cljs.core.truth_(inst_12744)){
var statearr_12783_12814 = state_12755__$1;
(statearr_12783_12814[(1)] = (21));

} else {
var statearr_12784_12815 = state_12755__$1;
(statearr_12784_12815[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12756 === (5))){
var inst_12699 = cljs.core.async.close_BANG_.call(null,out);
var state_12755__$1 = state_12755;
var statearr_12785_12816 = state_12755__$1;
(statearr_12785_12816[(2)] = inst_12699);

(statearr_12785_12816[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12756 === (14))){
var inst_12721 = (state_12755[(7)]);
var inst_12723 = cljs.core.chunked_seq_QMARK_.call(null,inst_12721);
var state_12755__$1 = state_12755;
if(inst_12723){
var statearr_12786_12817 = state_12755__$1;
(statearr_12786_12817[(1)] = (17));

} else {
var statearr_12787_12818 = state_12755__$1;
(statearr_12787_12818[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12756 === (16))){
var inst_12739 = (state_12755[(2)]);
var state_12755__$1 = state_12755;
var statearr_12788_12819 = state_12755__$1;
(statearr_12788_12819[(2)] = inst_12739);

(statearr_12788_12819[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12756 === (10))){
var inst_12710 = (state_12755[(11)]);
var inst_12708 = (state_12755[(12)]);
var inst_12715 = cljs.core._nth.call(null,inst_12708,inst_12710);
var state_12755__$1 = state_12755;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12755__$1,(13),out,inst_12715);
} else {
if((state_val_12756 === (18))){
var inst_12721 = (state_12755[(7)]);
var inst_12730 = cljs.core.first.call(null,inst_12721);
var state_12755__$1 = state_12755;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12755__$1,(20),out,inst_12730);
} else {
if((state_val_12756 === (8))){
var inst_12709 = (state_12755[(8)]);
var inst_12710 = (state_12755[(11)]);
var inst_12712 = (inst_12710 < inst_12709);
var inst_12713 = inst_12712;
var state_12755__$1 = state_12755;
if(cljs.core.truth_(inst_12713)){
var statearr_12789_12820 = state_12755__$1;
(statearr_12789_12820[(1)] = (10));

} else {
var statearr_12790_12821 = state_12755__$1;
(statearr_12790_12821[(1)] = (11));

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
var statearr_12794 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_12794[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__6743__auto__);

(statearr_12794[(1)] = (1));

return statearr_12794;
});
var cljs$core$async$mapcat_STAR__$_state_machine__6743__auto____1 = (function (state_12755){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_12755);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e12795){if((e12795 instanceof Object)){
var ex__6746__auto__ = e12795;
var statearr_12796_12822 = state_12755;
(statearr_12796_12822[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12755);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e12795;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12823 = state_12755;
state_12755 = G__12823;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__6743__auto__ = function(state_12755){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__6743__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__6743__auto____1.call(this,state_12755);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__6743__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__6743__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto__))
})();
var state__6806__auto__ = (function (){var statearr_12797 = f__6805__auto__.call(null);
(statearr_12797[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto__);

return statearr_12797;
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
var G__12825 = arguments.length;
switch (G__12825) {
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
var G__12828 = arguments.length;
switch (G__12828) {
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
var G__12831 = arguments.length;
switch (G__12831) {
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
var c__6804__auto___12881 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto___12881,out){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto___12881,out){
return (function (state_12855){
var state_val_12856 = (state_12855[(1)]);
if((state_val_12856 === (7))){
var inst_12850 = (state_12855[(2)]);
var state_12855__$1 = state_12855;
var statearr_12857_12882 = state_12855__$1;
(statearr_12857_12882[(2)] = inst_12850);

(statearr_12857_12882[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12856 === (1))){
var inst_12832 = null;
var state_12855__$1 = (function (){var statearr_12858 = state_12855;
(statearr_12858[(7)] = inst_12832);

return statearr_12858;
})();
var statearr_12859_12883 = state_12855__$1;
(statearr_12859_12883[(2)] = null);

(statearr_12859_12883[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12856 === (4))){
var inst_12835 = (state_12855[(8)]);
var inst_12835__$1 = (state_12855[(2)]);
var inst_12836 = (inst_12835__$1 == null);
var inst_12837 = cljs.core.not.call(null,inst_12836);
var state_12855__$1 = (function (){var statearr_12860 = state_12855;
(statearr_12860[(8)] = inst_12835__$1);

return statearr_12860;
})();
if(inst_12837){
var statearr_12861_12884 = state_12855__$1;
(statearr_12861_12884[(1)] = (5));

} else {
var statearr_12862_12885 = state_12855__$1;
(statearr_12862_12885[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12856 === (6))){
var state_12855__$1 = state_12855;
var statearr_12863_12886 = state_12855__$1;
(statearr_12863_12886[(2)] = null);

(statearr_12863_12886[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12856 === (3))){
var inst_12852 = (state_12855[(2)]);
var inst_12853 = cljs.core.async.close_BANG_.call(null,out);
var state_12855__$1 = (function (){var statearr_12864 = state_12855;
(statearr_12864[(9)] = inst_12852);

return statearr_12864;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12855__$1,inst_12853);
} else {
if((state_val_12856 === (2))){
var state_12855__$1 = state_12855;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12855__$1,(4),ch);
} else {
if((state_val_12856 === (11))){
var inst_12835 = (state_12855[(8)]);
var inst_12844 = (state_12855[(2)]);
var inst_12832 = inst_12835;
var state_12855__$1 = (function (){var statearr_12865 = state_12855;
(statearr_12865[(7)] = inst_12832);

(statearr_12865[(10)] = inst_12844);

return statearr_12865;
})();
var statearr_12866_12887 = state_12855__$1;
(statearr_12866_12887[(2)] = null);

(statearr_12866_12887[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12856 === (9))){
var inst_12835 = (state_12855[(8)]);
var state_12855__$1 = state_12855;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12855__$1,(11),out,inst_12835);
} else {
if((state_val_12856 === (5))){
var inst_12832 = (state_12855[(7)]);
var inst_12835 = (state_12855[(8)]);
var inst_12839 = cljs.core._EQ_.call(null,inst_12835,inst_12832);
var state_12855__$1 = state_12855;
if(inst_12839){
var statearr_12868_12888 = state_12855__$1;
(statearr_12868_12888[(1)] = (8));

} else {
var statearr_12869_12889 = state_12855__$1;
(statearr_12869_12889[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12856 === (10))){
var inst_12847 = (state_12855[(2)]);
var state_12855__$1 = state_12855;
var statearr_12870_12890 = state_12855__$1;
(statearr_12870_12890[(2)] = inst_12847);

(statearr_12870_12890[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12856 === (8))){
var inst_12832 = (state_12855[(7)]);
var tmp12867 = inst_12832;
var inst_12832__$1 = tmp12867;
var state_12855__$1 = (function (){var statearr_12871 = state_12855;
(statearr_12871[(7)] = inst_12832__$1);

return statearr_12871;
})();
var statearr_12872_12891 = state_12855__$1;
(statearr_12872_12891[(2)] = null);

(statearr_12872_12891[(1)] = (2));


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
});})(c__6804__auto___12881,out))
;
return ((function (switch__6742__auto__,c__6804__auto___12881,out){
return (function() {
var cljs$core$async$state_machine__6743__auto__ = null;
var cljs$core$async$state_machine__6743__auto____0 = (function (){
var statearr_12876 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_12876[(0)] = cljs$core$async$state_machine__6743__auto__);

(statearr_12876[(1)] = (1));

return statearr_12876;
});
var cljs$core$async$state_machine__6743__auto____1 = (function (state_12855){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_12855);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e12877){if((e12877 instanceof Object)){
var ex__6746__auto__ = e12877;
var statearr_12878_12892 = state_12855;
(statearr_12878_12892[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12855);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e12877;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12893 = state_12855;
state_12855 = G__12893;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs$core$async$state_machine__6743__auto__ = function(state_12855){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__6743__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__6743__auto____1.call(this,state_12855);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__6743__auto____0;
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__6743__auto____1;
return cljs$core$async$state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto___12881,out))
})();
var state__6806__auto__ = (function (){var statearr_12879 = f__6805__auto__.call(null);
(statearr_12879[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto___12881);

return statearr_12879;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto___12881,out))
);


return out;
});

cljs.core.async.unique.cljs$lang$maxFixedArity = 2;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(){
var G__12895 = arguments.length;
switch (G__12895) {
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
var c__6804__auto___12964 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto___12964,out){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto___12964,out){
return (function (state_12933){
var state_val_12934 = (state_12933[(1)]);
if((state_val_12934 === (7))){
var inst_12929 = (state_12933[(2)]);
var state_12933__$1 = state_12933;
var statearr_12935_12965 = state_12933__$1;
(statearr_12935_12965[(2)] = inst_12929);

(statearr_12935_12965[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12934 === (1))){
var inst_12896 = (new Array(n));
var inst_12897 = inst_12896;
var inst_12898 = (0);
var state_12933__$1 = (function (){var statearr_12936 = state_12933;
(statearr_12936[(7)] = inst_12897);

(statearr_12936[(8)] = inst_12898);

return statearr_12936;
})();
var statearr_12937_12966 = state_12933__$1;
(statearr_12937_12966[(2)] = null);

(statearr_12937_12966[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12934 === (4))){
var inst_12901 = (state_12933[(9)]);
var inst_12901__$1 = (state_12933[(2)]);
var inst_12902 = (inst_12901__$1 == null);
var inst_12903 = cljs.core.not.call(null,inst_12902);
var state_12933__$1 = (function (){var statearr_12938 = state_12933;
(statearr_12938[(9)] = inst_12901__$1);

return statearr_12938;
})();
if(inst_12903){
var statearr_12939_12967 = state_12933__$1;
(statearr_12939_12967[(1)] = (5));

} else {
var statearr_12940_12968 = state_12933__$1;
(statearr_12940_12968[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12934 === (15))){
var inst_12923 = (state_12933[(2)]);
var state_12933__$1 = state_12933;
var statearr_12941_12969 = state_12933__$1;
(statearr_12941_12969[(2)] = inst_12923);

(statearr_12941_12969[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12934 === (13))){
var state_12933__$1 = state_12933;
var statearr_12942_12970 = state_12933__$1;
(statearr_12942_12970[(2)] = null);

(statearr_12942_12970[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12934 === (6))){
var inst_12898 = (state_12933[(8)]);
var inst_12919 = (inst_12898 > (0));
var state_12933__$1 = state_12933;
if(cljs.core.truth_(inst_12919)){
var statearr_12943_12971 = state_12933__$1;
(statearr_12943_12971[(1)] = (12));

} else {
var statearr_12944_12972 = state_12933__$1;
(statearr_12944_12972[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12934 === (3))){
var inst_12931 = (state_12933[(2)]);
var state_12933__$1 = state_12933;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12933__$1,inst_12931);
} else {
if((state_val_12934 === (12))){
var inst_12897 = (state_12933[(7)]);
var inst_12921 = cljs.core.vec.call(null,inst_12897);
var state_12933__$1 = state_12933;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12933__$1,(15),out,inst_12921);
} else {
if((state_val_12934 === (2))){
var state_12933__$1 = state_12933;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12933__$1,(4),ch);
} else {
if((state_val_12934 === (11))){
var inst_12913 = (state_12933[(2)]);
var inst_12914 = (new Array(n));
var inst_12897 = inst_12914;
var inst_12898 = (0);
var state_12933__$1 = (function (){var statearr_12945 = state_12933;
(statearr_12945[(7)] = inst_12897);

(statearr_12945[(8)] = inst_12898);

(statearr_12945[(10)] = inst_12913);

return statearr_12945;
})();
var statearr_12946_12973 = state_12933__$1;
(statearr_12946_12973[(2)] = null);

(statearr_12946_12973[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12934 === (9))){
var inst_12897 = (state_12933[(7)]);
var inst_12911 = cljs.core.vec.call(null,inst_12897);
var state_12933__$1 = state_12933;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12933__$1,(11),out,inst_12911);
} else {
if((state_val_12934 === (5))){
var inst_12897 = (state_12933[(7)]);
var inst_12898 = (state_12933[(8)]);
var inst_12906 = (state_12933[(11)]);
var inst_12901 = (state_12933[(9)]);
var inst_12905 = (inst_12897[inst_12898] = inst_12901);
var inst_12906__$1 = (inst_12898 + (1));
var inst_12907 = (inst_12906__$1 < n);
var state_12933__$1 = (function (){var statearr_12947 = state_12933;
(statearr_12947[(11)] = inst_12906__$1);

(statearr_12947[(12)] = inst_12905);

return statearr_12947;
})();
if(cljs.core.truth_(inst_12907)){
var statearr_12948_12974 = state_12933__$1;
(statearr_12948_12974[(1)] = (8));

} else {
var statearr_12949_12975 = state_12933__$1;
(statearr_12949_12975[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12934 === (14))){
var inst_12926 = (state_12933[(2)]);
var inst_12927 = cljs.core.async.close_BANG_.call(null,out);
var state_12933__$1 = (function (){var statearr_12951 = state_12933;
(statearr_12951[(13)] = inst_12926);

return statearr_12951;
})();
var statearr_12952_12976 = state_12933__$1;
(statearr_12952_12976[(2)] = inst_12927);

(statearr_12952_12976[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12934 === (10))){
var inst_12917 = (state_12933[(2)]);
var state_12933__$1 = state_12933;
var statearr_12953_12977 = state_12933__$1;
(statearr_12953_12977[(2)] = inst_12917);

(statearr_12953_12977[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12934 === (8))){
var inst_12897 = (state_12933[(7)]);
var inst_12906 = (state_12933[(11)]);
var tmp12950 = inst_12897;
var inst_12897__$1 = tmp12950;
var inst_12898 = inst_12906;
var state_12933__$1 = (function (){var statearr_12954 = state_12933;
(statearr_12954[(7)] = inst_12897__$1);

(statearr_12954[(8)] = inst_12898);

return statearr_12954;
})();
var statearr_12955_12978 = state_12933__$1;
(statearr_12955_12978[(2)] = null);

(statearr_12955_12978[(1)] = (2));


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
});})(c__6804__auto___12964,out))
;
return ((function (switch__6742__auto__,c__6804__auto___12964,out){
return (function() {
var cljs$core$async$state_machine__6743__auto__ = null;
var cljs$core$async$state_machine__6743__auto____0 = (function (){
var statearr_12959 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_12959[(0)] = cljs$core$async$state_machine__6743__auto__);

(statearr_12959[(1)] = (1));

return statearr_12959;
});
var cljs$core$async$state_machine__6743__auto____1 = (function (state_12933){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_12933);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e12960){if((e12960 instanceof Object)){
var ex__6746__auto__ = e12960;
var statearr_12961_12979 = state_12933;
(statearr_12961_12979[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12933);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e12960;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12980 = state_12933;
state_12933 = G__12980;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs$core$async$state_machine__6743__auto__ = function(state_12933){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__6743__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__6743__auto____1.call(this,state_12933);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__6743__auto____0;
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__6743__auto____1;
return cljs$core$async$state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto___12964,out))
})();
var state__6806__auto__ = (function (){var statearr_12962 = f__6805__auto__.call(null);
(statearr_12962[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto___12964);

return statearr_12962;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto___12964,out))
);


return out;
});

cljs.core.async.partition.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(){
var G__12982 = arguments.length;
switch (G__12982) {
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
var c__6804__auto___13055 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__6804__auto___13055,out){
return (function (){
var f__6805__auto__ = (function (){var switch__6742__auto__ = ((function (c__6804__auto___13055,out){
return (function (state_13024){
var state_val_13025 = (state_13024[(1)]);
if((state_val_13025 === (7))){
var inst_13020 = (state_13024[(2)]);
var state_13024__$1 = state_13024;
var statearr_13026_13056 = state_13024__$1;
(statearr_13026_13056[(2)] = inst_13020);

(statearr_13026_13056[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13025 === (1))){
var inst_12983 = [];
var inst_12984 = inst_12983;
var inst_12985 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_13024__$1 = (function (){var statearr_13027 = state_13024;
(statearr_13027[(7)] = inst_12984);

(statearr_13027[(8)] = inst_12985);

return statearr_13027;
})();
var statearr_13028_13057 = state_13024__$1;
(statearr_13028_13057[(2)] = null);

(statearr_13028_13057[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13025 === (4))){
var inst_12988 = (state_13024[(9)]);
var inst_12988__$1 = (state_13024[(2)]);
var inst_12989 = (inst_12988__$1 == null);
var inst_12990 = cljs.core.not.call(null,inst_12989);
var state_13024__$1 = (function (){var statearr_13029 = state_13024;
(statearr_13029[(9)] = inst_12988__$1);

return statearr_13029;
})();
if(inst_12990){
var statearr_13030_13058 = state_13024__$1;
(statearr_13030_13058[(1)] = (5));

} else {
var statearr_13031_13059 = state_13024__$1;
(statearr_13031_13059[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13025 === (15))){
var inst_13014 = (state_13024[(2)]);
var state_13024__$1 = state_13024;
var statearr_13032_13060 = state_13024__$1;
(statearr_13032_13060[(2)] = inst_13014);

(statearr_13032_13060[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13025 === (13))){
var state_13024__$1 = state_13024;
var statearr_13033_13061 = state_13024__$1;
(statearr_13033_13061[(2)] = null);

(statearr_13033_13061[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13025 === (6))){
var inst_12984 = (state_13024[(7)]);
var inst_13009 = inst_12984.length;
var inst_13010 = (inst_13009 > (0));
var state_13024__$1 = state_13024;
if(cljs.core.truth_(inst_13010)){
var statearr_13034_13062 = state_13024__$1;
(statearr_13034_13062[(1)] = (12));

} else {
var statearr_13035_13063 = state_13024__$1;
(statearr_13035_13063[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13025 === (3))){
var inst_13022 = (state_13024[(2)]);
var state_13024__$1 = state_13024;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13024__$1,inst_13022);
} else {
if((state_val_13025 === (12))){
var inst_12984 = (state_13024[(7)]);
var inst_13012 = cljs.core.vec.call(null,inst_12984);
var state_13024__$1 = state_13024;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13024__$1,(15),out,inst_13012);
} else {
if((state_val_13025 === (2))){
var state_13024__$1 = state_13024;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13024__$1,(4),ch);
} else {
if((state_val_13025 === (11))){
var inst_12988 = (state_13024[(9)]);
var inst_12992 = (state_13024[(10)]);
var inst_13002 = (state_13024[(2)]);
var inst_13003 = [];
var inst_13004 = inst_13003.push(inst_12988);
var inst_12984 = inst_13003;
var inst_12985 = inst_12992;
var state_13024__$1 = (function (){var statearr_13036 = state_13024;
(statearr_13036[(11)] = inst_13002);

(statearr_13036[(7)] = inst_12984);

(statearr_13036[(12)] = inst_13004);

(statearr_13036[(8)] = inst_12985);

return statearr_13036;
})();
var statearr_13037_13064 = state_13024__$1;
(statearr_13037_13064[(2)] = null);

(statearr_13037_13064[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13025 === (9))){
var inst_12984 = (state_13024[(7)]);
var inst_13000 = cljs.core.vec.call(null,inst_12984);
var state_13024__$1 = state_13024;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13024__$1,(11),out,inst_13000);
} else {
if((state_val_13025 === (5))){
var inst_12988 = (state_13024[(9)]);
var inst_12985 = (state_13024[(8)]);
var inst_12992 = (state_13024[(10)]);
var inst_12992__$1 = f.call(null,inst_12988);
var inst_12993 = cljs.core._EQ_.call(null,inst_12992__$1,inst_12985);
var inst_12994 = cljs.core.keyword_identical_QMARK_.call(null,inst_12985,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var inst_12995 = (inst_12993) || (inst_12994);
var state_13024__$1 = (function (){var statearr_13038 = state_13024;
(statearr_13038[(10)] = inst_12992__$1);

return statearr_13038;
})();
if(cljs.core.truth_(inst_12995)){
var statearr_13039_13065 = state_13024__$1;
(statearr_13039_13065[(1)] = (8));

} else {
var statearr_13040_13066 = state_13024__$1;
(statearr_13040_13066[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13025 === (14))){
var inst_13017 = (state_13024[(2)]);
var inst_13018 = cljs.core.async.close_BANG_.call(null,out);
var state_13024__$1 = (function (){var statearr_13042 = state_13024;
(statearr_13042[(13)] = inst_13017);

return statearr_13042;
})();
var statearr_13043_13067 = state_13024__$1;
(statearr_13043_13067[(2)] = inst_13018);

(statearr_13043_13067[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13025 === (10))){
var inst_13007 = (state_13024[(2)]);
var state_13024__$1 = state_13024;
var statearr_13044_13068 = state_13024__$1;
(statearr_13044_13068[(2)] = inst_13007);

(statearr_13044_13068[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13025 === (8))){
var inst_12988 = (state_13024[(9)]);
var inst_12984 = (state_13024[(7)]);
var inst_12992 = (state_13024[(10)]);
var inst_12997 = inst_12984.push(inst_12988);
var tmp13041 = inst_12984;
var inst_12984__$1 = tmp13041;
var inst_12985 = inst_12992;
var state_13024__$1 = (function (){var statearr_13045 = state_13024;
(statearr_13045[(7)] = inst_12984__$1);

(statearr_13045[(8)] = inst_12985);

(statearr_13045[(14)] = inst_12997);

return statearr_13045;
})();
var statearr_13046_13069 = state_13024__$1;
(statearr_13046_13069[(2)] = null);

(statearr_13046_13069[(1)] = (2));


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
});})(c__6804__auto___13055,out))
;
return ((function (switch__6742__auto__,c__6804__auto___13055,out){
return (function() {
var cljs$core$async$state_machine__6743__auto__ = null;
var cljs$core$async$state_machine__6743__auto____0 = (function (){
var statearr_13050 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_13050[(0)] = cljs$core$async$state_machine__6743__auto__);

(statearr_13050[(1)] = (1));

return statearr_13050;
});
var cljs$core$async$state_machine__6743__auto____1 = (function (state_13024){
while(true){
var ret_value__6744__auto__ = (function (){try{while(true){
var result__6745__auto__ = switch__6742__auto__.call(null,state_13024);
if(cljs.core.keyword_identical_QMARK_.call(null,result__6745__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__6745__auto__;
}
break;
}
}catch (e13051){if((e13051 instanceof Object)){
var ex__6746__auto__ = e13051;
var statearr_13052_13070 = state_13024;
(statearr_13052_13070[(5)] = ex__6746__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13024);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e13051;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6744__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13071 = state_13024;
state_13024 = G__13071;
continue;
} else {
return ret_value__6744__auto__;
}
break;
}
});
cljs$core$async$state_machine__6743__auto__ = function(state_13024){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__6743__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__6743__auto____1.call(this,state_13024);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__6743__auto____0;
cljs$core$async$state_machine__6743__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__6743__auto____1;
return cljs$core$async$state_machine__6743__auto__;
})()
;})(switch__6742__auto__,c__6804__auto___13055,out))
})();
var state__6806__auto__ = (function (){var statearr_13053 = f__6805__auto__.call(null);
(statearr_13053[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6804__auto___13055);

return statearr_13053;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6806__auto__);
});})(c__6804__auto___13055,out))
);


return out;
});

cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3;

//# sourceMappingURL=async.js.map