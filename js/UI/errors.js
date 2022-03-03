import { querySelector } from './utils.js';

export const handleError = error => {
	console.log(error);
	if (error == 404) {
		querySelector('#error-msg').innerText = 'Pokemon not found.';
	} else {
		querySelector('#error-msg').innerText =
			'Something went wrong. Please, try again later.';
	}
	return error;
};

export const resetErrorMsg = () => {
	return (querySelector('#error-msg').innerText = '');
};
