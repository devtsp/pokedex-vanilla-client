export const handleError = error => {
	if (error.message == 404) {
		document.querySelector('#error-msg').innerText = 'Pokemon not found.';
	} else {
		document.querySelector('#error-msg').innerText =
			'Something went wrong. Please, try again later.';
	}
	return error;
};

export const resetErrorMsg = () => {
	return (document.querySelector('#error-msg').innerText = '');
};
