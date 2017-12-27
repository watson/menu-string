'use strict'

const test = require('tape')
const Menu = require('./')

test('new Menu(options)', function (t) {
  const menu = new Menu({
    items: [
      {text: 'Item 1'},
      {text: 'Item 2'},
      {text: 'Item 3'}
    ]
  })
  t.equal(menu.toString(),
    '> Item 1\n' +
    '  Item 2\n' +
    '  Item 3'
  )
  t.end()
})

test('new Menu(items)', function (t) {
  const menu = new Menu([
    {text: 'Item 1'},
    {text: 'Item 2'},
    {text: 'Item 3'}
  ])
  t.equal(menu.toString(),
    '> Item 1\n' +
    '  Item 2\n' +
    '  Item 3'
  )
  t.end()
})

test('options.selected', function (t) {
  const menu = new Menu({
    items: [
      {text: 'Item 1'},
      {text: 'Item 2'},
      {text: 'Item 3'}
    ],
    selected: 1
  })
  t.equal(menu.toString(),
    '  Item 1\n' +
    '> Item 2\n' +
    '  Item 3'
  )
  t.end()
})

test('options.render', function (t) {
  t.plan(6)
  new Menu({
    items: [
      {text: 'Item 1'},
      {text: 'Item 2'},
      {text: 'Item 3'}
    ],
    render: function (item, selected) {
      t.equal(item.text, 'Item ' + (item.index + 1))
      t.equal(item.index === 0, selected)
    }
  }).toString()
})

test('item as string', function (t) {
  const menu = new Menu([
    'Item 1',
    'Item 2',
    'Item 3'
  ])
  t.equal(menu.toString(),
    '> Item 1\n' +
    '  Item 2\n' +
    '  Item 3'
  )
  t.end()
})

test('menu.up()', function (t) {
  const menu = new Menu({
    items: [
      {text: 'Item 1'},
      {text: 'Item 2'},
      {text: 'Item 3'}
    ],
    selected: 1
  })
  t.ok(menu.up())
  t.equal(menu.toString(),
    '> Item 1\n' +
    '  Item 2\n' +
    '  Item 3'
  )
  t.notOk(menu.up())
  t.equal(menu.toString(),
    '> Item 1\n' +
    '  Item 2\n' +
    '  Item 3'
  )
  t.end()
})

test('menu.down()', function (t) {
  const menu = new Menu({
    items: [
      {text: 'Item 1'},
      {text: 'Item 2'},
      {text: 'Item 3'}
    ],
    selected: 1
  })
  t.ok(menu.down())
  t.equal(menu.toString(),
    '  Item 1\n' +
    '  Item 2\n' +
    '> Item 3'
  )
  t.notOk(menu.down())
  t.equal(menu.toString(),
    '  Item 1\n' +
    '  Item 2\n' +
    '> Item 3'
  )
  t.end()
})

test('menu.select(index)', function (t) {
  const menu = new Menu([
    {text: 'Item 1'},
    {text: 'Item 2'},
    {text: 'Item 3'}
  ])
  t.ok(menu.select(1))
  t.equal(menu.toString(),
    '  Item 1\n' +
    '> Item 2\n' +
    '  Item 3'
  )
  t.notOk(menu.select(3))
  t.equal(menu.toString(),
    '  Item 1\n' +
    '> Item 2\n' +
    '  Item 3'
  )
  t.end()
})

test('menu.selected()', function (t) {
  const menu = new Menu([
    {text: 'Item 1'},
    {text: 'Item 2'},
    {text: 'Item 3'}
  ])
  t.deepEqual(menu.selected(), {text: 'Item 1', index: 0})
  t.ok(menu.select(2))
  t.deepEqual(menu.selected(), {text: 'Item 3', index: 2})
  t.end()
})

test('separator, not first', function (t) {
  const menu = new Menu([
    {text: 'Item 1'},
    {text: 'Item 2'},
    {text: '------', separator: true},
    {text: 'Item 3'}
  ])
  t.equal(menu.toString(),
    '> Item 1\n' +
    '  Item 2\n' +
    '  ------\n' +
    '  Item 3'
  )
  t.end()
})

