const { Router } = require('express');

const OngsController = require('./controller/OngsController');
const IncidentsController = require('./controller/IncidentsController');
const ProfileController = require('./controller/ProfileController');
const SessionController = require('./controller/SessionController');

const routes = Router();

routes.get('/ongs', OngsController.listar);
routes.post('/ongs', OngsController.cadastrar);

routes.get('/incidents', IncidentsController.listar);
routes.post('/incidents', IncidentsController.cadastrar);
routes.delete('/incidents/:id', IncidentsController.deletar);

routes.get('/profile', ProfileController.lista);

routes.post('/session', SessionController.criar);

module.exports = routes;