export const fetchPokemonInfo = async pokemon => {
	const info = await handleRequest(`${API_URL}/pokemon/${pokemon}`);
	const specie = await handleRequest(`${API_URL}/pokemon-species/${pokemon}`);
	const evolutionChain = await handleRequest(specie.evolution_chain.url);
	const allInfo = { info, specie, evolutionChain };
	return allInfo;
};

class Pokemon {
	constructor(allInfo) {
		const { info, specie, evolutionChain } = allInfo;
		this.name = info.name || '-';
		this.type = info.types[0]?.type?.name || '-';
		this.imageUrl =
			info?.sprites?.other['official-artwork']?.front_default || '-';
		this.flavorText = specie?.flavor_text_entries
			? getRandomFlavor(specie?.flavor_text_entries)
			: '';
		this.abilities = [...info.abilities].map(ability => ability?.ability?.name);
		this.habitat = specie.habitat?.name || '-';
		this.shape = specie.shape?.name || '-';
		this.evolvesFrom = specie.evolves_from_species?.name || '-';
		this.evolvesTo;
		if (!specie?.evolves_from_species) {
			// first in chain and maybe evolution
			this.evolvesTo = evolutionChain.chain.evolves_to[0]?.species?.name || '-';
		} else {
			if (evolutionChain.chain?.evolves_to[0]?.species?.name == this.name) {
				// second in chain: maybe third or not
				this.evolvesTo =
					evolutionChain.chain.evolves_to[0]?.evolves_to[0]?.species?.name ||
					'-';
			} else {
				// if third in chain no more evolutions
				this.evolvesTo = '-';
			}
		}
	}
}

const pokemon = new Pokemon(allInfo);
