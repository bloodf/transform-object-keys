declare namespace transformObjectKeys {
	interface Options {
		/**
		Recurse nested objects and objects in arrays.

		@default false
		*/
		readonly deep?: boolean;
		/**
		 Underscore between each word `bye-bye` → `bye_bye`.

		 @default false
		 */
		readonly snakeCase?: boolean;
		/**
		 Transformation function to be used instead of default presets

		 @default null
		 */
		readonly transform?: (key: string) => string;

		/**
		Exclude keys from being camel-cased.

		@default []
		*/
		readonly exclude?: ReadonlyArray<string | RegExp>;

		/**
		Exclude children at the given object paths in dot-notation from being camel-cased. For example, with an object like `{a: {b: '🦄'}}`, the object path to reach the unicorn is `'a.b'`.

		@default []

		@example
		```
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
		// {
		// 	aB: 1,
		// 	aC: {
		// 		cD: 1,
		// 		cE: {
		// 			e_f: 1
		// 		}
		// 	}
		// }
		```
		*/
		readonly stopPaths?: string[];

		/**
		Uppercase the first character as in `bye-bye` → `ByeBye`.

		@default false
		*/
		readonly pascalCase?: boolean;
	}
}

/**
 Convert object keys to camel case

 @param input - Object or array of objects to camel-case.

 @param options
 @example
 ```
 import transformObjectKeys = require('transform-object-keys');

 // Convert an object
 transformObjectKeys({'foo-bar': true});
 //=> {fooBar: true}

 // Convert an array of objects
 transformObjectKeys([{'foo-bar': true}, {'bar-foo': false}]);
 //=> [{fooBar: true}, {barFoo: false}]

 transformObjectKeys({'foo-bar': true, nested: {unicorn_rainbow: true}}, {deep: true});
 //=> {fooBar: true, nested: {unicornRainbow: true}}

 // Convert object keys to pascal case
 transformObjectKeys({'foo-bar': true, nested: {unicorn_rainbow: true}}, {deep: true, pascalCase: true});
 //=> {FooBar: true, Nested: {UnicornRainbow: true}}

 // Convert object keys to snake case
 transformObjectKeys({'foo-bar': true, nested: {unicorn_rainbow: true}}, {deep: true, snakeCase: true});
 //=> {FooBar: true, Nested: {UnicornRainbow: true}}

 // Convert object keys using custom function
 transformObjectKeys({'foo-bar': true, nested: {unicorn_rainbow: true}}, {deep: true, transform: key => key.toUppercase()});
 //=> {FooBar: true, Nested: {UnicornRainbow: true}}

 import minimist = require('minimist');

 const argv = minimist(process.argv.slice(2));
 //=> {_: [], 'foo-bar': true}

 transformObjectKeys(argv);
 //=> {_: [], fooBar: true}
 ```
 */
declare function transformObjectKeys<T extends ReadonlyArray<{ [key: string]: any }>>(
	input: T,
	options?: transformObjectKeys.Options,
): T;

declare function transformObjectKeys<T extends { [key: string]: any }>(
	input: T,
	options?: transformObjectKeys.Options,
): T;

export = transformObjectKeys;
