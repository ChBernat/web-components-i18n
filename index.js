const {getAllDefaultLocales} = require('./get-all-default-translations');
const {extractAllTranslations} = require('./extract-all-translations');
const {reduceTranslations} = require('./helpers/findTranslation');

module.exports = {
  reduceTranslations,
  getAllDefaultLocales,
  extractAllTranslations
};
