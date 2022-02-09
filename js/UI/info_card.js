import { getElement } from '../utils.js';

export const setInfoCard = info => {
	getElement('#pokemon-info').classList.remove('visually-hidden');
	getElement('#name').innerText = info.name;
	getElement('#type').innerText = info.type;
	getElement('#main-pic').src = info.image;
	getElement('#abilities').innerText = info.abilities;
	getElement('#flavor-text').innerText = info.flavorText;
	getElement('#habitat').innerText = info.habitat;
	getElement('#shape').innerText = info.shape;
	getElement('#evolves-from').innerText = info.evolvesFrom;
	getElement('#evolves-to').innerText = info.evolvesTo;

	getElement('#evolves-from').innerText == '-'
		? getElement('#evolves-from').classList.remove('linked-text')
		: getElement('#evolves-from').classList.add('linked-text');
	getElement('#evolves-to').innerText == '-'
		? getElement('#evolves-to').classList.remove('linked-text')
		: getElement('#evolves-to').classList.add('linked-text');
};

export const resetInfoCard = () => {
	getElement('#pokemon-info').classList.add('visually-hidden');
	getElement('#name').innerText = 'Pokemon';
	getElement('#type').innertText = 'tpye';
	getElement('#main-pic').src = '';
	getElement('#main-pic').alt = '';
	getElement('#abilities').innerText = '-';
	getElement('#habitat').innerText = '-';
	getElement('#evolves-from').innerText = '-';
	getElement('#evolves-to').innerText = '-';
	getElement('#shape').innerText = '-';
};
