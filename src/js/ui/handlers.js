export const setPaginationHandlers = showPage => {
	document.querySelector('#previous-page').onclick = async e => {
		const destinationPage = +e.target.parentNode.dataset.page;
		const calculatedPage = destinationPage < 0 ? 25 : destinationPage;
		showPage(calculatedPage);
	};
	document.querySelector('#next-page').onclick = async e => {
		const destinationPage = +e.target.parentNode.dataset.page;
		const calculatedPage = destinationPage > 25 ? 0 : destinationPage;
		showPage(calculatedPage);
	};
};

export const setPokemonHandlers = (showPokemon, resetPokemon) => {
	document.querySelector('#main-nav form').onsubmit = async e => {
		const search = e.target.search.value.toLowerCase().trim();
		console.log(search);
		e.preventDefault();
		showPokemon(search);
	};
	document.querySelector('#random-pokemon').onclick = async e => {
		const generateRandomId = () => Math.ceil(Math.random() * 898);
		showPokemon(generateRandomId());
	};
	document.querySelector('#index').onclick = async e => {
		if (e.target.classList.contains('poke-card')) {
			const clicked = e.target.id;
			showPokemon(clicked);
		}
	};
	document.querySelector('#evolves-from').onclick = async e => {
		const clicked = e.target.innerText;
		showPokemon(clicked);
	};
	document.querySelector('#evolves-to').onclick = async e => {
		const clicked = e.target.innerText;
		showPokemon(clicked);
	};
	document.querySelector('#pokemon-info').onclick = e => e.stopPropagation();
	document.querySelector('#close-info').onclick = e => resetPokemon();
	document.querySelector('body').onclick = e => {
		if (
			e.target !== document.querySelector('#pokemon-info') &&
			!e.target.classList.contains('poke-card') &&
			!document
				.querySelector('#pokemon-info')
				.classList.contains('visually-hidden')
		) {
			resetPokemon();
		}
	};
};
