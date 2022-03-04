import { fetchApi } from '../api/fetch_api.js';
import { checkOnCache, getFromCache, storeToCache } from '../cache/cache.js';
import { handleError } from '../ui/render_errors.js';

export const routeRequest = async request => {
	const existsOnCache = await checkOnCache(request);
	if (existsOnCache) {
		const response = await getFromCache(request);
		return response.json();
	} else {
		try {
			const response = await fetchApi(request);
			storeToCache(request, response.clone());
			return response.json();
		} catch (error) {
			return handleError(error.message);
		}
	}
};
