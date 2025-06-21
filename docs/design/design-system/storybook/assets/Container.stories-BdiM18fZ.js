import{j as e}from"./index-DrhACB-D.js";import{m as d}from"./Upload-ChF5xKSK.js";import{useMDXComponents as f}from"./index-DmqVK_gK.js";import{S as c}from"./docs-CJ9d-umt.js";import"./index-DQDNmYQF.js";import"./index-BGiqdwja.js";import"./theming-C7i7v1dL.js";import"./tiny-invariant-CopsF_GD.js";const i=n=>e.jsx(d,{type:"base",...n,children:e.jsx("p",{children:"This is a container"})}),s=n=>e.jsx(d,{type:"base",elevated:!0,elevation:10,...n,children:e.jsx("p",{children:"This is an elevated container"})}),p=n=>e.jsx(d,{type:"variable",component:"form",rounded:!0,...n,children:e.jsx("p",{children:"This is a rounded container"})});try{i.displayName="ContainerExample",i.__docgenInfo={description:"",displayName:"ContainerExample",props:{}}}catch{}try{s.displayName="ElevatedContainerExample",s.__docgenInfo={description:"",displayName:"ElevatedContainerExample",props:{}}}catch{}try{p.displayName="RoundedContainerExample",p.__docgenInfo={description:"",displayName:"RoundedContainerExample",props:{}}}catch{}const l={container:[{language:"jsx",snippet:`
            <Container type="base">
                <p>This is a container</p>
            </Container>
            `,expandedSnippet:`
            import React from 'react';
            import { Container } from './Container';

            export const ContainerExample = (props) => {
                return (
                    <Container type="base">
                        <p>This is a container</p>
                    </Container>
                );
            };
            `},{language:"tsx",snippet:`
            <Container type="base">
                <p>This is a container</p>
            </Container>
            `,expandedSnippet:`
            import React, { FC } from 'react';
            import { Container } from './Container';

            export const ContainerExample: FC = (props: any) => {
                return (
                    <Container type="base">
                        <p>This is a container</p>
                    </Container>
                );
            };
            `}],elevatedContainer:[{language:"jsx",snippet:`
            <Container type="base" elevated elevation={10}>
                <p>This is an elevated container</p>
            </Container>
            `,expandedSnippet:`
            import React from 'react';
            import { Container } from './Container';

            export const ContainerExample = (props) => {
                return (
                    <Container type="base" elevated elevation={10}>
                        <p>This is an elevated container</p>
                    </Container>
                );
            };
            `},{language:"tsx",snippet:`
            <Container type="base" elevated elevation={10}>
			<p>This is an elevated container</p>
		</Container>
            `,expandedSnippet:`
            import React, { FC } from 'react';
            import { Container } from './Container';

            export const ContainerExample: FC = (props: any) => {
                return (
                    <Container type="base" elevated elevation={10}>
                        <p>This is an elevated container</p>
                    </Container>
                );
            };
            `}],roundedContainer:[{language:"jsx",snippet:`
            <Container type="base" rounded>
                <p>This is a rounded container</p>
            </Container>
            `,expandedSnippet:`
            import React from 'react';
            import { Container } from './Container';

            export const ContainerExample = (props) => {
                return (
                    <Container type="base" rounded>
                        <p>This is a rounded container</p>
                    </Container>
                );
            };
            `},{language:"tsx",snippet:`
            <Container type="base" rounded>
                <p>This is a rounded container</p>
            </Container>
            `,expandedSnippet:`
            import React, { FC } from 'react';
            import { Container } from './Container';

            export const ContainerExample: FC = (props: any) => {
                return (
                    <Container type="base" rounded>
                        <p>This is a rounded container</p>
                    </Container>
                );
            };
            `}]};function m(n){const r={p:"p",...f(),...n.components};return e.jsxs("div",{className:"content",children:[e.jsxs("h1",{children:["Container v",void 0]}),e.jsx("p",{children:"An element that holds and organizes other elements or content."}),e.jsx("hr",{}),e.jsx("h3",{children:"Basic usage"}),e.jsx(c,{snippets:l.container,children:e.jsx(i,{})}),e.jsx("hr",{}),e.jsx("h3",{children:"Container with elevation"}),e.jsx("p",{children:e.jsxs(r.p,{children:["Container can have different elevation, that can be set by using the boolean"," ",`
`,e.jsx("b",{children:"elevated"})," property and specified with the ",e.jsx("b",{children:"elevation"}),` property,
which can be between `,e.jsx("i",{children:"0-24"}),"."]})}),e.jsx(c,{snippets:l.elevatedContainer,children:e.jsx(s,{})}),e.jsx("hr",{}),e.jsx("h3",{children:"Container with rounded borders"}),e.jsx("p",{children:e.jsxs(r.p,{children:["Container can have a rounded border, that can be set by using the boolean"," ",`
`,e.jsx("b",{children:"rounded"})," property."]})}),e.jsx(c,{snippets:l.roundedContainer,children:e.jsx(p,{})})]})}function _(n={}){const{wrapper:r}={...f(),...n.components};return r?e.jsx(r,{...n,children:e.jsx(m,{...n})}):m(n)}const M={title:"UnifiedUI/Container",component:d,parameters:{docs:{page:_}}},t={render:n=>e.jsx(i,{...n})},a={render:n=>e.jsx(s,{...n})},o={render:n=>e.jsx(p,{...n})};var C,x,h;t.parameters={...t.parameters,docs:{...(C=t.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: (args: any) => <ContainerExample {...args} />
}`,...(h=(x=t.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};var u,j,y;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: (args: any) => <ElevatedContainerExample {...args} />
}`,...(y=(j=a.parameters)==null?void 0:j.docs)==null?void 0:y.source}}};var g,v,b;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: (args: any) => <RoundedContainerExample {...args} />
}`,...(b=(v=o.parameters)==null?void 0:v.docs)==null?void 0:b.source}}};const B=["BaseContainer","ElevatedContainer","RoundedContainer"];export{t as BaseContainer,a as ElevatedContainer,o as RoundedContainer,B as __namedExportsOrder,M as default};
