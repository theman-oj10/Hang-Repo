import { Restaurant } from '../classes/placeClass.js';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: __dirname + '/../Credentials.env' });
// const latitude = '1.3088';
// const longitude = '103.8564';
const apikey = process.env.YELP_API_KEY;

function dateToUnix(date) {
    if (date instanceof Date) {
        // Check if date is within 2 weeks before current date
        const currentDate = new Date();
        const twoWeeksBefore = new Date(currentDate);
        twoWeeksBefore.setDate(twoWeeksBefore.getDate() - 14);
        if (date < twoWeeksBefore) {
            console.error('date is more than 2 weeks before current date'); // API Requirement
            return;
        }
        console.log(date.getTime() / 1000);
        return date.getTime() / 1000;
    } else {
        // Handle the case where date is not a Date object
        console.error('date is not a Date object');
    }
}
export default function locationSearch(latitude, longitude, radius, category, prefPrice, prefDateTime) {
  const apikey = process.env.YELP_API_KEY;
  let priceRange = [1,2,3,4]
  priceRange = priceRange.slice(0, prefPrice);
  priceRange = priceRange.join(',');
  const url = `https://api.yelp.com/v3/businesses/search`;
  const options = {
    headers: {
      Authorization: `Bearer ${apikey}`,
      accept: 'application/json'
    },
    params: {
      //latitude: latitude,
      //longitude: longitude,
      radius: 40000,
      categories: `${category}`,
      location: 'Singapore',
      //term: 'vegetarian+vegan',
      //locale: 'en_SG',
      price: priceRange,
      //sortBy: 'best_match',
      limit: 50,
      open_at: `${dateToUnix(prefDateTime)}`,
      //attributes: 'liked_by_vegetarians',
    }
  };

 return axios.get(url, options)
    .then(response => {
      //const places = response.data.businesses.map(place => new Restaurant(place));
      const places = response.data.businesses;
      if (places.length === 0) {
        
        return secondaryLocationSearch(latitude, longitude, radius, category, prefPrice);
      }
      return places;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function secondaryLocationSearch(latitude, longitude, radius, category, prefPrice) {
  const apikey = process.env.YELP_API_KEY;
  let priceRange = [1,2,3,4]
  priceRange = priceRange.slice(0, prefPrice);
  priceRange = priceRange.join(',');
  const url = `https://api.yelp.com/v3/businesses/search`;
  const options = {
    headers: {
      Authorization: `Bearer ${apikey}`,
      accept: 'application/json'
    },
    params: {
      //latitude: latitude,
      //longitude: longitude,
      radius: 40000,
      categories: `${category}`,
      location: 'Singapore',
      //term: 'vegetarian+vegan',
      //locale: 'en_SG',
      price: priceRange,
      //sortBy: 'best_match',
      limit: 50,
      //attributes: 'liked_by_vegetarians',
    }
  };
 return axios.get(url, options)
    .then(response => {
      //const places = response.data.businesses.map(place => new Restaurant(place));
      const places = response.data.businesses;
      return places;
    })
    .catch(error => {
      console.error('Error:', error);
    });}