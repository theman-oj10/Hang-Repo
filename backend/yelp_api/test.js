import { Restaurant } from '../classes/placeClass.js';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: __dirname + '/../Credentials.env' });
const apikey = process.env.YELP_API_KEY;
let url = 'https://api.yelp.com/v3/businesses/search';
let headers = { Authorization: `Bearer ${apikey}` };  // replace `${apiKey}` with your actual Yelp API key

let paramsVegetarian = {
    location: 'Singapore',
    categories: 'vegetarian',
    radius: 40000,  // Search within a radius of 40000 meters

    limit: 50  // get up to 50 results
};

let paramsHalal = {
    location: 'Singapore',
    categories: 'halal',
    radius: 40000, 
    limit: 50  // get up to 50 results
};

// Get vegetarian restaurants
axios.get(url, { params: paramsVegetarian, headers: headers })
    .then(responseVegetarian => {
        let vegetarianRestaurants = responseVegetarian.data.businesses;

        // Get halal restaurants
        axios.get(url, { params: paramsHalal, headers: headers })
            .then(responseHalal => {
                let halalRestaurants = responseHalal.data.businesses;

                // Find the intersection of vegetarian and halal restaurants
                let vegetarianAndHalalRestaurants = vegetarianRestaurants.filter(vegRest => {
    return halalRestaurants.some(halalRest => halalRest.id === vegRest.id);
});

// Map each restaurant to an object containing only the name and categories
let output = vegetarianAndHalalRestaurants.map(restaurant => {
    return {
        name: restaurant.name,
        categories: restaurant.categories.map(category => category.title).join(', ')
    };
});

console.log(output);
            });
    });
