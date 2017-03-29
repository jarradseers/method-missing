/*!
 * Method Missing.
 *
 * Main application file.
 * @author Jarrad Seers <jarrad@seers.me>
 * @created 29/03/2017 NZDT
 */

'use strict';

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
   * @param {any} method 
   * 
   * @memberOf MethodMissing
   */
  
  constructor(method) {
    method = method || '__call';
    return proxy(this, method);
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
    method = method || '__call';
    return proxy(that, method);
  }

}

/**
 * Module exports.
 */

module.exports = MethodMissing;