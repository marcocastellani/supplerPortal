import{j as a}from"./index-DrhACB-D.js";import{Y as fa,Z as Ja,_ as Ha,$ as Da,a0 as wa,a1 as Ma,a2 as Pa,a3 as we,a4 as le,a5 as Oa,a6 as ba,a7 as Va,a8 as Ga,a9 as ve,e as n,d as za,aa as ka}from"./Upload-ChF5xKSK.js";import{r as C,R as Ba}from"./index-DQDNmYQF.js";import{u as Ua,c as xa,a as $a,b as Xa}from"./theming-C7i7v1dL.js";import{useMDXComponents as ya}from"./index-DmqVK_gK.js";import{S as u}from"./docs-CJ9d-umt.js";import"./index-BGiqdwja.js";import"./tiny-invariant-CopsF_GD.js";const qa=fa(a.jsx("path",{d:"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"}),"Star"),Wa=fa(a.jsx("path",{d:"M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"}),"StarBorder");function Ya(e){return Ha("MuiRating",e)}const V=Ja("MuiRating",["root","sizeSmall","sizeMedium","sizeLarge","readOnly","disabled","focusVisible","visuallyHidden","pristine","label","labelEmptyValueActive","icon","iconEmpty","iconFilled","iconHover","iconFocus","iconActive","decimal"]);function Za(e){const t=e.toString().split(".")[1];return t?t.length:0}function Te(e,t){if(e==null)return e;const i=Math.round(e/t)*t;return Number(i.toFixed(Za(t)))}const Ka=e=>{const{classes:t,size:i,readOnly:m,disabled:l,emptyValueFocused:d,focusVisible:g}=e,N={root:["root",`size${xa(i)}`,l&&"disabled",g&&"focusVisible",m&&"readOnly"],label:["label","pristine"],labelEmptyValue:[d&&"labelEmptyValueActive"],icon:["icon"],iconEmpty:["iconEmpty"],iconFilled:["iconFilled"],iconHover:["iconHover"],iconFocus:["iconFocus"],iconActive:["iconActive"],decimal:["decimal"],visuallyHidden:["visuallyHidden"]};return Oa(N,Ya,t)},Qa=we("span",{name:"MuiRating",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:i}=e;return[{[`& .${V.visuallyHidden}`]:t.visuallyHidden},t.root,t[`size${xa(i.size)}`],i.readOnly&&t.readOnly]}})(ba(({theme:e})=>({display:"inline-flex",position:"relative",fontSize:e.typography.pxToRem(24),color:"#faaf00",cursor:"pointer",textAlign:"left",width:"min-content",WebkitTapHighlightColor:"transparent",[`&.${V.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity,pointerEvents:"none"},[`&.${V.focusVisible} .${V.iconActive}`]:{outline:"1px solid #999"},[`& .${V.visuallyHidden}`]:Va,variants:[{props:{size:"small"},style:{fontSize:e.typography.pxToRem(18)}},{props:{size:"large"},style:{fontSize:e.typography.pxToRem(30)}},{props:({ownerState:t})=>t.readOnly,style:{pointerEvents:"none"}}]}))),Ta=we("label",{name:"MuiRating",slot:"Label",overridesResolver:({ownerState:e},t)=>[t.label,e.emptyValueFocused&&t.labelEmptyValueActive]})({cursor:"inherit",variants:[{props:({ownerState:e})=>e.emptyValueFocused,style:{top:0,bottom:0,position:"absolute",outline:"1px solid #999",width:"100%"}}]}),et=we("span",{name:"MuiRating",slot:"Icon",overridesResolver:(e,t)=>{const{ownerState:i}=e;return[t.icon,i.iconEmpty&&t.iconEmpty,i.iconFilled&&t.iconFilled,i.iconHover&&t.iconHover,i.iconFocus&&t.iconFocus,i.iconActive&&t.iconActive]}})(ba(({theme:e})=>({display:"flex",transition:e.transitions.create("transform",{duration:e.transitions.duration.shortest}),pointerEvents:"none",variants:[{props:({ownerState:t})=>t.iconActive,style:{transform:"scale(1.2)"}},{props:({ownerState:t})=>t.iconEmpty,style:{color:(e.vars||e).palette.action.disabled}}]}))),at=we("span",{name:"MuiRating",slot:"Decimal",shouldForwardProp:e=>Ga(e)&&e!=="iconActive",overridesResolver:(e,t)=>{const{iconActive:i}=e;return[t.decimal,i&&t.iconActive]}})({position:"relative",variants:[{props:({iconActive:e})=>e,style:{transform:"scale(1.2)"}}]});function tt(e){const{value:t,...i}=e;return a.jsx("span",{...i})}function Ie(e){const{classes:t,disabled:i,emptyIcon:m,focus:l,getLabelText:d,highlightSelectedOnly:g,hover:N,icon:f,IconContainerComponent:R,isActive:L,itemValue:c,labelProps:A,name:J,onBlur:S,onChange:be,onClick:E,onFocus:F,readOnly:G,ownerState:H,ratingValue:o,ratingValueRounded:x}=e,v=g?c===o:c<=o,z=c<=N,k=c<=l,D=c===x,B=`${J}-${wa()}`,M=a.jsx(et,{as:R,value:c,className:le(t.icon,v?t.iconFilled:t.iconEmpty,z&&t.iconHover,k&&t.iconFocus,L&&t.iconActive),ownerState:{...H,iconEmpty:!v,iconFilled:v,iconHover:z,iconFocus:k,iconActive:L},children:m&&!v?m:f});return G?a.jsx("span",{...A,children:M}):a.jsxs(C.Fragment,{children:[a.jsxs(Ta,{ownerState:{...H,emptyValueFocused:void 0},htmlFor:B,...A,children:[M,a.jsx("span",{className:t.visuallyHidden,children:d(c)})]}),a.jsx("input",{className:t.visuallyHidden,onFocus:F,onBlur:S,onChange:be,onClick:E,disabled:i,value:c,id:B,type:"radio",name:J,checked:D})]})}const it=a.jsx(qa,{fontSize:"inherit"}),rt=a.jsx(Wa,{fontSize:"inherit"});function st(e){return`${e||"0"} Star${e!==1?"s":""}`}const Ca=C.forwardRef(function(t,i){const m=Da({name:"MuiRating",props:t}),{component:l="span",className:d,defaultValue:g=null,disabled:N=!1,emptyIcon:f=rt,emptyLabelText:R="Empty",getLabelText:L=st,highlightSelectedOnly:c=!1,icon:A=it,IconContainerComponent:J=tt,max:S=5,name:be,onChange:E,onChangeActive:F,onMouseLeave:G,onMouseMove:H,precision:o=1,readOnly:x=!1,size:v="medium",value:z,...k}=m,D=wa(be),[B,M]=Ma({controlled:z,default:g,name:"Rating"}),U=Te(B,o),La=Ua(),[{hover:w,focus:$},P]=C.useState({hover:-1,focus:-1});let I=U;w!==-1&&(I=w),$!==-1&&(I=$);const[Sa,xe]=C.useState(!1),Se=C.useRef(),Ea=Pa(Se,i),Fa=r=>{H&&H(r);const s=Se.current,{right:p,left:X,width:_}=s.getBoundingClientRect();let j;La?j=(p-r.clientX)/_:j=(r.clientX-X)/_;let b=Te(S*j+o/2,o);b=$a(b,o,S),P(T=>T.hover===b&&T.focus===b?T:{hover:b,focus:b}),xe(!1),F&&w!==b&&F(r,b)},va=r=>{G&&G(r);const s=-1;P({hover:s,focus:s}),F&&w!==s&&F(r,s)},Ee=r=>{let s=r.target.value===""?null:parseFloat(r.target.value);w!==-1&&(s=w),M(s),E&&E(r,s)},Ia=r=>{r.clientX===0&&r.clientY===0||(P({hover:-1,focus:-1}),M(null),E&&parseFloat(r.target.value)===U&&E(r,null))},_a=r=>{ve(r.target)&&xe(!0);const s=parseFloat(r.target.value);P(p=>({hover:p.hover,focus:s}))},ja=r=>{if(w!==-1)return;ve(r.target)||xe(!1);const s=-1;P(p=>({hover:p.hover,focus:s}))},[Aa,Fe]=C.useState(!1),O={...m,component:l,defaultValue:g,disabled:N,emptyIcon:f,emptyLabelText:R,emptyValueFocused:Aa,focusVisible:Sa,getLabelText:L,icon:A,IconContainerComponent:J,max:S,precision:o,readOnly:x,size:v},y=Ka(O);return a.jsxs(Qa,{as:l,ref:Ea,onMouseMove:Fa,onMouseLeave:va,className:le(y.root,d,x&&"MuiRating-readOnly"),ownerState:O,role:x?"img":null,"aria-label":x?L(I):null,...k,children:[Array.from(new Array(S)).map((r,s)=>{const p=s+1,X={classes:y,disabled:N,emptyIcon:f,focus:$,getLabelText:L,highlightSelectedOnly:c,hover:w,icon:A,IconContainerComponent:J,name:D,onBlur:ja,onChange:Ee,onClick:Ia,onFocus:_a,ratingValue:I,ratingValueRounded:U,readOnly:x,ownerState:O},_=p===Math.ceil(I)&&(w!==-1||$!==-1);if(o<1){const j=Array.from(new Array(1/o));return a.jsx(at,{className:le(y.decimal,_&&y.iconActive),ownerState:O,iconActive:_,children:j.map((b,T)=>{const ye=Te(p-1+(T+1)*o,o);return a.jsx(Ie,{...X,isActive:!1,itemValue:ye,labelProps:{style:j.length-1===T?{}:{width:ye===I?`${(T+1)*o*100}%`:"0%",overflow:"hidden",position:"absolute"}}},ye)})},p)}return a.jsx(Ie,{...X,isActive:_,itemValue:p},p)}),!x&&!N&&a.jsxs(Ta,{className:le(y.label,y.labelEmptyValue),ownerState:O,children:[a.jsx("input",{className:y.visuallyHidden,value:"",id:`${D}-empty`,type:"radio",name:D,checked:U==null,onFocus:()=>Fe(!0),onBlur:()=>Fe(!1),onChange:Ee}),a.jsx("span",{className:y.visuallyHidden,children:R})]})]})}),oe=e=>a.jsx(n,{columns:[{field:"id",headerName:"ID",width:90},{field:"firstName",headerName:"First name",width:150,editable:!0},{field:"lastName",headerName:"Last name",width:150},{field:"age",headerName:"Age",type:"number",width:110,editable:!0}],rows:[{id:1,lastName:"Snow",firstName:"Jon",age:35},{id:2,lastName:"Lannister",firstName:"Cersei",age:42},{id:3,lastName:"Lannister",firstName:"Jaime",age:45}],...e}),de=e=>{const t=["House Stark","House Lannister","House Targaryen","House Baratheon","House Greyjoy","House Tyrell","House Martell","House Bolton","House Arryn","House Tully","House Frey","House Baratheon of Dragonstone","House Tarly"],i=(l,d)=>`${d.firstName||""} ${d.lastName||""}`,m=[{id:1,lastName:"Snow",firstName:"Jon",age:35,house:"House Stark"},{id:2,lastName:"Lannister",firstName:"Tyrion",age:39,house:"House Lannister"},{id:3,lastName:"Lannister",firstName:"Jaime",age:45,house:"House Lannister"}];return a.jsx(n,{columns:[{field:"id",headerName:"ID",width:90},{field:"firstName",headerName:"First name",width:150},{field:"lastName",headerName:"Last name",width:150},{field:"age",headerName:"Age",type:"number",width:110},{field:"house",headerName:"GoT House",sortable:!0,editable:!0,width:160,type:"singleSelect",valueOptions:t.map(l=>({value:l,label:l}))},{field:"fullName",headerName:"Full name",sortable:!1,width:160,valueGetter:i}],rows:m||[],...e})},me=e=>a.jsx(n,{columns:[{field:"id",headerName:"ID",width:90},{field:"firstName",headerName:"First name",width:150},{field:"lastName",headerName:"Last name",width:150},{field:"age",headerName:"Age",type:"number",width:110}],rows:[{id:1,lastName:"Snow",firstName:"Jon",age:35},{id:2,lastName:"Lannister",firstName:"Cersei",age:42},{id:3,lastName:"Lannister",firstName:"Jaime",age:45}],pagination:!0,pageSizeOptions:[1,2,3],startPageSize:2,paginationMode:"client",handleChangePagination:t=>console.log(t),...e}),pe=e=>{const[t]=C.useState([{field:"lastName",sort:"desc"}]);return a.jsx(n,{sortingMode:"client",columns:[{field:"id",headerName:"ID",width:90},{field:"firstName",headerName:"First name",width:150},{field:"lastName",headerName:"Last name",width:150,sortable:!0},{field:"age",headerName:"Age",type:"number",width:110}],rows:[{id:2,lastName:"Lannister",firstName:"Cersei",age:42},{id:1,lastName:"Snow",firstName:"Jon",age:35},{id:3,lastName:"Lannister",firstName:"Jaime",age:45}],initialSortModel:[{field:"lastName",sort:"desc"}],sortModel:t,...e})},ce=e=>a.jsx(n,{filterable:!0,filterMode:"client",permitOrOperator:!0,handleFilterChange:t=>console.log(t),initialFilterModel:{items:[{field:"id",operator:"contains",value:"1"}]},columns:[{field:"id",headerName:"ID",width:90},{field:"firstName",headerName:"First name",width:150},{field:"lastName",headerName:"Last name",width:150},{field:"age",headerName:"Age",type:"number",width:110}],rows:[{id:1,lastName:"Snow",firstName:"Jon",age:35},{id:2,lastName:"Lannister",firstName:"Cersei",age:42},{id:3,lastName:"Lannister",firstName:"Jaime",age:45}],...e}),ue=e=>a.jsx(n,{toolbar:{filter:!0,export:!0,density:!0,columns:!0},columns:[{field:"id",headerName:"ID",width:90},{field:"firstName",headerName:"First name",width:150},{field:"lastName",headerName:"Last name",width:150},{field:"age",headerName:"Age",type:"number",width:110}],rows:[{id:1,lastName:"Snow",firstName:"Jon",age:35},{id:2,lastName:"Lannister",firstName:"Cersei",age:42},{id:3,lastName:"Lannister",firstName:"Jaime",age:45}],...e}),he=e=>a.jsx(n,{multipleSelection:!0,handleRowSelection:t=>console.log(t),columns:[{field:"id",headerName:"ID",width:90},{field:"firstName",headerName:"First name",width:150},{field:"lastName",headerName:"Last name",width:150},{field:"age",headerName:"Age",type:"number",width:110}],rows:[{id:1,lastName:"Snow",firstName:"Jon",age:35},{id:2,lastName:"Lannister",firstName:"Cersei",age:42},{id:3,lastName:"Lannister",firstName:"Jaime",age:45}],...e}),ge=e=>a.jsx(n,{processRowUpdate:t=>t,columns:[{field:"id",headerName:"ID",width:90},{field:"firstName",headerName:"First name",width:150,editable:!0},{field:"lastName",headerName:"Last name",width:150,editable:!0},{field:"age",headerName:"Age",type:"number",width:110,editable:!0}],rows:[{id:1,lastName:"Snow",firstName:"Jon",age:35},{id:2,lastName:"Lannister",firstName:"Cersei",age:42},{id:3,lastName:"Lannister",firstName:"Jaime",age:45}],...e}),Ne=e=>a.jsx(n,{actions:[{label:"Delete",icon:a.jsx(za,{name:"Delete"}),onClick:t=>alert(t.firstName)}],columns:[{field:"id",headerName:"ID",width:90},{field:"firstName",headerName:"First name",width:150},{field:"lastName",headerName:"Last name",width:150},{field:"age",headerName:"Age",type:"number",width:110}],rows:[{id:1,lastName:"Snow",firstName:"Jon",age:35},{id:2,lastName:"Lannister",firstName:"Cersei",age:42},{id:3,lastName:"Lannister",firstName:"Jaime",age:45}],...e}),Ra=e=>a.jsx(Ca,{readOnly:!0,value:e.value}),nt=e=>{const{id:t,value:i,field:m,hasFocus:l}=e,d=ka(),g=Ba.useRef(),N=(f,R)=>{d&&d.current&&d.current.setEditCellValue({id:t,field:m,value:R})};return Xa(()=>{if(l&&g.current){const f=g.current.querySelector(`input[value="${i}"]`);f==null||f.focus()}},[l,i]),a.jsx(Ca,{precision:.5,value:e.value,onChange:N})},lt=e=>a.jsx(nt,{...e}),fe=e=>a.jsx(n,{columns:[{field:"id",headerName:"ID",width:90},{field:"name",headerName:"Name",width:350,editable:!0},{field:"rating",headerName:"Rating",width:150,editable:!0,renderCell:Ra,renderEditCell:lt}],processRowUpdate:t=>t,rows:[{id:1,name:"Memento",rating:4},{id:2,name:"Inception",rating:5},{id:3,name:"The Prestige",rating:4},{id:4,name:"Dunkirk",rating:3},{id:5,name:"Interstellar",rating:5},{id:6,name:"Oppenheimer",rating:4}],...e}),Ce=e=>a.jsx(n,{groupingModel:{grouping:!0,groupParameter:"group",groupingRowId:"id",columnHeader:"Group",expandRows:!0},columns:[{field:"name",headerName:"Name",width:350},{field:"rating",headerName:"Rating",width:150,renderCell:Ra}],rows:[{id:1,name:"Memento",rating:4,group:["A"]},{id:2,name:"Inception",rating:5,group:["A"]},{id:3,name:"The Prestige",rating:4,group:["B"]},{id:4,name:"Dunkirk",rating:3,group:["C"]},{id:5,name:"Interstellar",rating:5,group:["B"]},{id:6,name:"Oppenheimer",rating:4,group:["B","D"]}],...e}),Re=e=>a.jsx(n,{columns:[{field:"id",headerName:"ID",width:90},{field:"firstName",headerName:"First name",width:150,editable:!0},{field:"lastName",headerName:"Last name",width:150},{field:"age",headerName:"Age",type:"number",width:110,editable:!0}],rows:[{id:1,lastName:"Snow",firstName:"Jon",age:35},{id:2,lastName:"Lannister",firstName:"Cersei",age:42},{id:3,lastName:"Lannister",firstName:"Jaime",age:45}],pinnedColumns:{left:["age"],right:["lastName"]},...e}),Le=e=>a.jsx(n,{columns:[{field:"id",headerName:"ID",width:90},{field:"firstName",headerName:"First name",width:150,editable:!0},{field:"lastName",headerName:"Last name",width:150},{field:"age",headerName:"Age",type:"number",width:110,editable:!0}],rows:[{id:1,lastName:"Snow",firstName:"Jon",age:35},{id:2,lastName:"Lannister",firstName:"Cersei",age:42},{id:3,lastName:"Lannister",firstName:"Jaime",age:45}],hiddenColumns:{lastName:!1},...e});try{oe.displayName="TableExample",oe.__docgenInfo={description:"",displayName:"TableExample",props:{}}}catch{}try{de.displayName="EnhancedColumnsTableExample",de.__docgenInfo={description:"",displayName:"EnhancedColumnsTableExample",props:{}}}catch{}try{me.displayName="TablePaginationExample",me.__docgenInfo={description:"",displayName:"TablePaginationExample",props:{}}}catch{}try{pe.displayName="TableSortingExample",pe.__docgenInfo={description:"",displayName:"TableSortingExample",props:{}}}catch{}try{ce.displayName="TableFilteringExample",ce.__docgenInfo={description:"",displayName:"TableFilteringExample",props:{}}}catch{}try{ue.displayName="TableToolbarExample",ue.__docgenInfo={description:"",displayName:"TableToolbarExample",props:{}}}catch{}try{he.displayName="TableRowSelectionExample",he.__docgenInfo={description:"",displayName:"TableRowSelectionExample",props:{}}}catch{}try{ge.displayName="TableEditingExample",ge.__docgenInfo={description:"",displayName:"TableEditingExample",props:{}}}catch{}try{Ne.displayName="TableActionsExample",Ne.__docgenInfo={description:"",displayName:"TableActionsExample",props:{}}}catch{}try{fe.displayName="CustomTableEditExample",fe.__docgenInfo={description:"",displayName:"CustomTableEditExample",props:{}}}catch{}try{Ce.displayName="TableGroupingExample",Ce.__docgenInfo={description:"",displayName:"TableGroupingExample",props:{}}}catch{}try{Re.displayName="PinnedColsTableExample",Re.__docgenInfo={description:"",displayName:"PinnedColsTableExample",props:{}}}catch{}try{Le.displayName="HiddenColsTableExample",Le.__docgenInfo={description:"",displayName:"HiddenColsTableExample",props:{}}}catch{}const h={table:[{language:"jsx",snippet:`
            <Table
                columns={[
                    { field: 'id', headerName: 'ID', width: 90 },
                    {
                        field: 'firstName',
                        headerName: 'First name',
                        width: 150,
                        editable: true,
                    },
                    {
                        field: 'lastName',
                        headerName: 'Last name',
                        width: 150,
                    },
                    {
                        field: 'age',
                        headerName: 'Age',
                        type: 'number',
                        width: 110,
                        editable: true,
                    },
                ]}
                rows={[
                    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
                    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
                    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
                ]}
                {...props}
            />
            `,expandedSnippet:`
            import React from 'react';
            import { Table } from './Table';

            export const TableExample = (props) => {
                return (
                    <Table
                        columns={[
                            { field: 'id', headerName: 'ID', width: 90 },
                            {
                                field: 'firstName',
                                headerName: 'First name',
                                width: 150,
                                editable: true,
                            },
                            {
                                field: 'lastName',
                                headerName: 'Last name',
                                width: 150,
                            },
                            {
                                field: 'age',
                                headerName: 'Age',
                                type: 'number',
                                width: 110,
                                editable: true,
                            },
                        ]}
                        rows={[
                            { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
                            { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
                            { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
                        ]}
                        {...props}
                    />
                );
            };
            `},{language:"tsx",snippet:`
            <Table
                columns={[
                    { field: 'id', headerName: 'ID', width: 90 },
                    {
                        field: 'firstName',
                        headerName: 'First name',
                        width: 150,
                        editable: true,
                    },
                    {
                        field: 'lastName',
                        headerName: 'Last name',
                        width: 150,
                    },
                    {
                        field: 'age',
                        headerName: 'Age',
                        type: 'number',
                        width: 110,
                        editable: true,
                    },
                ]}
                rows={[
                    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
                    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
                    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
                ]}
                {...props}
            />
            `,expandedSnippet:`
            export const TableExample: FC = (props: any) => {
                return (
                    <Table
                        columns={[
                            { field: 'id', headerName: 'ID', width: 90 },
                            {
                                field: 'firstName',
                                headerName: 'First name',
                                width: 150,
                                editable: true,
                            },
                            {
                                field: 'lastName',
                                headerName: 'Last name',
                                width: 150,
                            },
                            {
                                field: 'age',
                                headerName: 'Age',
                                type: 'number',
                                width: 110,
                                editable: true,
                            },
                        ]}
                        rows={[
                            { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
                            { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
                            { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
                        ]}
                        {...props}
                    />
                );
            };
            `}],enhancedColumnsTable:[{language:"jsx",snippet:`
            <Table
                columns={[
                    { field: 'id', headerName: 'ID', width: 90 },
                    {
                        field: 'firstName',
                        headerName: 'First name',
                        width: 150,
                    },
                    {
                        field: 'lastName',
                        headerName: 'Last name',
                        width: 150,
                    },
                    {
                        field: 'age',
                        headerName: 'Age',
                        type: 'number',
                        width: 110,
                    },
                    {
                        field: 'house',
                        headerName: 'GoT House',
                        sortable: true,
                        editable: true,
                        width: 160,
                        type: 'singleSelect',
                        valueOptions: houses.map((house) => {
                            return { value: house, label: house };
                        }),
                    },
                    {
                        field: 'fullName',
                        headerName: 'Full name',
                        sortable: false,
                        width: 160,
                        valueGetter: (params: any) =>
                            params.row.firstName + ' ' + params.row.lastName,
                    },
                ]}
                rows={[
                    {
                        id: 1,
                        lastName: 'Snow',
                        firstName: 'Jon',
                        age: 35,
                        house: 'House Arryn',
                    },
                    {
                        id: 2,
                        lastName: 'Lannister',
                        firstName: 'Cersei',
                        age: 42,
                        house: 'House Lannister',
                    },
                    {
                        id: 3,
                        lastName: 'Lannister',
                        firstName: 'Jaime',
                        age: 45,
                        house: 'House Lannister',
                    },
                ]}
                {...props}
            />
            `,expandedSnippet:`
            import React from 'react';
            import { Table } from './Table';

            export const EnhancedColumnsTableExample = (props) => {
                const houses = [
                    'House Stark',
                    'House Lannister',
                    'House Targaryen',
                    'House Baratheon',
                    'House Greyjoy',
                    'House Tyrell',
                    'House Martell',
                    'House Bolton',
                    'House Arryn',
                    'House Tully',
                    'House Frey',
                    'House Baratheon of Dragonstone',
                    'House Tarly',
                ];

                return (
                    <Table
                        columns={[
                            { field: 'id', headerName: 'ID', width: 90 },
                            {
                                field: 'firstName',
                                headerName: 'First name',
                                width: 150,
                            },
                            {
                                field: 'lastName',
                                headerName: 'Last name',
                                width: 150,
                            },
                            {
                                field: 'age',
                                headerName: 'Age',
                                type: 'number',
                                width: 110,
                            },
                            {
                                field: 'house',
                                headerName: 'GoT House',
                                sortable: true,
                                editable: true,
                                width: 160,
                                type: 'singleSelect',
                                valueOptions: houses.map((house) => {
                                    return { value: house, label: house };
                                }),
                            },
                            {
                                field: 'fullName',
                                headerName: 'Full name',
                                sortable: false,
                                width: 160,
                                valueGetter: (params: any) =>
                                    params.row.firstName + ' ' + params.row.lastName,
                            },
                        ]}
                        rows={[
                            {
                                id: 1,
                                lastName: 'Snow',
                                firstName: 'Jon',
                                age: 35,
                                house: 'House Arryn',
                            },
                            {
                                id: 2,
                                lastName: 'Lannister',
                                firstName: 'Cersei',
                                age: 42,
                                house: 'House Lannister',
                            },
                            {
                                id: 3,
                                lastName: 'Lannister',
                                firstName: 'Jaime',
                                age: 45,
                                house: 'House Lannister',
                            },
                        ]}
                        {...props}
                    />
                );
            };
            `},{language:"tsx",snippet:`
            <Table
                columns={[
                    { field: 'id', headerName: 'ID', width: 90 },
                    {
                        field: 'firstName',
                        headerName: 'First name',
                        width: 150,
                    },
                    {
                        field: 'lastName',
                        headerName: 'Last name',
                        width: 150,
                    },
                    {
                        field: 'age',
                        headerName: 'Age',
                        type: 'number',
                        width: 110,
                    },
                    {
                        field: 'house',
                        headerName: 'GoT House',
                        sortable: true,
                        editable: true,
                        width: 160,
                        type: 'singleSelect',
                        valueOptions: houses.map((house) => {
                            return { value: house, label: house };
                        }),
                    },
                    {
                        field: 'fullName',
                        headerName: 'Full name',
                        sortable: false,
                        width: 160,
                        valueGetter: (params: any) =>
                            params.row.firstName + ' ' + params.row.lastName,
                    },
                ]}
                rows={[
                    {
                        id: 1,
                        lastName: 'Snow',
                        firstName: 'Jon',
                        age: 35,
                        house: 'House Arryn',
                    },
                    {
                        id: 2,
                        lastName: 'Lannister',
                        firstName: 'Cersei',
                        age: 42,
                        house: 'House Lannister',
                    },
                    {
                        id: 3,
                        lastName: 'Lannister',
                        firstName: 'Jaime',
                        age: 45,
                        house: 'House Lannister',
                    },
                ]}
                {...props}
            />
            `,expandedSnippet:`
            import React, { FC } from 'react';
            import { Table } from './Table';

            export const EnhancedColumnsTableExample: FC = (props: any) => {
                const houses = [
                    'House Stark',
                    'House Lannister',
                    'House Targaryen',
                    'House Baratheon',
                    'House Greyjoy',
                    'House Tyrell',
                    'House Martell',
                    'House Bolton',
                    'House Arryn',
                    'House Tully',
                    'House Frey',
                    'House Baratheon of Dragonstone',
                    'House Tarly',
                ];
            
                return (
                    <Table
                        columns={[
                            { field: 'id', headerName: 'ID', width: 90 },
                            {
                                field: 'firstName',
                                headerName: 'First name',
                                width: 150,
                            },
                            {
                                field: 'lastName',
                                headerName: 'Last name',
                                width: 150,
                            },
                            {
                                field: 'age',
                                headerName: 'Age',
                                type: 'number',
                                width: 110,
                            },
                            {
                                field: 'house',
                                headerName: 'GoT House',
                                sortable: true,
                                editable: true,
                                width: 160,
                                type: 'singleSelect',
                                valueOptions: houses.map((house) => {
                                    return { value: house, label: house };
                                }),
                            },
                            {
                                field: 'fullName',
                                headerName: 'Full name',
                                sortable: false,
                                width: 160,
                                valueGetter: (params: any) =>
                                    params.row.firstName + ' ' + params.row.lastName,
                            },
                        ]}
                        rows={[
                            {
                                id: 1,
                                lastName: 'Snow',
                                firstName: 'Jon',
                                age: 35,
                                house: 'House Arryn',
                            },
                            {
                                id: 2,
                                lastName: 'Lannister',
                                firstName: 'Cersei',
                                age: 42,
                                house: 'House Lannister',
                            },
                            {
                                id: 3,
                                lastName: 'Lannister',
                                firstName: 'Jaime',
                                age: 45,
                                house: 'House Lannister',
                            },
                        ]}
                        {...props}
                    />
                );
            };
            `}],tablePagination:[{language:"jsx",snippet:`
            <Table
                columns={[
                    { field: 'id', headerName: 'ID', width: 90 },
                    {
                        field: 'firstName',
                        headerName: 'First name',
                        width: 150,
                    },
                    {
                        field: 'lastName',
                        headerName: 'Last name',
                        width: 150,
                    },
                    {
                        field: 'age',
                        headerName: 'Age',
                        type: 'number',
                        width: 110,
                    },
                ]}
                rows={[
                    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
                    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
                    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
                ]}
                pagination={true}
                pageSizeOptions={[1, 2, 3]}
                startPageSize={2}
                paginationMode="client"
                handleChangePagination={(model) => console.log(model)}
            />
            `,expandedSnippet:`
            import React from 'react';
            import { Table } from './Table';

            export const TablePaginationExample = (props) => {
                return (
                    <Table
                        columns={[
                            { field: 'id', headerName: 'ID', width: 90 },
                            {
                                field: 'firstName',
                                headerName: 'First name',
                                width: 150,
                            },
                            {
                                field: 'lastName',
                                headerName: 'Last name',
                                width: 150,
                            },
                            {
                                field: 'age',
                                headerName: 'Age',
                                type: 'number',
                                width: 110,
                            },
                        ]}
                        rows={[
                            { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
                            { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
                            { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
                        ]}
                        pagination={true}
                        pageSizeOptions={[1, 2, 3]}
                        startPageSize={2}
                        paginationMode="client"
                        handleChangePagination={(model) => console.log(model)}
                    />
                );
            };
            `},{language:"tsx",snippet:`
            <Table
                columns={[
                    { field: 'id', headerName: 'ID', width: 90 },
                    {
                        field: 'firstName',
                        headerName: 'First name',
                        width: 150,
                    },
                    {
                        field: 'lastName',
                        headerName: 'Last name',
                        width: 150,
                    },
                    {
                        field: 'age',
                        headerName: 'Age',
                        type: 'number',
                        width: 110,
                    },
                ]}
                rows={[
                    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
                    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
                    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
                ]}
                pagination={true}
                pageSizeOptions={[1, 2, 3]}
                startPageSize={2}
                paginationMode="client"
                handleChangePagination={(model) => console.log(model)}
            />
            `,expandedSnippet:`
            import React, { FC } from 'react';
            import { Table } from './Table';

            export const TablePaginationExample: FC = (props: any) => {
                return (
                    <Table
                        columns={[
                            { field: 'id', headerName: 'ID', width: 90 },
                            {
                                field: 'firstName',
                                headerName: 'First name',
                                width: 150,
                            },
                            {
                                field: 'lastName',
                                headerName: 'Last name',
                                width: 150,
                            },
                            {
                                field: 'age',
                                headerName: 'Age',
                                type: 'number',
                                width: 110,
                            },
                        ]}
                        rows={[
                            { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
                            { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
                            { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
                        ]}
                        pagination={true}
                        pageSizeOptions={[1, 2, 3]}
                        startPageSize={2}
                        paginationMode="client"
                        handleChangePagination={(model) => console.log(model)}
                    />
                );
            };
            `}],tableSorting:[{language:"jsx",snippet:`
            <Table
                sortingMode="client"
                handleSortChange={(model) => console.log(model)}
                columns={[
                    { field: 'id', headerName: 'ID', width: 90 },
                    {
                        field: 'firstName',
                        headerName: 'First name',
                        width: 150,
                    },
                    {
                        field: 'lastName',
                        headerName: 'Last name',
                        width: 150,
                    },
                    {
                        field: 'age',
                        headerName: 'Age',
                        type: 'number',
                        width: 110,
                    },
                ]}
                rows={[
                    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
                    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
                    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
                ]}
            />
            `,expandedSnippet:`
            import React from 'react';
            import { Table } from './Table';
            
            export const TableSortingExample = (props) => {
                return (
                    <Table
                        sortingMode="client"
                        handleSortChange={(model) => console.log(model)}
                        columns={[
                            { field: 'id', headerName: 'ID', width: 90 },
                            {
                                field: 'firstName',
                                headerName: 'First name',
                                width: 150,
                            },
                            {
                                field: 'lastName',
                                headerName: 'Last name',
                                width: 150,
                            },
                            {
                                field: 'age',
                                headerName: 'Age',
                                type: 'number',
                                width: 110,
                            },
                        ]}
                        rows={[
                            { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
                            { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
                            { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
                        ]}
                    />
                );
            };
            `},{language:"tsx",snippet:`
            <Table
                sortingMode="client"
                handleSortChange={(model) => console.log(model)}
                columns={[
                    { field: 'id', headerName: 'ID', width: 90 },
                    {
                        field: 'firstName',
                        headerName: 'First name',
                        width: 150,
                    },
                    {
                        field: 'lastName',
                        headerName: 'Last name',
                        width: 150,
                    },
                    {
                        field: 'age',
                        headerName: 'Age',
                        type: 'number',
                        width: 110,
                    },
                ]}
                rows={[
                    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
                    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
                    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
                ]}
            />
            `,expandedSnippet:`
            import React, { FC } from 'react';
            import { Table } from './Table';

            export const TableSortingExample: FC = (props: any) => {
                return (
                    <Table
                        sortingMode="client"
                        handleSortChange={(model) => console.log(model)}
                        columns={[
                            { field: 'id', headerName: 'ID', width: 90 },
                            {
                                field: 'firstName',
                                headerName: 'First name',
                                width: 150,
                            },
                            {
                                field: 'lastName',
                                headerName: 'Last name',
                                width: 150,
                            },
                            {
                                field: 'age',
                                headerName: 'Age',
                                type: 'number',
                                width: 110,
                            },
                        ]}
                        rows={[
                            { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
                            { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
                            { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
                        ]}
                    />
                );
            };
            `}],tableFiltering:[{language:"jsx",snippet:`
            <Table
                filterable={true}
                filterMode="client"
                permitOrOperator={true}
                handleFilterChange={(model) => console.log(model)}
                columns={[
                    { field: 'id', headerName: 'ID', width: 90 },
                    {
                        field: 'firstName',
                        headerName: 'First name',
                        width: 150,
                    },
                    {
                        field: 'lastName',
                        headerName: 'Last name',
                        width: 150,
                    },
                    {
                        field: 'age',
                        headerName: 'Age',
                        type: 'number',
                        width: 110,
                    },
                ]}
                rows={[
                    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
                    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
                    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
                ]}
            />
            `,expandedSnippet:`
            import React from 'react';
            import { Table } from './Table';

            export const TableFilteringExample = (props) => {
                return (
                    <Table
                        filterable={true}
                        filterMode="client"
                        permitOrOperator={true}
                        handleFilterChange={(model) => console.log(model)}
                        columns={[
                            { field: 'id', headerName: 'ID', width: 90 },
                            {
                                field: 'firstName',
                                headerName: 'First name',
                                width: 150,
                            },
                            {
                                field: 'lastName',
                                headerName: 'Last name',
                                width: 150,
                            },
                            {
                                field: 'age',
                                headerName: 'Age',
                                type: 'number',
                                width: 110,
                            },
                        ]}
                        rows={[
                            { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
                            { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
                            { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
                        ]}
                    />
                );
            };
            `},{language:"tsx",snippet:`
            <Table
                filterable={true}
                filterMode="client"
                permitOrOperator={true}
                handleFilterChange={(model) => console.log(model)}
                columns={[
                    { field: 'id', headerName: 'ID', width: 90 },
                    {
                        field: 'firstName',
                        headerName: 'First name',
                        width: 150,
                    },
                    {
                        field: 'lastName',
                        headerName: 'Last name',
                        width: 150,
                    },
                    {
                        field: 'age',
                        headerName: 'Age',
                        type: 'number',
                        width: 110,
                    },
                ]}
                rows={[
                    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
                    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
                    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
                ]}
            />
            `,expandedSnippet:`
            import React, { FC } from 'react';
            import { Table } from './Table';

            export const TableFilteringExample: FC = (props: any) => {
                return (
                    <Table
                        filterable={true}
                        filterMode="client"
                        permitOrOperator={true}
                        handleFilterChange={(model) => console.log(model)}
                        columns={[
                            { field: 'id', headerName: 'ID', width: 90 },
                            {
                                field: 'firstName',
                                headerName: 'First name',
                                width: 150,
                            },
                            {
                                field: 'lastName',
                                headerName: 'Last name',
                                width: 150,
                            },
                            {
                                field: 'age',
                                headerName: 'Age',
                                type: 'number',
                                width: 110,
                            },
                        ]}
                        rows={[
                            { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
                            { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
                            { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
                        ]}
                    />
                );
            };
            `}],tableToolbar:[{language:"jsx",snippet:`
            <Table
                toolbar={{
                    filter: true,
                    export: true,
                    density: true,
                    columns: true,
                }}
                columns={[
                    { field: 'id', headerName: 'ID', width: 90 },
                    {
                        field: 'firstName',
                        headerName: 'First name',
                        width: 150,
                    },
                    {
                        field: 'lastName',
                        headerName: 'Last name',
                        width: 150,
                    },
                    {
                        field: 'age',
                        headerName: 'Age',
                        type: 'number',
                        width: 110,
                    },
                ]}
                rows={[
                    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
                    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
                    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
                ]}
            />
            `,expandedSnippet:`
            import React from 'react';
            import { Table } from './Table';

            export const TableToolbarExample = (props) => {
                return (
                    <Table
                        toolbar={{
                            filter: true,
                            export: true,
                            density: true,
                            columns: true,
                        }}
                        columns={[
                            { field: 'id', headerName: 'ID', width: 90 },
                            {
                                field: 'firstName',
                                headerName: 'First name',
                                width: 150,
                            },
                            {
                                field: 'lastName',
                                headerName: 'Last name',
                                width: 150,
                            },
                            {
                                field: 'age',
                                headerName: 'Age',
                                type: 'number',
                                width: 110,
                            },
                        ]}
                        rows={[
                            { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
                            { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
                            { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
                        ]}
                    />
                );
            };
            `},{language:"tsx",snippet:`
            <Table
                toolbar={{
                    filter: true,
                    export: true,
                    density: true,
                    columns: true,
                }}
                columns={[
                    { field: 'id', headerName: 'ID', width: 90 },
                    {
                        field: 'firstName',
                        headerName: 'First name',
                        width: 150,
                    },
                    {
                        field: 'lastName',
                        headerName: 'Last name',
                        width: 150,
                    },
                    {
                        field: 'age',
                        headerName: 'Age',
                        type: 'number',
                        width: 110,
                    },
                ]}
                rows={[
                    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
                    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
                    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
                ]}
            />
            `,expandedSnippet:`
            import React, { FC } from 'react';
            import { Table } from './Table';

            export const TableToolbarExample: FC = (props: any) => {
                return (
                    <Table
                        toolbar={{
                            filter: true,
                            export: true,
                            density: true,
                            columns: true,
                        }}
                        columns={[
                            { field: 'id', headerName: 'ID', width: 90 },
                            {
                                field: 'firstName',
                                headerName: 'First name',
                                width: 150,
                            },
                            {
                                field: 'lastName',
                                headerName: 'Last name',
                                width: 150,
                            },
                            {
                                field: 'age',
                                headerName: 'Age',
                                type: 'number',
                                width: 110,
                            },
                        ]}
                        rows={[
                            { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
                            { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
                            { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
                        ]}
                    />
                );
            };
            `}],tableSelection:[{language:"jsx",snippet:`
            <Table
                multipleSelection={true}
                isRowSelectable={(params) => true}
                handleRowSelection={(selectedIds) => console.log(selectedIds)}
                columns={[
                    { field: 'id', headerName: 'ID', width: 90 },
                    {
                        field: 'firstName',
                        headerName: 'First name',
                        width: 150,
                    },
                    {
                        field: 'lastName',
                        headerName: 'Last name',
                        width: 150,
                    },
                    {
                        field: 'age',
                        headerName: 'Age',
                        type: 'number',
                        width: 110,
                    },
                ]}
                rows={[
                    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
                    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
                    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
                ]}
            />
            `,expandedSnippet:`
            import React, { FC } from 'react';
            import { Table } from './Table';

            export const TableRowSelectionExample: FC = (props: any) => {
                return (
                    <Table
                        multipleSelection={true}
                        isRowSelectable={(params) => true}
                        handleRowSelection={(selectedIds) => console.log(selectedIds)}
                        columns={[
                            { field: 'id', headerName: 'ID', width: 90 },
                            {
                                field: 'firstName',
                                headerName: 'First name',
                                width: 150,
                            },
                            {
                                field: 'lastName',
                                headerName: 'Last name',
                                width: 150,
                            },
                            {
                                field: 'age',
                                headerName: 'Age',
                                type: 'number',
                                width: 110,
                            },
                        ]}
                        rows={[
                            { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
                            { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
                            { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
                        ]}
                    />
                );
            };
            `},{language:"tsx",snippet:`
            <Table
                multipleSelection={true}
                isRowSelectable={(params) => true}
                handleRowSelection={(selectedIds) => console.log(selectedIds)}
                columns={[
                    { field: 'id', headerName: 'ID', width: 90 },
                    {
                        field: 'firstName',
                        headerName: 'First name',
                        width: 150,
                    },
                    {
                        field: 'lastName',
                        headerName: 'Last name',
                        width: 150,
                    },
                    {
                        field: 'age',
                        headerName: 'Age',
                        type: 'number',
                        width: 110,
                    },
                ]}
                rows={[
                    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
                    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
                    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
                ]}
            />
            `,expandedSnippet:`
            import React, { FC } from 'react';
            import { Table } from './Table';

            export const TableRowSelectionExample: FC = (props: any) => {
                return (
                    <Table
                        multipleSelection={true}
                        isRowSelectable={(params) => true}
                        handleRowSelection={(selectedIds) => console.log(selectedIds)}
                        columns={[
                            { field: 'id', headerName: 'ID', width: 90 },
                            {
                                field: 'firstName',
                                headerName: 'First name',
                                width: 150,
                            },
                            {
                                field: 'lastName',
                                headerName: 'Last name',
                                width: 150,
                            },
                            {
                                field: 'age',
                                headerName: 'Age',
                                type: 'number',
                                width: 110,
                            },
                        ]}
                        rows={[
                            { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
                            { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
                            { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
                        ]}
                    />
                );
            };
            `}],tableEditing:[{language:"jsx",snippet:`
            <Table
                isCellEditable={(params) => true}
                processRowUpdate={(updateRow, originalRow) => {
                    console.log(updateRow);
                    console.log(originalRow);
                    return updateRow;
                }}
                columns={[
                    { field: 'id', headerName: 'ID', width: 90 },
                    {
                        field: 'firstName',
                        headerName: 'First name',
                        width: 150,
                        editable: true,
                    },
                    {
                        field: 'lastName',
                        headerName: 'Last name',
                        width: 150,
                        editable: true,
                    },
                    {
                        field: 'age',
                        headerName: 'Age',
                        type: 'number',
                        width: 110,
                        editable: true,
                    },
                ]}
                rows={[
                    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
                    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
                    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
                ]}
            />
            `,expandedSnippet:`
            import React from 'react';
            import { Table } from './Table';

            export const TableEditingExample = (props) => {
                return (
                    <Table
                        isCellEditable={(params) => true}
                        processRowUpdate={(updateRow, originalRow) => {
                            console.log(updateRow);
                            console.log(originalRow);
                            return updateRow;
                        }}
                        columns={[
                            { field: 'id', headerName: 'ID', width: 90 },
                            {
                                field: 'firstName',
                                headerName: 'First name',
                                width: 150,
                                editable: true,
                            },
                            {
                                field: 'lastName',
                                headerName: 'Last name',
                                width: 150,
                                editable: true,
                            },
                            {
                                field: 'age',
                                headerName: 'Age',
                                type: 'number',
                                width: 110,
                                editable: true,
                            },
                        ]}
                        rows={[
                            { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
                            { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
                            { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
                        ]}
                    />
                );
            };
            `},{language:"tsx",snippet:`
            <Table
                isCellEditable={(params) => true}
                processRowUpdate={(updateRow, originalRow) => {
                    console.log(updateRow);
                    console.log(originalRow);
                    return updateRow;
                }}
                columns={[
                    { field: 'id', headerName: 'ID', width: 90 },
                    {
                        field: 'firstName',
                        headerName: 'First name',
                        width: 150,
                        editable: true,
                    },
                    {
                        field: 'lastName',
                        headerName: 'Last name',
                        width: 150,
                        editable: true,
                    },
                    {
                        field: 'age',
                        headerName: 'Age',
                        type: 'number',
                        width: 110,
                        editable: true,
                    },
                ]}
                rows={[
                    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
                    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
                    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
                ]}
            />
            `,expandedSnippet:`
            import React, { FC } from 'react';
            import { Table } from './Table';

            export const TableEditingExample: FC = (props: any) => {
                return (
                    <Table
                        isCellEditable={(params) => true}
                        processRowUpdate={(updateRow, originalRow) => {
                            console.log(updateRow);
                            console.log(originalRow);
                            return updateRow;
                        }}
                        columns={[
                            { field: 'id', headerName: 'ID', width: 90 },
                            {
                                field: 'firstName',
                                headerName: 'First name',
                                width: 150,
                                editable: true,
                            },
                            {
                                field: 'lastName',
                                headerName: 'Last name',
                                width: 150,
                                editable: true,
                            },
                            {
                                field: 'age',
                                headerName: 'Age',
                                type: 'number',
                                width: 110,
                                editable: true,
                            },
                        ]}
                        rows={[
                            { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
                            { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
                            { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
                        ]}
                    />
                );
            };
            `}],tableActions:[{language:"jsx",snippet:`
            <Table
                actions={[
                    {
                        label: 'Delete',
                        icon: <Icon name="Delete" />,
                        onClick: (row) => alert(row.firstName),
                    },
                ]}
                columns={[
                    { field: 'id', headerName: 'ID', width: 90 },
                    {
                        field: 'firstName',
                        headerName: 'First name',
                        width: 150,
                    },
                    {
                        field: 'lastName',
                        headerName: 'Last name',
                        width: 150,
                    },
                    {
                        field: 'age',
                        headerName: 'Age',
                        type: 'number',
                        width: 110,
                    },
                ]}
                rows={[
                    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
                    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
                    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
                ]}
            />
            `,expandedSnippet:`
            import React from 'react';
            import { Icon } from '../Icon';
            import { Table } from './Table';

            export const TableActionsExample = (props) => {
                return (
                    <Table
                        actions={[
                            {
                                label: 'Delete',
                                icon: <Icon name="Delete" />,
                                onClick: (row) => alert(row.firstName),
                            },
                        ]}
                        columns={[
                            { field: 'id', headerName: 'ID', width: 90 },
                            {
                                field: 'firstName',
                                headerName: 'First name',
                                width: 150,
                            },
                            {
                                field: 'lastName',
                                headerName: 'Last name',
                                width: 150,
                            },
                            {
                                field: 'age',
                                headerName: 'Age',
                                type: 'number',
                                width: 110,
                            },
                        ]}
                        rows={[
                            { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
                            { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
                            { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
                        ]}
                    />
                );
            };
            `},{language:"tsx",snippet:`
            <Table
                actions={[
                    {
                        label: 'Delete',
                        icon: <Icon name="Delete" />,
                        onClick: (row) => alert(row.firstName),
                    },
                ]}
                columns={[
                    { field: 'id', headerName: 'ID', width: 90 },
                    {
                        field: 'firstName',
                        headerName: 'First name',
                        width: 150,
                    },
                    {
                        field: 'lastName',
                        headerName: 'Last name',
                        width: 150,
                    },
                    {
                        field: 'age',
                        headerName: 'Age',
                        type: 'number',
                        width: 110,
                    },
                ]}
                rows={[
                    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
                    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
                    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
                ]}
            />
            `,expandedSnippet:`
            import React, { FC } from 'react';
            import { Icon } from '../Icon';
            import { Table } from './Table';

            export const TableActionsExample: FC = (props: any) => {
                return (
                    <Table
                        actions={[
                            {
                                label: 'Delete',
                                icon: <Icon name="Delete" />,
                                onClick: (row) => alert(row.firstName),
                            },
                        ]}
                        columns={[
                            { field: 'id', headerName: 'ID', width: 90 },
                            {
                                field: 'firstName',
                                headerName: 'First name',
                                width: 150,
                            },
                            {
                                field: 'lastName',
                                headerName: 'Last name',
                                width: 150,
                            },
                            {
                                field: 'age',
                                headerName: 'Age',
                                type: 'number',
                                width: 110,
                            },
                        ]}
                        rows={[
                            { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
                            { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
                            { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
                        ]}
                    />
                );
            };
            `}],customTableEdit:[{language:"jsx",snippet:`
            <Table
                columns={[
                    { field: 'id', headerName: 'ID', width: 90 },
                    {
                        field: 'name',
                        headerName: 'Name',
                        width: 350,
                        editable: true,
                    },
                    {
                        field: 'rating',
                        headerName: 'Rating',
                        width: 150,
                        editable: true,
                        renderCell: RatingCell,
                        renderEditCell: renderRatingEditInputCell,
                    },
                ]}
                processRowUpdate={(updatedRow, originalRow) => {
                    // this will have reference to the updatedRow and the originalRow
                    // the updatedRow value can be used to persist data somewhere
                    // this also needs to return the updatedRow to persist the modification in the UI
                    return updatedRow;
                }}
                rows={[
                    { id: 1, name: 'Memento', rating: 4 },
                    { id: 2, name: 'Inception', rating: 5 },
                    { id: 3, name: 'The Prestige', rating: 4 },
                    { id: 4, name: 'Dunkirk', rating: 3 },
                    { id: 5, name: 'Interstellar', rating: 5 },
                    { id: 6, name: 'Oppenheimer', rating: 4 },
                ]}
            />
            `,expandedSnippet:`
            import { Rating } from '@mui/material';
            import { Table,  useGridApiContext, useEnhancedEffect } from './Table';

            const RatingCell = (params) => {
                return <Rating readOnly value={params.value} />;
            };
            
            const EditRatingCell = (params) => {
                const { id, value, field, hasFocus } = params;
                const apiRef = useGridApiContext();
                const ref = React.useRef();
            
                const handleChange = (
                    _event,
                    newValue
                ) => {
                    apiRef.current.setEditCellValue({ id, field, value: newValue });
                };
            
                useEnhancedEffect(() => {
                    if (hasFocus && ref.current) {
                        const input = ref.current.querySelector<HTMLInputElement>(
                           \`input[value="\${value}"]\`
                        );
                        input?.focus();
                    }
                }, [hasFocus, value]);
            
                return (
                    <Rating precision={0.5} value={params.value} onChange={handleChange} />
                );
            };
            
            const renderRatingEditInputCell = (params) => {
                return <EditRatingCell {...params} />;
            };
            
            export const CustomTableEditExample = (props) => {
                return (
                    <Table
                        columns={[
                            { field: 'id', headerName: 'ID', width: 90 },
                            {
                                field: 'name',
                                headerName: 'Name',
                                width: 350,
                                editable: true,
                            },
                            {
                                field: 'rating',
                                headerName: 'Rating',
                                width: 150,
                                editable: true,
                                renderCell: RatingCell,
                                renderEditCell: renderRatingEditInputCell,
                            },
                        ]}
                        processRowUpdate={(updatedRow, originalRow) => {
                            // this will have reference to the updatedRow and the originalRow
                            // the updatedRow value can be used to persist data somewhere
                            // this also needs to return the updatedRow to persist the modification in the UI
                            return updatedRow;
                        }}
                        rows={[
                            { id: 1, name: 'Memento', rating: 4 },
                            { id: 2, name: 'Inception', rating: 5 },
                            { id: 3, name: 'The Prestige', rating: 4 },
                            { id: 4, name: 'Dunkirk', rating: 3 },
                            { id: 5, name: 'Interstellar', rating: 5 },
                            { id: 6, name: 'Oppenheimer', rating: 4 },
                        ]}
                    />
                );
            };
            `},{language:"tsx",snippet:`
            <Table
                columns={[
                    { field: 'id', headerName: 'ID', width: 90 },
                    {
                        field: 'name',
                        headerName: 'Name',
                        width: 350,
                        editable: true,
                    },
                    {
                        field: 'rating',
                        headerName: 'Rating',
                        width: 150,
                        editable: true,
                        renderCell: RatingCell,
                        renderEditCell: renderRatingEditInputCell,
                    },
                ]}
                processRowUpdate={(updatedRow, originalRow) => {
                    // this will have reference to the updatedRow and the originalRow
                    // the updatedRow value can be used to persist data somewhere
                    // this also needs to return the updatedRow to persist the modification in the UI
                    return updatedRow;
                }}
                rows={[
                    { id: 1, name: 'Memento', rating: 4 },
                    { id: 2, name: 'Inception', rating: 5 },
                    { id: 3, name: 'The Prestige', rating: 4 },
                    { id: 4, name: 'Dunkirk', rating: 3 },
                    { id: 5, name: 'Interstellar', rating: 5 },
                    { id: 6, name: 'Oppenheimer', rating: 4 },
                ]}
            />
            `,expandedSnippet:`
            import { Rating } from '@mui/material';
            import { GridRenderEditCellParams, Table, GridColDef, useGridApiContext, useEnhancedEffect } from './Table';

            const RatingCell: FC<any> = (params: GridRenderEditCellParams) => {
                return <Rating readOnly value={params.value} />;
            };
            
            const EditRatingCell: FC<any> = (params: GridRenderEditCellParams) => {
                const { id, value, field, hasFocus } = params;
                const apiRef = useGridApiContext();
                const ref = React.useRef<HTMLElement>();
            
                const handleChange = (
                    _event: React.SyntheticEvent,
                    newValue: number | null
                ) => {
                    apiRef.current.setEditCellValue({ id, field, value: newValue });
                };
            
                useEnhancedEffect(() => {
                    if (hasFocus && ref.current) {
                        const input = ref.current.querySelector<HTMLInputElement>(
                           \`input[value="\${value}"]\`
                        );
                        input?.focus();
                    }
                }, [hasFocus, value]);
            
                return (
                    <Rating precision={0.5} value={params.value} onChange={handleChange} />
                );
            };
            
            const renderRatingEditInputCell: GridColDef['renderCell'] = (params) => {
                return <EditRatingCell {...params} />;
            };
            
            export const CustomTableEditExample: FC = (props: any) => {
                return (
                    <Table
                        columns={[
                            { field: 'id', headerName: 'ID', width: 90 },
                            {
                                field: 'name',
                                headerName: 'Name',
                                width: 350,
                                editable: true,
                            },
                            {
                                field: 'rating',
                                headerName: 'Rating',
                                width: 150,
                                editable: true,
                                renderCell: RatingCell,
                                renderEditCell: renderRatingEditInputCell,
                            },
                        ]}
                        processRowUpdate={(updatedRow, originalRow) => {
                            // this will have reference to the updatedRow and the originalRow
                            // the updatedRow value can be used to persist data somewhere
                            // this also needs to return the updatedRow to persist the modification in the UI
                            return updatedRow;
                        }}
                        rows={[
                            { id: 1, name: 'Memento', rating: 4 },
                            { id: 2, name: 'Inception', rating: 5 },
                            { id: 3, name: 'The Prestige', rating: 4 },
                            { id: 4, name: 'Dunkirk', rating: 3 },
                            { id: 5, name: 'Interstellar', rating: 5 },
                            { id: 6, name: 'Oppenheimer', rating: 4 },
                        ]}
                    />
                );
            };
            `}]};function _e(e){const t={p:"p",...ya(),...e.components};return a.jsxs("div",{className:"content",children:[a.jsxs("h1",{children:["Table v",void 0]}),a.jsx("div",{children:a.jsx(t.p,{children:`Component used to show and edit data. Can be used both with server or client\r
data elaboration.`})}),a.jsx("hr",{}),a.jsx("h3",{children:"Basic usage"}),a.jsx(u,{snippets:h.table,children:a.jsx(oe,{})}),a.jsx("hr",{}),a.jsx("h3",{children:"Table with enhanced columns"}),a.jsx(u,{snippets:h.enhancedColumnsTable,children:a.jsx(de,{})}),a.jsx("hr",{}),a.jsx("h3",{children:"Table with pagination"}),a.jsx(u,{snippets:h.tablePagination,children:a.jsx(me,{})}),a.jsx("hr",{}),a.jsx("h3",{children:"Table with sorting"}),a.jsx(u,{snippets:h.tableSorting,children:a.jsx(pe,{})}),a.jsx("hr",{}),a.jsx("h3",{children:"Table with filterings"}),a.jsx(u,{snippets:h.tableFiltering,children:a.jsx(ce,{})}),a.jsx("hr",{}),a.jsx("h3",{children:"Table with toolbar"}),a.jsx(u,{snippets:h.tableToolbar,children:a.jsx(ue,{})}),a.jsx("hr",{}),a.jsx("h3",{children:"Table with selection"}),a.jsx(u,{snippets:h.tableSelection,children:a.jsx(he,{})}),a.jsx("hr",{}),a.jsx("h3",{children:"Table with editing"}),a.jsx(u,{snippets:h.tableEditing,children:a.jsx(ge,{})}),a.jsx("hr",{}),a.jsx("h3",{children:"Table with custom editing cells"}),a.jsx("div",{children:a.jsxs(t.p,{children:["The ",a.jsx("b",{children:"processRowUpdate"}),` property has to be used in order to persist row\r
editing (see snippet).`]})}),a.jsx(u,{snippets:h.customTableEdit,children:a.jsx(fe,{})}),a.jsx("hr",{}),a.jsx("h3",{children:"Table with actions"}),a.jsx(u,{snippets:h.tableActions,children:a.jsx(Ne,{})})]})}function ot(e={}){const{wrapper:t}={...ya(),...e.components};return t?a.jsx(t,{...e,children:a.jsx(_e,{...e})}):_e(e)}const ft={title:"UnifiedUI/Table",component:n,parameters:{docs:{page:ot}}},q={render:e=>a.jsx(oe,{...e})},W={render:e=>a.jsx(de,{...e})},Y={render:e=>a.jsx(me,{...e})},Z={render:e=>a.jsx(pe,{...e})},K={render:e=>a.jsx(ce,{...e})},Q={render:e=>a.jsx(ue,{...e})},ee={render:e=>a.jsx(he,{...e})},ae={render:e=>a.jsx(ge,{...e})},te={render:e=>a.jsx(fe,{...e})},ie={render:e=>a.jsx(Ne,{...e})},re={render:e=>a.jsx(Ce,{...e})},se={render:e=>a.jsx(Re,{...e})},ne={render:e=>a.jsx(Le,{...e})};var je,Ae,Je;q.parameters={...q.parameters,docs:{...(je=q.parameters)==null?void 0:je.docs,source:{originalSource:`{
  render: (args: any) => <TableExample {...args} />
}`,...(Je=(Ae=q.parameters)==null?void 0:Ae.docs)==null?void 0:Je.source}}};var He,De,Me;W.parameters={...W.parameters,docs:{...(He=W.parameters)==null?void 0:He.docs,source:{originalSource:`{
  render: (args: any) => <EnhancedColumnsTableExample {...args} />
}`,...(Me=(De=W.parameters)==null?void 0:De.docs)==null?void 0:Me.source}}};var Pe,Oe,Ve;Y.parameters={...Y.parameters,docs:{...(Pe=Y.parameters)==null?void 0:Pe.docs,source:{originalSource:`{
  render: (args: any) => <TablePaginationExample {...args} />
}`,...(Ve=(Oe=Y.parameters)==null?void 0:Oe.docs)==null?void 0:Ve.source}}};var Ge,ze,ke;Z.parameters={...Z.parameters,docs:{...(Ge=Z.parameters)==null?void 0:Ge.docs,source:{originalSource:`{
  render: (args: any) => <TableSortingExample {...args} />
}`,...(ke=(ze=Z.parameters)==null?void 0:ze.docs)==null?void 0:ke.source}}};var Be,Ue,$e;K.parameters={...K.parameters,docs:{...(Be=K.parameters)==null?void 0:Be.docs,source:{originalSource:`{
  render: (args: any) => <TableFilteringExample {...args} />
}`,...($e=(Ue=K.parameters)==null?void 0:Ue.docs)==null?void 0:$e.source}}};var Xe,qe,We;Q.parameters={...Q.parameters,docs:{...(Xe=Q.parameters)==null?void 0:Xe.docs,source:{originalSource:`{
  render: (args: any) => <TableToolbarExample {...args} />
}`,...(We=(qe=Q.parameters)==null?void 0:qe.docs)==null?void 0:We.source}}};var Ye,Ze,Ke;ee.parameters={...ee.parameters,docs:{...(Ye=ee.parameters)==null?void 0:Ye.docs,source:{originalSource:`{
  render: (args: any) => <TableRowSelectionExample {...args} />
}`,...(Ke=(Ze=ee.parameters)==null?void 0:Ze.docs)==null?void 0:Ke.source}}};var Qe,ea,aa;ae.parameters={...ae.parameters,docs:{...(Qe=ae.parameters)==null?void 0:Qe.docs,source:{originalSource:`{
  render: (args: any) => <TableEditingExample {...args} />
}`,...(aa=(ea=ae.parameters)==null?void 0:ea.docs)==null?void 0:aa.source}}};var ta,ia,ra;te.parameters={...te.parameters,docs:{...(ta=te.parameters)==null?void 0:ta.docs,source:{originalSource:`{
  render: (args: any) => <CustomTableEditExample {...args} />
}`,...(ra=(ia=te.parameters)==null?void 0:ia.docs)==null?void 0:ra.source}}};var sa,na,la;ie.parameters={...ie.parameters,docs:{...(sa=ie.parameters)==null?void 0:sa.docs,source:{originalSource:`{
  render: (args: any) => <TableActionsExample {...args} />
}`,...(la=(na=ie.parameters)==null?void 0:na.docs)==null?void 0:la.source}}};var oa,da,ma;re.parameters={...re.parameters,docs:{...(oa=re.parameters)==null?void 0:oa.docs,source:{originalSource:`{
  render: (args: any) => <TableGroupingExample {...args} />
}`,...(ma=(da=re.parameters)==null?void 0:da.docs)==null?void 0:ma.source}}};var pa,ca,ua;se.parameters={...se.parameters,docs:{...(pa=se.parameters)==null?void 0:pa.docs,source:{originalSource:`{
  render: (args: any) => <PinnedColsTableExample {...args} />
}`,...(ua=(ca=se.parameters)==null?void 0:ca.docs)==null?void 0:ua.source}}};var ha,ga,Na;ne.parameters={...ne.parameters,docs:{...(ha=ne.parameters)==null?void 0:ha.docs,source:{originalSource:`{
  render: (args: any) => <HiddenColsTableExample {...args} />
}`,...(Na=(ga=ne.parameters)==null?void 0:ga.docs)==null?void 0:Na.source}}};const wt=["BaseTable","EnhancedColumnsTable","TablePagination","TableSorting","TableFiltering","TableToolbar","TableRowSelection","TableEditing","CustomEditTable","TableActions","TableGrouping","ColumnsPinning","ColumnsHiding"];export{q as BaseTable,ne as ColumnsHiding,se as ColumnsPinning,te as CustomEditTable,W as EnhancedColumnsTable,ie as TableActions,ae as TableEditing,K as TableFiltering,re as TableGrouping,Y as TablePagination,ee as TableRowSelection,Z as TableSorting,Q as TableToolbar,wt as __namedExportsOrder,ft as default};
