API_URL = 'https://pokeapi.co/api/v2/pokemon';
const $pokeCards = document.querySelectorAll('.poke-card');
const $previousPage = document.querySelector('#previous-page');
const $nextPage = document.querySelector('#next-page');
let paginationPrevious = '';
let paginationNext = '';

const fetchData = (URL, callback) => {
	fetch(URL)
		.then(response => {
			return response.json();
		})
		.then(data => {
			callback(data);
		})
		.catch(err => console.log(err));
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
	paginationPrevious = data.previous;
	paginationNext = data.next;
	const pokemons = [];
	$pokeCards.forEach(($thumbnail, i) => {
		const pokemon = data.results[i].name;
		pokemons.push(pokemon);
	});
	const sprites = {};
	pokemons.forEach((pokemon, i) => {
		fetch(`${API_URL}/${pokemon}`)
			.then(response => response.json())
			.then(data => {
				const spriteUrl = data.sprites.front_default;
				const pair = {};
				pair[pokemon] = spriteUrl;
				sprites[i] = pair;
				return sprites;
			})
			.then(sprites => {
				Object.entries(sprites).length == 12 && displayChanges(sprites);
			});
	});
};

$previousPage.onclick = e => {
	fetchData(paginationPrevious, displayPokemonCards);
};
$nextPage.onclick = e => {
	fetchData(paginationNext, displayPokemonCards);
};

fetchData(`${API_URL}?limit=12`, displayPokemonCards);
