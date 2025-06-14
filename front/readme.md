# UCP Microfrontend

This is an example project to create an UCP Portal compatible microfrontend app.

# Cookbook

This cookbook lets you to create a microfrontend application compatible with the UCP Portal.

A microfrontend application, in our context, is a Typescript React application that uses Vite.

Node.js and npm need to be installed on the system in order to work with the technologies involved in the workflow.

## You don't have Node.js and npm?

You can follow the guides below to get started with Node.js and npm

### Windows based systems

https://treehouse.github.io/installation-guides/windows/node-windows.html

It is **_strongly recommended_** to work on a Linux subsystem, you can follow this guide if you want to do so:

https://learn.microsoft.com/en-us/windows/wsl/install

### Linux based systems

https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-22-04#option-3-installing-node-using-the-node-version-manager

N.B. The link follows Option 3 because my suggestion is using the node version manager for a more flexible environment, but feel free to go for Option 1 or 2.

## Want to replicate this?

### /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\

### /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\

> **_The content below will explain how to replicate this on your own._**
>
> **_This is not necessary whatsoever, for ease of use this repository can be cloned and adjusted to the needs of everyone._**
>
> **_The explanation below is intended to give some context on the technologies we are using and why we are using them, to make the learning curve smoother._**

### /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\

### /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\ /!\\

## Prerequisited

###  Authenticate

Local `.npmrc` file is using a env variable to auth with DevOps Artifactory. To use it, run
`REMIRA_TOKEN=$(BASE64_TOKEN) npm install`
and replace `$(BASE64_TOKEN)` with a valid PAT from DevOps in BASE64, following the Guide in here:
https://dev.azure.com/remira/UnifiedCommercePlatform/_artifacts/feed/remira/connect

Command only needs to be run once to cache authentication with Devops

## Getting started

1. Use the Vite command to create a new application. This can be done using the npm init command without installing any additional software. Open a terminal in a folder of your choice and run the following command:

```bash
npm create vite@latest
```

_(If you are asked to agree to install the create-vite package, simply answer with yes)_
This command will prompt you with some options, you wanna use the React Typescript one.

1. Navigate into the new project folder and run the command below to install all the dependencies:
   REMIRA_TOKEN=$(BASE64_TOKEN) npm install npm install

2. You will be using the react-router-dom package to manage navigation through your single-page app and react-oidc-context to manage the authentication. Run the following commands to install the additional dependencies:

```bash
npm install react-router-dom --save
npm install @types/react-router-dom --save-dev
npm install react-oidc-context --save
```

3. Other dependencies are required for creating a microfrontend application that is compatible with the UCP portal:
   - The vite-plugin-federation will be needed to handle the microfrontend export of your app;
   - The redux, @reduxjs/toolkit and react-redux packages will be used to handle application wise state management;
   - The @tanstack/react-query and axios packages will be used to request data from the backend;
   - The i18next, i18next-http-backend and react-i18next packages will be used for localization;
   - The react-hot-toast for handling toast notifications.
     The dev packages, instead, are utilities for development, like the eslint package that allows debugging of the application.

```bash
npm install @originjs/vite-plugin-federation redux @reduxjs/toolkit react-redux @remira/unifiedui @remira/ucpaccelerator_unified_utils @tanstack/react-query axios bootstrap i18next i18next-http-backend react-i18next react-hot-toast --save
npm install eslint eslint-plugin-react-hooks eslint-plugin-react eslint-plugin-react-refresh @progress/kendo-theme-bootstrap gulp gulp-install sass vite-plugin-top-level-await vite-tsconfig-paths @types/node @typescript-eslint/eslint-plugin @typescript-eslint/parser  --save-dev
```

4. In order to use the eslint package, you want to have some configuration:

#### **`.eslintrc.json`**

```json
{
	"root": true,
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended"
	],

	"overrides": [],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"plugins": ["react", "@typescript-eslint"],
	"rules": {
		"react/react-in-jsx-scope": "off"
	},
	"settings": {
		"react": {
			"version": "detect"
		}
	}
}
```

## /!\ Correctly use the UnifiedUI component library /!\

