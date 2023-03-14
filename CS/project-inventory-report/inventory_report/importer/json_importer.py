from inventory_report.importer.importer import Importer
import json


class JsonImporter(Importer):
    @staticmethod
    def import_data(file_path: str):
        if file_path.endswith(".json"):
            with open(file_path) as file:
                return json.load(file)

        else:
            raise ValueError("Arquivo inválido")
