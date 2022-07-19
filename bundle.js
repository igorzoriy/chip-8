/*! For license information please see bundle.js.LICENSE.txt */
!function(){"use strict";const t=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e=Symbol(),s=new Map;class i{constructor(t,s){if(this._$cssResult$=!0,s!==e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let e=s.get(this.cssText);return t&&void 0===e&&(s.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const r=t?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let s="";for(const e of t.cssRules)s+=e.cssText;return(t=>new i("string"==typeof t?t:t+"",e))(s)})(t):t;var o;const n=window.trustedTypes,a=n?n.emptyScript:"",h=window.reactiveElementPolyfillSupport,l={toAttribute(t,e){switch(e){case Boolean:t=t?a:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},c=(t,e)=>e!==t&&(e==e||t==t),d={attribute:!0,type:String,converter:l,reflect:!1,hasChanged:c};class u extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;null!==(e=this.l)&&void 0!==e||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,s)=>{const i=this._$Eh(s,e);void 0!==i&&(this._$Eu.set(i,s),t.push(i))})),t}static createProperty(t,e=d){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const r=this[t];this[e]=i,this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||d}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of e)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eh(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,s;(null!==(e=this._$Eg)&&void 0!==e?e:this._$Eg=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t))}removeController(t){var e;null===(e=this._$Eg)||void 0===e||e.splice(this._$Eg.indexOf(t)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])}))}createRenderRoot(){var e;const s=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,s)=>{t?e.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):s.forEach((t=>{const s=document.createElement("style"),i=window.litNonce;void 0!==i&&s.setAttribute("nonce",i),s.textContent=t.cssText,e.appendChild(s)}))})(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ES(t,e,s=d){var i,r;const o=this.constructor._$Eh(t,s);if(void 0!==o&&!0===s.reflect){const n=(null!==(r=null===(i=s.converter)||void 0===i?void 0:i.toAttribute)&&void 0!==r?r:l.toAttribute)(e,s.type);this._$Ei=t,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$Ei=null}}_$AK(t,e){var s,i,r;const o=this.constructor,n=o._$Eu.get(t);if(void 0!==n&&this._$Ei!==n){const t=o.getPropertyOptions(n),a=t.converter,h=null!==(r=null!==(i=null===(s=a)||void 0===s?void 0:s.fromAttribute)&&void 0!==i?i:"function"==typeof a?a:null)&&void 0!==r?r:l.fromAttribute;this._$Ei=n,this[n]=h(e,t.type),this._$Ei=null}}requestUpdate(t,e,s){let i=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||c)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===s.reflect&&this._$Ei!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):i=!1),!this.isUpdatePending&&i&&(this._$Ep=this._$E_())}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,e)=>this[e]=t)),this._$Et=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(s)):this._$EU()}catch(t){throw e=!1,this._$EU(),t}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;null===(e=this._$Eg)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$ES(e,this[e],t))),this._$EC=void 0),this._$EU()}updated(t){}firstUpdated(t){}}var p;u.finalized=!0,u.elementProperties=new Map,u.elementStyles=[],u.shadowRootOptions={mode:"open"},null==h||h({ReactiveElement:u}),(null!==(o=globalThis.reactiveElementVersions)&&void 0!==o?o:globalThis.reactiveElementVersions=[]).push("1.3.2");const v=globalThis.trustedTypes,m=v?v.createPolicy("lit-html",{createHTML:t=>t}):void 0,g=`lit$${(Math.random()+"").slice(9)}$`,y="?"+g,f=`<${y}>`,$=document,b=(t="")=>$.createComment(t),_=t=>null===t||"object"!=typeof t&&"function"!=typeof t,A=Array.isArray,w=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,k=/-->/g,x=/>/g,S=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,E=/'/g,U=/"/g,C=/^(?:script|style|textarea|title)$/i,I=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),T=I(1),N=(I(2),Symbol.for("lit-noChange")),P=Symbol.for("lit-nothing"),R=new WeakMap,O=$.createTreeWalker($,129,null,!1),M=(t,e)=>{const s=t.length-1,i=[];let r,o=2===e?"<svg>":"",n=w;for(let e=0;e<s;e++){const s=t[e];let a,h,l=-1,c=0;for(;c<s.length&&(n.lastIndex=c,h=n.exec(s),null!==h);)c=n.lastIndex,n===w?"!--"===h[1]?n=k:void 0!==h[1]?n=x:void 0!==h[2]?(C.test(h[2])&&(r=RegExp("</"+h[2],"g")),n=S):void 0!==h[3]&&(n=S):n===S?">"===h[0]?(n=null!=r?r:w,l=-1):void 0===h[1]?l=-2:(l=n.lastIndex-h[2].length,a=h[1],n=void 0===h[3]?S:'"'===h[3]?U:E):n===U||n===E?n=S:n===k||n===x?n=w:(n=S,r=void 0);const d=n===S&&t[e+1].startsWith("/>")?" ":"";o+=n===w?s+f:l>=0?(i.push(a),s.slice(0,l)+"$lit$"+s.slice(l)+g+d):s+g+(-2===l?(i.push(void 0),e):d)}const a=o+(t[s]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==m?m.createHTML(a):a,i]};class H{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,o=0;const n=t.length-1,a=this.parts,[h,l]=M(t,e);if(this.el=H.createElement(h,s),O.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(i=O.nextNode())&&a.length<n;){if(1===i.nodeType){if(i.hasAttributes()){const t=[];for(const e of i.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(g)){const s=l[o++];if(t.push(e),void 0!==s){const t=i.getAttribute(s.toLowerCase()+"$lit$").split(g),e=/([.?@])?(.*)/.exec(s);a.push({type:1,index:r,name:e[2],strings:t,ctor:"."===e[1]?q:"?"===e[1]?j:"@"===e[1]?V:L})}else a.push({type:6,index:r})}for(const e of t)i.removeAttribute(e)}if(C.test(i.tagName)){const t=i.textContent.split(g),e=t.length-1;if(e>0){i.textContent=v?v.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],b()),O.nextNode(),a.push({type:2,index:++r});i.append(t[e],b())}}}else if(8===i.nodeType)if(i.data===y)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(g,t+1));)a.push({type:7,index:r}),t+=g.length-1}r++}}static createElement(t,e){const s=$.createElement("template");return s.innerHTML=t,s}}function D(t,e,s=t,i){var r,o,n,a;if(e===N)return e;let h=void 0!==i?null===(r=s._$Cl)||void 0===r?void 0:r[i]:s._$Cu;const l=_(e)?void 0:e._$litDirective$;return(null==h?void 0:h.constructor)!==l&&(null===(o=null==h?void 0:h._$AO)||void 0===o||o.call(h,!1),void 0===l?h=void 0:(h=new l(t),h._$AT(t,s,i)),void 0!==i?(null!==(n=(a=s)._$Cl)&&void 0!==n?n:a._$Cl=[])[i]=h:s._$Cu=h),void 0!==h&&(e=D(t,h._$AS(t,e.values),h,i)),e}class K{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:s},parts:i}=this._$AD,r=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:$).importNode(s,!0);O.currentNode=r;let o=O.nextNode(),n=0,a=0,h=i[0];for(;void 0!==h;){if(n===h.index){let e;2===h.type?e=new B(o,o.nextSibling,this,t):1===h.type?e=new h.ctor(o,h.name,h.strings,this,t):6===h.type&&(e=new F(o,this,t)),this.v.push(e),h=i[++a]}n!==(null==h?void 0:h.index)&&(o=O.nextNode(),n++)}return r}m(t){let e=0;for(const s of this.v)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class B{constructor(t,e,s,i){var r;this.type=2,this._$AH=P,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cg=null===(r=null==i?void 0:i.isConnected)||void 0===r||r}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=D(this,t,e),_(t)?t===P||null==t||""===t?(this._$AH!==P&&this._$AR(),this._$AH=P):t!==this._$AH&&t!==N&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.k(t):(t=>{var e;return A(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.S(t):this.$(t)}M(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.M(t))}$(t){this._$AH!==P&&_(this._$AH)?this._$AA.nextSibling.data=t:this.k($.createTextNode(t)),this._$AH=t}T(t){var e;const{values:s,_$litType$:i}=t,r="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=H.createElement(i.h,this.options)),i);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===r)this._$AH.m(s);else{const t=new K(r,this),e=t.p(this.options);t.m(s),this.k(e),this._$AH=t}}_$AC(t){let e=R.get(t.strings);return void 0===e&&R.set(t.strings,e=new H(t)),e}S(t){A(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new B(this.M(b()),this.M(b()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cg=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class L{constructor(t,e,s,i,r){this.type=1,this._$AH=P,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=P}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){const r=this.strings;let o=!1;if(void 0===r)t=D(this,t,e,0),o=!_(t)||t!==this._$AH&&t!==N,o&&(this._$AH=t);else{const i=t;let n,a;for(t=r[0],n=0;n<r.length-1;n++)a=D(this,i[s+n],e,n),a===N&&(a=this._$AH[n]),o||(o=!_(a)||a!==this._$AH[n]),a===P?t=P:t!==P&&(t+=(null!=a?a:"")+r[n+1]),this._$AH[n]=a}o&&!i&&this.C(t)}C(t){t===P?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class q extends L{constructor(){super(...arguments),this.type=3}C(t){this.element[this.name]=t===P?void 0:t}}const z=v?v.emptyScript:"";class j extends L{constructor(){super(...arguments),this.type=4}C(t){t&&t!==P?this.element.setAttribute(this.name,z):this.element.removeAttribute(this.name)}}class V extends L{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){var s;if((t=null!==(s=D(this,t,e,0))&&void 0!==s?s:P)===N)return;const i=this._$AH,r=t===P&&i!==P||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==P&&(i===P||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t)}}class F{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){D(this,t)}}const W=window.litHtmlPolyfillSupport;var Z,G;null==W||W(H,B),(null!==(p=globalThis.litHtmlVersions)&&void 0!==p?p:globalThis.litHtmlVersions=[]).push("2.2.6");class J extends u{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,e,s)=>{var i,r;const o=null!==(i=null==s?void 0:s.renderBefore)&&void 0!==i?i:e;let n=o._$litPart$;if(void 0===n){const t=null!==(r=null==s?void 0:s.renderBefore)&&void 0!==r?r:null;o._$litPart$=n=new B(e.insertBefore(b(),t),t,void 0,null!=s?s:{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return N}}J.finalized=!0,J._$litElement$=!0,null===(Z=globalThis.litElementHydrateSupport)||void 0===Z||Z.call(globalThis,{LitElement:J});const Q=globalThis.litElementPolyfillSupport;function X(t,e){return(({finisher:t,descriptor:e})=>(s,i)=>{var r;if(void 0===i){const i=null!==(r=s.originalKey)&&void 0!==r?r:s.key,o=null!=e?{kind:"method",placement:"prototype",key:i,descriptor:e(s.key)}:{...s,key:i};return null!=t&&(o.finisher=function(e){t(e,i)}),o}{const r=s.constructor;void 0!==e&&Object.defineProperty(s,i,e(i)),null==t||t(r,i)}})({descriptor:s=>{const i={get(){var e,s;return null!==(s=null===(e=this.renderRoot)||void 0===e?void 0:e.querySelector(t))&&void 0!==s?s:null},enumerable:!0,configurable:!0};if(e){const e="symbol"==typeof s?Symbol():"__"+s;i.get=function(){var s,i;return void 0===this[e]&&(this[e]=null!==(i=null===(s=this.renderRoot)||void 0===s?void 0:s.querySelector(t))&&void 0!==i?i:null),this[e]}}return i}})}var Y;null==Q||Q({LitElement:J}),(null!==(G=globalThis.litElementVersions)&&void 0!==G?G:globalThis.litElementVersions=[]).push("3.2.0"),null===(Y=window.HTMLSlotElement)||void 0===Y||Y.prototype.assignedElements;const tt=new Uint8Array([240,144,144,144,240,32,96,32,32,112,240,16,240,128,240,240,16,240,16,240,144,144,240,16,16,240,128,240,16,240,240,128,240,144,240,240,16,32,64,64,240,144,240,144,240,240,144,240,16,240,240,144,240,144,144,224,144,224,144,224,240,128,128,128,240,224,144,144,144,224,240,128,240,128,240,240,128,240,128,128]);class et{constructor(){this.reset()}reset(){this.memoryBuffer=new ArrayBuffer(4096),this.memory=new DataView(this.memoryBuffer),this.opcode=0,this.I=0,this.pc=512,this.vregisters=new Uint8Array(16),this.sp=0,this.stack=new Uint16Array(16),this.delayTimer=0,this.soundTimer=0,this.vram=new Uint8Array(2048),this.loadFont(),this.keyboard=new Uint8Array(16)}loadFont(){new Uint8Array(this.memoryBuffer).set(new Uint8Array(tt),0)}loadRom(t){new Uint8Array(this.memoryBuffer).set(new Uint8Array(t),512)}clearVram(){this.vram=new Uint8Array(2048)}drawSprite(t,e,s){let i=!1;for(let r=0;r<s;r++){const s=this.memory.getUint8(this.I+r);for(let o=0;o<8;o++)if(s&1<<7-o){const s=(t+o>=64?t+o-64:t+o)+64*(e+r>=32?e+r-32:e+r);i=i||1===this.vram[s],this.vram[s]^=1}}this.vregisters[15]=Number(i)}updateKeyboard(t){this.keyboard=t}parseOpcode(t){return{x:(3840&t)>>8,y:(240&t)>>4,nn:255&t,nnn:4095&t}}nextInstruction(){this.pc+=2}skipNextInstruction(){this.pc+=4}returnFromSubroutine(){if(this.sp<=0)throw new Error("Stack underflow");this.sp--,this.pc=this.stack[this.sp]}callSubroutine(t){if(this.sp>15)throw new Error("Stack overflow");this.stack[this.sp]=this.pc+2,this.sp++,this.pc=t}tick(){this.delayTimer>0&&this.delayTimer--,this.soundTimer>0&&this.soundTimer--}throwUnknownOpcode(t){throw new Error(`Unknown opcode: ${t.toString(16)}`)}performCycle(){const t=this.memory.getUint16(this.pc),{x:e,y:s,nn:i,nnn:r}=this.parseOpcode(t);switch(61440&t){case 0:224===r?(this.clearVram(),this.nextInstruction()):238===r?this.returnFromSubroutine():this.throwUnknownOpcode(t);break;case 4096:this.pc=r;break;case 8192:this.callSubroutine(r);break;case 12288:this.vregisters[e]===i?this.skipNextInstruction():this.nextInstruction();break;case 16384:this.vregisters[e]!==i?this.skipNextInstruction():this.nextInstruction();break;case 20480:this.vregisters[e]===this.vregisters[s]?this.skipNextInstruction():this.nextInstruction();break;case 24576:this.vregisters[e]=i,this.nextInstruction();break;case 28672:this.vregisters[e]+=i,this.nextInstruction();break;case 32768:switch(15&t){case 0:this.vregisters[e]=this.vregisters[s],this.nextInstruction();break;case 1:this.vregisters[e]|=this.vregisters[s],this.nextInstruction();break;case 2:this.vregisters[e]&=this.vregisters[s],this.nextInstruction();break;case 3:this.vregisters[e]^=this.vregisters[s],this.nextInstruction();break;case 4:const i=this.vregisters[e]+this.vregisters[s];this.vregisters[e]=i,this.vregisters[15]=i>255?1:0,this.nextInstruction();break;case 5:const r=this.vregisters[e]-this.vregisters[s];this.vregisters[e]=r,this.vregisters[15]=r<0?0:1,this.nextInstruction();break;case 6:this.vregisters[15]=1&this.vregisters[e],this.vregisters[e]>>=1,this.nextInstruction();break;case 7:const o=this.vregisters[s]-this.vregisters[e];this.vregisters[e]=o,this.vregisters[15]=o<0?0:1,this.nextInstruction();break;case 14:this.vregisters[15]=this.vregisters[e]>>7,this.vregisters[e]<<=1,this.nextInstruction();break;default:this.throwUnknownOpcode(t)}break;case 36864:this.vregisters[e]!==this.vregisters[s]?this.skipNextInstruction():this.nextInstruction();break;case 40960:this.I=4095&t,this.nextInstruction();break;case 45056:this.pc=r+this.vregisters[0];break;case 49152:this.vregisters[e]=Math.floor(255*Math.random())&i,this.nextInstruction();break;case 53248:const o=15&t;this.drawSprite(this.vregisters[e],this.vregisters[s],o),this.nextInstruction();break;case 57344:if(158===i){const t=this.vregisters[e];this.keyboard[t]?this.skipNextInstruction():this.nextInstruction()}else if(161===i){const t=this.vregisters[e];this.keyboard[t]?this.nextInstruction():this.skipNextInstruction()}else this.throwUnknownOpcode(t);break;case 61440:switch(i){case 7:this.vregisters[e]=this.delayTimer,this.nextInstruction();break;case 21:this.delayTimer=this.vregisters[e],this.nextInstruction();break;case 24:this.soundTimer=this.vregisters[e],this.nextInstruction();break;case 30:this.I+=this.vregisters[e],this.nextInstruction();break;case 41:if(this.vregisters[e]>15)throw new Error(`Invalid font sprite: ${this.vregisters[e]}`);this.I=5*this.vregisters[e],this.nextInstruction();break;case 51:this.memory.setUint8(this.I,Math.floor(this.vregisters[e]/100)),this.memory.setUint8(this.I+1,this.vregisters[e]/10%10),this.memory.setUint8(this.I+2,this.vregisters[e]%10),this.nextInstruction();break;case 85:for(let t=0;t<=e;t++)this.memory.setUint8(this.I+t,this.vregisters[t]);this.nextInstruction();break;case 101:for(let t=0;t<=e;t++)this.vregisters[t]=this.memory.getUint8(this.I+t);this.nextInstruction();break;default:this.throwUnknownOpcode(t)}break;default:this.throwUnknownOpcode(t)}}get shouldBeep(){return this.soundTimer>0}getData(){return{vregisters:[...this.vregisters],I:this.I,pc:this.pc,vram:[...this.vram]}}}const st=["Digit1","Digit2","Digit3","Digit4","KeyQ","KeyW","KeyE","KeyR","KeyA","KeyS","KeyD","KeyF","KeyZ","KeyX","KeyC","KeyV"];class it{constructor(){this.context=new AudioContext,this.gainNode=this.context.createGain(),this.gainNode.gain.value=1,this.gainNode.connect(this.context.destination)}start(){this.oscillatorNode||(this.oscillatorNode=this.context.createOscillator(),this.oscillatorNode.frequency.value=350,this.oscillatorNode.connect(this.gainNode),this.oscillatorNode.start())}stop(){var t;null===(t=this.oscillatorNode)||void 0===t||t.stop(),this.oscillatorNode=void 0}mute(t){this.gainNode.gain.value=Number(!t)}}class rt{constructor(t,e){this.step=t=>{this.startTs||(this.startTs=t),t<this.startTs+this.slot?this.rid=requestAnimationFrame(this.step):(this.startTs+=this.slot,this.tick(),this.step(t))},this.tick=t,this.frequency=e}get slot(){return 1e3/this.frequency}start(){this.rid=requestAnimationFrame(this.step)}stop(){var t;this.startTs=void 0,cancelAnimationFrame(null!==(t=this.rid)&&void 0!==t?t:-1)}}class ot{constructor(t){this.frequency=60,this.speed=5,this.tick=()=>{for(let t=0;t<this.speed;t++)this.chip.performCycle();this.chip.shouldBeep?this.speaker.start():this.speaker.stop(),this.chip.tick(),this.host.requestUpdate()},this.handleKeyDown=({code:t})=>{const e=this.mapCodeToKeyboard(t);-1!==e&&(this.keyboard[e]=1,this.chip.updateKeyboard(this.keyboard))},this.handleKeyUp=({code:t})=>{const e=this.mapCodeToKeyboard(t);-1!==e&&(this.keyboard[e]=0,this.chip.updateKeyboard(this.keyboard))},(this.host=t).addController(this),this.chip=new et,this.romName="",this.loaded=!1,this.paused=!0,this.muted=!1,this.keyboard=new Uint8Array(16),this.speaker=new it,this.ticker=new rt(this.tick,this.frequency)}hostConnected(){document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}hostDisconnected(){this.ticker.stop()}loadRom(t,e){this.romName=t,this.loaded=!0,this.chip.loadRom(e),this.host.requestUpdate()}play(){this.ticker.start(),this.paused=!1,this.host.requestUpdate()}pause(){this.ticker.stop(),this.paused=!0,this.host.requestUpdate()}reset(){this.speaker.stop(),this.ticker.stop(),this.romName="",this.loaded=!1,this.paused=!0,this.chip.reset(),this.host.requestUpdate()}muteUnmute(){this.muted=!this.muted,this.speaker.mute(this.muted),this.host.requestUpdate()}getChipData(){return this.chip.getData()}mapCodeToKeyboard(t){return st.indexOf(t)}}var nt=function(t,e,s,i){var r,o=arguments.length,n=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o<3?r(n):o>3?r(e,s,n):r(e,s))||n);return o>3&&n&&Object.defineProperty(e,s,n),n},at=function(t,e,s,i){return new(s||(s=Promise))((function(r,o){function n(t){try{h(i.next(t))}catch(t){o(t)}}function a(t){try{h(i.throw(t))}catch(t){o(t)}}function h(t){var e;t.done?r(t.value):(e=t.value,e instanceof s?e:new s((function(t){t(e)}))).then(n,a)}h((i=i.apply(t,e||[])).next())}))};let ht=class extends J{constructor(){super(...arguments),this.ctrl=new ot(this)}loadAndPlay(t,e){return at(this,void 0,void 0,(function*(){const{ctrl:s}=this;try{const i=yield e.arrayBuffer();s.reset(),s.loadRom(t,i),s.play()}catch(t){console.error(t)}}))}handleSelectRom(){return at(this,void 0,void 0,(function*(){const t=this.romSelector.value;this.romSelector.value="";try{const e=yield fetch(`roms/${t}`);this.loadAndPlay(t,e)}catch(t){console.error(t)}}))}handleUploadClick(){var t;null===(t=this.fileInput)||void 0===t||t.click()}handleUploadRom(t){const e=t.target;if(!e.files||0===e.files.length)return;const s=e.files[0];this.loadAndPlay(s.name,s)}handlePlayPauseClick(){const{ctrl:t}=this;t.paused?t.play():t.pause()}handleResetClick(){this.ctrl.reset()}handleMuteUnmute(){this.ctrl.muteUnmute()}willUpdate(){this.renderDisplay()}renderDisplay(){var t;const e=null===(t=this.canvas)||void 0===t?void 0:t.getContext("2d");if(!e)return;const{vram:s}=this.ctrl.getChipData(),i=e.createImageData(64,32);for(let t=0;t<i.data.length;t++)i.data[4*t]=0===s[t]?0:255,i.data[4*t+1]=0===s[t]?0:255,i.data[4*t+2]=0===s[t]?0:255,i.data[4*t+3]=255;e.putImageData(i,0,0)}render(){const{ctrl:t}=this,{vregisters:e,I:s,pc:i}=t.getChipData();return T`
      <h1 class="app-header">CHIP-8 TypeScript</h1>
      <section class="controls">
        <h2 class="subheader">Controls</h2>
        <span class="rom-name"
          >${""===t.romName?"No rom":t.romName}</span
        >
        <select class="rom-selector" @change="${this.handleSelectRom}">
          <option value="" selected disabled hidden>Select ROM</option>
          <optgroup label="Games">
            <option value="invaders.ch8">Invaders</option>
            <option value="maze.ch8">Maze</option>
            <option value="pong.ch8">Pong</option>
          </optgroup>
          <optgroup label="Tests">
            <option value="font-test.ch8">Font Test</option>
            <option value="ibm-logo.ch8">IBM Logo</option>
            <option value="chip8-logo.ch8">CHIP-8 Logo</option>
          </optgroup>
        </select>
        <button class="button" @click="${this.handleUploadClick}">
          Upload ROM
        </button>
        <input
          class="file-input"
          type="file"
          @change="${this.handleUploadRom}"
        />
        <button
          class="button"
          @click="${this.handlePlayPauseClick}"
          ?disabled="${!t.loaded}"
        >
          ${this.ctrl.paused?"Play":"Pause"}
        </button>
        <button
          class="button"
          @click="${this.handleResetClick}"
          ?disabled="${!t.loaded}"
        >
          Reset
        </button>
        <button class="button" @click="${this.handleMuteUnmute}">
          ${this.ctrl.muted?"🔇 Unmute":"🔊 Mute"}
        </button>
      </section>
      <section class="registers">
        <h2 class="subheader">Registers</h2>
        <ul>
          <li>I: ${s.toString(16)}</li>
          <li>PC: ${i.toString(16)}</li>
          ${e.map(((t,e)=>T`<li>V${e}: ${t.toString(16)}</li>`))}
        </ul>
      </section>
      <canvas
        class="display"
        width="${64}"
        height="${32}"
      ></canvas>
    `}};ht.styles=[((t,...s)=>{const r=1===t.length?t[0]:s.reduce(((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1]),t[0]);return new i(r,e)})`
      :host {
        display: grid;
        gap: 1rem;
        grid-template-columns: 1fr 3fr;
        grid-template-rows: auto;
        grid-template-areas:
          "header header"
          "controls display"
          "registers display";
        max-width: var(--max-app-width);
        margin: 0 auto;
        padding: 0.6rem;
      }

      .app-header {
        grid-area: header;
        font-size: 1.8rem;
        color: var(--primary-color);
        border-bottom: 1px dashed var(--primary-color);
        margin: 0.625rem 0 0;
        padding-bottom: 0.5rem;
      }

      .controls {
        grid-area: controls;
        border: 1px solid var(--primary-color);
        display: flex;
        flex-direction: column;
      }

      .display {
        grid-area: display;
        width: 100%;
        border: 1px solid var(--primary-color);
        background-color: var(--primary-color);
        image-rendering: pixelated;
      }

      .registers {
        grid-area: registers;
        border: 1px solid var(--primary-color);
      }

      .subheader {
        margin: 0;
        padding: 0.3rem;
        font-size: 1.2rem;
        background-color: var(--secondary-color);
        color: var(--bg-color);
        text-align: center;
      }

      .button {
        margin: 0.2rem 0.4rem;
        padding: 0.5rem;
        background-color: var(--bg-color);
        color: var(--primary-color);
        border: 1px solid var(--primary-color);
        font-family: var(--font-family);
        cursor: pointer;
      }
      .button:hover:not([disabled]) {
        background-color: var(--secondary-color);
        color: var(--bg-color);
        border-color: var(--bg-color);
      }
      .button[disabled] {
        color: var(--secondary-color);
        cursor: default;
      }

      .file-input {
        display: none;
      }

      .rom-selector {
        margin: 0.2rem 0.4rem;
        padding: 0.5rem;
        background-color: var(--bg-color);
        color: var(--primary-color);
        font-family: var(--font-family);
        border: 1px solid var(--primary-color);
        border-radius: 0;
        text-align: center;
        appearance: none;
        cursor: pointer;
      }
      .rom-selector:hover {
        background-color: var(--secondary-color);
        color: var(--bg-color);
        border-color: var(--bg-color);
      }

      .rom-name {
        text-align: center;
        font-weight: 700;
        padding: 0.5rem;
      }
    `],nt([X(".file-input")],ht.prototype,"fileInput",void 0),nt([X(".rom-selector")],ht.prototype,"romSelector",void 0),nt([X(".display")],ht.prototype,"canvas",void 0),ht=nt([t=>"function"==typeof t?((t,e)=>(window.customElements.define("ch-app",e),e))(0,t):((t,e)=>{const{kind:s,elements:i}=e;return{kind:s,elements:i,finisher(t){window.customElements.define("ch-app",t)}}})(0,t)],ht)}();
//# sourceMappingURL=bundle.js.map