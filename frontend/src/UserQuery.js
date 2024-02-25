import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserQuery = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    name: '',
    profilePic: '',
    age: '',
    gender: '',
    dietPref: [],
    cuisines: [],
    favFood: [],
    preferredExpenditure: '',
    preferredDate: '',
    preferredTime: '',
    activityPref: [],
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (name === 'dietPref' || name === 'activityPref') {
        // For dietPref and activityPref checkboxes, toggle values
        setFormData((prevState) => ({
          ...formData,
          [name]: checked
            ? [...prevState[name], value]
            : prevState[name].filter((item) => item !== value),
        }));
      } else if (name === 'cuisines' || name === 'favFood') {
        // For cuisines and favFood checkboxes, add or remove values
        setFormData((prevState) => ({
          ...formData,
          [name]: checked
            ? [...prevState[name], value]
            : prevState[name].filter((item) => item !== value),
        }));
      } else {
        // For other checkboxes, toggle values
        setFormData((prevState) => ({
          ...prevState,
          [name]: checked ? value : '',
        }));
      }
    } else if (name === 'preferredDate' || name === 'preferredTime') {
      // Combine preferredDate and preferredTime
      const formattedDate =
        name === 'preferredDate'
          ? `${value}T${formData.preferredTime || '00:00:00'}`
          : `${formData.preferredDate}T${value}`;

      setFormData({ ...formData, [name]: formattedDate });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log("Form Data",formData);
    // Send the formData to the server or perform further actions here
    try {
      const response = await fetch('http://localhost:3000/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful response (e.g., show a success message)
        console.log('User created successfully');
        navigate('/home', { state: { userName: formData.userName, preferredDate: formData.preferredDate, preferredSpend: formData.preferredExpenditure } });
      } else {
        // Handle errors (e.g., show an error message)
        console.error('Failed to create user');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };
  const cuisineOptions = [
    ['afghani', 'Afghani'],
    ['african', 'African'],
    ['arabian', 'Arabian'],
    ['argentine', 'Argentine'],
    ['asianfusion', 'Asian Fusion'],
    ['australian', 'Australian'],
    ['austrian', 'Austrian'],
    ['bangladeshi', 'Bangladeshi'],
    ['bbq', 'BBQ'],
    ['belgian', 'Belgian'],
    ['brasseries', 'Brasseries'],
    ['brazilian', 'Brazilian'],
    ['british', 'British'],
    ['burgers', 'Burgers'],
    ['burmese', 'Burmese'],
    ['cambodian', 'Cambodian'],
    ['caribbean', 'Caribbean'],
    ['chickenshop', 'Chicken Shop'],
    ['chinese', 'Chinese'],
    ['dumplings', 'Dumplings'],
    ['hotdogs', 'Fast Food'],
    ['filipino', 'Filipino'],
    ['fishnchips', 'Fish and Chips'],
    ['fondue', 'Fondue'],
    ['food_court', 'Food Court'],
    ['foodstands', 'Food Stands'],
    ['french', 'French'],
    ['gamemeat', 'Game Meat'],
    ['gastropubs', 'Gastropubs'],
    ['german', 'German'],
    ['greek', 'Greek'],
    ['guamanian', 'Guamanian'],
    ['hawaiian', 'Hawaiian'],
    ['himalayan', 'Himalayan'],
    ['honduran', 'Honduran'],
    ['hotpot', 'Hot Pot'],
    ['hungarian', 'Hungarian'],
    ['indonesian', 'Indonesian'],
    ['indpak', 'Indian'],
    ['international', 'International'],
    ['irish', 'Irish'],
    ['italian', 'Italian'],
    ['japanese', 'Japanese'],
    ['kebab', 'Kebab'],
    ['kopitiam', 'Kopitiam'],
    ['korean', 'Korean'],
    ['kosher', 'Kosher'],
    ['laotian', 'Laotian'],
    ['latin', 'Latin'],
    ['malaysian', 'Malaysian'],
    ['mediterranean', 'Mediterranean'],
    ['mexican', 'Mexican'],
    ['mideastern', 'Middle Eastern'],
    ['modern_european', 'Modern European'],
    ['mongolian', 'Mongolian'],
    ['moroccan', 'Moroccan'],
    ['nicaraguan', 'Nicaraguan'],
    ['noodles', 'Noodles'],
    ['pakistani', 'Pakistani'],
    ['panasian', 'Pan Asian'],
    ['persian', 'Persian'],
    ['portuguese', 'Portuguese'],
    ['raw_food', 'Raw Food'],
    ['russian', 'Russian'],
    ['scandinavian', 'Scandinavian'],
    ['seafood', 'Seafood'],
    ['singaporean', 'Singaporean'],
    ['soup', 'Soup'],
    ['spanish', 'Spanish'],
    ['srilankan', 'Sri Lankan'],
    ['syrian', 'Syrian'],
    ['taiwanese', 'Taiwanese'],
    ['tapasmallplates', 'Tapas/Small Plates'],
    ['tex-mex', 'Tex-Mex'],
    ['thai', 'Thai'],
    ['tradamerican', 'Traditional American'],
    ['turkish', 'Turkish'],
    ['ukrainian', 'Ukrainian'],
    ['venison', 'Venison'],
    ['vietnamese', 'Vietnamese']
];


const favFoodOptions = [
    ['acaibowls', 'Acai Bowls'],
    ['bagels', 'Bagels'],
    ['bubbletea', 'Bubble Tea'],
    ['chicken_wings', 'Chicken Wings'],
    ['coffee', 'Coffee'],
    ['cupcakes', 'Cupcakes'],
    ['donuts', 'Donuts'],
    ['gelato', 'Gelato'],
    ['nasilemak', 'Nasi Lemak'],
    ['pizza', 'Pizza'],
    ['poke', 'Poke'],
    ['hotdog', 'Hot Dog'],
    ['icecream', 'Ice Cream'],
    ['salad', 'Salad'],
    ['sandwiches', 'Sandwiches'],
    ['shavedice', 'Shaved Ice'],
    ['shavedsnow', 'Shaved Snow'],
    ['tea', 'Tea'],
    ['waffles', 'Waffles'],
    ['steak', 'Steak'],
    ['sushi', 'Sushi'],
    ['soup', 'Soup'],
    ['fishnchips', 'Fish and Chips'],
    ['burgers', 'Burgers'],
    ['dumplings', 'Dumplings'],
    ['fondue', 'Fondue']
];

const activityOptions = [
    ['outdoor', 'Outdoor'],
    ['cultural', 'Cultural'],
    ['sports', 'Sports'],
    ['educational', 'Educational'],
    ['entertainment', 'Entertainment'],
    ['others', 'Others']
];


  return (
    <div>
      <h1>Hang</h1>
      <div className="form-container">
        <form id="userForm" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label htmlFor="userName">Username:</label>
            <input
              type="text"
              id="userName"
              name="userName"
              required
              onChange={handleInputChange}
            />
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              onChange={handleInputChange}
            />
          </div>

          {/* Profile Picture */}
          <div>
            <label htmlFor="profilePic">Profile Picture:</label>
            <input
              type="file"
              id="profilePic"
              name="profilePic"
              accept="image/*"
              onChange={handleInputChange}
            />
          </div>

          {/* Age */}
          <div>
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              required
              onChange={handleInputChange}
            />
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              required
              onChange={handleInputChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Diet Preferences */}
          <div>
            <label>Diet Preferences:</label>
            <label>
              <input
                type="checkbox"
                name="dietPref"
                value="gluten_free"
                onChange={handleInputChange}
              />
              Gluten-Free
            </label>
            <label>
              <input
                type="checkbox"
                name="dietPref"
                value="halal"
                onChange={handleInputChange}
              />
              Halal
            </label>
            <label>
              <input
                type="checkbox"
                name="dietPref"
                value="vegan"
                onChange={handleInputChange}
              />
              Vegan
            </label>
            <label>
              <input
                type="checkbox"
                name="dietPref"
                value="vegetarian"
                onChange={handleInputChange}
              />
              Vegetarian
            </label>
          </div>

          {/* Cuisines */}
          <div className="column">
              <label htmlFor="cuisines">Cuisines:</label>
              {cuisineOptions.map((option, index) => (
                  <label key={index}>
                      <input
                          type="checkbox"
                          name="cuisines"
                          value={option[0]}
                          onChange={handleInputChange}
                      />
                      {option[1]}
                  </label>
              ))}
          </div>

          {/* Favorite Foods */}
          <div className="column">
              <label htmlFor="favFood">Favorite Foods:</label>
              {favFoodOptions.map((option, index) => (
                  <label key={index}>
                      <input
                          type="checkbox"
                          name="favFood"
                          value={option[0]}
                          onChange={handleInputChange}
                      />
                      {option[1]}
                  </label>
              ))}
          </div>

          {/* Preferred Expenditure */}
          <div>
            <label htmlFor="preferredExpenditure">Preferred Expenditure:</label>
            <input
              type="number"
              min="1"
              max="4"
              id="preferredExpenditure"
              name="preferredExpenditure"
              required
              onChange={handleInputChange}
            />
          </div>

          {/* Preferred Date */}
          <div>
            <label htmlFor="preferredDate">Preferred Date:</label>
            <input
              type="date"
              id="preferredDate"
              name="preferredDate"
              required
              onChange={handleInputChange}
            />
          </div>

          {/* Preferred Time */}
          <div>
            <label htmlFor="preferredTime">Preferred Time:</label>
            <input
              type="time"
              id="preferredTime"
              name="preferredTime"
              required
              onChange={handleInputChange}
            />
          </div>

          {/* Activity Preferences */}
          <div>
            <label htmlFor="activityPref">Activity Preferences:</label>
            {activityOptions.map((option) => (
              <label key={option[0]}>
                <input
                  type="checkbox"
                  name="activityPref"
                  value={option[0]}
                  onChange={handleInputChange}
                />
                {option[1]}
              </label>
            ))}
          </div>

          <div>
            <button type="submit" href="/home">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserQuery;
