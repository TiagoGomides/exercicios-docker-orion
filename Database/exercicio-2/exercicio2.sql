SELECT
  a.id,
  a.nome       AS aluno,
  c.nome_curso AS curso
FROM alunos a
INNER JOIN cursos c ON c.id = a.curso_id
ORDER BY a.nome;

SELECT
  a.id,
  a.nome       AS aluno,
  c.nome_curso AS curso
FROM alunos a
JOIN cursos c ON c.id = a.curso_id
WHERE c.nome_curso = 'Data Analytics'
ORDER BY a.nome;

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


SELECT
  c.id,
  c.nome_curso
FROM cursos c
LEFT JOIN alunos a ON a.curso_id = c.id
WHERE a.id IS NULL
ORDER BY c.nome_curso;