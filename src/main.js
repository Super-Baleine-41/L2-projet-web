import './style.css';
import AppState from "@utils/AppState.js";
import MainMenuView from "@views/MainMenuView.js";

const app = document.querySelector('#app');

(async () => {
	// Initialize global application state
	const appState = new AppState();
	const api = new PokeAPI();

	// Create and render the main menu
	const mainMenu = new MainMenuView(app, appState, api);
	appState.setCurrentView(mainMenu);
	await mainMenu.render();
})();