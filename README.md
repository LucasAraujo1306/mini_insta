# mini_insta

## Endpoints

### POST -LOGIN

#### Dados enviados

- username
- senha

#### Objetivos gerais

- Validar username e a senha
- Buscar o usuario no banco de dados
- Verificar se a senha informada está correta
- Gerar o token de autenticação
- Retornar os dados do usuario e o token

##### Dados retornados

- sucesso / erro
- token

---

### POST - Cadastro

#### Dados enviados

- username
- senha

#### Objetivos gerais

- Validar username e a senha
- Verificar se o username e email já existe no banco de dados
- Criptografar a senha
- Cadastrar o usuario no banco de dados

##### Dados retornado

- sucesso / erro

---

### GET - Perfil

#### Dados enviados

- token (que terá id ou username)

#### Objetivos gerais

- Validar o token do usuario
- Busca o cadastro do usuario com a informação do token
- Retorna os dados

##### Dados retornados

- URL da foto
- Nome
- Username
- Site
- Bio
- Email
- Telefone
- Genero

---

### PUT - Perfil

#### Dados enviados

- token (que terá id ou username)
- URL da foto
- Nome
- Username
- Site
- Bio
- Email
- Telefone
- Genero

#### Objetivos gerais

- Validar o token do usuario
- Busca o cadastro do usuario com a informação do token
- Exigir, ao menos, um campo para atualizar
- Criptografar a senha se for informada
- Verificar se o email e username já existe no banco de dados se for informado
- Atualizar o registro do usuario no banco de dados
- Retornar suceso ou erro

##### Dados retornados

- Sucesso ou erro

---

### GET - Postagens

#### Dados enviados

- token
- offset

#### Objetivos gerais

- Validar o token do usuario
- Busca o cadastro do usuario com a informação do token
- Retornar postagens de outras pessoas

##### Dados retornados

- Postagens []
  - id
  - foi curtido por mim
  - Usuario
    - URL da foto
    - username
    - é perfil oficial
  - Fotos []
  - quatidade de curtidas
  - Comentários []
    - username
    - texto
  - Data

---

### POST - Postagens

#### Dados enviados

- token
- texto
- array com fotos

#### Objetivos gerais

- Validar o token do usuario
- Busca o cadastro do usuario com a informação do token
- Exigir que seja informado ao menos uma foto no array
- Cadastrar postagem para o usuario logado
- Cadastro das fotos da postagem

##### Dados retornados

- sucesso ou erro

---

### POST - Curtir

#### Dados enviados

- token (contem username ou id do usuario)
- id da postagem

#### Objetivos gerais

- Validar o token do usuario
- Busca o cadastro do usuario com a informação do token
- Busca o cadastro da postagem com o id informado
- Verificar se o usuario já curtiu a postagem
- Cadastrar curtida da postagem no banco de dados

##### Dados retornados

- sucesso ou erro

---

### POST - Comentar

#### Dados enviados

- token (contem username ou id do usuario)
- id da postagem
- texto

#### Objetivos gerais

- Validar o token do usuario
- Busca o cadastro do usuario com a informação do token
- Validar texto
- Buscar a postagem pelo id informado
- Cadastrar comentario da postagem

##### Dados retornados

- sucesso ou erro
