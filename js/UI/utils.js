export const querySelector = (selector, all = '') => {
	return all == 'all'
		? document.querySelectorAll(selector)
		: document.querySelector(selector);
};
