from src.pre_built.sorting import sort_by


def test_sort_by_criteria():
    jobs = [
        {'min_salary': 10, 'max_salary': 100, 'date_posted': '2020-06-07'},
        {'min_salary': 2, 'max_salary': 80, 'date_posted': '2020-06-08'},
    ]
    job_min_salary = [
        {'min_salary': 2, 'max_salary': 80, 'date_posted': '2020-06-08'},
        {'min_salary': 10, 'max_salary': 100, 'date_posted': '2020-06-07'},
    ]
    job_max_salary = [
        {'min_salary': 10, 'max_salary': 100, 'date_posted': '2020-06-07'},
        {'min_salary': 2, 'max_salary': 80, 'date_posted': '2020-06-08'},
    ]
    job_date_posted = [
        {'min_salary': 2, 'max_salary': 80, 'date_posted': '2020-06-08'},
        {'min_salary': 10, 'max_salary': 100, 'date_posted': '2020-06-07'},
    ]

    sort_by(jobs, 'min_salary')
    assert jobs == job_min_salary
    sort_by(jobs, 'max_salary')
    assert jobs == job_max_salary
    sort_by(jobs, 'date_posted')
    assert jobs == job_date_posted
