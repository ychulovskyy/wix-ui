const {attachHook} = require('stylable-integration/require-hook');
attachHook({});

const {test} = require('../../dist/src/ssr/ssrTest');
test();