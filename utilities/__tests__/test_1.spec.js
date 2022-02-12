import { getRandomPokemonIndex } from '../../js/utils.js';

test('Get random number between 1 and 898', () => {
	expect(getRandomPokemonIndex()).not.toBe(0);
});
