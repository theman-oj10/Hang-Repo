import locationSearch from './yelp_api/yelpFetch.js';
import { Activity } from './classes/placeClass.js';
import { User } from './classes/userClass.js';

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
    activityPref:['outdoor', 'cultural', 'entertainment']
});
const latitude = '1.3088';
const longitude = '103.8564';
const radius = '5000';
let preferredDate = new Date('2024-01-21T11:00:00');
let prefferedSpend = 4; 

class ActivityRecommendationEngine {
    constructor(user, activities) {
        this.user = user;
        this.activities = activities;
    }

    // Calculate score for an activity based on user's preferences
    calculateScore(user, activity) {
        let score = 0;

        // Increase score if activity's topic matches user's preferred topic
        if (user.activityPref === activity.topic) {
            score += 1;
        }

        // Increase score if activity's rating is high
        score += activity.rating;

        return score;
    }

    // Recommend top 3 activities for a user
    recommend(user) {
        // Filter activities by user's preferred topic
        //const filteredActivities = this.activities.filter(activity => activity.topic === user.activity);
        
        // Calculate scores for all filtered activities
        const scores = this.activities.map(activity => ({
            activity: activity,
            score: this.calculateScore(user, activity)
        }));

        

        // Give -1 score to activities that contain 'restaurant' or 'bar' in their activity categories
        scores.forEach(score => {
            if (score.activity.activityCategories.includes('restaurant') || score.activity.activityCategories.includes('bar')) {
                score.score = -1;
            }
            
            if (cuisinesList.some(category => score.activity.activityCategories.includes(category)) || 
                foodItemsList.some(category => score.activity.activityCategories.includes(category)) || 
                specialFoodList.some(category => score.activity.activityCategories.includes(category))) {
                score.score = -1;
            }
            
            if (activityTopics.length === 0) {
                score.score = -1;
            }
        });
        // Sort activities by score in descending order
        scores.sort((a, b) => b.score - a.score);
        // Print activityCategories
        // scores.forEach(score => {
        //     console.log("Activity Categories:", score.activity.activityCategories);
        //     console.log("Score:", score.score);
        // });

        // Return top 3 activities
        return scores.slice(0, 3).map(score => score.activity);
    }
}
export async function activitySearch(user, prefferedSpend, preferredDate) {
    const userActivities = user.activityPref;

    let promises = userActivities.map(category => {
        let categoryString = activityTopics[category].join(',');
        return locationSearch(latitude, longitude, radius, categoryString, prefferedSpend, preferredDate)
        .then(activities => activities.map(activity => new Activity(activity)));
    });

    let results = await Promise.all(promises);
    let commonActivities = results[0].filter(activity1 => 
        results.every(result => 
            result.some(activity2 => activity1.equals(activity2))
        )
    );

    if (commonActivities.length > 0) {
        const activityRecommendationEngine = new ActivityRecommendationEngine(user,commonActivities);
        let recommendations = activityRecommendationEngine.recommend(user);
        console.log("Recommendations:", recommendations);
        return recommendations;
    } else {
        let topActivities = [];
        results.forEach(result => {
            topActivities.push(...result.slice(0, 5));
        });
        const activityRecommendationEngine = new ActivityRecommendationEngine(user,topActivities);
        let recommendations = activityRecommendationEngine.recommend(user);
        console.log("Top Activities:", recommendations);
        // recommendations.forEach(recommendation => {
        //     console.log(recommendation.activityCategories);
        // });
        return recommendations;
    }
}



const activityTopicsArray = [
    'hiking', 'biking', 'parks', 'beaches', 'gardens',
    'museums', 'artclasses', 'theater',
    'active', 'fitness', 'sportgoods', 'sportswear', 'martialarts', 'golf',
    'nightlife', 'movietheaters', 'breweries', 'adultentertainment',
    'education', 'tours', 'specialtyschools',
    'shopping', 'pets', 'media', 'religiousorgs', 'tastingclasses', 'massmedia'
];

const activityTopics = {
            outdoor: ['hiking', 'biking', 'parks', 'beaches', 'gardens'],
            cultural: ['museums', 'artclasses', 'theater'],
            sports: ['active','fitness', 'sportgoods', 'sportswear', 'martialarts', 'golf'],
            entertainment: ['nightlife', 'movietheaters', 'breweries', 'adultentertainment'],
            educational: ['education', 'tours', 'specialtyschools'],
            others: ['shopping', 'pets', 'media', 'religiousorgs', 'tastingclasses', 'massmedia']   
        };
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


