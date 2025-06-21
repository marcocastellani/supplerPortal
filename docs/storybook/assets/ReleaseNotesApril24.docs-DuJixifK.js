import{j as e}from"./index-DrhACB-D.js";import{useMDXComponents as s}from"./index-DmqVK_gK.js";import{M as r}from"./index-C2q6YL-H.js";import"./index-DQDNmYQF.js";import"./index-BGiqdwja.js";import"./iframe-Bt9kuzT5.js";import"./index-CXQShRbs.js";import"./index-DrFu-skq.js";function i(t){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Release notes/April 2024"}),`
`,e.jsx(n.h1,{id:"unifiedui",children:"UnifiedUI"}),`
`,e.jsx(n.p,{children:"This is the UnifiedUI (UUI) component library."}),`
`,e.jsx(n.h2,{id:"architecture",children:"Architecture"}),`
`,e.jsx(n.p,{children:"The UnifiedUI component library provides:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.strong,{children:"UI guidelines and best practices;"})}),`
`,e.jsx(n.li,{children:e.jsx(n.strong,{children:"UI components;"})}),`
`,e.jsx(n.li,{children:e.jsx(n.strong,{children:"Unit tests for UI Components;"})}),`
`,e.jsx(n.li,{children:e.jsx(n.strong,{children:"Storybook (sandbox for the components and documentation)."})}),`
`]}),`
`,e.jsx(n.h2,{id:"good-to-know",children:"Good to know"}),`
`,e.jsxs(n.p,{children:["You can find the published Storybook following the ",e.jsx(n.a,{href:"https://storybook.remira.com/",rel:"nofollow",children:"https://storybook.remira.com/"})," link."]}),`
`,e.jsx(n.h2,{id:"getting-started",children:"Getting Started"}),`
`,e.jsx(n.p,{children:"To run UnifiedUI you will need at least:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"node v20^ (LTS)"})}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"npm v10^"})}),`
`]}),`
`]}),`
`,e.jsxs(n.p,{children:["If you do not have neither of the two you can get on the ",e.jsx(n.a,{href:"https://nodejs.org/en/download",rel:"nofollow",children:"NodeJS"})," official website."]}),`
`,e.jsxs(n.p,{children:["If you are on a Linux machine you can install ",e.jsx(n.a,{href:"https://github.com/nvm-sh/nvm",rel:"nofollow",children:"nvm"})," to have an easier time in managing node version on your machine."]}),`
`,e.jsx(n.h2,{id:"build-test-run-and-debug",children:"Build, test, run and debug"}),`
`,e.jsx(n.h3,{id:"requirements",children:"Requirements"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Before using any of the below commands, you need to run ",e.jsx(n.strong,{children:e.jsx(n.code,{children:"npm install"})})," in order to install all packages"]}),`
`]}),`
`,e.jsx(n.h3,{id:"commands",children:"Commands"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Building the component library: ",e.jsx(n.strong,{children:e.jsx(n.code,{children:"npm run build"})})]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Building the storybook static website: ",e.jsx(n.strong,{children:e.jsx(n.code,{children:"npm run build-storybook"})})]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Testing the component library: ",e.jsx(n.strong,{children:e.jsx(n.code,{children:"npm run test"})})]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Running storybook: ",e.jsx(n.strong,{children:e.jsx(n.code,{children:"npm run storybook"})})]}),`
`]}),`
`]}),`
`,e.jsx(n.h3,{id:"debugging",children:"Debugging"}),`
`,e.jsx(n.p,{children:`You can use the local version of the UnifiedUI in any project, if you ever find yourself in a situation where you need to make updates to some components and want a way of testing them.
In order to do so, you have to navigate to your frontend project and run the following command:`}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.strong,{children:e.jsx(n.code,{children:"npm link \\path\\to\\UnifiedUI\\local\\repository"})})}),`
`]}),`
`,e.jsx(n.p,{children:"And then you can run:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.strong,{children:e.jsx(n.code,{children:"npm install \\path\\to\\UnifiedUI\\local\\repository"})})}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"AWARE!! you need yo revert the package.json to use the remote repository before pushing commits to the main branch or else the application will stop working!"})}),`
`,e.jsx(n.h2,{id:"how-to-use-unifiedui-on-a-project",children:"How to use UnifiedUI on a project"}),`
`,e.jsxs(n.p,{children:["To use UnifiedUI on your project you need to make sure you have access to the ",e.jsx(n.strong,{children:"@remira npm registry"})," with the right auth token, that needs to be stored in a ",e.jsx(n.strong,{children:e.jsx(n.code,{children:".npmrc"})})," file in the root folder of the project."]}),`
`,e.jsx(n.p,{children:"If you do, you can run the following command"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.strong,{children:e.jsx(n.code,{children:"npm install @remira/unifiedui"})})}),`
`]}),`
`,e.jsx(n.p,{children:"Which will install the latest version of the UnifiedUI component library."}),`
`,e.jsx(n.p,{children:"With the UnifiedUI package installed, some additional setup is required in order to run the component library."}),`
`,e.jsx(n.p,{children:"Since UnifiedUI provides some additional shared assets, it's necessary to retrieve them and copy them inside the project folder."}),`
`,e.jsx(n.p,{children:"This procedure can be automated by setting up some vite configuration."}),`
`,e.jsx(n.p,{children:"It is required to install the rollup-plugin-copy package, using the following command:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.strong,{children:e.jsx(n.code,{children:"npm install rollup-plugin-copy -D"})})}),`
`]}),`
`,e.jsx(n.p,{children:"The plugin configuration should look like the following:"}),`
`,e.jsx(n.h4,{id:"viteconfigts",children:e.jsx(n.strong,{children:e.jsx(n.code,{children:"vite.config.ts"})})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`    ...
    plugins: [
		copy({
			targets: [
				{
					src: [
						'!node_modules/@remira/unifiedui/dist/assets/shared/flags',
						'node_modules/@remira/unifiedui/dist/assets',
					],
					dest: 'src',
				},
				{
					src: 'node_modules/@remira/unifiedui/dist/assets/shared/flags',
					dest: 'public',
				},
				{
					src: 'node_modules/@remira/unifiedui/dist/fonts',
					dest: 'public',
				},
			],
		}),
		...
	],
    ...
`})}),`
`,e.jsxs(n.p,{children:["You also have to make sure that your package type is set to ",e.jsx(n.strong,{children:"module"}),"."]}),`
`,e.jsx(n.h4,{id:"packagejson",children:e.jsx(n.strong,{children:e.jsx(n.code,{children:"package.json"})})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-json",children:`...
"type": "module"
...
`})}),`
`,e.jsx(n.h2,{id:"-correctly-use-the-unifiedui-component-library-",children:"/!\\ Correctly use the UnifiedUI component library /!\\"}),`
`,e.jsx(n.p,{children:"To correctly make use of the UnifiedUI library, it is strictly required to have all the mentioned dependencies and then follow the steps below:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"It is necessary to have the main.tsx file configured as follows:"}),`
`]}),`
`,e.jsx(n.h4,{id:"maintsx",children:e.jsx(n.strong,{children:e.jsx(n.code,{children:"main.tsx"})})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`...
import { ThemeProvider } from '@remira/unifiedui';
import '@remira/unifiedui/dist/styles/shared/design.scss';
...
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<ThemeProvider>
		...
	</ThemeProvider>
);

