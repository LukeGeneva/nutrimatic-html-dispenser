const { render } = require('./dispense');

test('that HTML is returned', () => {
  const source = '<div>test</div>';
  const html = render(source, {});
  expect(html).toEqual(source);
});

test('that values are replaced', () => {
  const source = '<div>{{ foo }}</div>';
  const html = render(source, { foo: 'bar' });
  expect(html).toEqual('<div>bar</div>');
});

test('that loops are handled', () => {
  const source = `<ul>
  {{for value in foo}}
  <li>{{value}}</li>
  {{/foo}}
</ul>`;
  const html = render(source, { foo: ['bar', 'baz'] });
  expect(html.includes('<li>bar</li>')).toBe(true);
  expect(html.includes('<li>baz</li>')).toBe(true);
});
