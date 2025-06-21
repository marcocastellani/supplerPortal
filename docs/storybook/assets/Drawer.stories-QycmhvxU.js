import{j as e}from"./index-DrhACB-D.js";import{c as w,p as d}from"./Upload-ChF5xKSK.js";import{r as a}from"./index-DQDNmYQF.js";import{useMDXComponents as S}from"./index-DmqVK_gK.js";import{S as m}from"./docs-CJ9d-umt.js";import"./index-BGiqdwja.js";import"./theming-C7i7v1dL.js";import"./tiny-invariant-CopsF_GD.js";const n=r=>{const[t,o]=a.useState(!1),p=a.useRef(null),y=()=>{o(!t)};return a.useEffect(()=>{const c=p.current;if(c){const D=_=>{_.stopPropagation()};return c.addEventListener("click",D),()=>{c.removeEventListener("click",D)}}},[]),e.jsxs("div",{children:[e.jsx(w,{label:"Toggle drawer",onClick:y}),e.jsxs(d,{position:"left",show:t,setShow:o,title:"Drawer title",...r,children:[e.jsx("p",{children:"Drawer content"}),e.jsx(w,{label:"ToDo",onClick:()=>alert("Something happend")})]})]})},l=r=>{const[t,o]=a.useState(!1),p=()=>{o(!t)};return e.jsxs("div",{children:[e.jsx(w,{label:"Toggle top drawer",onClick:p}),e.jsx(d,{position:"top",show:t,setShow:o,title:"Drawer title",...r,children:e.jsx("p",{children:"Drawer content"})})]})};try{n.displayName="DrawerExample",n.__docgenInfo={description:"",displayName:"DrawerExample",props:{}}}catch{}try{l.displayName="DrawerPositionExample",l.__docgenInfo={description:"",displayName:"DrawerPositionExample",props:{}}}catch{}const h={drawer:[{language:"jsx",snippet:`
            <Drawer
				position="left"
				show={visible}
				setShow={setVisible}
				title="Drawer title"
			>
				<p>Drawer content</p>
			</Drawer>
            `,expandedSnippet:`
            import React, { useState } from 'react';
            import { Button } from '../Button';
            import { Drawer } from './Drawer';

            export const DrawerExample = (props) => {
                const [visible, setVisible] = useState(false);

                const toggleDrawer = () => {
                    setVisible(!visible);
                };

                return (
                    <div>
                        <Button label="Show!" onClick={toggleDrawer} />
                        <Drawer
                            position="left"
                            show={visible}
                            setShow={setVisible}
                            title="Drawer title"
                        >
                            <p>Drawer content</p>
                        </Drawer>
                    </div>
                );
            };
            `},{language:"tsx",snippet:`
            <Drawer
				position="left"
				show={visible}
				setShow={setVisible}
				title="Drawer title"
			>
				<p>Drawer content</p>
			</Drawer>
            `,expandedSnippet:`
            import React, { FC, useState } from 'react';
            import { Button } from '../Button';
            import { Drawer } from './Drawer';

            export const DrawerExample: FC = (props: any) => {
                const [visible, setVisible] = useState<boolean>(false);

                const toggleDrawer = () => {
                    setVisible(!visible);
                };

                return (
                    <div>
                        <Button label="Show!" onClick={toggleDrawer} />
                        <Drawer
                            position="left"
                            show={visible}
                            setShow={setVisible}
                            title="Drawer title"
                        >
                            <p>Drawer content</p>
                        </Drawer>
                    </div>
                );
            };
            `}],drawerPosition:[{language:"jsx",snippet:`
            <Drawer
				position="right"
				show={visible}
				setShow={setVisible}
				title="Drawer title"
			>
				<p>Drawer content</p>
			</Drawer>
            `,expandedSnippet:`
            import React, { useState } from 'react';
            import { Dialog } from './Dialog';

            export const DrawerPositionExample = (props) => {
            const [visible, setVisible] = useState(false);

            const toggleDrawer = () => {
                setVisible(!visible);
            };

            return (
                <div>
                    <Button label="Show!" onClick={toggleDrawer} />
                    <Drawer
                        position="right"
                        show={visible}
                        setShow={setVisible}
                        title="Drawer title"
                    >
                        <p>Drawer content</p>
                    </Drawer>
                </div>
            );
        };
            `},{language:"tsx",snippet:`
            <Drawer
				position="right"
				show={visible}
				setShow={setVisible}
				title="Drawer title"
			>
				<p>Drawer content</p>
			</Drawer>
            `,expandedSnippet:`
            import React, { FC, useState } from 'react';
            import { Dialog } from './Dialog';

            export const DrawerPositionExample: FC = (props: any) => {
                const [visible, setVisible] = useState<boolean>(false);

                const toggleDrawer = () => {
                    setVisible(!visible);
                };

                return (
                    <div>
                        <Button label="Show!" onClick={toggleDrawer} />
                        <Drawer
                            position="right"
                            show={visible}
                            setShow={setVisible}
                            title="Drawer title"
                        >
                            <p>Drawer content</p>
                        </Drawer>
                    </div>
                );
            };
            `}]};function x(r){const t={p:"p",...S(),...r.components};return e.jsxs("div",{className:"content",children:[e.jsxs("h1",{children:["Drawer v",void 0]}),e.jsx("p",{children:e.jsx(t.p,{children:`Temporary element that scrolls in horizontally or vertically and spans the
viewport to prompt the user for input, display information or perform
actions.`})}),e.jsx("p",{children:"Can be closed by clicking away from it or using the dedicated icon."}),e.jsx("hr",{}),e.jsx("h3",{children:"Basic usage"}),e.jsx(m,{snippets:h.drawer,children:e.jsx(n,{})}),e.jsx("hr",{}),e.jsx("h3",{children:"Drawer position"}),e.jsx("p",{children:e.jsxs(t.p,{children:["Drawers can have different positions specified via the ",e.jsx("b",{children:"position"})," ",`
property, which can be one of `,e.jsx("i",{children:'"top", "left", "bottom" or "right"'}),"."]})}),e.jsx(m,{snippets:h.drawerPosition,children:e.jsx(l,{})})]})}function E(r={}){const{wrapper:t}={...S(),...r.components};return t?e.jsx(t,{...r,children:e.jsx(x,{...r})}):x(r)}const M={title:"UnifiedUI/Drawer",component:d,parameters:{docs:{page:E}}},i={render:r=>e.jsx(n,{...r})},s={render:r=>e.jsx(l,{...r})};var g,u,b;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: (args: any) => <DrawerExample {...args} />
}`,...(b=(u=i.parameters)==null?void 0:u.docs)==null?void 0:b.source}}};var f,v,j;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: (args: any) => <DrawerPositionExample {...args} />
}`,...(j=(v=s.parameters)==null?void 0:v.docs)==null?void 0:j.source}}};const T=["BaseDrawer","DrawerPosition"];export{i as BaseDrawer,s as DrawerPosition,T as __namedExportsOrder,M as default};
