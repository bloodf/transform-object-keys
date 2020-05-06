'use strict';
const mapObj = require('map-obj');
const camelCase = require('camelcase');
const {snakeCase: transformSnake} = require('snake-case');
const QuickLru = require('quick-lru');

const has = (array, key) => array.some(x => {
	if (typeof x === 'string') {
		return x === key;
	}

	x.lastIndex = 0;
	return x.test(key);
});

const cache = new QuickLru({maxSize: 100000});

const isObject = value =>
	typeof value === 'object' &&
	value !== null &&
	!(value instanceof RegExp) &&
	!(value instanceof Error) &&
	!(value instanceof Date);

const camelCaseConvert = (input, options) => {
	options = {
		deep: false,
		pascalCase: false,
		snakeCase: false,
		kebabCase: false,
		transform: null,
		...options
	};

	const {exclude, pascalCase, snakeCase, stopPaths, deep, transform} = options;

	const stopPathsSet = new Set(stopPaths);

	const getKeyCase = key => {
		if (typeof transform === 'function') {
			return transform(key);
		}

		if (snakeCase) {
			return transformSnake(key);
		}

		return camelCase(key, {pascalCase});
	};

	const makeMapper = parentPath => (key, value) => {
		if (deep && isObject(value)) {
			const path = parentPath === undefined ? key : `${parentPath}.${key}`;

			if (!stopPathsSet.has(path)) {
				value = mapObj(value, makeMapper(path));
			}
		}

		if (!(exclude && has(exclude, key))) {
			const cacheKey = getKeyCase(key);

			if (cache.has(cacheKey)) {
				key = cache.get(cacheKey);
			} else {
				const returnValue = cacheKey;

				if (key.length < 100) { // Prevent abuse
					cache.set(cacheKey, returnValue);
				}

				key = returnValue;
			}
		}

		return [key, value];
	};

	return mapObj(input, makeMapper(undefined));
};

module.exports = (input, options) => {
	if (Array.isArray(input)) {
		return Object.keys(input).map(key => camelCaseConvert(input[key], options));
	}

	return camelCaseConvert(input, options);
};
