const { render } = require('./render');

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
  const expected = `<ul>
  <li>bar</li>
  <li>baz</li>
</ul>`;
  expect(html).toEqual(expected);
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
  const expected = `<ul>
  <li>
      <div>a</div>
      <div>b</div>
  </li>
  <li>
      <div>c</div>
      <div>d</div>
  </li>
</ul>`;
  expect(html).toEqual(expected);
});

test('that conditional (true) is rendered', () => {
  const source = '{{ conditional ? <div>true</div> : <div>false</div> }}';
  const html = render(source, { conditional: true });
  expect(html).toEqual('<div>true</div> ');
});

test('that conditional (false) is rendered', () => {
  const source = '{{ conditional ? <div>true</div> : <div>false</div> }}';
  const html = render(source, { conditional: false });
  expect(html).toEqual('<div>false</div> ');
});
