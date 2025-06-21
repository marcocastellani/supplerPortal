import{j as o}from"./index-DrhACB-D.js";import{y as s,d as g}from"./Upload-ChF5xKSK.js";import{useMDXComponents as I}from"./index-DmqVK_gK.js";import{S as a}from"./docs-CJ9d-umt.js";import"./index-DQDNmYQF.js";import"./index-BGiqdwja.js";import"./theming-C7i7v1dL.js";import"./tiny-invariant-CopsF_GD.js";const p=t=>o.jsx(s,{content:"Base Tooltip",...t,children:o.jsx(g,{name:"Info"})}),r=t=>o.jsx(s,{content:"Tooltip on the right",position:"right",...t,children:o.jsx(g,{name:"Info"})});try{p.displayName="TooltipExample",p.__docgenInfo={description:"",displayName:"TooltipExample",props:{}}}catch{}try{r.displayName="TooltipPositionExample",r.__docgenInfo={description:"",displayName:"TooltipPositionExample",props:{}}}catch{}const c={tooltip:[{language:"jsx",snippet:`
            <Tooltip content="Base Tooltip">
                <Icon name="Info" />
            </Tooltip>
            `,expandedSnippet:`
            import React from 'react';
            import { Icon } from '../Icon';
            import { Tooltip } from './Tooltip';

            export const TooltipExample = (props) => {
                return (
                    <Tooltip content="Base Tooltip">
                        <Icon name="Info" />
                    </Tooltip>
                );
            };
            `},{language:"tsx",snippet:`
            <Tooltip content="Base Tooltip">
                <Icon name="Info" />
            </Tooltip>
            `,expandedSnippet:`
            import React, { FC } from 'react';
            import { Icon } from '../Icon';
            import { Tooltip } from './Tooltip';

            export const TooltipExample: FC = (props: any) => {
                return (
                    <Tooltip content="Base Tooltip">
                        <Icon name="Info" />
                    </Tooltip>
                );
            };
            `}],tooltipPosition:[{language:"jsx",snippet:`
            <Tooltip content="Tooltip on the right" position="right">
                <Icon name="Info" />
            </Tooltip>
            `,expandedSnippet:`
            import React from 'react';
            import { Icon } from '../Icon';
            import { Tooltip } from './Tooltip';

            export const TooltipPositionExample = (props) => {
                return (
                    <Tooltip content="Tooltip on the right" position="right">
                        <Icon name="Info" />
                    </Tooltip>
                );
            };
            `},{language:"tsx",snippet:`
            <Tooltip content="Tooltip on the right" position="right">
                <Icon name="Info" />
            </Tooltip>
            `,expandedSnippet:`
            import React, { FC } from 'react';
            import { Icon } from '../Icon';
            import { Tooltip } from './Tooltip';

            
            export const TooltipPositionExample: FC = (props: any) => {
                return (
                    <Tooltip content="Tooltip on the right" position="right">
                        <Icon name="Info" />
                    </Tooltip>
                );
            };
            `}]};function l(t){const e={p:"p",...I(),...t.components};return o.jsxs("div",{className:"content",children:[o.jsxs("h1",{children:["Tooltip v",void 0]}),o.jsx("p",{children:"Layout component that creates a hoverable tooltip."}),o.jsx("hr",{}),o.jsx("h3",{children:"Basic usage"}),o.jsx(a,{snippets:c.tooltip,children:o.jsx(p,{})}),o.jsx("hr",{}),o.jsx("h3",{children:"Tooltip position"}),o.jsxs("p",{children:[o.jsxs(e.p,{children:["Tooltips can have different positions which can be specified by using the"," ",`\r
`,o.jsx("b",{children:"position"})," property, that can have the"," "]}),o.jsx("i",{children:o.jsx(e.p,{children:`'bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left',\r
'right-end', 'right-start', 'right', 'top-end', 'top-start' or 'top'`})}),o.jsx(e.p,{children:"."})]}),o.jsx(a,{snippets:c.tooltipPosition,children:o.jsx(r,{})})]})}function j(t={}){const{wrapper:e}={...I(),...t.components};return e?o.jsx(e,{...t,children:o.jsx(l,{...t})}):l(t)}const C={title:"UnifiedUI/Tooltip",component:s,parameters:{docs:{page:j}}},n={render:t=>o.jsx(p,{...t})},i={render:t=>o.jsx(r,{...t})};var m,d,T;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: (args: any) => <TooltipExample {...args} />
}`,...(T=(d=n.parameters)==null?void 0:d.docs)==null?void 0:T.source}}};var x,h,f;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: (args: any) => <TooltipPositionExample {...args} />
}`,...(f=(h=i.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};const v=["BaseTooltip","TooltipPosition"];export{n as BaseTooltip,i as TooltipPosition,v as __namedExportsOrder,C as default};
