# Nutrimatic HTML Dispenser

![Logo](images/logo.webp)

Providing HTML almost, but not quite, entirely unlike React.

## Installation

```bash
npm install nutrimatic-html-dispenser
```

## Features

### 🔄 Simple Value Replacement

Substitute placeholders in your templates with values from an options object.
Just use the `{{value}}` syntax, and it will be replaced by options.value during
rendering.

Example:

```html
<html>
    <body>
        <h1>{{ title }}</h1>
        <p>{{ message }}</p>
    </body>
</html>
```

JavaScript:

```javascript
const options = {
    title: 'Welcome to the Nutrimatic!',
    message: 'Your web content is almost ready.',
};

dispense('./template.html', options, (err, html) => {
    if (err) throw err;
    console.log(html);
});
```

Output:

```html
<html>
    <body>
        <h1>Welcome to the Nutrimatic!</h1>
        <p>Your web content is almost ready.</p>
    </body>
</html>
```

### 🚀 HTML Importing

Easily import HTML files into your templates using the `{{ import }}` syntax:

<!-- index.html -->
<html>
  <body>
    {{ import header.html }}
    <p>Welcome to the Nutrimatic HTML Dispenser!</p>
    {{ import footer.html }}
  </body>
</html>

This simple syntax allows you to modularize your HTML and keep your files clean
and easy to manage.

### 🧬 Content Injection

Inject dynamic content into your imports with `{{ import filename.html }} ... {{/filename.html }}`:

```html
<!-- page.html -->
<html>
    <body>
        {{ import content.html }}This is custom content!{{ /content.html }}
    </body>
</html>
```

```html
<!-- content.html -->
<div>{{}}</div>
```

Here, the placeholder `{{}}` in `content.html` will be swapped with the string
"This is custom content!", allowing flexible reuse of components across
different pages.

### 🔁 Loop Syntax

Need to iterate through an array in your templates? Nutrimatic HTML Dispenser
offers a powerful loop feature. With `{{for items}}`, you can loop over arrays,
where:

`{{this}}` refers to the current array item. Other placeholders (like
`{{property}}`) access specific properties within each array item if the array
consists of objects.

Example:

```html
<!-- template.html -->
<ul>
    {{for foo}}
    <li>{{this}}</li>
    {{/foo}}
</ul>
```

JavaScript

```javascript
const options = { foo: ['bar', 'baz'] };

dispense('./template.html', options, (err, html) => {
    console.log(html);
});
```

Output:

```html
<ul>
    <li>bar</li>
    <li>baz</li>
</ul>
```

### ⚖️ Conditional Rendering

Sometimes, you need to conditionally render parts of your template. You can
accomplish this with the conditional syntax, which resembles a ternary.

Example:

```html
{{ condition ?
<div>true</div>
:
<div>false</div>
}}
```

JavaScript:

```javascript
const options = { condition: true };

dispense('./template.html', options, (err, html) => {
    console.log(html);
});
```

Output:

```html
<div>true</div>
```
