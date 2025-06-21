import{j as e}from"./index-DrhACB-D.js";import{W as o}from"./Upload-ChF5xKSK.js";import{useMDXComponents as u}from"./index-DmqVK_gK.js";import{S as x}from"./docs-CJ9d-umt.js";import"./index-DQDNmYQF.js";import"./index-BGiqdwja.js";import"./theming-C7i7v1dL.js";import"./tiny-invariant-CopsF_GD.js";const a=t=>e.jsx(o,{...t,children:"This is some text"}),n=t=>e.jsx(o,{variant:"h1",...t,children:"This is some heading text"});try{a.displayName="TextExample",a.__docgenInfo={description:"",displayName:"TextExample",props:{}}}catch{}try{n.displayName="HeadingTextExample",n.__docgenInfo={description:"",displayName:"HeadingTextExample",props:{}}}catch{}const p={text:[{language:"jsx",snippet:"<Text>This is some text</Text>",expandedSnippet:`
            import React, { FC } from 'react';
            import { Text } from './Text';

            export const TextExample: FC = (props: any) => {
                return <Text>This is some text</Text>;
            };
            `},{language:"tsx",snippet:"<Text>This is some text</Text>",expandedSnippet:`
            import React, { FC } from 'react';
            import { Text } from './Text';

            export const TextExample: FC = (props: any) => {
                return <Text>This is some text</Text>;
            };
            `}],headingText:[{language:"jsx",snippet:'<Text variant="h1">This is some text</Text>',expandedSnippet:`
            import React, { FC } from 'react';
            import { Text } from './Text';

            export const TextExample: FC = (props: any) => {
                return <Text variant="h1">This is some text</Text>;
            };
            `},{language:"tsx",snippet:'<Text variant="h1">This is some text</Text>',expandedSnippet:`
            import React, { FC } from 'react';
            import { Text } from './Text';

            export const TextExample: FC = (props: any) => {
                return <Text variant="h1">This is some text</Text>;
            };
            `}]};function c(t){return e.jsxs("div",{className:"content",children:[e.jsxs("h1",{children:["Text  v",void 0]}),e.jsx("p",{children:"Component that represents some text in the interface."}),e.jsx("hr",{}),e.jsx("h3",{children:"Basic Usage"}),e.jsx(x,{snippets:p.text,children:e.jsx(a,{})}),e.jsx("hr",{}),e.jsx("h3",{children:"Variant Usage"}),e.jsxs("p",{children:["Text variant can be specified by using the ",e.jsx("b",{children:"variant"})," property that can be one of ",e.jsx("i",{children:"'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2' or 'inherit'"}),"."]}),e.jsx(x,{snippets:p.headingText,children:e.jsx(n,{})})]})}function j(t={}){const{wrapper:i}={...u(),...t.components};return i?e.jsx(i,{...t,children:e.jsx(c,{...t})}):c()}const S={title:"UnifiedUI/Text",component:o,parameters:{docs:{page:j}}},r={render:t=>e.jsx(a,{...t})},s={render:t=>e.jsx(n,{...t})};var m,d,T;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: (args: any) => <TextExample {...args} />
}`,...(T=(d=r.parameters)==null?void 0:d.docs)==null?void 0:T.source}}};var h,l,g;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: (args: any) => <HeadingTextExample {...args} />
}`,...(g=(l=s.parameters)==null?void 0:l.docs)==null?void 0:g.source}}};const H=["BaseText","HeadingText"];export{r as BaseText,s as HeadingText,H as __namedExportsOrder,S as default};
