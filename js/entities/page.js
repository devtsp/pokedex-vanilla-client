export class Page {
	firstPage = 'https://pokeapi.co/api/v2/pokemon?limit=12';
	constructor(pageInfo) {
		this.previousPage = pageInfo.previous || this.firstPage;
		this.nextPage = pageInfo.next || this.firstPage;
		this.pokemonNames = pageInfo.pokemonNames;
	}
}
