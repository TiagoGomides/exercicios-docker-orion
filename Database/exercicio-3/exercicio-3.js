// Exercício 3 — NoSQL (MongoDB): CRUD básico + Schema Flexível
// Execução (local Atlas/URI ou Docker):
//   mongosh "mongodb://localhost:27017" exercicio3_nosql.js
//   mongosh "<SUA_URI_ATLAS>" --username <user> --password <pass> exercicio3_nosql.js

db = db.getSiblingDB("blog");
db.posts.drop();

db.posts.insertOne({
  titulo: "Primeiro Post",
  autor: "Gomides",
  conteudo: "Aprendendo MongoDB com o Orion Bootcamp."
});

db.posts.insertOne({
  titulo: "Segundo Post",
  autor: "Gomides",
  conteudo: "Testando schema flexível no MongoDB.",
  tags: ["nosql", "flexivel"]
});

db.posts.find().pretty()
db.posts.find({ tags: { $exists: true } }).pretty()
db.posts.find({ tags: { $exists: false } }).pretty()

db.posts.countDocuments()                       
db.posts.countDocuments({ tags: { $exists: true } })   
db.posts.countDocuments({ tags: { $exists: false } }) 