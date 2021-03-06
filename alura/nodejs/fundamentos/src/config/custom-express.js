require('marko/node-require').install();
require('marko/express');

const express = require('express');

const app = express();

app.use('/estatico', express.static('src/app/public'));

app.use(express.urlencoded({
    extended: true
}));

const rotas = require('../app/rotas/rotas');
rotas(app);

module.exports = app;