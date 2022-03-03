import { querySelector } from './utils.js';

export const handleError = response => {
	if (response.status == 404) {
		querySelector('#error-msg').innerText = 'Pokemon not found.';
	} else {
		querySelector('#error-msg').innerText =
			'Something went wrong. Please, try again later.';
	}
	return response;
};

export const resetErrorMsg = () => {
	return (querySelector('#error-msg').innerText = '');
};
