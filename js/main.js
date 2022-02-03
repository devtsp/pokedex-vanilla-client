API_URL = 'https://pokeapi.co/api/v2';

const q = str => {
	return document.querySelector(str);
};

const $index = q('#index');
const $pokeCards = document.querySelectorAll('.poke-card');
const $previousPage = q('#previous-page');
const $nextPage = q('#next-page');
const $pokeInfo = q('#pokemon-info');
let paginationPrevious = '';
let paginationNext = '';
const cacheName = 'v1';

const fetchData = URL => {
	return fetch(URL)
		.then(response => response)
		.catch(err => console.log(err));
};

const handleMatch = (request, match, cache, callback) => {
	if (!match) {
		// console.log('Not in cache: ', request);
		fetchData(request)
			.then(response => {
				// console.log(response);
				if (response.ok) {
					cache.put(request, response.clone());
					return response.json();
				}
				throw new Error('Response not ok:', response);
			})
			.then(response => {
				callback(response);
			})
			.catch(err => console.log(err));
	} else {
		// console.log('Found in cache: ', match.url);
		cache
			.match(request)
			.then(response => {
				// console.log(response);
				return response.json();
			})
			.then(response => callback(response));
	}
};

const handleRequest = (request, callback) => {
	caches.open(cacheName).then(cache => {
		cache
			.match(request)
			.then(match => handleMatch(request, match, cache, callback));
	});
};

const displayChanges = object => {
	for (let index in object) {
		const pokemonName = Object.keys(object[index]);
		const spriteUrl = Object.values(object[index]);
		$pokeCards[index].id = pokemonName;
		$pokeCards[index].children[1].innerText = pokemonName;
		$pokeCards[index].children[0].src = spriteUrl;
		$pokeCards[index].children[0].alt = pokemonName;
	}
};

const displayPokemonCards = data => {
	// console.log(data);
	paginationPrevious = data.previous;
	paginationNext = data.next;
	const pokemons = [];
	$pokeCards.forEach(($thumbnail, i) => {
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
		// console.log(pokemon);
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
		// console.log(specie);
		q('#habitat').innerText = specie.habitat.name;
		q('#shape').innerText = specie.shape.name;
		q('#evolves-from').innerText = specie.evolves_from_species?.name || '-';
		handleRequest(specie.evolution_chain.url, evolutionChain => {
			// console.log(evolutionChain);
			if (!specie.evolves_from_species) {
				// console.log('first');
				q('#evolves-to').innerText =
					evolutionChain.chain.evolves_to[0].species.name;
			} else {
				if (
					evolutionChain.chain.evolves_to[0].evolves_to[0].species.name ==
					specie.name
				) {
					// console.log('last');
					q('#evolves-to').innerText =
						evolutionChain.chain.evolves_to[0]?.evolves_to[0]?.evolves_to[0]
							?.species?.name || '-';
				} else {
					// console.log('middle');
					q('#evolves-to').innerText =
						evolutionChain.chain.evolves_to[0].evolves_to[0].species.name ||
						'-';
				}
			}
		});
	});

	$pokeInfo.classList.remove('visually-hidden');
};

$previousPage.onclick = e => {
	handleRequest(paginationPrevious, displayPokemonCards);
};

$nextPage.onclick = e => {
	handleRequest(paginationNext, displayPokemonCards);
};

$pokeInfo.querySelector('i').onclick = e => {
	$pokeInfo.classList.add('visually-hidden');
	q('#name').src = '';
	q('#type').innertText = '';
	q('#pokemon-info img').src = 'img/pokeball.png';
	q('#pokemon-info img').alt = e.target.parentNode.id;
	q('#abilities').innerText = '';
	q('#habitat').innerText = '';
	q('#evolves-from').innerText = '';
	q('#evolves-to').innerText = '';
	q('#shape').innerText = '';
};

$index.onclick = e => {
	if (e.target.parentNode.classList.contains('poke-card')) {
		setInfoCard(e.target.parentNode.id);
	}
};

q('#main-nav form').onsubmit = e => {
	e.preventDefault();
	$pokeInfo.classList.add('visually-hidden');
	setInfoCard(q('#main-nav form').search.value);
};

handleRequest(`${API_URL}/pokemon?limit=12`, displayPokemonCards);
