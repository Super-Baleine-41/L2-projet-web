import './style.css';
import BaseView from "@ui/BaseView.js";
import AppState from "@utils/AppState.js";
import PokeAPI from "@utils/PokeAPI.js";
import MainMenuView from "@views/MainMenuView.js";
import { LobbyView } from "@views";
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
	const offerParam = new URLSearchParams(window.location.search).get('offer');
	if (offerParam) {
		const lobbyView = new LobbyView(app, appState, api, offerParam);
		appState.setCurrentView(lobbyView);
		await lobbyView.render();
	} else {
		const mainMenu = new MainMenuView(app, appState, api);
		appState.setCurrentView(mainMenu);
		await mainMenu.render();
	}
})();