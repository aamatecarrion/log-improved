import React, { useContext, useEffect, useState } from 'react';
import { LocalStorageContext } from '../contexts/LocalStorageContext';

const useColors = () => {
  const { data, setData } = useContext(LocalStorageContext);
  const initialColors = data?.colors || {
    colorLunes: "#ffffff",
    colorMartes: "#ffffff",
    colorMiercoles: "#ffffff",
    colorJueves: "#ffffff",
    colorViernes: "#ffffff",
    colorSabado: "#ffffff",
    colorDomingo: "#ffffff",
  };

  const [colors, setColors] = useState(initialColors);

  useEffect(() => {
    setData({ ...data, colors: colors });
  }, [colors]);

  const colorChange = (day, color) => {
    const newColors = { ...colors, [day]: color };
    setColors(newColors);
  };

  return { colors, colorChange };
};

export default useColors;