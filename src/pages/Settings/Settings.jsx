import React, { useContext, useEffect, useState } from "react";
import { Box, Paper, Switch, Typography } from "@mui/material";
import { LocalStorageContext } from "../../contexts/LocalStorageContext";
import useColors from "../../hooks/useColors";
import { format, addDays } from "date-fns";
import { es } from "date-fns/locale";
import chroma from "chroma-js";
import '../../App.css';
import saludoSegunHora from "../../utils/saludoSegunHora";
import { Slider } from "@mui/material";
import stringToColor from "../../utils/stringToColor";
import useHash from "../../hooks/useHash";
import getTextColorForBackground from "../../utils/getTextColorForBackground";
import ScrollUp from "../../components/ScrollUp/ScrollUp";

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
  const favs = data?.favs || [];
  const uniqueFavs = [...new Set(favs)];
  const [hash, setHash] = useHash();

  const randomColors = () => {
    const newColors = Array.from({ length: 7 }, () => chroma.random().hex());
    setColors(newColors);
  };

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
      <Paper elevation={6} sx={{ p: "10px", m: "8px" }}>
      <Typography variant="h6">
          Color favs
        </Typography>
      <div style={{ padding: "10px" }}>
        <Slider
          aria-label="Hash"
          value={hash}
          onChange={(event, newValue) => setHash(newValue)}
          valueLabelDisplay="auto"
          step={1}
          min={0}
          max={100} // Adjust the max value as needed
        />
      </div>
      <div>
        {uniqueFavs.map((fav) => (
          <div
            style={{
              transition: "all 0.1s ease",
              cursor: "pointer",
              userSelect: "none",
              margin: "5px",
              border: "1px solid black",
              display: "inline-block",
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: stringToColor(fav, hash),
              color: getTextColorForBackground(stringToColor(fav, hash)),
            }}
            key={fav}
          >
            {fav}
          </div>
        ))}
      </div>
      </Paper>
      <p style={{ position: "absolute", bottom: "-300px" }}>
        Aquí no hay nada de momento pero {saludoSegunHora()} gracias por bajar
      </p>
      <ScrollUp></ScrollUp>
    </div>
  );
};

export default Settings;
