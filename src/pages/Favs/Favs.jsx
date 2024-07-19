import React, { useContext, useState } from "react";
import { LocalStorageContext } from "../../contexts/LocalStorageContext";
import getTextColorForBackground from "../../utils/getTextColorForBackground";
import { Slider } from "@mui/material";
import useHash from "../../hooks/useHash";
import { useNavigate } from "react-router-dom";
import stringToColor from "../../utils/stringToColor";
import ScrollUp from "../../components/ScrollUp/ScrollUp";

const Favs = () => {
  const { data, setData } = useContext(LocalStorageContext);
  const favs = data?.favs || [];
  const uniqueFavs = [...new Set(favs)];
  const [hash, setHash] = useHash();
  const navigate = useNavigate();

  
  return (
    <div>
      <h1>Favs</h1>
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
      <ScrollUp></ScrollUp>
    </div>
  );
};

export default Favs;
