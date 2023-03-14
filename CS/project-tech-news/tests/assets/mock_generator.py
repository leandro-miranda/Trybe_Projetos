import pathlib
from tech_news.scraper import fetch, scrape_noticia
from tests.assets.test_assets import all_urls
from tests.assets.utils import mocked_fetch
import json
from tqdm import tqdm


def __generate_html_mock(url: str):
    """Overwrite HTLM file given an URL from Trybe's Blog"""
    base_path = "tests/assets/trybe_pages"

    new_url = url.replace("https://blog.betrybe.com", "")
    skip = new_url.find("/", new_url.find("/") + 1)
    html_path = f"{base_path}/noticias/{new_url[skip+1:-1]}.html"

    try:
        pathlib.Path(html_path).write_text(fetch(url))
    except FileNotFoundError as e:
        raise FileNotFoundError(f"{url} | {new_url} | {html_path}") from e


def refresh_cached_html():
    """Overwrite all HTLM files for cached URLS"""
    for url in tqdm(all_urls):
        __generate_html_mock(url)


def refresh_cached_json():
    """Overwrite JSON file for cached URLs and their HTML files"""
    new_rubric = [scrape_noticia(mocked_fetch(path)) for path in all_urls]

    cached_json_path = "tests/assets/cached_news.json"
    with open(cached_json_path, "w") as arquivo:
        json.dump(new_rubric, arquivo, ensure_ascii=False, indent=4)
