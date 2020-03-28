const connection = require('../database/connection');

module.exports = {
    async listar(req, res) {

        const { incident_id, hero_id } = req.params;


        const messages = await connection('messages')
            .where('incident_id', incident_id)
            .where('hero_id', hero_id)
            .orderBy('date', 'desc')
            .select('*');


        return res.json(messages);
    },
    async cadastrar(req, res) {
        const { message, date, incident_id, from } = req.body;

        const newMessageId = await connection('messages').insert({
            message,
            date,
            from,
            incident_id,
            hero_id: 1
        });

        const newMessage = await connection('messages')
            .where('id', newMessageId[0])
            .select('*').first();

        return res.json(newMessage);
    },
    async listarConversas(req, res) {

        const { ong_id } = req.params;

        const response = await connection('messages')
            .join('incidents', 'incidents.id', '=', 'messages.incident_id')
            .where('incidents.ong_id', ong_id)
            .groupBy('messages.hero_id')
            .groupBy('messages.incident_id')
            .select('messages.hero_id', 'messages.incident_id', 'incidents.title');

        return res.json(response);

    }
}