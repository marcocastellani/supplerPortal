import{j as e}from"./index-DrhACB-D.js";import{t as r,v as p,d as h,q as s}from"./Upload-ChF5xKSK.js";import{r as x}from"./index-DQDNmYQF.js";import{useMDXComponents as l}from"./index-DmqVK_gK.js";import{S as u}from"./docs-CJ9d-umt.js";import"./index-BGiqdwja.js";import"./theming-C7i7v1dL.js";import"./tiny-invariant-CopsF_GD.js";const f=[{id:1,name:"Item 1",description:"Description of Item 1"},{id:2,name:"Item 2",description:"Description of Item 2"},{id:3,name:"Item 3",description:"Description of Item 3"},{id:4,name:"Item 4",description:"Description of Item 4"},{id:5,name:"Item 5",description:"Description of Item 5"},{id:6,name:"Item 6",description:"Description of Item 6"},{id:7,name:"Item 7",description:"Description of Item 7"},{id:8,name:"Item 8",description:"Description of Item 8"},{id:9,name:"Item 9",description:"Description of Item 9"},{id:10,name:"Item 10",description:"Description of Item 10"}],g=t=>e.jsxs(s,{container:!0,children:[e.jsx(s,{item:!0,xs:6,children:e.jsx(r,{variant:"body1",children:t.name})}),e.jsx(s,{item:!0,xs:6,children:e.jsx(r,{variant:"body2",color:"textSecondary",children:t.description})})]}),L=t=>{alert(`Action clicked on: ${t.name}`)},n=t=>{const[i]=x.useState(5);return e.jsxs("div",{children:[e.jsx(r,{variant:"h4",gutterBottom:!0,children:"ListView Example"}),e.jsx(p,{data:f,columns:g,header:"Item List",footer:"End of List",pageSize:i,pageable:!0,action:{icon:e.jsx(h,{name:"Plus"}),onClick:L},...t})]})};try{n.displayName="ListViewExample",n.__docgenInfo={description:"",displayName:"ListViewExample",props:{}}}catch{}const w={listView:[{language:"jsx",snippet:`
            <ListView
                data={data}
                columns={ListViewItem}
                pageSize={5}
                header={<h1>List View</h1>}
                footer={<p>{data.length} data(s) in total</p>}
                pageable
            />
            `,expandedSnippet:`
            import React from 'react';
            import { ListView } from './ListView';

            const ListViewItem = (item) => {
                return (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <h2>{item.id}</h2>
                        <p>
                            <b>{item.name}</b> ({item.email})
                        </p>
                    </div>
                );
            };

            export const ListViewExample = (props) => {
                const data = [
                    { id: 1, name: 'Mike Smith', email: 'mike.smith@email.com' },
                    { id: 2, name: 'Sade Bennett', email: 'sade.bennett@email.com' },
                    { id: 3, name: 'Larry Kirkpatrick', email: 'larry.kirkpatrick@email.com' },
                    { id: 4, name: 'Ethel Rodriguez', email: 'ethel.rodriguez@email.com' },
                ];

                return (
                    <ListView
                        data={data}
                        columns={ListViewItem}
                        pageSize={5}
                        header={<h1>List View</h1>}
                        footer={<p>{data.length} data(s) in total</p>}
                        pageable
                    />
                );
            };
            `},{language:"tsx",snippet:`
            <ListView
                data={data}
                columns={ListViewItem}
                pageSize={5}
                header={<h1>List View</h1>}
                footer={<p>{data.length} data(s) in total</p>}
                pageable
            />
            `,expandedSnippet:`
            import React, { FC } from 'react';
            import { ListView } from './ListView';

            const ListViewItem = (item: any) => {
                return (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <h2>{item.id}</h2>
                        <p>
                            <b>{item.name}</b> ({item.email})
                        </p>
                    </div>
                );
            };

            export const ListViewExample: FC = (props: any) => {
                const data: any[] = [
                    { id: 1, name: 'Mike Smith', email: 'mike.smith@email.com' },
                    { id: 2, name: 'Sade Bennett', email: 'sade.bennett@email.com' },
                    { id: 3, name: 'Larry Kirkpatrick', email: 'larry.kirkpatrick@email.com' },
                    { id: 4, name: 'Ethel Rodriguez', email: 'ethel.rodriguez@email.com' },
                ];

                return (
                    <ListView
                        data={data}
                        columns={ListViewItem}
                        pageSize={5}
                        header={<h1>List View</h1>}
                        footer={<p>{data.length} data(s) in total</p>}
                        pageable
                    />
                );
            };
            `}]};function o(t){const i={p:"p",...l(),...t.components};return e.jsxs("div",{className:"content",children:[e.jsxs("h1",{children:["ListView v",void 0]}),e.jsx("p",{children:e.jsx(i.p,{children:`A component used to display a collection of data items in a scrollable list
format.`})}),e.jsx("hr",{}),e.jsx("h3",{children:"Basic usage"}),e.jsx(u,{snippets:w.listView,children:e.jsx(n,{})})]})}function I(t={}){const{wrapper:i}={...l(),...t.components};return i?e.jsx(i,{...t,children:e.jsx(o,{...t})}):o(t)}const _={title:"UnifiedUI/ListView",component:p,parameters:{docs:{page:I}}},a={render:t=>e.jsx(n,{...t})};var m,d,c;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: (args: any) => <ListViewExample {...args} />
}`,...(c=(d=a.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};const v=["BaseListView"];export{a as BaseListView,v as __namedExportsOrder,_ as default};
