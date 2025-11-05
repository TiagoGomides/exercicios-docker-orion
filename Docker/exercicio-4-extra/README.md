# Exercício 4 — Aplicação Completa com Docker Compose
### Objetivo

Orquestrar uma **aplicação completa** utilizando `Dockerfile` e `Docker Compose`, aplicando boas práticas de containers e estrutura profissional.

A stack contém:

1. **API (backend)** — Node + Express, construída a partir de um Dockerfile multi-stage.  
2. **Banco de Dados (PostgreSQL)** — com volume persistente e healthcheck.  
3. **Interface de Administração (pgAdmin)** — para inspecionar o banco via navegador.

O objetivo é permitir que a API acesse o banco e que o usuário visualize/interaja com os dados via pgAdmin.

## Estrutura do Projeto

```bash
exercicio-4-extra/
├── .env
├── .env.example
├── .gitignore
├── docker-compose.dev.yml
├── docker-compose.prod.yml
├── api
│   ├── src
│   │   └── index.js
│   ├── db
│   │   └── init.sql
│   ├── .dockerignore
│   ├── Dockerfile
│   └── package.json
└── README.md
```

## Componentes
### API
- Imagem base leve: `node:20-alpine`.
- Rota /health → indica disponibilidade da API.
- Rota /health/db → valida conexão com o banco.
- Rotas /users (GET/POST) → lista e cria registros no `Postgres`.
- Configurações do banco recebidas via variáveis de ambiente (`.env`).

### Banco de Dados
- Imagem oficial postgres:`16-alpine`.
- Volume nomeado `pgdata_dev` para persistência.
- Script `api/db/init.sql` cria tabela users e popula dados de `seed`.
Healthcheck garante que o Postgres está “`healthy`” antes da API iniciar.

### pgAdmin
- Interface web para gerenciar o banco.
- Acesso em `http://localhost:8080`.
- Login via variáveis `PGADMIN_DEFAULT_EMAIL` e `PGADMIN_DEFAULT_PASSWORD`.
- Conexão interna via hostname db.