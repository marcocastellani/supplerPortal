import{j as o}from"./index-DrhACB-D.js";import{c as r,o as c}from"./Upload-ChF5xKSK.js";import{r as C}from"./index-DQDNmYQF.js";import{useMDXComponents as j}from"./index-DmqVK_gK.js";import{S as p}from"./docs-CJ9d-umt.js";import"./index-BGiqdwja.js";import"./theming-C7i7v1dL.js";import"./tiny-invariant-CopsF_GD.js";const s=i=>{const[e,n]=C.useState(!1),l=()=>{n(!e)};return o.jsxs("div",{children:[o.jsx(r,{label:"Toggle dialog",onClick:l}),o.jsx(c,{visible:e,toggleDialog:l,title:"Basic dialog",...i,children:o.jsx("p",{children:"Dialog Content"})})]})},g=i=>{const[e,n]=C.useState(!1),l=()=>{n(!e)};return o.jsxs("div",{children:[o.jsx(r,{label:"Toggle dialog",onClick:l}),o.jsx(c,{visible:e,toggleDialog:l,title:"Basic dialog",actions:o.jsx(r,{label:"Close dialog",onClick:l}),...i,children:o.jsx("p",{children:"Dialog Content"})})]})};try{s.displayName="DialogExample",s.__docgenInfo={description:"",displayName:"DialogExample",props:{}}}catch{}try{g.displayName="DialogWithActionExample",g.__docgenInfo={description:"",displayName:"DialogWithActionExample",props:{}}}catch{}const d={dialog:[{language:"jsx",snippet:`
            <Dialog visible={visible} toggleDialog={toggleDialog} title="Basic dialog">
			    <p>Dialog Content</p>
		    </Dialog>
            `,expandedSnippet:`
            import React, { useState } from 'react';
            import { Dialog } from './Dialog';

            export const DialogExample = (props) => {
                const [visible, setVisible] = useState(false);
            
                const toggleDialog = () => {
                    setVisible(!visible);
                };
            
                return (
                    <div>
                        <Button label="Toggle dialog" onClick={toggleDialog} />
                        <Dialog
                            visible={visible}
                            toggleDialog={toggleDialog}
                            title="Basic dialog"
                        >
                            <p>Dialog Content</p>
                        </Dialog>
                    </div>
                );
            };
            `},{language:"tsx",snippet:`
            <Dialog visible={visible} toggleDialog={toggleDialog} title="Basic dialog">
                <p>Dialog Content</p>
            </Dialog>
            `,expandedSnippet:`
            import React, { FC, useState } from 'react';
            import { Dialog } from './Dialog';

            export const DialogExample: FC = (props: any) => {
                const [visible, setVisible] = useState<boolean>(false);
            
                const toggleDialog = () => {
                    setVisible(!visible);
                };
            
                return (
                    <div>
                        <Button label="Toggle dialog" onClick={toggleDialog} />
                        <Dialog
                            visible={visible}
                            toggleDialog={toggleDialog}
                            title="Basic dialog"
                        >
                            <p>Dialog Content</p>
                        </Dialog>
                    </div>
                );
            };
            `}],dialogWithActions:[{language:"jsx",snippet:`
            <Dialog
				visible={visible}
				toggleDialog={toggleDialog}
				title="Basic dialog"
				actions={<Button label="Close dialog" onClick={toggleDialog} />}
			>
				<p>Dialog Content</p>
			</Dialog>
            `,expandedSnippet:`
            import React, { useState } from 'react';
            import { Dialog } from './Dialog';

            export const DialogExample = (props) => {
                const [visible, setVisible] = useState(false);
            
                const toggleDialog = () => {
                    setVisible(!visible);
                };
            
                return (
                    <div>
                        <Button label="Toggle dialog" onClick={toggleDialog} />
                        <Dialog
                            visible={visible}
                            toggleDialog={toggleDialog}
                            title="Basic dialog"
                            actions={<Button label="Close dialog" onClick={toggleDialog} />}
                        >
                            <p>Dialog Content</p>
                        </Dialog>
                    </div>
                );
            };
            `},{language:"tsx",snippet:`
            <Dialog
				visible={visible}
				toggleDialog={toggleDialog}
				title="Basic dialog"
				actions={<Button label="Close dialog" onClick={toggleDialog} />}
			>
				<p>Dialog Content</p>
			</Dialog>
            `,expandedSnippet:`
            import React, { FC, useState } from 'react';
            import { Dialog } from './Dialog';

            export const DialogExample: FC = (props: any) => {
                const [visible, setVisible] = useState<boolean>(false);
            
                const toggleDialog = () => {
                    setVisible(!visible);
                };
            
                return (
                    <div>
                        <Button label="Toggle dialog" onClick={toggleDialog} />
                        <Dialog
                            visible={visible}
                            toggleDialog={toggleDialog}
                            title="Basic dialog"
                            actions={<Button label="Close dialog" onClick={toggleDialog} />}
                        >
                            <p>Dialog Content</p>
                        </Dialog>
                    </div>
                );
            };
            `}]};function D(i){const e={p:"p",...j(),...i.components};return o.jsxs("div",{className:"content",children:[o.jsxs("h1",{children:["Dialog v",void 0]}),o.jsx("p",{children:o.jsx(e.p,{children:`Temporary element or window that appears on top of the main content to
prompt the user for input, display information, or confirm an action.`})}),o.jsx("p",{children:o.jsx(e.p,{children:'Can be closed pressing "ESC" on the keyboard when no action is provided.'})}),o.jsx("hr",{}),o.jsx("h3",{children:"Basic usage"}),o.jsx(p,{snippets:d.dialog,children:o.jsx(s,{})}),o.jsx("hr",{}),o.jsx("h3",{children:"Dialog with actions"}),o.jsx("p",{children:o.jsxs(e.p,{children:["Dialogs can have actions specified via the ",o.jsx("b",{children:"actions"}),` property, which
takes some ReactNode.`]})}),o.jsx(p,{snippets:d.dialogWithActions,children:o.jsx(g,{})})]})}function f(i={}){const{wrapper:e}={...j(),...i.components};return e?o.jsx(e,{...i,children:o.jsx(D,{...i})}):D(i)}const W={title:"UnifiedUI/Dialog",component:c,parameters:{docs:{page:f}}},t={render:()=>o.jsx(s,{})},a={render:()=>o.jsx(g,{})};var m,x,b;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => <DialogExample />
}`,...(b=(x=t.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var u,h,v;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <DialogWithActionExample />
}`,...(v=(h=a.parameters)==null?void 0:h.docs)==null?void 0:v.source}}};const w=["BaseDialog","DialogWithActions"];export{t as BaseDialog,a as DialogWithActions,w as __namedExportsOrder,W as default};
