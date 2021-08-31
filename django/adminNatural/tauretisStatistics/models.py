from django.db import models
import datetime

# Create your models here.
class Proizvod(models.Model):
    id = models.IntegerField(primary_key=True)
    ime = models.CharField(max_length=100)
    opis = models.TextField()
    stanje = models.IntegerField()
    cena = models.FloatField(default=0)

    def __str__(self):
        if self.stanje == None:
            self.stanje = 0
        return 'id:\t' + str(self.id) + ', ime:\t' + self.ime + ', opis:\t' + self.opis + ', stanje:\t' + str(self.stanje) + ', cena:\t' + str(self.cena)

    # class Meta:
    #     managed = False
    #     db_table = 'proizvodi'

class Faktura(models.Model):
    id = models.IntegerField(primary_key=True)
    datum = models.DateField()
    prodato = models.TextField()

    def __str__(self):
        return 'id:\t' + str(self.id) + ', datum:\t' + str(self.datum) + ', prodat:\t' + self.prodato
    # class Meta:
    #     managed = False
    #     db_table = 'faktura'
