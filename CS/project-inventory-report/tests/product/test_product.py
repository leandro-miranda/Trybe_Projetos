from inventory_report.inventory.product import Product


product_interface = dict(
    {
        "id": [int],
        "nome_do_produto": [str],
        "nome_da_empresa": [str],
        "data_de_fabricacao": [str],
        "data_de_validade": [str],
        "numero_de_serie": [str],
        "instrucoes_de_armazenamento": [str],
    }
)

product_mock = dict(
    {
        "id": 1,
        "nome_do_produto": "Café",
        "nome_da_empresa": "Nescafé",
        "data_de_fabricacao": "01/01/2021",
        "data_de_validade": "01/01/2022",
        "numero_de_serie": "123456789",
        "instrucoes_de_armazenamento": "Em local seco e fresco.",
    }
)


def test_cria_produto():
    created_product = Product(
        product_mock["id"],
        product_mock["nome_do_produto"],
        product_mock["nome_da_empresa"],
        product_mock["data_de_fabricacao"],
        product_mock["data_de_validade"],
        product_mock["numero_de_serie"],
        product_mock["instrucoes_de_armazenamento"],
    )

    for key, key_type in product_interface.items():
        assert type(getattr(created_product, key)) in key_type
        assert getattr(created_product, key) == product_mock[key]
