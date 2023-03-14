from typing import Iterator


class InventoryIterator(Iterator):
    def __init__(self, iterable) -> None:
        self.__iterable = iterable
        self.__index = 0

    def __next__(self):
        try:
            result = self.__iterable[self.__index]
        except IndexError:
            raise StopIteration

        self.__index += 1
        return result
