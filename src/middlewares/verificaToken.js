const knex = require('../connections/conexao')
const jwt = require('jsonwebtoken')
const Hash = process.env.PASSWORD_HASH

const verificaToken = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: 'Não autorizado' });
    }

    try {
        const token = authorization.replace('Bearer', '').trim();

        const { id } = jwt.verify(token, Hash);

        const usuarioExiste = await knex('usuarios').where({ id }).first();

        if (!usuarioExiste) {
            return res.status(401).json({ message: 'Não autorizado' });
        }

        const { senha, ...usuarioSemSenha } = usuarioExiste;

        req.usuario = usuarioSemSenha;

        next()
    } catch (error) {
        return res.status(401).json({ message: 'Não autorizado' });
    }
}

module.exports = verificaToken