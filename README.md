# Method Missing Class

  The method missing handler class is simple to use, simply extend it from your es6 class (or base class) and you are able to handle the missing methods.

  It defaults to using a method on your class `__call(name, args)` however you can chage this behaviour.

  Method missing also works with singletons and other objects, please see the examples below.

  MethodMissing is packaged with the [extends-classes project](https://www.npmjs.com/package/extends-classes) allowing for the extension of multiple classes.

## Usage

Include the MethodMissing class:

```js
const MethodMissing = require('method-missing');
```

Standard inheritance example:

```js
class Simple extends MethodMissing {

  constructor() {
    super();
  }

  __call(name, args) {
    console.log(`The method '${name}' was called with:`, args);
  }

}

const simple = new Simple();
simple.nonExistent('Hello!');
// The method 'nonExistent' was called with: { '0': 'Hello!' }
```

Static only example:

```js
class Simple {

  static __call(name, args) {
    console.log(`The method '${name}' was called with:`, args);
  }

}

Simple = MethodMissing.static(Simple);
Simple.nonExistentStatic(1, 2, 3);
// The method 'nonExistentStatic' was called with: {0: 1, 1: 2, 2: 3}
```

Complete example:

```js
class Simple extends MethodMissing {

  constructor() {
    super();
  }

  iExist(str) {
    console.log(`I do exist ${str}.`);
  }

  __call(name, args) {
    console.log(`The method '${name}' was called with:`, args);
  }

  static __call(name, args) {
    console.log(`The method '${name}' was called with:`, args);
  }

}

Simple = MethodMissing.static(Simple);

const simple = new Simple();

simple.nonExistent('hello');
simple.iExist('world');
Simple.nonExistentStatic('hey');
// The method 'nonExistent' was called with: { '0': 'hello' }
// I do exist world.
// The method 'nonExistentStatic' was called with: { '0': 'hey' }
```
Used on an object:

```js
const object = MethodMissing.static({
  one: function() {
    console.log('hey there');
  }
}, (name, args) => {
  console.log(`Sorry, method '${name}' doesn't exist.`);
});

object.one();
object.two();

// hey there
// Sorry, method 'two' doesn't exist.
```

Check out the [test folder](test) for more!

## Installation

```bash
$ npm install method-missing
```

## Features

  * Capture missing methods in your class.
  * Simple, fast, light-weight with no external dependencies.
  * Easy to use in existing projects (particularly if you already extend es6 classes from a base class).
  * Written in ES6+ for node.js 6+.
  * Clean solution to method missing.

## Options

Changing the `__call` method

```js
class Test extends MethodMissing {

  constructor() {
    super('missing');
  }

  missing(name, args) {
    console.log(`The method '${name}' was called with:`, args);
  }

  static missing(name, args) {
    console.log(`The method '${name}' was called with:`, args);
  }

}

Test = MethodMissing.static(Test, 'missing');

const test = new Test();

test.nonExistent('hello');
test.nonExistentStatic('world');
// The method 'nonExistentStatic' was called with: { '0': 'hey' }
// The method 'nonExistent' was called with: { '0': 'hello' }
// The method 'nonExistentStatic' was called with: { '0': 'world' }
```

Modifying the arguments to be an array:

```js
class Args extends MethodMissing {

  constructor() {
    super();
  }

  __call(name, [...args]) {
    console.log(`The method '${name}' was called with:`, args);
  }

}

new Args().say('hello', 'world!');
// The method 'say' was called with: [ 'hello', 'world!' ]
```

## Tests

  From the package 

  ```bash
  $ npm test
  ```

## License

  [MIT](LICENSE)