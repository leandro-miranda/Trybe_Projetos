from functools import lru_cache
from typing import List, Dict
import csv


@lru_cache
def read(path: str) -> List[Dict]:
    with open(path, encoding='utf8') as file:
        reader = csv.DictReader(file, delimiter=',', quotechar='"')
        list_jobs = []
        for row in reader:
            list_jobs.append(row)
        return list_jobs


def get_unique_job_types(path: str) -> List[str]:
    data = read(path)
    unique_job_types = set()
    for row in data:
        unique_job_types.add(row['job_type'])
    return list(unique_job_types)


def filter_by_job_type(jobs: List[Dict], job_type: str) -> List[Dict]:
    filtered_jobs = []
    for row in jobs:
        if row['job_type'] == job_type:
            filtered_jobs.append(row)
    return filtered_jobs
