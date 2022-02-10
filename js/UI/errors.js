import { querySelector } from '../utils.js';

export const handleError = err => {
	if (err.message == 404) {
		querySelector('#error-msg').innerText = 'Pokemon not found.';
	}
};

export const resetErrorMsg = () => {
	querySelector('#error-msg').innerText = '';
};
