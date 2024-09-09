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
  {{for foo}}
  <li>{{this}}</li>
  {{/foo}}
</ul>`;
  const html = render(source, { foo: ['bar', 'baz'] });
  expect(html.includes('<li>bar</li>')).toBe(true);
  expect(html.includes('<li>baz</li>')).toBe(true);
});

test('that nested loops are handled', () => {
  const source = `<ul>
  {{for foo}}
  <li>
    {{for bar}}
      <div>{{this}}</div>
    {{/bar}}
  </li>
  {{/foo}}
</ul>`;
  const html = render(source, {
    foo: [{ bar: ['a', 'b'] }, { bar: ['c', 'd'] }],
  });
  expect(html.includes('<div>c</div>')).toBe(true);
});
