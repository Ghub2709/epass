(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[185],{33431:function(e,t,r){"use strict";r.d(t,{ZP:function(){return P}});class i{constructor(e=0,t="Network Error"){this.status=e,this.text=t}}let o={origin:"https://api.emailjs.com",blockHeadless:!1,storageProvider:(()=>{if("undefined"!=typeof localStorage)return{get:e=>Promise.resolve(localStorage.getItem(e)),set:(e,t)=>Promise.resolve(localStorage.setItem(e,t)),remove:e=>Promise.resolve(localStorage.removeItem(e))}})()},s=e=>e?"string"==typeof e?{publicKey:e}:"[object Object]"===e.toString()?e:{}:{},n=async(e,t,r={})=>{let s=await fetch(o.origin+e,{method:"POST",headers:r,body:t}),n=await s.text(),a=new i(s.status,n);if(s.ok)return a;throw a},a=(e,t,r)=>{if(!e||"string"!=typeof e)throw"The public key is required. Visit https://dashboard.emailjs.com/admin/account";if(!t||"string"!=typeof t)throw"The service ID is required. Visit https://dashboard.emailjs.com/admin";if(!r||"string"!=typeof r)throw"The template ID is required. Visit https://dashboard.emailjs.com/admin/templates"},l=e=>{if(e&&"[object Object]"!==e.toString())throw"The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/"},c=e=>e.webdriver||!e.languages||0===e.languages.length,d=()=>new i(451,"Unavailable For Headless Browser"),u=(e,t)=>{if(!Array.isArray(e))throw"The BlockList list has to be an array";if("string"!=typeof t)throw"The BlockList watchVariable has to be a string"},m=e=>!e.list?.length||!e.watchVariable,h=(e,t)=>e instanceof FormData?e.get(t):e[t],f=(e,t)=>{if(m(e))return!1;u(e.list,e.watchVariable);let r=h(t,e.watchVariable);return"string"==typeof r&&e.list.includes(r)},p=()=>new i(403,"Forbidden"),b=(e,t)=>{if("number"!=typeof e||e<0)throw"The LimitRate throttle has to be a positive number";if(t&&"string"!=typeof t)throw"The LimitRate ID has to be a non-empty string"},g=async(e,t,r)=>{let i=Number(await r.get(e)||0);return t-Date.now()+i},w=async(e,t,r)=>{if(!t.throttle||!r)return!1;b(t.throttle,t.id);let i=t.id||e,o=await g(i,t.throttle,r);return o>0||(await r.set(i,Date.now().toString()),!1)},y=()=>new i(429,"Too Many Requests"),v=async(e,t,r,i)=>{let u=s(i),m=u.publicKey||o.publicKey,h=u.blockHeadless||o.blockHeadless,b=u.storageProvider||o.storageProvider,g={...o.blockList,...u.blockList},v={...o.limitRate,...u.limitRate};return h&&c(navigator)?Promise.reject(d()):(a(m,e,t),l(r),r&&f(g,r))?Promise.reject(p()):await w(location.pathname,v,b)?Promise.reject(y()):n("/api/v1.0/email/send",JSON.stringify({lib_version:"4.4.1",user_id:m,service_id:e,template_id:t,template_params:r}),{"Content-type":"application/json"})},_=e=>{if(!e||"FORM"!==e.nodeName)throw"The 3rd parameter is expected to be the HTML form element or the style selector of the form"},k=e=>"string"==typeof e?document.querySelector(e):e,j=async(e,t,r,i)=>{let l=s(i),u=l.publicKey||o.publicKey,m=l.blockHeadless||o.blockHeadless,h=o.storageProvider||l.storageProvider,b={...o.blockList,...l.blockList},g={...o.limitRate,...l.limitRate};if(m&&c(navigator))return Promise.reject(d());let v=k(r);a(u,e,t),_(v);let j=new FormData(v);return f(b,j)?Promise.reject(p()):await w(location.pathname,g,h)?Promise.reject(y()):(j.append("lib_version","4.4.1"),j.append("service_id",e),j.append("template_id",t),j.append("user_id",u),n("/api/v1.0/email/send-form",j))};var P={init:(e,t="https://api.emailjs.com")=>{if(!e)return;let r=s(e);o.publicKey=r.publicKey,o.blockHeadless=r.blockHeadless,o.storageProvider=r.storageProvider,o.blockList=r.blockList,o.limitRate=r.limitRate,o.origin=r.origin||t},send:v,sendForm:j,EmailJSResponseStatus:i}},69799:function(e,t,r){Promise.resolve().then(r.bind(r,56742))},56742:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return c}});var i=r(57437),o=r(1654),s=r.n(o);r(92489);var n=r(48385),a=r(2265),l=r(33431);function c(e){let{children:t}=e;return(0,a.useEffect)(()=>{let e="8FEFCWK74pLWFzXeg";if(!e){console.error("EmailJS Public Key ist nicht definiert!");return}try{l.ZP.init(e),console.log("EmailJS erfolgreich initialisiert")}catch(e){console.error("Fehler bei der EmailJS-Initialisierung:",e)}},[]),(0,i.jsxs)("html",{lang:"de",children:[(0,i.jsxs)("head",{children:[(0,i.jsx)("title",{children:"Premium Energiepass\xae Online"}),(0,i.jsx)("meta",{name:"description",content:"Proberechnung Gratis! Erstellen Sie Ihren Energieausweis schnell und unkompliziert online"})]}),(0,i.jsxs)("body",{className:"".concat(s().className," antialiased"),children:[t,(0,i.jsx)(n.Z,{})]})]})}},48385:function(e,t,r){"use strict";r.d(t,{Z:function(){return s}});var i=r(57437),o=r(2265);function s(){let[e,t]=(0,o.useState)(!1),r=()=>{window.pageYOffset>300?t(!0):t(!1)};return(0,o.useEffect)(()=>(window.addEventListener("scroll",r),()=>{window.removeEventListener("scroll",r)}),[]),(0,i.jsx)(i.Fragment,{children:e&&(0,i.jsx)("button",{onClick:()=>{window.scrollTo({top:0,behavior:"smooth"})},className:"fixed bottom-8 right-8 bg-green-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 hover:shadow-xl z-50 flex items-center justify-center group","aria-label":"Zur\xfcck nach oben",children:(0,i.jsx)("svg",{className:"w-6 h-6 transform group-hover:-translate-y-1 transition-transform duration-300",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,i.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 10l7-7m0 0l7 7m-7-7v18"})})})})}},92489:function(){},1654:function(e){e.exports={style:{fontFamily:"'__Inter_d65c78', '__Inter_Fallback_d65c78'",fontStyle:"normal"},className:"__className_d65c78"}},30622:function(e,t,r){"use strict";var i=r(2265),o=Symbol.for("react.element"),s=Symbol.for("react.fragment"),n=Object.prototype.hasOwnProperty,a=i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,r){var i,s={},c=null,d=null;for(i in void 0!==r&&(c=""+r),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(d=t.ref),t)n.call(t,i)&&!l.hasOwnProperty(i)&&(s[i]=t[i]);if(e&&e.defaultProps)for(i in t=e.defaultProps)void 0===s[i]&&(s[i]=t[i]);return{$$typeof:o,type:e,key:c,ref:d,props:s,_owner:a.current}}t.Fragment=s,t.jsx=c,t.jsxs=c},57437:function(e,t,r){"use strict";e.exports=r(30622)}},function(e){e.O(0,[971,472,744],function(){return e(e.s=69799)}),_N_E=e.O()}]);