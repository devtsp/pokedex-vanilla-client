import { Pokemon } from '../entities/pokemon.js';

const filterEnglishFlavor = flavors => {
	const englishFlavors = [...flavors].filter(
		flavor => flavor?.language?.name == 'en'
	);
	return englishFlavors[0].flavor_text;
};

const getMainInfo = pokemon => {
	const name = pokemon.name;
	const type = pokemon.types[0].type.name;
	const imgUrl = pokemon.sprites.other['official-artwork'].front_default;
	const abilities = [...pokemon.abilities]
		.map(ability => ability.ability.name)
		.join(', ');
	const mainInfo = { name, type, imgUrl, abilities };
	return mainInfo;
};

const getSpecieDetails = pokemon_species => {
	const flavorTextRaw = `${filterEnglishFlavor(
		pokemon_species.flavor_text_entries
	)}`;
	const flavorText = flavorTextRaw.replace(/[\n\f]/g, ' ');
	const habitat = pokemon_species.habitat?.name;
	const shape = pokemon_species.shape?.name;
	const specieDetails = { flavorText, habitat, shape };
	return specieDetails;
};

const getEvolutionDetails = (pokemon, evolution_chain) => {
	const firstOne = evolution_chain.chain.species.name;
	const secondOne = evolution_chain.chain.evolves_to[0]?.species?.name;
	const thirdOne =
		evolution_chain.chain.evolves_to[0]?.evolves_to[0]?.species?.name;
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

export const mapPokemon = (pokemon, pokemon_species, evolution_chain) => {
	const { name, type, habilities, imgUrl } = getMainInfo(pokemon);
	const { flavorText, habitat, shape } = getSpecieDetails(pokemon_species);
	const { evolvesFrom, evolvesTo } = getEvolutionDetails(name, evolution_chain);
	const pokemonInfo = {
		name,
		type,
		habilities,
		imgUrl,
		flavorText,
		habitat,
		shape,
		evolvesFrom,
		evolvesTo,
	};
	return new Pokemon(pokemonInfo);
};
