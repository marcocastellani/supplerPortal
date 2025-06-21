import{j as e}from"./index-DrhACB-D.js";import{f as s,d as F}from"./Upload-ChF5xKSK.js";import{r as o}from"./index-DQDNmYQF.js";import{useMDXComponents as R}from"./index-DmqVK_gK.js";import{S as r}from"./docs-CJ9d-umt.js";import"./index-BGiqdwja.js";import"./theming-C7i7v1dL.js";import"./tiny-invariant-CopsF_GD.js";const m=t=>{const[n,a]=o.useState(0);return e.jsx(s,{value:n,setValue:a,type:"number",min:0,max:10,...t})},d=t=>{const[n,a]=o.useState("");return e.jsx(s,{name:"sb-input",value:n,setValue:a,icon:e.jsx(F,{name:"Home"}),iconPosition:"end",...t})},h=t=>{const[n,a]=o.useState(""),K=D=>{D.key==="Enter"&&alert("Enter was pressed")};return e.jsx(s,{name:"sb-input",value:n,setValue:a,onKeyDown:K,...t})},x=t=>{const[n,a]=o.useState("");return e.jsx(s,{name:"sb-input",value:n,setValue:a,multiline:!0,rows:2,maxRows:6,...t})},I=t=>{const[n,a]=o.useState("");return e.jsx(s,{name:"sb-input",value:n,setValue:a,errorColor:!0,...t})};try{m.displayName="InputExample",m.__docgenInfo={description:"",displayName:"InputExample",props:{}}}catch{}try{d.displayName="InputWithIconExample",d.__docgenInfo={description:"",displayName:"InputWithIconExample",props:{}}}catch{}try{h.displayName="InputWithKeyExample",h.__docgenInfo={description:"",displayName:"InputWithKeyExample",props:{}}}catch{}try{x.displayName="InputMultilineExample",x.__docgenInfo={description:"",displayName:"InputMultilineExample",props:{}}}catch{}try{I.displayName="InputErrorExample",I.__docgenInfo={description:"",displayName:"InputErrorExample",props:{}}}catch{}const p={input:[{language:"jsx",snippet:'<Input name="sb-input" value={value} setValue={setValue} />',expandedSnippet:`
            import React, { useState } from 'react';
            import { Input } from './Input';

            export const InputExample = (props) => {
                const [value, setValue] = useState('');
                return <Input name="sb-input" value={value} setValue={setValue} />;
            };
            `},{language:"tsx",snippet:'<Input name="sb-input" value={value} setValue={setValue} />',expandedSnippet:`
            import React, { FC, useState } from 'react';
            import { Input } from './Input';

            export const InputExample: FC = (props: any) => {
                const [value, setValue] = useState<string>('');
                return <Input name="sb-input" value={value} setValue={setValue} />;
            };
            `}],inputWithIcon:[{language:"jsx",snippet:`
            <Input
                name="sb-input"
                value={value}
                setValue={setValue}
                icon={<Icon name="Home" />}
                iconPosition="end"
            />
            `,expandedSnippet:`
            import React, { FC, useState } from 'react';
            import { Input } from './Input';
            import { Icon } from '../Icon';

            export const InputWithIconExample = (props) => {
                const [value, setValue] = useState('');
                return (
                    <Input
                        name="sb-input"
                        value={value}
                        setValue={setValue}
                        icon={<Icon name="Home" />}
                        iconPosition="end"
                    />
                );
            };
            `},{language:"tsx",snippet:`
            <Input
                name="sb-input"
                value={value}
                setValue={setValue}
                icon={<Icon name="Home" />}
                iconPosition="end"
            />
            `,expandedSnippet:`
            import React, { FC, useState } from 'react';
            import { Input } from './Input';
            import { Icon } from '../Icon';

            export const InputWithIconExample: FC = (props: any) => {
                const [value, setValue] = useState<string>('');
                return (
                    <Input
                        name="sb-input"
                        value={value}
                        setValue={setValue}
                        icon={<Icon name="Home" />}
                        iconPosition="end"
                    />
                );
            };
            `}],inputWithKeyEvent:[{language:"jsx",snippet:`
            <Input
                name="sb-input"
                value={value}
                setValue={setValue}
                onKeyDown={handleKeyDown}
            />
            `,expandedSnippet:`
            import React, { FC, useState } from 'react';
            import { Input } from './Input';

            export const InputWithIconExample = (props) => {
                const [value, setValue] = useState('');
                return (
                    <Input
                        name="sb-input"
                        value={value}
                        setValue={setValue}
                        onKeyDown={handleKeyDown}
                    />
                );
            };
            `},{language:"tsx",snippet:`
            <Input
                name="sb-input"
                value={value}
                setValue={setValue}
                setValue={setValue}
                onKeyDown={handleKeyDown}
            />
            `,expandedSnippet:`
            import React, { FC, useState } from 'react';
            import { Input } from './Input';
            import { Icon } from '../Icon';

            export const InputWithIconExample: FC = (props: any) => {
                const [value, setValue] = useState<string>('');
                return (
                    <Input
                        name="sb-input"
                        value={value}
                        setValue={setValue}
                        icon={<Icon name="Home" />}
                        iconPosition="end"
                        setValue={setValue}
                        onKeyDown={handleKeyDown}
                    />
                );
            };
            `}],inputWithMultiline:[{language:"jsx",snippet:'<Input name="sb-input" value={value} setValue={setValue} multiline maxRows={6}/>',expandedSnippet:`
            import React, { useState } from 'react';
            import { Input } from './Input';

            export const InputExample = (props) => {
                const [value, setValue] = useState('');
                return <Input name="sb-input" value={value} setValue={setValue} multiline maxRows={6}/>;
            };
            `},{language:"tsx",snippet:'<Input name="sb-input" value={value} setValue={setValue} multiline maxRows={6}/>',expandedSnippet:`
            import React, { FC, useState } from 'react';
            import { Input } from './Input';

            export const InputExample: FC = (props: any) => {
                const [value, setValue] = useState<string>('');
                return <Input name="sb-input" value={value} setValue={setValue} multiline rows={2} maxRows={6}/>;
            };
            `}],inputError:[{language:"jsx",snippet:'<Input name="sb-input" value={value} setValue={setValue} errorColor/>',expandedSnippet:`
            import React, { useState } from 'react';
            import { Input } from './Input';

            export const InputExample = (props) => {
                const [value, setValue] = useState('');
                	return (
		                <Input
			                name="sb-input"
			                value={value}
			                setValue={setValue}
			                errorColor
		                        />
	                );
            };
            `},{language:"tsx",snippet:'<Input name="sb-input" value={value} setValue={setValue} multiline maxRows={6}/>',expandedSnippet:`
            import React, { FC, useState } from 'react';
            import { Input } from './Input';

            export const InputExample: FC = (props: any) => {
                const [value, setValue] = useState<string>('');
                	return (
		                <Input
			                name="sb-input"
			                value={value}
			                setValue={setValue}
			                errorColor
		                />
	                );
            };
            `}]};function v(t){const n={p:"p",...R(),...t.components};return e.jsxs("div",{className:"content",children:[e.jsxs("h1",{children:["Input v",void 0]}),e.jsx("p",{children:e.jsx(n.p,{children:`Control element that allows users to enter data or make selections
interactively.`})}),e.jsx("hr",{}),e.jsx("h3",{children:"Basic usage"}),e.jsx(r,{snippets:p.input,children:e.jsx(m,{})}),e.jsx("hr",{}),e.jsx("h3",{children:"Input with icon"}),e.jsx(r,{snippets:p.inputWithIcon,children:e.jsx(d,{})}),e.jsx("hr",{}),e.jsx("h3",{children:"Input with key event on Enter"}),e.jsx(r,{snippets:p.inputWithKeyEvent,children:e.jsx(h,{})}),e.jsx("hr",{}),e.jsx("h3",{children:"Input with has multiple lines"}),e.jsx("p",{children:e.jsx(n.p,{children:`The prop "rows" specifies the initial number of rows the input should
display, while the prop "maxRows" defines the maximum number of rows that
can be shown before the content becomes scrollable.`})}),e.jsx(r,{snippets:p.inputWithMultiline,children:e.jsx(x,{})}),e.jsx("hr",{}),e.jsx("h3",{children:"Input with has errorColor"}),e.jsx("p",{children:e.jsx(n.p,{children:`The prop "errorColor" lets the input be colored in red, the same like there
is a issue with the content of the input when rules are defined.`})}),e.jsx(r,{snippets:p.inputError,children:e.jsx(I,{})}),e.jsx("hr",{}),e.jsx("h3",{children:"Input in forms"}),e.jsxs("p",{children:[e.jsxs(n.p,{children:[`Input can be used in complex forms and support the react-hook-form library,
a complete guide can be found in`," "]}),e.jsx("a",{href:"/?path=/docs/how-to-guides-forms--docs",target:"_BLANK",children:e.jsx(n.p,{children:"UnifiedUI's Forms guide"})}),e.jsx(n.p,{children:"."})]})]})}function M(t={}){const{wrapper:n}={...R(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(v,{...t})}):v(t)}const T={title:"UnifiedUI/Input",component:s,parameters:{docs:{page:M}}},u={render:t=>e.jsx(m,{...t})},i={render:t=>e.jsx(d,{...t})},l={render:t=>e.jsx(x,{...t})},c={render:t=>e.jsx(I,{...t})};var V,f,j;u.parameters={...u.parameters,docs:{...(V=u.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: (args: any) => <InputExample {...args} />
}`,...(j=(f=u.parameters)==null?void 0:f.docs)==null?void 0:j.source}}};var g,y,E;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: (args: any) => <InputWithIconExample {...args} />
}`,...(E=(y=i.parameters)==null?void 0:y.docs)==null?void 0:E.source}}};var _,S,b;l.parameters={...l.parameters,docs:{...(_=l.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: (args: any) => <InputMultilineExample {...args} />
}`,...(b=(S=l.parameters)==null?void 0:S.docs)==null?void 0:b.source}}};var w,C,W;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: (args: any) => <InputErrorExample {...args} />
}`,...(W=(C=c.parameters)==null?void 0:C.docs)==null?void 0:W.source}}};const A=["BaseInput","InputWithIcon","InputMultiline","InputError"];export{u as BaseInput,c as InputError,l as InputMultiline,i as InputWithIcon,A as __namedExportsOrder,T as default};
