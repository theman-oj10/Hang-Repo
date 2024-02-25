import React, { useEffect, useState } from 'react';
import Carousel from './Carousel';
import Itinerary from './Itinerary';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
    const location = useLocation();
    const props = location.state;
    const { userName, preferredDate, preferredSpend } = props;
    const [itineraries, setItineraries] = useState([]);
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const restaurantResponse = await axios.get('http://localhost:3000/restaurantRecommendation', {
                    params: {
                        userName,
                        preferredSpend,
                        preferredDate
                    }
                });
                console.log('Restaurant Response:', restaurantResponse.data);

                const activityResponse = await axios.get('http://localhost:3000/activityRecommendation', {
                    params: {
                        userName,
                        preferredSpend,
                        preferredDate
                    }
                });
                console.log('Activity Response:', activityResponse.data);

                const combinedItineraries = [];
                const combinedSlides = [];

                for (let i = 0; i < Math.min(restaurantResponse.data.length, activityResponse.data.length); i++) {
                    const itineraryPair = {
                        restaurant: restaurantResponse.data[i].name,
                        activity: activityResponse.data[i].name
                    };
                    combinedItineraries.push(itineraryPair);

                    const restaurant = restaurantResponse.data[i];
                    const activity = activityResponse.data[i];
                    
                    combinedSlides.push({
                        name: 'Restaurant: ' + restaurant.name,
                        imageLink: restaurant.imageLink,
                        rating: restaurant.rating,
                        displayPhone: restaurant.displayPhone,
                        displayAddress: restaurant.displayAddress
                    });
                    combinedSlides.push({
                        name: 'Activity: ' + activity.name,
                        imageLink: activity.imageLink,
                        rating: activity.rating,
                        displayPhone: activity.displayPhone,
                        displayAddress: activity.displayAddress
                    });
                }
                setItineraries(combinedItineraries);
                setSlides(combinedSlides);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [userName, preferredSpend, preferredDate]);

    return (
        <div>
            <div className="navbar" style={{ fontWeight: 'bold', fontSize: 'larger' }}>Time to Hang!</div>
            {/* <Carousel itineraries={itineraries}/> */}
            <Itinerary slides={slides} />
            <Footer />
        </div>
    );
};

export default HomePage;
