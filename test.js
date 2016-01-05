/**
 * Baobab Deku Unit Tests
 * =======================
 *
 */
var assert = require('assert'),
    Baobab = require('baobab'),
    deku = require('deku'),
    lib = require('./index.js');

var createDispatcher = lib.createDispatcher,
    branch = lib.branch,
    render = deku.string.renderString,
    h = deku.element;

/**
 * Dispatcher.
 */
describe('#createDispatcher', function() {

  it('should work as expected.', function() {
    var tree = new Baobab({name: 'John', surname: 'Ney'}, {asynchronous: false});

    var dispatcher = createDispatcher(tree);

    var action = function(tree, name, surname) {
      tree.set('name', name);
      tree.set('surname', surname);
    };

    dispatcher(action, 'Jack', 'Davout');

    assert.deepEqual(tree.get(), {name: 'Jack', surname: 'Davout'});
  });
});

/**
 * Branching.
 */
describe('#branch', function() {

  it('should throw if the mapping is invalid.', function() {
    assert.throws(function() {
      branch(null, {});
    }, /invalid/);
  });

  it('should throw if the tree is not found in context.', function() {
    var tree = new Baobab({name: 'John'}, {asynchronous: false});

    var composedComponent = branch({name: ['name']}, function(model) {
      return h('div', null, ['Hello']);
    });

    assert.throws(function() {
      render(h(composedComponent));
    }, /tree in context/);
  });

  it('should properly pass props to the composed components.', function() {
    var tree = new Baobab({name: 'John'}, {asynchronous: false});

    var composedComponent = branch({name: ['name']}, function(model) {
      return h('div', null, model.props.name);
    });

    var html = render(h(composedComponent), {tree: tree});

    assert.strictEqual(html, '<div>John</div>');

    tree.set('name', 'Jack');

    var html = render(h(composedComponent), {tree: tree});

    assert.strictEqual(html, '<div>Jack</div>');
  });
});
