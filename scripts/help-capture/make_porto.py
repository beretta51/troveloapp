# Builds the short live trip the lock screen, the expense toast and "today"
# screens are taken from: a weekend in Porto that starts today, with a flight
# that leaves a little later, so its Live Activity is on the lock screen.
#
#   python3 make_porto.py LANG OUT.trovelo [MINUTES_TO_TAKE_OFF]
#
# Run it right before the capture; the default take-off is two hours away.
import json, sys, uuid
from datetime import datetime, timedelta, timezone

from seed_words import WORDS

lang, out = sys.argv[1], sys.argv[2]
lead = int(sys.argv[3]) if len(sys.argv) > 3 else 120
now = datetime.now(timezone.utc).replace(second=0, microsecond=0)
off = now + timedelta(minutes=lead - now.minute % 5)
day0 = off.replace(hour=0, minute=0)  # the trip starts on the flight's day

iso = lambda d: d.strftime('%Y-%m-%dT%H:%M:%SZ')
day = lambda n: iso(day0 + timedelta(days=n))
noon = lambda n: iso(day0 + timedelta(days=n, hours=12))

stay = str(uuid.uuid4())
common = dict(notes='', amount=0, hasPriceSet=False, isCompleted=False, chipsEnabled=False)
items = [
    dict(common, title='Lisbon to Porto', category='Flight', date=day(0), sortOrder=0, placeName='',
         flightNumber='TP 1946', departureAirportCode='LIS', arrivalAirportCode='OPO',
         departureTime=iso(off), arrivalTime=iso(off + timedelta(minutes=55)),
         departureTerminal='1', departureGate='14', departureTimeZoneID='Europe/Lisbon',
         arrivalTimeZoneID='Europe/Lisbon', bookingReference='R8T4QX',
         timeMinutes=(off - day0).seconds // 60),
    dict(common, title='Torel Avantgarde', category='Stay', date=day(0), sortOrder=9, placeName='Torel Avantgarde',
         stayGroupID=stay, placeLatitude=41.1466, placeLongitude=-8.6157, timeMinutes=1380, accessCode='4821'),
    dict(common, title='Torel Avantgarde', category='Stay', date=day(1), sortOrder=0, placeName='Torel Avantgarde',
         stayGroupID=stay, placeLatitude=41.1466, placeLongitude=-8.6157, timeMinutes=660),
    dict(common, title='Livraria Lello', category='Place', date=day(1), sortOrder=1, placeName='Livraria Lello',
         placeLatitude=41.1469, placeLongitude=-8.6149),
    dict(common, title='Ribeira', category='Walk', date=day(1), sortOrder=2, placeName='Cais da Ribeira',
         placeLatitude=41.1405, placeLongitude=-8.6131),
]
trip = dict(name='Weekend in Porto', destination='Porto, Portugal', destinationLatitude=41.1579,
            destinationLongitude=-8.6291, startDate=noon(0), endDate=noon(1), currency='€ EUR', emoji='🍷',
            color='#007AFF', destinationCurrency='EUR', homeCurrency='USD', isDateless=False,
            isCountryTrip=False, items=items)

w = WORDS[lang]
for i in items:
    i['title'] = w['titles'].get(i['title'], i['title'])
trip.update(w['porto'])
json.dump({'schemaVersion': 13, 'exportedAt': iso(now), 'trip': trip}, open(out, 'w'), ensure_ascii=False, indent=1)
print(trip['name'], 'takes off', iso(off))
