import React, { useContext, useEffect, useState } from "react";
import { Box, Paper, Switch, Typography } from "@mui/material";
import { LocalStorageContext } from "../../contexts/LocalStorageContext";
import useColors from "../../hooks/useColors";
import { format, addDays } from "date-fns";
import { es } from "date-fns/locale";
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
  const { colors, setColors } = useColors();
  const { data, setData } = useContext(LocalStorageContext);

  const [positionGradient, setPositionGradient] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPositionGradient((prevPosition) => {
        if (prevPosition >= 360) {
          return 0;
        } else {
          return prevPosition + 20;
        }
      });
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ height: "200vh" }}>
      <Paper elevation={6} sx={{ p: "10px", m: "8px" }}>
        <Typography variant="h4">Configuración</Typography>
        <Box sx={{ m: "10px" }}>
          <Typography variant="h9">Modo claro</Typography>
          <Switch
            checked={data.darkMode}
            onChange={(event) =>
              setData({ ...data, darkMode: event.target.checked })
            }
          />
          <Typography variant="h9">Modo oscuro</Typography>
          <p>(Esto no funciona de momento)</p>
        </Box>
      </Paper>

      <Paper elevation={6} sx={{ p: "10px", m: "8px" }}>
        <Typography variant="h6">
          Color de fondo de cada día de la semana
        </Typography>
        {dayNames.map((dayName, index) => {
          const colorKey = `color${dayName}`;
          return (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", my: "10px" }}
            >
              <label htmlFor={colorKey} style={{ flex: "1" }}>
                {dayName}
              </label>
              <input
                id={colorKey}
                type="color"
                value={colors[colorKey] || "#ffffff"} // Valor por defecto si está indefinido
                onChange={(e) => setColors(colorKey, e.target.value)}
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
          className="rainbow-background"
          style={{
            textAlign: "center",
            padding: "10px",
            fontWeight: "bold",
            border: "1px solid black",
            backgroundImage: `linear-gradient(45deg, hsla(${positionGradient}, 100%, 50%, 1), hsla(${
              positionGradient + 51
            }, 100%, 50%, 1), hsla(${
              positionGradient + 102
            }, 100%, 50%, 1), hsla(${
              positionGradient + 153
            }, 100%, 50%, 1), hsla(${
              positionGradient + 204
            }, 100%, 50%, 1), hsla(${
              positionGradient + 255
            }, 100%, 50%, 1), hsla(${
              positionGradient + 306
            }, 100%, 50%, 1), hsla(${positionGradient + 357}, 100%, 50%, 1) )`,
          }}
        >
          ALEATORIO
        </div>
        <p>el botón no funciona todavía pero lo importante es que tiene luces y tal</p>
      </Paper>
      <p style={{ position: "absolute", bottom: "-300px" }}>
        Aquí no hay nada de momento pero {saludoSegunHora()} gracias por bajar
      </p>
    </div>
  );
};

export default Settings;
