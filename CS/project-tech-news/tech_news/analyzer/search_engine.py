from tech_news.database import search_news
from datetime import datetime


# Requisito 7
def search_by_title(title):
    searched_news = []
    query = {"title": {"$regex": title, "$options": "i"}}
    for new in search_news(query):
        searched_news.append((new["title"], new["url"]))
    return searched_news


# Requisito 8
def search_by_date(date):
    try:
        date = datetime.fromisoformat(date).strftime("%d/%m/%Y")
        searched_news = []
        for news in search_news({"timestamp": date}):
            searched_news.append((news["title"], news["url"]))
        return searched_news
    except ValueError:
        raise ValueError("Data inválida")


# Requisito 9
def search_by_category(category):
    searched_news = []
    query = {"category": {"$regex": category, "$options": "i"}}
    for new in search_news(query):
        searched_news.append((new["title"], new["url"]))
    return searched_news
