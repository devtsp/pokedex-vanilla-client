const getElements = () => {
	return {
		$pokemonInfo: document.querySelector('#pokemon-info'),
		$name: document.querySelector('#name'),
		$type: document.querySelector('#type'),
		$mainPic: document.querySelector('#main-pic'),
		$flavorText: document.querySelector('#flavor-text'),
		$abilities: document.querySelector('#abilities'),
		$evolvesFrom: document.querySelector('#evolves-from'),
		$evolvesTo: document.querySelector('#evolves-to'),
		$habitat: document.querySelector('#habitat'),
		$shape: document.querySelector('#shape'),
	};
};

export const renderPokemon = pokemon => {
	const elements = getElements();

	elements.$pokemonInfo.classList.remove('visually-hidden');
	elements.$name.innerText = pokemon.name;
	elements.$type.innerText = pokemon.type;
	elements.$mainPic.src = pokemon.imageUrl;
	elements.$mainPic.alt = pokemon.name;
	elements.$flavorText.innerText = pokemon.flavorText;
	elements.$abilities.innerText = pokemon.abilities;
	elements.$evolvesFrom.innerText = pokemon.evolvesFrom;
	elements.$evolvesTo.innerText = pokemon.evolvesTo;
	elements.$habitat.innerText = pokemon.habitat;
	elements.$shape.innerText = pokemon.shape;

	for (let key in elements) {
		const $el = elements[key];
		if ($el.innerText == 'undefined' || !$el.innerText) {
			$el.innerText = '-';
		}
	}

	elements.$evolvesFrom.innerText == '-'
		? elements.$evolvesFrom.classList.remove('linked-text')
		: elements.$evolvesFrom.classList.add('linked-text');
	elements.$evolvesTo.innerText == '-'
		? elements.$evolvesTo.classList.remove('linked-text')
		: elements.$evolvesTo.classList.add('linked-text');

	return elements;
};

export const resetPokemon = () => {
	const elements = getElements();

	elements.$pokemonInfo.classList.add('visually-hidden');
	elements.$name.innerText = 'Pokemon';
	elements.$type.innertText = '';
	elements.$mainPic.src = '';
	elements.$mainPic.alt = '';
	elements.$flavorText.innerText = '';
	elements.$abilities.innerText = '-';
	elements.$evolvesFrom.innerText = '-';
	elements.$evolvesTo.innerText = '-';
	elements.$habitat.innerText = '-';
	elements.$shape.innerText = '-';

	return elements;
};
