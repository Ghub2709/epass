(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[308],{30141:function(e,n,t){Promise.resolve().then(t.t.bind(t,90413,23)),Promise.resolve().then(t.bind(t,72263)),Promise.resolve().then(t.bind(t,72644))},72644:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return r}});var i=t(2265);function r(){return(0,i.useEffect)(()=>{let e=document.createElement("script");return e.text='!function(window){const host="https://labs.heygen.com",url=host+"/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJlZjA4MDM5YTQxMzU0ZWQ1YTIwNTY1ZGI4%0D%0AOTkzNzNmMyIsInByZXZpZXdJbWciOiJodHRwczovL2ZpbGVzMi5oZXlnZW4uYWkvYXZhdGFyL3Yz%0D%0AL2VmMDgwMzlhNDEzNTRlZDVhMjA1NjVkYjg5OTM3M2YzL2Z1bGwvMi4yL3ByZXZpZXdfdGFyZ2V0%0D%0ALndlYnAiLCJuZWVkUmVtb3ZlQmFja2dyb3VuZCI6ZmFsc2UsImtub3dsZWRnZUJhc2VJZCI6IjVm%0D%0AZTU5M2Q2YTgyMjQzYTNiYWRmNmM3ZTlkOTA1OTFmIiwidXNlcm5hbWUiOiI0YjhmYzJlN2NlNDM0%0D%0ANjdmODUxNGY0MGRlNmQxYWVjMCJ9&inIFrame=1",clientWidth=document.body.clientWidth,wrapDiv=document.createElement("div");wrapDiv.id="heygen-streaming-embed";const container=document.createElement("div");container.id="heygen-streaming-container";const stylesheet=document.createElement("style");stylesheet.innerHTML=`\n      #heygen-streaming-embed {\n        z-index: 9999;\n        position: fixed;\n        left: 20px;\n        bottom: 20px;\n        width: 80px;\n        height: 80px;\n        border-radius: 50%;\n        border: 2px solid #16a34a;\n        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);\n        transition: all 0.3s ease;\n        overflow: hidden;\n        opacity: 0;\n        visibility: hidden;\n        cursor: pointer;\n      }\n      #heygen-streaming-embed.show {\n        opacity: 1;\n        visibility: visible;\n      }\n      #heygen-streaming-embed.expand {\n        ${clientWidth<540?\n          "width: 90%; height: 300px; left: 5%; border-radius: 16px;" :\n          "width: 400px; height: 500px; border-radius: 16px;"\n        }\n      }\n      #heygen-streaming-embed:not(.expand):hover {\n        transform: scale(1.1);\n        box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.15);\n      }\n      #heygen-streaming-container {\n        width: 100%;\n        height: 100%;\n      }\n      #heygen-streaming-container iframe {\n        width: 100%;\n        height: 100%;\n        border: 0;\n      }\n      #heygen-streaming-embed:not(.expand)::after {\n        content: "Fragen?";\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        transform: translate(-50%, -50%);\n        color: white;\n        font-size: 12px;\n        font-weight: bold;\n        text-shadow: 0 1px 2px rgba(0,0,0,0.3);\n        pointer-events: none;\n      }\n      #heygen-streaming-embed:not(.expand)::before {\n        content: "";\n        position: absolute;\n        inset: 0;\n        background: rgba(22, 163, 74, 0.1);\n        pointer-events: none;\n      }\n    `;const iframe=document.createElement("iframe");iframe.allowFullscreen=!1,iframe.title="AI Assistant",iframe.role="dialog",iframe.allow="microphone",iframe.src=url;let visible=!1,initial=!1;window.addEventListener("message",(e=>{e.origin===host&&e.data&&e.data.type&&"streaming-embed"===e.data.type&&("init"===e.data.action?(initial=!0,wrapDiv.classList.toggle("show",initial)):"show"===e.data.action?(visible=!0,wrapDiv.classList.toggle("expand",visible)):"hide"===e.data.action&&(visible=!1,wrapDiv.classList.toggle("expand",visible)))})),container.appendChild(iframe),wrapDiv.appendChild(stylesheet),wrapDiv.appendChild(container),document.body.appendChild(wrapDiv)}(window);',document.body.appendChild(e),()=>{let n=document.getElementById("heygen-streaming-embed");n&&n.remove(),e.remove()}},[]),null}},72263:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return s}});var i=t(57437),r=t(61396),o=t.n(r);function s(e){let{type:n}=e;return"primary"===n?(0,i.jsxs)("div",{className:"my-12 bg-primary-50 p-8 rounded-lg border border-primary-100 not-prose",children:[(0,i.jsx)("h3",{className:"text-2xl font-bold text-primary-800 mb-4",children:"Zeit f\xfcr Ihren Energieausweis?"}),(0,i.jsx)("p",{className:"text-primary-700 mb-6",children:"Erstellen Sie Ihren Energieausweis jetzt online - schnell, unkompliziert und rechtssicher."}),(0,i.jsx)(o(),{href:"/energieausweis-erstellen",className:"inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors",children:"Jetzt Energieausweis erstellen →"})]}):"secondary"===n?(0,i.jsxs)("div",{className:"my-12 bg-blue-50 p-8 rounded-lg border border-blue-100 not-prose",children:[(0,i.jsx)("h3",{className:"text-2xl font-bold text-blue-800 mb-4",children:"Kostenlose Erstberatung sichern!"}),(0,i.jsx)("p",{className:"text-blue-700 mb-6",children:"Lassen Sie sich von unseren Experten beraten und erhalten Sie eine individuelle Empfehlung f\xfcr Ihren Energieausweis."}),(0,i.jsx)(o(),{href:"/proberechnung",className:"inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors",children:"Kostenlose Proberechnung anfordern →"})]}):(0,i.jsxs)("div",{className:"my-12 bg-primary-50 p-8 rounded-lg border border-primary-100 not-prose",children:[(0,i.jsx)("h3",{className:"text-2xl font-bold text-primary-800 mb-4",children:"Noch Fragen?"}),(0,i.jsx)("p",{className:"text-primary-700 mb-6",children:"Sprechen Sie direkt mit unserem KI-Assistenten oder lassen Sie sich pers\xf6nlich beraten."}),(0,i.jsxs)("div",{className:"flex gap-4 flex-wrap",children:[(0,i.jsx)("button",{onClick:()=>{"function"==typeof window.openChat&&window.openChat()},className:"inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors",children:"Chat \xf6ffnen →"}),(0,i.jsx)(o(),{href:"/kontakt",className:"inline-block bg-white text-primary-700 border border-primary-200 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors",children:"Kontakt aufnehmen"})]})]})}},30622:function(e,n,t){"use strict";var i=t(2265),r=Symbol.for("react.element"),o=Symbol.for("react.fragment"),s=Object.prototype.hasOwnProperty,a=i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function d(e,n,t){var i,o={},d=null,c=null;for(i in void 0!==t&&(d=""+t),void 0!==n.key&&(d=""+n.key),void 0!==n.ref&&(c=n.ref),n)s.call(n,i)&&!l.hasOwnProperty(i)&&(o[i]=n[i]);if(e&&e.defaultProps)for(i in n=e.defaultProps)void 0===o[i]&&(o[i]=n[i]);return{$$typeof:r,type:e,key:d,ref:c,props:o,_owner:a.current}}n.Fragment=o,n.jsx=d,n.jsxs=d},57437:function(e,n,t){"use strict";e.exports=t(30622)},61396:function(e,n,t){e.exports=t(68326)}},function(e){e.O(0,[413,326,971,472,744],function(){return e(e.s=30141)}),_N_E=e.O()}]);