To correctly make use of the UnifiedUI library, it is strictly required to have all the mentioned dependencies and then follow the steps below:

1. It is mandatory to run the gulp tasks that allow the copying of required assets, using the following automated command:

```bash
  npm run install-all
```

The gulp file that contains the tasks looks as follows:

#### **`gulpfile.js`**

```js
var gulp = require('gulp');
var install = require('gulp-install');

gulp.task('install', function () {
	return gulp.src(['./package.json']).pipe(install());
});

gulp.task('copy-assets', function () {
	gulp
		.src(['node_modules/@remira/unifiedui/dist/cjs/assets/shared/flags/**'])
		.pipe(gulp.dest('public/flags'));

	return gulp
		.src([
			'node_modules/@remira/unifiedui/dist/cjs/assets/**',
			'!node_modules/@remira/unifiedui/dist/cjs/assets/shared/flags/**',
		])
		.pipe(gulp.dest('src/assets'));
});

gulp.task('copy-fonts', function () {
	return gulp
		.src(['node_modules/@remira/unifiedui/dist/cjs/fonts/**'])
		.pipe(gulp.dest('public/fonts'));
});

gulp.task('copy-styles', function () {
	return gulp
		.src(['node_modules/@remira/unifiedui/dist/cjs/styles/**'])
		.pipe(gulp.dest('src/styles'));
});

gulp.task(
	'default',
	gulp.series('install', 'copy-assets', 'copy-fonts', 'copy-styles'),
	function () {}
);
```

Once the tasks will be finished executing, this will create some new files in the project: in the public folder, in the assets folder and in the styles folder.

2. It is mandatory to have the App.tsx file configured as follows:

#### **`gulpfile.js`**

```tsx
import { theme } from '@/redux';
import { Routes } from '@/routes';
import '@/styles/shared/design.scss';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function App() {
	const currentTheme = useSelector(theme);
	return (
		<div className={`theme-${currentTheme}`}>
			<Container
				fluid
				className="vw-100 min-vh-100 m-0 p-0 main position-relative"
			>
				<Routes isMicrofrontend={false} />
			</Container>
		</div>
	);
}

export default App;
```

It should include the design.scss file (created after the gulp tasks ran successfully) and the Container must have the "main" css class applied.

It is also important that the theme is correctly set on the wrapper div, so that the light/dark mode work correctly.

##

5. The entrypoint of your application using all the packages should look like the following:
   - The outer Provider for the Redux context;
   - The AuthProvider to handle authentication;
   - The QueryClientProvider to handle the react-query stack;
   - The BrowserRouter to handle application navigation;
   - And, in the end, the Wrapper for the application.

#### **`main.tsx`**

```tsx
import App from '@/App';
import { keycloak } from '@/configs';
import { store } from '@/redux';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from 'react-oidc-context';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './i18n';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<Provider store={store}>
		<AuthProvider
			{...keycloak}
			onSigninCallback={() => {
				queryClient.removeQueries();
				window.history.pushState({}, document.title, window.location.pathname);
			}}
		>
			<QueryClientProvider client={queryClient} contextSharing>
				<BrowserRouter>
					<Toaster position="bottom-right" />
					<App />
				</BrowserRouter>
			</QueryClientProvider>
		</AuthProvider>
	</Provider>
);
```

6. The keycloak configuration (oidc client) looks as follows:

#### **`configs/keycloak.ts`**

```ts
import { AuthProviderProps } from 'react-oidc-context';

const CLIENT_ID: string = 'ucp_platform_pub';

const KEYCLOAK_DEFAULT_URL: string = 'https://test-auth21.remira.com';
const KEYCLOAK_DEFAULT_REALM: string = 'remiragroup_dev';

const keycloakConfig = {
	url: KEYCLOAK_DEFAULT_URL,
	realm: KEYCLOAK_DEFAULT_REALM,
	clientId: CLIENT_ID,
};

export const keycloak: AuthProviderProps = {
	authority: `${keycloakConfig.url}/realms/${keycloakConfig.realm}`,
	client_id: keycloakConfig.clientId,
	redirect_uri: 'http://localhost:4280',
	automaticSilentRenew: true,
};
```

