import { resetError, renderError, toggleLoading } from '../ui/render_state.js';
import { renderFullPokemon, resetInfoCard } from '../ui/render_full_pokemon.js';
import { renderPage } from '../ui/render_page.js';
import {
	fetchPokemon,
	fetchPokemonSpecie,
	fetchEvolutionChain,
	fetchPage,
} from '../api/requests.js';
import { mapPokemon } from '../mappers/pokemon_mapper.js';
import { mapPage } from '../mappers/page_mapper.js';

const getRndmPokeId = () => {
	return Math.ceil(Math.random() * 898);
};

export const handlePokemon = async (pokemonName = getRndmPokeId()) => {
	toggleLoading();
	resetError();
	resetInfoCard();
	if (pokemonName == false) {
		toggleLoading();
		return;
	}
	try {
		const pokemon = await fetchPokemon(pokemonName);
		const pokemon_species = await fetchPokemonSpecie(pokemonName);
		const evolution_chain = await fetchEvolutionChain(
			pokemon_species.evolution_chain.url
		);
		const pokemonAll = mapPokemon(pokemon, pokemon_species, evolution_chain);
		renderFullPokemon(pokemonAll);
	} catch (error) {
		renderError(error);
		return;
	} finally {
		toggleLoading();
	}
};

export const handlePagination = async e => {
	resetError();
	const toRender = calculatePages(e);
	try {
		const pagination = await fetchPage(toRender.actualPage);
		const page = mapPage(pagination);
		renderPage(page, toRender);
	} catch (error) {
		renderError(error);
		return;
	}
};

const calculatePages = e => {
	const actualPageRendered = document.querySelector('[data-page]').dataset.page;
	const nextPageRendered = document.querySelector('#next-page').dataset.page;
	const previousPageRendered =
		document.querySelector('#previous-page').dataset.page;
	const rendered = {
		previous: previousPageRendered,
		actual: actualPageRendered,
		next: nextPageRendered,
	};
	const { previous, actual, next } = rendered;
	const toRender = {};
	if (e?.target?.parentNode?.id == 'next-page') {
		toRender.actualPage = +next;
		toRender.nextPage = +next + 1;
		toRender.previousPage = +actual;
	} else if (e?.target?.parentNode?.id == 'previous-page') {
		toRender.actualPage = +previous;
		toRender.nextPage = +actual;
		toRender.previousPage = +previous - 1;
	}
	if (toRender.actualPage > 25) {
		toRender.nextPage = 1;
		toRender.actualPage = 0;
		toRender.previousPage = -1;
	} else if (toRender.actualPage <= -1) {
		toRender.nextPage = 26;
		toRender.actualPage = 25;
		toRender.previousPage = 24;
	}
	return toRender;
};
