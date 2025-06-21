import{j as e}from"./index-DrhACB-D.js";import{l as o,d as j}from"./Upload-ChF5xKSK.js";import{E as f,S as r}from"./docs-CJ9d-umt.js";import{useMDXComponents as P}from"./index-DmqVK_gK.js";import"./index-DQDNmYQF.js";import"./index-BGiqdwja.js";import"./theming-C7i7v1dL.js";import"./tiny-invariant-CopsF_GD.js";const m=n=>e.jsx(o,{content:"Chip content",...n}),d=n=>e.jsxs(f,{children:[e.jsx(o,{content:"Filled chip",variant:"filled",...n}),e.jsx(o,{content:"Outlined chip",variant:"outlined",...n})]}),C=n=>e.jsxs(f,{children:[e.jsx(o,{content:"Default chip",color:"default",...n}),e.jsx(o,{content:"Primary chip",color:"primary",...n}),e.jsx(o,{content:"Secondary chip",color:"secondary",...n}),e.jsx(o,{content:"Error chip",color:"error",...n}),e.jsx(o,{content:"Info chip",color:"info",...n}),e.jsx(o,{content:"Success chip",color:"success",...n}),e.jsx(o,{content:"Warning chip",color:"warning",...n})]}),x=n=>e.jsx(o,{content:"Do something",clickable:!0,onClick:()=>console.log("something happend!"),...n}),g=n=>e.jsxs(f,{children:[e.jsx(o,{icon:e.jsx(j,{name:"Coffee",color:"green",...n}),content:"Do something"}),e.jsx(o,{icon:e.jsx(j,{name:"Coffee",color:"green",...n}),content:"Do you wish me a good morning, or mean that it is a good morning whether I want it or not; or that you feel good this morning; or that it is a morning to be good on?",multiline:!0})]}),u=()=>e.jsx(o,{content:"You cannot pass,” he said. The orcs stood still, and a dead silence fell. “I am a servant of the Secret Fire, wielder of the flame of Anor. You cannot pass. The dark fire will not avail you, flame of Udûn. Go back to the Shadow! You cannot pass.",multiline:!0});try{m.displayName="ChipExample",m.__docgenInfo={description:"",displayName:"ChipExample",props:{}}}catch{}try{d.displayName="ChipVariantsExample",d.__docgenInfo={description:"",displayName:"ChipVariantsExample",props:{}}}catch{}try{C.displayName="ChipColorsExample",C.__docgenInfo={description:"",displayName:"ChipColorsExample",props:{}}}catch{}try{x.displayName="ChipActionsExample",x.__docgenInfo={description:"",displayName:"ChipActionsExample",props:{}}}catch{}try{g.displayName="ChipIconExample",g.__docgenInfo={description:"",displayName:"ChipIconExample",props:{}}}catch{}try{u.displayName="ChipMultilineExample",u.__docgenInfo={description:"",displayName:"ChipMultilineExample",props:{}}}catch{}const t={chip:[{language:"jsx",snippet:'<Chip content="Chip content" />',expandedSnippet:`
            import React from 'react';
            import { Chip } from './Chip';

            export const ChipExample = (props) => {
                return <Chip content="Chip content" />;
            };
            `},{language:"tsx",snippet:'<Chip content="Chip content" />',expandedSnippet:`
            import React, { FC } from 'react';
            import { Chip } from './Chip';

            export const ChipExample: FC = (props: any) => {
                return <Chip content="Chip content" />;
            };
            `}],chipVariants:[{language:"jsx",snippet:'<Chip content="Filled chip" variant="filled" />',expandedSnippet:`
            import React from 'react';
            import { Chip } from './Chip';

            export const ChipExample = (props) => {
                return <Chip content="Filled chip" variant="filled" />;
            };
            `},{language:"tsx",snippet:'<Chip content="Filled chip" variant="filled" />',expandedSnippet:`
            import React, { FC } from 'react';
            import { Chip } from './Chip';

            export const ChipExample: FC = (props: any) => {
                return <Chip content="Filled chip" variant="filled" />;
            };
            `}],chipColors:[{language:"jsx",snippet:'<Chip content="Primary chip" color="primary" />',expandedSnippet:`
            import React from 'react';
            import { Chip } from './Chip';

            export const ChipExample = (props) => {
                return <Chip content="Primary chip" color="primary" />;
            };
            `},{language:"tsx",snippet:'<Chip content="Primary chip" color="primary" />',expandedSnippet:`
            import React, { FC } from 'react';
            import { Chip } from './Chip';

            export const ChipExample: FC = (props: any) => {
                return <Chip content="Primary chip" color="primary" />;
            };
            `}],chipActions:[{language:"jsx",snippet:`<Chip content="Do something" clickable onClick={() => console.log('something happend!')} />`,expandedSnippet:`
            import React from 'react';
            import { Chip } from './Chip';

            export const ChipExample = (props) => {
                return <Chip content="Do something" clickable onClick={() => console.log('something happend!')} />;
            };
            `},{language:"tsx",snippet:`<Chip content="Do something" clickable onClick={() => console.log('something happend!')} />`,expandedSnippet:`
            import React, { FC } from 'react';
            import { Chip } from './Chip';

            export const ChipExample: FC = (props: any) => {
                return <Chip content="Do something" clickable onClick={() => console.log('something happend!')} />;
            };
            `}],chipIcons:[{language:"jsx",snippet:`<Chip content="Do something" clickable onClick={() => console.log('something happend!')} />`,expandedSnippet:`
            import React from 'react';
            import { Chip } from './Chip';

            export const ChipExample = (props) => {
                return (
                		<Chip
				            icon={<Icon name="Coffee" color="green" {...props} />}
				            content="Do something"
			                />
			            <Chip
				            icon={<Icon name="Coffee" color="green" {...props} />}
				            content="Do you wish me a good morning, or mean that it is a good morning whether I want it or not; or that you feel good this morning; or that it is a morning to be good on?"
				            multiline
			            />)
            };
            `},{language:"tsx",snippet:`<Chip content="Do something" clickable onClick={() => console.log('something happend!')} />`,expandedSnippet:`
            import React, { FC } from 'react';
            import { Chip } from './Chip';

            export const ChipExample: FC = (props: any) => {
                return (
                		<Chip
				            icon={<Icon name="Coffee" color="green" {...props} />}
				            content="Do something"
			                />
			            <Chip
				            icon={<Icon name="Coffee" color="green" {...props} />}
				            content="Do you wish me a good morning, or mean that it is a good morning whether I want it or not; or that you feel good this morning; or that it is a morning to be good on?"
				            multiline
			            />)
            };
            `}],chipMultiline:[{language:"jsx",snippet:`<Chip content="Do something" clickable onClick={() => console.log('something happend!')} />`,expandedSnippet:`
            import React from 'react';
            import { Chip } from './Chip';

            export const ChipExample = (props) => {
                	return (<Chip 
                        content="There once was a ship that put to sea. The name of the ship was the Billy O' Tea. The winds blew up, her bow dipped downg. Oh blow, my bully boys, blow ..."
			            multiline
		                />
	            );
            };
            `},{language:"tsx",snippet:`<Chip content="Do something" clickable onClick={() => console.log('something happend!')} />`,expandedSnippet:`
            import React, { FC } from 'react';
            import { Chip } from './Chip';

            export const ChipExample: FC = (props: any) => {
                    return (<Chip 
                                content="There once was a ship that put to sea. The name of the ship was the Billy O' Tea. The winds blew up, her bow dipped downg. Oh blow, my bully boys, blow ..."
			                    multiline
		                    />
	            );
            };
            `}]};function y(n){const i={p:"p",...P(),...n.components};return e.jsxs("div",{className:"content",children:[e.jsxs("h1",{children:["Chip v",void 0]}),e.jsx("p",{children:e.jsx(i.p,{children:`Small, interactive components that are used to represent pieces of\r
information or content in a visually compact and accessible manner.`})}),e.jsx("hr",{}),e.jsx("h3",{children:"Basic usage"}),e.jsx(r,{snippets:t.chip,children:e.jsx(m,{})}),e.jsx("hr",{}),e.jsx("h3",{children:"Chip variants"}),e.jsx("p",{children:e.jsxs(i.p,{children:["Chips can have different variants that can be specified with the"," ",`\r
`,e.jsx("b",{children:"variant"})," property, which can be be ",e.jsx("i",{children:`'filled' or "outlined"`}),"."]})}),e.jsx(r,{snippets:t.chipVariants,children:e.jsx(d,{})}),e.jsx("hr",{}),e.jsx("h3",{children:"Chip colors"}),e.jsxs("p",{children:[e.jsxs(i.p,{children:["Chips can have different colors, that can be specified with the ",e.jsx("b",{children:"color"})," ",`\r
property, which can be one off`," "]}),e.jsx("i",{children:e.jsx(i.p,{children:'"inherit", "primary", "secondary", "info", "success", "warning" or "error"'})}),e.jsx(i.p,{children:"."})]}),e.jsx(r,{snippets:t.chipColors,children:e.jsx(C,{})}),e.jsx("hr",{}),e.jsx("h3",{children:"Chip actions"}),e.jsx("p",{children:e.jsxs(i.p,{children:["Chips can trigger actions on click, by specifying it using the"," ",`\r
`,e.jsx("b",{children:"onClick"})," property."]})}),e.jsx(r,{snippets:t.chipActions,children:e.jsx(x,{})}),e.jsx("hr",{}),e.jsx("h3",{children:"Chip icon"}),e.jsx("p",{children:e.jsxs(i.p,{children:["With the prop ",e.jsx("b",{children:"icon"}),` a icon will be added at the begining of the Chip\r
whch will be centered in height.`]})}),e.jsx(r,{snippets:t.chipIcons,children:e.jsx(g,{})}),e.jsx("hr",{}),e.jsx("h3",{children:"Chip multiline"}),e.jsx("p",{children:e.jsxs(i.p,{children:["With the prop ",e.jsx("b",{children:"multiline"})," the chip can have more then one line."]})}),e.jsx(r,{snippets:t.chipMultiline,children:e.jsx(u,{})}),e.jsx("hr",{})]})}function U(n={}){const{wrapper:i}={...P(),...n.components};return i?e.jsx(i,{...n,children:e.jsx(y,{...n})}):y(n)}const J={title:"UnifiedUI/Chip",component:o,parameters:{docs:{page:U}}},p={render:n=>e.jsx(m,{...n})},a={render:n=>e.jsx(d,{...n})},s={render:n=>e.jsx(C,{...n})},c={render:n=>e.jsx(x,{...n})},h={render:n=>e.jsx(g,{...n})},l={render:n=>e.jsx(u,{...n})};var _,E,b;p.parameters={...p.parameters,docs:{...(_=p.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: (args: any) => <ChipExample {...args} />
}`,...(b=(E=p.parameters)==null?void 0:E.docs)==null?void 0:b.source}}};var w,I,S;a.parameters={...a.parameters,docs:{...(w=a.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: (args: any) => <ChipVariantsExample {...args} />
}`,...(S=(I=a.parameters)==null?void 0:I.docs)==null?void 0:S.source}}};var k,D,v;s.parameters={...s.parameters,docs:{...(k=s.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: (args: any) => <ChipColorsExample {...args} />
}`,...(v=(D=s.parameters)==null?void 0:D.docs)==null?void 0:v.source}}};var F,N,R;c.parameters={...c.parameters,docs:{...(F=c.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: (args: any) => <ChipActionsExample {...args} />
}`,...(R=(N=c.parameters)==null?void 0:N.docs)==null?void 0:R.source}}};var M,T,A;h.parameters={...h.parameters,docs:{...(M=h.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: (args: any) => <ChipIconExample {...args} />
}`,...(A=(T=h.parameters)==null?void 0:T.docs)==null?void 0:A.source}}};var V,O,B;l.parameters={...l.parameters,docs:{...(V=l.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: (args: any) => <ChipMultilineExample {...args} />
}`,...(B=(O=l.parameters)==null?void 0:O.docs)==null?void 0:B.source}}};const K=["BaseChip","ChipVariants","ChipColors","ChipActions","ChipIcon","ChipMultiline"];export{p as BaseChip,c as ChipActions,s as ChipColors,h as ChipIcon,l as ChipMultiline,a as ChipVariants,K as __namedExportsOrder,J as default};
