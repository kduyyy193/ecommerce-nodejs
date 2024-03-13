
'use strict'
const ReasonPhrases = require('./reasonPhrases')
const StatusCode = require('./statusCode')

class ErrorResponse extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(message = ReasonPhrases.CONFLICT, statusCode = StatusCode.CONFLICT) {
        super(message, statusCode)
    }
}


class BadRequestError extends ErrorResponse {
    constructor(message = ReasonPhrases.BAD_REQUEST, statusCode = StatusCode.BAD_REQUEST) {
        super(message, statusCode)
    }
}

module.exports = {
    ConflictRequestError,
    BadRequestError
}