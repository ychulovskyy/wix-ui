const {attachHook} = require('stylable-integration/require-hook');
attachHook({});

const {test} = require('../../dist/src/ssr/ssr.spec');
test();