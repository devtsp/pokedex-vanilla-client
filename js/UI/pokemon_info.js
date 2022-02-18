import { handleRequest } from '../cache/requests.js';

export const API_URL = 'https://pokeapi.co/api/v2';

/* istanbul ignore next */
export const fetchPokemonInfo = async pokemon => {
	const info = await handleRequest(`${API_URL}/pokemon/${pokemon}`);
	const specie = await handleRequest(`${API_URL}/pokemon-species/${pokemon}`);
	const evolutionChain = await handleRequest(specie.evolution_chain.url);
	const allInfo = { info, specie, evolutionChain };
	return allInfo;
};

const filterEnglishFlavor = flavors => {
	const englishFlavors = [...flavors].filter(
		flavor => flavor?.language?.name == 'en'
	);
	return englishFlavors[0].flavor_text;
};

export const getSpecieDetails = specie => {
	const flavorTextRaw = `${filterEnglishFlavor(specie.flavor_text_entries)}`;
	const flavorText = flavorTextRaw.replace(/[\n\f]/g, ' ');
	const habitat = specie.habitat?.name;
	const shape = specie.shape?.name;
	const specieDetails = { flavorText, habitat, shape };
	return specieDetails;
};

export const getMainInfo = info => {
	const name = info.name;
	const type = info.types[0].type.name;
	const imgUrl = info.sprites.other['official-artwork'].front_default;
	const abilities = [...info.abilities]
		.map(ability => ability.ability.name)
		.join(', ');
	const mainInfo = { name, type, imgUrl, abilities };
	return mainInfo;
};

export const getEvolutionDetails = (pokemon, evolutionChain) => {
	const firstOne = evolutionChain.chain.species.name;
	const secondOne = evolutionChain.chain.evolves_to[0]?.species?.name;
	const thirdOne =
		evolutionChain.chain.evolves_to[0]?.evolves_to[0]?.species?.name;
	const isFirst = pokemon == firstOne;
	const isSecond = pokemon == secondOne;
	let evolvesFrom, evolvesTo;
	if (isFirst) {
		evolvesTo = secondOne;
	} else if (isSecond) {
		evolvesFrom = firstOne;
		evolvesTo = thirdOne;
	} else {
		evolvesFrom = secondOne;
	}
	const evolutionDetails = { evolvesFrom, evolvesTo };
	return evolutionDetails;
};

export class Pokemon {
	constructor(mainInfo, specieDetails, evolutionDetails) {
		this.name = mainInfo.name;
		this.type = mainInfo.type;
		this.abilities = mainInfo.abilities;
		this.imageUrl = mainInfo.imgUrl;

		this.flavorText = specieDetails.flavorText;
		this.habitat = specieDetails.habitat;
		this.shape = specieDetails.shape;

		this.evolvesFrom = evolutionDetails.evolvesFrom;
		this.evolvesTo = evolutionDetails.evolvesTo;
	}
}
