from datetime import date
import os

from app import create_app
from app.extensions import db
from app.models import Destination, Package, PackageItinerary, PackagePrice, AdminUser

app = create_app()

def kw(model, data):
    cols = {c.name for c in model.__table__.columns}
    return {k: v for k, v in data.items() if k in cols}

def season_rows(a, b, c, d, child=None):
    child = child or [None, None, None, None]
    return [
        (date(2026,7,1),  date(2026,9,30), a, child[0]),
        (date(2026,10,1), date(2026,10,31), b, child[1]),
        (date(2026,11,1), date(2026,12,21), c, child[2]),
        (date(2026,12,22),date(2027,1,1), d, child[3]),
    ]

def daytrip_rows(rates):
    """Official 2026 day-trip rates. Values are per person by total party size."""
    return [
        (date(2026,1,1), date(2026,12,31), rates, None),
    ]

def rate_at(rates, index):
    """Return 1-based pax rate safely; missing source rates stay None."""
    return rates[index - 1] if len(rates) >= index else None

COMMON_INCLUSIONS = [
    "English-speaking safari guide",
    "Accommodation",
    "Meals as specified",
    "Private game drives",
    "Transfers as specified",
    "Drinking water",
    "Park fees and government taxes",
    "Safari transport",
]

COMMON_EXCLUSIONS = [
    "International flights",
    "Airport taxes where applicable",
    "Guide and local escort gratuities",
    "Drinks, porterage and personal expenses",
    "Travel and baggage insurance",
    "Laundry and telephone bills",
]

COMMON_EXTRAS = [
    "Hot-air balloon safari - USD 450",
    "Maasai village visit - USD 25",
    "Mara horse ride - USD 250",
    "Tips and gratuities",
]

NAIROBI_DAYTRIP_INCLUSIONS = [
    "Driver guide",
    "Park entry fees",
    "Land Cruiser Jeep with a pop-up roof",
    "Drinking water",
]

