import{j as e}from"./index-DrhACB-D.js";import{Q as d}from"./Upload-ChF5xKSK.js";import{r as b}from"./index-DQDNmYQF.js";import{useMDXComponents as l}from"./index-DmqVK_gK.js";import{S as p}from"./docs-CJ9d-umt.js";import"./index-BGiqdwja.js";import"./theming-C7i7v1dL.js";import"./tiny-invariant-CopsF_GD.js";const n=()=>{const[t,s]=b.useState("First"),u=[{title:"Link 1",value:"First"},{title:"Link 2",value:"Second"},{title:"Link 3",content:e.jsx("p",{children:"addons"}),value:"Third"},{title:"Disabled link",disabled:!0,value:"Fourth"}];return e.jsx(d,{tabs:u,selectedTab:t,setSelectedTab:s})};try{n.displayName="RoutingTabsWithHooks",n.__docgenInfo={description:"",displayName:"RoutingTabsWithHooks",props:{}}}catch{}const T={routingTabs:[{language:"jsx",snippet:`
                 <RoutingTabs
			        tabs={tabs}
			        selectedTab={selectedTab}
			        setSelectedTab={setSelectedTab}
		        />
            `,expandedSnippet:`
            import { useState } from 'react';
            import { RoutingTabs } from './RoutingTabs';
            
            export const RoutingTabsWithHooks: FC = () => {
                const [selectedTab, setSelectedTab] = useState<string | number>('First');

                const tabs = [
                    {
                        title: 'Link 1',
                        value: 'First',
                    },
                    {
                        title: 'Link 2',
                        value: 'Second',
                    },
                    { title: 'Link 3', content: <p>addons</p>, value: 'Third' },
                    { title: 'Disabled link', disabled: true, value: 'Fourth' },
                ];

                return (
                    <RoutingTabs
                        tabs={tabs}
                        selectedTab={selectedTab}
                        setSelectedTab={setSelectedTab}
                    />
                );
            };
            `},{language:"tsx",snippet:`
                <RoutingTabs
			        tabs={tabs}
			        selectedTab={selectedTab}
			        setSelectedTab={setSelectedTab}
		        />
            `,expandedSnippet:`
            import React, { useState } from 'react';
            import { RoutingTabs } from './RoutingTabs';
        
            
            export const RoutingTabsWithHooks: FC = () => {
                const [selectedTab, setSelectedTab] = useState<string | number>('First');

                const tabs = [
                    {
                        title: 'Link 1',
                        value: 'First',
                    },
                    {
                        title: 'Link 2',
                        value: 'Second',
                    },
                    { title: 'Link 3', content: <p>addons</p>, value: 'Third' },
                    { title: 'Disabled link', disabled: true, value: 'Fourth' },
                ];

                return (
                    <RoutingTabs
                        tabs={tabs}
                        selectedTab={selectedTab}
                        setSelectedTab={setSelectedTab}
                    />
                );
            };
            `}]};function o(t){const s={p:"p",...l(),...t.components};return e.jsxs("div",{className:"content",children:[e.jsxs("h1",{children:["RoutingTab v",void 0]}),e.jsx("p",{children:e.jsx(s.p,{children:`The RoutingTabs appears under the navbar and is used to navigate between\r
different pages of the application.`})}),e.jsx("hr",{}),e.jsx("h3",{children:"Basic usage"}),e.jsx(p,{snippets:T.routingTabs,children:e.jsx(n,{})})]})}function m(t={}){const{wrapper:s}={...l(),...t.components};return s?e.jsx(s,{...t,children:e.jsx(o,{...t})}):o(t)}const v={title:"UnifiedUI/RoutingTabs",component:d,parameters:{docs:{page:m}}},a={render:()=>e.jsx(n,{})};var i,r,c;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: () => <RoutingTabsWithHooks />
}`,...(c=(r=a.parameters)==null?void 0:r.docs)==null?void 0:c.source}}};const _=["Default"];export{a as Default,_ as __namedExportsOrder,v as default};
