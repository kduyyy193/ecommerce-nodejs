const express = require('express')
const app = express()

const morgan = require('morgan')
const { default: helmet } = require('helmet')
const compression = require('compression')


// init middlewares
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())

// init database 

// init route
app.get('/', (req, res) => {
    return res.status(200).json({
        message: "Hello world!",
    })
})

// handling error

module.exports = app