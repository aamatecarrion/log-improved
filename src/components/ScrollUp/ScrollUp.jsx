import React, { useEffect, useState } from "react";
import {
  Fab
} from "@mui/material";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

function ScrollUp() {

  const [ mostrarFlecha, setMostrarFlecha ] = useState(false);
  const handleClick = () => {
    scrollUp();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent);

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);

  const handleScrollEvent = () => {
    setMostrarFlecha(window.scrollY > 10 ? true : false)

  };

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <React.Fragment>
      {mostrarFlecha ? (
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleClick}
          style={{ position: "fixed", bottom: 80, right: 30 }}
        >
          <ArrowUpwardIcon />
        </Fab>
      ) : null}
    </React.Fragment>
  );
}

export default ScrollUp;
