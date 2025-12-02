import './style.css'
import PokeAPI from '@utils/PokeAPI.js'
import { div, input, span, select, option } from '@ui/dom.js'
import { render } from '@ui/reactive.js'
import PokemonCards from '@components/PokemonCards.js'
import { applyAllFilters } from '@utils/filters.js'
import { capitalize } from "@utils/strings.js";

const app = document.querySelector('#app')
const api = new PokeAPI();


const updatePokemon = (cardContainer, search, fullPokemonLists, api, filters) => {
	const pokemon = applyAllFilters(fullPokemonLists, filters.type, filters.generation, filters.region, filters.ability, filters.color, filters.habitat);
	PokemonCards(cardContainer, pokemon, search, api);
};

const filterSelect = (container, search, api, name, getter, fullPokemonList, filterKey, options, filters, optionValue = o => o.id, optionLabel = o => capitalize(o.realName || o.name)) => {
	return select({
		className: 'rounded-lg border-2 border-gray-300 p-2 mr-4 mt-2',
		onChange: async (e) => {
			const value = e.target.value;
			filters[filterKey] = value === '' ? fullPokemonList : await getter(value);
			updatePokemon(container, search, fullPokemonList, api, filters);
		}
	}, option({ value: '' }, 'All ' + name), ...options.map(o => option({ value: optionValue(o) }, optionLabel(o))))
}

(async () => {
	let search = '';
	const totalCount = await api.getPokemonCount();
	const fullPokemonList = await api.getAllPokemon(totalCount);
	const types = await api.getTypes();
	const generations = await api.getGenerations();
	const regions = await api.getRegions();
	for (const generation of generations) {
		generation.id = api.getGenerationId(generation);
		generation.realName = `Gen ${generation.id}`
	}
	const abilityCount = await api.getAbilityCount();
	const abilities = await api.getAbilities(abilityCount);
	for (const ability of abilities) ability.id = api.getAbilityId(ability);
	const colors = await api.getColors();
	for (const color of colors) color.id = api.getColorId(color);
	const habitats = await api.getHabitats();
	for (const habitat of habitats) habitat.id = api.getHabitatId(habitat);

	const filters = {
		type: fullPokemonList,
		generation: fullPokemonList,
		region: fullPokemonList,
		ability: fullPokemonList,
		color: fullPokemonList,
		habitat: fullPokemonList
	};

	const cardContainer = div({
		id: 'card-container',
		className: 'flex flex-col gap-4'
	});

	render(app,
		div({ className: 'p-4' },
			div({
					className: 'flex-col'
				},
				div({ className: 'flex items-center gap-4' },
					input({
						placeholder: 'Search...',
						onInput: (e) => {
							search = e.target.value;
							updatePokemon(cardContainer, search, fullPokemonList, api, filters);
						},
						className: 'w-full rounded-lg border-2 border-gray-300 p-2 flex items-center'
					}),
					span({ className: 'text-gray-400' }, `Total Pokémon: ${fullPokemonList.length}`)
				),
				div({
						id: 'filter-container',
					},
			filterSelect(cardContainer, search, api, 'types',
				async (type) => (await api.getType(type)).pokemon.map(p => p.pokemon),
				fullPokemonList, 'type', types, filters,
				t => t.name),
			filterSelect(cardContainer, search, api, 'generations',
				async (generation) => (await api.getGeneration(parseInt(generation, 10))).pokemon_species,
				fullPokemonList, 'generation', generations, filters),
			filterSelect(cardContainer, search, api, 'regions',
				async (region) => {
					const { pokedexes } = await api.getRegion(region);
					const pokedexDataList = await Promise.all(
						pokedexes.map(pokedex => api.getPokedex(api.getPokedexId(pokedex)))
					);
					const seenNames = new Set();
					return pokedexDataList.flatMap(data => data.pokemon_entries).filter(entry => {
						if (seenNames.has(entry.pokemon_species.name)) return false;
						seenNames.add(entry.pokemon_species.name);
						return true;
					}).map(entry => entry.pokemon_species);
				},
				fullPokemonList, 'region', regions, filters,
				r => r.name),
			filterSelect(cardContainer, search, api, 'abilities',
				async (ability) => (await api.getAbility(parseInt(ability))).pokemon.map(p => p.pokemon),
				fullPokemonList, 'ability', abilities, filters),
			filterSelect(cardContainer, search, api, 'colors',
				async (color) => (await api.getColor(parseInt(color))).pokemon_species,
				fullPokemonList, 'color', colors, filters),
			filterSelect(cardContainer, search, api, 'habitats',
				async (habitat) => (await api.getHabitat(parseInt(habitat))).pokemon_species,
				fullPokemonList, 'habitat', habitats, filters)
				)
			),
			cardContainer
		)
	);

	updatePokemon(cardContainer, search, api, fullPokemonList, filters);
	console.debug(`API calls made: ${api.apiCalls}`);
})();