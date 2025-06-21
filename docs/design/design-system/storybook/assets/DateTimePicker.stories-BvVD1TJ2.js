import{j as e}from"./index-DrhACB-D.js";import{D as m}from"./Upload-ChF5xKSK.js";import{r as u}from"./index-DQDNmYQF.js";import{useMDXComponents as k}from"./index-DmqVK_gK.js";import{S as c}from"./docs-CJ9d-umt.js";import"./index-BGiqdwja.js";import"./theming-C7i7v1dL.js";import"./tiny-invariant-CopsF_GD.js";const s=t=>{const[a,i]=u.useState(null);return e.jsx(m,{locale:"it",timePicker:!0,name:"sb-datepicker",value:a,setValue:i,format:"DD/MM/YYYY HH:mm A",...t})},o=t=>{const[a,i]=u.useState(null);return e.jsx(m,{name:"sb-datepicker",value:a,setValue:i,format:"DD/MM/YYYY",locale:"es",...t})};try{s.displayName="DateTimePickerExample",s.__docgenInfo={description:"",displayName:"DateTimePickerExample",props:{}}}catch{}try{o.displayName="DatePickerExample",o.__docgenInfo={description:"",displayName:"DatePickerExample",props:{}}}catch{}const n={dateTimePicker:[{language:"jsx",snippet:'<DateTimePicker timePicker name="sb-datepicker" value={date} onChange={setDate} format="DD/MM/YYYY HH:mm A" />',expandedSnippet:`
            import dayjs from 'dayjs';
            import React, { useState } from 'react';
            import { DateTimePicker } from './DateTimePicker';

            export const DateTimePickerExample = (props) => {
                const [date, setDate] = useState(dayjs());
                return (
                    <DateTimePicker
                        timePicker
                        name="sb-datepicker"
                        value={date}
                        onChange={setDate}
                        format="DD/MM/YYYY HH:mm A"
                    />
                );
            };
            `},{language:"tsx",snippet:'<DateTimePicker timePicker name="sb-datepicker" value={date} onChange={setDate} format="DD/MM/YYYY HH:mm A" />',expandedSnippet:`
            import dayjs, { Dayjs } from 'dayjs';
            import React, { FC, useState } from 'react';
            import { DateTimePicker } from './DateTimePicker';

            export const DateTimePickerExample: FC = (props: any) => {
                const [date, setDate] = useState<Dayjs>(dayjs());
                return (
                    <DateTimePicker
                        timePicker  
                        name="sb-datepicker"
                        value={date}
                        setValue={setDate}
                        format="DD/MM/YYYY HH:mm A"
                    />
                );
            };
            `}],datePicker:[{language:"jsx",snippet:'<DateTimePicker name="sb-datepicker" value={date} onChange={setDate} format="DD/MM/YYYY" />',expandedSnippet:`
            import dayjs from 'dayjs';
            import React, { useState } from 'react';
            import { DateTimePicker } from './DateTimePicker';

            export const DatePickerExample = (props) => {
                const [date, setDate] = useState(dayjs());
                return (
                    <DateTimePicker
                        name="sb-datepicker"
                        value={date}
                        onChange={setDate}
                        format="DD/MM/YYYY"
                    />
                );
            };
            `},{language:"tsx",snippet:'<DateTimePicker name="sb-datepicker" value={date} onChange={setDate} format="DD/MM/YYYY" />',expandedSnippet:`
            import dayjs, { Dayjs } from 'dayjs';
            import React, { FC, useState } from 'react';
            import { DateTimePicker } from './DateTimePicker';

            export const DateTimePickerExample: FC = (props: any) => {
                const [date, setDate] = useState<Dayjs>(dayjs());
                return (
                    <DateTimePicker
                        name="sb-datepicker"
                        value={date}
                        setValue={setDate}
                        format="DD/MM/YYYY"
                    />
                );
            };
            `}]};function p(t){const a={p:"p",...k(),...t.components};return e.jsxs("div",{className:"content",children:[e.jsxs("h1",{children:["DateTimePicker v",void 0]}),e.jsx("p",{children:"Control element allowing to select just a date or a date and a time."}),e.jsx("hr",{}),e.jsx("h3",{children:"Basic usage with only date picker"}),e.jsx(c,{snippets:n.datePicker,children:e.jsx(o,{})}),e.jsx("hr",{}),e.jsx("h3",{children:"Basic usage with date and time picker"}),e.jsx(c,{snippets:n.dateTimePicker,children:e.jsx(s,{})}),e.jsx("hr",{}),e.jsx("h3",{children:"DateTimePicker in forms"}),e.jsxs("p",{children:[e.jsxs(a.p,{children:[`DateTimePicker can be used in complex forms and support the react-hook-form
library, a complete guide can be found in`," "]}),e.jsx("a",{href:"/?path=/docs/how-to-guides-forms--docs",target:"_BLANK",children:e.jsx(a.p,{children:"UnifiedUI's Forms guide"})}),e.jsx(a.p,{children:"."})]})]})}function x(t={}){const{wrapper:a}={...k(),...t.components};return a?e.jsx(a,{...t,children:e.jsx(p,{...t})}):p(t)}const M={title:"UnifiedUI/DateTimePicker",component:m,parameters:{docs:{page:x}}},r={render:t=>e.jsx(s,{...t})};var d,D,l;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: (args: any) => <DateTimePickerExample {...args} />
}`,...(l=(D=r.parameters)==null?void 0:D.docs)==null?void 0:l.source}}};const _=["BaseDatePicker"];export{r as BaseDatePicker,_ as __namedExportsOrder,M as default};
