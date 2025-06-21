import{j as e}from"./index-DrhACB-D.js";import{M as a,j as z,I as k,d as s}from"./Upload-ChF5xKSK.js";import{useMDXComponents as j}from"./index-DmqVK_gK.js";import{S as m}from"./docs-CJ9d-umt.js";import"./index-DQDNmYQF.js";import"./index-BGiqdwja.js";import"./theming-C7i7v1dL.js";import"./tiny-invariant-CopsF_GD.js";const c=[{element:e.jsxs("span",{style:{display:"flex",alignItems:"center",gap:"10px"},children:["Add",e.jsx(s,{name:"Plus"})]}),action:()=>alert("Item 1 clicked"),divider:!0},{element:e.jsxs("span",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx(s,{name:"Delete"})," Delete"]}),action:()=>alert("Item 2 clicked"),divider:!0},{element:"Action with no icon",action:()=>alert("Item 3 clicked")}],y=()=>e.jsx(a,{theme:"light",element:e.jsx(z,{sx:{cursor:"pointer"},children:"John Doe"}),menuItems:c,anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"}}),A=()=>e.jsx(a,{theme:"light",element:"Hello World",menuItems:c,anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"}}),O=()=>e.jsx(a,{theme:"light",element:e.jsx(k,{icon:e.jsx(s,{name:"House"})}),menuItems:c,anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"}}),l={avatarMenu:[{language:"jsx",snippet:`
            <Menu
                theme={theme}
                element={<Avatar>John Doe</Avatar>}
                menuItems={menuItems}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            />
            `,expandedSnippet:`
            import React from 'react';
            import { Icon } from '../Icon';
            import { Menu } from './Menu';
            
            const handleClose = () => {
                null;
            };
            
            const menuItems = [
                {
                    element: (
                        <span
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                            }}
                        >
                            Add
                            <Icon name="Plus" />
                        </span>
                    ),
                    action: () => alert('Item 1 clicked'),
                    divider: true,
                },
                {
                    element: (
                        <span
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                            }}
                        >
                            <Icon name="Trash" /> Delete
                        </span>
                    ),
                    action: () => alert('Item 2 clicked'),
                    divider: true,
                },
                { element: 'Action with no icon', action: () => alert('Item 3 clicked') },
            ];

            export const AvatarMenu = () => {
                return (
                    <Menu
                        theme={theme}
                        element={<Avatar>John Doe</Avatar>}
                        menuItems={menuItems}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    />
                );
            };
            `},{language:"tsx",snippet:`
            <Menu
                theme={theme}
                element={<Avatar>John Doe</Avatar>}
                menuItems={menuItems}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            />
            `,expandedSnippet:`
            import React from 'react';
            import { Icon } from '../Icon';
            import { Menu } from './Menu';
            
            const handleClose = () => {
                null;
            };
            
            const menuItems = [
               {
                    element: (
                        <span
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                            }}
                        >
                            Add
                            <Icon name="Plus" />
                        </span>
                    ),
                    action: () => alert('Item 1 clicked'),
                    divider: true,
                },
                {
                    element: (
                        <span
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                            }}
                        >
                            <Icon name="Trash" /> Delete
                        </span>
                    ),
                    action: () => alert('Item 2 clicked'),
                    divider: true,
                },
                { element: 'Action with no icon', action: () => alert('Item 3 clicked') },
            ];

            export const AvatarMenu = () => {
                return (
                    <Menu
                        theme={theme}
                        element={<Avatar>John Doe</Avatar>}
                        menuItems={menuItems}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    />
                );
            };
            `}],textMenu:[{language:"jsx",snippet:`
            <Menu
                theme={theme}
                element={'Hello World'}
                menuItems={menuItems}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            />
            `,expandedSnippet:`
            import React from 'react';
            import { Icon } from '../Icon';
            import { Menu } from './Menu';
            
            const handleClose = () => {
                null;
            };
            
            const menuItems = [
               {
                    element: (
                        <span
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                            }}
                        >
                            Add
                            <Icon name="Plus" />
                        </span>
                    ),
                    action: () => alert('Item 1 clicked'),
                    divider: true,
                },
                {
                    element: (
                        <span
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                            }}
                        >
                            <Icon name="Trash" /> Delete
                        </span>
                    ),
                    action: () => alert('Item 2 clicked'),
                    divider: true,
                },
                { element: 'Action with no icon', action: () => alert('Item 3 clicked') },
            ];
            
            export const TextMenu = () => {
                return (
                    <Menu
                        theme={theme}
                        element={'Hello World'}
                        menuItems={menuItems}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    />
                );
            };
            `},{language:"tsx",snippet:`
                <Menu
                    theme={theme}
                    element={'Hello World'}
                    menuItems={menuItems}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                />
            `,expandedSnippet:`
            import { Icon } from '../Icon';
            import { Menu } from './Menu';
            
            const handleClose = () => {
                null;
            };
            
            const menuItems = [
               {
                    element: (
                        <span
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                            }}
                        >
                            Add
                            <Icon name="Plus" />
                        </span>
                    ),
                    action: () => alert('Item 1 clicked'),
                    divider: true,
                },
                {
                    element: (
                        <span
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                            }}
                        >
                            <Icon name="Trash" /> Delete
                        </span>
                    ),
                    action: () => alert('Item 2 clicked'),
                    divider: true,
                },
                { element: 'Action with no icon', action: () => alert('Item 3 clicked') },
            ];
            
            export const TextMenu = () => {
                return (
                    <Menu
                        theme={theme}
                        element={'Hello World'}
                        menuItems={menuItems}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    />
                );
            };
            `}],iconMenu:[{language:"jsx",snippet:`
                <Menu
                    theme={theme}
                    element={<IconButton icon={<Icon name="House" />} />}
                    menuItems={menuItems}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                />
            `,expandedSnippet:`
            import React from 'react';
            import { Icon } from '../Icon';
            import { Menu } from './Menu';
            
            const handleClose = () => {
                null;
            };
            
            const menuItems: IMenuItem[] = [
                {
                    element: (
                        <span
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                            }}
                        >
                            Add
                            <Icon name="Plus" />
                        </span>
                    ),
                    action: () => alert('Item 1 clicked'),
                    divider: true,
                },
                {
                    element: (
                        <span
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                            }}
                        >
                            <Icon name="Trash" /> Delete
                        </span>
                    ),
                    action: () => alert('Item 2 clicked'),
                    divider: true,
                },
                { element: 'Action with no icon', action: () => alert('Item 3 clicked') },
            ];
            
            export const IconMenu = () => {
                return (
                    <Menu
                        theme={theme}
                        element={<IconButton icon={<Icon name="House" />} />}
                        menuItems={menuItems}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    />
                );
            };
            `},{language:"tsx",snippet:`
                <Menu
                    theme={theme}
                    element={<IconButton icon={<Icon name="House" />} />}
                    menuItems={menuItems}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                />
            `,expandedSnippet:`
            import { Icon } from '../Icon';
            import { Menu } from './Menu';
            
            const handleClose = () => {
                null;
            };
            
            const menuItems: IMenuItem[] = [
                {
                    element: (
                        <span
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                            }}
                        >
                            Add
                            <Icon name="Plus" />
                        </span>
                    ),
                    action: () => alert('Item 1 clicked'),
                    divider: true,
                },
                {
                    element: (
                        <span
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                            }}
                        >
                            <Icon name="Trash" /> Delete
                        </span>
                    ),
                    action: () => alert('Item 2 clicked'),
                    divider: true,
                },
                { element: 'Action with no icon', action: () => alert('Item 3 clicked') },
            ];
            
            export const IconMenu = () => {
                return (
                    <Menu
                        theme={theme}
                        element={<IconButton icon={<Icon name="House" />} />}
                        menuItems={menuItems}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    />
                );
            };
            `}]};function p(t){const n={p:"p",...j(),...t.components};return e.jsxs("div",{className:"content",children:[e.jsxs("h1",{children:["Menu v",void 0]}),e.jsx("p",{children:e.jsx(n.p,{children:`A menu displays a list of choices on a temporary surface. It appears when\r
