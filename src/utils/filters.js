export const pokemonToSet = (pokemonList) => {
	return new Set(pokemonList.map(p => p.name));
};

export const applyAllFilters = (fullPokemon, ...filterArrays) => {
	// Convert each filter array to a Set for WAY faster lookup
	const filterSets = filterArrays.map(pokemonToSet);

	// Return only Pokémon that exist in ALL filter sets
	return fullPokemon.filter(p =>
		filterSets.every(set => set.has(p.name))
	);
}


