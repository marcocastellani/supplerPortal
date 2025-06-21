import{j as t}from"./index-DrhACB-D.js";import{K as i}from"./Upload-ChF5xKSK.js";import{useMDXComponents as z}from"./index-DmqVK_gK.js";import{S as e}from"./docs-CJ9d-umt.js";import"./index-DQDNmYQF.js";import"./index-BGiqdwja.js";import"./theming-C7i7v1dL.js";import"./tiny-invariant-CopsF_GD.js";const c=o=>t.jsx(i,{sx:{width:"100%"},options:[{label:"Option 1",action:()=>{alert("Option 1")}},{label:"Option 2",action:()=>{alert("Option 2")}},{label:"Option 3",action:()=>{alert("Option 3")}}],...o}),d=o=>t.jsx(i,{variant:"contained",color:"primary",options:[{label:"Option 1",action:()=>{alert("Option 1")}},{label:"Option 2",action:()=>{alert("Option 2")}},{label:"Option 3",action:()=>{alert("Option 3")}}],...o}),u=o=>t.jsx(i,{options:[{label:"Option 1",action:()=>{alert("Option 1")}},{label:"Option 2",action:()=>{alert("Option 2")},disabled:!0},{label:"Option 3",action:()=>{alert("Option 3")},disabled:!0}],...o}),O=o=>t.jsx(i,{options:[{label:"Option 1",action:()=>{alert("Option 1")}},{label:"Option 2",action:()=>{alert("Option 2")}},{label:"Option 3",action:()=>{alert("Option 3")}}],size:"small",...o});try{c.displayName="SplitButtonExample",c.__docgenInfo={description:"",displayName:"SplitButtonExample",props:{}}}catch{}try{d.displayName="SplitButtonVariantAndColorExample",d.__docgenInfo={description:"",displayName:"SplitButtonVariantAndColorExample",props:{}}}catch{}try{u.displayName="DisabledSplitButtonExample",u.__docgenInfo={description:"",displayName:"DisabledSplitButtonExample",props:{}}}catch{}try{O.displayName="SplitButtonSizeExample",O.__docgenInfo={description:"",displayName:"SplitButtonSizeExample",props:{}}}catch{}const a={splitButton:[{language:"jsx",snippet:`
            <SplitButton
                options={[
                    {
                        label: 'Option 1',
                        action: () => {
                            alert('Option 1');
                        },
                    },
                    {
                        label: 'Option 2',
                        action: () => {
                            alert('Option 2');
                        },
                    },
                    {
                        label: 'Option 3',
                        action: () => {
                            alert('Option 3');
                        },
                    },
                ]}
            />
            `,expandedSnippet:`
            import React from 'react';
            import { SplitButton } from './SplitButton';

            export const SplitButtonExample = (props) => {
                return (
                    <SplitButton
                        options={[
                            {
                                label: 'Option 1',
                                action: () => {
                                    alert('Option 1');
                                },
                            },
                            {
                                label: 'Option 2',
                                action: () => {
                                    alert('Option 2');
                                },
                            },
                            {
                                label: 'Option 3',
                                action: () => {
                                    alert('Option 3');
                                },
                            },
                        ]}
                    />
                );
            };
            `},{language:"tsx",snippet:`
            <SplitButton
                options={[
                    {
                        label: 'Option 1',
                        action: () => {
                            alert('Option 1');
                        },
                    },
                    {
                        label: 'Option 2',
                        action: () => {
                            alert('Option 2');
                        },
                    },
                    {
                        label: 'Option 3',
                        action: () => {
                            alert('Option 3');
                        },
                    },
                ]}
            />
            `,expandedSnippet:`
            import React, { FC } from 'react';
            import { SplitButton } from './SplitButton';

            export const SplitButtonExample: FC = (props: any) => {
                return (
                    <SplitButton
                        options={[
                            {
                                label: 'Option 1',
                                action: () => {
                                    alert('Option 1');
                                },
                            },
                            {
                                label: 'Option 2',
                                action: () => {
                                    alert('Option 2');
                                },
                            },
                            {
                                label: 'Option 3',
                                action: () => {
                                    alert('Option 3');
                                },
                            },
                        ]}
                    />
                );
            };
            `}],splitButtonVariantAndColor:[{language:"jsx",snippet:`
            <SplitButton
                variant="contained"
                color="primary"
                options={[
                    {
                        label: 'Option 1',
                        action: () => {
                            alert('Option 1');
                        },
                    },
                    {
                        label: 'Option 2',
                        action: () => {
                            alert('Option 2');
                        },
                    },
                    {
                        label: 'Option 3',
                        action: () => {
                            alert('Option 3');
                        },
                    },
                ]}
            />
            `,expandedSnippet:`
            import React from 'react';
            import { SplitButton } from './SplitButton';

            export const SplitButtonVariantAndColorExample = (props) => {
                return (
                    <SplitButton
                        variant="contained"
                        color="primary"
                        options={[
                            {
                                label: 'Option 1',
                                action: () => {
                                    alert('Option 1');
                                },
                            },
                            {
                                label: 'Option 2',
                                action: () => {
                                    alert('Option 2');
                                },
                            },
                            {
                                label: 'Option 3',
                                action: () => {
                                    alert('Option 3');
                                },
                            },
                        ]}
                    />
                );
            };
            `},{language:"tsx",snippet:`
            <SplitButton
                variant="contained"
                color="primary"
                options={[
                    {
                        label: 'Option 1',
                        action: () => {
                            alert('Option 1');
                        },
                    },
                    {
                        label: 'Option 2',
                        action: () => {
                            alert('Option 2');
                        },
                    },
                    {
                        label: 'Option 3',
                        action: () => {
                            alert('Option 3');
                        },
                    },
                ]}
            />
            `,expandedSnippet:`
            import React, { FC } from 'react';
            import { SplitButton } from './SplitButton';

            export const SplitButtonVariantAndColorExample: FC = (props: any) => {
                return (
                    <SplitButton
                        variant="contained"
                        color="primary"
                        options={[
                            {
                                label: 'Option 1',
                                action: () => {
                                    alert('Option 1');
                                },
                            },
                            {
                                label: 'Option 2',
                                action: () => {
                                    alert('Option 2');
                                },
                            },
                            {
                                label: 'Option 3',
                                action: () => {
                                    alert('Option 3');
                                },
                            },
                        ]}
                    />
                );
            };
            `}],disabledSplitButton:[{language:"jsx",snippet:`
            <SplitButton
                options={[
                    {
                        label: 'Option 1',
                        action: () => {
                            alert('Option 1');
                        },
                    },
                    {
                        label: 'Option 2',
                        action: () => {
                            alert('Option 2');
                        },
                        disabled: true
                    },
                    {
                        label: 'Option 3',
                        action: () => {
                            alert('Option 3');
                        },
                        disabled: true
                    },
                ]}
            />
            `,expandedSnippet:`
            import React from 'react';
            import { SplitButton } from './SplitButton';

            export const DisabledSplitButtonExample = (props) => {
                return (
                    <SplitButton
                        options={[
                            {
                                label: 'Option 1',
                                action: () => {
                                    alert('Option 1');
                                },
                            },
                            {
                                label: 'Option 2',
                                action: () => {
                                    alert('Option 2');
                                },
                                disabled: true
                            },
                            {
                                label: 'Option 3',
                                action: () => {
                                    alert('Option 3');
                                },
                                disabled: true
                            },
                        ]}
                    />
                );
            };
            `},{language:"tsx",snippet:`
            <SplitButton
                options={[
                    {
                        label: 'Option 1',
                        action: () => {
                            alert('Option 1');
                        },
                    },
                    {
                        label: 'Option 2',
                        action: () => {
                            alert('Option 2');
                        },
                        disabled: true
                    },
                    {
                        label: 'Option 3',
                        action: () => {
                            alert('Option 3');
                        },
                    },
                    disabled: true
                ]}
            />
            `,expandedSnippet:`
            import React, { FC } from 'react';
            import { SplitButton } from './SplitButton';

            export const DisabledSplitButtonExample: FC = (props: any) => {
                return (
                    <SplitButton
                        options={[
                            {
                                label: 'Option 1',
                                action: () => {
                                    alert('Option 1');
                                },
                            },
                            {
                                label: 'Option 2',
                                action: () => {
                                    alert('Option 2');
                                },
                                disabled: true
                            },
                            {
                                label: 'Option 3',
                                action: () => {
                                    alert('Option 3');
                                },
                                disabled: true
                            },
                        ]}
                    />
                );
            };
            `}],splitButtonSize:[{language:"jsx",snippet:`
            <SplitButton
                options={[
                    {
                        label: 'Option 1',
                        action: () => {
                            alert('Option 1');
                        },
                    },
                    {
                        label: 'Option 2',
                        action: () => {
                            alert('Option 2');
                        },
                    },
                    {
                        label: 'Option 3',
                        action: () => {
                            alert('Option 3');
                        },
                    },
                ]}
                size="small"
            />
            `,expandedSnippet:`
            import React from 'react';
            import { SplitButton } from './SplitButton';

            export const SplitButtonSizeExample = (props) => {
                return (
                    <SplitButton
                        options={[
                            {
                                label: 'Option 1',
                                action: () => {
                                    alert('Option 1');
                                },
                            },
                            {
                                label: 'Option 2',
                                action: () => {
                                    alert('Option 2');
                                },
                            },
                            {
                                label: 'Option 3',
                                action: () => {
                                    alert('Option 3');
                                },
                            },
                        ]}
                        size="small"
                    />
                );
            };
            `},{language:"tsx",snippet:`
            <SplitButton
                options={[
                    {
                        label: 'Option 1',
                        action: () => {
                            alert('Option 1');
                        },
                    },
                    {
                        label: 'Option 2',
                        action: () => {
                            alert('Option 2');
                        },
                    },
                    {
                        label: 'Option 3',
                        action: () => {
                            alert('Option 3');
                        },
                    },
                ]}
                size="small"
            />
            `,expandedSnippet:`
            import React, { FC } from 'react';
            import { SplitButton } from './SplitButton';

            export const SplitButtonSizeExample: FC = (props: any) => {
                return (
                    <SplitButton
                        options={[
                            {
                                label: 'Option 1',
                                action: () => {
                                    alert('Option 1');
                                },
                            },
                            {
                                label: 'Option 2',
                                action: () => {
                                    alert('Option 2');
                                },
                            },
                            {
                                label: 'Option 3',
                                action: () => {
                                    alert('Option 3');
                                },
                            },
                        ]}
                        size="small"
                    />
                );
            };
            `}]};function m(o){const n={p:"p",...z(),...o.components};return t.jsxs("div",{className:"content",children:[t.jsxs("h1",{children:["SplitButton v",void 0]}),t.jsx("p",{children:t.jsx(n.p,{children:"Control element that is used to trigger actions in a list using a dropdown."})}),t.jsx("hr",{}),t.jsx("h3",{children:"Basic usage"}),t.jsx(e,{snippets:a.splitButton,children:t.jsx(c,{})}),t.jsx("hr",{}),t.jsx("h3",{children:"SplitButton variant and color"}),t.jsx("p",{children:t.jsxs(n.p,{children:["SplitButtons can have different variants and colors by using the"," ",`\r
`,t.jsx("b",{children:"variant"})," and ",t.jsx("b",{children:"color"})," properties."]})}),t.jsx(e,{snippets:a.splitButtonVariantAndColor,children:t.jsx(d,{})}),t.jsx("hr",{}),t.jsx("h3",{children:"Disabled SplitButton"}),t.jsx("p",{children:t.jsxs(n.p,{children:["SplitButtons can have disabled buttons by using the ",t.jsx("b",{children:"disabled"}),` property\r
on options.`]})}),t.jsx(e,{snippets:a.disabledSplitButton,children:t.jsx(u,{})}),t.jsx("hr",{}),t.jsx("h3",{children:"SplitButton size"}),t.jsx("p",{children:t.jsxs(n.p,{children:["SplitButtons can have different sizes by using the ",t.jsx("b",{children:"size"}),` property that\r
can be `,t.jsx("i",{children:'"small", "medium" or "large"'}),"."]})}),t.jsx(e,{snippets:a.splitButtonSize,children:t.jsx(O,{})})]})}function v(o={}){const{wrapper:n}={...z(),...o.components};return n?t.jsx(n,{...o,children:t.jsx(m,{...o})}):m(o)}const M={title:"UnifiedUI/SplitButton",component:i,parameters:{docs:{page:v}}},p={render:o=>t.jsx(c,{...o})},l={render:o=>t.jsx(d,{...o})},r={render:o=>t.jsx(u,{...o})},s={render:o=>t.jsx(O,{...o})};var S,x,b;p.parameters={...p.parameters,docs:{...(S=p.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: (args: any) => <SplitButtonExample {...args} />
}`,...(b=(x=p.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var B,h,j;l.parameters={...l.parameters,docs:{...(B=l.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: (args: any) => <SplitButtonVariantAndColorExample {...args} />
}`,...(j=(h=l.parameters)==null?void 0:h.docs)==null?void 0:j.source}}};var g,_,y;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: (args: any) => <DisabledSplitButtonExample {...args} />
}`,...(y=(_=r.parameters)==null?void 0:_.docs)==null?void 0:y.source}}};var f,E,C;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: (args: any) => <SplitButtonSizeExample {...args} />
}`,...(C=(E=s.parameters)==null?void 0:E.docs)==null?void 0:C.source}}};const X=["BaseSplitButton","SplitButtonVariantAndColor","DisabledSplitButton","SplitButtonSize"];export{p as BaseSplitButton,r as DisabledSplitButton,s as SplitButtonSize,l as SplitButtonVariantAndColor,X as __namedExportsOrder,M as default};
