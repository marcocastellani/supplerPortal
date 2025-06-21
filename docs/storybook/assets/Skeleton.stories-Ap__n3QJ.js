import{j as e}from"./index-DrhACB-D.js";import{J as n,b as j}from"./Upload-ChF5xKSK.js";import{useMDXComponents as u}from"./index-DmqVK_gK.js";import{S as l}from"./docs-CJ9d-umt.js";import"./index-DQDNmYQF.js";import"./index-BGiqdwja.js";import"./theming-C7i7v1dL.js";import"./tiny-invariant-CopsF_GD.js";const s=t=>e.jsx(n,{...t}),a=()=>e.jsxs(j,{sx:{width:"300px",height:"200px",padding:"16px"},title:e.jsxs("span",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"8px",width:"100%"},children:[e.jsx(n,{variant:"circular",width:"30px",height:"30px"}),e.jsx(n,{variant:"text",width:"190px"})]}),children:[e.jsx(n,{variant:"text",width:"100%"}),e.jsx(n,{variant:"text",width:"100%"}),e.jsx(n,{variant:"text",width:"100%"})]});try{s.displayName="SkeletonExample",s.__docgenInfo={description:"",displayName:"SkeletonExample",props:{}}}catch{}try{a.displayName="ComplexSkeletonExample",a.__docgenInfo={description:"",displayName:"ComplexSkeletonExample",props:{}}}catch{}const i={skeleton:[{language:"jsx",snippet:"<Skeleton />",expandedSnippet:`
            import React from 'react';
            import { Skeleton } from './Skeleton';

            export const SkeletonExample = (props) => {
                return <Skeleton />;
            };
            `},{language:"tsx",snippet:"<Skeleton />",expandedSnippet:`
            import React, { FC } from 'react';
            import { Skeleton } from './Skeleton';

            export const SkeletonExample: FC = (props: any) => {
                return <Skeleton />;
            };
            `}]};function c(t){return e.jsxs("div",{className:"content",children:[e.jsxs("h1",{children:["Skeleton  v",void 0]}),e.jsx("p",{children:"Component that can be used to stub some temporary UI while it is loading."}),e.jsx("hr",{}),e.jsx("h3",{children:"Basic Usage"}),e.jsx(l,{snippets:i.skeleton,children:e.jsx(s,{})}),e.jsx("h3",{children:"Complex Skeleton Usage"}),e.jsx(l,{snippets:i.skeleton,children:e.jsx(a,{})})]})}function g(t={}){const{wrapper:p}={...u(),...t.components};return p?e.jsx(p,{...t,children:e.jsx(c,{...t})}):c()}const N={title:"UnifiedUI/Skeleton",component:n,parameters:{docs:{page:g}}},r={render:t=>e.jsx(s,{...t})},o={render:t=>e.jsx(a,{...t})};var x,m,d;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: (args: any) => <SkeletonExample {...args} />
}`,...(d=(m=r.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var S,h,k;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: (args: any) => <ComplexSkeletonExample {...args} />
}`,...(k=(h=o.parameters)==null?void 0:h.docs)==null?void 0:k.source}}};const U=["BaseSkeleton","ComplexSkeleton"];export{r as BaseSkeleton,o as ComplexSkeleton,U as __namedExportsOrder,N as default};
