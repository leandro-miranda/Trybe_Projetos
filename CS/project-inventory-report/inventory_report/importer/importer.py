from abc import ABC, abstractmethod


class Importer(ABC):
    @abstractmethod
    def import_data(path: str):
        raise NotImplementedError
