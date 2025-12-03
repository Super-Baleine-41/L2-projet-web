import { button } from '@ui/dom.js';
import { render } from '@ui/reactive.js';
import BaseView from '@ui/BaseView.js';

const ViewOpenerButton = (parent, label, ViewClass, appContainer, appState, api, className = '', ...args) => {
	const handleViewOpen = async () => {
		await BaseView.switchView(ViewClass, appContainer, appState, api, ...args);
	};

	render(parent, button({
		onClick: handleViewOpen,
		className
	}, label));

	return parent;
};

export default ViewOpenerButton;

