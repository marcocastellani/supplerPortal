import{j as a}from"./index-DrhACB-D.js";import{j as c}from"./Upload-ChF5xKSK.js";import{useMDXComponents as M}from"./index-DmqVK_gK.js";import{S as m}from"./docs-CJ9d-umt.js";import"./index-DQDNmYQF.js";import"./index-BGiqdwja.js";import"./theming-C7i7v1dL.js";import"./tiny-invariant-CopsF_GD.js";const s=r=>a.jsx(c,{avatarUrl:"https://unsplash.com/photos/YrMjQFkXYIs/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mzh8fGxlZ298ZW58MHx8fHwxNjc4OTI4ODgz&force=true&w=1920",...r}),p=r=>a.jsx(c,{...r,children:"John Doe"}),i=r=>a.jsx(c,{variant:"square",...r,children:"John Doe"});try{s.displayName="AvatarExample",s.__docgenInfo={description:"",displayName:"AvatarExample",props:{}}}catch{}try{p.displayName="AvatarWithInitialsExample",p.__docgenInfo={description:"",displayName:"AvatarWithInitialsExample",props:{}}}catch{}try{i.displayName="AvatarWithSquareContainerExample",i.__docgenInfo={description:"",displayName:"AvatarWithSquareContainerExample",props:{}}}catch{}const v={avatar:[{language:"jsx",snippet:"<Avatar avatarUrl={avatarUrl} />",expandedSnippet:`
            import React from 'react';
            import { Avatar } from './Avatar';
            
            export const AvatarExample = (props) => {
                const avatarUrl = 'https://unsplash.com/photos/YrMjQFkXYIs/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mzh8fGxlZ298ZW58MHx8fHwxNjc4OTI4ODgz&force=true&w=1920';
                return <Avatar avatarUrl={avatarUrl} />;
            };
            `},{language:"tsx",snippet:"<Avatar avatarUrl={avatarUrl} />",expandedSnippet:`
            import React, { FC } from 'react';
            import { Avatar } from './Avatar';
            import { AvatarProps } from './Avatar.d';

            export const AvatarExample: FC = (props: AvatarProps) => {
                const avatarUrl: string = 'https://unsplash.com/photos/YrMjQFkXYIs/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mzh8fGxlZ298ZW58MHx8fHwxNjc4OTI4ODgz&force=true&w=1920';
                return <Avatar avatarUrl={avatarUrl} />;
            };
            `}],avatarWithInitials:[{language:"jsx",snippet:"<Avatar>John Doe</Avatar>",expandedSnippet:`
            import React from 'react';
            import { Avatar } from './Avatar';
            
            export const AvatarExample = (props) => {
                return <Avatar>John Doe</Avatar>;
            };
            `},{language:"tsx",snippet:"<Avatar>John Doe</Avatar>",expandedSnippet:`
            import React, { FC } from 'react';
            import { Avatar } from './Avatar';
            import { AvatarProps } from './Avatar.d';

            export const AvatarExample: FC = (props: AvatarProps) => {
                return <Avatar>John Doe</Avatar>;
            };
            `}],avatarWithSquareContainer:[{language:"jsx",snippet:"<Avatar variant='square'>John Doe</Avatar>",expandedSnippet:`
            import React from 'react';
            import { Avatar } from './Avatar';
            
            export const AvatarExample = (props) => {
                return <Avatar variant='square'>John Doe</Avatar>;
            };
            `},{language:"tsx",snippet:"<Avatar variant='square'>John Doe</Avatar>",expandedSnippet:`
            import React, { FC } from 'react';
            import { Avatar } from './Avatar';
            import { AvatarProps } from './Avatar.d';
            
            export const AvatarExample: FC = (props: AvatarProps) => {
                return <Avatar variant='square'>John Doe</Avatar>;
            };
            `}]};function l(r){const t={p:"p",...M(),...r.components};return a.jsxs("div",{className:"content",children:[a.jsxs("h1",{children:["Avatar v",void 0]}),a.jsx("p",{children:a.jsx(t.p,{children:"A graphical representation of a user that can range from an image to the initials of the user's name and lastName."})}),a.jsx("hr",{}),a.jsx("h3",{children:"Avatar using an image URL"}),a.jsx(m,{snippets:v.avatar,children:a.jsx(s,{})}),a.jsx("hr",{}),a.jsx("h3",{children:"Avatar using the user's initials"}),a.jsx(m,{snippets:v.avatarWithInitials,children:a.jsx(p,{})}),a.jsx("hr",{}),a.jsx("h3",{children:"Avatar with a square shape"}),a.jsx(m,{snippets:v.avatarWithSquareContainer,children:a.jsx(i,{})})]})}function W(r={}){const{wrapper:t}={...M(),...r.components};return t?a.jsx(t,{...r,children:a.jsx(l,{...r})}):l(r)}const q={title:"UnifiedUI/Avatar",component:c,parameters:{docs:{page:W}}},e={render:r=>a.jsx(s,{...r})},o={render:r=>a.jsx(p,{...r})},n={render:r=>a.jsx(i,{...r})};var x,d,A;e.parameters={...e.parameters,docs:{...(x=e.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: (args: any) => <AvatarExample {...args} />
}`,...(A=(d=e.parameters)==null?void 0:d.docs)==null?void 0:A.source}}};var h,u,f;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: (args: any) => <AvatarWithInitialsExample {...args} />
}`,...(f=(u=o.parameters)==null?void 0:u.docs)==null?void 0:f.source}}};var j,g,_;n.parameters={...n.parameters,docs:{...(j=n.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: (args: any) => <AvatarWithSquareContainerExample {...args} />
}`,...(_=(g=n.parameters)==null?void 0:g.docs)==null?void 0:_.source}}};const F=["BaseAvatar","AvatarWithInitials","AvatarWithSquareContainer"];export{o as AvatarWithInitials,n as AvatarWithSquareContainer,e as BaseAvatar,F as __namedExportsOrder,q as default};
