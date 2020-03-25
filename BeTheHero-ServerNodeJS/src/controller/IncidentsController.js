const connection = require('../database/connection');

module.exports = {
    async listar(req, res) {

        const { page = 1 } = req.query;
        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5).offset((page - 1) * 5)
            .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);

        res.header('X-Total-Count', count['count(*)']);

        return res.json(incidents)
    },
    async cadastrar(req, res) {

        const ong_id = req.headers.authorization;
        const { title, description, value } = req.body;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return res.json({ id });
    },
    async deletar(req, res) {

        const ong_id = req.headers.authorization;
        const { id } = req.params;

        const incident = await connection('incidents').where('id', id).select('ong_id').first();

        if (incident == undefined) {
            return res.status(404).json({ error: 'Não exitem incidents com id ' + id });
        }

        if (incident.ong_id !== ong_id) {
            return res.status(401).json({ error: 'A ong logada nao tem permissao sobre esse incident' });
        }

        await connection('incidents').where('id', id).delete();

        return res.status(204).send();
    }
}