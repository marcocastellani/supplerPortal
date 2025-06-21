import{j as e}from"./index-DrhACB-D.js";import{i as p}from"./Upload-ChF5xKSK.js";import{r as h}from"./index-DQDNmYQF.js";import{useMDXComponents as l}from"./index-DmqVK_gK.js";import{S as u}from"./docs-CJ9d-umt.js";import"./index-BGiqdwja.js";import"./theming-C7i7v1dL.js";import"./tiny-invariant-CopsF_GD.js";const r=t=>{const[s,m]=h.useState(!1);return e.jsx(p,{name:"sb-switch",value:s,setValue:m,...t})};try{r.displayName="SwitchExample",r.__docgenInfo={description:"",displayName:"SwitchExample",props:{}}}catch{}const d={switch:[{language:"jsx",snippet:'<Switch name="sb-switch" value={value} setValue={setValue} />',expandedSnippet:`
            import React, { FC, useState } from 'react';
            import { Switch } from './Switch';

            export const SwitchExample: FC = (props: any) => {
                const [value, setValue] = useState<boolean>(false);
                return <Switch name="sb-switch" value={value} setValue={setValue} />;
            };
            `},{language:"tsx",snippet:'<Switch name="sb-switch" value={value} setValue={setValue} />',expandedSnippet:`
            import React, { FC, useState } from 'react';
            import { Switch } from './Switch';

            export const SwitchExample: FC = (props: any) => {
                const [value, setValue] = useState<boolean>(false);
                return <Switch name="sb-switch" value={value} setValue={setValue} />;
            };
            `}]};function n(t){const s={p:"p",...l(),...t.components};return e.jsxs("div",{className:"content",children:[e.jsxs("h1",{children:["Switch v",void 0]}),e.jsx("p",{children:"Control element that allows user to switch a selection."}),e.jsx("hr",{}),e.jsx("h3",{children:"Basic usage"}),e.jsx(u,{snippets:d.switch,children:e.jsx(r,{})}),e.jsx("hr",{}),e.jsx("h3",{children:"Switch in forms"}),e.jsxs("p",{children:[e.jsxs(s.p,{children:[`Switches can be used in complex forms and support the react-hook-form\r
library, a complete guide can be found in`," "]}),e.jsx("a",{href:"/?path=/docs/how-to-guides-forms--docs",target:"_BLANK",children:e.jsx(s.p,{children:"UnifiedUI's Forms guide"})}),e.jsx(s.p,{children:"."})]})]})}function x(t={}){const{wrapper:s}={...l(),...t.components};return s?e.jsx(s,{...t,children:e.jsx(n,{...t})}):n(t)}const b={title:"UnifiedUI/Switch",component:p,parameters:{docs:{page:x}}},a={render:t=>e.jsx(r,{...t})};var o,c,i;a.parameters={...a.parameters,docs:{...(o=a.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: (args: any) => <SwitchExample {...args} />
}`,...(i=(c=a.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};const y=["BaseSwitch"];export{a as BaseSwitch,y as __namedExportsOrder,b as default};
