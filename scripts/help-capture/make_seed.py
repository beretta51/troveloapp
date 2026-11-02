# Builds the demo trip the help screenshots are taken from: Tokyo and
# Kyoto, Mon 9 to Sun 15 Nov 2026, from the Tokyo demo file plus a flight
# with a layover, two hotels, a Shinkansen, a ticket and a note.
#
#   python3 make_seed.py LANG OUT.trovelo
#
# LANG picks the words a traveller would have typed (seed_words.py): card
# titles, notes, the trip's name and the home currency. Places keep their names.
import json, sys, uuid
from pathlib import Path

from seed_words import WORDS

lang, out = sys.argv[1], sys.argv[2]
src = Path(__file__).with_name('tokyo-demo.trovelo')
base = {i['title']: i for i in json.load(open(src))['trip']['items']}

def day(n):            # a card's day: midnight on the device's clock (Lisbon, UTC+0)
    return f"2026-11-{9 + n:02d}T00:00:00Z"

def trip_day(n):       # the trip's own dates are stored at noon UTC
    return f"2026-11-{9 + n:02d}T12:00:00Z"

items = []
def card(title, cat, d, order, **kw):
    i = dict(base.get(title, {}))
    i.update(title=title, category=cat, date=d, sortOrder=order)
    i.setdefault('notes', ''); i.setdefault('amount', 0); i.setdefault('hasPriceSet', i['amount'] > 0)
    i.setdefault('isCompleted', False); i.setdefault('placeName', i.get('placeName', '')); i.setdefault('chipsEnabled', False)
    i.update(kw)
    items.append(i)
    return i

def place(title, cat, d, order, name, lat, lng, notes='', **kw):
    return card(title, cat, d, order, placeName=name, placeLatitude=lat, placeLongitude=lng, notes=notes, **kw)

# Day 0, Mon 9: the flight out, Lisbon to Tokyo through Frankfurt.
legs = [
    dict(id=str(uuid.uuid4()), flightNumber='LH 1173', departureAirportCode='LIS', arrivalAirportCode='FRA',
         departureTime='2026-11-09T06:10:00Z', arrivalTime='2026-11-09T09:05:00Z',
         departureTerminal='1', arrivalTerminal='1', departureGate='12',
         departureTimeZoneID='Europe/Lisbon', arrivalTimeZoneID='Europe/Berlin'),
    dict(id=str(uuid.uuid4()), flightNumber='LH 716', departureAirportCode='FRA', arrivalAirportCode='HND',
         departureTime='2026-11-09T12:20:00Z', arrivalTime='2026-11-10T00:05:00Z',
         departureTerminal='1', departureGate='Z25', arrivalTerminal='3',
         departureTimeZoneID='Europe/Berlin', arrivalTimeZoneID='Asia/Tokyo'),
]
card('Lisbon to Tokyo', 'Flight', day(0), 0, flightNumber='LH 1173', departureAirportCode='LIS', arrivalAirportCode='HND',
     departureTime=legs[0]['departureTime'], arrivalTime=legs[1]['arrivalTime'], departureTerminal='1', departureGate='12',
     arrivalTerminal='3', departureTimeZoneID='Europe/Lisbon', arrivalTimeZoneID='Asia/Tokyo',
     flightLegsJSON=json.dumps(legs), bookingReference='K7Q2LM', timeMinutes=370)

# Tue 10 to Sat 14: Keio Plaza, one card a night.
keio = str(uuid.uuid4())
for n in range(1, 6):
    card('Keio Plaza Hotel Tokyo', 'Stay', day(n), 0 if n > 1 else 9, stayGroupID=keio,
         placeName='Keio Plaza Hotel Tokyo', placeLatitude=35.6906, placeLongitude=139.6948,
         placeAddress='2-2-1 Nishi-Shinjuku, Shinjuku-ku, Tokyo',
         bookingReference='4471920336', timeMinutes=900 if n == 1 else (660 if n == 5 else None),
         notes='Early check-in requested. Ask for a high floor.' if n == 1 else '')

# Tue 10
card('Suica card top-up', 'Expense', day(1), 1, timeMinutes=None)
place('Shinjuku Gyoen', 'Nature', day(1), 2, 'Shinjuku Gyoen National Garden', 35.6852, 139.7101,
      'Gates close at 16:30. Autumn leaves peak mid-November.')
place('Yakitori at Omoide Yokocho', 'Food', day(1), 3, 'Omoide Yokocho', 35.6929, 139.6996,
      'Memory Lane, Shinjuku. Tiny stalls, cash only.', amount=3500, hasPriceSet=True,
      photoURL='https://troveloapp.com/images/trovelo/t-grill.jpg')
