const app = require('express')()

const router = require('./lib/routers/calcRouter')
app.use('/calculator', router)
app.listen(3000)
exports.app = app
