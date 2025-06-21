import{j as r}from"./index-DrhACB-D.js";import{H as t}from"./Upload-ChF5xKSK.js";import{E as P,S as c}from"./docs-CJ9d-umt.js";import{useMDXComponents as j}from"./index-DmqVK_gK.js";import"./index-DQDNmYQF.js";import"./index-BGiqdwja.js";import"./theming-C7i7v1dL.js";import"./tiny-invariant-CopsF_GD.js";const o=s=>r.jsx(P,{children:r.jsx(t,{progress:100,color:"primary",type:"linear",...s})}),p=s=>r.jsx(P,{children:r.jsx(t,{progress:10,color:"primary",type:"circular",...s})});try{o.displayName="ProgressBarExample",o.__docgenInfo={description:"",displayName:"ProgressBarExample",props:{}}}catch{}try{p.displayName="CircularProgressBarExample",p.__docgenInfo={description:"",displayName:"CircularProgressBarExample",props:{}}}catch{}const i={progressBar:[{language:"jsx",snippet:"<ProgressBar progress={10} />",expandedSnippet:`
            import React from 'react';
            import { ProgressBar } from './ProgressBar';

            export const ProgressBarExample = (props) => {
                return <ProgressBar progress={10} />;
            };
            `},{language:"tsx",snippet:"<ProgressBar progress={10} />",expandedSnippet:`
            import React, { FC } from 'react';
            import { ProgressBar } from './ProgressBar';

            export const ProgressBarExample: FC = (props: any) => {
                return <ProgressBar progress={10} />;
            };
            `}],circularProgressBar:[{language:"jsx",snippet:'<ProgressBar progress={10} type="circular" />',expandedSnippet:`
            import React from 'react';
            import { ProgressBar } from './ProgressBar';

            export const CircularProgressBarExample = (props) => {
                return <ProgressBar progress={10} type="circular" />;
            };
            `},{language:"tsx",snippet:'<ProgressBar progress={10} type="circular" />',expandedSnippet:`
            import React, { FC } from 'react';
            import { ProgressBar } from './ProgressBar';

            export const CircularProgressBarExample: FC = (props: any) => {
                return <ProgressBar progress={10} type="circular" />;
            };
            `}]};function g(s){return r.jsxs("div",{className:"content",children:[r.jsxs("h1",{children:["ProgressBar v",void 0]}),r.jsx("p",{children:"Element used to indicate a progression status."}),r.jsx("hr",{}),r.jsx("h3",{children:"Basic usage"}),r.jsx(c,{snippets:i.progressBar,children:r.jsx(o,{})}),r.jsx("hr",{}),r.jsx("h3",{children:"Circular ProgressBar"}),r.jsx(c,{snippets:i.circularProgressBar,children:r.jsx(p,{})})]})}function y(s={}){const{wrapper:n}={...j(),...s.components};return n?r.jsx(n,{...s,children:r.jsx(g,{...s})}):g()}const F={title:"UnifiedUI/ProgressBar",component:t,parameters:{docs:{page:y}}},e={render:s=>r.jsx(o,{...s})},a={render:s=>r.jsx(p,{...s})};var m,l,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: (args: any) => <ProgressBarExample {...args} />
}`,...(d=(l=e.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var x,u,B;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: (args: any) => <CircularProgressBarExample {...args} />
}`,...(B=(u=a.parameters)==null?void 0:u.docs)==null?void 0:B.source}}};const M=["BaseProgressBar","CircularProgressBar"];export{e as BaseProgressBar,a as CircularProgressBar,M as __namedExportsOrder,F as default};