DESTINATIONS = [
    dict(key="mara", name="Maasai Mara", slug="maasai-mara",
         location="Narok County, Kenya",
         short_description="Kenya's iconic safari landscape of big cats, open plains and the Great Migration.",
         description="The Maasai Mara offers exceptional wildlife viewing, predator action and classic savannah scenery.",
         image="/images/destinations/maasai-mara.jpg",
         highlights=["Great Migration","Big Five","Big cats","Mara River","Maasai culture"],
         best_time_to_visit="Year-round; July to October is popular for the Great Migration.",
         recommended_stay="3-4 days",
         climate="Warm days, cool mornings and seasonal rains.",
         wildlife_highlights=["Lion","Leopard","Cheetah","Elephant","Buffalo","Wildebeest","Zebra"],
         activities=["Game drives","Photography","Hot-air balloon safaris","Maasai village visits"],
         getting_there="Road from Nairobi via Narok or scheduled flights to Mara airstrips.",
         travel_tips=["Pack a warm layer for early drives.","Book migration season early.","Carry binoculars and sun protection."],
         ideal_for=["First-time safari travellers","Photographers","Couples","Families"],
         featured=True),

    dict(key="olpejeta", name="Ol Pejeta Conservancy", slug="ol-pejeta",
         location="Laikipia County, Kenya",
         short_description="A leading conservancy known for rhinos, chimpanzees and predator-rich plains.",
         description="Ol Pejeta combines excellent wildlife viewing with important rhino and chimpanzee conservation.",
         image="/images/destinations/ol-pejeta.jpg",
         highlights=["Rhino conservation","Chimpanzee sanctuary","Big Five","Mount Kenya views"],
         best_time_to_visit="Year-round.", recommended_stay="1-2 days",
         climate="Mild with cool mornings and evenings.",
         wildlife_highlights=["Black rhino","White rhino","Chimpanzee","Lion","Elephant","Buffalo"],
         activities=["Game drives","Rhino sanctuary visits","Chimpanzee sanctuary visits"],
         getting_there="About four hours by road from Nairobi.",
         travel_tips=["Carry a jacket for early starts.","Allow time for conservation visits."],
         ideal_for=["Conservation travellers","Families","Wildlife enthusiasts"],
         featured=True),

    dict(key="nakuru", name="Lake Nakuru National Park", slug="lake-nakuru",
         location="Nakuru County, Kenya",
         short_description="A Rift Valley park renowned for rhinos, birdlife and lake scenery.",
         description="Lake Nakuru National Park protects a scenic Rift Valley lake with rich birdlife and strong rhino populations.",
         image="/images/destinations/lake-nakuru.jpg",
         highlights=["Black and white rhinos","Flamingos","Rift Valley scenery","Birdlife"],
         best_time_to_visit="Year-round.", recommended_stay="1-2 days",
         climate="Mild temperatures with cooler mornings.",
         wildlife_highlights=["Black rhino","White rhino","Buffalo","Giraffe","Baboon","Flamingo"],
         activities=["Game drives","Birdwatching","Photography"],
         getting_there="About three hours by road from Nairobi.",
         travel_tips=["Bring binoculars.","Early and late drives are rewarding."],
         ideal_for=["Birdwatchers","Families","Rhino enthusiasts"],
         featured=True),

    dict(key="amboseli", name="Amboseli National Park", slug="amboseli",
         location="Kajiado County, Kenya",
         short_description="Famous for elephant herds and views of Mount Kilimanjaro.",
         description="Amboseli combines open plains, wetlands, large elephant herds and spectacular Kilimanjaro views.",
         image="/images/destinations/amboseli.jpg",
         highlights=["Elephants","Mount Kilimanjaro","Observation Hill","Maasai culture"],
         best_time_to_visit="Year-round.", recommended_stay="2-3 days",
         climate="Warm and generally dry with cool mornings.",
         wildlife_highlights=["Elephant","Lion","Cheetah","Buffalo","Giraffe","Zebra","Hippo"],
         activities=["Game drives","Photography","Observation Hill","Cultural visits"],
         getting_there="About four to five hours by road from Nairobi.",
         travel_tips=["Morning often gives the clearest Kilimanjaro views.","Carry sun protection."],
         ideal_for=["Elephant lovers","Photographers","Couples","Families"],
         featured=True),

    dict(key="naivasha", name="Lake Naivasha", slug="lake-naivasha",
         location="Nakuru County, Kenya",
         short_description="A freshwater Rift Valley lake rich in birdlife and hippos.",
         description="Lake Naivasha is surrounded by papyrus and acacia woodland and is known for birds, hippos and boat rides.",
         image="/images/destinations/lake-naivasha.jpg",
         highlights=["Boat rides","Hippos","Birdwatching","Acacia forests"],
         best_time_to_visit="Year-round.", recommended_stay="1-2 days",
         climate="Pleasant highland climate.",
         wildlife_highlights=["Hippo","Giraffe","Buffalo","Colobus monkey","Waterbirds"],
         activities=["Boat rides","Birdwatching","Photography","Lakeside relaxation"],
         getting_there="About two hours by road from Nairobi.",
         travel_tips=["Carry a light jacket.","Boat rides are weather dependent."],
         ideal_for=["Birdwatchers","Couples","Families"],
         featured=True),

    dict(key="aberdare", name="Aberdare National Park", slug="aberdare",
         location="Central Kenya",
         short_description="A cool mountain wilderness of forests, valleys and waterfalls.",
         description="Aberdare National Park offers forested mountain scenery, deep valleys, streams and lodge-based wildlife viewing.",
         image="/images/destinations/aberdare.jpg",
         highlights=["Mountain scenery","Waterfalls","Forest wildlife","Lodge game viewing"],
         best_time_to_visit="January-February and June-September.",
         recommended_stay="1-2 days", climate="Cooler and wetter than the lowlands.",
         wildlife_highlights=["Elephant","Buffalo","Bushbuck","Giant forest hog","Leopard"],
         activities=["Game viewing","Scenic drives","Photography"],
         getting_there="About three to four hours by road from Nairobi.",
         travel_tips=["Pack warm clothing and rain protection."],
         ideal_for=["Nature lovers","Repeat safari travellers","Photographers"],
         featured=False),

    dict(key="samburu", name="Samburu National Reserve", slug="samburu-national-reserve",
         location="Samburu County, Kenya",
         short_description="Northern Kenya wildlife, rare species and clear desert skies.",
         description="Samburu offers rare northern wildlife, the Ewaso Nyiro River, dramatic semi-arid scenery and strong cultural experiences.",
         image="/images/destinations/samburu.jpg",
         highlights=["Samburu Special Five","Ewaso Nyiro River","Elephants","Stargazing","Samburu culture"],
         best_time_to_visit="June-October and December-March.",
         recommended_stay="3-4 days", climate="Hot and dry with cooler nights.",
         wildlife_highlights=["Grevy's zebra","Reticulated giraffe","Beisa oryx","Gerenuk","Somali ostrich","Elephant","Lion","Leopard"],
         activities=["Game drives","Stargazing","Photography","Samburu village visits"],
         getting_there="Road from Nairobi or scheduled flights to Samburu airstrips.",
         travel_tips=["Carry strong sun protection.","Bring a warm layer for stargazing."],
         ideal_for=["Wildlife enthusiasts","Photographers","Couples"],
         featured=True),

    dict(key="nairobi", name="Nairobi National Park", slug="nairobi-national-park",
         location="Nairobi, Kenya",
         short_description="Authentic wildlife viewing on the edge of Kenya's capital.",
         description="Nairobi National Park is ideal for short stays and offers rhinos, lions and plains wildlife close to the city.",
         image="/images/destinations/nairobi-national-park.jpg",
         highlights=["City-edge safari","Rhinos","Lions","Open grasslands"],
         best_time_to_visit="Year-round.", recommended_stay="Half day to 1 day",
         climate="Mild Nairobi climate.",
         wildlife_highlights=["Black rhino","White rhino","Lion","Buffalo","Giraffe","Zebra"],
         activities=["Game drives","Photography","Birdwatching"],
         getting_there="Short drive from central Nairobi and JKIA depending on traffic.",
         travel_tips=["Start early to avoid traffic and improve wildlife viewing."],
         ideal_for=["Layover travellers","Business travellers","Families"],
         featured=True),
]

