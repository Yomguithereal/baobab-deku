# baobab-deku

Simple helpers to use Baobab along with deku.

## Installation

You can install **baobab-deku** easily through npm (note that you must have `baobab` and `deku` installed for the library to work):

```
# Installing necessary dependencies
npm install --save baobab deku
# Installing the lib
npm install --save baobab-deku
```

## Usage

```jsx
import Baobab from 'baobab';
import {dom, element} from 'deku';
import {createDispatcher, branch} from 'baobab-deku';

const {createRenderer} = dom;

// 1. Creating our tree
const tree = new Baobab({counter: 0});

// 2. Creating actions to mutate the counter
function increment(tree) {
  tree.apply('counter', nb => nb + 1);
}

function decrement(tree) {
  tree.apply('counter', nb => nb - 1);
}

// 3. Creating our dispatcher & renderer
const dispatcher = createDispatcher(tree),
      render = createRenderer(document.body, dispatcher);

// 4. Creating a counter component
const Counter = branch({counter: ['counter']}, ({dispatch, props}) => {
  return (
    <div>
      <p>{props.counter}</p>
      <div>
        <button onClick={dispatch(decrement)}>-</button>
        <button onClick={dispatch(increment)}>+</button>
      </div>
    </div>
  );
});

// 5. Rendering our app, pass the tree as context & refreshing on tree update
function refresh() {
  render(<Counter />);
}

tree.on('update', refresh);
refresh();
```

## License

[MIT](LICENSE.txt)
