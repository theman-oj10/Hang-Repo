import React, { useState, useEffect } from 'react';
import './Carousel.css';
import axios from 'axios';

const Carousel = ({ slides }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const totalSlides = slides ? slides.length : 0;

  const moveSlide = (step) => {
    setSlideIndex((prev) => {
      let newIndex = prev + step;
      if (newIndex < 0) newIndex = totalSlides - 1;
      if (newIndex >= totalSlides) newIndex = 0;
      return newIndex;
    });
  };

  if (!slides || totalSlides === 0) {
    return (
      <div className="carousel">
        <div className="carousel-inner" style={{ textAlign: 'center' }}>
          <p>No slides available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="carousel">
      <div
        className="carousel-inner"
        style={{
          transform: `translateX(-${slideIndex * 100}%)`,
          transition: 'transform 0.5s ease',
        }}
      >
        {slides.map((slide, index) => (
          <div key={index} style={{ minWidth: '100%', textAlign: 'center' }}>
            <img src={slide.imageLink} alt={slide.name} style={{ maxHeight: '200px' }} />
            <h3>{slide.name}</h3>
            <p>Ratings: {slide.rating}</p>
            <p>Phone Number: {slide.displayPhone}</p>
            {slide.displayAddress && <p>Address: {slide.displayAddress.join(', ')}</p>}
          </div>
        ))}
      </div>
      <button className="prev" onClick={() => moveSlide(-1)}>
        &#10094;
      </button>
      <button className="next" onClick={() => moveSlide(1)}>
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;


