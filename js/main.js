API_URL = 'https://pokeapi.co/api/v2/pokemon';
const $pokeCards = document.querySelectorAll('.poke-card');
const $previousPage = document.querySelector('#previous-page');
const $nextPage = document.querySelector('#next-page');
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
		console.log('Not in cache! proceeding to fetch and clone');
		fetchData(request)
			.then(response => {
				console.log(response);
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
		console.log('Found in cache!');
		cache
			.match(request)
			.then(response => {
				console.log(response);
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
		$pokeCards[index].children[1].innerText = pokemonName;
		$pokeCards[index].children[0].setAttribute('src', spriteUrl);
	}
};

const displayPokemonCards = data => {
	console.log(data);
	paginationPrevious = data.previous;
	paginationNext = data.next;
	const pokemons = [];
	$pokeCards.forEach(($thumbnail, i) => {
		const pokemon = data.results[i].name;
		pokemons.push(pokemon);
	});
	const sprites = {};
	pokemons.forEach((pokemon, i) => {
		handleRequest(`${API_URL}/${pokemon}`, data => {
			const spriteUrl = data.sprites.front_default;
			const pair = {};
			pair[pokemon] = spriteUrl;
			sprites[i] = pair;
			Object.entries(sprites).length == 12 && displayChanges(sprites);
		});
	});
};

$previousPage.onclick = e => {
	handleRequest(paginationPrevious, displayPokemonCards);
};

$nextPage.onclick = e => {
	handleRequest(paginationNext, displayPokemonCards);
};

handleRequest(`${API_URL}?limit=12`, displayPokemonCards);
