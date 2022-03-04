export const setPaginationHandlers = (handlerCB, renderCB) => {
	document.querySelector('#previous-page').onclick = async e => {
		handlerCB(renderCB, e);
	};

	document.querySelector('#next-page').onclick = async e => {
		handlerCB(renderCB, e);
	};
};

export const setSearchHandler = (handlerCB, renderCB) => {
	document.querySelector('#main-nav form').onsubmit = async e => {
		const search = e.target.search.value.toLowerCase().trim();
		e.preventDefault();
		handlerCB(renderCB, search);
	};
};

export const setCloseInfoHandlers = resetInfoCB => {
	document.querySelector('#pokemon-info').onclick = e => e.stopPropagation();

	document.querySelector('#close-info').onclick = e => resetInfoCB();

	document.querySelector('body').onclick = e => {
		if (
			e.target !== document.querySelector('#pokemon-info') &&
			!e.target.classList.contains('poke-card') &&
			!document
				.querySelector('#pokemon-info')
				.classList.contains('visually-hidden')
		) {
			resetInfoCB();
		}
	};
};

export const setRandomPokemonHandler = (handlerCB, renderCB) => {
	document.querySelector('#random-pokemon').onclick = async e => {
		handlerCB(renderCB);
	};
};

export const setIndexHandler = (handlerCB, renderCB) => {
	document.querySelector('#index').onclick = async e => {
		if (e.target.classList.contains('poke-card')) {
			const clicked = e.target.id;
			handlerCB(renderCB, clicked);
		}
	};
};

export const setEvolutionHandlers = (handlerCB, renderCB) => {
	document.querySelector('#evolves-from').onclick = async e => {
		const clicked = e.target.innerText;
		handlerCB(renderCB, clicked);
	};

	document.querySelector('#evolves-to').onclick = async e => {
		const clicked = e.target.innerText;
		handlerCB(renderCB, clicked);
	};
};
