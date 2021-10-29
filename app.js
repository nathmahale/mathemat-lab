var app = require('express')();

var router = require('./lib/routers/calcRouter');
app.use("/calculator", router);
app.listen(3000);
exports.app = app;

