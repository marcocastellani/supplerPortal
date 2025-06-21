import{j as e}from"./index-DrhACB-D.js";import{r as l,d as c}from"./Upload-ChF5xKSK.js";import{r as x}from"./index-DQDNmYQF.js";import{useMDXComponents as m}from"./index-DmqVK_gK.js";import{S as C}from"./docs-CJ9d-umt.js";import"./index-BGiqdwja.js";import"./theming-C7i7v1dL.js";import"./tiny-invariant-CopsF_GD.js";const r=t=>{const[n,s]=x.useState(0),d=[{icon:e.jsx(c,{name:"Search"}),onClick:()=>alert("Searching: "+n),typeCTA:"button",color:"primary"},{toolTipContent:"Delete",icon:e.jsx(c,{name:"Delete"}),onClick:()=>s(0),typeCTA:"button",color:"error"}];return e.jsx(l,{type:"number",min:0,max:10,value:n,setValue:s,iconButtonProps:d,...t})};try{r.displayName="InputCTAExample",r.__docgenInfo={description:"",displayName:"InputCTAExample",props:{}}}catch{}const I={inputCTA:[{language:"jsx",snippet:`
            <InputCTA
                name="sb-input"
                value={value}
                setValue={setValue}
                iconButtonProps={iconButtonProps}
            />
            `,expandedSnippet:`
            import React, { useState } from 'react';
            import { Icon } from '../Icon';
            import { InputCTA } from './InputCTA';
            
            export const InputCTAExample = (props) => {
                const [value, setValue] = useState('');
                const iconButtonProps = [
                    { icon: <Icon name="Search" />, onClick: () => console.log('Search clicked'), typeCTA: 'button', color: 'primary' },
                    { icon: <Icon name="Delete" />, onClick: () => console.log('Delete clicked'), typeCTA: 'button', color: 'error' }
                ];
                return (
                    <InputCTA
                        name="sb-input"
                        value={value}
                        setValue={setValue}
                        iconButtonProps={iconButtonProps}
                    />
                );
            };            
            `},{language:"tsx",snippet:`
            <InputCTA
                name="sb-input"
                value={value}
                setValue={setValue}
                iconButtonProps={iconButtonProps}
            />
            `,expandedSnippet:`
            import React, { FC, useState } from 'react';
            import { Icon } from '../Icon';
            import { InputCTA } from './InputCTA';
            
            export const InputCTAExample: FC = (props: any) => {
                const [value, setValue] = useState<string>('');
                const iconButtonProps = [
                    { icon: <Icon name="Search" />, onClick: () => console.log('Search clicked'), typeCTA: 'button', color: 'primary' },
                    { icon: <Icon name="Delete" />, onClick: () => console.log('Delete clicked'), typeCTA: 'button', color: 'error' }
                ];
                return (
                    <InputCTA
                        name="sb-input"
                        value={value}
                        setValue={setValue}
                        iconButtonProps={iconButtonProps}
                    />
                );
            };
            
            `}]};function a(t){const n={p:"p",...m(),...t.components};return e.jsxs("div",{className:"content",children:[e.jsxs("h1",{children:["InputCTA v",void 0]}),e.jsx("p",{children:e.jsx(n.p,{children:`Control element that allows users to enter data or make selections
interactively.`})}),e.jsx("hr",{}),e.jsx("h3",{children:"Basic usage"}),e.jsx(C,{snippets:I.inputCTA,children:e.jsx(r,{})}),e.jsx("hr",{}),e.jsx("h3",{children:"Input in forms"}),e.jsxs("p",{children:[e.jsxs(n.p,{children:[`Input can be used in complex forms and support the react-hook-form library,
a complete guide can be found in`," "]}),e.jsx("a",{href:"/?path=/docs/how-to-guides-forms--docs",target:"_BLANK",children:e.jsx(n.p,{children:"UnifiedUI's Forms guide"})}),e.jsx(n.p,{children:"."})]})]})}function h(t={}){const{wrapper:n}={...m(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(a,{...t})}):a(t)}const b={title:"UnifiedUI/InputCTA",component:l,parameters:{docs:{page:h}}},o={render:t=>e.jsx(r,{...t})};var p,i,u;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: (args: any) => <InputCTAExample {...args} />
}`,...(u=(i=o.parameters)==null?void 0:i.docs)==null?void 0:u.source}}};const v=["BaseInputCTA"];export{o as BaseInputCTA,v as __namedExportsOrder,b as default};
