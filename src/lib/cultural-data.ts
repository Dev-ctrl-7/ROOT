import { RegionChapter, ArchiveLensComparison, PostcardPreset } from "./types";

export const REGIONS: RegionChapter[] = [
  {
    id: "madurai",
    name: "Madurai",
    tamilName: "மதுரை",
    tagline: "The Jasmine Capital & City That Never Sleeps",
    epoch: "6th Century BCE — Pandya Dynasty to Nayakas",
    location: "Vaigai River Basin, Southern Tamil Nadu",
    geoCoordinates: "9.9252° N, 78.1198° E",
    heroPublicId: "roots/madurai_gopuram",
    heroFallback: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1600&auto=format&fit=crop",
    heroQuote: "A city older than memory itself, where the jasmine blooms at midnight and stone towers pierce the sky like prayers carved in granite.",
    quoteAuthor: "Sangam Poetry Anthology, Paripāṭal",
    overview:
      "Madurai is one of the world's continuously inhabited urban settlements. Centered like a sacred lotus around the towering gateway gopurams of the Meenakshi Sundareswarar Temple, life here dissolves the boundary between the sacred and the everyday. Fragrant flower markets hum before dawn, brass lamps flicker in stone corridors, and the nocturnal streets are alive with boiling copper kettles.",
    sensory: {
      scent: {
        title: "GI-Tagged Madurai Malli",
        description: "Intense, heady Arabian jasmine blossoms freshly woven into garlands, mingling with crushed sacred basil (Tulsi) and camphor smoke."
      },
      sound: {
        title: "Resonant Nadaswaram & Night Bells",
        description: "The piercing, divine glissando of double-reed nadaswaram echoing down 1,000-pillar granite corridors, punctuated by bronze temple gongs."
      },
      taste: {
        title: "Iced Jigarthanda & Meter Coffee",
        description: "Layered almond gum (badam pisin), nannari sarsaparilla syrup, reduced basundi milk, and frothy degree coffee poured from soaring heights."
      },
      touch: {
        title: "Cool Granite Slabs at 5:00 AM",
        description: "The soothing touch of ancient polished black granite beneath bare feet after temple washing, cool even in the heat of May."
      }
    },
    architecture: {
      title: "Meenakshi Sundareswarar Temple & Nayaka Hall",
      subtitle: "The Sacred Lotus Plan & Granite Sculptures",
      description:
        "Built according to the Shilpa Shastras, the temple forms the spiritual epicenter of concentric square streets named after Tamil lunar months (Chithirai, Avani Moola, Masi). The Hall of Thousand Pillars (Aayiram Kaal Mandapam) features 985 exquisitely carved monolithic granite columns depicting mythological Yalis, plus musical pillars that resonate with distinct musical swaras when tapped.",
      tactileDetail: "Granite monolithic pillars carved from single stones, cool to the touch with deep chisel grooves dating back to 1569 CE.",
      imagePublicId: "roots/madurai_hall_of_pillars",
      imageFallback: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=1200&auto=format&fit=crop",
      caption: "The soaring Gopuram towers adorned with thousands of polychromatic stucco deities.",
      cloudinaryCropGravity: "g_north"
    },
    culinary: {
      title: "The Nocturnal Streets of Simmakkal",
      subtitle: "Parotta Masters, Karidosai & Jigarthanda",
      description:
        "Madurai's street food culture awakens when other cities sleep. Generations of parotta artisans stretch unleavened dough so paper-thin it catches the lamplight like raw silk before being folded, griddled, and crushed by hand into flaky layers served alongside aromatic chalna gravies.",
      tactileDetail: "Crisp, flaky, buttery layers of handmade parotta torn hot by hand and dipped in spicy, fennel-scented salna.",
      imagePublicId: "roots/madurai_culinary_filter_coffee",
      imageFallback: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1200&auto=format&fit=crop",
      caption: "Brass davarah filter coffee, frothy and steaming with chicory and fresh milk.",
      cloudinaryCropGravity: "g_center"
    },
    craft: {
      title: "Madurai Sungudi Handloom Weaving",
      subtitle: "The 16th-Century Saurashtrian Heritage",
      description:
        "Sungudi (from Sanskrit 'Sunnam', meaning round spot) is a sacred tie-and-dye textile brought to Madurai in the 16th century by migrant Saurashtrian artisans patronized by the Nayaka kings. Pure combed cotton is knotted by hand with millions of tiny rice-grain knots before immersion in natural vegetable dyes, crowned with rich Zari temple borders.",
      tactileDetail: "Airy, breathable pure cotton woven with distinctive knot-dyed micro-circular constellations.",
      imagePublicId: "roots/madurai_sungudi_loom",
      imageFallback: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1200&auto=format&fit=crop",
      caption: "Traditional pit-loom cotton weaving with intricate temple Zari borders.",
      cloudinaryCropGravity: "g_auto"
    },
    livingMemory: {
      title: "The Dawn Jasmine Harvest",
      recordedYear: "2024",
      storyteller: "Muthuvel, 3rd-generation Flower Artisan, Mattuthavani",
      narrative:
        "Before the sunrise reaches the temple towers, the jasmine must be picked while the bud is still shut tight like an ivory bead. When the morning dew hits it, you can smell it five miles away. Our grandmothers taught us: you never press the bud with your nails. You hold it with your fingertips like a newborn’s hand. By noon, these flowers will rest in the hair of women across the city, blessing every step."
    }
  },
  {
    id: "chettinad",
    name: "Chettinad",
    tamilName: "செட்டிநாடு",
    tagline: "The Silk Road of Spice Merchants & 1,000-Window Mansions",
    epoch: "18th – Early 20th Century (Nattukottai Chettiars)",
    location: "Sivaganga & Pudukkottai Districts",
    geoCoordinates: "10.0712° N, 78.7844° E",
    heroPublicId: "roots/chettinad_mansion",
    heroFallback: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1600&auto=format&fit=crop",
    heroQuote: "Houses built like ships destined to anchor empires, where Burma teak meets Italian marble and rainwater sings across open courtyards.",
    quoteAuthor: "Oral Heritage of the Nattukottai Nagarathars",
    overview:
      "Chettinad is a cultural enclave of 73 heritage villages renowned for palatial mansions (*periyaveedu*), architectural mastery, and world-famed culinary alchemy. The Chettiar merchant community, who financed trade across Maritime Southeast Asia, transformed this semi-arid region into an extraordinary museum of global craftsmanship and hospitality.",
    sensory: {
      scent: {
        title: "Toasted Stone Flower & Pepper",
        description: "Dry-roasted Tellicherry peppercorns, star anise, Kalpasi (black stone flower), and freshly ground cumin simmering in cold-pressed sesame oil."
      },
      sound: {
        title: "Monsoon Chimes in the Courtyard",
        description: "Raindrops cascading from terracotta eaves down into granite sunken courtyards (*Pattalai*), engineered for cooling and water harvest."
      },
      taste: {
        title: "Kavuni Arisi & Pepper Kozhambu",
        description: "Sweet, nutty steamed black glutinous rice drizzled with fresh coconut milk and ghee, balanced by fiery pepper-shallot curry."
      },
      touch: {
        title: "Silk-Smooth Athangudi Floor Tiles",
        description: "Cool, glass-smooth geometric tiles handcrafted with local river silt, polished with coconut husks until they reflect the ceiling teak."
      }
    },
    architecture: {
      title: "The Palaces of Kanadukathan & Kottaiyur",
      subtitle: "Burma Teak, Belgian Crystal & Rain Courtyards",
      description:
        "Chettinad mansions were designed to accommodate sprawling joint families and trade meetings. An imposing entrance (*Mukha Vaasal*) leads to endless pillared courtyards constructed with imported Burma teak, hand-cut Swedish crystal chandeliers, and egg-lime plaster walls (*Chettinad Vellai*) so brilliantly polished they resemble white porcelain.",
      tactileDetail: "Pillars turned from solid Burma teak logs, oiled with linseed to reveal dense honeyed grain.",
      imagePublicId: "roots/chettinad_courtyard_pillars",
      imageFallback: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop",
      caption: "The majestic pillared courtyard of an ancestral Chettinad mansion.",
      cloudinaryCropGravity: "g_center"
    },
    culinary: {
      title: "The Feast on the Banana Leaf",
      subtitle: "Kalchatti Stone Cooking & Global Spice Routes",
      description:
        "Chettinad cuisine is legendary for its meticulous blending of whole sun-dried spices. Dishes are slow-cooked in soapstone pots (*Kalchatti*), which retain heat evenly and mellow the sharpness of freshly cracked pepper, fennel, and coconut.",
      tactileDetail: "Heavy soapstone cookware seasoned over generations with turmeric and castor oil.",
      imagePublicId: "roots/chettinad_spices_leaf",
      imageFallback: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=1200&auto=format&fit=crop",
      caption: "Sun-dried whole spices: black stone flower, Tellicherry pepper, and cinnamon.",
      cloudinaryCropGravity: "g_auto"
    },
    craft: {
      title: "Athangudi Handmade Cement Tiles",
      subtitle: "The Living Art of Sand and Glass Molds",
      description:
        "In the quiet village of Athangudi, master craftsmen still cast decorative floor tiles entirely by hand. Using a framed glass plate, iron stencils, colored liquid cement slurry, and fine local clay, each tile is dried in sunlight and cured in water tanks for 21 days before being polished to a lustrous sheen.",
      tactileDetail: "A silky, unglazed ceramic-cement surface that grows cooler and smoother with every decade of footsteps.",
      imagePublicId: "roots/chettinad_athangudi_craft",
      imageFallback: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop",
      caption: "Intricate floral and geometric Athangudi tiles curing in natural light.",
      cloudinaryCropGravity: "g_center"
    },
    livingMemory: {
      title: "Guardians of the 1,000 Windows",
      recordedYear: "2025",
      storyteller: "Visalakshi Achi, Elder of Kanadukathan",
      narrative:
        "When my grandfather sailed back from Rangoon, he didn't bring gold in sacks. He brought timber so heavy it took twelve bullock carts to drag each log from the harbor. These walls have heard violin concerts, monsoon storms, and the laughter of fifty cousins sitting together for lunch. Even when the house is empty, you can feel the warmth stored in the lime walls. A home like this does not belong to one person; it belongs to time."
    }
  },
  {
    id: "thanjavur",
    name: "Thanjavur",
    tamilName: "தஞ்சாவூர்",
    tagline: "The Imperial Chola Seat of Living Bronze & Gold Leaf",
    epoch: "10th – 11th Century CE (Imperial Chola Empire)",
    location: "Cauvery Delta Rice Bowl",
    geoCoordinates: "10.7870° N, 79.1378° E",
    heroPublicId: "roots/thanjavur_big_temple",
    heroFallback: "https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?q=85&w=1600&auto=format&fit=crop",
    heroQuote: "Here granite was taught to breathe, and molten bronze learned to hold the infinite dance of the cosmos.",
    quoteAuthor: "Inscriptions of Rajaraja Chola I, 1010 CE",
    overview:
      "Thanjavur is the immortal heartbeat of South Indian classical civilization. Under the patronage of the imperial Chola dynasty, Thanjavur became the epicenter of monumental Dravidian granite architecture, Carnatic classical music, Bharatanatyam dance, Tanjore gold foil paintings, and lost-wax bronze casting.",
    sensory: {
      scent: {
        title: "Beeswax Foundry & River Silt",
        description: "Melting wild beeswax and resin from dammar trees, blended with alluvial clay dug from the banks of the sacred Cauvery River."
      },
      sound: {
        title: "Echoes of Ancient Devaram Chants",
        description: "Vocal hymns echoing up into the hollow 216-foot granite vimana, perfectly acoustically tuned by 11th-century engineers."
      },
      taste: {
        title: "Ashoka Halwa & Ghee Pongal",
        description: "Velvety yellow moong dal halwa simmered slowly with pure country ghee, cardamom pods, and golden-roasted cashews."
      },
      touch: {
        title: "Lost-Wax Cast Bronze Patina",
        description: "The weighty, rhythmic contours of 1,000-year-old Panchaloha alloy, cool to the hand with micro-burnished metal edges."
      }
    },
    architecture: {
      title: "The Brihadisvara Temple (Big Temple)",
      subtitle: "The UNESCO Monolithic Granite Marvel",
      description:
        "Commissioned by Emperor Rajaraja Chola I in 1010 CE, this monumental temple is an engineering triumph built entirely of interlocking granite blocks without mortar. The sanctum tower (*Vimana*) rises 66 meters into the sky, capped by an octagonal 80-tonne monolithic granite dome (*Kumbam*) elevated via an inclined earthen ramp spanning kilometers.",
      tactileDetail: "Rough-hewn interlocking granite stone blocks bearing ancient Tamil Brahmi and Chola script inscriptions.",
      imagePublicId: "roots/thanjavur_vimana_tower",
      imageFallback: "https://images.unsplash.com/photo-1598890777032-bde835ba27c2?q=80&w=1200&auto=format&fit=crop",
      caption: "The soaring 216-foot vimana of the Great Living Chola Temple at sunset.",
      cloudinaryCropGravity: "g_north"
    },
    culinary: {
      title: "The Cauvery Delta Harvest Table",
      subtitle: "Ponni Paddy, Temple Prasadam & Moong Halwa",
      description:
        "Fed by the Cauvery River's fertile alluvial soil, Thanjavur is the historic 'Granary of South India.' Here, freshly harvested aromatic Ponni rice is cooked in giant copper cauldrons with cumin, crushed black peppercorns, fresh curry leaves, and generous ladles of cow's ghee.",
      tactileDetail: "Aromatic grains of newly harvested Ponni rice, tender and steaming on fresh plantain leaves.",
      imagePublicId: "roots/thanjavur_culinary_pongal",
      imageFallback: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=1200&auto=format&fit=crop",
      caption: "Temple ghee pongal garnished with roasted cashews and whole black peppercorns.",
      cloudinaryCropGravity: "g_center"
    },
    craft: {
      title: "Swamimalai Lost-Wax Bronze Casting",
      subtitle: "The Sacred Metallurgy of the Sthapatis",
      description:
        "For over a millennium, the sculptors (*Sthapatis*) of nearby Swamimalai have practiced *Cire Perdue* (lost-wax casting). Every bronze idol—from the iconic Nataraja to the tranquil Parvati—is hand-modeled in beeswax, encased in Cauvery river clay, and poured with molten Panchaloha (five-metal alloy: copper, brass, lead, silver, and gold).",
      tactileDetail: "The hand-chiseled finish of cooled bronze, carrying the exact fingerprint of the sculptor's wax model.",
      imagePublicId: "roots/thanjavur_nataraja_bronze",
      imageFallback: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1200&auto=format&fit=crop",
      caption: "Chola bronze Nataraja in the cosmic dance pose, Swamimalai foundry.",
      cloudinaryCropGravity: "g_center"
    },
    livingMemory: {
      title: "The Song in the Wax",
      recordedYear: "2024",
      storyteller: "Sthapati Radhakrishnan, Master Sculptor, Swamimalai",
      narrative:
        "You do not start with copper; you start with the breath. In our Shilpa Shastra, before we heat the furnace, we chant the Dhyana Shloka describing the posture of the deity. When the molten metal fills the clay mold, it swallows the wax completely. The wax gives its life so the bronze can take shape. No two bronzes can ever be identical, because the mold must be broken to free the god."
    }
  },
  {
    id: "nilgiris",
    name: "Nilgiris",
    tamilName: "நீலகிரி",
    tagline: "The Blue Mountain Mist, Toda Looms & Heritage Steam",
    epoch: "Indigenous Antiquity to 1899 CE (Mountain Railway)",
    location: "Western Ghats Highland Ridge",
    geoCoordinates: "11.4102° N, 76.6950° E",
    heroPublicId: "roots/nilgiris_mountain_train",
    heroFallback: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop",
    heroQuote: "Where the mountains drape themselves in blue kurinji blossoms, and the clouds ride upon vintage narrow-gauge steam.",
    quoteAuthor: "Nilgiri Highland Folk Song",
    overview:
      "Rising majestically above 2,000 meters in the Western Ghats, the Nilgiris ('Blue Mountains') are an ecological and cultural paradise. Ancient home of the pastoral Toda and Kota tribes, this highland landscape features rolling shola grassland ecosystems, fragrant orthodox tea plantations, and the UNESCO World Heritage Nilgiri Mountain Railway.",
    sensory: {
      scent: {
        title: "Mountain Rain & Crushed Eucalyptus",
        description: "Crisp alpine breeze saturated with wet eucalyptus bark, wild moss, mountain ferns, and fresh-cut green tea leaves."
      },
      sound: {
        title: "The Swiss Steam Locomotive Whistle",
        description: "The resonant brass steam whistle echoing through pine valleys and across tall arched stone railway viaducts."
      },
      taste: {
        title: "Winter Flush Tea & Ooty Varkey",
        description: "Delicate muscatel hill tea brewed from tender hand-picked two leaves and a bud, paired with crisp, flaky oven-baked varkey."
      },
      touch: {
        title: "Toda Pukhoor Wool & Cotton Weft",
        description: "Coarse hand-woven natural cotton shawl (*Poothkulli*), densely embroidered by hand with raised red and black geometric wool stitches."
      }
    },
    architecture: {
      title: "UNESCO Nilgiri Mountain Railway & Viaducts",
      subtitle: "The Swiss Abt Rack-and-Pinion Engineering Feat",
      description:
        "Completed in 1908, the 46-kilometer Nilgiri Mountain Railway climbs from 1,069 feet to 7,228 feet through 16 tunnels and 250 bridges. It is the only rack railway in India, using vintage steam locomotives that push the wooden carriages up breathtaking granite gradients surrounded by ancient Shola forests.",
      tactileDetail: "Weathered steel rack rails and hand-cut stone bridges standing firm against century-old highland monsoons.",
      imagePublicId: "roots/nilgiris_viaduct_bridge",
      imageFallback: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
      caption: "The heritage blue-and-cream mountain train crossing a stone viaduct enveloped in cloud.",
      cloudinaryCropGravity: "g_center"
    },
    culinary: {
      title: "Highland Tea & Mountain Varkey",
      subtitle: "Orthodox Tea Plucking & Wood-Fired Bakeries",
      description:
        "Perched on steep terraced slopes, high-grown Nilgiri teas are celebrated for their golden liquor and floral sweetness. In the bakeries of Ooty and Coonoor, traditional wood-fired ovens bake crusty, flaky 'varkey' biscuits using recipe secrets passed down since the 1800s.",
      tactileDetail: "Crisp, crumbly pastry layers melting on the tongue when dunked in hot hill tea.",
      imagePublicId: "roots/nilgiris_tea_estate",
      imageFallback: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1200&auto=format&fit=crop",
      caption: "Tea pluckers moving through misty emerald tea terraces at first light.",
      cloudinaryCropGravity: "g_auto"
    },
    craft: {
      title: "Toda Pukhoor Tribal Embroidery",
      subtitle: "Geometric Needlecraft of the Highland Women",
      description:
        "Toda embroidery, known locally as *Pukhoor*, is an indigenous needlecraft tradition awarded the Geographical Indication (GI) status. Using single-strand darning needles, Toda women create intricate, reversible geometric patterns on unbleached white cotton fabric using red and black wool without preliminary markings or frames.",
      tactileDetail: "Raised, textured wool embroidery with sharp geometric relief resembling buffalo horn profiles.",
      imagePublicId: "roots/nilgiris_toda_embroidery",
      imageFallback: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1200&auto=format&fit=crop",
      caption: "Traditional Toda Poothkulli embroidery featuring timeless red and black motifs.",
      cloudinaryCropGravity: "g_center"
    },
    livingMemory: {
      title: "When the Kurinji Blooms",
      recordedYear: "2024",
      storyteller: "Piljosh, Toda Cultural Custodian, Muthanad Mund",
      narrative:
        "Our sacred buffaloes know the path across the peaks before any map was drawn. Every twelve years, when the Neelakurinji flower blooms, the whole mountain ridge turns purple-blue. Our elders say the flower is a reminder: the mountain does not change its rhythm for modern clocks. As long as the cold wind blows through the shola trees and our daughters stitch the Poothkulli by the evening lamp, the soul of these hills remains whole."
    }
  }
];

