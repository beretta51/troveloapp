"""What a traveller would have typed into the help's demo trips, per language.

make_seed.py and make_porto.py build the trips in English and swap these in:
card titles and notes by their English text, plus the trip's own fields.
Places keep their real names; only the words around them change.
"""

WORDS = {
    "en": dict(titles={}, notes={}, tokyo={}, porto={}),
    "es": dict(
        titles={
            "Lisbon to Tokyo": "Lisboa a Tokio",
            "Suica card top-up": "Recarga de la Suica",
            "Yakitori at Omoide Yokocho": "Yakitori en Omoide Yokocho",
            "Meiji Shrine": "Santuario Meiji",
            "Harajuku — Takeshita Street": "Harajuku: calle Takeshita",
            "Ramen at Ichiran Shibuya": "Ramen en Ichiran Shibuya",
            "Shibuya Crossing": "Cruce de Shibuya",
            "Senso-ji Temple": "Templo Senso-ji",
            "Nakamise-dori snacks": "Dulces en Nakamise-dori",
            "Rental rickshaw — Asakusa": "Rickshaw por Asakusa",
            "Tokyo Skytree — Tembo Deck": "Tokyo Skytree: Tembo Deck",
            "Kabuki at Kabukiza": "Kabuki en el Kabukiza",
            "Tsukiji Outer Market breakfast": "Desayuno en el mercado de Tsukiji",
            "teamLab Planets — Toyosu": "teamLab Planets en Toyosu",
            "Rental e-bike — Odaiba loop": "Bici eléctrica por Odaiba",
            "Odaiba — Rainbow Bridge sunset": "Atardecer en el Rainbow Bridge",
            "Tokyo to Kyoto": "Tokio a Kioto",
            "Gion at dusk": "Gion al anochecer",
            "Pack & hotel check-out": "Maletas y salida del hotel",
            "Arashiyama Bamboo Grove": "Bosque de bambú de Arashiyama",
            "Sushi Yoshitake — omakase": "Sushi Yoshitake: omakase",
            "Ginza — morning shopping": "Ginza: compras por la mañana",
            "Tokyo Tower": "Torre de Tokio",
            "Lisbon to Porto": "Lisboa a Oporto",
        },
        notes={
            "Early check-in requested. Ask for a high floor.":
                "Check-in temprano pedido. Pedir una planta alta.",
            "Gates close at 16:30. Autumn leaves peak mid-November.":
                "Cierra a las 16:30. Las hojas de otoño están en su mejor momento a mediados de noviembre.",
            "Memory Lane, Shinjuku. Tiny stalls, cash only.":
                "Memory Lane, Shinjuku. Puestos diminutos, solo efectivo.",
            "One-act seats sell at the door. Earphone guide in English.":
                "Las entradas de un solo acto se compran en la puerta. Audioguía en inglés.",
            "Go past the first gates: the crowds thin out after Yotsutsuji.":
                "Sigue más allá de los primeros toriis: pasado Yotsutsuji hay mucha menos gente.",
            "Hanamikoji and Shirakawa lanes. No photos on private alleys.":
                "Calles Hanamikoji y Shirakawa. Nada de fotos en los callejones privados.",
            "Bags to the Keio Plaza front desk by 10. Forward the big suitcase to Kyoto with Yamato (about ¥2,500).":
                "Maletas a la recepción del Keio Plaza antes de las 10. Mandar la maleta grande a Kioto con Yamato (unos 2.500 ¥).",
            "Open from 6:00. The wooden stage is best before 8.":
                "Abre a las 6:00. El escenario de madera, mejor antes de las 8.",
            "Take the JR Sagano line. Go early.":
                "Coge la línea JR Sagano. Mejor ir temprano.",
            "Free view from the Shiba Park side.":
                "Vistas gratis desde el lado del parque Shiba.",
            "Forested shrine in the heart of the city. Peaceful contrast to Harajuku. Free entry.":
                "Un santuario en pleno bosque, en el centro de la ciudad. Un remanso de paz al lado de Harajuku. Entrada gratis.",
            "Solo dining booths — perfect for solo travellers. Order tonkotsu, add extra noodles (kaedama).":
                "Cabinas individuales, ideales si viajas solo. Pide tonkotsu y repite fideos (kaedama).",
            "Crepes, street fashion, cosplay. Best on weekends. Try Marion Crepes.":
                "Crepes, moda callejera y cosplay. Mejor el fin de semana. Prueba Marion Crepes.",
            "Best viewed from Starbucks Tsutaya 2F or Mag's Park rooftop. Most iconic at night.":
                "Se ve mejor desde el Starbucks Tsutaya (2.ª planta) o la azotea de Mag's Park. De noche impresiona más.",
            "Top up at any JR machine. ¥3000 should cover metro for 2 days.":
                "Se recarga en cualquier máquina de JR. Con 3000 ¥ hay metro para 2 días.",
            "Try ningyo-yaki (red bean cakes), melonpan, and matcha soft-serve. Great souvenir shopping too.":
                "Prueba los ningyo-yaki (pastelitos de judía roja), el melonpan y el helado de matcha. Buen sitio para recuerdos.",
            "Jinrikisha 30-min tour of old Asakusa district. Book at the temple gate. Includes photo stop at Kaminarimon.":
                "30 minutos en jinrikisha por el viejo Asakusa. Se reserva en la puerta del templo. Incluye parada para fotos en Kaminarimon.",
            "Pre-book tickets online (¥2100 Tembo Deck / ¥3400 Tembo Galleria). Clear days: see Mt. Fuji.":
                "Entradas online con antelación (2100 ¥ Tembo Deck / 3400 ¥ Tembo Galleria). Con el día despejado se ve el Fuji.",
            "Tokyo's oldest temple. Arrive before 8am to beat crowds. Buy an omamori charm at the main hall.":
                "El templo más antiguo de Tokio. Llegar antes de las 8 para evitar a la gente. Comprar un amuleto omamori en el salón principal.",
            "Immersive digital art — different from Borderless. Book tickets 2 weeks in advance. Allow 90 min.":
                "Arte digital inmersivo, distinto de Borderless. Reservar con 2 semanas de antelación. Calcular 90 min.",
            "7am opening. Must-try: maguro don (tuna rice bowl), tamagoyaki (egg omelette), fresh oysters. Bring cash.":
                "Abre a las 7. Imprescindible: maguro don (bol de arroz con atún), tamagoyaki (tortilla japonesa) y ostras. Llevar efectivo.",
            "Docomo Cycle station at Daiba Park. 30-min increments, ¥165 each. Loop the seaside promenade to Rainbow Bridge viewpoint.":
                "Estación de Docomo Cycle en el parque Daiba. Tramos de 30 min a 165 ¥. Por el paseo marítimo hasta el mirador del Rainbow Bridge.",
            "Walk the Rainbow Bridge pedestrian path (free). South promenade has best view. Open until 21:00.":
                "Cruzar a pie el Rainbow Bridge (gratis). La mejor vista, desde el paseo sur. Abierto hasta las 21:00.",
            "Uniqlo flagship (6F: premium line), Itoya (stationery paradise, 12 floors), Dover Street Market.":
                "Uniqlo (6.ª planta: línea premium), Itoya (papelería de 12 plantas) y Dover Street Market.",
            "3-Michelin-star. 10-course seasonal omakase. Reserve 2 months ahead. Smart casual dress code.":
                "Tres estrellas Michelin. Omakase de temporada de 10 platos. Reservar con 2 meses. Vestimenta smart casual.",
        },
        tokyo={
            "name": "Tokio y Kioto",
            "destination": "Tokio, Japón",
            "homeCurrency": "EUR",
            "moreDestinations": '[{"name": "Kioto, Japón", "latitude": 35.0116, "longitude": 135.7681, "countryCode": "JP"}]',
        },
        porto={
            "name": "Fin de semana en Oporto",
            "destination": "Oporto, Portugal",
            "homeCurrency": "EUR",
        },
    ),
}
