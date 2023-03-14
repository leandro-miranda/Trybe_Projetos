from inventory_report.reports.simple_report import SimpleReport
from collections import Counter


class CompleteReport(SimpleReport):
    @classmethod
    def quantity_of_products(cls, products):

        list_of_firms = []
        for product in products:
            list_of_firms.append(product["nome_da_empresa"])
            periodicity_of_firms = Counter(list_of_firms).most_common()
            products_of_firms = ''
        for firm in periodicity_of_firms:
            products_of_firms += f'- {firm[0]}: {firm[1]}\n'
        return products_of_firms

    @classmethod
    def generate(cls, products):
        simple_report = super().generate(products)

        complete_report = CompleteReport.quantity_of_products(products)

        text = (
            f"{simple_report}\n"
            f"Produtos estocados por empresa:\n"
            f"{complete_report}"
        )

        return text
