const pokedexCache = 'pokedex-cache';

export const getPokemonFromStorage = pokemonName => {
	const cache = JSON.parse(localStorage.getItem(pokedexCache));
	const storedPokemon = cache.pokemons.filter(
		pokemonEntity => pokemonEntity.name == pokemonName
	)[0];
	if (!storedPokemon) {
		throw Error({ message: 404 });
	}
	return storedPokemon;
};

export const savePokemonToStorage = pokemonEntity => {
	const cache = JSON.parse(localStorage.getItem(pokedexCache));
	cache.pokemons.push(pokemonEntity);
	localStorage.setItem(pokedexCache, JSON.stringify(cache));
};

export const getPageFromStorage = pageNumber => {
	const cache = JSON.parse(localStorage.getItem(pokedexCache));
	const storedPage = cache.pages.filter(
		pageEntity => pageEntity.actualPage == pageNumber
	)[0];
	if (!storedPage) {
		throw Error({ message: 404 });
	}
	return storedPage;
};

export const savePageToStorage = pageEntity => {
	const cache = JSON.parse(localStorage.getItem(pokedexCache));
	cache.pages.push(pageEntity);
	localStorage.setItem(pokedexCache, JSON.stringify(cache));
};

const createFreshCache = () => {
	const newCache = { version: Date.now(), pokemons: [], pages: [] };
	localStorage.setItem(pokedexCache, JSON.stringify(newCache));
};

const checkCacheFreshness = () => {
	const cache = JSON.parse(localStorage.getItem(pokedexCache));
	if (!cache) {
		createFreshCache();
		return;
	}
	const dayInMs = 86400000;
	return +cache.version + dayInMs > Date.now();
};

export const handleCacheVersion = () => {
	const isFresh = checkCacheFreshness();
	if (!isFresh) {
		createFreshCache();
	}
};
