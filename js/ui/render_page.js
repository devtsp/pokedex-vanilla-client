const renderNames = page => {
	const $cards = document.querySelectorAll('.poke-card');
	$cards.forEach(($card, index) => {
		$card.id = page.pokemonNames[index];
		$card.children[0].innerText = page.pokemonNames[index];
	});
	return $cards;
};

const setPaginationButtons = pageIndexes => {
	const { previousPage, actualPage, nextPage } = pageIndexes;
	document.querySelector('#previous-page').dataset.page = previousPage;
	document.querySelector('[data-page]').dataset.page = actualPage;
	document.querySelector('#next-page').dataset.page = nextPage;
};

export const renderPage = (page, pageIndexes) => {
	renderNames(page);
	setPaginationButtons(pageIndexes);
};
