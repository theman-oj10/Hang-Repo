import React from 'react';
import './Itinerary.css';

const Itinerary = ({ slides = [] }) => {
  return (
    <div className="itinerary">
      <h2>Suggested Itineraries</h2>
      {slides.reduce((itineraries, slide, index) => {
        if (index % 2 === 0) {
          itineraries.push([slide]);
        } else {
          itineraries[Math.floor(index / 2)].push(slide);
        }
        return itineraries;
      }, []).map((itinerary, index) => (
        <div key={index} className="itinerary-item">
          <h3>Itinerary {index + 1}</h3>
          <div className="itinerary-card">
            {itinerary.map((slide, slideIndex) => (
              <div key={slideIndex} className="itinerary-details">
                <div className="itinerary-image">
                  <img src={slide.imageLink} alt={slide.name} />
                </div>
                <div>
                  <h4>{slide.name}</h4>
                  <p>Rating: {slide.rating}</p>
                  <p>Address: {slide.displayAddress.join(', ')}</p>
                  <p>Phone: {slide.displayPhone}</p>
                  <p>
                    <a href={slide.url} target="_blank" rel="noopener noreferrer">More Info</a>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Itinerary;
