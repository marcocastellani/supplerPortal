import { setAxiosDefaultTokenHeader } from '@remira/ucpaccelerator_unified_utils';
import { Card } from '@remira/unifiedui';
import { useEffect } from 'react';
import { useAuth } from 'react-oidc-context';

interface DefaultWidgetLayoutProps {
	title: string;
	col: number;
	row: number;
	colSpan: number;
	children: JSX.Element;
}

function DefaultWidgetLayout({ title, children }: DefaultWidgetLayoutProps) {
	const keycloak = useAuth();

	useEffect(() => {
		return keycloak.events.addAccessTokenExpiring(() => {
			keycloak.signinSilent();
		});
	}, [keycloak.events, keycloak.signinSilent]);

	useEffect(() => {
		if (
			!keycloak.isAuthenticated &&
			!keycloak.activeNavigator &&
			!keycloak.isLoading
		) {
			keycloak.signinRedirect();
			return;
		}
	}, [
		keycloak.isAuthenticated,
		keycloak.activeNavigator,
		keycloak.isLoading,
		keycloak.signinRedirect,
	]);

	useEffect(() => {
		if (
			keycloak.isAuthenticated &&
			keycloak.user &&
			keycloak.user.access_token
		) {
			setAxiosDefaultTokenHeader(keycloak.user.access_token);
		}
	}, [keycloak.isAuthenticated, keycloak.user, keycloak.user?.access_token]);
	return (
		<div className="box rect">
			<Card title={title}>{children}</Card>
		</div>
	);
}

export default DefaultWidgetLayout;
