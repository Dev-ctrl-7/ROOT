import { getStateTheme, StateTheme } from "./theme-system";

export interface FoodPillar {
  title: string;
  signatureDish: string;
  famousSweet: string;
  traditionalBreakfast: string;
  iconicIngredients: string[];
  foodStory: string;
  heroImage: string;
  heroCaption: string;
}

export interface GamePillar {
  name: string;
  localName: string;
  category: string;
  boardType: string;
  instructions: string;
  culturalSignificance: string;
  illustratedBoardSvgType: "grid" | "mancala" | "spiral" | "cross_circle" | "outdoor";
}

export interface TextilePillar {
  signatureWeave: string;
  traditionalAttire: string;
  heirloomJewelry: string;
  craftTechnique: string;
  historicalOrigins: string;
  heroImage: string;
  heroCaption: string;
}

export interface CelebrationPillar {
  majorFestival: string;
  danceForm: string;
  folkMusic: string;
  celebrationRitual: string;
  heroImage: string;
  heroCaption: string;
}

export interface PlacesPillar {
  iconicMonument: string;
  naturalWonder: string;
  hiddenHeritage: string;
  architecturalStyle: string;
  heroImage: string;
  heroCaption: string;
}

export interface LivingHeritagePillar {
  traditionalCraft: string;
  artForm: string;
  regionalLanguage: string;
  oralLegend: string;
  architecturalPinnacle: string;
}

export interface AtlasPillar {
  capital: string;
  majorRivers: string[];
  mountainRanges: string[];
  coordinates: string;
  svgPathId: string;
  culturalLandmarks: Array<{
    name: string;
    coordinates: string;
    significance: string;
  }>;
}

export interface StateData {
  id: string;
  name: string;
  nativeName: string;
  nativeScript: string;
  category: "state" | "union-territory";
  zone: "North" | "South" | "West" | "East" | "Central" | "North-East";
  theme: StateTheme;
  epoch: string;
  introduction: string;
  curatorQuote: string;
  curatorAuthor: string;
  heroImage: string;
  heroFallback: string;
  taste: FoodPillar;
  games: GamePillar;
  textiles: TextilePillar;
  celebration: CelebrationPillar;
  places: PlacesPillar;
  livingHeritage: LivingHeritagePillar;
  atlas: AtlasPillar;
}

