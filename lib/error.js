/*!
 * Method Missing Error.
 *
 * Main application entry.
 * @author Jarrad Seers <jarrad@seers.me>
 * @created 29/03/2017 NZDT
 */

/**
 * Method Missing Error.
 *
 * @class MethodMissingError
 * @extends {Error}
 */

class MethodMissingError extends Error {

  /**
   * Creates an instance of MethodMissingError.
   * @param {any} msg
   *
   * @memberOf MethodMissingError
   */

  constructor(msg) {
    super(msg);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

}

/**
 * Module exports.
 */

module.exports = MethodMissingError;
