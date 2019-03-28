const fs = require('fs');
const path = require('path');
const config = require('./config');

const TEMPLATE_DIR = 'templates/config.json';

function copyConfig() {
  fs.copyFileSync(path.join(config.moduleRoot, TEMPLATE_DIR), path.join(config.appRoot, 'i18n-config.json'));
}

module.exports = {copyConfig};
