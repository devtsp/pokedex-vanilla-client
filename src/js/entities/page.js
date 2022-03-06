export class Page {
	constructor(pageIndexes, pokemonNames) {
		this.pageIndexes = {
			previous: pageIndexes.previous,
			actual: pageIndexes.actual,
			next: pageIndexes.next,
		};
		this.pokemonNames = pokemonNames;
	}
}
