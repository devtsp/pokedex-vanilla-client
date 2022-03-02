import { PokemonMiniature } from '../entities/pok_mini.js';

export const mapMiniature = apiData => {
	const info = {
		name: apiData.species.name,
		sprite: apiData.sprites.others.front_default,
	};
	return new PokemonMiniature(info);
};
