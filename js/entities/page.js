export class Page {
	firstPage = 'https://pokeapi.co/v2/pokemon?limit=12';
	constructor(apiData) {
		this.previousPage = apiData.previous || this.firstPage;
		this.nextPage = apiData.next || this.nextPage;
		this.pokemons = apiData.results;
	}
}
