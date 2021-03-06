/* ***********************************
* Julia player
*
* @author prochor666@gmail.com
* version: 0.9.3
* build: 2015-12-21
* licensed under the MIT License
*
* @requires:
* hls.js [required]
* jquery [required]
* ionicons [required]
* rangeslider [required]
*
************************************* */

// Support libs
if(!window.jQuery)
{
    alert('jQuery is required');
    window.stop();
}

(function($)
{
    // Root path workaround
    var __JULIA_ROOT_PATH__ = 'julia';
    dir = document.querySelector('script[src*="julia-player"]').getAttribute('src');
    name = dir.split('/').pop();
    __JULIA_ROOT_PATH__ = dir.replace('/js/'+name,"");
    $('head').append('<link rel="stylesheet" type="text/css" href="'+__JULIA_ROOT_PATH__+'/css/ionicons.min.css">');

    // Support libs
    try {
        h = new Hls;

    }catch(err)
    {
        /*! hls.js 0.3.14, handle error or insert/bind source */
        !function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;"undefined"!=typeof window?e=window:"undefined"!=typeof global?e=global:"undefined"!=typeof self&&(e=self),e.Hls=t()}}(function(){return function s(e,t,r){function i(a,d){if(!t[a]){if(!e[a]){var l="function"==typeof require&&require;if(!d&&l)return l(a,!0);if(n)return n(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var o=t[a]={exports:{}};e[a][0].call(o.exports,function(t){var r=e[a][1][t];return i(r?r:t)},o,o.exports,s,e,t,r)}return t[a].exports}for(var n="function"==typeof require&&require,a=0;a<r.length;a++)i(r[a]);return i}({1:[function(s,a,o){function e(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function t(e){return"function"==typeof e}function n(e){return"number"==typeof e}function r(e){return"object"==typeof e&&null!==e}function i(e){return void 0===e}a.exports=e,e.EventEmitter=e,e.prototype._events=void 0,e.prototype._maxListeners=void 0,e.defaultMaxListeners=10,e.prototype.setMaxListeners=function(e){if(!n(e)||0>e||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},e.prototype.emit=function(u){var o,a,n,s,e,l;if(this._events||(this._events={}),"error"===u&&(!this._events.error||r(this._events.error)&&!this._events.error.length)){if(o=arguments[1],o instanceof Error)throw o;throw TypeError('Uncaught, unspecified "error" event.')}if(a=this._events[u],i(a))return!1;if(t(a))switch(arguments.length){case 1:a.call(this);break;case 2:a.call(this,arguments[1]);break;case 3:a.call(this,arguments[1],arguments[2]);break;default:for(n=arguments.length,s=new Array(n-1),e=1;n>e;e++)s[e-1]=arguments[e];a.apply(this,s)}else if(r(a)){for(n=arguments.length,s=new Array(n-1),e=1;n>e;e++)s[e-1]=arguments[e];for(l=a.slice(),n=l.length,e=0;n>e;e++)l[e].apply(this,s)}return!0},e.prototype.addListener=function(a,n){var s;if(!t(n))throw TypeError("listener must be a function");if(this._events||(this._events={}),this._events.newListener&&this.emit("newListener",a,t(n.listener)?n.listener:n),this._events[a]?r(this._events[a])?this._events[a].push(n):this._events[a]=[this._events[a],n]:this._events[a]=n,r(this._events[a])&&!this._events[a].warned){var s;s=i(this._maxListeners)?e.defaultMaxListeners:this._maxListeners,s&&s>0&&this._events[a].length>s&&(this._events[a].warned=!0,"function"==typeof console.trace)}return this},e.prototype.on=e.prototype.addListener,e.prototype.once=function(i,e){function r(){this.removeListener(i,r),a||(a=!0,e.apply(this,arguments))}if(!t(e))throw TypeError("listener must be a function");var a=!1;return r.listener=e,this.on(i,r),this},e.prototype.removeListener=function(a,i){var e,s,o,n;if(!t(i))throw TypeError("listener must be a function");if(!this._events||!this._events[a])return this;if(e=this._events[a],o=e.length,s=-1,e===i||t(e.listener)&&e.listener===i)delete this._events[a],this._events.removeListener&&this.emit("removeListener",a,i);else if(r(e)){for(n=o;n-->0;)if(e[n]===i||e[n].listener&&e[n].listener===i){s=n;break}if(0>s)return this;1===e.length?(e.length=0,delete this._events[a]):e.splice(s,1),this._events.removeListener&&this.emit("removeListener",a,i)}return this},e.prototype.removeAllListeners=function(e){var i,r;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(i in this._events)"removeListener"!==i&&this.removeAllListeners(i);return this.removeAllListeners("removeListener"),this._events={},this}if(r=this._events[e],t(r))this.removeListener(e,r);else for(;r.length;)this.removeListener(e,r[r.length-1]);return delete this._events[e],this},e.prototype.listeners=function(e){var r;return r=this._events&&this._events[e]?t(this._events[e])?[this._events[e]]:this._events[e].slice():[]},e.listenerCount=function(e,r){var i;return i=e._events&&e._events[r]?t(e._events[r])?1:e._events[r].length:0}},{}],2:[function(n,i,s){var a=arguments[3],e=arguments[4],r=arguments[5],t=JSON.stringify;i.exports=function(u){for(var i,o=Object.keys(r),n=0,l=o.length;l>n;n++){var s=o[n];if(r[s].exports===u){i=s;break}}if(!i){i=Math.floor(Math.pow(16,8)*Math.random()).toString(16);for(var d={},n=0,l=o.length;l>n;n++){var s=o[n];d[s]=s}e[i]=[Function(["require","module","exports"],"("+u+")(self)"),d]}var h=Math.floor(Math.pow(16,8)*Math.random()).toString(16),f={};f[i]=i,e[h]=[Function(["require"],"require("+t(i)+")(self)"),f];var c="("+a+")({"+Object.keys(e).map(function(r){return t(r)+":["+e[r][0]+","+t(e[r][1])+"]"}).join(",")+"},{},["+t(h)+"])",g=window.URL||window.webkitURL||window.mozURL||window.msURL;return new Worker(g.createObjectURL(new Blob([c],{type:"text/javascript"})))}},{}],3:[function(r,i,e){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function e(i,r){for(var t=0;t<r.length;t++){var e=r[t];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(i,e.key,e)}}return function(t,r,i){return r&&e(t.prototype,r),i&&e(t,i),t}}(),o=r("../events"),t=a(o),l=function(){function e(r){n(this,e),this.hls=r,this.lastfetchlevel=0,this._autoLevelCapping=-1,this._nextAutoLevel=-1,this.onflp=this.onFragmentLoadProgress.bind(this),r.on(t.default.FRAG_LOAD_PROGRESS,this.onflp)}return s(e,[{key:"destroy",value:function(){this.hls.off(t.default.FRAG_LOAD_PROGRESS,this.onflp)}},{key:"onFragmentLoadProgress",value:function(r,t){var e=t.stats;void 0===e.aborted&&(this.lastfetchduration=(performance.now()-e.trequest)/1e3,this.lastfetchlevel=t.frag.level,this.lastbw=8*e.loaded/this.lastfetchduration)}},{key:"autoLevelCapping",get:function(){return this._autoLevelCapping},set:function(e){this._autoLevelCapping=e}},{key:"nextAutoLevel",get:function(){var r,e,t,i=this.lastbw,a=this.hls;if(t=-1===this._autoLevelCapping?a.levels.length-1:this._autoLevelCapping,-1!==this._nextAutoLevel){var n=Math.min(this._nextAutoLevel,t);if(n!==this.lastfetchlevel)return n;this._nextAutoLevel=-1}for(e=0;t>=e;e++)if(r=e<=this.lastfetchlevel?.8*i:.7*i,r<a.levels[e].bitrate)return Math.max(0,e-1);return e-1},set:function(e){this._nextAutoLevel=e}}]),e}();e.default=l,i.exports=e.default},{"../events":17}],4:[function(i,n,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(a,"__esModule",{value:!0});var d=function(){function e(i,r){for(var t=0;t<r.length;t++){var e=r[t];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(i,e.key,e)}}return function(t,r,i){return r&&e(t.prototype,r),i&&e(t,i),t}}(),s=i("../events"),e=l(s),r=i("../utils/logger"),t=i("../errors"),o=function(){function i(t){u(this,i),this.hls=t,this.onml=this.onManifestLoaded.bind(this),this.onll=this.onLevelLoaded.bind(this),this.onerr=this.onError.bind(this),this.ontick=this.tick.bind(this),t.on(e.default.MANIFEST_LOADED,this.onml),t.on(e.default.LEVEL_LOADED,this.onll),t.on(e.default.ERROR,this.onerr),this._manualLevel=this._autoLevelCapping=-1}return d(i,[{key:"destroy",value:function(){var t=this.hls;t.off(e.default.MANIFEST_LOADED,this.onml),t.off(e.default.LEVEL_LOADED,this.onll),t.off(e.default.ERROR,this.onerr),this.timer&&clearInterval(this.timer),this._manualLevel=-1}},{key:"onManifestLoaded",value:function(d,s){var n,i,a=[],t=[],o={},l=!1,u=!1;for(s.levels.forEach(function(e){e.videoCodec&&(l=!0),e.audioCodec&&(u=!0);var t=o[e.bitrate];void 0===t?(o[e.bitrate]=a.length,e.url=[e.url],e.urlId=0,a.push(e)):a[t].url.push(e.url)}),l&&u?a.forEach(function(e){e.videoCodec&&t.push(e)}):t=a,t=t.filter(function(e){var t=function(e){return MediaSource.isTypeSupported("video/mp4;codecs="+e)},r=e.audioCodec,i=e.videoCodec;return(!r||t(r))&&(!i||t(i))}),n=t[0].bitrate,t.sort(function(e,t){return e.bitrate-t.bitrate}),this._levels=t,i=0;i<t.length;i++)if(t[i].bitrate===n){this._firstLevel=i,r.logger.log("manifest loaded,"+t.length+" level(s) found, first bitrate:"+n);break}this.hls.trigger(e.default.MANIFEST_PARSED,{levels:this._levels,firstLevel:this._firstLevel,stats:s.stats})}},{key:"setLevelInternal",value:function(i){if(i>=0&&i<this._levels.length){this.timer&&(clearInterval(this.timer),this.timer=null),this._level=i,r.logger.log("switching to level "+i),this.hls.trigger(e.default.LEVEL_SWITCH,{level:i});var a=this._levels[i];if(void 0===a.details||a.details.live===!0){r.logger.log("(re)loading playlist for level "+i);var n=a.urlId;this.hls.trigger(e.default.LEVEL_LOADING,{url:a.url[n],level:i,id:n})}}else this.hls.trigger(e.default.ERROR,{type:t.ErrorTypes.OTHER_ERROR,details:t.ErrorDetails.LEVEL_SWITCH_ERROR,level:i,fatal:!1,reason:"invalid level idx"})}},{key:"onError",value:function(o,i){if(!i.fatal){var a,e,n=i.details,s=this.hls;switch(n){case t.ErrorDetails.FRAG_LOAD_ERROR:case t.ErrorDetails.FRAG_LOAD_TIMEOUT:case t.ErrorDetails.FRAG_LOOP_LOADING_ERROR:case t.ErrorDetails.KEY_LOAD_ERROR:case t.ErrorDetails.KEY_LOAD_TIMEOUT:a=i.frag.level;break;case t.ErrorDetails.LEVEL_LOAD_ERROR:case t.ErrorDetails.LEVEL_LOAD_TIMEOUT:a=i.level}if(void 0!==a)if(e=this._levels[a],e.urlId<e.url.length-1)e.urlId++,e.details=void 0,r.logger.warn("level controller,"+n+" for level "+a+": switching to redundant stream id "+e.urlId);else{var l=-1===this._manualLevel&&a;l?(r.logger.warn("level controller,"+n+": emergency switch-down for next fragment"),s.abrController.nextAutoLevel=0):e&&e.details&&e.details.live?r.logger.warn("level controller,"+n+" on live stream, discard"):(r.logger.error("cannot recover "+n+" error"),this._level=void 0,this.timer&&(clearInterval(this.timer),this.timer=null),i.fatal=!0,s.trigger(o,i))}}}},{key:"onLevelLoaded",value:function(t,e){e.details.live&&!this.timer&&(this.timer=setInterval(this.ontick,1e3*e.details.targetduration)),!e.details.live&&this.timer&&(clearInterval(this.timer),this.timer=null)}},{key:"tick",value:function(){var t=this._level;if(void 0!==t){var r=this._levels[t],i=r.urlId;this.hls.trigger(e.default.LEVEL_LOADING,{url:r.url[i],level:t,id:i})}}},{key:"nextLoadLevel",value:function(){return-1!==this._manualLevel?this._manualLevel:this.hls.abrController.nextAutoLevel}},{key:"levels",get:function(){return this._levels}},{key:"level",get:function(){return this._level},set:function(e){(this._level!==e||void 0===this._levels[e].details)&&this.setLevelInternal(e)}},{key:"manualLevel",get:function(){return this._manualLevel},set:function(e){this._manualLevel=e,-1!==e&&(this.level=e)}},{key:"firstLevel",get:function(){return this._firstLevel},set:function(e){this._firstLevel=e}},{key:"startLevel",get:function(){return void 0===this._startLevel?this._firstLevel:this._startLevel},set:function(e){this._startLevel=e}}]),i}();a.default=o,n.exports=a.default},{"../errors":16,"../events":17,"../utils/logger":26}],5:[function(a,u,s){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function d(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(s,"__esModule",{value:!0});var g=function(){function e(i,r){for(var t=0;t<r.length;t++){var e=r[t];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(i,e.key,e)}}return function(t,r,i){return r&&e(t.prototype,r),i&&e(t,i),t}}(),h=a("../demux/demuxer"),v=n(h),p=a("../events"),r=n(p),t=a("../utils/logger"),l=a("../utils/binary-search"),f=n(l),c=a("../helper/level-helper"),o=n(c),i=a("../errors"),e={ERROR:-2,STARTING:-1,IDLE:0,KEY_LOADING:1,FRAG_LOADING:2,WAITING_LEVEL:3,PARSING:4,PARSED:5,APPENDING:6,BUFFER_FLUSHING:7},y=function(){function a(e){d(this,a),this.config=e.config,this.audioCodecSwap=!1,this.hls=e,this.onsbue=this.onSBUpdateEnd.bind(this),this.onsbe=this.onSBUpdateError.bind(this),this.onmediaatt0=this.onMediaAttaching.bind(this),this.onmediadet0=this.onMediaDetaching.bind(this),this.onmp=this.onManifestParsed.bind(this),this.onll=this.onLevelLoaded.bind(this),this.onfl=this.onFragLoaded.bind(this),this.onkl=this.onKeyLoaded.bind(this),this.onis=this.onInitSegment.bind(this),this.onfpg=this.onFragParsing.bind(this),this.onfp=this.onFragParsed.bind(this),this.onerr=this.onError.bind(this),this.ontick=this.tick.bind(this),e.on(r.default.MEDIA_ATTACHING,this.onmediaatt0),e.on(r.default.MEDIA_DETACHING,this.onmediadet0),e.on(r.default.MANIFEST_PARSED,this.onmp)}return g(a,[{key:"destroy",value:function(){this.stop();var t=this.hls;t.off(r.default.MEDIA_ATTACHING,this.onmediaatt0),t.off(r.default.MEDIA_DETACHING,this.onmediadet0),t.off(r.default.MANIFEST_PARSED,this.onmp),this.state=e.IDLE}},{key:"startLoad",value:function(){this.levels&&this.media?(this.startInternal(),this.lastCurrentTime?(t.logger.log("seeking @ "+this.lastCurrentTime),this.lastPaused||(t.logger.log("resuming video"),this.media.play()),this.state=e.IDLE):(this.lastCurrentTime=0,this.state=e.STARTING),this.nextLoadPosition=this.startPosition=this.lastCurrentTime,this.tick()):t.logger.warn("cannot start loading as either manifest not parsed or video not attached")}},{key:"startInternal",value:function(){var e=this.hls;this.stop(),this.demuxer=new v.default(e),this.timer=setInterval(this.ontick,100),this.level=-1,e.on(r.default.FRAG_LOADED,this.onfl),e.on(r.default.FRAG_PARSING_INIT_SEGMENT,this.onis),e.on(r.default.FRAG_PARSING_DATA,this.onfpg),e.on(r.default.FRAG_PARSED,this.onfp),e.on(r.default.ERROR,this.onerr),e.on(r.default.LEVEL_LOADED,this.onll),e.on(r.default.KEY_LOADED,this.onkl)}},{key:"stop",value:function(){this.mp4segments=[],this.flushRange=[],this.bufferRange=[];var t=this.fragCurrent;if(t&&(t.loader&&t.loader.abort(),this.fragCurrent=null),this.fragPrevious=null,this.sourceBuffer){for(var a in this.sourceBuffer){var i=this.sourceBuffer[a];try{this.mediaSource.removeSourceBuffer(i),i.removeEventListener("updateend",this.onsbue),i.removeEventListener("error",this.onsbe)}catch(e){}}this.sourceBuffer=null}this.timer&&(clearInterval(this.timer),this.timer=null),this.demuxer&&(this.demuxer.destroy(),this.demuxer=null);var e=this.hls;e.off(r.default.FRAG_LOADED,this.onfl),e.off(r.default.FRAG_PARSED,this.onfp),e.off(r.default.FRAG_PARSING_DATA,this.onfpg),e.off(r.default.LEVEL_LOADED,this.onll),e.off(r.default.KEY_LOADED,this.onkl),e.off(r.default.FRAG_PARSING_INIT_SEGMENT,this.onis),e.off(r.default.ERROR,this.onerr)}},{key:"tick",value:function(){var h,l,n,o=this.hls;switch(this.state){case e.ERROR:break;case e.STARTING:this.startLevel=o.startLevel,-1===this.startLevel&&(this.startLevel=0,this.fragBitrateTest=!0),this.level=o.nextLoadLevel=this.startLevel,this.state=e.WAITING_LEVEL,this.loadedmetadata=!1;break;case e.IDLE:if(!this.media)break;h=this.loadedmetadata?this.media.currentTime:this.nextLoadPosition,l=this.startFragmentRequested===!1?this.startLevel:o.nextLoadLevel;var v,I=this.bufferInfo(h,.3),P=I.len,d=I.end,c=this.fragPrevious;if(this.levels[l].hasOwnProperty("bitrate")?(v=Math.max(8*this.config.maxBufferSize/this.levels[l].bitrate,this.config.maxBufferLength),v=Math.min(v,this.config.maxMaxBufferLength)):v=this.config.maxBufferLength,v>P){if(o.nextLoadLevel=l,this.level=l,n=this.levels[l].details,"undefined"==typeof n){this.state=e.WAITING_LEVEL;break}var u=n.fragments,g=u.length,p=u[0].start,w=u[g-1].start+u[g-1].duration,a=void 0;if(n.live){if(d<Math.max(p,w-this.config.liveMaxLatencyDurationCount*n.targetduration)&&(this.seekAfterBuffered=p+Math.max(0,n.totalduration-this.config.liveSyncDurationCount*n.targetduration),t.logger.log("buffer end: "+d+" is located too far from the end of live sliding playlist, media position will be reseted to: "+this.seekAfterBuffered.toFixed(3)),d=this.seekAfterBuffered),this.startFragmentRequested&&!n.PTSKnown){if(c){var S=c.sn+1;S>=n.startSN&&S<=n.endSN&&(a=u[S-n.startSN],t.logger.log("live playlist, switching playlist, load frag with next SN: "+a.sn))}a||(a=u[Math.min(g-1,Math.round(g/2))],t.logger.log("live playlist, switching playlist, unknown, load middle frag : "+a.sn))}}else p>d&&(a=u[0]);if(!a){var m;if(m=w>d?f.default.search(u,function(e){return e.start+e.duration<=d?1:e.start>d?-1:0}):u[g-1],m&&(a=m,p=m.start,c&&a.level===c.level&&a.sn===c.sn))if(a.sn<n.endSN)a=u[a.sn+1-n.startSN],t.logger.log("SN just loaded, load next one: "+a.sn);else{if(!n.live){var _=this.mediaSource;if(_&&"open"===_.readyState){var E=this.sourceBuffer;E.audio&&E.audio.updating||E.video&&E.video.updating||(t.logger.log("all media data available, signal endOfStream() to MediaSource"),_.endOfStream())}}a=null}}if(a)if(null!=a.decryptdata.uri&&null==a.decryptdata.key)t.logger.log("Loading key for "+a.sn+" of ["+n.startSN+" ,"+n.endSN+"],level "+l),this.state=e.KEY_LOADING,o.trigger(r.default.KEY_LOADING,{frag:a});else{if(t.logger.log("Loading "+a.sn+" of ["+n.startSN+" ,"+n.endSN+"],level "+l+", currentTime:"+h+",bufferEnd:"+d.toFixed(3)),a.autoLevel=o.autoLevelEnabled,this.levels.length>1&&(a.expectedLen=Math.round(a.duration*this.levels[l].bitrate/8),a.trequest=performance.now()),void 0!==this.fragLoadIdx?this.fragLoadIdx++:this.fragLoadIdx=0,a.loadCounter){a.loadCounter++;var D=this.config.fragLoadingLoopThreshold;if(a.loadCounter>D&&Math.abs(this.fragLoadIdx-a.loadIdx)<D)return void o.trigger(r.default.ERROR,{type:i.ErrorTypes.MEDIA_ERROR,details:i.ErrorDetails.FRAG_LOOP_LOADING_ERROR,fatal:!1,frag:a})}else a.loadCounter=1;a.loadIdx=this.fragLoadIdx,this.fragCurrent=a,this.startFragmentRequested=!0,o.trigger(r.default.FRAG_LOADING,{frag:a}),this.state=e.FRAG_LOADING}}break;case e.WAITING_LEVEL:l=this.levels[this.level],l&&l.details&&(this.state=e.IDLE);break;case e.FRAG_LOADING:var L=this.media,s=this.fragCurrent;if(L&&(!L.paused||this.loadedmetadata===!1)&&s.autoLevel&&this.level&&this.levels.length>1){var T=performance.now()-s.trequest;if(T>500*s.duration){var k=1e3*s.loaded/T;s.expectedLen<s.loaded&&(s.expectedLen=s.loaded),h=L.currentTime;var R=(s.expectedLen-s.loaded)/k,b=this.bufferInfo(h,.3).end-h,O=s.duration*this.levels[o.nextLoadLevel].bitrate/(8*k);b<2*s.duration&&R>b&&R>O&&(t.logger.warn("loading too slow, abort fragment loading"),t.logger.log("fragLoadedDelay/bufferStarvationDelay/fragLevelNextLoadedDelay :"+R.toFixed(1)+"/"+b.toFixed(1)+"/"+O.toFixed(1)),s.loader.abort(),o.trigger(r.default.FRAG_LOAD_EMERGENCY_ABORTED,{frag:s}),this.state=e.IDLE)}}break;case e.PARSING:break;case e.PARSED:case e.APPENDING:if(this.sourceBuffer){if(this.media.error)return t.logger.error("trying to append although a media error occured, switch to ERROR state"),void(this.state=e.ERROR);if(this.sourceBuffer.audio&&this.sourceBuffer.audio.updating||this.sourceBuffer.video&&this.sourceBuffer.video.updating);else if(this.mp4segments.length){var A=this.mp4segments.shift();try{this.sourceBuffer[A.type].appendBuffer(A.data),this.appendError=0}catch(a){if(t.logger.error("error while trying to append buffer:"+a.message+",try appending later"),this.mp4segments.unshift(A),22!==a.code){this.appendError?this.appendError++:this.appendError=1;var y={type:i.ErrorTypes.MEDIA_ERROR,details:i.ErrorDetails.BUFFER_APPEND_ERROR,frag:this.fragCurrent};if(this.appendError>this.config.appendErrorMaxRetry)return t.logger.log("fail "+this.config.appendErrorMaxRetry+" times to append segment in sourceBuffer"),y.fatal=!0,o.trigger(r.default.ERROR,y),void(this.state=e.ERROR);y.fatal=!1,o.trigger(r.default.ERROR,y)}}this.state=e.APPENDING}}else this.state=e.IDLE;break;case e.BUFFER_FLUSHING:for(;this.flushRange.length;){var x=this.flushRange[0];if(!this.flushBuffer(x.start,x.end))break;this.flushRange.shift()}0===this.flushRange.length&&(this.immediateSwitch&&this.immediateLevelSwitchEnd(),this.state=e.IDLE,this.fragPrevious=null)}this._checkFragmentChanged(),this._checkBuffer()}},{key:"bufferInfo",value:function(i,a){var e,n=this.media,t=n.buffered,r=[];for(e=0;e<t.length;e++)r.push({start:t.start(e),end:t.end(e)});return this.bufferedInfo(r,i,a)}},{key:"bufferedInfo",value:function(r,i,a){var o,l,n,f,e,t=[];for(r.sort(function(e,t){var r=e.start-t.start;return r?r:t.end-e.end}),e=0;e<r.length;e++){var u=t.length;if(u){var d=t[u-1].end;r[e].start-d<a?r[e].end>d&&(t[u-1].end=r[e].end):t.push(r[e])}else t.push(r[e])}for(e=0,o=0,l=n=i;e<t.length;e++){var s=t[e].start,h=t[e].end;i+a>=s&&h>i?(l=s,n=h+a,o=n-i):s>i+a&&(f=s)}return{len:o,start:l,end:n,nextStart:f}}},{key:"getBufferRange",value:function(r){var e,t;for(e=this.bufferRange.length-1;e>=0;e--)if(t=this.bufferRange[e],r>=t.start&&r<=t.end)return t;return null}},{key:"followingBufferRange",value:function(e){return e?this.getBufferRange(e.end+.5):null}},{key:"isBuffered",value:function(r){for(var i=this.media,t=i.buffered,e=0;e<t.length;e++)if(r>=t.start(e)&&r<=t.end(e))return!0;return!1}},{key:"_checkFragmentChanged",value:function(){var t,e,i=this.media;if(i&&i.seeking===!1&&(e=i.currentTime,e>i.playbackRate*this.lastCurrentTime&&(this.lastCurrentTime=e),this.isBuffered(e)?t=this.getBufferRange(e):this.isBuffered(e+.1)&&(t=this.getBufferRange(e+.1)),t)){var a=t.frag;a!==this.fragPlaying&&(this.fragPlaying=a,this.hls.trigger(r.default.FRAG_CHANGED,{frag:a}))}}},{key:"flushBuffer",value:function(d,l){var r,e,o,s,i,a;if(this.flushBufferCounter++<2*this.bufferRange.length&&this.sourceBuffer)for(var u in this.sourceBuffer){if(r=this.sourceBuffer[u],r.updating)return!1;for(e=0;e<r.buffered.length;e++)if(o=r.buffered.start(e),s=r.buffered.end(e),-1!==navigator.userAgent.toLowerCase().indexOf("firefox")&&l===Number.POSITIVE_INFINITY?(i=d,a=l):(i=Math.max(o,d),a=Math.min(s,l)),a-i>.5)return t.logger.log("flush "+u+" ["+i+","+a+"], of ["+o+","+s+"], pos:"+this.media.currentTime),r.remove(i,a),!1}var n,h=[];for(e=0;e<this.bufferRange.length;e++)n=this.bufferRange[e],this.isBuffered((n.start+n.end)/2)&&h.push(n);return this.bufferRange=h,t.logger.log("buffer flushed"),!0}},{key:"immediateLevelSwitch",value:function(){t.logger.log("immediateLevelSwitch"),this.immediateSwitch||(this.immediateSwitch=!0,this.previouslyPaused=this.media.paused,this.media.pause());var r=this.fragCurrent;r&&r.loader&&r.loader.abort(),this.fragCurrent=null,this.flushBufferCounter=0,this.flushRange.push({start:0,end:Number.POSITIVE_INFINITY}),this.state=e.BUFFER_FLUSHING,this.fragLoadIdx+=2*this.config.fragLoadingLoopThreshold,this.tick()}},{key:"immediateLevelSwitchEnd",value:function(){this.immediateSwitch=!1,this.media.currentTime-=1e-4,this.previouslyPaused||this.media.play()}},{key:"nextLevelSwitch",value:function(){var r,i,t;if(i=this.getBufferRange(this.media.currentTime),i&&this.flushRange.push({start:0,end:i.start-1}),this.media.paused)r=0;else{var s=this.hls.nextLoadLevel,o=this.levels[s],n=this.fragLastKbps;r=n&&this.fragCurrent?this.fragCurrent.duration*o.bitrate/(1e3*n)+1:0}if(t=this.getBufferRange(this.media.currentTime+r),t&&(t=this.followingBufferRange(t))){this.flushRange.push({start:t.start,end:Number.POSITIVE_INFINITY});var a=this.fragCurrent;a&&a.loader&&a.loader.abort(),this.fragCurrent=null}this.flushRange.length&&(this.flushBufferCounter=0,this.state=e.BUFFER_FLUSHING,this.fragLoadIdx+=2*this.config.fragLoadingLoopThreshold,this.tick())}},{key:"onMediaAttaching",value:function(i,t){var r=this.media=t.media,e=this.mediaSource=new MediaSource;this.onmso=this.onMediaSourceOpen.bind(this),this.onmse=this.onMediaSourceEnded.bind(this),this.onmsc=this.onMediaSourceClose.bind(this),e.addEventListener("sourceopen",this.onmso),e.addEventListener("sourceended",this.onmse),e.addEventListener("sourceclose",this.onmsc),r.src=URL.createObjectURL(e)}},{key:"onMediaDetaching",value:function(){var e=this.media;e&&e.ended&&(t.logger.log("MSE detaching and video ended, reset startPosition"),this.startPosition=this.lastCurrentTime=0);var a=this.levels;a&&a.forEach(function(e){e.details&&e.details.fragments.forEach(function(e){e.loadCounter=void 0})});var i=this.mediaSource;if(i){if("open"===i.readyState)try{i.endOfStream()}catch(e){t.logger.warn("onMediaDetaching:"+e.message+" while calling endOfStream")}i.removeEventListener("sourceopen",this.onmso),i.removeEventListener("sourceended",this.onmse),i.removeEventListener("sourceclose",this.onmsc),this.media.src="",this.mediaSource=null,e&&(e.removeEventListener("seeking",this.onvseeking),e.removeEventListener("seeked",this.onvseeked),e.removeEventListener("loadedmetadata",this.onvmetadata),e.removeEventListener("ended",this.onvended),this.onvseeking=this.onvseeked=this.onvmetadata=null),this.media=null,this.loadedmetadata=!1,this.stop()}this.onmso=this.onmse=this.onmsc=null,this.hls.trigger(r.default.MEDIA_DETACHED)}},{key:"onMediaSeeking",value:function(){if(this.state===e.FRAG_LOADING&&0===this.bufferInfo(this.media.currentTime,.3).len){t.logger.log("seeking outside of buffer while fragment load in progress, cancel fragment load");var r=this.fragCurrent;r&&(r.loader&&r.loader.abort(),this.fragCurrent=null),this.fragPrevious=null,this.state=e.IDLE}this.media&&(this.lastCurrentTime=this.media.currentTime),void 0!==this.fragLoadIdx&&(this.fragLoadIdx+=2*this.config.fragLoadingLoopThreshold),this.tick()}},{key:"onMediaSeeked",value:function(){this.tick()}},{key:"onMediaMetadata",value:function(){this.media.currentTime!==this.startPosition&&(this.media.currentTime=this.startPosition),this.loadedmetadata=!0,this.tick()}},{key:"onMediaEnded",value:function(){t.logger.log("media ended"),this.startPosition=this.lastCurrentTime=0}},{key:"onManifestParsed",value:function(n,r){var e,i=!1,a=!1;r.levels.forEach(function(t){e=t.codecs,e&&(-1!==e.indexOf("mp4a.40.2")&&(i=!0),-1!==e.indexOf("mp4a.40.5")&&(a=!0))}),this.audiocodecswitch=i&&a,this.audiocodecswitch&&t.logger.log("both AAC/HE-AAC audio found in levels; declaring audio codec as HE-AAC"),this.levels=r.levels,this.startLevelLoaded=!1,this.startFragmentRequested=!1,this.media&&this.config.autoStartLoad&&this.startLoad()}},{key:"onLevelLoaded",value:function(d,n){var i=n.details,a=n.level,s=this.levels[a],l=i.totalduration;if(t.logger.log("level "+a+" loaded ["+i.startSN+","+i.endSN+"],duration:"+l),i.live){var u=s.details;u?(o.default.mergeDetails(u,i),i.PTSKnown?t.logger.log("live playlist sliding:"+i.fragments[0].start.toFixed(3)):t.logger.log("live playlist - outdated PTS, unknown sliding")):(i.PTSKnown=!1,t.logger.log("live playlist - first load, unknown sliding"))}else i.PTSKnown=!1;s.details=i,this.hls.trigger(r.default.LEVEL_UPDATED,{details:i,level:a}),this.startLevelLoaded===!1&&(i.live&&(this.startPosition=Math.max(0,l-this.config.liveSyncDurationCount*i.targetduration)),this.nextLoadPosition=this.startPosition,this.startLevelLoaded=!0),this.state===e.WAITING_LEVEL&&(this.state=e.IDLE),this.tick()}},{key:"onKeyLoaded",value:function(){this.state===e.KEY_LOADING&&(this.state=e.IDLE,this.tick())}},{key:"onFragLoaded",value:function(f,a){var i=this.fragCurrent;if(this.state===e.FRAG_LOADING&&i&&a.frag.level===i.level&&a.frag.sn===i.sn)if(this.fragBitrateTest===!0)this.state=e.IDLE,this.fragBitrateTest=!1,a.stats.tparsed=a.stats.tbuffered=performance.now(),this.hls.trigger(r.default.FRAG_BUFFERED,{stats:a.stats,frag:i});else{this.state=e.PARSING,this.stats=a.stats;var s=this.levels[this.level],o=s.details,d=o.totalduration,h=i.start,l=i.level,u=i.sn,n=s.audioCodec;n&&this.audioCodecSwap&&(t.logger.log("swapping playlist audio codec"),n=-1!==n.indexOf("mp4a.40.5")?"mp4a.40.2":"mp4a.40.5"),t.logger.log("Demuxing "+u+" of ["+o.startSN+" ,"+o.endSN+"],level "+l),this.demuxer.push(a.payload,n,s.videoCodec,h,i.cc,l,u,d,i.decryptdata)}}},{key:"onInitSegment",value:function(o,i){if(this.state===e.PARSING){var n,r=this.levels[this.level].audioCodec,a=this.levels[this.level].videoCodec;r&&this.audioCodecSwap&&(t.logger.log("swapping playlist audio codec"),r=-1!==r.indexOf("mp4a.40.5")?"mp4a.40.2":"mp4a.40.5"),t.logger.log("playlist_level/init_segment codecs: video => "+a+"/"+i.videoCodec+"; audio => "+r+"/"+i.audioCodec),(void 0===r||void 0===i.audioCodec)&&(r=i.audioCodec),(void 0===a||void 0===i.videoCodec)&&(a=i.videoCodec);var s=navigator.userAgent.toLowerCase();this.audiocodecswitch&&1!==i.audioChannelCount&&-1===s.indexOf("android")&&-1===s.indexOf("firefox")&&(r="mp4a.40.5"),this.sourceBuffer||(this.sourceBuffer={},t.logger.log("selected A/V codecs for sourceBuffers:"+r+","+a),r&&(n=this.sourceBuffer.audio=this.mediaSource.addSourceBuffer("video/mp4;codecs="+r),n.addEventListener("updateend",this.onsbue),n.addEventListener("error",this.onsbe)),a&&(n=this.sourceBuffer.video=this.mediaSource.addSourceBuffer("video/mp4;codecs="+a),n.addEventListener("updateend",this.onsbue),n.addEventListener("error",this.onsbe))),r&&this.mp4segments.push({type:"audio",data:i.audioMoov}),a&&this.mp4segments.push({type:"video",data:i.videoMoov}),this.tick()}}},{key:"onFragParsing",value:function(s,i){if(this.state===e.PARSING){this.tparse2=Date.now();var a=this.levels[this.level],n=this.fragCurrent;t.logger.log("parsed data, type/startPTS/endPTS/startDTS/endDTS/nb:"+i.type+"/"+i.startPTS.toFixed(3)+"/"+i.endPTS.toFixed(3)+"/"+i.startDTS.toFixed(3)+"/"+i.endDTS.toFixed(3)+"/"+i.nb);var l=o.default.updateFragPTS(a.details,n.sn,i.startPTS,i.endPTS);this.hls.trigger(r.default.LEVEL_PTS_UPDATED,{details:a.details,level:this.level,drift:l}),this.mp4segments.push({type:i.type,data:i.moof}),this.mp4segments.push({type:i.type,data:i.mdat}),this.nextLoadPosition=i.endPTS,this.bufferRange.push({type:i.type,start:i.startPTS,end:i.endPTS,frag:n}),this.tick()}else t.logger.warn("not in PARSING state, discarding "+s)}},{key:"onFragParsed",value:function(){this.state===e.PARSING&&(this.state=e.PARSED,this.stats.tparsed=performance.now(),this.tick())}},{key:"onError",value:function(a,r){switch(r.details){case i.ErrorDetails.FRAG_LOAD_ERROR:case i.ErrorDetails.FRAG_LOAD_TIMEOUT:case i.ErrorDetails.FRAG_LOOP_LOADING_ERROR:case i.ErrorDetails.LEVEL_LOAD_ERROR:case i.ErrorDetails.LEVEL_LOAD_TIMEOUT:case i.ErrorDetails.KEY_LOAD_ERROR:case i.ErrorDetails.KEY_LOAD_TIMEOUT:t.logger.warn("mediaController: "+r.details+" while loading frag,switch to "+(r.fatal?"ERROR":"IDLE")+" state ..."),this.state=r.fatal?e.ERROR:e.IDLE}}},{key:"onSBUpdateEnd",value:function(){if(this.state===e.APPENDING&&0===this.mp4segments.length){var a=this.fragCurrent,i=this.stats;a&&(this.fragPrevious=a,i.tbuffered=performance.now(),this.fragLastKbps=Math.round(8*i.length/(i.tbuffered-i.tfirst)),this.hls.trigger(r.default.FRAG_BUFFERED,{stats:i,frag:a}),t.logger.log("media buffered : "+this.timeRangesToString(this.media.buffered)),this.state=e.IDLE)}this.tick()}},{key:"_checkBuffer",value:function(){var e=this.media;if(e){var n=e.readyState;if(n){var i=this.seekAfterBuffered;if(i)e.duration>=i&&(e.currentTime=i,this.seekAfterBuffered=void 0);else if(3>n){var a=e.currentTime,s=this.bufferInfo(a,0);if(0===s.len){var r=s.nextStart;r&&.3>r-a&&(t.logger.log("adjust currentTime from "+a+" to "+r),e.currentTime=r)}}}}}},{key:"swapAudioCodec",value:function(){this.audioCodecSwap=!this.audioCodecSwap}},{key:"onSBUpdateError",value:function(a){t.logger.error("sourceBuffer error:"+a),this.state=e.ERROR,this.hls.trigger(r.default.ERROR,{type:i.ErrorTypes.MEDIA_ERROR,details:i.ErrorDetails.BUFFER_APPENDING_ERROR,fatal:!1,frag:this.fragCurrent})}},{key:"timeRangesToString",value:function(t){for(var r="",i=t.length,e=0;i>e;e++)r+="["+t.start(e)+","+t.end(e)+"]";return r}},{key:"onMediaSourceOpen",value:function(){t.logger.log("media source opened"),this.hls.trigger(r.default.MEDIA_ATTACHED),this.onvseeking=this.onMediaSeeking.bind(this),this.onvseeked=this.onMediaSeeked.bind(this),this.onvmetadata=this.onMediaMetadata.bind(this),this.onvended=this.onMediaEnded.bind(this);var e=this.media;e.addEventListener("seeking",this.onvseeking),e.addEventListener("seeked",this.onvseeked),e.addEventListener("loadedmetadata",this.onvmetadata),
e.addEventListener("ended",this.onvended),this.levels&&this.config.autoStartLoad&&this.startLoad(),this.mediaSource.removeEventListener("sourceopen",this.onmso)}},{key:"onMediaSourceClose",value:function(){t.logger.log("media source closed")}},{key:"onMediaSourceEnded",value:function(){t.logger.log("media source ended")}},{key:"currentLevel",get:function(){if(this.media){var e=this.getBufferRange(this.media.currentTime);if(e)return e.frag.level}return-1}},{key:"nextBufferRange",get:function(){return this.media?this.followingBufferRange(this.getBufferRange(this.media.currentTime)):null}},{key:"nextLevel",get:function(){var e=this.nextBufferRange;return e?e.frag.level:-1}}]),a}();s.default=y,u.exports=s.default},{"../demux/demuxer":12,"../errors":16,"../events":17,"../helper/level-helper":18,"../utils/binary-search":25,"../utils/logger":26}],6:[function(n,t,e){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function e(i,r){for(var t=0;t<r.length;t++){var e=r[t];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(i,e.key,e)}}return function(t,r,i){return r&&e(t.prototype,r),i&&e(t,i),t}}(),a=function(){function e(h){r(this,e),this._tables=[[[],[],[],[],[]],[[],[],[],[],[]]],this._precompute();var i,s,t,o,l,n=this._tables[0][4],u=this._tables[1],a=h.length,d=1;if(4!==a&&6!==a&&8!==a)throw new Error("Invalid aes key size="+a);for(o=h.slice(0),l=[],this._key=[o,l],i=a;4*a+28>i;i++)t=o[i-1],(i%a===0||8===a&&i%a===4)&&(t=n[t>>>24]<<24^n[t>>16&255]<<16^n[t>>8&255]<<8^n[255&t],i%a===0&&(t=t<<8^t>>>24^d<<24,d=d<<1^283*(d>>7))),o[i]=o[i-a]^t;for(s=0;i;s++,i--)t=o[3&s?i:i-4],4>=i||4>s?l[s]=t:l[s]=u[0][n[t>>>24]]^u[1][n[t>>16&255]]^u[2][n[t>>8&255]]^u[3][n[255&t]]}return i(e,[{key:"_precompute",value:function(){var e,i,r,u,h,d,t,s,l,n=this._tables[0],o=this._tables[1],f=n[4],g=o[4],a=[],c=[];for(e=0;256>e;e++)c[(a[e]=e<<1^283*(e>>7))^e]=e;for(i=r=0;!f[i];i^=u||1,r=c[r]||1)for(t=r^r<<1^r<<2^r<<3^r<<4,t=t>>8^255&t^99,f[i]=t,g[t]=i,d=a[h=a[u=a[i]]],l=16843009*d^65537*h^257*u^16843008*i,s=257*a[t]^16843008*t,e=0;4>e;e++)n[e][i]=s=s<<24^s>>>8,o[e][t]=l=l<<24^l>>>8;for(e=0;5>e;e++)n[e]=n[e].slice(0),o[e]=o[e].slice(0)}},{key:"decrypt",value:function(A,p,_,b,E,m){var f,v,g,n,e=this._key[1],t=A^e[0],i=b^e[1],a=_^e[2],r=p^e[3],y=e.length/4-2,s=4,o=this._tables[1],h=o[0],d=o[1],u=o[2],l=o[3],c=o[4];for(n=0;y>n;n++)f=h[t>>>24]^d[i>>16&255]^u[a>>8&255]^l[255&r]^e[s],v=h[i>>>24]^d[a>>16&255]^u[r>>8&255]^l[255&t]^e[s+1],g=h[a>>>24]^d[r>>16&255]^u[t>>8&255]^l[255&i]^e[s+2],r=h[r>>>24]^d[t>>16&255]^u[i>>8&255]^l[255&a]^e[s+3],s+=4,t=f,i=v,a=g;for(n=0;4>n;n++)E[(3&-n)+m]=c[t>>>24]<<24^c[i>>16&255]<<16^c[a>>8&255]<<8^c[255&r]^e[s++],f=t,t=i,i=a,a=r,r=f}}]),e}();e.default=a,t.exports=e.default},{}],7:[function(t,r,e){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function e(i,r){for(var t=0;t<r.length;t++){var e=r[t];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(i,e.key,e)}}return function(t,r,i){return r&&e(t.prototype,r),i&&e(t,i),t}}(),s=t("./aes"),o=i(s),l=function(){function e(t,r){a(this,e),this.key=t,this.iv=r}return n(e,[{key:"ntoh",value:function(e){return e<<24|(65280&e)<<8|(16711680&e)>>8|e>>>24}},{key:"doDecrypt",value:function(i,v,a){var u,f,s,h,l,c,d,n,e,r=new Int32Array(i.buffer,i.byteOffset,i.byteLength>>2),p=new o.default(Array.prototype.slice.call(v)),g=new Uint8Array(i.byteLength),t=new Int32Array(g.buffer);for(u=~~a[0],f=~~a[1],s=~~a[2],h=~~a[3],e=0;e<r.length;e+=4)l=~~this.ntoh(r[e]),c=~~this.ntoh(r[e+1]),d=~~this.ntoh(r[e+2]),n=~~this.ntoh(r[e+3]),p.decrypt(l,c,d,n,t,e),t[e]=this.ntoh(t[e]^u),t[e+1]=this.ntoh(t[e+1]^f),t[e+2]=this.ntoh(t[e+2]^s),t[e+3]=this.ntoh(t[e+3]^h),u=l,f=c,s=d,h=n;return g}},{key:"localDecript",value:function(e,t,r,i){var a=this.doDecrypt(e,t,r);i.set(a,e.byteOffset)}},{key:"decrypt",value:function(n){var r=32e3,t=new Int32Array(n),i=new Uint8Array(n.byteLength),e=0,s=this.key,a=this.iv;for(this.localDecript(t.subarray(e,e+r),s,a,i),e=r;e<t.length;e+=r)a=new Uint32Array([this.ntoh(t[e-4]),this.ntoh(t[e-3]),this.ntoh(t[e-2]),this.ntoh(t[e-1])]),this.localDecript(t.subarray(e,e+r),s,a,i);return i}}]),e}();e.default=l,r.exports=e.default},{"./aes":6}],8:[function(t,n,r){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(r,"__esModule",{value:!0});var d=function(){function e(i,r){for(var t=0;t<r.length;t++){var e=r[t];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(i,e.key,e)}}return function(t,r,i){return r&&e(t.prototype,r),i&&e(t,i),t}}(),s=t("./aes128-decrypter"),o=u(s),i=t("../errors"),e=t("../utils/logger"),l=function(){function t(r){a(this,t),this.hls=r;try{var e=window?window.crypto:crypto;this.subtle=e.subtle||e.webkitSubtle,this.disableWebCrypto=!this.subtle}catch(e){this.disableWebCrypto=!0}}return d(t,[{key:"destroy",value:function(){}},{key:"decrypt",value:function(e,t,r,i){this.disableWebCrypto&&this.hls.config.enableSoftwareAES?this.decryptBySoftware(e,t,r,i):this.decryptByWebCrypto(e,t,r,i)}},{key:"decryptByWebCrypto",value:function(t,r,i,a){var n=this;e.logger.log("decrypting by WebCrypto API"),this.subtle.importKey("raw",r,{name:"AES-CBC",length:128},!1,["decrypt"]).then(function(e){n.subtle.decrypt({name:"AES-CBC",iv:i.buffer},e,t).then(a).catch(function(e){n.onWebCryptoError(e,t,r,i,a)})}).catch(function(e){n.onWebCryptoError(e,t,r,i,a)})}},{key:"decryptBySoftware",value:function(r,i,a,n){e.logger.log("decrypting by JavaScript Implementation");var t=new DataView(i.buffer),s=new Uint32Array([t.getUint32(0),t.getUint32(4),t.getUint32(8),t.getUint32(12)]);t=new DataView(a.buffer);var l=new Uint32Array([t.getUint32(0),t.getUint32(4),t.getUint32(8),t.getUint32(12)]),u=new o.default(s,l);n(u.decrypt(r).buffer)}},{key:"onWebCryptoError",value:function(t,r,a,n,s){this.hls.config.enableSoftwareAES?(e.logger.log("disabling to use WebCrypto API"),this.disableWebCrypto=!0,this.decryptBySoftware(r,a,n,s)):(e.logger.error("decrypting error : "+t.message),this.hls.trigger(Event.ERROR,{type:i.ErrorTypes.MEDIA_ERROR,details:i.ErrorDetails.FRAG_DECRYPT_ERROR,fatal:!0,reason:t.message}))}}]),t}();r.default=l,n.exports=r.default},{"../errors":16,"../utils/logger":26,"./aes128-decrypter":7}],9:[function(e,n,t){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var d=function(){function e(i,r){for(var t=0;t<r.length;t++){var e=r[t];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(i,e.key,e)}}return function(t,r,i){return r&&e(t.prototype,r),i&&e(t,i),t}}(),r=e("../utils/logger"),o=e("../demux/id3"),i=l(o),a=e("../errors"),s=function(){function e(t,r){u(this,e),this.observer=t,this.remuxerClass=r,this.remuxer=new this.remuxerClass(t),this._aacTrack={type:"audio",id:-1,sequenceNumber:0,samples:[],len:0}}return d(e,[{key:"push",value:function(t,v,b,p,m,E,y,g){var e,l,s,h,n,o,f,c,d=new i.default(t),a=this._aacTrack,u=d.timeStamp;for(e=d.length,l=t.length;l-1>e&&(255!==t[e]||240!==(240&t[e+1]));e++);for(a.audiosamplerate||(s=this._ADTStoAudioConfig(t,e,v),a.config=s.config,a.audiosamplerate=s.samplerate,a.channelCount=s.channelCount,a.codec=s.codec,a.timescale=this.remuxer.timescale,a.duration=this.remuxer.timescale*g,r.logger.log("parsed codec:"+a.codec+",rate:"+s.samplerate+",nb channel:"+s.channelCount)),h=0;l>e+5&&(n=(3&t[e+3])<<11,n|=t[e+4]<<3,n|=(224&t[e+5])>>>5,o=1&t[e+1]?7:9,n-=o,f=Math.round(90*u+1024*h*9e4/a.audiosamplerate),n>0&&l>=e+o+n);)for(c={unit:t.subarray(e+o,e+o+n),pts:f,dts:f},a.samples.push(c),a.len+=n,e+=n+o,h++;l-1>e&&(255!==t[e]||240!==(240&t[e+1]));e++);this.remuxer.remux(this._aacTrack,{samples:[]},{samples:[{pts:u,dts:u,unit:d.payload}]},p)}},{key:"_ADTStoAudioConfig",value:function(l,u,s){var i,e,n,o,t,h=navigator.userAgent.toLowerCase(),d=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350];return i=((192&l[u+2])>>>6)+1,e=(60&l[u+2])>>>2,e>d.length-1?void this.observer.trigger(Event.ERROR,{type:a.ErrorTypes.MEDIA_ERROR,details:a.ErrorDetails.FRAG_PARSING_ERROR,fatal:!0,reason:"invalid ADTS sampling index:"+e}):(o=(1&l[u+2])<<2,o|=(192&l[u+3])>>>6,r.logger.log("manifest codec:"+s+",ADTS data:type:"+i+",sampleingIndex:"+e+"["+d[e]+"Hz],channelConfig:"+o),-1!==h.indexOf("firefox")?e>=6?(i=5,t=new Array(4),n=e-3):(i=2,t=new Array(2),n=e):-1!==h.indexOf("android")?(i=2,t=new Array(2),n=e):(i=5,t=new Array(4),s&&-1!==s.indexOf("mp4a.40.5")||!s&&e>=6?n=e-3:(s&&-1!==s.indexOf("mp4a.40.2")&&(e>=6||1===o)&&(i=2,t=new Array(2)),n=e)),t[0]=i<<3,t[0]|=(14&e)>>1,t[1]|=(1&e)<<7,t[1]|=o<<3,5===i&&(t[1]|=(14&n)>>1,t[2]=(1&n)<<7,t[2]|=8,t[3]=0),{config:t,samplerate:d[e],channelCount:o,codec:"mp4a.40."+i})}},{key:"destroy",value:function(){}}],[{key:"probe",value:function(t){var e,r,a=new i.default(t);if(a.hasTimeStamp)for(e=a.length,r=t.length;r-1>e;e++)if(255===t[e]&&240===(240&t[e+1]))return!0;return!1}}]),e}();t.default=s,n.exports=t.default},{"../demux/id3":14,"../errors":16,"../utils/logger":26}],10:[function(e,o,t){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function d(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var f=function(){function e(i,r){for(var t=0;t<r.length;t++){var e=r[t];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(i,e.key,e)}}return function(t,r,i){return r&&e(t.prototype,r),i&&e(t,i),t}}(),s=e("../events"),c=r(s),i=e("../errors"),u=e("../demux/aacdemuxer"),a=r(u),h=e("../demux/tsdemuxer"),n=r(h),l=function(){function e(t,r){d(this,e),this.hls=t,this.remuxer=r}return f(e,[{key:"destroy",value:function(){var e=this.demuxer;e&&e.destroy()}},{key:"push",value:function(t,r,s,o,l,u,d,h){var e=this.demuxer;if(!e)if(n.default.probe(t))e=this.demuxer=new n.default(this.hls,this.remuxer);else{if(!a.default.probe(t))return void this.hls.trigger(c.default.ERROR,{type:i.ErrorTypes.MEDIA_ERROR,details:i.ErrorDetails.FRAG_PARSING_ERROR,fatal:!0,reason:"no demux matching with content found"});e=this.demuxer=new a.default(this.hls,this.remuxer)}e.push(t,r,s,o,l,u,d,h)}}]),e}();t.default=l,o.exports=t.default},{"../demux/aacdemuxer":9,"../demux/tsdemuxer":15,"../errors":16,"../events":17}],11:[function(t,s,i){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(i,"__esModule",{value:!0});var a=t("../demux/demuxer-inline"),n=r(a),f=t("../events"),e=r(f),l=t("events"),u=r(l),d=t("../remux/mp4-remuxer"),h=r(d),o=function(r){var t=new u.default;t.trigger=function(i){for(var r=arguments.length,a=Array(r>1?r-1:0),e=1;r>e;e++)a[e-1]=arguments[e];t.emit.apply(t,[i,i].concat(a))},t.off=function(a){for(var r=arguments.length,i=Array(r>1?r-1:0),e=1;r>e;e++)i[e-1]=arguments[e];t.removeListener.apply(t,[a].concat(i))},r.addEventListener("message",function(i){switch(i.data.cmd){case"init":r.demuxer=new n.default(t,h.default);break;case"demux":var e=i.data;r.demuxer.push(new Uint8Array(e.data),e.audioCodec,e.videoCodec,e.timeOffset,e.cc,e.level,e.sn,e.duration)}}),t.on(e.default.FRAG_PARSING_INIT_SEGMENT,function(a,t){var e={event:a},i=[];t.audioCodec&&(e.audioCodec=t.audioCodec,e.audioMoov=t.audioMoov.buffer,e.audioChannelCount=t.audioChannelCount,i.push(e.audioMoov)),t.videoCodec&&(e.videoCodec=t.videoCodec,e.videoMoov=t.videoMoov.buffer,e.videoWidth=t.videoWidth,e.videoHeight=t.videoHeight,i.push(e.videoMoov)),r.postMessage(e,i)}),t.on(e.default.FRAG_PARSING_DATA,function(i,e){var t={event:i,type:e.type,startPTS:e.startPTS,endPTS:e.endPTS,startDTS:e.startDTS,endDTS:e.endDTS,moof:e.moof.buffer,mdat:e.mdat.buffer,nb:e.nb};r.postMessage(t,[t.moof,t.mdat])}),t.on(e.default.FRAG_PARSED,function(e){r.postMessage({event:e})}),t.on(e.default.ERROR,function(e,t){r.postMessage({event:e,data:t})}),t.on(e.default.FRAG_PARSING_METADATA,function(e,t){var i={event:e,samples:t.samples};r.postMessage(i)})};i.default=o,s.exports=i.default},{"../demux/demuxer-inline":10,"../events":17,"../remux/mp4-remuxer":24,events:1}],12:[function(e,u,i){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function g(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(i,"__esModule",{value:!0});var o=function(){function e(i,r){for(var t=0;t<r.length;t++){var e=r[t];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(i,e.key,e)}}return function(t,r,i){return r&&e(t.prototype,r),i&&e(t,i),t}}(),l=e("../events"),t=r(l),f=e("../demux/demuxer-inline"),s=r(f),d=e("../demux/demuxer-worker"),h=r(d),n=e("../utils/logger"),c=e("../remux/mp4-remuxer"),a=r(c),v=e("../crypt/decrypter"),p=r(v),y=function(){function r(t){if(g(this,r),this.hls=t,t.config.enableWorker&&"undefined"!=typeof Worker){n.logger.log("demuxing in webworker");try{var i=e("webworkify");this.w=i(h.default),this.onwmsg=this.onWorkerMessage.bind(this),this.w.addEventListener("message",this.onwmsg),this.w.postMessage({cmd:"init"})}catch(e){n.logger.error("error while initializing DemuxerWorker, fallback on DemuxerInline"),this.demuxer=new s.default(t,a.default)}}else this.demuxer=new s.default(t,a.default);this.demuxInitialized=!0}return o(r,[{key:"destroy",value:function(){this.w?(this.w.removeEventListener("message",this.onwmsg),this.w.terminate(),this.w=null):(this.demuxer.destroy(),this.demuxer=null),this.decrypter&&(this.decrypter.destroy(),this.decrypter=null)}},{key:"pushDecrypted",value:function(e,t,r,i,a,n,s,o){this.w?this.w.postMessage({cmd:"demux",data:e,audioCodec:t,videoCodec:r,timeOffset:i,cc:a,level:n,sn:s,duration:o},[e]):this.demuxer.push(new Uint8Array(e),t,r,i,a,n,s,o)}},{key:"push",value:function(t,r,i,a,n,s,o,l,e){if(t.byteLength>0&&null!=e&&null!=e.key&&"AES-128"===e.method){null==this.decrypter&&(this.decrypter=new p.default(this.hls));var u=this;this.decrypter.decrypt(t,e.key,e.iv,function(e){u.pushDecrypted(e,r,i,a,n,s,o,l)})}else this.pushDecrypted(t,r,i,a,n,s,o,l)}},{key:"onWorkerMessage",value:function(e){switch(e.data.event){case t.default.FRAG_PARSING_INIT_SEGMENT:var r={};e.data.audioMoov&&(r.audioMoov=new Uint8Array(e.data.audioMoov),r.audioCodec=e.data.audioCodec,r.audioChannelCount=e.data.audioChannelCount),e.data.videoMoov&&(r.videoMoov=new Uint8Array(e.data.videoMoov),r.videoCodec=e.data.videoCodec,r.videoWidth=e.data.videoWidth,r.videoHeight=e.data.videoHeight),this.hls.trigger(t.default.FRAG_PARSING_INIT_SEGMENT,r);break;case t.default.FRAG_PARSING_DATA:this.hls.trigger(t.default.FRAG_PARSING_DATA,{moof:new Uint8Array(e.data.moof),mdat:new Uint8Array(e.data.mdat),startPTS:e.data.startPTS,endPTS:e.data.endPTS,startDTS:e.data.startDTS,endDTS:e.data.endDTS,type:e.data.type,nb:e.data.nb});break;case t.default.FRAG_PARSING_METADATA:this.hls.trigger(t.default.FRAG_PARSING_METADATA,{samples:e.data.samples});break;default:this.hls.trigger(e.data.event,e.data.data)}}}]),r}();i.default=y,u.exports=i.default},{"../crypt/decrypter":8,"../demux/demuxer-inline":10,"../demux/demuxer-worker":11,"../events":17,"../remux/mp4-remuxer":24,"../utils/logger":26,webworkify:2}],13:[function(t,r,e){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function e(i,r){for(var t=0;t<r.length;t++){var e=r[t];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(i,e.key,e)}}return function(t,r,i){return r&&e(t.prototype,r),i&&e(t,i),t}}(),n=t("../utils/logger"),s=function(){function e(t){i(this,e),this.data=t,this.bytesAvailable=this.data.byteLength,this.word=0,this.bitsAvailable=0}return a(e,[{key:"loadWord",value:function(){var t=this.data.byteLength-this.bytesAvailable,r=new Uint8Array(4),e=Math.min(4,this.bytesAvailable);if(0===e)throw new Error("no bytes available");r.set(this.data.subarray(t,t+e)),this.word=new DataView(r.buffer).getUint32(0),this.bitsAvailable=8*e,this.bytesAvailable-=e}},{key:"skipBits",value:function(e){var t;this.bitsAvailable>e?(this.word<<=e,this.bitsAvailable-=e):(e-=this.bitsAvailable,t=e>>3,e-=t>>3,this.bytesAvailable-=t,this.loadWord(),this.word<<=e,this.bitsAvailable-=e)}},{key:"readBits",value:function(t){var e=Math.min(this.bitsAvailable,t),r=this.word>>>32-e;return t>32&&n.logger.error("Cannot read more than 32 bits at a time"),this.bitsAvailable-=e,this.bitsAvailable>0?this.word<<=e:this.bytesAvailable>0&&this.loadWord(),e=t-e,e>0?r<<e|this.readBits(e):r}},{key:"skipLZ",value:function(){var e;for(e=0;e<this.bitsAvailable;++e)if(0!==(this.word&2147483648>>>e))return this.word<<=e,this.bitsAvailable-=e,e;return this.loadWord(),e+this.skipLZ()}},{key:"skipUEG",value:function(){this.skipBits(1+this.skipLZ())}},{key:"skipEG",value:function(){this.skipBits(1+this.skipLZ())}},{key:"readUEG",value:function(){var e=this.skipLZ();return this.readBits(e+1)-1}},{key:"readEG",value:function(){var e=this.readUEG();return 1&e?1+e>>>1:-1*(e>>>1)}},{key:"readBoolean",value:function(){return 1===this.readBits(1)}},{key:"readUByte",value:function(){return this.readBits(8)}},{key:"skipScalingList",value:function(a){var t,i,r=8,e=8;for(t=0;a>t;t++)0!==e&&(i=this.readEG(),e=(r+i+256)%256),r=0===e?r:e}},{key:"readSPS",value:function(){var r,v,p,l,a,n,i,o,t,s=0,d=0,h=0,f=0,c=1;if(this.readUByte(),r=this.readUByte(),v=this.readBits(5),this.skipBits(3),p=this.readUByte(),this.skipUEG(),100===r||110===r||122===r||144===r){var g=this.readUEG();if(3===g&&this.skipBits(1),this.skipUEG(),this.skipUEG(),this.skipBits(1),this.readBoolean())for(o=3!==g?8:12,t=0;o>t;t++)this.readBoolean()&&(6>t?this.skipScalingList(16):this.skipScalingList(64))}this.skipUEG();var u=this.readUEG();if(0===u)this.readUEG();else if(1===u)for(this.skipBits(1),this.skipEG(),this.skipEG(),l=this.readUEG(),t=0;l>t;t++)this.skipEG();if(this.skipUEG(),this.skipBits(1),a=this.readUEG(),n=this.readUEG(),i=this.readBits(1),0===i&&this.skipBits(1),this.skipBits(1),this.readBoolean()&&(s=this.readUEG(),d=this.readUEG(),h=this.readUEG(),f=this.readUEG()),this.readBoolean()&&this.readBoolean()){var e=void 0,y=this.readUByte();switch(y){case 2:e=[12,11];break;case 3:e=[10,11];break;case 4:e=[16,11];break;case 5:e=[40,33];break;case 6:e=[24,11];break;case 7:e=[20,11];break;case 8:e=[32,11];break;case 9:e=[80,33];break;case 10:e=[18,11];break;case 11:e=[15,11];break;case 12:e=[64,33];break;case 13:e=[160,99];break;case 14:e=[4,3];break;case 15:e=[3,2];break;case 16:e=[2,1];break;case 255:e=[this.readUByte()<<8|this.readUByte(),this.readUByte()<<8|this.readUByte()]}e&&(c=e[0]/e[1])}return{width:(16*(a+1)-2*s-2*d)*c,height:(2-i)*(n+1)*16-(i?2:4)*(h+f)}}},{key:"readSliceType",value:function(){return this.readUByte(),this.readUEG(),this.readUEG()}}]),e}();e.default=s,r.exports=e.default},{"../utils/logger":26}],14:[function(r,i,e){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function e(i,r){for(var t=0;t<r.length;t++){var e=r[t];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(i,e.key,e)}}return function(t,r,i){return r&&e(t.prototype,r),i&&e(t,i),t}}(),t=r("../utils/logger"),s=function(){function e(i){a(this,e),this._hasTimeStamp=!1;for(var l,u,d,h,f,s,o,n,r=0;;)if(o=this.readUTF(i,r,3),r+=3,"ID3"===o)r+=3,l=127&i[r++],u=127&i[r++],d=127&i[r++],h=127&i[r++],f=(l<<21)+(u<<14)+(d<<7)+h,s=r+f,this._parseID3Frames(i,r,s),r=s;else{if("3DI"!==o)return r-=3,n=r,void(n&&(this.hasTimeStamp||t.logger.warn("ID3 tag found, but no timestamp"),this._length=n,this._payload=i.subarray(0,n)));r+=7,t.logger.log("3DI footer found, end: "+r)}}return n(e,[{key:"readUTF",value:function(i,e,a){var t="",r=e,n=e+a;do t+=String.fromCharCode(i[r++]);while(n>r);return t}},{key:"_parseID3Frames",value:function(r,e,n){for(var a,s,o,l,i;n>=e+8;)switch(a=this.readUTF(r,e,4),e+=4,s=r[e++]<<24+r[e++]<<16+r[e++]<<8+r[e++],l=r[e++]<<8+r[e++],o=e,a){case"PRIV":if("com.apple.streaming.transportStreamTimestamp"===this.readUTF(r,e,44)){e+=44,e+=4;var u=1&r[e++];this._hasTimeStamp=!0,i=((r[e++]<<23)+(r[e++]<<15)+(r[e++]<<7)+r[e++])/45,u&&(i+=47721858.84),i=Math.round(i),t.logger.trace("ID3 timestamp found: "+i),this._timeStamp=i}}}},{key:"hasTimeStamp",get:function(){return this._hasTimeStamp}},{key:"timeStamp",get:function(){return this._timeStamp}},{key:"length",get:function(){return this._length}},{key:"payload",get:function(){return this._payload}}]),e}();e.default=s,i.exports=e.default},{"../utils/logger":26}],15:[function(r,s,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function d(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(i,"__esModule",{value:!0});var h=function(){function e(i,r){for(var t=0;t<r.length;t++){var e=r[t];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(i,e.key,e)}}return function(t,r,i){return r&&e(t.prototype,r),i&&e(t,i),t}}(),f=r("../events"),a=n(f),l=r("./exp-golomb"),u=n(l),e=r("../utils/logger"),t=r("../errors"),o=function(){function r(e,t){d(this,r),this.observer=e,this.remuxerClass=t,this.lastCC=0,this.PES_TIMESCALE=9e4,this.remuxer=new this.remuxerClass(e)}return h(r,[{key:"switchLevel",value:function(){this.pmtParsed=!1,this._pmtId=-1,this._avcTrack={type:"video",id:-1,sequenceNumber:0,samples:[],len:0,nbNalu:0},this._aacTrack={type:"audio",id:-1,sequenceNumber:0,samples:[],len:0},this._id3Track={type:"id3",id:-1,sequenceNumber:0,samples:[],len:0},this.remuxer.switchLevel()}},{key:"insertDiscontinuity",value:function(){this.switchLevel(),this.remuxer.insertDiscontinuity()}},{key:"push",value:function(i,R,E,A,f,h,v,_){var l,o,s,r,d,u,y,n,b=i.length;this.audioCodec=R,this.videoCodec=E,this.timeOffset=A,this._duration=_,this.contiguous=!1,f!==this.lastCC?(e.logger.log("discontinuity detected"),this.insertDiscontinuity(),this.lastCC=f):h!==this.lastLevel?(e.logger.log("level switch detected"),this.switchLevel(),this.lastLevel=h):v===this.lastSN+1&&(this.contiguous=!0),this.lastSN=v,this.contiguous||(this.aacOverFlow=null);var p=this.pmtParsed,g=this._avcTrack.id,c=this._aacTrack.id,m=this._id3Track.id;for(r=0;b>r;r+=188)if(71===i[r]){if(d=!!(64&i[r+1]),u=((31&i[r+1])<<8)+i[r+2],y=(48&i[r+3])>>4,y>1){if(n=r+5+i[r+4],n===r+188)continue}else n=r+4;p?u===g?(d&&(l&&this._parseAVCPES(this._parsePES(l)),l={data:[],size:0}),l&&(l.data.push(i.subarray(n,r+188)),l.size+=r+188-n)):u===c?(d&&(o&&this._parseAACPES(this._parsePES(o)),o={data:[],size:0}),o&&(o.data.push(i.subarray(n,r+188)),o.size+=r+188-n)):u===m&&(d&&(s&&this._parseID3PES(this._parsePES(s)),s={data:[],size:0}),s&&(s.data.push(i.subarray(n,r+188)),s.size+=r+188-n)):(d&&(n+=i[n]+1),0===u?this._parsePAT(i,n):u===this._pmtId&&(this._parsePMT(i,n),p=this.pmtParsed=!0,g=this._avcTrack.id,c=this._aacTrack.id,m=this._id3Track.id))}else this.observer.trigger(a.default.ERROR,{type:t.ErrorTypes.MEDIA_ERROR,details:t.ErrorDetails.FRAG_PARSING_ERROR,fatal:!1,reason:"TS packet did not start with 0x47"});l&&this._parseAVCPES(this._parsePES(l)),o&&this._parseAACPES(this._parsePES(o)),s&&this._parseID3PES(this._parsePES(s)),this.remux()}},{key:"remux",value:function(){this.remuxer.remux(this._aacTrack,this._avcTrack,this._id3Track,this.timeOffset,this.contiguous)}},{key:"destroy",value:function(){this.switchLevel(),this._initPTS=this._initDTS=void 0,this._duration=0}},{key:"_parsePAT",value:function(e,t){this._pmtId=(31&e[t+10])<<8|e[t+11]}},{key:"_parsePMT",value:function(r,t){var a,n,s,i;for(a=(15&r[t+1])<<8|r[t+2],n=t+3+a-4,s=(15&r[t+10])<<8|r[t+11],t+=12+s;n>t;){switch(i=(31&r[t+1])<<8|r[t+2],r[t]){case 15:this._aacTrack.id=i;break;case 21:this._id3Track.id=i;break;case 27:this._avcTrack.id=i;break;default:e.logger.log("unkown stream type:"+r[t])}t+=((15&r[t+3])<<8|r[t+4])+5}}},{key:"_parsePES",value:function(t){var e,a,u,o,d,n,r,i,s,l=0;if(e=t.data[0],u=(e[0]<<16)+(e[1]<<8)+e[2],1===u){for(o=(e[4]<<8)+e[5],a=e[7],192&a&&(r=536870912*(14&e[9])+4194304*(255&e[10])+16384*(254&e[11])+128*(255&e[12])+(254&e[13])/2,r>4294967295&&(r-=8589934592),64&a?(i=536870912*(14&e[14])+4194304*(255&e[15])+16384*(254&e[16])+128*(255&e[17])+(254&e[18])/2,i>4294967295&&(i-=8589934592)):i=r),d=e[8],s=d+9,t.data[0]=t.data[0].subarray(s),t.size-=s,n=new Uint8Array(t.size);t.data.length;)e=t.data.shift(),n.set(e,l),l+=e.byteLength;return{data:n,pts:r,dts:i,len:o}}return null}},{key:"_parseAVCPES",value:function(a){var v,i,h=this,t=this._avcTrack,l=t.samples,p=this._parseAVCNALu(a.data),s=[],n=!1,g=!1,f=0;if(0===p.length&&l.length>0){var c=l[l.length-1],o=c.units.units[c.units.units.length-1],d=new Uint8Array(o.data.byteLength+a.data.byteLength);d.set(o.data,0),d.set(a.data,o.data.byteLength),o.data=d,c.units.length+=a.data.byteLength,t.len+=a.data.byteLength}a.data=null;var r="";p.forEach(function(e){switch(e.type){case 1:i=!0,n&&(r+="NDR ");break;case 5:i=!0,n&&(r+="IDR "),g=!0;break;case 6:i=!0,n&&(r+="SEI ");break;case 7:if(i=!0,n&&(r+="SPS "),!t.sps){var c=new u.default(e.data),l=c.readSPS();t.width=l.width,t.height=l.height,t.sps=[e.data],t.timescale=h.remuxer.timescale,t.duration=h.remuxer.timescale*h._duration;for(var v=e.data.subarray(1,4),d="avc1.",o=0;3>o;o++){var a=v[o].toString(16);a.length<2&&(a="0"+a),d+=a}t.codec=d}break;case 8:i=!0,n&&(r+="PPS "),t.pps||(t.pps=[e.data]);break;case 9:i=!0,n&&(r+="AUD ");break;default:i=!1,r+="unknown NAL "+e.type+" "}i&&(s.push(e),f+=e.data.byteLength)}),(n||r.length)&&e.logger.log(r),s.length&&(g===!0||t.sps)&&(v={units:{units:s,length:f},pts:a.pts,dts:a.dts,key:g},l.push(v),t.len+=f,t.nbNalu+=s.length)}},{key:"_parseAVCNALu",value:function(i){for(var n,r,o,s,a,u,t=0,d=i.byteLength,e=0,h=[];d>t;)switch(n=i[t++],e){case 0:0===n&&(e=1);break;case 1:e=0===n?2:0;break;case 2:case 3:if(0===n)e=3;else if(1===n){if(s=31&i[t],a)o={data:i.subarray(a,t-e-1),type:u},h.push(o);else if(r=t-e-1,r&&this._avcTrack.samples.length){var f=this._avcTrack.samples[this._avcTrack.samples.length-1],l=f.units.units[f.units.units.length-1],c=new Uint8Array(l.data.byteLength+r);c.set(l.data,0),c.set(i.subarray(0,r),l.data.byteLength),l.data=c,f.units.length+=r,this._avcTrack.len+=r}a=t,u=s,(1===s||5===s)&&(t=d),e=0}else e=0}return a&&(o={data:i.subarray(a,d),type:u},h.push(o)),h}},{key:"_parseAACPES",value:function(p){var v,l,n,r,u,f,h,o,s=this._aacTrack,i=p.data;if(this.aacOverFlow){var g=new Uint8Array(this.aacOverFlow.byteLength+i.byteLength);g.set(this.aacOverFlow,0),g.set(i,this.aacOverFlow.byteLength),i=g}for(r=0,o=i.length;o-1>r&&(255!==i[r]||240!==(240&i[r+1]));r++);if(r){var c,d;if(o-1>r?(c="AAC PES did not start with ADTS header,offset:"+r,d=!1):(c="no ADTS header found in AAC PES",d=!0),this.observer.trigger(a.default.ERROR,{type:t.ErrorTypes.MEDIA_ERROR,details:t.ErrorDetails.FRAG_PARSING_ERROR,fatal:d,reason:c}),d)return}for(s.audiosamplerate||(l=this._ADTStoAudioConfig(i,r,this.audioCodec),s.config=l.config,s.audiosamplerate=l.samplerate,s.channelCount=l.channelCount,s.codec=l.codec,s.timescale=this.remuxer.timescale,s.duration=this.remuxer.timescale*this._duration,e.logger.log("parsed codec:"+s.codec+",rate:"+l.samplerate+",nb channel:"+l.channelCount)),h=0;o>r+5&&(n=(3&i[r+3])<<11,n|=i[r+4]<<3,n|=(224&i[r+5])>>>5,u=1&i[r+1]?7:9,n-=u,f=Math.round(p.pts+1024*h*this.PES_TIMESCALE/s.audiosamplerate),n>0&&o>=r+u+n);)for(v={unit:i.subarray(r+u,r+u+n),pts:f,dts:f},this._aacTrack.samples.push(v),this._aacTrack.len+=n,r+=n+u,h++;o-1>r&&(255!==i[r]||240!==(240&i[r+1]));r++);o>r?this.aacOverFlow=i.subarray(r,o):this.aacOverFlow=null}},{key:"_ADTStoAudioConfig",value:function(u,d,s){var n,r,o,l,i,f=navigator.userAgent.toLowerCase(),h=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350];return n=((192&u[d+2])>>>6)+1,r=(60&u[d+2])>>>2,r>h.length-1?void this.observer.trigger(a.default.ERROR,{type:t.ErrorTypes.MEDIA_ERROR,details:t.ErrorDetails.FRAG_PARSING_ERROR,fatal:!0,reason:"invalid ADTS sampling index:"+r}):(l=(1&u[d+2])<<2,l|=(192&u[d+3])>>>6,e.logger.log("manifest codec:"+s+",ADTS data:type:"+n+",sampleingIndex:"+r+"["+h[r]+"Hz],channelConfig:"+l),-1!==f.indexOf("firefox")?r>=6?(n=5,i=new Array(4),o=r-3):(n=2,i=new Array(2),o=r):-1!==f.indexOf("android")?(n=2,i=new Array(2),o=r):(n=5,i=new Array(4),s&&(-1!==s.indexOf("mp4a.40.29")||-1!==s.indexOf("mp4a.40.5"))||!s&&r>=6?o=r-3:((s&&-1!==s.indexOf("mp4a.40.2")&&(r>=6||1===l)||!s&&1===l)&&(n=2,i=new Array(2)),o=r)),i[0]=n<<3,i[0]|=(14&r)>>1,i[1]|=(1&r)<<7,i[1]|=l<<3,5===n&&(i[1]|=(14&o)>>1,i[2]=(1&o)<<7,i[2]|=8,i[3]=0),{config:i,samplerate:h[r],channelCount:l,codec:"mp4a.40."+n})}},{key:"_parseID3PES",value:function(e){this._id3Track.samples.push(e)}}],[{key:"probe",value:function(e){return e.length>=564&&71===e[0]&&71===e[188]&&71===e[376]?!0:!1}}]),r}();i.default=o,s.exports=i.default},{"../errors":16,"../events":17,"../utils/logger":26,"./exp-golomb":13}],16:[function(i,a,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t={NETWORK_ERROR:"hlsNetworkError",MEDIA_ERROR:"hlsMediaError",OTHER_ERROR:"hlsOtherError"};e.ErrorTypes=t;var r={MANIFEST_LOAD_ERROR:"manifestLoadError",MANIFEST_LOAD_TIMEOUT:"manifestLoadTimeOut",MANIFEST_PARSING_ERROR:"manifestParsingError",LEVEL_LOAD_ERROR:"levelLoadError",LEVEL_LOAD_TIMEOUT:"levelLoadTimeOut",LEVEL_SWITCH_ERROR:"levelSwitchError",FRAG_LOAD_ERROR:"fragLoadError",FRAG_LOOP_LOADING_ERROR:"fragLoopLoadingError",FRAG_LOAD_TIMEOUT:"fragLoadTimeOut",FRAG_DECRYPT_ERROR:"fragDecryptError",FRAG_PARSING_ERROR:"fragParsingError",KEY_LOAD_ERROR:"keyLoadError",KEY_LOAD_TIMEOUT:"keyLoadTimeOut",BUFFER_APPEND_ERROR:"bufferAppendError",BUFFER_APPENDING_ERROR:"bufferAppendingError"};e.ErrorDetails=r},{}],17:[function(r,t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={MEDIA_ATTACHING:"hlsMediaAttaching",MEDIA_ATTACHED:"hlsMediaAttached",MEDIA_DETACHING:"hlsMediaDetaching",MEDIA_DETACHED:"hlsMediaDetached",MANIFEST_LOADING:"hlsManifestLoading",MANIFEST_LOADED:"hlsManifestLoaded",MANIFEST_PARSED:"hlsManifestParsed",LEVEL_LOADING:"hlsLevelLoading",LEVEL_LOADED:"hlsLevelLoaded",LEVEL_UPDATED:"hlsLevelUpdated",LEVEL_PTS_UPDATED:"hlsPTSUpdated",LEVEL_SWITCH:"hlsLevelSwitch",FRAG_LOADING:"hlsFragLoading",FRAG_LOAD_PROGRESS:"hlsFragLoadProgress",FRAG_LOAD_EMERGENCY_ABORTED:"hlsFragLoadEmergencyAborted",FRAG_LOADED:"hlsFragLoaded",FRAG_PARSING_INIT_SEGMENT:"hlsFragParsingInitSegment",FRAG_PARSING_METADATA:"hlsFraParsingMetadata",FRAG_PARSING_DATA:"hlsFragParsingData",FRAG_PARSED:"hlsFragParsed",FRAG_BUFFERED:"hlsFragBuffered",FRAG_CHANGED:"hlsFragChanged",FPS_DROP:"hlsFPSDrop",ERROR:"hlsError",DESTROYING:"hlsDestroying",KEY_LOADING:"hlsKeyLoading",KEY_LOADED:"hlsKeyLoaded"},t.exports=e.default},{}],18:[function(r,i,e){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function e(i,r){for(var t=0;t<r.length;t++){var e=r[t];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(i,e.key,e)}}return function(t,r,i){return r&&e(t.prototype,r),i&&e(t,i),t}}(),t=r("../utils/logger"),s=function(){function e(){a(this,e)}return n(e,null,[{key:"mergeDetails",value:function(n,i){var s,c=Math.max(n.startSN,i.startSN)-i.startSN,d=Math.min(n.endSN,i.endSN)-i.startSN,h=i.startSN-n.startSN,f=n.fragments,o=i.fragments,u=0;
if(c>d)return void(i.PTSKnown=!1);for(var r=c;d>=r;r++){var l=f[h+r],a=o[r];u=l.cc-a.cc,isNaN(l.startPTS)||(a.start=a.startPTS=l.startPTS,a.endPTS=l.endPTS,a.duration=l.duration,s=a)}if(u)for(t.logger.log("discontinuity sliding from playlist, take drift into account"),r=0;r<o.length;r++)o[r].cc+=u;if(s)e.updateFragPTS(i,s.sn,s.startPTS,s.endPTS);else{var g=f[h].start;for(r=0;r<o.length;r++)o[r].start+=g}i.PTSKnown=n.PTSKnown}},{key:"updateFragPTS",value:function(i,l,a,s){var o,n,r,t;if(l<i.startSN||l>i.endSN)return 0;o=l-i.startSN,n=i.fragments,r=n[o],isNaN(r.startPTS)||(a=Math.max(a,r.startPTS),s=Math.min(s,r.endPTS));var u=a-r.start;for(r.start=r.startPTS=a,r.endPTS=s,r.duration=s-a,t=o;t>0;t--)e.updatePTS(n,t,t-1);for(t=o;t<n.length-1;t++)e.updatePTS(n,t,t+1);return i.PTSKnown=!0,u}},{key:"updatePTS",value:function(s,i,a){var e=s[i],r=s[a],n=r.startPTS;isNaN(n)?a>i?r.start=e.start+e.duration:r.start=e.start-r.duration:a>i?(e.duration=n-e.start,e.duration<0&&t.logger.error("negative duration computed for "+e+", there should be some duration drift between playlist and fragment!")):(r.duration=e.start-n,r.duration<0&&t.logger.error("negative duration computed for "+r+", there should be some duration drift between playlist and fragment!"))}}]),e}();e.default=s,i.exports=e.default},{"../utils/logger":26}],19:[function(t,c,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(a,"__esModule",{value:!0});var n=function(){function e(i,r){for(var t=0;t<r.length;t++){var e=r[t];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(i,e.key,e)}}return function(t,r,i){return r&&e(t.prototype,r),i&&e(t,i),t}}(),E=t("./events"),i=r(E),s=t("./errors"),u=t("./loader/playlist-loader"),d=r(u),h=t("./loader/fragment-loader"),f=r(h),T=t("./controller/abr-controller"),g=r(T),v=t("./controller/mse-media-controller"),p=r(v),y=t("./controller/level-controller"),m=r(y),e=t("./utils/logger"),b=t("./utils/xhr-loader"),_=r(b),A=t("events"),R=r(A),L=t("./loader/key-loader"),S=r(L),l=function(){function t(){var i=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];o(this,t);var n={autoStartLoad:!0,debug:!1,maxBufferLength:30,maxBufferSize:6e7,liveSyncDurationCount:3,liveMaxLatencyDurationCount:1/0,maxMaxBufferLength:600,enableWorker:!0,enableSoftwareAES:!0,fragLoadingTimeOut:2e4,fragLoadingMaxRetry:1,fragLoadingRetryDelay:1e3,fragLoadingLoopThreshold:3,manifestLoadingTimeOut:1e4,manifestLoadingMaxRetry:1,manifestLoadingRetryDelay:1e3,appendErrorMaxRetry:3,loader:_.default,fLoader:void 0,pLoader:void 0,abrController:g.default,mediaController:p.default};for(var a in n)a in i||(i[a]=n[a]);if(void 0!==i.liveMaxLatencyDurationCount&&i.liveMaxLatencyDurationCount<=i.liveSyncDurationCount)throw new Error('Illegal hls.js config: "liveMaxLatencyDurationCount" must be gt "liveSyncDurationCount"');(0,e.enableLogs)(i.debug),this.config=i;var r=this.observer=new R.default;r.trigger=function(i){for(var t=arguments.length,a=Array(t>1?t-1:0),e=1;t>e;e++)a[e-1]=arguments[e];r.emit.apply(r,[i,i].concat(a))},r.off=function(a){for(var t=arguments.length,i=Array(t>1?t-1:0),e=1;t>e;e++)i[e-1]=arguments[e];r.removeListener.apply(r,[a].concat(i))},this.on=r.on.bind(r),this.off=r.off.bind(r),this.trigger=r.trigger.bind(r),this.playlistLoader=new d.default(this),this.fragmentLoader=new f.default(this),this.levelController=new m.default(this),this.abrController=new i.abrController(this),this.mediaController=new i.mediaController(this),this.keyLoader=new S.default(this)}return n(t,null,[{key:"isSupported",value:function(){return window.MediaSource&&window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"')}},{key:"Events",get:function(){return i.default}},{key:"ErrorTypes",get:function(){return s.ErrorTypes}},{key:"ErrorDetails",get:function(){return s.ErrorDetails}}]),n(t,[{key:"destroy",value:function(){e.logger.log("destroy"),this.trigger(i.default.DESTROYING),this.detachMedia(),this.playlistLoader.destroy(),this.fragmentLoader.destroy(),this.levelController.destroy(),this.mediaController.destroy(),this.keyLoader.destroy(),this.url=null,this.observer.removeAllListeners()}},{key:"attachMedia",value:function(t){e.logger.log("attachMedia"),this.media=t,this.trigger(i.default.MEDIA_ATTACHING,{media:t})}},{key:"detachMedia",value:function(){e.logger.log("detachMedia"),this.trigger(i.default.MEDIA_DETACHING),this.media=null}},{key:"loadSource",value:function(t){e.logger.log("loadSource:"+t),this.url=t,this.trigger(i.default.MANIFEST_LOADING,{url:t})}},{key:"startLoad",value:function(){e.logger.log("startLoad"),this.mediaController.startLoad()}},{key:"swapAudioCodec",value:function(){e.logger.log("swapAudioCodec"),this.mediaController.swapAudioCodec()}},{key:"recoverMediaError",value:function(){e.logger.log("recoverMediaError");var t=this.media;this.detachMedia(),this.attachMedia(t)}},{key:"levels",get:function(){return this.levelController.levels}},{key:"currentLevel",get:function(){return this.mediaController.currentLevel},set:function(t){e.logger.log("set currentLevel:"+t),this.loadLevel=t,this.mediaController.immediateLevelSwitch()}},{key:"nextLevel",get:function(){return this.mediaController.nextLevel},set:function(t){e.logger.log("set nextLevel:"+t),this.levelController.manualLevel=t,this.mediaController.nextLevelSwitch()}},{key:"loadLevel",get:function(){return this.levelController.level},set:function(t){e.logger.log("set loadLevel:"+t),this.levelController.manualLevel=t}},{key:"nextLoadLevel",get:function(){return this.levelController.nextLoadLevel()},set:function(e){this.levelController.level=e}},{key:"firstLevel",get:function(){return this.levelController.firstLevel},set:function(t){e.logger.log("set firstLevel:"+t),this.levelController.firstLevel=t}},{key:"startLevel",get:function(){return this.levelController.startLevel},set:function(t){e.logger.log("set startLevel:"+t),this.levelController.startLevel=t}},{key:"autoLevelCapping",get:function(){return this.abrController.autoLevelCapping},set:function(t){e.logger.log("set autoLevelCapping:"+t),this.abrController.autoLevelCapping=t}},{key:"autoLevelEnabled",get:function(){return-1===this.levelController.manualLevel}},{key:"manualLevel",get:function(){return this.levelController.manualLevel}}]),t}();a.default=l,c.exports=a.default},{"./controller/abr-controller":3,"./controller/level-controller":4,"./controller/mse-media-controller":5,"./errors":16,"./events":17,"./loader/fragment-loader":20,"./loader/key-loader":21,"./loader/playlist-loader":22,"./utils/logger":26,"./utils/xhr-loader":28,events:1}],20:[function(i,a,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(r,"__esModule",{value:!0});var o=function(){function e(i,r){for(var t=0;t<r.length;t++){var e=r[t];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(i,e.key,e)}}return function(t,r,i){return r&&e(t.prototype,r),i&&e(t,i),t}}(),l=i("../events"),e=n(l),t=i("../errors"),u=function(){function r(t){s(this,r),this.hls=t,this.onfl=this.onFragLoading.bind(this),t.on(e.default.FRAG_LOADING,this.onfl)}return o(r,[{key:"destroy",value:function(){this.loader&&(this.loader.destroy(),this.loader=null),this.hls.off(e.default.FRAG_LOADING,this.onfl)}},{key:"onFragLoading",value:function(i,r){var t=r.frag;this.frag=t,this.frag.loaded=0;var e=this.hls.config;t.loader=this.loader="undefined"!=typeof e.fLoader?new e.fLoader(e):new e.loader(e),this.loader.load(t.url,"arraybuffer",this.loadsuccess.bind(this),this.loaderror.bind(this),this.loadtimeout.bind(this),e.fragLoadingTimeOut,e.fragLoadingMaxRetry,e.fragLoadingRetryDelay,this.loadprogress.bind(this),t)}},{key:"loadsuccess",value:function(i,t){var r=i.currentTarget.response;t.length=r.byteLength,this.frag.loader=void 0,this.hls.trigger(e.default.FRAG_LOADED,{payload:r,frag:this.frag,stats:t})}},{key:"loaderror",value:function(r){this.loader.abort(),this.hls.trigger(e.default.ERROR,{type:t.ErrorTypes.NETWORK_ERROR,details:t.ErrorDetails.FRAG_LOAD_ERROR,fatal:!1,frag:this.frag,response:r})}},{key:"loadtimeout",value:function(){this.loader.abort(),this.hls.trigger(e.default.ERROR,{type:t.ErrorTypes.NETWORK_ERROR,details:t.ErrorDetails.FRAG_LOAD_TIMEOUT,fatal:!1,frag:this.frag})}},{key:"loadprogress",value:function(r,t){this.frag.loaded=t.loaded,this.hls.trigger(e.default.FRAG_LOAD_PROGRESS,{frag:this.frag,stats:t})}}]),r}();r.default=u,a.exports=r.default},{"../errors":16,"../events":17}],21:[function(i,a,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(r,"__esModule",{value:!0});var o=function(){function e(i,r){for(var t=0;t<r.length;t++){var e=r[t];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(i,e.key,e)}}return function(t,r,i){return r&&e(t.prototype,r),i&&e(t,i),t}}(),l=i("../events"),e=n(l),t=i("../errors"),u=function(){function r(t){s(this,r),this.hls=t,this.decryptkey=null,this.decrypturl=null,this.ondkl=this.onDecryptKeyLoading.bind(this),t.on(e.default.KEY_LOADING,this.ondkl)}return o(r,[{key:"destroy",value:function(){this.loader&&(this.loader.destroy(),this.loader=null),this.hls.off(e.default.KEY_LOADING,this.ondkl)}},{key:"onDecryptKeyLoading",value:function(s,n){var t=this.frag=n.frag,a=t.decryptdata,i=a.uri;if(i!==this.decrypturl||null===this.decryptkey){var r=this.hls.config;t.loader=this.loader=new r.loader(r),this.decrypturl=i,this.decryptkey=null,t.loader.load(i,"arraybuffer",this.loadsuccess.bind(this),this.loaderror.bind(this),this.loadtimeout.bind(this),r.fragLoadingTimeOut,r.fragLoadingMaxRetry,r.fragLoadingRetryDelay,this.loadprogress.bind(this),t)}else this.decryptkey&&(a.key=this.decryptkey,this.hls.trigger(e.default.KEY_LOADED,{frag:t}))}},{key:"loadsuccess",value:function(r){var t=this.frag;this.decryptkey=t.decryptdata.key=new Uint8Array(r.currentTarget.response),t.loader=void 0,this.hls.trigger(e.default.KEY_LOADED,{frag:t})}},{key:"loaderror",value:function(r){this.loader.abort(),this.hls.trigger(e.default.ERROR,{type:t.ErrorTypes.NETWORK_ERROR,details:t.ErrorDetails.KEY_LOAD_ERROR,fatal:!1,frag:this.frag,response:r})}},{key:"loadtimeout",value:function(){this.loader.abort(),this.hls.trigger(e.default.ERROR,{type:t.ErrorTypes.NETWORK_ERROR,details:t.ErrorDetails.KEY_LOAD_TIMEOUT,fatal:!1,frag:this.frag})}},{key:"loadprogress",value:function(){}}]),r}();r.default=u,a.exports=r.default},{"../errors":16,"../events":17}],22:[function(r,s,i){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(i,"__esModule",{value:!0});var n=function(){function e(i,r){for(var t=0;t<r.length;t++){var e=r[t];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(i,e.key,e)}}return function(t,r,i){return r&&e(t.prototype,r),i&&e(t,i),t}}(),h=r("../events"),e=a(h),t=r("../errors"),u=r("../utils/url"),d=a(u),o=function(){function r(t){l(this,r),this.hls=t,this.onml=this.onManifestLoading.bind(this),this.onll=this.onLevelLoading.bind(this),t.on(e.default.MANIFEST_LOADING,this.onml),t.on(e.default.LEVEL_LOADING,this.onll)}return n(r,[{key:"destroy",value:function(){this.loader&&(this.loader.destroy(),this.loader=null),this.url=this.id=null,this.hls.off(e.default.MANIFEST_LOADING,this.onml),this.hls.off(e.default.LEVEL_LOADING,this.onll)}},{key:"onManifestLoading",value:function(t,e){this.load(e.url,null)}},{key:"onLevelLoading",value:function(t,e){this.load(e.url,e.level,e.id)}},{key:"load",value:function(t,r,i){var e=this.hls.config;this.url=t,this.id=r,this.id2=i,this.loader="undefined"!=typeof e.pLoader?new e.pLoader(e):new e.loader(e),this.loader.load(t,"",this.loadsuccess.bind(this),this.loaderror.bind(this),this.loadtimeout.bind(this),e.manifestLoadingTimeOut,e.manifestLoadingMaxRetry,e.manifestLoadingRetryDelay)}},{key:"resolve",value:function(e,t){return d.default.buildAbsoluteURL(t,e)}},{key:"parseMasterPlaylist",value:function(n,s){for(var e,i,r,a=[],t={},o=/#EXT-X-STREAM-INF:([^\n\r]*(BAND)WIDTH=(\d+))?([^\n\r]*(CODECS)=\"([^\"\n\r]*)\",?)?([^\n\r]*(RES)OLUTION=(\d+)x(\d+))?([^\n\r]*(NAME)=\"(.*)\")?[^\n\r]*[\r\n]+([^\r\n]+)/g;null!=(e=o.exec(n));){for(e.shift(),e=e.filter(function(e){return void 0!==e}),t.url=this.resolve(e.pop(),s);e.length>0;)switch(e.shift()){case"RES":t.width=parseInt(e.shift()),t.height=parseInt(e.shift());break;case"BAND":t.bitrate=parseInt(e.shift());break;case"NAME":t.name=e.shift();break;case"CODECS":for(i=e.shift().split(",");i.length>0;)r=i.shift(),-1!==r.indexOf("avc1")?t.videoCodec=this.avc1toavcoti(r):t.audioCodec=r}a.push(t),t={}}return a}},{key:"avc1toavcoti",value:function(r){var e,t=r.split(".");return t.length>2?(e=t.shift()+".",e+=parseInt(t.shift()).toString(16),e+=("000"+parseInt(t.shift()).toString(16)).substr(-4)):e=r,e}},{key:"parseKeyParamsByRegex",value:function(t,r){var e=r.exec(t);return e&&(e.shift(),e=e.filter(function(e){return void 0!==e}),2===e.length)?e[1]:null}},{key:"cloneObj",value:function(e){return JSON.parse(JSON.stringify(e))}},{key:"parseLevelPlaylist",value:function(A,n,_){var t,m,i,s,a,c=0,u=0,r={url:n,fragments:[],live:!0,startSN:0},v=0,e={method:null,key:null,iv:null,uri:null};for(m=/(?:#EXT-X-(MEDIA-SEQUENCE):(\d+))|(?:#EXT-X-(TARGETDURATION):(\d+))|(?:#EXT-X-(KEY):(.*))|(?:#EXT(INF):([\d\.]+)[^\r\n]*([\r\n]+[^#|\r\n]+)?)|(?:#EXT-X-(BYTERANGE):([\d]+[@[\d]*)]*[\r\n]+([^#|\r\n]+)?|(?:#EXT-X-(ENDLIST))|(?:#EXT-X-(DIS)CONTINUITY))/g;null!==(t=m.exec(A));)switch(t.shift(),t=t.filter(function(e){return void 0!==e}),t[0]){case"MEDIA-SEQUENCE":c=r.startSN=parseInt(t[1]);break;case"TARGETDURATION":r.targetduration=parseFloat(t[1]);break;case"ENDLIST":r.live=!1;break;case"DIS":v++;break;case"BYTERANGE":var d=t[1].split("@");a=1===d.length?s:parseInt(d[1]),s=parseInt(d[0])+a,i=r.fragments.length?r.fragments[r.fragments.length-1]:null,i&&!i.url&&(i.byteRangeStartOffset=a,i.byteRangeEndOffset=s,i.url=this.resolve(t[2],n));break;case"INF":var h=parseFloat(t[1]);if(!isNaN(h)){var o,p=c++;if(e.method&&e.uri&&!e.iv){o=this.cloneObj(e);for(var y=new Uint8Array(16),l=12;16>l;l++)y[l]=p>>8*(15-l)&255;o.iv=y}else o=e;r.fragments.push({url:t[2]?this.resolve(t[2],n):null,duration:h,start:u,sn:p,level:_,cc:v,byteRangeStartOffset:a,byteRangeEndOffset:s,decryptdata:o}),u+=h,a=null}break;case"KEY":var g=t[1],f=this.parseKeyParamsByRegex(g,/(METHOD)=([^,]*)/),E=this.parseKeyParamsByRegex(g,/(URI)=["]([^,]*)["]/),b=this.parseKeyParamsByRegex(g,/(IV)=([^,]*)/);f&&(e={method:null,key:null,iv:null,uri:null},E&&"AES-128"===f&&(e.method=f,e.uri=this.resolve(E,n),e.key=null,b&&(e.iv=b,"0x"===e.iv.substring(0,2)&&(e.iv=e.iv.substring(2)),e.iv=e.iv.match(/.{8}/g),e.iv[0]=parseInt(e.iv[0],16),e.iv[1]=parseInt(e.iv[1],16),e.iv[2]=parseInt(e.iv[2],16),e.iv[3]=parseInt(e.iv[3],16),e.iv=new Uint32Array(e.iv))))}return r.totalduration=u,r.endSN=c-1,r}},{key:"loadsuccess",value:function(s,i){var o,n=s.currentTarget.responseText,r=s.currentTarget.responseURL,l=this.id,u=this.id2,a=this.hls;if(void 0===r&&(r=this.url),i.tload=performance.now(),i.mtime=new Date(s.currentTarget.getResponseHeader("Last-Modified")),0===n.indexOf("#EXTM3U"))if(n.indexOf("#EXTINF:")>0)if(null===this.id)a.trigger(e.default.MANIFEST_LOADED,{levels:[{url:r}],url:r,stats:i});else{var d=this.parseLevelPlaylist(n,r,l);i.tparsed=performance.now(),a.trigger(e.default.LEVEL_LOADED,{details:d,level:l,id:u,stats:i})}else o=this.parseMasterPlaylist(n,r),o.length?a.trigger(e.default.MANIFEST_LOADED,{levels:o,url:r,stats:i}):a.trigger(e.default.ERROR,{type:t.ErrorTypes.NETWORK_ERROR,details:t.ErrorDetails.MANIFEST_PARSING_ERROR,fatal:!0,url:r,reason:"no level found in manifest"});else a.trigger(e.default.ERROR,{type:t.ErrorTypes.NETWORK_ERROR,details:t.ErrorDetails.MANIFEST_PARSING_ERROR,fatal:!0,url:r,reason:"no EXTM3U delimiter"})}},{key:"loaderror",value:function(a){var r,i;null===this.id?(r=t.ErrorDetails.MANIFEST_LOAD_ERROR,i=!0):(r=t.ErrorDetails.LEVEL_LOAD_ERROR,i=!1),this.loader.abort(),this.hls.trigger(e.default.ERROR,{type:t.ErrorTypes.NETWORK_ERROR,details:r,fatal:i,url:this.url,loader:this.loader,response:a.currentTarget,level:this.id,id:this.id2})}},{key:"loadtimeout",value:function(){var r,i;null===this.id?(r=t.ErrorDetails.MANIFEST_LOAD_TIMEOUT,i=!0):(r=t.ErrorDetails.LEVEL_LOAD_TIMEOUT,i=!1),this.loader.abort(),this.hls.trigger(e.default.ERROR,{type:t.ErrorTypes.NETWORK_ERROR,details:r,fatal:i,url:this.url,loader:this.loader,level:this.id,id:this.id2})}}]),r}();i.default=o,s.exports=i.default},{"../errors":16,"../events":17,"../utils/url":27}],23:[function(n,t,e){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function e(i,r){for(var t=0;t<r.length;t++){var e=r[t];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(i,e.key,e)}}return function(t,r,i){return r&&e(t.prototype,r),i&&e(t,i),t}}(),a=function(){function e(){r(this,e)}return i(e,null,[{key:"init",value:function(){e.types={avc1:[],avcC:[],btrt:[],dinf:[],dref:[],esds:[],ftyp:[],hdlr:[],mdat:[],mdhd:[],mdia:[],mfhd:[],minf:[],moof:[],moov:[],mp4a:[],mvex:[],mvhd:[],sdtp:[],stbl:[],stco:[],stsc:[],stsd:[],stsz:[],stts:[],tfdt:[],tfhd:[],traf:[],trak:[],trun:[],trex:[],tkhd:[],vmhd:[],smhd:[]};var t;for(t in e.types)e.types.hasOwnProperty(t)&&(e.types[t]=[t.charCodeAt(0),t.charCodeAt(1),t.charCodeAt(2),t.charCodeAt(3)]);e.MAJOR_BRAND=new Uint8Array(["i".charCodeAt(0),"s".charCodeAt(0),"o".charCodeAt(0),"m".charCodeAt(0)]),e.AVC1_BRAND=new Uint8Array(["a".charCodeAt(0),"v".charCodeAt(0),"c".charCodeAt(0),"1".charCodeAt(0)]),e.MINOR_VERSION=new Uint8Array([0,0,0,1]),e.VIDEO_HDLR=new Uint8Array([0,0,0,0,0,0,0,0,118,105,100,101,0,0,0,0,0,0,0,0,0,0,0,0,86,105,100,101,111,72,97,110,100,108,101,114,0]),e.AUDIO_HDLR=new Uint8Array([0,0,0,0,0,0,0,0,115,111,117,110,0,0,0,0,0,0,0,0,0,0,0,0,83,111,117,110,100,72,97,110,100,108,101,114,0]),e.HDLR_TYPES={video:e.VIDEO_HDLR,audio:e.AUDIO_HDLR},e.DREF=new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,12,117,114,108,32,0,0,0,1]),e.STCO=new Uint8Array([0,0,0,0,0,0,0,0]),e.STSC=e.STCO,e.STTS=e.STCO,e.STSZ=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0]),e.VMHD=new Uint8Array([0,0,0,1,0,0,0,0,0,0,0,0]),e.SMHD=new Uint8Array([0,0,0,0,0,0,0,0]),e.STSD=new Uint8Array([0,0,0,0,0,0,0,1]),e.FTYP=e.box(e.types.ftyp,e.MAJOR_BRAND,e.MINOR_VERSION,e.MAJOR_BRAND,e.AVC1_BRAND),e.DINF=e.box(e.types.dinf,e.box(e.types.dref,e.DREF))}},{key:"box",value:function(n){for(var t,a,i=Array.prototype.slice.call(arguments,1),r=0,e=i.length,s=e;e--;)r+=i[e].byteLength;for(t=new Uint8Array(r+8),a=new DataView(t.buffer),a.setUint32(0,t.byteLength),t.set(n,4),e=0,r=8;s>e;e++)t.set(i[e],r),r+=i[e].byteLength;return t}},{key:"hdlr",value:function(t){return e.box(e.types.hdlr,e.HDLR_TYPES[t])}},{key:"mdat",value:function(t){return e.box(e.types.mdat,t)}},{key:"mdhd",value:function(t,r){return e.box(e.types.mdhd,new Uint8Array([0,0,0,0,0,0,0,2,0,0,0,3,t>>24&255,t>>16&255,t>>8&255,255&t,r>>24,r>>16&255,r>>8&255,255&r,85,196,0,0]))}},{key:"mdia",value:function(t){return e.box(e.types.mdia,e.mdhd(t.timescale,t.duration),e.hdlr(t.type),e.minf(t))}},{key:"mfhd",value:function(t){return e.box(e.types.mfhd,new Uint8Array([0,0,0,0,t>>24,t>>16&255,t>>8&255,255&t]))}},{key:"minf",value:function(t){return"audio"===t.type?e.box(e.types.minf,e.box(e.types.smhd,e.SMHD),e.DINF,e.stbl(t)):e.box(e.types.minf,e.box(e.types.vmhd,e.VMHD),e.DINF,e.stbl(t))}},{key:"moof",value:function(t,r,i){return e.box(e.types.moof,e.mfhd(t),e.traf(i,r))}},{key:"moov",value:function(t){for(var r=t.length,i=[];r--;)i[r]=e.trak(t[r]);return e.box.apply(null,[e.types.moov,e.mvhd(t[0].timescale,t[0].duration)].concat(i).concat(e.mvex(t)))}},{key:"mvex",value:function(r){for(var t=r.length,i=[];t--;)i[t]=e.trex(r[t]);return e.box.apply(null,[e.types.mvex].concat(i))}},{key:"mvhd",value:function(t,r){var i=new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,2,t>>24&255,t>>16&255,t>>8&255,255&t,r>>24&255,r>>16&255,r>>8&255,255&r,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255]);return e.box(e.types.mvhd,i)}},{key:"sdtp",value:function(n){var r,t,i=n.samples||[],a=new Uint8Array(4+i.length);for(t=0;t<i.length;t++)r=i[t].flags,a[t+4]=r.dependsOn<<4|r.isDependedOn<<2|r.hasRedundancy;return e.box(e.types.sdtp,a)}},{key:"stbl",value:function(t){return e.box(e.types.stbl,e.stsd(t),e.box(e.types.stts,e.STTS),e.box(e.types.stsc,e.STSC),e.box(e.types.stsz,e.STSZ),e.box(e.types.stco,e.STCO))}},{key:"avc1",value:function(t){var r,a,n,i=[],s=[];for(r=0;r<t.sps.length;r++)a=t.sps[r],n=a.byteLength,i.push(n>>>8&255),i.push(255&n),i=i.concat(Array.prototype.slice.call(a));for(r=0;r<t.pps.length;r++)a=t.pps[r],n=a.byteLength,s.push(n>>>8&255),s.push(255&n),s=s.concat(Array.prototype.slice.call(a));var u=e.box(e.types.avcC,new Uint8Array([1,i[3],i[4],i[5],255,224|t.sps.length].concat(i).concat([t.pps.length]).concat(s))),o=t.width,l=t.height;return e.box(e.types.avc1,new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,o>>8&255,255&o,l>>8&255,255&l,0,72,0,0,0,72,0,0,0,0,0,0,0,1,19,118,105,100,101,111,106,115,45,99,111,110,116,114,105,98,45,104,108,115,0,0,0,0,0,0,0,0,0,0,0,0,0,24,17,17]),u,e.box(e.types.btrt,new Uint8Array([0,28,156,128,0,45,198,192,0,45,198,192])))}},{key:"esds",value:function(t){var e=t.config.length;return new Uint8Array([0,0,0,0,3,23+e,0,1,0,4,15+e,64,21,0,0,0,0,0,0,0,0,0,0,0,5].concat([e]).concat(t.config).concat([6,1,2]))}},{key:"mp4a",value:function(t){var r=t.audiosamplerate;return e.box(e.types.mp4a,new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,t.channelCount,0,16,0,0,0,0,r>>8&255,255&r,0,0]),e.box(e.types.esds,e.esds(t)))}},{key:"stsd",value:function(t){return"audio"===t.type?e.box(e.types.stsd,e.STSD,e.mp4a(t)):e.box(e.types.stsd,e.STSD,e.avc1(t))}},{key:"tkhd",value:function(t){var r=t.id,i=t.duration,a=t.width,n=t.height;return e.box(e.types.tkhd,new Uint8Array([0,0,0,7,0,0,0,0,0,0,0,0,r>>24&255,r>>16&255,r>>8&255,255&r,0,0,0,0,i>>24,i>>16&255,i>>8&255,255&i,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,a>>8&255,255&a,0,0,n>>8&255,255&n,0,0]))}},{key:"traf",value:function(i,t){var a=e.sdtp(i),r=i.id;return e.box(e.types.traf,e.box(e.types.tfhd,new Uint8Array([0,0,0,0,r>>24,r>>16&255,r>>8&255,255&r])),e.box(e.types.tfdt,new Uint8Array([0,0,0,0,t>>24,t>>16&255,t>>8&255,255&t])),e.trun(i,a.length+16+16+8+16+8+8),a)}},{key:"trak",value:function(t){return t.duration=t.duration||4294967295,e.box(e.types.trak,e.tkhd(t),e.mdia(t))}},{key:"trex",value:function(r){var t=r.id;return e.box(e.types.trex,new Uint8Array([0,0,0,0,t>>24,t>>16&255,t>>8&255,255&t,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1]))}},{key:"trun",value:function(f,o){var a,r,n,s,t,l,d=f.samples||[],i=d.length,h=12+16*i,u=new Uint8Array(h);for(o+=8+h,u.set([0,0,15,1,i>>>24&255,i>>>16&255,i>>>8&255,255&i,o>>>24&255,o>>>16&255,o>>>8&255,255&o],0),a=0;i>a;a++)r=d[a],n=r.duration,s=r.size,t=r.flags,l=r.cts,u.set([n>>>24&255,n>>>16&255,n>>>8&255,255&n,s>>>24&255,s>>>16&255,s>>>8&255,255&s,t.isLeading<<2|r.flags.dependsOn,t.isDependedOn<<6|t.hasRedundancy<<4|t.paddingValue<<1|t.isNonSync,61440&t.degradPrio,15&t.degradPrio,l>>>24&255,l>>>16&255,l>>>8&255,255&l],12+16*a);return e.box(e.types.trun,u)}},{key:"initSegment",value:function(i){e.types||e.init();var t,r=e.moov(i);return t=new Uint8Array(e.FTYP.byteLength+r.byteLength),t.set(e.FTYP),t.set(r,e.FTYP.byteLength),t}}]),e}();e.default=a,t.exports=e.default},{}],24:[function(i,h,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(a,"__esModule",{value:!0});var d=function(){function e(i,r){for(var t=0;t<r.length;t++){var e=r[t];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(i,e.key,e)}}return function(t,r,i){return r&&e(t.prototype,r),i&&e(t,i),t}}(),f=i("../events"),e=n(f),r=i("../utils/logger"),u=i("../remux/mp4-generator"),t=n(u),s=i("../errors"),o=function(){function i(e){l(this,i),this.observer=e,this.ISGenerated=!1,this.PES2MP4SCALEFACTOR=4,this.PES_TIMESCALE=9e4,this.MP4_TIMESCALE=this.PES_TIMESCALE/this.PES2MP4SCALEFACTOR}return d(i,[{key:"destroy",value:function(){}},{key:"insertDiscontinuity",value:function(){this._initPTS=this._initDTS=this.nextAacPts=this.nextAvcDts=void 0}},{key:"switchLevel",value:function(){this.ISGenerated=!1}},{key:"remux",value:function(r,i,a,t,n){this.ISGenerated||this.generateIS(r,i,t),i.samples.length&&this.remuxVideo(i,t,n),r.samples.length&&this.remuxAudio(r,t,n),a.samples.length&&this.remuxID3(a,t),this.observer.trigger(e.default.FRAG_PARSED)}},{key:"generateIS",value:function(i,r,a){var u=this.observer,o=i.samples,l=r.samples,d=o.length,h=l.length,n=this.PES_TIMESCALE;0===d&&0===h?u.trigger(e.default.ERROR,{type:s.ErrorTypes.MEDIA_ERROR,details:s.ErrorDetails.FRAG_PARSING_ERROR,fatal:!1,reason:"no audio/video samples found"}):0===h?(i.config&&(u.trigger(e.default.FRAG_PARSING_INIT_SEGMENT,{audioMoov:t.default.initSegment([i]),audioCodec:i.codec,audioChannelCount:i.channelCount}),this.ISGenerated=!0),void 0===this._initPTS&&(this._initPTS=o[0].pts-n*a,this._initDTS=o[0].dts-n*a)):0===d?r.sps&&r.pps&&(u.trigger(e.default.FRAG_PARSING_INIT_SEGMENT,{videoMoov:t.default.initSegment([r]),videoCodec:r.codec,videoWidth:r.width,videoHeight:r.height}),this.ISGenerated=!0,void 0===this._initPTS&&(this._initPTS=l[0].pts-n*a,this._initDTS=l[0].dts-n*a)):i.config&&r.sps&&r.pps&&(u.trigger(e.default.FRAG_PARSING_INIT_SEGMENT,{audioMoov:t.default.initSegment([i]),audioCodec:i.codec,audioChannelCount:i.channelCount,videoMoov:t.default.initSegment([r]),videoCodec:r.codec,videoWidth:r.width,videoHeight:r.height}),this.ISGenerated=!0,void 0===this._initPTS&&(this._initPTS=Math.min(l[0].pts,o[0].pts)-n*a,this._initDTS=Math.min(l[0].dts,o[0].dts)-n*a))}},{key:"remuxVideo",value:function(n,S,L){var b,d,i,E,f,u,R,A,_,c,m,y,s,a,p=8,v=this.PES_TIMESCALE,h=this.PES2MP4SCALEFACTOR,o=[];for(u=new Uint8Array(n.len+4*n.nbNalu+8),b=new DataView(u.buffer),b.setUint32(0,u.byteLength),u.set(t.default.types.mdat,4);n.samples.length;){for(d=n.samples.shift(),E=0;d.units.units.length;)f=d.units.units.shift(),b.setUint32(p,f.data.byteLength),p+=4,u.set(f.data,p),p+=f.data.byteLength,E+=4+f.data.byteLength;if(m=d.pts-this._initDTS,y=d.dts-this._initDTS,void 0!==c)s=this._PTSNormalize(m,c),a=this._PTSNormalize(y,c),i.duration=(a-c)/h,i.duration<0&&(i.duration=0);else{var l,g=this.nextAvcDts;s=this._PTSNormalize(m,g),a=this._PTSNormalize(y,g),l=Math.round((a-g)/90),(L||Math.abs(l)<600)&&l&&(l>1?r.logger.log("AVC:"+l+" ms hole between fragments detected,filling it"):-1>l&&r.logger.log("AVC:"+-l+" ms overlapping between fragments detected"),a=g,s=Math.max(s-l,a),r.logger.log("Video/PTS/DTS adjusted:"+s+"/"+a)),A=Math.max(0,s),_=Math.max(0,a)}i={size:E,duration:0,cts:(s-a)/h,flags:{isLeading:0,isDependedOn:0,hasRedundancy:0,degradPrio:0}},d.key===!0?(i.flags.dependsOn=2,i.flags.isNonSync=0):(i.flags.dependsOn=1,i.flags.isNonSync=1),o.push(i),c=a}o.length>=2&&(i.duration=o[o.length-2].duration),this.nextAvcDts=a+i.duration*h,n.len=0,n.nbNalu=0,navigator.userAgent.toLowerCase().indexOf("chrome")>-1&&(o[0].flags.dependsOn=2,o[0].flags.isNonSync=0),n.samples=o,R=t.default.moof(n.sequenceNumber++,_/h,n),n.samples=[],this.observer.trigger(e.default.FRAG_PARSING_DATA,{moof:R,mdat:u,startPTS:A/v,endPTS:(s+h*i.duration)/v,startDTS:_/v,endDTS:(a+h*i.duration)/v,type:"video",nb:o.length})}},{key:"remuxAudio",value:function(a,L,R){var _,d,i,v,l,E,b,y,h,m,p,u,s,A=8,f=this.PES_TIMESCALE,g=this.PES2MP4SCALEFACTOR,o=[];for(l=new Uint8Array(a.len+8),_=new DataView(l.buffer),_.setUint32(0,l.byteLength),l.set(t.default.types.mdat,4);a.samples.length;){if(d=a.samples.shift(),v=d.unit,l.set(v,A),A+=v.byteLength,m=d.pts-this._initDTS,p=d.dts-this._initDTS,void 0!==h)u=this._PTSNormalize(m,h),s=this._PTSNormalize(p,h),i.duration=(s-h)/g,i.duration<0&&(r.logger.log("invalid AAC sample duration at PTS:"+d.pts+":"+i.duration),i.duration=0);else{var n,c=this.nextAacPts;u=this._PTSNormalize(m,c),s=this._PTSNormalize(p,c),n=Math.round(1e3*(u-c)/f),(R||Math.abs(n)<600)&&n&&(n>1?r.logger.log(n+" ms hole between AAC samples detected,filling it"):-1>n&&r.logger.log(-n+" ms overlapping between AAC samples detected"),u=s=c),b=Math.max(0,u),y=Math.max(0,s)}i={size:v.byteLength,cts:0,duration:0,flags:{isLeading:0,isDependedOn:0,hasRedundancy:0,degradPrio:0,dependsOn:1}},o.push(i),h=s}o.length>=2&&(i.duration=o[o.length-2].duration),this.nextAacPts=u+g*i.duration,a.len=0,a.samples=o,E=t.default.moof(a.sequenceNumber++,y/g,a),a.samples=[],this.observer.trigger(e.default.FRAG_PARSING_DATA,{moof:E,mdat:l,startPTS:b/f,endPTS:this.nextAacPts/f,startDTS:y/f,endDTS:(s+g*i.duration)/f,type:"audio",nb:o.length})}},{key:"remuxID3",value:function(r,a){var t,n=r.samples.length;if(n){for(var i=0;n>i;i++)t=r.samples[i],t.pts=(t.pts-this._initPTS)/this.PES_TIMESCALE,t.dts=(t.dts-this._initDTS)/this.PES_TIMESCALE;this.observer.trigger(e.default.FRAG_PARSING_METADATA,{samples:r.samples})}r.samples=[],a=a}},{key:"_PTSNormalize",value:function(e,t){var r;if(void 0===t)return e;for(r=e>t?-8589934592:8589934592;Math.abs(e-t)>4294967296;)e+=r;return e}},{key:"timescale",get:function(){return this.MP4_TIMESCALE}}]),i}();a.default=o,h.exports=a.default},{"../errors":16,"../events":17,"../remux/mp4-generator":23,"../utils/logger":26}],25:[function(r,e,i){"use strict";var t={search:function(a,s){for(var t=0,r=a.length-1,e=null,i=null;r>=t;){e=(t+r)/2|0,i=a[e];var n=s(i);if(n>0)t=e+1;else{if(!(0>n))return i;r=e-1}}return null}};e.exports=t},{}],26:[function(d,u,r){"use strict";function e(){}function l(t,e){return e="["+t+"] > "+e}function a(t){var r=window.console[t];return r?function(){for(var a=arguments.length,e=Array(a),i=0;a>i;i++)e[i]=arguments[i];e[0]&&(e[0]=l(t,e[0])),r.apply(window.console,e)}:e}function s(r){for(var i=arguments.length,n=Array(i>1?i-1:0),e=1;i>e;e++)n[e-1]=arguments[e];n.forEach(function(e){t[e]=r[e]?r[e].bind(r):a(e)})}Object.defineProperty(r,"__esModule",{value:!0});var i={trace:e,debug:e,log:e,warn:e,info:e,error:e},t=i,n=function(e){if(e===!0||"object"==typeof e){s(e,"debug","log","info","warn","error");try{t.log()}catch(e){t=i}}else t=i};r.enableLogs=n;var o=t;r.logger=o},{}],27:[function(r,t,i){"use strict";var e={buildAbsoluteURL:function(i,t){if(t=t.trim(),/^[a-z]+:/i.test(t))return t;var a=null,n=null,s=/^([^#]*)(.*)$/.exec(t);s&&(n=s[2],t=s[1]);var o=/^([^\?]*)(.*)$/.exec(t);o&&(a=o[2],t=o[1]);var u=/^([^#]*)(.*)$/.exec(i);u&&(i=u[1]);var d=/^([^\?]*)(.*)$/.exec(i);d&&(i=d[1]);var l=/^((([a-z]+):)?\/\/[a-z0-9\.-]+(:[0-9]+)?\/)(.*)$/i.exec(i),c=l[3],h=l[1],f=l[5],r=null;if(/^\/\//.test(t))r=c+"://"+e.buildAbsolutePath("",t.substring(2));else if(/^\//.test(t))r=h+e.buildAbsolutePath("",t.substring(1));else{var g=e.buildAbsolutePath(f,t);r=h+g}return a&&(r+=a),n&&(r+=n),r},buildAbsolutePath:function(n,s){for(var i,e,o=s,a="",t=n.replace(/[^\/]*$/,o.replace(/(\/|^)(?:\.?\/+)+/g,"$1")),r=0;e=t.indexOf("/../",r),e>-1;r=e+i)i=/^\/(?:\.\.\/)*/.exec(t.slice(e))[0].length,a=(a+t.substring(r,e)).replace(new RegExp("(?:\\/+[^\\/]*){0,"+(i-1)/3+"}$"),"/");return a+t.substr(r)}};t.exports=e},{}],28:[function(r,i,e){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function");
}Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function e(i,r){for(var t=0;t<r.length;t++){var e=r[t];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(i,e.key,e)}}return function(t,r,i){return r&&e(t.prototype,r),i&&e(t,i),t}}(),t=r("../utils/logger"),s=function(){function e(t){a(this,e),t&&t.xhrSetup&&(this.xhrSetup=t.xhrSetup)}return n(e,[{key:"destroy",value:function(){this.abort(),this.loader=null}},{key:"abort",value:function(){this.loader&&4!==this.loader.readyState&&(this.stats.aborted=!0,this.loader.abort()),this.timeoutHandle&&window.clearTimeout(this.timeoutHandle)}},{key:"load",value:function(r,i,a,n,s,t,o,l){var u=arguments.length<=8||void 0===arguments[8]?null:arguments[8],e=arguments.length<=9||void 0===arguments[9]?null:arguments[9];this.url=r,!e||isNaN(e.byteRangeStartOffset)||isNaN(e.byteRangeEndOffset)||(this.byteRange=e.byteRangeStartOffset+"-"+e.byteRangeEndOffset),this.responseType=i,this.onSuccess=a,this.onProgress=u,this.onTimeout=s,this.onError=n,this.stats={trequest:performance.now(),retry:0},this.timeout=t,this.maxRetry=o,this.retryDelay=l,this.timeoutHandle=window.setTimeout(this.loadtimeout.bind(this),t),this.loadInternal()}},{key:"loadInternal",value:function(){var e=this.loader=new XMLHttpRequest;e.onload=this.loadsuccess.bind(this),e.onerror=this.loaderror.bind(this),e.onprogress=this.loadprogress.bind(this),e.open("GET",this.url,!0),this.byteRange&&e.setRequestHeader("Range","bytes="+this.byteRange),e.responseType=this.responseType,this.stats.tfirst=null,this.stats.loaded=0,this.xhrSetup&&this.xhrSetup(e,this.url),e.send()}},{key:"loadsuccess",value:function(e){window.clearTimeout(this.timeoutHandle),this.stats.tload=performance.now(),this.onSuccess(e,this.stats)}},{key:"loaderror",value:function(e){this.stats.retry<this.maxRetry?(t.logger.warn(e.type+" while loading "+this.url+", retrying in "+this.retryDelay+"..."),this.destroy(),window.setTimeout(this.loadInternal.bind(this),this.retryDelay),this.retryDelay=Math.min(2*this.retryDelay,64e3),this.stats.retry++):(window.clearTimeout(this.timeoutHandle),t.logger.error(e.type+" while loading "+this.url),this.onError(e))}},{key:"loadtimeout",value:function(e){t.logger.warn("timeout while loading "+this.url),this.onTimeout(e,this.stats)}},{key:"loadprogress",value:function(t){var e=this.stats;null===e.tfirst&&(e.tfirst=performance.now()),e.loaded=t.loaded,this.onProgress&&this.onProgress(t,e)}}]),e}();e.default=s,i.exports=e.default},{"../utils/logger":26}]},{},[19])(19)});
    }

    try {
        $.rangeslider();
    }catch(err)
    {
        /*! rangeslider.js - v2.0.5, handle error or insert/bind source */
        !function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";function b(){var a=document.createElement("input");return a.setAttribute("type","range"),"text"!==a.type}function c(a,b){var c=Array.prototype.slice.call(arguments,2);return setTimeout(function(){return a.apply(null,c)},b)}function d(a,b){return b=b||100,function(){if(!a.debouncing){var c=Array.prototype.slice.apply(arguments);a.lastReturnVal=a.apply(window,c),a.debouncing=!0}return clearTimeout(a.debounceTimeout),a.debounceTimeout=setTimeout(function(){a.debouncing=!1},b),a.lastReturnVal}}function e(a){return a&&(0===a.offsetWidth||0===a.offsetHeight||a.open===!1)}function f(a){for(var b=[],c=a.parentNode;e(c);)b.push(c),c=c.parentNode;return b}function g(a,b){function c(a){"undefined"!=typeof a.open&&(a.open=a.open?!1:!0)}var d=f(a),e=d.length,g=[],h=a[b];if(e){for(var i=0;e>i;i++)g[i]=d[i].style.cssText,d[i].style.setProperty?d[i].style.setProperty("display","block","important"):d[i].style.cssText+=";display: block !important",d[i].style.height="0",d[i].style.overflow="hidden",d[i].style.visibility="hidden",c(d[i]);h=a[b];for(var j=0;e>j;j++)d[j].style.cssText=g[j],c(d[j])}return h}function h(a,b){var c=parseFloat(a);return Number.isNaN(c)?b:c}function i(a){return a.charAt(0).toUpperCase()+a.substr(1)}function j(b,e){if(this.$window=a(window),this.$document=a(document),this.$element=a(b),this.options=a.extend({},n,e),this.polyfill=this.options.polyfill,this.orientation=this.$element[0].getAttribute("data-orientation")||this.options.orientation,this.onInit=this.options.onInit,this.onSlide=this.options.onSlide,this.onSlideEnd=this.options.onSlideEnd,this.DIMENSION=o.orientation[this.orientation].dimension,this.DIRECTION=o.orientation[this.orientation].direction,this.DIRECTION_STYLE=o.orientation[this.orientation].directionStyle,this.COORDINATE=o.orientation[this.orientation].coordinate,this.polyfill&&m)return!1;this.identifier="js-"+k+"-"+l++,this.startEvent=this.options.startEvent.join("."+this.identifier+" ")+"."+this.identifier,this.moveEvent=this.options.moveEvent.join("."+this.identifier+" ")+"."+this.identifier,this.endEvent=this.options.endEvent.join("."+this.identifier+" ")+"."+this.identifier,this.toFixed=(this.step+"").replace(".","").length-1,this.$fill=a('<div class="'+this.options.fillClass+'" />'),this.$handle=a('<div class="'+this.options.handleClass+'" />'),this.$range=a('<div class="'+this.options.rangeClass+" "+this.options[this.orientation+"Class"]+'" id="'+this.identifier+'" />').insertAfter(this.$element).prepend(this.$fill,this.$handle),this.$element.css({position:"absolute",width:"1px",height:"1px",overflow:"hidden",opacity:"0"}),this.handleDown=a.proxy(this.handleDown,this),this.handleMove=a.proxy(this.handleMove,this),this.handleEnd=a.proxy(this.handleEnd,this),this.init();var f=this;this.$window.on("resize."+this.identifier,d(function(){c(function(){f.update()},300)},20)),this.$document.on(this.startEvent,"#"+this.identifier+":not(."+this.options.disabledClass+")",this.handleDown),this.$element.on("change."+this.identifier,function(a,b){if(!b||b.origin!==f.identifier){var c=a.target.value,d=f.getPositionFromValue(c);f.setPosition(d)}})}Number.isNaN=Number.isNaN||function(a){return"number"==typeof a&&a!==a};var k="rangeslider",l=0,m=b(),n={polyfill:!0,orientation:"horizontal",rangeClass:"rangeslider",disabledClass:"rangeslider--disabled",horizontalClass:"rangeslider--horizontal",verticalClass:"rangeslider--vertical",fillClass:"rangeslider__fill",handleClass:"rangeslider__handle",startEvent:["mousedown","touchstart","pointerdown"],moveEvent:["mousemove","touchmove","pointermove"],endEvent:["mouseup","touchend","pointerup"]},o={orientation:{horizontal:{dimension:"width",direction:"left",directionStyle:"left",coordinate:"x"},vertical:{dimension:"height",direction:"top",directionStyle:"bottom",coordinate:"y"}}};j.prototype.init=function(){this.update(!0,!1),this.onInit&&"function"==typeof this.onInit&&this.onInit()},j.prototype.update=function(a,b){a=a||!1,a&&(this.min=h(this.$element[0].getAttribute("min"),0),this.max=h(this.$element[0].getAttribute("max"),100),this.value=h(this.$element[0].value,Math.round(this.min+(this.max-this.min)/2)),this.step=h(this.$element[0].getAttribute("step"),1)),this.handleDimension=g(this.$handle[0],"offset"+i(this.DIMENSION)),this.rangeDimension=g(this.$range[0],"offset"+i(this.DIMENSION)),this.maxHandlePos=this.rangeDimension-this.handleDimension,this.grabPos=this.handleDimension/2,this.position=this.getPositionFromValue(this.value),this.$element[0].disabled?this.$range.addClass(this.options.disabledClass):this.$range.removeClass(this.options.disabledClass),this.setPosition(this.position,b)},j.prototype.handleDown=function(a){if(this.$document.on(this.moveEvent,this.handleMove),this.$document.on(this.endEvent,this.handleEnd),!((" "+a.target.className+" ").replace(/[\n\t]/g," ").indexOf(this.options.handleClass)>-1)){var b=this.getRelativePosition(a),c=this.$range[0].getBoundingClientRect()[this.DIRECTION],d=this.getPositionFromNode(this.$handle[0])-c,e="vertical"===this.orientation?this.maxHandlePos-(b-this.grabPos):b-this.grabPos;this.setPosition(e),b>=d&&b<d+this.handleDimension&&(this.grabPos=b-d)}},j.prototype.handleMove=function(a){a.preventDefault();var b=this.getRelativePosition(a),c="vertical"===this.orientation?this.maxHandlePos-(b-this.grabPos):b-this.grabPos;this.setPosition(c)},j.prototype.handleEnd=function(a){a.preventDefault(),this.$document.off(this.moveEvent,this.handleMove),this.$document.off(this.endEvent,this.handleEnd),this.$element.trigger("change",{origin:this.identifier}),this.onSlideEnd&&"function"==typeof this.onSlideEnd&&this.onSlideEnd(this.position,this.value)},j.prototype.cap=function(a,b,c){return b>a?b:a>c?c:a},j.prototype.setPosition=function(a,b){var c,d;void 0===b&&(b=!0),c=this.getValueFromPosition(this.cap(a,0,this.maxHandlePos)),d=this.getPositionFromValue(c),this.$fill[0].style[this.DIMENSION]=d+this.grabPos+"px",this.$handle[0].style[this.DIRECTION_STYLE]=d+"px",this.setValue(c),this.position=d,this.value=c,b&&this.onSlide&&"function"==typeof this.onSlide&&this.onSlide(d,c)},j.prototype.getPositionFromNode=function(a){for(var b=0;null!==a;)b+=a.offsetLeft,a=a.offsetParent;return b},j.prototype.getRelativePosition=function(a){var b=i(this.COORDINATE),c=this.$range[0].getBoundingClientRect()[this.DIRECTION],d=0;return"undefined"!=typeof a["page"+b]?d=a["client"+b]:"undefined"!=typeof a.originalEvent["client"+b]?d=a.originalEvent["client"+b]:a.originalEvent.touches&&a.originalEvent.touches[0]&&"undefined"!=typeof a.originalEvent.touches[0]["client"+b]?d=a.originalEvent.touches[0]["client"+b]:a.currentPoint&&"undefined"!=typeof a.currentPoint[this.COORDINATE]&&(d=a.currentPoint[this.COORDINATE]),d-c},j.prototype.getPositionFromValue=function(a){var b,c;return b=(a-this.min)/(this.max-this.min),c=Number.isNaN(b)?0:b*this.maxHandlePos},j.prototype.getValueFromPosition=function(a){var b,c;return b=a/(this.maxHandlePos||1),c=this.step*Math.round(b*(this.max-this.min)/this.step)+this.min,Number(c.toFixed(this.toFixed))},j.prototype.setValue=function(a){(a!==this.value||""===this.$element[0].value)&&this.$element.val(a).trigger("input",{origin:this.identifier})},j.prototype.destroy=function(){this.$document.off("."+this.identifier),this.$window.off("."+this.identifier),this.$element.off("."+this.identifier).removeAttr("style").removeData("plugin_"+k),this.$range&&this.$range.length&&this.$range[0].parentNode.removeChild(this.$range[0])},a.fn[k]=function(b){var c=Array.prototype.slice.call(arguments,1);return this.each(function(){var d=a(this),e=d.data("plugin_"+k);e||d.data("plugin_"+k,e=new j(this,b)),"string"==typeof b&&e[b].apply(e,c)})}});
    }


    // Julia main class
    _julia = function(el, opts)
    {
        // Custom options
        var options = typeof opts === 'undefined' ? {}: opts;
        var _element = typeof el === 'undefined' ? $('video'): el;

        // Default options
        var _options = {
            source: false,
            autoplay: false,
            volume: 25,
            muted: false,
            width: 512,
            height: 288,
            debug: false,
            debugPlayback: false,
            forceHls: false,
            live: false,
            responsive: true,
            dimensions: [
                [1920, 1080],
                [1280,720],
                [960,540],
                [640,360],
                [512,288]
            ],
            pauseOnClick: false,
            poster: '',
            hlsConfig: {
                debug : false,
                autoStartLoad : true,
                maxBufferLength : 60,
                maxBufferSize : 120*1000*1000,
                liveSyncDurationCount : 5, // D: 3
                liveMaxLatencyDurationCount: 20,
                enableWorker : true,
                fragLoadingTimeOut : 5000,
                fragLoadingMaxRetry : 6,
                fragLoadingRetryDelay : 100,
                manifestLoadingTimeOut : 10000,
                manifestLoadingMaxRetry : 6,
                manifestLoadingRetryDelay : 500,
                fpsDroppedMonitoringPeriod : 5000,
                fpsDroppedMonitoringThreshold : 0.2,
                appendErrorMaxRetry : 200,
            },
            suggest: [],
            suggestLimit: 2,
            suggestTimeout: 10000,
            swf: __JULIA_ROOT_PATH__+'/swf/flashlsChromeless.swf',
            themePath: __JULIA_ROOT_PATH__+'/css/themes',
            theme: 'default',
            i18n: {
                liveText: 'Live'
            },
            onTime: {},
            triggerHls: {}
        };


        // UI & behavior globals
        var _env = {
            shield: '',
            element: _element,
            suggest: '',
            toolbar: '',
            poster: '',
            api: '',
            apiId: Math.floor((Math.random()*10000000)+1), // Create a shadow api
            player: '',
            isLive: false,
            hls: {},
            hlsCapable: '',
            hlsCapableString: '',
            type: 'html5',
            isHls: false,
            useHlsLib: false,
            tries: 0,
            source: '',
            flashApi: false,
            duration: 0,
            apiOk: false,
            onTimeRised: [], 
            seeking: false,
            dimensions: false,
            flashlsCallbackName: '',
            started: false,
            publicApi: {},
            suggestPointer: 0,
            suggestClicked: false,
            progressStep: 0.01, // Full sense: 100, so .01 is enough accurate
        }

        // Extend options
        var _system = {

            extend: function()
            {
                for(o in _options)
                {
                    if(options.hasOwnProperty(o))
                    {
                        _options[o] = options[o];
                    }
                }

                options = _options;
            }
        };

        // Console debug
        var _debug = {

            run: function(data)
            {
                if(options.debug === true)
                {
                    if(window.console)
                    {
                        for(d in data)
                        {
                            console.log(' - [instance: '+_env.apiId+'] '+d+' ['+(typeof data[d])+']', data[d]);
                        }
                    }
                }
            }
        };

        // Persistent user data in cookies
        var _persist = {

            set: function(name, value, days)
            {
                dateObj = new Date();
                dateObj.setTime(dateObj.getTime() + (days*24*60*60*1000));
                var expires = 'expires=' + dateObj.toUTCString();
                document.cookie = name + '=' + value + '; ' + expires + '; path=/';
            },

            get: function(name)
            {
                var name = name + '=';
                var ca = document.cookie.split(';');

                for(var i=0; i<ca.length; i++)
                {
                    var c = ca[i];

                    while(c.charAt(0)==' ')
                    {
                        c = c.substring(1);
                    }

                    if(c.indexOf(name) == 0)
                    {
                        return c.substring(name.length,c.length);
                    }
                }

                return '';
            }

        };

        // Create valid api object
        var _api = {

            create: function()
            {
                $('#julia-api-'+_env.apiId).remove();

                // Create default api object
                if(_env.flashApi === false)
                {
                    _debug.run({
                        'apiType': 'html5video',
                    });

                    apiElement = $('<video class="julia-video" id="julia-api-'+_env.apiId+'" preload="auto"></video>');
                    _env.player.prepend(apiElement);
                    _env.api = document.getElementById('julia-api-'+_env.apiId);
                    _env.api.controls = false;
                    _env.apiOk = true;

                }else{

                    var flash = _flash.detect();
                    var flashOk = flash.installed;
                    
                    if( (flash.major==11 && flash.minor>=2) || flash.major>11 )
                    {
                        _debug.run({
                            'apiType': 'flashls',
                        });

                        _env.apiOk = true;
                        _env.flashlsCallbackName = 'flashlsCallback'+_env.apiId;

                        apiElement = $('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="" id="julia-api-'+_env.apiId+'">'
                                    +'<param name="movie" value="'+options.swf+'?inline=1" />'
                                    +'<param name="quality" value="autohigh" />'
                                    +'<param name="swliveconnect" value="true" />'
                                    +'<param name="allowScriptAccess" value="sameDomain" />'
                                    +'<param name="bgcolor" value="#000000" />'
                                    +'<param name="allowFullScreen" value="true" />'
                                    +'<param name="wmode" value="opaque" />'
                                    +'<param name="FlashVars" value="callback='+_env.flashlsCallbackName+'" />'
                                    +'<embed src="'+options.swf+'?inline=1" name="julia-api-'+_env.apiId+'" '
                                    +'    quality="autohigh" '
                                    +'    bgcolor="#000000" '
                                    +'    align="middle" allowFullScreen="true" '
                                    +'    allowScriptAccess="sameDomain" '
                                    +'    type="application/x-shockwave-flash" '
                                    +'    swliveconnect="true" '
                                    +'    wmode="opaque" '
                                    +'    FlashVars="callback='+_env.flashlsCallbackName+'"'
                                    +'    pluginspage="http://www.macromedia.com/go/getflashplayer" >'
                                    +'</embed>'
                                +'</object>');

                        _env.player.prepend(apiElement);

                        flashlsAPI = function(flashObject)
                        {
                            this.constructor = function(flashObject)
                            {
                                this.flashObject = flashObject;
                            }

                            this.constructor(flashObject);

                            this.load = function(url)
                            {
                                this.flashObject.playerLoad(url);
                            }

                            this.play = function(offset)
                            {
                                started = true;
                                this.flashObject.playerPlay(offset);
                            }

                            this.pause = function()
                            {
                                this.flashObject.playerPause();
                            }

                            this.resume = function() {
                                this.flashObject.playerResume();
                            }

                            this.seek = function(offset) {
                                this.flashObject.playerSeek(offset);
                            }

                            this.stop = function() {
                                this.flashObject.playerStop();
                            }

                            this.volume = function(volume) {
                                this.flashObject.playerVolume(volume);
                            }

                            this.setCurrentLevel = function(level) {
                                this.flashObject.playerSetCurrentLevel(level);
                            }

                            this.setNextLevel = function(level) {
                                this.flashObject.playerSetNextLevel(level);
                            }

                            this.setLoadLevel = function(level) {
                                this.flashObject.playerSetLoadLevel(level);
                            }

                            this.setMaxBufferLength = function(len) {
                                this.flashObject.playerSetmaxBufferLength(len);
                            }

                            this.getPosition = function() {
                                return this.flashObject.getPosition();
                            }

                            this.getDuration = function() {
                                return this.flashObject.getDuration();
                            }

                            this.getbufferLength = function() {
                                return this.flashObject.getbufferLength();
                            }

                            this.getbackBufferLength = function() {
                                return this.flashObject.getbackBufferLength();
                            }

                            this.getLowBufferLength = function() {
                                return this.flashObject.getlowBufferLength();
                            }

                            this.getMinBufferLength = function() {
                                return this.flashObject.getminBufferLength();
                            }

                            this.getMaxBufferLength = function() {
                                return this.flashObject.getmaxBufferLength();
                            }

                            this.getLevels = function() {
                                return this.flashObject.getLevels();
                            }

                            this.getAutoLevel = function() {
                                return this.flashObject.getAutoLevel();
                            }

                            this.getCurrentLevel = function() {
                                return this.flashObject.getCurrentLevel();
                            }

                            this.getNextLevel = function() {
                                return this.flashObject.getNextLevel();
                            }

                            this.getLoadLevel = function() {
                                return this.flashObject.getLoadLevel();
                            }

                            this.getAudioTrackList = function() {
                                return this.flashObject.getAudioTrackList();
                            }

                            this.getStats = function() {
                                return this.flashObject.getStats();
                            }

                            this.setAudioTrack = function(trackId) {
                                this.flashObject.playerSetAudioTrack(trackId);
                            }

                            this.playerSetLogDebug = function(state) {
                                this.flashObject.playerSetLogDebug(state);
                            }

                            this.getLogDebug = function() {
                                return this.flashObject.getLogDebug();
                            }

                            this.playerSetLogDebug2 = function(state) {
                                this.flashObject.playerSetLogDebug2(state);
                            }

                            this.getLogDebug2 = function() {
                                return this.flashObject.getLogDebug2();
                            }

                            this.playerSetUseHardwareVideoDecoder = function(state) {
                                this.flashObject.playerSetUseHardwareVideoDecoder(state);
                            }

                            this.getUseHardwareVideoDecoder = function() {
                                return this.flashObject.getUseHardwareVideoDecoder();
                            }

                            this.playerSetflushLiveURLCache = function(state) {
                                this.flashObject.playerSetflushLiveURLCache(state);
                            }

                            this.getflushLiveURLCache = function() {
                                return this.flashObject.getflushLiveURLCache();
                            }

                            this.playerSetJSURLStream = function(state) {
                                this.flashObject.playerSetJSURLStream(state);
                            }

                            this.getJSURLStream = function() {
                                return this.flashObject.getJSURLStream();
                            }

                            this.playerCapLeveltoStage = function(state) {
                                this.flashObject.playerCapLeveltoStage(state);
                            }

                            this.getCapLeveltoStage = function() {
                                return this.flashObject.getCapLeveltoStage();
                            }

                            this.playerSetAutoLevelCapping = function(level) {
                                this.flashObject.playerSetAutoLevelCapping(level);
                            }

                            this.getAutoLevelCapping = function() {
                                return this.flashObject.getAutoLevelCapping();
                            }
                        };

                        getFlashMovieObject = function(movieName)
                        {
                            if (window.document[movieName])
                            {
                                return window.document[movieName];
                            }
                            if (navigator.appName.indexOf("Microsoft Internet")==-1)
                            {
                                if (document.embeds && document.embeds[movieName])
                                {
                                   return document.embeds[movieName];
                                }else // if (navigator.appName.indexOf("Microsoft Internet")!=-1)
                                {
                                    return document.getElementById(movieName);
                                }
                            }
                        }

                        _env.api = new flashlsAPI(getFlashMovieObject('julia-api-'+_env.apiId));

                    }else{

                        _env.api = {};
                        _env.shield.find('.julia-preloader').html('<div style="background: #111; color: #DDD; min-height: 100%; padding-top: 10%; font-size: 1.2em;"><span class="ion-android-warning"></span> <a href="https://get.adobe.com/cz/flashplayer/" target="_blank" style="color: #FFF;">Adobe Flash Player</a> is required</div>');
                        _env.api.flashObject = $('<div class="julia-error" id="julia-api-'+_env.apiId+'"></div>');
                        _env.player.prepend(_env.api.flashObject);
                    }    
                }

                _debug.run({
                    'apiId': _env.apiId,
                    'api': _env.api,
                });
            }
        };


        var _flash = {

            detect: function()
            {
                var self = this;
                self.installed = false;
                self.raw = "";
                self.major = -1;
                self.minor = -1;
                self.revision = -1;
                self.revisionStr = "";
                var activeXDetectRules = [
                    {
                        "name":"ShockwaveFlash.ShockwaveFlash.7",
                        "version":function(obj){
                            return getActiveXVersion(obj);
                        }
                    },
                    {
                        "name":"ShockwaveFlash.ShockwaveFlash.6",
                        "version":function(obj){
                            var version = "6,0,21";
                            try{
                                obj.AllowScriptAccess = "always";
                                version = getActiveXVersion(obj);
                            }catch(err){}
                            return version;
                        }
                    },
                    {
                        "name":"ShockwaveFlash.ShockwaveFlash",
                        "version":function(obj){
                            return getActiveXVersion(obj);
                        }
                    }
                ];
                
                /**
                 * Extract the ActiveX version of the plugin.
                 * 
                 * @param {Object} The flash ActiveX object.
                 * @type String
                 */
                var getActiveXVersion = function(activeXObj)
                {
                    var version = -1;
                    try
                    {
                        version = activeXObj.GetVariable("$version");
                    }catch(err)
                    {}
                    return version;
                };
               
                /**
                 * Try and retrieve an ActiveX object having a specified name.
                 * 
                 * @param {String} name The ActiveX object name lookup.
                 * @return One of ActiveX object or a simple object having an attribute of activeXError with a value of true.
                 * @type Object
                 */
                var getActiveXObject = function(name)
                {
                    var obj = -1;
                    try
                    {
                        obj = new ActiveXObject(name);
                    }catch(err)
                    {
                        obj = {activeXError:true};
                    }
                    return obj;
                };
                
                /**
                 * Parse an ActiveX $version string into an object.
                 * 
                 * @param {String} str The ActiveX Object GetVariable($version) return value. 
                 * @return An object having raw, major, minor, revision and revisionStr attributes.
                 * @type Object
                 */
                var parseActiveXVersion = function(str)
                {
                    var versionArray = str.split(",");//replace with regex
                    return {
                        "raw":str,
                        "major":parseInt(versionArray[0].split(" ")[1], 10),
                        "minor":parseInt(versionArray[1], 10),
                        "revision":parseInt(versionArray[2], 10),
                        "revisionStr":versionArray[2]
                    };
                };
                
                /**
                 * Parse a standard enabledPlugin.description into an object.
                 * 
                 * @param {String} str The enabledPlugin.description value.
                 * @return An object having raw, major, minor, revision and revisionStr attributes.
                 * @type Object
                 */
                var parseStandardVersion = function(str)
                {
                    var descParts = str.split(/ +/);
                    var majorMinor = descParts[2].split(/\./);
                    var revisionStr = descParts[3];
                    return {
                        "raw":str,
                        "major":parseInt(majorMinor[0], 10),
                        "minor":parseInt(majorMinor[1], 10), 
                        "revisionStr":revisionStr,
                        "revision":parseRevisionStrToInt(revisionStr)
                    };
                };
                
                /**
                 * Parse the plugin revision string into an integer.
                 * 
                 * @param {String} The revision in string format.
                 * @type Number
                 */
                var parseRevisionStrToInt = function(str)
                {
                    return parseInt(str.replace(/[a-zA-Z]/g, ""), 10) || self.revision;
                };
              
                /**
                 * Constructor, sets raw, major, minor, revisionStr, revision and installed public properties.
                */
                if(navigator.plugins && navigator.plugins.length>0)
                {
                    var type = 'application/x-shockwave-flash';
                    var mimeTypes = navigator.mimeTypes;
                    if(mimeTypes && mimeTypes[type] && mimeTypes[type].enabledPlugin && mimeTypes[type].enabledPlugin.description)
                    {
                        var version = mimeTypes[type].enabledPlugin.description;
                        var versionObj = parseStandardVersion(version);
                        self.raw = versionObj.raw;
                        self.major = versionObj.major;
                        self.minor = versionObj.minor; 
                        self.revisionStr = versionObj.revisionStr;
                        self.revision = versionObj.revision;
                        self.installed = true;
                    }
                }else if(navigator.appVersion.indexOf("Mac")==-1 && window.execScript)
                {
                    var version = -1;
                    for(var i=0; i<activeXDetectRules.length && version==-1; i++)
                    {
                        var obj = getActiveXObject(activeXDetectRules[i].name);
                        if(!obj.activeXError)
                        {
                            self.installed = true;
                            version = activeXDetectRules[i].version(obj);
                            if(version!=-1)
                            {
                                var versionObj = parseActiveXVersion(version);
                                self.raw = versionObj.raw;
                                self.major = versionObj.major;
                                self.minor = versionObj.minor; 
                                self.revision = versionObj.revision;
                                self.revisionStr = versionObj.revisionStr;
                            }
                        }
                    }
                }

                return self;
            }
        };

        // UI kit    
        var _ui = {

            // Video shield for helpers, buttons, preloaders, advertising etc...
            shield: function()
            {
                _env.shield = $('<div class="julia-shield" id="julia-shield-'+_env.apiId+'">'
                            +'  <button class="julia-btn julia-big-play"><i class="ion-play"></i></button>'
                            +'  <div class="julia-preloader"><i class="ion-load-c"></i></div>'
                            +'</div>'
                    );

                _env.suggest = $('<div class="julia-suggest" id="julia-suggest-'+_env.apiId+'"></div>');
            },

            posterSet: function()
            {
                _ui.posterUnset();
                if(_env.poster.length > 0)
                {
                    img = $('<img src="'+_env.poster+'" width="100%" height="100%">')

                    _env.shield.append(img);

                    _debug.run({
                        poster: _env.poster,
                    })
                }
            },

            posterUnset: function()
            {
                _env.shield.find('img').remove();
            },

            // Button toolbar
            toolbar: function()
            {
                _env.toolbar = $('<div class="julia-toolbar" id="julia-toolbar-'+_env.apiId+'">'
                    +'<div class="julia-progress">'
                    +'  <input type="range" value="0" min="0" max="100" step="'+_env.progressStep+'">'
                    +'</div>'
                    +'<div class="julia-panel julia-live-indicator">'
                    +'    <span>'+options.i18n.liveText+'</span>'
                    +'</div>'
                    +'<div class="julia-panel julia-currentTime">'
                    +'    <span>00:00:00</span> /&nbsp;'
                    +'</div>'
                    +'<div class="julia-panel julia-duration">'
                    +'    <span>00:00:00</span>'
                    +'</div>'
                    +'<button class="julia-btn julia-playback play">'
                    +'    <i class="ion-play"></i>'
                    +'</button>'
                    +'<button class="julia-btn julia-sound on">'
                    +'    <i class="ion-android-volume-up"></i>'
                    +'</button>'
                    +'<div class="julia-volume">'
                    +'  <input type="range" value="'+options.volume+'" min="0" max="100">'
                    +'</div>'
                    +'<button class="julia-btn julia-fullscreen-toggle on">'
                    +'    <i class="ion-android-expand"></i>'
                    +'</button>'
                +'</div>');
            },

            // Create player object
            player: function()
            {
                _ui.shield();
                _ui.toolbar();

                _env.player = $('<div class="julia-player julia-fullscreen-off julia-theme-'+options.theme+'" id="julia-player-'+_env.apiId+'">'
                            +'</div>');

                _env.player.append(_env.shield);
                _env.player.append(_env.suggest);
                _env.player.append(_env.toolbar);

                _env.element.hide();
                _env.player.insertAfter(_env.element);

                // Simulate preload
                _env.shield.find('.julia-big-play').hide();
                _env.toolbar.hide();

                // Rangeslider polyfill
                $('#julia-toolbar-'+_env.apiId+'>div.julia-progress>input, #julia-toolbar-'+_env.apiId+'>div.julia-volume>input').rangeslider({
                    polyfill: false,
                    rangeClass: 'julia-rangeslider',
                    disabledClass: 'julia-rangeslider--disabled',
                    horizontalClass: 'julia-rangeslider--horizontal',
                    verticalClass: 'julia-rangeslider--vertical',
                    fillClass: 'julia-rangeslider__fill',
                    handleClass: 'julia-rangeslider__handle',
                    onInit: function(){},
                    onSlide : function(position, value){},
                    onSlideEnd : function(position, value){}
                });

                _debug.run({
                    'element': _env.element,
                    'toolbar': _env.toolbar,
                    'shield': _env.shield,
                    'player': _env.player,
                });
            }
        };

        // Fullscreen on
        var _fullscreen = {

            on: function()
            {
                var videoFrame = document.querySelector('#julia-player-'+_env.apiId);

                if(videoFrame.requestFullscreen)
                {
                    videoFrame.requestFullscreen();
                } else if (videoFrame.msRequestFullscreen)
                {
                    videoFrame.msRequestFullscreen();
                } else if (videoFrame.mozRequestFullScreen)
                {
                    videoFrame.mozRequestFullScreen();
                } else if(videoFrame.webkitRequestFullscreen)
                {
                    videoFrame.webkitRequestFullscreen();
                }
            },

            // Fullscreen off
            off: function()
            {
                if(document.exitFullscreen)
                {
                    document.exitFullscreen();
                }else if(document.msExitFullscreen)
                {
                    document.msExitFullscreen();
                } else if(document.mozCancelFullScreen)
                {
                    document.mozCancelFullScreen();
                } else if(document.webkitExitFullscreen)
                {
                    document.webkitExitFullscreen();
                }
            }
        };

        // Timeline numbers coonversion
        var _timeline = {

            toPercents: function(currentTime)
            {
                p = (currentTime/_env.duration)*100;
                return p;
            },

            toSeconds: function(percent)
            {
                t = (_env.duration/100)*percent;
                return t;
            },

            toNum: function(human)
            {
                human = human.split(':');
                human.reverse();
                s = parseInt(human[0]);
                m = human.length>1 ? parseInt(human[1]): 0;
                h = human.length>2 ? parseInt(human[3]): 0;
                t = s + m*60 + h*60*60;
                return t;
            }, 

            toHuman: function(time)
            {
                time = time.toString().split('.');
                s = time[0];
                H = Math.floor(s/3600);
                M = Math.floor( ( s - (H*3600) ) / 60 );
                S = Math.floor( ( s - (H*3600) - (M*60) ) );

                H = ('0'+H.toString()).slice(-2);
                M = ('0'+M.toString()).slice(-2);
                S = ('0'+S.toString()).slice(-2);

                str = H>0 ? H+':'+M+':'+S: M+':'+S;

                return str;
            }
        };


        // Suggest engine
        var _suggest = {

            run: function()
            {
                _env.suggest.html('');
                _control.press('stop');
                _env.suggestClicked = false;
                _env.tries = 0;

                if(options.suggest.length > 0)
                {
                    x = 0;
                    for(var i in options.suggest)
                    {
                        if(x < options.suggestLimit && options.suggest[i].played === false)
                        {
                            mode = !!options.suggest[i].live && options.suggest[i].live === true ? 'live': 'vod';
                            liveText = !!options.suggest[i].liveText ? options.suggest[i].liveText: 'Live';
                            var poster = !!options.suggest[i].poster ? options.suggest[i].poster: '';
                            posterImage = poster.length>0 ? '<img src="'+poster+'" width="100%" height="100%">': '';
                            suggestItemWidget = $('<div class="julia-suggest-item" data-poster="'+poster+'" data-file="'+options.suggest[i].file+'" data-mode="'+mode+'" data-live-text="'+liveText+'" data-index="'+i+'">'
                                    + posterImage
                                    +'<div class="julia-suggest-item-title">'+options.suggest[i].title+'</div>'
                                +'</div>');

                                suggestItemWidget.on('click', function(e)
                                {
                                    if(_env.flashApi===false)
                                    {
                                        options.muted = _env.api.muted;
                                    }else{

                                    }

                                    options.poster = $(this).data('poster');
                                    _env.suggestClicked = true;
                                    _env.shield.find('.julia-big-play').hide();
                                    _env.started = false;
                                    options.source = $(this).data('file');
                                    _boot.selectSource();
                                    options.autoplay = true;
                                    options.live = $(this).data('mode') == 'live' ? true: false;
                                    options.i18n.liveText = $(this).data('live-text');

                                    _env.toolbar.find('.julia-live-indicator>span').text(options.i18n.liveText);

                                    _debug.run({
                                        suggestRemoveIndex: $(this).data('index'),
                                        suggestRemove: $(this).data('file')
                                    });

                                    options.suggest[$(this).data('index')].played = true;
                                    _env.suggest.removeClass('on');

                                    _boot.init();
                                    _boot.load();
                                    _support.resize();
                                });

                            _env.suggest.append(suggestItemWidget);
                            x++;
                        }
                    }

                    if(x > 0)
                    {
                        if(options.suggestTimeout > 0 && _support.isMobile() === false)
                        {
                            setTimeout( function()
                            {
                                if(_env.suggestClicked === false)
                                {
                                    _env.suggest.find('div.julia-suggest-item:first').click();
                                }
                            }, options.suggestTimeout);
                        }
                        _env.suggest.addClass('on');
                    }

                }else{
                    _fullscreen.off();
                }

                _debug.run({
                    'Suggest' : 'raised'
                });
            }
        };

        // Support
        var _support = {

            aspect: function(w,h)
            {
                return w>0 && h>0 ? h/w: 0;
            },

            isMobile: function()
            {
                if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
                {
                    return true;
                }

                return false;
            },

            forceReady: function()
            {
                if( /Firefox/i.test(navigator.userAgent) )
                {
                    return true;
                }

                return false;
            },

            theme: function()
            {
                _debug.run({
                    'theme': options.themePath+'/'+options.theme+'/julia.css'
                });

                $('head').append('<link rel="stylesheet" type="text/css" href="'+options.themePath+'/'+options.theme+'/julia.css">');
            },

            hlsCapable: function()
            {
                var vid = document.createElement('video');
                vid.id = 'video-cap-test-'+_env.apiId;
                _env.hlsCapableString = vid.canPlayType('application/vnd.apple.mpegURL');
                $('#video-cap-test'+_env.apiId).remove();
                return (_env.hlsCapableString == 'probably' || _env.hlsCapableString == 'maybe');
            },

            resize: function()
            {
                // Player dimensions
                defaultDim = _env.element.width() ? [_env.element.width(), _env.element.height()]: [options.width, options.height];
                dimensions = options.responsive === true ? _support.getSize(): defaultDim;

                _debug.run({
                    'resizeDefaults': defaultDim,
                    'resize': dimensions
                });

                _env.player.width(dimensions[0]);
                _env.player.height(dimensions[1]);

                if(_env.flashApi===false)
                {
                    _env.api.setAttribute('width', '100%');
                    _env.api.setAttribute('height', '100%');
                }else{

                    if(_env.apiOk === true)
                    {    
                        _env.api.flashObject.width = '100%';
                        _env.api.flashObject.height = '100%';
                    }else{
                        _env.api.flashObject.width('100%');
                        _env.api.flashObject.height('100%');
                    }
                }
            },

            getSize: function()
            {
                var parentWidth = _env.element.parent().width();
                for(i in options.dimensions)
                {
                    var dim = options.dimensions[i];
                    if(parentWidth>=dim[0])
                    {
                        if(_env.flashApi===false)
                        {
                            a = _support.aspect(parentWidth) == 0 ? dim[1]/dim[0]: _support.aspect(_env.api.videoWidth, _env.api.videoHeight);
                        }else{
                            a = _support.aspect(parentWidth) == 0 ? dim[1]/dim[0]: _support.aspect(_env.api.width(), _env.api.height());
                        }

                        dimensions = [dim[0],(dim[0]*a)];
                        _debug.run({
                            'resizePredefined': dimensions
                        });
                        return dimensions;
                    }
                }

                a = _support.aspect() == 0 ? dim[1]/dim[0]: _support.aspect(_env.api.videoWidth, _env.api.videoHeight);
                dimensions = [parentWidth, (parentWidth*a)];

                _debug.run({
                    'resizeFallback': dimensions
                });

                return dimensions;
            }
        };

        // Api && UI control
        var _control = {

            press: function(action, data)
            {
                data = data||{};

                if(data.length>0)
                {    
                    _debug.run({
                        'action': action,
                        'action-data': data,
                    });

                }else{
                
                    _debug.run({
                        'action': action,
                    });
                }

                switch(action)
                {
                    case 'play':

                        if(_env.flashApi === false)
                        {
                            _env.api.play();

                        }else{

                            _env.shield.find('.julia-big-play').hide();

                            if(_env.started === false)
                            {
                                _env.api.play(-1);

                                _debug.run({
                                    'FlashPlay': 'play',
                                    'FlashPosition': _env.api.getPosition()
                                });

                            }else{

                                _env.api.resume(); //(api.getPosition());

                                _debug.run({
                                    'FlashPlay': 'resume',
                                    'FlashPosition': _env.api.getPosition()
                                });
                            }
                        }

                    break; case 'pause':

                        if(_env.flashApi === false)
                        {
                            _env.api.pause();

                        }else{

                            _env.api.pause();
                            _env.toolbar.find('.julia-playback.pause').removeClass('pause').addClass('play')
                            .find('i').removeClass('ion-pause').addClass('ion-play');
                            _env.shield.find('.julia-big-play').show();
                        }

                    break; case 'stop':

                        if(_env.flashApi === false)
                        {
                            _env.api.pause();
                            _env.api.currentTime = 0;

                        }else{

                            _env.started = false;
                            _env.api.stop();
                        }

                        _env.toolbar.find('.julia-playback.pause').removeClass('pause').addClass('play')
                        .find('i').removeClass('ion-pause').addClass('ion-play');
                        _env.shield.find('.julia-big-play').show();
                        _env.toolbar.find('.julia-progress>input').val(0).rangeslider('update', true);

                    break; case 'goto':

                        if(_env.flashApi === false)
                        {
                            _env.api.currentTime = data.currentTime;

                        }else{

                            _env.api.seek(data.currentTime);
                        }

                    break; case 'setDuration':

                        _env.toolbar.find('.julia-panel.julia-duration>span').text(data.duration);

                        if(_env.started === false)
                        {
                            _env.toolbar.find('.julia-progress>input').val(0).rangeslider('update', true);
                        }

                        _debug.run({
                            'setDuration': data.duration
                        });

                    break; case 'volume':

                        if(_env.flashApi === false)
                        {
                            options.volume = data.volume;
                            _env.api.volume = data.volume/100;

                            _debug.run({
                                'volume is': _env.api.volume
                            });

                        }else{

                            options.volume = data.volume;
                            _env.api.volume(options.volume);

                            _debug.run({
                                'volume is': options.volume
                            });
                        }

                        _env.toolbar.find('.julia-volume>input').val(data.volume).rangeslider('update', true);

                        if(data.volume>0)
                        {
                            _control.press('sound-on');

                        }else{
                            _control.press('sound-off');
                        }

                    break; case 'sound-on':

                        if(_env.flashApi === false)
                        {
                            _env.api.muted = false;

                        }else{

                            _env.api.volume(options.volume);
                            _env.toolbar.find('.julia-volume>input').val(options.volume).rangeslider('update', true);
                        }

                        options.muted = false;
                        _persist.set('volume', options.volume, 30);
                        _persist.set('muted', options.muted, 30);

                        _env.toolbar.find('.julia-sound.off').removeClass('off').addClass('on')
                        .find('i').removeClass('ion-android-volume-off').addClass('ion-android-volume-up');

                    break; case 'sound-off':

                        if(_env.flashApi === false)
                        {
                            _env.api.muted = true;

                        }else{

                            _env.api.volume(0);
                            _env.toolbar.find('.julia-volume>input').val(0).rangeslider('update', true);
                        }

                        options.muted = true;
                        _persist.set('volume', options.volume, 30);
                        _persist.set('muted', options.muted, 30);

                        _env.toolbar.find('.julia-sound.on').removeClass('on').addClass('off')
                        .find('i').removeClass('ion-android-volume-up').addClass('ion-android-volume-off');

                    break; case 'fullscreen-on':
                        _fullscreen.on();

                    break; case 'fullscreen-off':
                        _fullscreen.off();

                    break; case 'destroy':
                        _env.player.remove();

                    break; default:

                }

                return;
            }
        };


        // Bindings
        var _bind = {

            // First play with some handlers
            playAllowStart: function(e)
            {
                _env.shield.find('.julia-preloader').removeClass('on');
                _env.shield.find('.julia-big-play').show();
                _env.toolbar.show();

                // Init actions
                _control.press('setDuration', {
                    'duration': _timeline.toHuman( _env.duration )
                });

                // Set mute if needed
                if(options.muted === true)
                {
                    _control.press('sound-off');
                }else{
                    _control.press('sound-on');

                    // Set initial volume
                    _control.press('volume', {
                        'volume': options.volume
                    });
                }

                // Autostart playback, if possible
                if(options.autoplay === true && _support.isMobile() === false)
                {
                    _control.press('play');
                }

                _debug.run({
                    'eventType': e.type,
                    'duration': _env.api.duration,
                    'readyState': _env.api.readyState
                });
            },

            // Bind can play by ready state / fake readyState
            // Because of Firefox cannot bind canplaythrough event with HLS.js properly
            canplaythrough: function()
            {
                if(_env.started === false)
                {
                    // don't let mobile Firefox make decision about readyState, mobile Firefox lie!
                    if(_env.api.readyState>=3 || (_support.isMobile() === true && _env.api.readyState>=2) )
                    {
                        _bind.playAllowStart({
                            type: '_bind.canplaythrough'
                        });
                    }else{
                        setTimeout( function()
                        {
                            _bind.canplaythrough();
                        }, 250);
                    }
                }
            },


            // Bind user action & DOM events
            domEvents: function()
            {
                // Buttons
                _env.toolbar.on('contextmenu', function(e)
                {
                    e.preventDefault();
                })
                .on('click', '.julia-playback.play', function(e)
                {
                    e.preventDefault();
                    _control.press('play');
                })
                .on('click', '.julia-playback.pause', function(e)
                {
                    e.preventDefault();
                    _control.press('pause');
                })
                .on('click', '.julia-sound.on', function(e)
                {
                    e.preventDefault();
                    _control.press('sound-off');
                })
                .on('click', '.julia-sound.off', function(e)
                {
                    e.preventDefault();
                    _control.press('sound-on');
                })
                .on('click', '.julia-fullscreen-toggle.on', function(e)
                {
                    e.preventDefault();
                    _control.press('fullscreen-on');
                })
                .on('click', '.julia-fullscreen-toggle.off', function(e)
                {
                    e.preventDefault();
                    _control.press('fullscreen-off');
                });

                // Big play
                _env.shield.on('click contextmenu', '.julia-big-play', function(e)
                {
                    e.preventDefault();
                    e.stopPropagation();
                    if(e.type == 'click')
                    {
                        _control.press('play');
                    }
                });

                // Area click
                _env.shield.on('click', function(e)
                {
                    e.preventDefault();
                    e.stopPropagation();
                    if(options.pauseOnClick === true)
                    {
                        _control.press('pause');
                    }
                });

                // Fullscreen toolbar behavior bindings
                var mouseMoveCleaner;

                _env.player.on('mousemove', '#julia-shield-'+_env.apiId+', #julia-suggest-'+_env.apiId, function(e)
                {
                    e.preventDefault();
                    _env.toolbar.addClass('julia-toolbar-visible');
                    clearTimeout(mouseMoveCleaner);

                    mouseMoveCleaner = setTimeout(function()
                    {
                        _env.toolbar.removeClass('julia-toolbar-visible');
                    }, 1750);
                })
                .on('mouseover mousemove mouseout', '#julia-toolbar-'+_env.apiId+'.julia-toolbar-visible', function(e)
                {
                    e.preventDefault();
                    _env.toolbar.addClass('julia-toolbar-visible');
                    clearTimeout(mouseMoveCleaner);

                    if(e.type == 'mouseout')
                    {
                        mouseMoveCleaner = setTimeout(function(e)
                        {
                            _env.toolbar.removeClass('julia-toolbar-visible');
                        }, 1750);
                    }
                });

                // Bind progressbar change
                _env.toolbar.on('change input', '.julia-progress>input', function(e)
                {
                    if(e.type == 'input')
                    {
                        _env.seeking = true;
                    }else{

                        seekTo = _timeline.toSeconds( $(this).val() );
                        seekTo = seekTo >= _env.duration ? _env.duration: seekTo.toFixed(2);

                        _control.press('goto', {
                            currentTime: seekTo
                        });

                        _env.seeking = false;
                    }
                });

                // Bind volumebar change
                _env.toolbar.on('change', '.julia-volume>input', function()
                {
                    _control.press('volume', {
                        volume: $(this).val(),
                        'event': 'slideChange'
                    });
                });

                // Fullscreen event included
                $(window).on('resize', function()
                {
                    _support.resize();
                });

                // Fullscreen change event handler
                $(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange', function(e)
                {
                    if(!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement)
                    {
                        $('.julia-player').removeClass('julia-fullscreen-on').addClass('julia-fullscreen-off')
                        .find('button.julia-fullscreen-toggle').removeClass('off').addClass('on')
                        .find('i').removeClass('ion-android-contract').addClass('ion-android-expand');

                        // Turn off landscape on mobile
                        if(_support.isMobile())
                        {
                            screen.orientation.unlock();
                            screen.msLockOrientation.unlock();
                            screen.mozLockOrientation.unlock();
                        }

                        _debug.run({
                            'fullscreen off' : '#julia-player-'+_env.apiId
                        });

                        _support.resize();

                    }else{

                        $('.julia-player').removeClass('julia-fullscreen-off').addClass('julia-fullscreen-on')
                        .find('button.julia-fullscreen-toggle').removeClass('on').addClass('off')
                        .find('i').removeClass('ion-android-expand').addClass('ion-android-contract');

                        // Force landscape in fullscreen mode on mobile
                        if(_support.isMobile())
                        {
                            screen.orientation.lock('landscape-primary');
                            screen.msLockOrientation.lock('landscape-primary');
                            screen.mozLockOrientation.lock('landscape-primary');
                        }

                        _debug.run({
                            'fullscreen on' : '#julia-player-'+_env.apiId
                        });
                    }
                });
            },


            // Native video api
            nativeEvents: function()
            {
                if(_support.forceReady()===true && _env.isHls === true)
                {
                    _bind.canplaythrough();
                }else{
                    _env.api.oncanplaythrough = function(e)
                    {
                        _env.duration = _env.api.duration;

                        if(_env.started === false && _env.api.readyState >= 3)
                        {
                            _bind.playAllowStart(e);
                        }
                    }
                }

                // Video playback detect
                _env.api.onplay = function(e)
                {
                    _env.toolbar.find('.julia-playback.play').removeClass('play').addClass('pause')
                    .find('i').removeClass('ion-play').addClass('ion-pause');
                    _env.shield.find('.julia-big-play').hide();
                    _env.shield.find('.julia-preloader').removeClass('on');
                    _ui.posterUnset();
                    _env.toolbar.show();
                }

                _env.api.onplaying = function(e)
                {
                    _env.toolbar.find('.julia-playback.play').removeClass('play').addClass('pause')
                    .find('i').removeClass('ion-play').addClass('ion-pause');
                    _env.shield.find('.julia-big-play').hide();
                    _env.shield.find('.julia-preloader').removeClass('on');
                    _env.suggest.html('').removeClass('on');
                    _env.toolbar.show();
                    _control.press('setDuration', {
                        'duration': _timeline.toHuman( _env.duration )
                    });
                    _env.started = true;
                }


                // Video pause
                _env.api.onpause = function(e)
                {
                    _env.toolbar.find('.julia-playback.pause').removeClass('pause').addClass('play')
                    .find('i').removeClass('ion-pause').addClass('ion-play');
                    _env.shield.find('.julia-big-play').show();
                }


                // Errors
                _env.api.onerror = function(e)
                {
                    // Bring to life again
                    if(_env.tries<11)
                    {
                        _boot.init();
                    }
                }

                _env.api.onemptied = function(e)
                {
                }

                _env.api.onstalled = function(e)
                {
                }

                _env.api.onsuspend = function(e)
                {
                }

                // Video position
                _env.api.ontimeupdate = function(e)
                {
                    if(_env.seeking === false)
                    {
                        currentTimeReadable = _timeline.toHuman( _env.api.currentTime.toFixed(2) );
                        _env.toolbar.find('.julia-progress>input').val( _timeline.toPercents( _env.api.currentTime.toFixed(2) ) ).rangeslider('update', true);
                        _env.toolbar.find('.julia-panel.julia-currentTime>span').text(currentTimeReadable);
                    }

                    _bind.onTime(currentTimeReadable, _env.api.currentTime);
                    
                    if(options.debugPlayback === true)
                    {
                        _debug.run({
                            'duration/current': _env.duration+'/'+_env.api.currentTime.toFixed(2)+' > '+currentTimeReadable
                        });
                    }

                    // Fix for corrupted video end
                    // For development purposes only
                    /*
                    if(api.currentTime>=(duration-1))
                    {
                        if(_support.forceReady()===true)
                        {
                            _suggest.run();
                        }
                    }
                    */
                }

                // Video position
                _env.api.seeked = function(e)
                {
                    _env.seeking = false;
                }

                // Video position
                _env.api.seeking = function(e)
                {
                    _env.seeking = true;
                }

                // Volume
                _env.api.onvolumechange = function(e)
                {
                    if(_env.api.muted === false)
                    {
                        _env.toolbar.find('.julia-volume>input').val(_env.api.volume*100).rangeslider('update', true);
                    }else{
                        _env.toolbar.find('.julia-volume>input').val(0).rangeslider('update', true);
                    }
                }

                // Set video duration
                _env.api.ondurationchange = function(e)
                {
                    _env.duration = _env.api.duration;

                    if(_env.started === false)
                    {
                        _env.duration = _env.api.duration;
                        _env.seeking = false;

                        _debug.run({
                            'duration': _env.duration,
                            'readyState': _env.api.readyState,
                            'started': _env.started
                        });
                    }
                }

                // Bind playback end event
                _env.api.onended = function(e)
                {
                    _suggest.run();
                };
            },


            // Specific events, error handlers
            hlsLibEvents: function()
            {
                _env.hls.on(Hls.Events.ERROR, function(event, data)
                {
                    switch(data.details)
                    {
                        case Hls.ErrorDetails.MANIFEST_LOAD_ERROR:
                        case Hls.ErrorDetails.MANIFEST_LOAD_TIMEOUT:
                        case Hls.ErrorDetails.MANIFEST_PARSING_ERROR:
                        case Hls.ErrorDetails.LEVEL_LOAD_ERROR:
                        case Hls.ErrorDetails.LEVEL_LOAD_TIMEOUT:
                        case Hls.ErrorDetails.LEVEL_SWITCH_ERROR:
                        case Hls.ErrorDetails.FRAG_LOAD_ERROR:
                        case Hls.ErrorDetails.FRAG_LOOP_LOADING_ERROR:
                        case Hls.ErrorDetails.FRAG_LOAD_TIMEOUT:
                        case Hls.ErrorDetails.FRAG_DECRYPT_ERROR:
                        case Hls.ErrorDetails.FRAG_PARSING_ERROR:
                        case Hls.ErrorDetails.BUFFER_APPEND_ERROR:
                        case Hls.ErrorDetails.BUFFER_APPENDING_ERROR:

                            _debug.run({
                                recoveringError: data.details,
                                errorType: data.type,
                                errorFatal: data.fatal
                            });

                            if(data.fatal === true && _env.tries<11)
                            {
                                // Bring to life again
                                _boot.init();
                            }

                        break; default:
                    }
                });
            },


            // Flash fallback for legacy browsers
            flashEvents: function()
            {
                // Flash event object
                var flashlsEvents = {

                    ready: function(flashTime)
                    {
                        _env.api.load(_env.source);

                        _debug.run({
                            'ready': flashTime
                        });
                    },

                    videoSize: function(width, height) {
                        _support.resize();
                    },

                    complete: function()
                    {
                        _debug.run({
                            'suggest': 'call',
                            'flashPlayback': 'completed'
                        });

                        setTimeout( function()
                        {
                            _suggest.run();
                        }, 1500);
                    },

                    error: function(code, url, message)
                    {
                        _debug.run({
                            'flashErrorCode': code,
                            'flashErrorUrl': url,
                            'flashErrorMessage': message,
                        });

                        // Bring to life again
                        if(_env.tries<10)
                        {
                            _boot.init();
                        }
                    },

                    manifest: function(flashDuration, levels_, loadmetrics)
                    {
                        _env.duration = flashDuration.toFixed(2);
                        levels = levels_;
                        _debug.run({
                            'durationOrigin': flashDuration,
                            'duration': _env.duration,
                            'durationHuman': _timeline.toHuman( _env.duration ),
                            'levels': levels,
                            'metrics': loadmetrics,
                        });

                        if(_env.started === false)
                        {
                            _env.shield.find('.julia-preloader').removeClass('on');
                            _env.shield.find('.julia-big-play').show();
                            _env.toolbar.show();

                            // Init actions
                            _control.press('setDuration', {
                                'duration': _timeline.toHuman( _env.duration )
                            });

                            // Set initial volume
                            if(options.muted === false)
                            {
                                _control.press('volume', {
                                    'volume': options.volume
                                });
                            }
                            // Set mute if needed
                            if(options.muted === true)
                            {
                                _control.press('sound-off');
                            }

                            // Autostart playback, if possible
                            if(options.autoplay === true)
                            {
                                _env.api.play(-1);
                            }

                            _debug.run({
                                'duration': _env.api.duration,
                                'readyState': true
                            });
                        }
                    },

                    levelLoaded: function(loadmetrics)
                    {
                    },

                    fragmentLoaded: function(loadmetrics)
                    {
                    },

                    fragmentPlaying: function(playmetrics)
                    {
                        _env.toolbar.find('.julia-playback.play').removeClass('play').addClass('pause')
                        .find('i').removeClass('ion-play').addClass('ion-pause');
                        _env.shield.find('.julia-big-play').hide();
                        _env.shield.find('.julia-preloader').removeClass('on');
                        _ui.posterUnset();
                        _env.suggest.html('').removeClass('on');
                        _env.toolbar.show();
                        _env.started = true;
                    },

                    position: function(timemetrics)
                    {
                        if(_env.seeking === false)
                        {
                            currentTimeReadable = _timeline.toHuman( _env.api.getPosition() );
                            _env.toolbar.find('.julia-progress>input').val( _timeline.toPercents( _env.api.getPosition() ) ).rangeslider('update', true);
                            _env.toolbar.find('.julia-panel.julia-currentTime>span').text(currentTimeReadable);
                        }
                    }
                };

                // Create a single global callback function and pass it's name
                // to the SWF with the name `callback` in the FlashVars parameter.
                window[_env.flashlsCallbackName] = function(eventName, args)
                {
                    flashlsEvents[eventName].apply(null, args);
                };
            }, 

            // Time update event callbacks
            onTime: function(time, timeNum)
            {
                if( (time in options.onTime) && _env.onTimeRised.indexOf(time) == -1 )
                {
                    handle = options.onTime[time];
                    _env.onTimeRised.push(time);

                    if(typeof window[handle] === 'function')
                    {
                        window[handle](time, _env.publicApi);
                        _debug.run({
                            'onTime': handle+' raised'
                        });
                        
                    }else{

                        _debug.run({
                            'onTimeError': handle+' is not a function, but: '+(typeof handle)
                        });
                    }
                }
            }
        };


        // Create player
        var _boot = {

            create: function()
            {
                // Extend default options with external options
                _system.extend();

                // Degbug header
                if(options.debug === true && window.console )
                {
                    console.info('=== Julia console debug start for '+_env.apiId+' ===');
                }

                _debug.run(options);

                // Suggest init
                for(i in options.suggest)
                {
                    options.suggest[i].played = false;
                }

                // Set theme CSS
                _support.theme();

                // User data
                volume = _persist.get('volume');
                muted = _persist.get('muted');

                if(volume.length>0)
                {
                    options.volume = parseInt(volume);
                }

                if(muted.length>0)
                {
                    options.muted = muted == 'false' ?  false: true;
                }

                // Create UI
                _ui.player();
            },

            // Select playback url
            selectSource: function()
            {
                _env.element.prop('preload', 'none');
                _env.source = options.source && options.source.length>0 ? options.source: _env.element.prop('src');
                if(options.forceHls === true)
                {
                    _env.source += _env.source.indexOf('?') == -1 ? '?m3u8=yes': '&m3u8=yes';
                }

                _env.type = _env.source.indexOf('m3u8') == -1 ? _env.type: 'hls';
                _debug.run({
                    'sourceType': _env.type
                });

                _env.isHls = _env.source.indexOf('m3u8') == -1 ? false: true;

                _env.poster = options.poster && options.poster.length>0 ? options.poster: _env.element.prop('poster');
                _ui.posterSet();
            },


            // load media
            load: function()
            {
                _env.shield.find('.julia-preloader').addClass('on');
                    
                // ************************
                // HLS library supported
                // and HLS requested
                // ************************
                if(_env.useHlsLib === true)
                {
                    _bind.hlsLibEvents();
                    _env.hls.loadSource(_env.source);
                    _env.hls.attachMedia(_env.api);

                    // DETECT LEVEL DATA
                    _env.hls.on(Hls.Events.LEVEL_LOADED,function(event, data)
                    {
                        // SET LIVE EVENT STATE
                        if(data.details.live === true || options.live === true)
                        {
                            _env.isLive = true;
                            _env.toolbar.addClass('live');
                        }else{
                            _env.toolbar.removeClass('live');
                        }
                    });

                    for(x in options.triggerHls)
                    {
                        handle = options.triggerHls[x];

                        if(typeof window[handle] === 'function')
                        {
                            _env.hls.on(Hls.Events[x], function(event, data)
                            {
                                window[handle](_env.apiId, event, data);
                            });

                        }else{

                            _debug.run({
                                'triggerHlsError': handle+' is not a function'
                            });
                        }
                    }

                // ************************
                // No HLS library support,
                // but HLS is requested
                // ************************
                }else if(_env.flashApi === true)
                {
                    _api.create();

                // ************************
                // Classic VOD file
                // ************************
                }else{

                    _env.api.load();
                }

                // ************************
                // Bind all events
                // ************************
                if(_env.apiOk === true)
                {
                    _bind.domEvents();

                    if(_env.flashApi === false)
                    {
                        // Classic html5 api
                        _bind.nativeEvents();
                    }else{
                        // Flash api
                        _bind.flashEvents();
                    }
                }

                stats = {
                    'isHls': _env.isHls,
                    'flashApi': _env.flashApi,
                    'useHlsLib': _env.useHlsLib,
                    'live': _env.isLive,
                    'hlsCapable': _env.hlsCapable,
                    'hlsCapableString': _env.hlsCapableString
                };

                _debug.run(stats);

                // Define publicApi
                _env.publicApi = {
                    control: _control,
                    support: _support,
                    timeline: _timeline, 
                    shield: _env.shield, 
                    media: _env.api,
                    id: _env.apiId,
                    stats: stats
                };

            },

            // Initilize player
            init: function()
            {
                // Create source
                _boot.selectSource();
                _env.useHlsLib = false;
                _env.flashApi = false;
                _env.isLive = false;
                _env.hlsCapable = _support.hlsCapable();
                _env.tries+=1;

                if(_env.isHls === true)
                {
                    _env.useHlsLib = _env.hlsCapable === false && Hls.isSupported() ? true: false;
                }

                // ************************
                // HLS library supported
                // and HLS requested
                // ************************
                if(_env.useHlsLib === true)
                {
                    _api.create();
                    _env.hls = new Hls(options.hlsConfig);

                // ************************
                // No HLS library support,
                // but HLS is requested
                // ************************
                }else if(_env.isHls === true && _env.useHlsLib === false && _env.hlsCapable === false)
                {
                    _env.flashApi = true;

                // ************************
                // Classic VOD file
                // ************************
                }else{

                    _api.create();
                    _env.api.src = _env.source;
                }

                if(options.live === true)
                {
                    _env.isLive = true;
                    _env.toolbar.addClass('live');
                }else{
                    _env.toolbar.removeClass('live');
                }
            }
        }

        // Build player object
        _boot.create();

        // Bring to life
        _boot.init();

        // Bring to life
        _boot.load();

        // Player dimensions
        _support.resize();

        // Populate public API
        return _env.publicApi;
    }

    // Build plugin instances
    $.fn.julia = function(opts)
    {
        var resize = [];
        return this.each(function()
        {
            var element = $(this);

            // Return if this element already has a plugin instance
            if ($(this).data('julia')) return;

            // Pass options to constructor
            var __julia = new _julia($(this), opts);

            // Store plugin object in element's data
            $(this).data('julia', __julia);
        });
    };

    // API wrappers
    $.fn.play = function()
    {
        $(this).data('julia').control.press('play');
    };

    $.fn.destroy = function()
    {
        $(this).data('julia').control.press('destroy');
    };

    $.fn.media = function()
    {
        return $(this).data('julia').media;
    };

    $.fn.pause = function()
    {
        $(this).data('julia').control.press('pause');
    };

    $.fn.stop = function()
    {
        $(this).data('julia').control.press('stop');
    };

    $.fn.goto = function(t)
    {
        $(this).data('julia').control.press('goto', {
            currentTime: t
        });
    };

    $.fn.mute = function()
    {
        if($(this).data('julia').media.muted === false)
        {
            $(this).data('julia').control.press('sound-off');
        }else{
            $(this).data('julia').control.press('sound-on');
        }
    };

    $.fn.volume = function(volume)
    {
        $(this).data('julia').control.press('volume', {
            volume: volume
        });
    };

    $.fn.getID = function()
    {
        return $(this).data('julia').id;
    };

    $.fn.stats = function()
    {
        return $(this).data('julia').stats;
    };

})(jQuery);
