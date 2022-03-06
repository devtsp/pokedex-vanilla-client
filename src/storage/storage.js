const pokedexCache = 'pokedex-cache';

export const getPokemonFromStorage = pokemonName => {
	const cache = JSON.parse(localStorage.getItem(pokedexCache));
	return cache.pokemons.filter(
		pokemonEntity => pokemonEntity.name == pokemonName
	);
};

export const savePokemonToStorage = pokemonEntity => {
	const cache = JSON.parse(localStorage.getItem(pokedexCache));
	cache.pokemons.push(pokemonEntity);
	localStorage.setItem(pokedexCache, JSON.stringify(cache));
};

export const getPageFromStorage = pageNumber => {
	const cache = JSON.parse(localStorage.getItem(pokedexCache));
	return cache.pages.filter(pageEntity => pageEntity.number == pageNumber);
};

export const savePageToStorage = pageEntity => {
	const cache = JSON.parse(localStorage.getItem(pokedexCache));
	cache.pages.push(pageEntity);
	localStorage.setItem(pokedexCache, JSON.stringify(cache));
};
