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

const atualizarPerfil = async (req, res) => {
    let { nome, imagem, username, email, site, bio, telefone, genero, senha } = req.body;
    const { id } = req.usuario;
    if (!nome && !imagem && !username && !email && !site && !bio && !telefone && !genero && !senha) {
        return res.status(400).json({ message: 'É obrigatório informar ao menos um campo para atualização' });
    }

    try {
        if (senha) {
            if (senha.length < 6) {
                return res.status(400).json({ message: 'A senha deve ter no mínimo 6 caracteres' });
            }
            senha = await bcrypt.hash(senha, 10);
        }

        if (email !== req.usuario.email) {
            const email = await knex('usuarios').where({ email }).first();

            if (email) {
                return res.status(404).json({ message: 'Email indisponível' });
            }
        }

        if (username !== req.usuario.username) {
            const username = await knex('usuarios').where({ username }).first();

            if (username) {
                return res.status(404).json({ message: 'O Username indisponível' });
            }
        }

        const usuarioAtualizado = await knex('usuarios').update({
            nome, imagem, username, email, site, bio, telefone, genero, senha
        }).where({ id });

        if (!usuarioAtualizado) {
            return res.status(400).json({ message: 'Não foi possível atualizar o perfil' });
        }

        return res.status(200).json({ message: 'Perfil atualizado com sucesso' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports = { cadastrarUsuario, obeterperfil, atualizarPerfil }