# name, slug, category, days, nights, display_from, destinations,
# accommodation, itinerary titles, seasonal rows, featured, pricing_mode
PACKAGES = [
    # =========================================================
    # OFFICIAL 2026 DAY TRIPS - NON-RESIDENT
    # Rates are PER PERSON and selected by TOTAL PARTY SIZE.
    # Nairobi chart supplies 1-8 pax; outside Nairobi supplies 1-7 pax.
    # =========================================================
    (
        "Nairobi National Park - Park Only",
        "nairobi-national-park-day-trip","day-trip",1,0,124,
        ["nairobi"],"Land Cruiser",
        ["Nairobi National Park · 4-5 Hours"],
        daytrip_rows([288,198,168,153,144,138,131,124]),
        True,"fixed"
    ),
    (
        "Nairobi National Park & Giraffe Centre",
        "nairobi-park-giraffe-centre-day-trip","day-trip",1,0,149,
        ["nairobi"],"Land Cruiser",
        ["Nairobi National Park & Giraffe Centre · 5-7 Hours"],
        daytrip_rows([323,223,190,173,163,157,152,149]),
        True,"fixed"
    ),
    (
        "Nairobi National Park & David Sheldrick",
        "nairobi-park-david-sheldrick-day-trip","day-trip",1,0,154,
        ["nairobi"],"Land Cruiser",
        ["Nairobi National Park & David Sheldrick · 5-7 Hours"],
        daytrip_rows([328,228,195,178,168,162,157,154]),
        True,"fixed"
    ),
    (
        "Nairobi Full Day - Visit 4 Places",
        "nairobi-full-day-4-places","day-trip",1,0,195,
        ["nairobi"],"Land Cruiser",
        ["Nairobi Full Day · Visit 4 Places · 6-10 Hours"],
        daytrip_rows([414,286,246,226,213,205,199,195]),
        True,"fixed"
    ),
    (
        "Nairobi Full Day - Visit 5 Places",
        "nairobi-full-day-5-places","day-trip",1,0,198,
        ["nairobi"],"Land Cruiser",
        ["Nairobi Full Day · Visit 5 Places · 6-12 Hours"],
        daytrip_rows([443,303,256,233,219,210,203,198]),
        True,"fixed"
    ),
    (
        "Amboseli National Park Day Trip",
        "amboseli-national-park-day-trip","day-trip",1,0,176,
        ["amboseli"],"Land Cruiser / 4x4 Tour Van",
        ["Amboseli National Park Day Trip"],
        daytrip_rows([536,326,256,221,200,186,176]),
        True,"fixed"
    ),
    (
        "Amboseli Day Trip with Breakfast",
        "amboseli-day-trip-breakfast","day-trip",1,0,206,
        ["amboseli"],"Land Cruiser / 4x4 Tour Van",
        ["Amboseli National Park · Breakfast Option"],
        daytrip_rows([566,356,286,251,230,216,206]),
        False,"fixed"
    ),
    (
        "Amboseli Day Trip with Lunch",
        "amboseli-day-trip-lunch","day-trip",1,0,236,
        ["amboseli"],"Land Cruiser / 4x4 Tour Van",
        ["Amboseli National Park · Lunch Option"],
        daytrip_rows([596,396,316,281,260,246,236]),
        False,"fixed"
    ),
    (
        "Lake Naivasha Day Trip",
        "lake-naivasha-day-trip","day-trip",1,0,95,
        ["naivasha"],"Land Cruiser / 4x4 Tour Van",
        ["Lake Naivasha · Full Day"],
        daytrip_rows([395,220,162,123,115,104,95]),
        True,"fixed"
    ),
    (
        "Lake Naivasha & Hell's Gate Day Trip",
        "lake-naivasha-hells-gate-day-trip","day-trip",1,0,125,
        ["naivasha"],"Land Cruiser / 4x4 Tour Van",
        ["Lake Naivasha & Hell's Gate National Park · Full Day"],
        daytrip_rows([450,275,217,188,170,159,125]),
        True,"fixed"
    ),
    (
        "Lake Naivasha Day Trip with Breakfast",
        "lake-naivasha-day-trip-breakfast","day-trip",1,0,165,
        ["naivasha"],"Land Cruiser / 4x4 Tour Van",
        ["Lake Naivasha · Breakfast Option · Full Day"],
        daytrip_rows([480,305,247,228,200,199,165]),
        False,"fixed"
    ),
    (
        "Lake Naivasha Day Trip with Lunch",
        "lake-naivasha-day-trip-lunch","day-trip",1,0,195,
        ["naivasha"],"Land Cruiser / 4x4 Tour Van",
        ["Lake Naivasha · Lunch Option · Full Day"],
        daytrip_rows([510,335,277,258,230,229,195]),
        False,"fixed"
    ),
    (
        "Lake Nakuru National Park Day Trip",
        "lake-nakuru-national-park-day-trip","day-trip",1,0,174,
        ["nakuru"],"Land Cruiser / 4x4 Tour Van",
        ["Lake Nakuru National Park · Full Day · 10-12 Hours"],
        daytrip_rows([516,364,250,216,196,183,174]),
        True,"fixed"
    ),
    (
        "Lake Nakuru Day Trip with Breakfast",
        "lake-nakuru-day-trip-breakfast","day-trip",1,0,204,
        ["nakuru"],"Land Cruiser / 4x4 Tour Van",
        ["Lake Nakuru National Park · Breakfast Option · Full Day"],
        daytrip_rows([546,394,280,246,226,213,204]),
        False,"fixed"
    ),
    (
        "Lake Nakuru Day Trip with Lunch",
        "lake-nakuru-day-trip-lunch","day-trip",1,0,234,
        ["nakuru"],"Land Cruiser / 4x4 Tour Van",
        ["Lake Nakuru National Park · Lunch Option · Full Day"],
        daytrip_rows([576,424,310,276,256,243,234]),
        False,"fixed"
    ),
    (
        "2-Day Amboseli Big Tusker Safari Experience",
        "2-day-amboseli-big-tusker-safari","wildlife-safari",2,1,330,
        ["amboseli"],"Amboseli Eco Camp",
        ["Nairobi to Amboseli National Park","Amboseli to Nairobi"],
        season_rows([930,560,455,385,355,330],[930,560,455,385,355,330],
                    [930,560,455,385,355,330],[930,560,455,385,355,330]),
        True,"fixed"
    ),
    (
        "2-Day Lake Nakuru Wildlife Safari",
        "2-day-lake-nakuru-wildlife-safari","wildlife-safari",2,1,460,
        ["nakuru"],"Lake Nakuru Lodge",
        ["Nairobi to Lake Nakuru","Lake Nakuru to Nairobi"],
        season_rows([1140,700,615,525,510,470],[1125,690,605,520,500,460],
                    [1125,690,605,520,500,460],[1140,700,615,525,510,470]),
        False,"fixed"
    ),
    (
        "3-Day Maasai Mara National Reserve Safari",
        "3-day-maasai-mara-national-reserve","wildlife-safari",3,2,800,
        ["mara"],"Mara Flair Camp",
        ["Nairobi to Maasai Mara","Maasai Mara National Reserve","Maasai Mara to Nairobi"],
        season_rows([1825,1215,1070,955,920,870],[1720,1145,990,885,845,800],
                    [1720,1145,990,885,845,800],[1825,1215,1070,955,920,870]),
        True,"fixed"
    ),
    (
        "4-Day Nakuru & Maasai Mara Private Safari",
        "4-day-nakuru-maasai-mara-private-safari","private-safari",4,3,1085,
        ["nakuru","mara"],"Mid-Range Safari Lodges & Camps",
        ["Nairobi to Lake Nakuru","Lake Nakuru to Maasai Mara","Maasai Mara National Reserve","Maasai Mara to Nairobi"],
        season_rows([2810,1905,1745,1560,1535,1445],[2625,1775,1600,1430,1395,1315],
                    [2240,1505,1330,1190,1150,1085],[2810,1905,1745,1560,1535,1445]),
        True,"fixed"
    ),
    (
        "5-Day Ol Pejeta, Nakuru & Maasai Mara Private Safari",
        "5-day-ol-pejeta-nakuru-maasai-mara","private-safari",5,4,1510,
        ["olpejeta","nakuru","mara"],"Sweetwaters / Nakuru Lodge / Enkorok",
        ["Nairobi to Ol Pejeta","Ol Pejeta to Lake Nakuru","Lake Nakuru to Maasai Mara","Maasai Mara National Reserve","Maasai Mara to Nairobi"],
        season_rows([3345,2265,2145,1905,1905,1785],[3065,2075,1925,1715,1695,1595],
                    [2945,1985,1825,1630,1605,1510],[3345,2265,2145,1905,1905,1785]),
        True,"fixed"
    ),
    (
        "6-Day Private Adventure Safari",
        "6-day-private-adventure-safari","private-safari",6,5,1690,
        ["amboseli","naivasha","nakuru","mara"],"Kibo / Sawela / Nakuru Lodge / Enkorok",
        ["Nairobi to Amboseli","Amboseli to Lake Naivasha","Lake Naivasha to Lake Nakuru","Lake Nakuru to Maasai Mara","Maasai Mara National Reserve","Maasai Mara to Nairobi"],
        season_rows([3875,2585,2440,2150,2150,2010],[3605,2390,2220,1960,1940,1815],
                    [3430,2265,2080,1835,1810,1690],[3875,2585,2440,2150,2150,2010],
                    [760,665,605,760]),
        True,"fixed"
    ),
    (
        "7-Day Kenya Major National Parks Safari",
        "7-day-kenya-major-national-parks","private-safari",7,6,2005,
        ["amboseli","naivasha","nakuru","mara"],"Kibo / Sawela / Nakuru Lodge / Enkorok",
        ["Nairobi to Amboseli","Amboseli Full Day","Amboseli to Lake Naivasha","Lake Naivasha to Lake Nakuru","Lake Nakuru to Maasai Mara","Maasai Mara Full Day","Maasai Mara to Nairobi"],
        season_rows([4625,3080,2925,2575,2585,2410],[4275,2830,2640,2325,2315,2160],
                    [4060,2675,2465,2170,2145,2005],[4625,3080,2925,2575,2585,2410],
                    [935,825,740,935]),
        True,"fixed"
    ),
    (
        "8-Day Flex Private Safari",
        "8-day-flex-private-safari","private-safari",8,7,2400,
        ["aberdare","olpejeta","nakuru","mara","naivasha","amboseli"],
        "Ark / Sweetwaters / Nakuru / Mara / Sawela / Kibo",
        ["Nairobi to Aberdare","Aberdare to Ol Pejeta","Ol Pejeta to Lake Nakuru","Lake Nakuru to Maasai Mara","Maasai Mara Full Day","Maasai Mara to Lake Naivasha","Lake Naivasha to Amboseli","Amboseli to Nairobi"],
        season_rows([5685,3745,3625,3170,3215,2980],[5025,3290,3100,2715,2715,2525],
                    [4830,3165,2955,2590,2580,2400],[5685,3745,3625,3170,3215,2980],
                    [1210,990,915,1210]),
        True,"fixed"
    ),
    (
        "Samburu Sopa Stargazing Safari",
        "samburu-sopa-stargazing-safari","special-interest-safari",4,3,735,
        ["samburu"],"Samburu Sopa Lodge",
        ["Nairobi to Samburu","Samburu National Reserve","Samburu National Reserve & Stargazing","Samburu to Nairobi"],
        season_rows([1545,1030,915,815,790,745],[1545,1030,915,815,790,745],
                    [1530,1025,905,805,780,735],[1545,1030,915,815,790,745],
                    [350,350,345,350]),
        True,"fixed"
    ),

    # Serve & Safari: current booking flow uses custom quote mode.
    (
        "4-Day Nakuru & Maasai Mara - Serve & Safari",
        "serve-safari-4-day-nakuru-maasai-mara","serve-and-safari",4,3,None,
        ["nakuru","mara"],"Mid-Range Option",
        ["Nairobi to Lake Nakuru","Lake Nakuru to Maasai Mara","Maasai Mara National Reserve","Maasai Mara to Nairobi"],
        season_rows([2715,1860,1715,1535,1515,1430],[2530,1730,1570,1410,1375,1300],
                    [2355,1600,1420,1275,1235,1170],[2715,1860,1715,1535,1515,1430]),
        True,"quote"
    ),
    (
        "5-Day Ol Pejeta, Nakuru & Maasai Mara - Serve & Safari",
        "serve-safari-5-day-ol-pejeta-nakuru-mara","serve-and-safari",5,4,None,
        ["olpejeta","nakuru","mara"],"Mid-Range Option",
        ["Nairobi to Ol Pejeta","Ol Pejeta to Lake Nakuru","Lake Nakuru to Maasai Mara","Maasai Mara National Reserve","Maasai Mara to Nairobi"],
        season_rows([3520,2350,2205,1945,1940,1815],[3235,2160,1980,1755,1730,1625],
                    [3115,2075,1885,1670,1640,1535],[3520,2350,2205,1945,1940,1815]),
        True,"quote"
    ),
    (
        "6-Day Private Safari Adventure - Serve & Safari",
        "serve-safari-6-day-private-adventure","serve-and-safari",6,5,None,
        ["amboseli","naivasha","nakuru","mara"],"Mid-Range Option",
        ["Nairobi to Amboseli","Amboseli to Lake Naivasha","Lake Naivasha to Lake Nakuru","Lake Nakuru to Maasai Mara","Maasai Mara National Reserve","Maasai Mara to Nairobi"],
        season_rows([4085,2685,2510,2205,2195,2040],[3810,2495,2290,2010,1985,1850],
                    [3640,2370,2150,1885,1850,1725],[4085,2685,2510,2205,2195,2040]),
        True,"quote"
    ),
    (
        "7-Day Kenyan Private Safari - Serve & Safari",
        "serve-safari-7-day-kenyan-private-safari","serve-and-safari",7,6,None,
        ["amboseli","naivasha","nakuru","mara"],"Mid-Range Option",
        ["Nairobi to Amboseli","Amboseli Full Day","Amboseli to Lake Naivasha","Lake Naivasha to Lake Nakuru","Lake Nakuru to Maasai Mara","Maasai Mara Full Day","Maasai Mara to Nairobi"],
        season_rows([4865,3200,3005,2635,2630,2450],[4520,2950,2720,2385,2360,2200],
                    [4300,2795,2545,2230,2195,2045],[4865,3200,3005,2635,2630,2450]),
        True,"quote"
    ),
    (
        "8-Day African Private Wildlife Safari - Serve & Safari",
        "serve-safari-8-day-african-wildlife","serve-and-safari",8,7,None,
        ["aberdare","olpejeta","nakuru","mara","naivasha","amboseli"],"Mid-Range Option",
        ["Nairobi to Aberdare","Aberdare to Ol Pejeta","Ol Pejeta to Lake Nakuru","Lake Nakuru to Maasai Mara","Maasai Mara Full Day","Maasai Mara to Lake Naivasha","Lake Naivasha to Amboseli","Amboseli to Nairobi"],
        season_rows([5960,3885,3715,3240,3270,3025],[5300,3430,3195,2785,2770,2570],
                    [5105,3305,3045,2660,2635,2445],[5960,3885,3715,3240,3270,3025]),
        True,"quote"
    ),
]


