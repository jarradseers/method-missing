/*!
 * Method Missing.
 *
 * Main application file.
 * @author Jarrad Seers <jarrad@seers.me>
 * @created 29/03/2017 NZDT
 */

/**
 * Module dependencies.
 */

const proxy = require('./proxy');

/**
 * MethodMissing Class
 *
 * @class MethodMissing
 */

class MethodMissing {

  /**
   * Creates an instance of MethodMissing.
   * @param {string} method name of the handler method, defaults to __call
   *
   * @memberOf MethodMissing
   */

  constructor(method) {
    return proxy(this, method || '__call');
  }

  /**
   * Static method handler.
   *
   * @static
   * @param {any} that
   * @param {any} method
   * @returns
   *
   * @memberOf MethodMissing
   */

  static static(that, method) {
    return proxy(that, method || '__call');
  }

}

/**
 * Module exports.
 */

module.exports = MethodMissing;
