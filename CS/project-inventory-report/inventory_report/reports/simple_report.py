import datetime


class SimpleReport:
    @classmethod
    def generate(cls, stock):
        manufacturing_date = list()
        expiration_date = list()
        product_counter = dict()
        for product in stock:
            manufacturing_date.append(product["data_de_fabricacao"])
            if product["data_de_validade"] >= datetime.datetime.now().strftime(
                "%Y-%m-%d"
            ):
                expiration_date.append(product["data_de_validade"])
            if product["nome_da_empresa"] in product_counter:
                product_counter[product["nome_da_empresa"]] += 1
            else:
                product_counter[product["nome_da_empresa"]] = 1
        text = (
            f"Data de fabricação mais antiga: "
            f"{min(manufacturing_date)}\n"
            f"Data de validade mais próxima: "
            f"{min(expiration_date)}\n"
            f"Empresa com mais produtos: "
            f"{max(product_counter, key= product_counter.get)}"
        )
        return text
