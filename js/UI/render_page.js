import { querySelector } from './utils.js';

const renderMiniatures = miniatures => {
	const $cards = querySelector('.poke-card', 'all');
	$cards.forEach(($card, index) => {
		$card.id = miniatures[index].name;
		$card.children[1].innerText = miniatures[index].name;
		$card.children[0].src = miniatures[index].sprite;
		$card.children[0].alt = miniatures[index].sprite;
	});
	return $cards;
};

const setPaginationButtons = page => {
	querySelector('#previous-page').dataset.direction = page.previousPage;
	querySelector('#next-page').dataset.direction = page.nextPage;
};

export const renderPage = (page, miniatures) => {
	renderMiniatures(miniatures);
	setPaginationButtons(page);
};
