const { render } = require('./dispense');

function dispense(filepath, options, callback) {
  const content = fs.readFileSync(filepath, 'utf-8');
  const rendered = render(content, options);
  return callback(null, rendered);
}

module.exports = { dispense };
