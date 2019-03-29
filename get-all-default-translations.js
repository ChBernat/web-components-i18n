const fs = require("fs");
const path = require("path");
const config = require('./config');
const recursive = require("recursive-readdir");
const {
  stringifyTranslationContent
} = require('./helpers/handle-different-file-types');

const BASE_PATH = config.componentsPath;
const translatableAttributes = config.HTMLAttributes;
const inCodeRegexp = /reduceTranslations\(.*([`'"]).*\1\)/gm;


function addTranslations(entries, translations) { // @Todo more bulletproof solution
  return entries.forEach(entry => {
    if (entry) {
      if (entry.includes('reduceTranslations')) {
        entry = handleInCodeTranslations(entry);
      } else {
        entry = entry.split('=')[1];
        entry = entry.replace(/"/g, '');
      }
      translations[entry] = entry;
    }
  });
}

function handleInCodeTranslations(entry) {
  entry = entry.match(/([`'"]).*\1/gm)[0];
  return entry.substring(1, entry.length - 1)
}

function getRawEntries(file) {
  let entries = [];
  translatableAttributes.forEach(attr => {
    const regFind = `${attr}="(.*?)"`;
    const regexp = new RegExp(regFind, "gmi");
    entries = entries.concat(file.match(inCodeRegexp));
    entries = entries.concat(file.match(regexp));
  });
  return entries.filter(entry => !!entry);
}

function readFiles(filePaths) {
  const translations = {};
  filePaths.forEach(filePath => {
    const file = fs.readFileSync(filePath, "UTF-8");
    let entries = getRawEntries(file);
    if (entries.length) {
      addTranslations(entries, translations);
    }
  });
  return translations;
}

function getAllDefaultLocales() {
  return recursive(BASE_PATH, config.omitExtensions)
    .then(readFiles)
    .then((translations) => stringifyTranslationContent(translations, config.mainTranslationFileName))
    .then(translationsFileContent => fs.writeFileSync(path.join(config.translationsPath, config.mainTranslationFileName), translationsFileContent));
}

module.exports = {
  getAllDefaultLocales,
};

