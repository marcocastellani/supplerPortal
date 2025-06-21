import{j as e}from"./index-DrhACB-D.js";import{X as o}from"./Upload-ChF5xKSK.js";import{r as p}from"./index-DQDNmYQF.js";import{useMDXComponents as f}from"./index-DmqVK_gK.js";import{S as h}from"./docs-CJ9d-umt.js";import"./index-BGiqdwja.js";import"./theming-C7i7v1dL.js";import"./tiny-invariant-CopsF_GD.js";const i=t=>{const[s,m]=p.useState([]),c=[{id:"test1",label:"first element"},{id:"test2",label:"second element with leafs",children:[{id:"test3",label:"some leaf leaf"}]},{id:"test4",label:"third element"},{id:"test5",label:"fourth element with leafs",children:[{id:"test6",label:"first leaf",children:[{id:"test7",label:"nested element with leafs",children:[{id:"test8",label:"nested leaf"}]}]}]}];return e.jsx(o,{items:c,selectedItems:s,setSelectedItems:m,multiSelect:!0,...t})};try{i.displayName="TreeViewExample",i.__docgenInfo={description:"",displayName:"TreeViewExample",props:{}}}catch{}const w={treeview:[{language:"jsx",snippet:"<TreeView items={treeViewItems} />",expandedSnippet:`
            import { FC } from 'react';
            import { TreeView } from './TreeView';

            export const TreeViewExample = (props) => {
                const treeViewItems = [
                    {
                        id: 'test1',
                        label: 'first element',
                    },
                    {
                        id: 'test2',
                        label: 'second element with leafs',
                        children: [
                            {
                                id: 'test3',
                                label: 'some leaf leaf',
                            },
                        ],
                    },
                    {
                        id: 'test4',
                        label: 'third element',
                    },
                    {
                        id: 'test5',
                        label: 'fourth element with leafs',
                        children: [
                            {
                                id: 'test6',
                                label: 'first leaf',
                                children: [
                                    {
                                        id: 'test7',
                                        label: 'nested element with leafs',
                                        children: [
                                            {
                                                id: 'test8',
                                                label: 'nested leaf',
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ];

                return <TreeView items={treeViewItems} />;
            };
            `},{language:"tsx",snippet:"<TreeView items={treeViewItems} />",expandedSnippet:`
            import { FC } from 'react';
            import { TreeView } from './TreeView';

            export const TreeViewExample: FC = (props: any) => {
                const treeViewItems = [
                    {
                        id: 'test1',
                        label: 'first element',
                    },
                    {
                        id: 'test2',
                        label: 'second element with leafs',
                        children: [
                            {
                                id: 'test3',
                                label: 'some leaf leaf',
                            },
                        ],
                    },
                    {
                        id: 'test4',
                        label: 'third element',
                    },
                    {
                        id: 'test5',
                        label: 'fourth element with leafs',
                        children: [
                            {
                                id: 'test6',
                                label: 'first leaf',
                                children: [
                                    {
                                        id: 'test7',
                                        label: 'nested element with leafs',
                                        children: [
                                            {
                                                id: 'test8',
                                                label: 'nested leaf',
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ];

                return <TreeView items={treeViewItems} />;
            };
            `}]};function l(t){return e.jsxs("div",{className:"content",children:[e.jsxs("h1",{children:["TreeView v",void 0]}),e.jsx("p",{children:"Component that lets users navigate hierarchical lists of data with nested levels that can be expanded and collapsed."}),e.jsx("hr",{}),e.jsx("h3",{children:"Basic usage"}),e.jsx(h,{snippets:w.treeview,children:e.jsx(i,{})})]})}function x(t={}){const{wrapper:s}={...f(),...t.components};return s?e.jsx(s,{...t,children:e.jsx(l,{...t})}):l()}const E={title:"UnifiedUI/TreeView",component:o,parameters:{docs:{page:x}}},r={render:t=>e.jsx(i,{...t})};var a,n,d;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: (args: any) => <TreeViewExample {...args} />
}`,...(d=(n=r.parameters)==null?void 0:n.docs)==null?void 0:d.source}}};const S=["BaseTreeView"];export{r as BaseTreeView,S as __namedExportsOrder,E as default};
