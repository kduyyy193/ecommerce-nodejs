'use strict'

const JWT = require('jsonwebtoken')

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        // accessToken
        const accessToken = await JWT.sign(payload, privateKey, {
            expiresIn: "2 days"
        })

        // refreshToken
        const refreshToken = await JWT.sign(payload, privateKey, {
            expiresIn: "7 days"
        })

        const accessTokenVerify = new Promise((resolve, reject) => {
            JWT.verify(accessToken, publicKey, (err, decoded) => {
                if (err) reject(err);
                else resolve(decoded);
            });
        });

        // Verify the access token
        const decodedAccessToken = await accessTokenVerify;

        console.log('Decoded access token:', decodedAccessToken);

        return { accessToken, refreshToken };
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createTokenPair
}
