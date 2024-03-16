'use strict'

const AccessService = require("../services/access.service")

const { OK, CREATED, SuccessReponse } = require('../core/success.response')

class AccessController {
    login = async (req, res, next) => {
        new SuccessReponse({
            metadata: await AccessService.login(req?.body)
        }).send(res)
    }

    signUp = async (req, res, next) => {
        new CREATED({
            message: 'Regiserted Ok!',
            metadata: await AccessService.signUp(req?.body)
        }).send(res)
    }
}

module.exports = new AccessController()