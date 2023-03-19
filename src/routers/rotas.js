const { Router } = require('express');
const usuarios = require('../controllers/usuarios');
const login = require('../controllers/login');
const verificaToken = require('../middlewares/verificaToken');

const rotas = Router();

rotas.get('/', (req, res) => {
    res.json({ message: 'API is running' });
})
//cadastrar usuario
//rotas.post('/usuarios', usuarios.cadastrarUsuario);

//login
//rotas.post('/login', login.login);

//filtro para verificar token do usuario logado
rotas.use(verificaToken);

//obter e atualizar perfil
//rotas.get('/perfil', usuarios.obeterperfil);
//rotas.put('/perfil', usuarios.atualizarPerfil);

//postagens 



module.exports = rotas;





