(()=>{"use strict";var e={365:(e,n,t)=>{t.d(n,{A:()=>l});var o=t(354),r=t.n(o),a=t(314),s=t.n(a)()(r());s.push([e.id,"/* CSS RESET: use box-sizing model; remove default margin & form typography\nstyles; set buttons to display block; set base (pre UA stylesheet) font size; */\n*, *::before, *::after { box-sizing: border-box; }\n* { margin: 0; }\ninput, button, textarea, select { font: inherit; }\nbutton { display: block; }\n:root{ font-size: 16px; }  /*chrome default*/\n/* imported google fonts examples */\n/* .roboto { font-family: \"Roboto\"; font-weight: 400,500; font-style: normal; } */\n/* variables---------------------------------------------------------------- */\n:root{\n  --black: hsl(0, 0%, 0%);\n  --white: hsl(0, 0%, 100%);\n  /* tailwind palette based, then hue shifted */\n  /*blue*//*\n  --bg950: hsl(199, 91%, 9%);\n  --bg900: hsl(197, 86%, 16%);\n  --bg800: hsl(196, 88%, 20%);\n  --bg700: hsl(196, 94%, 24%);\n  --bg600: hsl(194, 94%, 30%);\n  --mg500: hsl(193, 84%, 39%);\n  --fg400: hsl(191, 64%, 52%);\n  --fg300: hsl(189, 72%, 67%);\n  --fg200: hsl(185, 76%, 80%);\n  --fg100: hsl(182, 80%, 90%);\n  --fg50:  hsl(185, 81%, 96%);\n  */\n  /*brown (for dev)*/\n  --bg950: hsl(33, 91%, 9%);\n  --bg900: hsl(31, 86%, 16%);\n  --bg800: hsl(30, 88%, 20%);\n  --bg700: hsl(30, 94%, 24%);\n  --bg600: hsl(28, 94%, 30%);\n  --mg500: hsl(27, 84%, 39%);\n  --fg400: hsl(25, 64%, 52%);\n  --fg300: hsl(23, 72%, 67%);\n  --fg200: hsl(19, 76%, 80%);\n  --fg100: hsl(16, 80%, 90%);\n  --fg50:  hsl(19, 81%, 96%);\n\n}\n\n/* main CSS */\nbody {\n  font-family: 'Roboto', Arial, Helvetica, sans-serif;\n  font-weight: 400;\n  background-color: var(--bg900);\n}\n.projectDiv {\n  margin: 1rem 0;\n  padding: 0.25rem 1rem;\n  background-color: var(--fg200);\n  input {\n    width: 100%;\n    font-size: 1.25rem;\n    background-color: var(--fg50);\n    cursor: pointer;\n    margin: 0.25rem 0;\n    border-style: none;\n  }\n  input::placeholder {\n    color: var(--fg200);\n  }\n  .projectBtnsWrap{\n    display: flex;\n    justify-content: space-between;\n    gap: 0.25rem;\n    button {\n      background-color: var(--fg200);\n      color: var(--bg900);\n      border-radius: 5px;\n      border-style: none;\n      padding: 0.25rem;\n      margin: 0.1rem 0 0.5rem 0;\n      box-shadow: 0 0 2px 2px var(--bg600);\n    }\n    button:hover{\n      cursor: pointer;\n      background-color: var(--fg50);\n    }\n  }\n}\n.todoDiv {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  align-items: center;\n  background-color: var(--fg100);\n  margin: 0 0 0.5rem 0;\n  gap: 0 0.25rem;\n  button {\n    border-style: none;\n    background-color: var(--fg300);\n  }\n  .todoTitle {\n    flex-basis: 75%;\n  }\n  .todoNotes {\n    flex-basis: 75%;\n    margin: 0 auto 0.25rem;\n    display: block;\n  }\n  .completionBox {\n    width: 2rem;\n    height: 2rem;\n    accent-color: var(--fg400);\n  }\n  .dueDateTime {\n    flex-basis: 42%;\n  }\n  .prioritySelect {\n    width: 4.75rem;\n  }\n  .noDisplay {\n    display: none;\n  }\n}\n","",{version:3,sources:["webpack://./src/styles.css"],names:[],mappings:"AAAA;+EAC+E;AAC/E,yBAAyB,sBAAsB,EAAE;AACjD,IAAI,SAAS,EAAE;AACf,kCAAkC,aAAa,EAAE;AACjD,SAAS,cAAc,EAAE;AACzB,OAAO,eAAe,EAAE,GAAG,iBAAiB;AAC5C,mCAAmC;AACnC,iFAAiF;AACjF,8EAA8E;AAC9E;EACE,uBAAuB;EACvB,yBAAyB;EACzB,6CAA6C;EAC7C,OAAO,CAAC;;;;;;;;;;;;GAYP;EACD,kBAAkB;EAClB,yBAAyB;EACzB,0BAA0B;EAC1B,0BAA0B;EAC1B,0BAA0B;EAC1B,0BAA0B;EAC1B,0BAA0B;EAC1B,0BAA0B;EAC1B,0BAA0B;EAC1B,0BAA0B;EAC1B,0BAA0B;EAC1B,0BAA0B;;AAE5B;;AAEA,aAAa;AACb;EACE,mDAAmD;EACnD,gBAAgB;EAChB,8BAA8B;AAChC;AACA;EACE,cAAc;EACd,qBAAqB;EACrB,8BAA8B;EAC9B;IACE,WAAW;IACX,kBAAkB;IAClB,6BAA6B;IAC7B,eAAe;IACf,iBAAiB;IACjB,kBAAkB;EACpB;EACA;IACE,mBAAmB;EACrB;EACA;IACE,aAAa;IACb,8BAA8B;IAC9B,YAAY;IACZ;MACE,8BAA8B;MAC9B,mBAAmB;MACnB,kBAAkB;MAClB,kBAAkB;MAClB,gBAAgB;MAChB,yBAAyB;MACzB,oCAAoC;IACtC;IACA;MACE,eAAe;MACf,6BAA6B;IAC/B;EACF;AACF;AACA;EACE,aAAa;EACb,eAAe;EACf,uBAAuB;EACvB,mBAAmB;EACnB,8BAA8B;EAC9B,oBAAoB;EACpB,cAAc;EACd;IACE,kBAAkB;IAClB,8BAA8B;EAChC;EACA;IACE,eAAe;EACjB;EACA;IACE,eAAe;IACf,sBAAsB;IACtB,cAAc;EAChB;EACA;IACE,WAAW;IACX,YAAY;IACZ,0BAA0B;EAC5B;EACA;IACE,eAAe;EACjB;EACA;IACE,cAAc;EAChB;EACA;IACE,aAAa;EACf;AACF",sourcesContent:["/* CSS RESET: use box-sizing model; remove default margin & form typography\nstyles; set buttons to display block; set base (pre UA stylesheet) font size; */\n*, *::before, *::after { box-sizing: border-box; }\n* { margin: 0; }\ninput, button, textarea, select { font: inherit; }\nbutton { display: block; }\n:root{ font-size: 16px; }  /*chrome default*/\n/* imported google fonts examples */\n/* .roboto { font-family: \"Roboto\"; font-weight: 400,500; font-style: normal; } */\n/* variables---------------------------------------------------------------- */\n:root{\n  --black: hsl(0, 0%, 0%);\n  --white: hsl(0, 0%, 100%);\n  /* tailwind palette based, then hue shifted */\n  /*blue*//*\n  --bg950: hsl(199, 91%, 9%);\n  --bg900: hsl(197, 86%, 16%);\n  --bg800: hsl(196, 88%, 20%);\n  --bg700: hsl(196, 94%, 24%);\n  --bg600: hsl(194, 94%, 30%);\n  --mg500: hsl(193, 84%, 39%);\n  --fg400: hsl(191, 64%, 52%);\n  --fg300: hsl(189, 72%, 67%);\n  --fg200: hsl(185, 76%, 80%);\n  --fg100: hsl(182, 80%, 90%);\n  --fg50:  hsl(185, 81%, 96%);\n  */\n  /*brown (for dev)*/\n  --bg950: hsl(33, 91%, 9%);\n  --bg900: hsl(31, 86%, 16%);\n  --bg800: hsl(30, 88%, 20%);\n  --bg700: hsl(30, 94%, 24%);\n  --bg600: hsl(28, 94%, 30%);\n  --mg500: hsl(27, 84%, 39%);\n  --fg400: hsl(25, 64%, 52%);\n  --fg300: hsl(23, 72%, 67%);\n  --fg200: hsl(19, 76%, 80%);\n  --fg100: hsl(16, 80%, 90%);\n  --fg50:  hsl(19, 81%, 96%);\n\n}\n\n/* main CSS */\nbody {\n  font-family: 'Roboto', Arial, Helvetica, sans-serif;\n  font-weight: 400;\n  background-color: var(--bg900);\n}\n.projectDiv {\n  margin: 1rem 0;\n  padding: 0.25rem 1rem;\n  background-color: var(--fg200);\n  input {\n    width: 100%;\n    font-size: 1.25rem;\n    background-color: var(--fg50);\n    cursor: pointer;\n    margin: 0.25rem 0;\n    border-style: none;\n  }\n  input::placeholder {\n    color: var(--fg200);\n  }\n  .projectBtnsWrap{\n    display: flex;\n    justify-content: space-between;\n    gap: 0.25rem;\n    button {\n      background-color: var(--fg200);\n      color: var(--bg900);\n      border-radius: 5px;\n      border-style: none;\n      padding: 0.25rem;\n      margin: 0.1rem 0 0.5rem 0;\n      box-shadow: 0 0 2px 2px var(--bg600);\n    }\n    button:hover{\n      cursor: pointer;\n      background-color: var(--fg50);\n    }\n  }\n}\n.todoDiv {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  align-items: center;\n  background-color: var(--fg100);\n  margin: 0 0 0.5rem 0;\n  gap: 0 0.25rem;\n  button {\n    border-style: none;\n    background-color: var(--fg300);\n  }\n  .todoTitle {\n    flex-basis: 75%;\n  }\n  .todoNotes {\n    flex-basis: 75%;\n    margin: 0 auto 0.25rem;\n    display: block;\n  }\n  .completionBox {\n    width: 2rem;\n    height: 2rem;\n    accent-color: var(--fg400);\n  }\n  .dueDateTime {\n    flex-basis: 42%;\n  }\n  .prioritySelect {\n    width: 4.75rem;\n  }\n  .noDisplay {\n    display: none;\n  }\n}\n"],sourceRoot:""}]);const l=s},314:e=>{e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t="",o=void 0!==n[5];return n[4]&&(t+="@supports (".concat(n[4],") {")),n[2]&&(t+="@media ".concat(n[2]," {")),o&&(t+="@layer".concat(n[5].length>0?" ".concat(n[5]):""," {")),t+=e(n),o&&(t+="}"),n[2]&&(t+="}"),n[4]&&(t+="}"),t})).join("")},n.i=function(e,t,o,r,a){"string"==typeof e&&(e=[[null,e,void 0]]);var s={};if(o)for(var l=0;l<this.length;l++){var c=this[l][0];null!=c&&(s[c]=!0)}for(var i=0;i<e.length;i++){var A=[].concat(e[i]);o&&s[A[0]]||(void 0!==a&&(void 0===A[5]||(A[1]="@layer".concat(A[5].length>0?" ".concat(A[5]):""," {").concat(A[1],"}")),A[5]=a),t&&(A[2]?(A[1]="@media ".concat(A[2]," {").concat(A[1],"}"),A[2]=t):A[2]=t),r&&(A[4]?(A[1]="@supports (".concat(A[4],") {").concat(A[1],"}"),A[4]=r):A[4]="".concat(r)),n.push(A))}},n}},354:e=>{e.exports=function(e){var n=e[1],t=e[3];if(!t)return n;if("function"==typeof btoa){var o=btoa(unescape(encodeURIComponent(JSON.stringify(t)))),r="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(o),a="/*# ".concat(r," */");return[n].concat([a]).join("\n")}return[n].join("\n")}},72:e=>{var n=[];function t(e){for(var t=-1,o=0;o<n.length;o++)if(n[o].identifier===e){t=o;break}return t}function o(e,o){for(var a={},s=[],l=0;l<e.length;l++){var c=e[l],i=o.base?c[0]+o.base:c[0],A=a[i]||0,d="".concat(i," ").concat(A);a[i]=A+1;var p=t(d),u={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==p)n[p].references++,n[p].updater(u);else{var m=r(u,o);o.byIndex=l,n.splice(l,0,{identifier:d,updater:m,references:1})}s.push(d)}return s}function r(e,n){var t=n.domAPI(n);return t.update(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap&&n.supports===e.supports&&n.layer===e.layer)return;t.update(e=n)}else t.remove()}}e.exports=function(e,r){var a=o(e=e||[],r=r||{});return function(e){e=e||[];for(var s=0;s<a.length;s++){var l=t(a[s]);n[l].references--}for(var c=o(e,r),i=0;i<a.length;i++){var A=t(a[i]);0===n[A].references&&(n[A].updater(),n.splice(A,1))}a=c}}},659:e=>{var n={};e.exports=function(e,t){var o=function(e){if(void 0===n[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}n[e]=t}return n[e]}(e);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(t)}},540:e=>{e.exports=function(e){var n=document.createElement("style");return e.setAttributes(n,e.attributes),e.insert(n,e.options),n}},56:(e,n,t)=>{e.exports=function(e){var n=t.nc;n&&e.setAttribute("nonce",n)}},825:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var n=e.insertStyleElement(e);return{update:function(t){!function(e,n,t){var o="";t.supports&&(o+="@supports (".concat(t.supports,") {")),t.media&&(o+="@media ".concat(t.media," {"));var r=void 0!==t.layer;r&&(o+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),o+=t.css,r&&(o+="}"),t.media&&(o+="}"),t.supports&&(o+="}");var a=t.sourceMap;a&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),n.styleTagTransform(o,e,n.options)}(n,e,t)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)}}}},113:e=>{e.exports=function(e,n){if(n.styleSheet)n.styleSheet.cssText=e;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(e))}}}},n={};function t(o){var r=n[o];if(void 0!==r)return r.exports;var a=n[o]={id:o,exports:{}};return e[o](a,a.exports,t),a.exports}t.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},t.d=(e,n)=>{for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),t.nc=void 0,(()=>{var e=t(72),n=t.n(e),o=t(825),r=t.n(o),a=t(659),s=t.n(a),l=t(56),c=t.n(l),i=t(540),A=t.n(i),d=t(113),p=t.n(d),u=t(365),m={};m.styleTagTransform=p(),m.setAttributes=c(),m.insert=s().bind(null,"head"),m.domAPI=r(),m.insertStyleElement=A(),n()(u.A,m),u.A&&u.A.locals&&u.A.locals;const g=e=>console.log(e),f=e=>{let n="",t=0;const o=[];return{getProjectID:()=>e,getTitle:()=>n,setTitle:e=>n=e,getTitlePlaceholder:()=>"...Project Title",getDescription:()=>"",getDescriptionPlaceholder:()=>"...Project Description",getTodosArr:()=>o,addTodo:()=>{o.push(h(t)),t++},removeCompletedTodos:(...e)=>{e.forEach((e=>{for(let n=0;n<o.length;n++)if(o[n].getTodoID()===e){o.splice(n,1),n--;break}}))}}},h=e=>{let n="normal",t=!1;return{getTodoID:()=>e,getTitle:()=>"...Untitled Todo",getNotes:()=>"...add notes",getDueDate:()=>"",getDueTime:()=>"",getPriorityLevel:()=>n,setPriorityLevel:e=>n=e,getCompletedState:()=>t,toggleCompletedState:()=>t=!t}};(()=>{const e=[];let n=0;e.push(f(n)),n++,e.push(f(n)),n++;for(let n=1;n<=2;n++)e[0].addTodo();e.forEach((e=>(e=>{const n=document.createElement("div");n.className="projectDiv",n.setAttribute("data-project-id",`${e.getProjectID()}`);const t=document.createElement("input");t.placeholder=`${e.getTitlePlaceholder()}`;const o=document.createElement("input");o.placeholder=`${e.getDescriptionPlaceholder()}`;const r=document.createElement("button");r.className="removeProjectBtn",r.textContent="remove project";const a=document.createElement("button");a.className="removeCompletedTodosBtn",a.textContent="remove completed";const s=document.createElement("button");s.className="addTodoBtn",s.textContent="add todo";const l=document.createElement("div");l.className="projectBtnsWrap",l.append(r,a,s);const c=document.createElement("div");c.className="todosWrap",((e,n)=>{e.getTodosArr().forEach((e=>{const t=document.createElement("div");t.className="todoDiv";const o=document.createElement("button");o.textContent="▼",o.setAttribute("data-todo-id",`${e.getTodoID()}`);const r=document.createElement("input");r.className="todoTitle",r.placeholder=e.getTitle();const a=document.createElement("input");a.className="completionBox",a.setAttribute("type","checkbox"),a.checked=e.getCompletedState();const s=document.createElement("input");s.className="todoNotes noDisplay",s.placeholder=e.getNotes();const l=document.createElement("input");l.className="dueDateTime noDisplay",l.setAttribute("type","datetime-local");const c=document.createElement("select");c.className="prioritySelect noDisplay";const i=document.createElement("option");i.value="high",i.text="high";const A=document.createElement("option");A.value="normal",A.text="normal",A.selected=!0;const d=document.createElement("option");d.value="low",d.text="low";const p=document.createElement("optgroup");p.label="Priority:",p.append(i,A,d),c.append(p),t.append(o,r,a,s,l,c),n.append(t)}))})(e,c),n.append(t,o,l,c),document.querySelector("body").append(n),(e=>{e.addEventListener("click",(e=>{if(e.stopPropagation(),"BUTTON"===e.target.tagName&&e.target.dataset.todoId){const n=e.target;n.textContent="▼"===n.textContent?"▲":"▼",Array.from(n.parentElement.children).forEach(((e,n)=>{n>2&&e.classList.toggle("noDisplay")}))}})),e.addEventListener("focusout",(e=>{if(e.stopPropagation(),g("this lost focus: "+e.target.outerHTML),"INPUT"===e.target.tagName&&"...Project Title"===e.target.placeholder){const n=e.target;g(n.value)}}))})(n)})(e)))})()})()})();
//# sourceMappingURL=main.bundle.js.map