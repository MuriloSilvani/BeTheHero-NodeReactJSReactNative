const connection = require('../database/connection');

module.exports = {

    async criar(req, res) {

        const { id } = req.body;
        const ong = await connection('ongs').where('id', id).select('name').first();

        if (!ong) {
            return res.status(404).json({ error: 'Não exitem ongs com id ' + id });
        }

        return res.json(ong);
    }
}