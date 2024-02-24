class Place {
    constructor(placeData) {
        this.id = placeData.id;
        this.alias = placeData.alias;
        this.name = placeData.name;
        this.imageLink = placeData.image_url;
        this.reviewCount = placeData.review_count;
        this.url = placeData.url;
        this.rating = placeData.rating;
        this.coordinates = [placeData.coordinates.latitude, placeData.coordinates.longitude];
        this.zipCode = placeData.location.zip_code;
        this.displayAddress = placeData.location.display_address;
        this.phone = placeData.phone;
        this.displayPhone = placeData.display_phone;
        // businessDetails API
        this.openingHours = placeData.businessDetails?.hours.open;
        this.price = placeData.businessDetails?.price;
        this.photos = placeData.businessDetails?.photos;
    }
    equals(otherPlace) {
            return this.id === otherPlace.id;
        }
}

export class Restaurant extends Place {
    constructor(placeData) {
        super(placeData);
        this.dietPref = [];
        this.cuisines = [];
        this.foodItems = [];
        this.specialCategory = [];
        this.alcoholOptions = [];
        // go through each category, if category is in restaurants.json, add it to cuisines, else add it to foods, if in special add to special
        placeData.categories.forEach(category => {
            if (dietPrefList.includes(category.alias)) {
                this.dietPref.push(category.alias);
            }
            else if (cuisinesList.includes(category.alias)) {
                this.cuisines.push(category.alias);
            }
            else if (foodItemsList.includes(category.alias)) {
                this.foodItems.push(category.alias);
            }
            else if (specialFoodList.includes(category.alias)) {
                this.specialCategory.push(category.alias);
            }
            else if (alcoholList.includes(category.alias)) {
                this.alcoholOptions.push(category.alias);
            }
        });
    }
}

export class Activity extends Place {
    constructor(placeData) {
        super(placeData);
        this.activityCategories = placeData.categories.map(category => category.alias);
        this.activityTopics = this.groupCategories();
        // Additional properties specific to activities can be added here
    }

    groupCategories() {
        const activityTopics = {
            outdoor: ['hiking', 'biking', 'parks', 'beaches', 'gardens'],
            cultural: ['museums', 'artclasses', 'theater', 'buddhist_temples'],
            sports: ['active','fitness', 'sportgoods', 'sportswear', 'martialarts', 'golf'],
            entertainment: ['nightlife', 'movietheaters','breweries', 'adultentertainment'],
            educational: ['education', 'tours', 'specialtyschools', 'libraries'],
            others: ['shopping', 'pets', 'media', 'religiousorgs', 'tastingclasses', 'massmedia']   
        };

        const topics = [];

        for (const category of this.activityCategories) {
            for (const [topic, topicCategories] of Object.entries(activityTopics)) {
                if (topicCategories.includes(category.alias)) {
                    topics.push(topic);
                }
            }
        }

        return topics; 
    }
}
const alcoholList = [
    'airportlounges',
    'beachbars',
    'beerbar',
    'champagne_bars',
    'cocktailbars',
    'divebars',
    'gaybars',
    'irish_pubs',
    'lounges',
    'pubs',
    'speakeasies',
    'sportsbars',
    'tikibars',
    'vermouthbars',
    'whiskeybars',
    'wine_bars'
];

let dietPrefList = ['gluten_free', 'halal', 'vegan', 'vegetarian'];

let cuisinesList = [
    'afghani',
    'african',
    'arabian',
    'argentine',
    'asianfusion',
    'australian',
    'austrian',
    'bangladeshi',
    'bbq',
    'belgian',
    'brasseries',
    'brazilian',
    'british',
    'burgers',
    'burmese',
    'cambodian',
    'caribbean',
    'chickenshop',
    'chinese',
    'dumplings',
    'filipino',
    'fishnchips',
    'fondue',
    'food_court',
    'foodstands',
    'french',
    'gamemeat',
    'gastropubs',
    'german',
    'greek',
    'guamanian',
    'hawaiian',
    'himalayan',
    'honduran',
    'hotdogs', //fastfood
    'hotpot',
    'hungarian',
    'indonesian',
    'indpak',
    'international',
    'irish',
    'italian',
    'japanese',
    'kebab',
    'kopitiam',
    'korean',
    'kosher',
    'laotian',
    'latin',
    'malaysian',
    'mediterranean',
    'mexican',
    'mideastern',
    'modern_european',
    'mongolian',
    'moroccan',
    'nicaraguan',
    'noodles',
    'pakistani',
    'panasian',
    'persian',
    'portuguese',
    'raw_food',
    'russian',
    'scandinavian',
    'seafood',
    'singaporean',
    'soup',
    'spanish',
    'srilankan',
    'syrian',
    'taiwanese',
    'tapasmallplates',
    'tex-mex',
    'thai',
    'tradamerican',
    'turkish',
    'ukrainian',
    'venison',
    'vietnamese'
];

let foodItemsList = [
    'acaibowls',
    'bagels',
    'bubbletea',
    'chicken_wings',
    'coffee',
    'cupcakes',
    'donuts',
    'gelato',
    'nasilemak',
    'pizza',
    'poke',
    'hotdog',
    'icecream',
    'salad',
    'sandwiches',
    'shavedice',
    'shavedsnow',
    'tea',
    'waffles',
    'steak',
    'sushi',
    'soup',
    'fishnchips',
    'burgers',
    'dumplings',
    'fondue'
];

let specialFoodList = [
    'bakeries',
    'breweries',
    'cakeshop',
    'cideries',
    'coffeeroasteries',
    'customcakes',
    'delicatessen',
    'desserts',
    'distilleries',
    'diyfood',
    'gourmet',
    'importedfood',
    'internetcafe',
    'intlgrocery',
    'juicebars',
    'smokehouse',
    'streetvendors',
    'bistros',
    'breakfast_brunch',
    'buffets',
    'popuprestaurants',
    'creperies',
    'delis',
    'diners',
    'dinnertheater',
    'farmersmarket',
    'grocery',
    'hawkercentre',
    'organic_stores'
];
