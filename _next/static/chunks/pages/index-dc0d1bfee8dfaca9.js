(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5728:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return r(8955)}])},3740:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return x}});let n=r(8754),a=r(1757),i=a._(r(7294)),s=n._(r(2636)),l=r(7757),o=r(3735),c=r(3341);r(4210);let d=n._(r(7746)),u={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0};function m(e){return void 0!==e.default}function f(e){return void 0===e?e:"number"==typeof e?Number.isFinite(e)?e:NaN:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN}function p(e,t,r,n,a,i,s){if(!e||e["data-loaded-src"]===t)return;e["data-loaded-src"]=t;let l="decode"in e?e.decode():Promise.resolve();l.catch(()=>{}).then(()=>{if(e.parentElement&&e.isConnected){if("blur"===r&&i(!0),null==n?void 0:n.current){let t=new Event("load");Object.defineProperty(t,"target",{writable:!1,value:e});let r=!1,a=!1;n.current({...t,nativeEvent:t,currentTarget:e,target:e,isDefaultPrevented:()=>r,isPropagationStopped:()=>a,persist:()=>{},preventDefault:()=>{r=!0,t.preventDefault()},stopPropagation:()=>{a=!0,t.stopPropagation()}})}(null==a?void 0:a.current)&&a.current(e)}})}function h(e){let[t,r]=i.version.split("."),n=parseInt(t,10),a=parseInt(r,10);return n>18||18===n&&a>=3?{fetchPriority:e}:{fetchpriority:e}}let g=(0,i.forwardRef)((e,t)=>{let{imgAttributes:r,heightInt:n,widthInt:a,qualityInt:s,className:l,imgStyle:o,blurStyle:c,isLazy:d,fetchPriority:u,fill:m,placeholder:f,loading:g,srcString:_,config:x,unoptimized:v,loader:j,onLoadRef:w,onLoadingCompleteRef:b,setBlurComplete:N,setShowAltText:y,onLoad:E,onError:S,...k}=e;return g=d?"lazy":g,i.default.createElement(i.default.Fragment,null,i.default.createElement("img",{...k,...h(u),loading:g,width:a,height:n,decoding:"async","data-nimg":m?"fill":"1",className:l,style:{...o,...c},...r,ref:(0,i.useCallback)(e=>{t&&("function"==typeof t?t(e):"object"==typeof t&&(t.current=e)),e&&(S&&(e.src=e.src),e.complete&&p(e,_,f,w,b,N,v))},[_,f,w,b,N,S,v,t]),onLoad:e=>{let t=e.currentTarget;p(t,_,f,w,b,N,v)},onError:e=>{y(!0),"blur"===f&&N(!0),S&&S(e)}}))}),_=(0,i.forwardRef)((e,t)=>{var r;let n,a,{src:p,sizes:_,unoptimized:x=!1,priority:v=!1,loading:j,className:w,quality:b,width:N,height:y,fill:E,style:S,onLoad:k,onLoadingComplete:C,placeholder:z="empty",blurDataURL:O,fetchPriority:P,layout:I,objectFit:R,objectPosition:M,lazyBoundary:A,lazyRoot:F,...H}=e,L=(0,i.useContext)(c.ImageConfigContext),D=(0,i.useMemo)(()=>{let e=u||L||o.imageConfigDefault,t=[...e.deviceSizes,...e.imageSizes].sort((e,t)=>e-t),r=e.deviceSizes.sort((e,t)=>e-t);return{...e,allSizes:t,deviceSizes:r}},[L]),G=H.loader||d.default;delete H.loader;let W="__next_img_default"in G;if(W){if("custom"===D.loader)throw Error('Image with src "'+p+'" is missing "loader" prop.\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader')}else{let e=G;G=t=>{let{config:r,...n}=t;return e(n)}}if(I){"fill"===I&&(E=!0);let e={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[I];e&&(S={...S,...e});let t={responsive:"100vw",fill:"100vw"}[I];t&&!_&&(_=t)}let T="",V=f(N),B=f(y);if("object"==typeof(r=p)&&(m(r)||void 0!==r.src)){let e=m(p)?p.default:p;if(!e.src)throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received "+JSON.stringify(e));if(!e.height||!e.width)throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received "+JSON.stringify(e));if(n=e.blurWidth,a=e.blurHeight,O=O||e.blurDataURL,T=e.src,!E){if(V||B){if(V&&!B){let t=V/e.width;B=Math.round(e.height*t)}else if(!V&&B){let t=B/e.height;V=Math.round(e.width*t)}}else V=e.width,B=e.height}}let q=!v&&("lazy"===j||void 0===j);(!(p="string"==typeof p?p:T)||p.startsWith("data:")||p.startsWith("blob:"))&&(x=!0,q=!1),D.unoptimized&&(x=!0),W&&p.endsWith(".svg")&&!D.dangerouslyAllowSVG&&(x=!0),v&&(P="high");let[U,J]=(0,i.useState)(!1),[Q,X]=(0,i.useState)(!1),Y=f(b),$=Object.assign(E?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:R,objectPosition:M}:{},Q?{}:{color:"transparent"},S),K="blur"===z&&O&&!U?{backgroundSize:$.objectFit||"cover",backgroundPosition:$.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:'url("data:image/svg+xml;charset=utf-8,'+(0,l.getImageBlurSvg)({widthInt:V,heightInt:B,blurWidth:n,blurHeight:a,blurDataURL:O,objectFit:$.objectFit})+'")'}:{},Z=function(e){let{config:t,src:r,unoptimized:n,width:a,quality:i,sizes:s,loader:l}=e;if(n)return{src:r,srcSet:void 0,sizes:void 0};let{widths:o,kind:c}=function(e,t,r){let{deviceSizes:n,allSizes:a}=e;if(r){let e=/(^|\s)(1?\d?\d)vw/g,t=[];for(let n;n=e.exec(r);n)t.push(parseInt(n[2]));if(t.length){let e=.01*Math.min(...t);return{widths:a.filter(t=>t>=n[0]*e),kind:"w"}}return{widths:a,kind:"w"}}if("number"!=typeof t)return{widths:n,kind:"w"};let i=[...new Set([t,2*t].map(e=>a.find(t=>t>=e)||a[a.length-1]))];return{widths:i,kind:"x"}}(t,a,s),d=o.length-1;return{sizes:s||"w"!==c?s:"100vw",srcSet:o.map((e,n)=>l({config:t,src:r,quality:i,width:e})+" "+("w"===c?e:n+1)+c).join(", "),src:l({config:t,src:r,quality:i,width:o[d]})}}({config:D,src:p,unoptimized:x,width:V,quality:Y,sizes:_,loader:G}),ee=p,et=(0,i.useRef)(k);(0,i.useEffect)(()=>{et.current=k},[k]);let er=(0,i.useRef)(C);(0,i.useEffect)(()=>{er.current=C},[C]);let en={isLazy:q,imgAttributes:Z,heightInt:B,widthInt:V,qualityInt:Y,className:w,imgStyle:$,blurStyle:K,loading:j,config:D,fetchPriority:P,fill:E,unoptimized:x,placeholder:z,loader:G,srcString:ee,onLoadRef:et,onLoadingCompleteRef:er,setBlurComplete:J,setShowAltText:X,...H};return i.default.createElement(i.default.Fragment,null,i.default.createElement(g,{...en,ref:t}),v?i.default.createElement(s.default,null,i.default.createElement("link",{key:"__nimg-"+Z.src+Z.srcSet+Z.sizes,rel:"preload",as:"image",href:Z.srcSet?void 0:Z.src,imageSrcSet:Z.srcSet,imageSizes:Z.sizes,crossOrigin:H.crossOrigin,...h(P)})):null)}),x=_;("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},7757:function(e,t){"use strict";function r(e){let{widthInt:t,heightInt:r,blurWidth:n,blurHeight:a,blurDataURL:i,objectFit:s}=e,l=n||t,o=a||r,c=i.startsWith("data:image/jpeg")?"%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='1 1'/%3E%3C/feComponentTransfer%3E%":"";return l&&o?"%3Csvg xmlns='http%3A//www.w3.org/2000/svg' viewBox='0 0 "+l+" "+o+"'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='"+(n&&a?"1":"20")+"'/%3E"+c+"%3C/filter%3E%3Cimage preserveAspectRatio='none' filter='url(%23b)' x='0' y='0' height='100%25' width='100%25' href='"+i+"'/%3E%3C/svg%3E":"%3Csvg xmlns='http%3A//www.w3.org/2000/svg'%3E%3Cimage style='filter:blur(20px)' preserveAspectRatio='"+("contain"===s?"xMidYMid":"cover"===s?"xMidYMid slice":"none")+"' x='0' y='0' height='100%25' width='100%25' href='"+i+"'/%3E%3C/svg%3E"}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getImageBlurSvg",{enumerable:!0,get:function(){return r}})},7746:function(e,t){"use strict";function r(e){let{config:t,src:r,width:n,quality:a}=e;return t.path+"?url="+encodeURIComponent(r)+"&w="+n+"&q="+(a||75)}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return n}}),r.__next_img_default=!0;let n=r},8955:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return m}});var n=r(5893),a=r(8457),i=r.n(a),s=r(9008),l=r.n(s),o=r(5675),c=r.n(o),d=r(9854),u=r.n(d);function m(){return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(l(),{children:[(0,n.jsx)("title",{children:"Create Next App"}),(0,n.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,n.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,n.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,n.jsxs)("main",{className:u().main,children:[(0,n.jsxs)("div",{className:u().description,children:[(0,n.jsxs)("p",{children:["Get started by editing\xa0",(0,n.jsx)("code",{className:u().code,children:"src/pages/index.js"})]}),(0,n.jsx)("div",{children:(0,n.jsxs)("a",{href:"https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app",target:"_blank",rel:"noopener noreferrer",children:["By"," ",(0,n.jsx)(c(),{src:"/vercel.svg",alt:"Vercel Logo",className:u().vercelLogo,width:100,height:24,priority:!0})]})})]}),(0,n.jsx)("div",{className:u().center,children:(0,n.jsx)(c(),{className:u().logo,src:"/next.svg",alt:"Next.js Logo",width:180,height:37,priority:!0})}),(0,n.jsxs)("div",{className:u().grid,children:[(0,n.jsxs)("a",{href:"https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app",className:u().card,target:"_blank",rel:"noopener noreferrer",children:[(0,n.jsxs)("h2",{className:i().className,children:["Docs ",(0,n.jsx)("span",{children:"->"})]}),(0,n.jsx)("p",{className:i().className,children:"Find in-depth information about Next.js features and\xa0API."})]}),(0,n.jsxs)("a",{href:"https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app",className:u().card,target:"_blank",rel:"noopener noreferrer",children:[(0,n.jsxs)("h2",{className:i().className,children:["Learn ",(0,n.jsx)("span",{children:"->"})]}),(0,n.jsx)("p",{className:i().className,children:"Learn about Next.js in an interactive course with\xa0quizzes!"})]}),(0,n.jsxs)("a",{href:"https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app",className:u().card,target:"_blank",rel:"noopener noreferrer",children:[(0,n.jsxs)("h2",{className:i().className,children:["Templates ",(0,n.jsx)("span",{children:"->"})]}),(0,n.jsx)("p",{className:i().className,children:"Discover and deploy boilerplate example Next.js\xa0projects."})]}),(0,n.jsxs)("a",{href:"https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app",className:u().card,target:"_blank",rel:"noopener noreferrer",children:[(0,n.jsxs)("h2",{className:i().className,children:["Deploy ",(0,n.jsx)("span",{children:"->"})]}),(0,n.jsx)("p",{className:i().className,children:"Instantly deploy your Next.js site to a shareable URL with\xa0Vercel."})]})]})]})]})}},8457:function(e){e.exports={style:{fontFamily:"'__Inter_ccafe3', '__Inter_Fallback_ccafe3'",fontStyle:"normal"},className:"__className_ccafe3"}},9854:function(e){e.exports={main:"Home_main__EtNt2",description:"Home_description__Qwq1f",code:"Home_code__aGV0U",grid:"Home_grid__c_g6N",card:"Home_card__7oz7W",center:"Home_center__V0nxp",logo:"Home_logo__80mSr",content:"Home_content___fOQz",vercelLogo:"Home_vercelLogo__lhIxO",rotate:"Home_rotate__99GkW"}},9008:function(e,t,r){e.exports=r(2636)},5675:function(e,t,r){e.exports=r(3740)}},function(e){e.O(0,[774,888,179],function(){return e(e.s=5728)}),_N_E=e.O()}]);