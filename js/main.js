API_URL = 'https://pokeapi.co/api/v2';

let paginationPrevious = '';
let paginationNext = '';

const displayChanges = object => {
	for (let index in object) {
		const pokemonName = Object.keys(object[index]);
		const spriteUrl = Object.values(object[index]);
		const cards = getElement('.poke-card', true);
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
	getElement('.poke-card', true).forEach(($thumbnail, i) => {
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
		getElement('#pokemon-info').classList.remove('visually-hidden');
		getElement('#name').innerText = pokemon.name;
		getElement('#type').innerText = pokemon.types[0].type.name;
		getElement('#main-pic').src =
			pokemon.sprites.other['official-artwork']['front_default'];
		let abilities = [];
		pokemon.abilities.forEach(ability => {
			abilities.push(ability.ability.name);
		});
		getElement('#abilities').innerText = abilities.join(', ');
	});
	handleRequest(`${API_URL}/pokemon-species/${pokemon}`, specie => {
		for (let index of specie.flavor_text_entries) {
			if (index.language.name == 'en') {
				getElement('#flavor-text').innerText = `"${index.flavor_text
					.replace(/\s+/g, ' ')
					.trim()}"`;
			}
		}
		const evolvesFrom = getElement('#evolves-from');
		const evolvesTo = getElement('#evolves-to');
		getElement('#habitat').innerText = specie?.habitat?.name || '-';
		getElement('#shape').innerText = specie?.shape?.name || '-';
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

getElement('#previous-page').onclick = e => {
	handleRequest(paginationPrevious, displayPokemonCards);
};

getElement('#next-page').onclick = e => {
	handleRequest(paginationNext, displayPokemonCards);
};

const resetInfoCard = () => {
	getElement('#pokemon-info').classList.add('visually-hidden');
	getElement('#name').innerText = 'Pokemon';
	getElement('#type').innertText = 'tpye';
	getElement('#main-pic').src = '';
	getElement('#main-pic').alt = '';
	getElement('#abilities').innerText = '-';
	getElement('#habitat').innerText = '-';
	getElement('#evolves-from').innerText = '-';
	getElement('#evolves-to').innerText = '-';
	getElement('#shape').innerText = '-';
};

getElement('#main-nav form').onsubmit = e => {
	e.preventDefault();
	resetInfoCard();
	setInfoCard(e.target.search.value.toLowerCase().trim());
};

getElement('#random-pokemon').onclick = e => {
	const random = Math.ceil(Math.random() * 898);
	setInfoCard(random);
};

getElement('#index').onclick = e => {
	if (e.target.classList.contains('poke-card')) {
		setInfoCard(e.target.id);
	}
};

getElement('#pokemon-info').onclick = e => {
	e.stopPropagation();
};

getElement('#close-info').onclick = e => resetInfoCard();

getElement('#evolves-from').onclick = e => {
	setInfoCard(e.target.innerText);
};

getElement('#evolves-to').onclick = e => {
	setInfoCard(e.target.innerText);
};

getElement('body').onclick = e => {
	if (
		e.target !== getElement('#pokemon-info') &&
		!e.target.classList.contains('poke-card') &&
		!getElement('#pokemon-info').classList.contains('visually-hidden')
	) {
		resetInfoCard();
	}
};

handleRequest(`${API_URL}/pokemon?limit=12`, displayPokemonCards);

//
