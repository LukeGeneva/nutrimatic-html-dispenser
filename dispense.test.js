const { dispense } = require('./dispense');

test('that files can be imported', () => {
  const html = '<header><nav>Navigation</nav>\n</header>\n';
  const output = dispense('./test/views/import-test.html', {});
  expect(output).toEqual(html);
});

test('that imported views can container inner markup', () => {
  const html = '<div><div>inner</div>\n</div>\n';
  const output = dispense('./test/views/inner-markup.html', {});
  expect(output).toEqual(html);
});

test('that imported views can contain imported views', () => {
  const html = '<div><nav>Navigation</nav>\n<div>test</div>\n</div>\n';
  const output = dispense('./test/views/nested-import.html', {});
  expect(output).toEqual(html);
});
