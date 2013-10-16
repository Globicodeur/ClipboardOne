/*!
 * URL.js
 *
 * Copyright 2011 Eric Ferraiuolo
 * https://github.com/ericf/urljs
 * modified slightly by Globinette
 */
var URL=function(){var e=this;if(!(e&&e.hasOwnProperty&&e instanceof URL)){e=new URL}return e._init.apply(e,arguments)};(function(){var e="absolute",t="relative",n="http",r="https",i=":",s="//",o="@",u=".",a="/",f="..",l="../",c="?",h="=",p="&",d="#",v="",m="type",g="scheme",y="userInfo",b="host",w="port",E="path",S="query",x="fragment",T=/^(?:(https?:\/\/|\/\/)|(\/|\?|#)|[^;:@=\.\s])/i,N=/^(?:(https?):\/\/|\/\/)(?:([^:@\s]+:?[^:@\s]+?)@)?((?:[^;:@=\/\?\.\s]+\.)+[A-Za-z0-9\-]{2,})(?::(\d+))?(?=\/|\?|#|$)([^\?#]+)?(?:\?([^#]+))?(?:#(.+))?/i,C=/^([^\?#]+)?(?:\?([^#]+))?(?:#(.+))?/i,k="object",L="string",A=/^\s+|\s+$/g,O,M,_;O=String.prototype.trim?function(e){return e&&e.trim?e.trim():e}:function(e){try{return e.replace(A,v)}catch(t){return e}};M=function(e){return e&&typeof e===k};_=function(e){return typeof e===L};URL.ABSOLUTE=e;URL.RELATIVE=t;URL.normalize=function(e){return(new URL(e)).toString()};URL.resolve=function(e,t){return(new URL(e)).resolve(t).toString()};URL.prototype={_init:function(e){this.constructor=URL;e=_(e)?e:e instanceof URL?e.toString():null;this._original=e;this._url={};this._isValid=this._parse(e);return this},toString:function(){var t=this._url,n=[],r=t[m],o=t[g],u=t[E],f=t[S],l=t[x];if(r===e){n.push(o?o+i+s:s,this.authority());if(u&&u.indexOf(a)!==0){u=a+u}}n.push(u,f?c+this.queryString():v,l?d+l:v);return n.join(v)},original:function(){return this._original},isValid:function(){return this._isValid},isAbsolute:function(){return this._url[m]===e},isRelative:function(){return this._url[m]===t},isHostRelative:function(){var e=this._url[E];return this.isRelative()&&e&&e.indexOf(a)===0},type:function(){return this._url[m]},scheme:function(e){return arguments.length?this._set(g,e):this._url[g]},userInfo:function(e){return arguments.length?this._set(y,e):this._url[y]},host:function(e){return arguments.length?this._set(b,e):this._url[b]},domain:function(){var e=this._url[b];return e?e.split(u).slice(-2).join(u):undefined},port:function(e){return arguments.length?this._set(w,e):this._url[w]},authority:function(){var e=this._url,t=e[y],n=e[b],r=e[w];return[t?t+o:v,n,r?i+r:v].join(v)},path:function(e){return arguments.length?this._set(E,e):this._url[E]},query:function(e){return arguments.length?this._set(S,e):this._url[S]},queryString:function(e){if(arguments.length){return this._set(S,this._parseQuery(e))}e=v;var t=this._url[S],n,r;if(t){for(n=0,r=t.length;n<r;n++){e+=t[n].join(h);if(n<r-1){e+=p}}}return e},fragment:function(e){return arguments.length?this._set(x,e):this._url[x]},resolve:function(e){e=e instanceof URL?e:new URL(e);var t,n;if(!(this.isValid()&&e.isValid())){return this}if(e.isAbsolute()){return this.isAbsolute()?e.scheme()?e:(new URL(e)).scheme(this.scheme()):e}t=new URL(this.isAbsolute()?this:null);if(e.path()){if(e.isHostRelative()||!this.path()){n=e.path()}else{n=this.path().substring(0,this.path().lastIndexOf(a)+1)+e.path()}t.path(this._normalizePath(n)).query(e.query()).fragment(e.fragment())}else if(e.query()){t.query(e.query()).fragment(e.fragment())}else if(e.fragment()){t.fragment(e.fragment())}return t},reduce:function(e){e=e instanceof URL?e:new URL(e);var t=this.resolve(e);if(this.isAbsolute()&&t.isAbsolute()){if(t.scheme()===this.scheme()&&t.authority()===this.authority()){t.scheme(null).userInfo(null).host(null).port(null)}}return t},_parse:function(n,r){n=O(n);if(!(_(n)&&n.length>0)){return false}var i,s;if(!r){r=n.match(T);r=r?r[1]?e:r[2]?t:null:null}switch(r){case e:i=n.match(N);if(i){s={};s[m]=e;s[g]=i[1]?i[1].toLowerCase():undefined;s[y]=i[2];s[b]=i[3].toLowerCase();s[w]=i[4]?parseInt(i[4],10):undefined;s[E]=i[5]||a;s[S]=this._parseQuery(i[6]);s[x]=i[7]}break;case t:i=n.match(C);if(i){s={};s[m]=t;s[E]=i[1];s[S]=this._parseQuery(i[2]);s[x]=i[3]}break;default:return this._parse(n,e)||this._parse(n,t);break}if(s){this._url=s;return true}else{return false}},_parseQuery:function(e){if(!_(e)){return{}}e=O(e);var t={},n=e.split(p),r,i,s;for(i=0,s=n.length;i<s;i++){if(n[i]){r=n[i].split(h);t[r[0]]=r[1]}}return t},_set:function(n,r){this._url[n]=r;if(r&&(n===g||n===y||n===b||n===w)){this._url[m]=e}if(!r&&n===b){this._url[m]=t}this._isValid=this._parse(this.toString());return this},_normalizePath:function(e){var t,n,r,i,s,o;if(e.indexOf(l)>-1){t=e.split(a);r=[];for(s=0,o=t.length;s<o;s++){n=t[s];if(n===f){r.pop()}else if(n){r.push(n)}}i=r.join(a);if(e[0]===a){i=a+i}if(e[e.length-1]===a&&i.length>1){i+=a}}else{i=e}return i}}})()