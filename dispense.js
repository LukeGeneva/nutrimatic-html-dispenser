const fs = require('fs');
const path = require('path');
const { render } = require('./render');

const IMPORT_REGEX = /\{\{\s*import (\w+\.html)\s*\}\}/g;
const IMPORT_WITH_CONTENT_REGEX =
  /\{\{\s*import\s+((\w+|\-+|_+)*.html)\s*\}\}\s*((.|\s)*)\{\{\s*\/\1\s*\}\}/g;

function dispense(filepath, options) {
  let content = fs.readFileSync(filepath, 'utf-8');
  const dir = path.dirname(filepath);

  const importsWithContent = content.matchAll(IMPORT_WITH_CONTENT_REGEX);

  for (let i of importsWithContent) {
    const source = i.at(0);
    const file = i.at(1);
    const innerContent = i.at(3);
    const importFilePath = path.join(dir, file);
    const importContents = fs.readFileSync(importFilePath);
    content = content.replace(source, importContents.toString());
    content = content.replaceAll(/\{\{\s*\}\}/g, innerContent);
  }

  const imports = content.matchAll(IMPORT_REGEX);

  for (let i of imports) {
    const source = i.at(0);
    const file = i.at(1);
    const importFilePath = path.join(dir, file);
    const importContents = fs.readFileSync(importFilePath);
    content = content.replace(source, importContents.toString());
  }

  const rendered = render(content, options);
  return rendered;
}

module.exports = { dispense };
