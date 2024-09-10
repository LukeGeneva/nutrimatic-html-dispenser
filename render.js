const VALUE_REGEX = /\{\{\s*(\w+)\s*\}\}/g;
const LOOP_REGEX = /\{\{\s*for\s+(\w+)\s*\}\}((\n|.)*)\{\{\s*\/\1\s*\}\}/g;
const COND_REGEX = /\{\{\s*(\w+|\_*)\s*\?\s*(.+)\s*\:\s*(.+)\s*\}\}/g;

function render(content = '', options = {}) {
  const loops = content.matchAll(LOOP_REGEX);
  let rendered = content;

  for (let loop of loops) {
    const loopHTML = renderLoop(loop, options);
    rendered = rendered.replace(loop.at(0), loopHTML);
  }

  const conditionalMatches = rendered.matchAll(COND_REGEX);
  for (let match of conditionalMatches) {
    const html = renderConditional(match, options);
    rendered = rendered.replace(match.at(0), html);
  }

  rendered = rendered.replace(VALUE_REGEX, (_match, key) => {
    return options[key] || options || '';
  });

  return rendered.replaceAll(/\n\s*\n/g, '\n');
}

function renderLoop(match, options) {
  const loopVar = match.at(1);
  const inner = match.at(2);
  const snippets = [];
  for (let value of options[loopVar]) {
    const html = render(inner, value);
    snippets.push(html);
  }
  const html = snippets.join('');
  return html;
}

function renderConditional(match, options) {
  const conditionalVar = match.at(1);
  const conditional = options[conditionalVar];
  const truthyContent = match.at(2);
  const falsyContent = match.at(3);
  return conditional ? truthyContent : falsyContent;
}

module.exports = { render };
