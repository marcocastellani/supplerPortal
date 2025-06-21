import{j as e}from"./index-DrhACB-D.js";import{useMDXComponents as r}from"./index-DmqVK_gK.js";import{M as t}from"./index-C2q6YL-H.js";import"./index-DQDNmYQF.js";import"./index-BGiqdwja.js";import"./iframe-Bt9kuzT5.js";import"./index-CXQShRbs.js";import"./index-DrFu-skq.js";function i(s){const n={h1:"h1",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",strong:"strong",ul:"ul",...r(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{title:"Release notes/December 2024"}),`
`,e.jsx(n.h1,{id:"unifiedui-v01160",children:"UnifiedUI v0.1.160"}),`
`,e.jsxs(n.p,{children:["At the time of the December 2024 release notes, UnifiedUI ",e.jsx(n.strong,{children:"(UUI)"})," is v.0.1.160."]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.strong,{children:"npm install @remira/unifiedui@1.0.160"})}),`
`]}),`
`,e.jsx(n.h1,{id:"changes-from-previous-versions",children:"Changes from previous versions"}),`
`,e.jsx(n.h2,{id:"overview",children:"Overview"}),`
`,e.jsx(n.p,{children:"The UnifiedUI has been optimised with the latest version to address some build issues:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.strong,{children:"The custom Minifiyer that was used has been removed and the new built-in Vite one is in use;"})}),`
`,e.jsx(n.li,{children:e.jsx(n.strong,{children:"The dts script has been slightly changed to ensure only relevant type definitions are exported;"})}),`
`,e.jsx(n.li,{children:e.jsx(n.strong,{children:"Removed all unused type defintiions and interfaces;"})}),`
`,e.jsx(n.li,{children:e.jsx(n.strong,{children:"Import/Export madness has been adjusted, there's only one source of truth on the exports and not an export loop;"})}),`
`,e.jsx(n.li,{children:e.jsx(n.strong,{children:"Storybook and relevant dependencies have been updated;"})}),`
`,e.jsx(n.li,{children:e.jsx(n.strong,{children:"Tree-shaking for dependencies is now in place;"})}),`
`,e.jsx(n.li,{children:e.jsx(n.strong,{children:"Build times, optimisation and chunk splitting:"})}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/src/assets/rnd2024-build.png",alt:"Build times and chunks"})}),`
`,e.jsx(n.h2,{id:"component-wise",children:"Component-wise"}),`
`,e.jsx(n.h3,{id:"numberinput",children:e.jsx(n.strong,{children:"NumberInput"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"REMOVED"}),"!"]}),`
`,e.jsx(n.li,{children:"Basic Input component now supports numeric inputs."}),`
`]}),`
`,e.jsx(n.h3,{id:"input",children:e.jsx(n.strong,{children:"Input"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Added support for ",e.jsx(n.strong,{children:'type="number"'}),"."]}),`
`,e.jsxs(n.li,{children:["Added ",e.jsx(n.strong,{children:"min"}),", ",e.jsx(n.strong,{children:"max"})," and ",e.jsx(n.strong,{children:"step"})," properties."]}),`
`]}),`
`,e.jsx(n.h3,{id:"inputcta",children:e.jsx(n.strong,{children:"InputCTA"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Added support for ",e.jsx(n.strong,{children:'type="number"'}),"."]}),`
`,e.jsxs(n.li,{children:["Added ",e.jsx(n.strong,{children:"min"}),", ",e.jsx(n.strong,{children:"max"})," and ",e.jsx(n.strong,{children:"step"})," properties."]}),`
`]}),`
`,e.jsx(n.h3,{id:"table",children:e.jsx(n.strong,{children:"Table"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Added ",e.jsx(n.strong,{children:"rowHeight"})," property to set dynamic row heights ('auto')."]}),`
`]}),`
`,e.jsx(n.h2,{id:"generics",children:"Generics"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Removed annoying assets that were copied in the dist folder"}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"All control elements"})," have now type-safe handlers for changing values, some errors might be thrown as the interface HAS to match the handler."]}),`
`,e.jsx(n.li,{children:"Unnecessary interface inheritance was removed on some components."}),`
`]}),`
`,e.jsx(n.h1,{id:"news",children:"News"}),`
`,e.jsx(n.h2,{id:"developer-friendly-documentation-example",children:"Developer friendly documentation (example)"}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/src/assets/rnd2024-dev.png",alt:"Developer friendly docs"})})]})}function p(s={}){const{wrapper:n}={...r(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(i,{...s})}):i(s)}export{p as default};
