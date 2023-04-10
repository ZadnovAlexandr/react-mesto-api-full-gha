const { ERROR_BAD_REQUEST } = require('./errors');

class ErrorBadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_BAD_REQUEST;
  }
}

module.exports = ErrorBadRequest;
