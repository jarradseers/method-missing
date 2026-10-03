# Method Missing

[![CI](https://github.com/jarradseers/method-missing/actions/workflows/ci.yml/badge.svg)](https://github.com/jarradseers/method-missing/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/method-missing.svg)](https://www.npmjs.com/package/method-missing)

Catch calls to methods that do not exist. Extend `MethodMissing` from your ES6 class (or base class), define `__call(name, args)`, and every call to a missing method is handed to it. Small, with no dependencies.

It also works for static methods and plain objects.

MethodMissing is used in [extends-classes](https://www.npmjs.com/package/extends-classes), which allows a class to extend several classes.

## Installation

```bash
$ npm install method-missing
```

## Usage

```js
const MethodMissing = require('method-missing');

class Simple extends MethodMissing {

  __call(name, args) {
    return `The method '${name}' was called with: ${args.join(', ')}`;
  }

}

const simple = new Simple();

simple.nonExistent('Hello!');
// The method 'nonExistent' was called with: Hello!
```

`__call` receives the method name and an array of the arguments. Whatever it returns is returned to the caller, and `this` is the instance, so `return this` makes missing methods chainable.

Methods, properties and getters that do exist behave as normal.

### Static methods

Wrap the class with `MethodMissing.static` and define a static `__call`:

```js
class Simple {

  static __call(name, args) {
    return `The method '${name}' was called with: ${args.join(', ')}`;
  }

}

const Wrapped = MethodMissing.static(Simple);

Wrapped.nonExistentStatic(1, 2, 3);
// The method 'nonExistentStatic' was called with: 1, 2, 3
```

A class can do both: extend `MethodMissing` for its instances and be wrapped with `MethodMissing.static` for its static methods.

### Objects

Pass a handler function as the second argument:

```js
const object = MethodMissing.static({
  one() {
    return 'hey there';
  }
}, (name, args) => `Sorry, method '${name}' doesn't exist.`);

object.one(); // hey there
object.two(); // Sorry, method 'two' doesn't exist.
```

### Changing the handler name

Pass the name to `super`, and to `MethodMissing.static` for static methods:

```js
class Test extends MethodMissing {

  constructor() {
    super('missing');
  }

  missing(name, args) {
    return `The method '${name}' was called with: ${args.join(', ')}`;
  }

  static missing(name, args) {
    return `The static method '${name}' was called with: ${args.join(', ')}`;
  }

}

const Wrapped = MethodMissing.static(Test, 'missing');
```

## What counts as missing

Reading any property that does not exist on the object returns a function that calls your handler, so `typeof simple.anything` is `'function'`. Three kinds of lookup are left alone and return `undefined`, because the language makes them on every object:

- `then`, so instances can be awaited, resolved by promises and returned from `async` functions.
- `toJSON`, so instances can be passed to `JSON.stringify`.
- Symbols, such as `Symbol.iterator`.

Define any of these on your class and they work as usual.

If there is no handler (no `__call` on the class), missing properties are `undefined`, the same as on any object.

## Upgrading from 1.x

- The value returned by the handler is now returned to the caller. In 1.x it was discarded.
- `then`, `toJSON` and symbols are no longer handed to the handler. In 1.x this made `await instance` hang and `JSON.stringify(instance)` return `undefined`.
- A class with no handler no longer throws `MethodMissingError` when a missing property is read; the property is `undefined`.
- Getters now run with the instance, not the unwrapped object, as `this`.

## Tests

```bash
$ npm install
$ npm test
```

## License

[MIT](LICENSE)
