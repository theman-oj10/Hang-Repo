import locationSearch from './yelp_api/yelpFetch.js';
import { User } from './classes/userClass.js';
import { Restaurant } from './classes/placeClass.js';

const latitude = '1.3088';
const longitude = '103.8564';
const radius = '5000';
let placesList = [];

let preferredDate = new Date('2024-01-21T20:00:00');
// need to check if accounted for special days like public holidays
let prefferedSpend = 2; // 1-5 (or 4) spend (lenfth of price string)
// age filter (kid friendly?)
// diet pref filter liked by veg attribute?? // kid might not have acc need to add hasKid attribute
// filter directly by reservation date and time and pax on api call?
class RecommendationEngine {
    constructor(user, places) {
        this.user = user; // for now 1 user only
        this.places = places;
    }

    // Calculate score for a place based on user's preferences
    calculateScore(user, place, prefferedSpend) {
        let score = 0;

        // Increase score if place's cuisine is in user's preferred cuisines
        if (place.cuisines.some(cuisine => user.cuisines.includes(cuisine))) {
            score += 10;
        }

        // Increase score if place's food is in user's favorite foods
        if (place.foodItems.some(food => user.favFood.includes(food))) {
            score += 10;
        }

        // Increase score if place's special category is in user's special categories
        if (place.specialCategory.some(category => user.specialCategory.includes(category))) {
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
            score: this.calculateScore(user, place, this.user.prefferedSpend) // Pass prefferedSpend parameter
        }));
        // Sort places by score in descending order
        scores.sort((a, b) => b.score - a.score);
        return scores.slice(0, 3).map(score => score.place);
    }
}

const exampleUser = new User({
    name: "John Doe",
    userName: "johndoe123",
    age: 25,
    gender: "male",
    dietPref: ['vegetarian'],
    alcohol: false,
    cuisines: ["italian", "mexican"],
    favFood: ["pizza"],
    specialCategory: [],
});

/* user -> extract relevant categories -> locationSearch 
-> Find intersection of categories -> reccomendation engine -> return top 3 */

export function categorySearch(user, prefferedSpend, preferredDate) {
    let dietCategories = user.dietPref;
    let dietPrefMap = {};
    // if there are dietary preferences
    if (dietCategories != null) {
        dietCategories.map(category => {
        dietPrefMap[category] = locationSearch(latitude, longitude, radius, category, prefferedSpend, preferredDate)
            .then(restaurants => restaurants.map(restaurant => new Restaurant(restaurant)));
    });
    return Promise.all(Object.values(dietPrefMap)).then(results => {
        // Find intersection of categories
        const dietPrefFiltered = results.reduce((common, current) => {
            return common.filter(element => current.some(otherElement => element.equals(otherElement)));
        }, results[0]);  // initialize with the first array
       console.log(`Intersection of categories: ${dietPrefFiltered}`);
        if (dietPrefFiltered.length === 0) {
            return("No restaurants found");
        }
        else if (dietPrefFiltered.length <= 3) {
            return(dietPrefFiltered);
        }
        else {
            const reccomendationEngine = new RecommendationEngine(user, dietPrefFiltered);
            return reccomendationEngine.recommend(user);
        }
    });}
    // if there are no dietary preferences
    else {
        // put all user.cusines as a string
        const cuisinesString = user.cuisines.join(',');
        const searchResults = locationSearch(latitude, longitude, radius, cuisinesString, prefferedSpend, preferredDate)
    .then(restaurants => {
        console.log(restaurants);
        return restaurants.map(restaurant => new Restaurant(restaurant));
    })
    .then(restaurants => {
        if (restaurants.length === 0) {
            return("No restaurants found");
        }
        else if (restaurants.length <= 3) {
            return(restaurants);
        }
        else {
            const reccomendationEngine = new RecommendationEngine(user, restaurants);
            return reccomendationEngine.recommend(user);
        }
    });
    return searchResults;
    }
}
// categorySearch(exampleUser, latitude, longitude, radius, prefferedSpend, preferredDate)
// .then(result => {console.log(result);});    