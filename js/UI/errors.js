import { querySelector } from '../utils.js';

export const handleError = err => {
	if (err.message == 404) {
		return (querySelector('#error-msg').innerText = 'Pokemon not found.');
	} else {
		querySelector('#error-msg').innerText =
			'Something went wrong. Please, try again later.';
	}
};

export const resetErrorMsg = () => {
	return (querySelector('#error-msg').innerText = '');
};
