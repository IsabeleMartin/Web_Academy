show tables;
-- Criar o banco de dados
CREATE DATABASE IF NOT EXISTS Loja_web;


-- Selecionar o banco de dados
USE Loja_isa;

-- Criar a tabela CLIENTE
CREATE TABLE CLIENTE_SQL (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome_completo VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    celular VARCHAR(15) NOT NULL,
    email VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL
);

-- Criar a tabela ENDERECO
CREATE TABLE ENDERECO (
    id_endereco INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    rua VARCHAR(100),
    numero VARCHAR(10),
    bairro VARCHAR(50),
    cidade VARCHAR(50),
    estado VARCHAR(50),
    cep VARCHAR(10),
    FOREIGN KEY (id_cliente) REFERENCES CLIENTE(id_cliente)
);

-- Criar a tabela CATEGORIA
CREATE TABLE CATEGORIA (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);

-- Criar a tabela SUBCATEGORIA
CREATE TABLE SUBCATEGORIA (
    id_subcategoria INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    id_categoria INT,
    FOREIGN KEY (id_categoria) REFERENCES CATEGORIA(id_categoria)
);

-- Criar a tabela PRODUTO
CREATE TABLE PRODUTO (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    modelo VARCHAR(100),
    fabricante VARCHAR(50),
    preco_base DECIMAL(10, 2),
    quantidade_disponivel INT,
    id_subcategoria INT,
    FOREIGN KEY (id_subcategoria) REFERENCES SUBCATEGORIA(id_subcategoria)
);

-- Criar a tabela NUMERO_SERIE
CREATE TABLE NUMERO_SERIE (
    id_serie INT AUTO_INCREMENT PRIMARY KEY,
    numero_serie VARCHAR(50),
    id_produto INT,
    FOREIGN KEY (id_produto) REFERENCES PRODUTO(id_produto)
);

-- Criar a tabela COMPRA
CREATE TABLE COMPRA (
    id_compra INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    data_hora DATETIME NOT NULL,
    desconto_aplicado DECIMAL(5, 2),
    forma_pagamento VARCHAR(20),
    total DECIMAL(10, 2),
    id_endereco_envio INT,
    FOREIGN KEY (id_cliente) REFERENCES CLIENTE(id_cliente),
    FOREIGN KEY (id_endereco_envio) REFERENCES ENDERECO(id_endereco)
);

-- Criar a tabela ITEM_COMPRA
CREATE TABLE ITEM_COMPRA (
    id_compra INT,
    id_produto INT,
    quantidade INT,
    preco_unitario DECIMAL(10, 2),
    PRIMARY KEY (id_compra, id_produto),
    FOREIGN KEY (id_compra) REFERENCES COMPRA(id_compra),
    FOREIGN KEY (id_produto) REFERENCES PRODUTO(id_produto)
);
show databases;