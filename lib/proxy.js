/*!
 * Method Missing.
 *
 * Main application entry.
 * @author Jarrad Seers <jarrad@seers.me>
 * @created 29/03/2017 NZDT
 */

/**
 * Module dependencies.
 */

const MethodMissingError = require('./error');

/**
 * Main proxy handler.
 *
 * @param {object} Class
 * @param {string} method
 */

function proxy(Class, method) {

  return new Proxy(Class, {
    get(obj, prop) {
      if (Reflect.has(obj, prop)) {
        return Reflect.get(obj, prop);
      } else if (typeof method === 'function') {
        return function methodMissing(...args) {
          method.call(this, prop, args);
        };
      } else if (Reflect.has(obj, method)) {
        return function methodMissing(...args) {
          obj[method].call(this, prop, args);
        };
      }
      const err = `${method}, use method '__call(method, args)' in your class to catch.`;
      throw new MethodMissingError(err);
    },

  });
}

/**
 * Module exports.
 */

module.exports = proxy;
