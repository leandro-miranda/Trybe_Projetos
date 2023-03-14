from typing import Union, List, Dict
from src.insights.jobs import read


def get_max_salary(path: str) -> int:
    get_salaries = read(path)
    max_salary = max(
        [
            int(salaries["max_salary"])
            for salaries in get_salaries
            # A função isdigit() em python retorna True se a string passada
            # como parâmetro for um número inteiro e False se não for. Ela
            # retorna True para strings de dígitos decimais também.
            # Por exemplo: "123".isdigit() retornará True.
            if (salaries["max_salary"]).isdigit()
        ]
    )
    return max_salary


def get_min_salary(path: str) -> int:
    get_salaries = read(path)
    min_salary = min(
        [
            int(salaries["min_salary"])
            for salaries in get_salaries
            if (salaries["min_salary"]).isdigit()
        ]
    )
    return min_salary


def matches_salary_range(job: Dict, salary: Union[int, str]) -> bool:
    if (
        "min_salary" not in job
        or "max_salary" not in job
        or not str(job["max_salary"]).isdigit()
        or not str(job["min_salary"]).isdigit()
        or int(job["min_salary"]) > int(job["max_salary"])
        or not str(salary).lstrip("-").isdigit()
        # A função lstrip('-') remove todos os caracteres '-'
        # do início de uma string
    ):
        raise ValueError
    return int(job["min_salary"]) <= int(salary) <= int(job["max_salary"])


def filter_by_salary_range(
    jobs: List[dict], salary: Union[str, int]
) -> List[Dict]:
    job_list = list()
    for job in jobs:
        try:
            if matches_salary_range(job, salary):
                job_list.append(job)
        except ValueError:
            pass
    return job_list
