from django.shortcuts import render
from django.http import HttpResponse as hr
# Create your views here.
from .models import Proizvod, Faktura
from django.db.models import Avg, Max, Min, Count
from django.template import loader
import json


def index(request):
    prosekCena = Proizvod.objects.all().aggregate(Avg('cena'))['cena__avg']
    najjeftiniji = Proizvod.objects.filter(cena=Proizvod.objects.all().aggregate(Min('cena'))['cena__min']).first()
    najskuplji = Proizvod.objects.filter(cena=Proizvod.objects.all().aggregate(Max('cena'))['cena__max']).first()
    brojProizvoda = Proizvod.objects.all().aggregate(Count('id'))['id__count']
    najviseNaStanju = Proizvod.objects.filter(stanje=Proizvod.objects.all().aggregate(Max('stanje'))['stanje__max']).first()
    ispodProsekaQS = Proizvod.objects.filter(cena__lt=prosekCena)
    ispodProseka = [str(p.cena) + ' evra | ' + p.ime for p in ispodProsekaQS]
    sveFakture = [ucitaj_fakturu(f.prodato) for f in Faktura.objects.all()]


    def izvuciCenuFakture(f):
        """
            {'id' : kolicina},
            {'1': 4, '5': 1},
        """
        ukupno = 0
        for p in f:
            ukupno += Proizvod.objects.filter(id=p).first().cena * f[p]
        return ukupno

    def ukupnaZarada():
        return sum(map(izvuciCenuFakture, sveFakture))
    def maxZaradaNaJednojFakturi():
        return max(map(izvuciCenuFakture, sveFakture))
    def ulepsajFakture():
        noveFakture = []
        for f in sveFakture:
            s = ''
            ukupno = 0
            for p in f:
                p1 = Proizvod.objects.filter(id=p).first()
                ime = p1.ime
                ukupno += p1.cena * f[p]
                s += str(f[p]) + ' komada | ' + ime + ' + '
            s = str(ukupno) + ' evra ukupno | ( ' + s + ' )'
            noveFakture.append(s)
        F = Faktura.objects.all()
        ids , dates = [], []
        for f in F:
            ids.append(f.id)
            dates.append(f.datum)
        noveFakture = zip(ids,noveFakture,dates)
        return noveFakture
    context = {
        'merenja': {
            ('prosek cena svih proizvoda', str(round(prosekCena, 2)) + ' evra'),
            ('najskuplji proizvod', str(najskuplji.cena) + ' evra | ' + najskuplji.ime),
            ('najjeftiniji proizvod', str(najjeftiniji.cena) + ' evra | ' + najjeftiniji.ime),
            ('broj unikatnih proizvoda', str(brojProizvoda)),
            ('proizvod koga ima najvise na stanju', str(najviseNaStanju.stanje) + ' komada | ' + najviseNaStanju.ime),
            ('proizvodi sa cenom ispod proseka', str(ispodProseka)),
            ('ukupna zarada', str(ukupnaZarada()) + ' evra'),
            ('maksimalna zarada na jednoj kupovini', str(maxZaradaNaJednojFakturi()) + ' evra'),

        },
        'proizvodi': Proizvod.objects.all(),
        'fakture': Faktura.objects.all(),
        'ulepsaneFakutre' : ulepsajFakture(),
    }
    # return hr(resenje)
    template = loader.get_template('tauretisStatistics/index.html')
    # return hr(template.render(context, request))
    return render(request=request, template_name='tauretisStatistics/index.html', context=context)


def ucitaj_fakturu(data):
    return json.loads(data)
