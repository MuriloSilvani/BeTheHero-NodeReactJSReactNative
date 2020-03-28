const { Router } = require('express');

const { celebrate, Segments, Joi } = require('celebrate');

const OngsController = require('./controller/OngsController');
const IncidentsController = require('./controller/IncidentsController');
const ProfileController = require('./controller/ProfileController');
const SessionController = require('./controller/SessionController');
const MessagesController = require('./controller/MessagesController');

const routes = Router();

routes.get('/messages/:incident_id/:hero_id', MessagesController.listar);
routes.post('/messages', MessagesController.cadastrar);
routes.get('/conversations/:ong_id', MessagesController.listarConversas);


routes.get('/ongs', OngsController.listar);

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngsController.cadastrar);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentsController.listar);

routes.post('/incidents', IncidentsController.cadastrar);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentsController.deletar);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), ProfileController.lista);

routes.post('/session', SessionController.criar);

module.exports = routes;