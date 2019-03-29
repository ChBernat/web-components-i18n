# Web-Components-i18n
 This repository was made mostly with Stencil.js in mind but hopefully will receive more love and will be extended to cover more web components loving frameworks.
 
### How to?
 1. Run `init` to create initial configuration in your main directory.
 2. Create directory you've provided in config (default is `src/locales/i18n`) and create there a default translation file (derfault is `en.js`).
 3. Run `extract` to extract all of your translations.
 
### How it works?
The module fills your files with translations found in your components. Module saves them as objects with `key` being an original string and `value` being a translation. For default language they are the same, for any additional language it will be `ERR! No translation!` until you provide translations to this file.

To extract translations make sure that your components are using attributes given in config - for instance `trText="Text to be translated."` will generated a `key-pair` in default translation of `"Text to be translated.": "Text to be translated."` and in every other locale file: `"Text to be translated.": "ERR! No translation!"`.

This module does more though - it can also extract translations from `ts`/`js` files and even work with them! All you need to use is a function called `reduceTranslations` which gets following arguments:

1. `translations` translations object (np. content of `default translation`).
2. `translationEntry` which is essentially a text that is meant to be translated. The one that serves as a `key` in locale files.
3. `vars` optional parameter to work with string literals that contain variables.

##### String literals
To work with string literals be sure to put them as simple strings, for instance: `"This is variable ${this.world}"` and to use `this` quantifier. 

**Side note:** This behaviour will be altered soon and need of quantifier will be deprecated.

 ### CLI
 This module is, for now, only a CLI with following commands:
 
- `init` (Generates basic configuration.)
- `extract-default` (Extracts default translation.)
- `extract` (Extracts all translations.)

Sidenote: To use `extract` you have to create files first. For instance - you have default translation called `en.js` so if you want to have translations for norwegian language you have to add manually `no.js` and run `extract`. This will fill `no.js` with untranslated strings.

### Todo
- Clean up
- Tests
- Make it more bulletproof
- Create translation files automatically by giving an array of names in the config.
- Export translation files to google drive.
- Import translation files from google drive.

Export / import from google should make translator's life easier.
