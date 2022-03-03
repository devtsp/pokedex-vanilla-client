const renderMiniatures = miniatures => {
	const $cards = document.querySelectorAll('.poke-card');
	$cards.forEach(($card, index) => {
		$card.id = miniatures[index].name;
		$card.children[1].innerText = miniatures[index].name;
		$card.children[0].src = miniatures[index].sprite;
		$card.children[0].alt = miniatures[index].sprite;
	});
	return $cards;
};

const setPaginationButtons = page => {
	document.querySelector('#previous-page').dataset.direction =
		page.previousPage;
	document.querySelector('#next-page').dataset.direction = page.nextPage;
};

export const renderPage = (page, miniatures) => {
	renderMiniatures(miniatures);
	setPaginationButtons(page);
};
