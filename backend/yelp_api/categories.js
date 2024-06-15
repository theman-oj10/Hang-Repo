// functions to access the data for better abstraction
// there is no special categories here, implement?
function getCuisineNameByAlias(alias) {
  return cuisineOptions[alias] || null;
}

function getCuisineAliasByName(name) {
  for (const [key, value] of Object.entries(cuisineOptions)) {
    if (value === name) {
      return key;
    }
  }
  return null;
}

function isCuisineAliasPresent(alias) {
  return alias in cuisineOptions;
}

function getFavFoodNameByAlias(alias) {
  return favFoodOptions[alias] || null;
}

function getFavFoodAliasByName(name) {
  for (const [key, value] of Object.entries(favFoodOptions)) {
    if (value === name) {
      return key;
    }
  }
  return null;
}

function isFavFoodAliasPresent(alias) {
  return alias in favFoodOptions;
}

function getActivityNameByAlias(alias) {
  return activityOptions[alias] || null;
}

function getActivityAliasByName(name) {
  for (const [key, value] of Object.entries(activityOptions)) {
    if (value === name) {
      return key;
    }
  }
  return null;
}

function isActivityAliasPresent(alias) {
  return alias in activityOptions;
}

function getDietaryNameByAlias(alias) {
  return dietaryOptions[alias] || null;
}

function getDietaryAliasByName(name) {
  for (const [key, value] of Object.entries(dietaryOptions)) {
    if (value === name) {
      return key;
    }
  }
  return null;
}

function isDietaryAliasPresent(alias) {
  return alias in dietaryOptions;
}

function getSpecialFoodNameByAlias(alias) {
    return specialFoodOptions[alias] || null;
}

function getSpecialFoodAliasByName(name) {
    for (const [key, value] of Object.entries(specialFoodOptions)) {
        if (value === name) {
            return key;
        }
    }
    return null;
}

function isSpecialFoodAliasPresent(alias) {
    return alias in specialFoodOptions;
}

function getAlcoholNameByAlias(alias) {
    return alcoholOptions[alias] || null;
}

function getAlcoholAliasByName(name) {
    for (const [key, value] of Object.entries(alcoholOptions)) {
        if (value === name) {
            return key;
        }
    }
    return null;
}

// Stores alias: Name pairs for the categories that Yelp API uses
const cuisineOptions = {
  "afghani": "Afghani",
  "african": "African",
  "arabian": "Arabian",
  "argentine": "Argentine",
  "asianfusion": "Asian Fusion",
  "australian": "Australian",
  "austrian": "Austrian",
  "bangladeshi": "Bangladeshi",
  "bbq": "BBQ",
  "belgian": "Belgian",
  "brasseries": "Brasseries",
  "brazilian": "Brazilian",
  "british": "British",
  "burgers": "Burgers",
  "burmese": "Burmese",
  "cambodian": "Cambodian",
  "caribbean": "Caribbean",
  "chickenshop": "Chicken Shop",
  "chinese": "Chinese",
  "dumplings": "Dumplings",
  "hotdogs": "Fast Food",
  "filipino": "Filipino",
  "fishnchips": "Fish and Chips",
  "fondue": "Fondue",
  "food_court": "Food Court",
  "foodstands": "Food Stands",
  "french": "French",
  "gamemeat": "Game Meat",
  "gastropubs": "Gastropubs",
  "german": "German",
  "greek": "Greek",
  "guamanian": "Guamanian",
  "hawaiian": "Hawaiian",
  "himalayan": "Himalayan",
  "honduran": "Honduran",
  "hotpot": "Hot Pot",
  "hungarian": "Hungarian",
  "indonesian": "Indonesian",
  "indpak": "Indian",
  "international": "International",
  "irish": "Irish",
  "italian": "Italian",
  "japanese": "Japanese",
  "kebab": "Kebab",
  "kopitiam": "Kopitiam",
  "korean": "Korean",
  "kosher": "Kosher",
  "laotian": "Laotian",
  "latin": "Latin",
  "malaysian": "Malaysian",
  "mediterranean": "Mediterranean",
  "mexican": "Mexican",
  "mideastern": "Middle Eastern",
  "modern_european": "Modern European",
  "mongolian": "Mongolian",
  "moroccan": "Moroccan",
  "nicaraguan": "Nicaraguan",
  "noodles": "Noodles",
  "pakistani": "Pakistani",
  "panasian": "Pan Asian",
  "persian": "Persian",
  "portuguese": "Portuguese",
  "raw_food": "Raw Food",
  "russian": "Russian",
  "scandinavian": "Scandinavian",
  "seafood": "Seafood",
  "singaporean": "Singaporean",
  "soup": "Soup",
  "spanish": "Spanish",
  "srilankan": "Sri Lankan",
  "syrian": "Syrian",
  "taiwanese": "Taiwanese",
  "tapasmallplates": "Tapas/Small Plates",
  "tex-mex": "Tex-Mex",
  "thai": "Thai",
  "tradamerican": "Traditional American",
  "turkish": "Turkish",
  "ukrainian": "Ukrainian",
  "venison": "Venison",
  "vietnamese": "Vietnamese"
};

