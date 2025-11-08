# Exercício 3 — Banco Não Relacional (CRUD Básico)

## Objetivo
Aprender a estrutura básica de um banco **`NoSQL (MongoDB)`** e entender o conceito de **`Schema Flexível`**, onde documentos da mesma coleção podem ter estruturas diferentes.

## Ferramenta Utilizada
> **`MongoDB Atlas (nuvem gratuita)`**  
> Banco: `blog`  
> Coleção: `posts`

## Passo a Passo

###  Criar o Banco e a Coleção
No painel do Atlas:
1. Clique em **Add Data → Create Database on Atlas**  
2. Nome do banco: `blog`  
3. Nome da coleção: `posts`  
4. Clique em **Create**

![Criação do banco e da coleção](../assets/exercicio-3/Criando%20colecao.png)

### Inserir Documentos (Create)
Foram inseridos dois documentos para demonstrar o conceito de **`Schema Flexível`**.

**Primeiro documento:**
```json
{
  "titulo": "Primeiro Post",
  "autor": "Gomides",
  "conteudo": "Aprendendo MongoDB com o Orion Bootcamp."
}
```

![Inserção dos documentos na coleção posts sem tag](../assets/exercicio-3/Inserindo%20documento.png)

**Segundo documento:**

```js
{
  "titulo": "Segundo Post",
  "autor": "Gomides",
  "conteudo": "Testando schema flexível no MongoDB.",
  "tags": ["nosql", "flexivel"]
}
```

![Inserção dos documentos na coleção posts com tag](../assets/exercicio-3/Inserindo%20documento%20tags.png)

### Consultar Documentos (Read)
No campo Filter da interface ou via comando:

```js
db.posts.find().pretty()
db.posts.find({ tags: { $exists: true } }).pretty()
db.posts.find({ tags: { $exists: false } }).pretty()
db.posts.countDocuments()                       
db.posts.countDocuments({ tags: { $exists: true } })   
db.posts.countDocuments({ tags: { $exists: false } })  
```
![Filtrando os posts sem tag](../assets/exercicio-3/filtro%20sem%20tag.png)

![Filtrando os posts com tag](../assets/exercicio-3/filtro%20com%20tag.png)