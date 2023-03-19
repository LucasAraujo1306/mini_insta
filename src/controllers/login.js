const knex = require('../connections/conexao')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Hash = process.env.PASSWORD_HASH

const login = async (req, res) => {
    const { username, senha } = req.body

    if (!username || !senha) {
        return res.status(400).json({ message: 'É obrigatório usuario e senha' });
    }

    try {
        const usuario = await knex('usuarios').where({ username }).first();

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario ou senha incorreto' });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(404).json({ message: 'Usuario ou senha incorreto' });
        }

        const dadosTokenUsuario = {
            id: usuario.id,
            username: usuario.username,
        }

        const token = jwt.sign(dadosTokenUsuario, Hash, { expiresIn: '1h' });

        const { senha: senhaUsuario, ...dadosUsuario } = usuario;

        return res.json({ token, usuario: dadosUsuario });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports = login

