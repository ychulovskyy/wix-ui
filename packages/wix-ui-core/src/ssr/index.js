// require('stylable-integration/require');
const {attachHook} = require('stylable-integration/require-hook');
attachHook({});
// const {start} = require('../../dist/src/ssr/server');

// start(6006); 
const {test} = require('../../dist/src/ssr/ssr.spec');
test();