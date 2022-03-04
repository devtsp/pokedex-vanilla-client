import { fetchPage } from '../api/pagination.js';
import { mapPage } from '../mappers/page_mapper.js';

const handlePaginationIndexing = e => {
	const actualPage = document.querySelector('[data-page]').dataset;
	const pageIndexes = {};
	if (e?.target?.parentNode?.id == 'next-page') {
		pageIndexes.actualPage = +actualPage.page + 1;
		pageIndexes.nextPage = +pageIndexes.actualPage + 1;
		pageIndexes.previousPage =
			pageIndexes.actualPage > 1 ? +pageIndexes.actualPage - 1 : 0;
	} else if (e?.target?.parentNode?.id == 'previous-page') {
		if (+actualPage.page > 0) {
			pageIndexes.actualPage = +actualPage.page - 1;
			pageIndexes.nextPage = +pageIndexes.actualPage + 1;
			pageIndexes.previousPage =
				+pageIndexes.actualPage > 1 ? +pageIndexes.actualPage - 1 : 0;
		}
	}
	return pageIndexes;
};

export const handlePagination = async (renderCallback, e) => {
	const toPage = e?.target?.parentNode?.dataset?.toPage;
	const pagination = await fetchPage(toPage);
	const page = mapPage(pagination);
	const pageIndexes = handlePaginationIndexing(e);
	renderCallback(page, pageIndexes);
};
