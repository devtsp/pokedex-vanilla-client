import { setPokemonObject } from '../pokemon_info';
import { info, specie, evolutionChain } from './fixtures/pokemon_info.fixture';

const allInfo = { info, specie, evolutionChain };

describe('setPokemonObject', () => {
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
		const allInfoAux = JSON.parse(JSON.stringify(allInfo));
		allInfoAux.info.name = null;
		allInfoAux.info.types[0].type.name = null;
		allInfoAux.info.sprites.other['official-artwork'].front_default = null;
		allInfoAux.specie.flavor_text_entries = null;
		allInfoAux.specie.habitat = null;
		allInfoAux.specie.shape.name = null;
		allInfoAux.specie.evolves_from_species = null;
		allInfoAux.evolutionChain.chain.evolves_to[0] = null;
		const pokemon = setPokemonObject(allInfoAux);
		expect(pokemon.name).toBe('-');
		expect(pokemon.type).toBe('-');
		expect(pokemon.imageUrl).toBe('-');
		expect(pokemon.flavorText).toBe('');
		expect(pokemon.habitat).toBe('-');
		expect(pokemon.shape).toBe('-');
		expect(pokemon.evolvesTo).toBe('-');
		expect(pokemon.evolvesFrom).toBe('-');
	});
	test('prevolution and evolution proper calculations', () => {
		const allInfoAux = JSON.parse(JSON.stringify(allInfo));

		// not prevolution
		allInfoAux.specie.evolves_from_species = false;

		//-> with evolution
		allInfoAux.evolutionChain.chain.evolves_to[0].species.name = 'second';
		const pokemonB = setPokemonObject(allInfoAux);
		expect(pokemonB.evolvesFrom).toBe('-');
		expect(pokemonB.evolvesTo).toBe('second');

		//-> without evolution
		allInfoAux.evolutionChain.chain.evolves_to[0].species.name = null;
		const pokemonC = setPokemonObject(allInfoAux);
		expect(pokemonC.evolvesFrom).toBe('-');
		expect(pokemonC.evolvesTo).toBe('-');

		// not first in chain
		allInfoAux.specie.evolves_from_species = true;

		//-> second in chain with evolution
		const pokemonD = setPokemonObject(allInfo);
		expect(pokemonD.evolvesFrom).toBe('pichu');
		expect(pokemonD.evolvesTo).toBe('raichu');

		//-> second in chain no evolution
		allInfoAux.specie.evolves_from_species = true;
		allInfoAux.evolutionChain.chain.evolves_to[0].species.name = 'pikachu';
		allInfoAux.evolutionChain.chain.evolves_to[0].evolves_to[0].species.name = false;
		const pokemonG = setPokemonObject(allInfoAux);
		expect(pokemonG.evolvesTo).toBe('-');

		//-> third in chain
		allInfoAux.evolutionChain.chain.evolves_to[0].species.name = 'not pikachu';
		const pokemonF = setPokemonObject(allInfoAux);
		expect(pokemonF.evolvesTo).toBe('-');
	});
});
