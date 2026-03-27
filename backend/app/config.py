from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    anthropic_api_key: str = ""
    allowed_origins: str = "http://localhost:5173"
    env: str = "development"

    class Config:
        env_file = ".env"


settings = Settings()
