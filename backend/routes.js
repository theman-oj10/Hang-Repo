import { categorySearch } from './ReccomendationEngine.js';
import { activitySearch } from './ActivitiesReccomendationEngine.js';
import { User } from './classes/userClass.js';
import express from 'express';
import bodyParser from 'body-parser';
import { log } from 'console';
import { MongoClient, ServerApiVersion } from 'mongodb';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// load the environment variables from the .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: __dirname + '/../Credentials.env' });
const uri = String(process.env.MONGODB_URI);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error(error);
  }
}

run().catch(console.dir);

const app = express();
// Middleware to log all requests
app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.url}`);
    next();
});
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// parse application/json
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('Hello Backend!');
});
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

// Endpoint for activity recommendation
app.get('/activityRecommendation', async (req, res) => {
    const userName = req.query.userName;
    try {
        const user = await client.db("hang").collection("users").findOne({ userName });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        const preferredSpend = req.query.preferredSpend;
        const preferredDate = new Date(req.query.preferredDate);
        const newUser = new User({
            name: user.name,
            userName: user.userName,
            age: user.age,
            gender: user.gender,
            dietPref: user.dietPref,
            alcohol: user.alcohol,
            cuisines: user.cuisines,
            favFood: user.favFood,
            specialCategory: user.specialCategory,
            activityPref: user.activityPref
        });
        activitySearch(newUser, preferredSpend, preferredDate)
            .then(recommendations => {
                //console.log(recommendations);
                res.json(recommendations);
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: 'An error occurred' });
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});


// Endpoint for restaurant recommendation
// Send Date: '2024-01-21T20:00:00'
app.get('/restaurantRecommendation', async (req, res) => {
    console.log("Restaurant recommendation Endpoint hit");
    const userName = req.query.userName;
    try {
        const user = await client.db("hang").collection("users").findOne({ userName });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        console.log(`User found: ${user}`);
        const preferredSpend = req.query.preferredSpend;
        const preferredDate = new Date(req.query.preferredDate);
        const newUser = new User({
            name: user.name,
            userName: user.userName,
            age: user.age,
            gender: user.gender,
            dietPref: user.dietPref,
            alcohol: user.alcohol,
            cuisines: user.cuisines,
            favFood: user.favFood,
            specialCategory: user.specialCategory,
            activityPref: user.activityPref
        });
        categorySearch(newUser, preferredSpend, preferredDate)
            .then(recommendations => {
                console.log(`Final reco ${recommendations}`);
                res.json(recommendations);
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: 'Error with Searching' });
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Endpoint for creating a user
app.post('/createUser', async (req, res) => {
    try {
        const newUser = new User(req.body); // Assuming req.body contains the user data
        const result = await client.db("hang").collection("users").insertOne(newUser);
        console.log(`User ${newUser.userName} created`);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Can't create user" });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Close the MongoDB client when the server is stopping
process.on('SIGINT', async () => {
    console.log('Server is stopping...');
    await client.close();
    console.log('MongoDB client disconnected');
    process.exit();
});
