import fs from 'fs';
import { parse } from 'json2csv';
import { categorySearch } from './ReccomendationEngine.js';
import { User } from './classes/userClass.js';

const preferredDate = new Date('2024-06-11T03:24:00');
let preferredSpend = 3; 
// const cuisines = ["italian", "chinese", "mexican", "indian"];
// const dietaryPreferences = ["vegetarian", "vegan", "halal"];

const cuisines = ["italian", "indian", "mexican"];
const dietaryPreferences = ["vegetarian"];

function combinations(arr, k) {
    const result = [];
    const f = (prefix, arr) => {
        for (let i = 0; i < arr.length; i++) {
            result.push([...prefix, arr[i]]);
            if (prefix.length < k - 1) {
                f([...prefix, arr[i]], arr.slice(i + 1));
            }
        }
    };
    f([], arr);
    return result;
}

function generateCombinations(cuisines, dietaryPreferences) {
    const cuisineCombinations = [[]];
    for (let i = 1; i <= 2; i++) {
        cuisineCombinations.push(...combinations(cuisines, i));
    }
    const allCombinations = [];
    cuisineCombinations.forEach(cuisineCombo => {
        if (cuisineCombo.length === 0) {
            dietaryPreferences.forEach(dietPref => {
                allCombinations.push([dietPref]);
            });
        } else {
            allCombinations.push([...cuisineCombo]);
            dietaryPreferences.forEach(dietPref => {
                allCombinations.push([...cuisineCombo, dietPref]);
            });
        }
    });
    return allCombinations;
}


async function runTestsAndSaveToCSV(cuisines, dietaryPreferences) {
    const allCombinations = generateCombinations(cuisines, dietaryPreferences);
    const results = [];

    const exampleUser = new User({
        name: "John Doe",
        userName: "johndoe123",
        age: 25,
        gender: "male",
        dietPref: [],
        alcohol: false,
        cuisines: [],
        favFood: [],
        specialCategory: [],
    });

    for (const combination of allCombinations) {
        const [dietPref, ...cuisineCombo] = combination.reverse();
        try {
            exampleUser.dietPref = [dietPref];
            exampleUser.cuisines = cuisineCombo;
            const result = await categorySearch(exampleUser, preferredSpend, preferredDate);
            const row = {
                'Cuisine 1': cuisineCombo[0] || '',
                'Cuisine 2': cuisineCombo[1] || '',
                'Dietary Preference': dietPref,
                'Recommendation 1 Name': result[0] ? result[0].name : '',
                'Recommendation 1 Cuisine': result[0] ? result[0].cuisines : '',
                'Recommendation 1 Dietary Preference': result[0] ? result[0].dietPref : '',
                'Recommendation 2 Name': result[1] ? result[1].name : '',
                'Recommendation 2 Cuisine': result[1] ? result[1].cuisines : '',
                'Recommendation 2 Dietary Preference': result[1] ? result[1].dietPref : '',
                'Recommendation 3 Name': result[2] ? result[2].name : '',
                'Recommendation 3 Cuisine': result[2] ? result[2].cuisines : '',
                'Recommendation 3 Dietary Preference': result[2] ? result[2].dietPref : '',
                'Error': ''
            };
            results.push(row);
        } catch (error) {
            const row = {
                'Cuisine 1': cuisineCombo[0] || '',
                'Cuisine 2': cuisineCombo[1] || '',
                'Dietary Preference': dietPref,
                'Recommendation 1 Name': '',
                'Recommendation 1 Cuisine': '',
                'Recommendation 1 Dietary Preference': '',
                'Recommendation 2 Name': '',
                'Recommendation 2 Cuisine': '',
                'Recommendation 2 Dietary Preference': '',
                'Recommendation 3 Name': '',
                'Recommendation 3 Cuisine': '',
                'Recommendation 3 Dietary Preference': '',
                'Error': error.message || error
            };
            results.push(row);
        }
    }

    const csv = parse(results, { fields: ['Cuisine 1', 'Cuisine 2', 'Dietary Preference', 'Recommendation 1 Name', 'Recommendation 1 Cuisine', 'Recommendation 1 Dietary Preference', 'Recommendation 2 Name', 'Recommendation 2 Cuisine', 'Recommendation 2 Dietary Preference', 'Recommendation 3 Name', 'Recommendation 3 Cuisine', 'Recommendation 3 Dietary Preference', 'Error'] });
    fs.writeFileSync('recommendations.csv', csv);
    console.log(`Recommendations saved to recommendations.csv`);
}

runTestsAndSaveToCSV(cuisines, dietaryPreferences);
