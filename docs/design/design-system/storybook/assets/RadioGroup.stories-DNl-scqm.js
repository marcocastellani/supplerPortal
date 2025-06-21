import{j as o}from"./index-DrhACB-D.js";import{R as t}from"./Upload-ChF5xKSK.js";import{useMDXComponents as b}from"./index-DmqVK_gK.js";import{S as s}from"./docs-CJ9d-umt.js";import"./index-DQDNmYQF.js";import"./index-BGiqdwja.js";import"./theming-C7i7v1dL.js";import"./tiny-invariant-CopsF_GD.js";const i=e=>{const a=[{label:"Option1",value:1},{label:"Option2",value:2}];return o.jsx(t,{label:"Select one of the following options:",direction:"row",options:a,name:"sb-radioGroup",...e})},n=e=>{const a=[{label:"Option1",value:"1"},{label:"Option2",value:"2",disabled:!0},{label:"Option3",value:"3"}];return o.jsx(t,{options:a,name:"sb-radioGroup",...e})};try{i.displayName="RadioGroupExample",i.__docgenInfo={description:"",displayName:"RadioGroupExample",props:{}}}catch{}try{n.displayName="DisabledRadioGroupOptionExample",n.__docgenInfo={description:"",displayName:"DisabledRadioGroupOptionExample",props:{}}}catch{}const d={radioGroup:[{language:"jsx",snippet:'<RadioGroup options={options} name="sb-radioGroup" />',expandedSnippet:`
            import React from 'react';
            import { IRadioOption, RadioGroup } from './RadioGroup';

            export const RadioGroupExample = (props) => {
                const options = [
                    { label: 'Option1', value: '1' },
                    { label: 'Option2', value: '2' },
                ];

                return <RadioGroup options={options} name="sb-radioGroup" />;
            };
            `},{language:"tsx",snippet:'<RadioGroup options={options} name="sb-radioGroup" />',expandedSnippet:`
            import React, { FC } from 'react';
            import { IRadioOption, RadioGroup } from './RadioGroup';

            export const RadioGroupExample: FC = (props: any) => {
                const options: IRadioOption[] = [
                    { label: 'Option1', value: '1' },
                    { label: 'Option2', value: '2' },
                ];

                return <RadioGroup options={options} name="sb-radioGroup" />;
            };
            `}],disabledRadioGroupOption:[{language:"jsx",snippet:'<RadioGroup options={options} name="sb-radioGroup" />',expandedSnippet:`
            import React from 'react';
            import { IRadioOption, RadioGroup } from './RadioGroup';

            export const RadioGroupExample = (props) => {
                const options = [
                    { label: 'Option1', value: '1' },
		            { label: 'Option2', value: '2', disabled: true },
                    { label: 'Option3', value: '3' },
                ];

                return <RadioGroup options={options} name="sb-radioGroup" />;
            };
            `},{language:"tsx",snippet:'<RadioGroup options={options} name="sb-radioGroup" />',expandedSnippet:`
            import React, { FC } from 'react';
            import { IRadioOption, RadioGroup } from './RadioGroup';

            export const RadioGroupExample: FC = (props: any) => {
                const options: IRadioOption[] = [
                    { label: 'Option1', value: '1' },
		            { label: 'Option2', value: '2', disabled: true },
                    { label: 'Option3', value: '3' },
                ];

                return <RadioGroup options={options} name="sb-radioGroup" />;
            };
            `}]};function l(e){const a={p:"p",...b(),...e.components};return o.jsxs("div",{className:"content",children:[o.jsxs("h1",{children:["RadioGroup v",void 0]}),o.jsx("p",{children:o.jsx(a.p,{children:`Control element that present users with a set of options among which they
can choose only one. It allows users to select a single option from a group
of mutually exclusive choices by clicking or tapping on radio buttons
associated with each option..`})}),o.jsx("hr",{}),o.jsx("h3",{children:"Basic usage"}),o.jsx(s,{snippets:d.radioGroup,children:o.jsx(i,{})}),o.jsx("hr",{}),o.jsx("h3",{children:"RadioGroup with disabled option"}),o.jsx(s,{snippets:d.disabledRadioGroupOption,children:o.jsx(n,{})}),o.jsx("hr",{}),o.jsx("h3",{children:"RadioGroup in forms"}),o.jsxs("p",{children:[o.jsxs(a.p,{children:[`RadioGroup can be used in complex forms and support the react-hook-form
library, a complete guide can be found in`," "]}),o.jsx("a",{href:"/?path=/docs/how-to-guides-forms--docs",target:"_BLANK",children:o.jsx(a.p,{children:"UnifiedUI's Forms guide"})}),o.jsx(a.p,{children:"."})]})]})}function h(e={}){const{wrapper:a}={...b(),...e.components};return a?o.jsx(a,{...e,children:o.jsx(l,{...e})}):l(e)}const I={title:"UnifiedUI/RadioGroup",component:t,parameters:{docs:{page:h}}},r={render:e=>o.jsx(i,{...e})},p={render:e=>o.jsx(n,{...e})};var u,c,m;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: (args: any) => <RadioGroupExample {...args} />
}`,...(m=(c=r.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var x,G,R;p.parameters={...p.parameters,docs:{...(x=p.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: (args: any) => <DisabledRadioGroupOptionExample {...args} />
}`,...(R=(G=p.parameters)==null?void 0:G.docs)==null?void 0:R.source}}};const w=["BaseRadioGroup","DisabledRadioGroupOption"];export{r as BaseRadioGroup,p as DisabledRadioGroupOption,w as __namedExportsOrder,I as default};
