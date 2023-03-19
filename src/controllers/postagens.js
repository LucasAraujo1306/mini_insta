const knex = require('../connections/conexao');

const cadastrarPostagem = async (req, res) => {
    const { id } = req.usuario;
    const { texto, fotos } = req.body;

    if (!fotos || fotos.length === 0) {
        return res.status(400).json({ message: "É obrigatório informar ao menos uma foto" });
    }

    try {
        const postagem = await knex('postagens').insert({ texto, usuario_id: id }).returning('*');

        if (!postagem) {
            return res.status(400).json({ message: "Não foi possível cadastrar a postagem" });
        }

        for (const foto of fotos) {
            foto.postagem_id = postagem[0].id;
        }

        const fotosCadastradas = await knex('postagem_fotos').insert(fotos);

        if (!fotosCadastradas) {
            await knex('postagens').where({ id: postagem[0].id }).del();
            return res.status(400).json({ message: "Não foi possível cadastrar a postagem" });
        }

        return res.status(200).json({ message: "Postagem cadastrada com sucesso" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const curtir = async (req, res) => {
    const { id } = req.usuario;
    const { postagemId } = req.params;

    try {
        const postagem = await knex('postagens').where({ id: postagemId }).first();

        if (!postagem) {
            return res.status(404).json({ message: "Postagem não encontrada" });
        }

        const curtida = await knex('postagem_curtidas').where({ postagem_id: postagem.id, usuario_id: id }).first();

        if (curtida) {
            return res.status(400).json({ message: "Postagem já curtida" });
        }

        const curtidaCadastrada = await knex('postagem_curtidas').insert({ postagem_id: postagemId, usuario_id: id });

        if (!curtidaCadastrada) {
            return res.status(400).json({ message: "Não foi possível curtir a postagem" });
        }

        return res.status(200).json({ message: "Postagem curtida com sucesso" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const comentar = async (req, res) => {
    const { id } = req.usuario;
    const { postagemId } = req.params;
    const { texto } = req.body;

    if (!texto) {
        return res.status(400).json({ message: "É obrigatório informar o texto para comentar" });
    }

    try {
        const postagem = await knex('postagens').where({ id: postagemId }).first();

        if (!postagem) {
            return res.status(404).json({ message: "Postagem não encontrada" });
        }

        const comentario = await knex('postagem_comentarios').insert({ texto, postagem_id: postagem.id, usuario_id: id });

        if (!comentario) {
            return res.status(400).json({ message: "Não foi possível comentar a postagem" });
        }

        return res.status(200).json({ message: "Postagem comentada com sucesso" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }

}

const feed = async (req, res) => {
    const { id } = req.usuario;
    const { offset } = req.query;

    const pagina = offset ? offset : 0;

    try {
        const postagens = await knex('postagens')
            .where('usuario_id', '!==', id)
            .limit(10)
            .offset(pagina)
            .orderBy('data_criacao', 'desc');

        if (postagens.length === 0) {
            return res.status(200).json(postagens);
        }

        for (const postagem of postagens) {
            //usuario
            const usuario = await knex('usuarios')
                .where({ id: postagem.usuario_id })
                .select('imagem', 'username', 'verificado')
                .first();
            postagem.usuario = usuario;

            //fotos
            const fotos = await knex('postagem_fotos')
                .where({ postagem_id: postagem.id })
                .select('imagem');
            postagem.fotos = fotos;

            //curtidas
            const curtida = await knex('postagem_curtidas')
                .where({ postagem_id: postagem.id })
                .select('usuario_id');
            postagem.curtida = curtida.length;

            //curtido por mim
            postagem.curtidoPorMin = curtida.find(c => c.usuario_id === id) ? true : false;

            //comentarios
            const comentarios = await knex('postagem_comentarios')
                .leftJoin('usuarios', 'postagem_comentarios.usuario_id', 'usuarios.id')
                .where({ postagem_id: postagem.id })
                .select('usuarios.username', 'postagem_comentarios.texto');
            postagem.comentarios = comentarios;
        }
        return res.json(postagens)
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }

}

module.exports = { cadastrarPostagem, curtir, comentar, feed }