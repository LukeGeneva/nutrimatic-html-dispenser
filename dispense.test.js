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

test('that imported views can container inner markup', () => {
  dispense('./test/views/inner-markup.html', {}, callback);
  const html = '<div><div>inner</div>\n</div>\n';
  expect(callback).toHaveBeenCalledWith(null, html);
});

test('that imported views can contain imported views', () => {
  dispense('./test/views/nested-import.html', {}, callback);
  const html = '<div><nav>Navigation</nav>\n<div>test</div>\n</div>\n';
  expect(callback).toHaveBeenCalledWith(null, html);
});
