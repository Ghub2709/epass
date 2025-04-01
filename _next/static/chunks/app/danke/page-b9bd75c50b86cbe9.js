(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[846],{13156:function(e,s,r){Promise.resolve().then(r.bind(r,59334))},59334:function(e,s,r){"use strict";r.r(s),r.d(s,{default:function(){return x}});var t=r(57437),n=r(347),a=r(18584),i=r(2265),l=r(61396),o=r.n(l),c=r(16691),d=r.n(c),h=r(24033);function x(){let e=(0,h.useSearchParams)(),s=(null==e?void 0:e.get("address"))||"",r=(null==e?void 0:e.get("type"))||"house",l=(null==e?void 0:e.get("year"))||"",c=(null==e?void 0:e.get("method"))||"email",[x,m]=(0,i.useState)(!1),[g,u]=(0,i.useState)(180),[j,p]=(0,i.useState)(!1),f=(0,i.useRef)(null),b={house:"https://buy.stripe.com/6oE4iIdtrfFC7Ty288?locale=de",apartment4:"https://buy.stripe.com/fZeg1qgFDdxu0r6289?locale=de",apartment5:"https://buy.stripe.com/8wM16w753bpmb5K4gi?locale=de",commercial:"https://buy.stripe.com/5kA7uUexv8da8XCfZ1?locale=de"},N=e=>b[e]||b.house;return(0,i.useEffect)(()=>{if(g<=0)return;let e=setTimeout(()=>{u(g-1)},1e3);return()=>clearTimeout(e)},[g]),setTimeout(()=>{m(!0)},1e3),(0,t.jsxs)("main",{className:"bg-white",children:[(0,t.jsxs)("section",{className:"relative bg-gradient-to-b from-green-50 via-white to-white py-20",children:[(0,t.jsx)("div",{className:"absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-green-50 to-blue-50 -z-10"}),(0,t.jsx)("div",{className:"absolute top-20 left-0 opacity-15 -z-10",children:(0,t.jsxs)("svg",{width:"404",height:"384",fill:"none",viewBox:"0 0 404 384",children:[(0,t.jsx)("defs",{children:(0,t.jsx)("pattern",{id:"pattern1",x:"0",y:"0",width:"20",height:"20",patternUnits:"userSpaceOnUse",children:(0,t.jsx)("rect",{x:"0",y:"0",width:"4",height:"4",fill:"currentColor",className:"text-green-200"})})}),(0,t.jsx)("rect",{width:"404",height:"384",fill:"url(#pattern1)"})]})}),(0,t.jsx)("div",{className:"absolute top-20 right-0 opacity-15 -z-10",children:(0,t.jsxs)("svg",{width:"404",height:"384",fill:"none",viewBox:"0 0 404 384",children:[(0,t.jsx)("defs",{children:(0,t.jsx)("pattern",{id:"pattern2",x:"0",y:"0",width:"20",height:"20",patternUnits:"userSpaceOnUse",children:(0,t.jsx)("rect",{x:"0",y:"0",width:"4",height:"4",fill:"currentColor",className:"text-blue-200"})})}),(0,t.jsx)("rect",{width:"404",height:"384",fill:"url(#pattern2)"})]})}),(0,t.jsx)("div",{className:"container mx-auto px-6",children:(0,t.jsx)("div",{className:"max-w-4xl mx-auto",children:(0,t.jsxs)("div",{className:"max-w-3xl mx-auto text-center",children:[(0,t.jsx)("div",{className:"flex justify-center mb-10",children:(0,t.jsxs)("div",{className:"relative w-28 h-28",children:[(0,t.jsx)(n.E.div,{initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},transition:{duration:.5},className:"absolute inset-0 bg-green-100 rounded-full"}),(0,t.jsx)(n.E.div,{initial:{pathLength:0,opacity:0},animate:{pathLength:1,opacity:1},transition:{duration:.8,ease:"easeInOut"},className:"absolute inset-0 flex items-center justify-center",children:(0,t.jsx)("svg",{className:"w-16 h-16 text-green-600",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",children:(0,t.jsx)(n.E.path,{initial:{pathLength:0},animate:{pathLength:1},transition:{duration:.8,ease:"easeInOut"},strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2.5,d:"M5 13l4 4L19 7"})})})]})}),(0,t.jsxs)(n.E.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.3,duration:.5},className:"space-y-8",children:[(0,t.jsxs)("h1",{className:"text-4xl lg:text-5xl font-bold leading-tight",children:[(0,t.jsx)("span",{className:"block mb-3",children:"Herzlichen Gl\xfcckwunsch!"}),(0,t.jsx)("span",{className:"block relative",children:(0,t.jsx)("span",{className:"bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-800 animate-gradient-x",children:"Sie haben eine hervorragende Wahl getroffen"})})]}),(0,t.jsxs)("p",{className:"text-lg text-gray-700 leading-relaxed mt-6 max-w-3xl mx-auto",children:["Als einziger Anbieter kombinieren wir die ",(0,t.jsx)("span",{className:"font-semibold text-green-600",children:"Effizienz digitaler Prozesse"})," mit der ",(0,t.jsx)("span",{className:"font-semibold text-green-600",children:"Qualit\xe4t eines lokalen Dienstleisters"})," aus Bremen. Sie profitieren von schnellen Online-Abl\xe4ufen und gleichzeitig von unserem pers\xf6nlichen Service vor Ort."]}),(0,t.jsx)("p",{className:"text-lg text-gray-700",children:"email"===c?(0,t.jsx)(t.Fragment,{children:"Ihre Proberechnung wurde an Ihre E-Mail gesendet und auf Ihren Rechner heruntergeladen."}):(0,t.jsx)(t.Fragment,{children:"Ihre Proberechnung erhalten Sie in K\xfcrze per WhatsApp auf Ihr Smartphone."})}),(0,t.jsxs)("div",{className:"mt-10 bg-green-50 rounded-xl shadow-sm p-8 border border-green-100 text-left",children:[(0,t.jsx)("h3",{className:"text-xl font-semibold text-gray-800 mb-5",children:"Ihre eingegebenen Daten:"}),(0,t.jsxs)("ul",{className:"space-y-4",children:[(0,t.jsxs)("li",{className:"flex items-center gap-3",children:[(0,t.jsxs)("svg",{className:"w-6 h-6 text-green-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:[(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"}),(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15 11a3 3 0 11-6 0 3 3 0 016 0z"})]}),(0,t.jsxs)("span",{className:"text-gray-700",children:[(0,t.jsx)("strong",{children:"Adresse:"})," ",s]})]}),(0,t.jsxs)("li",{className:"flex items-center gap-3",children:[(0,t.jsx)("svg",{className:"w-6 h-6 text-green-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"})}),(0,t.jsxs)("span",{className:"text-gray-700",children:[(0,t.jsx)("strong",{children:"Geb\xe4udetyp:"})," ",(e=>{switch(e){case"house":return"Einfamilienhaus";case"apartment4":return"Mehrfamilienhaus bis 4 Wohneinheiten";case"apartment5":return"Mehrfamilienhaus \xfcber 4 Wohneinheiten";case"commercial":return"Nichtwohngeb\xe4ude (NWG)";default:return e}})(r)]})]}),(0,t.jsxs)("li",{className:"flex items-center gap-3",children:[(0,t.jsx)("svg",{className:"w-6 h-6 text-green-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"})}),(0,t.jsxs)("span",{className:"text-gray-700",children:[(0,t.jsx)("strong",{children:"Baujahr:"})," ",l]})]})]})]}),(0,t.jsx)("div",{className:"mt-16 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-4 shadow-xl",children:(0,t.jsxs)("div",{className:"relative bg-white rounded-xl overflow-hidden border-2 border-green-500",children:[(0,t.jsx)("div",{className:"absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-green-600"}),(0,t.jsxs)("div",{className:"absolute top-6 right-6 flex items-center justify-center",children:[(0,t.jsx)("div",{className:"absolute w-16 h-16 bg-red-400 opacity-20 rounded-full animate-ping"}),(0,t.jsx)("div",{className:"relative bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full font-bold text-lg",children:(e=>{let s=e%60;return"".concat(Math.floor(e/60),":").concat(s<10?"0":"").concat(s)})(g)})]}),(0,t.jsxs)("div",{className:"pt-20 pb-12 px-10",children:[(0,t.jsxs)("div",{className:"text-center mb-10",children:[(0,t.jsx)("span",{className:"inline-block bg-green-100 text-green-800 text-sm font-semibold px-4 py-1.5 rounded-full mb-4",children:"EXKLUSIVES ANGEBOT"}),(0,t.jsxs)("h2",{className:"text-3xl md:text-4xl font-extrabold text-gray-900 mb-6",children:[(0,t.jsx)("span",{className:"block",children:"Sparen Sie jetzt die komplette"}),(0,t.jsx)("span",{className:"text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400",children:"Mehrwertsteuer!"})]}),(0,t.jsxs)("p",{className:"text-xl text-gray-700 mb-10 max-w-2xl mx-auto",children:["Nutzen Sie dieses ",(0,t.jsx)("span",{className:"font-bold",children:"zeitlich begrenzte Angebot"})," und sparen Sie 19% bei Ihrer Bestellung des Energieausweises."]})]}),(0,t.jsx)("div",{className:"bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 mb-10 relative",children:(0,t.jsxs)("div",{className:"text-center",children:[(0,t.jsx)("p",{className:"text-gray-500 mb-4",children:"Ihr exklusiver Rabattcode:"}),(0,t.jsxs)("div",{className:"flex items-center justify-center",children:[(0,t.jsx)("span",{ref:f,className:"text-lg md:text-2xl font-bold text-gray-800 tracking-widest bg-white px-6 py-3 rounded-l-lg border-y-2 border-l-2 border-gray-300",children:"MWSTGESCHENKT"}),(0,t.jsx)("button",{onClick:()=>{if(f.current){let e=f.current.innerText;navigator.clipboard.writeText(e),p(!0),setTimeout(()=>p(!1),2e3)}},className:"bg-green-600 hover:bg-green-700 text-white px-4 py-4 rounded-r-lg transition-colors duration-200 border-y-2 border-r-2 border-green-600 hover:border-green-700",children:j?(0,t.jsx)("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 13l4 4L19 7"})}):(0,t.jsx)("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"})})})]}),j&&(0,t.jsx)("p",{className:"text-green-600 mt-3 absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-medium",children:"✓ Code in die Zwischenablage kopiert!"})]})}),(0,t.jsxs)("div",{className:"text-center",children:[(0,t.jsxs)("a",{href:"".concat(N(r)).concat("house"===r?"&":"?","prefilled_code=MWSTGESCHENKT"),target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center justify-center px-10 py-5  bg-gradient-to-r from-green-600 to-green-500  hover:from-green-700 hover:to-green-600  text-white text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1",children:[(0,t.jsx)("span",{children:"Jetzt Ihren Energieausweis bestellen"}),(0,t.jsx)("svg",{className:"ml-3 w-6 h-6 animate-pulse",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M17 8l4 4m0 0l-4 4m4-4H3"})})]}),(0,t.jsx)("p",{className:"mt-5 text-sm text-gray-500",children:'19% Rabatt wird beim Checkout mit Code "MWSTGESCHENKT" automatisch angewendet'}),(0,t.jsx)("div",{className:"mt-5 flex justify-center",children:(0,t.jsx)("img",{src:"/images/2000+ Google Rezensionen.svg",alt:"\xdcber 2000 Google Rezensionen",className:"max-w-full h-auto",width:220,height:45,loading:"lazy"})})]})]})]})}),(0,t.jsxs)("div",{className:"pt-24 mt-24",children:[(0,t.jsx)("h2",{className:"text-2xl font-semibold text-gray-800 mb-8 text-center",children:"Ihre n\xe4chsten Schritte:"}),(0,t.jsxs)("ul",{className:"space-y-8",children:[(0,t.jsxs)("li",{className:"flex items-start gap-5",children:[(0,t.jsx)("div",{className:"w-10 h-10 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mt-1",children:(0,t.jsx)("span",{className:"font-bold text-green-600",children:"1"})}),(0,t.jsxs)("div",{className:"text-left",children:[(0,t.jsx)("h3",{className:"font-medium text-gray-800 text-lg",children:"Proberechnung erhalten"}),(0,t.jsx)("p",{className:"text-gray-600 mt-2",children:"email"===c?"Sie haben Ihre Proberechnung bereits als Download erhalten. Bitte pr\xfcfen Sie auch Ihren E-Mail-Posteingang sowie den Spam-Ordner.":"Sie erhalten Ihre Proberechnung in K\xfcrze per WhatsApp. Bitte stellen Sie sicher, dass Ihr Telefon eingeschaltet ist."})]})]}),(0,t.jsxs)("li",{className:"flex items-start gap-5",children:[(0,t.jsx)("div",{className:"w-10 h-10 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mt-1",children:(0,t.jsx)("span",{className:"font-bold text-green-600",children:"2"})}),(0,t.jsxs)("div",{className:"text-left",children:[(0,t.jsx)("h3",{className:"font-medium text-gray-800 text-lg",children:"Proberechnung pr\xfcfen"}),(0,t.jsx)("p",{className:"text-gray-600 mt-2",children:"Nehmen Sie sich einen Moment Zeit, um unsere Proberechnung zu \xfcberpr\xfcfen und sich von unserem Angebot zu \xfcberzeugen."})]})]}),(0,t.jsxs)("li",{className:"flex items-start gap-5",children:[(0,t.jsx)("div",{className:"w-10 h-10 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mt-1",children:(0,t.jsx)("span",{className:"font-bold text-green-600",children:"3"})}),(0,t.jsxs)("div",{className:"text-left",children:[(0,t.jsx)("h3",{className:"font-medium text-gray-800 text-lg",children:"Bestellung ausl\xf6sen"}),(0,t.jsx)("p",{className:"text-gray-600 mt-2",children:'Wenn Sie mit unserer Proberechnung zufrieden sind, k\xf6nnen Sie Ihren Energieausweis bequem online bestellen. Vergessen Sie nicht, den Rabattcode "MWSTGESCHENKT" einzul\xf6sen!'})]})]}),(0,t.jsxs)("li",{className:"flex items-start gap-5",children:[(0,t.jsx)("div",{className:"w-10 h-10 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mt-1",children:(0,t.jsx)("span",{className:"font-bold text-green-600",children:"4"})}),(0,t.jsxs)("div",{className:"text-left",children:[(0,t.jsx)("h3",{className:"font-medium text-gray-800 text-lg",children:"Von lokaler Expertise profitieren"}),(0,t.jsx)("p",{className:"text-gray-600 mt-2",children:"Als lokaler Anbieter aus Bremen mit \xfcber 10 Jahren Erfahrung bieten wir Ihnen pers\xf6nlichen Service und Bestpreis-Garantie f\xfcr Ihren Premium Energiepass\xae."})]})]})]})]}),(0,t.jsx)("div",{className:"mt-12",children:(0,t.jsxs)("a",{href:"".concat(N(r)).concat("house"===r?"&":"?","prefilled_code=MWSTGESCHENKT"),target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center justify-center px-8 py-4  bg-green-600 hover:bg-green-700  text-white font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1",children:[(0,t.jsx)("span",{children:"Jetzt Ihren Energieausweis bestellen"}),(0,t.jsx)("svg",{className:"ml-2 w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M17 8l4 4m0 0l-4 4m4-4H3"})})]})})]})]})})})]}),(0,t.jsx)("section",{className:"bg-white py-8",children:(0,t.jsx)("div",{className:"container mx-auto px-6",children:(0,t.jsx)("div",{className:"max-w-5xl mx-auto",children:(0,t.jsxs)("div",{className:"flex flex-wrap justify-center items-center gap-12 lg:gap-20",children:[(0,t.jsxs)("div",{className:"text-center",children:[(0,t.jsx)("div",{className:"flex items-center justify-center mb-4",children:(0,t.jsx)("svg",{className:"w-10 h-10 text-green-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"})})}),(0,t.jsx)("p",{className:"text-gray-700 font-medium",children:"100% Rechtssicher"})]}),(0,t.jsxs)("div",{className:"text-center",children:[(0,t.jsx)("div",{className:"flex items-center justify-center mb-4",children:(0,t.jsx)("svg",{className:"w-10 h-10 text-green-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})})}),(0,t.jsx)("p",{className:"text-gray-700 font-medium",children:"Bestpreis-Garantie"})]}),(0,t.jsxs)("div",{className:"text-center",children:[(0,t.jsx)("div",{className:"flex items-center justify-center mb-4",children:(0,t.jsx)("svg",{className:"w-10 h-10 text-green-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M13 10V3L4 14h7v7l9-11h-7z"})})}),(0,t.jsx)("p",{className:"text-gray-700 font-medium",children:"Express 24h"})]}),(0,t.jsxs)("div",{className:"text-center",children:[(0,t.jsx)("div",{className:"flex items-center justify-center mb-4",children:(0,t.jsx)("svg",{className:"w-10 h-10 text-green-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 13l4 4L19 7"})})}),(0,t.jsx)("p",{className:"text-gray-700 font-medium",children:"Lokale Fachexperten"})]})]})})})}),(0,t.jsx)("section",{className:"py-20 bg-white",children:(0,t.jsx)("div",{className:"container mx-auto px-6",children:(0,t.jsxs)("div",{className:"max-w-5xl mx-auto",children:[(0,t.jsxs)("div",{className:"text-center mb-12",children:[(0,t.jsx)("span",{className:"inline-block bg-green-100 text-green-800 text-sm font-semibold px-4 py-1.5 rounded-full mb-4",children:"KOSTENLOSER SERVICE"}),(0,t.jsxs)("h2",{className:"text-3xl font-bold mb-4",children:["Vereinbaren Sie einen kostenlosen",(0,t.jsx)("br",{}),"Datenaufnahmetermin"]}),(0,t.jsx)("p",{className:"text-lg text-gray-600 max-w-3xl mx-auto",children:"F\xfcr ein optimales Ergebnis Ihres Energieausweises bieten wir Ihnen einen pers\xf6nlichen Datenaufnahmetermin an. Dieser macht den Prozess f\xfcr Sie wesentlich einfacher und f\xfchrt zu einem pr\xe4ziseren Ergebnis."})]}),(0,t.jsx)("div",{className:"bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl shadow-lg overflow-hidden",children:(0,t.jsxs)("div",{className:"grid md:grid-cols-2 gap-0",children:[(0,t.jsxs)("div",{className:"p-10",children:[(0,t.jsx)("h3",{className:"text-xl font-bold text-gray-800 mb-6",children:"Ihre Vorteile eines pers\xf6nlichen Termins:"}),(0,t.jsxs)("ul",{className:"space-y-4",children:[(0,t.jsxs)("li",{className:"flex items-start gap-3",children:[(0,t.jsx)("svg",{className:"w-6 h-6 text-green-600 flex-shrink-0 mt-0.5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M5 13l4 4L19 7"})}),(0,t.jsx)("span",{className:"text-gray-700",children:"Kein m\xfchsames Zusammensuchen von technischen Daten"})]}),(0,t.jsxs)("li",{className:"flex items-start gap-3",children:[(0,t.jsx)("svg",{className:"w-6 h-6 text-green-600 flex-shrink-0 mt-0.5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M5 13l4 4L19 7"})}),(0,t.jsx)("span",{className:"text-gray-700",children:"H\xf6here Genauigkeit durch Vor-Ort-Begehung"})]}),(0,t.jsxs)("li",{className:"flex items-start gap-3",children:[(0,t.jsx)("svg",{className:"w-6 h-6 text-green-600 flex-shrink-0 mt-0.5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M5 13l4 4L19 7"})}),(0,t.jsx)("span",{className:"text-gray-700",children:"Pers\xf6nliche Beratung zu Energieeffizienzma\xdfnahmen"})]}),(0,t.jsxs)("li",{className:"flex items-start gap-3",children:[(0,t.jsx)("svg",{className:"w-6 h-6 text-green-600 flex-shrink-0 mt-0.5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M5 13l4 4L19 7"})}),(0,t.jsx)("span",{className:"text-gray-700",children:"Kostenlose Bewertung von Optimierungspotentialen"})]}),(0,t.jsxs)("li",{className:"flex items-start gap-3",children:[(0,t.jsx)("svg",{className:"w-6 h-6 text-green-600 flex-shrink-0 mt-0.5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M5 13l4 4L19 7"})}),(0,t.jsx)("span",{className:"text-gray-700",children:"In 9 von 10 F\xe4llen erreichen wir eine bessere Energieeffizienzklasse. Expertenaugen sehen immer mehr!"})]})]}),(0,t.jsx)("p",{className:"mt-8 text-sm text-gray-500 italic",children:"* Verf\xfcgbar in Bremen und Umgebung (bis 50 km)"})]}),(0,t.jsxs)("div",{className:"bg-white p-10",children:[(0,t.jsx)("h3",{className:"text-xl font-bold text-gray-800 mb-6",children:"Termin-Hotline:"}),(0,t.jsxs)("div",{className:"mb-8",children:[(0,t.jsxs)("a",{href:"tel:+4915206077767",className:"flex items-center justify-center gap-3 py-5 px-6 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors duration-300 font-semibold text-lg shadow-lg hover:shadow-xl w-full",children:[(0,t.jsx)("svg",{className:"w-8 h-8",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"})}),(0,t.jsx)("span",{children:"0152 060 777 67"})]}),(0,t.jsxs)("p",{className:"text-center mt-3 text-gray-600",children:["Rufen Sie uns an und vereinbaren Sie",(0,t.jsx)("br",{}),"einen kostenlosen Termin"]})]}),(0,t.jsxs)("div",{className:"bg-gray-50 rounded-lg p-6 border border-gray-200",children:[(0,t.jsx)("h4",{className:"font-medium text-gray-800 mb-3",children:"Unsere Service-Zeiten:"}),(0,t.jsxs)("ul",{className:"space-y-2 text-gray-600",children:[(0,t.jsxs)("li",{className:"flex justify-between",children:[(0,t.jsx)("span",{children:"Montag - Freitag:"}),(0,t.jsx)("span",{className:"font-medium",children:"9:00 - 18:00 Uhr"})]}),(0,t.jsxs)("li",{className:"flex justify-between",children:[(0,t.jsx)("span",{children:"Samstag:"}),(0,t.jsx)("span",{className:"font-medium",children:"Nach Vereinbarung"})]})]}),(0,t.jsx)("div",{className:"mt-4 pt-4 border-t border-gray-200 text-sm text-gray-500",children:(0,t.jsx)("p",{children:"Terminvereinbarung auch au\xdferhalb der regul\xe4ren Zeiten m\xf6glich"})})]})]})]})})]})})}),(0,t.jsx)("section",{className:"py-20 bg-gradient-to-r from-green-50 to-blue-50",children:(0,t.jsx)("div",{className:"container mx-auto px-6",children:(0,t.jsx)("div",{className:"max-w-5xl mx-auto",children:(0,t.jsx)("div",{className:"bg-white rounded-2xl shadow-xl overflow-hidden",children:(0,t.jsxs)("div",{className:"grid md:grid-cols-2",children:[(0,t.jsxs)("div",{className:"bg-gradient-to-br from-green-600 to-green-800 text-white p-10 relative",children:[(0,t.jsx)("div",{className:"absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -translate-x-16 -translate-y-16"}),(0,t.jsx)("div",{className:"absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full translate-x-16 translate-y-16"}),(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)("h3",{className:"text-xl font-semibold mb-3 text-green-100",children:"Direkter Kontakt"}),(0,t.jsx)("h2",{className:"text-3xl font-bold mb-6",children:"Stephan Grosser"}),(0,t.jsxs)("p",{className:"text-lg mb-8",children:["Gr\xfcnder & Gesch\xe4ftsf\xfchrer",(0,t.jsx)("br",{}),"Premium Energiepass\xae Online"]}),(0,t.jsxs)("div",{className:"flex items-center gap-5 mb-10",children:[(0,t.jsx)("div",{className:"w-28 h-28 rounded-full bg-white p-1.5 shadow-lg",children:(0,t.jsx)("div",{className:"w-full h-full rounded-full overflow-hidden bg-gray-200",children:(0,t.jsx)(d(),{src:"/images/stephan-grosser.webp",alt:"Stephan Grosser",width:112,height:112,className:"w-full h-full object-cover",onError:e=>{let s=e.target;s.onerror=null,s.src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23cccccc'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E"}})})}),(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"text-sm font-medium bg-green-100 text-green-800 px-3 py-1 rounded-full inline-block mb-2",children:"Bremer Energieexperte"}),(0,t.jsxs)("p",{className:"text-sm opacity-90",children:["Seit \xfcber 10 Jahren Ihre",(0,t.jsx)("br",{}),"verl\xe4ssliche Anlaufstelle"]})]})]}),(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("p",{className:"flex items-center gap-3",children:[(0,t.jsx)("svg",{className:"w-5 h-5 text-green-300",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"})}),(0,t.jsx)("a",{href:"tel:+4915206077767",className:"hover:text-white hover:underline transition-colors",children:"0152 060 777 67"})]}),(0,t.jsxs)("p",{className:"flex items-center gap-3",children:[(0,t.jsx)("svg",{className:"w-5 h-5 text-green-300",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"})}),(0,t.jsx)("a",{href:"mailto:info@premium-energiepass.online",className:"hover:text-white hover:underline transition-colors",children:"info@premium-energiepass.online"})]})]})]})]}),(0,t.jsxs)("div",{className:"p-10 flex flex-col justify-center",children:[(0,t.jsx)("h3",{className:"text-2xl font-bold text-gray-800 mb-5",children:"Haben Sie Fragen oder brauchen Hilfe?"}),(0,t.jsx)("p",{className:"text-gray-600 mb-8",children:"Ich bin pers\xf6nlich f\xfcr Sie da und beantworte alle Ihre Fragen rund um Ihren Energieausweis. Als lokaler Anbieter setze ich auf direkte Kommunikation und individuellen Service."}),(0,t.jsxs)("div",{className:"space-y-5",children:[(0,t.jsxs)("a",{href:"tel:+4915206077767",className:"flex items-center justify-center gap-3 w-full py-4 px-6 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors duration-300 font-semibold shadow-lg hover:shadow-xl",children:[(0,t.jsx)("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"})}),"Jetzt anrufen"]}),(0,t.jsxs)("a",{href:"https://wa.me/4915206077767",target:"_blank",rel:"noopener noreferrer",className:"flex items-center justify-center gap-3 w-full py-4 px-6 bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 rounded-xl transition-colors duration-300 font-semibold",children:[(0,t.jsx)("svg",{className:"w-6 h-6",fill:"currentColor",viewBox:"0 0 24 24",children:(0,t.jsx)("path",{d:"M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"})}),"WhatsApp schreiben"]})]}),(0,t.jsx)("div",{className:"mt-8 text-center",children:(0,t.jsx)("span",{className:"text-sm text-gray-500",children:"Unsere Beratung ist kostenlos und unverbindlich"})})]})]})})})})}),(0,t.jsx)("div",{className:"container mx-auto px-4 py-4 text-center",children:(0,t.jsx)(o(),{href:"/",className:"text-green-600 hover:text-green-800 text-sm",children:"Zur\xfcck zur Startseite"})}),(0,t.jsx)(a.default,{})]})}},18584:function(e,s,r){"use strict";r.r(s),r.d(s,{default:function(){return l}});var t=r(57437),n=r(2265),a=r(16691),i=r.n(a);function l(){let[e,s]=(0,n.useState)(!1);return(0,t.jsxs)("footer",{className:"bg-gray-900 text-gray-300 py-16",children:[(0,t.jsx)("div",{className:"container mx-auto px-4 mb-32",children:(0,t.jsxs)("div",{className:"max-w-7xl mx-auto",children:[(0,t.jsx)(i(),{src:"/images/logo-white.svg",alt:"Premium Energiepass Online",width:280,height:80,className:"w-[80%] md:w-[35%] lg:w-[28%] mx-auto md:mx-0 mb-8"}),(0,t.jsxs)("div",{className:"space-y-4 mb-32",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"})}),(0,t.jsx)("span",{children:"info@premium-energiepass.online"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"})}),(0,t.jsx)("span",{children:"0152 060 777 67"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)("svg",{className:"w-6 h-6",fill:"currentColor",viewBox:"0 0 24 24",children:(0,t.jsx)("path",{d:"M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"})}),(0,t.jsx)("span",{children:"WhatsApp Chat"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsxs)("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:[(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"}),(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15 11a3 3 0 11-6 0 3 3 0 016 0z"})]}),(0,t.jsx)("span",{children:"Im Hollergrund 175A, 28357 Bremen"})]})]}),(0,t.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-8",children:[(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsx)("h3",{className:"text-lg font-semibold text-white border-b border-gray-700 pb-2",children:"Unternehmen"}),(0,t.jsxs)("div",{className:"flex flex-col space-y-2",children:[(0,t.jsx)("button",{onClick:()=>s(!0),className:"text-left hover:text-white transition-colors",children:"\xdcber uns"}),(0,t.jsx)("a",{href:"/#process-section",className:"hover:text-white transition-colors",children:"Team"}),(0,t.jsx)("a",{href:"/#contact-section",className:"hover:text-white transition-colors",children:"Karriere"}),(0,t.jsx)("a",{href:"/#contact-section",className:"hover:text-white transition-colors",children:"Partner werden"})]})]}),(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsx)("h3",{className:"text-lg font-semibold text-white border-b border-gray-700 pb-2",children:"Service"}),(0,t.jsxs)("div",{className:"flex flex-col space-y-2",children:[(0,t.jsx)("a",{href:"/#contact-form",className:"hover:text-white transition-colors",children:"Energieausweis beantragen"}),(0,t.jsx)("a",{href:"/#pricing-section",className:"hover:text-white transition-colors",children:"Preise & Leistungen"}),(0,t.jsx)("a",{href:"/#faq-section",className:"hover:text-white transition-colors",children:"H\xe4ufige Fragen"}),(0,t.jsx)("a",{href:"/#contact-section",className:"hover:text-white transition-colors",children:"Kontakt"})]})]}),(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsx)("h3",{className:"text-lg font-semibold text-white border-b border-gray-700 pb-2",children:"Rechtliches"}),(0,t.jsxs)("div",{className:"flex flex-col space-y-2",children:[(0,t.jsx)("a",{href:"/impressum",className:"hover:text-white transition-colors",children:"Impressum"}),(0,t.jsx)("a",{href:"/datenschutz",className:"hover:text-white transition-colors",children:"Datenschutzerkl\xe4rung"}),(0,t.jsx)("a",{href:"/agb",className:"hover:text-white transition-colors",children:"AGB"}),(0,t.jsx)("a",{href:"/widerruf",className:"hover:text-white transition-colors",children:"Widerrufsbelehrung"}),(0,t.jsx)("a",{href:"/cookie-einstellungen",className:"hover:text-white transition-colors",children:"Cookie-Einstellungen"})]})]})]})]})}),(0,t.jsx)("div",{className:"container mx-auto px-4 mt-32",children:(0,t.jsx)("div",{className:"max-w-7xl mx-auto text-center text-sm pt-16 mt-16 border-t border-gray-800",children:"\xa9 2025 Premium Energiepass\xae Online. Alle Rechte vorbehalten."})}),e&&(0,t.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4",onClick:()=>s(!1),children:(0,t.jsxs)("div",{className:"relative w-full max-w-[540px] bg-black rounded-xl overflow-hidden",onClick:e=>e.stopPropagation(),children:[(0,t.jsx)("button",{onClick:()=>s(!1),className:"absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2",children:(0,t.jsx)("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})}),(0,t.jsx)("div",{className:"relative pt-[177.78%]",children:(0,t.jsxs)("video",{className:"absolute inset-0 w-full h-full object-contain bg-black",controls:!0,autoPlay:!0,playsInline:!0,muted:!1,preload:"auto",onClick:e=>e.stopPropagation(),children:[(0,t.jsx)("source",{src:"/videos/StephanGrosser.mp4",type:"video/mp4"}),"Ihr Browser unterst\xfctzt keine Videos."]})})]})})]})}},61396:function(e,s,r){e.exports=r(68326)}},function(e){e.O(0,[413,326,542,971,472,744],function(){return e(e.s=13156)}),_N_E=e.O()}]);