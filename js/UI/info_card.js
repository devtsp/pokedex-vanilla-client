import { querySelector } from '../utils.js';

export const setInfoCard = info => {
	querySelector('#pokemon-info').classList.remove('visually-hidden');
	querySelector('#pokemon-info').style.display = 'inline-block';
	querySelector('#name').innerText = info.name;
	querySelector('#type').innerText = info.type;
	querySelector('#main-pic').src = info.imageUrl;
	querySelector('#main-pic').alt = info.name;
	querySelector('#abilities').innerText = info.abilities;
	querySelector('#flavor-text').innerText = info.flavorText;
	querySelector('#habitat').innerText = info.habitat;
	querySelector('#shape').innerText = info.shape;

	const $evolvesFrom = querySelector('#evolves-from');
	const $evolvesTo = querySelector('#evolves-to');

	$evolvesFrom.innerText = info.evolvesFrom;
	$evolvesTo.innerText = info.evolvesTo;

	$evolvesFrom.innerText == '-'
		? $evolvesFrom.classList.remove('linked-text')
		: $evolvesFrom.classList.add('linked-text');
	$evolvesTo.innerText == '-'
		? $evolvesTo.classList.remove('linked-text')
		: $evolvesTo.classList.add('linked-text');

	return querySelector('#pokemon-info');
};

export const resetInfoCard = () => {
	querySelector('#pokemon-info').classList.add('visually-hidden');
	querySelector('#name').innerText = 'Pokemon';
	querySelector('#type').innertText = '';
	querySelector('#main-pic').src = '';
	querySelector('#main-pic').alt = '';
	querySelector('#abilities').innerText = '-';
	querySelector('#flavor-text').innerText = '';
	querySelector('#habitat').innerText = '-';
	querySelector('#shape').innerText = '-';
	querySelector('#evolves-from').innerText = '-';
	querySelector('#evolves-to').innerText = '-';
	return querySelector('#pokemon-info');
};
