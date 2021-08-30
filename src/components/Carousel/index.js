import React, { useEffect, useState } from 'react';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import './carousel.css';

const Carousel = (props) => {
  const { children, show, auto } = props;

  const [currentIndex, setCurrentIndex] = useState(1);
  const [length, setLength] = useState(children.length);

  useEffect(() => {
    if (auto === true) {
      const timeout = window.setTimeout(() => {
        if (currentIndex < length - show) {
          setCurrentIndex((prevState) => prevState + 1);
        } else {
          setCurrentIndex(0);
        }
      }, 3000);

      return () => window.clearTimeout(timeout);
    }
  }, [currentIndex]);

  // Set the length to match current children from props
  useEffect(() => {
    setLength(children.length);
  }, [children]);

  const next = () => {
    if (currentIndex < length - show) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <button
          disabled={currentIndex > 0 ? false : true}
          onClick={prev}
          className="left-arrow"
        >
          <NavigateBeforeIcon />
        </button>
        <div className="carousel-content-wrapper">
          <div
            className={`carousel-content show-${show}`}
            style={{ transform: `translateX(-${currentIndex * (100 / show)}%)` }}
          >
            {children}
          </div>
        </div>
        <button
          disabled={currentIndex < length - show ? false : true}
          onClick={next}
          className="right-arrow"
        >
          <NavigateNextIcon />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
