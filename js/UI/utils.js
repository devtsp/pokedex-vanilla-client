export const getRandomPokemonIndex = () => {
	return Math.ceil(Math.random() * 898);
};

export const querySelector = (selector, all = '') => {
	return all == 'all'
		? document.querySelectorAll(selector)
		: document.querySelector(selector);
};
