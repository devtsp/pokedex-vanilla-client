export const fetchApi = async request => {
	const response = await fetch(request);
	if (!response.ok) {
		throw Error(response);
	}
	return response;
};
