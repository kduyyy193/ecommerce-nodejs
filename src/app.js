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

module.exports = app