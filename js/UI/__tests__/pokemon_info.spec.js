import { setPokemonObject } from '../pokemon_info';
import { info, specie, evolutionChain } from './fixtures/pokemon_info.fixture';

const allInfo = { info, specie, evolutionChain };

describe('setPokemonInfo', () => {
	test('returns proper pokemon object with specific info', () => {
		const { name, type, abilities, habitat, shape, evolvesFrom, evolvesTo } =
			setPokemonObject(allInfo);
		expect(name).toBe('pikachu');
		expect(type).toBe('electric');
		expect(abilities).toBe('static, lightning-rod');
		expect(habitat).toBe('forest');
		expect(shape).toBe('quadruped');
		expect(evolvesFrom).toBe('pichu');
		expect(evolvesTo).toBe('raichu');
	});
	test('returns "-" for empty fields  in pokemon info object', () => {
		allInfo.info.name = null;
		allInfo.specie.habitat = null;
		allInfo.evolutionChain.evolvesTo = null;
		const { name, habitat, evolvesTo } = setPokemonObject(allInfo);
		expect(name).toBe('-');
		expect(habitat).toBe('-');
		expect(evolvesTo).toBe('-');
	});
});
