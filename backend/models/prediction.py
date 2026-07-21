from pydantic import BaseModel

class PredictionRequest(BaseModel):

    lag_1: float
    lag_2: float
    lag_3: float
    rolling_7: float

    temperatureMax: float
    temperatureMin: float

    humidity: float
    windSpeed: float
    pressure: float

    year: int
    month: int
    day_of_month: int
    day_of_week: int
    week_of_year: int