/**
 * @jest-environment jsdom
 */

import { renderError, resetError, toggleLoading } from '../render_utils.js';
import { index } from '../../__fixtures__/index.js';

document.body.innerHTML = index;

test('Shows error message "pokemon not found" on 404', () => {
	const error = renderError({ message: 404 });
	expect(error).toBe('Pokemon not found.');
});

test('Shows error "something went wrong" when other than  404 passed', () => {
	const error = renderError({ message: null });
	expect(error).toBe('Something went wrong. Please, try again later.');
});
test('Empties error message inner text when called', () => {
	const error = resetError();
	expect(error).toBe('');
});
