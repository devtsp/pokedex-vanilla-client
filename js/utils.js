export const getRandomPokemonIndex = () => {
	return Math.ceil(Math.random() * 898);
};

export const getElement = (selector, all = false) => {
	return all
		? document.querySelectorAll(selector)
		: document.querySelector(selector);
};
