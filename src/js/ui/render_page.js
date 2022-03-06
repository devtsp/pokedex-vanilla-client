const setPaginationButtons = pageIndexes => {
	const { previous, actual, next } = pageIndexes;
	document.querySelector('#previous-page').dataset.page = previous;
	document.querySelector('[data-page]').dataset.page = actual;
	document.querySelector('#next-page').dataset.page = next;
};

const renderNames = pokemonNames => {
	const $cards = document.querySelectorAll('.poke-card');
	$cards.forEach(($card, index) => {
		$card.id = pokemonNames[index];
		$card.children[0].innerText = pokemonNames[index];
	});
	return $cards;
};

export const renderPage = page => {
	setPaginationButtons(page.pageIndexes);
	renderNames(page.pokemonNames);
};
