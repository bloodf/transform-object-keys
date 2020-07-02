const test = require('ava');
const transformKeys = require('.');

test('main', t => {
	t.true(transformKeys({'foo-bar': true}).fooBar);
});

test('exclude option', t => {
	t.true(transformKeys({'--': true}, {exclude: ['--']})['--']);
	t.deepEqual(transformKeys({'foo-bar': true}, {exclude: [/^f/]}), {'foo-bar': true});
});

test('deep option', t => {
	t.deepEqual(
		// eslint-disable-next-line camelcase
		transformKeys({foo_bar: true, obj: {one_two: false, arr: [{three_four: true}]}}, {deep: true}),
		{fooBar: true, obj: {oneTwo: false, arr: [{threeFour: true}]}}
	);
});

test('stopPaths option', t => {
	t.deepEqual(
		// eslint-disable-next-line camelcase
		transformKeys({foo_bar: true, obj: {one_two: false, arr: [{three_four: true}]}}, {deep: true, stopPaths: ['obj']}),
		// eslint-disable-next-line camelcase
		{fooBar: true, obj: {one_two: false, arr: [{three_four: true}]}}
	);

	t.deepEqual(
		// eslint-disable-next-line camelcase
		transformKeys({foo_bar: true, obj: {one_two: false, arr: [{three_four: true}]}}, {deep: true, stopPaths: ['obj.arr']}),
		// eslint-disable-next-line camelcase
		{fooBar: true, obj: {oneTwo: false, arr: [{three_four: true}]}}
	);

	t.deepEqual(
		// eslint-disable-next-line camelcase
		transformKeys({q_w_e: [[{foo_bar: 1}, {one_two: 2}, {foo_bar: 3, one_two: 4}]]}, {deep: true, stopPaths: ['q_w_e.foo_bar']}),
		{qWE: [[{fooBar: 1}, {oneTwo: 2}, {fooBar: 3, oneTwo: 4}]]}
	);

	t.deepEqual(
		// eslint-disable-next-line camelcase
		transformKeys({a_b: 1, a_c: {c_d: 1, c_e: {e_f: 1}}}, {deep: true, stopPaths: ['a_c.c_e']}),
		// eslint-disable-next-line camelcase
		{aB: 1, aC: {cD: 1, cE: {e_f: 1}}}
	);
});

test('snakeCase option only', t => {
	t.true(transformKeys({'new-foo-bar': true}, {snakeCase: true}).new_foo_bar);
});

test('snakeCase and deep options', t => {
	t.deepEqual(
		transformKeys({PFooBar: true, P1FooBar: true, PObj: {PTwo: false, P2Two3Porra: false, PArr: [{PThreeFour: true}]}}, {deep: true, snakeCase: true}),
		// eslint-disable-next-line camelcase
		{p_foo_bar: true, p_1_foo_bar: true, p_obj: {p_two: false, p_2_two_3_porra: false, p_arr: [{p_three_four: true}]}}
	);
});

test('pascalCase option only', t => {
	t.true(transformKeys({'new-foo-bar': true}, {pascalCase: true}).NewFooBar);
});

test('pascalCase and deep options', t => {
	t.deepEqual(
		// eslint-disable-next-line camelcase
		transformKeys({p_foo_bar: true, p_obj: {p_two: false, p_arr: [{p_three_four: true}]}}, {deep: true, pascalCase: true}),
		{PFooBar: true, PObj: {PTwo: false, PArr: [{PThreeFour: true}]}}
	);
});

test('transform option only', t => {
	t.true(transformKeys({newFooBar: true}, {transform: key => key.toUpperCase()}).NEWFOOBAR);
});

test('transform and deep options', t => {
	t.deepEqual(
		transformKeys({PFooBar: true, PObj: {PTwo: false, PArr: [{PThreeFour: true}]}}, {deep: true, transform: key => key.toUpperCase()}),
		{PFOOBAR: true, POBJ: {PTWO: false, PARR: [{PTHREEFOUR: true}]}}
	);
});

test('handles nested arrays', t => {
	t.deepEqual(
		// eslint-disable-next-line camelcase
		transformKeys({q_w_e: [['a', 'b']]}, {deep: true}),
		{qWE: [['a', 'b']]}
	);
});

test('accepts an array of objects', t => {
	t.deepEqual(
		// eslint-disable-next-line camelcase
		transformKeys([{foo_bar: true}, {bar_foo: false}, {'bar-foo': 'false'}]),
		[{fooBar: true}, {barFoo: false}, {barFoo: 'false'}]
	);
});

test('different pascalCase option values', t => {
	// eslint-disable-next-line camelcase
	t.true(transformKeys({foo_bar_UPPERCASE: true}).fooBarUppercase);
	// eslint-disable-next-line camelcase
	t.true(transformKeys({foo_bar_UPPERCASE: true}, {pascalCase: true}).FooBarUppercase);

	t.deepEqual(
		transformKeys({'p-foo-bar': true, 'p-obj': {'p-two': false, 'p-arr': [{'p-three-four': true}]}}, {deep: true, pascalCase: true}),
		{PFooBar: true, PObj: {PTwo: false, PArr: [{PThreeFour: true}]}}
	);
	t.deepEqual(
		transformKeys({'p-foo-bar': true, 'p-obj': {'p-two': false, 'p-arr': [{'p-three-four': true}]}}, {deep: true}),
		{pFooBar: true, pObj: {pTwo: false, pArr: [{pThreeFour: true}]}}
	);
});
