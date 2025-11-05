# Exercícios Docker Orion
## Objetivo Geral
Este repositório reúne exercícios práticos de Docker e Docker Compose, com foco em boas práticas, isolamento de ambientes e orquestração de containers.
Cada exercício aborda um estágio da evolução do uso de `Docker` desde o primeiro `Dockerfile` até a construção de uma stack completa com API, banco de dados e interface administrativa.

O objetivo é consolidar o aprendizado sobre:
- Criação e otimização de imagens;
- Configuração de múltiplos serviços com Docker Compose;
- Uso de variáveis de ambiente e volumes;
- Diferenciação entre ambientes de desenvolvimento e de produção;

## Estrutura do Repositório
```bash
exercicios-docker-orion/
└── Docker/
    ├── exercicio-1/
    ├── exercicio-2/
    ├── exercicio-3/
    └── exercicio-4-extra/
```
Cada pasta contém:
- `Dockerfile` e arquivos `Compose` configurados para o cenário proposto;
- Código-fonte (Node.js e SQL);
- Arquivo README.md explicativo com instruções passo a passo.

# Exercícios
## Exercício 1 — Dockerfile + Compose: “Hello Container”

**Tema**: primeiros passos com Docker.
- Criação de uma imagem personalizada e orquestração via Compose.
- Introduz os conceitos básicos de containerização.
- Exibe “Hello from Docker!” no navegador.
- Foco em `Dockerfile`, `docker-compose.yml` e `.dockerignore`.

## Exercício 2 — Compose com API + Banco de Dados
**Tema**: comunicação entre múltiplos containers.
 - API `Node.js` conectada a um banco `PostgreSQL`.
- Uso de variáveis de ambiente (`.env`) e volumes persistentes.
- Demonstra o uso de `depends_on`, redes internas e persistência de dados.

## Exercício 3 — Boas Práticas + Múltiplos Ambientes
**Tema**: ambientes separados para desenvolvimento e produção.
- `Dockerfile` `multi-stage` (dev + prod).
- `docker-compose.dev.yml` com nodemon e volume local.
- `docker-compose.prod.yml` otimizado para `build` final leve.
- Demonstra como manter `builds` reprodutíveis e organizados.

## Exercício 4 — Aplicação Completa com Docker Compose
**Tema**: orquestração profissional com múltiplos serviços.
- API `Node.js` + `PostgreSQL` + `pgAdmin`.
- `Healthcheck` entre containers e inicialização com `init.sql`.
- Interface web administrativa (`pgAdmin`) para inspecionar o banco.
- Demonstra stack real com backend, banco e interface de gerenciamento.

## Conceitos Abordados
- Criação de imagens customizadas com Dockerfile;
- Uso de `multi-stage` `builds` para reduzir tamanho de imagem;
- Configuração e comunicação entre múltiplos containers;
- Gerenciamento de volumes e variáveis de ambiente;
- Separação de ambientes dev/prod com `Compose`;
- Implementação de healthchecks e dependências de serviço;
- Orquestração completa de aplicações com `Docker Compose`.

# Clonar o repositório
```bash
git clone https://github.com/TiagoGomides/exercicios-docker-orion.git
cd exercicios-docker-orion/Docker
```


# Recursos Úteis
- [Documentação oficial do Docker](https://docs.docker.com/)
- [Referência do Dockerfile](https://docs.docker.com/engine/reference/builder/)
- [Documentação do Docker Compose](https://docs.docker.com/compose/)
- [Imagem Node.js oficial no Docker Hub](https://hub.docker.com/_/node)
- [Imagem PostgreSQL oficial no Docker Hub](https://hub.docker.com/_/postgres)