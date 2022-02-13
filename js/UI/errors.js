import { querySelector } from '../utils.js';

export const handleError = err => {
	if (err.message == 404) {
		return (querySelector('#error-msg').innerText = 'Pokemon not found.');
	}
};

export const resetErrorMsg = () => {
	return (querySelector('#error-msg').innerText = '');
};
