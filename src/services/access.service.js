'use strict'

const shopModel = require("../models/shop.model")
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const KeyTokenService = require("./keyToken.service")
const { createTokenPair } = require("../auth/authUtils")
const { getInfoData } = require("../utils")
const { BadRequestError, AuthFailureError } = require("../core/error.response")
const { findByEmail } = require("./shop.service")

const RoleShop = {
    'SHOP': '0001',
    'WRITER': '0002',
    'EDITOR': '0003',
    'ADMIN': '0000',
}

class AccessService {

    static login = async ({ email, password, refreshToken = null }) => {
        const foundShop = await findByEmail({ email })
        if (!foundShop) throw new BadRequestError('Shop not registered')

        const math = bcrypt.compare(password, foundShop.password)
        if (!math) {
            throw new AuthFailureError('Authentication error')
        }
        // Created privateKey, publicKey
        const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem'
            }
        })
        const tokens = await createTokenPair({ userId: newShop.id, email }, publicKey, privateKey)

        await KeyTokenService.createKeyToken({
            userId: newShop.id,
            refreshToken: tokens.refreshToken,
            publicKey,
            privateKey,
        })

        return {
            shop: getInfoData({ fields: ["_id", "name", "email"], object: foundShop }),
            tokens
        }
    }

    static signUp = async ({ name, email, password }) => {
        try {

            // Check email exist
            const hodelShop = await shopModel.findOne({ email }).lean()
            if (hodelShop) {
                throw new BadRequestError('Error: Shop already registered')
            }
            // Regular expressions to check for special characters, uppercase letters, and numbers
            const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
            const uppercaseRegex = /[A-Z]/;
            const numberRegex = /[0-9]/;

            // Check if password meets the criteria
            if (password.length < 8 ||
                !specialCharRegex.test(password) ||
                !uppercaseRegex.test(password) ||
                !numberRegex.test(password)) {
                return {
                    code: 'xxx',
                    message: 'Password must be at least 8 characters long and contain at least one special character, uppercase letter, and number.'
                }
            }

            const passwordHash = await bcrypt.hash(password, 10)

            const newShop = await shopModel.create({
                name,
                email,
                password: passwordHash,
                roles: [RoleShop.SHOP]
            })

            if (newShop) {
                // Created privateKey, publicKey
                const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096,
                    publicKeyEncoding: {
                        type: 'spki',
                        format: 'pem'
                    },
                    privateKeyEncoding: {
                        type: 'pkcs8',
                        format: 'pem'
                    }
                })

                const publicKeyString = await KeyTokenService.createKeyToken({
                    userId: newShop.id,
                    publicKey
                })

                if (!publicKeyString) {
                    return {
                        code: 'xxx',
                        message: "publicKeyString error"
                    }
                }

                // Created token pair
                const tokens = await createTokenPair({ userId: newShop.id, email }, publicKeyString, privateKey)

                console.log(`Created Token Success: `, tokens)

                return {
                    code: 200,
                    metadata: {
                        shop: getInfoData({ fields: ["_id", "name", "email"], object: newShop }),
                        tokens
                    }
                }
            }

            return {
                code: 200,
                metadata: null
            }

        } catch (error) {
            return {
                code: 'xxx',
                status: 'error',
                message: error.message
            }
        }
    }
}

module.exports = AccessService