(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function e(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=e(i);fetch(i.href,o)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const z=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,V=Symbol(),F=new Map;let ot=class{constructor(t,e){if(this._$cssResult$=!0,e!==V)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let t=F.get(this.cssText);return z&&t===void 0&&(F.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}};const ct=r=>new ot(typeof r=="string"?r:r+"",V),dt=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((s,i,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[o+1],r[0]);return new ot(e,V)},ut=(r,t)=>{z?r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{const s=document.createElement("style"),i=window.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)})},W=z?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return ct(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var R;const Z=window.trustedTypes,pt=Z?Z.emptyScript:"",G=window.reactiveElementPolyfillSupport,q={toAttribute(r,t){switch(t){case Boolean:r=r?pt:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},nt=(r,t)=>t!==r&&(t==t||r==r),H={attribute:!0,type:String,converter:q,reflect:!1,hasChanged:nt};let y=class extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;(e=this.l)!==null&&e!==void 0||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,s)=>{const i=this._$Eh(s,e);i!==void 0&&(this._$Eu.set(i,s),t.push(i))}),t}static createProperty(t,e=H){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s=typeof t=="symbol"?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const o=this[t];this[e]=i,this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||H}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const e=this.properties,s=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of s)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(W(i))}else t!==void 0&&e.push(W(t));return e}static _$Eh(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Em(),this.requestUpdate(),(t=this.constructor.l)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,s;((e=this._$Eg)!==null&&e!==void 0?e:this._$Eg=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((s=t.hostConnected)===null||s===void 0||s.call(t))}removeController(t){var e;(e=this._$Eg)===null||e===void 0||e.splice(this._$Eg.indexOf(t)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return ut(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$Eg)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostConnected)===null||s===void 0?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$Eg)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostDisconnected)===null||s===void 0?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ES(t,e,s=H){var i,o;const n=this.constructor._$Eh(t,s);if(n!==void 0&&s.reflect===!0){const a=((o=(i=s.converter)===null||i===void 0?void 0:i.toAttribute)!==null&&o!==void 0?o:q.toAttribute)(e,s.type);this._$Ei=t,a==null?this.removeAttribute(n):this.setAttribute(n,a),this._$Ei=null}}_$AK(t,e){var s,i,o;const n=this.constructor,a=n._$Eu.get(t);if(a!==void 0&&this._$Ei!==a){const l=n.getPropertyOptions(a),h=l.converter,p=(o=(i=(s=h)===null||s===void 0?void 0:s.fromAttribute)!==null&&i!==void 0?i:typeof h=="function"?h:null)!==null&&o!==void 0?o:q.fromAttribute;this._$Ei=a,this[a]=p(e,l.type),this._$Ei=null}}requestUpdate(t,e,s){let i=!0;t!==void 0&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||nt)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$Ei!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,s))):i=!1),!this.isUpdatePending&&i&&(this._$Ep=this._$E_())}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach((i,o)=>this[o]=i),this._$Et=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this._$Eg)===null||t===void 0||t.forEach(i=>{var o;return(o=i.hostUpdate)===null||o===void 0?void 0:o.call(i)}),this.update(s)):this._$EU()}catch(i){throw e=!1,this._$EU(),i}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;(e=this._$Eg)===null||e===void 0||e.forEach(s=>{var i;return(i=s.hostUpdated)===null||i===void 0?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((e,s)=>this._$ES(s,this[s],e)),this._$EC=void 0),this._$EU()}updated(t){}firstUpdated(t){}};y.finalized=!0,y.elementProperties=new Map,y.elementStyles=[],y.shadowRootOptions={mode:"open"},G==null||G({ReactiveElement:y}),((R=globalThis.reactiveElementVersions)!==null&&R!==void 0?R:globalThis.reactiveElementVersions=[]).push("1.3.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var D;const _=globalThis.trustedTypes,Y=_?_.createPolicy("lit-html",{createHTML:r=>r}):void 0,m=`lit$${(Math.random()+"").slice(9)}$`,at="?"+m,vt=`<${at}>`,A=document,C=(r="")=>A.createComment(r),U=r=>r===null||typeof r!="object"&&typeof r!="function",lt=Array.isArray,mt=r=>{var t;return lt(r)||typeof((t=r)===null||t===void 0?void 0:t[Symbol.iterator])=="function"},S=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,J=/-->/g,Q=/>/g,g=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,X=/'/g,tt=/"/g,ht=/^(?:script|style|textarea|title)$/i,gt=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),et=gt(1),w=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),st=new WeakMap,ft=(r,t,e)=>{var s,i;const o=(s=e==null?void 0:e.renderBefore)!==null&&s!==void 0?s:t;let n=o._$litPart$;if(n===void 0){const a=(i=e==null?void 0:e.renderBefore)!==null&&i!==void 0?i:null;o._$litPart$=n=new N(t.insertBefore(C(),a),a,void 0,e??{})}return n._$AI(r),n},b=A.createTreeWalker(A,129,null,!1),yt=(r,t)=>{const e=r.length-1,s=[];let i,o=t===2?"<svg>":"",n=S;for(let l=0;l<e;l++){const h=r[l];let p,c,d=-1,v=0;for(;v<h.length&&(n.lastIndex=v,c=n.exec(h),c!==null);)v=n.lastIndex,n===S?c[1]==="!--"?n=J:c[1]!==void 0?n=Q:c[2]!==void 0?(ht.test(c[2])&&(i=RegExp("</"+c[2],"g")),n=g):c[3]!==void 0&&(n=g):n===g?c[0]===">"?(n=i??S,d=-1):c[1]===void 0?d=-2:(d=n.lastIndex-c[2].length,p=c[1],n=c[3]===void 0?g:c[3]==='"'?tt:X):n===tt||n===X?n=g:n===J||n===Q?n=S:(n=g,i=void 0);const T=n===g&&r[l+1].startsWith("/>")?" ":"";o+=n===S?h+vt:d>=0?(s.push(p),h.slice(0,d)+"$lit$"+h.slice(d)+m+T):h+m+(d===-2?(s.push(void 0),l):T)}const a=o+(r[e]||"<?>")+(t===2?"</svg>":"");if(!Array.isArray(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return[Y!==void 0?Y.createHTML(a):a,s]};class I{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,n=0;const a=t.length-1,l=this.parts,[h,p]=yt(t,e);if(this.el=I.createElement(h,s),b.currentNode=this.el.content,e===2){const c=this.el.content,d=c.firstChild;d.remove(),c.append(...d.childNodes)}for(;(i=b.nextNode())!==null&&l.length<a;){if(i.nodeType===1){if(i.hasAttributes()){const c=[];for(const d of i.getAttributeNames())if(d.endsWith("$lit$")||d.startsWith(m)){const v=p[n++];if(c.push(d),v!==void 0){const T=i.getAttribute(v.toLowerCase()+"$lit$").split(m),P=/([.?@])?(.*)/.exec(v);l.push({type:1,index:o,name:P[2],strings:T,ctor:P[1]==="."?bt:P[1]==="?"?At:P[1]==="@"?wt:O})}else l.push({type:6,index:o})}for(const d of c)i.removeAttribute(d)}if(ht.test(i.tagName)){const c=i.textContent.split(m),d=c.length-1;if(d>0){i.textContent=_?_.emptyScript:"";for(let v=0;v<d;v++)i.append(c[v],C()),b.nextNode(),l.push({type:2,index:++o});i.append(c[d],C())}}}else if(i.nodeType===8)if(i.data===at)l.push({type:2,index:o});else{let c=-1;for(;(c=i.data.indexOf(m,c+1))!==-1;)l.push({type:7,index:o}),c+=m.length-1}o++}}static createElement(t,e){const s=A.createElement("template");return s.innerHTML=t,s}}function k(r,t,e=r,s){var i,o,n,a;if(t===w)return t;let l=s!==void 0?(i=e._$Cl)===null||i===void 0?void 0:i[s]:e._$Cu;const h=U(t)?void 0:t._$litDirective$;return(l==null?void 0:l.constructor)!==h&&((o=l==null?void 0:l._$AO)===null||o===void 0||o.call(l,!1),h===void 0?l=void 0:(l=new h(r),l._$AT(r,e,s)),s!==void 0?((n=(a=e)._$Cl)!==null&&n!==void 0?n:a._$Cl=[])[s]=l:e._$Cu=l),l!==void 0&&(t=k(r,l._$AS(r,t.values),l,s)),t}class $t{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:s},parts:i}=this._$AD,o=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:A).importNode(s,!0);b.currentNode=o;let n=b.nextNode(),a=0,l=0,h=i[0];for(;h!==void 0;){if(a===h.index){let p;h.type===2?p=new N(n,n.nextSibling,this,t):h.type===1?p=new h.ctor(n,h.name,h.strings,this,t):h.type===6&&(p=new kt(n,this,t)),this.v.push(p),h=i[++l]}a!==(h==null?void 0:h.index)&&(n=b.nextNode(),a++)}return o}m(t){let e=0;for(const s of this.v)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class N{constructor(t,e,s,i){var o;this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cg=(o=i==null?void 0:i.isConnected)===null||o===void 0||o}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=k(this,t,e),U(t)?t===u||t==null||t===""?(this._$AH!==u&&this._$AR(),this._$AH=u):t!==this._$AH&&t!==w&&this.$(t):t._$litType$!==void 0?this.T(t):t.nodeType!==void 0?this.k(t):mt(t)?this.S(t):this.$(t)}M(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.M(t))}$(t){this._$AH!==u&&U(this._$AH)?this._$AA.nextSibling.data=t:this.k(A.createTextNode(t)),this._$AH=t}T(t){var e;const{values:s,_$litType$:i}=t,o=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=I.createElement(i.h,this.options)),i);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===o)this._$AH.m(s);else{const n=new $t(o,this),a=n.p(this.options);n.m(s),this.k(a),this._$AH=n}}_$AC(t){let e=st.get(t.strings);return e===void 0&&st.set(t.strings,e=new I(t)),e}S(t){lt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new N(this.M(C()),this.M(C()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cg=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class O{constructor(t,e,s,i,o){this.type=1,this._$AH=u,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=u}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){const o=this.strings;let n=!1;if(o===void 0)t=k(this,t,e,0),n=!U(t)||t!==this._$AH&&t!==w,n&&(this._$AH=t);else{const a=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=k(this,a[s+l],e,l),h===w&&(h=this._$AH[l]),n||(n=!U(h)||h!==this._$AH[l]),h===u?t=u:t!==u&&(t+=(h??"")+o[l+1]),this._$AH[l]=h}n&&!i&&this.C(t)}C(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class bt extends O{constructor(){super(...arguments),this.type=3}C(t){this.element[this.name]=t===u?void 0:t}}const _t=_?_.emptyScript:"";class At extends O{constructor(){super(...arguments),this.type=4}C(t){t&&t!==u?this.element.setAttribute(this.name,_t):this.element.removeAttribute(this.name)}}class wt extends O{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){var s;if((t=(s=k(this,t,e,0))!==null&&s!==void 0?s:u)===w)return;const i=this._$AH,o=t===u&&i!==u||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==u&&(i===u||o);o&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;typeof this._$AH=="function"?this._$AH.call((s=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&s!==void 0?s:this.element,t):this._$AH.handleEvent(t)}}class kt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){k(this,t)}}const it=window.litHtmlPolyfillSupport;it==null||it(I,N),((D=globalThis.litHtmlVersions)!==null&&D!==void 0?D:globalThis.litHtmlVersions=[]).push("2.2.6");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var L,K;class E extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=ft(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Dt)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Dt)===null||t===void 0||t.setConnected(!1)}render(){return w}}E.finalized=!0,E._$litElement$=!0,(L=globalThis.litElementHydrateSupport)===null||L===void 0||L.call(globalThis,{LitElement:E});const rt=globalThis.litElementPolyfillSupport;rt==null||rt({LitElement:E});((K=globalThis.litElementVersions)!==null&&K!==void 0?K:globalThis.litElementVersions=[]).push("3.2.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const xt=r=>t=>typeof t=="function"?((e,s)=>(window.customElements.define(e,s),s))(r,t):((e,s)=>{const{kind:i,elements:o}=s;return{kind:i,elements:o,finisher(n){window.customElements.define(e,n)}}})(r,t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const St=({finisher:r,descriptor:t})=>(e,s)=>{var i;if(s===void 0){const o=(i=e.originalKey)!==null&&i!==void 0?i:e.key,n=t!=null?{kind:"method",placement:"prototype",key:o,descriptor:t(e.key)}:{...e,key:o};return r!=null&&(n.finisher=function(a){r(a,o)}),n}{const o=e.constructor;t!==void 0&&Object.defineProperty(e,s,t(s)),r==null||r(o,s)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function j(r,t){return St({descriptor:e=>{const s={get(){var i,o;return(o=(i=this.renderRoot)===null||i===void 0?void 0:i.querySelector(r))!==null&&o!==void 0?o:null},enumerable:!0,configurable:!0};if(t){const i=typeof e=="symbol"?Symbol():"__"+e;s.get=function(){var o,n;return this[i]===void 0&&(this[i]=(n=(o=this.renderRoot)===null||o===void 0?void 0:o.querySelector(r))!==null&&n!==void 0?n:null),this[i]}}return s}})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var B;((B=window.HTMLSlotElement)===null||B===void 0?void 0:B.prototype.assignedElements)!=null;const Et=new Uint8Array([240,144,144,144,240,32,96,32,32,112,240,16,240,128,240,240,16,240,16,240,144,144,240,16,16,240,128,240,16,240,240,128,240,144,240,240,16,32,64,64,240,144,240,144,240,240,144,240,16,240,240,144,240,144,144,224,144,224,144,224,240,128,128,128,240,224,144,144,144,224,240,128,240,128,240,240,128,240,128,128]),Ct=4096,f=64,$=32;class Ut{constructor(){this.reset()}reset(){this.memoryBuffer=new ArrayBuffer(Ct),this.memory=new DataView(this.memoryBuffer),this.opcode=0,this.I=0,this.pc=512,this.vregisters=new Uint8Array(16),this.sp=0,this.stack=new Uint16Array(16),this.delayTimer=0,this.soundTimer=0,this.vram=new Uint8Array(f*$),this.loadFont(),this.keyboard=new Uint8Array(16)}loadFont(){new Uint8Array(this.memoryBuffer).set(new Uint8Array(Et),0)}loadRom(t){new Uint8Array(this.memoryBuffer).set(new Uint8Array(t),512)}clearVram(){this.vram=new Uint8Array(f*$)}drawSprite(t,e,s){let i=!1;for(let o=0;o<s;o++){const n=this.memory.getUint8(this.I+o);for(let a=0;a<8;a++)if(n&1<<7-a){const h=t+a>=f?t+a-f:t+a,p=e+o>=$?e+o-$:e+o,c=h+p*f;i=i||this.vram[c]===1,this.vram[c]^=1}}this.vregisters[15]=Number(i)}updateKeyboard(t){this.keyboard=t}parseOpcode(t){const e=(t&3840)>>8,s=(t&240)>>4,i=t&255,o=t&4095;return{x:e,y:s,nn:i,nnn:o}}nextInstruction(){this.pc+=2}skipNextInstruction(){this.pc+=4}returnFromSubroutine(){if(this.sp<=0)throw new Error("Stack underflow");this.sp--,this.pc=this.stack[this.sp]}callSubroutine(t){if(this.sp>15)throw new Error("Stack overflow");this.stack[this.sp]=this.pc+2,this.sp++,this.pc=t}tick(){this.delayTimer>0&&this.delayTimer--,this.soundTimer>0&&this.soundTimer--}throwUnknownOpcode(t){throw new Error(`Unknown opcode: ${t.toString(16)}`)}performCycle(){const t=this.memory.getUint16(this.pc),{x:e,y:s,nn:i,nnn:o}=this.parseOpcode(t);switch(t&61440){case 0:o===224?(this.clearVram(),this.nextInstruction()):o===238?this.returnFromSubroutine():this.throwUnknownOpcode(t);break;case 4096:this.pc=o;break;case 8192:this.callSubroutine(o);break;case 12288:this.vregisters[e]===i?this.skipNextInstruction():this.nextInstruction();break;case 16384:this.vregisters[e]!==i?this.skipNextInstruction():this.nextInstruction();break;case 20480:this.vregisters[e]===this.vregisters[s]?this.skipNextInstruction():this.nextInstruction();break;case 24576:this.vregisters[e]=i,this.nextInstruction();break;case 28672:this.vregisters[e]+=i,this.nextInstruction();break;case 32768:switch(t&15){case 0:this.vregisters[e]=this.vregisters[s],this.nextInstruction();break;case 1:this.vregisters[e]|=this.vregisters[s],this.nextInstruction();break;case 2:this.vregisters[e]&=this.vregisters[s],this.nextInstruction();break;case 3:this.vregisters[e]^=this.vregisters[s],this.nextInstruction();break;case 4:const a=this.vregisters[e]+this.vregisters[s];this.vregisters[e]=a,this.vregisters[15]=a>255?1:0,this.nextInstruction();break;case 5:const l=this.vregisters[e]-this.vregisters[s];this.vregisters[e]=l,this.vregisters[15]=l<0?0:1,this.nextInstruction();break;case 6:this.vregisters[15]=this.vregisters[e]&1,this.vregisters[e]>>=1,this.nextInstruction();break;case 7:const h=this.vregisters[s]-this.vregisters[e];this.vregisters[e]=h,this.vregisters[15]=h<0?0:1,this.nextInstruction();break;case 14:this.vregisters[15]=this.vregisters[e]>>7,this.vregisters[e]<<=1,this.nextInstruction();break;default:this.throwUnknownOpcode(t)}break;case 36864:this.vregisters[e]!==this.vregisters[s]?this.skipNextInstruction():this.nextInstruction();break;case 40960:this.I=t&4095,this.nextInstruction();break;case 45056:this.pc=o+this.vregisters[0];break;case 49152:this.vregisters[e]=Math.floor(Math.random()*255)&i,this.nextInstruction();break;case 53248:const n=t&15;this.drawSprite(this.vregisters[e],this.vregisters[s],n),this.nextInstruction();break;case 57344:if(i===158){const a=this.vregisters[e];this.keyboard[a]?this.skipNextInstruction():this.nextInstruction()}else if(i===161){const a=this.vregisters[e];this.keyboard[a]?this.nextInstruction():this.skipNextInstruction()}else this.throwUnknownOpcode(t);break;case 61440:switch(i){case 7:this.vregisters[e]=this.delayTimer,this.nextInstruction();break;case 21:this.delayTimer=this.vregisters[e],this.nextInstruction();break;case 24:this.soundTimer=this.vregisters[e],this.nextInstruction();break;case 30:this.I+=this.vregisters[e],this.nextInstruction();break;case 41:if(this.vregisters[e]>15)throw new Error(`Invalid font sprite: ${this.vregisters[e]}`);this.I=this.vregisters[e]*5,this.nextInstruction();break;case 51:this.memory.setUint8(this.I,Math.floor(this.vregisters[e]/100)),this.memory.setUint8(this.I+1,this.vregisters[e]/10%10),this.memory.setUint8(this.I+2,this.vregisters[e]%10),this.nextInstruction();break;case 85:for(let a=0;a<=e;a++)this.memory.setUint8(this.I+a,this.vregisters[a]);this.nextInstruction();break;case 101:for(let a=0;a<=e;a++)this.vregisters[a]=this.memory.getUint8(this.I+a);this.nextInstruction();break;default:this.throwUnknownOpcode(t)}break;default:this.throwUnknownOpcode(t)}}get shouldBeep(){return this.soundTimer>0}getData(){return{vregisters:[...this.vregisters],I:this.I,pc:this.pc,vram:[...this.vram]}}}const It=["Digit1","Digit2","Digit3","Digit4","KeyQ","KeyW","KeyE","KeyR","KeyA","KeyS","KeyD","KeyF","KeyZ","KeyX","KeyC","KeyV"];class Nt{constructor(){this.context=new AudioContext,this.gainNode=this.context.createGain(),this.gainNode.gain.value=1,this.gainNode.connect(this.context.destination)}start(){this.oscillatorNode||(this.oscillatorNode=this.context.createOscillator(),this.oscillatorNode.frequency.value=350,this.oscillatorNode.connect(this.gainNode),this.oscillatorNode.start())}stop(){var t;(t=this.oscillatorNode)==null||t.stop(),this.oscillatorNode=void 0}mute(t){this.gainNode.gain.value=+!t}}class Tt{constructor(t,e){this.step=s=>{this.startTs||(this.startTs=s),s<this.startTs+this.slot?this.rid=requestAnimationFrame(this.step):(this.startTs+=this.slot,this.tick(),this.step(s))},this.tick=t,this.frequency=e}get slot(){return 1e3/this.frequency}start(){this.rid=requestAnimationFrame(this.step)}stop(){this.startTs=void 0,cancelAnimationFrame(this.rid??-1)}}class Pt{constructor(t){this.frequency=60,this.speed=5,this.tick=()=>{for(let e=0;e<this.speed;e++)this.chip.performCycle();this.chip.shouldBeep?this.speaker.start():this.speaker.stop(),this.chip.tick(),this.host.requestUpdate()},this.handleKeyDown=({code:e})=>{const s=this.mapCodeToKeyboard(e);s!==-1&&(this.keyboard[s]=1,this.chip.updateKeyboard(this.keyboard))},this.handleKeyUp=({code:e})=>{const s=this.mapCodeToKeyboard(e);s!==-1&&(this.keyboard[s]=0,this.chip.updateKeyboard(this.keyboard))},(this.host=t).addController(this),this.chip=new Ut,this.romName="",this.loaded=!1,this.paused=!0,this.muted=!1,this.keyboard=new Uint8Array(16),this.speaker=new Nt,this.ticker=new Tt(this.tick,this.frequency)}hostConnected(){document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}hostDisconnected(){this.ticker.stop()}loadRom(t,e){this.romName=t,this.loaded=!0,this.chip.loadRom(e),this.host.requestUpdate()}play(){this.ticker.start(),this.paused=!1,this.host.requestUpdate()}pause(){this.ticker.stop(),this.paused=!0,this.host.requestUpdate()}reset(){this.speaker.stop(),this.ticker.stop(),this.romName="",this.loaded=!1,this.paused=!0,this.chip.reset(),this.host.requestUpdate()}muteUnmute(){this.muted=!this.muted,this.speaker.mute(this.muted),this.host.requestUpdate()}getChipData(){return this.chip.getData()}mapCodeToKeyboard(t){return It.indexOf(t)}}var Ot=Object.defineProperty,Mt=Object.getOwnPropertyDescriptor,M=(r,t,e,s)=>{for(var i=s>1?void 0:s?Mt(t,e):t,o=r.length-1,n;o>=0;o--)(n=r[o])&&(i=(s?n(t,e,i):n(i))||i);return s&&i&&Ot(t,e,i),i};let x=class extends E{constructor(){super(...arguments),this.ctrl=new Pt(this)}async loadAndPlay(r,t){const{ctrl:e}=this;try{const s=await t.arrayBuffer();e.reset(),e.loadRom(r,s),e.play()}catch(s){console.error(s)}}async handleSelectRom(){const r=this.romSelector.value;this.romSelector.value="";try{const t=await fetch(`roms/${r}`);this.loadAndPlay(r,t)}catch(t){console.error(t)}}handleUploadClick(){var r;(r=this.fileInput)==null||r.click()}handleUploadRom(r){const t=r.target;if(!t.files||t.files.length===0)return;const e=t.files[0];this.loadAndPlay(e.name,e)}handlePlayPauseClick(){const{ctrl:r}=this;r.paused?r.play():r.pause()}handleResetClick(){this.ctrl.reset()}handleMuteUnmute(){this.ctrl.muteUnmute()}willUpdate(){this.renderDisplay()}renderDisplay(){var s;const r=(s=this.canvas)==null?void 0:s.getContext("2d");if(!r)return;const{vram:t}=this.ctrl.getChipData(),e=r.createImageData(f,$);for(let i=0;i<e.data.length;i++)e.data[i*4]=t[i]===0?0:255,e.data[i*4+1]=t[i]===0?0:255,e.data[i*4+2]=t[i]===0?0:255,e.data[i*4+3]=255;r.putImageData(e,0,0)}render(){const{ctrl:r}=this,{vregisters:t,I:e,pc:s}=r.getChipData();return et`
      <h1 class="app-header">CHIP-8 TypeScript</h1>
      <section class="controls">
        <h2 class="subheader">Controls</h2>
        <span class="rom-name"
          >${r.romName===""?"No rom":r.romName}</span
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
          ?disabled="${!r.loaded}"
        >
          ${this.ctrl.paused?"Play":"Pause"}
        </button>
        <button
          class="button"
          @click="${this.handleResetClick}"
          ?disabled="${!r.loaded}"
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
          <li>I: ${e.toString(16)}</li>
          <li>PC: ${s.toString(16)}</li>
          ${t.map((i,o)=>et`<li>V${o}: ${i.toString(16)}</li>`)}
        </ul>
      </section>
      <canvas
        class="display"
        width="${f}"
        height="${$}"
      ></canvas>
    `}};x.styles=[dt`
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
    `];M([j(".file-input")],x.prototype,"fileInput",2);M([j(".rom-selector")],x.prototype,"romSelector",2);M([j(".display")],x.prototype,"canvas",2);x=M([xt("ch-app")],x);
