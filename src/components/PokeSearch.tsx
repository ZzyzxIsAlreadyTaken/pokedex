import { useEffect, useState } from "react"; // Import React and the useEffect and useState hooks from the React library
import axios from "axios"; // Import the axios library for making HTTP requests
import styles from "./css/PokeSearchStyles.module.css"; // Import the PokeSearchStyles.module.css file

interface IPokemon {
  // Define an interface for the Pokemon object
  name: string;
  order: string;
  species: string;
  image: string;
  abilities: string[];
  type: string;
  hp: string;
  attack: string;
  defense: string;
  specialAttack: string;
  specialDefense: string;
  speed: string;
}

export default function PokeSearch() {
  // Define the PokeSearch component
  const [pokemonName, setPokemonName] = useState(""); // Define the pokemonName state variable and the setPokemonName function to update it
  const [currentPokemon, setCurrentPokemon] = useState<IPokemon>({
    // Define the currentPokemon state variable and the setCurrentPokemon function to update it
    name: "",
    order: "",
    species: "",
    image: "",
    abilities: [],
    type: "",
    hp: "",
    attack: "",
    defense: "",
    specialAttack: "",
    specialDefense: "",
    speed: "",
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
          order: response.data.order,
          species: response.data.species.name,
          image: response.data.sprites.other["official-artwork"].front_default,
          abilities: response.data.abilities.map(
            (ability: any) => ability.ability.name
          ),
          type: response.data.types[0].type.name,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          specialAttack: response.data.stats[3].base_stat,
          specialDefense: response.data.stats[4].base_stat,
          speed: response.data.stats[5].base_stat,
        });
      })
      .catch((error) => {
        // Handle any errors that occur during the HTTP request
        console.log(error);
      });
  }, []); // Specify that the side effect should run only when the component mounts

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  async function handleSearch() {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      setCurrentPokemon({
        name: pokemonName,
        order: response.data.order,
        species: response.data.species.name,
        image: response.data.sprites.other["official-artwork"].front_default,
        abilities: response.data.abilities.map(
          (ability: any) => ability.ability.name
        ),
        type: response.data.types[0].type.name,
        hp: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        defense: response.data.stats[2].base_stat,
        specialAttack: response.data.stats[3].base_stat,
        specialDefense: response.data.stats[4].base_stat,
        speed: response.data.stats[5].base_stat,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    // Render the PokeSearch component
    <>
      <div>
        <div className={styles.PokeSearchSearchArea}>
          {/*Render an input field that updates the pokemonName state variable when
      the user types in it */}
          <input
            type="text"
            value={pokemonName.toLowerCase()}
            onChange={(e) => setPokemonName(e.target.value)}
            className={styles.PokeSearchSearchInput}
            onKeyDown={(e) => handleKeyDown(e)}
          />{" "}
          {/*Render a search button
      that triggers the handleSearch function when clicked */}
          <button
            onClick={handleSearch}
            className={styles.PokeSearchSearchButton}
          >
            Search
          </button>{" "}
        </div>
        <div className={styles.PokemonResultContainer}>
          <span className={styles.order}>#{currentPokemon.order}</span>
          <h2>{currentPokemon.name.toUpperCase()}</h2>
          {currentPokemon.name === "psyduck" ? (
            <p>
              DU FANT EASTEREGGET! Gratulerer med dagen{" "}
              <span className={styles.kidoba}>KIDOBA!</span>
            </p>
          ) : null}
          <img src={currentPokemon.image} alt={currentPokemon.name} />
          <h3>Stats</h3>
          <p>Art: {currentPokemon.species}</p>
          <p>Type: {currentPokemon.type}</p>
          <p>Ferdigheter: {currentPokemon.abilities.join(", ")}</p>
          <p>HP: {currentPokemon.hp}</p>
          <p>Angrep: {currentPokemon.attack}</p>
          <p>Forsvar: {currentPokemon.defense}</p>
          <p>Spesialangrep: {currentPokemon.specialAttack}</p>
          <p>Spesialforsvar: {currentPokemon.specialDefense}</p>
          <p>Hastighet: {currentPokemon.speed}</p>
        </div>
      </div>
    </>
  );
}
