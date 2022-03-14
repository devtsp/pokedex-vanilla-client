const setPaginationButtons = pageIndexes => {
	const { previous, actual, next } = pageIndexes;
	const $paginationElements = {
		$previousElement: document.querySelector('#previous-page'),
		$actualElement: document.querySelector('[data-page]'),
		$nextElement: document.querySelector('#next-page'),
	};
	const { $previousElement, $actualElement, $nextElement } =
		$paginationElements;
	$previousElement.dataset.page = previous;
	$actualElement.dataset.page = actual;
	$nextElement.dataset.page = next;
	return $paginationElements;
};

const renderNames = pokemonNames => {
	const $pokemons = document.querySelectorAll('.poke-card');
	$pokemons.forEach(($pokemon, index) => {
		$pokemon.id = pokemonNames[index];
		$pokemon.children[0].innerText = pokemonNames[index];
	});
	return $pokemons;
};

export const renderPage = page => {
	const $paginationElements = setPaginationButtons(page.pageIndexes);
	const $pokemonElements = renderNames(page.pokemonNames);
	return { $paginationElements, $pokemonElements };
};
