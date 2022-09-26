SELECT 
    u.nome AS usuario,
    IF(YEAR(MAX(hr.data_reproducao)) >= 2021,
        'Usuário ativo',
        'Usuário inativo') AS status_usuario
FROM
    SpotifyClone.usuario AS u
        INNER JOIN
    SpotifyClone.historico_de_reproducoes AS hr ON hr.usuario_id = u.usuario_id
GROUP BY usuario
ORDER BY usuario ASC;
