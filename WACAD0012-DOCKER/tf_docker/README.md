# Aplicação de Biblioteca de Livros - Web Academy

Este repositório contém a aplicação de listagem de livros do Web Academy, que utiliza Docker para rodar a infraestrutura composta por backend (Node.js com TypeScript), frontend (React com Vite), banco de dados MySQL e uma interface de gerenciamento de banco de dados (PHPMyAdmin).

## Instruções para Execução

Para iniciar os contêineres, execute:


sudo docker-compose up -d --build

O frontend estará disponível em [http://localhost:3001](http://localhost:3001), a API do backend estará em [http://localhost:5555](http://localhost:5555), e o PHPMyAdmin estará em [http://localhost:8081](http://localhost:8081).


## Variáveis de Ambiente

As variáveis de ambiente para a aplicação estão configuradas em dois arquivos `.env`:

### Backend (`.env`):

```ini
DB_HOST=db-container
DB_USER=admin_user
DB_PASSWORD=admin_pass
DB_NAME=library_db
DATABASE_URL="mysql://root:root_secret@db-container:3306/library_db"
```

### Frontend (`.env`):

```ini
VITE_API_BASE_URL=http://backend:5555
```

## Notas Importantes

* **Persistência de Dados**: Os dados do banco de dados e os logs do backend são persistidos em volumes, garantindo que não sejam perdidos quando os contêineres forem desligados.
* **PHPMyAdmin**: O PHPMyAdmin pode ser acessado para gerenciar o banco de dados MySQL diretamente.

---

Esse formato em Markdown deve ser compatível com a maioria dos leitores de **README** e oferece uma estrutura clara e concisa. Se precisar de mais detalhes, estou à disposição!
