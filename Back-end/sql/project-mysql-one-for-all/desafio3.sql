SELECT 
    u.nome AS usuario,
    COUNT(hr.cancao_id) AS qt_de_musicas_ouvidas,
    ROUND(SUM(c.duracao_segundos) / 60, 2) AS total_minutos
FROM
    SpotifyClone.historico_de_reproducoes AS hr
        INNER JOIN
    SpotifyClone.usuario AS u ON u.usuario_id = hr.usuario_id
        INNER JOIN
    SpotifyClone.cancao AS c ON c.cancao_id = hr.cancao_id
GROUP BY usuario
ORDER BY usuario ASC;
