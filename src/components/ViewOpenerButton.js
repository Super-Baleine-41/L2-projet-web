import { button } from '@ui/dom.js';
import { render } from '@ui/reactive.js';

let currentViewInstance = null;

const ViewOpenerButton = (parent, label, ViewClass, appContainer, appState, api, className = '', ...args) => {
	const handleViewOpen = async () => {
		if (currentViewInstance && typeof currentViewInstance.destroy === 'function')
			currentViewInstance.destroy();
		currentViewInstance = new ViewClass(appContainer, appState, api, ...args);
		appState.setCurrentView(currentViewInstance);

		if (typeof currentViewInstance.render === 'function')
			await currentViewInstance.render();
	};

	render(parent, button({
		onClick: handleViewOpen,
		className
	}, label));

	return parent;
};

export default ViewOpenerButton;

