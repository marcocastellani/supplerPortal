import{j as e}from"./index-DrhACB-D.js";import{E as s}from"./Upload-ChF5xKSK.js";import{useMDXComponents as l}from"./index-DmqVK_gK.js";import{S as n}from"./docs-CJ9d-umt.js";import"./index-DQDNmYQF.js";import"./index-BGiqdwja.js";import"./theming-C7i7v1dL.js";import"./tiny-invariant-CopsF_GD.js";const o=()=>e.jsx(s,{navigateMessage:"Back",navigate:()=>alert("Back clicked"),navigateDashboardMessage:"Back Home",navigateDashboard:()=>alert("Back Home clicked")}),t=()=>e.jsx(s,{navigateMessage:"Back",navigate:()=>alert("Back clicked"),navigateDashboardMessage:"Back Home",navigateDashboard:()=>alert("Back Home clicked"),errorMessage:"Not Authorized",errorCode:401});try{o.displayName="ErrorPageExamples",o.__docgenInfo={description:"",displayName:"ErrorPageExamples",props:{}}}catch{}try{t.displayName="ErrorPageCustomExamples",t.__docgenInfo={description:"",displayName:"ErrorPageCustomExamples",props:{}}}catch{}const i={errorpage:[{language:"jsx",snippet:"<ErrorPage />",expandedSnippet:`
            import React from 'react';
            import { ErrorPage } from './ErrorPage';

            export const ErrorPageExample = (props) => {
                return <ErrorPage 
                            navigateMessage={'Back Home'}
                            navigate={() => alert('Back Home clicked')}
                            navigateDashboardMessage={'Back Home'}
                            navigateDashboard={() => alert('Back Home clicked')}
                        />;
            };
            `},{language:"tsx",snippet:"<ErrorPage />",expandedSnippet:`
            import React, { FC } from 'react';
            import { ErrorPage } from './ErrorPage';

            export const ErrorPageExample: FC = (props: any) => {
                return <ErrorPage 
                            navigateMessage={'Back'}
                            navigate={() => alert('Back clicked')}
                            navigateDashboardMessage={'Back Home'}
                            navigateDashboard={() => alert('Back Home clicked')}
                        />;
            };
            `}],customerror:[{language:"jsx",snippet:"<ErrorPage />",expandedSnippet:`
                import React from 'react';
                import { ErrorPage } from './ErrorPage';
    
                export const ErrorPageExample = (props) => {
                    return <ErrorPage 
                                navigateMessage={'Back'}
                                navigate={() => alert('Back clicked')}
                                navigateDashboardMessage={'Back Home'}
                                navigateDashboard={() => alert('Back Home clicked')}
                                errorMessage="Not Authorized"
                                errorCode=401
                        />;
                };
                `},{language:"tsx",snippet:"<ErrorPage />",expandedSnippet:`
                import React, { FC } from 'react';
                import { ErrorPage } from './ErrorPage';
    
                export const ErrorPageExample: FC = (props: any) => {
                    return <ErrorPage 
                                navigateMessage={'Back'}
                                navigate={() => alert('Back clicked')}
                                navigateDashboardMessage={'Back Home'}
                                navigateDashboard={() => alert('Back Home clicked')}
                                errorMessage="Not Authorized"
                                errorCode=401
                        />;
                };
                `}]};function p(r){return e.jsxs("div",{className:"content",children:[e.jsxs("h1",{children:["ErrorPage v",void 0]}),e.jsx("p",{children:"Page that can be used for each kind of error in your application"}),e.jsx("hr",{}),e.jsx("h3",{children:"Basic usage"}),e.jsx(n,{snippets:i.errorpage,children:e.jsx(o,{})}),e.jsx("hr",{}),e.jsx("h3",{children:"Custom Error"}),e.jsx(n,{snippets:i.customerror,children:e.jsx(t,{})})]})}function E(r={}){const{wrapper:c}={...l(),...r.components};return c?e.jsx(c,{...r,children:e.jsx(p,{...r})}):p()}const j={title:"UnifiedUI/ErrorPage",component:s,parameters:{docs:{page:E}}},a={render:()=>e.jsx(o,{})};var g,m,d;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <ErrorPageExamples />
}`,...(d=(m=a.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};const M=["BaseErrorPage"];export{a as BaseErrorPage,M as __namedExportsOrder,j as default};
