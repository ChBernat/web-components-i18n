#!/usr/bin/env node

const {copyConfig} = require('../generate-configuration');
const {getAllDefaultLocales} = require('../get-all-default-translations');
const {extractAllTranslations} = require('../extract-all-translations');

require('yargs')
  .scriptName("stencil-i18n")
  .usage('$0 <cmd> [args]')
  .command('init', 'Generates basic configuration.', (yargs => {}), copyConfig)
  .command('extract-default', 'Extracts default translation.', (yargs => {}), getAllDefaultLocales)
  .command('extract', 'Extracts all translation.', (yargs => {}), extractAllTranslations)
  .help()
  .argv;
