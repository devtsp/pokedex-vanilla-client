API_URL = 'https://pokeapi.co/api/v2';

let paginationPrevious = '';
let paginationNext = '';

const displayChanges = object => {
	for (let index in object) {
		const pokemonName = Object.keys(object[index]);
		const spriteUrl = Object.values(object[index]);
		const cards = q('.poke-card', true);
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
	q('.poke-card', true).forEach(($thumbnail, i) => {
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
		q('#pokemon-info').classList.remove('visually-hidden');
		q('#name').innerText = pokemon.name;
		q('#type').innerText = pokemon.types[0].type.name;
		q('#main-pic').src =
			pokemon.sprites.other['official-artwork']['front_default'];
		let abilities = [];
		pokemon.abilities.forEach(ability => {
			abilities.push(ability.ability.name);
		});
		q('#abilities').innerText = abilities.join(', ');
	});
	handleRequest(`${API_URL}/pokemon-species/${pokemon}`, specie => {
		const evolvesFrom = q('#evolves-from');
		const evolvesTo = q('#evolves-to');
		q('#habitat').innerText = specie?.habitat?.name || '-';
		q('#shape').innerText = specie?.shape?.name || '-';
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

q('#previous-page').onclick = e => {
	handleRequest(paginationPrevious, displayPokemonCards);
};

q('#next-page').onclick = e => {
	handleRequest(paginationNext, displayPokemonCards);
};

const resetInfoCard = () => {
	q('#pokemon-info').classList.add('visually-hidden');
	q('#name').innerText = 'Pokemon';
	q('#type').innertText = 'tpye';
	q('#main-pic').src = '';
	q('#main-pic').alt = '';
	q('#abilities').innerText = '-';
	q('#habitat').innerText = '-';
	q('#evolves-from').innerText = '-';
	q('#evolves-to').innerText = '-';
	q('#shape').innerText = '-';
};

q('#main-nav form').onsubmit = e => {
	e.preventDefault();
	resetInfoCard();
	setInfoCard(e.target.search.value.toLowerCase().trim());
};

q('#random-pokemon').onclick = e => {
	const random = Math.ceil(Math.random() * 898);
	setInfoCard(random);
};

q('#index').onclick = e => {
	if (e.target.classList.contains('poke-card')) {
		setInfoCard(e.target.id);
	}
};

q('#pokemon-info').onclick = e => {
	e.stopPropagation();
};

q('#close-info').onclick = e => resetInfoCard();

q('#evolves-from').onclick = e => {
	setInfoCard(e.target.innerText);
};

q('#evolves-to').onclick = e => {
	setInfoCard(e.target.innerText);
};

q('body').onclick = e => {
	if (
		e.target !== q('#pokemon-info') &&
		!e.target.classList.contains('poke-card') &&
		!q('#pokemon-info').classList.contains('visually-hidden')
	) {
		resetInfoCard();
	}
};

handleRequest(`${API_URL}/pokemon?limit=12`, displayPokemonCards);