const dietaryOptions = {
  "vegetarian": "Vegetarian",
  "vegan": "Vegan",
  "gluten_free": "Gluten Free",
  "halal": "Halal",
  "kosher": "Kosher"
};

const favFoodOptions = {
  "acaibowls": "Acai Bowls",
  "bagels": "Bagels",
  "bubbletea": "Bubble Tea",
  "chicken_wings": "Chicken Wings",
  "coffee": "Coffee",
  "cupcakes": "Cupcakes",
  "donuts": "Donuts",
  "gelato": "Gelato",
  "nasilemak": "Nasi Lemak",
  "pizza": "Pizza",
  "poke": "Poke",
  "hotdog": "Hot Dog",
  "icecream": "Ice Cream",
  "salad": "Salad",
  "sandwiches": "Sandwiches",
  "shavedice": "Shaved Ice",
  "shavedsnow": "Shaved Snow",
  "tea": "Tea",
  "waffles": "Waffles",
  "steak": "Steak",
  "sushi": "Sushi",
  "soup": "Soup",
  "fishnchips": "Fish and Chips",
  "burgers": "Burgers",
  "dumplings": "Dumplings",
  "fondue": "Fondue"
}

const activityOptions = {
  "outdoor": "Outdoor",
  "cultural": "Cultural",
  "sports": "Sports",
  "educational": "Educational",
  "entertainment": "Entertainment",
  "others": "Others"
}

let specialFoodOptions = {
  "bakeries": "Bakeries",
  "breweries": "Breweries",
  "cakeshop": "Cake Shop",
  "cideries": "Cideries",
  "coffeeroasteries": "Coffee Roasteries",
  "customcakes": "Custom Cakes",
  "delicatessen": "Delicatessen",
  "desserts": "Desserts",
  "distilleries": "Distilleries",
  "diyfood": "DIY Food",
  "gourmet": "Gourmet",
  "importedfood": "Imported Food",
  "internetcafe": "Internet Cafe",
  "intlgrocery": "International Grocery",
  "juicebars": "Juice Bars",
  "smokehouse": "Smokehouse",
  "streetvendors": "Street Vendors",
  "bistros": "Bistros",
  "breakfast_brunch": "Breakfast & Brunch",
  "buffets": "Buffets",
  "popuprestaurants": "Popup Restaurants",
  "creperies": "Creperies",
  "delis": "Delis",
  "diners": "Diners",
  "dinnertheater": "Dinner Theater",
  "farmersmarket": "Farmers Market",
  "grocery": "Grocery",
  "hawkercentre": "Hawker Centre",
  "organic_stores": "Organic Stores"
}

const alcoholOptions = {
  "airportlounges": "Airport Lounges",
  "beachbars": "Beach Bars",
  "beerbar": "Beer Bar",
  "champagne_bars": "Champagne Bars",
  "cocktailbars": "Cocktail Bars",
  "divebars": "Dive Bars",
  "gaybars": "Gay Bars",
  "irish_pubs": "Irish Pubs",
  "lounges": "Lounges",
  "pubs": "Pubs",
  "speakeasies": "Speakeasies",
  "sportsbars": "Sports Bars",
  "tikibars": "Tiki Bars",
  "vermouthbars": "Vermouth Bars",
  "whiskeybars": "Whiskey Bars",
  "wine_bars": "Wine Bars"
}

