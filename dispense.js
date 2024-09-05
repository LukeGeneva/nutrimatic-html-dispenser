const fs = require('fs');

function dispense(filepath, options, callback) {
  const content = fs.readFileSync(filepath, 'utf-8');
  return callback(null, content);
}

module.exports = { dispense };
