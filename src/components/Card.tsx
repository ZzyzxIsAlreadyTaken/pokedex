import React from "react";

const Card = () => {
  return (
    <div>
      <h1>Pikachu</h1>
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
        alt="Pikachu official artwork"
      />
      <div className="abilities">Abilities:</div>
    </div>
  );
};

export default Card;
