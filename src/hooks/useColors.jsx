import React, { useContext, useEffect, useState } from 'react';
import { LocalStorageContext } from '../contexts/LocalStorageContext';
import chroma from 'chroma-js';

const useColors = () => {
  const { data, setData } = useContext(LocalStorageContext);
  const initialColors = data?.colors || Array.from({ length: 7 }, () => chroma.random().hex());

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
