export class Page {
	firstPage = 'https://pokeapi.co/v2/pokemon?limit=12';
	constructor(pageInfo) {
		this.previousPage = pageInfo.previous || this.firstPage;
		this.nextPage = pageInfo.next || this.firstPage;
		this.pokemonNames = pageInfo.pokemonNames;
	}
}
