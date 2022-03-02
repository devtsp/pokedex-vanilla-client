import { PokemonMiniature } from '../entities/miniature.js';

export const mapMiniature = apiData => {
	const info = {
		name: apiData.species.name,
		sprite: apiData.sprites.front_default,
	};
	return new PokemonMiniature(info);
};
