import sys
from tech_news.scraper import get_tech_news
from tech_news.analyzer.ratings import top_5_categories
from tech_news.analyzer.search_engine import (
    search_by_title,
    search_by_date,
    search_by_category,
)


def get_news():
    get_tech_news(input("Digite quantas notícias serão buscadas:"))


def get_by_title():
    search_by_title(input("Digite o título:"))


def get_by_date():
    search_by_date(input("Digite a data no formato aaaa-mm-dd:"))


def get_by_category():
    search_by_category(input("Digite a categoria:"))


def get_top_categories():
    top_5_categories()


# Requisitos 11 e 12
def analyzer_menu():
    option = input(
        "Selecione uma das opções a seguir:\n"
        " 0 - Popular o banco com notícias;\n"
        " 1 - Buscar notícias por título;\n"
        " 2 - Buscar notícias por data;\n"
        " 3 - Buscar notícias por categoria;\n"
        " 4 - Listar top 5 categorias;\n"
        " 5 - Sair."
    )

    functions = {
        "0": get_news,
        "1": get_by_title,
        "2": get_by_date,
        "3": get_by_category,
        "4": get_top_categories,
    }

    if option in ["0", "1", "2", "3", "4"]:
        print(functions[option]())
    elif option == "5":
        print("Encerrando script")
    else:
        print("Opção inválida", file=sys.stderr)
