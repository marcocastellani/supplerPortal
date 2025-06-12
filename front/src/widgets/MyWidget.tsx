import { useAuth } from 'react-oidc-context';
import WidgetContainer from './WidgetContainer';
import { WidgetProps } from './WidgetProps';

function MyWidgetBody() {
	const auth = useAuth();
	return <div>MyWidget for {auth.user?.profile.name}</div>;
}

function MyWidget({ oidcConfig, qclient }: WidgetProps) {
	return (
		<WidgetContainer
			oidcConfig={oidcConfig}
			qclient={qclient}
			title={'My Widget'}
			col={1}
			row={1}
			colSpan={2}
		>
			<MyWidgetBody />
		</WidgetContainer>
	);
}

export default MyWidget;
