const express = require('express');
const consign = require('consign');

module.exports = () => {
    const app = express();

    app.use(express.urlencoded({
        extended: true
    }));

    app.use(express.json());

    consign()
        .include('controllers')
        .into(app);

    app.listen(
        3000,
        () => console.log('Servidor rodando na porta 3000!')
    )

    return app;
}