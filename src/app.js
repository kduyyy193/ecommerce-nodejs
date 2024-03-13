const express = require('express')
const app = express()

const morgan = require('morgan')
const { default: helmet } = require('helmet')
const compression = require('compression')

require('dotenv').config();

// init middlewares
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// init database 
require('./dbs/init.mongdb')

// init route
app.use('/', require("./routers"))

// handling error
app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    const statusCode = error.status || 500
    error.status = 404
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        messsage: error.message || "Internal sever error"
    })
})

module.exports = app