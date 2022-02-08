describe('Initial App State', () => {
	it('Displays index of cards, pagination, search bar, footer and external links', () => {
		cy.intercept('**pokemon?limit=12').as('main-req');
		cy.visit('http://localhost:5500');
		cy.get('[data-cy=pokemon-info]').should('have.class', 'visually-hidden');
		cy.get('[data-cy=search-pokemon]').should('be.visible');
		cy.get('[data-cy=pagination]').should('be.visible');
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
		cy.wait('@main-req').then(req => {
			cy.get('[data-cy=test-card] img').should('have.attr', 'src');
		});
	});
});

describe('Interactions', function () {
	beforeEach(() => {
		cy.get('[data-cy=nav-search-form]').as('form');
		cy.get('[data-cy=search-pokemon]').as('input');
		cy.get('[data-cy=pokemon-info]').as('info');
		cy.get('[data-cy=close-info]').as('close');
		cy.get('[data-cy=error-msg]').as('error');
		cy.get('[data-cy=previous-page]').as('previous');
		cy.get('[data-cy=random-pokemon]').as('random');
		cy.get('[data-cy=next-page]').as('next');
		cy.get('[data-cy=index]').as('index');
		cy.get('[data-cy=test-card]').as('test_card');
	});

	it('Type and searches for: "PikaCHu"', function () {
		cy.get(this.input).type('PikaCHu');
		cy.get(this.form).submit();
		cy.get(this.info).should('not.have.class', 'visually-hidden');
	});

	it('Type and searches for: "error"', function () {
		cy.get(this.input).clear().type('error');
		cy.get(this.form).submit();
		cy.get(this.info).should('have.class', 'visually-hidden');
		cy.get(this.error).should('have.text', 'Pokemon not found.');
		cy.get(this.info).should('have.class', 'visually-hidden');
	});

	it('Type a number of pokemon out of range (> 898) = 1000', function () {
		cy.get(this.input).clear().type('1000');
		cy.get(this.form).submit();
		cy.get(this.info).should('have.class', 'visually-hidden');
		cy.get(this.error).should('have.text', 'Pokemon not found.');
		cy.get(this.info).should('have.class', 'visually-hidden');
	});

	it('Type a number of pokemon in range (< 898) = 500', function () {
		cy.get(this.input).clear().type('500');
		cy.get(this.form).submit();
		cy.get(this.error).should('not.have.text', 'Pokemon not found.');
		cy.get(this.info).should('not.have.class', 'visually-hidden');
	});

	it('Closes the info card clicking close button', function () {
		cy.get(this.close).click();
		cy.get(this.info).should('have.class', 'visually-hidden');
	});

	it('Gets random pokemon and closes by clicking outside the card', function () {
		cy.get(this.form).submit();
		cy.get(this.info).should('not.have.class', 'visually-hidden');
		cy.get(this.input).click();
		cy.get(this.info).should('have.class', 'visually-hidden');
	});

	it('Checks the invalidity of an empty input field', function () {
		cy.get(this.input).clear();
		cy.get('input:invalid').should('have.attr', 'name', 'search');
	});

	it('Checks pagination', function () {
		cy.get(this.test_card).invoke('attr', 'id').should('eq', 'bulbasaur');
		cy.get(this.next).click();
		cy.get(this.test_card).invoke('attr', 'id').should('not.eq', 'bulbasaur');
	});

	it('Checks proper behavior when clicking on pokemon evolution link within info card, testing with pikachu to raichu', function () {
		cy.get(this.input).type('pikachu');
		cy.get(this.form).submit();
		cy.get('[data-cy=evolves-to]').then(evolution => {
			cy.wrap(evolution).invoke('text').should('eq', 'raichu');
			evolution.click();
			cy.get('[data-cy=name]').invoke('text').should('eq', 'raichu');
			cy.get('[data-cy=evolves-from]').invoke('text').should('eq', 'pikachu');
			cy.get('[data-cy=evolves-to]').invoke('text').should('eq', '-');
		});
	});

	it('Checks proper behavior when clicking on pokemon prevolution link within info card, testing with blastoise to wartortle', function () {
		cy.get(this.input).clear().type('blastoise');
		cy.get(this.form).submit();
		cy.get('[data-cy=evolves-from]').then(prevolution => {
			cy.wrap(prevolution).invoke('text').should('eq', 'wartortle');
			prevolution.click();
			cy.get('[data-cy=name]').invoke('text').should('eq', 'wartortle');
			cy.get('[data-cy=evolves-from]').invoke('text').should('eq', 'squirtle');
			cy.get('[data-cy=evolves-to]').invoke('text').should('eq', 'blastoise');
		});
	});
});
