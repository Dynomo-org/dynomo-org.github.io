import{r as i,A as d,S as m,j as e}from"./main-bac353e0.js";import{n as c,R as u,F as r,I as a,B as p,L as x}from"./index-4b2d0440.js";import{C as f}from"./index-57296fda.js";import{T as g}from"./index-416f5d50.js";const L=()=>{const{userStore:{user:s,loginUser:o}}=i.useContext(d),t=m(),n=async l=>{o(l)};return i.useEffect(()=>{s.error&&c.error({description:s.error.message})},[s.error]),i.useEffect(()=>{s.data&&t("/")},[s.data,t]),e.jsx(u,{justify:"center",align:"middle",style:{minHeight:"100vh"},children:e.jsxs(f,{children:[e.jsx(g.Title,{children:"Login"}),e.jsxs(r,{onFinish:n,children:[e.jsx(r.Item,{name:"email",rules:[{required:!0,message:"Email must be filled"}],children:e.jsx(a,{placeholder:"Email"})}),e.jsx(r.Item,{name:"password",rules:[{required:!0,message:"Password must be filled"}],children:e.jsx(a,{placeholder:"Password",type:"password"})}),e.jsx(r.Item,{children:e.jsx(p,{type:"primary",htmlType:"submit",icon:s.loading&&e.jsx(x,{}),children:"Login"})})]})]})})};export{L as default};