/*!
 * Method Missing.
 *
 * Main test file.
 * @author Jarrad Seers <jarrad@seers.me>
 * @created 29/03/2017 NZDT
 */

const MethodMissing = require('../');

class Simple extends MethodMissing {
  iExist(str) {
    console.log(`I do exist ${str}.`);
    return this;
  }
  __call(name, args) {
    console.log(`The method '${name}' was called with:`, args);
    return this;
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

class Test extends MethodMissing {
  constructor() {
    super('missing');
  }
  missing(name, args) {
    console.log(`The method '${name}' was called with:`, args);
    return this;
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

class RealSimple extends MethodMissing {
  __call(name, [...args]) {
    console.log(`The method '${name}' was called with:`, args);
    return this;
  }
}

new RealSimple().nonExistent('Hello!');
// The method 'nonExistent' was called with: { '0': 'Hello!' }

class Args extends MethodMissing {
  __call(name, [...args]) {
    console.log(`The method '${name}' was called with:`, args);
    return this;
  }
}

new Args().say('hello', 'world!');
// The method 'say' was called with: [ 'hello', 'world!' ]

const object = MethodMissing.static({
  one () {
    console.log('hey there');
  },
}, (name) => {
  console.log(`Sorry, method '${name}' doesn't exist.`);
});

object.one();
object.two();
