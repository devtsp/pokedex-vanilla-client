import { Page } from '../entities/page.js';

export const mapPage = paginationResponse => {
	const { results } = paginationResponse;
	const names = results.map(result => result.name);
	return new Page(names);
};
