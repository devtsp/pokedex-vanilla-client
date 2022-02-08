// auxiliar change
API_URL = 'https://pokeapi.co/api/v2';

let paginationPrevious = '';
let paginationNext = '';

const displayChanges = object => {
	for (let index in object) {
		const pokemonName = Object.keys(object[index]);
		const spriteUrl = Object.values(object[index]);
		const cards = query('.poke-card', true);
		cards[index].id = pokemonName;
		cards[index].children[1].innerText = pokemonName;
		cards[index].children[0].src = spriteUrl;
		cards[index].children[0].alt = pokemonName;
	}
};

const displayPokemonCards = data => {
	paginationPrevious = data.previous;
	paginationNext = data.next;
	const pokemons = [];
	query('.poke-card', true).forEach(($thumbnail, i) => {
		const pokemon = data.results[i].name;
		pokemons.push(pokemon);
	});
	const sprites = {};
	pokemons.forEach((pokemon, i) => {
		handleRequest(`${API_URL}/pokemon/${pokemon}`, data => {
			const spriteUrl = data.sprites.front_default;
			const pair = {};
			pair[pokemon] = spriteUrl;
			sprites[i] = pair;
			Object.entries(sprites).length == 12 && displayChanges(sprites);
		});
	});
};

const setInfoCard = pokemon => {
	handleRequest(`${API_URL}/pokemon/${pokemon}`, pokemon => {
		query('#pokemon-info').classList.remove('visually-hidden');
		query('#name').innerText = pokemon.name;
		query('#type').innerText = pokemon.types[0].type.name;
		query('#main-pic').src =
			pokemon.sprites.other['official-artwork']['front_default'];
		let abilities = [];
		pokemon.abilities.forEach(ability => {
			abilities.push(ability.ability.name);
		});
		query('#abilities').innerText = abilities.join(', ');
	});
	handleRequest(`${API_URL}/pokemon-species/${pokemon}`, specie => {
		for (let index of specie.flavor_text_entries) {
			if (index.language.name == 'en') {
				query('#flavor-text').innerText = `"${index.flavor_text
					.replace(/\s+/g, ' ')
					.trim()}"`;
			}
		}
		const evolvesFrom = query('#evolves-from');
		const evolvesTo = query('#evolves-to');
		query('#habitat').innerText = specie?.habitat?.name || '-';
		query('#shape').innerText = specie?.shape?.name || '-';
		evolvesFrom.innerText = specie.evolves_from_species?.name || '-';
		evolvesFrom.innerText == '-'
			? evolvesFrom.classList.remove('linked-text')
			: evolvesFrom.classList.add('linked-text');
		handleRequest(specie.evolution_chain.url, evolutionChain => {
			if (!specie.evolves_from_species) {
				evolvesTo.innerText =
					evolutionChain.chain?.evolves_to[0]?.species?.name || '-';
			} else {
				if (evolutionChain.chain?.evolves_to[0]?.species?.name == pokemon) {
					evolvesTo.innerText =
						evolutionChain.chain.evolves_to[0]?.evolves_to[0]?.species?.name ||
						'-';
				} else {
					evolvesTo.innerText = '-';
				}
			}
			evolvesTo.innerText == '-'
				? evolvesTo.classList.remove('linked-text')
				: evolvesTo.classList.add('linked-text');
		});
	});
};

query('#previous-page').onclick = e => {
	handleRequest(paginationPrevious, displayPokemonCards);
};

query('#next-page').onclick = e => {
	handleRequest(paginationNext, displayPokemonCards);
};

const resetInfoCard = () => {
	query('#pokemon-info').classList.add('visually-hidden');
	query('#name').innerText = 'Pokemon';
	query('#type').innertText = 'tpye';
	query('#main-pic').src = '';
	query('#main-pic').alt = '';
	query('#abilities').innerText = '-';
	query('#habitat').innerText = '-';
	query('#evolves-from').innerText = '-';
	query('#evolves-to').innerText = '-';
	query('#shape').innerText = '-';
};

query('#main-nav form').onsubmit = e => {
	e.preventDefault();
	resetInfoCard();
	setInfoCard(e.target.search.value.toLowerCase().trim());
};

query('#random-pokemon').onclick = e => {
	const random = Math.ceil(Math.random() * 898);
	setInfoCard(random);
};

query('#index').onclick = e => {
	if (e.target.classList.contains('poke-card')) {
		setInfoCard(e.target.id);
	}
};

query('#pokemon-info').onclick = e => {
	e.stopPropagation();
};

query('#close-info').onclick = e => resetInfoCard();

query('#evolves-from').onclick = e => {
	setInfoCard(e.target.innerText);
};

query('#evolves-to').onclick = e => {
	setInfoCard(e.target.innerText);
};

query('body').onclick = e => {
	if (
		e.target !== query('#pokemon-info') &&
		!e.target.classList.contains('poke-card') &&
		!query('#pokemon-info').classList.contains('visually-hidden')
	) {
		resetInfoCard();
	}
};

handleRequest(`${API_URL}/pokemon?limit=12`, displayPokemonCards);
