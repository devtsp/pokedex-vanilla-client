export const renderError = error => {
	if (error.message == 404) {
		document.querySelector('#error-msg').innerText = 'Pokemon not found.';
	} else {
		document.querySelector('#error-msg').innerText =
			'Something went wrong. Please, try again later.';
	}
	return error;
};

export const resetError = () => {
	return (document.querySelector('#error-msg').innerText = '');
};

export const toggleLoading = () => {
	document.querySelector('#loading').classList.toggle('visually-hidden');
};
