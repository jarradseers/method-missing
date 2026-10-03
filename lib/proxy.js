/*!
 * Method Missing.
 *
 * Proxy handler.
 * @author Jarrad Seers <jarrad@seers.me>
 * @created 29/03/2017 NZDT
 */

/**
 * Properties the language looks up on any object, which must stay missing:
 * `then` is how await and promises detect a thenable, `toJSON` is called by
 * JSON.stringify.
 */

const ignored = ['then', 'toJSON'];

/**
 * Wrap a class or object so that calls to missing methods are handed to
 * the handler.
 *
 * @param {object|function} target class, instance or object to wrap
 * @param {string|function} method handler function, or the name of the
 *   handler method on the target
 * @returns {Proxy}
 */

function proxy(target, method) {

  return new Proxy(target, {
    get(obj, prop, receiver) {
      if (Reflect.has(obj, prop)) {
        return Reflect.get(obj, prop, receiver);
      }

      if (typeof prop === 'symbol' || ignored.includes(prop)) {
        return undefined;
      }

      const handler = typeof method === 'function'
        ? method
        : obj[method];

      if (typeof handler !== 'function') {
        return undefined;
      }

      return function methodMissing(...args) {
        return handler.call(this, prop, args);
      };
    },

  });
}

/**
 * Module exports.
 */

module.exports = proxy;
