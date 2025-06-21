import{j as t}from"./index-DrhACB-D.js";import{V as l,d as o}from"./Upload-ChF5xKSK.js";import{r as h}from"./index-DQDNmYQF.js";import{useMDXComponents as u}from"./index-DmqVK_gK.js";import{S as m}from"./docs-CJ9d-umt.js";import"./index-BGiqdwja.js";import"./theming-C7i7v1dL.js";import"./tiny-invariant-CopsF_GD.js";const i=e=>{const[a,d]=h.useState(0),b=[{title:"First tab",content:t.jsx("p",{children:"This is the first, selected tab."}),value:0},{title:"Second tab",popperOptions:[{title:"Page 1",content:t.jsx("p",{children:"Page 1"}),value:4},{title:"Page 2",content:t.jsx("p",{children:"Page 2"}),value:5},{title:"Page 3",content:t.jsx("p",{children:"Page 3"}),value:6}],content:t.jsx("p",{children:"Second tab content."}),value:1},{title:t.jsxs("p",{children:["Third tab, but disabled ",t.jsx(o,{name:"Lock"})]}),content:t.jsx("p",{children:"This is the third tab, but it is disabled"}),disabled:!0,value:2},{title:t.jsxs("p",{children:["Fourth tab ",t.jsx(o,{name:"Rocket"})]}),content:t.jsx("p",{children:"This is the fourth tab, with an icon in the title!"}),value:3}];return t.jsx(l,{tabs:b,selectedTab:a,setSelectedTab:d,theme:"light",...e})};try{i.displayName="TabNavigatorExample",i.__docgenInfo={description:"",displayName:"TabNavigatorExample",props:{}}}catch{}const T={tabNavigator:[{language:"jsx",snippet:`
            <TabNavigator
                tabs={tabs}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
            />
            `,expandedSnippet:`
            import React, { useState } from 'react';
            import { Icon } from '../Icon';
            import { TabNavigator } from './TabNavigator';

            export const TabNavigatorExample = (props) => {
                const [selectedTab, setSelectedTab] = useState(0);

                const tabs = [
                    {
                        title: 'First tab',
                        content: <p>This is the first, selected tab.</p>,
                        value: 0,
                    },
                    {
                        title: 'Second tab',
                        content: <p>And this is the second tab.</p>,
                        value: 1,
                    },
                    {
                        title: (
                            <p>
                                Third tab, but disabled <Icon name="Lock" />
                            </p>
                        ),
                        content: <p>This is the third tab, but it is disabled</p>,
                        disabled: true,
                        value: 2,
                    },
                    {
                        title: (
                            <p>
                                Fourth tab <Icon name="Rocket" />
                            </p>
                        ),
                        content: <p>This is the fourth tab, with an icon in the title!</p>,
                        value: 3,
                    },
                ];

                return (
                    <TabNavigator
                        tabs={tabs}
                        selectedTab={selectedTab}
                        setSelectedTab={setSelectedTab}
                    />
                );
            };
            `},{language:"tsx",snippet:`
            <TabNavigator
                tabs={tabs}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
            />
            `,expandedSnippet:`
            import React, { FC, useState } from 'react';
            import { Icon } from '../Icon';
            import { TabNavigator } from './TabNavigator';

            export const TabNavigatorExample: FC = (props: any) => {
                const [selectedTab, setSelectedTab] = useState<number>(0);

                const tabs = [
                    {
                        title: 'First tab',
                        content: <p>This is the first, selected tab.</p>,
                        value: 0,
                    },
                    {
                        title: 'Second tab',
                        content: <p>And this is the second tab.</p>,
                        value: 1,
                    },
                    {
                        title: (
                            <p>
                                Third tab, but disabled <Icon name="Lock" />
                            </p>
                        ),
                        content: <p>This is the third tab, but it is disabled</p>,
                        disabled: true,
                        value: 2,
                    },
                    {
                        title: (
                            <p>
                                Fourth tab <Icon name="Rocket" />
                            </p>
                        ),
                        content: <p>This is the fourth tab, with an icon in the title!</p>,
                        value: 3,
                    },
                ];

                return (
                    <TabNavigator
                        tabs={tabs}
                        selectedTab={selectedTab}
                        setSelectedTab={setSelectedTab}
                    />
                );
            };
            `}]};function n(e){return t.jsxs("div",{className:"content",children:[t.jsxs("h1",{children:["TabNavigator v",void 0]}),t.jsx("p",{children:"Layout component that creates a tab navigation."}),t.jsx("hr",{}),t.jsx("h3",{children:"Basic usage"}),t.jsx(m,{snippets:T.tabNavigator,children:t.jsx(i,{})})]})}function g(e={}){const{wrapper:a}={...u(),...e.components};return a?t.jsx(a,{...e,children:t.jsx(n,{...e})}):n()}const E={title:"UnifiedUI/TabNavigator",component:l,parameters:{docs:{page:g}}},s={render:e=>t.jsx(i,{...e})};var r,c,p;s.parameters={...s.parameters,docs:{...(r=s.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: (args: any) => <TabNavigatorExample {...args} />
}`,...(p=(c=s.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};const y=["BaseTabNavigator"];export{s as BaseTabNavigator,y as __namedExportsOrder,E as default};
