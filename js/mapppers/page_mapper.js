import { Page } from '../entities/page.js';

export const mapPage = apiData => {
	const { previous, next, results } = apiData;
	const pokemonNames = results.map(result => result.name);
	const pageInfo = { previous, next, pokemonNames };
	return new Page(pageInfo);
};
