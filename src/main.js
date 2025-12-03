import './style.css';
import BaseView from "@ui/BaseView.js";
import AppState from "@utils/AppState.js";
import PokeAPI from "@utils/PokeAPI.js";
import MainMenuView from "@views/MainMenuView.js";
import views from "@views";

const app = document.querySelector('#app');

(async () => {
	// Initialize global application state
	const appState = new AppState();
	const api = new PokeAPI();
	window.addEventListener("popstate", async (event) => {
		const state = event.state;

		if (!state) {
			await BaseView.switchView(MainMenuView, app, appState, api, false);
			return;
		}

		const { view, args } = state;
		const ViewClass = views[view];

		if (!ViewClass) {
			await BaseView.switchView(MainMenuView, app, appState, api, false);
			return;
		}

		await BaseView.switchView(ViewClass, app, appState, api, false, ...(args || []));
	});
	// Create and render the main menu
	const mainMenu = new MainMenuView(app, appState, api);
	appState.setCurrentView(mainMenu);
	await mainMenu.render();
})();