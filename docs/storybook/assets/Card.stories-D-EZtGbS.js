import{j as r}from"./index-DrhACB-D.js";import{b as t,c as _}from"./Upload-ChF5xKSK.js";import{useMDXComponents as L}from"./index-DmqVK_gK.js";import{S as d}from"./docs-CJ9d-umt.js";import"./index-DQDNmYQF.js";import"./index-BGiqdwja.js";import"./theming-C7i7v1dL.js";import"./tiny-invariant-CopsF_GD.js";const m=e=>r.jsx(t,{...e,children:"Base card"}),j=e=>r.jsx(t,{title:"Card title",...e,children:"Card with title"}),E=e=>r.jsx(t,{title:"Card title",customHeader:"planning",...e,children:"Card with title and custom header"}),O=()=>r.jsxs("div",{children:[r.jsx(_,{label:"Action"}),r.jsx(_,{label:"Action 2"})]}),h=e=>r.jsx(t,{title:"Card with actions",actions:r.jsx(O,{}),...e,children:"Card with actions"}),x=e=>r.jsx(t,{title:"Card is clickable",actionAreaClick:()=>alert("You clicked on the Card"),...e,children:"Card is clickable"}),u=e=>r.jsx(t,{title:"Rounded card",roundness:"high",...e,children:"Rounded card"}),g=e=>r.jsx(t,{title:"Elevated card",raised:!0,...e,children:"Elevated card"});try{m.displayName="CardExample",m.__docgenInfo={description:"",displayName:"CardExample",props:{}}}catch{}try{j.displayName="CardWithTitleExample",j.__docgenInfo={description:"",displayName:"CardWithTitleExample",props:{}}}catch{}try{E.displayName="CardWithCustomHeaderExample",E.__docgenInfo={description:"",displayName:"CardWithCustomHeaderExample",props:{}}}catch{}try{h.displayName="CardWithActionsExample",h.__docgenInfo={description:"",displayName:"CardWithActionsExample",props:{}}}catch{}try{x.displayName="CardIsClickableExample",x.__docgenInfo={description:"",displayName:"CardIsClickableExample",props:{}}}catch{}try{u.displayName="CardWithRoundnessExample",u.__docgenInfo={description:"",displayName:"CardWithRoundnessExample",props:{}}}catch{}try{g.displayName="CardWithElevationExample",g.__docgenInfo={description:"",displayName:"CardWithElevationExample",props:{}}}catch{}const n={card:[{language:"jsx",snippet:"<Card>Base card</Card>",expandedSnippet:`
            import React from 'react';
            import { Card } from './Card';

            export const CardExample = (props) => {
                return <Card>Base card</Card>;
            };
            `},{language:"tsx",snippet:"<Card>Base card</Card>",expandedSnippet:`
            import React, { FC } from 'react';
            import { Card } from './Card';

            export const CardExample: FC = (props: any) => {
                return <Card>Base card</Card>;
            };
            `}],cardWithActions:[{language:"jsx",snippet:'<Card title="Card with actions" actions={<CardActions />}>Card with actions</Card>',expandedSnippet:`
            import React from 'react';
            import { Card } from './Card';

            const CardActions = () => {
                return (
                    <div>
                        <Button label="Action" />
                        <Button label="Action 2" />
                    </div>
                );
            };

            export const CardWithActionsExample = (props) => {
                return <Card title="Card with actions" actions={<CardActions />}>
                    Card with actions
                </Card>;
            };
            `},{language:"tsx",snippet:'<Card title="Card with actions" actions={<CardActions />}>Card with actions</Card>',expandedSnippet:`
            import React, { FC } from 'react';
            import { Card } from './Card';

            const CardActions: FC = () => {
                return (
                    <div>
                        <Button label="Action" />
                        <Button label="Action 2" />
                    </div>
                );
            };
            
            export const CardWithActionsExample: FC = (props: any) => {
                return <Card title="Card with actions" actions={<CardActions />}>
                    Card with actions
                </Card>;
            };
            `}],cardIsClickable:[{language:"jsx",snippet:'<Card title="Card with actions" >Card with actions</Card>',expandedSnippet:`
            import React from 'react';
            import { Card } from './Card';

            export const CardWithActionsExample = (props) => {
                return <Card title="Card with actions" actionAreaClick={alert("You clicked on the Card")}>
                    Card with actions
                </Card>;
            };
            `},{language:"tsx",snippet:'<Card title="Card with actions" actions={<CardActions />}>Card with actions</Card>',expandedSnippet:`
            import React, { FC } from 'react';
            import { Card } from './Card';

            const CardActions: FC = () => {
                return (
                    <div>
                        <Button label="Action" />
                        <Button label="Action 2" />
                    </div>
                );
            };
            
            export const CardWithActionsExample: FC = (props: any) => {
                return <Card title="Card with actions" actions={<CardActions />}>
                    Card with actions
                </Card>;
            };
            `}],cardWithRoundness:[{language:"jsx",snippet:'<Card title="Rounded card" roundness="high">Rounded card</Card>',expandedSnippet:`
            import React from 'react';
            import { Card } from './Card';

            export const CardWithRoundnessExample = (props) => {
                return <Card title="Rounded card" roundness="high">Rounded card</Card>;
            };
            `},{language:"tsx",snippet:'<Card title="Rounded card" roundness="high">Rounded card</Card>',expandedSnippet:`
            import React, { FC } from 'react';
            import { Card } from './Card';

            export const CardWithRoundnessExample: FC = (props: any) => {
                return <Card title="Rounded card" roundness="high">Rounded card</Card>;
            };
            `}],cardWithElevation:[{language:"jsx",snippet:'<Card title="Elevated card" raised>Elevated card</Card>',expandedSnippet:`
            import React from 'react';
            import { Card } from './Card';

            export const CardWithElevationExample = (props) => {
                return <Card title="Elevated card" raised>Elevated card</Card>;
            };
            `},{language:"tsx",snippet:'<Card title="Elevated card" raised>Elevated card</Card>',expandedSnippet:`
            import React, { FC } from 'react';
            import { Card } from './Card';

            export const CardWithElevationExample: FC = (props: any) => {
                return <Card title="Elevated card" raised>Elevated card</Card>;
            };
            `}]};function y(e){const a={p:"p",...L(),...e.components};return r.jsxs("div",{className:"content",children:[r.jsxs("h1",{children:["Card v",void 0]}),r.jsx("p",{children:r.jsx(a.p,{children:`A versatile and modular UI component that is used to organize and display\r
content in a structured and visually appealing manner. It is essentially a\r
container that can hold a variety of content types, such as text, images,\r
links, buttons, and more.`})}),r.jsx("hr",{}),r.jsx("h3",{children:"Basic usage"}),r.jsx(d,{snippets:n.card,children:r.jsx(m,{})}),r.jsx("hr",{}),r.jsx("h3",{children:"Card with Actions"}),r.jsx("p",{children:r.jsxs(a.p,{children:["Actions can be specified by using the ",r.jsx("b",{children:"actions"}),` property, that accepts\r
a `,r.jsx("i",{children:"ReactNode"})," element."]})}),r.jsx(d,{snippets:n.cardWithActions,children:r.jsx(h,{})}),r.jsx("hr",{}),r.jsx("h3",{children:"Card is clickable"}),r.jsx("p",{children:r.jsxs(a.p,{children:["The Card itself can now have a clickable option ",r.jsx("b",{children:" actionAreaClick "}),`.\r
When actionAreaClicked is used only `,r.jsx("b",{children:"title"}),` and the content inside the\r
Card will be displayed, a clickable card should not have extra buttons.`]})}),r.jsx(d,{snippets:n.cardIsClickable,children:r.jsx(x,{})}),r.jsx("hr",{}),r.jsx("h3",{children:"Card with rounded container"}),r.jsx("p",{children:r.jsxs(a.p,{children:["Roundness can be specified by using the ",r.jsx("b",{children:"roundness"}),` property, that\r
accepts one of `,r.jsx("i",{children:'"low", "medium" or "high"'})," strings."]})}),r.jsx(d,{snippets:n.cardWithRoundness,children:r.jsx(u,{})}),r.jsx("hr",{}),r.jsx("h3",{children:"Card with elevated container"}),r.jsx("p",{children:r.jsxs(a.p,{children:["Elevation can be specified by using the ",r.jsx("b",{children:"raised"}),` property, that accepts\r
a `,r.jsx("i",{children:"boolean"})," value."]})}),r.jsx(d,{snippets:n.cardWithElevation,children:r.jsx(g,{})})]})}function q(e={}){const{wrapper:a}={...L(),...e.components};return a?r.jsx(a,{...e,children:r.jsx(y,{...e})}):y(e)}const rr={title:"UnifiedUI/Card",component:t,parameters:{docs:{page:q}}},s={render:e=>r.jsx(m,{...e})},i={render:e=>r.jsx(j,{...e})},o={render:e=>r.jsx(E,{...e})},c={render:e=>r.jsx(h,{...e})},p={render:e=>r.jsx(x,{...e})},l={render:e=>r.jsx(u,{...e})},C={render:e=>r.jsx(g,{...e})};var W,f,A;s.parameters={...s.parameters,docs:{...(W=s.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: (args: any) => <CardExample {...args} />
}`,...(A=(f=s.parameters)==null?void 0:f.docs)==null?void 0:A.source}}};var b,v,R;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: (args: any) => <CardWithTitleExample {...args} />
}`,...(R=(v=i.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};var w,k,S;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: (args: any) => <CardWithCustomHeaderExample {...args} />
}`,...(S=(k=o.parameters)==null?void 0:k.docs)==null?void 0:S.source}}};var I,N,B;c.parameters={...c.parameters,docs:{...(I=c.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: (args: any) => <CardWithActionsExample {...args} />
}`,...(B=(N=c.parameters)==null?void 0:N.docs)==null?void 0:B.source}}};var F,T,H;p.parameters={...p.parameters,docs:{...(F=p.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: (args: any) => <CardIsClickableExample {...args} />
}`,...(H=(T=p.parameters)==null?void 0:T.docs)==null?void 0:H.source}}};var M,D,U;l.parameters={...l.parameters,docs:{...(M=l.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: (args: any) => <CardWithRoundnessExample {...args} />
}`,...(U=(D=l.parameters)==null?void 0:D.docs)==null?void 0:U.source}}};var X,Y,z;C.parameters={...C.parameters,docs:{...(X=C.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: (args: any) => <CardWithElevationExample {...args} />
}`,...(z=(Y=C.parameters)==null?void 0:Y.docs)==null?void 0:z.source}}};const er=["BaseCard","CardWithTitle","CardWithTitleAndCustomHeader","CardWithActions","CardIsClickable","CardWithRoundness","CardWithElevation"];export{s as BaseCard,p as CardIsClickable,c as CardWithActions,C as CardWithElevation,l as CardWithRoundness,i as CardWithTitle,o as CardWithTitleAndCustomHeader,er as __namedExportsOrder,rr as default};
