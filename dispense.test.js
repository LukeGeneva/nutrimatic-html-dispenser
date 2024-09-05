const fs = require('fs');
const { dispense } = require('./dispense');

let callback;

beforeEach(() => {
  callback = jest.fn();
});

test('that HTML is returned', () => {
  const filepath = './test/views/plain.html';
  dispense(filepath, null, callback);
  const contents = fs.readFileSync(filepath, { encoding: 'utf-8' });
  expect(callback).toHaveBeenCalledWith(null, contents);
});
