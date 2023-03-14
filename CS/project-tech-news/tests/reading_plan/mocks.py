from typing import Any, Dict, List
from tech_news.analyzer.reading_plan import ReadingPlanService


class _TestAllowInvalidValue(ReadingPlanService):
    """Testar entrada com valor inválido"""

    @classmethod
    def group_news_for_available_time(
        cls, available_time: int
    ) -> Dict[str, List]:

        result = {"readable": [], "unreadable": []}
        for new in cls._db_news_proxy():
            if new["reading_time"] > available_time:
                cls._register_unreadable(result, new)
                continue

            if cls._fit_to_existing_group(result, new):
                continue

            cls._register_readable(available_time, result, new)
        return result


class _TestWrongUnfilledTime(ReadingPlanService):
    """Testar valores 'unfilled_time' inconsistentes"""

    @classmethod
    def _register_readable(
        cls, available_time: int, result: Dict[str, List], new: Dict[str, Any]
    ):
        return super()._register_readable(available_time + 1, result, new)


class _TestEmptyUnreadableNews(ReadingPlanService):
    """Testar valor 'unreadable' vazio"""

    @classmethod
    def _register_unreadable(
        cls, result: Dict[str, List], new: Dict[str, Any]
    ):
        pass


class _TestDuplicateUnreadableNews(ReadingPlanService):
    """Testar valores incorretos em 'unreadable'"""

    @classmethod
    def _register_readable(
        cls, available_time: int, result: Dict[str, List], new: Dict[str, Any]
    ):
        return super()._register_unreadable(result, new)
