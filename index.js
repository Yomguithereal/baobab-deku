/**
 * Baobab Deku Utilities
 * ======================
 *
 * Simple utilities to use a Baobab tree as state store for a deku app.
 */
var Baobab = require('baobab'),
    type = Baobab.type,
    element = require('deku').element,
    assign = require('object-assign');

/**
 * Creates a very simple dispatcher that will run functions on the tree.
 */
exports.createDispatcher = function(tree) {
  return function(action) {
    var args = [].slice.call(arguments, 1);

    return action.apply(null, [tree].concat(args));
  };
};

/**
 * Higher order function that will map paths of the tree to props.
 */
exports.branch = function(mapping, Component) {
  if (!type.object(mapping))
    throw Error('baobab-deku.branch: invalid mapping.');

  return {
    render: function(model) {
      var context = model.context || {},
          tree = context.tree;

      if (!(tree instanceof Baobab))
        throw Error('baobab-deku.branch/render: could not find the tree in context.');

      var data = tree.project(mapping);

      var props = assign({}, data, model.props);

      return element(Component, props, model.children);
    }
  };
};
