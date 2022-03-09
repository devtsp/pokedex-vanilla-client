export const renderError = error => {
	let errorMessage = document.querySelector('#error-msg').innerText;
	if (error.message == 404) {
		errorMessage = 'Pokemon not found.';
	} else {
		errorMessage = 'Something went wrong. Please, try again later.';
	}
	return errorMessage;
};

export const resetError = () => {
	return (document.querySelector('#error-msg').innerText = '');
};

export const toggleLoading = () => {
	return document.querySelector('#loading').classList.toggle('visually-hidden');
};
