export const renderError = error => {
	let errorMessage = document.querySelector('#error-msg');
	if (error.message == 404) {
		errorMessage.innerText = 'Pokemon not found.';
	} else {
		errorMessage.innerText = 'Something went wrong. Please, try again later.';
	}
	return errorMessage;
};

export const resetError = () => {
	return (document.querySelector('#error-msg').innerText = '');
};

export const toggleLoading = () => {
	const loadingView = document.querySelector('#loading');
	loadingView.classList.toggle('visually-hidden');
	return loadingView;
};
