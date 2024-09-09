const fs = require('fs');
const path = require('path');
const { render } = require('./render');

const IMPORT_REGEX = /\{\{\W*import (\w+\.html)\W*\}\}/g;

function dispense(filepath, options, callback) {
  let content = fs.readFileSync(filepath, 'utf-8');
  const imports = content.matchAll(IMPORT_REGEX);
  const dir = path.dirname(filepath);

  for (let i of imports) {
    const source = i.at(0);
    const file = i.at(1);
    const importFilePath = path.join(dir, file);
    const importContents = fs.readFileSync(importFilePath);
    content = content.replace(source, importContents.toString());
  }

  const rendered = render(content, options);
  return callback(null, rendered);
}

module.exports = { dispense };
