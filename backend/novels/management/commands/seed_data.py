import os

from django.core.management import BaseCommand
from django_seed import Seed

from users.models import User


def random_image_file():
    image_path = os.path.join(os.path.dirname(__file__))


class Command(BaseCommand):
    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        user_seeder = Seed.seeder()
        user_seeder.add_entity(User, 5, {
            'profile_image': random_image_file,
        })
