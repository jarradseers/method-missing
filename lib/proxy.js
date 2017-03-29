/*!
 * Method Missing.
 *
 * Main application entry.
 * @author Jarrad Seers <jarrad@seers.me>
 * @created 29/03/2017 NZDT
 */

'use strict';

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
      }
    }
  });
}

/**
 * Module exports.
 */

module.exports = proxy;
