import { useEffect, useState } from "react"; // Import React and the useEffect and useState hooks from the React library
import axios from "axios"; // Import the axios library for making HTTP requests
import styles from "./css/PokeSearchStyles.module.css"; // Import the PokeSearchStyles.module.css file
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi"; // Import the GiPerspectiveDiceSixFacesRandom icon from the react-icons/gi library
import { BiSearchAlt2 } from "react-icons/bi"; // Import the BiSearchAlt2 icon from the react-icons/bi library
import Autocomplete from "@mui/joy/Autocomplete";
import { IPokemon } from "./IPokemon";
import krisnobg from "../assets/krisNoBG.png";

export default function PokeSearch({
  onSearchResults,
}: {
  onSearchResults: any;
}) {
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
  const [extraEasterEgg, setExtraEasterEgg] = useState(false);
  const easterEgg = (
    <>
      {extraEasterEgg ? (
        <>
          <span className={styles.id}>#{currentPokemon.id}</span>
          <h2>KIDOBA</h2>
          {/*Use the isShiny state variable to conditionally render the shiny or regular image*/}

          <p>
            <span className={styles.kidoba}>
              Bonus Easteregg! <br /> Du fant det!
            </span>
          </p>
          <img src={krisnobg} alt="Kidoba" />
          <h2>Stats</h2>
          <p>
            <b>Art:</b> Menneske
          </p>
          <p>
            <b>Type:</b> Guttebass / Kuling1
          </p>
          <p>
            <b>Ferdigheter:</b> HåndballkeeperChamp, Snill som dagen er lang
          </p>
          <p>
            <b>HP:</b> 13
          </p>
          <p>
            <b>Angrep:</b> 130710
          </p>
          <p>
            <b>Forsvar:</b> 130710
          </p>
          <p>
            <b>Spesialangrep:</b> 130723
          </p>
          <p>
            <b>Spesialforsvar:</b> 130723
          </p>
          <p>
            <b>Hastighet:</b> Ekstremt rask
          </p>
          <p>
            <b>Vekt:</b> Akkurat passe
          </p>
        </>
      ) : (
        <>
          <p>
            <span className={styles.kidoba}>
              DU FANT EASTEREGGET!!! <br /> Eller er det enda et easteregg?!?!?!
            </span>
          </p>
          <img
            src={currentPokemon.image}
            alt={currentPokemon.name}
            onClick={() => {
              setExtraEasterEgg(true);
            }}
          />
        </>
      )}
    </>
  );

  const [pokemonNames, setPokemonNames] = useState([]);
  async function getAllPokemonNames() {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=1281")
      .then((response) => {
        setPokemonNames(
          response.data.results.map((pokemon: any) => pokemon.name)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getAllPokemonNames();
  }, []);

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
        setIsShiny(false); // Set the isShiny state variable to false
        setExtraEasterEgg(false); // Set the extraEasterEgg state variable to false
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
      const pokemon = {
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
      };
      setCurrentPokemon(pokemon);
      setIsShiny(false);
      onSearchResults(pokemon);
      setExtraEasterEgg(false); // Set the extraEasterEgg state variable to false
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
          <div className={styles.PokeSearchInputContainer}>
            <Autocomplete
              options={pokemonNames}
              type="text"
              value={pokemonName.toLowerCase()}
              /*onChange={(e) => setPokemonName(e.target.value)}*/
              inputValue={pokemonName.toLowerCase()}
              onInputChange={(_event, newInputValue) => {
                setPokemonName(newInputValue);
              }}
              className={styles.PokeSearchSearchInput}
              onKeyDown={(e) => handleKeyDown(e)}
            />
            <span className={styles.searchIcon}>
              <BiSearchAlt2 onClick={handleSearch} />
            </span>
          </div>

          <div className={styles.PokeSearchSearchButtonsContainer}>
            {/*Render a random button */}
            <div className={styles.icon}>
              <GiPerspectiveDiceSixFacesRandom
                onClick={randomPokemon}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        </div>
        <div
          className={`${styles.PokemonResultContainer} ${
            currentPokemon.name === "psyduck" ? styles.goldencard : ""
          }`}
        >
          {!extraEasterEgg ? (
            <>
              <span className={styles.id}>#{currentPokemon.id}</span>
              <h2>{currentPokemon.name.toUpperCase()}</h2>
              {/*Use the isShiny state variable to conditionally render the shiny or regular image*/}
              {currentPokemon.name === "psyduck" ? (
                easterEgg
              ) : (
                <>
                  <img
                    src={
                      isShiny
                        ? currentPokemon.shineyImage
                        : currentPokemon.image
                    }
                    alt={currentPokemon.name}
                    onClick={handleImageClick}
                  />
                </>
              )}
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
            </>
          ) : (
            easterEgg
          )}
        </div>
      </div>
    </>
  );
}
