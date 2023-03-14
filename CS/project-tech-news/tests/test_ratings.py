from tech_news.analyzer.ratings import top_5_categories
from tech_news.database import db
from tests.assets.news import NEWS


# Req.11
def test_list_top_five_categories():
    db.news.delete_many({})

    # é possível buscar as cinco top 5 categorias
    db.news.insert_many(NEWS)
    assert top_5_categories() == [
        "Ferramentas",
        "Categoria_0",
        "Categoria_7",
        "Novidades",
        "Categoria_9",
    ]

    # caso houver menos de 5 categorias, serão retornadas quantas houverem
    db.news.delete_many({})
    db.news.insert_many(NEWS[:-1])

    assert top_5_categories() == [
        "Ferramentas",
        "Categoria_0",
        "Categoria_7",
        "Novidades",
    ]

    # buscar top categorias retornar vazio caso nao exista noticias
    db.news.delete_many({})
    assert top_5_categories() == []