def validate_seed_data():
    """Fail before touching the DB if the catalog file is incomplete or malformed."""
    if len(DESTINATIONS) != 8:
        raise RuntimeError(
            f"Expected 8 destinations, found {len(DESTINATIONS)}"
        )

    if len(PACKAGES) != 29:
        raise RuntimeError(
            f"Expected 29 packages, found {len(PACKAGES)}"
        )

    destination_keys = {item["key"] for item in DESTINATIONS}
    if len(destination_keys) != len(DESTINATIONS):
        raise RuntimeError("Duplicate destination keys found")

    slugs = []
    day_trip_count = 0

    for package in PACKAGES:
        (
            name,
            slug,
            category,
            days,
            nights,
            display_from,
            dest_keys,
            accommodation,
            itinerary_titles,
            price_rows,
            featured,
            pricing_mode,
        ) = package

        slugs.append(slug)

        if len(itinerary_titles) != days:
            raise RuntimeError(
                f"{name}: itinerary has {len(itinerary_titles)} day(s), "
                f"but duration_days={days}"
            )

        unknown_destinations = set(dest_keys) - destination_keys
        if unknown_destinations:
            raise RuntimeError(
                f"{name}: unknown destination key(s): "
                f"{sorted(unknown_destinations)}"
            )

        if category == "day-trip":
            day_trip_count += 1
            if days != 1 or nights != 0:
                raise RuntimeError(
                    f"{name}: day trip must be 1 day / 0 nights"
                )

            if len(price_rows) != 1:
                raise RuntimeError(
                    f"{name}: expected one 2026 day-trip price row"
                )

            rates = price_rows[0][2]
            if len(rates) not in (7, 8):
                raise RuntimeError(
                    f"{name}: expected 7 or 8 party-size rates, "
                    f"found {len(rates)}"
                )

    if len(slugs) != len(set(slugs)):
        duplicates = sorted({slug for slug in slugs if slugs.count(slug) > 1})
        raise RuntimeError(f"Duplicate package slug(s): {duplicates}")

    if day_trip_count != 15:
        raise RuntimeError(
            f"Expected 15 day trips, found {day_trip_count}"
        )


