const recursive = require("recursive-readdir");
const fs = require('fs');
const config = require('./config');
const {
  stringifyTranslationFile,
  stringifyTranslationContent
} = require('./helpers/handle-different-file-types');


const BASE_PATH = config.translationsPath;

function readFiles(filePaths) {
  const translations = {};
  filePaths.forEach((filePath, idx) => {
    const file = fs.readFileSync(filePath, "UTF-8");
    const stringifiedObject = stringifyTranslationFile(file, filePath);
    const parsedObject = JSON.parse(stringifiedObject);
    translations[filePath] = parsedObject;
  });
  return translations;
}

function findDefaultTranslation(translations) {
  const localePaths = Object.keys(translations);
  let idx = localePaths.length - 1;
  for (; idx >= 0; idx--) {
    if (localePaths[idx].includes(config.mainTranslationFileName))
      return translations[localePaths[idx]];
  }
}

function checkTranslationAgainstDefault(translation, enTranslation) {
  const transKeys = Object.keys(translation);
  transKeys.forEach(key => {
    if (!enTranslation[key])
      delete translation[key];
  });
  return translation;
}

function fillTranslation(translation, enTranslation) {
  const transKeys = Object.keys(enTranslation);
  translation = checkTranslationAgainstDefault(translation, enTranslation);
  transKeys.forEach(key => {
    if (!translation[key])
      translation[key] = 'ERR! No translation!';
  });
  return translation;
}

function saveTranslation(translation, path) {
  const stringifiedTranslation = JSON.stringify(translation, null, 2);
  const fileContent = stringifyTranslationContent(stringifiedTranslation, path);
  fs.writeFileSync(path, fileContent);
}

function fillTranslations(translations) {
  let defaultTranslation = findDefaultTranslation(translations);
  const transPaths = Object.keys(translations);
  transPaths.forEach(path => {
    translations[path] = fillTranslation(translations[path], defaultTranslation);
    saveTranslation(translations[path], path);
  });
}

function extractAllTranslations() {
  return recursive(BASE_PATH)
    .then(readFiles)
    .then(fillTranslations)
    .catch(console.log);
}

module.exports = {
  extractAllTranslations,
};
