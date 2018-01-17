const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-15');
const stylable = require('stylable-integration/require');
console.log('stylable', stylable);

Enzyme.configure({adapter: new Adapter()});
