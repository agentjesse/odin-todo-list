(()=>{"use strict";var e={365:(e,t,o)=>{o.d(t,{A:()=>s});var n=o(354),r=o.n(n),a=o(314),i=o.n(a)()(r());i.push([e.id,"/* CSS RESET: use box-sizing model; remove default margin & form typography styles; */\n*, *::before, *::after { box-sizing: border-box; }\n* { margin: 0; }\ninput, button, textarea, select { font: inherit; }\n/* imported google fonts examples */\n/* .roboto { font-family: \"Roboto\"; font-weight: 400,500; font-style: normal; } */\n/* variables---------------------------------------------------------------- */\n:root{\n  /* --grey1: hsl(214 48% 82%); */\n}\n\n/* main CSS */\nbody{\n  font-family: 'Roboto', Arial, Helvetica, sans-serif;\n  font-weight: 400;\n  /* background-color: var(--grey1); */\n}\n\n","",{version:3,sources:["webpack://./src/styles.css"],names:[],mappings:"AAAA,qFAAqF;AACrF,yBAAyB,sBAAsB,EAAE;AACjD,IAAI,SAAS,EAAE;AACf,kCAAkC,aAAa,EAAE;AACjD,mCAAmC;AACnC,iFAAiF;AACjF,8EAA8E;AAC9E;EACE,+BAA+B;AACjC;;AAEA,aAAa;AACb;EACE,mDAAmD;EACnD,gBAAgB;EAChB,oCAAoC;AACtC",sourcesContent:["/* CSS RESET: use box-sizing model; remove default margin & form typography styles; */\n*, *::before, *::after { box-sizing: border-box; }\n* { margin: 0; }\ninput, button, textarea, select { font: inherit; }\n/* imported google fonts examples */\n/* .roboto { font-family: \"Roboto\"; font-weight: 400,500; font-style: normal; } */\n/* variables---------------------------------------------------------------- */\n:root{\n  /* --grey1: hsl(214 48% 82%); */\n}\n\n/* main CSS */\nbody{\n  font-family: 'Roboto', Arial, Helvetica, sans-serif;\n  font-weight: 400;\n  /* background-color: var(--grey1); */\n}\n\n"],sourceRoot:""}]);const s=i},314:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var o="",n=void 0!==t[5];return t[4]&&(o+="@supports (".concat(t[4],") {")),t[2]&&(o+="@media ".concat(t[2]," {")),n&&(o+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),o+=e(t),n&&(o+="}"),t[2]&&(o+="}"),t[4]&&(o+="}"),o})).join("")},t.i=function(e,o,n,r,a){"string"==typeof e&&(e=[[null,e,void 0]]);var i={};if(n)for(var s=0;s<this.length;s++){var c=this[s][0];null!=c&&(i[c]=!0)}for(var l=0;l<e.length;l++){var u=[].concat(e[l]);n&&i[u[0]]||(void 0!==a&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=a),o&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=o):u[2]=o),r&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=r):u[4]="".concat(r)),t.push(u))}},t}},354:e=>{e.exports=function(e){var t=e[1],o=e[3];if(!o)return t;if("function"==typeof btoa){var n=btoa(unescape(encodeURIComponent(JSON.stringify(o)))),r="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(n),a="/*# ".concat(r," */");return[t].concat([a]).join("\n")}return[t].join("\n")}},72:e=>{var t=[];function o(e){for(var o=-1,n=0;n<t.length;n++)if(t[n].identifier===e){o=n;break}return o}function n(e,n){for(var a={},i=[],s=0;s<e.length;s++){var c=e[s],l=n.base?c[0]+n.base:c[0],u=a[l]||0,d="".concat(l," ").concat(u);a[l]=u+1;var f=o(d),p={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==f)t[f].references++,t[f].updater(p);else{var A=r(p,n);n.byIndex=s,t.splice(s,0,{identifier:d,updater:A,references:1})}i.push(d)}return i}function r(e,t){var o=t.domAPI(t);return o.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;o.update(e=t)}else o.remove()}}e.exports=function(e,r){var a=n(e=e||[],r=r||{});return function(e){e=e||[];for(var i=0;i<a.length;i++){var s=o(a[i]);t[s].references--}for(var c=n(e,r),l=0;l<a.length;l++){var u=o(a[l]);0===t[u].references&&(t[u].updater(),t.splice(u,1))}a=c}}},659:e=>{var t={};e.exports=function(e,o){var n=function(e){if(void 0===t[e]){var o=document.querySelector(e);if(window.HTMLIFrameElement&&o instanceof window.HTMLIFrameElement)try{o=o.contentDocument.head}catch(e){o=null}t[e]=o}return t[e]}(e);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");n.appendChild(o)}},540:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},56:(e,t,o)=>{e.exports=function(e){var t=o.nc;t&&e.setAttribute("nonce",t)}},825:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(o){!function(e,t,o){var n="";o.supports&&(n+="@supports (".concat(o.supports,") {")),o.media&&(n+="@media ".concat(o.media," {"));var r=void 0!==o.layer;r&&(n+="@layer".concat(o.layer.length>0?" ".concat(o.layer):""," {")),n+=o.css,r&&(n+="}"),o.media&&(n+="}"),o.supports&&(n+="}");var a=o.sourceMap;a&&"undefined"!=typeof btoa&&(n+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),t.styleTagTransform(n,e,t.options)}(t,e,o)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},113:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function o(n){var r=t[n];if(void 0!==r)return r.exports;var a=t[n]={id:n,exports:{}};return e[n](a,a.exports,o),a.exports}o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.nc=void 0,(()=>{var e=o(72),t=o.n(e),n=o(825),r=o.n(n),a=o(659),i=o.n(a),s=o(56),c=o.n(s),l=o(540),u=o.n(l),d=o(113),f=o.n(d),p=o(365),A={};A.styleTagTransform=f(),A.setAttributes=c(),A.insert=i().bind(null,"head"),A.domAPI=r(),A.insertStyleElement=u(),t()(p.A,A),p.A&&p.A.locals&&p.A.locals;const m=e=>console.log(e),g=e=>{let t=0;const o=[];return{getProjectID:()=>e,getTitle:()=>"Untitled Project",getDescription:()=>"",getTodosArr:()=>o,addTodo:()=>{o.push(v(t)),t++},removeCompletedTodos:(...e)=>{e.forEach((e=>{for(let t=0;t<o.length;t++)if(o[t].getID()===e){o.splice(t,1),t--;break}}))}}},v=e=>{let t=!1;return{getID:()=>e,title:()=>"Untitled Todo",notes:()=>"",dueDate:()=>"",dueTime:()=>"",priority:()=>"normal",getCompletedState:()=>t,toggleCompletedState:()=>{t=!t}}};(()=>{const e=[];let t=0;e.push(g(t)),t++,e.push(g(t)),t++,localStorage.setItem("[TBD]projects in this device's localStorage: ",JSON.stringify(e)),m("making 5 todos in first project...");for(let t=1;t<=5;t++)e[0].addTodo();e[0].getTodosArr().forEach(((e,t)=>m(`ID of todo at index ${t}: ${e.getID()}`))),m("toggling a todo's completed state and logging all for comparison.."),e[0].getTodosArr()[2].toggleCompletedState(),e[0].getTodosArr().forEach(((e,t)=>m(`completedState of todo at index ${t}: ${e.getCompletedState()}`)))})()})()})();
//# sourceMappingURL=main.bundle.js.map