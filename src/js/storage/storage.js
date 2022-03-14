const pokedexCache = 'pokedex-cache';

export const getPokemonFromStorage = pokemonNameOrId => {
	const cache = JSON.parse(localStorage.getItem(pokedexCache));
	const storedPokemon = cache.pokemons.filter(
		pokemonEntity =>
			pokemonEntity.name == pokemonNameOrId ||
			pokemonEntity.number == pokemonNameOrId
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
	return JSON.parse(localStorage.getItem(pokedexCache)).pokemons.pop();
};

export const getPageFromStorage = pageNumber => {
	const cache = JSON.parse(localStorage.getItem(pokedexCache));
	const storedPage = cache.pages.filter(
		pageEntity => pageEntity.pageIndexes.actual == pageNumber
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
	return JSON.parse(localStorage.getItem(pokedexCache)).pages.pop();
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
