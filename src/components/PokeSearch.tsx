import { useEffect, useState } from "react"; // Import React and the useEffect and useState hooks from the React library
import axios from "axios"; // Import the axios library for making HTTP requests
import styles from "./css/PokeSearchStyles.module.css"; // Import the PokeSearchStyles.module.css file
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi"; // Import the GiPerspectiveDiceSixFacesRandom icon from the react-icons/gi library

interface IPokemon {
  // Define an interface for the Pokemon object
  name: string;
  id: string;
  species: string;
  image: string;
  shineyImage: string;
  abilities: string[];
  type: string;
  hp: string;
  attack: string;
  defense: string;
  specialAttack: string;
  specialDefense: string;
  speed: string;
  weight: string;
}

export default function PokeSearch() {
  // Define the PokeSearch component
  const [pokemonName, setPokemonName] = useState(""); // Define the pokemonName state variable and the setPokemonName function to update it
  const [isShiny, setIsShiny] = useState(false); // Add a state variable to track whether the image should be shiny or not
  const [currentPokemon, setCurrentPokemon] = useState<IPokemon>({
    // Define the currentPokemon state variable and the setCurrentPokemon function to update it
    name: "",
    id: "",
    species: "",
    image: "",
    shineyImage: "",
    abilities: [],
    type: "",
    hp: "",
    attack: "",
    defense: "",
    specialAttack: "",
    specialDefense: "",
    speed: "",
    weight: "",
  });

  function randomPokemon() {
    const random = Math.floor(Math.random() * 1008 + 1); // Generate a random number between 1 and 1008
    axios // Make an HTTP request to the PokeAPI using axios
      .get(`https://pokeapi.co/api/v2/pokemon/${random}`) // Use the random number to get a random Pokemon from the PokeAPI
      .then((response) => {
        // Handle the response from the PokeAPI
        setCurrentPokemon({
          // Update the currentPokemon state variable with the data from the PokeAPI response
          name: response.data.name,
          id: response.data.id,
          species: response.data.species.name,
          image: response.data.sprites.other["official-artwork"].front_default,
          shineyImage:
            response.data.sprites.other["official-artwork"].front_shiny,
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
          weight: response.data.weight,
        });
      })
      .catch((error) => {
        // Handle any errors that occur during the HTTP request
        console.log(error);
      });
  }

  useEffect(() => {
    randomPokemon();
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
        id: response.data.id,
        species: response.data.species.name,
        image: response.data.sprites.other["official-artwork"].front_default,
        shineyImage:
          response.data.sprites.other["official-artwork"].front_shiny,
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
        weight: response.data.weight,
      });
    } catch (error) {
      console.error(error);
    }
  }

  function handleImageClick() {
    // Define a function to handle the image click event
    setIsShiny(!isShiny); // Toggle the isShiny state variable when the image is clicked
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
          />
          <div className={styles.PokeSearchSearchButtonsContainer}>
            {/*Render a search button
      that triggers the handleSearch function when clicked */}
            <button
              onClick={handleSearch}
              className={styles.PokeSearchSearchButton}
            >
              Søk
            </button>
            {/*Render a random button */}
            <div className={styles.icon}>
              <GiPerspectiveDiceSixFacesRandom
                onClick={randomPokemon}
                fontSize="2rem"
              />
            </div>
          </div>
        </div>
        <div className={styles.PokemonResultContainer}>
          <span className={styles.id}>#{currentPokemon.id}</span>
          <h2>{currentPokemon.name.toUpperCase()}</h2>
          {currentPokemon.name === "psyduck" ? (
            <p>
              DU FANT EASTEREGGET! Gratulerer med dagen{" "}
              <span className={styles.kidoba}>KIDOBA!</span>
            </p>
          ) : null}
          {/*Use the isShiny state variable to conditionally render the shiny or regular image*/}
          <img
            src={isShiny ? currentPokemon.shineyImage : currentPokemon.image}
            alt={currentPokemon.name}
            onClick={handleImageClick}
          />
          <h2>Stats</h2>
          <p>
            <b>Art:</b> {currentPokemon.species}
          </p>
          <p>
            <b>Type:</b> {currentPokemon.type}
          </p>
          <p>
            <b>Ferdigheter:</b> {currentPokemon.abilities.join(", ")}
          </p>
          <p>
            <b>HP:</b> {currentPokemon.hp}
          </p>
          <p>
            <b>Angrep:</b> {currentPokemon.attack}
          </p>
          <p>
            <b>Forsvar:</b> {currentPokemon.defense}
          </p>
          <p>
            <b>Spesialangrep:</b> {currentPokemon.specialAttack}
          </p>
          <p>
            <b>Spesialforsvar:</b> {currentPokemon.specialDefense}
          </p>
          <p>
            <b>Hastighet:</b> {currentPokemon.speed}
          </p>
          <p>
            <b>Vekt:</b> {currentPokemon.weight}
          </p>
        </div>
      </div>
    </>
  );
}
