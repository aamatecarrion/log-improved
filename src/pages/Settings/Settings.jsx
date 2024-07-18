import React, { useContext, useEffect, useState } from "react";
import { Box, Paper, Switch, Typography } from "@mui/material";
import { LocalStorageContext } from "../../contexts/LocalStorageContext";
import useColors from "../../hooks/useColors";
import { format, addDays } from "date-fns";
import { es } from "date-fns/locale";
import chroma from "chroma-js";
import '../../App.css';
import saludoSegunHora from "../../utils/saludoSegunHora";

const getDayNamesInSpanish = () => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const day = format(addDays(new Date(2020, 1, 3), i), "EEEE", {
      locale: es,
    }); // 2020-02-03 is a Monday
    days.push(day.charAt(0).toUpperCase() + day.slice(1)); // Capitalize first letter
  }
  return days;
};

const dayNames = getDayNamesInSpanish();

const Settings = () => {
  const { colors, setColors, colorChange } = useColors();
  const { data, setData } = useContext(LocalStorageContext);

  const randomColors = () => {
    const newColors = Array.from({ length: 7 }, () => chroma.random().hex());
    setColors(newColors);
  };

  useEffect(() => {
    console.log(colors);
  }, [colors]);

  return (
    <div style={{ height: "200vh" }}>
      <Typography sx={{ p: "5px", m: "5px" }} variant="h4">Configuración</Typography>
        
      <Paper elevation={6} sx={{ p: "10px", m: "8px" }}>
        <Typography variant="h6">
          Color de fondo de cada día de la semana
        </Typography>
        {dayNames.map((dayName, index) => {
          return (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", my: "10px" }}
            >
              <label htmlFor={`color${index}`} style={{ flex: "1" }}>
                {dayName}
              </label>
              <input
                id={`color${index}`}
                type="color"
                value={colors[index] || "#ffffff"} // Valor por defecto si está indefinido
                onChange={(e) => colorChange(index, e.target.value)}
                style={{
                  flex: "2",
                  height: "50px",
                  border: "none",
                  cursor: "pointer",
                }}
              />
            </Box>
          );
        })}
        <div
          onClick={() => randomColors()}
          className="rainbow-background"
          style={{
            userSelect: "none",
            cursor: "pointer",
            textAlign: "center",
            padding: "10px",
            fontWeight: "bold",
            border: "1px solid black"
          }}
        >
          ALEATORIO
        </div>
      </Paper>
      <p style={{ position: "absolute", bottom: "-300px" }}>
        Aquí no hay nada de momento pero {saludoSegunHora()} gracias por bajar
      </p>
    </div>
  );
};

export default Settings;
