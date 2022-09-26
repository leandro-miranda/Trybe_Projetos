SELECT 
    c.nome AS nome, COUNT(*) AS reproducoes
FROM
    SpotifyClone.cancao AS c
        INNER JOIN
    SpotifyClone.historico_de_reproducoes AS hr ON hr.cancao_id = c.cancao_id
        INNER JOIN
    SpotifyClone.usuario AS u ON u.usuario_id = hr.usuario_id
WHERE
    u.plano_id IN (1 , 4)
GROUP BY nome
ORDER BY nome ASC;
