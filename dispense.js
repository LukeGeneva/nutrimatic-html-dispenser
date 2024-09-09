const VALUE_REGEX = /\{\{\W*(\w+)\W*\}\}/g;
const LOOP_REGEX =
  /\{\{\W*for\W+(\w+)\W+in\W+(\w+)\W*\}\}((\n|.)*)\{\{\W*\2\W*\}\}/g;

function render(content = '', options = {}) {
  const loops = content.matchAll(LOOP_REGEX);
  let rendered = content;

  for (let loop of loops) {
    const loopHTML = renderLoop(loop, options);
    rendered = rendered.replace(loop.at(0), loopHTML);
  }

  rendered = rendered.replace(VALUE_REGEX, (_match, key) => {
    return options[key] || '';
  });

  return rendered;
}

function renderLoop(loop, options) {
  const variable = loop.at(1);
  const loopVar = loop.at(2);
  const inner = loop.at(3);
  const snippets = [];
  for (let value of options[loopVar]) {
    const html = render(inner, { [variable]: value });
    snippets.push(html);
  }
  const html = snippets.join('');
  return html;
}

module.exports = { render };