export const ALL_INDIAN_STATES: StateData[] = [
  // 1. RAJASTHAN (Flagship Royal Burgundy)
  {
    id: "rajasthan",
    name: "Rajasthan",
    nativeName: "राजस्थान",
    nativeScript: "Devanagari",
    category: "state",
    zone: "North",
    theme: getStateTheme("rajasthan"),
    epoch: "6th Century CE — Rajput Dynasties & Marwar Trade Routes",
    introduction:
      "A timeless desert realm where ochre fortresses rise like mirages from the Thar Desert. Rajasthan is an intoxicating celebration of chivalric poetry, royal jharokha architecture, miniature Pichwai paintings, and vibrant tie-dye silk textiles crafted against the vast horizon.",
    curatorQuote: "In Rajasthan, even the sand dunes remember the rhythmic beat of the nagada and the rustle of royal ghoomar skirts.",
    curatorAuthor: "Oral Ballads of Marwar Court Bards",
    heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--3aNrsgmr--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/aa/5d/92/aa5d9273ec5f92954c510d75f4f1b19f.jpg?_a=BAMAROWQ0",
    heroFallback: "https://res.cloudinary.com/tecwmb40/image/fetch/s--3aNrsgmr--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/aa/5d/92/aa5d9273ec5f92954c510d75f4f1b19f.jpg?_a=BAMAROWQ0",
    taste: {
      title: "Royal Thali & Desert Sustenance",
      signatureDish: "Dal Baati Churma (Hard wheat rolls baked over cowdung coals, crushed with desi ghee and spiced lentils)",
      famousSweet: "Ghevar (Honeycomb disc soaked in saffron syrup, crowned with mawa and silver leaf)",
      traditionalBreakfast: "Pyaaz Kachori with spicy tamarind and mint chutney",
      iconicIngredients: ["Sangri (Desert beans)", "Ker (Wild sour berries)", "Mathania Red Chillies", "Ghee", "Gram Flour"],
      foodStory:
        "Desert warfare and scarce water sculpted a cuisine that relies on milk, buttermilk, and pure ghee rather than water. Food was engineered to last for weeks on camelback without spoiling.",
      heroImage: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "A traditional copper thali laden with ghee-drenched baatis, sangri, and saffron sweets."
    },
    games: {
      name: "Chaupar / Pachisi",
      localName: "चौपड़ (Chaupar)",
      category: "Cross-and-Circle Strategic Board Game",
      boardType: "Embroidered Cross Cloth with Cowrie Shell Dice",
      instructions:
        "Played by 4 players using 6 or 7 cowrie shells as dice. Tokens journey from the outer corners down the central trunk into the sacred home square (Char-koni), capturing opposing pawns along the way.",
      culturalSignificance:
        "Played for millennia in Rajput royal courtyards; Emperor Akbar constructed a human-sized Chaupar board paved with marble at Fatehpur Sikri where palace handmaidens acted as living game pieces.",
      illustratedBoardSvgType: "cross_circle"
    },
    textiles: {
      signatureWeave: "Bandhani & Leheriya (Fine tie-dye) and Kota Doria woven with pure Zari",
      traditionalAttire: "Ghagra-Choli with translucent Odhani dupatta & Angrakha with colorful Turbans (Paggar)",
      heirloomJewelry: "Kundan Meenakari (Enamelled gold inlaid with uncut polki diamonds), Borla forehead ornament & Aad necklace",
      craftTechnique: "Tying thousands of tiny rice-grain knots with thread before dipping in vibrant vegetable dyes.",
      historicalOrigins: "Patronized by the Sisodias of Mewar and Kachhwahas of Jaipur since the 14th century.",
      heroImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Bandhani silk odhani rippling with thousands of hand-tied resist-dyed dots."
    },
    celebration: {
      majorFestival: "Pushkar Camel Fair & Desert Festival Jaisalmer",
      danceForm: "Ghoomar (Graceful pirouetting dance of royal women) and Kalbelia (Snake-charmer gypsies)",
      folkMusic: "Maand, played on Kamaicha, Sarangi, and Khartal by Manganiyar & Langa master musicians",
      celebrationRitual: "Lighting thousand brass ghee lamps on the steps of Pushkar lake under the Kartik Purnima full moon.",
      heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--ITAni31q--/c_fill,f_auto,g_auto,h_750,q_auto,w_1000/https://i.pinimg.com/736x/02/85/69/02856995ce49f480cbfe71ad10da1ac2.jpg?_a=BAMAROWQ0",
      heroCaption: "Rajasthani folk dancers celebrating cultural festivals in traditional vibrant attire."
    },
    places: {
      iconicMonument: "Hawa Mahal (Palace of Winds) & Mehrangarh Fort",
      naturalWonder: "Sam Sand Dunes of the Great Thar Desert",
      hiddenHeritage: "Chand Baori (3,500 symmetrical geometric steps stepwell at Abhaneri)",
      architecturalStyle: "Rajput Jharokha balconies, carved stone brackets, and chhatri pavilions",
      heroImage: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Chand Baori stepwell's hypnotic geometrical descending stone steps."
    },
    livingHeritage: {
      traditionalCraft: "Blue Pottery of Jaipur, Mojari leather embroidery & Thewa gold-on-glass work",
      artForm: "Pichwai Temple Paintings of Nathdwara & Kishangarh Bani Thani Miniatures",
      regionalLanguage: "Rajasthani (Marwari, Mewari, Dhundhari)",
      oralLegend: "The ballad of Dhola-Maru: star-crossed lovers who traversed sand dunes on a white camel.",
      architecturalPinnacle: "Intricate sandstone screen jali windows that act as ancient passive air conditioning."
    },
    atlas: {
      capital: "Jaipur (The Pink City)",
      majorRivers: ["Chambal", "Banas", "Luni"],
      mountainRanges: ["Aravalli Range (Oldest fold mountains on Earth)"],
      coordinates: "27.0238° N, 74.2179° E",
      svgPathId: "RJ",
      culturalLandmarks: [
        { name: "Mehrangarh Fort", coordinates: "Jodhpur", significance: "Impregnable citadel perched 410 feet above blue rooftops" },
        { name: "Hawa Mahal", coordinates: "Jaipur", significance: "953 latticed honeycomb jharokhas built in 1799" },
        { name: "Lake Pichola", coordinates: "Udaipur", significance: "Floating marble white palace mirrored on glassy mountain waters" }
      ]
    }
  },

  // 2. TAMIL NADU (Flagship Temple Bronze & Terracotta)
  {
    id: "tamil-nadu",
    name: "Tamil Nadu",
    nativeName: "தமிழ்நாடு",
    nativeScript: "Tamil",
    category: "state",
    zone: "South",
    theme: getStateTheme("tamil-nadu"),
    epoch: "6th Century BCE — Sangam Literature, Pandyas, Cholas & Pallavas",
    introduction:
      "A monumental sanctuary of Dravidian stone architecture, classical Carnatic music, and living Sangam heritage. Towering polychromatic gopurams pierce the tropical skies, sacred bronze foundries chant centuries-old metallurgical verses, and banana-leaf feasts awaken the soul.",
    curatorQuote: "Tamil is not just a language; it is the fragrance of crushed jasmine, the rhythm of nadaswaram, and stone carved to outlive time.",
    curatorAuthor: "Sangam Anthology, Purananuru",
    heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--QCayZndP--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/36/bc/3e/36bc3ea596a0c00f134e34d3b6e8f2d8.jpg?_a=BAMAROWQ0",
    heroFallback: "https://res.cloudinary.com/tecwmb40/image/fetch/s--QCayZndP--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/36/bc/3e/36bc3ea596a0c00f134e34d3b6e8f2d8.jpg?_a=BAMAROWQ0",
    taste: {
      title: "Cauvery Harvest & Temple Prasadam",
      signatureDish: "Chettinad Pepper Kozhambu on Plantain Leaf & Ven Pongal with whole cashews",
      famousSweet: "Tirunelveli Halwa (Wheat milk slow-simmered in ghee) & Madurai Jigarthanda",
      traditionalBreakfast: "Crisp Medu Vada, steamed Idlis and fragrant brass Davarah Filter Coffee",
      iconicIngredients: ["Tellicherry Peppercorns", "Kalpasi (Black stone flower)", "Curry Leaves", "Gingelly Oil", "Tamarind"],
      foodStory:
        "Every spice is balanced according to ancient Siddha medicine. Dishes cooked in soapstone kalchatti retain heat and mellow the fiery bite of freshly ground pepper and shallots.",
      heroImage: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Steaming temple Pongal with roasted cashews, black pepper, and pure ghee."
    },
    games: {
      name: "Pallanguzhi",
      localName: "பல்லாங்குழி (Pallanguzhi)",
      category: "Mancala Count-and-Capture Game",
      boardType: "Two rows of seven carved cups in teak or brass, played with cowrie shells or tamarind seeds",
      instructions:
        "Players drop cowrie shells into adjacent cups in clockwise motion. When a cup contains four seeds, it becomes a 'Pasu' (cow) and is captured. Teaches mental arithmetic, foresight, and resource allocation.",
      culturalSignificance:
        "Historically played by women in central courtyards during afternoon heat, referenced in classical Sangam literature as a sacred ritual of harmony.",
      illustratedBoardSvgType: "mancala"
    },
    textiles: {
      signatureWeave: "Kanjeevaram Mulberry Silk with pure Gold Zari and Madurai Sungudi",
      traditionalAttire: "Nine-yard Madisar / Kanjeevaram Pattu Saree and Men's Veshti with Gold Zari Border",
      heirloomJewelry: "Temple Jewelry (Uncut cabochon rubies, emeralds and pearls set in 22k gold repoussé) & Kemp Vanki armlet",
      craftTechnique: "Korvai interlock weaving joining the body and border using three shuttles.",
      historicalOrigins: "Kanchipuram weavers claim descent from Sage Markandeya, weaver to the gods.",
      heroImage: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Heavy Kanjeevaram silk saree shimmering with woven gold temple motifs."
    },
    celebration: {
      majorFestival: "Thai Pongal (Harvest Thanksgiving) & Madurai Chithirai Thiruvizha",
      danceForm: "Bharatanatyam (The classical cosmic dance of Nataraja)",
      folkMusic: "Carnatic concerts with Nadaswaram, Thavil, Ghatam and Mridangam",
      celebrationRitual: "Boiling fresh milk and harvest rice in earthen pots until it overflows with shouts of 'Pongalo Pongal!'.",
      heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--ghQ2Ee5---/c_fill,f_auto,g_auto,h_750,q_auto,w_1000/https://i.pinimg.com/736x/bc/f7/14/bcf714ed1f1d9b6cf603960e7847937a.jpg?_a=BAMAROWQ0",
      heroCaption: "Bharatanatyam dancer in classical temple pose adorned with temple gold jewelry."
    },
    places: {
      iconicMonument: "Brihadisvara Temple, Thanjavur (1010 CE Great Living Chola Temple)",
      naturalWonder: "Dolphin's Nose & Nilgiri Cloud Forests",
      hiddenHeritage: "Chettinad 1000-Window Mansions of Kanadukathan & Swamimalai Bronze Foundries",
      architecturalStyle: "Dravidian granite vimanas, interlocking stone masonry, and pillared mandapams",
      heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--YjiRUP8e--/c_fill,f_auto,g_auto,h_750,q_auto,w_1200/https://i.pinimg.com/736x/36/bc/3e/36bc3ea596a0c00f134e34d3b6e8f2d8.jpg?_a=BAMAROWQ0",
      heroCaption: "The 216-foot monolithic granite tower of Thanjavur Big Temple at sunset."
    },
    livingHeritage: {
      traditionalCraft: "Swamimalai Lost-Wax Bronze Casting (GI) & Thanjavur Gold Foil Paintings",
      artForm: "Tanjore Painting (Embossed gold foil encrusted with Jaipur semi-precious stones)",
      regionalLanguage: "Tamil (One of the oldest surviving classical languages in the world)",
      oralLegend: "The epic of Silappadikaram: Kannagi's anklet and the fiery defense of justice in Madurai court.",
      architecturalPinnacle: "Granite musical pillars in Madurai and Nellaiappar temples that produce musical swaras when tapped."
    },
    atlas: {
      capital: "Chennai",
      majorRivers: ["Cauvery", "Vaigai", "Thamirabarani"],
      mountainRanges: ["Western Ghats", "Nilgiri Hills", "Eastern Ghats"],
      coordinates: "11.1271° N, 78.6569° E",
      svgPathId: "TN",
      culturalLandmarks: [
        { name: "Meenakshi Temple", coordinates: "Madurai", significance: "14 monumental gopurams decorated with 33,000 stucco sculptures" },
        { name: "Brihadisvara Temple", coordinates: "Thanjavur", significance: "Monolithic 80-tonne granite dome raised without mortar in 1010 CE" },
        { name: "Nilgiri Mountain Railway", coordinates: "Ooty", significance: "UNESCO rack-and-pinion steam train ascending pine ravines" }
      ]
    }
  },

  // 3. KERALA (Peacock Teal & Deep Botanical Green)
  {
    id: "kerala",
    name: "Kerala",
    nativeName: "കേരളം",
    nativeScript: "Malayalam",
    category: "state",
    zone: "South",
    theme: getStateTheme("kerala"),
    epoch: "Ancient Maritime Spice Trade — Chera Dynasty & Muziris Port",
    introduction:
      "A serene emerald sanctuary cradled between the misty Western Ghats and the Arabian Sea. Renowned for tranquil backwaters, fragrant cardamom plantations, spellbinding Theyyam rituals, and an unbroken tradition of classical Ayurveda and martial arts.",
    curatorQuote: "The green of Kerala is not a color; it is a living breath rising from wet paddy leaves and falling into backwater canals.",
    curatorAuthor: "Folk Songs of the Vembanad Boatmen",
    heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--QNJZSmX3--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/24/59/3e/24593ea5f4cb7bc52e956de7275a4a4e.jpg?_a=BAMAROWQ0",
    heroFallback: "https://res.cloudinary.com/tecwmb40/image/fetch/s--QNJZSmX3--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/24/59/3e/24593ea5f4cb7bc52e956de7275a4a4e.jpg?_a=BAMAROWQ0",
    taste: {
      title: "The Grand Onam Sadya",
      signatureDish: "Sadya Feast (26 vegetarian delicacies served on a banana leaf with Kerala red rice, Avial and Sambar)",
      famousSweet: "Palada Pradhaman (Steamed rice flakes slow-simmered in sweetened cow's milk with cardamom)",
      traditionalBreakfast: "Appam with vegetable stew & Puttu with Kadala Curry",
      iconicIngredients: ["Fresh Coconut Oil", "Green Cardamom", "Malabar Black Pepper", "Curry Leaves", "Kodampuli (Garcinia cambogia)"],
      foodStory:
        "The ancient global spice route began here. Arab, Roman, and Chinese traders crossed oceans for Malabar pepper, giving birth to a culinary tradition steeped in coconut and roasted whole spices.",
      heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s---UvqEqNJ--/c_fill,f_auto,g_auto,h_750,q_auto,w_1000/https://i.pinimg.com/736x/6d/ab/48/6dab48a83118d9953bb919c94d154558.jpg?_a=BAMAROWQ0",
      heroCaption: "The colorful feast of Onam Sadya served on a fresh plantain leaf."
    },
    games: {
      name: "Vallam Kali & Kuttiyum Kolum",
      localName: "കുട്ടിയും കോലും (Kuttiyum Kolum)",
      category: "Ancient Traditional Outdoor & Water Games",
      boardType: "Two sticks (one long, one short) played in open village grounds / Snake boats on rivers",
      instructions:
        "The small stick (kutti) is placed across a shallow hole and flicked high into the air with the long stick (kolum), testing agility, coordination, and reflex.",
      culturalSignificance:
        "Shared childhood tradition across rural Kerala; mirrors the coordinated teamwork celebrated in the Nehru Trophy snake boat races.",
      illustratedBoardSvgType: "outdoor"
    },
    textiles: {
      signatureWeave: "Kasavu Handloom (Unbleached off-white cotton woven with pure gold zari borders)",
      traditionalAttire: "Mundum Neriyathum (Two-piece graceful ivory attire) for women and Mundu for men",
      heirloomJewelry: "Nagapada Thali (Snake-hood necklace with cabochon stones), Palakka Mala & Mullamottu Mala (Jasmine bud necklace)",
      craftTechnique: "Balaramapuram and Chendamangalam pit-loom hand-weaving of natural undyed cotton yarns.",
      historicalOrigins: "Worn since the Chera era; celebrated for its pristine, minimalist elegance.",
      heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--0b9O-p4d--/c_fill,f_auto,g_auto,h_750,q_auto,w_1000/https://i.pinimg.com/736x/e1/18/b0/e118b02c63b1fd00649fb21b95e3440b.jpg?_a=BAMAROWQ0",
      heroCaption: "Traditional Kasavu saree with handwoven gold zari borders on pure cotton."
    },
    celebration: {
      majorFestival: "Onam (Harvest homecoming of King Mahabali) & Thrissur Pooram",
      danceForm: "Kathakali (Classical dance-drama with stylized makeup) & Mohiniyattam (Dance of the enchantress)",
      folkMusic: "Chenda Melam & Panchavadyam (Hypnotic temple drumming by 100+ percussionists)",
      celebrationRitual: "Theyyam: Shamans donning colossal headdresses embodying deities in sacred forest groves.",
      heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--2nlP6dFQ--/c_fill,f_auto,g_auto,h_750,q_auto,w_1000/https://i.pinimg.com/736x/8f/df/3c/8fdf3c1f96d8166ab48e165867c0cf57.jpg?_a=BAMAROWQ0",
      heroCaption: "Onam celebration with traditional vibrant flower carpet (Athapookkalam) and sacred brass lamp."
    },
    places: {
      iconicMonument: "Bekal Fort & Padmanabhaswamy Temple",
      naturalWonder: "Vembanad Lake Backwaters & Athirappilly Waterfalls",
      hiddenHeritage: "Aranmula Metal Mirror Workshops & Marayoor Sandalwood Forests",
      architecturalStyle: "Sloping red terracotta gabled roofs engineered to withstand 3,000mm of monsoon rain",
      heroImage: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Houseboat gliding gently through backwater palms at sunrise."
    },
    livingHeritage: {
      traditionalCraft: "Aranmula Kannadi (Unique handmade front-surface polished metal alloy mirrors, GI)",
      artForm: "Kalaripayattu (One of the oldest martial arts in the world) & Kerala Temple Murals",
      regionalLanguage: "Malayalam",
      oralLegend: "Parashurama threw his battle axe into the ocean, and from the receded waves arose God's Own Country.",
      architecturalPinnacle: "Nalukettu: Traditional quadrangle homestead with open central courtyard (Nadumuttam)."
    },
    atlas: {
      capital: "Thiruvananthapuram",
      majorRivers: ["Periyar", "Bharathappuzha", "Pamba"],
      mountainRanges: ["Anamudi (Highest peak in South India)", "Cardamom Hills"],
      coordinates: "10.8505° N, 76.2711° E",
      svgPathId: "KL",
      culturalLandmarks: [
        { name: "Alleppey Backwaters", coordinates: "Alappuzha", significance: "Network of 900 km of serene palm-fringed canals and lagoons" },
        { name: "Fort Kochi", coordinates: "Kochi", significance: "Historic trading port with 14th-century Chinese fishing nets" },
        { name: "Munnar", coordinates: "Idukki", significance: "Rolling green tea terraces blanketed in mist at 5,000 feet elevation" }
      ]
    }
  },

  // 4. PUNJAB (Mustard Gold & Warm Cream)
  {
    id: "punjab",
    name: "Punjab",
    nativeName: "ਪੰਜਾਬ",
    nativeScript: "Gurmukhi",
    category: "state",
    zone: "North",
    theme: getStateTheme("punjab"),
    epoch: "Vedic Antiquity, Indus Civilization & Sikh Empire (Maharaja Ranjit Singh)",
    introduction:
      "The golden granary of India, bounded by five legendary rivers. A land of boundless hospitality, stirring devotional hymns from the Golden Temple, vibrant harvest celebrations, and heroic oral traditions etched in mustard-gold fields.",
    curatorQuote: "Where the dhol beats, the soul cannot stand still; Punjab is life lived at the fullest pitch of the heart.",
    curatorAuthor: "Sufi Poetry of Bulleh Shah",
    heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--apyUseEI--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/b8/82/d1/b882d138d81e29b50cc561842895c9f1.jpg?_a=BAMAROWQ0",
    heroFallback: "https://res.cloudinary.com/tecwmb40/image/fetch/s--apyUseEI--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/b8/82/d1/b882d138d81e29b50cc561842895c9f1.jpg?_a=BAMAROWQ0",
    taste: {
      title: "Dhabas & The Golden Harvest",
      signatureDish: "Sarson da Saag & Makki di Roti (Mustard greens slow-cooked with white country butter)",
      famousSweet: "Pinni (Wheat and dry fruits roasted in desi ghee) & Jalebi with Rabri",
      traditionalBreakfast: "Amritsari Kulcha with Chole and a tall brass tumbler of sweet lassi",
      iconicIngredients: ["White Butter (Makhan)", "Mustard Greens", "Fenugreek", "Desi Ghee", "Wheat"],
      foodStory:
        "The community kitchen (Langar) feeds tens of thousands daily without distinction of caste, creed, or wealth—a philosophy where cooking is considered the highest form of selfless seva.",
      heroImage: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Fresh Makki di Roti crowned with melting country butter and mustard saag."
    },
    games: {
      name: "Gilli Danda & Pehlwani",
      localName: "ਗੁੱਲੀ ਡੰਡਾ (Gilli Danda)",
      category: "Ancient Outdoor Bat-and-Ball Game",
      boardType: "Wooden oval peg and striking stick in open village harvest fields",
      instructions:
        "Played by striking a small wooden tapered peg with a longer stick so it spins in the air, then hitting it across the fields before outfielders catch it.",
      culturalSignificance:
        "Centuries-old folk pastime that inspired cricket and rounders, played on the edges of golden wheat fields after harvest.",
      illustratedBoardSvgType: "outdoor"
    },
    textiles: {
      signatureWeave: "Phulkari Embroidery (Flower work on handspun khaddar fabric)",
      traditionalAttire: "Salwar Kameez with vibrant Phulkari Dupatta & Kurta Pajama with Turban (Pugg)",
      heirloomJewelry: "Jhumkis, Saggi Phul (Enamelled bridal headpiece) & Gold Kada",
      craftTechnique: "Darning stitch done on the reverse side of coarse cotton using untwisted silk floss (pat).",
      historicalOrigins: "Folk embroidery passed as bridal heirloom from mothers and grandmothers.",
      heroImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Intricate geometric Phulkari embroidery stitched with vibrant silk threads."
    },
    celebration: {
      majorFestival: "Baisakhi (Spring Harvest & Khalsa founding) & Lohri bonfire",
      danceForm: "Bhangra (High-energy harvest dance) and Giddha (Graceful clapping dance of women)",
      folkMusic: "Tumbi, Algoza, Dhol, and Boliyan folk couplets",
      celebrationRitual: "Dancing around the sacred winter Lohri bonfire, offering sesame seeds, jaggery, and puffed rice.",
      heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Bhangra performers in bright mustard and gold attire leaping to the rhythm of dhol."
    },
    places: {
      iconicMonument: "Harmandir Sahib (The Golden Temple), Amritsar",
      naturalWonder: "Harike Wetland Bird Sanctuary",
      hiddenHeritage: "Qila Mubarak, Bathinda (One of the oldest forts in India, dating to 100 CE)",
      architecturalStyle: "Sikh architecture blending Rajput jharokhas with Mughal domes and copper-gold repoussé",
      heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--kKFjm-g4--/c_fill,f_auto,g_auto,h_750,q_auto,w_1200/https://i.pinimg.com/736x/b8/82/d1/b882d138d81e29b50cc561842895c9f1.jpg?_a=BAMAROWQ0",
      heroCaption: "Harmandir Sahib's gold facade glowing in the sacred water tank at twilight."
    },
    livingHeritage: {
      traditionalCraft: "Thatheras of Jandiala Guru (UNESCO GI-tagged beaten brass and copper utensil craft)",
      artForm: "Phulkari needlework & Giddha oral song poetry",
      regionalLanguage: "Punjabi",
      oralLegend: "The epic romance of Heer-Ranjha penned by Waris Shah, sung across Sufi shrines.",
      architecturalPinnacle: "Gold-gilded copper leaf cladding and pietre dure floral inlays of the Golden Temple sanctum."
    },
    atlas: {
      capital: "Chandigarh",
      majorRivers: ["Sutlej", "Beas", "Ravi"],
      mountainRanges: ["Shivalik Foothills"],
      coordinates: "31.1471° N, 75.3412° E",
      svgPathId: "PB",
      culturalLandmarks: [
        { name: "Golden Temple", coordinates: "Amritsar", significance: "Spiritual epicenter of Sikhism plated with 500 kg of pure gold" },
        { name: "Virasat-e-Khalsa", coordinates: "Anandpur Sahib", significance: "Museum celebrating 500 years of Sikh heritage" },
        { name: "Jallianwala Bagh", coordinates: "Amritsar", significance: "Sacred national memorial of the freedom struggle" }
      ]
    }
  },

  // 5. GUJARAT (Saffron & Burnt Orange)
  {
    id: "gujarat",
    name: "Gujarat",
    nativeName: "ગુજરાત",
    nativeScript: "Gujarati",
    category: "state",
    zone: "West",
    theme: getStateTheme("gujarat"),
    epoch: "Indus Valley (Lothal & Dholavira), Solanki Dynasty & Global Maritime Trade",
    introduction:
      "A land of extraordinary mercantile genius, ancient stepwells, and desert craft mastery. Home to the white salt deserts of the Rann of Kutch, world-famed double-ikat Patola silks, and nine nights of intoxicating Navratri Garba dancing.",
    curatorQuote: "In Gujarat, commerce and devotion weave together as seamlessly as the warp and weft of a Patan Patola.",
    curatorAuthor: "Jain Guild Inscriptions, 12th Century",
    heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--5m9R0R0q--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/09/34/1a/09341aa90ff04ba3266f0732c122688d.jpg?_a=BAMAROWQ0",
    heroFallback: "https://res.cloudinary.com/tecwmb40/image/fetch/s--5m9R0R0q--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/09/34/1a/09341aa90ff04ba3266f0732c122688d.jpg?_a=BAMAROWQ0",
    taste: {
      title: "The Subtle Kathiawadi Table",
      signatureDish: "Undhiyu with Puri (Slow-cooked winter vegetables in earthen pots) & Thepla",
      famousSweet: "Mohanthal (Roasted gram flour fudge with saffron) & Shrikhand",
      traditionalBreakfast: "Khaman Dhokla, Jalebi-Fafda and Fried Green Chillies",
      iconicIngredients: ["Jaggery", "Asafoetida (Hing)", "Sesame Seeds", "Peanut Oil", "Green Chillies"],
      foodStory:
        "The quintessential Gujarati Thali balances sweet, sour, spicy, and salty in a single meal, with a pinch of jaggery even in savoury lentil dals.",
      heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--9f78nN6H--/c_fill,f_auto,g_auto,h_750,q_auto,w_1000/https://i.pinimg.com/736x/23/62/b8/2362b85a9eb497373e67860e5329ce41.jpg?_a=BAMAROWQ0",
      heroCaption: "Authentic Gujarati Undhiyu served with freshly fried puris and traditional festive accompaniments."
    },
    games: {
      name: "Chopat (Chaupar)",
      localName: "ચોપાટ (Chopat)",
      category: "Ancient Cloth Board Game",
      boardType: "Red felt cross-shaped board played with cowries and wooden pieces",
      instructions:
        "Players maneuver tokens around a four-armed cross board determined by throws of six cowrie shells, navigating safe squares (charkoni).",
      culturalSignificance:
        "Popular post-lunch game in Pols (traditional heritage community clusters) of Ahmedabad.",
      illustratedBoardSvgType: "cross_circle"
    },
    textiles: {
      signatureWeave: "Patan Patola (Double Ikat where warp and weft are both tie-dyed before weaving)",
      traditionalAttire: "Chaniya Choli adorned with abhala (mirror-work) and Kediyu for men",
      heirloomJewelry: "Kandora silver waist chain, Damini head ornament & Pachhikam jewelry",
      craftTechnique: "Double-Ikat weaving so precise that both sides of the silk fabric look identical.",
      historicalOrigins: "A single genuine Patan Patola takes six months to weave and can last 300 years.",
      heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--ZVqgfLpN--/c_fill,f_auto,g_auto,h_750,q_auto,w_1000/https://i.pinimg.com/736x/6c/f1/e0/6cf1e0a3d3c09ff7f1382f6f0e1b6da4.jpg?_a=BAMAROWQ0",
      heroCaption: "Traditional vibrant mirror-work Chaniya Choli worn during Navratri and Gujarati festive celebrations."
    },
    celebration: {
      majorFestival: "Navratri (World's longest dance festival) & Uttarayan (International Kite Festival)",
      danceForm: "Garba & Dandiya Raas (Rhythmic clapping and wooden stick dances in concentric circles)",
      folkMusic: "Dayro poetry and music played on Jhanjh, Manjira and Dholak",
      celebrationRitual: "Millions dancing in synchronized circles beneath night skies celebrating Goddess Durga.",
      heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--nKyb2S-V--/c_fill,f_auto,g_auto,h_750,q_auto,w_1000/https://i.pinimg.com/736x/83/55/1d/83551d823201df1fdc8b9ead6ee44aa3.jpg?_a=BAMAROWQ0",
      heroCaption: "Vibrant Navratri Garba night celebration with dancers twirling in rhythmic devotion beneath festive lights."
    },
    places: {
      iconicMonument: "Rani ki Vav (The Queen's Stepwell, UNESCO Heritage) & Modhera Sun Temple",
      naturalWonder: "The Great Rann of Kutch (Vast white salt marsh desert)",
      hiddenHeritage: "Lothal Archaeological Site (Oldest engineered tidal dockyard in the world, 2400 BCE)",
      architecturalStyle: "Solanki-Maru-Gurjara temple carving with intricately sculpted stepwells (vavs)",
      heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--eKTVt1az--/c_fill,f_auto,g_auto,h_750,q_auto,w_1200/https://i.pinimg.com/736x/79/56/33/795633ca41942c0bdbda0111aac50d8c.jpg?_a=BAMAROWQ0",
      heroCaption: "Rani ki Vav's multi-tiered subterranean carved stone galleries in Patan, a UNESCO World Heritage stepwell."
    },
    livingHeritage: {
      traditionalCraft: "Rogan Art of Nirona (Painting cloth using boiled castor oil paste with metal styluses)",
      artForm: "Kutch Lippan Kaam (Mud-and-mirror wall relief art)",
      regionalLanguage: "Gujarati",
      oralLegend: "The legends of Lord Krishna establishing his golden kingdom at Dwarka on the Arabian Sea.",
      architecturalPinnacle: "Rani ki Vav: An inverted temple descending seven stories underground to honor water."
    },
    atlas: {
      capital: "Gandhinagar",
      majorRivers: ["Narmada", "Tapi", "Sabarmati"],
      mountainRanges: ["Girnar Hills", "Aravalli Range"],
      coordinates: "22.2587° N, 71.1924° E",
      svgPathId: "GJ",
      culturalLandmarks: [
        { name: "Rani ki Vav", coordinates: "Patan", significance: "Subterranean stepwell displaying 500 principal sculptures" },
        { name: "White Desert", coordinates: "Kutch", significance: "Shimmering salt desert lit up like silver under the full moon" },
        { name: "Gir Forest", coordinates: "Junagadh", significance: "Last natural sanctuary of the endangered Asiatic Lion" }
      ]
    }
  },

  // 6. WEST BENGAL (Alpona Vermilion & Muslin Ivory)
  {
    id: "west-bengal",
    name: "West Bengal",
    nativeName: "পশ্চিমবঙ্গ",
    nativeScript: "Bengali",
    category: "state",
    zone: "East",
    theme: getStateTheme("west-bengal"),
    epoch: "Pala & Sena Dynasties, Bengal Renaissance & Nobel Literary Heritage",
    introduction:
      "The cultural and literary heart of Eastern India. Where Rabindranath Tagore composed songs that defined a nation, terracotta temples of Bishnupur celebrate folk architecture, and autumn brings the grand spectacle of Durga Puja, inscribed on UNESCO's Intangible Cultural Heritage list.",
    curatorQuote: "In Bengal, a cup of cha and a conversation (adda) can outlast empires.",
    curatorAuthor: "Rabindranath Tagore",
    heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--fYuWb7wI--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/5b/58/a0/5b58a0b0d2239d95b7c18efff9ecf34c.jpg?_a=BAMAROWQ0",
    heroFallback: "https://res.cloudinary.com/tecwmb40/image/fetch/s--fYuWb7wI--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/5b/58/a0/5b58a0b0d2239d95b7c18efff9ecf34c.jpg?_a=BAMAROWQ0",
    taste: {
      title: "The Connoisseur's Feast",
      signatureDish: "Shorshe Ilish (Hilsa fish cooked in pungent yellow mustard and green chillies) & Kosha Mangsho",
      famousSweet: "Rosogolla (Spongy cottage cheese spheres in sugar syrup) & Sandesh",
      traditionalBreakfast: "Luchi with Chholar Dal and fried eggplants (Begun Bhaja)",
      iconicIngredients: ["Mustard Oil", "Panch Phoron (Five-spice blend)", "Posto (Poppy seeds)", "Hilsa Fish", "Nolen Gur (Date palm jaggery)"],
      foodStory:
        "Bengali cuisine treats food as a fine art form, following a strict progression of courses from bitter (shukto) to pungent, sour (tok), and sweet.",
      heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--ai77Lcwm--/c_fill,f_auto,g_auto,h_750,q_auto,w_1000/https://i.pinimg.com/736x/35/0a/eb/350aebe0bf2b2e723580b3a8b92ec81e.jpg?_a=BAMAROWQ0",
      heroCaption: "Authentic Bengali Shorshe Ilish (Hilsa in pungent mustard gravy) with green chillies and mustard oil."
    },
    games: {
      name: "Ashta Chamma / Chokkhor",
      localName: "ষোল ঘর (Sholo Guti)",
      category: "Ancient Two-Player Strategy Board Game",
      boardType: "Grid of lines forming intersecting triangles played with 16 beads each",
      instructions:
        "Similar to checkers, players move beads along intersecting lines to jump over and capture the opponent's pieces, requiring intense tactical calculation.",
      culturalSignificance:
        "Played beneath banyan trees across Bengal villages since the medieval Pala era.",
      illustratedBoardSvgType: "grid"
    },
    textiles: {
      signatureWeave: "Jamdani Muslin (Feather-light supplementary weft) and Baluchari Silk",
      traditionalAttire: "Lal-Paad White Garad Saree (Red border on white silk) and Men's Dhoti-Panjabi",
      heirloomJewelry: "Shakha Pola (Conch and red coral bangles), Hansuli necklace & Chik choker",
      craftTechnique: "Baluchari sarees depict mythological scenes from Mahabharata woven directly into the pallu.",
      historicalOrigins: "Dhaka and Murshidabad muslin were historically so fine that an entire saree could pass through a signet ring.",
      heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--zU02lT_o--/c_fill,f_auto,g_auto,h_750,q_auto,w_1000/https://i.pinimg.com/736x/61/88/97/618897f2815bba6042b8870e4b92d0ee.jpg?_a=BAMAROWQ0",
      heroCaption: "Traditional Lal-Paad white saree with vibrant red border, the timeless attire of Bengal."
    },
    celebration: {
      majorFestival: "Durga Puja (UNESCO Intangible Cultural Heritage) & Poila Boishakh",
      danceForm: "Chhau (Masked martial folk dance) and Gaudiya Nritya",
      folkMusic: "Baul Sangeet (Mystic bard songs with Ektara) & Rabindra Sangeet",
      celebrationRitual: "Sindoor Khela on Dashami, where married women smear vermilion on each other before immersion.",
      heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--PbYWP4zL--/c_fill,f_auto,g_auto,h_750,q_auto,w_1000/https://i.pinimg.com/736x/7d/37/6d/7d376d13005bd37f0908a957df3b0ac6.jpg?_a=BAMAROWQ0",
      heroCaption: "A majestic idol of Goddess Durga during Kolkata's grand Durga Puja celebrations."
    },
    places: {
      iconicMonument: "Victoria Memorial & Howrah Bridge, Kolkata",
      naturalWonder: "Sundarbans Mangrove Delta (Home of the Royal Bengal Tiger)",
      hiddenHeritage: "Terracotta Temples of Bishnupur (Malla Dynasty brick architecture)",
      architecturalStyle: "Bengal Chala curved rooflines, burnt clay terracotta plaques, and colonial neo-classical mansions",
      heroImage: "https://images.unsplash.com/photo-1558431382-27e303142255?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "The iconic cantilever Howrah Bridge arching across the Hooghly River."
    },
    livingHeritage: {
      traditionalCraft: "Bankura Terracotta Horses (GI) & Dokra metal casting",
      artForm: "Kalighat Patachitra & Alpona sacred rice-flour floor drawings",
      regionalLanguage: "Bengali",
      oralLegend: "Thakurmar Jhuli: Beloved grandmother's treasury of fairy tales and prince-and-demon legends.",
      architecturalPinnacle: "Bishnupur Terracotta Temples: Clay baked to red stone with intricate relief carvings of epics."
    },
    atlas: {
      capital: "Kolkata",
      majorRivers: ["Hooghly (Ganga)", "Teesta", "Damodar"],
      mountainRanges: ["Darjeeling Himalayas", "Kanchenjunga Vista"],
      coordinates: "22.9868° N, 87.8550° E",
      svgPathId: "WB",
      culturalLandmarks: [
        { name: "Victoria Memorial", coordinates: "Kolkata", significance: "Grand white Makrana marble monument surrounded by 64 acres of gardens" },
        { name: "Bishnupur Temples", coordinates: "Bankura", significance: "17th-century terracotta temples dedicated to Lord Krishna" },
        { name: "Darjeeling Tea Estates", coordinates: "Darjeeling", significance: "High-altitude tea slopes producing the 'Champagne of Teas'" }
      ]
    }
  },

  // 7. KARNATAKA (Sandalwood & Muted Gold)
  {
    id: "karnataka",
    name: "Karnataka",
    nativeName: "ಕರ್ನಾಟಕ",
    nativeScript: "Kannada",
    category: "state",
    zone: "South",
    theme: getStateTheme("karnataka"),
    epoch: "Kadambas, Chalukyas, Hoysalas & Vijayanagara Empire",
    introduction:
      "A grand imperial crossroads of Hoysala stone lace, UNESCO Hampi ruins, and aromatic sandalwood forests. From the royal palace of Mysore illuminated by 100,000 lightbulbs to the coffee mist of Coorg, Karnataka radiates timeless dignity.",
    curatorQuote: "At Hampi, every boulder tells of an empire so wealthy that rubies were traded in street bazaars by weight.",
    curatorAuthor: "Domingo Paes, Portuguese Chronicler in Vijayanagara, 1520",
    heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--pqiz_Bec--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/41/cc/98/41cc98607829b53798ef4381accc8161.jpg?_a=BAMAROWQ0",
    heroFallback: "https://res.cloudinary.com/tecwmb40/image/fetch/s--pqiz_Bec--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/41/cc/98/41cc98607829b53798ef4381accc8161.jpg?_a=BAMAROWQ0",
    taste: {
      title: "Royal Mysore & Malnad Kitchens",
      signatureDish: "Bisi Bele Bath (Spiced lentil rice cooked with tamarind and nutmeg) & Mysore Masala Dosa",
      famousSweet: "Mysore Pak (Ghee, gram flour, and sugar confectionery invented in the royal palace)",
      traditionalBreakfast: "Neer Dosa with coconut chutney and Mangalore Buns",
      iconicIngredients: ["Byadagi Chillies", "Coorg Black Pepper", "Ghee", "Tamarind", "Sandalwood extract"],
      foodStory:
        "The royal cooks (Madapalli) of the Wadiyar dynasty perfected Mysore Pak in 1935 when King Krishna Raja Wadiyar IV praised its melt-in-mouth texture.",
      heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--8b387z1T--/c_fill,f_auto,g_auto,h_750,q_auto,w_1000/https://i.pinimg.com/736x/27/c3/97/27c397d61810aa332c56953239c962f4.jpg?_a=BAMAROWQ0",
      heroCaption: "Authentic royal Mysore Pak prepared with pure ghee, gram flour, and cardamom."
    },
    games: {
      name: "Chauka Bara / Pagade",
      localName: "ಪಗಡೆ (Pagade)",
      category: "Ancient Strategic Board Game",
      boardType: "Cloth cross board with wooden cylindrical dice (Daala)",
      instructions:
        "Players roll traditional long wooden dice (daala) to guide four pawns around the outer perimeter into the inner sanctum home square.",
      culturalSignificance:
        "Depicted in temple sculptures across Belur and Halebidu; symbol of royal intellect.",
      illustratedBoardSvgType: "cross_circle"
    },
    textiles: {
      signatureWeave: "Mysore Silk (Crafted with 100% pure silk yarn and 0.65% pure gold zari) and Ilkal Sarees",
      traditionalAttire: "Mysore Pattu Saree and Men's Panche with Mysore Peta (Royal turban)",
      heirloomJewelry: "Lakshmi Sara (Gold coin necklace), Ganda Berunda pendant & Kadagas",
      craftTechnique: "Mysore Silk utilizes Swiss-imported machinery patronized by the Maharaja of Mysore in 1912.",
      historicalOrigins: "Tipu Sultan introduced sericulture to the kingdom in 1785.",
      heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--95YYmg3s--/c_fill,f_auto,g_auto,h_750,q_auto,w_1000/https://i.pinimg.com/736x/93/8f/a0/938fa009a5f049d9572b22b333e12f04.jpg?_a=BAMAROWQ0",
      heroCaption: "Regal blue Mysore Silk saree with pure gold zari embroidered border and rich pallu."
    },
    celebration: {
      majorFestival: "Mysore Dasara (10-day state festival celebrating victory of Chamundeshwari)",
      danceForm: "Yakshagana (Theatrical dance-opera with vibrant costumes and towering headdresses)",
      folkMusic: "Sugama Sangeetha and classical Carnatic Purandara Dasa compositions",
      celebrationRitual: "The Jumboo Savari royal elephant procession carrying the golden howdah with Goddess Chamundeshwari.",
      heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--P-d6eUh7--/c_fill,f_auto,g_auto,h_750,q_auto,w_1000/https://i.pinimg.com/736x/c2/b0/a0/c2b0a0435c7cdf3a15b9b48454d88343.jpg?_a=BAMAROWQ0",
      heroCaption: "Illuminated Mysore Dasara royal procession celebrating the victory of Goddess Chamundeshwari."
    },
    places: {
      iconicMonument: "Mysore Palace & Hampi Virupaksha Temple",
      naturalWonder: "Jog Falls (Second-highest plunge waterfall in India) & Kudremukh Peak",
      hiddenHeritage: "Hoysaleswara Temple at Halebidu (Exquisite chloritic schist soapstone lace)",
      architecturalStyle: "Hoysala stellate star-shaped temple platforms and Vijayanagara granite pillars",
      heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s---3jgoeH8--/c_fill,f_auto,g_auto,h_750,q_auto,w_1200/https://i.pinimg.com/736x/36/d1/7b/36d17b7470e2ebdd367a930a753ee1b3.jpg?_a=BAMAROWQ0",
      heroCaption: "The magnificent Mysore Palace glowing with royal heritage in Mysuru."
    },
    livingHeritage: {
      traditionalCraft: "Channapatna Wooden Toys (GI, lacquered ivory-wood) & Sandalwood Carving",
      artForm: "Mysore Traditional Painting (Ganjifa playing cards and gold foil)",
      regionalLanguage: "Kannada",
      oralLegend: "The legend of Kumararama, the gallant prince who defended the southern frontiers.",
      architecturalPinnacle: "Belur and Halebidu soapstone carvings so delicate they seem carved from wax."
    },
    atlas: {
      capital: "Bengaluru",
      majorRivers: ["Krishna", "Cauvery", "Tungabhadra"],
      mountainRanges: ["Western Ghats", "Baba Budan Giri"],
      coordinates: "15.3173° N, 75.7139° E",
      svgPathId: "KA",
      culturalLandmarks: [
        { name: "Hampi UNESCO Site", coordinates: "Vijayanagara", significance: "Ruins of the magnificent 14th-century Vijayanagara capital" },
        { name: "Mysore Palace", coordinates: "Mysuru", significance: "Indo-Saracenic royal residence illuminated by 97,000 bulbs" },
        { name: "Gommateshwara Statue", coordinates: "Shravanabelagola", significance: "57-foot monolithic freestanding granite statue carved in 981 CE" }
      ]
    }
  },

  // 8. MAHARASHTRA (Terracotta & Deep Saffron)
  {
    id: "maharashtra",
    name: "Maharashtra",
    nativeName: "महाराष्ट्र",
    nativeScript: "Devanagari",
    category: "state",
    zone: "West",
    theme: getStateTheme("maharashtra"),
    epoch: "Satavahanas, Vakatakas (Ajanta), Rashtrakutas & Maratha Empire (Chhatrapati Shivaji)",
    introduction:
      "A land of rugged Sahyadri hill fortresses, ancient rock-cut cave monasteries, and indomitable Maratha spirit. Home to the UNESCO wonders of Ajanta and Ellora, the iridescent silk borders of Paithani sarees, and the thunderous drums of Ganesh Chaturthi.",
    curatorQuote: "These basalt cliffs were not merely mountains to the Marathas; they were sentinels of freedom and faith.",
    curatorAuthor: "Ballads of the Shahirs",
    heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--cbp_Z4z7--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/02/80/bf/0280bf54b3b144b43f397be496b28344.jpg?_a=BAMAROWQ0",
    heroFallback: "https://res.cloudinary.com/tecwmb40/image/fetch/s--cbp_Z4z7--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/02/80/bf/0280bf54b3b144b43f397be496b28344.jpg?_a=BAMAROWQ0",
    taste: {
      title: "The Hearty Maratha Hearth",
      signatureDish: "Puran Poli (Sweet flatbread stuffed with jaggery and chana dal, served with ghee and katachi amti)",
      famousSweet: "Modak (Steamed rice flour dumplings filled with fresh coconut and jaggery) & Shrikhand",
      traditionalBreakfast: "Misal Pav with spicy rassa, farsan and fresh onions",
      iconicIngredients: ["Godaa Masala (Maharashtrian aromatic spice blend)", "Kokum", "Peanuts", "Jaggery", "Besan"],
      foodStory:
        "The food of the Sahyadri soldiers was built for stamina—roasted millet rotis (bhakri) paired with crushed peanut-garlic thecha that could be carried up cliff fortresses.",
      heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--5VD54_W1--/c_fill,f_auto,g_auto,h_750,q_auto,w_1000/https://i.pinimg.com/736x/ee/87/c6/ee87c622879c76616cfe26ab46d8c2c7.jpg?_a=BAMAROWQ0",
      heroCaption: "Authentic Maharashtrian Puran Poli served with pure ghee and katachi amti."
    },
    games: {
      name: "Vagh-Bakri & Atya Patya",
      localName: "वाघ बकरी (Vagh-Bakri)",
      category: "Ancient Predator-Prey Hunting Strategy Board Game",
      boardType: "Triangular lattice drawn on flagstones played with 4 tigers and 20 goats",
      instructions:
        "The tigers attempt to capture the goats by jumping over them, while the goats must coordinate to surround and immobilize all four tigers.",
      culturalSignificance:
        "Played by Maratha sentries guarding hill forts like Raigad and Sinhagad to hone tactical thinking.",
      illustratedBoardSvgType: "grid"
    },
    textiles: {
      signatureWeave: "Paithani Saree (Woven with pure gold and silver zari featuring the signature peacock motif)",
      traditionalAttire: "Nauvari (Nine-yard dhoti-style saree) and Kurta with Peshwa Pagdi",
      heirloomJewelry: "Kolhapuri Saaj (Sacred amulet necklace), Maharashtrian Nath (Pearl and ruby nose ring) & Thushi choker",
      craftTechnique: "Tapestry weaving technique without any float threads on the reverse.",
      historicalOrigins: "Patronized by the Satavahana kings in 200 BCE in Paithan.",
      heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--jqdiDKJy--/c_fill,f_auto,g_auto,h_750,q_auto,w_1000/https://i.pinimg.com/736x/1e/82/0a/1e820a12c53ff91b0435947a8ab5b262.jpg?_a=BAMAROWQ0",
      heroCaption: "Traditional Maharashtrian Nauvari saree draped in authentic style with temple jewelry and Nath."
    },
    celebration: {
      majorFestival: "Ganesh Chaturthi (10-day festival of Lord Ganesha) & Gudi Padwa",
      danceForm: "Lavani (Expressive, rhythmic folk dance accompanied by the Dholki)",
      folkMusic: "Powada (Heroic ballads of Chhatrapati Shivaji) and Natya Sangeet",
      celebrationRitual: "Dhol-Tasha pathaks: Thousands of youth drumming massive thunderous kettle-drums in unison during Visarjan.",
      heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--WtUEMMOx--/c_fill,f_auto,g_auto,h_750,q_auto,w_1000/https://i.pinimg.com/736x/b6/69/98/b66998a21705a183145be7deda0a0d75.jpg?_a=BAMAROWQ0",
      heroCaption: "Grand Ganesh Chaturthi celebration featuring the iconic Lalbaugcha Raja idol in Mumbai."
    },
    places: {
      iconicMonument: "Ajanta & Ellora Caves (Kailash Temple carved from a single basalt mountain)",
      naturalWonder: "Lonar Crater Lake (Formed by a meteor impact 52,000 years ago)",
      hiddenHeritage: "Murud-Janjira (Unconquered sea fortress surrounded by the Arabian Sea)",
      architecturalStyle: "Basalt rock-cut chaityas and Maratha hill fort stone bastions",
      heroImage: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "The colossal rock-cut Kailash Temple at Ellora Caves."
    },
    livingHeritage: {
      traditionalCraft: "Kolhapuri Chappals (GI-tagged handcrafted vegetable-tanned leather footwear)",
      artForm: "Warli Tribal Folk Painting (White geometric figures depicting communal dances)",
      regionalLanguage: "Marathi",
      oralLegend: "Shivaji's escape from Agra concealed within fruit baskets—a masterstroke of historical cunning.",
      architecturalPinnacle: "Kailash Temple, Cave 16: Carved from top to bottom by excavating 200,000 tonnes of basalt."
    },
    atlas: {
      capital: "Mumbai",
      majorRivers: ["Godavari", "Krishna", "Tapi"],
      mountainRanges: ["Western Ghats (Sahyadris)", "Satpura Range"],
      coordinates: "19.7515° N, 75.7139° E",
      svgPathId: "MH",
      culturalLandmarks: [
        { name: "Kailash Temple", coordinates: "Ellora", significance: "The largest monolithic rock-cut structure on Earth" },
        { name: "Raigad Fort", coordinates: "Raigad", significance: "Capital of the Maratha Empire under Chhatrapati Shivaji Maharaj" },
        { name: "Gateway of India", coordinates: "Mumbai", significance: "Historic 26-meter basalt triumphal arch on the Mumbai harbor" }
      ]
    }
  },

  // 9. ASSAM (Muga Silk & Rhododendron Crimson)
  {
    id: "assam",
    name: "Assam",
    nativeName: "অসম",
    nativeScript: "Assamese",
    category: "state",
    zone: "North-East",
    theme: getStateTheme("assam"),
    epoch: "Kamarupa Kingdom, Ahom Dynasty (600 Years Unconquered) & Srimanta Sankardev",
    introduction:
      "A lush riverine empire fed by the mighty Brahmaputra. Famous for golden Muga silk that glows brighter with every wash, prehistoric one-horned rhinoceroses in Kaziranga, tea gardens stretching to misty horizons, and the soul-stirring rhythms of Bihu.",
    curatorQuote: "The Brahmaputra does not merely flow through Assam; it is the bloodline that feeds our songs and looms.",
    curatorAuthor: "Dr. Bhupen Hazarika",
    heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--O76lLM_W--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/d2/46/a2/d246a26b640aead0a5987232aa167b4a.jpg?_a=BAMAROWQ0",
    heroFallback: "https://res.cloudinary.com/tecwmb40/image/fetch/s--O76lLM_W--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/d2/46/a2/d246a26b640aead0a5987232aa167b4a.jpg?_a=BAMAROWQ0",
    taste: {
      title: "The Brahmaputra River Basin",
      signatureDish: "Masor Tenga (Tangy river fish curry with elephant apple or tomatoes) & Duck Meat with White Gourd",
      famousSweet: "Pitha (Rice flour rolls stuffed with sesame and jaggery) & Laru",
      traditionalBreakfast: "Jolpan (Flattened rice with cured curd, puffed rice and liquid date palm jaggery)",
      iconicIngredients: ["Bhut Jolokia (Ghost Pepper)", "Khar (Banana peel alkaline filtrate)", "Kaji Nemu (Assam Lemon)", "Bamboo Shoot"],
      foodStory:
        "Assamese food uses minimal oil and heavy spices, relying on fermented bamboo shoot, alkaline khar, and sour tengaa to create sublime, delicate flavors.",
      heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--BRwR62sB--/c_fill,f_auto,g_auto,h_750,q_auto,w_1000/https://i.pinimg.com/736x/33/99/66/339966ee37777c265488234f8d70a5c2.jpg?_a=BAMAROWQ0",
      heroCaption: "Traditional Assamese bell-metal thali featuring Masor Tenga and Joha aromatic rice."
    },
    games: {
      name: "Dhopkhel",
      localName: "ঢোপখেল (Dhopkhel)",
      category: "Ancient Indigenous Ball Game",
      boardType: "Open grassy field played with a rubber or cloth ball (dhop)",
      instructions:
        "Two teams take turns throwing the ball into the opponent's territory. A player must run across, tag an opponent, and return without inhaling or being tagged out.",
      culturalSignificance:
        "Traditionally played during the springtime Rongali Bihu festival, originally patronized by Ahom kings.",
      illustratedBoardSvgType: "outdoor"
    },
    textiles: {
      signatureWeave: "Muga Silk (Endemic wild golden silk) and Eri Peace Silk",
      traditionalAttire: "Mekhela Chador (Two-piece draped silk attire) and Gamosa (Sacred white and red handwoven towel)",
      heirloomJewelry: "Jonbiri (Crescent moon pendant), Gam Kharu (Heavy silver/gold bracelet) & Dholbiri",
      craftTechnique: "Sualkuchi hand-weaving of natural golden Muga filaments produced exclusively in Assam.",
      historicalOrigins: "Ahom kings decreed that Muga silk was reserved strictly for royalty.",
      heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--8jrvK9GG--/c_fill,f_auto,g_auto,h_750,q_auto,w_1000/https://i.pinimg.com/736x/57/9b/a5/579ba598e5c354550fa3fe32482aca09.jpg?_a=BAMAROWQ0",
      heroCaption: "Gleaming golden Muga Mekhela Chador with delicate traditional red and gold Kingkhap motifs."
    },
    celebration: {
      majorFestival: "Rongali Bihu (Spring festival of agriculture and love) & Ambubachi Mela",
      danceForm: "Bihu Dance (Joyous rapid hip movements and rhythmic hand gestures) & Sattriya Classical Dance",
      folkMusic: "Bihu Geet played on Dhol, Pepa (Buffalo horn trumpet), and Toka (Bamboo clapper)",
      celebrationRitual: "Weaving Gamosa towels as symbols of respect presented to elders on the first day of Bihu.",
      heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--ghPBUswH--/c_fill,f_auto,g_auto,h_750,q_auto,w_1000/https://i.pinimg.com/736x/4c/88/94/4c8894faf7b15fc026f98f646436c6b2.jpg?_a=BAMAROWQ0",
      heroCaption: "Assamese Bihu dancers celebrating Rongali Bihu playing the buffalo horn Pepa."
    },
    places: {
      iconicMonument: "Kamakhya Temple & Rang Ghar (Oldest amphitheater in Asia, Sivasagar)",
      naturalWonder: "Kaziranga National Park & Majuli Island (World's largest river island)",
      hiddenHeritage: "Charaideo Maidams (Mound-burial tumuli of Ahom royalty, UNESCO)",
      architecturalStyle: "Ahom brick-and-mortar masonry utilizing sticky rice and duck eggs as mortar",
      heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Majuli river island's tranquil wetlands surrounded by blooming water lilies."
    },
    livingHeritage: {
      traditionalCraft: "Sarthebari Bell Metal Craft & Majuli Mask-making (Mukha Shilpa)",
      artForm: "Sattriya dance-dramas and manuscript miniature paintings on Sanchi tree bark",
      regionalLanguage: "Assamese",
      oralLegend: "The legend of Princess Usha and Aniruddha in the ancient city of Tezpur.",
      architecturalPinnacle: "Rang Ghar: A two-storied royal sports pavilion built in 1746 CE shaped like an inverted longboat."
    },
    atlas: {
      capital: "Dispur (Guwahati)",
      majorRivers: ["Brahmaputra", "Barak", "Manas"],
      mountainRanges: ["Karbi Anglong Hills", "Barail Range"],
      coordinates: "26.2006° N, 92.9376° E",
      svgPathId: "AS",
      culturalLandmarks: [
        { name: "Kaziranga Park", coordinates: "Golaghat", significance: "Sanctuary protecting two-thirds of the world's great one-horned rhinos" },
        { name: "Kamakhya Temple", coordinates: "Guwahati", significance: "Ancient Tantric Shakti Peetha shrine atop Nilachal Hill" },
        { name: "Majuli Island", coordinates: "Brahmaputra", significance: "Cradle of Neo-Vaishnavite culture with 22 living monastic Satras" }
      ]
    }
  },

  // 10. JAMMU & KASHMIR (Pashmina Sage & Soft Ivory)
  {
    id: "jammu-and-kashmir",
    name: "Jammu & Kashmir",
    nativeName: "جۆم تہٕ کٔشیٖر",
    nativeScript: "Nastaliq / Devanagari",
    category: "union-territory",
    zone: "North",
    theme: getStateTheme("jammu-and-kashmir"),
    epoch: "Ancient Kalhana's Rajatarangini, Sharada Peeth & Mughal Pleasure Gardens",
    introduction:
      "A celestial Himalayan vale surrounded by snow-crested peaks and floating lotus gardens. Celebrated across the world for fine hand-spun Pashmina shawls, fragrant saffron fields of Pampore, cedar-wood houseboats, and rich culinary feasts.",
    curatorQuote: "If there is paradise on earth, it is here, it is here, it is here.",
    curatorAuthor: "Emperor Jahangir on Shalimar Bagh",
    heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--cfd0SBr6--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/68/b6/7d/68b67d664eba866d3efef3ffacc36e9b.jpg?_a=BAMAROWQ0",
    heroFallback: "https://res.cloudinary.com/tecwmb40/image/fetch/s--cfd0SBr6--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/68/b6/7d/68b67d664eba866d3efef3ffacc36e9b.jpg?_a=BAMAROWQ0",
    taste: {
      title: "The 36-Course Royal Wazwan",
      signatureDish: "Rogan Josh (Slow-cooked mutton with Kashmiri dried chillies) & Gushtaba (Velvety meatballs in yoghurt gravy)",
      famousSweet: "Shufta (Dry fruits and paneer coated in spiced sugar syrup) & Phirni",
      traditionalBreakfast: "Noon Chai (Pink salty tea brewed with baking soda) with freshly baked Girda bread & Kahwa",
      iconicIngredients: ["Kashmiri Saffron (Kong)", "Maval (Cockscomb flower dye)", "Pran (Shallots)", "Fennel Powder", "Dried Ginger"],
      foodStory:
        "The Wazwan is prepared exclusively by master chefs (Vastas) in brass cauldrons over wood fires, served four guests to a single engraved copper plate (Trami).",
      heroImage: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Steaming aromatic Kashmiri Kahwa served in an engraved brass Samovar."
    },
    games: {
      name: "Saz-Long & Santoor play",
      localName: "ساز لونگ (Saz-Long)",
      category: "Traditional Himalayan Hopscotch and Mental Agility Games",
      boardType: "Seven stone squares drawn on earth played with polished slate stones",
      instructions:
        "Players balance on one foot, kicking the flat stone through sequential chambers without stepping on border lines.",
      culturalSignificance:
        "Cherished folk game played in village courtyards beneath spreading Chinar trees during spring.",
      illustratedBoardSvgType: "grid"
    },
    textiles: {
      signatureWeave: "Pashmina & Kani Shawls (Hand-woven with wooden bobbins) and Tilla embroidery",
      traditionalAttire: "Pheran (Warm tweed robe with needlework) and Taranga headdress",
      heirloomJewelry: "Dejhoor (Sacred ear pendant with hexagonal gold yantra) & silver filigree bracelets",
      craftTechnique: "Sozni needlework and Kani weaving using coded colored thread notations (Talim).",
      historicalOrigins: "Pashmina wool harvested from Changthangi goats grazing at 14,000 feet altitude.",
      heroImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Pure Pashmina shawl embroidered with delicate paisley Sozni needlework."
    },
    celebration: {
      majorFestival: "Shikara Festival, Tulip Festival & Herath (Kashmiri Shivratri)",
      danceForm: "Rouf (Graceful folk dance of women moving in interlocking lines) and Bhand Pather",
      folkMusic: "Sufiyana Kalam played on the hundred-stringed Santoor, Saaz, and Rabab",
      celebrationRitual: "Herath puja where walnuts soaked in earthen pots are distributed as sacred prasad.",
      heroImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Women in embroidered pherans performing the rhythmic Rouf dance."
    },
    places: {
      iconicMonument: "Hari Parbat Fort & Shankaracharya Temple",
      naturalWonder: "Dal Lake with floating gardens & Gulmarg meadows",
      hiddenHeritage: "Martand Sun Temple Ruins (8th-century stone colossus built by Lalitaditya)",
      architecturalStyle: "Pinjrakari wooden trellis screens, Khatamband cedar ceilings, and Mughal stone pavilions",
      heroImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Shikara wooden boat gliding quietly through water lilies on Dal Lake."
    },
    livingHeritage: {
      traditionalCraft: "Kashmiri Walnut Wood Carving (GI) & Papier-Mâché gold-painted lacquers",
      artForm: "Khatamband geometric wood joinery crafted without nails",
      regionalLanguage: "Kashmiri, Dogri, Urdu",
      oralLegend: "The legend of Lal Ded (Lalleshwari), the 14th-century mystic poetess whose Vakhs bridged spiritual worlds.",
      architecturalPinnacle: "Shalimar and Nishat Bagh: Stepped terraces designed to channel mountain streams through marble chinar fountains."
    },
    atlas: {
      capital: "Srinagar (Summer) / Jammu (Winter)",
      majorRivers: ["Jhelum", "Chenab", "Tawi"],
      mountainRanges: ["Pir Panjal Range", "Zabarwan Range"],
      coordinates: "33.7782° N, 76.5762° E",
      svgPathId: "JK",
      culturalLandmarks: [
        { name: "Dal Lake", coordinates: "Srinagar", significance: "Urban lake with 1,200 ornate British cedar houseboats" },
        { name: "Martand Sun Temple", coordinates: "Anantnag", significance: "Grand 8th-century colonnaded temple ruins overlooking the valley" },
        { name: "Vaishno Devi Shrine", coordinates: "Katra", significance: "Sacred cave shrine nestled high in the Trikuta mountains" }
      ]
    }
  },

  // 11. UTTAR PRADESH
  {
    id: "uttar-pradesh",
    name: "Uttar Pradesh",
    nativeName: "उत्तर प्रदेश",
    nativeScript: "Devanagari",
    category: "state",
    zone: "North",
    theme: getStateTheme("uttar-pradesh"),
    epoch: "Vedic Civilization, Mauryan Empire, Mughal Empire & Awadh Nawabs",
    introduction:
      "The ancient sacred heart of Northern India. From the eternity of Varanasi's river ghats to the white marble perfection of the Taj Mahal and the poetic Nawabi culture of Lucknow, Uttar Pradesh is an encyclopedia of Indian civilization.",
    curatorQuote: "Benares is older than history, older than tradition, older even than legend, and looks twice as old as all of them put together.",
    curatorAuthor: "Mark Twain",
    heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--h-p2hnPQ--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/f0/74/8d/f0748d389877497a22b8cc830d7afba9.jpg?_a=BAMAROWQ0",
    heroFallback: "https://res.cloudinary.com/tecwmb40/image/fetch/s--h-p2hnPQ--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/f0/74/8d/f0748d389877497a22b8cc830d7afba9.jpg?_a=BAMAROWQ0",
    taste: {
      title: "Awadhi Nawabi & Varanasi Streets",
      signatureDish: "Galouti Kebab & Awadhi Dum Biryani (Slow-cooked in dough-sealed handis)",
      famousSweet: "Banarasi Malaiyo (Airy saffron dew foam) & Petha of Agra",
      traditionalBreakfast: "Bedmi Puri with Aloo Sabzi and Kachori",
      iconicIngredients: ["Kewra Water", "Ittr (Attar of Kannauj)", "Rose Petals", "Saffron", "Chironji"],
      foodStory:
        "The Nawabs of Lucknow employed royal hakims and chefs who created the Galouti Kebab with 160 secret spices so tender it could melt without chewing.",
      heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--f8_JI3QG--/c_fill,f_auto,g_auto,h_750,q_auto,w_1000/https://i.pinimg.com/736x/8c/4f/01/8c4f018f5be2e7fbfb7a71017244d9d6.jpg?_a=BAMAROWQ0",
      heroCaption: "Authentic melt-in-mouth Galouti Kebabs prepared with royal Awadhi aromatic spices."
    },
    games: {
      name: "Pachisi",
      localName: "पचीसी (Pachisi)",
      category: "Ancient Royal Game of Twenty-Five",
      boardType: "Cruciform embroidered cloth board",
      instructions:
        "Players move pawns around a cross board based on throws of six cowries, with 25 being the highest roll.",
      culturalSignificance:
        "Referred to as the national game of medieval India; played across Mughal courts.",
      illustratedBoardSvgType: "cross_circle"
    },
    textiles: {
      signatureWeave: "Banarasi Brocade Silk (Zari weaving) and Lucknowi Chikankari shadow-work",
      traditionalAttire: "Banarasi Silk Saree and Chikankari Kurta with Churidar",
      heirloomJewelry: "Kundan Jadau, Paizeb anklets & Gulabi Meenakari of Varanasi",
      craftTechnique: "Kadhwa technique where each floral motif is individually engraved and woven with gold thread.",
      historicalOrigins: "Varanasi has been the supreme silk weaving center of India since the Buddha's time.",
      heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--xEyvKEXH--/c_fill,f_auto,g_auto,h_750,q_auto,w_1000/https://i.pinimg.com/736x/93/72/70/9372708220bc839ca937cfe6f2379984.jpg?_a=BAMAROWQ0",
      heroCaption: "Exquisite crimson red Banarasi brocade silk saree with intricate pure gold zari weaving."
    },
    celebration: {
      majorFestival: "Dev Deepawali in Varanasi, Holi of Braj & Kumbh Mela",
      danceForm: "Kathak (Classical storytelling dance with rapid pirouettes and footwork)",
      folkMusic: "Thumri, Kajari, Dadra and classical Benares Gharana Shehnai",
      celebrationRitual: "Ganga Aarti at Dashashwamedh Ghat with towering multi-tiered brass oil lamps.",
      heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--i506rGOo--/c_fill,f_auto,g_auto,h_750,q_auto,w_1000/https://i.pinimg.com/736x/00/1c/72/001c72992f743b7deefaa65937deee6d.jpg?_a=BAMAROWQ0",
      heroCaption: "Graceful Kathak dancer performing classical pirouettes and footwork of the Lucknow and Benares gharanas."
    },
    places: {
      iconicMonument: "The Taj Mahal, Agra (UNESCO World Wonder) & Kashi Vishwanath Temple",
      naturalWonder: "The Sacred Triveni Sangam at Prayagraj",
      hiddenHeritage: "Bada Imambara, Lucknow (Features the gravity-defying central hall built without pillars)",
      architecturalStyle: "Mughal symmetrical domes, pietre dure inlay, and Awadhi stucco work",
      heroImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "The pristine white marble Taj Mahal reflected in the central garden pool."
    },
    livingHeritage: {
      traditionalCraft: "Kannauj Perfume Distillation (Deg-Bhapka hydrodistillation of petrichor attar) & Moradabad Brassware",
      artForm: "Gulabi Meenakari (Pink enamel on gold) & Zardozi gold embroidery",
      regionalLanguage: "Hindi, Awadhi, Bhojpuri, Urdu",
      oralLegend: "The epic tales of the Ramayana originating in Ayodhya.",
      architecturalPinnacle: "Bada Imambara: An unsupported vaulted ceiling spanning 50 by 16 meters."
    },
    atlas: {
      capital: "Lucknow",
      majorRivers: ["Ganga", "Yamuna", "Sarayu", "Gomti"],
      mountainRanges: ["Vindhyan Foothills"],
      coordinates: "26.8467° N, 80.9462° E",
      svgPathId: "UP",
      culturalLandmarks: [
        { name: "Taj Mahal", coordinates: "Agra", significance: "Pinnacle of Mughal architecture built by Shah Jahan in 1648" },
        { name: "Ghats of Varanasi", coordinates: "Varanasi", significance: "84 sacred stone river steps along the holy River Ganga" },
        { name: "Fatehpur Sikri", coordinates: "Agra", significance: "Red sandstone imperial city constructed by Emperor Akbar" }
      ]
    }
  },

  // 12. ODISHA
  {
    id: "odisha",
    name: "Odisha",
    nativeName: "ଓଡ଼ିଶା",
    nativeScript: "Odia",
    category: "state",
    zone: "East",
    theme: getStateTheme("odisha"),
    epoch: "Ancient Kalinga Empire, Ganga Dynasty & Sun Temple Architects",
    introduction:
      "A land of monumental sandstone chariots, divine Rath Yatra celebrations, and palm-leaf manuscript traditions. Home to the UNESCO Sun Temple at Konark, intricate Sambalpuri Ikat bandha textiles, and the fluid grace of classical Odissi dance.",
    curatorQuote: "At Konark, the language of stone surpasses the language of human words.",
    curatorAuthor: "Rabindranath Tagore",
    heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--fOwMiyRm--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/47/68/dc/4768dc9f3f6a4338b15d30020aac3d56.jpg?_a=BAMAROWQ0",
    heroFallback: "https://res.cloudinary.com/tecwmb40/image/fetch/s--fOwMiyRm--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/47/68/dc/4768dc9f3f6a4338b15d30020aac3d56.jpg?_a=BAMAROWQ0",
    taste: {
      title: "Lord Jagannath's Chhappan Bhog",
      signatureDish: "Dalma (Lentils simmered with raw papaya, pumpkin, and roasted cumin-chilli powder)",
      famousSweet: "Chhena Poda (Caramelized baked cottage cheese cake invented in Nayagarh)",
      traditionalBreakfast: "Chhena Gaja with Pakhala Bhata (Fermented water rice with roasted curd)",
      iconicIngredients: ["Chhena (Fresh cottage cheese)", "Panch Phutana", "Mustard Paste", "Tamarind", "Ghee"],
      foodStory:
        "The Mahaprasad at the Puri Jagannath Temple is cooked in the world's largest kitchen where seven clay pots are stacked one over the other on a wood fire; miraculously, the top pot cooks first.",
      heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--qHCZoInj--/c_fill,f_auto,g_auto,h_750,q_auto,w_1000/https://i.pinimg.com/736x/1a/f2/83/1af2831a93e963f3bb6088b5cd80a3ea.jpg?_a=BAMAROWQ0",
      heroCaption: "Authentic Odia Dalma and Mahaprasad simmered with roasted cumin and crushed spices."
    },
    games: {
      name: "Ganjapa",
      localName: "ଗଞ୍ଜପା (Ganjapa)",
      category: "Ancient Hand-Painted Circular Card Game",
      boardType: "Circular lacquered cloth cards hand-painted with Dashavatara deities",
      instructions:
        "Played by 3 or 4 players using circular cards depicting avatars of Vishnu, testing trick-taking and card counting.",
      culturalSignificance:
        "Created by master Pattachitra painters of Raghurajpur heritage craft village.",
      illustratedBoardSvgType: "grid"
    },
    textiles: {
      signatureWeave: "Sambalpuri Bandha (Tie-dye Ikat) and Bomkai Silk",
      traditionalAttire: "Sambalpuri Saree and Men's Dhoti with Sambalpuri border Kurta",
      heirloomJewelry: "Tarakasi (Cuttack silver filigree jewelry) & Kantei necklace",
      craftTechnique: "Bandhakala: Tying and dyeing warp and weft yarns with geometric seashell and temple motifs.",
      historicalOrigins: "Practiced for over 800 years in western Odisha handloom clusters.",
      heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--f19MRJ2b--/c_fill,f_auto,g_auto,h_750,q_auto,w_1000/https://i.pinimg.com/736x/53/45/92/534592959d2e6e9957f074c5c13b5a57.jpg?_a=BAMAROWQ0",
      heroCaption: "Traditional handwoven Sambalpuri Ikat bandha silk saree with iconic temple borders."
    },
    celebration: {
      majorFestival: "Rath Yatra of Puri (The Chariot Festival) & Konark Dance Festival",
      danceForm: "Odissi (Classical dance known for the Tribhanga three-bend posture)",
      folkMusic: "Odissi classical music with Mardala percussion and Odia Champu poetry",
      celebrationRitual: "Dragging the colossal wooden chariots of Lord Jagannath, Balabhadra, and Subhadra through sea of pilgrims.",
      heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s---YhokFTj--/c_fill,f_auto,g_auto,h_750,q_auto,w_1000/https://i.pinimg.com/736x/ad/00/4b/ad004bdba2ea757614e269a6111de109.jpg?_a=BAMAROWQ0",
      heroCaption: "Classical Odissi dancer in authentic Tribhanga posture adorned with traditional silver filigree jewelry."
    },
    places: {
      iconicMonument: "Konark Sun Temple (The 13th-century stone chariot of the Sun God)",
      naturalWonder: "Chilika Lake (Asia's largest brackish lagoon & Irrawaddy dolphin haven)",
      hiddenHeritage: "Chausath Yogini Temple, Hirapur (9th-century hypaethral circular stone temple)",
      architecturalStyle: "Kalinga deula architecture: Rekha Deula towers and Pidha Deula assembly halls",
      heroImage: "https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "The colossal 24-spoke stone wheel of the Konark Sun Temple."
    },
    livingHeritage: {
      traditionalCraft: "Cuttack Tarakasi (Silver Filigree, GI) & Pipili Appliqué Work",
      artForm: "Pattachitra (Cloth-based scroll painting depicting Krishna Leela using mineral colors)",
      regionalLanguage: "Odia (Classical Language of India)",
      oralLegend: "Dharmapada, the 12-year-old child prodigy who laid the crowning stone of Konark to save 1,200 craftsmen.",
      architecturalPinnacle: "Konark Sun Temple: Designed as a 100-foot stone chariot pulled by seven stone horses."
    },
    atlas: {
      capital: "Bhubaneswar (The Temple City)",
      majorRivers: ["Mahanadi", "Brahmani", "Baitarani"],
      mountainRanges: ["Eastern Ghats", "Deomali Peak"],
      coordinates: "20.9517° N, 85.0985° E",
      svgPathId: "OR",
      culturalLandmarks: [
        { name: "Konark Sun Temple", coordinates: "Konark", significance: "UNESCO World Heritage 13th-century colossal architectural chariot" },
        { name: "Jagannath Temple", coordinates: "Puri", significance: "One of the sacred Char Dham pilgrimage centers of India" },
        { name: "Chilika Lake", coordinates: "Khordha", significance: "Ramsar wetland sanctuary home to endangered Irrawaddy dolphins" }
      ]
    }
  },

  // 13. ANDHRA PRADESH
  {
    id: "andhra-pradesh",
    name: "Andhra Pradesh",
    nativeName: "ఆంధ్రప్రదేశ్",
    nativeScript: "Telugu",
    category: "state",
    zone: "South",
    theme: getStateTheme("andhra-pradesh"),
    epoch: "Satavahana Dynasty (Amaravati), Eastern Chalukyas & Vijayanagara",
    introduction:
      "A golden coast of sacred rivers, rich spice farming, and classical Kuchipudi dance. Renowned for the holy hill shrine of Tirumala Tirupati, the ancient Buddhist stupas of Amaravati, and hand-painted Kalamkari textiles.",
    curatorQuote: "Telugu is the 'Italian of the East', where every word ends in a musical vowel like a flute note.",
    curatorAuthor: "Niccolò de' Conti, 15th Century Traveler",
    heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--191xyThw--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/a7/d6/c6/a7d6c6f2579415a9f1bb1983c203651e.jpg?_a=BAMAROWQ0",
    heroFallback: "https://res.cloudinary.com/tecwmb40/image/fetch/s--191xyThw--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/a7/d6/c6/a7d6c6f2579415a9f1bb1983c203651e.jpg?_a=BAMAROWQ0",
    taste: {
      title: "Guntur Spices & Coastal Delta",
      signatureDish: "Gongura Mutton & Royyala Iguru (Fiery prawn curry)",
      famousSweet: "Pootharekulu (Paper-thin sweet rice sheets folded with ghee and jaggery) & Kakinada Khaja",
      traditionalBreakfast: "Pesarattu (Green gram crepe) served with ginger chutney and Upma",
      iconicIngredients: ["Gongura (Sorrel leaves)", "Guntur Red Chillies", "Tamarind", "Cold-pressed Sesame Oil", "Curry Leaves"],
      foodStory:
        "Pootharekulu, or 'Paper Sweet', is made exclusively by women in Atreyapuram village who stretch rice batter over inverted earthen pots into sheets as sheer as tissue paper.",
      heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--1dNQlUKI--/c_fill,f_auto,g_auto,h_750,q_auto,w_1000/https://i.pinimg.com/736x/8d/2f/1d/8d2f1d9be99c37f03bc091be0de70789.jpg?_a=BAMAROWQ0",
      heroCaption: "Authentic Andhra Gongura Mutton curry slow-cooked with sour sorrel leaves and fiery Guntur chillies."
    },
    games: {
      name: "Vamana Guntalu",
      localName: "వామన గుంటలు (Vamana Guntalu)",
      category: "Ancient Two-Row Mancala Board Game",
      boardType: "Carved wooden board with fourteen round depressions",
      instructions:
        "Players move seeds clockwise through cups, capturing seeds when their turn ends opposite an empty cup.",
      culturalSignificance:
        "Popular women's leisure game dating back to the Satavahana era, celebrated in folk songs.",
      illustratedBoardSvgType: "mancala"
    },
    textiles: {
      signatureWeave: "Srikalahasti Kalamkari (Hand-painted using bamboo pen and natural dyes) & Mangalagiri Cotton",
      traditionalAttire: "Langa Voni (Half saree) and Dharmavaram Silk Saree",
      heirloomJewelry: "Vaddanam (Gilded waist belt with Goddess Lakshmi), Kasu Mala & Buttalu earrings",
      craftTechnique: "Drawing epics using tamarind-twig charcoal and bamboo styluses with vegetable and mineral dyes.",
      historicalOrigins: "Patronized by the Vijayanagara rulers at temple temple corridors.",
      heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--Ob-3ZAPw--/c_fill,f_auto,g_auto,h_750,q_auto,w_1000/https://i.pinimg.com/736x/60/4a/f4/604af4a30bd7696eabf2eff9d049bd27.jpg?_a=BAMAROWQ0",
      heroCaption: "Traditional Telugu Langa Voni half-saree with rich zari border and heritage jewelry."
    },
    celebration: {
      majorFestival: "Tirumala Brahmotsavam & Ugadi (Telugu New Year)",
      danceForm: "Kuchipudi (Classical dance-drama featuring the Tarangam brass plate dance)",
      folkMusic: "Annamacharya and Tyagaraja devotional Kritis",
      celebrationRitual: "Dancing atop the rim of a brass plate while balancing a pot of water on the head in Kuchipudi.",
      heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--m4Gt-UWS--/c_fill,f_auto,g_auto,h_750,q_auto,w_1000/https://i.pinimg.com/736x/c4/81/a5/c481a5eea3edc1b8041c6f3ae1d9c9c2.jpg?_a=BAMAROWQ0",
      heroCaption: "Grand Tirumala Brahmotsavam procession with ceremonial decorated caparisoned elephants."
    },
    places: {
      iconicMonument: "Tirumala Venkateswara Temple & Lepakshi Hanging Pillar",
      naturalWonder: "Borra Caves (Million-year-old limestone stalactites in Ananthagiri Hills)",
      hiddenHeritage: "Gandikota (The Grand Canyon of India carved by the Penna River)",
      architecturalStyle: "Vijayanagara monoliths with hanging pillars and multi-pillared Kalyana Mandapams",
      heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--T5AuPI2o--/c_fill,f_auto,g_auto,h_750,q_auto,w_1200/https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Basavannah_statue_at_Lepakshi.JPG/1280px-Basavannah_statue_at_Lepakshi.JPG?_a=BAMAROWQ0",
      heroCaption: "Lepakshi Temple's carved monolithic Nandi bull facing the shrine."
    },
    livingHeritage: {
      traditionalCraft: "Kondapalli Wooden Toys (Lightweight soft Poniki wood toys, GI) & Machilipatnam Kalamkari",
      artForm: "Tholu Bommalata (Shadow leather puppetry telling epics of Ramayana)",
      regionalLanguage: "Telugu",
      oralLegend: "The legend of Bhakta Kannappa who offered his own eyes to the Shivalinga at Kalahasti.",
      architecturalPinnacle: "Lepakshi Temple's miraculous Hanging Pillar that does not touch the granite floor."
    },
    atlas: {
      capital: "Amaravati",
      majorRivers: ["Godavari", "Krishna", "Penna"],
      mountainRanges: ["Eastern Ghats", "Seshachalam Hills"],
      coordinates: "15.9129° N, 79.7400° E",
      svgPathId: "AP",
      culturalLandmarks: [
        { name: "Tirumala Temple", coordinates: "Tirupati", significance: "World's most visited sacred hill shrine perched on seven hills" },
        { name: "Lepakshi Temple", coordinates: "Anantapur", significance: "16th-century Vijayanagara architectural masterpiece with hanging pillar" },
        { name: "Gandikota Fort", coordinates: "Kadapa", significance: "Spectacular gorge carved by the Penna River through red granite rocks" }
      ]
    }
  },

  // 14. TELANGANA
  {
    id: "telangana",
    name: "Telangana",
    nativeName: "తెలంగాణ",
    nativeScript: "Telugu",
    category: "state",
    zone: "South",
    theme: getStateTheme("telangana"),
    epoch: "Satavahana Empire, Kakatiya Dynasty (Warangal) & Qutb Shahi Sultanate",
    introduction:
      "A land of architectural wonder where Kakatiya stone filigree meets Deccani Islamic splendour. Renowned for the four minarets of Charminar, the acoustic marvel of Golconda Fort, world-famous Hyderabadi Biryani, and the geometric weaves of Pochampally Ikat.",
    curatorQuote: "Here pearls were measured in seers, and diamond mines yielded the Koh-i-Noor to the world.",
    curatorAuthor: "Jean-Baptiste Tavernier, French Diamond Merchant, 1676",
    heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--ZzCHqHaS--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/4a/99/f6/4a99f6934dc8bfb9894fd59b2f060136.jpg?_a=BAMAROWQ0",
    heroFallback: "https://res.cloudinary.com/tecwmb40/image/fetch/s--ZzCHqHaS--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/4a/99/f6/4a99f6934dc8bfb9894fd59b2f060136.jpg?_a=BAMAROWQ0",
    taste: {
      title: "The Nizami Dastarkhwan",
      signatureDish: "Hyderabadi Dum Biryani (Kacchi Biryani layered with saffron milk and caramelized onions) & Haleem",
      famousSweet: "Qubani ka Meetha (Stewed Turkish apricots with clotted malai) & Double ka Meetha",
      traditionalBreakfast: "Sarva Pindi (Crisp sesame-peanut rice flour pancake cooked in copper pans)",
      iconicIngredients: ["Shahi Jeera (Caraway)", "Potli Masala", "Apricots", "Rose Water", "Saffron"],
      foodStory:
        "The Nizams of Hyderabad brought master chefs from Persia, blending Mughlai richness with fiery Telugu spices to create one of the world's most sophisticated culinary styles.",
      heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--GtWELDQm--/c_fill,f_auto,g_auto,h_750,q_auto,w_1000/https://i.pinimg.com/736x/7b/95/93/7b95937d1a1f82b2f0bd72d284754be0.jpg?_a=BAMAROWQ0",
      heroCaption: "Authentic Hyderabadi Dum Biryani fragrant with saffron and fried mint."
    },
    games: {
      name: "Tokkudu Billa",
      localName: "తొక్కుడు బిల్లా (Tokkudu Billa)",
      category: "Traditional Hopscotch Grid Game",
      boardType: "Chalk-drawn rectangular numbered chambers on courtyard stone",
      instructions:
        "A flat stone (billa) is thrown into numbered chambers and kicked out while hopping on one leg without landing on boundary lines.",
      culturalSignificance:
        "Vibrant neighborhood game played in old city courtyards across Telangana.",
      illustratedBoardSvgType: "grid"
    },
    textiles: {
      signatureWeave: "Pochampally Ikat (Telia Rumal double-ikat with geometric precision) & Gadwal Silk",
      traditionalAttire: "Pochampally Silk Saree and Sherwani for men",
      heirloomJewelry: "Hyderabadi Pearls & Jadau Choker with emerald drops",
      craftTechnique: "Telia Rumal: Yarns treated with castor oil and ash before double-ikat resist-dyeing.",
      historicalOrigins: "Pochampally was selected by UNWTO as one of the Best Tourism Villages in the world for craft.",
      heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--P9oe0j3a--/c_fill,f_auto,g_auto,h_750,q_auto,w_1000/https://i.pinimg.com/736x/29/41/62/2941622b4f6dfdb07893cff85e165ddf.jpg?_a=BAMAROWQ0",
      heroCaption: "Pochampally Ikat silk saree with rhythmic geometric diamond patterns."
    },
    celebration: {
      majorFestival: "Bathukamma (Floral festival honoring Goddess Gauri) & Bonalu",
      danceForm: "Perini Shivatandavam (Ancient Kakatiya warrior dance revival)",
      folkMusic: "Oggu Katha ballads narrating tales of Lord Shiva and Mallanna",
      celebrationRitual: "Arranging seasonal wild flowers in concentric conical pyramids floating gently on lake waters for Bathukamma.",
      heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--ZvDFr_gP--/c_fill,f_auto,g_auto,h_750,q_auto,w_1000/https://i.pinimg.com/736x/71/97/f7/7197f73dd0ce8f63c1b47fad52d7d9a7.jpg?_a=BAMAROWQ0",
      heroCaption: "Conical Bathukamma flower arrangement decorated with marigolds and lotus."
    },
    places: {
      iconicMonument: "Charminar (Built in 1591) & Golconda Fort",
      naturalWonder: "Bogatha Waterfalls & Laknavaram Lake",
      hiddenHeritage: "Ramappa Temple (UNESCO Heritage floating brick temple, 1213 CE)",
      architecturalStyle: "Indo-Islamic Qutb Shahi stucco domes and Kakatiya black basalt carvings",
      heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--fiCv-eJC--/c_fill,f_auto,g_auto,h_750,q_auto,w_1200/https://i.pinimg.com/736x/f6/08/50/f6085001bad661306e53d8a36bb77e13.jpg?_a=BAMAROWQ0",
      heroCaption: "The four grand minarets of Charminar illuminated at dusk."
    },
    livingHeritage: {
      traditionalCraft: "Bidriware (Zinc and copper alloy inlaid with pure silver sheet filigree, GI) & Nirmal Toys",
      artForm: "Cheriyal Scroll Painting (Narrative story rolls on khadi cloth using tamarind glue)",
      regionalLanguage: "Telugu, Urdu",
      oralLegend: "The legend of Golconda's acoustic whisper gallery: a handclap at the entrance echoes to the royal pavilion a kilometer away.",
      architecturalPinnacle: "Ramappa Temple: Constructed with light-density bricks that literally float on water."
    },
    atlas: {
      capital: "Hyderabad",
      majorRivers: ["Godavari", "Krishna", "Musi"],
      mountainRanges: ["Deccan Plateau Ridges"],
      coordinates: "18.1124° N, 79.0193° E",
      svgPathId: "TG",
      culturalLandmarks: [
        { name: "Charminar", coordinates: "Hyderabad", significance: "Monumental gateway with four 48-meter minarets built in 1591" },
        { name: "Golconda Fort", coordinates: "Hyderabad", significance: "Ancient diamond trading fortress with miraculous acoustic engineering" },
        { name: "Ramappa Temple", coordinates: "Palampet", significance: "UNESCO World Heritage site with floating bricks and sculpted dancers" }
      ]
    }
  },

  // 15. MADHYA PRADESH
  {
    id: "madhya-pradesh",
    name: "Madhya Pradesh",
    nativeName: "मध्य प्रदेश",
    nativeScript: "Devanagari",
    category: "state",
    zone: "Central",
    theme: getStateTheme("madhya-pradesh"),
    epoch: "Mauryan Emperor Ashoka (Sanchi), Chandela Dynasty (Khajuraho) & Holkars",
    introduction:
      "The ancient heart of the subcontinent, where the sacred Narmada flows through marble canyons. Home to the world's oldest Buddhist stupas at Sanchi, the sensual stone sculptures of Khajuraho, dense tiger forests, and the feather-light silks of Chanderi and Maheshwar.",
    curatorQuote: "In the heart of India, stone learned to sing, and stupas learned to guard the peace of the world.",
    curatorAuthor: "Curatorial Inscription, Sanchi Stupa",
    heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--kJMsfF-V--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/d0/f1/6e/d0f16eae84e3a9592f6e721ad84ca104.jpg?_a=BAMAROWQ0",
    heroFallback: "https://res.cloudinary.com/tecwmb40/image/fetch/s--kJMsfF-V--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/d0/f1/6e/d0f16eae84e3a9592f6e721ad84ca104.jpg?_a=BAMAROWQ0",
    taste: {
      title: "Malwa Plateau & Narmada Sweets",
      signatureDish: "Bhutte ka Kees (Grated corn simmered with milk, mustard seeds and coconut) & Dal Bafla",
      famousSweet: "Mawa Bati (Fried mawa balls filled with dried fruits) & Malpua",
      traditionalBreakfast: "Indori Poha with crispy Sev and fennel seeds",
      iconicIngredients: ["Corn (Bhutte)", "Sev of Ratlam", "Desi Ghee", "Poppy Seeds", "Fennel"],
      foodStory:
        "Indore's nocturnal street food market, Sarafa Bazaar, transforms from a jewelry market by day into an open-air culinary celebration past midnight.",
      heroImage: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Golden Indori Poha tossed with mustard seeds, turmeric, and Ratlami sev."
    },
    games: {
      name: "Kho Kho",
      localName: "खो खो (Kho Kho)",
      category: "Ancient Tag and Pursuit Team Game",
      boardType: "Rectangular pitch with two wooden poles at either end",
      instructions:
        "One team kneels in the center facing alternate directions, while the chaser touches a teammate's back shouting 'Kho!' to pursue opponents.",
      culturalSignificance:
        "Mentioned in the Mahabharata as Chakravyuha combat tactics; popularized across Malwa gyms.",
      illustratedBoardSvgType: "outdoor"
    },
    textiles: {
      signatureWeave: "Chanderi Silk-Cotton (Woven with pure gold Zari) and Maheshwari Sarees",
      traditionalAttire: "Maheshwari Saree and Kurta with Safa",
      heirloomJewelry: "Hasli collar, Timaniya & Kada with lion-head terminals",
      craftTechnique: "Chanderi fabric is translucent and gossamer-fine, woven with delicate booties inspired by nature.",
      historicalOrigins: "Queen Ahilyabai Holkar of Indore personally designed and patronized the Maheshwari weave in the 18th century.",
      heroImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Chanderi silk saree with golden peacock zari border against rose fabric."
    },
    celebration: {
      majorFestival: "Khajuraho Dance Festival & Tansen Music Samaroh, Gwalior",
      danceForm: "Matki Dance (Balancing earthen pots on head) and Gond Karma dance",
      folkMusic: "Classical Gwalior Gharana Dhrupad singing",
      celebrationRitual: "Performing classical dances under the stars before the floodlit Western Group of Khajuraho temples.",
      heroImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Classical dancers performing at the Khajuraho temple festival stage."
    },
    places: {
      iconicMonument: "Sanchi Stupa (3rd Century BCE, UNESCO) & Khajuraho Temples",
      naturalWonder: "Bhedaghat Marble Rocks on the Narmada River & Kanha Tiger Reserve",
      hiddenHeritage: "Bhimbetka Rock Shelters (30,000-year-old Stone Age cave paintings)",
      architecturalStyle: "Chandela Nagara spire architecture and Ashokan hemispherical stupas",
      heroImage: "https://images.unsplash.com/photo-1598890777032-bde835ba27c2?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "The great hemispherical dome of Sanchi Stupa with carved torana gateway."
    },
    livingHeritage: {
      traditionalCraft: "Bagh Print Hand-Block Printing (Natural vegetable dyes on cotton, GI) & Bell Metal Dhokra",
      artForm: "Gond Tribal Art (Vibrant dot-and-line paintings depicting spirit animals)",
      regionalLanguage: "Hindi, Malwi, Bundelkhandi",
      oralLegend: "The divine musician Tansen singing Raag Megh Malhar to summon rain in Emperor Akbar's court.",
      architecturalPinnacle: "Toranas of Sanchi: Four monumental gateways carved with intricate Jataka tales."
    },
    atlas: {
      capital: "Bhopal",
      majorRivers: ["Narmada", "Chambal", "Betwa", "Son"],
      mountainRanges: ["Vindhya Range", "Satpura Range"],
      coordinates: "22.9734° N, 78.6569° E",
      svgPathId: "MP",
      culturalLandmarks: [
        { name: "Sanchi Stupa", coordinates: "Raisen", significance: "Oldest stone structure in India commissioned by Emperor Ashoka in 3rd BCE" },
        { name: "Khajuraho Temples", coordinates: "Chhatarpur", significance: "UNESCO World Heritage temple group celebrating sacred life and passion" },
        { name: "Bhimbetka", coordinates: "Raisen", significance: "Paleolithic cave art spanning over 30,000 years of human imagination" }
      ]
    }
  },

  // 16. BIHAR
  {
    id: "bihar",
    name: "Bihar",
    nativeName: "बिहार",
    nativeScript: "Devanagari",
    category: "state",
    zone: "East",
    theme: getStateTheme("bihar"),
    epoch: "Magadha Empire, Mauryan Dynasty, Nalanda University & Buddha's Enlightenment",
    introduction:
      "The intellectual and spiritual cradle of Asia. Where Prince Siddhartha attained enlightenment beneath the Bodhi tree at Bodh Gaya, where Lord Mahavira preached Ahimsa, and where Nalanda University educated thousands of international scholars in the world's first global university.",
    curatorQuote: "From Magadha arose the moral empire of Ashoka, which conquered not with swords, but with compassion.",
    curatorAuthor: "Ashoka's Edicts, Rock Edict XIII",
    heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--xagvAbB---/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/21/26/49/21264957a476f0f6e4f419d799ca9454.jpg?_a=BAMAROWQ0",
    heroFallback: "https://res.cloudinary.com/tecwmb40/image/fetch/s--xagvAbB---/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/21/26/49/21264957a476f0f6e4f419d799ca9454.jpg?_a=BAMAROWQ0",
    taste: {
      title: "The Magadha Hearth",
      signatureDish: "Litti Chokha (Whole wheat balls filled with spiced roasted sattu gram flour, dipped in ghee and served with smoked aubergine mash)",
      famousSweet: "Thekua (Deep-fried whole wheat jaggery cookies with fennel) & Khaja of Silao",
      traditionalBreakfast: "Chura Dahi with jaggery and roasted gram",
      iconicIngredients: ["Sattu (Roasted gram flour)", "Mustard Oil", "Panch Phoran", "Jaggery", "Kala Jeera"],
      foodStory:
        "Litti was the ancient battle food of Magadhan infantry and freedom fighters; cooked on dried cow dung coals, it could withstand tropical heat for days without spoiling.",
      heroImage: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Ghee-drenched Litti with charred brinjal chokha and green chutney."
    },
    games: {
      name: "Kabaddi / Cheeta",
      localName: "कबड्डी (Kabaddi)",
      category: "Ancient Contact Martial Sport",
      boardType: "Rectangular mud court divided into two halves",
      instructions:
        "A raider enters the opposing court chanting 'Kabaddi' on a single breath, tags opponents, and escapes back to the midline.",
      culturalSignificance:
        "Practiced since the Vedic period; honed reflexes and breath control.",
      illustratedBoardSvgType: "outdoor"
    },
    textiles: {
      signatureWeave: "Bhagalpuri Tussar Silk (The Silk City of India) & Sujani Embroidery",
      traditionalAttire: "Tussar Silk Saree and Dhoti-Kurta",
      heirloomJewelry: "Hansuli, Dholna & Nath of Mithila",
      craftTechnique: "Sujani: Kantha-like running stitch quilting old fabrics with narrative folk scenes.",
      historicalOrigins: "Bhagalpur has produced wild Tussar silk for over a thousand years.",
      heroImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Bhagalpuri Tussar silk saree painted with Madhubani tree of life."
    },
    celebration: {
      majorFestival: "Chhath Puja (Ancient Vedic Sun Thanksgiving) & Sonepur Cattle Fair",
      danceForm: "Jhajhi dance and Bidesia folk theater",
      folkMusic: "Maithili folk songs and devotional songs of poet Vidyapati",
      celebrationRitual: "Standing chest-deep in river waters offering arghya to the setting and rising sun.",
      heroImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Devotees offering prayers to the rising sun during Chhath Puja."
    },
    places: {
      iconicMonument: "Mahabodhi Temple, Bodh Gaya (UNESCO) & Nalanda University Ruins",
      naturalWonder: "Vikramshila Gangetic Dolphin Sanctuary",
      hiddenHeritage: "Barabar Caves (Oldest rock-cut caves in India, 3rd Century BCE)",
      architecturalStyle: "Ancient brick monastery architecture and Ashokan polished sandstone pillars",
      heroImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "The sacred Bodhi Tree and stone spire of Mahabodhi Temple."
    },
    livingHeritage: {
      traditionalCraft: "Madhubani Painting (Mithila Art using twigs and fingers with natural dyes, GI) & Sikki Grass Craft",
      artForm: "Mithila Painting (Intricate two-dimensional drawings of flora, fauna, and Hindu deities)",
      regionalLanguage: "Bhojpuri, Maithili, Magahi, Angika",
      oralLegend: "The birth of Sita in Mithila and her divine union with Lord Rama.",
      architecturalPinnacle: "Nalanda University: The red brick monastic dormitories and multi-tiered votive stupas."
    },
    atlas: {
      capital: "Patna (Ancient Pataliputra)",
      majorRivers: ["Ganga", "Kosi", "Gandak", "Son"],
      mountainRanges: ["Rajgir Hills", "Kaimur Hills"],
      coordinates: "25.0961° N, 85.3131° E",
      svgPathId: "BR",
      culturalLandmarks: [
        { name: "Mahabodhi Temple", coordinates: "Bodh Gaya", significance: "The exact spot where Gautama Buddha attained supreme enlightenment" },
        { name: "Nalanda Ruins", coordinates: "Nalanda", significance: "Ancient international monastic university dating from 5th to 12th century CE" },
        { name: "Ashokan Pillar", coordinates: "Vaishali", significance: "Single polished sandstone pillar surmounted by a sculpted lion" }
      ]
    }
  },

  // 17. HIMACHAL PRADESH
  {
    id: "himachal-pradesh",
    name: "Himachal Pradesh",
    nativeName: "हिमाचल प्रदेश",
    nativeScript: "Devanagari",
    category: "state",
    zone: "North",
    theme: getStateTheme("himachal-pradesh"),
    epoch: "Trigarta Kingdom, Katoch Dynasty & Pahari Miniature Painting Era",
    introduction:
      "The abode of snow, sacred cedar valleys, and Apple orchards. Where ancient wooden pagoda temples nestle amidst Himalayan pine forests, where master artists created delicate Kangra miniature paintings, and where the UNESCO Kalka-Shimla toy train winds through 103 stone tunnels.",
    curatorQuote: "In the shadow of the Dhauladhars, even the mountain wind sounds like a hymn of peace.",
    curatorAuthor: "Pahari Folk Saying",
    heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--8TY0ER9h--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/f8/f6/8d/f8f68d87abcefe8c702d6a8fb890e62a.jpg?_a=BAMAROWQ0",
    heroFallback: "https://res.cloudinary.com/tecwmb40/image/fetch/s--8TY0ER9h--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/f8/f6/8d/f8f68d87abcefe8c702d6a8fb890e62a.jpg?_a=BAMAROWQ0",
    taste: {
      title: "Himachali Dham & Mountain Forage",
      signatureDish: "Dham Feast (Sepu Vadi in spinach gravy, Madra chickpeas in yoghurt, and Khatta tamarind dal)",
      famousSweet: "Mittha (Sweetened rice with saffron, raisins and fried dry fruits) & Babru",
      traditionalBreakfast: "Siddu (Steamed leavened wheat bread stuffed with spiced crushed walnuts and poppy seeds)",
      iconicIngredients: ["Guchhi (Wild Himalayan morel mushrooms)", "Dried Pomegranate Seeds (Anardana)", "Walnuts", "Curd", "Mustard Oil"],
      foodStory:
        "Himachali Dham is cooked exclusively by hereditary Brahmin cooks (Botis) in brass cauldrons without onion, garlic, or tomatoes, using curd and spices.",
      heroImage: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Steaming Siddu stuffed with spiced walnut paste and dipped in melted ghee."
    },
    games: {
      name: "Pithoo / Lagori",
      localName: "पिट्ठू (Pithoo)",
      category: "Traditional Seven Stones Target Game",
      boardType: "Seven flat river stones stacked vertically in an open ground",
      instructions:
        "One team throws a ball to knock down the stone tower and tries to restack it while the opposing team throws the ball to tag them out.",
      culturalSignificance:
        "A cherished village game played during long summer afternoons in apple orchards.",
      illustratedBoardSvgType: "outdoor"
    },
    textiles: {
      signatureWeave: "Kullu Shawl (Geometric brightly colored border designs) & Chamba Rumal",
      traditionalAttire: "Pattoo woolen wrap with Dhaatu headscarf & Himachali Cap with velvet crest",
      heirloomJewelry: "Chandrahar silver coin necklace, Nath of Kangra & Chak hair ornament",
      craftTechnique: "Chamba Rumal: Reversible needle embroidery (Dorukha) that looks identical on both front and back.",
      historicalOrigins: "Kullu shawls originated from traditional pastoral Gaddis weaving wool from sheep.",
      heroImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Himachali Kullu woolen shawl featuring vivid geometric border motifs."
    },
    celebration: {
      majorFestival: "Kullu Dussehra (Week-long congregation of 200 mountain deities) & Minjar Fair",
      danceForm: "Nati (Guinness World Record community circle dance) and Chham mask dance",
      folkMusic: "Ransingha (S-shaped curved brass trumpet), Shehnai and Dhol",
      celebrationRitual: "Carrying village deities on wooden palanquins (rathas) to pay homage to Lord Raghunath.",
      heroImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Hundreds of villagers in colorful Himachali caps dancing the Nati."
    },
    places: {
      iconicMonument: "Kangra Fort (Oldest dated fort in India) & Ki Monastery, Spiti",
      naturalWonder: "Chandratal Lake (The Moon Lake) & Rohtang Pass",
      hiddenHeritage: "Masrur Rock-Cut Temples (8th-century monolithic sandstone temples facing snowy peaks)",
      architecturalStyle: "Kath-Kuni architecture: Interlocking deodar cedar logs and dry-stacked slate stones",
      heroImage: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Ki Tibetan monastery perched high on a conical hill in Spiti Valley."
    },
    livingHeritage: {
      traditionalCraft: "Chamba Rumal Embroidery (GI) & Wood carving of Mandi",
      artForm: "Kangra Miniature Paintings (Delicate lyricism and romantic naturalism of Radha-Krishna)",
      regionalLanguage: "Pahari (Kangri, Mandiyali, Kulvi)",
      oralLegend: "The legend of Princess Chandramukhi and the divine guardians of the mountain passes.",
      architecturalPinnacle: "Kath-Kuni technique: Earthquake-resistant construction utilizing alternating wood and stone layers."
    },
    atlas: {
      capital: "Shimla (Summer) / Dharamshala (Winter)",
      majorRivers: ["Beas", "Chenab", "Ravi", "Sutlej"],
      mountainRanges: ["Dhauladhar Range", "Pir Panjal", "Greater Himalayas"],
      coordinates: "31.1048° N, 77.1734° E",
      svgPathId: "HP",
      culturalLandmarks: [
        { name: "Kalka-Shimla Railway", coordinates: "Shimla", significance: "UNESCO World Heritage mountain narrow-gauge railway built in 1903" },
        { name: "Masrur Rock Cut", coordinates: "Kangra", significance: "Complex of 15 monolithic rock-cut temples carved out of a single ridge" },
        { name: "Ki Monastery", coordinates: "Spiti", significance: "1,000-year-old Tibetan Buddhist monastery at 13,668 feet altitude" }
      ]
    }
  },

  // 18. GOA
  {
    id: "goa",
    name: "Goa",
    nativeName: "गोंय",
    nativeScript: "Konkani (Devanagari)",
    category: "state",
    zone: "West",
    theme: getStateTheme("goa"),
    epoch: "Kadambas of Goa, Vijayanagara & 450 Years of Indo-Portuguese Heritage",
    introduction:
      "A coastal jewel where Konkan tropical soul meets Portuguese architectural elegance. Renowned for baroque white churches rising among coconut palms, spicy kokum-infused fish curries, ceramic Azulejos tiles, and the golden sands of the Arabian Sea.",
    curatorQuote: "Goa is 'Susegad'—a state of peaceful contentment where the sea breeze washes away the hurry of the world.",
    curatorAuthor: "Konkani Folk Proverb",
    heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--gjqo0qev--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/8b/66/15/8b661583a8b0b16ec42c813886a52337.jpg?_a=BAMAROWQ0",
    heroFallback: "https://res.cloudinary.com/tecwmb40/image/fetch/s--gjqo0qev--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/8b/66/15/8b661583a8b0b16ec42c813886a52337.jpg?_a=BAMAROWQ0",
    taste: {
      title: "The Coastal Sussegado Table",
      signatureDish: "Goan Fish Curry (Kingfish simmered with coconut milk and sour kokum) & Pork Vindaloo",
      famousSweet: "Bebinca (Seven-layered traditional coconut milk and egg pudding) & Dodol",
      traditionalBreakfast: "Poi bread stuffed with Goan sausage or spicy Alsande curry",
      iconicIngredients: ["Kokum (Amsul)", "Coconut Vinegar", "Kashmiri Red Chillies", "Feni (Cashew liquor)", "Toddy"],
      foodStory:
        "The Portuguese brought chillies, potatoes, and vinegar to Goa in the 16th century, which fused with native Konkani coconut cooking to create one of the world's great fusion cuisines.",
      heroImage: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Authentic multi-layered baked Goan Bebinca dessert."
    },
    games: {
      name: "Tablam",
      localName: "तब्लम (Tablam)",
      category: "Traditional Coastal Board Game",
      boardType: "Four rows of twelve squares played with four cowries and wooden pawns",
      instructions:
        "Players move pawns along parallel rows to capture opponent pieces, coordinating defense and assault.",
      culturalSignificance:
        "Played by coastal fishermen and village elders on balcão (verandas) during monsoons.",
      illustratedBoardSvgType: "grid"
    },
    textiles: {
      signatureWeave: "Kunbi Handloom Saree (Checked cotton saree woven with red and white checks)",
      traditionalAttire: "Kunbi Saree draped above the ankles & Floral print shirts with shorts for men",
      heirloomJewelry: "Kashtali coral necklace & Patli gold bangles",
      craftTechnique: "Pure combed cotton handloom dyed with native vegetable dyes, revived by designer Wendell Rodricks.",
      historicalOrigins: "Worn by the indigenous Kunbi tribal women who farmed the coastal hills.",
      heroImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Traditional red-and-white checked Kunbi cotton saree."
    },
    celebration: {
      majorFestival: "Goa Carnival (Intriguing float parades before Lent) & Shigmo (Spring folk festival)",
      danceForm: "Fugdi & Dekhnni (Graceful folk dance holding brass oil lamps)",
      folkMusic: "Mando (Romantic Konkani-Portuguese ballroom song) played with Ghumot drum",
      celebrationRitual: "King Momo proclaiming the commencement of carnival merrymaking across the state.",
      heroImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Dancers in colorful carnival feathers and masks along Panaji streets."
    },
    places: {
      iconicMonument: "Basilica of Bom Jesus (Holds the mortal remains of St. Francis Xavier, UNESCO)",
      naturalWonder: "Dudhsagar Waterfalls (Four-tiered sea of milk cascade falling 310 meters)",
      hiddenHeritage: "Fontainhas Latin Quarter (Preserved colorful Portuguese colonial villas with oyster shell windows)",
      architecturalStyle: "Manueline Portuguese baroque with mother-of-pearl louvered windows and grand balcão verandas",
      heroImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "The red laterite facade of the historic Basilica of Bom Jesus."
    },
    livingHeritage: {
      traditionalCraft: "Azulejos Hand-Painted Ceramic Tiles (GI) & Seashell craft",
      artForm: "Ghumot earthenware drum music & Brass lamp casting",
      regionalLanguage: "Konkani",
      oralLegend: "Sage Parashurama shooting an arrow from Sahyadri mountains into the sea, ordering the waters to recede.",
      architecturalPinnacle: "Fontainhas: Ochre and indigo colonial houses where laws historically mandated annual fresh whitewash."
    },
    atlas: {
      capital: "Panaji",
      majorRivers: ["Mandovi", "Zuari", "Chapora"],
      mountainRanges: ["Western Ghats Ridge"],
      coordinates: "15.2993° N, 74.1240° E",
      svgPathId: "GA",
      culturalLandmarks: [
        { name: "Basilica of Bom Jesus", coordinates: "Old Goa", significance: "UNESCO World Heritage 16th-century baroque cathedral" },
        { name: "Dudhsagar Falls", coordinates: "Sanguem", significance: "Spectacular four-tiered waterfall cascading through dense jungle" },
        { name: "Fontainhas", coordinates: "Panaji", significance: "Asia's only surviving Latin Quarter with cobblestone lanes" }
      ]
    }
  },
  // 19. HARYANA
  {
    id: "haryana",
    name: "Haryana",
    nativeName: "हरियाणा",
    nativeScript: "Devanagari",
    category: "state",
    zone: "North",
    theme: getStateTheme("haryana"),
    epoch: "Ancient Vedic Saraswati Valley, Kurukshetra & Tomara Dynasty",
    introduction:
      "The cradle of Vedic thought and epic lore, where the sacred Bhagavad Gita was spoken on the plains of Kurukshetra. Haryana's heritage resonates with pastoral simplicity, vibrant Phulkari embroidery, and the athletic valor of the wrestling akhadas.",
    curatorQuote: "Action alone is your prerogative, never its fruits.",
    curatorAuthor: "The Bhagavad Gita, Kurukshetra",
    heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--rfTIXBMV--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/54/30/6f/54306fc1a01448b6da6e7dd37aa1e7dd.jpg?_a=BAMAROWQ0",
    heroFallback: "https://res.cloudinary.com/tecwmb40/image/fetch/s--rfTIXBMV--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/54/30/6f/54306fc1a01448b6da6e7dd37aa1e7dd.jpg?_a=BAMAROWQ0",
    taste: {
      title: "Desi Ghee & Soil Sustenance",
      signatureDish: "Bajra Khichdi with Hara Cholia (Green chickpea curry) & fresh homemade white butter (Tiddi Makhan)",
      famousSweet: "Rohtak Revdi & Malpua with Rabri",
      traditionalBreakfast: "Gond ke Laddoo & Methi Thepla with creamy buffalo lassi in earthen kulhads",
      iconicIngredients: ["A2 Desi Cow Ghee", "Pearl Millet (Bajra)", "Green Gram", "Mustard Leaves", "Jaggery"],
      foodStory:
        "Known as 'The Land of Rotis and Ghee', Haryanvi cuisine avoids complex spice powders to showcase the pure, untainted sweetness of fresh dairy and stone-ground grains.",
      heroImage: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Steaming Bajra roti topped with golden melting homemade churned butter."
    },
    games: {
      name: "Dangal / Akhada Kushti",
      localName: "कुश्ती (Kushti)",
      category: "Ancient Mud Wrestling Martial Sport",
      boardType: "Earthen Soil Pit infused with Turmeric, Mustard Oil, and Milk",
      instructions:
        "Pehlwans grapple on sacred red soil under strict gurukul discipline, attempting to pin opposing shoulders through classical locks (dhobi pachaad).",
      culturalSignificance:
        "Practiced since the Mahabharata era of Bhima; today Haryana trains the vast majority of India's Olympic wrestling champions.",
      illustratedBoardSvgType: "outdoor"
    },
    textiles: {
      signatureWeave: "Panipat Durrie Handloom & Bagh Phulkari",
      traditionalAttire: "Daaman (Heavy pleated skirt with 52 kalis), Kurti, and Chundri veil with gotta patti",
      heirloomJewelry: "Borla, Haar, and Hansli silver collar neckpiece",
      craftTechnique: "Darning-stitch floral embroidery on homespun khaddar cotton using unspun silk floss.",
      historicalOrigins: "Carried forward through centuries of pastoral celebrations and bridal trousseaus.",
      heroImage: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Intricate red and gold silk embroidery on heirloom bridal dupattas."
    },
    celebration: {
      majorFestival: "Surajkund International Crafts Mela & Gita Mahotsav",
      danceForm: "Dhamal Dance (Ancient martial victory dance) & Khoria",
      folkMusic: "Ragini musical storytelling accompanied by Sarangi and Dholak",
      celebrationRitual: "Lighting 100,000 clay oil lamps across the sacred waters of Brahma Sarovar.",
      heroImage: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Haryanvi folk artists playing traditional brass nagada in festival attire."
    },
    places: {
      iconicMonument: "Brahma Sarovar & Jyotisar (The Ancient Banyan Tree of the Gita discourse)",
      naturalWonder: "Sultanpur Bird Sanctuary (Wetland haven for migratory Siberian cranes)",
      hiddenHeritage: "Yadavindra Gardens, Pinjore (17th-century Mughal terraced water cascade)",
      architecturalStyle: "Indo-Islamic water pavilions and ancient brick stupa architecture",
      heroImage: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Reflections along the historic water channels of Pinjore Gardens."
    },
    livingHeritage: {
      traditionalCraft: "Rewari Traditional Brassware (GI) & Panipat Weaving",
      artForm: "Saang (Folk theatre performed on open wooden platforms)",
      regionalLanguage: "Haryanvi & Hindi",
      oralLegend: "The divine vision of Vishwaroopa revealed by Krishna to Arjuna beneath the sacred banyan tree.",
      architecturalPinnacle: "Pinjore Terraced Gardens: Seven water cascades descending the lower Shivalik slopes."
    },
    atlas: {
      capital: "Chandigarh",
      majorRivers: ["Yamuna", "Ghaggar", "Markanda"],
      mountainRanges: ["Aravalli Hills", "Shivalik Range"],
      coordinates: "29.0588° N, 76.0856° E",
      svgPathId: "HR",
      culturalLandmarks: [
        { name: "Brahma Sarovar", coordinates: "Kurukshetra", significance: "Ancient water reservoir mentioned in Mahabharata and Abul Fazl records" },
        { name: "Yadavindra Gardens", coordinates: "Pinjore", significance: "17th-century Mughal terraced garden complex built by Fidai Khan" },
        { name: "Sultanpur National Park", coordinates: "Gurugram", significance: "Ramsar wetland sanctuary hosting 250+ bird species" }
      ]
    }
  },

  // 20. JHARKHAND
  {
    id: "jharkhand",
    name: "Jharkhand",
    nativeName: "झारखंड",
    nativeScript: "Devanagari",
    category: "state",
    zone: "East",
    theme: getStateTheme("jharkhand"),
    epoch: "Ancient Santhal, Munda & Oraon Forest Kingdoms, Chero Dynasty",
    introduction:
      "The 'Land of Forests' (Jhar-Khand), where sacred Sal groves whisper ancient tribal wisdom and perennial waterfalls tumble from forested plateaus. Home to deep-rooted indigenous cultures, master Dokra metal artisans, and the celebrated sacred Sarhul festivities.",
    curatorQuote: "The forest does not belong to us; we are the breath of the forest.",
    curatorAuthor: "Oral Ballad of the Santhal Pahan Elders",
    heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--6tNuAodi--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/8d/fe/f3/8dfef397f35d427ea867ad991cdcbec1.jpg?_a=BAMAROWQ0",
    heroFallback: "https://res.cloudinary.com/tecwmb40/image/fetch/s--6tNuAodi--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/8d/fe/f3/8dfef397f35d427ea867ad991cdcbec1.jpg?_a=BAMAROWQ0",
    taste: {
      title: "Wild Forest Herbs & Steamed Sustenance",
      signatureDish: "Dhuska (Crispy deep-fried rice & chana dal batter cakes with spicy ghughni)",
      famousSweet: "Arsa Roti (Jaggery-caramelized rice bread coated with sesame seeds)",
      traditionalBreakfast: "Rugda (Wild monsoon button mushrooms simmered with mustard and whole spices)",
      iconicIngredients: ["Sal Leaves", "Mahua Flowers", "Kendu Fruit", "Mustard Oil", "Black Rice"],
      foodStory:
        "Jharkhand tribal food relies entirely on seasonal forest harvests. Dishes are cooked inside folded sal leaves over glowing embers, infusing dishes with pure forest aroma without heavy fats.",
      heroImage: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Fresh golden Dhuska served on hand-stitched sal leaf plates with potato curry."
    },
    games: {
      name: "Kati",
      localName: "काटी (Kati)",
      category: "Indigenous Bamboo Target Balancing Game",
      boardType: "Semi-circular Bamboo Striker on Packed Red Mud",
      instructions:
        "Players propel half-circular polished bamboo discs using their feet, aiming to strike down the opponent's markers across distances.",
      culturalSignificance:
        "Played by Santhal youth after the harvest season to celebrate agility, hand-eye coordination, and village solidarity.",
      illustratedBoardSvgType: "outdoor"
    },
    textiles: {
      signatureWeave: "Kuchai Tussar Silk (Organic wild silk reared on Asan and Arjun trees)",
      traditionalAttire: "Panchi and Parhan (Two-piece hand-woven tribal cotton drape with red borders)",
      heirloomJewelry: "Hansli (Solid silver crescent collar), Tarpat, and Sikri hair ornaments",
      craftTechnique: "Wild cocoons harvested without cutting trees, spun into natural golden raw silk.",
      historicalOrigins: "Tribal communities of Khunti and Saraikela have nurtured wild silk cultivation for millennia.",
      heroImage: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Raw golden luster of handspun organic Kuchai Tussar silk."
    },
    celebration: {
      majorFestival: "Sarhul (The Spring Blossoming of Sal Trees) & Karam Festival",
      danceForm: "Jhumar & Chhau Dance of Saraikela (Masked martial dance with acrobatic leaps)",
      folkMusic: "Mandar clay drum rhythms, Bansuri bamboo flute, and Nagara beats",
      celebrationRitual: "Village priest (Pahan) offering water to three earthen pots to divine the coming year's monsoon.",
      heroImage: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Saraikela Chhau dancers wearing hand-crafted ceramic masks in mythological duel."
    },
    places: {
      iconicMonument: "Baidyanath Jyotirlinga Temple, Deoghar (One of the twelve sacred Shiva shrines)",
      naturalWonder: "Hundru Falls (Subarnarekha River cascading 320 feet over rugged granite)",
      hiddenHeritage: "Maluti Terracotta Temples (Enclave of 72 surviving terracotta temple shrines)",
      architecturalStyle: "Chala-style terracotta brick carving and megalithic stone circles",
      heroImage: "https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Intricate terracotta reliefs depicting Ramayana epics on 17th-century Maluti shrines."
    },
    livingHeritage: {
      traditionalCraft: "Sohrai & Khovar Mural Painting (GI, applied by tribal women using chewed twigs)",
      artForm: "Dokra Lost-Wax Bell Metal Casting (GI)",
      regionalLanguage: "Santhali, Mundari, Ho, Kurukh, Hindi",
      oralLegend: "Birsa Munda ('Dharti Aaba' - Father of the Earth) and the sacred Ulgulan movement.",
      architecturalPinnacle: "Maluti Heritage Village: The world's densest concentration of terracotta shrines."
    },
    atlas: {
      capital: "Ranchi (City of Waterfalls)",
      majorRivers: ["Subarnarekha", "Damodar", "Koel"],
      mountainRanges: ["Chota Nagpur Plateau", "Parasnath Hill"],
      coordinates: "23.6102° N, 85.2799° E",
      svgPathId: "JH",
      culturalLandmarks: [
        { name: "Baidyanath Dham", coordinates: "Deoghar", significance: "Ancient pilgrimage center where millions carry Kanwar water" },
        { name: "Hundru Falls", coordinates: "Ranchi", significance: "Dramatic 320-foot waterfall cascading across Chota Nagpur plateau" },
        { name: "Maluti Temples", coordinates: "Dumka", significance: "Cluster of 72 intricately carved 17th-century terracotta shrines" }
      ]
    }
  },

  // 21. CHHATTISGARH
  {
    id: "chhattisgarh",
    name: "Chhattisgarh",
    nativeName: "छत्तीसगढ़",
    nativeScript: "Devanagari",
    category: "state",
    zone: "Central",
    theme: getStateTheme("chhattisgarh"),
    epoch: "Ancient Dakshina Kosala, Kalachuri Dynasty & Kakatiya Rulers of Bastar",
    introduction:
      "The 'Rice Bowl of Central India', rich with ancestral Sal forests, prehistoric rock shelters, and thunderous waterfalls. Renowned for the 75-day Bastar Dussehra, monumental Kosa silk craftsmanship, and unbroken traditions of tribal bell-metal artistry.",
    curatorQuote: "In Bastar, every sculpture is shaped by the memory of a flame.",
    curatorAuthor: "Dokra Master Sculptors of Kondagaon",
    heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--Xy_7Cpcd--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/7e/e4/f2/7ee4f2c8a218f0ea9735a4b7fbb6ac32.jpg?_a=BAMAROWQ0",
    heroFallback: "https://res.cloudinary.com/tecwmb40/image/fetch/s--Xy_7Cpcd--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/7e/e4/f2/7ee4f2c8a218f0ea9735a4b7fbb6ac32.jpg?_a=BAMAROWQ0",
    taste: {
      title: "Steamed Rice Jewels & Forest Roots",
      signatureDish: "Faraa (Steamed rice flour dumplings tossed in mustard, curry leaves, and sesame)",
      famousSweet: "Dehrori (Cardamom-infused caramelized rice cakes soaked in thick sugar syrup)",
      traditionalBreakfast: "Chila with spicy roasted tomato and green coriander chutney",
      iconicIngredients: ["Chhattisgarhi Red Rice", "Kosa Silkworm pupae", "Mahua Fruit", "Mustard Seeds", "Curry Leaves"],
      foodStory:
        "The indigenous communities developed cooking techniques around steaming and fermented rice water (Bore Baasi), creating cooling meals suited to long days cultivating terrace paddies.",
      heroImage: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Steamed Faraa dumplings tempered with crisp mustard seeds and fresh herbs."
    },
    games: {
      name: "Fugdi",
      localName: "फुगड़ी (Fugdi)",
      category: "Rhythmic Squatting Folk Coordination Game",
      boardType: "Circular courtyard ground with hand-clapping cadences",
      instructions:
        "Girls hold hands in pairs cross-armed, spinning and squatting at increasing speeds while blowing breath rhythms (Phoo-G-Di).",
      culturalSignificance:
        "Celebrated during Hareli and Teeja festivals to foster cardiovascular endurance, joy, and village sisterhood.",
      illustratedBoardSvgType: "outdoor"
    },
    textiles: {
      signatureWeave: "Kosa Silk (Wild Antheraea mylitta silkworm weave of Champa & Janjgir)",
      traditionalAttire: "Lugia saree (wrapped without petticoat for forest agility) & Polka blouse",
      heirloomJewelry: "Suta (silver torque), Bahunta (armlets), and Kardhani (silver waist chain)",
      craftTechnique: "Boiling wild cocoons in copper vessels to yield naturally lustrous fawn and gold raw yarn.",
      historicalOrigins: "Practiced by Dewangan weavers patronized by the Kalachuris since the 11th century.",
      heroImage: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Shimmering texture of pure handwoven Champa Kosa silk."
    },
    celebration: {
      majorFestival: "Bastar Dussehra (75-Day Tribal Festival dedicated to Goddess Danteshwari)",
      danceForm: "Panthi Dance of the Satnamis & Bastar Gaur Maria Horn Dance",
      folkMusic: "Bendir and Mohri wind instruments with colossal Nagara drums",
      celebrationRitual: "Pulling the sacred double-decked eight-wheeled wooden chariot constructed afresh each year without nails.",
      heroImage: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Gaur Maria tribal dancers wearing bison horn headdresses adorned with cowrie shells."
    },
    places: {
      iconicMonument: "Sirpur Buddhist Monuments & Baleshwar Temple (7th-century brick monastery)",
      naturalWonder: "Chitrakote Falls (The 'Niagara of India' spanning 980 feet across the Indravati river)",
      hiddenHeritage: "Kanger Valley National Park & Kutumsar Caves (Ancient subterranean stalactites)",
      architecturalStyle: "Early red-brick Nagara temple design and indigenous woodcraft",
      heroImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "The roaring horseshoe crest of Chitrakote Falls shrouded in sunset rainbow mist."
    },
    livingHeritage: {
      traditionalCraft: "Bastar Dokra (GI, Lost-wax hollow bronze casting) & Bastar Wrought Iron (Loha Shilp, GI)",
      artForm: "Godna Tattoo Art & Cowrie-shell embroidery",
      regionalLanguage: "Chhattisgarhi, Gondi, Halbi, Hindi",
      oralLegend: "Goddess Danteshwari guiding King Annama Deva across the rivers to establish Bastar kingdom.",
      architecturalPinnacle: "Sirpur Lakshmana Temple: One of India's finest surviving 7th-century brick temples."
    },
    atlas: {
      capital: "Raipur",
      majorRivers: ["Mahanadi", "Indravati", "Hasdeo"],
      mountainRanges: ["Maikal Hills", "Bailadila Range"],
      coordinates: "21.2787° N, 81.8661° E",
      svgPathId: "CG",
      culturalLandmarks: [
        { name: "Chitrakote Falls", coordinates: "Bastar", significance: "Spectacular 980-foot wide horseshoe waterfall on Indravati river" },
        { name: "Sirpur Heritage Complex", coordinates: "Mahasamund", significance: "Major 7th-century Buddhist, Shaivite, and Vaishnavite archaeological hub" },
        { name: "Danteshwari Temple", coordinates: "Dantewada", significance: "Ancient Shakti Peetha and spiritual anchor of Bastar Dussehra" }
      ]
    }
  },

  // 22. UTTARAKHAND
  {
    id: "uttarakhand",
    name: "Uttarakhand",
    nativeName: "उत्तराखंड",
    nativeScript: "Devanagari",
    category: "state",
    zone: "North",
    theme: getStateTheme("uttarakhand"),
    epoch: "Ancient Katyuri Dynasty, Garhwal & Kumaon Kingdoms, Char Dham Pioneers",
    introduction:
      "Devbhoomi — 'The Land of the Gods', where the sacred Ganga and Yamuna descend from crystalline Himalayan glaciers. Crowned by the sacred Nanda Devi peak, alpine meadows of alpine rhododendrons, and centuries of Pahadi stone and deodar-wood architecture.",
    curatorQuote: "The Himalayas are not merely mountains; they are the contemplative soul of India.",
    curatorAuthor: "Kalidasa, Kumarasambhava",
    heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--EPhcgMg3--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/47/14/30/471430b468f840c3b500bbe9aee44eac.jpg?_a=BAMAROWQ0",
    heroFallback: "https://res.cloudinary.com/tecwmb40/image/fetch/s--EPhcgMg3--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/47/14/30/471430b468f840c3b500bbe9aee44eac.jpg?_a=BAMAROWQ0",
    taste: {
      title: "Alpine Millets & Wild Mountain Herbs",
      signatureDish: "Kafuli (Tender mountain spinach & fenugreek gravy simmered in an iron kadhai) & Chainsoo",
      famousSweet: "Almora Bal Mithai (Roasted brown fudge coated with sugar beads) & Singori wrapped in fragrant Malu leaves",
      traditionalBreakfast: "Aloo ke Gutke (Spiced mountain baby potatoes tossed in wild Jamboo herb)",
      iconicIngredients: ["Jamboo (Wild mountain chive)", "Bhatt (Black soybean)", "Gahat (Horse gram)", "Jakhiya seeds", "Desi Ghee"],
      foodStory:
        "High-altitude living led Pahadi communities to temper foods with Jakhiya (Cleome seeds), giving dishes a delicate nutty crunch, while iron utensils enrich every slow-simmered lentil broth.",
      heroImage: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Authentic Kumaoni Thali featuring Kafuli, Bhatt ki Churkani, and crispy Mandua roti."
    },
    games: {
      name: "Bagha-Chheli",
      localName: "बाघ-छेली (Bagha-Chheli)",
      category: "Himalayan Predator-and-Prey Strategic Board Game",
      boardType: "Pahadi Slate Stone etched with Geometric Intersecting Paths",
      instructions:
        "One player commands 4 ferocious tigers (Bagha), while the opponent maneuvers 20 nimble goats (Chheli) seeking to surround and immobilize the predators.",
      culturalSignificance:
        "Etched on temple steps across Garhwal and Kumaon, teaching village shepherds tactical foresight and protective coordination.",
      illustratedBoardSvgType: "grid"
    },
    textiles: {
      signatureWeave: "Panchachuli Handwoven Sheep Wool Blankets & Thulma Shawls",
      traditionalAttire: "Ghagra-Pichora (Saffron-yellow bridal veil with red auspicious dots) & Kurti",
      heirloomJewelry: "Nathuli (Enormous gold crescent nose ring studded with rubies and pearls)",
      craftTechnique: "Weaving fine Bhotia sheep and Angora rabbit wool on backstrap and pit looms.",
      historicalOrigins: "Trans-Himalayan Tibetan-Pahadi trade routes pioneered by the Bhotia merchant clans.",
      heroImage: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Auspicious red-and-gold Pichora veil hand-stamped with sun, moon, and temple motifs."
    },
    celebration: {
      majorFestival: "Nanda Devi Raj Jat Yatra (The Royal Himalayan Pilgrimage) & Ganga Dussehra",
      danceForm: "Choliya Dance (Ancient sword martial dance of Kumaoni Rajputs) & Jhora",
      folkMusic: "Ransingha curved brass war trumpets, Dhol-Damau drums, and Hurka",
      celebrationRitual: "Leading the sacred four-horned ram (Chasingha Khadu) across 280 kilometers of glaciers.",
      heroImage: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Choliya sword dancers in crimson tunics performing along mountain ridges."
    },
    places: {
      iconicMonument: "Kedarnath Temple (8th-century stone temple standing amid high glacial peaks)",
      naturalWonder: "Valley of Flowers (UNESCO World Heritage alpine wildflower meadow)",
      hiddenHeritage: "Jageshwar Temple Cluster (124 ancient stone Nagara shrines in dense deodar forest)",
      architecturalStyle: "Katyuri architecture: Interlocking dry-stone construction with pagoda slate roofs",
      heroImage: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Kedarnath Temple glowing against twilight snow-dusted Himalayan peaks."
    },
    livingHeritage: {
      traditionalCraft: "Aipan Folk Ritual Floor Art (GI, geometric designs drawn with white rice paste on terracotta red)",
      artForm: "Ringal Bamboo Weaving & Pahadi Deodar Wood Carving",
      regionalLanguage: "Garhwali, Kumaoni, Jaunsari, Hindi",
      oralLegend: "Adi Shankaracharya re-establishing the sacred Char Dham shrines across the snow peaks in the 8th century.",
      architecturalPinnacle: "Kedarnath: Weathered grey granite blocks interlocking without mortar for over a millennium."
    },
    atlas: {
      capital: "Dehradun (Winter) / Gairsain (Summer)",
      majorRivers: ["Ganga", "Yamuna", "Alaknanda", "Bhagirathi"],
      mountainRanges: ["Garhwal Himalayas", "Kumaon Himalayas", "Nanda Devi Peak (7,816 m)"],
      coordinates: "30.0668° N, 79.0193° E",
      svgPathId: "UK",
      culturalLandmarks: [
        { name: "Kedarnath Shrine", coordinates: "Rudraprayag", significance: "One of the sacred 12 Jyotirlingas, perched at 3,583 meters" },
        { name: "Valley of Flowers", coordinates: "Chamoli", significance: "UNESCO World Heritage alpine meadow blooming with 500+ flower species" },
        { name: "Har Ki Pauri", coordinates: "Haridwar", significance: "Ancient holy river ghat where evening Ganga Aarti draws thousands of floating lamps" }
      ]
    }
  },

  // 23. SIKKIM
  {
    id: "sikkim",
    name: "Sikkim",
    nativeName: "सिक्किम",
    nativeScript: "Devanagari / Lepcha",
    category: "state",
    zone: "North-East",
    theme: getStateTheme("sikkim"),
    epoch: "Ancient Lepcha Elders, Namgyal Dynasty Chogyals & Buddhist Monasteries",
    introduction:
      "A serene Himalayan sanctuary nestled under the benevolent gaze of Mount Kanchenjunga. The first fully organic state in the world, Sikkim is a tapestry of ancient Buddhist monasteries, sacred high-altitude glacial lakes, and the living textile arts of Lepcha and Bhutia masters.",
    curatorQuote: "Kanchenjunga is not a mountain to be conquered; it is a deity that guards our breath.",
    curatorAuthor: "Namgyal Chogyal Royal Chronicle",
    heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--6wBkNnvF--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/dc/7d/36/dc7d36e85e63fff3d6475ce4cdad6b6d.jpg?_a=BAMAROWQ0",
    heroFallback: "https://res.cloudinary.com/tecwmb40/image/fetch/s--6wBkNnvF--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/dc/7d/36/dc7d36e85e63fff3d6475ce4cdad6b6d.jpg?_a=BAMAROWQ0",
    taste: {
      title: "Fermented Mountain Flavors & Steamed Delights",
      signatureDish: "Phagshapa (Pork strips braised with sun-dried mountain radishes and dry red chillies)",
      famousSweet: "Sael Roti (Crisp, lacy fermented rice flour bread fried to golden perfection)",
      traditionalBreakfast: "Steamed Momos with fiery fermented Dalle Khursani chili sauce & hot clear broth",
      iconicIngredients: ["Dalle Khursani (Round Cherry Chilli, GI)", "Fermented Bamboo Shoot (Tama)", "Chhurpi (Yak Cheese)", "Cardamom", "Mustard Greens"],
      foodStory:
        "Sikkimese cuisine relies on nature's alchemy: wild ferns (Ningro), smoked pork, and hard dried yak cheese (Chhurpi) preserved through harsh winter blizzards.",
      heroImage: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Steaming bamboo baskets of hand-pleated dumplings served with cherry-chilli dip."
    },
    games: {
      name: "Dha",
      localName: "ध (Dha / Archery)",
      category: "Highland Traditional Archery Tournament",
      boardType: "Target board set at 140 meters across mountain meadows",
      instructions:
        "Archers shoot pointed bamboo arrows using hand-carved mountain bamboo bows, celebrated with victory songs and round dances upon striking the distant bullseye.",
      culturalSignificance:
        "A cherished sport among Bhutia and Lepcha warriors, celebrating marksmanship and mental poise.",
      illustratedBoardSvgType: "outdoor"
    },
    textiles: {
      signatureWeave: "Lepcha Handloom Weaving & Bhutia Woollen Carpets",
      traditionalAttire: "Bakhu / Kho (Sleeveless silk wrap coat worn with colourful silk Honju blouses) & Kera belt",
      heirloomJewelry: "Khao (Gold and turquoise amulet box), Yencho earrings, and coral necklaces",
      craftTechnique: "Weaving raw mountain sheep wool and nettle fiber with vibrant Buddhist lotus emblems.",
      historicalOrigins: "Practiced for over five centuries across the monasteries and village looms of Rumtek.",
      heroImage: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Intricately hand-woven Buddhist auspicious knot and dragon motifs in silk thread."
    },
    celebration: {
      majorFestival: "Losar (Tibetan New Year) & Saga Dawa (Honoring the Buddha's Enlightenment)",
      danceForm: "Cham Sacred Masked Dance & Singhi Chham (The Kanchenjunga Snow Lion Dance)",
      folkMusic: "Gyaling oboe melodies, Dungchen long horns, and temple bell chimes",
      celebrationRitual: "Lamas performing sacred Cham dances in velvet robes and fierce protector masks to cleanse negativity.",
      heroImage: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Monks in gold-crested helmets playing colossal copper horns across monastery courtyards."
    },
    places: {
      iconicMonument: "Rumtek Monastery (The Dharma Chakra Centre, seat of the Karmapa)",
      naturalWonder: "Gurudongmar Lake (Sacred glacial lake at 17,800 feet that never completely freezes)",
      hiddenHeritage: "Yuksom (The historic 1642 coronation capital where three lamas consecrated the first Chogyal)",
      architecturalStyle: "Tibetan-Sikkimese Buddhist monastery architecture with golden Pagoda finials",
      heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "The red and gold lacquered facade of Rumtek Monastery framed by mountain mist."
    },
    livingHeritage: {
      traditionalCraft: "Choktse (Intricately carved and lacquered folding wooden altar tables)",
      artForm: "Thangka Buddhist Scroll Painting using crushed mineral pigments and gold leaf",
      regionalLanguage: "Nepali, Sikkimese (Bhutia), Lepcha, Limbu, English",
      oralLegend: "Guru Padmasambhava sanctifying the hidden valley (Beyul Demazong) as an earthly paradise.",
      architecturalPinnacle: "Rumtek Monastery: Multi-tiered monastic shrine preserving rare Buddhist relics."
    },
    atlas: {
      capital: "Gangtok",
      majorRivers: ["Teesta", "Rangeet"],
      mountainRanges: ["Kanchenjunga Massif (8,586 m, 3rd highest peak on Earth)"],
      coordinates: "27.5330° N, 88.5122° E",
      svgPathId: "SK",
      culturalLandmarks: [
        { name: "Rumtek Monastery", coordinates: "Gangtok", significance: "Grand monastic repository of Kagyu Tibetan Buddhist lineage" },
        { name: "Gurudongmar Lake", coordinates: "Mangan", significance: "One of the highest freshwater alpine lakes on Earth, sacred to Buddhists and Sikhs" },
        { name: "Yuksom Coronation Throne", coordinates: "Gyalshing", significance: "Birthplace of the Kingdom of Sikkim where the first Chogyal was crowned in 1642" }
      ]
    }
  },

  // 24. ARUNACHAL PRADESH
  {
    id: "arunachal-pradesh",
    name: "Arunachal Pradesh",
    nativeName: "अरुणाचल प्रदेश",
    nativeScript: "Devanagari",
    category: "state",
    zone: "North-East",
    theme: getStateTheme("arunachal-pradesh"),
    epoch: "Ancient Monpa, Apatani, Adi & Mishmi Tribal Confederations, Tawang Monasteries",
    introduction:
      "The 'Land of the Dawn-Lit Mountains', the first Indian territory to greet the morning sun. A breathtaking expanse of snow-covered Himalayan peaks, dense subtropical rainforests, and 26 distinct major tribes celebrated for cane bridges, and sacred Mahayana monasteries.",
    curatorQuote: "When the first golden ray strikes Tawang, the prayers of thousands awaken the dawn.",
    curatorAuthor: "Monpa Monastic Lore",
    heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--H22mYc-4--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/23/66/fb/2366fbed3200cd8e5f61116449cb57ee.jpg?_a=BAMAROWQ0",
    heroFallback: "https://res.cloudinary.com/tecwmb40/image/fetch/s--H22mYc-4--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/23/66/fb/2366fbed3200cd8e5f61116449cb57ee.jpg?_a=BAMAROWQ0",
    taste: {
      title: "Forest Herbs & Smoked Delicacies",
      signatureDish: "Pika Pila (Spicy bamboo shoot and pork fat pickle infused with king chilli and sun-dried meat)",
      famousSweet: "Khapse (Traditional Tibetan crisp festive cookies flavored with cardamom)",
      traditionalBreakfast: "Zan (Hearty finger millet porridge slow-cooked with fresh mountain vegetables)",
      iconicIngredients: ["King Chilli (Bhut Jolokia)", "Fermented Bamboo Shoot", "Sichuan Pepper (Maroi)", "Wild Greens", "Ginger"],
      foodStory:
        "Arunachali tribes prepare food using indigenous hollow bamboo tubes (*Pasa* and *Chura*), slow-steaming ingredients over open wood hearths to retain pure forest nutrition.",
      heroImage: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Freshly roasted bamboo-tube delicacies served with wild herbs and red rice."
    },
    games: {
      name: "Majong",
      localName: "माजोंग (Majong)",
      category: "Tribal Bamboo Balance & Agility Contest",
      boardType: "Suspended Highland Bamboo Beams",
      instructions:
        "Athletes balance along swaying bamboo bridges or poles suspended across streams, testing balance, agility, and river crossing skills.",
      culturalSignificance:
        "Born from ancient requirements of surviving monsoon rivers and dense Himalayan gorges.",
      illustratedBoardSvgType: "outdoor"
    },
    textiles: {
      signatureWeave: "Apatani & Adi Geometric Handloom (Galle skirts & Monpa coats)",
      traditionalAttire: "Galle (Handwoven wrap skirt with geometric zigzags) and woven fiber raincoats",
      heirloomJewelry: "Turquoise, coral beads, and cast brass neck rings",
      craftTechnique: "Looms built from natural bamboo and cane, using natural vegetable and madder root dyes.",
      historicalOrigins: "Passed down maternally across generations in Ziro Valley and Siang river basins.",
      heroImage: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Apatani weavers crafting red and black diamond geometric patterns on backstrap looms."
    },
    celebration: {
      majorFestival: "Torgya Festival of Tawang & Losar New Year, Nyokum of the Nyishis",
      danceForm: "Aji Lhamu Folk Dance & Lion and Peacock Dances of the Monpas",
      folkMusic: "Emuk wind instruments, wooden cymbals, and sacred temple chimes",
      celebrationRitual: "Lamas in colorful robes casting a consecrated flour cake (Torma) into fire to dispel malevolent spirits.",
      heroImage: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Dancers in peacock feather crests performing the sacred Monpa masked ritual."
    },
    places: {
      iconicMonument: "Tawang Monastery (India's largest Buddhist monastery, founded in 1680 CE)",
      naturalWonder: "Sela Pass (Perpetually snow-capped mountain pass at 13,700 feet with twin lakes)",
      hiddenHeritage: "Ziro Valley (UNESCO tentative heritage landscape of Apatani paddy-cum-pisciculture)",
      architecturalStyle: "Tibetan fortress monastery (Dzong) style and cane suspension bridge engineering",
      heroImage: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Tawang Monastery rising like a fortress city against snow-covered peaks."
    },
    livingHeritage: {
      traditionalCraft: "Monpa Handmade Paper (GI, made from the bark of Daphne papyracea shrub)",
      artForm: "Wancho Wood Carving & Cane and Bamboo Suspension Bridges",
      regionalLanguage: "Monpa, Adi, Nyishi, Apatani, Hindi, English",
      oralLegend: "The birth of the sixth Dalai Lama, Tsangyang Gyatso, in the high mountains of Tawang.",
      architecturalPinnacle: "Tawang Monastery: Housing an 8-meter gilded Buddha statue and thousands of scriptures."
    },
    atlas: {
      capital: "Itanagar",
      majorRivers: ["Siang (Brahmaputra)", "Subansiri", "Kameng", "Lohit"],
      mountainRanges: ["Eastern Himalayas", "Kangto Peak (7,060 m)"],
      coordinates: "28.2180° N, 94.7278° E",
      svgPathId: "AR",
      culturalLandmarks: [
        { name: "Tawang Monastery", coordinates: "Tawang", significance: "340-year-old Mahayana Buddhist monastery, second largest on Earth" },
        { name: "Sela Pass", coordinates: "West Kameng", significance: "Strategic high mountain pass flanked by sacred azure lakes" },
        { name: "Ziro Pine Valley", coordinates: "Lower Subansiri", significance: "Eco-cultural wonder of sustainable Apatani water harvesting" }
      ]
    }
  },

  // 25. NAGALAND
  {
    id: "nagaland",
    name: "Nagaland",
    nativeName: "नागालैंड",
    nativeScript: "English / Roman Nagamese",
    category: "state",
    zone: "North-East",
    theme: getStateTheme("nagaland"),
    epoch: "Ancient 16 Major Naga Warrior Clans & Morung Village Republics",
    introduction:
      "The 'Falcon Capital of the World', a rugged mountainous land of warrior pride, vibrant beadwork, and centuries-old village republics. Renowned globally for the Hornbill Festival, distinctive clan shawls, and rich oral storytelling passed down in communal youth dormitories (*Morungs*).",
    curatorQuote: "A Naga's shawl is his heraldry, his ancestry, and his honor.",
    curatorAuthor: "Angami Tribal Chieftains' Proverb",
    heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--v8dnGEpV--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/2d/24/04/2d24046412b4043c39c338135ae66baa.jpg?_a=BAMAROWQ0",
    heroFallback: "https://res.cloudinary.com/tecwmb40/image/fetch/s--v8dnGEpV--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/2d/24/04/2d24046412b4043c39c338135ae66baa.jpg?_a=BAMAROWQ0",
    taste: {
      title: "Woodsmoke, Fermented Beans & King Chilli",
      signatureDish: "Smoked Pork slow-braised with Axone (Fermented soya bean) and fiery Raja Mircha (Bhut Jolokia)",
      famousSweet: "Nap Nang (Aromatic black sticky rice pudding simmered with sweet coconut milk)",
      traditionalBreakfast: "Galho (Nutritious rice porridge slow-cooked with fresh mustard greens and smoked pork)",
      iconicIngredients: ["Naga King Chilli (Bhut Jolokia, GI)", "Axone (Fermented Soybean)", "Anishi (Fermented Yam Leaves)", "Bamboo Shoot", "Szechuan Pepper"],
      foodStory:
        "Meats are hung in bamboo baskets above open kitchen hearths for months, gently curing in hickory smoke. Fermented Axone paste adds deep, savory umami to every broth.",
      heroImage: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Authentic Naga smoked meat stew served with steaming sticky rice and spicy chutney."
    },
    games: {
      name: "Kene (Naga Wrestling)",
      localName: "केने (Kene)",
      category: "Traditional Belt Wrestling Martial Sport",
      boardType: "Circular Earth Arena with Colored Cloth Belts",
      instructions:
        "Competitors bind colored cloth belts around their waists. Using upper body torque and balance, each wrestler attempts to force any part of the opponent's body above the knee to touch the ground.",
      culturalSignificance:
        "A cherished warrior discipline that resolves clan disputes without weapons and fosters inter-village brotherhood.",
      illustratedBoardSvgType: "outdoor"
    },
    textiles: {
      signatureWeave: "Naga Clan Shawls (Tsungkotepsu of the Aos, Rongsu, and Angami Loramhoushu)",
      traditionalAttire: "Handwoven tribal wrap with woven cowrie shells and wild boar tusk armlets",
      heirloomJewelry: "Carnelian beads, wild boar tusk necklaces, and brass warrior necklets",
      craftTechnique: "Looms set up on backstraps, weaving black, red, and white bands representing courage, blood, and purity.",
      historicalOrigins: "Specific motifs could historically only be worn by warriors who demonstrated supreme valor or hosted feasts of merit.",
      heroImage: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Striking black, scarlet, and ivory geometric stripes of authentic Ao Naga warrior shawls."
    },
    celebration: {
      majorFestival: "Hornbill Festival (The 'Festival of Festivals' at Kisama) & Moatsu of the Aos",
      danceForm: "Warrior War Dance with spears and shields & Rhythmic Stomp Dance",
      folkMusic: "Log Drum (colossal carved hollowed tree trunk) resonant booming & Tati one-stringed fiddle",
      celebrationRitual: "Beating the monumental village log drum in synchronized cadence to signal seasonal dawn and festivals.",
      heroImage: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Naga warriors in ceremonial hornbill feather headdresses dancing in unison."
    },
    places: {
      iconicMonument: "Kisama Heritage Village (The grand amphitheatre of 16 tribal communal morungs)",
      naturalWonder: "Dzukou Valley (High-altitude 'Valley of Flowers' bordering Manipur with rare Dzukou lilies)",
      hiddenHeritage: "Khonoma Green Village (Asia's first conservation village, renowned for Angami stone terracing)",
      architecturalStyle: "Morung architecture with carved hornbill crests, bison horn rafters, and massive timber pillars",
      heroImage: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Carved wooden hornbill gateway of an ancestral Angami village morung."
    },
    livingHeritage: {
      traditionalCraft: "Naga Bamboo & Cane Baskets, Spear-making, and Wood Sculpting",
      artForm: "Log Drum Carving & Body Tattooing Traditions",
      regionalLanguage: "English (Official), Nagamese, Ao, Angami, Sumi, Lotha",
      oralLegend: "The legendary migration of the Naga clans from the ancestral stone village of Khezhakenoma.",
      architecturalPinnacle: "Khonoma Terraced Fields: Ingenious dry-stone tiered rice paddies cultivated without erosion for 500 years."
    },
    atlas: {
      capital: "Kohima",
      majorRivers: ["Doyang", "Dhansiri", "Dikhu"],
      mountainRanges: ["Naga Hills", "Mount Saramati (3,841 m)"],
      coordinates: "25.6751° N, 94.1086° E",
      svgPathId: "NL",
      culturalLandmarks: [
        { name: "Kisama Heritage Village", coordinates: "Kohima", significance: "Venue of the celebrated annual Hornbill Festival celebrating all 16 tribes" },
        { name: "Dzukou Valley", coordinates: "Kohima Border", significance: "Enchanting undulating green valley famous for the endemic pink Dzukou lily" },
        { name: "Khonoma Green Village", coordinates: "Kohima", significance: "Historic 700-year-old Angami settlement and pioneers of community forest conservation" }
      ]
    }
  },

  // 26. MANIPUR
  {
    id: "manipur",
    name: "Manipur",
    nativeName: "মণিপুর",
    nativeScript: "Meitei Mayek / Bengali",
    category: "state",
    zone: "North-East",
    theme: getStateTheme("manipur"),
    epoch: "Ancient Ningthouja Dynasty, Kangleipak Kingdom & Classical Raas Leela Masters",
    introduction:
      "The 'Jeweled Land' (Kangleipak), celebrated for classical Manipuri Raas Leela dance, the birthplace of modern polo (*Sagol Kangjei*), and Loktak Lake — the world's only floating national park. A civilization of refined martial arts (*Thang-Ta*), and master black-stone pottery.",
    curatorQuote: "When a Manipuri walks, it is dance; when they speak, it is melody.",
    curatorAuthor: "Jawaharlal Nehru on the valleys of Imphal",
    heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--kwg0gXRb--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/c3/af/24/c3af2498fe8ea9975d94f7d4cac0ab8f.jpg?_a=BAMAROWQ0",
    heroFallback: "https://res.cloudinary.com/tecwmb40/image/fetch/s--kwg0gXRb--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/c3/af/24/c3af2498fe8ea9975d94f7d4cac0ab8f.jpg?_a=BAMAROWQ0",
    taste: {
      title: "Fermented Fish, Purple Rice & Fresh Water Greens",
      signatureDish: "Kangshoi (Nutritious vegetable and dried fish stew seasoned with wild allium herbs and king chillies)",
      famousSweet: "Chak-hao Kheer (Aromatic, rich purple-black sticky rice pudding with cardamom and roasted nuts)",
      traditionalBreakfast: "Tan (Crisp flatbread) served with spicy potato mash (Aloo Kangmet) and black tea",
      iconicIngredients: ["Chak-hao (Black Rice, GI)", "Ngari (Fermented Fish)", "Yelashang (Water celery)", "Bamboo Shoots", "Bhut Jolokia"],
      foodStory:
        "Meitei cuisine celebrates raw health: meals are served with abundant raw herbs and greens picked fresh from lake gardens, paired with deep umami from sun-cured fermented fish.",
      heroImage: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Vibrant royal purple bowl of slow-simmered Chak-hao black rice kheer."
    },
    games: {
      name: "Sagol Kangjei",
      localName: "সগোল কাংজৈ (Sagol Kangjei)",
      category: "The Original Ancestor of Modern Polo",
      boardType: "Open Grass Field played on Semi-wild Manipuri Ponies",
      instructions:
        "Seven riders on each side mounted on indigenous Manipuri ponies hit a seasoned bamboo root ball using mallets of bent cane.",
      culturalSignificance:
        "Created in Manipur centuries ago as a royal martial exercise; officially recognized by Guinness World Records as the birthplace of modern Polo.",
      illustratedBoardSvgType: "outdoor"
    },
    textiles: {
      signatureWeave: "Shaphee Lanphee (GI embroidered shawl) & Moirang Phee (Temple border cotton)",
      traditionalAttire: "Phanek (Handwoven striped wrap-around skirt) and translucent Innaphi shawl",
      heirloomJewelry: "Kiyang-Likphang, Heibi-mapu gold beads, and Marei neckpiece",
      craftTechnique: "Weaving fine cotton with distinctive triangular temple teeth (Moirang Phee) along the borders.",
      historicalOrigins: "Traditionally gifted by royal kings to valorous warriors and scholars in Kangla Palace.",
      heroImage: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Delicate gossamer Innaphi shawl adorned with hand-stitched Moirang temple borders."
    },
    celebration: {
      majorFestival: "Yaoshang (5-Day Spring Festival) & Sangai Festival",
      danceForm: "Manipuri Classical Raas Leela (Graceful circular Radha-Krishna dance in Kumil skirts)",
      folkMusic: "Pung clay drum acrobatic rhythms and Pena stringed indigenous bow instrument",
      celebrationRitual: "Thabal Chongba (Dancing by the moonlight) where youths dance in giant concentric circles to drumbeats.",
      heroImage: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Manipuri Raas Leela dancer in cylindrical mirror-embellished Kumil skirt."
    },
    places: {
      iconicMonument: "Kangla Fort (The ancient royal seat of the Kangleipak kings)",
      naturalWonder: "Loktak Lake (The world's only floating lake dotted with circular floating islands / Phumdis)",
      hiddenHeritage: "Keibul Lamjao National Park (The world's only floating sanctuary, refuge of the endangered dancing Sangai deer)",
      architecturalStyle: "Kangla Sha sacred dragon-lion gate iconography and bamboo lake pavilion design",
      heroImage: "https://images.unsplash.com/photo-1548013146-72479768bada?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "The colossal mythical white Kangla Sha statues guarding the royal citadel in Imphal."
    },
    livingHeritage: {
      traditionalCraft: "Longpi Black Stone Pottery (GI, moulded by hand without a potter's wheel from serpentine rock and clay)",
      artForm: "Thang-Ta (Ancient sword and spear martial art)",
      regionalLanguage: "Meiteilon (Manipuri), Tangkhul, Thadou, English",
      oralLegend: "Pakhangba, the primordial divine dragon-serpent king who founded the Ningthouja royal dynasty.",
      architecturalPinnacle: "Ima Keithel ('Mother's Market'): The world's largest exclusively women-run market operated by 5,000 women."
    },
    atlas: {
      capital: "Imphal",
      majorRivers: ["Imphal", "Barak", "Thoubal"],
      mountainRanges: ["Manipur Hills", "Mount Tenipu"],
      coordinates: "24.6637° N, 93.9063° E",
      svgPathId: "MN",
      culturalLandmarks: [
        { name: "Loktak Lake", coordinates: "Bishnupur", significance: "Unique freshwater floating lake with circular biological Phumdi biomass islands" },
        { name: "Kangla Palace", coordinates: "Imphal", significance: "Ancient royal fortification and spiritual heart of Manipur civilization" },
        { name: "Ima Keithel", coordinates: "Imphal", significance: "500-year-old historic market entirely organized, owned, and run by mothers" }
      ]
    }
  },

  // 27. MIZORAM
  {
    id: "mizoram",
    name: "Mizoram",
    nativeName: "Mizoram",
    nativeScript: "Mizo / Roman Script",
    category: "state",
    zone: "North-East",
    theme: getStateTheme("mizoram"),
    epoch: "Ancient Lushai Hills Confederations, Sailo Chieftains & Village Republics",
    introduction:
      "The 'Land of the Hill People' (Mizo-ram), a scenic canopy of rolling emerald ridges, misty bamboo forests, and deep community camaraderie centered on the ethos of *Tlawmngaihna* (selfless service). Celebrated for the acrobatic bamboo dance (*Cheraw*), and handwoven *Puan* textiles.",
    curatorQuote: "Tlawmngaihna is our compass: to serve without demanding reward, to welcome every stranger as kin.",
    curatorAuthor: "Mizo Moral Code of the Village Elders",
    heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--LFrvwM56--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/99/76/70/997670c3b3c72043e43c03dd08c2cb7e.jpg?_a=BAMAROWQ0",
    heroFallback: "https://res.cloudinary.com/tecwmb40/image/fetch/s--LFrvwM56--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/99/76/70/997670c3b3c72043e43c03dd08c2cb7e.jpg?_a=BAMAROWQ0",
    taste: {
      title: "Steamed Mountain Leaves & Forest Soups",
      signatureDish: "Bai (Wholesome stew of tender bamboo shoots, mustard greens, and pork slow-cooked with Sa-um)",
      famousSweet: "Chhangban (Sweet sticky rice flour cakes steamed inside tender banana leaves)",
      traditionalBreakfast: "Vawksa Rep (Wood-smoked pork stir-fried with mustard leaves and wild bird's eye chillies)",
      iconicIngredients: ["Sa-um (Fermented pork fat)", "Fresh Bamboo Shoot", "Mizo Chilli (Bird's eye)", "Sesame Seeds", "Local Herbs"],
      foodStory:
        "Mizo cooking is centered on boiling and steaming with minimal oil, using wild mountain herbs and fermented Sa-um to impart an earthy, deeply comforting highland warmth.",
      heroImage: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Steaming bowl of vegetable Bai served with smoked meat and mountain rice."
    },
    games: {
      name: "Insuknaw",
      localName: "Insuknaw (Stick Pushing)",
      category: "Traditional Strength & Balance Duel",
      boardType: "Circular 16-foot Ground Arena with a 8-foot Polished Timber Pole",
      instructions:
        "Two powerful athletes grip a smooth wooden pestle pole beneath their arms, pushing with pure leg and core strength to drive the opponent out of the ring.",
      culturalSignificance:
        "An ancient test of strength practiced by young men to demonstrate readiness to protect their highland village.",
      illustratedBoardSvgType: "outdoor"
    },
    textiles: {
      signatureWeave: "Mizo Puan (GI-tagged handwoven skirts: Puanchei, Ngotekherh, Hmaram)",
      traditionalAttire: "Puanchei (Magnificent festival skirt with vibrant red, white, and black geometric bands)",
      heirloomJewelry: "Thival amber bead necklaces and brass hairpins",
      craftTechnique: "Woven on indigenous loin-looms with supplementary weft embroidery creating precise geometric diamond steps.",
      historicalOrigins: "A Mizo girl's trousseau must include handwoven Puans as a symbol of cultural pride and domestic artistry.",
      heroImage: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "The iconic red, black, and white stepped bands of handwoven Mizo Puanchei."
    },
    celebration: {
      majorFestival: "Chapchar Kut (Spring Harvest Festival celebrated after clearing hill jhum)",
      danceForm: "Cheraw Dance (The Bamboo Dance with lightning-quick steps between clapping bamboo staves)",
      folkMusic: "Khuang (Cowhide wooden drum), Darbu bronze gong ensembles, and bamboo flutes",
      celebrationRitual: "Dancers in vibrant headgear stepping gracefully into and out of rhythmic bamboo grids that clap in unison.",
      heroImage: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Mizo maidens leaping between clashing horizontal bamboo staves during Cheraw."
    },
    places: {
      iconicMonument: "Reiek Tlang (Spectacular 1,500-meter rocky promontory overlooking lush hill horizons)",
      naturalWonder: "Vantawng Falls (The highest two-tiered waterfall in Mizoram cascading 750 feet through bamboo forests)",
      hiddenHeritage: "Phawngpui (The 'Blue Mountain', highest peak adorned with rhododendrons and clouded leopards)",
      architecturalStyle: "Traditional bamboo and thatch hill houses raised on wooden stilts against steep slopes",
      heroImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Vantawng Falls plunging through pristine green valleys of Serchhip district."
    },
    livingHeritage: {
      traditionalCraft: "Mizo Cane and Bamboo Crafts (GI, Khumbeu conical woven hats and carrying baskets)",
      artForm: "Cheraw Bamboo Choreography & Chheihlam folk poetry",
      regionalLanguage: "Mizo, English",
      oralLegend: "The folklore of Chawngtinleri, the benevolent guardian spirit who blessed animals and hunters in the hills.",
      architecturalPinnacle: "Reiek Heritage Village: Preserved replica of an ancestral Mizo chief's residence and bachelor dormitory."
    },
    atlas: {
      capital: "Aizawl",
      majorRivers: ["Tlawng", "Chhimtuipui (Kaladan)", "Tuivawl"],
      mountainRanges: ["Lushai Hills", "Phawngpui Peak (2,157 m)"],
      coordinates: "23.1645° N, 92.9376° E",
      svgPathId: "MZ",
      culturalLandmarks: [
        { name: "Reiek Mountain Ridge", coordinates: "Aizawl", significance: "Towering mountain bluff offering panoramic views across the clouds of Mizoram" },
        { name: "Vantawng Falls", coordinates: "Serchhip", significance: "Spectacular 750-foot two-tiered waterfall enveloped in dense bamboo forest" },
        { name: "Solomon's Temple", coordinates: "Aizawl", significance: "Magnificent white marble church complex set on the crest of Chawlhhmun hill" }
      ]
    }
  },

  // 28. TRIPURA
  {
    id: "tripura",
    name: "Tripura",
    nativeName: "ত্রিপুরা",
    nativeScript: "Bengali / Kokborok",
    category: "state",
    zone: "North-East",
    theme: getStateTheme("tripura"),
    epoch: "Ancient Manikya Dynasty, Rajmala Chronicles & Shaivite Forest Sanctuaries",
    introduction:
      "A storied kingdom chronicled in the royal *Rajmala* for over five millennia. Famed for exquisite white marble water palaces (*Neermahal*), monumental 7th-century rock-carved Bas-reliefs hidden in jungle gorges at *Unakoti*, and world-renowned bamboo craft mastery.",
    curatorQuote: "At Unakoti, one less than a crore of divine faces sleep in the ancient stone.",
    curatorAuthor: "Shaivite Legend of the Lost Crore",
    heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--n3uSFXHu--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/15/3d/4f/153d4ff6f733e60ef823e1732cf45f37.jpg?_a=BAMAROWQ0",
    heroFallback: "https://res.cloudinary.com/tecwmb40/image/fetch/s--n3uSFXHu--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/15/3d/4f/153d4ff6f733e60ef823e1732cf45f37.jpg?_a=BAMAROWQ0",
    taste: {
      title: "Wood-Fired Fermented Herbs & River Catch",
      signatureDish: "Mui Borok (Steamed local vegetables and fermented fish Berma cooked without a drop of oil)",
      famousSweet: "Awan Bangwi (Glutinous rice, cashews, and raisins hand-wrapped and steamed in Lairu leaves)",
      traditionalBreakfast: "Chakhwi (Bamboo shoot, jackfruit seeds, and pork simmered in natural alkaline wood ash water)",
      iconicIngredients: ["Berma (Fermented fish, oil-free)", "Banshkhorl (Bamboo shoot)", "Fresh Ginger", "Green Chillies", "Lairu Leaves"],
      foodStory:
        "Tripuri cooking harnesses natural food science: alkaline water extracted from burnt banana plant ashes softens tough bamboo shoots while preserving clean digestive health.",
      heroImage: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Awan Bangwi steamed sticky rice parcels opened fresh with coconut aroma."
    },
    games: {
      name: "Achugwi",
      localName: "আছুগওই (Achugwi)",
      category: "Traditional Bamboo Stilt Running Contest",
      boardType: "Open Forest Clearing with 6-foot Stilt Poles",
      instructions:
        "Youth mount tall bamboo stilts with footrests, racing across uneven terrain or engaging in balance jousting without touching the ground.",
      culturalSignificance:
        "Honored during tribal spring gatherings to foster agility and fearlessness required in hilly terrain.",
      illustratedBoardSvgType: "outdoor"
    },
    textiles: {
      signatureWeave: "Rignai and Rikutu Handloom (GI-tagged Tripuri indigenous weaves)",
      traditionalAttire: "Rignai (Lower wrap-around skirt) with handwoven floral borders & Risha (Chest drape)",
      heirloomJewelry: "Rangbat (Coin necklace made of antique royal Manikya silver rupees) and wooden earplugs",
      craftTechnique: "Woven on loin-looms by indigenous women, each of the 250+ clans identified by a unique pattern.",
      historicalOrigins: "Patronized by the queens of the Manikya dynasty who were celebrated as master weavers.",
      heroImage: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Geometric floral bands of traditional handwoven Tripuri Rignai fabric."
    },
    celebration: {
      majorFestival: "Kharchi Puja (Worship of the Fourteen Royal Deities) & Garia Dance",
      danceForm: "Hojagiri Dance of the Reangs (Acrobatic balance on earthen pitchers while holding oil lamps)",
      folkMusic: "Kham drum, Sumui (bamboo flute), and Sarinda stringed instrument",
      celebrationRitual: "Dancers balancing brass plates with lit lamps on their heads while pivoting on earthen pots.",
      heroImage: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Reang tribal women performing Hojagiri dance balancing lit lamps on pitchers."
    },
    places: {
      iconicMonument: "Unakoti (Colossal 7th-century rock-cut Bas-relief Shiva carvings carved directly into a jungle cliff)",
      naturalWonder: "Jampui Hills (The 'Eternal Hills of Spring' famed for sweet orange orchards and panoramic mist)",
      hiddenHeritage: "Neermahal (The 1930 water palace of King Bir Bikram Kishore floating in the center of Rudrasagar Lake)",
      architecturalStyle: "Indo-Saracenic royal palace architecture and ancient Shaivite rock-cut monuments",
      heroImage: "https://images.unsplash.com/photo-1548013146-72479768bada?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "The colossal 30-foot central rock-carved Shiva face (Unakotiswara Kal Bhairava) at Unakoti."
    },
    livingHeritage: {
      traditionalCraft: "Tripura Bamboo and Cane Handicrafts (GI, ultra-fine split bamboo screens and lamps)",
      artForm: "Pachra tribal weaving & Clay terracotta sculpture",
      regionalLanguage: "Kokborok, Bengali, English",
      oralLegend: "Lord Shiva camping with one crore deities at Unakoti on his journey to Kashi; when they overslept at dawn, he turned them all to stone.",
      architecturalPinnacle: "Neermahal: A fusion of Hindu and Mughal water architecture reflected across shimmering lake waters."
    },
    atlas: {
      capital: "Agartala",
      majorRivers: ["Howrah", "Gomati", "Manu"],
      mountainRanges: ["Jampui Hills", "Atharamura Range"],
      coordinates: "23.8315° N, 91.2868° E",
      svgPathId: "TR",
      culturalLandmarks: [
        { name: "Unakoti Rock Carvings", coordinates: "Kailashahar", significance: "Ancient 7th-9th century pilgrimage site with colossal rock-cut Shaivite reliefs in deep jungle" },
        { name: "Neermahal Water Palace", coordinates: "Melaghar", significance: "Only floating palace in Eastern India, constructed in the center of Rudrasagar Lake" },
        { name: "Ujjayanta Palace", coordinates: "Agartala", significance: "Former royal palace of the Tripura kingdom, now home to the State Museum" }
      ]
    }
  },

  // 29. MEGHALAYA
  {
    id: "meghalaya",
    name: "Meghalaya",
    nativeName: "Meghalaya",
    nativeScript: "English / Khasi / Garo",
    category: "state",
    zone: "North-East",
    theme: getStateTheme("meghalaya"),
    epoch: "Ancient Khasi, Jaintia & Garo Matrilineal Kingdoms, Living Root Architects",
    introduction:
      "The 'Abode of the Clouds' (Megha-Alaya), the wettest realm on Earth where monsoon rains sculpt dramatic limestone canyons and crystal rivers. World-renowned for bio-engineered Living Root Bridges woven from the roots of rubber fig trees, matrilineal societies, and pure organic honey.",
    curatorQuote: "We do not construct our bridges out of dead steel; we plant them alive so they grow stronger with every century.",
    curatorAuthor: "Khasi Elders of Nohwet Village",
    heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--oKEGs7B3--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/60/df/82/60df82535df018288d47807f35f57953.jpg?_a=BAMAROWQ0",
    heroFallback: "https://res.cloudinary.com/tecwmb40/image/fetch/s--oKEGs7B3--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/60/df/82/60df82535df018288d47807f35f57953.jpg?_a=BAMAROWQ0",
    taste: {
      title: "Black Sesame, Pork Broths & Wild Berries",
      signatureDish: "Jadoh (Fragrant short-grain hill rice cooked with tender pork and crushed black sesame seeds)",
      famousSweet: "Pukhlein (Crispy, delicate deep-fried sweet bread of rice flour and jaggery)",
      traditionalBreakfast: "Dohkhlieh (Pork salad with tender ginger and onions) & hot steamed rice bread (Putharo)",
      iconicIngredients: ["Nei-lieh (Black Sesame)", "Lakadong Turmeric (High curcumin, GI)", "Bamboo Shoot", "Sohphie fruit", "Bhut Jolokia"],
      foodStory:
        "Khasi cuisine pairs hearty meats with iron-rich black sesame paste, creating deeply aromatic gravies designed to provide endurance during wet mountain climbs.",
      heroImage: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Nutty, dark-hued Jadoh rice served with spicy Chutney and fresh herbs."
    },
    games: {
      name: "Siat Khnam",
      localName: "Siat Khnam (Traditional Archery)",
      category: "Indigenous Archery and Cultural Numerology Contest",
      boardType: "Circular cylindrical bamboo target at 50 meters",
      instructions:
        "Archers from different village clubs shoot hundreds of cane arrows at a small target cylinder; the crowd counts the remaining arrows, tying sport with indigenous numerology.",
      culturalSignificance:
        "A daily cultural sporting ritual in Shillong that preserves ancient Khasi archery skills passed down through clans.",
      illustratedBoardSvgType: "outdoor"
    },
    textiles: {
      signatureWeave: "Ryndia Peace Silk (Eri Silk woven from non-violent silkworms)",
      traditionalAttire: "Jainsem (Two-piece handloom silk drape worn by Khasi women) & Spun cotton wraps",
      heirloomJewelry: "Kynjri Ksiar (Heirloom 24-karat gold beads filled with natural lac) and red coral necklaces",
      craftTechnique: "Silkworms fed on castor leaves leave the cocoon naturally; yarn is dyed with wild turmeric and iron-rich river mud.",
      historicalOrigins: "The Ri-Bhoi district has practiced non-violent Eri sericulture for over 800 years.",
      heroImage: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Subtle organic sheen of plant-dyed natural beige and olive Ryndia silk."
    },
    celebration: {
      majorFestival: "Wangala 100-Drums Festival of the Garos & Shad Suk Mynsiem of the Khasis",
      danceForm: "Wangala Drum Dance & Ka Pomblang Nongkrem Dance",
      folkMusic: "Dama long drums, Tangmuri horn pipes, and Ka Bom wood drums",
      celebrationRitual: "One hundred male drummers in feathered turbans playing colossal drums in perfect thunderous unison.",
      heroImage: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Garo drummers playing long wooden Dama drums at the Wangala hundred-drums festival."
    },
    places: {
      iconicMonument: "Double Decker Living Root Bridge, Nongriat (300-year-old two-tiered botanical suspension bridge)",
      naturalWonder: "Nohkalikai Falls (India's tallest plunge waterfall dropping 1,115 feet into an emerald pool)",
      hiddenHeritage: "Mawlynnong (Celebrated as 'God's Own Garden', one of the cleanest villages in Asia) & Dawki River",
      architecturalStyle: "Living Root architecture (Ficus elastica roots guided through betel-nut trunks across roaring streams)",
      heroImage: "https://images.unsplash.com/photo-1548013146-72479768bada?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "The magnificent ancient two-tiered Double Decker Living Root Bridge in Nongriat."
    },
    livingHeritage: {
      traditionalCraft: "Living Root Architecture & Cane Rain Shields (Knup)",
      artForm: "Matrilineal Clan Heritage (Lineage and ancestral property inherited through the youngest daughter / Khatduh)",
      regionalLanguage: "Khasi, Garo, Pnar, English",
      oralLegend: "The legend of U Thlen, the giant serpent that inhabited the caves of Sohra, defeated by the unity of the clans.",
      architecturalPinnacle: "Living Root Bridges: The only bridges on Earth that become stronger with age, enduring 500+ years."
    },
    atlas: {
      capital: "Shillong ('Scotland of the East')",
      majorRivers: ["Umngot (Dawki)", "Umiam", "Simsang"],
      mountainRanges: ["Khasi Hills", "Garo Hills", "Jaintia Hills"],
      coordinates: "25.4670° N, 91.3662° E",
      svgPathId: "ML",
      culturalLandmarks: [
        { name: "Nongriat Root Bridge", coordinates: "Cherrapunji", significance: "Living botanical two-tiered bridge engineered across jungle rivers" },
        { name: "Nohkalikai Falls", coordinates: "Sohra", significance: "India's highest single plunge waterfall cascading 1,115 feet into an emerald pool" },
        { name: "Dawki Umngot River", coordinates: "West Jaintia Hills", significance: "Pristine transparent river where boats appear suspended in mid-air" }
      ]
    }
  },

  // 30. DELHI (National Capital Territory)
  {
    id: "delhi",
    name: "Delhi",
    nativeName: "दिल्ली",
    nativeScript: "Devanagari / Nastaliq",
    category: "union-territory",
    zone: "North",
    theme: getStateTheme("delhi"),
    epoch: "Ancient Indraprastha, Delhi Sultanate, Mughal Empire & Lutyens' Imperial Axis",
    introduction:
      "A seven-times-reborn imperial capital where medieval sandstone citadels rise alongside bustling bazaars and grand colonial boulevards. The epic crossroads of Indian history, immortalized by Mirza Ghalib's poetry, Sufi qawwalis of Nizamuddin, and world-famed culinary legacy.",
    curatorQuote: "The world is the body, and Delhi is its soul.",
    curatorAuthor: "Mirza Ghalib",
    heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--k8_nHpl5--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/c2/b9/41/c2b941697c9882bc51117565218ec1ff.jpg?_a=BAMAROWQ0",
    heroFallback: "https://res.cloudinary.com/tecwmb40/image/fetch/s--k8_nHpl5--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/c2/b9/41/c2b941697c9882bc51117565218ec1ff.jpg?_a=BAMAROWQ0",
    taste: {
      title: "Mughlai Spices, Chandni Chowk & Street Alchemy",
      signatureDish: "Old Delhi Nihari slow-cooked overnight with bone marrow, served with hot Khamiri roti",
      famousSweet: "Daulat ki Chaat (Winter dew-whipped milk foam infused with saffron and pistachios) & Jalebi with Rabri",
      traditionalBreakfast: "Bedmi Poori with spicy Nagori aloo and methi chutney in Chandni Chowk",
      iconicIngredients: ["Saffron", "Rose Water", "Pistachios", "Garam Masala", "Kewra Essence"],
      foodStory:
        "Born from the confluence of royal Mughal kitchens and Punjabi post-partition resilience, creating the world's most vibrant street food culture from Paranthe Wali Gali to Daryaganj.",
      heroImage: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Crispy hot golden Jalebis soaking in fragrant saffron cardamom syrup."
    },
    games: {
      name: "Patang Bazi (Kite Flying)",
      localName: "पतंगबाज़ी (Patang Bazi)",
      category: "Historic Terrace Aerial Duel",
      boardType: "Rooftops of Shahjahanabad overlooking Old Delhi domes",
      instructions:
        "Fliers maneuver lightweight paper kites strung with glass-coated cotton thread (*Manjha*), engaging in aerial duels to cut opponents' strings with shouts of 'Woh Kata!'.",
      culturalSignificance:
        "Patronized by Mughal emperors from the ramparts of the Red Fort; flies high every Independence Day and Makar Sankranti.",
      illustratedBoardSvgType: "outdoor"
    },
    textiles: {
      signatureWeave: "Zari Zardozi (Metallic gold and silver wire embroidery, GI)",
      traditionalAttire: "Sharara, Gharara, Anarkali kurtas with delicate Chanderi and Banarasi dupattas",
      heirloomJewelry: "Kundan-Polki necklaces, Chandbali earrings, and pearls from Dariba Kalan",
      craftTechnique: "Sewing real gold and silver threads onto velvet and silk fabric stretched over wooden frames (*Karchob*).",
      historicalOrigins: "Flourished in the Mughal imperial workshops under Akbar and Shah Jahan.",
      heroImage: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Ornate metallic gold Zardozi embroidery sewn onto royal crimson velvet."
    },
    celebration: {
      majorFestival: "Phool Walon Ki Sair (Festival of Flower Sellers) & Qutub Festival",
      danceForm: "Kathak (Classical North Indian storytelling dance born in temple and court)",
      folkMusic: "Sufi Qawwali at Hazrat Nizamuddin Dargah & Classical Hindustani music",
      celebrationRitual: "Hindu and Muslim communities carrying large floral fans (*Pankhas*) together to offer at the Dargah and temple.",
      heroImage: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Qawwals singing ecstatic Sufi verses under the marble arches of Nizamuddin Dargah."
    },
    places: {
      iconicMonument: "Red Fort (Lal Qila, UNESCO World Heritage 17th-century sandstone fortress)",
      naturalWonder: "The Delhi Ridge (Ancient forested northern spur of the Aravalli hills, 'Green Lungs')",
      hiddenHeritage: "Agrasen ki Baoli (Ancient 60-meter stepwell with 108 stone steps)",
      architecturalStyle: "Indo-Islamic architectural synthesis: Red sandstone, marble inlays, and geometric jaalis",
      heroImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "The imposing red sandstone Lahore Gate of the Red Fort standing proud under twilight."
    },
    livingHeritage: {
      traditionalCraft: "Zari Zardozi (GI) & Meenakari Enamelling in Chandni Chowk",
      artForm: "Urdu Ghazal & Dastangoi (Ancient Urdu oral storytelling art)",
      regionalLanguage: "Hindi, Urdu, Punjabi, English",
      oralLegend: "The seven historic cities of Delhi and the eternal resilience that rises from every ruin.",
      architecturalPinnacle: "Humayun's Tomb: The UNESCO architectural precursor to the Taj Mahal with four-quartered Persian gardens."
    },
    atlas: {
      capital: "New Delhi",
      majorRivers: ["Yamuna"],
      mountainRanges: ["Delhi Ridge (Aravalli Range)"],
      coordinates: "28.6139° N, 77.2090° E",
      svgPathId: "DL",
      culturalLandmarks: [
        { name: "Red Fort", coordinates: "Old Delhi", significance: "Iconic 17th-century red sandstone fortress from where the Prime Minister addresses the nation" },
        { name: "Humayun's Tomb", coordinates: "Nizamuddin", significance: "UNESCO World Heritage garden tomb, masterpiece of early Mughal geometry" },
        { name: "Qutub Minar", coordinates: "Mehrauli", significance: "73-meter victory minaret, tallest brick tower in the world dating to 1192 CE" }
      ]
    }
  },

  // 31. LADAKH
  {
    id: "ladakh",
    name: "Ladakh",
    nativeName: "ལ་དྭགས",
    nativeScript: "Tibetan / Ladakhi",
    category: "union-territory",
    zone: "North",
    theme: getStateTheme("ladakh"),
    epoch: "Ancient Maryul Kingdom, Namgyal Dynasty & Silk Route Caravan Hub",
    introduction:
      "The 'Land of High Passes', a starkly beautiful trans-Himalayan moonscape situated above 10,000 feet. Celebrated for cliffside Buddhist gompas, deep azure high-altitude lakes like Pangong Tso, pure Changthangi Cashmere wool, and resilient mountain wisdom.",
    curatorQuote: "In Ladakh, the earth touches the sky and silence is the highest prayer.",
    curatorAuthor: "Monks of Hemis Monastery",
    heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--EH7fjwik--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/43/6c/db/436cdbe4f28921357895615ceb44e540.jpg?_a=BAMAROWQ0",
    heroFallback: "https://res.cloudinary.com/tecwmb40/image/fetch/s--EH7fjwik--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/43/6c/db/436cdbe4f28921357895615ceb44e540.jpg?_a=BAMAROWQ0",
    taste: {
      title: "Barley Flour, Yak Butter & Hearth Warmth",
      signatureDish: "Skyu (Hearty thumb-pinched wheat pasta stew slow-simmered with root vegetables and dried meat)",
      famousSweet: "Khambir with Raktsey Karpo Apricot Jam (Sourdough hearth bread with sweet wild mountain apricots)",
      traditionalBreakfast: "Tsampa (Roasted barley flour porridge) kneaded with salted Butter Tea (Gur Gur Chai)",
      iconicIngredients: ["Roasted Barley (Tsampa)", "Yak Butter", "Wild Apricots (Raktsey Karpo, GI)", "Sea Buckthorn", "Black Peppercorns"],
      foodStory:
        "Engineered for sub-zero Himalayan winters: butter tea churned with salt and yak butter in wooden cylinders (*Dongmo*) keeps lips moisturized and core body temperatures steady.",
      heroImage: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "A bowl of steaming Skyu pasta stew served with freshly baked Khambir bread."
    },
    games: {
      name: "Ladakhi Archery & Mountain Polo",
      localName: "Archery (Dha)",
      category: "High-Altitude Marksmanship & Horse Polo",
      boardType: "Mountain Valley Arena surrounded by Chortens",
      instructions:
        "Men and women compete in traditional silk robes, releasing arrows at distant targets accompanied by Surna wind pipes and Daman drums.",
      culturalSignificance:
        "An inseparable part of village festivals; also celebrated through polo matches played on rugged Zanskari ponies.",
      illustratedBoardSvgType: "outdoor"
    },
    textiles: {
      signatureWeave: "Pashmina / Cashmere (Woven from Changthangi mountain goat fleece) & Snambu wool",
      traditionalAttire: "Goncha (Thick maroon or indigo woollen robe tied with a bright sash) & Perak turquoise headdress",
      heirloomJewelry: "Perak (Leather strap canopy studded with up to 100 raw blue turquoise stones passed from mother to daughter)",
      craftTechnique: "Changpa nomads hand-combing the winter undercoat of high-altitude goats at 14,000 feet.",
      historicalOrigins: "The bedrock of Central Asian caravan trade between Leh, Yarkand, and Kashmir.",
      heroImage: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Authentic Ladakhi royal Perak headdress encrusted with tiers of raw turquoise."
    },
    celebration: {
      majorFestival: "Hemis Monastery Festival & Ladakh Festival",
      danceForm: "Chham Masked Sacred Dance & Shondol Royal Dance",
      folkMusic: "Daman kettle-drums, Surna double-reed oboes, and Buddhist chant overtone singing",
      celebrationRitual: "Lamas in silk brocade and wrathful deity masks dancing to defeat inner demons and bless the earth.",
      heroImage: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Monks in gold hats and ceremonial silk robes blowing colossal copper Dungchen horns."
    },
    places: {
      iconicMonument: "Thiksey Monastery (Spectacular 12-storey whitewashed Gompa resembling the Potala Palace)",
      naturalWonder: "Pangong Tso (A 134-km long endorheic mountain lake changing colors from turquoise to sapphire)",
      hiddenHeritage: "Alchi Monastery (11th-century jewel preserving Kashmiri-Buddhist mural paintings in mud-brick shrines)",
      architecturalStyle: "Tibetan fortress architecture with sloping stone and mud-brick walls and wooden lintels",
      heroImage: "https://images.unsplash.com/photo-1548013146-72479768bada?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Thiksey Monastery perched dramatically on a high rocky hill overlooking the Indus river."
    },
    livingHeritage: {
      traditionalCraft: "Ladakhi Wood Carving (GI) & Thangka Buddhist Scroll Painting",
      artForm: "Copper and Brass Metal Casting (Butter lamps and prayer wheels)",
      regionalLanguage: "Ladakhi (Bhoti), Balti, English, Hindi",
      oralLegend: "King Gesar of Ling, the legendary epic warrior who defended the mountain kingdoms.",
      architecturalPinnacle: "Leh Palace: A 17th-century nine-storey royal palace built by King Sengge Namgyal."
    },
    atlas: {
      capital: "Leh",
      majorRivers: ["Indus (Sindhu)", "Zanskar", "Shyok"],
      mountainRanges: ["Ladakh Range", "Karakoram Range", "Zanskar Mountains"],
      coordinates: "34.1526° N, 77.5771° E",
      svgPathId: "LA",
      culturalLandmarks: [
        { name: "Pangong Tso", coordinates: "Changthang", significance: "Endorheic salt lake at 4,225 meters whose crystal waters change between turquoise and deep indigo" },
        { name: "Thiksey Gompa", coordinates: "Leh", significance: "Magnificent 12-storey monastery housing a 15-meter statue of Maitreya Buddha" },
        { name: "Nubra Valley", coordinates: "Diskit", significance: "High-altitude cold desert with double-humped Bactrian camels along the historic Silk Route" }
      ]
    }
  },

  // 32. CHANDIGARH
  {
    id: "chandigarh",
    name: "Chandigarh",
    nativeName: "ਚੰਡੀਗੜ੍ਹ",
    nativeScript: "Gurmukhi / Devanagari",
    category: "union-territory",
    zone: "North",
    theme: getStateTheme("chandigarh"),
    epoch: "Post-Independence Modernity, Le Corbusier Vision & Nek Chand Folk Sculpture",
    introduction:
      "The 'City Beautiful', India's first planned modernist urban marvel designed by Swiss-French master Le Corbusier. A tranquil union territory nestled at the foothills of the Shivaliks, famous for the Nek Chand Rock Garden crafted from recycled urban waste, Sukhna Lake, and tree-lined sectors.",
    curatorQuote: "Chandigarh is a city of trees, flowers, and noble open spaces.",
    curatorAuthor: "Le Corbusier",
    heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--fxfU6Gx9--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/8b/44/ac/8b44ac7b81d82f7f6239b7373b45c88c.jpg?_a=BAMAROWQ0",
    heroFallback: "https://res.cloudinary.com/tecwmb40/image/fetch/s--fxfU6Gx9--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/8b/44/ac/8b44ac7b81d82f7f6239b7373b45c88c.jpg?_a=BAMAROWQ0",
    taste: {
      title: "Tandoori Kulchas & Modernist Cafes",
      signatureDish: "Amritsari Stuffed Kulcha with spicy Chole & sweet and sour tamarind-onion chutney",
      famousSweet: "Chenna Murki & Kulfi Falooda with rose syrup",
      traditionalBreakfast: "Paneer Paratha with homemade churned white butter and spiced ginger chai",
      iconicIngredients: ["Paneer", "Butter", "Chickpeas", "Pomegranate Seeds", "Ghee"],
      foodStory:
        "Chandigarh combines the rich heartiness of Punjabi dhabas with refined multi-cultural cafe culture, offering the freshest dairy from surrounding rural belts.",
      heroImage: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Crispy tandoor-baked stuffed kulcha slathered with homemade butter."
    },
    games: {
      name: "Badminton & Boulevard Cycling",
      localName: "Badminton",
      category: "Urban Community Racket Sport & Cycling",
      boardType: "Neighbourhood Sector Green Belts & Courts",
      instructions:
        "Played across public sector courts and shaded parks, fostering community fitness across generations.",
      culturalSignificance:
        "Reflects Le Corbusier's concept of the '7Vs' road network integrating pedestrian and cycle tracks separated from motor traffic.",
      illustratedBoardSvgType: "outdoor"
    },
    textiles: {
      signatureWeave: "Contemporary Khadi & Handloom Linen",
      traditionalAttire: "Phulkari dupattas paired with crisp linen kurtas and modern suits",
      heirloomJewelry: "Contemporary silver filigree and pearl jewelry",
      craftTechnique: "Combining heritage Punjabi Phulkari geometry with sleek modern tailoring.",
      historicalOrigins: "Conceived as the capital of newly independent Punjab in the 1950s.",
      heroImage: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Elegant contemporary linen handloom tailored with subtle geometric borders."
    },
    celebration: {
      majorFestival: "Rose Festival (At Zakir Hussain Rose Garden) & Chandigarh Carnival",
      danceForm: "Bhangra & Giddha (High-energy folk dances)",
      folkMusic: "Dholak rhythms, Tumbi, and contemporary Punjabi melodies",
      celebrationRitual: "Planting and exhibiting thousands of blooming rose varieties during spring.",
      heroImage: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Folk dancers celebrating spring amidst thousands of blooming roses."
    },
    places: {
      iconicMonument: "The Capitol Complex (UNESCO World Heritage: High Court, Secretariat, and Open Hand Monument)",
      naturalWonder: "Sukhna Lake (Tranquil 3-sq-km man-made lake at the base of the Shivaliks)",
      hiddenHeritage: "Nek Chand Rock Garden (An extraordinary 40-acre visionary labyrinth created from discarded porcelain and slag)",
      architecturalStyle: "Raw exposed concrete (Béton Brut) modernist architecture by Le Corbusier",
      heroImage: "https://images.unsplash.com/photo-1548013146-72479768bada?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "The Open Hand Monument spinning freely with the wind against the Shivalik hills."
    },
    livingHeritage: {
      traditionalCraft: "Nek Chand Broken Ceramic Mosaic Art & Modernist Teak Furniture Design",
      artForm: "Sculptural Environment Architecture",
      regionalLanguage: "Punjabi, Hindi, English",
      oralLegend: "Nek Chand working in secrecy by night for 18 years in the forest to build the Rock Garden from city trash.",
      architecturalPinnacle: "Open Hand Monument: A 28-meter rotating metal sculpture symbolizing 'Open to give, open to receive'."
    },
    atlas: {
      capital: "Chandigarh",
      majorRivers: ["Sukhna Choe"],
      mountainRanges: ["Shivalik Foothills"],
      coordinates: "30.7333° N, 76.7794° E",
      svgPathId: "CH",
      culturalLandmarks: [
        { name: "Capitol Complex", coordinates: "Sector 1", significance: "UNESCO World Heritage modernist government complex by Le Corbusier" },
        { name: "Nek Chand Rock Garden", coordinates: "Sector 1", significance: "Visionary fantasy garden featuring thousands of sculptures sculpted from industrial waste" },
        { name: "Sukhna Lake", coordinates: "Sector 1", significance: "Serene mountain reservoir where non-motorized boats and morning walkers congregate" }
      ]
    }
  },

  // 33. PUDUCHERRY
  {
    id: "puducherry",
    name: "Puducherry",
    nativeName: "புதுச்சேரி",
    nativeScript: "Tamil / French",
    category: "union-territory",
    zone: "South",
    theme: getStateTheme("puducherry"),
    epoch: "Ancient Roman Poduke Port, Chola Delta & French East India Company",
    introduction:
      "The 'French Riviera of the East', where mustard-yellow colonial villas draped in magenta bougainvillea meet Tamil temple architecture along the Coromandel Coast. A spiritual and artistic sanctuary home to Sri Aurobindo Ashram, the universal township of Auroville, and rich Creole heritage.",
    curatorQuote: "Pondicherry is where two civilizations kissed without erasing each other's contours.",
    curatorAuthor: "Indo-French Cultural Chronicle",
    heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--0lEwfsGy--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/d2/68/6e/d2686e7009046d671ee39802c33eb97f.jpg?_a=BAMAROWQ0",
    heroFallback: "https://res.cloudinary.com/tecwmb40/image/fetch/s--0lEwfsGy--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/d2/68/6e/d2686e7009046d671ee39802c33eb97f.jpg?_a=BAMAROWQ0",
    taste: {
      title: "Franco-Tamil Creole Alchemy",
      signatureDish: "Pondicherry Creole Fish Assad (Mildly spiced coconut milk fish stew infused with fresh turmeric and lemon)",
      famousSweet: "French Éclair with Chicory Coffee Cream & Puducherry Halwa",
      traditionalBreakfast: "Baguette with salted churned butter, paired with South Indian filter coffee in brass tumblers",
      iconicIngredients: ["Fresh Coconut Milk", "Green Peppercorns", "Curry Leaves", "Vanilla Pods", "Turmeric"],
      foodStory:
        "Creole cuisine is a marriage of French culinary techniques (bouillabaisse, braising) with Coromandel coast ingredients (fresh coconut milk, mustard seeds, curry leaves).",
      heroImage: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Pondicherry Fish Assad simmering in golden coconut milk garnished with curry leaves."
    },
    games: {
      name: "Pétanque",
      localName: "Pétanque (Boules)",
      category: "Colonial Seaside Boules Sport",
      boardType: "Gravel and Sand Promenade by the Sea",
      instructions:
        "Players throw hollow metal boules as close as possible to a small wooden target ball (*Cochonet*) while standing inside a circle.",
      culturalSignificance:
        "Played daily at sunset by elders in linen shirts along Goubert Avenue overlooking the Bay of Bengal.",
      illustratedBoardSvgType: "outdoor"
    },
    textiles: {
      signatureWeave: "Auroville Organic Khadi & French Toile Block Prints",
      traditionalAttire: "Fine hand-dyed organic cotton sarees and French linen shirts",
      heirloomJewelry: "Handcrafted terracotta jewelry and brass filigree pendants",
      craftTechnique: "Block printing French toile and botanical motifs using natural indigo, madder, and pomegranate rinds.",
      historicalOrigins: "Established during the French colonial administration and preserved by coastal weaving collectives.",
      heroImage: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Indigo and ivory block-printed cotton hanging to dry along the coastal breeze."
    },
    celebration: {
      majorFestival: "Fête de Puducherry & Sri Aurobindo Birth Anniversary",
      danceForm: "Bharatanatyam & Contemporary Expressionist Dance of Auroville",
      folkMusic: "Carnatic violin melodies paired with French accordion chansons",
      celebrationRitual: "Silent meditation around the samadhi of Sri Aurobindo and the Mother adorned with fresh jasmine and lotus flowers.",
      heroImage: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Evening seaside promenade illuminated with paper lanterns and French colonial facades."
    },
    places: {
      iconicMonument: "Auroville Matrimandir (The 'Soul of the City', a monumental golden geodesic sphere of meditation)",
      naturalWonder: "Promenade Beach (A 1.5-km scenic seaside coastal walkway lined with historic statues)",
      hiddenHeritage: "White Town (French Quarter with quiet cobblestone lanes, louvered wooden shutters, and arched courtyards)",
      architecturalStyle: "French colonial architecture: Ochre lime facades, porticoes, and inner garden courtyards",
      heroImage: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Mustard-yellow French colonial mansion with arched windows framed by pink bougainvillea."
    },
    livingHeritage: {
      traditionalCraft: "Auroshikha Incense-making & Sri Aurobindo Handmade Cotton Paper (GI)",
      artForm: "Villianur Terracotta Craft (GI, sculpting hollow terracotta horse and temple icons)",
      regionalLanguage: "Tamil, French, English, Telugu, Malayalam",
      oralLegend: "Sage Agastya establishing his hermitage (*Agastiswaram*) in ancient Puducherry.",
      architecturalPinnacle: "Matrimandir: Golden sphere with 1,415 golden discs housing the world's largest optically-pure glass sphere."
    },
    atlas: {
      capital: "Puducherry",
      majorRivers: ["Gingee", "Sankaraparani"],
      mountainRanges: ["Coromandel Coastal Plain"],
      coordinates: "11.9416° N, 79.8083° E",
      svgPathId: "PY",
      culturalLandmarks: [
        { name: "Matrimandir", coordinates: "Auroville", significance: "Golden geodesic architectural marvel dedicated to human unity and silent contemplation" },
        { name: "White Town Promenade", coordinates: "Goubert Avenue", significance: "Historic seaside esplanade bordered by 18th-century French colonial mansions" },
        { name: "Sri Aurobindo Ashram", coordinates: "Rue de la Marine", significance: "World-renowned spiritual retreat founded in 1926 by Sri Aurobindo and Mirra Alfassa" }
      ]
    }
  },

  // 34. ANDAMAN & NICOBAR ISLANDS
  {
    id: "andaman-and-nicobar",
    name: "Andaman & Nicobar Islands",
    nativeName: "अंडमान और निकोबार",
    nativeScript: "Devanagari / English",
    category: "union-territory",
    zone: "South",
    theme: getStateTheme("andaman-and-nicobar"),
    epoch: "Ancient Sentinelese & Jarawa Antiquity, Chola Maritime Expeditions, Freedom Movement",
    introduction:
      "An emerald archipelago of 572 tropical islands floating between the Bay of Bengal and Andaman Sea. Sacred for pristine coral reefs, indigenous forest tribes living in harmony with nature since the Paleolithic era, and the historic Cellular Jail — the sacred crucible of India's independence struggle.",
    curatorQuote: "These stones did not break our spirits; they bore witness to the birth of a free nation.",
    curatorAuthor: "Inscriptions at Cellular Jail, Port Blair",
    heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--XGM5Vuba--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/d0/86/a8/d086a85ed1174add6b61720cd4c3ef16.jpg?_a=BAMAROWQ0",
    heroFallback: "https://res.cloudinary.com/tecwmb40/image/fetch/s--XGM5Vuba--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/d0/86/a8/d086a85ed1174add6b61720cd4c3ef16.jpg?_a=BAMAROWQ0",
    taste: {
      title: "Fresh Coral Catch & Coconut Milk",
      signatureDish: "Island Coconut Prawn Curry (Succulent sea prawns simmered in fresh ground coconut milk, kokum, and green chillies)",
      famousSweet: "Tropical Coconut Ladoo with Palm Jaggery",
      traditionalBreakfast: "Grilled Red Snapper with lemon butter & steamed tapioca with grated coconut",
      iconicIngredients: ["Fresh Coconut", "Sea Prawns", "Kokum", "Curry Leaves", "Wild Lemongrass"],
      foodStory:
        "Island cuisine combines pristine sea catches with coconuts and spices brought by maritime settlers from Bengal, Tamil Nadu, and Kerala, creating aromatic seaside dishes.",
      heroImage: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Fresh prawn curry served in fresh green coconut shells by the azure lagoon."
    },
    games: {
      name: "Outrigger Canoe Racing",
      localName: "Canoe Race",
      category: "Indigenous Oceanic Navigation Contest",
      boardType: "Coral Lagoons and Ocean Waves",
      instructions:
        "Teams of paddlers navigate hand-carved outrigger wooden canoes across turquoise channels, reading ocean currents and swells.",
      culturalSignificance:
        "An ancestral skill practiced by coastal communities for inter-island trade and navigation.",
      illustratedBoardSvgType: "outdoor"
    },
    textiles: {
      signatureWeave: "Pandanus Palm Leaf & Tree Bark Matting",
      traditionalAttire: "Traditional indigenous plant-fiber wraps and hand-woven beachwear",
      heirloomJewelry: "Polished conch shell, cowrie beads, and mother-of-pearl ornaments",
      craftTechnique: "Drying and hand-weaving resilient pandanus leaves into water-resistant floor mats and baskets.",
      historicalOrigins: "Practiced for thousands of years by the indigenous coastal tribes of the Nicobar group.",
      heroImage: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Intricately hand-woven natural palm leaf matting with polished sea-shell borders."
    },
    celebration: {
      majorFestival: "Island Tourism Festival & Subhash Mela (Celebrating Netaji Subhas Chandra Bose)",
      danceForm: "Nicobarese Dance (Circular slow-rhythm ocean dance around beach fires)",
      folkMusic: "Bamboo percussions, resonant conch horns, and rhythmic ocean chanting",
      celebrationRitual: "Lighting candles at the Martyrs' Memorial at Cellular Jail at sunset.",
      heroImage: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Sunset light illuminating the historic brick wings of the Cellular Jail in Port Blair."
    },
    places: {
      iconicMonument: "Cellular Jail (National Memorial, the historic 'Kala Pani' freedom pilgrimage)",
      naturalWonder: "Radhanagar Beach, Havelock (Rated among the world's most beautiful beaches for turquoise waters and white sand)",
      hiddenHeritage: "Ross Island (Netaji Subhash Chandra Bose Island, ruins of Victorian colonial capital swallowed by ancient banyan roots)",
      architecturalStyle: "Panopticon radial brick architecture (Cellular Jail) and indigenous stilt thatch lodges",
      heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Radhanagar Beach sunset with calm azure waves lapping pristine powdery white sand."
    },
    livingHeritage: {
      traditionalCraft: "Andaman Padauk Wood Carving (GI) & Shell Craft Jewelry",
      artForm: "Cane and Bamboo Craftsmanship",
      regionalLanguage: "Hindi, Bengali, Tamil, Telugu, Malayalam, English",
      oralLegend: "The heroic legacy of Netaji Subhas Chandra Bose hoisting the first Indian tricolor on Port Blair soil in 1943.",
      architecturalPinnacle: "Cellular Jail: Seven wings radiating from a central watchtower, now a sacred national shrine."
    },
    atlas: {
      capital: "Port Blair",
      majorRivers: ["Kalpong (Only river in Andaman)"],
      mountainRanges: ["Saddle Peak (732 m)"],
      coordinates: "11.6234° N, 92.7265° E",
      svgPathId: "AN",
      culturalLandmarks: [
        { name: "Cellular Jail", coordinates: "Port Blair", significance: "Sacred national memorial where brave freedom fighters endured colonial confinement" },
        { name: "Radhanagar Beach", coordinates: "Swaraj Dweep (Havelock)", significance: "Voted one of Asia's best beaches, celebrated for pristine turquoise waters" },
        { name: "Ross Island", coordinates: "South Andaman", significance: "Historic colonial capital overgrown by giant wild ficus tree roots" }
      ]
    }
  },

  // 35. LAKSHADWEEP
  {
    id: "lakshadweep",
    name: "Lakshadweep",
    nativeName: "ലക്ഷദ്വീപ്",
    nativeScript: "Malayalam / Mahal",
    category: "union-territory",
    zone: "South",
    theme: getStateTheme("lakshadweep"),
    epoch: "Ancient Chera Maritime Trade, Ubaidullah Sufi Era & Arakkal Kingdom",
    introduction:
      "An idyllic archipelago of 36 coral atolls and turquoise lagoons floating 300 km off the Malabar coast. Celebrated for bioluminescent night waters, golden coir spinning, rich skipjack tuna fishing traditions, and ancient timber mosque architecture.",
    curatorQuote: "We live on drops of coral floating in an ocean of light.",
    curatorAuthor: "Island Fishermen of Kavaratti",
    heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--ZOu87fPM--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/62/cc/ae/62ccae1bdd7775e38425f3dbcbc8dd8d.jpg?_a=BAMAROWQ0",
    heroFallback: "https://res.cloudinary.com/tecwmb40/image/fetch/s--ZOu87fPM--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/62/cc/ae/62ccae1bdd7775e38425f3dbcbc8dd8d.jpg?_a=BAMAROWQ0",
    taste: {
      title: "Skipjack Tuna, Coconut Milk & Coral Herbs",
      signatureDish: "Mus Kavaab (Spiced boneless skipjack tuna cubes marinated in ground coconut, shallots, and fiery red chili paste)",
      famousSweet: "Kadalakka (A delicate coconut, cashew, and egg dessert baked in copper vessels)",
      traditionalBreakfast: "Kilanji (Paper-thin rice crepes) served with sweet coconut milk gravy",
      iconicIngredients: ["Skipjack Tuna (Masmin)", "Coconut Cream", "Dried Coconut (Copra)", "Shallots", "Black Pepper"],
      foodStory:
        "Masmin (hard-cured, wood-smoked skipjack tuna) was historically traded across the Indian Ocean to Maldives and Arabia, providing rich protein preserved without refrigeration.",
      heroImage: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Spiced Mus Kavaab tuna skewers seared over glowing coconut shell embers."
    },
    games: {
      name: "Parichakali",
      localName: "പരിചകളി (Parichakali)",
      category: "Shield & Sword Martial Dance Game",
      boardType: "Coral Sand Arena under Coconut Palms",
      instructions:
        "Performers armed with wooden swords and soft shields dance in circular formations, striking shields to rhythmic song crescendos.",
      culturalSignificance:
        "Celebrates coastal martial agility and defense against historic oceanic pirates.",
      illustratedBoardSvgType: "outdoor"
    },
    textiles: {
      signatureWeave: "Coir Matting & Handwoven Cotton Lungis",
      traditionalAttire: "White cotton lungi with rich border paired with embroidered silk Kachi wraps (Minicoy)",
      heirloomJewelry: "Silver waist chains, glass bangles, and coral pendants",
      craftTechnique: "Retting coconut husks in sea lagoons for months, then spinning into golden, rot-proof ocean rope.",
      historicalOrigins: "Lakshadweep coir was prized by Arab dhow builders for centuries for its superior salt-water resistance.",
      heroImage: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Golden strands of high-tensile organic coconut coir spun along lagoon banks."
    },
    celebration: {
      majorFestival: "Eid-ul-Fitr, Milad-un-Nabi & Lakshadweep Sea Festival",
      danceForm: "Lava Dance (Minicoy islanders' fast-paced rhythmic drum and scarf dance)",
      folkMusic: "Daffmuttu percussion, wooden castanets, and sea navigation ballads",
      celebrationRitual: "Lava dancers in red trousers and white caps dancing with synchronized drum rhythms on the beach.",
      heroImage: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Minicoy Lava dancers performing in synchronized formation along white sand beaches."
    },
    places: {
      iconicMonument: "Minicoy Lighthouse (Historic 1885 British brick lighthouse towering 49 meters above the atoll)",
      naturalWonder: "Bangaram Atoll (Breathtaking tear-drop shaped lagoon glowing with bioluminescence at night)",
      hiddenHeritage: "Ujra Mosque, Kavaratti (17th-century coral-stone shrine with an intricately carved ceiling carved from driftwood)",
      architecturalStyle: "Coral stone masonry and master timber joinery without iron nails",
      heroImage: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "The iconic red and white Minicoy Lighthouse overlooking the coral reef."
    },
    livingHeritage: {
      traditionalCraft: "Lakshadweep Golden Coir (GI) & Model Ship Building",
      artForm: "Coral stone carving & Mother-of-pearl craftsmanship",
      regionalLanguage: "Jerseri (Malayalam dialect), Mahal (Minicoy), English",
      oralLegend: "Sheikh Ubaidullah who survived a shipwreck in the 7th century to bring wisdom across the atolls.",
      architecturalPinnacle: "Ujra Mosque: Intricately carved floral wooden ceilings and sacred sweet-water well on Kavaratti."
    },
    atlas: {
      capital: "Kavaratti",
      majorRivers: ["No continental rivers (Open Arabian Sea lagoons)"],
      mountainRanges: ["Submarine Chagos-Laccadive Ridge"],
      coordinates: "10.5667° N, 72.6417° E",
      svgPathId: "LD",
      culturalLandmarks: [
        { name: "Minicoy Lighthouse", coordinates: "Minicoy", significance: "Colossal 1885 historic lighthouse standing guard over international maritime routes" },
        { name: "Bangaram Atoll", coordinates: "Bangaram", significance: "Pristine lagoon haven world-famous for bioluminescent night waters and coral diving" },
        { name: "Ujra Mosque", coordinates: "Kavaratti", significance: "17th-century spiritual coral-stone sanctuary with ornate carved wooden ceilings" }
      ]
    }
  },

  // 36. DADRA AND NAGAR HAVELI AND DAMAN AND DIU
  {
    id: "dadra-and-nagar-haveli-and-daman-and-diu",
    name: "Dadra & Nagar Haveli and Daman & Diu",
    nativeName: "दादरा और नगर हवेली एवं दमन और दीव",
    nativeScript: "Devanagari / Gujarati",
    category: "union-territory",
    zone: "West",
    theme: getStateTheme("dadra-and-nagar-haveli"),
    epoch: "Ancient Warli Tribal Antiquity, Portuguese Seaborne Empire & Maritime Trade",
    introduction:
      "A coastal and forest union territory where 450 years of Portuguese maritime fortifications blend with the ancestral earth traditions of the Warli and Dhodia tribes. Renowned for sea citadels at Diu, white rice-paste Warli folk murals, and peaceful Arabian Sea shores.",
    curatorQuote: "The circle is the sun, the triangle is the mountain, and the line is human harmony.",
    curatorAuthor: "Warli Tribal Artists of Silvassa",
    heroImage: "https://res.cloudinary.com/tecwmb40/image/fetch/s--jzuMUmhi--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/72/bb/13/72bb13a93629b367716c76a5d905f44d.jpg?_a=BAMAROWQ0",
    heroFallback: "https://res.cloudinary.com/tecwmb40/image/fetch/s--jzuMUmhi--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/72/bb/13/72bb13a93629b367716c76a5d905f44d.jpg?_a=BAMAROWQ0",
    taste: {
      title: "Coastal Seafood, Parsi Flavors & Earthen Pots",
      signatureDish: "Daman Fish Koliwada & Ubadiyu (Earthen pot roasted seasonal tubers and beans cooked in wild herbs)",
      famousSweet: "Bebinca (Multi-layered Indo-Portuguese coconut dessert) & Ghari",
      traditionalBreakfast: "Parsi Akuri (Creamy spiced scrambled eggs) with crusty warm Pav bread",
      iconicIngredients: ["Fresh Pomfret", "Coconut", "Ajwain Leaves", "Wild Forest Roots", "Toddery Yeast"],
      foodStory:
        "Ubadiyu is cooked underground: earthen pots stuffed with field beans, sweet potatoes, and wild ajwain leaves are sealed with grass and slow-roasted over burning cowdung coals.",
      heroImage: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Golden fried Daman spiced fish fillets served with lime and herb chutney."
    },
    games: {
      name: "Gedi",
      localName: "गेडी (Gedi)",
      category: "Indigenous Tribal Bamboo Stilt Game",
      boardType: "Red Clay Forest Ground",
      instructions:
        "Youth mount sturdy bamboo poles with tied wooden footrests, racing through rainy forest paths and testing balance.",
      culturalSignificance:
        "Played during the monsoon Hareli celebrations to cultivate confidence and balance over flooded terrains.",
      illustratedBoardSvgType: "outdoor"
    },
    textiles: {
      signatureWeave: "Warli Painted Cottons & Portuguese Lace Work",
      traditionalAttire: "Lugda (Crimson and blue cotton wrap worn by tribal women) & Dhoti-Kurta",
      heirloomJewelry: "Silver Hansli neckbands, brass armlets, and coin ornaments",
      craftTechnique: "Painting geometric stick-figure folklore using white paste made of ground rice, water, and gum.",
      historicalOrigins: "Documented in cave art traditions dating back to 2500 BCE in the Sahyadri foothills.",
      heroImage: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Intricate white rice-paste Warli circle-of-life paintings on red-ochre canvas."
    },
    celebration: {
      majorFestival: "Tarpa Dance Festival of Silvassa & Nariyal Poornima at Diu",
      danceForm: "Tarpa Dance (Tribal circle dance to the deep drone of the dried-gourd Tarpa instrument)",
      folkMusic: "Tarpa wind instrument, Kahali brass horn, and Dholak drums",
      celebrationRitual: "Men and women linking arms in a spiraling circle around the Tarpa player, moving with the wind.",
      heroImage: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "Tribal dancers spiraling in unison around the master Tarpa player in Silvassa."
    },
    places: {
      iconicMonument: "Diu Fort (16th-century stone sea fortress with stone cannons gazing over the waves)",
      naturalWonder: "Jampore Beach (Tranquil black-sand beach shaded by casuarina groves)",
      hiddenHeritage: "Dudhni Lake & Silvassa Tribal Museum (Scenic reservoir flanked by forested hills)",
      architecturalStyle: "16th-century Portuguese military renaissance fortress architecture",
      heroImage: "https://images.unsplash.com/photo-1548013146-72479768bada?q=85&w=1200&auto=format&fit=crop",
      heroCaption: "The massive sea-facing battlements and lighthouse of the 1535 Diu Fort."
    },
    livingHeritage: {
      traditionalCraft: "Warli Painting (GI, ancestral geometric earth murals) & Mat Weaving",
      artForm: "Bamboo Basketry & Tortoiseshell carving",
      regionalLanguage: "Gujarati, Hindi, Marathi, Kokni, Portuguese",
      oralLegend: "Palghat, the goddess of fertility and life celebrated on every Warli wedding mural.",
      architecturalPinnacle: "St. Paul's Church, Diu: Baroque cathedral adorned with elaborate wood carvings and scrolls."
    },
    atlas: {
      capital: "Daman",
      majorRivers: ["Daman Ganga", "Kolak"],
      mountainRanges: ["Western Ghats Foothills", "Arabian Sea Coastline"],
      coordinates: "20.4283° N, 72.8397° E",
      svgPathId: "DD",
      culturalLandmarks: [
        { name: "Diu Fort", coordinates: "Diu Island", significance: "Impregnable 1535 ocean stone citadel defended by cannons and lighthouse" },
        { name: "Silvassa Tribal Museum", coordinates: "Silvassa", significance: "Living repository of Warli musical instruments, hunting gear, and ritual masks" },
        { name: "St. Paul's Church", coordinates: "Diu", significance: "Masterpiece of 17th-century Gothic-Baroque colonial church architecture" }
      ]
    }
  }
];

// Helper to find state data by id
export function getStateById(id: string): StateData | undefined {
  let cleanId = id.toLowerCase().trim().replace(/\s+/g, "-");
  if (cleanId === "dadra-and-nagar-haveli" || cleanId === "daman-and-diu") {
    cleanId = "dadra-and-nagar-haveli-and-daman-and-diu";
  }
  if (cleanId === "orissa") cleanId = "odisha";
  if (cleanId === "uttaranchal") cleanId = "uttarakhand";
  if (cleanId === "pondicherry") cleanId = "puducherry";
  return ALL_INDIAN_STATES.find((s) => s.id === cleanId);
}

// Helper to filter states by zone or category
export function getStatesByZone(zone: string): StateData[] {
  if (zone === "All") return ALL_INDIAN_STATES;
  if (zone === "Union Territories") return ALL_INDIAN_STATES.filter((s) => s.category === "union-territory");
  return ALL_INDIAN_STATES.filter((s) => s.zone === zone);
}
