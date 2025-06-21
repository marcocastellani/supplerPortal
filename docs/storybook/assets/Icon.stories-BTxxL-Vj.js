import{j as e}from"./index-DrhACB-D.js";import{d as s}from"./Upload-ChF5xKSK.js";import{useMDXComponents as g}from"./index-DmqVK_gK.js";import{S as p}from"./docs-CJ9d-umt.js";import"./index-DQDNmYQF.js";import"./index-BGiqdwja.js";import"./theming-C7i7v1dL.js";import"./tiny-invariant-CopsF_GD.js";const t=o=>e.jsx(s,{name:"Home",...o}),a=o=>e.jsx(s,{name:"Home",color:"#FFD700",title:"Favorite",...o});try{t.displayName="IconExample",t.__docgenInfo={description:"",displayName:"IconExample",props:{}}}catch{}try{a.displayName="IconColorExample",a.__docgenInfo={description:"",displayName:"IconColorExample",props:{}}}catch{}const i={icon:[{language:"jsx",snippet:'<Icon name="Coffee" />',expandedSnippet:`
            import React from 'react';
            import { Icon } from './Icon';

            export const IconExample = (props) => {
                return <Icon name="Coffee" />;
            };
            `},{language:"tsx",snippet:'<Icon name="Coffee" />',expandedSnippet:`
            import React, { FC } from 'react';
            import { Icon } from './Icon';

            export const IconExample: FC = (props: any) => {
                return <Icon name="Coffee" />;
            };
            `}],iconColor:[{language:"jsx",snippet:'<Icon name="Coffee" color="green" />',expandedSnippet:`
            import React from 'react';
            import { Icon } from './Icon';

            export const IconExample = (props) => {
                return <Icon name="Coffee" color="green" />;
            };
            `},{language:"tsx",snippet:'<Icon name="Coffee" color="green" />',expandedSnippet:`
            import React, { FC } from 'react';
            import { Icon } from './Icon';

            export const IconExample: FC = (props: any) => {
                return <Icon name="Coffee" color="green" />;
            };
            `}]};function m(o){const n={p:"p",...g(),...o.components};return e.jsxs("div",{className:"content",children:[e.jsxs("h1",{children:["Icon v",void 0]}),e.jsx("p",{children:e.jsx(n.p,{children:`A small graphical representation or symbol that is used to visually
communicate an idea, action, or concept.`})}),e.jsx("hr",{}),e.jsx("h3",{children:"Basic usage"}),e.jsx(p,{snippets:i.icon,children:e.jsx(t,{})}),e.jsx("hr",{}),e.jsx("h3",{children:"Icon color"}),e.jsx("p",{children:e.jsxs(n.p,{children:["Icons can have a specific color by using the ",e.jsx("b",{children:"color"})," property."]})}),e.jsx(p,{snippets:i.iconColor,children:e.jsx(a,{})})]})}function j(o={}){const{wrapper:n}={...g(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(m,{...o})}):m(o)}const N={title:"UnifiedUI/Icon",component:s,parameters:{docs:{page:j}}},r={render:o=>e.jsx(t,{...o})},c={render:o=>e.jsx(a,{...o})};var l,d,x;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: (args: any) => <IconExample {...args} />
}`,...(x=(d=r.parameters)==null?void 0:d.docs)==null?void 0:x.source}}};var I,f,u;c.parameters={...c.parameters,docs:{...(I=c.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: (args: any) => <IconColorExample {...args} />
}`,...(u=(f=c.parameters)==null?void 0:f.docs)==null?void 0:u.source}}};const R=["BaseIcon","IconColor"];export{r as BaseIcon,c as IconColor,R as __namedExportsOrder,N as default};
