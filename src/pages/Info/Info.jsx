import React from "react";
import "./Info.css";

const Info = () => {
  return (
    <div>
      <p>Esta es una página de información sobre la aplicación.</p>
      <p>
        El propósito de esta aplicación es poder registrar eventos y poder
        analizar la información que se recoja.
      </p>
      <p>Es como una mezcla entre un cronómetro y un diario.</p>
      Ejemplos de uso:
      <ul>
        <li>Saber cuantos días de la semana te duchas</li>
        <li>Llevar un diario de hábitos/vicios</li>
        <li>Saber cuanto tiempo hace que no riegas las plantas</li>
        <li>Analizar las cosas obsesivamente y no disfrutar de la vida</li>
      </ul>
      <p>
        Recomiendo no volverse muy obsesivo intentando registrarlo todo, aunque
        bueno, cada persona es distinta, tiene hábitos distintos, quiere
        registrar cosas distintas, etc.
      </p>
      <p>
        Voy a añadir que se le pueda dar fav a un tipo de registro concreto para
        así poder crear una página de accesos directos e insertar ese tipo de
        registros más rápido, por ejemplo: Ducha, dormir, Inicio siesta
      </p>
      <p style={{ color: "red" }}>
        El contador de años y meses de dentro de un registro es impreciso, los
        años y los meses no siempre son igual de largos. Tengo que arreglar eso.
      </p>
    </div>
  );
};

export default Info;
