import './style.css';
import MainMenuView from "@views/MainMenuView.js";
import AppState from "@utils/AppState.js";

const app = document.querySelector('#app');

(async () => {
	// Initialize global application state
	const appState = new AppState();
	
	// Create and render the main menu
	const mainMenu = new MainMenuView(app, appState);
	appState.setCurrentView(mainMenu);
	await mainMenu.render();
})();