(()=>{"use strict";var e={365:(e,t,n)=>{n.d(t,{A:()=>A});var o=n(354),r=n.n(o),a=n(314),s=n.n(a)()(r());s.push([e.id,'/* CSS RESET: use box-sizing model; remove default margin & form typography\nstyles; set buttons to display block; set base (pre UA stylesheet) font size; */\n*, *::before, *::after { box-sizing: border-box; }\n* { margin: 0; }\ninput, button, textarea, select { font: inherit; }\nbutton { display: block; cursor: pointer; }\n:root{ font-size: 16px; }  /*chrome default*/\n/* imported google fonts examples */\n/* .roboto { font-family: "Roboto"; font-weight: 400,500; font-style: normal; } */\n/* variables---------------------------------------------------------------- */\n:root{\n  --black: hsl(0, 0%, 0%);\n  --white: hsl(0, 0%, 100%);\n  --red: hsl(0, 100%, 50%);\n  --yellow: hsl(60, 100%, 50%);\n  --green: hsl(120, 100%, 50%);\n  /* tailwind blue palette based, then hue shifted ... CHANGE TO SKY PALETTE to OCD level MATCH TICTACTOE PROJECT */\n  /* */\n  --bg950: hsl(199, 91%, 9%);\n  --bg900: hsl(197, 86%, 16%);\n  --bg800: hsl(196, 88%, 20%);\n  --bg700: hsl(196, 94%, 24%);\n  --bg600: hsl(194, 94%, 30%);\n  --mg500: hsl(193, 84%, 39%);\n  --fg400: hsl(191, 64%, 52%);\n  --fg300: hsl(189, 72%, 67%);\n  --fg200: hsl(185, 76%, 80%);\n  --fg100: hsl(182, 80%, 90%);\n  --fg50:  hsl(185, 81%, 96%);\n  \n\n  /*brown theme (for dev) \n  --bg950: hsl(33, 91%, 9%);\n  --bg900: hsl(31, 86%, 16%);\n  --bg800: hsl(30, 88%, 20%);\n  --bg700: hsl(30, 94%, 24%);\n  --bg600: hsl(28, 94%, 30%);\n  --mg500: hsl(27, 84%, 39%);\n  --fg400: hsl(25, 64%, 52%);\n  --fg300: hsl(23, 72%, 67%);\n  --fg200: hsl(19, 76%, 80%);\n  --fg100: hsl(16, 80%, 90%);\n  --fg50:  hsl(19, 81%, 96%);\n  */\n}\n\n/* main CSS */\nbody {\n  font-family: \'Roboto\', Arial, Helvetica, sans-serif;\n  font-weight: 400;\n  background-color: var(--bg900);\n  h1 {\n    color: var(--fg50);\n    background-color: var(--bg600);\n    text-align: center;\n    text-shadow: 0px 1px 4px var(--black), 0px 1px 4px var(--black);\n    font-weight: 400;\n    margin: 0 0 0.6rem 0;\n  }\n  .addProjectBtn {\n    background-color: var(--fg100);\n    color: var(--bg900);\n    border-radius: 5px;\n    border-style: none;\n    padding: 0.25rem 0.5rem;\n    margin: 0 0.5rem 0 auto;\n    box-shadow: 0 0 3px 2px var(--fg400);\n  }\n}\n.projectWrap {\n  margin: 0.75rem 0 1rem 0;\n  padding: 0.25rem 1rem;\n  background-color: var(--fg200);\n  box-shadow: 0px 0px 2px 2px var(--mg500);\n  input {\n    width: 100%;\n    font-size: 1.25rem;\n    background-color: var(--fg300);\n    cursor: text; /* for datetime-local */\n    margin: 0.25rem 0;\n    border-style: none;\n    color: var(--bg900);\n  }\n  input::placeholder {\n    color: var(--fg200);\n  }\n  .projectBtnsWrap{\n    display: flex;\n    justify-content: space-between;\n    gap: 0.25rem;\n    margin: 0.5rem 0.25rem 0.75rem 0.25rem;\n    button {\n      background-color: var(--fg200);\n      color: var(--bg900);\n      border-radius: 5px;\n      border-style: none;\n      padding: 0.25rem;\n      box-shadow: 0 0 2px 2px var(--bg600);\n    }\n    button:hover{\n      background-color: var(--fg50);\n    }\n  }\n}\n.todoWrap {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  align-items: center;\n  background-color: var(--fg400);\n  margin: 0 0 0.5rem 0;\n  gap: 0 0.25rem;\n  .todoExpandBtn {\n    border-style: none;\n    background-color: var(--fg300);\n    color: var(--bg950); /*ios safari does not default to black for button text*/\n  }\n  .todoTitleInput {\n    flex-basis: 75%;\n    background-color: var(--fg300);/*for dev*/\n  }\n  .todoNotesInput {\n    flex-basis: 75%;\n    margin: 0 auto 0.25rem;\n    display: block;\n    background-color: var(--fg300);/*for dev*/\n  }\n  .completionBoxInput {\n    width: 2rem;\n    height: 2rem;\n    accent-color: var(--fg400);\n    cursor: pointer;\n  }\n  .completionBoxInput::before { /*checkbox inputs styling overlay. first 3 props needed, plus :checked::before rule after*/\n    content: "";\n    display: block;\n    height: 100%;\n    background-color: var(--fg100); /* Initial background color */\n    border-radius: 2px; /* round overlay to match*/\n  }\n  /* Adjust the opacity of the pseudo-element when the checkbox is checked */\n  .completionBoxInput:checked::before {\n    display: none; /* remove pseudo-element when checked */\n  }\n  .dueDateTimeInput {\n    flex-basis: 42%;\n  }\n  .prioritySelect {\n    width: 4.75rem;\n    cursor: pointer;\n  }\n  .noDisplay {\n    display: none;\n  }\n}\n.normalPriority {\n  box-shadow: inset 16px 0 8px -8px var(--yellow), /*left inset shadow*/\n              inset -16px 0 8px -8px var(--yellow); /*right inset shadow*/\n}\n.highPriority {\n  box-shadow: inset 16px 0 8px -8px var(--red), /*left inset shadow*/\n              inset -16px 0 8px -8px var(--red); /*right inset shadow*/\n}\n.lowPriority {\n  box-shadow: inset 16px 0 8px -8px var(--green), /*left inset shadow*/\n              inset -16px 0 8px -8px var(--green); /*right inset shadow*/           \n}',"",{version:3,sources:["webpack://./src/styles.css"],names:[],mappings:"AAAA;+EAC+E;AAC/E,yBAAyB,sBAAsB,EAAE;AACjD,IAAI,SAAS,EAAE;AACf,kCAAkC,aAAa,EAAE;AACjD,SAAS,cAAc,EAAE,eAAe,EAAE;AAC1C,OAAO,eAAe,EAAE,GAAG,iBAAiB;AAC5C,mCAAmC;AACnC,iFAAiF;AACjF,8EAA8E;AAC9E;EACE,uBAAuB;EACvB,yBAAyB;EACzB,wBAAwB;EACxB,4BAA4B;EAC5B,4BAA4B;EAC5B,iHAAiH;EACjH,IAAI;EACJ,0BAA0B;EAC1B,2BAA2B;EAC3B,2BAA2B;EAC3B,2BAA2B;EAC3B,2BAA2B;EAC3B,2BAA2B;EAC3B,2BAA2B;EAC3B,2BAA2B;EAC3B,2BAA2B;EAC3B,2BAA2B;EAC3B,2BAA2B;;;EAG3B;;;;;;;;;;;;GAYC;AACH;;AAEA,aAAa;AACb;EACE,mDAAmD;EACnD,gBAAgB;EAChB,8BAA8B;EAC9B;IACE,kBAAkB;IAClB,8BAA8B;IAC9B,kBAAkB;IAClB,+DAA+D;IAC/D,gBAAgB;IAChB,oBAAoB;EACtB;EACA;IACE,8BAA8B;IAC9B,mBAAmB;IACnB,kBAAkB;IAClB,kBAAkB;IAClB,uBAAuB;IACvB,uBAAuB;IACvB,oCAAoC;EACtC;AACF;AACA;EACE,wBAAwB;EACxB,qBAAqB;EACrB,8BAA8B;EAC9B,wCAAwC;EACxC;IACE,WAAW;IACX,kBAAkB;IAClB,8BAA8B;IAC9B,YAAY,EAAE,uBAAuB;IACrC,iBAAiB;IACjB,kBAAkB;IAClB,mBAAmB;EACrB;EACA;IACE,mBAAmB;EACrB;EACA;IACE,aAAa;IACb,8BAA8B;IAC9B,YAAY;IACZ,sCAAsC;IACtC;MACE,8BAA8B;MAC9B,mBAAmB;MACnB,kBAAkB;MAClB,kBAAkB;MAClB,gBAAgB;MAChB,oCAAoC;IACtC;IACA;MACE,6BAA6B;IAC/B;EACF;AACF;AACA;EACE,aAAa;EACb,eAAe;EACf,uBAAuB;EACvB,mBAAmB;EACnB,8BAA8B;EAC9B,oBAAoB;EACpB,cAAc;EACd;IACE,kBAAkB;IAClB,8BAA8B;IAC9B,mBAAmB,EAAE,uDAAuD;EAC9E;EACA;IACE,eAAe;IACf,8BAA8B,CAAC,UAAU;EAC3C;EACA;IACE,eAAe;IACf,sBAAsB;IACtB,cAAc;IACd,8BAA8B,CAAC,UAAU;EAC3C;EACA;IACE,WAAW;IACX,YAAY;IACZ,0BAA0B;IAC1B,eAAe;EACjB;EACA,8BAA8B,0FAA0F;IACtH,WAAW;IACX,cAAc;IACd,YAAY;IACZ,8BAA8B,EAAE,6BAA6B;IAC7D,kBAAkB,EAAE,0BAA0B;EAChD;EACA,0EAA0E;EAC1E;IACE,aAAa,EAAE,uCAAuC;EACxD;EACA;IACE,eAAe;EACjB;EACA;IACE,cAAc;IACd,eAAe;EACjB;EACA;IACE,aAAa;EACf;AACF;AACA;EACE;kDACgD,EAAE,qBAAqB;AACzE;AACA;EACE;+CAC6C,EAAE,qBAAqB;AACtE;AACA;EACE;iDAC+C,EAAE,qBAAqB;AACxE",sourcesContent:['/* CSS RESET: use box-sizing model; remove default margin & form typography\nstyles; set buttons to display block; set base (pre UA stylesheet) font size; */\n*, *::before, *::after { box-sizing: border-box; }\n* { margin: 0; }\ninput, button, textarea, select { font: inherit; }\nbutton { display: block; cursor: pointer; }\n:root{ font-size: 16px; }  /*chrome default*/\n/* imported google fonts examples */\n/* .roboto { font-family: "Roboto"; font-weight: 400,500; font-style: normal; } */\n/* variables---------------------------------------------------------------- */\n:root{\n  --black: hsl(0, 0%, 0%);\n  --white: hsl(0, 0%, 100%);\n  --red: hsl(0, 100%, 50%);\n  --yellow: hsl(60, 100%, 50%);\n  --green: hsl(120, 100%, 50%);\n  /* tailwind blue palette based, then hue shifted ... CHANGE TO SKY PALETTE to OCD level MATCH TICTACTOE PROJECT */\n  /* */\n  --bg950: hsl(199, 91%, 9%);\n  --bg900: hsl(197, 86%, 16%);\n  --bg800: hsl(196, 88%, 20%);\n  --bg700: hsl(196, 94%, 24%);\n  --bg600: hsl(194, 94%, 30%);\n  --mg500: hsl(193, 84%, 39%);\n  --fg400: hsl(191, 64%, 52%);\n  --fg300: hsl(189, 72%, 67%);\n  --fg200: hsl(185, 76%, 80%);\n  --fg100: hsl(182, 80%, 90%);\n  --fg50:  hsl(185, 81%, 96%);\n  \n\n  /*brown theme (for dev) \n  --bg950: hsl(33, 91%, 9%);\n  --bg900: hsl(31, 86%, 16%);\n  --bg800: hsl(30, 88%, 20%);\n  --bg700: hsl(30, 94%, 24%);\n  --bg600: hsl(28, 94%, 30%);\n  --mg500: hsl(27, 84%, 39%);\n  --fg400: hsl(25, 64%, 52%);\n  --fg300: hsl(23, 72%, 67%);\n  --fg200: hsl(19, 76%, 80%);\n  --fg100: hsl(16, 80%, 90%);\n  --fg50:  hsl(19, 81%, 96%);\n  */\n}\n\n/* main CSS */\nbody {\n  font-family: \'Roboto\', Arial, Helvetica, sans-serif;\n  font-weight: 400;\n  background-color: var(--bg900);\n  h1 {\n    color: var(--fg50);\n    background-color: var(--bg600);\n    text-align: center;\n    text-shadow: 0px 1px 4px var(--black), 0px 1px 4px var(--black);\n    font-weight: 400;\n    margin: 0 0 0.6rem 0;\n  }\n  .addProjectBtn {\n    background-color: var(--fg100);\n    color: var(--bg900);\n    border-radius: 5px;\n    border-style: none;\n    padding: 0.25rem 0.5rem;\n    margin: 0 0.5rem 0 auto;\n    box-shadow: 0 0 3px 2px var(--fg400);\n  }\n}\n.projectWrap {\n  margin: 0.75rem 0 1rem 0;\n  padding: 0.25rem 1rem;\n  background-color: var(--fg200);\n  box-shadow: 0px 0px 2px 2px var(--mg500);\n  input {\n    width: 100%;\n    font-size: 1.25rem;\n    background-color: var(--fg300);\n    cursor: text; /* for datetime-local */\n    margin: 0.25rem 0;\n    border-style: none;\n    color: var(--bg900);\n  }\n  input::placeholder {\n    color: var(--fg200);\n  }\n  .projectBtnsWrap{\n    display: flex;\n    justify-content: space-between;\n    gap: 0.25rem;\n    margin: 0.5rem 0.25rem 0.75rem 0.25rem;\n    button {\n      background-color: var(--fg200);\n      color: var(--bg900);\n      border-radius: 5px;\n      border-style: none;\n      padding: 0.25rem;\n      box-shadow: 0 0 2px 2px var(--bg600);\n    }\n    button:hover{\n      background-color: var(--fg50);\n    }\n  }\n}\n.todoWrap {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  align-items: center;\n  background-color: var(--fg400);\n  margin: 0 0 0.5rem 0;\n  gap: 0 0.25rem;\n  .todoExpandBtn {\n    border-style: none;\n    background-color: var(--fg300);\n    color: var(--bg950); /*ios safari does not default to black for button text*/\n  }\n  .todoTitleInput {\n    flex-basis: 75%;\n    background-color: var(--fg300);/*for dev*/\n  }\n  .todoNotesInput {\n    flex-basis: 75%;\n    margin: 0 auto 0.25rem;\n    display: block;\n    background-color: var(--fg300);/*for dev*/\n  }\n  .completionBoxInput {\n    width: 2rem;\n    height: 2rem;\n    accent-color: var(--fg400);\n    cursor: pointer;\n  }\n  .completionBoxInput::before { /*checkbox inputs styling overlay. first 3 props needed, plus :checked::before rule after*/\n    content: "";\n    display: block;\n    height: 100%;\n    background-color: var(--fg100); /* Initial background color */\n    border-radius: 2px; /* round overlay to match*/\n  }\n  /* Adjust the opacity of the pseudo-element when the checkbox is checked */\n  .completionBoxInput:checked::before {\n    display: none; /* remove pseudo-element when checked */\n  }\n  .dueDateTimeInput {\n    flex-basis: 42%;\n  }\n  .prioritySelect {\n    width: 4.75rem;\n    cursor: pointer;\n  }\n  .noDisplay {\n    display: none;\n  }\n}\n.normalPriority {\n  box-shadow: inset 16px 0 8px -8px var(--yellow), /*left inset shadow*/\n              inset -16px 0 8px -8px var(--yellow); /*right inset shadow*/\n}\n.highPriority {\n  box-shadow: inset 16px 0 8px -8px var(--red), /*left inset shadow*/\n              inset -16px 0 8px -8px var(--red); /*right inset shadow*/\n}\n.lowPriority {\n  box-shadow: inset 16px 0 8px -8px var(--green), /*left inset shadow*/\n              inset -16px 0 8px -8px var(--green); /*right inset shadow*/           \n}'],sourceRoot:""}]);const A=s},314:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",o=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),o&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),o&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,o,r,a){"string"==typeof e&&(e=[[null,e,void 0]]);var s={};if(o)for(var A=0;A<this.length;A++){var i=this[A][0];null!=i&&(s[i]=!0)}for(var l=0;l<e.length;l++){var d=[].concat(e[l]);o&&s[d[0]]||(void 0!==a&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=a),n&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=n):d[2]=n),r&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=r):d[4]="".concat(r)),t.push(d))}},t}},354:e=>{e.exports=function(e){var t=e[1],n=e[3];if(!n)return t;if("function"==typeof btoa){var o=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),r="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(o),a="/*# ".concat(r," */");return[t].concat([a]).join("\n")}return[t].join("\n")}},72:e=>{var t=[];function n(e){for(var n=-1,o=0;o<t.length;o++)if(t[o].identifier===e){n=o;break}return n}function o(e,o){for(var a={},s=[],A=0;A<e.length;A++){var i=e[A],l=o.base?i[0]+o.base:i[0],d=a[l]||0,c="".concat(l," ").concat(d);a[l]=d+1;var p=n(c),g={css:i[1],media:i[2],sourceMap:i[3],supports:i[4],layer:i[5]};if(-1!==p)t[p].references++,t[p].updater(g);else{var u=r(g,o);o.byIndex=A,t.splice(A,0,{identifier:c,updater:u,references:1})}s.push(c)}return s}function r(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,r){var a=o(e=e||[],r=r||{});return function(e){e=e||[];for(var s=0;s<a.length;s++){var A=n(a[s]);t[A].references--}for(var i=o(e,r),l=0;l<a.length;l++){var d=n(a[l]);0===t[d].references&&(t[d].updater(),t.splice(d,1))}a=i}}},659:e=>{var t={};e.exports=function(e,n){var o=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(n)}},540:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},56:(e,t,n)=>{e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},825:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var o="";n.supports&&(o+="@supports (".concat(n.supports,") {")),n.media&&(o+="@media ".concat(n.media," {"));var r=void 0!==n.layer;r&&(o+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),o+=n.css,r&&(o+="}"),n.media&&(o+="}"),n.supports&&(o+="}");var a=n.sourceMap;a&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),t.styleTagTransform(o,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},113:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var a=t[o]={id:o,exports:{}};return e[o](a,a.exports,n),a.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.nc=void 0,(()=>{var e=n(72),t=n.n(e),o=n(825),r=n.n(o),a=n(659),s=n.n(a),A=n(56),i=n.n(A),l=n(540),d=n.n(l),c=n(113),p=n.n(c),g=n(365),u={};u.styleTagTransform=p(),u.setAttributes=i(),u.insert=s().bind(null,"head"),u.domAPI=r(),u.insertStyleElement=d(),t()(g.A,u),g.A&&g.A.locals&&g.A.locals;const m=e=>console.log(e),f=e=>{let t,n,o=0,r=[];return{getProjectID:()=>e,getTitle:()=>t,setTitle:e=>t=e,getTitlePlaceholder:()=>"...Project Title",getDescription:()=>n,setDescription:e=>n=e,getDescriptionPlaceholder:()=>"...Project Description",getTodosArr:()=>r,addTodo:()=>{r.push(B(o)),o++},removeCompletedTodos:()=>{r=r.filter((e=>!e.getCompletedState()))}}},h=(e,t)=>{const n=document.createElement("div"),o=document.createElement("input");e.getTitle()?o.value=e.getTitle():o.placeholder=e.getTitlePlaceholder();const r=document.createElement("input");e.getDescription()?r.value=e.getDescription():r.placeholder=e.getDescriptionPlaceholder();const a=document.createElement("button");a.textContent="remove project ❌";const s=document.createElement("button");s.textContent="clear done todos 🗑";const A=document.createElement("button");A.textContent="add todo➕";const i=document.createElement("div"),l=document.createElement("div");Object.entries({projectWrap:n,projectTitleInput:o,projectDescriptionInput:r,removeProjectBtn:a,clearDoneTodosBtn:s,addTodoBtn:A,projectBtnsWrap:i,todosWrap:l}).forEach((([t,n])=>{n.className=t,n.setAttribute("data-project-id",e.getProjectID())})),i.append(a,s,A),b(e,l),n.append(o,r,i,l),t.append(n),C(n,e)},C=(e,t)=>{e.addEventListener("click",(e=>{e.stopPropagation();const n=document.querySelector(`.todosWrap[data-project-id='${e.target.dataset.projectId}']`);"removeProjectBtn"===e.target.className&&E.removeProject(e.target.dataset.projectId),"todoExpandBtn"===e.target.className&&(e.target.textContent="▼"===e.target.textContent?"▲":"▼",Array.from(e.target.parentElement.children).forEach(((e,t)=>{t>2&&e.classList.toggle("noDisplay")}))),"completionBoxInput"===e.target.className&&t.getTodosArr().forEach((t=>{t.getTodoID()===+e.target.dataset.todoId&&t.toggleCompletedState()})),"clearDoneTodosBtn"===e.target.className&&(t.removeCompletedTodos(),b(t,n)),"addTodoBtn"===e.target.className&&(t.addTodo(),b(t,n))})),e.addEventListener("focusout",(e=>{e.stopPropagation(),"projectTitleInput"===e.target.className&&(m("old project title: "+t.getTitle()),t.setTitle(e.target.value),m("new project title: "+t.getTitle())),"projectDescriptionInput"===e.target.className&&(m("old project description: "+t.getDescription()),t.setDescription(e.target.value),m("new project description: "+t.getDescription())),"todoTitleInput"===e.target.className&&(t.getTodosArr().find((t=>t.getTodoID()===+e.target.dataset.todoId)).setTitle(e.target.value),m("new todo title:"+t.getTodosArr().find((t=>t.getTodoID()===+e.target.dataset.todoId)).getTitle())),"todoNotesInput"===e.target.className&&(t.getTodosArr().find((t=>t.getTodoID()===+e.target.dataset.todoId)).setNotes(e.target.value),m("new todo notes:"+t.getTodosArr().find((t=>t.getTodoID()===+e.target.dataset.todoId)).getNotes()))})),e.addEventListener("change",(e=>{e.stopPropagation(),m("this changed value: "+e.target.outerHTML);const n=document.querySelector(`.todosWrap[data-project-id='${e.target.parentElement.parentElement.dataset.projectId}']`);"dueDateTimeInput"===e.target.className&&(m("old todo dueDateTime:"+t.getTodosArr().find((t=>t.getTodoID()===+e.target.dataset.todoId)).getDueDateTime()),t.getTodosArr().find((t=>t.getTodoID()===+e.target.dataset.todoId)).setDueDateTime(e.target.value),m("new todo dueDateTime:"+t.getTodosArr().find((t=>t.getTodoID()===+e.target.dataset.todoId)).getDueDateTime())),"prioritySelect"===e.target.className&&(m("old todo priority:"+t.getTodosArr().find((t=>t.getTodoID()===+e.target.dataset.todoId)).getPriorityLevel()),t.getTodosArr().find((t=>t.getTodoID()===+e.target.dataset.todoId)).setPriorityLevel(e.target.value),m("new todo priority:"+t.getTodosArr().find((t=>t.getTodoID()===+e.target.dataset.todoId)).getPriorityLevel()),b(t,n))}))},B=e=>{let t,n,o,r="normal",a=!1;return{getTodoID:()=>e,getTitle:()=>t,setTitle:e=>t=e,getTitlePlaceholder:()=>"...Untitled Todo",getNotes:()=>n,setNotes:e=>n=e,getNotesPlaceholder:()=>"...add notes",getDueDateTime:()=>o,setDueDateTime:e=>o=e,getPriorityLevel:()=>r,setPriorityLevel:e=>r=e,getCompletedState:()=>a,toggleCompletedState:()=>a=!a}},b=(e,t)=>{t.innerHTML="",e.getTodosArr().forEach((e=>{const n=document.createElement("div"),o=document.createElement("button");o.textContent="▼";const r=document.createElement("input");e.getTitle()?r.value=e.getTitle():r.placeholder=e.getTitlePlaceholder();const a=document.createElement("input");a.setAttribute("type","checkbox"),a.checked=e.getCompletedState();const s=document.createElement("input");e.getNotes()?s.value=e.getNotes():s.placeholder=e.getNotesPlaceholder();const A=document.createElement("input");A.setAttribute("type","datetime-local"),e.getDueDateTime()&&(A.value=e.getDueDateTime());const i=document.createElement("select"),l=document.createElement("optgroup");l.label="Priority:";const d=document.createElement("option");d.value="high",d.text="high";const c=document.createElement("option");c.value="normal",c.text="normal";const p=document.createElement("option");switch(p.value="low",p.text="low",e.getPriorityLevel()){case"normal":c.selected=!0,n.classList.add("normalPriority");break;case"high":d.selected=!0,n.classList.add("highPriority");break;case"low":p.selected=!0,n.classList.add("lowPriority")}Object.entries({todoWrap:n,todoExpandBtn:o,todoTitleInput:r,completionBoxInput:a,todoNotesInput:s,dueDateTimeInput:A,prioritySelect:i}).forEach((([t,n])=>{n.classList.add(t),["todoNotesInput","dueDateTimeInput","prioritySelect"].includes(t)&&n.classList.add("noDisplay"),n.setAttribute("data-todo-id",`${e.getTodoID()}`)})),l.append(d,c,p),i.append(l),n.append(o,r,a,s,A,i),t.append(n),m(t.childNodes)}))},E=(()=>{let e=[],t=0;const n=document.createElement("button");n.className="addProjectBtn",n.textContent="New Project",n.addEventListener("click",(n=>{e.push(f(t)),t++,o.innerHTML="",e.forEach((e=>h(e,o)))})),document.querySelector("body").append(n);const o=document.createElement("div");o.className="projectsWrap",document.querySelector("body").append(o),e.push(f(t)),t++;for(let t=1;t<=2;t++)e[0].addTodo();return e.forEach((e=>h(e,o))),{getProjectsArr:()=>e,removeProject:t=>{e=e.filter((e=>e.getProjectID()!==+t)),o.innerHTML="",e.forEach((e=>h(e,o)))}}})()})()})();
//# sourceMappingURL=main.bundle.js.map