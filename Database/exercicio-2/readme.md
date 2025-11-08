# Exercício 2 — Banco Relacional (JOINs e Filtros)

### Objetivo
Aprender a consultar dados de múltiplas tabelas usando **`JOIN`** e a filtrar resultados com **`WHERE`**.

## Descrição
Usando o esquema e os dados criados no `Exercício 1`, este desafio tem como objetivo praticar consultas relacionais e manipulação de dados.  
As operações envolverão as tabelas `alunos` e `cursos`, já existentes no banco.

**Tarefas principais:**
1. Criar uma consulta com `INNER JOIN` mostrando o **nome do aluno** e o **nome do curso** em uma única linha.  
2. Criar uma consulta com `WHERE` e `JOIN` para exibir apenas os alunos de um curso específico (ex.: `"Desenvolvimento Web"`).  
3. Executar um `UPDATE` para mover um aluno para outro curso (ex.: mover `"Maria"` para `"Ciência de Dados"`).  
4. (Extra) Escrever um `SELECT` com `LEFT JOIN` e `WHERE` para descobrir cursos **sem alunos matriculados**.

##  Estrutura Utilizada
As tabelas e dados são os mesmos do **Exercício 1**:

### `cursos`
| Campo | Tipo | Descrição |
|--------|------|------------|
| id | INTEGER PK | Identificador do curso |
| nome_curso | VARCHAR(120) | Nome do curso |

### `alunos`
| Campo | Tipo | Descrição |
|--------|------|------------|
| id | INTEGER PK | Identificador do aluno |
| nome | VARCHAR(120) | Nome completo |
| email | VARCHAR(150) | E-mail único |
| curso_id | INTEGER FK | Referência ao curso |

## Consulta com INNER JOIN
Mostra o nome do aluno e o nome do curso em uma única linha.

```sql
SELECT
  a.id,
  a.nome       AS aluno,
  c.nome_curso AS curso
FROM alunos a
INNER JOIN cursos c ON c.id = a.curso_id
ORDER BY a.nome;
```

![Consulta com INNER JOIN](../assets/exercicio-2/Inner%20join.png)

## Consulta com JOIN + WHERE
Filtra apenas os alunos matriculados no curso "Data Analytics".
```sql
SELECT
  a.id,
  a.nome       AS aluno,
  c.nome_curso AS curso
FROM alunos a
JOIN cursos c ON c.id = a.curso_id
WHERE c.nome_curso = 'Data Analytics'
ORDER BY a.nome;
```
![Consulta com JOIN + WHERE](../assets/exercicio-2/Filtrar%20por%20Data%20Analytics.png)

## Atualizando o Curso de um Aluno

```sql
BEGIN;
UPDATE alunos a
SET curso_id = (
  SELECT c.id FROM cursos c WHERE c.nome_curso = 'Cloud & Containers'
)
WHERE a.nome = 'Tiago Gomides'
  AND EXISTS (SELECT 1 FROM cursos WHERE nome_curso = 'Cloud & Containers');

SELECT a.id, a.nome AS aluno, c.nome_curso AS curso
FROM alunos a
JOIN cursos c ON c.id = a.curso_id
WHERE a.nome = 'Tiago Gomides';

COMMIT;
```
![Consulta com JOIN + WHERE](../assets/exercicio-2/mover%20Tiago%20Gomides%20para%20Cloud%20&%20Containers.png)

## Extra
Descobrir quais cursos não possuem alunos matriculados usando `LEFT` `JOIN` e `WHERE`.
```sql
SELECT
  c.id,
  c.nome_curso
FROM cursos c
LEFT JOIN alunos a ON a.curso_id = c.id
WHERE a.id IS NULL
ORDER BY c.nome_curso;
```
![Consulta com JOIN + WHERE](../assets/exercicio-2/Cursos%20sem%20nenhum%20aluno%20matriculado.png)

- Mostramos que todos os cusos estao com alunos matriculados 

## Critérios de sucesso:
- A consulta `JOIN` retorna os nomes corretos (ex: "João Silva", "Desenvolvimento
Web").
- A consulta com `WHERE` filtra corretamente os alunos.
- O `UPDATE` é bem sucedido e um novo `SELECT` com `JOIN` reflete a mudança.

## Resultado Final Esperado
| id | nome          | email                          | nome_curso          |
|----|---------------|-------------------------------|---------------------|
| 1  | Aline Duarte  | [aline.duarte@gmail.com](mailto:aline.duarte@gmail.com)  | Frontend Essentials |
| 3  | Clara Nogueira| [clara_1nogueira@hotmail.com](mailto:clara_1nogueira@hotmail.com) | Cloud & Containers |
| 4  | Diego Moreira | [diego.moreira1@gmail.com](mailto:diego.moreira1@gmail.com) | Data Analytics |
| 2  | Tiago Gomides  | [gomidestiago@outlook.com](mailto:gomidestiago@outlook.com)  | Cloud & Containers |