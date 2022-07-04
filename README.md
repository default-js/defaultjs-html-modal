# defaultjs-html-modal

- [defaultjs-html-modal](#defaultjs-html-modal)
- [How to include?](#how-to-include)
  - [npm](#npm)
  - [browser](#browser)
- [How to use?](#how-to-use)
  - [Attribute: `template` - optional](#attribute-template---optional)
  - [Attribute: `closable` - optional](#attribute-closable---optional)
  - [Define close action - `modal-hide`](#define-close-action---modal-hide)
- [Events](#events)
- [Javascript API](#javascript-api)

# How to include?

## npm

Install `defaultjs-html-modal` as a dependency into your project.
```
npm install @default-js/defaultjs-html-modal
```

Include `defaultjs-html-modal` into your main js-file.
```javascript
import "@default-js/defaultjs-html-modal"
```

## browser

Download the `dist/browser-bundle-defaultjs-html-modal.min.js` file and past the file to your js files.

Load the `browser-bundle-defaultjs-html-modal.min.js` file via `script` tag at html page.

# How to use?

```html 
<d-modal>
    <!-- your content -->
</d-modal>
<d-modal template="path/to/a/template.tpl.html"></d-modal>
```
## Attribute: `template` - optional

You can specify a path/url for a template, that would be loaded as content of the modal. The template would be evaluate with the `default-js/defaultjs-template-language` template engine.

## Attribute: `closable` - optional

This attribute makes the modal auto closing, if you click outside the modal. If this attribute not available, then the modal can only be closed by an element of modal content with attribute `modal-hide` or via javascript.

## Define close action - `modal-hide`

You can define an html element and add the attribite `modal-hide`. This defines for this html element, that an click event would be closed the modal. An element with the attribute `modal-hide` would be searched by content of the modal automaticly.

```html
<d-modal>
    <h3>this is a modal</h3>
    <button modal-hide>cloase modal</button>
</d-modal>
```
# Events
`d-modal-event:show`

`d-modal-event:showing`

`d-modal-event:hide`

`d-modal-event:hiding`


# Javascript API

```html
<d-modal>
    <h3>this is a modal</h3>
</d-modal>
```

```javascript
const modal = find("d-modal").first()

// via functions
modal.show(); // make the modal visible
modal.hide(); // make the modal invisible

// via events
modal.trigger("d-modal-event:show"); // make the modal visible
modal.trigger("d-modal-event:hide"); // make the modal invisible
```

