(()=>{var t={484:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",i="second",s="minute",r="hour",o="day",a="week",l="month",c="quarter",u="year",d="date",h="Invalid Date",f=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,p=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,m={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},v=function(t,e,n){var i=String(t);return!i||i.length>=e?t:""+Array(e+1-i.length).join(n)+t},$={s:v,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),i=Math.floor(n/60),s=n%60;return(e<=0?"+":"-")+v(i,2,"0")+":"+v(s,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var i=12*(n.year()-e.year())+(n.month()-e.month()),s=e.clone().add(i,l),r=n-s<0,o=e.clone().add(i+(r?-1:1),l);return+(-(i+(n-s)/(r?s-o:o-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:l,y:u,w:a,d:o,D:d,h:r,m:s,s:i,ms:n,Q:c}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},_="en",g={};g[_]=m;var y=function(t){return t instanceof D},b=function t(e,n,i){var s;if(!e)return _;if("string"==typeof e){var r=e.toLowerCase();g[r]&&(s=r),n&&(g[r]=n,s=r);var o=e.split("-");if(!s&&o.length>1)return t(o[0])}else{var a=e.name;g[a]=e,s=a}return!i&&s&&(_=s),s||!i&&_},M=function(t,e){if(y(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new D(n)},T=$;T.l=b,T.i=y,T.w=function(t,e){return M(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var D=function(){function m(t){this.$L=b(t.locale,null,!0),this.parse(t)}var v=m.prototype;return v.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(T.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var i=e.match(f);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},v.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},v.$utils=function(){return T},v.isValid=function(){return!(this.$d.toString()===h)},v.isSame=function(t,e){var n=M(t);return this.startOf(e)<=n&&n<=this.endOf(e)},v.isAfter=function(t,e){return M(t)<this.startOf(e)},v.isBefore=function(t,e){return this.endOf(e)<M(t)},v.$g=function(t,e,n){return T.u(t)?this[e]:this.set(n,t)},v.unix=function(){return Math.floor(this.valueOf()/1e3)},v.valueOf=function(){return this.$d.getTime()},v.startOf=function(t,e){var n=this,c=!!T.u(e)||e,h=T.p(t),f=function(t,e){var i=T.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return c?i:i.endOf(o)},p=function(t,e){return T.w(n.toDate()[t].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},m=this.$W,v=this.$M,$=this.$D,_="set"+(this.$u?"UTC":"");switch(h){case u:return c?f(1,0):f(31,11);case l:return c?f(1,v):f(0,v+1);case a:var g=this.$locale().weekStart||0,y=(m<g?m+7:m)-g;return f(c?$-y:$+(6-y),v);case o:case d:return p(_+"Hours",0);case r:return p(_+"Minutes",1);case s:return p(_+"Seconds",2);case i:return p(_+"Milliseconds",3);default:return this.clone()}},v.endOf=function(t){return this.startOf(t,!1)},v.$set=function(t,e){var a,c=T.p(t),h="set"+(this.$u?"UTC":""),f=(a={},a[o]=h+"Date",a[d]=h+"Date",a[l]=h+"Month",a[u]=h+"FullYear",a[r]=h+"Hours",a[s]=h+"Minutes",a[i]=h+"Seconds",a[n]=h+"Milliseconds",a)[c],p=c===o?this.$D+(e-this.$W):e;if(c===l||c===u){var m=this.clone().set(d,1);m.$d[f](p),m.init(),this.$d=m.set(d,Math.min(this.$D,m.daysInMonth())).$d}else f&&this.$d[f](p);return this.init(),this},v.set=function(t,e){return this.clone().$set(t,e)},v.get=function(t){return this[T.p(t)]()},v.add=function(n,c){var d,h=this;n=Number(n);var f=T.p(c),p=function(t){var e=M(h);return T.w(e.date(e.date()+Math.round(t*n)),h)};if(f===l)return this.set(l,this.$M+n);if(f===u)return this.set(u,this.$y+n);if(f===o)return p(1);if(f===a)return p(7);var m=(d={},d[s]=t,d[r]=e,d[i]=1e3,d)[f]||1,v=this.$d.getTime()+n*m;return T.w(v,this)},v.subtract=function(t,e){return this.add(-1*t,e)},v.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||h;var i=t||"YYYY-MM-DDTHH:mm:ssZ",s=T.z(this),r=this.$H,o=this.$m,a=this.$M,l=n.weekdays,c=n.months,u=function(t,n,s,r){return t&&(t[n]||t(e,i))||s[n].slice(0,r)},d=function(t){return T.s(r%12||12,t,"0")},f=n.meridiem||function(t,e,n){var i=t<12?"AM":"PM";return n?i.toLowerCase():i},m={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:T.s(a+1,2,"0"),MMM:u(n.monthsShort,a,c,3),MMMM:u(c,a),D:this.$D,DD:T.s(this.$D,2,"0"),d:String(this.$W),dd:u(n.weekdaysMin,this.$W,l,2),ddd:u(n.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(r),HH:T.s(r,2,"0"),h:d(1),hh:d(2),a:f(r,o,!0),A:f(r,o,!1),m:String(o),mm:T.s(o,2,"0"),s:String(this.$s),ss:T.s(this.$s,2,"0"),SSS:T.s(this.$ms,3,"0"),Z:s};return i.replace(p,(function(t,e){return e||m[t]||s.replace(":","")}))},v.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},v.diff=function(n,d,h){var f,p=T.p(d),m=M(n),v=(m.utcOffset()-this.utcOffset())*t,$=this-m,_=T.m(this,m);return _=(f={},f[u]=_/12,f[l]=_,f[c]=_/3,f[a]=($-v)/6048e5,f[o]=($-v)/864e5,f[r]=$/e,f[s]=$/t,f[i]=$/1e3,f)[p]||$,h?_:T.a(_)},v.daysInMonth=function(){return this.endOf(l).$D},v.$locale=function(){return g[this.$L]},v.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),i=b(t,e,!0);return i&&(n.$L=i),n},v.clone=function(){return T.w(this.$d,this)},v.toDate=function(){return new Date(this.valueOf())},v.toJSON=function(){return this.isValid()?this.toISOString():null},v.toISOString=function(){return this.$d.toISOString()},v.toString=function(){return this.$d.toUTCString()},m}(),S=D.prototype;return M.prototype=S,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",o],["$M",l],["$y",u],["$D",d]].forEach((function(t){S[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),M.extend=function(t,e){return t.$i||(t(e,D,M),t.$i=!0),M},M.locale=b,M.isDayjs=y,M.unix=function(t){return M(1e3*t)},M.en=g[_],M.Ls=g,M.p={},M}()},646:function(t){t.exports=function(){"use strict";var t,e,n=1e3,i=6e4,s=36e5,r=864e5,o=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,a=31536e6,l=2592e6,c=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,u={years:a,months:l,days:r,hours:s,minutes:i,seconds:n,milliseconds:1,weeks:6048e5},d=function(t){return t instanceof _},h=function(t,e,n){return new _(t,n,e.$l)},f=function(t){return e.p(t)+"s"},p=function(t){return t<0},m=function(t){return p(t)?Math.ceil(t):Math.floor(t)},v=function(t){return Math.abs(t)},$=function(t,e){return t?p(t)?{negative:!0,format:""+v(t)+e}:{negative:!1,format:""+t+e}:{negative:!1,format:""}},_=function(){function p(t,e,n){var i=this;if(this.$d={},this.$l=n,void 0===t&&(this.$ms=0,this.parseFromMilliseconds()),e)return h(t*u[f(e)],this);if("number"==typeof t)return this.$ms=t,this.parseFromMilliseconds(),this;if("object"==typeof t)return Object.keys(t).forEach((function(e){i.$d[f(e)]=t[e]})),this.calMilliseconds(),this;if("string"==typeof t){var s=t.match(c);if(s){var r=s.slice(2).map((function(t){return null!=t?Number(t):0}));return this.$d.years=r[0],this.$d.months=r[1],this.$d.weeks=r[2],this.$d.days=r[3],this.$d.hours=r[4],this.$d.minutes=r[5],this.$d.seconds=r[6],this.calMilliseconds(),this}}return this}var v=p.prototype;return v.calMilliseconds=function(){var t=this;this.$ms=Object.keys(this.$d).reduce((function(e,n){return e+(t.$d[n]||0)*u[n]}),0)},v.parseFromMilliseconds=function(){var t=this.$ms;this.$d.years=m(t/a),t%=a,this.$d.months=m(t/l),t%=l,this.$d.days=m(t/r),t%=r,this.$d.hours=m(t/s),t%=s,this.$d.minutes=m(t/i),t%=i,this.$d.seconds=m(t/n),t%=n,this.$d.milliseconds=t},v.toISOString=function(){var t=$(this.$d.years,"Y"),e=$(this.$d.months,"M"),n=+this.$d.days||0;this.$d.weeks&&(n+=7*this.$d.weeks);var i=$(n,"D"),s=$(this.$d.hours,"H"),r=$(this.$d.minutes,"M"),o=this.$d.seconds||0;this.$d.milliseconds&&(o+=this.$d.milliseconds/1e3);var a=$(o,"S"),l=t.negative||e.negative||i.negative||s.negative||r.negative||a.negative,c=s.format||r.format||a.format?"T":"",u=(l?"-":"")+"P"+t.format+e.format+i.format+c+s.format+r.format+a.format;return"P"===u||"-P"===u?"P0D":u},v.toJSON=function(){return this.toISOString()},v.format=function(t){var n=t||"YYYY-MM-DDTHH:mm:ss",i={Y:this.$d.years,YY:e.s(this.$d.years,2,"0"),YYYY:e.s(this.$d.years,4,"0"),M:this.$d.months,MM:e.s(this.$d.months,2,"0"),D:this.$d.days,DD:e.s(this.$d.days,2,"0"),H:this.$d.hours,HH:e.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:e.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:e.s(this.$d.seconds,2,"0"),SSS:e.s(this.$d.milliseconds,3,"0")};return n.replace(o,(function(t,e){return e||String(i[t])}))},v.as=function(t){return this.$ms/u[f(t)]},v.get=function(t){var e=this.$ms,n=f(t);return"milliseconds"===n?e%=1e3:e="weeks"===n?m(e/u[n]):this.$d[n],0===e?0:e},v.add=function(t,e,n){var i;return i=e?t*u[f(e)]:d(t)?t.$ms:h(t,this).$ms,h(this.$ms+i*(n?-1:1),this)},v.subtract=function(t,e){return this.add(t,e,!0)},v.locale=function(t){var e=this.clone();return e.$l=t,e},v.clone=function(){return h(this.$ms,this)},v.humanize=function(e){return t().add(this.$ms,"ms").locale(this.$l).fromNow(!e)},v.milliseconds=function(){return this.get("milliseconds")},v.asMilliseconds=function(){return this.as("milliseconds")},v.seconds=function(){return this.get("seconds")},v.asSeconds=function(){return this.as("seconds")},v.minutes=function(){return this.get("minutes")},v.asMinutes=function(){return this.as("minutes")},v.hours=function(){return this.get("hours")},v.asHours=function(){return this.as("hours")},v.days=function(){return this.get("days")},v.asDays=function(){return this.as("days")},v.weeks=function(){return this.get("weeks")},v.asWeeks=function(){return this.as("weeks")},v.months=function(){return this.get("months")},v.asMonths=function(){return this.as("months")},v.years=function(){return this.get("years")},v.asYears=function(){return this.as("years")},p}();return function(n,i,s){t=s,e=s().$utils(),s.duration=function(t,e){var n=s.locale();return h(t,{$l:n},e)},s.isDuration=d;var r=i.prototype.add,o=i.prototype.subtract;i.prototype.add=function(t,e){return d(t)&&(t=t.asMilliseconds()),r.bind(this)(t,e)},i.prototype.subtract=function(t,e){return d(t)&&(t=t.asMilliseconds()),o.bind(this)(t,e)}}}()},178:function(t){t.exports=function(){"use strict";var t="minute",e=/[+-]\d\d(?::?\d\d)?/g,n=/([+-]|\d\d)/g;return function(i,s,r){var o=s.prototype;r.utc=function(t){return new s({date:t,utc:!0,args:arguments})},o.utc=function(e){var n=r(this.toDate(),{locale:this.$L,utc:!0});return e?n.add(this.utcOffset(),t):n},o.local=function(){return r(this.toDate(),{locale:this.$L,utc:!1})};var a=o.parse;o.parse=function(t){t.utc&&(this.$u=!0),this.$utils().u(t.$offset)||(this.$offset=t.$offset),a.call(this,t)};var l=o.init;o.init=function(){if(this.$u){var t=this.$d;this.$y=t.getUTCFullYear(),this.$M=t.getUTCMonth(),this.$D=t.getUTCDate(),this.$W=t.getUTCDay(),this.$H=t.getUTCHours(),this.$m=t.getUTCMinutes(),this.$s=t.getUTCSeconds(),this.$ms=t.getUTCMilliseconds()}else l.call(this)};var c=o.utcOffset;o.utcOffset=function(i,s){var r=this.$utils().u;if(r(i))return this.$u?0:r(this.$offset)?c.call(this):this.$offset;if("string"==typeof i&&(i=function(t){void 0===t&&(t="");var i=t.match(e);if(!i)return null;var s=(""+i[0]).match(n)||["-",0,0],r=s[0],o=60*+s[1]+ +s[2];return 0===o?0:"+"===r?o:-o}(i),null===i))return this;var o=Math.abs(i)<=16?60*i:i,a=this;if(s)return a.$offset=o,a.$u=0===i,a;if(0!==i){var l=this.$u?this.toDate().getTimezoneOffset():-1*this.utcOffset();(a=this.local().add(o+l,t)).$offset=o,a.$x.$localOffset=l}else a=this.utc();return a};var u=o.format;o.format=function(t){var e=t||(this.$u?"YYYY-MM-DDTHH:mm:ss[Z]":"");return u.call(this,e)},o.valueOf=function(){var t=this.$utils().u(this.$offset)?0:this.$offset+(this.$x.$localOffset||this.$d.getTimezoneOffset());return this.$d.valueOf()-6e4*t},o.isUTC=function(){return!!this.$u},o.toISOString=function(){return this.toDate().toISOString()},o.toString=function(){return this.toDate().toUTCString()};var d=o.toDate;o.toDate=function(t){return"s"===t&&this.$offset?r(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate():d.call(this)};var h=o.diff;o.diff=function(t,e,n){if(t&&this.$u===t.$u)return h.call(this,t,e,n);var i=this.local(),s=r(t).local();return h.call(i,s,e,n)}}}()}},e={};function n(i){var s=e[i];if(void 0!==s)return s.exports;var r=e[i]={exports:{}};return t[i].call(r.exports,r,r.exports,n),r.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";function t(t){const e=document.createElement("div");return e.innerHTML=t,e.firstElementChild}function e(t,e,n="beforeend"){e.insertAdjacentElement(n,t.getElement())}var i=n(484),s=n.n(i),r=n(178),o=n.n(r),a=n(646),l=n.n(a);s().extend(o()),s().extend(l());const c=t=>t.replace(t[0],t[0].toUpperCase()),u=(t,e)=>t?s()(t).utc().format(e):"",d={TAXI:"taxi",BUS:"bus",TRAIN:"train",SHIP:"ship",DRIVE:"drive",FLIGHT:"flight",CHECK_IN:"check-in",SIGHTSEEING:"sightseeing",RESTAURANT:"restaurant"},h={EVERYTHING:"everything",FUTURE:"future",PRESENT:"present",PAST:"past"},f={DAY:"day",EVENT:"event",TIME:"time",PRICE:"price",OFFER:"offer"},p="checked",m="disabled",v="hh:mm",$="YYYY-MM-DD",_="add",g="edit";class y{getTemplate(){return`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">${Object.values(f).map((t=>function(t){return`<div class="trip-sort__item  trip-sort__item--${t}">\n      <input id="sort-${t}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${t}" ${function(t){switch(t){case f.DAY:return p;case f.EVENT:case f.OFFER:return m;default:return""}}(t)}>\n      <label class="trip-sort__btn" for="sort-${t}">${c(t)}${"offer"===t?"s":""}</label>\n    </div>`}(t))).join("")}</form>`}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class b{getTemplate(){return'<ul class="trip-events__list">'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class M{constructor({point:t,offers:e,destination:n}){this.point=t,this.offersPoint=e,this.destinationPoint=n}getTemplate(){return function(t,e,n){const{basePrice:i,dateFrom:r,dateTo:o,offers:a,isFavorite:l,type:d}=t,h=u(r,"MMM D"),f=u(r,v),p=u(o,v),m=u(r,$),_=u(r,$),g=function(t){const[e,n,i]=t.split(",");switch(!0){case"00"!==e:return`${e}D ${n}H ${i}M`;case"00"!==n:return`${n}H ${i}M`;default:return`${i}M`}}((y=r,b=o,s().duration(s()(b).set("seconds",0).set("millisecond",0).diff(s()(y).set("seconds",0).set("millisecond",0))).format("DD,HH,mm")));var y,b;const M=function(t,e){return t.offers?t.offers.filter((t=>e.includes(t.id))).map((({title:t,price:e})=>`<li class="event__offer">\n          <span class="event__offer-title">${t}</span>\n          &plus;&euro;&nbsp;\n          <span class="event__offer-price">${e}</span>\n        </li>`)).join(""):""}(e,a),T=function(t,e){const n=c(e);return t?`${n} ${t.name}`:`${n}`}(n,d);return`<li class="trip-events__item">\n      <div class="event">\n        <time class="event__date" datetime="${m}">${h}</time>\n        <div class="event__type">\n          <img class="event__type-icon" width="42" height="42" src="img/icons/${d}.png" alt="Event type icon">\n        </div>\n        <h3 class="event__title">${T}</h3>\n        <div class="event__schedule">\n          <p class="event__time">\n            <time class="event__start-time" datetime="${m}T${f}">${f}</time>\n            &mdash;\n            <time class="event__end-time" datetime="${_}T${p}">${p}</time>\n          </p>\n          <p class="event__duration">${g}</p>\n        </div>\n        <p class="event__price">\n          &euro;&nbsp;<span class="event__price-value">${i}</span>\n        </p>\n        <h4 class="visually-hidden">Offers:</h4>\n        <ul class="event__selected-offers">\n           ${M}\n        </ul>\n        <button class="${l?"event__favorite-btn event__favorite-btn--active":"event__favorite-btn"}" type="button">\n          <span class="visually-hidden">Add to favorite</span>\n          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n          </svg>\n        </button>\n        <button class="event__rollup-btn" type="button">\n          <span class="visually-hidden">Open event</span>\n        </button>\n      </div>\n    </li>`}(this.point,this.offersPoint,this.destinationPoint)}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}const T={id:null,basePrice:0,dateFrom:"",dateTo:"",destination:"",isFavorite:!1,offers:[],type:d.FLIGHT};class D{constructor({point:t=T,offers:e,destination:n,editType:i}){this.point=t,this.offersPoint=e,this.destinationPoint=n,this.editType=i}getTemplate(){return function(t,e,n,i){const{basePrice:s,offers:r,type:o}=t,a=(l=o,Object.values(d).map((t=>`<div class="event__type-item">\n        <input id="event-type-${t}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${t}" ${t===l?p:""}>\n        <label class="event__type-label  event__type-label--${t}" for="event-type-${t}-1">${c(t)}</label>\n      </div>`)).join(""));var l;const u=function(t){return t?`<section class="event__section  event__section--offers">\n        <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n        <div class="event__available-offers">\n          ${t}\n        </div>\n      </section>`:""}(function(t,e){return t.offers?t.offers.map((({title:t,price:n,id:i})=>{const s=t.split(" ").findLast((t=>t.length>3)).toLowerCase();return`<div class="event__offer-selector">\n        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${s}-1" type="checkbox" name="event-offer-${s}" ${e.includes(i)?p:""}>\n        <label class="event__offer-label" for="event-offer-${s}-1">\n          <span class="event__offer-title">${t}</span>\n          +€&nbsp;\n          <span class="event__offer-price">${n}</span>\n        </label>\n      </div>`})).join(""):""}(e,r)),h=function(t){return t?`<section class="event__section  event__section--destination">\n        <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n        <p class="event__destination-description">${t}</p>\n      </section>`:""}(function(t,e){return t?e!==g&&t.pictures.length?`${t.description}\n          <div class="event__photos-container">\n            <div class="event__photos-tape">\n            ${t.pictures.map((({src:t,description:e})=>`<img class="event__photo" src="${t}" alt="${e}"></img>`)).join("")}\n            </div>\n          </div>`:t.description:""}(n,i)),f=c(o),m=n?n.name:"",v=i===g?s:0,$=function(t){return t===_?'<button class="event__reset-btn" type="reset">Cancel</button>':'<button class="event__reset-btn" type="reset">Delete</button>\n      <button class="event__rollup-btn" type="button">\n        <span class="visually-hidden">Open event</span>\n      </button>'}(i);return`<li class="trip-events__item">\n      <form class="event event--edit" action="#" method="post">\n        <header class="event__header">\n          <div class="event__type-wrapper">\n            <label class="event__type  event__type-btn" for="event-type-toggle-1">\n              <span class="visually-hidden">Choose event type</span>\n              <img class="event__type-icon" width="17" height="17" src="img/icons/${o}.png" alt="Event type icon">\n            </label>\n            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n            <div class="event__type-list">\n              <fieldset class="event__type-group">\n                <legend class="visually-hidden">Event type</legend>\n                ${a}\n              </fieldset>\n            </div>\n          </div>\n\n          <div class="event__field-group  event__field-group--destination">\n            <label class="event__label  event__type-output" for="event-destination-1">\n              ${f}\n            </label>\n            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${m}" list="destination-list-1">\n            <datalist id="destination-list-1">\n              <option value="Amsterdam"></option>\n              <option value="Geneva"></option>\n              <option value="Chamonix"></option>\n            </datalist>\n          </div>\n\n          <div class="event__field-group  event__field-group--time">\n            <label class="visually-hidden" for="event-start-time-1">From</label>\n            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 12:25">\n            —\n            <label class="visually-hidden" for="event-end-time-1">To</label>\n            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 13:35">\n          </div>\n\n          <div class="event__field-group  event__field-group--price">\n            <label class="event__label" for="event-price-1">\n              <span class="visually-hidden">Price</span>\n              €\n            </label>\n            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${v}">\n          </div>\n\n          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n          ${$}\n        </header>\n\n        <section class="event__details">\n          ${u}\n          ${h}\n        </section>\n      </form>\n    </li>`}(this.point,this.offersPoint,this.destinationPoint,this.editType)}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}const S=[{id:1,basePrice:100,dateFrom:"2019-10-02T18:10:00.845Z",dateTo:"2019-10-02T18:45:01.375Z",destination:"destination-01",isFavorite:!1,offers:["taxi-01"],type:"taxi"},{id:2,basePrice:1500,dateFrom:"2019-10-02T20:15:56.845Z",dateTo:"2019-10-02T23:35:13.375Z",destination:"destination-02",isFavorite:!0,offers:["flight-01","flight-02"],type:"flight"},{id:3,basePrice:3500,dateFrom:"2019-10-03T06:10:56.845Z",dateTo:"2019-10-03T06:30:13.375Z",destination:"destination-03",isFavorite:!1,offers:["check-in-01"],type:"check-in"},{id:4,basePrice:500,dateFrom:"2019-10-04T10:00:56.845Z",dateTo:"2019-10-10T12:30:13.375Z",destination:"destination-04",isFavorite:!0,offers:[],type:"drive"}];function w(){return(t=S)[Math.floor(Math.random()*t.length)];var t}const O=[{type:"taxi",offers:[{id:"taxi-01",title:"Order Uber",price:20},{id:"taxi-02",title:"Upgrade to a business class",price:120}]},{type:"flight",offers:[{id:"flight-01",title:"Add luggage",price:50},{id:"flight-02",title:"Switch to comfort",price:80},{id:"flight-03",title:"Add meal",price:15},{id:"flight-04",title:"Choose seats",price:5}]},{type:"check-in",offers:[{id:"check-in-01",title:"Add breakfast",price:50},{id:"check-in-02",title:"Cleaning room",price:150}]},{type:"drive",offers:[]}],k=[{id:"destination-01",description:"Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, it's renowned for its skiing.",name:"Chamonix",pictures:[{src:"https://loremflickr.com/248/152/chamonix,city?lock=1091",description:"Chamonix image"},{src:"https://loremflickr.com/248/152/chamonix,city?lock=1094",description:"Chamonix image"},{src:"https://loremflickr.com/248/152/chamonix,city?lock=1092",description:"Chamonix image"},{src:"https://loremflickr.com/248/152/chamonix,city?lock=1093",description:"Chamonix image"},{src:"https://loremflickr.com/248/152/chamonix,city?lock=1096",description:"Chamonix image"}]},{id:"destination-02",description:"Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.",name:"Geneva",pictures:[{src:"https://loremflickr.com/248/152/geneva,city?lock=1000",description:"Geneva image"},{src:"https://loremflickr.com/248/152/geneva,city?lock=1004",description:"Geneva image"},{src:"https://loremflickr.com/248/152/geneva,city?lock=1003",description:"Geneva image"},{src:"https://loremflickr.com/248/152/geneva,city?lock=1005",description:"Geneva image"},{src:"https://loremflickr.com/248/152/geneva,city?lock=1006",description:"Geneva image"}]},{id:"destination-03",description:"",name:"Paris",pictures:[]},{id:"destination-04",description:"London, the capital of England and the United Kingdom, is a 21st-century city with history stretching back to Roman times. At its centre stand the imposing Houses of Parliament, the iconic ‘Big Ben’ clock tower and Westminster Abbey, site of British monarch coronations.",name:"London",pictures:[]}],x=document.querySelector(".trip-main"),C=document.querySelector(".trip-controls__filters"),E=document.querySelector(".trip-events"),Y=new class{points=Array.from({length:4},w);getPoints(){return this.points}},H=new class{offers=O;getOffers(){return this.offers}getOffersByType(t){return this.offers.find((e=>e.type===t))??[]}},P=new class{destinations=k;getDestinations(){return this.destinations}getDestinationById(t){return this.destinations.find((e=>e.id===t))}},A=new class{pointListComponent=new b;constructor({mainContainer:t,pointsModel:e,offersModel:n,destinationsModel:i}){this.mainContainer=t,this.pointsModel=e,this.offersModel=n,this.destinationsModel=i}init(){this.points=[...this.pointsModel.getPoints()],e(new y,this.mainContainer),e(this.pointListComponent,this.mainContainer),e(new D({point:this.points[0],offers:this.offersModel.getOffersByType(this.points[0].type),destination:this.destinationsModel.getDestinationById(this.points[0].destination),editType:g}),this.pointListComponent.getElement());for(let t=1;t<this.points.length;t++)e(new M({point:this.points[t],offers:this.offersModel.getOffersByType(this.points[t].type),destination:this.destinationsModel.getDestinationById(this.points[t].destination)}),this.pointListComponent.getElement());e(new D({point:this.points[0],offers:this.offersModel.getOffersByType(this.points[0].type),destination:this.destinationsModel.getDestinationById(this.points[0].destination),editType:_}),this.pointListComponent.getElement())}}({mainContainer:E,pointsModel:Y,offersModel:H,destinationsModel:P});e(new class{getTemplate(){return'<section class="trip-main__trip-info  trip-info">\n      <div class="trip-info__main">\n        <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n\n        <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>\n      </div>\n\n      <p class="trip-info__cost">\n        Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n      </p>\n    </section>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}},x,"afterbegin"),e(new class{getTemplate(){return`<form class="trip-filters" action="#" method="get">\n      ${Object.values(h).map((t=>function(t){return`<div class="trip-filters__filter">\n      <input id="filter-${t}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${t}" ${function(t){return t===h.EVERYTHING?p:""}(t)}>\n      <label class="trip-filters__filter-label" for="filter-${t}">${c(t)}</label>\n    </div>`}(t))).join("")}\n      <button class="visually-hidden" type="submit">Accept filter</button>\n    </form>`}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}},C),A.init()})()})();
//# sourceMappingURL=bundle.9765369b5d3b5d95b281.js.map