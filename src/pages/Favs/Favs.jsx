import React, { useContext, useState } from "react";
import { LocalStorageContext } from "../../contexts/LocalStorageContext";
import getTextColorForBackground from "../../utils/getTextColorForBackground";
import { Slider } from "@mui/material";
import useHash from "../../hooks/useHash";
import { useNavigate } from "react-router-dom";

const Favs = () => {
  const { data,setData } = useContext(LocalStorageContext);
  const favs = data?.favs || [];
  const uniqueFavs = [...new Set(favs)];
  const [hash, setHash] = useHash();
  const navigate = useNavigate();

  function stringToColor(str, initialHash) {
    // Hash la cadena en un entero usando el valor inicial del slider
    let hash = initialHash;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Convierte el entero hash en un color RGB
    let color = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += ("00" + value.toString(16)).slice(-2);
    }

    return color;
  }

  return (
    <div>
      <h1>Favs</h1>
      <div style={{ padding: "10px" }}>
        <Slider
          aria-label="Hash"
          value={hash}
          onChange={(event, newValue) => setHash(newValue)}
          valueLabelDisplay="auto"
          step={1}
          min={0}
          max={10} // Puedes ajustar el máximo según sea necesario
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
            onClick={() => {
              const fechaAdd = Date.now();

              const newReg = {
                text: fav,
                id: fav + "_" + fechaAdd,
                date: fechaAdd,
              };
              setData({ ...data, regs: [...(data.regs || []), newReg] });
              navigate(`/log/${newReg.id}`);
            }}
          >
            {fav}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favs;
