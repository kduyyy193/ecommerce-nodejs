const app = require("./src/app");

const PORT = 3091

const sever = app.listen(PORT, () => {
    console.log(`Sever is started with ${PORT}`)
})

process.on('SIGINT', () => {
    sever.close(() => console.log('Exit sever'))
})