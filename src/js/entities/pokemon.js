export class Pokemon {
	constructor(info) {
		this.name = info.name;
		this.number = info.number;
		this.type = info.type;
		this.abilities = info.abilities;
		this.imageUrl = info.imgUrl;
		this.flavorText = info.flavorText;
		this.habitat = info.habitat;
		this.shape = info.shape;
		this.evolvesFrom = info.evolvesFrom;
		this.evolvesTo = info.evolvesTo;
	}
}
