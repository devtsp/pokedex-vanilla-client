/**
 * @jest-environment jsdom
 */

import { handleError, resetErrorMsg } from '../errors';
import { body } from './fixtures/DOM.fixture';

document.body.innerHTML = body;

describe('handleError', () => {
	test('shows error "pokemon not found" when {message: 404} passed', () => {
		handleError({ message: 404 });
		expect(document.querySelector('#error-msg').innerText).toBe(
			'Pokemon not found.'
		);
	});
	test('shows error "something went wrong" when other than {message: 404} passed', () => {
		handleError({ message: undefined });
		expect(document.querySelector('#error-msg').innerText).toBe(
			'Something went wrong. Please, try again later.'
		);
	});
	test('empty error element inner text when called', () => {
		resetErrorMsg();
		expect(document.querySelector('#error-msg').innerText).toBe('');
	});
});
