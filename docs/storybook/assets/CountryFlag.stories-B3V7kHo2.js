import{j as r}from"./index-DrhACB-D.js";import{n}from"./Upload-ChF5xKSK.js";import{useMDXComponents as l}from"./index-DmqVK_gK.js";import{S as u}from"./docs-CJ9d-umt.js";import"./index-DQDNmYQF.js";import"./index-BGiqdwja.js";import"./theming-C7i7v1dL.js";import"./tiny-invariant-CopsF_GD.js";const o=e=>r.jsxs("div",{children:[r.jsx(n,{countryCode:"fr",...e}),r.jsx(n,{countryCode:"de",...e})]});try{o.displayName="CountryFlagExample",o.__docgenInfo={description:"",displayName:"CountryFlagExample",props:{}}}catch{}const d={countryFlag:[{language:"jsx",snippet:'<CountryFlag countryCode="it" />',expandedSnippet:`
            import React from 'react';
            import { CountryFlag } from './CountryFlag';

            export const CountryFlagExample = (props) => {
                return <CountryFlag countryCode="it" />;
            };
            `},{language:"tsx",snippet:'<CountryFlag countryCode="it" />',expandedSnippet:`
            import React, { FC } from 'react';
            import { CountryFlag } from './CountryFlag';
            
            export const CountryFlagExample: FC = (props: any) => {
                return <CountryFlag countryCode="it" />;
            };
            `}]};function s(e){return r.jsxs("div",{className:"content",children:[r.jsxs("h1",{children:["CountryFlag v",void 0]}),r.jsx("p",{children:"A component for displaying country flags based on the country code. The country code should be passed as a prop to dynamically render the corresponding flag image. The flag will use the country code to fetch the appropriate flag image."}),r.jsx("hr",{}),r.jsx("h3",{children:"Basic usage"}),r.jsx(u,{snippets:d.countryFlag,children:r.jsx(o,{})})]})}function m(e={}){const{wrapper:a}={...l(),...e.components};return a?r.jsx(a,{...e,children:r.jsx(s,{...e})}):s()}const _={title:"UnifiedUI/CountryFlag",component:n,parameters:{docs:{page:m}}},t={render:e=>r.jsx(o,{...e})};var p,c,i;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: (args: any) => <CountryFlagExample {...args} />
}`,...(i=(c=t.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};const E=["BaseCountryFlag"];export{t as BaseCountryFlag,E as __namedExportsOrder,_ as default};
