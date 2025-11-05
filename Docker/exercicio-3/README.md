
# Exercício 3 — Boas Práticas + Múltiplos Ambientes
### Objetivo

Aplicar boas práticas de `build` e configuração de ambientes (`dev/prod`) usando `Dockerfile multi-stage` e dois arquivos `Compose`.

O resultado final é a mesma API do exercício anterior, agora com:

**dev**: volume montado e live reload (`nodemon`).

**prod**: build otimizado, sem volumes, imagem final leve.

## Estrutura do projeto

```bash
exercicio-3/
├── .env
├── .env.example
├── .gitignore
├── docker-compose.dev.yml
├── docker-compose.prod.yml
├── api
│   ├── src
│   │   └── index.js
│   ├── .dockerignore
│   ├── Dockerfile
│   └── package.json
├── api
│   └── db
│       └── init.sql
└── README.md
```
Passo a passo
- **Dockerfile (multi-stage)**: define os estágios dev (`nodemon` + volume) e prod (`npm ci --omit=dev`, imagem leve).
- **docker-compose.dev.yml**: usa o alvo dev, monta volume local e expõe a porta `3000`.
- **docker-compose.prod.yml**: usa o alvo prod, sem volumes.
- **.env**: centraliza credenciais e configurações compartilhadas.
## Como executar

### Clonar o projeto
```bash
git clone https://github.com/TiagoGomides/exercicios-docker-orion.git
cd exercicios-docker-orion/Docker/exercicio-3
```
### Preparar variáveis de ambiente
```bash
cp .env.example .env
```
### Ambiente de desenvolvimento
```bash
docker compose -f docker-compose.dev.yml up --build
```
### Ambiente de produção
```bash
docker compose -f docker-compose.prod.yml up --build
```

## Critérios de sucesso
- Ambientes `dev/prod` funcionam de forma independente.
- Build final segue boas práticas:
    - camadas otimizadas;
    - `.dockerignore` aplicado;
    - imagem final leve (alpine, sem devDependencies).
- Estrutura organizada e reutilizável com Compose por ambiente.