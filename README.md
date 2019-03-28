# Web-Components-i18n
 This repository was made mostly with Stencil.js in mind but hopefully will receive more love and will be extended to cover more web components loving frameworks.
 
### How to?
 1. Run `init` to create initial configuration in your main directory.
 2. Create directory you've provided in config (default is `src/locales/i18n`) and create there a default translation file (derfault is `en.js`).
 3. Run `extract` to extract all of your translations.
 
### How it works?
The module fills your files with translations found in your components. Module saves them as objects with `key` being an original string and `value` being a translation. For default language they are the same, for any additional language it will be `ERR! No translation!` until you provide translations to this file.

 ### CLI
 This module is, for now, only a CLI with following commands:
 
- `init` (Generates basic configuration.)
- `extract-default` (Extracts default translation.)
- `extract` (Extracts all translations.)

Sidenote: To use `extract` you have to create files first. For instance - you have default translation called `en.js` so if you want to have translations for norwegian language you have to add manually `no.js` and run `extract`. This will fill `no.js` with untranslated strings.

### Todo
- Clean up
- Create translation files automatically by giving an array of names in the config.
- Export translation files to google drive.
- Import translation files from google drive.

Export / import from google should make translator's life easier.
