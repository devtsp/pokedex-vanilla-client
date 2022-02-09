import { getElement } from '../utils.js';

export const handleError = err => {
	if (err.message == 404) {
		getElement('#error-msg').innerText = 'Pokemon not found.';
	}
};

export const resetErrorMsg = () => {
	getElement('#error-msg').innerText = '';
};
