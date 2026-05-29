from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "AI Drama Platform"
    environment: str = "local"
    api_prefix: str = "/api"
    database_url: str = "sqlite:///./data/app.db"
    storage_dir: str = "./storage"
    cors_origins: str = "http://localhost:5173,http://127.0.0.1:5173"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_prefix="AI_DRAMA_",
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