Of course, the keycloak configuration data SHOULD be retrieved from the backend.

7. Routing is handled using the react-router-dom, here's an example configuration:
   - As we can see, here we are handling 4 routes (home route '/', about route 'about', settings route 'settings', which are all "authenticated", meaning those are accessible only by authenticated users, a login route 'login' which is accessible when not logged in and an "error-catching" route, which will match all routes that are not catched by the router.
   - Both DefaultLayout and AuthenticatedRoutes are wrappers that make sure that every route underneath shares some functionalities and styles, the DefaultLayout one is only used for styling (like adding the Footer and the Topbar to every route), while the AuthenticatedRoutes one serves for checking the Auth state of a user, we will see how it looks like later.

#### **`routes/AppRoutes.tsx`**

```tsx
import { DefaultLayout } from '@/components';
import { About, Home, Login, NotFound, Settings } from '@/pages';
import { AuthenticatedRoutes } from '@/routes';
import { Route, Routes as _Routes } from 'react-router-dom';

interface IRoutes {
	isMicrofrontend: boolean;
}

export const Routes = ({ isMicrofrontend }: IRoutes) => {
	return (
		<_Routes>
			<Route path="/" element={<DefaultLayout />}>
				<Route
					element={<AuthenticatedRoutes isMicrofrontend={isMicrofrontend} />}
				>
					<Route path="" element={<Home />} />
					<Route path="about" element={<About />} />
					<Route path="settings" element={<Settings />} />
				</Route>
				<Route path="login" element={<Login />} />
				<Route path="*" element={<NotFound />} />
			</Route>
		</_Routes>
	);
};
```

8. To check whether a user is authenticated, we can use the react-oidc-client library, which offers dedicated functionalities, and to restrict non-authenticated users from accessing protected routes we can use, as mentioned before, the AuthenticatedRoutes wrapper. The RbacProvider component from @remira/ucpaccelerator_unified_utils is used to check if the authenticated user has the correct roles needed to access to the service.

#### **`routes/AuthenticatedRoutes.tsx`**

```tsx
import { AuthenticatedLayout } from '@/components';
import { Loader } from '@remira/unifiedui';
import { FC } from 'react';
import { useAuth } from 'react-oidc-context';
import { Navigate, Outlet } from 'react-router-dom';

export interface TAuthenticatedRoutes {
	redirectPath?: string;
	isMicrofrontend: boolean;
}

export const AuthenticatedRoutes: FC<TAuthenticatedRoutes> = ({
	redirectPath = '/login',
	isMicrofrontend,
}) => {
	const auth = useAuth();

	if (auth.isLoading) {
		return <Loader fullPage message="Loading user profile..." />;
	}

	if (!auth.isLoading && !auth.isAuthenticated) {
		return <Navigate to={redirectPath} replace />;
	}

	return (
		<RbacProvider
			serviceId={'c17cf55f-7e56-4c4b-934e-5aca050db760'} //example Id of the service
			roles={[]} //roles needed to access to the service
			errorPage={
				//page to which the user is routed if he/she doesn't have the permissions to access
				<ErrorPage
					errorCode={401}
					errorMessage="Not authrized"
					navigateMessage={'Signo out'}
					navigate={() => auth.signoutRedirect()}
				/>
			}
		>
			<AuthenticatedLayout isMicrofrontend={isMicrofrontend}>
				<Outlet />
			</AuthenticatedLayout>
		</RbacProvider>
	);
};
```

#### **`components/LayoutComponents/AuthenticatedLayout/AuthenticatedLayout.tsx`**

```tsx
import { PageLayout, Topbar } from '@/components';
import { Sidebar } from '@remira/unifiedui';
import { FC, ReactNode } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

interface IAuthenticatedLayout {
	isMicrofrontend: boolean;
	children: ReactNode;
}

export const AuthenticatedLayout: FC<IAuthenticatedLayout> = ({
	isMicrofrontend,
}) => {
	const navigate = useNavigate();
	return (
		<>
			{isMicrofrontend ? (
				<Sidebar
					menuItems={[
						{ icon: 'home', redirect: () => navigate('') },
						{ icon: 'info-circle', redirect: () => navigate('about') },
						{ icon: 'cog', redirect: () => navigate('settings') },
					]}
				/>
			) : (
				<Topbar />
			)}
			<PageLayout isMicrofrontend={isMicrofrontend}>
				<Outlet />
			</PageLayout>
		</>
	);
};
```

The AuthenticatedLayout is only used for styling, when the app is used as a Microfrontend and the user is authenticated, a Sidebar should be shown instead of a Topbar.

9. Your package json scripts, to install, run, build and lint your application should look as follows:

#### **`package.json`**

```json
  "scripts": {
		"install-all": "gulp",
		"build": "vite build",
		"preview": "vite preview --port 4280",
		"dev": "vite",
		"lint": "eslint src/**/*.ts src/**/*.tsx"
	},
```

10. To run the application, you can either:

```bash
npm run build
npm run preview
```

which will start the built version and make both the standalone app and the microfrontend entrypoint available:

- http://localhost:4280 (standalone app);
- http://localhost:4280/assets/remoteEntry.js (microfrontend entrypoint)

or you can run the application in development mode:

```bash
npm run dev
```

and the development app will be reachable:

- http://localhost:4280 (development app);

## Microfrontend approach

1. As mentioned earlier, the vite-plugin-federation is used to handle microfrontend exports, the vite.config.ts file in a microfrontend application should look like the following:
   - Some more configuration can be seen in the following, for example the resolve aliasing to avoid having the import madness, like that we can import directly using the @/ symbol to start from the root of the project.

#### **`vite.config.ts`**

```ts
import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';
import topLevelAwait from 'vite-plugin-top-level-await';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	server: {
		port: 4280,
	},
	plugins: [
		react(),
		federation({
			name: 'microfrontend-app',
			filename: 'remoteEntry.js',
			exposes: {
				'./Microfrontend': './src/Microfrontend.tsx',
				'./MyWidget': './src/widgets/MyWidget.tsx',
			},
			shared: ['react', 'react-dom', '@tanstack/react-query'],
		}),
		tsconfigPaths(),
		topLevelAwait({
			promiseExportName: '__tla',
			promiseImportName: (i) => `__tla_${i}`,
		}),
	],
	resolve: {
		alias: [
			{ find: '@', replacement: path.resolve(__dirname, 'src/') },
			{ find: /^~(.*)$/, replacement: '$1' },
		],
	},
});
```

2.  To use the microfrontend app in the UCP portal you need to add the entry inside the vite.config.ts:

#### **`vite.config.ts`**

```ts
...
plugins: [
		react(),
		federation({
			name: 'host-app',
			remotes: {
				remoteApp: 'https://url/to/app/assets/remoteEntry.js',
			},
			shared: ['react', 'react-dom', '@tanstack/react-query'],
		}),
	],
...
```

and update the vite-env.d.ts adding this line:

#### **`vite-env.d.ts`**

```ts
declare module 'remoteApp/AppName';
```

3. This can then be used on the UCP by just importing the microfrontend as a component:

```tsx
import React from 'react';
import AppName from 'remoteApp/AppName';
import keycloak from '@/configs/keycloak';

const Page = () => {
	return <AppName oidcConfig={keycloak} qclient={qclient} />;
};
```

## @remira/ucpaccelerator_unified_utils

This library contains multiple utils that can accelerate the development of your application, the most usefull part is the one about the services that are functions used for the API calls.
Here you can see an example on how to use the get service with useQuery:

```tsx
import { Loader } from '@remira/unifiedui';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import {
	IAPIRequest,
	QueryError,
	get,
	isContained,
} from '@remira/ucpaccelerator_unified_utils';

const request: IAPIRequest = {
	//there's IAPIBodyRequest with body parameter if needed
	endpoint: 'your-endpoint',
	api: 'your-api',
	queryparameters: 'query-parameters', //can be null
	apiVersion: 'api-version', //can be null
};

const result: UseQueryResult<
	any, //here gose the type returned from the API
	QueryError
> = useQuery(['request-uid-name'], () => get(request).then((res) => res), {
	staleTime: 60000,
});

if (result.isLoading || !result.data) return <Loader />;
```

In this package you can find the followinf services and general utils:

RbacProvider (used as seen to check rbac token),
\_delete (service),
deleteWithFeedback (service with toast feedback),
get (service),
patch (service),
patchWithFeedback (service with toast feedback),
post (service),
postFormDataWithFeedback (service with toast feedback),
postWithFeedback (service with toast feedback),
put (service),
putWithFeedback (service with toast feedback),
type IAPIBodyRequest (type for services),
type IAPIRequest (type for services),
type QueryError (for useQuery errors),
type TUser,
isContained (check if an array is contained in another array),
produceErrorMessage (for API errors),
produceErrorResult (for API errors),
setAxiosDefaultBaseUrl (to set default base url in axios),
setAxiosDefaultTokenHeader (to set default token in axios)

### THE PART BELOW MIGHT BE NOT UPDATED [12.09.2023]

## Widgets

If you want to expose not only yuour whole application but also some widgets you can do it very easly using the following React components:

```js
interface DefaultWidgetLayoutProps {
    title: string
    col: number
    row: number
    colSpan : number
    children: JSX.Element
}

function DefaultWidgetLayout({title, col, row, colSpan, children} : DefaultWidgetLayoutProps) {
  const keycloak = useAuth();

  useEffect(() => {
		return keycloak.events.addAccessTokenExpiring(() => {
			  keycloak.signinSilent();
		})
	  }, [keycloak.events, keycloak.signinSilent]);

  useEffect(() => {
    if (!keycloak.isAuthenticated && !keycloak.activeNavigator && !keycloak.isLoading) {
    keycloak.signinRedirect();
    return;
    }
}, [keycloak.isAuthenticated, keycloak.activeNavigator, keycloak.isLoading, keycloak.signinRedirect]);



useEffect(() => {
  if(keycloak.isAuthenticated && keycloak.user && keycloak.user.access_token){
    setAxiosDefaultTokenHeader(keycloak.user.access_token)
  }
}, [keycloak.isAuthenticated, keycloak.user, keycloak.user?.access_token])
  return (
    <GridLayoutItem className="box rect" col={col} row={row} colSpan={colSpan}>
        <Card title={title}>
            {children}
        </Card>
    </GridLayoutItem>
  )
}

export default DefaultWidgetLayout
```

```js
interface WidgetContainerProps {
    oidcConfig : AuthProviderProps,
    qclient : QueryClient,
    children : JSX.Element,
    col: number
    row: number
    colSpan : number
    title : string
  }

const WidgetContainer = ({ oidcConfig, qclient, children, title, row, col, colSpan } : WidgetContainerProps) => {
  useEffect(() => {
    setAxiosDefaultBaseUrl('hhttp://localhost:5257');
  }, [])

  return (
    <QueryClientProvider client={qclient} contextSharing>
         <AuthProvider {...oidcConfig}>
            <DefaultWidgetLayout title={title} col={col} row={row} colSpan={colSpan} children={children} />
         </AuthProvider>
    </QueryClientProvider>
  )
}

export default WidgetContainer
```

As you can see these components are very similar to the ones used to share your whole application: DefaultLayout and Microfrontend and are ready to use for every type of widget you need.

You'll just need to define your own widget body:

```js
function MyWidgetBody() {
	const auth = useAuth();
	return <div>MyWidget for {auth.user?.profile.name}</div>;
}
```

and then encapsulate it in the WidgetContainer:

```js
function MyWidget({ oidcConfig, qclient }: WidgetProps) {
	//NOTE: WidgetProps are the same of the MicrofrontendProps
	return (
		<WidgetContainer
			oidcConfig={oidcConfig}
			qclient={qclient}
			children={<MyWidgetBody />}
			title={'My Widget'}
			col={1}
			row={1}
			colSpan={2}
		/>
	);
}

export default MyWidget;
```

Once you have defined your widget you can expose it directly from the vite config file as follow:

```js
...
exposes: {
  './Microfrontend': './src/Microfrontend.tsx',
  './MyWidget': './src/widgets/MyWidget.tsx',
},
...
```

Now your widget is ready to be used in the UCP portal.
