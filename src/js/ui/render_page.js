const renderNames = page => {
	const $cards = document.querySelectorAll('.poke-card');
	$cards.forEach(($card, index) => {
		$card.id = page.pokemonNames[index];
		$card.children[0].innerText = page.pokemonNames[index];
	});
	return $cards;
};

const setPaginationButtons = pageIndexes => {
	console.log(pageIndexes);
	const { previous, actual, next } = pageIndexes;
	document.querySelector('#previous-page').dataset.page = previous;
	document.querySelector('[data-page]').dataset.page = actual;
	document.querySelector('#next-page').dataset.page = next;
};

export const renderPage = (pokemonNames, pageIndexes) => {
	renderNames(pokemonNames);
	setPaginationButtons(pageIndexes);
};
