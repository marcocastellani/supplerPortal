import{j as t}from"./index-DrhACB-D.js";import{s as c,d as L}from"./Upload-ChF5xKSK.js";import{R as l}from"./index-DQDNmYQF.js";import{useMDXComponents as B}from"./index-DmqVK_gK.js";import{S as h}from"./docs-CJ9d-umt.js";import"./index-BGiqdwja.js";import"./theming-C7i7v1dL.js";import"./tiny-invariant-CopsF_GD.js";const o=e=>{const[s,p]=l.useState([{label:"Item 1",value:1},{label:"Item 2",value:2},{label:"Item 3",value:3}]),[x,u]=l.useState([]),d=[{items:s,setItems:p,title:t.jsxs(t.Fragment,{children:[t.jsx(L,{name:"House"})," test"]}),emptyLabel:"List 1 is empty"},{items:x,setItems:u,title:"List 2",emptyLabel:"List 2 is empty",limit:1,limitText:"Max elements: "}];return t.jsx(c,{lists:d,listSelectionText:"Select destination list...",checkedMoveTooltip:"Check items you want to move, select a list and transfer them.",enableMoveCheckedButtons:!0,enableDeleteButton:!0,...e})};try{o.displayName="ListBoxExample",o.__docgenInfo={description:"",displayName:"ListBoxExample",props:{}}}catch{}const b={listBox:[{language:"jsx",snippet:`
            <ListBox
                lists={lists}
                listSelectionText="Select destination list..."
                checkedMoveTooltip="Check items you want to move, select a list and transfer them."
                enableMoveCheckedButtons={true}
                enableDeleteButton={true}
            />
            `,expandedSnippet:`
            import React, { FC } from 'react';
            import { ListBox, ListBoxOption } from './ListBox';
            export const ListBoxExample: FC = (props: any) => {
                const [list1, setList1] = React.useState<ListBoxOption[]>([
                    { label: 'Item 1', value: 1 },
                    { label: 'Item 2', value: 2 },
                    { label: 'Item 3', value: 3 },
                ]);

                const [list2, setList2] = React.useState<ListBoxOption[]>([]);

                const lists = [
                    {
                        items: list1,
                        setItems: setList1,
                        title: 'List 1',
                        emptyLabel: 'List 1 is empty',
                    },
                    {
                        items: list2,
                        setItems: setList2,
                        title: 'List 2',
                        emptyLabel: 'List 2 is empty',
                    },
                ];

                return (
                    <ListBox
                        lists={lists}
                        listSelectionText="Select destination list..."
                        checkedMoveTooltip="Check items you want to move, select a list and transfer them."
                        enableMoveCheckedButtons={true}
                        enableDeleteButton={true}
                    />
                );
            };

            `},{language:"tsx",snippet:`
            <ListBox
                lists={lists}
                listSelectionText="Select destination list..."
                checkedMoveTooltip="Check items you want to move, select a list and transfer them."
                enableMoveCheckedButtons={true}
                enableDeleteButton={true}
            />
            `,expandedSnippet:`
            import React, { FC } from 'react';
            import { ListBox, ListBoxOption } from './ListBox';
            export const ListBoxExample: FC = (props: any) => {
                const [list1, setList1] = React.useState<ListBoxOption[]>([
                    { label: 'Item 1', value: 1 },
                    { label: 'Item 2', value: 2 },
                    { label: 'Item 3', value: 3 },
                ]);

                const [list2, setList2] = React.useState<ListBoxOption[]>([]);

                const lists = [
                    {
                        items: list1,
                        setItems: setList1,
                        title: 'List 1',
                        emptyLabel: 'List 1 is empty',
                    },
                    {
                        items: list2,
                        setItems: setList2,
                        title: 'List 2',
                        emptyLabel: 'List 2 is empty',
                    },
                ];

                return (
                    <ListBox
                        lists={lists}
                        listSelectionText="Select destination list..."
                        checkedMoveTooltip="Check items you want to move, select a list and transfer them."
                        enableMoveCheckedButtons={true}
                        enableDeleteButton={true}
                    />
                );
            };

            `}]};function a(e){return t.jsxs("div",{className:"content",children:[t.jsxs("h1",{children:["ListBox  v",void 0]}),t.jsx("p",{children:"Component that displays some transferrable lists."}),t.jsx("hr",{}),t.jsx("h3",{children:"Basic Usage"}),t.jsx(h,{snippets:b.listBox,children:t.jsx(o,{})})]})}function v(e={}){const{wrapper:s}={...B(),...e.components};return s?t.jsx(s,{...e,children:t.jsx(a,{...e})}):a()}const g={title:"UnifiedUI/ListBox",component:c,parameters:{docs:{page:v}}},i={render:e=>t.jsx(o,{...e})};var n,r,m;i.parameters={...i.parameters,docs:{...(n=i.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: (args: any) => <ListBoxExample {...args} />
}`,...(m=(r=i.parameters)==null?void 0:r.docs)==null?void 0:m.source}}};const T=["BaseListBox"];export{i as BaseListBox,T as __namedExportsOrder,g as default};
