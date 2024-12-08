(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[185],{33431:function(e,t,r){"use strict";r.d(t,{ZP:function(){return T}});class o{constructor(e=0,t="Network Error"){this.status=e,this.text=t}}let i={origin:"https://api.emailjs.com",blockHeadless:!1,storageProvider:(()=>{if("undefined"!=typeof localStorage)return{get:e=>Promise.resolve(localStorage.getItem(e)),set:(e,t)=>Promise.resolve(localStorage.setItem(e,t)),remove:e=>Promise.resolve(localStorage.removeItem(e))}})()},n=e=>e?"string"==typeof e?{publicKey:e}:"[object Object]"===e.toString()?e:{}:{},s=async(e,t,r={})=>{let n=await fetch(i.origin+e,{method:"POST",headers:r,body:t}),s=await n.text(),a=new o(n.status,s);if(n.ok)return a;throw a},a=(e,t,r)=>{if(!e||"string"!=typeof e)throw"The public key is required. Visit https://dashboard.emailjs.com/admin/account";if(!t||"string"!=typeof t)throw"The service ID is required. Visit https://dashboard.emailjs.com/admin";if(!r||"string"!=typeof r)throw"The template ID is required. Visit https://dashboard.emailjs.com/admin/templates"},l=e=>{if(e&&"[object Object]"!==e.toString())throw"The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/"},c=e=>e.webdriver||!e.languages||0===e.languages.length,u=()=>new o(451,"Unavailable For Headless Browser"),d=(e,t)=>{if(!Array.isArray(e))throw"The BlockList list has to be an array";if("string"!=typeof t)throw"The BlockList watchVariable has to be a string"},f=e=>!e.list?.length||!e.watchVariable,m=(e,t)=>e instanceof FormData?e.get(t):e[t],p=(e,t)=>{if(f(e))return!1;d(e.list,e.watchVariable);let r=m(t,e.watchVariable);return"string"==typeof r&&e.list.includes(r)},h=()=>new o(403,"Forbidden"),g=(e,t)=>{if("number"!=typeof e||e<0)throw"The LimitRate throttle has to be a positive number";if(t&&"string"!=typeof t)throw"The LimitRate ID has to be a non-empty string"},b=async(e,t,r)=>{let o=Number(await r.get(e)||0);return t-Date.now()+o},y=async(e,t,r)=>{if(!t.throttle||!r)return!1;g(t.throttle,t.id);let o=t.id||e,i=await b(o,t.throttle,r);return i>0||(await r.set(o,Date.now().toString()),!1)},v=()=>new o(429,"Too Many Requests"),w=async(e,t,r,o)=>{let d=n(o),f=d.publicKey||i.publicKey,m=d.blockHeadless||i.blockHeadless,g=d.storageProvider||i.storageProvider,b={...i.blockList,...d.blockList},w={...i.limitRate,...d.limitRate};return m&&c(navigator)?Promise.reject(u()):(a(f,e,t),l(r),r&&p(b,r))?Promise.reject(h()):await y(location.pathname,w,g)?Promise.reject(v()):s("/api/v1.0/email/send",JSON.stringify({lib_version:"4.4.1",user_id:f,service_id:e,template_id:t,template_params:r}),{"Content-type":"application/json"})},_=e=>{if(!e||"FORM"!==e.nodeName)throw"The 3rd parameter is expected to be the HTML form element or the style selector of the form"},k=e=>"string"==typeof e?document.querySelector(e):e,j=async(e,t,r,o)=>{let l=n(o),d=l.publicKey||i.publicKey,f=l.blockHeadless||i.blockHeadless,m=i.storageProvider||l.storageProvider,g={...i.blockList,...l.blockList},b={...i.limitRate,...l.limitRate};if(f&&c(navigator))return Promise.reject(u());let w=k(r);a(d,e,t),_(w);let j=new FormData(w);return p(g,j)?Promise.reject(h()):await y(location.pathname,b,m)?Promise.reject(v()):(j.append("lib_version","4.4.1"),j.append("service_id",e),j.append("template_id",t),j.append("user_id",d),s("/api/v1.0/email/send-form",j))};var T={init:(e,t="https://api.emailjs.com")=>{if(!e)return;let r=n(e);i.publicKey=r.publicKey,i.blockHeadless=r.blockHeadless,i.storageProvider=r.storageProvider,i.blockList=r.blockList,i.limitRate=r.limitRate,i.origin=r.origin||t},send:w,sendForm:j,EmailJSResponseStatus:o}},62601:function(e,t,r){"use strict";var o,i;e.exports=(null==(o=r.g.process)?void 0:o.env)&&"object"==typeof(null==(i=r.g.process)?void 0:i.env)?r.g.process:r(58960)},69799:function(e,t,r){Promise.resolve().then(r.bind(r,56742))},56742:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return u}});var o=r(57437),i=r(1654),n=r.n(i);r(92489);var s=r(48385),a=r(2265),l=r(33431),c=r(62601);function u(e){let{children:t}=e;return(0,a.useEffect)(()=>{document.getElementById("google-maps-script")||new Promise(e=>{let t=document.createElement("script");t.id="google-maps-script",t.src="https://maps.googleapis.com/maps/api/js?key=".concat(c.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,"&libraries=places&loading=async"),t.async=!0,t.onload=()=>{console.log("Google Maps API loaded successfully"),e()},t.onerror=e=>{console.error("Error loading Google Maps API:",e)},document.head.appendChild(t)})},[]),(0,a.useEffect)(()=>{let e="8FEFCWK74pLWFzXeg";if(!e){console.error("EmailJS Public Key ist nicht definiert!");return}try{l.ZP.init(e),console.log("EmailJS erfolgreich initialisiert")}catch(e){console.error("Fehler bei der EmailJS-Initialisierung:",e)}},[]),(0,o.jsxs)("html",{lang:"de",children:[(0,o.jsxs)("head",{children:[(0,o.jsx)("title",{children:"Premium Energiepass\xae Online"}),(0,o.jsx)("meta",{name:"description",content:"Proberechnung Gratis! Erstellen Sie Ihren Energieausweis schnell und unkompliziert online"})]}),(0,o.jsxs)("body",{className:"".concat(n().className," antialiased"),children:[t,(0,o.jsx)(s.Z,{})]})]})}},48385:function(e,t,r){"use strict";r.d(t,{Z:function(){return n}});var o=r(57437),i=r(2265);function n(){let[e,t]=(0,i.useState)(!1),r=()=>{window.pageYOffset>300?t(!0):t(!1)};return(0,i.useEffect)(()=>(window.addEventListener("scroll",r),()=>{window.removeEventListener("scroll",r)}),[]),(0,o.jsx)(o.Fragment,{children:e&&(0,o.jsx)("button",{onClick:()=>{window.scrollTo({top:0,behavior:"smooth"})},className:"fixed bottom-8 right-8 bg-green-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 hover:shadow-xl z-50 flex items-center justify-center group","aria-label":"Zur\xfcck nach oben",children:(0,o.jsx)("svg",{className:"w-6 h-6 transform group-hover:-translate-y-1 transition-transform duration-300",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,o.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 10l7-7m0 0l7 7m-7-7v18"})})})})}},92489:function(){},1654:function(e){e.exports={style:{fontFamily:"'__Inter_d65c78', '__Inter_Fallback_d65c78'",fontStyle:"normal"},className:"__className_d65c78"}},58960:function(e){!function(){var t={229:function(e){var t,r,o,i=e.exports={};function n(){throw Error("setTimeout has not been defined")}function s(){throw Error("clearTimeout has not been defined")}function a(e){if(t===setTimeout)return setTimeout(e,0);if((t===n||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(r){try{return t.call(null,e,0)}catch(r){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:n}catch(e){t=n}try{r="function"==typeof clearTimeout?clearTimeout:s}catch(e){r=s}}();var l=[],c=!1,u=-1;function d(){c&&o&&(c=!1,o.length?l=o.concat(l):u=-1,l.length&&f())}function f(){if(!c){var e=a(d);c=!0;for(var t=l.length;t;){for(o=l,l=[];++u<t;)o&&o[u].run();u=-1,t=l.length}o=null,c=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===s||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function m(e,t){this.fun=e,this.array=t}function p(){}i.nextTick=function(e){var t=Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];l.push(new m(e,t)),1!==l.length||c||a(f)},m.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=p,i.addListener=p,i.once=p,i.off=p,i.removeListener=p,i.removeAllListeners=p,i.emit=p,i.prependListener=p,i.prependOnceListener=p,i.listeners=function(e){return[]},i.binding=function(e){throw Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(e){throw Error("process.chdir is not supported")},i.umask=function(){return 0}}},r={};function o(e){var i=r[e];if(void 0!==i)return i.exports;var n=r[e]={exports:{}},s=!0;try{t[e](n,n.exports,o),s=!1}finally{s&&delete r[e]}return n.exports}o.ab="//";var i=o(229);e.exports=i}()},30622:function(e,t,r){"use strict";var o=r(2265),i=Symbol.for("react.element"),n=Symbol.for("react.fragment"),s=Object.prototype.hasOwnProperty,a=o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,r){var o,n={},c=null,u=null;for(o in void 0!==r&&(c=""+r),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(u=t.ref),t)s.call(t,o)&&!l.hasOwnProperty(o)&&(n[o]=t[o]);if(e&&e.defaultProps)for(o in t=e.defaultProps)void 0===n[o]&&(n[o]=t[o]);return{$$typeof:i,type:e,key:c,ref:u,props:n,_owner:a.current}}t.Fragment=n,t.jsx=c,t.jsxs=c},57437:function(e,t,r){"use strict";e.exports=r(30622)}},function(e){e.O(0,[971,472,744],function(){return e(e.s=69799)}),_N_E=e.O()}]);