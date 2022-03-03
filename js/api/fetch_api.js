export const fetchApi = async request => {
	const response = await fetch(request);
	if (!response.ok) {
		throw Error(response.status);
	}
	return response;
};
