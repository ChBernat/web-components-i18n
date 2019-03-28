const fs = require("fs");
const path = require("path");
const config = require('./config');
const recursive = require("recursive-readdir");
const {
  stringifyTranslationFile,
  stringifyTranslationContent
} = require('./helpers/handle-different-file-types');

const BASE_PATH = config.componentsPath;
const translatableAttributes = config.HTMLAttributes;

function getEntries(compEntries) {
  return compEntries.map(entry => entry.split('=')[1]);
}

function addTranslations(entries, translations) {
  return entries.forEach(entry => {
    entry = entry.replace(/"/g, '');
    translations[entry] = entry;
  });
}

function getRawEntries(file) {
  let entries = [];
  translatableAttributes.forEach(attr => {
    const regFind = `${attr}="(.*?)"`;
    const regexp = new RegExp(regFind, "gmi");
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
      addTranslations(getEntries(entries), translations);
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

