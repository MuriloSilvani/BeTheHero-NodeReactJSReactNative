const { Router } = require('express');

const routes = Router();

routes.get('/', (req, res) => {
    return res.json({ teste: true })
});

module.exports = routes;