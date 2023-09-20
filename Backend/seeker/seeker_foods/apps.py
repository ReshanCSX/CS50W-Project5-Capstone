from django.apps import AppConfig


class SeekerFoodConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'seeker_foods'

    def ready(self):
        import seeker_foods.signals
