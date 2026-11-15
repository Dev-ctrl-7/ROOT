/**
 * ROOTS — The Soul of India
 * Centralized State Image Manifest
 *
 * Implements 36 user-selected cultural images across all 28 states and 8 union territories.
 * Source: roots_state_image_mapping.json (Pinterest collection curated by exhibition curator)
 * Delivery: Cloudinary Edge Fetch CDN with dynamic f_auto, q_auto, c_fill, g_auto optimizations.
 * Cloud: tecwmb40
 */

export type StateId =
  | "andhra-pradesh"
  | "arunachal-pradesh"
  | "assam"
  | "bihar"
  | "chhattisgarh"
  | "goa"
  | "gujarat"
  | "haryana"
  | "himachal-pradesh"
  | "jharkhand"
  | "karnataka"
  | "kerala"
  | "madhya-pradesh"
  | "maharashtra"
  | "manipur"
  | "meghalaya"
  | "mizoram"
  | "nagaland"
  | "odisha"
  | "punjab"
  | "rajasthan"
  | "sikkim"
  | "tamil-nadu"
  | "telangana"
  | "tripura"
  | "uttar-pradesh"
  | "uttarakhand"
  | "west-bengal"
  | "andaman-and-nicobar"
  | "chandigarh"
  | "dadra-and-nagar-haveli-and-daman-and-diu"
  | "delhi"
  | "jammu-and-kashmir"
  | "ladakh"
  | "lakshadweep"
  | "puducherry";

export interface StateImageRecord {
  stateId: StateId;
  stateName: string;
  pinterestUrl: string;
  pinPageUrl: string;
  resolvedSourceUrl: string;
  cloudinaryPublicId: string;
  cloudinaryDeliveryUrl: string;
  title: string;
  culturalSubject: string;
  rightsStatus: string;
  httpStatus: number;
}