# Wed 11
card('Meiji Shrine', 'Place', day(2), 0)
card('Harajuku — Takeshita Street', 'Place', day(2), 1)
card('Ramen at Ichiran Shibuya', 'Food', day(2), 2)
card('Shibuya Crossing', 'Place', day(2), 3)
# Thu 12
card('Senso-ji Temple', 'Place', day(3), 0)
card('Nakamise-dori snacks', 'Food', day(3), 1)
card('Rental rickshaw — Asakusa', 'Rental', day(3), 2)
card('Tokyo Skytree — Tembo Deck', 'Plans', day(3), 3)
place('Kabuki at Kabukiza', 'Tickets', day(3), 4, 'Kabukiza Theatre', 35.6695, 139.7678,
      'One-act seats sell at the door. Earphone guide in English.', amount=6000, hasPriceSet=True,
      timeMinutes=1110, ticketSection='1F', ticketRow='7', ticketSeat='14', bookingReference='KBZ-30218')
# Fri 13
card('Tsukiji Outer Market breakfast', 'Food', day(4), 0)
card('teamLab Planets — Toyosu', 'Plans', day(4), 1)
card('Rental e-bike — Odaiba loop', 'Rental', day(4), 2)
card('Odaiba — Rainbow Bridge sunset', 'Place', day(4), 3)
# Sat 14: to Kyoto.
card('Tokyo to Kyoto', 'Train', day(5), 1, flightNumber='Nozomi 225',
     departureStationName='Tokyo', arrivalStationName='Kyoto',
     departureLatitude=35.6812, departureLongitude=139.7671, arrivalLatitude=34.9858, arrivalLongitude=135.7588,
     departureTime='2026-11-14T01:00:00Z', arrivalTime='2026-11-14T03:15:00Z',
     departureTimeZoneID='Asia/Tokyo', arrivalTimeZoneID='Asia/Tokyo',
     departureTerminal='18', seatCoach='7', seatNumber='12A', bookingReference='EX58K2',
     amount=14170, hasPriceSet=True, timeMinutes=600)
celestine = str(uuid.uuid4())
for n in (5, 6):
    card('Hotel The Celestine Kyoto Gion', 'Stay', day(n), 9 if n == 5 else 0, stayGroupID=celestine,
         placeName='Hotel The Celestine Kyoto Gion', placeLatitude=34.9985, placeLongitude=135.7782,
         timeMinutes=900 if n == 5 else 660, bookingReference='CK-77310')
place('Fushimi Inari Taisha', 'Sacred Site', day(5), 3, 'Fushimi Inari Taisha', 34.9671, 135.7727,
      'Go past the first gates: the crowds thin out after Yotsutsuji.',
      photoURL='https://troveloapp.com/images/trovelo/t-torii.jpg')
place('Gion at dusk', 'Walk', day(5), 4, 'Hanamikoji Street', 35.0037, 135.7751,
      'Hanamikoji and Shirakawa lanes. No photos on private alleys.',
      photoURL='https://troveloapp.com/images/trovelo/t-night.jpg')
card('Pack & hotel check-out', 'Note', day(5), 2, notes='Bags to the Keio Plaza front desk by 10. Forward the big suitcase to Kyoto with Yamato (about ¥2,500).')
# Sun 15
place('Kiyomizu-dera', 'Sacred Site', day(6), 1, 'Kiyomizu-dera', 34.9949, 135.7850,
      'Open from 6:00. The wooden stage is best before 8.')
place('Arashiyama Bamboo Grove', 'Nature', day(6), 2, 'Arashiyama Bamboo Grove', 35.0170, 135.6713,
      'Take the JR Sagano line. Go early.')
# Unplanned: no day yet.
card('Sushi Yoshitake — omakase', 'Food', None, 0)
card('Ginza — morning shopping', 'Shopping', None, 1)
place('Tokyo Tower', 'Place', None, 2, 'Tokyo Tower', 35.6586, 139.7454, 'Free view from the Shiba Park side.')

for i in items:
    for k in [k for k, v in i.items() if v is None and k != 'date']:
        del i[k]

payload = {
    'schemaVersion': 13,
    'exportedAt': '2026-11-01T12:00:00Z',
    'trip': {
        'name': 'Tokyo & Kyoto', 'destination': 'Tokyo, Japan',
        'destinationLatitude': 35.6762, 'destinationLongitude': 139.6503,
        'startDate': trip_day(0), 'endDate': trip_day(6),
        'currency': '¥ JPY', 'emoji': '⛩️', 'color': '#FBE193',
        'destinationCurrency': 'JPY', 'homeCurrency': 'USD',
        'isDateless': False, 'isCountryTrip': False,
        'coverPhotoURL': 'https://images.pexels.com/photos/18848552/pexels-photo-18848552.jpeg',
        'moreDestinations': json.dumps([{'name': 'Kyoto, Japan', 'latitude': 35.0116, 'longitude': 135.7681, 'countryCode': 'JP'}]),
        'items': items,
    },
}
w = WORDS[lang]
for i in items:
    i['title'] = w['titles'].get(i['title'], i['title'])
    i['notes'] = w['notes'].get(i['notes'], i['notes'])
payload['trip'].update(w['tokyo'])
json.dump(payload, open(out, 'w'), ensure_ascii=False, indent=1)
print(len(items), 'cards')
