import{j as e}from"./index-DrhACB-D.js";import{w as o}from"./Upload-ChF5xKSK.js";import{r as b}from"./REMIRA_logo-Ow_Xw563.js";import{useMDXComponents as C}from"./index-DmqVK_gK.js";import{S as s}from"./docs-CJ9d-umt.js";import"./index-DQDNmYQF.js";import"./index-BGiqdwja.js";import"./theming-C7i7v1dL.js";import"./tiny-invariant-CopsF_GD.js";const c=r=>e.jsx(o,{...r}),m=r=>e.jsx(o,{message:"Loading state...",...r}),g=r=>e.jsx(o,{size:"large",...r}),l=r=>e.jsx(o,{image:b,...r});try{c.displayName="LoaderExample",c.__docgenInfo={description:"",displayName:"LoaderExample",props:{}}}catch{}try{m.displayName="LoaderWithMessageExample",m.__docgenInfo={description:"",displayName:"LoaderWithMessageExample",props:{}}}catch{}try{g.displayName="LoaderSizeExample",g.__docgenInfo={description:"",displayName:"LoaderSizeExample",props:{}}}catch{}try{l.displayName="LoaderImageExample",l.__docgenInfo={description:"",displayName:"LoaderImageExample",props:{}}}catch{}const t={loader:[{language:"jsx",snippet:"<Loader />",expandedSnippet:`
            import React from 'react';
            import { Loader } from './Loader';

            export const LoaderExample = (props) => {
                return <Loader />;
            };
            `},{language:"tsx",snippet:"<Loader />",expandedSnippet:`
            import React, { FC } from 'react';
            import { Loader } from './Loader';

            export const LoaderExample: FC = (props: any) => {
                return <Loader />;
            };
            `}],loaderWithMessage:[{language:"jsx",snippet:'<Loader message="Loading state..." />',expandedSnippet:`
            import React from 'react';
            import { Loader } from './Loader';

            export const LoaderMessageExample = (props) => {
                return <Loader message="Loading state..." />;
            };
            `},{language:"tsx",snippet:'<Loader message="Loading state..." />',expandedSnippet:`
            import React, { FC } from 'react';
            import { Loader } from './Loader';

            export const LoaderMessageExample: FC = (props: any) => {
                return <Loader message="Loading state..." />;
            };
            `}],loaderSize:[{language:"jsx",snippet:'<Loader size="large" />',expandedSnippet:`
            import React from 'react';
            import { Loader } from './Loader';

            export const LoaderSizeExample = (props) => {
                return <Loader size="large" />;
            };
            `},{language:"tsx",snippet:'<Loader size="large" />',expandedSnippet:`
            import React, { FC } from 'react';
            import { Loader } from './Loader';

            export const LoaderSizeExample: FC = (props: any) => {
                return <Loader size="large" />;
            };
            `}],loaderImage:[{language:"jsx",snippet:"<Loader image={remiraLogo} />",expandedSnippet:`
            import React from 'react';
            import { Loader } from './Loader';

            export const LoaderExample = (props) => {
                return <Loader image={remiraLogo} />;
            };
            `},{language:"tsx",snippet:"<Loader image={remiraLogo} />",expandedSnippet:`
            import React, { FC } from 'react';
            import { Loader } from './Loader';

            export const LoaderImageExample: FC = (props: any) => {
                return <Loader image={remiraLogo} />;
            };
            `}]};function x(r){const a={p:"p",...C(),...r.components};return e.jsxs("div",{className:"content",children:[e.jsxs("h1",{children:["Loader v",void 0]}),e.jsx("p",{children:e.jsx(a.p,{children:`A visual element that indicates to the user that content is being loaded or
processed in the background.`})}),e.jsx("hr",{}),e.jsx("h3",{children:"Basic usage"}),e.jsx(s,{snippets:t.loader,children:e.jsx(c,{})}),e.jsx("hr",{}),e.jsx("h3",{children:"Loader with message"}),e.jsx("p",{children:e.jsxs(a.p,{children:["A message underneath the loader can be specified by using the ",e.jsx("b",{children:"message"})," ",`
property which takes a `,e.jsx("i",{children:"string"}),"."]})}),e.jsx(s,{snippets:t.loaderWithMessage,children:e.jsx(m,{})}),e.jsx("hr",{}),e.jsx("h3",{children:"Loader size"}),e.jsx("p",{children:e.jsxs(a.p,{children:["The size of the loader can be changed by specifying the ",e.jsx("b",{children:"size"}),` property
which takes one of `,e.jsx("i",{children:'"small", "medium" or "large"'}),"."]})}),e.jsx(s,{snippets:t.loaderSize,children:e.jsx(g,{})}),e.jsx("hr",{}),e.jsx("h3",{children:"Loader with image"}),e.jsx("p",{children:e.jsxs(a.p,{children:["Loaders can display an image by using the ",e.jsx("b",{children:"image"}),` property which takes
the `,e.jsx("i",{children:"URL as string"})," of the image."]})}),e.jsx(s,{snippets:t.loaderImage,children:e.jsx(l,{})})]})}function R(r={}){const{wrapper:a}={...C(),...r.components};return a?e.jsx(a,{...r,children:e.jsx(x,{...r})}):x(r)}const X={title:"UnifiedUI/Loader",component:o,parameters:{docs:{page:R}}},n={render:r=>e.jsx(c,{...r})},p={render:r=>e.jsx(m,{...r})},d={render:r=>e.jsx(g,{...r})},i={render:r=>e.jsx(l,{...r})};var L,h,u;n.parameters={...n.parameters,docs:{...(L=n.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: (args: any) => <LoaderExample {...args} />
}`,...(u=(h=n.parameters)==null?void 0:h.docs)==null?void 0:u.source}}};var j,_,f;p.parameters={...p.parameters,docs:{...(j=p.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: (args: any) => <LoaderWithMessageExample {...args} />
}`,...(f=(_=p.parameters)==null?void 0:_.docs)==null?void 0:f.source}}};var y,E,S;d.parameters={...d.parameters,docs:{...(y=d.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: (args: any) => <LoaderSizeExample {...args} />
}`,...(S=(E=d.parameters)==null?void 0:E.docs)==null?void 0:S.source}}};var z,I,M;i.parameters={...i.parameters,docs:{...(z=i.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: (args: any) => <LoaderImageExample {...args} />
}`,...(M=(I=i.parameters)==null?void 0:I.docs)==null?void 0:M.source}}};const A=["BaseLoader","LoaderWithMessage","LoaderSize","LoaderWithImage"];export{n as BaseLoader,d as LoaderSize,i as LoaderWithImage,p as LoaderWithMessage,A as __namedExportsOrder,X as default};
