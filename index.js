'use strict'

module.exports = Menu

function Menu (opts) {
  if (!(this instanceof Menu)) return new Menu(opts)
  if (Array.isArray(opts)) opts = {items: opts}
  this._items = normalizeItems(opts.items)
  this._render = opts.render || render
  this._selected = opts.selected || 0

  // If the selected item is a separator try to first find the next
  // non-separator going down. If none is found, try to go up. If none
  // is found up either, set the selected item to null
  if (this._items[this._selected].separator && !this.down() && !this.up()) this._selected = null
}

Menu.prototype.up = function () {
  let i = this._selected
  while (--i >= 0 && this._items[i].separator) {}
  if (i < 0) return false
  this._selected = i
  return true
}

Menu.prototype.down = function () {
  let i = this._selected
  while (++i < this._items.length && this._items[i].separator) {}
  if (i === this._items.length) return false
  this._selected = i
  return true
}

Menu.prototype.select = function (index) {
  if (!Number.isFinite(index) ||
    index < 0 ||
    index >= this._items.length ||
    this._items[index].separator) return false
  this._selected = index
  return true
}

Menu.prototype.selected = function () {
  // in case the menu is empty or only consists of separators
  if (this._selected === null) return null
  return this._items[this._selected]
}

Menu.prototype.toString = function () {
  const self = this
  return this._items.map(function (item, index) {
    return self._render(item, index === self._selected)
  }).join('\n')
}

function render (item, selected) {
  return (selected ? '> ' : '  ') + item.text
}

function normalizeItems (items) {
  return items.map(function (item, index) {
    if (typeof item === 'string') item = {text: item}
    item.index = index
    return item
  })
}
