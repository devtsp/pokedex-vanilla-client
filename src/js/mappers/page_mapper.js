import { Page } from '../entities/page.js';

const calculatePages = e => {
	const actualPageRendered = document.querySelector('[data-page]').dataset.page;
	const nextPageRendered = document.querySelector('#next-page').dataset.page;
	const previousPageRendered =
		document.querySelector('#previous-page').dataset.page;
	const rendered = {
		previous: previousPageRendered,
		actual: actualPageRendered,
		next: nextPageRendered,
	};
	const { previous, actual, next } = rendered;
	const toRender = {};
	if (e?.target?.parentNode?.id == 'next-page') {
		toRender.actualPage = +next;
		toRender.nextPage = +next + 1;
		toRender.previousPage = +actual;
	} else if (e?.target?.parentNode?.id == 'previous-page') {
		toRender.actualPage = +previous;
		toRender.nextPage = +actual;
		toRender.previousPage = +previous - 1;
	}
	if (toRender.actualPage > 25) {
		toRender.nextPage = 1;
		toRender.actualPage = 0;
		toRender.previousPage = -1;
	} else if (toRender.actualPage <= -1) {
		toRender.nextPage = 26;
		toRender.actualPage = 25;
		toRender.previousPage = 24;
	}
	return toRender;
};

export const mapPage = (pageNumber, paginationResponse) => {
	const { results } = paginationResponse;
	const names = results.map(result => result.name);
	return new Page(pageNumber, names);
};
