/*!
 * Method Missing.
 *
 * Test entry.
 * @author Jarrad Seers <jarrad@seers.me>
 * @created 29/03/2017 NZDT
 */

/**
 * Module dependencies.
 */

const { test } = require('node:test');
const assert = require('node:assert/strict');
const util = require('node:util');
const MethodMissing = require('../');

class Simple extends MethodMissing {
  constructor() {
    super();
    this.value = 1;
  }
  iExist(str) {
    return `I do exist ${str}.`;
  }
  get double() {
    return this.value * 2;
  }
  __call(name, args) {
    return { name, args, self: this };
  }
  static __call(name, args) {
    return { name, args, static: true };
  }
}

test('hands a missing method to __call with its name and arguments', () => {
  const simple = new Simple();
  const res = simple.nonExistent('hello', 'world');

  assert.equal(res.name, 'nonExistent');
  assert.deepEqual(res.args, ['hello', 'world']);
});

test('returns the value __call returns', () => {
  class Maths extends MethodMissing {
    __call(name, [a, b]) {
      return name === 'add' ? a + b : undefined;
    }
  }

  assert.equal(new Maths().add(2, 3), 5);
});

test('calls __call with the instance as this, so calls can be chained', () => {
  const simple = new Simple();

  assert.equal(simple.nonExistent().self, simple);
});

test('leaves existing methods, properties and getters alone', () => {
  const simple = new Simple();

  assert.equal(simple.iExist('world'), 'I do exist world.');
  assert.equal(simple.value, 1);
  assert.equal(simple.double, 2);

  simple.value = 5;
  assert.equal(simple.double, 10);
});

test('instances are still instances of their classes', () => {
  const simple = new Simple();

  assert.ok(simple instanceof Simple);
  assert.ok(simple instanceof MethodMissing);
});

test('static() handles missing static methods', () => {
  const Wrapped = MethodMissing.static(Simple);
  const res = Wrapped.nonExistentStatic(1, 2, 3);

  assert.deepEqual(res, { name: 'nonExistentStatic', args: [1, 2, 3], static: true });
  assert.equal(new Wrapped().nonExistent('hey').name, 'nonExistent');
});

test('the handler method can be renamed', () => {
  class Renamed extends MethodMissing {
    constructor() {
      super('missing');
    }
    missing(name, args) {
      return `${name}:${args.join()}`;
    }
    static missing(name) {
      return `static ${name}`;
    }
  }

  const Wrapped = MethodMissing.static(Renamed, 'missing');

  assert.equal(new Wrapped().nonExistent('a', 'b'), 'nonExistent:a,b');
  assert.equal(Wrapped.nonExistentStatic(), 'static nonExistentStatic');
});

test('static() wraps a plain object with a handler function', () => {
  const object = MethodMissing.static({
    one() {
      return 'hey there';
    }
  }, (name, args) => `Sorry, method '${name}' doesn't exist. ${args.length}`);

  assert.equal(object.one(), 'hey there');
  assert.equal(object.two('a'), "Sorry, method 'two' doesn't exist. 1");
});

test('without a handler, missing properties are undefined as usual', () => {
  class Plain extends MethodMissing {}
  const plain = new Plain();

  assert.equal(plain.nothing, undefined);
  assert.throws(() => plain.nothing(), TypeError);
});

test('an instance can be awaited and returned from an async function', async () => {
  const simple = new Simple();

  assert.equal(await simple, simple);
  assert.equal(await (async () => simple)(), simple);
  assert.equal(await Promise.resolve(simple), simple);
});

test('an instance can be serialised and inspected', () => {
  const simple = new Simple();

  assert.equal(JSON.stringify(simple), '{"value":1}');
  assert.equal(JSON.stringify({ simple }), '{"simple":{"value":1}}');
  assert.match(util.inspect(simple), /value: 1/);
  assert.equal(`${simple}`, '[object Object]');
});

test('symbol lookups are not handed to __call', () => {
  const names = [];

  class Spy extends MethodMissing {
    __call(name) {
      names.push(name);
    }
  }

  const spy = new Spy();

  assert.equal(spy[Symbol.iterator], undefined);
  assert.equal(spy[Symbol('custom')], undefined);
  assert.deepEqual(Object.keys(spy), []);
  assert.deepEqual(names, []);
});

test('a class can define then or toJSON itself', () => {
  class Custom extends MethodMissing {
    toJSON() {
      return { custom: true };
    }
    __call() {}
  }

  assert.equal(JSON.stringify(new Custom()), '{"custom":true}');
});
