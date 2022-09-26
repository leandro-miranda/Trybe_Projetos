SELECT 
    art.nome AS artista,
    alb.nome AS album,
    COUNT(*) AS seguidores
FROM
    SpotifyClone.artista AS art
        INNER JOIN
    SpotifyClone.album AS alb ON alb.artista_id = art.artista_id
        INNER JOIN
    SpotifyClone.seguindo_artistas AS s ON s.artista_id = art.artista_id
GROUP BY artista , album
ORDER BY seguidores DESC , artista ASC , album ASC;
