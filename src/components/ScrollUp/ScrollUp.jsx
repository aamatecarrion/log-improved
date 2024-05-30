import React, { useEffect, useState } from 'react';
import './ScrollUp.css';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const ScrollUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollEvent);

    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, []);

  const handleScrollEvent = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };


  return (

    <button className={`scrollUpButton ${isVisible ? 'visible' : 'hidden'}`} onClick={handleClick}>
      <ArrowUpwardIcon></ArrowUpwardIcon>
    </button>
  );
};

export default ScrollUp;
