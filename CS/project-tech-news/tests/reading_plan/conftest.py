from unittest.mock import patch

import pytest
from _pytest.outcomes import Failed
from pytest_dependency import build_mocked_assets

from tech_news.analyzer.reading_plan import ReadingPlanService
from tests.reading_plan import mocks
from tests.reading_plan.test_reading_plan import test_reading_plan_group_news

mocked_assets = build_mocked_assets(
    mocks_module=mocks,
    asset_to_mock=ReadingPlanService,
    test_function=test_reading_plan_group_news,
    custom_exceptions={mocks._TestAllowInvalidValue: Failed},
)


@pytest.fixture(params=mocked_assets, autouse=True)
def mock_it(request):
    with patch(
        "tests.reading_plan.test_reading_plan.ReadingPlanService",
        request.param,
    ):
        yield
