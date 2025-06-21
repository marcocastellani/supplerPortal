import{j as e}from"./index-DrhACB-D.js";import{g as m}from"./Upload-ChF5xKSK.js";import{r as d}from"./index-DQDNmYQF.js";import{useMDXComponents as V}from"./index-DmqVK_gK.js";import{S}from"./docs-CJ9d-umt.js";import"./index-BGiqdwja.js";import"./theming-C7i7v1dL.js";import"./tiny-invariant-CopsF_GD.js";const r=t=>{const n=[{label:"Option1",value:"1"},{label:"Option2",value:"2"}],[o,l]=d.useState(null);return e.jsx(m,{options:n,onChange:a=>{l(a?a.target.value:"")},value:o,name:"sb-select",...t})},i=t=>{const n=[{label:"Option1",value:"1"},{label:"Option2",value:"2"},{label:"Option3",value:"3"}],[o,l]=d.useState([]);return e.jsx(m,{options:n,onChange:a=>{l(a.target.value)},value:o,name:"sb-select",multiple:!0,...t})},u=t=>{const n=[{label:"Option1",value:"1"},{label:"Option2",value:"2"}],[o,l]=d.useState(n[0].value);return e.jsx(m,{options:n,onChange:(a,g)=>{l(g?g.value:"")},value:o,name:"sb-select",useAutocomplete:!0,...t})};try{r.displayName="SelectExample",r.__docgenInfo={description:"",displayName:"SelectExample",props:{}}}catch{}try{i.displayName="MultipleSelectExample",i.__docgenInfo={description:"",displayName:"MultipleSelectExample",props:{}}}catch{}try{u.displayName="AutocompleteSelectExample",u.__docgenInfo={description:"",displayName:"AutocompleteSelectExample",props:{}}}catch{}const v={select:[{language:"jsx",snippet:`
            <Select
                options={options}
                onChange={(event) => {
                    setValue(event.target.value);
                }}
                value={value}
                name="sb-select"
            />
            `,expandedSnippet:`
            import React, { useState } from 'react';
            import { Select } from './Select';

            export const SelectExample = (props) => {
                const options = [
                    { label: 'Option1', value: '1' },
                    { label: 'Option2', value: '2' },
                ];
                const [value, setValue] = useState('1');

                return (
                    <Select
                        options={options}
                        onChange={(event) => {
                            setValue(event.target.value);
                        }}
                        value={value}
                        name="sb-select"
                    />
                );
            };
            `},{language:"tsx",snippet:`
            <Select
                options={options}
                onChange={(event: SelectChangeEvent<string | string[]>) => {
                    setValue(event.target.value as string);
                }}
                value={value}
                name="sb-select"
            />
            `,expandedSnippet:`
            import React, { FC, SyntheticEvent, useState } from 'react';
            import { ISelectOption, Select, SelectChangeEvent } from './Select';
            
            export const SelectExample: FC = (props: any) => {
                const options: ISelectOption[] = [
                    { label: 'Option1', value: '1' },
                    { label: 'Option2', value: '2' },
                ];
                const [value, setValue] = useState<string>('1');
            
                return (
                    <Select
                        options={options}
                        onChange={(event: SelectChangeEvent<string | string[]>) => {
                            setValue(event.target.value as string);
                        }}
                        value={value}
                        name="sb-select"
                    />
                );
            };
            `}],multipleSelect:[{language:"jsx",snippet:`
            <Select
                options={options}
                onChange={(event) => {
                    setValue(event.target.value);
                }}
                value={value}
                name="sb-select"
                multiple
            />
            `,expandedSnippet:`
            import React, { useState } from 'react';
            import { Select } from './Select';

            export const SelectExample = (props) => {
                const options = [
                    { label: 'Option1', value: '1' },
                    { label: 'Option2', value: '2' },
                ];
                const [value, setValue] = useState('1');

                return (
                    <Select
                        options={options}
                        onChange={(event) => {
                            setValue(event.target.value);
                        }}
                        value={value}
                        name="sb-select"
                        multiple
                    />
                );
            };
            `},{language:"tsx",snippet:`
            <Select
                options={options}
                onChange={(event: SelectChangeEvent<string | string[]>) => {
                    setValue(event.target.value as string);
                }}
                value={value}
                name="sb-select"
                multiple
            />
            `,expandedSnippet:`
            import React, { FC, SyntheticEvent, useState } from 'react';
            import { ISelectOption, Select, SelectChangeEvent } from './Select';
            
            export const SelectExample: FC = (props: any) => {
                const options: ISelectOption[] = [
                    { label: 'Option1', value: '1' },
                    { label: 'Option2', value: '2' },
                ];
                const [value, setValue] = useState<string[]>([]);
            
                return (
                    <Select
                        options={options}
                        onChange={(event: SelectChangeEvent<string | string[]>) => {
                            setValue(event.target.value as string[]);
                        }}
                        value={value}
                        name="sb-select"
                        multiple
                    />
                );
            };
            `}],autocompleteSelect:[{language:"jsx",snippet:`
            <Select
                options={options}
                onChange={(_event, option) => {
                    if (option) {
                        setValue(option.value);
                    } else {
                        setValue('');
                    }
                }}
                value={value}
                name="sb-select"
                useAutocomplete
            />
            `,expandedSnippet:`
            import React, { useState } from 'react';
            import { Select } from './Select';

            export const SelectExample = (props) => {
                const options = [
                    { label: 'Option1', value: '1' },
                    { label: 'Option2', value: '2' },
                ];
                const [value, setValue] = useState('1');

                return (
                    <Select
                        options={options}
                        onChange={(_event, option) => {
                            if (option) {
                                setValue(option.value);
                            } else {
                                setValue('');
                            }
                        }}
                        value={value}
                        name="sb-select"
                        useAutocomplete
                    />
                );
            };
            `},{language:"tsx",snippet:`
            <Select
                options={options}
                onChange={(_event: SyntheticEvent, option: ISelectOption | null) => {
                    if (option) {
                        setValue(option.value);
                    } else {
                        setValue('');
                    }
                }}
                value={value}
                name="sb-select"
                useAutocomplete
            />
            `,expandedSnippet:`
            import React, { FC, SyntheticEvent, useState } from 'react';
            import { ISelectOption, Select, SelectChangeEvent } from './Select';
            
            export const SelectExample: FC = (props: any) => {
                const options: ISelectOption[] = [
                    { label: 'Option1', value: '1' },
                    { label: 'Option2', value: '2' },
                ];
                const [value, setValue] = useState<string>([]);
            
                return (
                    <Select
                        options={options}
                        onChange={(_event: SyntheticEvent, option: ISelectOption | null) => {
                            if (option) {
                                setValue(option.value);
                            } else {
                                setValue('');
                            }
                        }}
                        value={value}
                        name="sb-select"
                        useAutocomplete
                    />
                );
            };
            `}]};function x(t){const n={p:"p",...V(),...t.components};return e.jsxs("div",{className:"content",children:[e.jsxs("h1",{children:["Select v",void 0]}),e.jsx("p",{children:e.jsx(n.p,{children:`Control element that present users with a set of options among which they\r
can choose.`})}),e.jsx("hr",{}),e.jsx("h3",{children:"Basic usage"}),e.jsx(S,{snippets:v.select,children:e.jsx(r,{})}),e.jsx("hr",{}),e.jsx("h3",{children:"Multiple selection"}),e.jsx("p",{children:e.jsxs(n.p,{children:["Multiple selection can be allowed by using the ",e.jsx("b",{children:"multiple"}),` boolean\r
property.`]})}),e.jsx(S,{snippets:v.multipleSelect,children:e.jsx(i,{})}),e.jsx("hr",{}),e.jsx("h3",{children:"Autocomplete selection"}),e.jsx("p",{children:e.jsxs(n.p,{children:["Autocomplete selection can be allowed by using the ",e.jsx("b",{children:"useAutocomplete"})," ",`\r
boolean property.`]})}),e.jsx(S,{snippets:v.autocompleteSelect,children:e.jsx(u,{})}),e.jsx("hr",{}),e.jsx("h3",{children:"Select in forms"}),e.jsxs("p",{children:[e.jsxs(n.p,{children:[`Select can be used in complex forms and support the react-hook-form library,\r
a complete guide can be found in`," "]}),e.jsx("a",{href:"/?path=/docs/how-to-guides-forms--docs",target:"_BLANK",children:e.jsx(n.p,{children:"UnifiedUI's Forms guide"})}),e.jsx(n.p,{children:"."})]})]})}function A(t={}){const{wrapper:n}={...V(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(x,{...t})}):x(t)}const D={title:"UnifiedUI/Select",component:m,parameters:{docs:{page:A}}},s={render:t=>e.jsx(r,{...t})},p={render:t=>e.jsx(i,{...t})},c={render:t=>e.jsx(u,{...t})};var h,b,j;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: (args: any) => <SelectExample {...args} />
}`,...(j=(b=s.parameters)==null?void 0:b.docs)==null?void 0:j.source}}};var f,_,E;p.parameters={...p.parameters,docs:{...(f=p.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: (args: any) => <MultipleSelectExample {...args} />
}`,...(E=(_=p.parameters)==null?void 0:_.docs)==null?void 0:E.source}}};var C,y,O;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: (args: any) => <AutocompleteSelectExample {...args} />
}`,...(O=(y=c.parameters)==null?void 0:y.docs)==null?void 0:O.source}}};const X=["BaseSelect","MultipleSelect","AutocompleteSelect"];export{c as AutocompleteSelect,s as BaseSelect,p as MultipleSelect,X as __namedExportsOrder,D as default};
