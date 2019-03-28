function stringifyTranslationContent(stringifiedTranslation, filePath) {
  let prefix = '';
  if (filePath.includes('.ts'))
    prefix = 'export default ';
  if (filePath.includes('.js'))
    prefix = 'module.exports = ';

  return `${prefix}${stringifiedTranslation}`;
}

function stringifyTranslationFile(translation, filePath) {
  if (filePath.includes('.ts'))
    return translation.replace('export default ', '').trim();
  if (filePath.includes('.js'))
    return translation.replace('module.exports = ', '').trim();
  return translation.trim(); // defaults to json
}

module.exports = {
  stringifyTranslationFile,
  stringifyTranslationContent
}
