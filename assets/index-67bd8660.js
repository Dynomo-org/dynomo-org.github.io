import{r as c,a as A,b as f,u as R,j as e,n as g}from"./main-bac353e0.js";import{u as b,R as p,C as v,F as s,B as l,L as U,I as m,n as y}from"./index-4b2d0440.js";import{S as t}from"./index-cbb1101d.js";import{C as I}from"./index-57296fda.js";import{T as _}from"./index-416f5d50.js";import{I as z,D as F,L,a as E}from"./Dragger-1291a658.js";import{S as C}from"./index-19a60d26.js";import"./DeleteOutlined-29057b6d.js";var P={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 00-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"}}]},name:"upload",theme:"outlined"};const T=P;var S=function(r,a){return c.createElement(A,f(f({},r),{},{ref:a,icon:T}))};S.displayName="UploadOutlined";const B=c.forwardRef(S),h=z;h.Dragger=F;h.LIST_IGNORE=L;const D=h,G={forms:{keystore:[{label:"Alias",name:"alias",required:!0,placeholder:"MyApp"},{label:"Key Password",name:"key_password",required:!0,type:"password"},{label:"Store Password",name:"store_password",required:!0,type:"password"},{label:"Full Name",name:"full_name",required:!0,placeholder:"John Doe"},{label:"Organization",name:"organization"},{label:"Country",name:"country",required:!0,placeholder:"ID"}],build:[{label:"Color Primary",name:"color_primary",required:!0},{label:"Color Primary Variant",name:"color_primary_variant",required:!0},{label:"Color On Primary",name:"color_on_primary",required:!0},{label:"Color Secondary",name:"color_secondary",required:!0},{label:"Color Secondary Variant",name:"color_secondary_variant",required:!0},{label:"Color On Secondary",name:"color_on_secondary",required:!0}]}},V=500,$=1,M=2,N=n=>n.map((r,a)=>e.jsx(s.Item,{label:r.label,name:r.name,rules:[{required:r.required,message:`${r.label} is Required`}],children:e.jsx(m,{placeholder:r.placeholder,type:r.type||"text"})},a)),{forms:H}=G,{Option:w}=C,ae=()=>{const{id:n}=R(),[r,a]=c.useState(!1),[x,q]=c.useState(""),[d]=b(),[j]=b(),k=async()=>{try{await d.validateFields()}catch{return}a(!0);const u={app_id:n,...d.getFieldsValue()},{err:o}=await g.post("keystore",JSON.stringify(u));if(o){y.error({description:"Error While Initiating Keystore"}),a(!1);return}O()},O=async()=>{const u=`keystore?app_id=${n}`,o=setInterval(async()=>{const{response:i,err:K}=await g.get(u);if(K){clearInterval(o);return}if(i.data.status==$){q(i.data.url),y.success({description:"Keystore generated successfully"}),a(!1),clearInterval(o);return}else if(i.data.status==M){y.error({description:`Error Generating Keystore, Error: ${i.data.error_message}`}),a(!1),clearInterval(o);return}},V)};return e.jsxs(p,{justify:"start",gutter:16,align:"top",children:[e.jsx(v,{xs:24,md:12,children:e.jsx(t,{size:"large",direction:"vertical",style:{display:"flex"},children:e.jsx(I,{children:e.jsxs(t,{direction:"vertical",size:"small",style:{display:"flex"},children:[e.jsx(_.Title,{level:4,children:"Keystore"}),e.jsx(s,{form:d,labelAlign:"left",labelCol:{span:8},wrapperCol:{span:16},children:N(H.keystore)}),e.jsx(p,{justify:"end",children:e.jsxs(t,{size:"middle",children:[e.jsx(l,{onClick:()=>d.resetFields(),children:"Reset"}),e.jsx(l,{type:"primary",onClick:k,icon:r&&e.jsx(U,{}),children:r?"Generating":"Generate"}),x&&e.jsx("a",{href:x,children:e.jsx(l,{type:"primary",danger:!0,icon:e.jsx(E,{}),children:"Download"})})]})})]})})})}),e.jsx(v,{xs:24,md:12,children:e.jsx(t,{direction:"vertical",size:"large",style:{display:"flex"},children:e.jsx(I,{children:e.jsxs(t,{direction:"vertical",size:"small",style:{display:"flex"},children:[e.jsx(_.Title,{level:4,children:"Build"}),e.jsxs(s,{form:j,labelAlign:"left",labelCol:{span:8},wrapperCol:{span:16},children:[e.jsx(s.Item,{label:"Keystore",name:"keystore",required:!0,children:e.jsx(D,{listType:"text",children:e.jsx(l,{icon:e.jsx(B,{}),children:"Click to upload"})})}),e.jsx(s.Item,{label:"Alias",name:"alias",required:!0,children:e.jsx(m,{})}),e.jsx(s.Item,{label:"Key Password",name:"key_password",required:!0,children:e.jsx(m,{type:"password"})}),e.jsx(s.Item,{label:"App Type",name:"app_type",required:!0,children:e.jsxs(C,{value:"aab",children:[e.jsx(w,{value:"aab",children:"AAB"}),e.jsx(w,{value:"apk",children:"APK"})]})})]}),e.jsx(p,{justify:"end",children:e.jsxs(t,{size:"middle",children:[e.jsx(l,{onClick:()=>j.resetFields(),children:"Reset"}),e.jsx(l,{type:"primary",children:"Build"})]})})]})})})})]})};export{ae as default};