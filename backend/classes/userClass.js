export class User {
    constructor(userData) {
        this.name = userData.name;
        this.userName = userData.userName;
        this.profilePic = ""; // Empty profile pic
        this.age = userData.age;
        this.gender = userData.gender;
        this.dietPref = userData.dietPref;
        this.alcohol = userData.alcohol;
        this.cuisines = userData.cuisines; // Sorted by recently used (not done)
        this.favFood = userData.favFood; // Sorted by recently used
        this.specialCategory = userData.specialCategory; // Sorted by recently used
        this.activityPref = userData.activityPref;
    }
}

const exampleUser = new User({
    name: "John Doe",
    userName: "johndoe123",
    age: 25,
    gender: "male",
    dietPref: "vegetarian",
    alcohol: false,
    cuisines: ["italian", "mexican"],
    favFood: ["pizza"],
    specialCategory: [],
});

