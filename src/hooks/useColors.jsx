import React, { useContext, useEffect, useState } from 'react';
import { LocalStorageContext } from '../contexts/LocalStorageContext';

const useColors = () => {
  const { data, setData } = useContext(LocalStorageContext);
  const initialColors = data?.colors || [
    "#ffffff",
    "#ffffff",
    "#ffffff",
    "#ffffff",
    "#ffffff",
    "#ffffff",
    "#ffffff"
  ];

  const [colors, setColors] = useState(initialColors);

  useEffect(() => {
    setData({ ...data, colors: colors });
  }, [colors]);

  const colorChange = (day, color) => {
    const newColors = [...colors];
    newColors[day] = color;
    setColors(newColors);
  };

  return { colors, setColors, colorChange };
};

export default useColors;
