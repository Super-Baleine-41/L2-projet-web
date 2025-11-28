
export default class PokeAPI {
	baseUrl;
	cache;
	constructor() {
		this.baseUrl = 'https://pokeapi.co/api/v2/';
		this.cache = new Map();
	}

	async get(endpoint) {
		if (this.cache.has(endpoint)) return this.cache.get(endpoint);
		return await fetch(this.baseUrl + endpoint)
			.then(async (response) => {
				if (!response.ok) {
					throw new Error(`HTTP error status: ${response.status}`);
				}
				const data = await response.json();
				this.cache.set(endpoint, data);
				return data;
			})
			.catch(error => {
				console.error('Fetch error:', error);
				throw error;
			});
	}

	async getAllPokemon(limit = 151) {
		if (typeof limit !== 'number' || limit <= 0)
			throw new Error('Limit must be a positive number');
		return await this.get('pokemon?limit=' + limit);
	}

	async getPokemon(id) {
		return await this.get(`pokemon/${id}`);
	}

	getPokemonId(pokemon) {
		return pokemon.url.split('/').filter(Boolean).pop();
	}




}