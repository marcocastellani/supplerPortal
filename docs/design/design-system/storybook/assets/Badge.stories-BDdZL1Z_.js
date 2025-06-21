import{j as e}from"./index-DrhACB-D.js";import{k as s,d as u}from"./Upload-ChF5xKSK.js";import{useMDXComponents as h}from"./index-DmqVK_gK.js";import{S as p}from"./docs-CJ9d-umt.js";import"./index-DQDNmYQF.js";import"./index-BGiqdwja.js";import"./theming-C7i7v1dL.js";import"./tiny-invariant-CopsF_GD.js";const i=t=>e.jsx(s,{amount:5,...t,children:e.jsx(u,{name:"Notifications"})}),r=t=>e.jsx(s,{amount:5,position:{horizontal:"right",vertical:"bottom"},...t,children:e.jsx(u,{name:"Notifications"})});try{i.displayName="BadgeExample",i.__docgenInfo={description:"",displayName:"BadgeExample",props:{}}}catch{}try{r.displayName="DifferentPositionBadgeExample",r.__docgenInfo={description:"",displayName:"DifferentPositionBadgeExample",props:{}}}catch{}const d={badge:[{language:"jsx",snippet:`
            <Badge amount={5}>
                <Icon name="Notifications" />
            </Badge>`,expandedSnippet:`
            import React from 'react';
            import { Badge } from './Badge';

            export const BadgeExample = (props) => {
                return (
                    <Badge amount={5}>
                        <Icon name="Notifications" />
                    </Badge>
                );
            };

            `},{language:"tsx",snippet:`
            <Badge amount={5}>
                <Icon name="Notifications" />
            </Badge>`,expandedSnippet:`
            import React, { FC } from 'react';
            import { Badge } from './Badge';

            export const BadgeExample: FC = (props: any) => {
                return (
                    <Badge amount={5}>
                        <Icon name="Notifications" />
                    </Badge>
                );
            };
            `}],differentPositionBadge:[{language:"jsx",snippet:`
            <Badge amount={5} position={{ horizontal: 'right', vertical: 'bottom' }}>
                <Icon name="Notifications" />
            </Badge>`,expandedSnippet:`
            import React from 'react';
            import { Badge } from './Badge';

            export const BadgeExample = (props) => {
                return (
                    <Badge amount={5} position={{ horizontal: 'right', vertical: 'bottom' }}>
                        <Icon name="Notifications" />
                    </Badge>
                );
            };

            `},{language:"tsx",snippet:`
            <Badge amount={5} position={{ horizontal: 'right', vertical: 'bottom' }}>
                <Icon name="Notifications" />
            </Badge>`,expandedSnippet:`
            import React, { FC } from 'react';
            import { Badge } from './Badge';

            export const BadgeExample: FC = (props: any) => {
                return (
                    <Badge amount={5} position={{ horizontal: 'right', vertical: 'bottom' }}>
                        <Icon name="Notifications" />
                    </Badge>
                );
            };
            `}]};function c(t){const o={p:"p",...h(),...t.components};return e.jsxs("div",{className:"content",children:[e.jsxs("h1",{children:["Badge v",void 0]}),e.jsx("p",{children:e.jsx(o.p,{children:"A visual element used to display concise and important information within a webpage, such as notification amounts."})}),e.jsx("hr",{}),e.jsx("h3",{children:"Basic badge showing 5 notifications"}),e.jsx(p,{snippets:d.badge,children:e.jsx(i,{})}),e.jsx("hr",{}),e.jsx("h3",{children:"Badge showing in a different position"}),e.jsx(p,{snippets:d.differentPositionBadge,children:e.jsx(r,{})})]})}function j(t={}){const{wrapper:o}={...h(),...t.components};return o?e.jsx(o,{...t,children:e.jsx(c,{...t})}):c(t)}const P={title:"UnifiedUI/Badge",component:s,parameters:{docs:{page:j}}},a={render:t=>e.jsx(i,{...t})},n={render:t=>e.jsx(r,{...t})};var m,g,l;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: (args: any) => <BadgeExample {...args} />
}`,...(l=(g=a.parameters)==null?void 0:g.docs)==null?void 0:l.source}}};var f,x,B;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: (args: any) => <DifferentPositionBadgeExample {...args} />
}`,...(B=(x=n.parameters)==null?void 0:x.docs)==null?void 0:B.source}}};const S=["BaseBadge","BadgeWithDifferentPosition"];export{n as BadgeWithDifferentPosition,a as BaseBadge,S as __namedExportsOrder,P as default};