def validate_schema():
    """Make sure the migrated DB model can actually hold this catalog."""
    price_columns = {column.name for column in PackagePrice.__table__.columns}
    required_price_columns = {
        "package_id",
        "season_name",
        "start_date",
        "end_date",
        "currency",
        "accommodation_level",
        "price_1_pax",
        "price_2_pax",
        "price_3_pax",
        "price_4_pax",
        "price_5_pax",
        "price_6_pax",
        "price_7_pax",
        "price_8_pax",
        "child_price",
    }

    missing = sorted(required_price_columns - price_columns)
    if missing:
        raise RuntimeError(
            "PackagePrice model is missing required column(s): "
            + ", ".join(missing)
        )

def seed_database():
    print("🌱 Starting Selvaggio full seed...")
    validate_seed_data()
    validate_schema()
    print("✅ Preflight: 8 destinations · 29 packages · 15 day trips")

    # Do not wipe real customer bookings.
    bookings = db.metadata.tables.get("bookings")
    if bookings is not None:
        count = db.session.execute(
            db.select(db.func.count()).select_from(bookings)
        ).scalar_one()
        if count:
            raise RuntimeError(
                f"Seed stopped: {count} booking(s) already exist. "
                "Use this reset seed only on a clean/dev database."
            )

    assoc = db.metadata.tables.get("package_destinations")
    if assoc is not None:
        db.session.execute(assoc.delete())

    PackagePrice.query.delete()
    PackageItinerary.query.delete()
    Package.query.delete()
    Destination.query.delete()
    AdminUser.query.delete()

    # IMPORTANT: no commit here. Deletes + inserts stay in ONE transaction.
    # If any later insert fails, the outer exception handler rolls everything back.

    dest = {}
    for raw in DESTINATIONS:
        data = dict(raw)
        key = data.pop("key")
        obj = Destination(**kw(Destination, data))
        db.session.add(obj)
        dest[key] = obj

    db.session.flush()
    print(f"✅ Destinations: {len(dest)}")

    for (
        name, slug, category, days, nights, display_from, dest_keys,
        accommodation, itinerary_titles, price_rows, featured, pricing_mode
    ) in PACKAGES:

        package = Package(**kw(Package, {
            "name": name,
            "slug": slug,
            "short_description": f"{days}-day Kenya safari journey with Selvaggio Safaris.",
            "description": f"A private {days}-day safari itinerary designed around {', '.join(dest[k].name for k in dest_keys)}.",
            "category": category,
            "duration_days": days,
            "duration_nights": nights,
            "price": display_from,
            "currency": "USD",
            "image": f"/images/packages/{slug}.jpg",
            "highlights": [dest[k].name for k in dest_keys],
            "inclusions": (
                NAIROBI_DAYTRIP_INCLUSIONS
                if days == 1 and "nairobi" in dest_keys
                else ([] if days == 1 else COMMON_INCLUSIONS)
            ),
            "exclusions": ([] if days == 1 else COMMON_EXCLUSIONS),
            "optional_extras": ([] if days == 1 else COMMON_EXTRAS),
            "featured": featured,
            "active": True,
            "pricing_mode": pricing_mode,
        }))
        db.session.add(package)
        db.session.flush()

        package.destinations = [dest[k] for k in dest_keys]

        for day_no, title in enumerate(itinerary_titles, start=1):
            db.session.add(PackageItinerary(**kw(PackageItinerary, {
                "package_id": package.id,
                "day_number": day_no,
                "title": title,
                "description": f"Day {day_no}: {title}. Private safari arrangements, meals and game-viewing activities follow the package programme.",
            })))

        for start, end, rates, child in price_rows:
            db.session.add(PackagePrice(**kw(PackagePrice, {
                "package_id": package.id,
                "season_name": f"{start.strftime('%d %b %Y')} - {end.strftime('%d %b %Y')}",
                "start_date": start,
                "end_date": end,
                "currency": "USD",
                "accommodation_level": accommodation[:50],
                "price_1_pax": rate_at(rates, 1),
                "price_2_pax": rate_at(rates, 2),
                "price_3_pax": rate_at(rates, 3),
                "price_4_pax": rate_at(rates, 4),
                "price_5_pax": rate_at(rates, 5),
                "price_6_pax": rate_at(rates, 6),
                "price_7_pax": rate_at(rates, 7),
                "price_8_pax": rate_at(rates, 8),
                "child_price": child,
            })))

    admin_email = os.getenv("SEED_ADMIN_EMAIL", "admin@selvaggiosafaris.com")
    admin_password = os.getenv("SEED_ADMIN_PASSWORD", "ChangeMe123!")

    admin = AdminUser(**kw(AdminUser, {
        "name": "Selvaggio Admin",
        "email": admin_email.lower(),
        "role": "admin",
        "active": True,
    }))

    if not hasattr(admin, "set_password"):
        raise RuntimeError("AdminUser.set_password() not found.")

    admin.set_password(admin_password)
    db.session.add(admin)
    db.session.commit()

    print("🎉 Seed complete")
    print(f"   Destinations : {Destination.query.count()}")
    print(f"   Packages     : {Package.query.count()}")
    print(f"   Itinerary    : {PackageItinerary.query.count()}")
    print(f"   Price rows   : {PackagePrice.query.count()}")
    print(f"   Admin users  : {AdminUser.query.count()}")
    print("")
    print("Next:")
    print("  curl http://127.0.0.1:5000/api/destinations")
    print("  curl http://127.0.0.1:5000/api/packages")


if __name__ == "__main__":
    with app.app_context():
        try:
            seed_database()
        except Exception:
            db.session.rollback()
            print(
                "❌ Seed failed. The transaction was rolled back; "
                "no partial catalog changes were committed."
            )
            raise