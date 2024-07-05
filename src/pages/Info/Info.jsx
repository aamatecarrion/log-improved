import React from "react";
import "./Info.css";

const Info = () => {
  const [color, setColor] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setColor(prevColor => {
        if (prevColor >= 360) {
          return 0;
        } else {
          return prevColor + 1;
        }
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2 style={{ color: `hsl(${color}, 100%, 50%)` }}>
        Esta es una página de información sobre la aplicación
      </h2>
      <ul>
        <li>
          El propósito de esta aplicación es poder registrar eventos y poder
          analizar la información que se recoja.
        </li>
        <br></br>
        <li>Es como una mezcla entre un cronómetro y un diario.</li>
        Ejemplos de uso:
        <ul>
          <li>Saber cuantos días de la semana te duchas</li>
          <li>Llevar un diario de hábitos/vicios</li>
          <li>Saber cuanto tiempo hace que no riegas las plantas</li>
          <li>Analizar las cosas obsesivamente y no disfrutar de la vida</li>
        </ul>
        <br></br>
        <li>
          Recomiendo no volverse muy obsesivo intentando registrarlo todo,
          aunque bueno, cada persona es distinta, tiene hábitos distintos,
          quiere registrar cosas distintas, etc.
        </li>
        <br></br>
        <li>
          Voy a añadir que se le pueda dar fav a un tipo de registro concreto
          para así poder crear una página de accesos directos e insertar ese
          tipo de registros más rápido, por ejemplo: Ducha, dormir, Inicio
          siesta
        </li>
      </ul>
    </div>
  );
};

export default Info;
