import{j as e}from"./index-DrhACB-D.js";import{A as d,d as a}from"./Upload-ChF5xKSK.js";import{useMDXComponents as p}from"./index-DmqVK_gK.js";import{S as h}from"./docs-CJ9d-umt.js";import"./index-DQDNmYQF.js";import"./index-BGiqdwja.js";import"./theming-C7i7v1dL.js";import"./tiny-invariant-CopsF_GD.js";const n=t=>{const i=[{title:"Italy",expanded:!0,subtitle:e.jsx(a,{name:"Public"}),content:e.jsxs("ul",{children:[e.jsx("li",{children:"Italy has more UNESCO World Heritage Sites than any other country in the world, with a total of 55 sites."}),e.jsx("li",{children:"The country has a population of over 60 million people, making it the 23rd most populous country in the world."}),e.jsx("li",{children:"Italian is the official language of Italy, but there are also several regional languages, including Sardinian, Friulian, and Ladin."}),e.jsx("li",{children:"There are three active volcanoes in Europe, all in Italy."}),e.jsx("li",{children:"Italy is the world’s largest wine producer."})]})},{title:"Chile",subtitle:e.jsx(a,{name:"Public"}),content:e.jsxs("ul",{children:[e.jsx("li",{children:"Chile is the longest country in the world from north to south at 2,653 miles."}),e.jsx("li",{children:"Ferdinand Magellan was the first European to set foot on what is now Chile. He visited the land in 1520 during his attempt to circumnavigate the globe."}),e.jsx("li",{children:"Monte Verde is the oldest-known site of human habitation in the Americas. The widely accepted date for early occupation at Monte Verde is 16,500 B.C."})]})},{title:"Nigeria",subtitle:e.jsx(a,{name:"Public"}),content:e.jsxs("ul",{children:[e.jsx("li",{children:"With a population of 211 million people, Nigeria has the biggest population out of any country on the African continent."}),e.jsx("li",{children:"The country covers a total area of around 923,769 km²."}),e.jsx("li",{children:"As a federal republic, Nigeria divides itself into 26 states plus its capital territory."})]})}];return e.jsx(d,{options:i,...t})};try{n.displayName="AccordionExample",n.__docgenInfo={description:"",displayName:"AccordionExample",props:{}}}catch{}const u={accordion:[{language:"jsx",snippet:`
			<Accordion options={options} />
			`,expandedSnippet:`
			import React, { FC } from 'react';
            import { Icon } from '../Icon';
            import { Accordion } from './Accordion';

            export const AccordionExample = () => {
                const options = [
                    {
                        title: 'Italy',
                        subtitle: <Icon name="Public" />,
                        content: (
                            <ul>
                                <li>
                                    Italy has more UNESCO World Heritage Sites than any other country in
                                    the world, with a total of 55 sites.
                                </li>
                                <li>
                                    The country has a population of over 60 million people, making it
                                    the 23rd most populous country in the world.
                                </li>
                                <li>
                                    Italian is the official language of Italy, but there are also
                                    several regional languages, including Sardinian, Friulian, and
                                    Ladin.
                                </li>
                                <li>There are three active volcanoes in Europe, all in Italy.</li>
                                <li>Italy is the world’s largest wine producer.</li>
                            </ul>
                        ),
                    },
                    {
                        title: 'Chile',
                        subtitle: <Icon name="Public" />,
                        content: (
                            <ul>
                                <li>
                                    Chile is the longest country in the world from north to south at
                                    2,653 miles.
                                </li>
                                <li>
                                    Ferdinand Magellan was the first European to set foot on what is now
                                    Chile. He visited the land in 1520 during his attempt to
                                    circumnavigate the globe.
                                </li>
                                <li>
                                    Monte Verde is the oldest-known site of human habitation in the
                                    Americas. The widely accepted date for early occupation at Monte
                                    Verde is 16,500 B.C.
                                </li>
                            </ul>
                        ),
                    },
                    {
                        title: 'Nigeria',
                        subtitle: <Icon name="Public" />,
                        content: (
                            <ul>
                                <li>
                                    With a population of 211 million people, Nigeria has the biggest
                                    population out of any country on the African continent.
                                </li>
                                <li>The country covers a total area of around 923,769 km².</li>
                                <li>
                                    As a federal republic, Nigeria divides itself into 26 states plus
                                    its capital territory.
                                </li>
                            </ul>
                        ),
                    },
                ];

                return <Accordion options={options} />;
            };
			`},{language:"tsx",snippet:`
			<Accordion options={options} />
			`,expandedSnippet:`
        import React, { FC } from 'react';
        import { Icon } from '../Icon';
        import { Accordion } from './Accordion';
        import { AccordionSectionProps } from './Accordion.d';

        export const AccordionExample: FC = () => {
            const options: AccordionSectionProps[] = [
                {
                    title: 'Italy',
                    subtitle: <Icon name="Public" />,
                    content: (
                        <ul>
                            <li>
                                Italy has more UNESCO World Heritage Sites than any other country in
                                the world, with a total of 55 sites.
                            </li>
                            <li>
                                The country has a population of over 60 million people, making it
                                the 23rd most populous country in the world.
                            </li>
                            <li>
                                Italian is the official language of Italy, but there are also
                                several regional languages, including Sardinian, Friulian, and
                                Ladin.
                            </li>
                            <li>There are three active volcanoes in Europe, all in Italy.</li>
                            <li>Italy is the world’s largest wine producer.</li>
                        </ul>
                    ),
                },
                {
                    title: 'Chile',
                    subtitle: <Icon name="Public" />,
                    content: (
                        <ul>
                            <li>
                                Chile is the longest country in the world from north to south at
                                2,653 miles.
                            </li>
                            <li>
                                Ferdinand Magellan was the first European to set foot on what is now
                                Chile. He visited the land in 1520 during his attempt to
                                circumnavigate the globe.
                            </li>
                            <li>
                                Monte Verde is the oldest-known site of human habitation in the
                                Americas. The widely accepted date for early occupation at Monte
                                Verde is 16,500 B.C.
                            </li>
                        </ul>
                    ),
                },
                {
                    title: 'Nigeria',
                    subtitle: <Icon name="Public" />,
                    content: (
                        <ul>
                            <li>
                                With a population of 211 million people, Nigeria has the biggest
                                population out of any country on the African continent.
                            </li>
                            <li>The country covers a total area of around 923,769 km².</li>
                            <li>
                                As a federal republic, Nigeria divides itself into 26 states plus
                                its capital territory.
                            </li>
                        </ul>
                    ),
                },
            ];

            return <Accordion options={options} />;
        };
			`}]};function l(t){const i={p:"p",...p(),...t.components};return e.jsxs("div",{className:"content",children:[e.jsxs("h1",{children:["Accordion v",void 0]}),e.jsx("p",{children:e.jsx(i.p,{children:"A collapsible and expandable set of content sections, that allows users to navigate through information in a more organized and space-efficient manner."})}),e.jsx(h,{snippets:u.accordion,children:e.jsx(n,{})}),e.jsx("hr",{}),e.jsx("h1",{children:"Accordion section"}),e.jsxs("p",{children:["The accordion component accepts an ",e.jsx("b",{children:"options"})," property of type ",e.jsx("b",{children:"AccordionSectionProps"}),"."]})]})}function m(t={}){const{wrapper:i}={...p(),...t.components};return i?e.jsx(i,{...t,children:e.jsx(l,{...t})}):l(t)}const I={title:"UnifiedUI/Accordion",component:d,parameters:{docs:{page:m}}},o={render:t=>e.jsx(n,{...t})};var r,s,c;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: (args: any) => <AccordionExample {...args} />
}`,...(c=(s=o.parameters)==null?void 0:s.docs)==null?void 0:c.source}}};const v=["BaseAccordion"];export{o as BaseAccordion,v as __namedExportsOrder,I as default};
