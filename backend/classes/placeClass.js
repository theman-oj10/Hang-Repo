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
        const alias = category.alias;
        if (isDietaryAliasPresent(alias)) {
            const name = getDietaryNameByAlias(alias);
            if (name) {
            this.dietPref.push(name);
            }
        } else if (isCuisineAliasPresent(alias)) {
            const name = getCuisineNameByAlias(alias);
            if (name) {
            this.cuisines.push(name);
            }
        } else if (isFavFoodAliasPresent(alias)) {
            const name = getFavFoodNameByAlias(alias);
            if (name) {
            this.foodItems.push(name);
            }
        } else if (isSpecialFoodAliasPresent(alias)) {
            this.specialCategory.push(alias);
        } else if (isAlcoholAliasPresent(alias)) {
            this.alcoholOptions.push(alias);
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

