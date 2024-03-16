
class SuccessReponse {
    constructor(message, statusCode, reasonStatusCode, metadata) {
        this.message = !message ? reasonStatusCode : message
        this.status = statusCode
        this.metadata = metadata
    }

    send(res, header = {}) {
        return res.status(this.status).json(this)
    }
}

class OK extends SuccessReponse {
    constructor({ message, metadata }) {
        super({ message, metadata })
    }
}

class CREATED extends SuccessReponse {
    constructor({ message, statusCode, reasonStatusCode, metadata }) {
        super({ message, statusCode, reasonStatusCode, metadata })
    }
}

module.exports = {
    OK,
    CREATED,
    SuccessReponse
}

