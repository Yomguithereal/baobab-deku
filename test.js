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
    branch = lib.branch;

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
});
