import { getElement, getRandomPokemonIndex } from './utils.js';
import { displayPokemonCards, setInfoCard, resetInfoCard } from './dom.js';
import { handleRequest } from './requests.js';

export const paginationPrevious = { url: '' };
export const paginationNext = { url: '' };

getElement('#previous-page').onclick = e => {
	!!paginationPrevious.url &&
		handleRequest(paginationPrevious.url, displayPokemonCards);
};

getElement('#next-page').onclick = e =>
	handleRequest(paginationNext.url, displayPokemonCards);

getElement('#main-nav form').onsubmit = e => {
	e.preventDefault();
	resetInfoCard();
	const search = e.target.search.value.toLowerCase().trim();
	setInfoCard(search);
};

getElement('#random-pokemon').onclick = e =>
	setInfoCard(e.target.id, getRandomPokemonIndex);

getElement('#index').onclick = e =>
	e.target.classList.contains('poke-card') && setInfoCard(e.target.id);

getElement('#pokemon-info').onclick = e => e.stopPropagation();

getElement('#close-info').onclick = resetInfoCard();

getElement('#evolves-from').onclick = e => setInfoCard(e.target.innerText);

getElement('#evolves-to').onclick = e => setInfoCard(e.target.innerText);

getElement('body').onclick = e => {
	if (
		e.target !== getElement('#pokemon-info') &&
		!e.target.classList.contains('poke-card') &&
		!getElement('#pokemon-info').classList.contains('visually-hidden')
	) {
		resetInfoCard();
	}
};