export const STATE_IMAGE_MANIFEST: Record<StateId, StateImageRecord> = {
  "andhra-pradesh": {
    stateId: "andhra-pradesh",
    stateName: "Andhra Pradesh",
    pinterestUrl: "https://pin.it/3E0aha8t8",
    pinPageUrl: "https://www.pinterest.com/pin/612559986827079985/sent/",
    resolvedSourceUrl: "https://i.pinimg.com/736x/a7/d6/c6/a7d6c6f2579415a9f1bb1983c203651e.jpg",
    cloudinaryPublicId: "roots/states/andhra-pradesh/hero",
    cloudinaryDeliveryUrl: "https://res.cloudinary.com/tecwmb40/image/fetch/s--191xyThw--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/a7/d6/c6/a7d6c6f2579415a9f1bb1983c203651e.jpg?_a=BAMAROWQ0",
    title: "Beauty of indian temples | Hindi temple photography, Beautiful temple in lucknow, Tirupati hills",
    culturalSubject: "Tirupati Tirumala Devasthanam & Venkatadri Hills",
    rightsStatus: "Curated by exhibition director; delivered via Cloudinary Edge Fetch CDN with f_auto,q_auto,c_fill,g_auto",
    httpStatus: 200,
  },
  "arunachal-pradesh": {
    stateId: "arunachal-pradesh",
    stateName: "Arunachal Pradesh",
    pinterestUrl: "https://pin.it/5Fcl38NZy",
    pinPageUrl: "https://www.pinterest.com/pin/964192601514143009/sent/",
    resolvedSourceUrl: "https://i.pinimg.com/736x/23/66/fb/2366fbed3200cd8e5f61116449cb57ee.jpg",
    cloudinaryPublicId: "roots/states/arunachal-pradesh/hero",
    cloudinaryDeliveryUrl: "https://res.cloudinary.com/tecwmb40/image/fetch/s--H22mYc-4--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/23/66/fb/2366fbed3200cd8e5f61116449cb57ee.jpg?_a=BAMAROWQ0",
    title: "Arunachal Pradesh | India aesthetic, India country side, Arunachal pradesh photography",
    culturalSubject: "Eastern Himalayan Countryside & Tawang Valleys",
    rightsStatus: "Curated by exhibition director; delivered via Cloudinary Edge Fetch CDN with f_auto,q_auto,c_fill,g_auto",
    httpStatus: 200,
  },
  "assam": {
    stateId: "assam",
    stateName: "Assam",
    pinterestUrl: "https://pin.it/5HMNSNl5T",
    pinPageUrl: "https://www.pinterest.com/pin/994451161480339138/sent/",
    resolvedSourceUrl: "https://i.pinimg.com/736x/d2/46/a2/d246a26b640aead0a5987232aa167b4a.jpg",
    cloudinaryPublicId: "roots/states/assam/hero",
    cloudinaryDeliveryUrl: "https://res.cloudinary.com/tecwmb40/image/fetch/s--O76lLM_W--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/d2/46/a2/d246a26b640aead0a5987232aa167b4a.jpg?_a=BAMAROWQ0",
    title: "Ancient Ceylon Tea Gardens Where Premium Tea Begins  Traditional Harvesting Methods | Malesia, Scuola, Italia",
    culturalSubject: "Terraced Brahmaputra Valley Tea Plantations",
    rightsStatus: "Curated by exhibition director; delivered via Cloudinary Edge Fetch CDN with f_auto,q_auto,c_fill,g_auto",
    httpStatus: 200,
  },
  "bihar": {
    stateId: "bihar",
    stateName: "Bihar",
    pinterestUrl: "https://pin.it/2q5GP9oQi",
    pinPageUrl: "https://www.pinterest.com/pin/173388654393907167/sent/",
    resolvedSourceUrl: "https://i.pinimg.com/736x/21/26/49/21264957a476f0f6e4f419d799ca9454.jpg",
    cloudinaryPublicId: "roots/states/bihar/hero",
    cloudinaryDeliveryUrl: "https://res.cloudinary.com/tecwmb40/image/fetch/s--xagvAbB---/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/21/26/49/21264957a476f0f6e4f419d799ca9454.jpg?_a=BAMAROWQ0",
    title: "Ghatora Katora, Rajgir | Bihar | Patna famous places, Bihar famous places, Bihar nature",
    culturalSubject: "Ghora Katora Lake & Cyclopean Walls, Rajgir",
    rightsStatus: "Curated by exhibition director; delivered via Cloudinary Edge Fetch CDN with f_auto,q_auto,c_fill,g_auto",
    httpStatus: 200,
  },
  "chhattisgarh": {
    stateId: "chhattisgarh",
    stateName: "Chhattisgarh",
    pinterestUrl: "https://pin.it/3xpDTNtpN",
    pinPageUrl: "https://www.pinterest.com/pin/745556913307099863/sent/",
    resolvedSourceUrl: "https://i.pinimg.com/736x/7e/e4/f2/7ee4f2c8a218f0ea9735a4b7fbb6ac32.jpg",
    cloudinaryPublicId: "roots/states/chhattisgarh/hero",
    cloudinaryDeliveryUrl: "https://res.cloudinary.com/tecwmb40/image/fetch/s--Xy_7Cpcd--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/7e/e4/f2/7ee4f2c8a218f0ea9735a4b7fbb6ac32.jpg?_a=BAMAROWQ0",
    title: "Jatmai Maatha Temple in Raipur, Chhattisgarh, India | Temples in india beautiful, Mountain temples in india, Temples of india",
    culturalSubject: "Jatmai Mata Cascade & Temple Sanctuary, Raipur",
    rightsStatus: "Curated by exhibition director; delivered via Cloudinary Edge Fetch CDN with f_auto,q_auto,c_fill,g_auto",
    httpStatus: 200,
  },
  "goa": {
    stateId: "goa",
    stateName: "Goa",
    pinterestUrl: "https://pin.it/5EtMoANgN",
    pinPageUrl: "https://www.pinterest.com/pin/1125688869388255948/sent/",
    resolvedSourceUrl: "https://i.pinimg.com/736x/8b/66/15/8b661583a8b0b16ec42c813886a52337.jpg",
    cloudinaryPublicId: "roots/states/goa/hero",
    cloudinaryDeliveryUrl: "https://res.cloudinary.com/tecwmb40/image/fetch/s--gjqo0qev--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/8b/66/15/8b661583a8b0b16ec42c813886a52337.jpg?_a=BAMAROWQ0",
    title: "Fly to Goa 🌊 | Aesthetic picture of goa, Aesthetic pictures of indian places, Goa beach",
    culturalSubject: "Palolem Coastal Palms & Arabian Sea Shoreline",
    rightsStatus: "Curated by exhibition director; delivered via Cloudinary Edge Fetch CDN with f_auto,q_auto,c_fill,g_auto",
    httpStatus: 200,
  },
  "gujarat": {
    stateId: "gujarat",
    stateName: "Gujarat",
    pinterestUrl: "https://pin.it/IEDNiFMtk",
    pinPageUrl: "https://www.pinterest.com/pin/616078424013344284/sent/",
    resolvedSourceUrl: "https://i.pinimg.com/736x/09/34/1a/09341aa90ff04ba3266f0732c122688d.jpg",
    cloudinaryPublicId: "roots/states/gujarat/hero",
    cloudinaryDeliveryUrl: "https://res.cloudinary.com/tecwmb40/image/fetch/s--5m9R0R0q--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/09/34/1a/09341aa90ff04ba3266f0732c122688d.jpg?_a=BAMAROWQ0",
    title: "Junagarh, Gujarat | Famous tourist places in gujarat, Junagadh city, Jamnagar city",
    culturalSubject: "Uparkot Citadel & Mahabat Maqbara, Junagadh",
    rightsStatus: "Curated by exhibition director; delivered via Cloudinary Edge Fetch CDN with f_auto,q_auto,c_fill,g_auto",
    httpStatus: 200,
  },
  "haryana": {
    stateId: "haryana",
    stateName: "Haryana",
    pinterestUrl: "https://pin.it/7LoIEaPH3",
    pinPageUrl: "https://www.pinterest.com/pin/686799011954549287/sent/",
    resolvedSourceUrl: "https://i.pinimg.com/736x/54/30/6f/54306fc1a01448b6da6e7dd37aa1e7dd.jpg",
    cloudinaryPublicId: "roots/states/haryana/hero",
    cloudinaryDeliveryUrl: "https://res.cloudinary.com/tecwmb40/image/fetch/s--rfTIXBMV--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/54/30/6f/54306fc1a01448b6da6e7dd37aa1e7dd.jpg?_a=BAMAROWQ0",
    title: "Haryana | Kurukshetra photos, Krishna on chariot, Mahabharat chariot",
    culturalSubject: "Mahabharata Chariot & Gita Darsan, Kurukshetra",
    rightsStatus: "Curated by exhibition director; delivered via Cloudinary Edge Fetch CDN with f_auto,q_auto,c_fill,g_auto",
    httpStatus: 200,
  },
  "himachal-pradesh": {
    stateId: "himachal-pradesh",
    stateName: "Himachal Pradesh",
    pinterestUrl: "https://pin.it/7rmk7d3vP",
    pinPageUrl: "https://www.pinterest.com/pin/706572629017247871/sent/",
    resolvedSourceUrl: "https://i.pinimg.com/736x/f8/f6/8d/f8f68d87abcefe8c702d6a8fb890e62a.jpg",
    cloudinaryPublicId: "roots/states/himachal-pradesh/hero",
    cloudinaryDeliveryUrl: "https://res.cloudinary.com/tecwmb40/image/fetch/s--8TY0ER9h--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/f8/f6/8d/f8f68d87abcefe8c702d6a8fb890e62a.jpg?_a=BAMAROWQ0",
    title: "Himachal Aesthetic | Manali background, Himalayas india wallpaper, Kedarnath mountain view",
    culturalSubject: "Dhauladhar Snow Peaks & Manali Conifer Valleys",
    rightsStatus: "Curated by exhibition director; delivered via Cloudinary Edge Fetch CDN with f_auto,q_auto,c_fill,g_auto",
    httpStatus: 200,
  },
  "jharkhand": {
    stateId: "jharkhand",
    stateName: "Jharkhand",
    pinterestUrl: "https://pin.it/3dsaEX0zC",
    pinPageUrl: "https://www.pinterest.com/pin/1145673592715681493/sent/",
    resolvedSourceUrl: "https://i.pinimg.com/736x/8d/fe/f3/8dfef397f35d427ea867ad991cdcbec1.jpg",
    cloudinaryPublicId: "roots/states/jharkhand/hero",
    cloudinaryDeliveryUrl: "https://res.cloudinary.com/tecwmb40/image/fetch/s--6tNuAodi--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/8d/fe/f3/8dfef397f35d427ea867ad991cdcbec1.jpg?_a=BAMAROWQ0",
    title: "Lodh waterfall | jharkhand | Jharkand places to visit, Jharkhand places aesthetic, Jharkhand places to travel",
    culturalSubject: "Lodh Waterfalls, Burha River Sanctuary",
    rightsStatus: "Curated by exhibition director; delivered via Cloudinary Edge Fetch CDN with f_auto,q_auto,c_fill,g_auto",
    httpStatus: 200,
  },
  "karnataka": {
    stateId: "karnataka",
    stateName: "Karnataka",
    pinterestUrl: "https://pin.it/13QTmL1RZ",
    pinPageUrl: "https://www.pinterest.com/pin/1115766876488726958/sent/",
    resolvedSourceUrl: "https://i.pinimg.com/736x/41/cc/98/41cc98607829b53798ef4381accc8161.jpg",
    cloudinaryPublicId: "roots/states/karnataka/hero",
    cloudinaryDeliveryUrl: "https://res.cloudinary.com/tecwmb40/image/fetch/s--pqiz_Bec--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/41/cc/98/41cc98607829b53798ef4381accc8161.jpg?_a=BAMAROWQ0",
    title: "Papanath Temple 🇮🇳  Stunning Chalukyan Masterpiece🌧️✨ | Temple of india, Old temple photography, Badami chalukya architecture",
    culturalSubject: "Papanatha Temple & Badami Chalukyan Monoliths",
    rightsStatus: "Curated by exhibition director; delivered via Cloudinary Edge Fetch CDN with f_auto,q_auto,c_fill,g_auto",
    httpStatus: 200,
  },
  "kerala": {
    stateId: "kerala",
    stateName: "Kerala",
    pinterestUrl: "https://pin.it/6tDc15ySj",
    pinPageUrl: "https://www.pinterest.com/pin/152489137381737058/sent/",
    resolvedSourceUrl: "https://i.pinimg.com/736x/24/59/3e/24593ea5f4cb7bc52e956de7275a4a4e.jpg",
    cloudinaryPublicId: "roots/states/kerala/hero",
    cloudinaryDeliveryUrl: "https://res.cloudinary.com/tecwmb40/image/fetch/s--QNJZSmX3--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/24/59/3e/24593ea5f4cb7bc52e956de7275a4a4e.jpg?_a=BAMAROWQ0",
    title: "インド | 自然の写真, ビーチの写真",
    culturalSubject: "Vembanad Backwaters & Coconut Palm Canopy",
    rightsStatus: "Curated by exhibition director; delivered via Cloudinary Edge Fetch CDN with f_auto,q_auto,c_fill,g_auto",
    httpStatus: 200,
  },
  "madhya-pradesh": {
    stateId: "madhya-pradesh",
    stateName: "Madhya Pradesh",
    pinterestUrl: "https://pin.it/2Xc9IU0YI",
    pinPageUrl: "https://www.pinterest.com/pin/663155113874253598/sent/",
    resolvedSourceUrl: "https://i.pinimg.com/736x/d0/f1/6e/d0f16eae84e3a9592f6e721ad84ca104.jpg",
    cloudinaryPublicId: "roots/states/madhya-pradesh/hero",
    cloudinaryDeliveryUrl: "https://res.cloudinary.com/tecwmb40/image/fetch/s--kJMsfF-V--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/d0/f1/6e/d0f16eae84e3a9592f6e721ad84ca104.jpg?_a=BAMAROWQ0",
    title: "Panna, Madhya Pradesh Landmark | Madhya pradesh aesthetic, White gurudwara building, White temple building in dehradun",
    culturalSubject: "Panna Heritage & Vindhyan Sandstone Pavilions",
    rightsStatus: "Curated by exhibition director; delivered via Cloudinary Edge Fetch CDN with f_auto,q_auto,c_fill,g_auto",
    httpStatus: 200,
  },
  "maharashtra": {
    stateId: "maharashtra",
    stateName: "Maharashtra",
    pinterestUrl: "https://pin.it/5lk6DQP1R",
    pinPageUrl: "https://www.pinterest.com/pin/937593216200993435/sent/",
    resolvedSourceUrl: "https://i.pinimg.com/736x/02/80/bf/0280bf54b3b144b43f397be496b28344.jpg",
    cloudinaryPublicId: "roots/states/maharashtra/hero",
    cloudinaryDeliveryUrl: "https://res.cloudinary.com/tecwmb40/image/fetch/s--cbp_Z4z7--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/02/80/bf/0280bf54b3b144b43f397be496b28344.jpg?_a=BAMAROWQ0",
    title: "Mumbai city scape | Indian aesthetic city, Mumbai skyline day, Mumbai night view images",
    culturalSubject: "Marine Drive Queen's Necklace & Mumbai Skyline",
    rightsStatus: "Curated by exhibition director; delivered via Cloudinary Edge Fetch CDN with f_auto,q_auto,c_fill,g_auto",
    httpStatus: 200,
  },
  "manipur": {
    stateId: "manipur",
    stateName: "Manipur",
    pinterestUrl: "https://pin.it/Ss43VzjDY",
    pinPageUrl: "https://www.pinterest.com/pin/957226095824724770/sent/",
    resolvedSourceUrl: "https://i.pinimg.com/736x/c3/af/24/c3af2498fe8ea9975d94f7d4cac0ab8f.jpg",
    cloudinaryPublicId: "roots/states/manipur/hero",
    cloudinaryDeliveryUrl: "https://res.cloudinary.com/tecwmb40/image/fetch/s--kwg0gXRb--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/c3/af/24/c3af2498fe8ea9975d94f7d4cac0ab8f.jpg?_a=BAMAROWQ0",
    title: "Manipur | Best places in manipur, Manipur places to visit, Tourist places in manipur",
    culturalSubject: "Loktak Floating Phumdis & Valley Vistas",
    rightsStatus: "Curated by exhibition director; delivered via Cloudinary Edge Fetch CDN with f_auto,q_auto,c_fill,g_auto",
    httpStatus: 200,
  },
  "meghalaya": {
    stateId: "meghalaya",
    stateName: "Meghalaya",
    pinterestUrl: "https://pin.it/EZeR1U3JT",
    pinPageUrl: "https://www.pinterest.com/pin/549087379586160630/sent/",
    resolvedSourceUrl: "https://i.pinimg.com/736x/60/df/82/60df82535df018288d47807f35f57953.jpg",
    cloudinaryPublicId: "roots/states/meghalaya/hero",
    cloudinaryDeliveryUrl: "https://res.cloudinary.com/tecwmb40/image/fetch/s--oKEGs7B3--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/60/df/82/60df82535df018288d47807f35f57953.jpg?_a=BAMAROWQ0",
    title: "Elephants chilling on the river | Dieren foto&#x27;s, Natuurfoto&#x27;s, Olifanten",
    culturalSubject: "Sacred Riverbed & Khasi Hills Elephant Sanctuary",
    rightsStatus: "Curated by exhibition director; delivered via Cloudinary Edge Fetch CDN with f_auto,q_auto,c_fill,g_auto",
    httpStatus: 200,
  },
  "mizoram": {
    stateId: "mizoram",
    stateName: "Mizoram",
    pinterestUrl: "https://pin.it/3oK5as9Sl",
    pinPageUrl: "https://www.pinterest.com/pin/1084452785275533471/sent/",
    resolvedSourceUrl: "https://i.pinimg.com/736x/99/76/70/997670c3b3c72043e43c03dd08c2cb7e.jpg",
    cloudinaryPublicId: "roots/states/mizoram/hero",
    cloudinaryDeliveryUrl: "https://res.cloudinary.com/tecwmb40/image/fetch/s--LFrvwM56--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/99/76/70/997670c3b3c72043e43c03dd08c2cb7e.jpg?_a=BAMAROWQ0",
    title: "Mizoram | North east india landscape, North east india aesthetics, Northeast india landscape",
    culturalSubject: "Phawngpui Blue Mountain Ridge & Lushai Hills",
    rightsStatus: "Curated by exhibition director; delivered via Cloudinary Edge Fetch CDN with f_auto,q_auto,c_fill,g_auto",
    httpStatus: 200,
  },
  "nagaland": {
    stateId: "nagaland",
    stateName: "Nagaland",
    pinterestUrl: "https://pin.it/uJGaHEEf1",
    pinPageUrl: "https://www.pinterest.com/pin/1121607482205493189/sent/",
    resolvedSourceUrl: "https://i.pinimg.com/736x/2d/24/04/2d24046412b4043c39c338135ae66baa.jpg",
    cloudinaryPublicId: "roots/states/nagaland/hero",
    cloudinaryDeliveryUrl: "https://res.cloudinary.com/tecwmb40/image/fetch/s--v8dnGEpV--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/2d/24/04/2d24046412b4043c39c338135ae66baa.jpg?_a=BAMAROWQ0",
    title: "A photograph of Dzükou Valley in Nagaland, showcasing its lush green landscape and unique ecosystem. | Beautiful nature photography forests, Green nature aesthetic, Beautiful place in the world",
    culturalSubject: "Dzukou Valley Lily Sanctuary & Barail Highlands",
    rightsStatus: "Curated by exhibition director; delivered via Cloudinary Edge Fetch CDN with f_auto,q_auto,c_fill,g_auto",
    httpStatus: 200,
  },
  "odisha": {
    stateId: "odisha",
    stateName: "Odisha",
    pinterestUrl: "https://pin.it/1mDR24nYo",
    pinPageUrl: "https://www.pinterest.com/pin/998673286138806934/sent/",
    resolvedSourceUrl: "https://i.pinimg.com/736x/47/68/dc/4768dc9f3f6a4338b15d30020aac3d56.jpg",
    cloudinaryPublicId: "roots/states/odisha/hero",
    cloudinaryDeliveryUrl: "https://res.cloudinary.com/tecwmb40/image/fetch/s--fOwMiyRm--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/47/68/dc/4768dc9f3f6a4338b15d30020aac3d56.jpg?_a=BAMAROWQ0",
    title: "श्री जगन्नाथ मंदिर पूरी धाम, ओडिशा - भारतीय संस्कृति का एक प्रमुख स्थल 🚩🙏 | Hindi temple photography, Jagannath temple images, Jagannath temple photo",
    culturalSubject: "Shree Jagannath Puri Dham & Kalinga Vimana",
    rightsStatus: "Curated by exhibition director; delivered via Cloudinary Edge Fetch CDN with f_auto,q_auto,c_fill,g_auto",
    httpStatus: 200,
  },
  "punjab": {
    stateId: "punjab",
    stateName: "Punjab",
    pinterestUrl: "https://pin.it/3S5hvIShL",
    pinPageUrl: "https://www.pinterest.com/pin/673147475563355313/sent/",
    resolvedSourceUrl: "https://i.pinimg.com/736x/b8/82/d1/b882d138d81e29b50cc561842895c9f1.jpg",
    cloudinaryPublicId: "roots/states/punjab/hero",
    cloudinaryDeliveryUrl: "https://res.cloudinary.com/tecwmb40/image/fetch/s--apyUseEI--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/b8/82/d1/b882d138d81e29b50cc561842895c9f1.jpg?_a=BAMAROWQ0",
    title: "Gravy Boat on a Golden Sunset | Golden temple pics for dp, Golden temple photography beautiful, Golden temple hd wallpaper",
    culturalSubject: "Harmandir Sahib (Golden Temple) Amrit Sarovar, Amritsar",
    rightsStatus: "Curated by exhibition director; delivered via Cloudinary Edge Fetch CDN with f_auto,q_auto,c_fill,g_auto",
    httpStatus: 200,
  },
  "rajasthan": {
    stateId: "rajasthan",
    stateName: "Rajasthan",
    pinterestUrl: "https://pin.it/4DwtLhc6n",
    pinPageUrl: "https://www.pinterest.com/pin/889320257665806400/sent/",
    resolvedSourceUrl: "https://i.pinimg.com/736x/aa/5d/92/aa5d9273ec5f92954c510d75f4f1b19f.jpg",
    cloudinaryPublicId: "roots/states/rajasthan/hero",
    cloudinaryDeliveryUrl: "https://res.cloudinary.com/tecwmb40/image/fetch/s--3aNrsgmr--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/aa/5d/92/aa5d9273ec5f92954c510d75f4f1b19f.jpg?_a=BAMAROWQ0",
    title: "Hawa Mahal, Jaipur, Rajasthan 🇮🇳 . . . #HawaMahal #Jaipur #Rajasthan #India #PinkCity #IndianArchitecture #Travel #Ins… | Indian wonders, Famous historical monuments of india, Pic of rajasthan",
    culturalSubject: "Hawa Mahal Pink Palace of Winds, Jaipur",
    rightsStatus: "Curated by exhibition director; delivered via Cloudinary Edge Fetch CDN with f_auto,q_auto,c_fill,g_auto",
    httpStatus: 200,
  },
  "sikkim": {
    stateId: "sikkim",
    stateName: "Sikkim",
    pinterestUrl: "https://pin.it/4OA4WGTin",
    pinPageUrl: "https://www.pinterest.com/pin/1022669027892960436/sent/",
    resolvedSourceUrl: "https://i.pinimg.com/736x/dc/7d/36/dc7d36e85e63fff3d6475ce4cdad6b6d.jpg",
    cloudinaryPublicId: "roots/states/sikkim/hero",
    cloudinaryDeliveryUrl: "https://res.cloudinary.com/tecwmb40/image/fetch/s--6wBkNnvF--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/dc/7d/36/dc7d36e85e63fff3d6475ce4cdad6b6d.jpg?_a=BAMAROWQ0",
    title: "7 Breathtaking Sikkim Locations Every Nature Lover Should Explore | Natural beauty of sikkim, Beautiful pictures of sikkim, Rumtek monastery sikkim",
    culturalSubject: "Kangchenjunga Himalayan Range & Rumtek Valley",
    rightsStatus: "Curated by exhibition director; delivered via Cloudinary Edge Fetch CDN with f_auto,q_auto,c_fill,g_auto",
    httpStatus: 200,
  },
  "tamil-nadu": {
    stateId: "tamil-nadu",
    stateName: "Tamil Nadu",
    pinterestUrl: "https://pin.it/1wAaCx1M3",
    pinPageUrl: "https://www.pinterest.com/pin/620019073709253003/sent/",
    resolvedSourceUrl: "https://i.pinimg.com/736x/36/bc/3e/36bc3ea596a0c00f134e34d3b6e8f2d8.jpg",
    cloudinaryPublicId: "roots/states/tamil-nadu/hero",
    cloudinaryDeliveryUrl: "https://res.cloudinary.com/tecwmb40/image/fetch/s--QCayZndP--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/36/bc/3e/36bc3ea596a0c00f134e34d3b6e8f2d8.jpg?_a=BAMAROWQ0",
    title: "Sunset over Ancient Temple in India | Tanjore temple photography, Thiruvanvandoor temple photos, Thanjai periya kovil wallpaper",
    culturalSubject: "Brihadisvara Great Chola Temple Vimana, Thanjavur",
    rightsStatus: "Curated by exhibition director; delivered via Cloudinary Edge Fetch CDN with f_auto,q_auto,c_fill,g_auto",
    httpStatus: 200,
  },
  "telangana": {
    stateId: "telangana",
    stateName: "Telangana",
    pinterestUrl: "https://pin.it/2RFBKLFrV",
    pinPageUrl: "https://www.pinterest.com/pin/713961347219220329/sent/",
    resolvedSourceUrl: "https://i.pinimg.com/736x/4a/99/f6/4a99f6934dc8bfb9894fd59b2f060136.jpg",
    cloudinaryPublicId: "roots/states/telangana/hero",
    cloudinaryDeliveryUrl: "https://res.cloudinary.com/tecwmb40/image/fetch/s--ZzCHqHaS--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/4a/99/f6/4a99f6934dc8bfb9894fd59b2f060136.jpg?_a=BAMAROWQ0",
    title: "Hyderabad Charminar 🌅 | Indian famous buildings, Ancient architecture of india, Indian monuments aesthetic",
    culturalSubject: "Charminar Monumental Arches, Hyderabad",
    rightsStatus: "Curated by exhibition director; delivered via Cloudinary Edge Fetch CDN with f_auto,q_auto,c_fill,g_auto",
    httpStatus: 200,
  },
  "tripura": {
    stateId: "tripura",
    stateName: "Tripura",
    pinterestUrl: "https://pin.it/6luAeeMGO",
    pinPageUrl: "https://www.pinterest.com/pin/446700856798164925/sent/",
    resolvedSourceUrl: "https://i.pinimg.com/736x/15/3d/4f/153d4ff6f733e60ef823e1732cf45f37.jpg",
    cloudinaryPublicId: "roots/states/tripura/hero",
    cloudinaryDeliveryUrl: "https://res.cloudinary.com/tecwmb40/image/fetch/s--n3uSFXHu--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/15/3d/4f/153d4ff6f733e60ef823e1732cf45f37.jpg?_a=BAMAROWQ0",
    title: "Hindu Cosmos | Tripura photo, Hilltop temple in india, Shiva temples in west bengal",
    culturalSubject: "Unakoti Rock-Cut Shaivite Bas-Reliefs",
    rightsStatus: "Curated by exhibition director; delivered via Cloudinary Edge Fetch CDN with f_auto,q_auto,c_fill,g_auto",
    httpStatus: 200,
  },
  "uttar-pradesh": {
    stateId: "uttar-pradesh",
    stateName: "Uttar Pradesh",
    pinterestUrl: "https://pin.it/aSBGlHWe1",
    pinPageUrl: "https://www.pinterest.com/pin/937874691178347942/sent/",
    resolvedSourceUrl: "https://i.pinimg.com/736x/f0/74/8d/f0748d389877497a22b8cc830d7afba9.jpg",
    cloudinaryPublicId: "roots/states/uttar-pradesh/hero",
    cloudinaryDeliveryUrl: "https://res.cloudinary.com/tecwmb40/image/fetch/s--h-p2hnPQ--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/f0/74/8d/f0748d389877497a22b8cc830d7afba9.jpg?_a=BAMAROWQ0",
    title: "Shree Ramjanmbhumi Temple Ayodhya | Temple of ayodhya, Temple in the world, Beautiful mandir in india",
    culturalSubject: "Shree Ram Janmabhoomi Mandir, Ayodhya",
    rightsStatus: "Curated by exhibition director; delivered via Cloudinary Edge Fetch CDN with f_auto,q_auto,c_fill,g_auto",
    httpStatus: 200,
  },
  "uttarakhand": {
    stateId: "uttarakhand",
    stateName: "Uttarakhand",
    pinterestUrl: "https://pin.it/4QGg77rPY",
    pinPageUrl: "https://www.pinterest.com/pin/980166306389690363/sent/",
    resolvedSourceUrl: "https://i.pinimg.com/736x/47/14/30/471430b468f840c3b500bbe9aee44eac.jpg",
    cloudinaryPublicId: "roots/states/uttarakhand/hero",
    cloudinaryDeliveryUrl: "https://res.cloudinary.com/tecwmb40/image/fetch/s--EPhcgMg3--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/47/14/30/471430b468f840c3b500bbe9aee44eac.jpg?_a=BAMAROWQ0",
    title: "#Devprayag | Uttrakhand image, Alaknanda river, Uttarakhand landscape",
    culturalSubject: "Devprayag Sangam of Bhagirathi & Alaknanda Rivers",
    rightsStatus: "Curated by exhibition director; delivered via Cloudinary Edge Fetch CDN with f_auto,q_auto,c_fill,g_auto",
    httpStatus: 200,
  },
  "west-bengal": {
    stateId: "west-bengal",
    stateName: "West Bengal",
    pinterestUrl: "https://pin.it/5XaaO1l9F",
    pinPageUrl: "https://www.pinterest.com/pin/614248836675655119/sent/",
    resolvedSourceUrl: "https://i.pinimg.com/736x/5b/58/a0/5b58a0b0d2239d95b7c18efff9ecf34c.jpg",
    cloudinaryPublicId: "roots/states/west-bengal/hero",
    cloudinaryDeliveryUrl: "https://res.cloudinary.com/tecwmb40/image/fetch/s--fYuWb7wI--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/5b/58/a0/5b58a0b0d2239d95b7c18efff9ecf34c.jpg?_a=BAMAROWQ0",
    title: "Kolkata aesthetic images | Bengal red, Kolkata red building, Kolkata city",
    culturalSubject: "Victoria Memorial Marble Dome & Kolkata Heritage",
    rightsStatus: "Curated by exhibition director; delivered via Cloudinary Edge Fetch CDN with f_auto,q_auto,c_fill,g_auto",
    httpStatus: 200,
  },
  "andaman-and-nicobar": {
    stateId: "andaman-and-nicobar",
    stateName: "Andaman and Nicobar Islands",
    pinterestUrl: "https://pin.it/1EEhcBJin",
    pinPageUrl: "https://www.pinterest.com/pin/622763454762496824/sent/",
    resolvedSourceUrl: "https://i.pinimg.com/736x/d0/86/a8/d086a85ed1174add6b61720cd4c3ef16.jpg",
    cloudinaryPublicId: "roots/states/andaman-and-nicobar/hero",
    cloudinaryDeliveryUrl: "https://res.cloudinary.com/tecwmb40/image/fetch/s--XGM5Vuba--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/d0/86/a8/d086a85ed1174add6b61720cd4c3ef16.jpg?_a=BAMAROWQ0",
    title: "Andaman and Nicobar Islands | Andaman and nicobar islands aesthetic wallpaper, Andaman nicobar images, Andaman and nicobar islands scenic view",
    culturalSubject: "Radhanagar Bay & Havelock Island Coral Coast",
    rightsStatus: "Curated by exhibition director; delivered via Cloudinary Edge Fetch CDN with f_auto,q_auto,c_fill,g_auto",
    httpStatus: 200,
  },
  "chandigarh": {
    stateId: "chandigarh",
    stateName: "Chandigarh",
    pinterestUrl: "https://pin.it/1l6otrj2S",
    pinPageUrl: "https://www.pinterest.com/pin/970525788471667074/sent/",
    resolvedSourceUrl: "https://i.pinimg.com/736x/8b/44/ac/8b44ac7b81d82f7f6239b7373b45c88c.jpg",
    cloudinaryPublicId: "roots/states/chandigarh/hero",
    cloudinaryDeliveryUrl: "https://res.cloudinary.com/tecwmb40/image/fetch/s--fxfU6Gx9--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/8b/44/ac/8b44ac7b81d82f7f6239b7373b45c88c.jpg?_a=BAMAROWQ0",
    title: "Must go to Chandigarh | Old building aesthetic, India building aesthetic, Old building photography",
    culturalSubject: "Open Hand Monument & Le Corbusier Capitol Complex",
    rightsStatus: "Curated by exhibition director; delivered via Cloudinary Edge Fetch CDN with f_auto,q_auto,c_fill,g_auto",
    httpStatus: 200,
  },
  "dadra-and-nagar-haveli-and-daman-and-diu": {
    stateId: "dadra-and-nagar-haveli-and-daman-and-diu",
    stateName: "Dadra and Nagar Haveli and Daman and Diu",
    pinterestUrl: "https://pin.it/FjTp5Jh50",
    pinPageUrl: "https://www.pinterest.com/pin/530510031082197678/sent/",
    resolvedSourceUrl: "https://i.pinimg.com/736x/72/bb/13/72bb13a93629b367716c76a5d905f44d.jpg",
    cloudinaryPublicId: "roots/states/dadra-and-nagar-haveli-and-daman-and-diu/hero",
    cloudinaryDeliveryUrl: "https://res.cloudinary.com/tecwmb40/image/fetch/s--jzuMUmhi--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/72/bb/13/72bb13a93629b367716c76a5d905f44d.jpg?_a=BAMAROWQ0",
    title: "Top 8 Places To Visit At Daman and Diu - Fort Of St Jerome | Incroyable inde, Architecture unique, Endroits à visiter",
    culturalSubject: "Fort of St. Jerome & Portuguese Sea Bastion, Daman",
    rightsStatus: "Curated by exhibition director; delivered via Cloudinary Edge Fetch CDN with f_auto,q_auto,c_fill,g_auto",
    httpStatus: 200,
  },
  "delhi": {
    stateId: "delhi",
    stateName: "Delhi",
    pinterestUrl: "https://pin.it/3FYlHSIFW",
    pinPageUrl: "https://www.pinterest.com/pin/973199800712173251/sent/",
    resolvedSourceUrl: "https://i.pinimg.com/736x/c2/b9/41/c2b941697c9882bc51117565218ec1ff.jpg",
    cloudinaryPublicId: "roots/states/delhi/hero",
    cloudinaryDeliveryUrl: "https://res.cloudinary.com/tecwmb40/image/fetch/s--k8_nHpl5--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/c2/b9/41/c2b941697c9882bc51117565218ec1ff.jpg?_a=BAMAROWQ0",
    title: "Humayun&#x27;s Tomb, Delhi - Historical Landmark in India | Delhi pics, Delhi monuments, India travel places",
    culturalSubject: "Humayun's Tomb Red Sandstone & Marble Dome, Delhi",
    rightsStatus: "Curated by exhibition director; delivered via Cloudinary Edge Fetch CDN with f_auto,q_auto,c_fill,g_auto",
    httpStatus: 200,
  },
  "jammu-and-kashmir": {
    stateId: "jammu-and-kashmir",
    stateName: "Jammu and Kashmir",
    pinterestUrl: "https://pin.it/85EK0rb4u",
    pinPageUrl: "https://www.pinterest.com/pin/844073155188034233/sent/",
    resolvedSourceUrl: "https://i.pinimg.com/736x/68/b6/7d/68b67d664eba866d3efef3ffacc36e9b.jpg",
    cloudinaryPublicId: "roots/states/jammu-and-kashmir/hero",
    cloudinaryDeliveryUrl: "https://res.cloudinary.com/tecwmb40/image/fetch/s--cfd0SBr6--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/68/b6/7d/68b67d664eba866d3efef3ffacc36e9b.jpg?_a=BAMAROWQ0",
    title: "Picturesque valleys of Kashmir | Kashmir trip, Travel destinations in india, Amritsar",
    culturalSubject: "Kashmir Valley Chinar Canopies & Pir Panjal Peaks",
    rightsStatus: "Curated by exhibition director; delivered via Cloudinary Edge Fetch CDN with f_auto,q_auto,c_fill,g_auto",
    httpStatus: 200,
  },
  "ladakh": {
    stateId: "ladakh",
    stateName: "Ladakh",
    pinterestUrl: "https://pin.it/4bpXCEgJl",
    pinPageUrl: "https://www.pinterest.com/pin/958140889515804134/sent/",
    resolvedSourceUrl: "https://i.pinimg.com/736x/43/6c/db/436cdbe4f28921357895615ceb44e540.jpg",
    cloudinaryPublicId: "roots/states/ladakh/hero",
    cloudinaryDeliveryUrl: "https://res.cloudinary.com/tecwmb40/image/fetch/s--EH7fjwik--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/43/6c/db/436cdbe4f28921357895615ceb44e540.jpg?_a=BAMAROWQ0",
    title: "Laddakh travel 🧳 | Pictures of places on way to ladakh, Laddakh aesthetic images, Aesthetic places to visit in ladakh",
    culturalSubject: "High Altitude Cold Desert & Stupas, Ladakh",
    rightsStatus: "Curated by exhibition director; delivered via Cloudinary Edge Fetch CDN with f_auto,q_auto,c_fill,g_auto",
    httpStatus: 200,
  },
  "lakshadweep": {
    stateId: "lakshadweep",
    stateName: "Lakshadweep",
    pinterestUrl: "https://pin.it/7fzyYMFfd",
    pinPageUrl: "https://www.pinterest.com/pin/739012620147885123/sent/",
    resolvedSourceUrl: "https://i.pinimg.com/736x/62/cc/ae/62ccae1bdd7775e38425f3dbcbc8dd8d.jpg",
    cloudinaryPublicId: "roots/states/lakshadweep/hero",
    cloudinaryDeliveryUrl: "https://res.cloudinary.com/tecwmb40/image/fetch/s--ZOu87fPM--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/62/cc/ae/62ccae1bdd7775e38425f3dbcbc8dd8d.jpg?_a=BAMAROWQ0",
    title: "Lakshadweep | Beautiful places in india, Beautiful places in the world nature, Lakshadweep aesthetic",
    culturalSubject: "Bangaram Turquoise Lagoon & Coral Atolls",
    rightsStatus: "Curated by exhibition director; delivered via Cloudinary Edge Fetch CDN with f_auto,q_auto,c_fill,g_auto",
    httpStatus: 200,
  },
  "puducherry": {
    stateId: "puducherry",
    stateName: "Puducherry",
    pinterestUrl: "https://pin.it/6uYal3r2F",
    pinPageUrl: "https://www.pinterest.com/pin/815644182545731811/sent/",
    resolvedSourceUrl: "https://i.pinimg.com/736x/d2/68/6e/d2686e7009046d671ee39802c33eb97f.jpg",
    cloudinaryPublicId: "roots/states/puducherry/hero",
    cloudinaryDeliveryUrl: "https://res.cloudinary.com/tecwmb40/image/fetch/s--0lEwfsGy--/c_fill,f_auto,g_auto,h_675,q_auto,w_1200/https://i.pinimg.com/736x/d2/68/6e/d2686e7009046d671ee39802c33eb97f.jpg?_a=BAMAROWQ0",
    title: "Matrimandir | Golden globe | Auroville, Pondicherry | Auroville globe, Matrimandir design, Pondicherry vision board",
    culturalSubject: "Matrimandir Golden Spherical Sanctuary, Auroville",
    rightsStatus: "Curated by exhibition director; delivered via Cloudinary Edge Fetch CDN with f_auto,q_auto,c_fill,g_auto",
    httpStatus: 200,
  },
};

/**
 * Retrieves the full image record for a given state or union territory.
 */
export function getStateImageRecord(stateId: string): StateImageRecord | undefined {
  return STATE_IMAGE_MANIFEST[stateId as StateId];
}

/**
 * Returns the optimized Cloudinary delivery URL for a state hero image.
 * Falls back to canonical Cloudinary asset if state ID is not recognized.
 */
export function getStateHeroImage(stateId: string): string {
  const record = STATE_IMAGE_MANIFEST[stateId as StateId];
  if (record) {
    return record.cloudinaryDeliveryUrl;
  }
  return "https://res.cloudinary.com/tecwmb40/image/upload/f_auto,q_auto,c_fill,w_1200,h_675/roots/madurai_gopuram";
}