test('separator, first', function (t) {
  const menu = new Menu([
    {text: '------', separator: true},
    {text: 'Item 1'},
    {text: 'Item 2'},
    {text: 'Item 3'}
  ])
  t.equal(menu.toString(),
    '  ------\n' +
    '> Item 1\n' +
    '  Item 2\n' +
    '  Item 3'
  )
  t.end()
})

test('separator, default selected middle', function (t) {
  const menu = new Menu({
    items: [
      {text: 'Item 1'},
      {text: 'Item 2'},
      {text: '------', separator: true},
      {text: 'Item 3'}
    ],
    selected: 2
  })
  t.equal(menu.toString(),
    '  Item 1\n' +
    '  Item 2\n' +
    '  ------\n' +
    '> Item 3'
  )
  t.end()
})

test('separator, default selected last', function (t) {
  const menu = new Menu({
    items: [
      {text: 'Item 1'},
      {text: 'Item 2'},
      {text: 'Item 3'},
      {text: '------', separator: true}
    ],
    selected: 3
  })
  t.equal(menu.toString(),
    '  Item 1\n' +
    '  Item 2\n' +
    '> Item 3\n' +
    '  ------'
  )
  t.end()
})

test('separator, only', function (t) {
  const menu = new Menu([
    {text: '------', separator: true}
  ])
  t.equal(menu.toString(),
    '  ------'
  )
  t.equal(menu.selected(), null)
  t.end()
})

test('separator, skip up', function (t) {
  const menu = new Menu({
    items: [
      {text: 'Item 1'},
      {text: 'Item 2'},
      {text: '------', separator: true},
      {text: 'Item 3'}
    ],
    selected: 3
  })
  t.equal(menu.toString(),
    '  Item 1\n' +
    '  Item 2\n' +
    '  ------\n' +
    '> Item 3'
  )
  t.ok(menu.up())
  t.equal(menu.toString(),
    '  Item 1\n' +
    '> Item 2\n' +
    '  ------\n' +
    '  Item 3'
  )
  t.end()
})

test('separator, skip down', function (t) {
  const menu = new Menu({
    items: [
      {text: 'Item 1'},
      {text: 'Item 2'},
      {text: '------', separator: true},
      {text: 'Item 3'}
    ],
    selected: 1
  })
  t.equal(menu.toString(),
    '  Item 1\n' +
    '> Item 2\n' +
    '  ------\n' +
    '  Item 3'
  )
  t.ok(menu.down())
  t.equal(menu.toString(),
    '  Item 1\n' +
    '  Item 2\n' +
    '  ------\n' +
    '> Item 3'
  )
  t.end()
})

test('separator, up last', function (t) {
  const menu = new Menu([
    {text: '------', separator: true},
    {text: 'Item 1'},
    {text: 'Item 2'},
    {text: 'Item 3'}
  ])
  t.equal(menu.toString(),
    '  ------\n' +
    '> Item 1\n' +
    '  Item 2\n' +
    '  Item 3'
  )
  t.notOk(menu.up())
  t.equal(menu.toString(),
    '  ------\n' +
    '> Item 1\n' +
    '  Item 2\n' +
    '  Item 3'
  )
  t.end()
})

test('separator, down last', function (t) {
  const menu = new Menu({
    items: [
      {text: 'Item 1'},
      {text: 'Item 2'},
      {text: 'Item 3'},
      {text: '------', separator: true}
    ],
    selected: 2
  })
  t.equal(menu.toString(),
    '  Item 1\n' +
    '  Item 2\n' +
    '> Item 3\n' +
    '  ------'
  )
  t.notOk(menu.down())
  t.equal(menu.toString(),
    '  Item 1\n' +
    '  Item 2\n' +
    '> Item 3\n' +
    '  ------'
  )
  t.end()
})
