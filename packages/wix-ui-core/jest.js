const fs = require('fs');
// const module = require('module');
const {Stylable} = require('stylable');
const {createCSSModuleString, CreateModuleInput} = require('stylable-integration');

const stylable = new Stylable('root', fs, require);

module.exports = {
  process(src, path) {
    const options = {injectFileCss: true};

    let code = src;
    const res = stylable.transform(src, path);
    code = createCSSModuleString(res, options);

    return code;
  }
}
