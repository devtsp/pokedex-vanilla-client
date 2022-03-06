import { Page } from '../entities/page.js';

export const mapPage = (destinationPage, paginationResponse) => {
	const pageIndexes = {
		actual: +destinationPage,
		previous: +destinationPage - 1,
		next: +destinationPage + 1,
	};
	const { results } = paginationResponse;
	const names = results.map(result => result.name);
	return new Page(pageIndexes, names);
};
