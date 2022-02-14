module.exports = {
	verbose: true,
	rootDir: 'js',
	coverageDirectory: './coverage',
	testPathIgnorePatterns: ['cypress/', 'node_modules/', '__tests__/fixtures/'],
	coveragePathIgnorePatterns: [
		'cypress/',
		'node_modules/',
		'__tests__/fixtures/',
	],
};
