import fs from 'fs';
import { parse } from 'json2csv';
import { categorySearch } from './ReccomendationEngine.js';
import { User } from './classes/userClass.js';

const preferredDate = new Date('2024-06-11T03:24:00');
let preferredSpend = 3;

const cuisines = ["Italian", "Indian", "Mexican"];
const dietaryPreferences = ["Vegetarian", "Halal"];

function combinations(arr) {
    const result = [];
    const f = (prefix, arr) => {
        for (let i = 0; i < arr.length; i++) {
            const newPrefix = [...prefix, arr[i]];
            result.push(newPrefix);
            f(newPrefix, arr.slice(i + 1));
        }
    };
    f([], arr);
    return result;
}

function generateCombinations(cuisines, dietaryPreferences) {
    const cuisineCombinations = combinations(cuisines).concat([[]]);  // Include empty combination
    const dietaryPreferenceCombinations = combinations(dietaryPreferences).concat([[]]);  // Include empty combination

    const allCombinations = new Set();
    cuisineCombinations.forEach(cuisineCombo => {
        dietaryPreferenceCombinations.forEach(dietPrefCombo => {
            const combined = [...cuisineCombo, ...dietPrefCombo];
            allCombinations.add(JSON.stringify(combined));
        });
    });

    return Array.from(allCombinations).map(item => JSON.parse(item));
}
//console.log(generateCombinations(cuisines, dietaryPreferences));

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
        const dietPrefs = combination.filter(item => dietaryPreferences.includes(item));
        const cuisineCombo = combination.filter(item => cuisines.includes(item));
        //console.log('Testing:', cuisineCombo.join(', '), dietPrefs.join(', '));
        
        try {
            exampleUser.dietPref = dietPrefs;
            exampleUser.cuisines = cuisineCombo;
            const result = await categorySearch(exampleUser, preferredSpend, preferredDate);
            const row = {
                'Input Cuisines': cuisineCombo.join(', ') || '',
                //'Cuisine 2': cuisineCombo[1] || '',
                'Input Dietary Preferences': dietPrefs.join(', ') || '',
                //'Dietary Preference 2': dietPrefs[1] || '',
                'Recommendation 1 Name': result[0] ? result[0].name : '',
                'Recommendation 1 Cuisines': result[0] ? result[0].cuisines.join(', ') : '',
                'Recommendation 1 Dietary Preferences': result[0] ? result[0].dietPref.join(', ') : '',
                'Recommendation 2 Name': result[1] ? result[1].name : '',
                'Recommendation 2 Cuisines': result[1] ? result[1].cuisines.join(', ') : '',
                'Recommendation 2 Dietary Preferences': result[1] ? result[1].dietPref.join(', ') : '',
                'Recommendation 3 Name': result[2] ? result[2].name : '',
                'Recommendation 3 Cuisines': result[2] ? result[2].cuisines.join(', ') : '',
                'Recommendation 3 Dietary Preferences': result[2] ? result[2].dietPref.join(', ') : '',
            };
            results.push(row);
        } catch (error) {
            const row = {
                'Input Cuisines': cuisineCombo.join(', ') || '',
                //'Cuisine 2': cuisineCombo[1] || '',
                'Input Dietary Preferences': dietPrefs.join(', ') || '',
                //'Dietary Preference 2': dietPrefs[1] || '',
                'Error': error.message || error
            };
            results.push(row);
        }
    }

    const csv = parse(results, { fields: ['Input Cuisines', 'Input Dietary Preferences', 'Recommendation 1 Name', 'Recommendation 1 Cuisines', 'Recommendation 1 Dietary Preferences', 'Recommendation 2 Name', 'Recommendation 2 Cuisines', 'Recommendation 2 Dietary Preferences', 'Recommendation 3 Name', 'Recommendation 3 Cuisines', 'Recommendation 3 Dietary Preferences', 'Error'] });
    fs.writeFileSync('recommendations.csv', csv);
    console.log(`Recommendations saved to recommendations.csv`);
}

runTestsAndSaveToCSV(cuisines, dietaryPreferences);
