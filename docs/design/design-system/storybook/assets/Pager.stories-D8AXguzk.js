import{j as e}from"./index-DrhACB-D.js";import{z as i}from"./Upload-ChF5xKSK.js";import{r as o}from"./index-DQDNmYQF.js";import{useMDXComponents as u}from"./index-DmqVK_gK.js";import{S as w}from"./docs-CJ9d-umt.js";import"./index-BGiqdwja.js";import"./theming-C7i7v1dL.js";import"./tiny-invariant-CopsF_GD.js";const s=a=>{const[r,c]=o.useState(2),[m,d]=o.useState(0);return e.jsx(i,{total:10,page:m,paginationOptions:{rowsPerPage:r,rowsPerPageOptions:[2,3,5,10],setRowsPerPage:c},setPage:d,...a})};try{s.displayName="PagerExample",s.__docgenInfo={description:"",displayName:"PagerExample",props:{}}}catch{}const x={pager:[{language:"jsx",snippet:`
            <Pager
                total={10}
                page={page}
                paginationOptions={{
                    rowsPerPage: rowsPerPage,
                    rowsPerPageOptions: [2, 3, 5, 10],
                    setRowsPerPage: setRowsPerPage,
                }}
                setPage={setPage}
            />
            `,expandedSnippet:`
            import React, { FC, useState } from 'react';
            import { Pager } from './Pager';

            export const PagerExample: FC = (props: any) => {
                const [rowsPerPage, setRowsPerPage] = useState<number>(2);
                const [page, setPage] = useState<number>(0);

                return (
                    <Pager
                        total={10}
                        page={page}
                        paginationOptions={{
                            rowsPerPage: rowsPerPage,
                            rowsPerPageOptions: [2, 3, 5, 10],
                            setRowsPerPage: setRowsPerPage,
                        }}
                        setPage={setPage}
                    />
                );
            };
            `},{language:"tsx",snippet:`
            <Pager
                total={10}
                page={page}
                paginationOptions={{
                    rowsPerPage: rowsPerPage,
                    rowsPerPageOptions: [2, 3, 5, 10],
                    setRowsPerPage: setRowsPerPage,
                }}
                setPage={setPage}
            />
            `,expandedSnippet:`
            import React, { FC, useState } from 'react';
            import { Pager } from './Pager';

            export const PagerExample: FC = (props: any) => {
                const [rowsPerPage, setRowsPerPage] = useState<number>(2);
                const [page, setPage] = useState<number>(0);

                return (
                    <Pager
                        total={10}
                        page={page}
                        paginationOptions={{
                            rowsPerPage: rowsPerPage,
                            rowsPerPageOptions: [2, 3, 5, 10],
                            setRowsPerPage: setRowsPerPage,
                        }}
                        setPage={setPage}
                    />
                );
            };
            `}]};function n(a){return e.jsxs("div",{className:"content",children:[e.jsxs("h1",{children:["Pager v",void 0]}),e.jsx("p",{children:"Element used to manage paging."}),e.jsx("hr",{}),e.jsx("h3",{children:"Basic usage"}),e.jsx(w,{snippets:x.pager,children:e.jsx(s,{})})]})}function l(a={}){const{wrapper:r}={...u(),...a.components};return r?e.jsx(r,{...a,children:e.jsx(n,{...a})}):n()}const y={title:"UnifiedUI/Pager",component:i,parameters:{docs:{page:l}}},t={render:a=>e.jsx(s,{...a})};var g,p,P;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: (args: any) => <PagerExample {...args} />
}`,...(P=(p=t.parameters)==null?void 0:p.docs)==null?void 0:P.source}}};const C=["BasePager"];export{t as BasePager,C as __namedExportsOrder,y as default};