export const ARCHIVE_COMPARISONS: ArchiveLensComparison[] = [
  {
    id: "madurai-gopuram-archive",
    regionId: "madurai",
    title: "Meenakshi Sundareswarar Temple South Tower",
    location: "Madurai, Tamil Nadu",
    yearThen: "1858 CE",
    yearNow: "Present Day",
    historicalContext:
      "Original 1858 albumen silver print by Captain Linnaeus Tripe (Madras Presidency Government Photographer). Captures the colossal granite base and sculpted tiers of the South Gopuram before modern electrification and restoration.",
    archivalSource: "Metropolitan Museum of Art (Accession DP144494 / Gilkes Collection)",
    institutionProvenance: "The Metropolitan Museum of Art, New York",
    photographer: "Captain Linnaeus Tripe (1822–1902)",
    legalRights: "Public Domain (Open Access / CCO)",
    imageThenPublicId: "roots/archive_madurai_1858",
    imageThenFallback: "/archives/madurai_1858_linnaeus_tripe.jpg",
    imageNowPublicId: "roots/archive_madurai_now",
    imageNowFallback: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200&auto=format&fit=crop",
    significance: "Living Dravidian sacred complex centered around 14 monumental gateway towers in continuous worship.",
    isVisualInterpretation: false,
  },
  {
    id: "thanjavur-vimana-archive",
    regionId: "thanjavur",
    title: "Brihadisvara Great Temple Vimana",
    location: "Thanjavur, Tamil Nadu",
    yearThen: "1860 CE",
    yearNow: "Present Day",
    historicalContext:
      "1860 albumen print from 'Photographic Views in Tanjore & Trivady' by Linnaeus Tripe. Depicts the 216-foot monolithic granite tower (Vimana) and the colossal monolithic Nandi pavilion.",
    archivalSource: "University of Edinburgh Special Collections / LUNA Photographic Archives",
    institutionProvenance: "University of Edinburgh Heritage Collections",
    photographer: "Captain Linnaeus Tripe",
    legalRights: "Creative Commons Attribution 3.0 (CC BY 3.0)",
    imageThenPublicId: "roots/archive_thanjavur_1860",
    imageThenFallback: "/archives/thanjavur_1860_linnaeus_tripe.jpg",
    imageNowPublicId: "roots/archive_thanjavur_now",
    imageNowFallback: "https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?q=80&w=1200&auto=format&fit=crop",
    significance: "World's first completely granite temple tower built in 1010 CE by Chola Emperor Raja Raja I.",
    isVisualInterpretation: false,
  },
  {
    id: "hampi-chariot-archive",
    regionId: "hampi",
    title: "Hampi Stone Chariot & Vittala Complex",
    location: "Hampi, Karnataka",
    yearThen: "1856 CE",
    yearNow: "Present Day",
    historicalContext:
      "Earliest surviving photographic record of Hampi: an 1856 paper negative (calotype) by Alexander Greenlaw, showing the Garuda Stone Chariot and ruined mandapas of the Vijayanagara capital before archaeological clearing.",
    archivalSource: "British Library & Royal Geographical Society (Greenlaw Album 1856)",
    institutionProvenance: "British Library Visual Arts Collection",
    photographer: "Alexander Greenlaw (1818–1870)",
    legalRights: "Public Domain / Crown Copyright Expired",
    imageThenPublicId: "roots/archive_hampi_1856",
    imageThenFallback: "/archives/hampi_1856_alexander_greenlaw.jpg",
    imageNowPublicId: "roots/archive_hampi_now",
    imageNowFallback: "https://raw.githubusercontent.com/Dev-ctrl-7/ROOT/state-images/pinterest-cloudinary/public/images/states/karnataka/hampi-stone-chariot.jpg",
    significance: "Monolithic granite processional chariot with revolving stone wheels from the 16th-century Vijayanagara Empire.",
    isVisualInterpretation: false,
  },
  {
    id: "taj-mahal-archive",
    regionId: "uttar-pradesh",
    title: "Taj Mahal & Yamuna Riverfront",
    location: "Agra, Uttar Pradesh",
    yearThen: "1860 CE",
    yearNow: "Present Day",
    historicalContext:
      "1860 wet-collodion glass plate albumen print by pioneering British landscape photographer Samuel Bourne, capturing the 17th-century white marble mausoleum reflecting in the Yamuna River prior to modern embankment alterations.",
    archivalSource: "Royal Photographic Society / Los Angeles County Museum of Art (LACMA)",
    institutionProvenance: "Bourne & Shepherd Photographic Archives / LACMA Collection",
    photographer: "Samuel Bourne (1834–1912)",
    legalRights: "Public Domain",
    imageThenPublicId: "roots/archive_taj_1860",
    imageThenFallback: "/archives/taj_mahal_1860_samuel_bourne.jpg",
    imageNowPublicId: "roots/archive_taj_now",
    imageNowFallback: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200&auto=format&fit=crop",
    significance: "UNESCO World Heritage pinnacle of Mughal symmetry, white marble pietra dura inlay, and riverside gardens.",
    isVisualInterpretation: false,
  },
  {
    id: "konark-wheel-archive",
    regionId: "odisha",
    title: "Konark Sun Temple 24-Spoke Stone Wheel",
    location: "Konark, Odisha",
    yearThen: "1890 CE",
    yearNow: "Present Day",
    historicalContext:
      "1890 archaeological survey glass plate documenting the southern mandapa of the 13th-century Surya Temple (Black Pagoda) as sand drifts and sea winds were being stabilized by the Archaeological Survey.",
    archivalSource: "Archaeological Survey of India (ASI) Eastern Circle Historical Photographic Collection",
    institutionProvenance: "ASI Eastern Circle Archive Records / British Library India Office",
    photographer: "Archaeological Survey of India Survey Team (1890)",
    legalRights: "Public Domain / Government of India Historical Archives",
    imageThenPublicId: "roots/archive_konark_1890",
    imageThenFallback: "/archives/konark_1890_archaeological_survey.jpg",
    imageNowPublicId: "roots/archive_konark_now",
    imageNowFallback: "https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?q=80&w=1200&auto=format&fit=crop",
    significance: "Kalinga stone architecture functioning as an astronomical solar calendar with 24 intricately carved wheels.",
    isVisualInterpretation: false,
  },
  {
    id: "amer-fort-archive",
    regionId: "rajasthan",
    title: "Amer Fort & Maota Lake Ramparts",
    location: "Jaipur, Rajasthan",
    yearThen: "Visual Interpretation",
    yearNow: "Present Day",
    historicalContext:
      "Historical Visual Interpretation: Because an authenticated open-access 19th-century photographic plate of this specific Maota Lake rampart angle was not preserved in public archives, this plate is rendered via Cloudinary's 1890 Halide Sepia Engine (e_sepia:85,e_tint:50:5B3A29,e_vignette:30) on contemporary reference photography.",
    archivalSource: "Cloudinary 1890 Halide Sepia Engine (Visual Heritage Interpretation)",
    institutionProvenance: "ROOTS Visual Heritage Interpretation Laboratory",
    photographer: "Cloudinary Halide Engine on Contemporary Reference Photography",
    legalRights: "Creative Interpretation / Contemporary Reference Unsplash Open License",
    imageThenPublicId: "roots/archive_amer_interpretation",
    imageThenFallback: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop",
    imageNowPublicId: "roots/archive_amer_now",
    imageNowFallback: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1200&auto=format&fit=crop",
    significance: "Rajput defensive fortifications with Mughal garden courtyards overlooking the Aravalli hills.",
    isVisualInterpretation: true,
  },
];

