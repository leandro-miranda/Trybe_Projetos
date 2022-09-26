SELECT 
    COUNT(*) AS quantidade_musicas_no_historico
FROM
    SpotifyClone.historico_de_reproducoes AS hr
        INNER JOIN
    SpotifyClone.usuario AS u ON u.usuario_id = hr.usuario_id
WHERE
    u.nome = 'Barbara Liskov';
