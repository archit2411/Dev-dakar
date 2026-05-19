const menuData = [
  // ── BENGALI
  { id:"b001", name:"Shorshe Ilish",       description:"Hilsa fish in mustard gravy, Bengali-style",                price:380, category:"bengali",     type:"nonveg", image:"", available:true },
  { id:"b002", name:"Aloo Posto",           description:"Potatoes in poppy seed paste",                             price:180, category:"bengali",     type:"veg",    image:"", available:true },
  { id:"b003", name:"Chingri Malaikari",    description:"Prawns in coconut milk curry",                             price:420, category:"bengali",     type:"nonveg", image:"", available:true },
  { id:"b004", name:"Lau Ghonto",           description:"Bottle gourd cooked with mustard & coconut",               price:160, category:"bengali",     type:"veg",    image:"", available:true },
  { id:"b005", name:"Kosha Mangsho",        description:"Slow-cooked Bengali mutton in spiced gravy",               price:460, category:"bengali",     type:"nonveg", image:"", available:true },
  { id:"b006", name:"Bhetki Paturi",        description:"Bhetki fish wrapped in banana leaf, steamed",              price:340, category:"bengali",     type:"nonveg", image:"", available:true },
  { id:"b007", name:"Mochar Ghonto",        description:"Banana flower stir-fry with coconut",                      price:170, category:"bengali",     type:"veg",    image:"", available:true },
  { id:"b008", name:"Dal Tadka Bong Style", description:"Yellow lentils tempered with panch phoron",                price:150, category:"bengali",     type:"veg",    image:"", available:true },

  // ── NORTH INDIAN
  { id:"ni001", name:"Dal Makhani",         description:"Slow-cooked black lentils with butter and cream",          price:220, category:"north-indian", type:"veg",    image:"", available:true },
  { id:"ni002", name:"Butter Chicken",      description:"Tender chicken in rich tomato-butter sauce",               price:320, category:"north-indian", type:"nonveg", image:"", available:true },
  { id:"ni003", name:"Paneer Tikka Masala", description:"Grilled cottage cheese in spiced tomato gravy",            price:280, category:"north-indian", type:"veg",    image:"", available:true },
  { id:"ni004", name:"Rogan Josh",          description:"Aromatic Kashmiri lamb curry",                             price:400, category:"north-indian", type:"nonveg", image:"", available:true },
  { id:"ni005", name:"Palak Paneer",        description:"Cottage cheese in creamy spinach gravy",                   price:240, category:"north-indian", type:"veg",    image:"", available:true },
  { id:"ni006", name:"Garlic Naan",         description:"Soft tandoor-baked bread with garlic butter",              price:60,  category:"north-indian", type:"veg",    image:"", available:true },
  { id:"ni007", name:"Biryani (Veg)",       description:"Fragrant basmati rice with seasonal vegetables & saffron", price:260, category:"north-indian", type:"veg",    image:"", available:true },
  { id:"ni008", name:"Biryani (Chicken)",   description:"Lucknowi-style dum biryani with tender chicken",           price:320, category:"north-indian", type:"nonveg", image:"", available:true },

  // ── CHINESE
  { id:"ch001", name:"Chicken Manchurian",  description:"Crispy chicken in sweet-tangy Manchurian sauce",           price:280, category:"chinese",     type:"nonveg", image:"", available:true },
  { id:"ch002", name:"Veg Fried Rice",      description:"Wok-tossed rice with fresh vegetables & soy",             price:200, category:"chinese",     type:"veg",    image:"", available:true },
  { id:"ch003", name:"Prawn Chilli",        description:"Juicy prawns stir-fried with chilli and peppers",         price:360, category:"chinese",     type:"nonveg", image:"", available:true },
  { id:"ch004", name:"Chilli Paneer",       description:"Crispy cottage cheese in bold chilli-garlic sauce",        price:240, category:"chinese",     type:"veg",    image:"", available:true },
  { id:"ch005", name:"Hot & Sour Soup",     description:"Classic tangy soup with vegetables and egg drops",         price:160, category:"chinese",     type:"nonveg", image:"", available:true },
  { id:"ch006", name:"Spring Rolls (Veg)",  description:"Crispy rolls stuffed with seasoned vegetables",            price:180, category:"chinese",     type:"veg",    image:"", available:true },
  { id:"ch007", name:"Hakka Noodles",       description:"Tossed noodles with veggies in Indo-Chinese sauces",      price:220, category:"chinese",     type:"veg",    image:"", available:true },
  { id:"ch008", name:"Chicken Lollipop",    description:"Spiced chicken drumettes, fried golden",                  price:320, category:"chinese",     type:"nonveg", image:"", available:true },

  // ── BEVERAGES
  { id:"bv001", name:"Aam Panna",           description:"Raw mango cooler with mint and black salt",                price:80,  category:"beverages",   type:"veg",    image:"", available:true },
  { id:"bv002", name:"Masala Chai",         description:"Spiced milk tea, Varanasi-style",                         price:50,  category:"beverages",   type:"veg",    image:"", available:true },
  { id:"bv003", name:"Fresh Lime Soda",     description:"Sweet or salted with mint",                               price:70,  category:"beverages",   type:"veg",    image:"", available:true },
  { id:"bv004", name:"Mango Lassi",         description:"Creamy blended yogurt with Alphonso mango",               price:100, category:"beverages",   type:"veg",    image:"", available:true },
  { id:"bv005", name:"Rose Sharbat",        description:"Chilled rose syrup with basil seeds",                     price:80,  category:"beverages",   type:"veg",    image:"", available:true },
  { id:"bv006", name:"Cold Coffee",         description:"Thick blended coffee with ice cream",                     price:120, category:"beverages",   type:"veg",    image:"", available:true },

  // ── DESSERTS
  { id:"ds001", name:"Mishti Doi",          description:"Sweetened Bengali-style set yogurt",                      price:90,  category:"desserts",    type:"veg",    image:"", available:true },
  { id:"ds002", name:"Rasgulla",            description:"Soft cottage cheese balls in sugar syrup",                price:80,  category:"desserts",    type:"veg",    image:"", available:true },
  { id:"ds003", name:"Gulab Jamun",         description:"Fried milk-solid dumplings in rose syrup, warm",          price:90,  category:"desserts",    type:"veg",    image:"", available:true },
  { id:"ds004", name:"Sandesh",             description:"Classic Bengali sweet made from fresh chhena",             price:100, category:"desserts",    type:"veg",    image:"", available:true },
  { id:"ds005", name:"Chocolate Brownie",   description:"Warm fudge brownie with vanilla ice cream",               price:160, category:"desserts",    type:"veg",    image:"", available:true },
  { id:"ds006", name:"Payesh",              description:"Bengali rice pudding with saffron and cardamom",           price:110, category:"desserts",    type:"veg",    image:"", available:true },
];
