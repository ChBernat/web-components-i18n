const basicConfig = require('./templates/config.json');
const appRoot = __dirname.split('node_modules')[0] || __dirname;
const path = require('path');
console.log(appRoot, 'dsada')
let config = basicConfig;

try {
  config = require(path.join(appRoot, 'i18n-config.json'));
} catch (err) {}


if (!Object.keys(config).length) {
  config = basicConfig;
}

module.exports = Object.assign(config, {
  appRoot,
  moduleRoot: __dirname,
  componentsPath: path.join(appRoot, config.componentsPath),
  translationsPath: path.join(appRoot, config.translationsPath)
},);
