import { handleRequest } from '../cache/requests.js';

export const API_URL = 'https://pokeapi.co/api/v2';

const getRandomFlavor = flavors => {
	const englishFlavors = [...flavors].filter(
		flavor => flavor.language.name == 'en'
	);
	return englishFlavors[Math.floor(Math.random() * englishFlavors.length)]
		.flavor_text;
};

export const getPokemonInfo = async pokemon => {
	const pokemonInfo = await handleRequest(`${API_URL}/pokemon/${pokemon}`);
	const specie = await handleRequest(`${API_URL}/pokemon-species/${pokemon}`);
	const evolutionChain = await handleRequest(specie.evolution_chain.url);
	const name = pokemonInfo.name;
	const type = pokemonInfo.types[0].type.name;
	const imageUrl = pokemonInfo.sprites.other['official-artwork'].front_default;
	const flavorText = getRandomFlavor(specie?.flavor_text_entries);
	const abilities = [...pokemonInfo.abilities].map(
		ability => ability.ability.name
	);
	const habitat = specie?.habitat?.name || '-';
	const shape = specie?.shape?.name || '-';
	const evolvesFrom = specie.evolves_from_species?.name || '-';
	let evolvesTo;
	if (!specie?.evolves_from_species) {
		evolvesTo = evolutionChain.chain?.evolves_to[0]?.species?.name || '-';
	} else {
		if (evolutionChain?.chain?.evolves_to[0]?.species?.name == pokemon) {
			evolvesTo =
				evolutionChain?.chain?.evolves_to[0]?.evolves_to[0]?.species?.name ||
				'-';
		} else {
			evolvesTo = '-';
		}
	}
	return {
		name: name,
		type: type,
		image: imageUrl,
		flavorText: flavorText,
		abilities: abilities.join(', '),
		habitat: habitat,
		shape: shape,
		evolvesFrom: evolvesFrom,
		evolvesTo: evolvesTo,
	};
};
