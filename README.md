# menu-string

Generate a menu with selectable menu items as a string.

[![Build status](https://travis-ci.org/watson/menu-string.svg?branch=master)](https://travis-ci.org/watson/menu-string)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## Installation

```
npm install menu-string --save
```

## Usage

```js
const Menu = require('menu-string')

const menu = new Menu({
  items: [
    {text: 'Item 1'},
    {text: 'Item 2'},
    {text: '------', separator: true},
    {text: 'Item 3'}
  ],
  selected: 0
})

console.log(menu.toString())
// > Item 1
//   Item 2
//   ------
//   Item 3

// Move cursor one item down
menu.down()

console.log(menu.toString())
//   Item 1
// > Item 2
//   ------
//   Item 3
```

## API

### `menu = new Menu(options)`

Initialize a new `menu` object.

Options:

- `items` - An array of `item` objects
- `render` - An optional render function that will be called for each
  menu item that is rendered. Will be called with the `item` object that
  should be rendered and a boolean indicating if the `item` is currectly
  selected. Should return a rendered string representing the menu item.
  The `item` object will have an `index` property indicating its
  position in the menu
- `selected` - An optional integer specifying which menu item should be
  selected by default (defaults to `0`)

An `item` object can have the following properties:

- `text` - The text to show when rendering the item
- `separator` - A boolean indicating if the item can be selected

An `item` can also just be a string, which is treated as `{text: item}`.

If no custom render function is provided, the following default render
function is used:

```js
function (item, selected) {
  return (selected ? '> ' : '  ') + item.text
}
```

### `menu = new Menu(items)`

An alias for:

```js
new Menu({
  items: items
})
```

### `success = menu.up()`

Move the cursor one item up. Separator items will be skipped.

Returns `false` if top of menu have been reached. Returns `true`
otherwise.

### `success = menu.down()`

Move the cursor one item down. Separator items will be skipped.

Returns `false` if bottom of menu have been reached. Returns `true`
otherwise.

### `menu.select(index)`

Select a specific menu item.

Returns `false` if the index was invalid. Returns `true` otherwise.

### `item = menu.selected()`

Returns the selected `item` object. The returned `item` object will have
an `index` property indicating its position in the menu. Returns `null`
if no selectable menu item exists.

### `str = menu.toString()`

Returns the entire menu as a single string. One line for each menu item
rendered by the render function.

## License

MIT
