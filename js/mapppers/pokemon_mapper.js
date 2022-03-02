import { Pokemon } from '../entities/pokemon.js';

const filterEnglishFlavor = flavors => {
	const englishFlavors = [...flavors].filter(
		flavor => flavor?.language?.name == 'en'
	);
	return englishFlavors[0].flavor_text;
};

const getMainInfo = info => {
	const name = info.name;
	const type = info.types[0].type.name;
	const imgUrl = info.sprites.other['official-artwork'].front_default;
	const abilities = [...info.abilities]
		.map(ability => ability.ability.name)
		.join(', ');
	const mainInfo = { name, type, imgUrl, abilities };
	return mainInfo;
};

const getSpecieDetails = specie => {
	const flavorTextRaw = `${filterEnglishFlavor(specie.flavor_text_entries)}`;
	const flavorText = flavorTextRaw.replace(/[\n\f]/g, ' ');
	const habitat = specie.habitat?.name;
	const shape = specie.shape?.name;
	const specieDetails = { flavorText, habitat, shape };
	return specieDetails;
};

const getEvolutionDetails = (pokemon, evolutionChain) => {
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

export const mapPokemon = (mainInfo, specieDetails, evolutionDetails) => {
	const { name, type, habilities, imgUrl } = getMainInfo(mainInfo);
	const { flavorText, habitat, shape } = getSpecieDetails(specieDetails);
	const { evolvesFrom, evolvesTo } = getEvolutionDetails(evolutionDetails);
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
