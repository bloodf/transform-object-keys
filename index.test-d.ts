import {expectType} from 'tsd';
import camelcaseKeys from './index.js';

expectType<Array<Record<'foo-bar', true>>>(camelcaseKeys([{'foo-bar': true}]));

expectType<Record<'foo-bar', true>>(camelcaseKeys({'foo-bar': true}));

expectType<Record<'foo-bar', true>>(
	camelcaseKeys({'foo-bar': true}, {deep: true})
);

expectType<Record<'foo-bar', true>>(
	camelcaseKeys({'foo-bar': true}, {deep: true, pascalCase: true})
);

expectType<Record<'foo-bar', true>>(
	camelcaseKeys({'foo-bar': true}, {exclude: ['foo', /bar/]})
);

expectType<Record<'foo-bar', true>>(
	camelcaseKeys({'foo-bar': true}, {stopPaths: ['foo']})
);
