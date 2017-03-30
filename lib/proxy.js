/*!
 * Method Missing.
 *
 * Main application entry.
 * @author Jarrad Seers <jarrad@seers.me>
 * @created 29/03/2017 NZDT
 */

'use strict';

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
    get: function (obj, prop) {
      if (Reflect.has(obj, prop)) {
        return Reflect.get(obj, prop);
      } else if (typeof method === 'function') {
        return function() {
          method.call(this, prop, arguments);
        }
      } else if (Reflect.has(obj, method)) {
        return function() {
          obj[method].call(this, prop, arguments);
        }
      } else {
        throw new MethodMissingError(
          `${method}, use method '__call(method, args)' in your class to catch.`
        );
      }
    }
  });
}

/**
 * Module exports.
 */

module.exports = proxy;
