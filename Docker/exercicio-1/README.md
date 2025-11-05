# Exercício 1 — Dockerfile + Compose: “Hello Container”

## 🎯 Objetivo
Aprender a criar uma imagem customizada a partir de um **Dockerfile** e orquestrar a execução com o **Docker Compose**.

O resultado final é uma aplicação simples em **Node.js** que exibe:

> **Hello from Docker!**

---

## 📂 Estrutura do projeto

```
exercicio-1/
├── .dockerignore
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package.json
├── package-lock.json
└── server.js
```

## ⚙️ Passo a passo
- **Dockerfile:** usa imagem base leve (`node:alpine`), define o diretório, copia os arquivos, instala dependências e define o comando de execução.  
- **docker-compose.yml:** faz o build da imagem, expõe a porta `3000` e monta um volume local (edição em tempo real).  
- **server.js:** aplicação simples que retorna `"Hello from Docker!"`.  
- **package.json:** define dependências e script `start`.  
- **.dockerignore / .gitignore:** ignora arquivos desnecessários.

## Como executar

### Clonar o projeto
```bash
git clone https://github.com/TiagoGomides/exercicios-docker-orion.git
cd exercicios-docker-orion/Docker/exercicio-1
```
### Instalar dependências
```bash
npm i
```
### Build
```bash
docker compose up --build
```
[Testar no navegador][local]

[local]: http://localhost:3000

## Critérios de sucesso
- `docker compose up` sobe a aplicação corretamente.
- Acesso via navegador retorna “Hello from Docker!”.
- Estrutura segue boas práticas:
    - Imagem base leve (`node:alpine`);
    - `.dockerignore` configurado;
    - Build e execução via Docker Compose;
    - Volume opcional para edição em tempo real.