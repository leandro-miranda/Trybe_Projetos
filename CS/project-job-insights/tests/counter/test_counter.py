from src.pre_built.counter import count_ocurrences


def test_counter():
    response_python = count_ocurrences("data/jobs.csv", "Python")

    assert response_python == 1639
