/* globals bench suite set */
'use strict';
const camelcaseNpm = require('camel-object');
const fixture = require('./fixture');
const camelcase = require('..');

suite('camelcase', () => {
	set('mintime', 1000);

	bench('npm', () => {
		camelcaseNpm(fixture, {deep: true});
	});

	bench('master', () => {
		camelcase(fixture, {deep: true});
	});
});
