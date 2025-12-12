module.exports = {
	globDirectory: '.next/static',
	globPatterns: [
		'**/*.{jsx,js,css}'
	],
	swDest: 'src/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};