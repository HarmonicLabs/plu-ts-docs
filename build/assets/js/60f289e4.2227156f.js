"use strict";(self.webpackChunkplu_ts_docs=self.webpackChunkplu_ts_docs||[]).push([[8430],{3905:(e,t,n)=>{n.d(t,{Zo:()=>l,kt:()=>f});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var m=r.createContext({}),d=function(e){var t=r.useContext(m),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},l=function(e){var t=d(e.components);return r.createElement(m.Provider,{value:t},e.children)},c="mdxType",s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,m=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),c=d(n),u=o,f=c["".concat(m,".").concat(u)]||c[u]||s[u]||a;return n?r.createElement(f,i(i({ref:t},l),{},{components:n})):r.createElement(f,i({ref:t},l))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=u;var p={};for(var m in t)hasOwnProperty.call(t,m)&&(p[m]=t[m]);p.originalType=e,p[c]="string"==typeof e?e:o,i[1]=p;for(var d=2;d<a;d++)i[d]=n[d];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},9738:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>m,contentTitle:()=>i,default:()=>s,frontMatter:()=>a,metadata:()=>p,toc:()=>d});var r=n(7462),o=(n(7294),n(3905));const a={sidebar_position:3},i="TermStr",p={unversionedId:"onchain/stdlib/TermStr",id:"onchain/stdlib/TermStr",title:"TermStr",description:"type definition:",source:"@site/docs/onchain/stdlib/TermStr.mdx",sourceDirName:"onchain/stdlib",slug:"/onchain/stdlib/TermStr",permalink:"/docs/onchain/stdlib/TermStr",draft:!1,editUrl:"https://github.com/HarmonicLabs/plu-ts/tree/main/packages/create-docusaurus/templates/shared/docs/onchain/stdlib/TermStr.mdx",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"TermBS",permalink:"/docs/onchain/stdlib/TermBS"},next:{title:"TermList<PElemsType>",permalink:"/docs/onchain/stdlib/TermList"}},m={},d=[{value:"<code>utf8Encoded</code>",id:"utf8encoded",level:2},{value:"<code>concat</code>",id:"concat",level:2},{value:"<code>eq</code>",id:"eq",level:2}],l={toc:d},c="wrapper";function s(e){let{components:t,...n}=e;return(0,o.kt)(c,(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"termstr"},(0,o.kt)("inlineCode",{parentName:"h1"},"TermStr")),(0,o.kt)("p",null,"type definition:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"type TermStr = Term<PString> & {\n\n    readonly utf8Encoded: TermBS\n    \n    readonly concatTerm:    TermFn<[ PString ], PString>\n    readonly concat:        ( other: Term<PString> ) => TermStr\n\n    readonly eqTerm:    TermFn<[ PString ], PBool >\n    readonly eq:        ( other: Term<PString> ) => TermBool\n}\n")),(0,o.kt)("h2",{id:"utf8encoded"},(0,o.kt)("inlineCode",{parentName:"h2"},"utf8Encoded")),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("mdxAdmonitionTitle",{parentName:"admonition"},(0,o.kt)("inlineCode",{parentName:"mdxAdmonitionTitle"},"utf8Encoded")),(0,o.kt)("p",{parentName:"admonition"},"returns ",(0,o.kt)("inlineCode",{parentName:"p"},"TermStr")),(0,o.kt)("p",{parentName:"admonition"},"equivalent expression:"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"pencodeUtf8.$( term )\n"))),(0,o.kt)("h2",{id:"concat"},(0,o.kt)("inlineCode",{parentName:"h2"},"concat")),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("mdxAdmonitionTitle",{parentName:"admonition"},(0,o.kt)("inlineCode",{parentName:"mdxAdmonitionTitle"},"concat")),(0,o.kt)("p",{parentName:"admonition"},"parameter: ",(0,o.kt)("inlineCode",{parentName:"p"},"other")," type: ",(0,o.kt)("inlineCode",{parentName:"p"},"Term<PString>")),(0,o.kt)("p",{parentName:"admonition"},"returns: ",(0,o.kt)("inlineCode",{parentName:"p"},"TermStr")),(0,o.kt)("p",{parentName:"admonition"},"equivalent expression:"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"pappendStr.$( term ).$( other )\n"))),(0,o.kt)("p",null,"returns the result of concatenating the term on which the method is defined on and the ",(0,o.kt)("inlineCode",{parentName:"p"},"other")," argument,"),(0,o.kt)("h2",{id:"eq"},(0,o.kt)("inlineCode",{parentName:"h2"},"eq")),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("mdxAdmonitionTitle",{parentName:"admonition"},(0,o.kt)("inlineCode",{parentName:"mdxAdmonitionTitle"},"eq")),(0,o.kt)("p",{parentName:"admonition"},"parameter: ",(0,o.kt)("inlineCode",{parentName:"p"},"other")," type: ",(0,o.kt)("inlineCode",{parentName:"p"},"Term<PString>")),(0,o.kt)("p",{parentName:"admonition"},"returns: ",(0,o.kt)("inlineCode",{parentName:"p"},"TermBool")),(0,o.kt)("p",{parentName:"admonition"},"equivalent expression:"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"peqStr.$( term ).$( other )\n"))),(0,o.kt)("p",null,"string equality"))}s.isMDXComponent=!0}}]);