the user interacts with a button, or other control.`})}),e.jsx("hr",{}),e.jsx("h3",{children:"Avatar"}),e.jsx(m,{snippets:l.avatarMenu,children:e.jsx(y,{})}),e.jsx("hr",{}),e.jsx("h3",{children:"Text"}),e.jsx(m,{snippets:l.textMenu,children:e.jsx(A,{})}),e.jsx("hr",{}),e.jsx("h3",{children:"Icon"}),e.jsx(m,{snippets:l.iconMenu,children:e.jsx(O,{})})]})}function b(t={}){const{wrapper:n}={...j(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(p,{...t})}):p(t)}const J={title:"UnifiedUI/Menu",component:a,parameters:{docs:{page:b}}},r={render:()=>e.jsx(y,{})},o={render:()=>e.jsx(A,{})},i={render:()=>e.jsx(O,{})};var h,u,d;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <AvatarMenu />
}`,...(d=(u=r.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};var I,g,x;o.parameters={...o.parameters,docs:{...(I=o.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <TextMenu />
}`,...(x=(g=o.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var v,M,f;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <IconMenu />
}`,...(f=(M=i.parameters)==null?void 0:M.docs)==null?void 0:f.source}}};const R=["MenuAvatar","MenuText","MenuIcon"];export{r as MenuAvatar,i as MenuIcon,o as MenuText,R as __namedExportsOrder,J as default};
