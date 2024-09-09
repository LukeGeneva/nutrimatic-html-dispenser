const { dispense } = require('./dispense');

let callback;

beforeEach(() => {
  callback = jest.fn();
});

test('that files can be imported', () => {
  dispense('./test/views/import-test.html', {}, callback);
  const html = '<header><nav>Navigation</nav>\n</header>\n';
  expect(callback).toHaveBeenCalledWith(null, html);
});
