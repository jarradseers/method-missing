/*!
 * Method Missing Error.
 *
 * Main application entry.
 * @author Jarrad Seers <jarrad@seers.me>
 * @created 29/03/2017 NZDT
 */

'use strict';

/**
 * Method Missing Error.
 * 
 * @class MethodMissingError
 * @extends {Error}
 */

class MethodMissingError extends Error {
  constructor(msg) {
    super(msg);
    this.name = 'MethodMissing';
  }
}

/**
 * Module exports.
 */

module.exports = MethodMissingError;
