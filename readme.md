# transform-object-keys

## Install

```
$ npm install transform-object-keys
```

## Usage

```js
const transformObjectKeys = require('transform-object-keys');

// Convert an object
transformObjectKeys({'foo-bar': true});
//=> {fooBar: true}

// Convert an array of objects
transformObjectKeys([{'foo-bar': true}, {'bar-foo': false}]);
//=> [{fooBar: true}, {barFoo: false}]

transformObjectKeys({'foo-bar': true, nested: {unicorn_rainbow: true}}, {deep: true});
//=> {fooBar: true, nested: {unicornRainbow: true}}

transformObjectKeys({a_b: 1, a_c: {c_d: 1, c_e: {e_f: 1}}}, {deep: true, stopPaths: ['a_c.c_e']}),
//=> {aB: 1, aC: {cD: 1, cE: {e_f: 1}}}

// Convert object keys to pascal case
transformObjectKeys({'foo-bar': true, nested: {unicorn_rainbow: true}}, {deep: true, pascalCase: true});
//=> {FooBar: true, Nested: {UnicornRainbow: true}}

// Convert object keys to snake case
transformObjectKeys({'foo-bar': true, nested: {unicorn_rainbow: true}}, {deep: true, snakeCase: true});
//=> {FooBar: true, Nested: {UnicornRainbow: true}}

// Convert object keys using custom function
transformObjectKeys({'foo-bar': true, nested: {unicorn_rainbow: true}}, {deep: true, transform: key => key.toUppercase()});
//=> {FooBar: true, Nested: {UnicornRainbow: true}}
```

```js
const transformObjectKeys = require('transform-object-keys');

const argv = require('minimist')(process.argv.slice(2));
//=> {_: [], 'foo-bar': true}

transformObjectKeys(argv);
//=> {_: [], fooBar: true}
```

## API

### transformObjectKeys(input, options?)

#### input

Type: `object | object[]`

An object or array of objects to camel-case.

#### options

Type: `object`

##### exclude

Type: `Array<string | RegExp>`\
Default: `[]`

Exclude keys from being camel-cased.

##### stopPaths

Type: `string[]`\
Default: `[]`

Exclude children at the given object paths in dot-notation from being camel-cased. For example, with an object like `{a: {b: '🦄'}}`, the object path to reach the unicorn is `'a.b'`.

```js
transformObjectKeys({
	a_b: 1,
	a_c: {
		c_d: 1,
		c_e: {
			e_f: 1
		}
	}
}, {
	deep: true,
	stopPaths: [
		'a_c.c_e'
	]
}),
/*
{
	aB: 1,
	aC: {
		cD: 1,
		cE: {
			e_f: 1
		}
	}
}
*/
```

##### deep

Type: `boolean`\
Default: `false`

Recurse nested objects and objects in arrays.

##### pascalCase

Type: `boolean`\
Default: `false`

Uppercase the first character as in `bye-bye` → `ByeBye`.

##### snakeCase

Type: `boolean`\
Default: `false`

Uppercase the first character as in `bye-bye` → `bye_bye`.

##### transform

Type: `(key: string) => string`\
Default: `null`

Transformation function to be used instead of default presets

## Related

- [snakecase-keys](https://github.com/bendrucker/snakecase-keys)
- [kebabcase-keys](https://github.com/mattiloh/kebabcase-keys)

