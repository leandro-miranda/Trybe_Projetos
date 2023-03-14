import sys
from inventory_report.importer.importer import Importer

from inventory_report.inventory.inventory_refactor import InventoryRefactor

from inventory_report.importer.csv_importer import CsvImporter
from inventory_report.importer.json_importer import JsonImporter
from inventory_report.importer.xml_importer import XmlImporter


def main():
    try:
        _app, file_path, report_type = sys.argv

        importer = InventoryRefactor(select_importer(file_path))
        inventory = importer.import_data(file_path, report_type)

        print(inventory, file=sys.stdout, end="")

    except ValueError:
        print("Verifique os argumentos", file=sys.stderr)


def select_importer(file_path: str) -> Importer:
    if ".csv" in file_path:
        selected_importer = CsvImporter
    elif ".json" in file_path:
        selected_importer = JsonImporter
    elif ".xml" in file_path:
        selected_importer = XmlImporter
    else:
        print("Arquivo não suportado", file=sys.stderr)

    return selected_importer
