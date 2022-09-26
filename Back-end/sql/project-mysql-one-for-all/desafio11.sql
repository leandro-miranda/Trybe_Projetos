SELECT 
    nome AS nome_musica,
    CASE
        WHEN nome LIKE '%Bard%' THEN REPLACE(nome, 'Bard', 'QA')
        WHEN nome LIKE '%Amar%' THEN REPLACE(nome, 'Amar', 'Code Review')
        WHEN nome LIKE '%Pais' THEN REPLACE(nome, 'Pais', 'Pull Requests')
        WHEN nome LIKE '%SOUL' THEN REPLACE(nome, 'SOUL', 'CODE')
        WHEN nome LIKE '%SUPERSTAR' THEN REPLACE(nome, 'SUPERSTAR', 'SUPERDEV')
    END AS novo_nome
FROM
    SpotifyClone.cancao
ORDER BY novo_nome DESC
LIMIT 5;
