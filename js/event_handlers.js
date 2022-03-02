import { setInfoCard, resetInfoCard } from './UI/info_card.js';
import { querySelector, getRandomPokemonIndex } from './UI/utils.js';
import { resetErrorMsg } from './UI/errors.js';
import { routeRequest } from './cache/cache.js';
import { handlePagination } from './pagination.js';

// const API_URL = 'https://pokeapi.co/api/v2/';

export const setEventHandlers = () => {
	querySelector('#previous-page').onclick = async e => {
		const direction = e.target.parentNode.dataset.direction;
		console.log(direction);
		resetErrorMsg();
		handlePagination(direction);
	};

	querySelector('#next-page').onclick = async e => {
		const direction = e.target.parentNode.dataset.direction;
		console.log(direction);
		resetErrorMsg();
		handlePagination(direction);
	};

	// querySelector('#main-nav form').onsubmit = async e => {
	// 	const search = e.target.search.value.toLowerCase().trim();
	// 	e.preventDefault();
	// 	resetErrorMsg();
	// 	resetInfoCard();
	// 	const { info, specie, evolutionChain } = await fetchPokemonInfo(search);
	// 	const mainInfo = getMainInfo(info);
	// 	const specieDetails = getSpecieDetails(specie);
	// 	const evolutionDetails = getEvolutionDetails(mainInfo.name, evolutionChain);
	// 	const pokemon = new Pokemon(mainInfo, specieDetails, evolutionDetails);
	// 	setInfoCard(pokemon);
	// };

	// querySelector('#random-pokemon').onclick = async e => {
	// 	const randomPokemon = getRandomPokemonIndex();
	// 	resetErrorMsg();
	// 	const { info, specie, evolutionChain } = await fetchPokemonInfo(
	// 		randomPokemon
	// 	);
	// 	const mainInfo = getMainInfo(info);
	// 	const specieDetails = getSpecieDetails(specie);
	// 	const evolutionDetails = getEvolutionDetails(mainInfo.name, evolutionChain);
	// 	const pokemon = new Pokemon(mainInfo, specieDetails, evolutionDetails);
	// 	setInfoCard(pokemon);
	// };

	// querySelector('#index').onclick = async e => {
	// 	if (e.target.classList.contains('poke-card')) {
	// 		const clicked = e.target.id;
	// 		resetErrorMsg();
	// 		const { info, specie, evolutionChain } = await fetchPokemonInfo(clicked);
	// 		const mainInfo = getMainInfo(info);
	// 		const specieDetails = getSpecieDetails(specie);
	// 		const evolutionDetails = getEvolutionDetails(
	// 			mainInfo.name,
	// 			evolutionChain
	// 		);
	// 		const pokemon = new Pokemon(mainInfo, specieDetails, evolutionDetails);
	// 		setInfoCard(pokemon);
	// 	}
	// };

	// querySelector('#evolves-from').onclick = async e => {
	// 	const clicked = e.target.innerText;
	// 	const { info, specie, evolutionChain } = await fetchPokemonInfo(clicked);
	// 	const mainInfo = getMainInfo(info);
	// 	const specieDetails = getSpecieDetails(specie);
	// 	const evolutionDetails = getEvolutionDetails(mainInfo.name, evolutionChain);
	// 	const pokemon = new Pokemon(mainInfo, specieDetails, evolutionDetails);
	// 	setInfoCard(pokemon);
	// };

	// querySelector('#evolves-to').onclick = async e => {
	// 	const clicked = e.target.innerText;
	// 	const { info, specie, evolutionChain } = await fetchPokemonInfo(clicked);
	// 	const mainInfo = getMainInfo(info);
	// 	const specieDetails = getSpecieDetails(specie);
	// 	const evolutionDetails = getEvolutionDetails(mainInfo.name, evolutionChain);
	// 	const pokemon = new Pokemon(mainInfo, specieDetails, evolutionDetails);
	// 	setInfoCard(pokemon);
	// };

	// querySelector('#pokemon-info').onclick = e => e.stopPropagation();

	// querySelector('#close-info').onclick = e => resetInfoCard();

	// querySelector('body').onclick = e => {
	// 	if (
	// 		e.target !== querySelector('#pokemon-info') &&
	// 		!e.target.classList.contains('poke-card') &&
	// 		!querySelector('#pokemon-info').classList.contains('visually-hidden')
	// 	) {
	// 		resetInfoCard();
	// 	}
	// };
};
