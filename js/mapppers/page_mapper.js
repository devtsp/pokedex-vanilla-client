import { Pagination } from '../entities/pagination.js';

export const mapPagination = apiData => {
	const { previous, next, results } = apiData;
	const miniatures = mergeData(results);
	const paginationInfo = { previous, next, results };
	return new Pagination(paginationInfo);
};
