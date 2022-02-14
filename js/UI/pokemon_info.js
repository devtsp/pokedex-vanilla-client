import { handleRequest } from '../cache/requests.js';

export const API_URL = 'https://pokeapi.co/api/v2';

const getRandomFlavor = flavors => {
	const englishFlavors = [...flavors].filter(
		flavor => flavor?.language?.name == 'en'
	);
	return englishFlavors[Math.floor(Math.random() * englishFlavors.length)]
		?.flavor_text;
};

/* istanbul ignore next */
export const fetchPokemonInfo = async pokemon => {
	const info = await handleRequest(`${API_URL}/pokemon/${pokemon}`);
	const specie = await handleRequest(`${API_URL}/pokemon-species/${pokemon}`);
	const evolutionChain = await handleRequest(specie.evolution_chain.url);
	const allInfo = { info, specie, evolutionChain };
	return allInfo;
};

export const setPokemonObject = allInfo => {
	const { info, specie, evolutionChain } = allInfo;
	const name = info?.name || '-';
	const type = info?.types[0]?.type?.name || '-';
	const imageUrl =
		info?.sprites?.other['official-artwork']?.front_default || '-';
	const flavorText = getRandomFlavor(specie?.flavor_text_entries) || '-';
	let abilities = [...info?.abilities].map(ability => ability?.ability?.name);
	const habitat = specie?.habitat?.name || '-';
	const shape = specie?.shape?.name || '-';
	const evolvesFrom = specie.evolves_from_species?.name || '-';
	let evolvesTo;
	if (!specie?.evolves_from_species) {
		evolvesTo = evolutionChain.chain?.evolves_to[0]?.species?.name || '-';
	} else {
		if (evolutionChain?.chain?.evolves_to[0]?.species?.name == name) {
			evolvesTo =
				evolutionChain?.chain?.evolves_to[0]?.evolves_to[0]?.species?.name ||
				'-';
		} else {
			evolvesTo = '-';
		}
	}
	const pokemonObject = {
		name,
		type,
		imageUrl,
		flavorText,
		abilities: abilities.join(', '),
		habitat,
		shape,
		evolvesFrom,
		evolvesTo,
	};
	return pokemonObject;
};
