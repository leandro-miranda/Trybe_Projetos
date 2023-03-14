from inventory_report.importer.importer import Importer
import csv


class CsvImporter(Importer):
    @staticmethod
    def import_data(file_path: str):
        if file_path.endswith(".csv"):
            with open(file_path) as file:
                file_data = csv.DictReader(file)
                data_list = list(file_data)

            return data_list
        else:
            raise ValueError("Arquivo inválido")
