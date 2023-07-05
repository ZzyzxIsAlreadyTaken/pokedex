import React, { useState } from "react";

export default function PokeSearch() {
  const [pokemonName, setPokemonName] = useState("");

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
}
