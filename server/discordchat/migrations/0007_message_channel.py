# Generated by Django 2.0.4 on 2018-05-02 00:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('discordchat', '0006_channel_members'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='channel',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='discordchat.Channel'),
        ),
    ]
