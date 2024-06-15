import fs from 'fs';
import Papa from 'papaparse';

const csvFilePath = 'recommendations.csv';

// Define weights
const WEIGHT_RECOMMENDATION_1 = 3;
const WEIGHT_RECOMMENDATION_2 = 2;
const WEIGHT_RECOMMENDATION_3 = 1;

// Function to evaluate score
function evaluateScore(inputCuisines, inputDietaryPreferences, recommendation) {
    let score = 0;

    // Compare cuisines
    if (recommendation.cuisines) {
        const recCuisines = recommendation.cuisines.split(',').map(c => c.trim());
        const inputCuisinesArr = inputCuisines.split(',').map(c => c.trim());
        score += inputCuisinesArr.reduce((acc, cuisine) => recCuisines.includes(cuisine) ? acc + 1 : acc, 0);
    }

    // Compare dietary preferences
    if (recommendation.dietaryPreferences) {
        const recDietPrefs = recommendation.dietaryPreferences.split(',').map(p => p.trim());
        const inputDietPrefsArr = inputDietaryPreferences.split(',').map(p => p.trim());
        score += inputDietPrefsArr.reduce((acc, pref) => recDietPrefs.includes(pref) ? acc + 1 : acc, 0);
    }

    return score;
}

// Function to evaluate all recommendations
function evaluateRecommendations(recommendations) {
    let totalScore = 0;
    let maxPossibleScore = 0;

    recommendations.forEach(rec => {
        const inputCuisinesArr = rec["Input Cuisines"] ? rec["Input Cuisines"].split(',').map(c => c.trim()) : [];
        const inputDietPrefsArr = rec["Input Dietary Preferences"] ? rec["Input Dietary Preferences"].split(',').map(p => p.trim()) : [];
        const inputTotalCount = inputCuisinesArr.length + inputDietPrefsArr.length;
        
        // Case where all 3 reccomendations have all cuisines and dietary preferences
        const maxScorePerRec = inputTotalCount * (WEIGHT_RECOMMENDATION_1 + WEIGHT_RECOMMENDATION_2 + WEIGHT_RECOMMENDATION_3);

        maxPossibleScore += maxScorePerRec;

        const score1 = rec["Recommendation 1 Name"] ? evaluateScore(rec["Input Cuisines"], rec["Input Dietary Preferences"], {
            cuisines: rec["Recommendation 1 Cuisines"],
            dietaryPreferences: rec["Recommendation 1 Dietary Preferences"]
        }) : 0;

        const score2 = rec["Recommendation 2 Name"] ? evaluateScore(rec["Input Cuisines"], rec["Input Dietary Preferences"], {
            cuisines: rec["Recommendation 2 Cuisines"],
            dietaryPreferences: rec["Recommendation 2 Dietary Preferences"]
        }) : 0;

        const score3 = rec["Recommendation 3 Name"] ? evaluateScore(rec["Input Cuisines"], rec["Input Dietary Preferences"], {
            cuisines: rec["Recommendation 3 Cuisines"],
            dietaryPreferences: rec["Recommendation 3 Dietary Preferences"]
        }) : 0;

        // Apply priority weights
        const weightedScore = (score1 * WEIGHT_RECOMMENDATION_1) + (score2 * WEIGHT_RECOMMENDATION_2) + (score3 * WEIGHT_RECOMMENDATION_3);

        totalScore += weightedScore;
    });

    const totalScorePercentage = (totalScore / maxPossibleScore) * 100;

    console.log(`Total Combined Weighted Score: ${totalScore}`);
    console.log(`Maximum Possible Score: ${maxPossibleScore}`);
    console.log(`Overall Score Percentage: ${totalScorePercentage.toFixed(2)}%`);
}

// Read and parse the CSV file
fs.readFile(csvFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the CSV file:', err);
        return;
    }

    Papa.parse(data, {
        header: true,
        complete: function(results) {
            const recommendations = results.data;
            evaluateRecommendations(recommendations);
        }
    });
});
