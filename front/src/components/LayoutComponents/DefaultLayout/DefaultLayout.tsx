import { Footer, useThemeContext } from '@remira/unifiedui';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

export const DefaultLayout = ({
	isMicrofrontend,
}: {
	isMicrofrontend: boolean;
}) => {
	const { t } = useTranslation();

	const { mode: theme } = useThemeContext();

	const footerLinks = [
		{
			text: t('footerPrivacy'),
			url: 'https://www.iubenda.com/privacy-policy/12997201',
		},
		{
			text: t('footerImprint'),
			url: 'https://www.remira.com/en/imprint',
		},
		{
			text: t('footerCookie'),
			url: 'https://www.iubenda.com/privacy-policy/12997201/cookie-policy',
		},
	];

	return (
		<>
			<Outlet />
			{isMicrofrontend ? null : (
				<Footer
					version={'cookbook-version '}
					build={'cookbook-build '}
					theme={theme === 'light' || theme === 'dark' ? theme : undefined}
					footerLinks={footerLinks}
					style={{
						position: 'unset',
						marginTop: 'auto',
						display: 'flex',
						justifyContent: 'center',
						flexWrap: 'wrap',
						gap: '3rem',
						fontSize: '0.85em',
						padding: '5px 0',
					}}
				/>
			)}
		</>
	);
};
