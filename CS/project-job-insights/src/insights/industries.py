from typing import List, Dict
from src.insights.jobs import read


def get_unique_industries(path: str) -> List[str]:
    get_all_industries = read(path)
    unique_industries = set()
    for industry in get_all_industries:
        if industry['industry'] != '':
            unique_industries.add(industry['industry'])
    return list(unique_industries)


def filter_by_industry(jobs: List[Dict], industry: str) -> List[Dict]:
    filtered_industry = [job for job in jobs if job['industry'] == industry]
    return filtered_industry
