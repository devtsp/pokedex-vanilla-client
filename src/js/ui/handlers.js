const getPaginationElements = () => {
	return {
		$previousButton: document.querySelector('#previous-page'),
		$nextButton: document.querySelector('#next-page'),
	};
};

const getPokemonElements = () => {
	return {
		$searchForm: document.querySelector('#main-nav form'),
		$randomButton: document.querySelector('#random-pokemon'),
		$index: document.querySelector('#index'),
		$evolvesFromButton: document.querySelector('#evolves-from'),
		$evolvesToButton: document.querySelector('#evolves-to'),
		$closeButton: document.querySelector('#close-info'),
	};
};

export const setPaginationHandlers = showPage => {
	const { $previousButton, $nextButton } = getPaginationElements();
	$previousButton.onclick = async e => {
		const targetPage = +e.target.parentNode.dataset.page;
		showPage(targetPage);
	};
	$nextButton.onclick = async e => {
		const targetPage = +e.target.parentNode.dataset.page;
		showPage(targetPage);
	};
	return getPaginationElements();
};

export const setPokemonHandlers = (showPokemon, resetPokemon) => {
	const {
		$searchForm,
		$randomButton,
		$index,
		$evolvesFromButton,
		$evolvesToButton,
		$closeButton,
	} = getPokemonElements();

	$searchForm.onsubmit = async e => {
		const search = e.target.search.value.toLowerCase().trim();
		e.preventDefault();
		showPokemon(search);
	};
	$randomButton.onclick = async e => {
		const generateRandomId = () => Math.ceil(Math.random() * 898);
		showPokemon(generateRandomId());
	};
	$index.onclick = async e => {
		if (e.target.classList.contains('poke-card')) {
			const clicked = e.target.id;
			showPokemon(clicked);
		}
	};
	$evolvesFromButton.onclick = async e => {
		const clicked = e.target.innerText;
		showPokemon(clicked);
	};
	$evolvesToButton.onclick = async e => {
		const clicked = e.target.innerText;
		showPokemon(clicked);
	};
	$closeButton.onclick = e => resetPokemon();

	document.querySelector('#pokemon-info').onclick = e => e.stopPropagation();
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

	return getPokemonElements();
};
