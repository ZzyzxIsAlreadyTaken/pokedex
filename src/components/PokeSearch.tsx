import React, { useEffect, useState } from "react"; // Import React and the useEffect and useState hooks from the React library
import axios from "axios"; // Import the axios library for making HTTP requests
import styles from "./css/PokeSearchStyles.module.css"; // Import the PokeSearchStyles.module.css file

interface IPokemon {
  // Define an interface for the Pokemon object
  name: string;
  species: string;
  image: string;
  abilities: string[];
  type: string;
  hp: string;
  attack: string;
  defense: string;
}

export default function PokeSearch() {
  // Define the PokeSearch component
  const [pokemonName, setPokemonName] = useState(""); // Define the pokemonName state variable and the setPokemonName function to update it
  const [currentPokemon, setCurrentPokemon] = useState<IPokemon>({
    // Define the currentPokemon state variable and the setCurrentPokemon function to update it
    name: "",
    species: "",
    image: "",
    abilities: [],
    type: "",
    hp: "",
    attack: "",
    defense: "",
  });

  useEffect(() => {
    // Define a side effect that runs when the component mounts or the pokemonName state variable changes
    const random = Math.floor(Math.random() * 256 + 1); // Generate a random number between 1 and 256
    axios // Make an HTTP request to the PokeAPI using axios
      .get(`https://pokeapi.co/api/v2/pokemon/${random}`) // Use the random number to get a random Pokemon from the PokeAPI
      .then((response) => {
        // Handle the response from the PokeAPI
        setCurrentPokemon({
          // Update the currentPokemon state variable with the data from the PokeAPI response
          name: response.data.name,
          species: response.data.species.name,
          image: response.data.sprites.other["official-artwork"].front_default,
          abilities: response.data.abilities.map(
            (ability: any) => ability.ability.name
          ),
          type: response.data.types[0].type.name,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
        });
      })
      .catch((error) => {
        // Handle any errors that occur during the HTTP request
        console.log(error);
      });
  }, []); // Specify that the side effect should run whenever the pokemonName state variable changes

  const handleSearch = async () => {
    // Define a function to handle the search button click event
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      ); // Make an HTTP request to the PokeAPI using the pokemonName state variable
      setCurrentPokemon({
        // Update the currentPokemon state variable with the data from the PokeAPI response
        name: pokemonName,
        species: response.data.species.name,
        image: response.data.sprites.other["official-artwork"].front_default,
        abilities: response.data.abilities.map(
          (ability: any) => ability.ability.name
        ),
        type: response.data.types[0].type.name,
        hp: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        defense: response.data.stats[2].base_stat,
      });
    } catch (error) {
      // Handle any errors that occur during the HTTP request
      console.error(error);
    }
  };

  return (
    // Render the PokeSearch component
    <div>
      <input
        type="text"
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
      />{" "}
      {/*Render an input field that updates the pokemonName state variable when
      the user types in it */}
      <button onClick={handleSearch}>Search</button>{" "}
      {/*Render a search button
      that triggers the handleSearch function when clicked */}
      <div className={styles.PokemonResultContainer}>
        <h2>{currentPokemon.name}</h2>
        <img src={currentPokemon.image} alt={currentPokemon.name} />
        <p>Species: {currentPokemon.species}</p>
        <p>Type: {currentPokemon.type}</p>
        <p>Abilities: {currentPokemon.abilities.join(", ")}</p>
        <p>HP: {currentPokemon.hp}</p>
        <p>Attack: {currentPokemon.attack}</p>
        <p>Defense: {currentPokemon.defense}</p>
      </div>
    </div>
  );
}
