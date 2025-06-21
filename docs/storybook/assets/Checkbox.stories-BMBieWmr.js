import{j as e}from"./index-DrhACB-D.js";import{h as t}from"./Upload-ChF5xKSK.js";import{r as h}from"./index-DQDNmYQF.js";import{useMDXComponents as v}from"./index-DmqVK_gK.js";import{S as a}from"./docs-CJ9d-umt.js";import"./index-BGiqdwja.js";import"./theming-C7i7v1dL.js";import"./tiny-invariant-CopsF_GD.js";const p=c=>{const[o,s]=h.useState(!0);return e.jsx(t,{label:"Checkbox",name:"sb-checkbox",checked:o,setChecked:s,...c})},i=c=>{const[o,s]=h.useState(!0);return e.jsx(t,{label:"Checkbox",labelPosition:"bottom",name:"sb-checkbox",checked:o,setChecked:s,...c})},l=c=>{const[o,s]=h.useState(!0);return e.jsx(t,{label:"Checkbox",disabled:!0,name:"sb-checkbox",checked:o,setChecked:s,...c})},C=c=>{const[o,s]=h.useState(!0);return e.jsx(t,{label:"Checkbox",size:"medium",name:"sb-checkbox",checked:o,setChecked:s,...c})},m=c=>{const[o,s]=h.useState(!0);return e.jsx(t,{label:"Checkbox",color:"success",name:"sb-checkbox",checked:o,setChecked:s,...c})};try{p.displayName="CheckboxExample",p.__docgenInfo={description:"",displayName:"CheckboxExample",props:{}}}catch{}try{i.displayName="CheckboxLabelPositioningExample",i.__docgenInfo={description:"",displayName:"CheckboxLabelPositioningExample",props:{}}}catch{}try{l.displayName="DisabledCheckboxExample",l.__docgenInfo={description:"",displayName:"DisabledCheckboxExample",props:{}}}catch{}try{C.displayName="CheckboxSizeExample",C.__docgenInfo={description:"",displayName:"CheckboxSizeExample",props:{}}}catch{}try{m.displayName="CheckboxColorExample",m.__docgenInfo={description:"",displayName:"CheckboxColorExample",props:{}}}catch{}const r={checkbox:[{language:"jsx",snippet:'<Checkbox label="Checkbox" name="sb-checkbox" checked={checked} setChecked={setChecked} />',expandedSnippet:`
            import React, { useState } from 'react';
            import { Checkbox } from './Checkbox';
            
            export const CheckboxExample = (props) => {
                const [checked, setChecked] = useState(false);

                return <Checkbox
                    label="Checkbox"
                    name="sb-checkbox"
                    checked={checked}
                    setChecked={setChecked}
                />;
            };
            `},{language:"tsx",snippet:'<Checkbox label="Checkbox" name="sb-checkbox" checked={checked} setChecked={setChecked} />',expandedSnippet:`
            import React, { FC, useState } from 'react';
            import { Checkbox } from './Checkbox';

            export const CheckboxExample: FC = (props: any) => {
                const [checked, setChecked] = useState<boolean>(false);

                return <Checkbox
                    label="Checkbox"
                    name="sb-checkbox"
                    checked={checked}
                    setChecked={setChecked}
                />;
            };
            `}],checkboxLabelPosition:[{language:"jsx",snippet:'<Checkbox label="Checkbox" labelPosition="bottom" name="sb-checkbox" checked={checked} setChecked={setChecked} />',expandedSnippet:`
            import React, { useState } from 'react';
            import { Checkbox } from './Checkbox';
            
            export const CheckboxExample = (props) => {
                const [checked, setChecked] = useState(false);

                return <Checkbox label="Checkbox" labelPosition="bottom" name="sb-checkbox" checked={checked} setChecked={setChecked} />;
            };
            `},{language:"tsx",snippet:'<Checkbox label="Checkbox" labelPosition="bottom" name="sb-checkbox" checked={checked} setChecked={setChecked} />',expandedSnippet:`
            import React, { FC, useState } from 'react';
            import { Checkbox } from './Checkbox';

            export const CheckboxExample: FC = (props: any) => {
                const [checked, setChecked] = useState<boolean>(false);

                return <Checkbox label="Checkbox" labelPosition="bottom" name="sb-checkbox" checked={checked} setChecked={setChecked} />;
            };
            `}],disabledCheckbox:[{language:"jsx",snippet:'<Checkbox label="Checkbox" disabled name="sb-checkbox" checked={checked} setChecked={setChecked} />',expandedSnippet:`
            import React, { useState } from 'react';
            import { Checkbox } from './Checkbox';
            
            export const CheckboxExample = (props) => {
                const [checked, setChecked] = useState(false);

                return <Checkbox label="Checkbox" disabled name="sb-checkbox" checked={checked} setChecked={setChecked} />;
            };
            `},{language:"tsx",snippet:'<Checkbox label="Checkbox" disabled name="sb-checkbox" checked={checked} setChecked={setChecked} />',expandedSnippet:`
            import React, { FC, useState } from 'react';
            import { Checkbox } from './Checkbox';

            export const CheckboxExample: FC = (props: any) => {
                const [checked, setChecked] = useState<boolean>(false);

                return <Checkbox label="Checkbox" disabled name="sb-checkbox" checked={checked} setChecked={setChecked} />;
            };
            `}],checkboxSize:[{language:"jsx",snippet:'<Checkbox label="Checkbox" size="medium" name="sb-checkbox" checked={checked} setChecked={setChecked} />',expandedSnippet:`
            import React, { useState } from 'react';
            import { Checkbox } from './Checkbox';
            
            export const CheckboxExample = (props) => {
                const [checked, setChecked] = useState(false);

                return <Checkbox label="Checkbox" size="medium" name="sb-checkbox" checked={checked} setChecked={setChecked} />;
            };
            `},{language:"tsx",snippet:'<Checkbox label="Checkbox" size="medium" name="sb-checkbox" checked={checked} setChecked={setChecked} />',expandedSnippet:`
            import React, { FC, useState } from 'react';
            import { Checkbox } from './Checkbox';

            export const CheckboxExample: FC = (props: any) => {
                const [checked, setChecked] = useState<boolean>(false);

                return <Checkbox label="Checkbox" size="medium" name="sb-checkbox" checked={checked} setChecked={setChecked} />;
            };
            `}],checkboxColor:[{language:"jsx",snippet:'<Checkbox label="Checkbox" color="success" name="sb-checkbox" checked={checked} setChecked={setChecked} />',expandedSnippet:`
            import React, { useState } from 'react';
            import { Checkbox } from './Checkbox';
            
            export const CheckboxExample = (props) => {
                const [checked, setChecked] = useState(false);

                return <Checkbox label="Checkbox" color="success" name="sb-checkbox" checked={checked} setChecked={setChecked} />;
            };
            `},{language:"tsx",snippet:'<Checkbox label="Checkbox" color="success" name="sb-checkbox" checked={checked} setChecked={setChecked} />',expandedSnippet:`
            import React, { FC, useState } from 'react';
            import { Checkbox } from './Checkbox';

            export const CheckboxExample: FC = (props: any) => {
                const [checked, setChecked] = useState<boolean>(false);

                return <Checkbox label="Checkbox" color="success" name="sb-checkbox" checked={checked} setChecked={setChecked} />;
            };
            `}]};function u(c){const o={p:"p",...v(),...c.components};return e.jsxs("div",{className:"content",children:[e.jsxs("h1",{children:["Checkbox v",void 0]}),e.jsx("p",{children:e.jsx(o.p,{children:"A UI element used in forms and user interfaces to allow users to make binary choices."})}),e.jsx("hr",{}),e.jsx("h3",{children:"Basic usage"}),e.jsx(a,{snippets:r.checkbox,children:e.jsx(p,{})}),e.jsx("hr",{}),e.jsx("h3",{children:"Checkbox label positioning"}),e.jsxs("p",{children:["Label positioning for checkboxes can be specified by using the ",e.jsx("b",{children:"labelPosition"})," property and use one of ",e.jsx("i",{children:"'top', 'start', 'end' or 'bottom'"}),"."]}),e.jsx(a,{snippets:r.checkboxLabelPosition,children:e.jsx(i,{})}),e.jsx("hr",{}),e.jsx("h3",{children:"Disabled checkbox"}),e.jsxs("p",{children:["Checkboxes can be disabled by using the ",e.jsx("b",{children:"disabled"})," property, that takes a ",e.jsx("i",{children:"boolean"})," value."]}),e.jsx(a,{snippets:r.disabledCheckbox,children:e.jsx(l,{})}),e.jsx("hr",{}),e.jsx("h3",{children:"Checkbox size"}),e.jsxs("p",{children:["Checkboxes can have different sizes by specifying the ",e.jsx("b",{children:"size"})," property, that takes one of ",e.jsx("i",{children:"'small' or 'medium'"})," string."]}),e.jsx(a,{snippets:r.checkboxSize,children:e.jsx(C,{})}),e.jsx("hr",{}),e.jsx("h3",{children:"Checkbox color"}),e.jsxs("p",{children:["Checkboxes can have different colors by using the ",e.jsx("b",{children:"color"})," property, that takes one of ",e.jsx("i",{children:"'default', 'primary', 'secondary', 'error', 'info', 'success' or 'warning'"})," strings."]}),e.jsx(a,{snippets:r.checkboxColor,children:e.jsx(m,{})}),e.jsx("hr",{}),e.jsx("h3",{children:"Checkbox in forms"}),e.jsxs("p",{children:["Checkboxes can be used in complex forms and support the react-hook-form library, a complete guide can be found in ",e.jsx("a",{href:"/?path=/docs/how-to-guides-forms--docs",target:"_BLANK",children:"UnifiedUI's Forms guide"}),"."]})]})}function w(c={}){const{wrapper:o}={...v(),...c.components};return o?e.jsx(o,{...c,children:e.jsx(u,{...c})}):u(c)}const G={title:"UnifiedUI/Checkbox",component:t,parameters:{docs:{page:w}}},n={render:c=>e.jsx(p,{...c})},d={render:c=>e.jsx(i,{...c})},x={render:c=>e.jsx(l,{...c})},k={render:c=>e.jsx(C,{...c})},b={render:c=>e.jsx(m,{...c})};var f,g,j;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: (args: any) => <CheckboxExample {...args} />
}`,...(j=(g=n.parameters)==null?void 0:g.docs)==null?void 0:j.source}}};var S,_,y;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: (args: any) => <CheckboxLabelPositioningExample {...args} />
}`,...(y=(_=d.parameters)==null?void 0:_.docs)==null?void 0:y.source}}};var E,z,P;x.parameters={...x.parameters,docs:{...(E=x.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: (args: any) => <DisabledCheckboxExample {...args} />
}`,...(P=(z=x.parameters)==null?void 0:z.docs)==null?void 0:P.source}}};var N,F,L;k.parameters={...k.parameters,docs:{...(N=k.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: (args: any) => <CheckboxSizeExample {...args} />
}`,...(L=(F=k.parameters)==null?void 0:F.docs)==null?void 0:L.source}}};var R,D,I;b.parameters={...b.parameters,docs:{...(R=b.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: (args: any) => <CheckboxColorExample {...args} />
}`,...(I=(D=b.parameters)==null?void 0:D.docs)==null?void 0:I.source}}};const H=["BaseCheckbox","CheckboxLabelPositioning","DisabledCheckbox","CheckboxSize","CheckboxColor"];export{n as BaseCheckbox,b as CheckboxColor,d as CheckboxLabelPositioning,k as CheckboxSize,x as DisabledCheckbox,H as __namedExportsOrder,G as default};
