import{j as e}from"./index-DrhACB-D.js";import{F as s}from"./Upload-ChF5xKSK.js";import{useMDXComponents as g}from"./index-DmqVK_gK.js";import{S as i}from"./docs-CJ9d-umt.js";import"./index-DQDNmYQF.js";import"./index-BGiqdwja.js";import"./theming-C7i7v1dL.js";import"./tiny-invariant-CopsF_GD.js";const a=r=>e.jsx(s,{...r}),n=r=>e.jsx(s,{currentTenant:{label:"Tenant",name:"Acme Corp",navigate:()=>alert("Navigate to tenant details")},currentApplication:"UnifiedUI",currentApplicationVersion:"1.5.3",footerLinks:[{text:"Help Center",url:"/help"},{text:"Contact Support",url:"/contact"}],linkStyle:{color:"lightblue"},...r});try{a.displayName="FooterExample",a.__docgenInfo={description:"",displayName:"FooterExample",props:{}}}catch{}try{n.displayName="DetailedFooterExample",n.__docgenInfo={description:"",displayName:"DetailedFooterExample",props:{}}}catch{}const c={footer:[{language:"jsx",snippet:"<Footer />",expandedSnippet:`
            import React from 'react';
            import { Footer } from './Footer';
            
            export const FooterExample = (props) => {
                return <Footer />;
            };
            `},{language:"tsx",snippet:"<Footer />",expandedSnippet:`
            import React, { FC } from 'react';
            import { Footer } from './Footer';

            export const FooterExample: FC = (props: any) => {
                return <Footer />;
            };
            `}]};function l(r){return e.jsxs("div",{className:"content",children:[e.jsxs("h1",{children:["Footer v",void 0]}),e.jsx("p",{children:"Element represeting the Footer of UCP related application."}),e.jsx("hr",{}),e.jsx("h3",{children:"Basic usage"}),e.jsx(i,{snippets:c.footer,children:e.jsx(a,{})}),e.jsx("hr",{}),e.jsx("h3",{children:"Detailed footer usage"}),e.jsx(i,{snippets:c.footer,children:e.jsx(n,{})})]})}function j(r={}){const{wrapper:p}={...g(),...r.components};return p?e.jsx(p,{...r,children:e.jsx(l,{...r})}):l()}const U={title:"UnifiedUI/Footer",component:s,parameters:{docs:{page:j}}},t={render:r=>e.jsx(a,{...r})},o={render:r=>e.jsx(n,{...r})};var d,m,x;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: (args: any) => <FooterExample {...args} />
}`,...(x=(m=t.parameters)==null?void 0:m.docs)==null?void 0:x.source}}};var u,F,f;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: (args: any) => <DetailedFooterExample {...args} />
}`,...(f=(F=o.parameters)==null?void 0:F.docs)==null?void 0:f.source}}};const v=["BaseFooter","DetailedFooter"];export{t as BaseFooter,o as DetailedFooter,v as __namedExportsOrder,U as default};
