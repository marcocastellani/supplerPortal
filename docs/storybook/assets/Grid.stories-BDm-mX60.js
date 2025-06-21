import{j as r}from"./index-DrhACB-D.js";import{q as d,b as i}from"./Upload-ChF5xKSK.js";import{useMDXComponents as h}from"./index-DmqVK_gK.js";import{S as o}from"./docs-CJ9d-umt.js";import"./index-DQDNmYQF.js";import"./index-BGiqdwja.js";import"./theming-C7i7v1dL.js";import"./tiny-invariant-CopsF_GD.js";const n=e=>r.jsxs(d,{container:!0,rowSpacing:1,columnSpacing:{xs:1,sm:2,md:3},...e,children:[r.jsx(d,{item:!0,xs:12,md:6,children:r.jsx(i,{children:"1"})}),r.jsx(d,{item:!0,xs:12,md:6,children:r.jsx(i,{children:"2"})}),r.jsx(d,{item:!0,xs:12,md:6,children:r.jsx(i,{children:"3"})}),r.jsx(d,{item:!0,xs:12,md:6,children:r.jsx(i,{children:"4"})})]}),m=e=>r.jsxs(d,{container:!0,spacing:2,...e,children:[r.jsx(d,{item:!0,sm:4,md:3,children:r.jsx(i,{children:"Sidebar"})}),r.jsx(d,{item:!0,sm:8,md:9,children:r.jsx(i,{children:"Content"})})]});try{n.displayName="GridExample",n.__docgenInfo={description:"",displayName:"GridExample",props:{}}}catch{}try{m.displayName="NestedGridExample",m.__docgenInfo={description:"",displayName:"NestedGridExample",props:{}}}catch{}const c={grid:[{language:"jsx",snippet:`
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12} md={6}>
                    <Card>1</Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>2</Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>3</Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>4</Card>
                </Grid>
            </Grid>
            `,expandedSnippet:`
            import React from 'react';
            import { Card } from '../Card';
            import { Grid } from './Grid';

            export const GridExample = (props) => {
                return (
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12} md={6}>
                            <Card>1</Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card>2</Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card>3</Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card>4</Card>
                        </Grid>
                    </Grid>
                );
            };
            `},{language:"tsx",snippet:`
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12} md={6}>
                    <Card>1</Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>2</Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>3</Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>4</Card>
                </Grid>
            </Grid>
            `,expandedSnippet:`
            import React, { FC } from 'react';
            import { Card } from '../Card';
            import { Grid } from './Grid';

            export const GridExample: FC = (props: any) => {
                return (
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12} md={6}>
                            <Card>1</Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card>2</Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card>3</Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card>4</Card>
                        </Grid>
                    </Grid>
                );
            };
            `}]};function p(e){const s={p:"p",...h(),...e.components};return r.jsxs("div",{className:"content",children:[r.jsxs("h1",{children:["Grid v",void 0]}),r.jsx("p",{children:r.jsx(s.p,{children:`A layout system that facilitates the arrangement and positioning of elements
on a webpage in a grid-like structure.`})}),r.jsx("hr",{}),r.jsx("h3",{children:"Basic usage"}),r.jsx(o,{snippets:c.grid,children:r.jsx(n,{})}),r.jsx("hr",{}),r.jsx("h3",{children:"Nested grid usage"}),r.jsx(o,{snippets:c.grid,children:r.jsx(m,{})})]})}function j(e={}){const{wrapper:s}={...h(),...e.components};return s?r.jsx(s,{...e,children:r.jsx(p,{...e})}):p(e)}const b={title:"UnifiedUI/Grid",component:d,parameters:{docs:{page:j}}},a={render:e=>r.jsx(n,{...e})},t={render:e=>r.jsx(m,{...e})};var x,G,l;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: (args: any) => <GridExample {...args} />
}`,...(l=(G=a.parameters)==null?void 0:G.docs)==null?void 0:l.source}}};var C,u,g;t.parameters={...t.parameters,docs:{...(C=t.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: (args: any) => <NestedGridExample {...args} />
}`,...(g=(u=t.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};const B=["BaseGrid","NestedGrid"];export{a as BaseGrid,t as NestedGrid,B as __namedExportsOrder,b as default};
