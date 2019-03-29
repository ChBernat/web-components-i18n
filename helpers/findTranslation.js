function prepareValues(tmpl, vars) {
  if (vars) {
    return new Function("return `" + tmpl + "`;").call(vars);
  }
  return tmpl;
}

function reduceTranslations(translations, translationEntry, vars = null) {
  if (translations && translations[translationEntry]) {
    return prepareValues(translations[translationEntry], vars);
  } else if (translationEntry === "") {
    return ''
  } else return 'ERR! No translation!';
}

module.exports = {
  reduceTranslations,
};
