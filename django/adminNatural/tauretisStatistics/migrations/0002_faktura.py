# Generated by Django 3.1.4 on 2021-08-30 01:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tauretisStatistics', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Faktura',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('datum', models.DateTimeField()),
                ('prodato', models.TextField()),
            ],
            options={
                'db_table': 'faktura',
                'managed': False,
            },
        ),
    ]
