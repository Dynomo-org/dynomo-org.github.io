import{ar as ae,r as t,ap as se,aq as e}from"./index-623c20ee.js";import{k as z,h as o,n as V,R as y,i as T,S as l,F as k,B as c,L as C,f as te}from"./network-e5401e50.js";import{C as v,D as ne}from"./Dragger-a4b38ddb.js";import{S as ie,I as U}from"./index-fa0044c3.js";import{T as h}from"./index-a26a3b06.js";const le={getBase64:p=>new Promise((i,d)=>{const u=new FileReader;u.readAsDataURL(p),u.onload=()=>i(u.result),u.onerror=x=>d(x)})},oe={forms:{masterApp:[{label:"App Name",name:"name",required:!0,placeholder:"Example"},{label:"Package Name",name:"package_name",required:!0,placeholder:"com.example.example"},{label:"Version Code",name:"version_code",required:!0,placeholder:"1"},{label:"Version Name",name:"version_name",required:!0,placeholder:"1.1"},{label:"Privacy Policy Link",name:"privacy_policy_link"}],style:[{label:"Color Primary",name:"color_primary",required:!0},{label:"Color Primary Variant",name:"color_primary_variant",required:!0},{label:"Color On Primary",name:"color_on_primary",required:!0},{label:"Color Secondary",name:"color_secondary",required:!0},{label:"Color Secondary Variant",name:"color_secondary_variant",required:!0},{label:"Color On Secondary",name:"color_on_secondary",required:!0}],string:[{label:"Set As Wallpaper",name:"set_as_wallpaper",required:!0},{label:"Home Screen",name:"set_wallpaper_home",required:!0},{label:"Lock Screen",name:"set_wallpaper_lock",required:!0},{label:"Home + Lock Screen",name:"wallpaper_both",required:!0},{label:"Cancel",name:"cancel",required:!0},{label:"Set Wallpaper Success",name:"success_set_wallpaper",required:!0},{label:"Exit Message",name:"exit_message",required:!0},{label:"No Connection Message",name:"no_connection_message",required:!0},{label:"Privacy Policy Text",name:"privacy_policy_text"}]}},F="CONFIG",w="STRINGS",A="STYLE",ce=1024*1024*.5,O=p=>p.map((i,d)=>e.jsx(k.Item,{label:i.label,name:i.name,rules:[{required:i.required,message:`${i.label} is Required`}],children:e.jsx(te,{placeholder:i.placeholder,type:i.type||"text"})},d)),{forms:P}=oe,fe=()=>{const{id:p}=ae(),[i,d]=t.useState(!1),[u,x]=t.useState(!1),[I,D]=t.useState(!1),[$,B]=t.useState(!1),[H,J]=t.useState(!1),[r,W]=t.useState(null),[Y,G]=t.useState(!1),[K,Q]=t.useState(!1),[X,Z]=t.useState(!1),[n,R]=t.useState(),[m]=z(),[g]=z(),[f]=z(),M=se(),N=t.useMemo(()=>r?{name:r.name,package_name:r.package_name,version_code:r.version_code,version_name:r.version_name}:{},[r]),j=t.useMemo(()=>r?{[F]:{setter:G,form:m,base:N,setLoading:D,constructObj:()=>({id:r.id,...m.getFieldsValue()})},[A]:{setter:Q,form:g,base:r.app_config.style,setLoading:B,constructObj:()=>({id:r.id,app_config:{style:{...g.getFieldsValue()}}})},[w]:{setter:Z,form:f,base:r.app_config.strings,setLoading:J,constructObj:()=>({id:r.id,app_config:{strings:{...f.getFieldsValue()}}})}}:null,[r,N,m,g,f]),ee=t.useMemo(()=>({name:"file",showUploadList:!1,fileList:n!=null&&n.file?[n.file]:[],beforeUpload:async s=>{if(!["image/png","image/jpg","image/jpeg"].includes(s.type))return o.error({title:"Error",description:"App icon should be a png, jpg, or jpeg"}),!1;if(s.size>=ce)return o.error({title:"Error",description:"App icon size should be less than 500 KB"}),!1;const a=await le.getBase64(s);return R({base64:a,file:s}),!1}}),[n]),S=t.useCallback(s=>{const a=j[s];a&&a.setter(JSON.stringify(a.base)!=JSON.stringify(a.form.getFieldsValue()))},[j]),q=s=>{const a=j[s];a&&(a.form.setFieldsValue(a.base),S(s))},L=async s=>{const a=j[s];if(!a)return;try{await a.form.validateFields()}catch{return}a.setLoading(!0);const{err:b}=await V.put("app",JSON.stringify(a.constructObj()));if(b){o.error({title:"Error",description:`Error updating app ${a.text}. Message: ${b.message}`}),a.setLoading(!1);return}await _(),a.setter(!1),a.setLoading(!1),o.success({title:"Success",description:`App ${s.toLowerCase()} updated successfully`})},re=async()=>{x(!0);const s=new FormData;s.append("icon",n.file),s.append("app_id",r.id);const{err:a}=await V.put("app/icon",s);if(a){o.error({title:"Error",description:`Error while updating the app icon, please contact the administrator. Message: ${a.message}`}),x(!1);return}R(null),_(),x(!1),o.success({title:"Success",description:"App icon updated successfully"})},_=t.useCallback(async(s=!1)=>{s&&d(!0);const a=`app?id=${p}`,{response:b,err:E}=await V.get(a);if(E){o.error({title:"Error",description:`Error while getting the app data, please contact the administrator. Message: ${E.message}`}),M(-1);return}W(b.data),s&&d(!1)},[p,M]);return t.useEffect(()=>{_(!0)},[_]),t.useEffect(()=>{r&&(m.setFieldsValue({name:r.name,package_name:r.package_name,version_code:r.version_code,version_name:r.version_name}),g.setFieldsValue({...r.app_config.style}),f.setFieldsValue({...r.app_config.strings}))},[r,m,g,f]),i||!r?e.jsx(y,{justify:"center",align:"middle",style:{height:"100%"},children:e.jsx(ie,{})}):e.jsxs(y,{justify:"start",gutter:16,align:"top",children:[e.jsx(T,{span:18,children:e.jsxs(l,{size:"large",direction:"vertical",style:{display:"flex"},children:[e.jsx(v,{children:e.jsxs(l,{direction:"vertical",size:"small",style:{display:"flex"},children:[e.jsx(h.Title,{level:4,children:"App Info"}),e.jsx(k,{form:m,labelAlign:"left",labelCol:{span:4},wrapperCol:{span:20},onChange:()=>S(F),children:O(P.masterApp)}),Y&&e.jsx(y,{justify:"end",children:e.jsxs(l,{size:"middle",children:[e.jsx(c,{onClick:()=>q(F),children:"Reset"}),e.jsx(c,{type:"primary",onClick:()=>L(F),icon:I&&e.jsx(C,{}),children:"Save"})]})})]})}),e.jsx(v,{children:e.jsxs(l,{direction:"vertical",size:"large",style:{display:"flex"},children:[e.jsx(h.Title,{level:4,children:"Style Setting"}),e.jsx(k,{form:g,labelAlign:"left",labelCol:{span:6},wrapperCol:{span:18},onChange:()=>S(A),children:O(P.style)}),K&&e.jsx(y,{justify:"end",children:e.jsxs(l,{size:"middle",children:[e.jsx(c,{onClick:()=>q(A),children:"Reset"}),e.jsx(c,{type:"primary",onClick:()=>L(A),icon:$&&e.jsx(C,{}),children:"Save"})]})})]})}),e.jsx(v,{children:e.jsxs(l,{direction:"vertical",size:"large",style:{display:"flex"},children:[e.jsx(h.Title,{level:4,children:"String Setting"}),e.jsx(k,{form:f,labelAlign:"left",labelCol:{span:6},wrapperCol:{span:18},onChange:()=>S(w),children:O(P.string)}),X&&e.jsx(y,{justify:"end",children:e.jsxs(l,{size:"middle",children:[e.jsx(c,{onClick:()=>q(w),children:"Reset"}),e.jsx(c,{type:"primary",onClick:()=>L(w),icon:H&&e.jsx(C,{}),children:"Save"})]})})]})})]})}),e.jsx(T,{span:6,children:e.jsx(l,{direction:"vertical",size:"large",style:{display:"flex"},children:e.jsx(v,{children:e.jsxs(l,{direction:"vertical",size:"small",style:{display:"flex"},children:[e.jsx(h.Title,{level:4,children:"Logo"}),r.icon_url&&e.jsx(U,{src:r.icon_url}),e.jsx(ne,{...ee,children:n!=null&&n.base64?e.jsx(U,{preview:!1,src:n.base64,style:{width:"100%"}}):e.jsxs(e.Fragment,{children:[e.jsx(h,{style:{fontWeight:"bold"},children:"Drag and Drop or Select Your App Icon Here"}),e.jsx(h,{children:"256x256 px is recommended"})]})}),(n==null?void 0:n.base64)&&e.jsx(y,{justify:"end",children:e.jsx(c,{type:"primary",size:"large",style:{width:"100%"},icon:u&&e.jsx(C,{}),onClick:re,children:"Update Icon"})})]})})})})]})};export{fe as default};
