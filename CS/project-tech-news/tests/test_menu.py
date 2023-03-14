from unittest.mock import patch
from tech_news.menu import analyzer_menu
from tech_news.database import db
from tests.assets.news import NEWS
from tests.assets.utils import mocked_fetch


# Req.12
def test_analyzer_menu_basic(capsys):
    # validar saída do console analyzer menu
    def fake_input(prompt=""):
        print(prompt, end=" ")
        return ""

    with patch("builtins.input", fake_input):
        analyzer_menu()
    out, _ = capsys.readouterr()
    assert (
        "Selecione uma das opções a seguir:\n 0 - Popular o banco com notícias"
        ";\n 1 - Buscar notícias por título;\n 2 - Buscar notícias por data;\n"
        " 3 - Buscar notícias por categoria;\n "
        "4 - Listar top 5 categorias;\n 5 - Sair."
        in out
    )


# Req.13
def test_analyzer_menu_functions(capsys, mocker):
    # executar opção sair
    with patch("builtins.input") as mocked_input:
        mocked_input.side_effect = ["5", ""]
        analyzer_menu()
    out, err = capsys.readouterr()
    assert "Encerrando script\n" in out

    # executar opção invalida
    with patch("builtins.input") as mocked_input:
        mocked_input.side_effect = ["8", ""]
        analyzer_menu()
    out, err = capsys.readouterr()
    assert err == "Opção inválida\n"

    # executar opção buscar por titulo
    db.news.delete_many({})
    db.news.insert_one(NEWS[0])
    with patch("builtins.input") as mocked_input, patch(
        "tech_news.menu.search_by_title"
    ) as mock_search_by_title:
        mocked_input.side_effect = ["1", NEWS[0]["title"]]
        analyzer_menu()
        mock_search_by_title.assert_called_once_with(NEWS[0]["title"])

    # executar opção buscar por data
    db.news.delete_many({})
    db.news.insert_one(NEWS[0])
    with patch("builtins.input") as mocked_input, patch(
        "tech_news.menu.search_by_date"
    ) as mock_search_by_date:
        mocked_input.side_effect = ["2", NEWS[0]["timestamp"]]
        analyzer_menu()
        mock_search_by_date.assert_called_once_with(NEWS[0]["timestamp"])

    # executar opção buscar por categoria
    db.news.delete_many({})
    db.news.insert_one(NEWS[0])
    with patch("builtins.input") as mocked_input, patch(
        "tech_news.menu.search_by_category"
    ) as mock_search_by_category:
        mocked_input.side_effect = ["3", NEWS[0]["category"]]
        analyzer_menu()
        mock_search_by_category.assert_called_once_with(NEWS[0]["category"])

    # executar opção top5 categorias
    db.news.delete_many({})
    db.news.insert_many(NEWS)
    with patch("builtins.input") as mocked_input, patch(
        "tech_news.menu.top_5_categories"
    ) as mock_top_5_categories:
        mocked_input.side_effect = ["4", ""]
        analyzer_menu()
        mock_top_5_categories.assert_called_once()

    # executar opção popular banco
    mocker.patch("tech_news.scraper.fetch", new=mocked_fetch)
    with patch("builtins.input") as mocked_input, patch(
        "tech_news.menu.get_tech_news"
    ) as get_tech_news:
        mocked_input.side_effect = ["0", "1"]
        analyzer_menu()
        get_tech_news.assert_called_once()
