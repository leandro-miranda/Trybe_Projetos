from inventory_report.inventory.product import Product
from tests.product.test_product import product_mock


class MockProductReport:
    def __init__(self, mocked_product):
        self.product_id = mocked_product["id"]
        self.product_name = mocked_product["nome_do_produto"]
        self.company_name = mocked_product["nome_da_empresa"]
        self.manufacturing_date = mocked_product["data_de_fabricacao"]
        self.expiration_date = mocked_product["data_de_validade"]
        self.serial_number = mocked_product["numero_de_serie"]
        self.storage_instructions = mocked_product[
            "instrucoes_de_armazenamento"
        ]

    def __repr__(self):
        return (
            f"O produto {self.product_name}"
            f" fabricado em {self.manufacturing_date}"
            f" por {self.company_name} com validade"
            f" até {self.expiration_date}"
            f" precisa ser armazenado {self.storage_instructions}."
        )


def test_relatorio_produto():
    mock = MockProductReport(product_mock)
    product = Product(
        id=mock.product_id,
        nome_do_produto=mock.product_name,
        nome_da_empresa=mock.company_name,
        data_de_fabricacao=mock.manufacturing_date,
        data_de_validade=mock.expiration_date,
        numero_de_serie=mock.serial_number,
        instrucoes_de_armazenamento=mock.storage_instructions,
    )

    assert product.__repr__() == mock.__repr__()
