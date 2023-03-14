import pytest
from inventory_report.reports.colored_report import ColoredReport
from inventory_report.reports.simple_report import SimpleReport
from inventory_report.reports.complete_report import CompleteReport


@pytest.fixture
def stock_fixture():
    return [{
        "id": "1",
        "nome_do_produto": "Nicotine Polacrilex",
        "nome_da_empresa": "Target Corporation",
        "data_de_fabricacao": "2021-02-18",
        "data_de_validade": "2023-09-17",
        "numero_de_serie": "CR25 1551 4467 2549 4402 1",
        "instrucoes_de_armazenamento": "instrucao 1"
    }]


R = "\033[31m"
G = "\033[32m"
B = "\033[36m"
C = "\033[0m"


@pytest.fixture
def expected_simple_report():
    return (
        f"{G}Data de fabricação mais antiga:{C} {B}2021-02-18{C}\n"
        f"{G}Data de validade mais próxima:{C} {B}2023-09-17{C}\n"
        f"{G}Empresa com mais produtos:{C} {R}Target Corporation{C}"
    )


@pytest.fixture
def expected_complete_report():
    return (
        f"{G}Data de fabricação mais antiga:{C} {B}2021-02-18{C}\n"
        f"{G}Data de validade mais próxima:{C} {B}2023-09-17{C}\n"
        f"{G}Empresa com mais produtos:{C} {R}Target Corporation{C}\n"
        f"Produtos estocados por empresa:\n"
        f"- Target Corporation: 1\n"
    )


def test_decorar_relatorio(
        stock_fixture,
        expected_simple_report,
        expected_complete_report,
):
    color_simple_rep = ColoredReport(SimpleReport).generate(stock_fixture)
    color_complete_rep = ColoredReport(CompleteReport).generate(stock_fixture)

    assert color_simple_rep == expected_simple_report
    assert color_complete_rep == expected_complete_report
