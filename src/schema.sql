create database mini_insta

drop table if exists postagem_curtidas

drop table if exists postagem_comentarios

drop table if exists postagem_fotos

drop table if exists postagens

drop table if exists usuarios


create table usuarios(
id serial primary key,
  nome varchar(255),
  imagem text,
  username varchar(70) not null unique,
  email varchar(320) unique,
  site text,
  bio varchar(200),
  telefone varchar(20),
  genero varchar(20),
  senha varchar(50) not null,
  verificado boolean default false
);
CREATE INDEX idx_username ON usuarios (username)

CREATE INDEX idx_email ON usuarios (email)

create table postagens(
id serial primary key,
  usuario_id int not null,
  data timestamptz default now(),
  texto varchar(2200),
  foreign key (usuario_id) references usuarios (id) 
);

create table postagem_fotos(
id serial primary key,
  postagem_id int not null,
  imagem text not null,
  foreign key (postagem_id) references postagens (id) 
);

create table postagem_comentarios(
id serial primary key,
  texto varchar(2200) not null,
  data timestamptz default now(),
  usuario_id int not null,
  postagem_id int not null,
  foreign key (postagem_id) references postagens (id),
  foreign key (usuario_id) references usuarios (id) 
);

create table postagem_curtidas(
	usuario_id int not null,
  postagem_id int not null,
  data timestamptz default now(),
  foreign key (postagem_id) references postagens (id),
  foreign key (usuario_id) references usuarios (id) 
);