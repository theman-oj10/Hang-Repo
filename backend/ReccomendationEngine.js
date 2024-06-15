import locationSearch from './yelp_api/yelpFetch.js';
import { User } from './classes/userClass.js';
import { Restaurant } from './classes/placeClass.js';
import { isDietaryAliasPresent, isCuisineAliasPresent, getDietaryAliasByName, getCuisineAliasByName } from './yelp_api/categories.js';

const latitude = '1.3088';
const longitude = '103.8564';
const radius = '5000';
let placesList = [];

let preferredDate = new Date('2024-06-11T03:24:00');
// need to check if accounted for special days like public holidays
let preferredSpend = 2; // 1-5 (or 4) spend (length of price string)
// age filter (kid friendly?)
// diet pref filter liked by veg attribute?? // kid might not have acc need to add hasKid attribute
// filter directly by reservation date and time and pax on api call?
class RecommendationEngine {
    constructor(user, places) {
        this.user = user; // for now 1 user only
        this.places = places;
    }

    // Calculate score for a place based on user's preferences
    calculateScore(user, place, preferredSpend) {
        let score = 0;

        // Increase score if place's cuisine is in user's preferred cuisines
        if (place.cuisines.some(cuisine => user.cuisines.includes(cuisine))) {
            score += 10;
        }

        // Increase score if place's food is in user's favorite foods
        if (place.foodItems.some(food => user.favFood.includes(food))) {
            score += 8;
        }

        // Increase score if place's special category is in user's special categories
        if (place.specialCategory.some(category => user.specialCategory.includes(category))) {
            score += 3;
        }

        if (place.price <= preferredSpend) {
            score += 3;
        }

        // Increase score if place's rating is high
        score += place.rating;

        // Increase score if place's review_count is high
        score += place.reviewCount / 300.0;

        return score;
}

    // Recommend top 3 places for a user
    recommend(user) {
        // Calculate scores for all places
        const scores = this.places.map(place => ({
            place: place,
            score: this.calculateScore(user, place, this.user.preferredSpend) // Pass preferredSpend parameter
        }));
        // Sort places by score in descending order
        scores.sort((a, b) => b.score - a.score);
        // print the score of the top 3 places
        console.log('scores!')
        console.log(scores.slice(0, 3).map(score => score.score));
        return scores.slice(0, 3).map(score => score.place);
    }
}

const exampleUser = new User({
    name: "John Doe",
    userName: "johndoe123",
    age: 25,
    gender: "male",
    dietPref: ['Vegetarian'],
    alcohol: false,
    cuisines: ["Indian"],
    favFood: [],
    specialCategory: [],
});

/* user -> extract relevant categories -> locationSearch 
-> Find intersection of categories -> reccomendation engine -> return top 3 */

// categories will always be stores as names and frontend will work with names, so you need to convert to aliases
export async function categorySearch(user, preferredSpend, preferredDate) {
    if (user.dietPref && user.dietPref.length > 0) {
        return dietPrefSearch(user, preferredSpend, preferredDate);
    } else {
        return cuisineSearch(user, preferredSpend, preferredDate);
    }
}


async function dietPrefSearch(user, preferredSpend, preferredDate) {
    let dietCategories = user.dietPref.map(category => getDietaryAliasByName(category)).filter(Boolean); // convert to alias
    let dietPrefMap = {};

    if (dietCategories.length > 0) {
        let validDietCategories = dietCategories.filter(category => isDietaryAliasPresent(category)); // validate aliases
        if (validDietCategories.length === 0) {
            return "No valid dietary preferences found";
        }
        validDietCategories.forEach(category => {
            dietPrefMap[category] = locationSearch(latitude, longitude, radius, category, preferredSpend, preferredDate)
                .then(restaurants => restaurants.map(restaurant => new Restaurant(restaurant)));
        });
        return Promise.all(Object.values(dietPrefMap)).then(results => {
            const dietPrefFiltered = results.reduce((common, current) => {
                return common.filter(element => current.some(otherElement => element.equals(otherElement)));
            }, results[0]);
            if (dietPrefFiltered.length === 0) {
                return "No restaurants found";
            } else {
                const recommendationEngine = new RecommendationEngine(user, dietPrefFiltered);
                return recommendationEngine.recommend(user);
            }
        });
    } else {
        return "No valid dietary preferences found";
    }
}

async function cuisineSearch(user, preferredSpend, preferredDate) {
    let cuisines = user.cuisines.map(cuisine => getCuisineAliasByName(cuisine)).filter(Boolean);
    let validCuisines = cuisines.filter(cuisine => isCuisineAliasPresent(cuisine));
    if (validCuisines.length === 0) {
        return "No valid cuisines found";
    }
    const cuisinesString = validCuisines.join(',');
    return locationSearch(latitude, longitude, radius, cuisinesString, preferredSpend, preferredDate)
        .then(restaurants => {
            return restaurants.map(restaurant => new Restaurant(restaurant));
        })
        .then(restaurants => {
            if (restaurants.length === 0) {
                return "No restaurants found";
            } else {
                const recommendationEngine = new RecommendationEngine(user, restaurants);
                return recommendationEngine.recommend(user);
            }
        });
}

// categorySearch(exampleUser, preferredSpend, preferredDate)
// .then(result => {console.log(result);});    