# Exercício 2 — Compose com API + Banco de Dados

## Objetivo
Aprender a conectar múltiplos containers (**API + Banco de Dados**) usando **Docker Compose** e variáveis de ambiente externas (`.env`).

O resultado final é uma stack com uma **API Node.js** conectada a um **PostgreSQL** persistente.

---

## Estrutura do projeto

```
exercicio-2/
├── .env
├── .env.example
├── .gitignore
├── docker-compose.yml
├── api
│   ├── src
│   │    └──index.js
│   ├── .dockerignore
│   ├── Dockerfile
│   └── package.json
├── api
│   └── db
│       └── init.sql
└── README.md
```
## ⚙️ Passo a passo
- **Dockerfile:** usa imagem base leve (`node:alpine`), copia os arquivos, instala dependências e define o comando de execução.  
- **docker-compose.yml:** cria os serviços `api` e `db`, expõe a porta `3000` e usa variáveis do `.env`.  
- **index.js:** aplicação Express que se conecta ao banco, cria tabela e manipula dados.  
- **init.sql:** inicializa o banco criando a tabela `items`.  
- **.env:** armazena credenciais sensíveis e configurações.  
- **Volumes:** garantem persistência dos dados mesmo após `docker compose down`.

## Como executar

### Clonar o projeto
```bash
git clone https://github.com/TiagoGomides/exercicios-docker-orion.git
cd exercicios-docker-orion/Docker/exercicio-2
```
### Instalar dependências
```bash
npm i
```

### Subir os containers
```bash
docker compose up --build
```
[Testar no navegador][local]

[local]: http://localhost:3000/items

## Critérios de sucesso
- `docker compose up` cria rede interna e conecta os serviços `api` e `db`.
- A API consegue se conectar e gravar dados no banco.
- O volume `db_data` persiste os dados mesmo após `docker compose down`.
- Estrutura segue boas práticas:
    - Imagem base leve (`node:alpine`, `postgres:alpine`);
    - `.env` externo com variáveis sensíveis;
    - `depends_on` para garantir ordem de inicialização;
    - Volume configurado para persistência.