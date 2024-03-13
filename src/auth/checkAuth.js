'use strict'

const { findKeyById } = require("../services/apiKey.service")

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}

const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString()
        if (!key) {
            return res.status(403).json({
                message: 'Forbidden Error'
            })
        }
        // Check api key object
        const objKey = await findKeyById(key)
        console.log({ objKey })
        if (!objKey) {
            return res.status(403).json({
                message: 'Forbidden Error'
            })
        }
        req.objKey = objKey
        return next()
    } catch (error) {
        console.log(error)
    }
}

const permission = (permisstion) => {
    return (req, res, next) => {
        if (!req.objKey.permisstion) {
            return res.status(403).json({
                message: ' Permisstion denied'
            })
        }
        const validPermisstion = req.objKey.permisstion.includes(permisstion)

        if (!validPermisstion) {
            return res.status(403).json({
                message: ' Permisstion denied'
            })
        }
        return next();
    }
}

const asyncHandler = asyncFunc => {
    return (req, res, next) => {
        asyncFunc(req, res, next).catch(next)
    }
}

module.exports = {
    apiKey,
    permission,
    asyncHandler
}