export const POSTCARD_PRESETS: PostcardPreset[] = [
  {
    id: "madurai-dusk",
    title: "Madurai Twilight & Temple Lamps",
    regionId: "madurai",
    regionName: "Madurai",
    postmarkCity: "MADURAI • 625 001",
    imagePublicId: "roots/postcard_madurai",
    imageFallback: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1400&auto=format&fit=crop",
    defaultRecipient: "To my dearest friend,",
    defaultMessage:
      "Writing to you from the flower bazaar as dusk settles over the gopuram towers. The air smells of freshly tied jasmine and camphor. Thinking of home and wishing you were walking these cool stone corridors with me.",
    stampLabel: "TAMIL NADU POST • 25 PAISA"
  },
  {
    id: "chettinad-courtyard",
    title: "Chettinad Monsoon Courtyard",
    regionId: "chettinad",
    regionName: "Chettinad",
    postmarkCity: "KARAIKUDI • 630 001",
    imagePublicId: "roots/postcard_chettinad",
    imageFallback: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1400&auto=format&fit=crop",
    defaultRecipient: "To Amma and Appa,",
    defaultMessage:
      "The rain just began falling into the central open courtyard. The Athangudi tiles feel silky cool underfoot and the smell of roasted pepper curry fills the veranda. Every corner of this mansion feels like an embrace from the past.",
    stampLabel: "HERITAGE ARCHITECTURE • 50 PAISA"
  },
  {
    id: "thanjavur-bronze",
    title: "Thanjavur Sacred Bronze & Granite",
    regionId: "thanjavur",
    regionName: "Thanjavur",
    postmarkCity: "THANJAVUR • 613 001",
    imagePublicId: "roots/postcard_thanjavur",
    imageFallback: "https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?q=80&w=1400&auto=format&fit=crop",
    defaultRecipient: "Dear brother,",
    defaultMessage:
      "Stood before the great Chola vimana this evening. You cannot comprehend the scale until your hand touches the granite blocks fitted together a thousand years ago. Sending you prayers and peace from the Cauvery delta.",
    stampLabel: "CHOLA EMPIRE HERITAGE • 1 RUPEE"
  },
  {
    id: "nilgiris-steam",
    title: "Nilgiris Toy Train in the Clouds",
    regionId: "nilgiris",
    regionName: "Nilgiris",
    postmarkCity: "OOTY • 643 001",
    imagePublicId: "roots/postcard_nilgiris",
    imageFallback: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1400&auto=format&fit=crop",
    defaultRecipient: "Dearest family,",
    defaultMessage:
      "Climbing through the tea terraces on the blue mountain train. The steam engine chuffs through banks of cold white mist, and the aroma of eucalyptus and fresh wood-fired tea is everywhere. A piece of heaven preserved.",
    stampLabel: "MOUNTAIN RAILWAY • 2 RUPEES"
  }
];

export const CULTURAL_HORIZON = [
  {
    id: "kerala",
    name: "Kerala Backwaters & Kathakali",
    region: "God's Own Country",
    description: "The emerald labyrinth of Vembanad Lake, teak kettuvallam boats, and the hypnotic drumming of Chenda under coconut palms.",
    status: "Upcoming Exhibition Expansion"
  },
  {
    id: "varanasi",
    name: "Varanasi Ghats & Ganga Aarti",
    region: "Uttar Pradesh",
    description: "The timeless steps of Kashi, brass aarti lamps reflecting on the holy river, and Banarasi silk looms humming in narrow lanes.",
    status: "Upcoming Exhibition Expansion"
  },
  {
    id: "rajasthan",
    name: "Shekhawati Haveli Frescoes",
    region: "Rajasthan",
    description: "The open-air art gallery of the Thar Desert, where ornate merchant havelis tell epics across lime-plastered facades.",
    status: "Upcoming Exhibition Expansion"
  }
];
