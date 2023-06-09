const { Router } = require('express');
const usuarios = require('../controllers/usuarios');
const login = require('../controllers/login');
const postagens = require('../controllers/postagens');
const verificaToken = require('../middlewares/verificaToken');

const rotas = Router();

//cadastrar usuario
rotas.post('/cadastro', usuarios.cadastrarUsuario);

//login
rotas.post('/login', login);

//filtro para verificar token do usuario logado
rotas.use(verificaToken);

//obter e atualizar perfil
rotas.get('/perfil', usuarios.obeterperfil);
rotas.put('/perfil', usuarios.atualizarPerfil);

//postagens 
rotas.post('/postagens', postagens.cadastrarPostagem);
rotas.get('/postagens', postagens.feed);
rotas.post('/postagens/:postagemId/curtir', postagens.curtir);
rotas.post('/postagens/:postagemId/comentar', postagens.comentar);



module.exports = rotas;





