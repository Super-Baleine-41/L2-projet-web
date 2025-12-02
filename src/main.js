import './style.css';
import PokemonListView from '@views/PokemonListView.js';

const app = document.querySelector('#app');

(async () => {
	const view = new PokemonListView(app);
	await view.render();
})();