const knex = require('../connections/conexao')
const bcrypt = require('bcrypt')

const cadastrarUsuario = async (req, res) => {
    const { username, senha } = req.body

    if (!username || !senha) {
        return res.status(400).json({ message: 'É obrigatório usuario e senha' });
    }

    if (senha.length < 6) {
        return res.status(400).json({ message: 'A senha deve ter no mínimo 6 caracteres' });
    }

    try {
        const usuarioExiste = await knex('usuarios').where({ username }).first();

        if (!usuarioExiste) {
            return res.status(401).json({ message: 'Não autorizado' });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const novoUsuario = await knex('usuarios').insert({
            username,
            senha: senhaCriptografada
        });

        if (!novoUsuario) {
            return res.status(400).json({ message: 'Não foi possível cadastrar o usuario' });
        }

        return res.status(201).json({ message: 'Usuario cadastrado com sucesso' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }

}

const obeterperfil = async (req, res) => {
    return res.json({ usuario: req.usuario });
}

module.exports = { cadastrarUsuario, obeterperfil }