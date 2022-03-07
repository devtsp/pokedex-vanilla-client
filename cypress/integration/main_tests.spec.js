describe('Initial App State', () => {
	it('Displays index of cards, pagination, search bar, footer and external links', () => {
		cy.visit('http://localhost:5500');
		cy.get('[data-cy=pokemon-info]').should('have.class', 'visually-hidden');
		cy.get('[data-cy=search-bar]').should('be.visible');
		cy.get('[data-cy=pagination-controls]').should('be.visible');
		cy.get('[data-cy=first-index-pokemon]')
			.invoke('text')
			.should('eq', 'bulbasaur');
		cy.get('[data-cy=footer]').should('be.visible');
		cy.get('[data-cy=api-link]').should(
			'have.attr',
			'href',
			'https://pokeapi.co/'
		);
		cy.get('[data-cy=source-code-link]').should(
			'have.attr',
			'href',
			'https://github.com/devtsp/pokedex'
		);
	});
});

describe('Interactions', function () {
	beforeEach(() => {
		cy.get('[data-cy=nav-search-form]').as('form');
		cy.get('[data-cy=search-input]').as('input');
		cy.get('[data-cy=error-msg]').as('error');
		cy.get('[data-cy=loading]').as('loading');
		cy.get('[data-cy=pokemon-info]').as('info');
		cy.get('[data-cy=close-info]').as('close');
		cy.get('[data-cy=name]').as('name');
		cy.get('[data-cy=evolves-to]').as('evolution');
		cy.get('[data-cy=evolves-from]').as('prevolution');
		cy.get('[data-cy=previous-page]').as('previous');
		cy.get('[data-cy=random-pokemon]').as('random');
		cy.get('[data-cy=next-page]').as('next');
		cy.get('[data-cy=index]').as('index');
		cy.get('[data-cy=first-index-pokemon]').as('first_pokemon');
		cy.setLocalStorage(
			'pokedex-cache',
			JSON.stringify({
				version: Date.now(),
				pokemons: [],
				pages: [],
			})
		);
	});
	it('Type and searches for: "PikaCHu"', function () {
		cy.get(this.input).type('PikaCHu');
		cy.get(this.form).submit();
		cy.get(this.loading).should('not.have.class', 'visually-hidden');
		cy.get(this.info).should('not.have.class', 'visually-hidden');
		cy.get(this.close).click();
		cy.get(this.info).should('have.class', 'visually-hidden');
	});
	it('Type and searches for: "error": should show proper error message, also checks loading screen works properly', function () {
		cy.get(this.input).clear().type('error');
		cy.get(this.form).submit();
		cy.get(this.info).should('have.class', 'visually-hidden');
		cy.get(this.error).should('have.text', 'Pokemon not found.');
		cy.get(this.info).should('have.class', 'visually-hidden');
	});
	it('Type a number of pokemon out of range (> 898) = 1000, should allow submit but show error', function () {
		cy.get(this.input).clear().type('1000');
		cy.get(this.form).submit();
		cy.get(this.info).should('have.class', 'visually-hidden');
		cy.get(this.error).should('have.text', 'Pokemon not found.');
		cy.get(this.info).should('have.class', 'visually-hidden');
	});
	it('Type a number of pokemon in range (< 858) = 500, should display corresponding pokemon', function () {
		cy.get(this.input).clear().type('500');
		cy.get(this.form).submit();
		cy.get(this.error).should('not.have.text', 'Pokemon not found.');
		cy.get(this.info).should('not.have.class', 'visually-hidden');
		cy.get(this.close).click();
	});
	it('Checks fetch random pokemon function works properly also verifies info card will close when clicking anywhere outside the info card', function () {
		cy.get(this.random).click();
		cy.get(this.input).click();
		cy.get(this.info).should('have.class', 'visually-hidden');
	});
	it('Checks the invalidity of an empty input field', function () {
		cy.get(this.input).clear();
		cy.get('input:invalid').should('have.attr', 'name', 'search');
	});
	it('Checks pagination does scroll the page after interaction', function () {
		cy.get(this.first_pokemon).invoke('text').should('eq', 'bulbasaur');
		cy.get(this.next).click();
		cy.get(this.first_pokemon).invoke('text').should('not.eq', 'bulbasaur');
	});
	it('Checks proper behavior when clicking on pokemon evolution link within info card, testing with pikachu to raichu', function () {
		cy.get(this.input).type('pikachu');
		cy.get(this.form).submit();
		cy.get(this.evolution).invoke('text').should('eq', 'raichu');
		cy.get(this.evolution).click();
		cy.get(this.name).invoke('text').should('eq', 'raichu');
		cy.get(this.prevolution).invoke('text').should('eq', 'pikachu');
		cy.get(this.evolution).invoke('text').should('eq', '-');
	});
	it('Checks proper behavior when clicking on pokemon prevolution link within info card, testing with blastoise to wartortle', function () {
		cy.get(this.input).clear().type('blastoise');
		cy.get(this.form).submit();
		cy.get(this.prevolution).invoke('text').should('eq', 'wartortle');
		cy.get(this.prevolution).click();
		cy.get(this.name).invoke('text').should('eq', 'wartortle');
		cy.get(this.prevolution).invoke('text').should('eq', 'squirtle');
		cy.get(this.evolution).invoke('text').should('eq', 'blastoise');
	});
});
