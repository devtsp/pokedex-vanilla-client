import { querySelector, getRandomPokemonIndex } from './utils.js';
import { checkCacheVersion } from './cache/cache_version.js';
import { handleRequest } from './cache/requests.js';
import { setInfoCard, resetInfoCard } from './UI/info_card.js';
import {
	fetchPokemonInfo,
	getMainInfo,
	getSpecieDetails,
	getEvolutionDetails,
	Pokemon,
} from './UI/pokemon_info.js';
import { resetErrorMsg } from './UI/errors.js';
import {
	FIRST_PAGE,
	paginationNext,
	paginationPrevious,
	setPaginationState,
	getSprites,
	setAllCards,
} from './UI/pagination.js';

const setInitialCards = async () => {
	const paginationObject = await handleRequest(FIRST_PAGE);
	setPaginationState(paginationObject);
	const cardsArray = await getSprites(paginationObject);
	setAllCards(cardsArray);
};

const initApp = () => {
	checkCacheVersion();

	setInitialCards();

	querySelector('#previous-page').onclick = async e => {
		resetErrorMsg();
		const paginationObject = await handleRequest(paginationPrevious.url);
		setPaginationState(paginationObject);
		const cardsArray = await getSprites(paginationObject);
		setAllCards(cardsArray);
	};

	querySelector('#next-page').onclick = async e => {
		resetErrorMsg();
		const paginationObject = await handleRequest(paginationNext.url);
		setPaginationState(paginationObject);
		const cardsArray = await getSprites(paginationObject);
		setAllCards(cardsArray);
	};

	querySelector('#main-nav form').onsubmit = async e => {
		const search = e.target.search.value.toLowerCase().trim();
		e.preventDefault();
		resetErrorMsg();
		resetInfoCard();
		const { info, specie, evolutionChain } = await fetchPokemonInfo(search);
		const mainInfo = getMainInfo(info);
		const specieDetails = getSpecieDetails(specie);
		const evolutionDetails = getEvolutionDetails(mainInfo.name, evolutionChain);
		const pokemon = new Pokemon(mainInfo, specieDetails, evolutionDetails);
		setInfoCard(pokemon);
	};

	querySelector('#random-pokemon').onclick = async e => {
		const randomPokemon = getRandomPokemonIndex();
		resetErrorMsg();
		const { info, specie, evolutionChain } = await fetchPokemonInfo(
			randomPokemon
		);
		const mainInfo = getMainInfo(info);
		const specieDetails = getSpecieDetails(specie);
		const evolutionDetails = getEvolutionDetails(mainInfo.name, evolutionChain);
		const pokemon = new Pokemon(mainInfo, specieDetails, evolutionDetails);
		setInfoCard(pokemon);
	};

	querySelector('#index').onclick = async e => {
		if (e.target.classList.contains('poke-card')) {
			const clicked = e.target.id;
			resetErrorMsg();
			const { info, specie, evolutionChain } = await fetchPokemonInfo(clicked);
			const mainInfo = getMainInfo(info);
			const specieDetails = getSpecieDetails(specie);
			const evolutionDetails = getEvolutionDetails(
				mainInfo.name,
				evolutionChain
			);
			const pokemon = new Pokemon(mainInfo, specieDetails, evolutionDetails);
			setInfoCard(pokemon);
		}
	};

	querySelector('#evolves-from').onclick = async e => {
		const clicked = e.target.innerText;
		const { info, specie, evolutionChain } = await fetchPokemonInfo(clicked);
		const mainInfo = getMainInfo(info);
		const specieDetails = getSpecieDetails(specie);
		const evolutionDetails = getEvolutionDetails(mainInfo.name, evolutionChain);
		const pokemon = new Pokemon(mainInfo, specieDetails, evolutionDetails);
		setInfoCard(pokemon);
	};

	querySelector('#evolves-to').onclick = async e => {
		const clicked = e.target.innerText;
		const { info, specie, evolutionChain } = await fetchPokemonInfo(clicked);
		const mainInfo = getMainInfo(info);
		const specieDetails = getSpecieDetails(specie);
		const evolutionDetails = getEvolutionDetails(mainInfo.name, evolutionChain);
		const pokemon = new Pokemon(mainInfo, specieDetails, evolutionDetails);
		setInfoCard(pokemon);
	};

	querySelector('#pokemon-info').onclick = e => e.stopPropagation();

	querySelector('#close-info').onclick = e => resetInfoCard();

	querySelector('body').onclick = e => {
		if (
			e.target !== querySelector('#pokemon-info') &&
			!e.target.classList.contains('poke-card') &&
			!querySelector('#pokemon-info').classList.contains('visually-hidden')
		) {
			resetInfoCard();
		}
	};
};

window.addEventListener('DOMContentLoaded', () => {
	initApp();
});
