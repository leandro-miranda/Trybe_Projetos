import pytest
from src.pre_built.brazilian_jobs import read_brazilian_file


@pytest.fixture
def keys_english():
    return {
        'title': 'Maquinista',
        'salary': '2000',
        'type': 'trainee'
    }


def test_brazilian_jobs(keys_english):
    response = read_brazilian_file('tests/mocks/brazilians_jobs.csv')

    assert keys_english in response
