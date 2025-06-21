import{j as o}from"./index-DrhACB-D.js";import{x as m}from"./Upload-ChF5xKSK.js";import{r as c}from"./REMIRA_logo-Ow_Xw563.js";import{useMDXComponents as g}from"./index-DmqVK_gK.js";import{S as d}from"./docs-CJ9d-umt.js";import"./index-DQDNmYQF.js";import"./index-BGiqdwja.js";import"./theming-C7i7v1dL.js";import"./tiny-invariant-CopsF_GD.js";const a=e=>o.jsx(m,{image:c,...e});try{a.displayName="LogoExample",a.__docgenInfo={description:"",displayName:"LogoExample",props:{}}}catch{}const x={logo:[{language:"jsx",snippet:"<Logo image={remiraLogo} />",expandedSnippet:`
            import React from 'react';
            import { Logo } from './Logo';

            export const LogoExample = (props) => {
                return <Logo image={remiraLogo} />;
            };
            `},{language:"tsx",snippet:"<Logo image={remiraLogo} />",expandedSnippet:`
            import React, { FC } from 'react';
            import { Logo } from './Logo';

            export const LoaderExample: FC = (props: any) => {
                return <Logo image={remiraLogo} />;
            };
            `}]};function s(e){return o.jsxs("div",{className:"content",children:[o.jsxs("h1",{children:["Logo v",void 0]}),o.jsx("p",{children:"A graphic symbol represents a brand, company, organization, or product."}),o.jsx("hr",{}),o.jsx("h3",{children:"Basic usage"}),o.jsx(d,{snippets:x.logo,children:o.jsx(a,{})})]})}function L(e={}){const{wrapper:t}={...g(),...e.components};return t?o.jsx(t,{...e,children:o.jsx(s,{...e})}):s()}const S={title:"UnifiedUI/Logo",component:m,parameters:{docs:{page:L}}},r={render:e=>o.jsx(a,{...e})};var n,p,i;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: (args: any) => <LogoExample {...args} />
}`,...(i=(p=r.parameters)==null?void 0:p.docs)==null?void 0:i.source}}};const M=["BaseLogo"];export{r as BaseLogo,M as __namedExportsOrder,S as default};
