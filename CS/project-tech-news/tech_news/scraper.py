import requests
import time
import parsel
from tech_news.database import create_news


# Requisito 1
def fetch(url):
    time.sleep(1)
    try:
        response = requests.get(
            url, headers={"user-agent": "Fake user-agent"}, timeout=3
        )
        if response.status_code != 200:
            return None
        return response.text
    except requests.ReadTimeout:
        return None


# Requisito 2
def scrape_updates(html_content):
    links = []
    selector = parsel.Selector(html_content)
    links = selector.css('h2.entry-title a::attr(href)').getall()
    return links


# Requisito 3
def scrape_next_page_link(html_content):
    selector = parsel.Selector(html_content)
    next_page_url = selector.css("a.next::attr(href)").get()
    if not next_page_url:
        return None
    return next_page_url


# Requisito 4
def scrape_news(html_content):
    selector = parsel.Selector(html_content)
    url = selector.css('link[rel="canonical"]::attr(href)').get()
    title = selector.css("h1.entry-title::text").get().strip()
    timestamp = selector.css("li.meta-date::text").get()
    writer = selector.css("span.author > a::text").get()
    reading_time = selector.css("li.meta-reading-time::text").get().split()[0]
    summary = "".join(
      selector.css(".entry-content > p:nth-of-type(1) *::text").getall()
    ).strip()
    category = selector.css("a > span.label::text").get()
    return {
        "url": url,
        "title": title,
        "timestamp": timestamp,
        "writer": writer,
        "reading_time": int(reading_time),
        "summary": summary,
        "category": category,
    }


# Requisito 5
def get_tech_news(amount):
    URL_BASE = "https://blog.betrybe.com/"
    news = []
    counter = 0

    while counter < amount:
        response = fetch(URL_BASE)
        updates_news = scrape_updates(response)

        for new in updates_news:
            response_fetch = fetch(new)
            data = scrape_news(response_fetch)
            news.append(data)
            counter += 1
            if counter == amount:
                break

        URL_BASE = scrape_next_page_link(response)

    create_news(news)
    return news