`})}),`
`,e.jsx(n.p,{children:"It should include the design.scss file and the ThemeProvider component exported by the UnifiedUI."}),`
`,e.jsx(n.p,{children:e.jsx(n.em,{children:"Updates POST APRIL 2024"})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"The updates are already merged into the readme above"})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"@remira/unifiedui and @remira/ucpaccelerator_unified_utils packages bundling migration and updates"})}),`
`,e.jsx(n.p,{children:"These release notes are gonna be relevant for the following packages:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["@remira/unifiedui ",e.jsx(n.strong,{children:"1.0.80^"})]}),`
`,e.jsxs(n.li,{children:["@remira/ucpaccelerator_unified_utils ",e.jsx(n.strong,{children:"0.1.25^"})]}),`
`]}),`
`,e.jsx(n.p,{children:"With the migration of the technology used for bundling in the upmentioned libaries, some dependencies have also been updated to be in sync with the latest technologies in the market and some peer dependencies are not backwards compatible with what we used to have, this means that dependencies in the services that are making use of these libraries will have to be updated accordingly."}),`
`,e.jsx(n.p,{children:"As of now, the updates causing breaking changes are relative to the following packages:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["@tanstack/react-query from ",e.jsx(n.strong,{children:"4.3x.xx^ to 5.29.2"})]}),`
`,e.jsxs(n.li,{children:["oidc-client-ts from ",e.jsx(n.strong,{children:"2.4.x^ to 3.0.1"})]}),`
`,e.jsxs(n.li,{children:["react-oidc-context from ",e.jsx(n.strong,{children:"2.xx.xx^ to 3.0.0"})]}),`
`,e.jsxs(n.li,{children:["react-hook-form from ",e.jsx(n.strong,{children:"7.50.1 to 7.51.3"})]}),`
`,e.jsxs(n.li,{children:["sass from ",e.jsx(n.strong,{children:"1.71.0 to 1.75.0"})]}),`
`,e.jsxs(n.li,{children:["typescript from ",e.jsx(n.strong,{children:"4.9.5 to 5.4.5"})]}),`
`,e.jsxs(n.li,{children:["@types/node from ",e.jsx(n.strong,{children:"18.14.2 to 20.12.7"})]}),`
`,e.jsxs(n.li,{children:["@types/react from ",e.jsx(n.strong,{children:"18.2.56 to 18.2.78"})]}),`
`,e.jsxs(n.li,{children:["@types/react-dom from ",e.jsx(n.strong,{children:"18.2.19 to 18.2.25"})]}),`
`,e.jsxs(n.li,{children:["vite from ",e.jsx(n.strong,{children:"4.xx.xx^ to 5.2.8"})]}),`
`,e.jsxs(n.li,{children:["@vitejs/plugin-react from ",e.jsx(n.strong,{children:"3.1.0 to 4.2.1"})]}),`
`,e.jsxs(n.li,{children:["redux from ",e.jsx(n.strong,{children:"4.2.1 to 5.0.1"})]}),`
`,e.jsxs(n.li,{children:["react-redux from ",e.jsx(n.strong,{children:"8.1.2 to 9.1.1"})]}),`
`,e.jsxs(n.li,{children:["@reduxjs/toolkit from ",e.jsx(n.strong,{children:"1.9.5 to 2.2.3"})]}),`
`]}),`
`,e.jsx(n.p,{children:"Keep in mind that some mentioned versions might differ slightly, in case they do, just update them to match the exact migrated-to one. It is mandatory for the service to have the exact or greater than the upmentioned versions or peer dependencies might throw errors of backward compatibility."}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"The @tanstack/react-query package introduces some breaking changes relative to how the hook has to be used!"})}),`
`,e.jsxs(n.p,{children:["Example of use of the hook ",e.jsx(n.strong,{children:"before"})," the update:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`const avatarImage = useQuery(
    ['some-query-key'],
    () => get({
	    endpoint: 'some-endpoint', api: 'some-api',
	    apiVersion: 'some-api-version'
	}).then((res) => res),
    { staleTime: 60000, retry: false }
);
`})}),`
`,e.jsxs(n.p,{children:["Example of use of the hook ",e.jsx(n.strong,{children:"after"})," the update:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`const avatarImage = useQuery(
    {
	    queryKey: ['some-query-key'],
	    queryFn: () => get({
		    endpoint: 'some-endpoint', api: 'some-api',
		    apiVersion: 'some-api-version'
		}).then((res) => res),
	    staleTime: 60000,
	    retry: false
	}
);
`})}),`
`,e.jsxs(n.p,{children:["Also other utility functions, like the ",e.jsx(n.strong,{children:"refetchQueries"})," and ",e.jsx(n.strong,{children:"removeQueries"})," have to be used differently:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`const  queryClient  =  useQueryClient();
queryClient.refetchQueries({ queryKey: ['some-query-key'] });
queryClient.removeQueries({ queryKey: ['some-query-key'] });
`})}),`
`,e.jsxs(n.p,{children:["Gulp is not gonna be required any more for copying assets over to the project, but the ",e.jsx(n.strong,{children:"vite.config.ts"})," (defineConfig object, below the build property) will have to be updated accordingly:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`plugins: [
	copy({
		targets: [
			{
				src: [
					'!node_modules/@remira/unifiedui/dist/assets/shared/flags',
					'node_modules/@remira/unifiedui/dist/assets',
				],
				dest: 'src',
			},
			{
				src: 'node_modules/@remira/unifiedui/dist/assets/shared/flags',
				dest: 'public',
			},
			{
				src: 'node_modules/@remira/unifiedui/dist/fonts',
				dest: 'public',
			},
		],
	}),
    ...
]
`})}),`
`,e.jsxs(n.p,{children:["In the ",e.jsx(n.strong,{children:"main.tsx"})," file, you will need to change the path to the design.scss file as follows:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`import '@remira/unifiedui/dist/styles/shared/design.scss';
`})}),`
`,e.jsxs(n.p,{children:["And also the path to the variables.scss file in the ",e.jsx(n.strong,{children:"index.scss"})," file (main style file of the product) will have to be updated as follows:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`@import '@remira/unifiedui/dist/styles/shared/variables.scss';
`})})]})}function p(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{p as default};
