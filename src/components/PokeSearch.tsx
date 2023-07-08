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
  function getTypeColor(type: string): string {
    const pokeTypeColors: { [key: string]: string } = {
      normal: "#A8A77A",
      fire: "#EE8130",
      water: "#6390F0",
      electric: "#F7D02C",
      grass: "#7AC74C",
      ice: "#96D9D6",
      fighting: "#C22E28",
      poison: "#A33EA1",
      ground: "#E2BF65",
      flying: "#A98FF3",
      psychic: "#F95587",
      bug: "#A6B91A",
      rock: "#B6A136",
      ghost: "#735797",
      dragon: "#6F35FC",
      dark: "#705746",
      steel: "#B7B7CE",
      fairy: "#D685AD",
    };
    return pokeTypeColors[type.toLowerCase()] || "#000000";
  }
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
    types: [],
    hp: "",
    attack: "",
    defense: "",
    specialAttack: "",
    specialDefense: "",
    speed: "",
    weight: "",
    height: "",
  });
  const [extraEasterEgg, setExtraEasterEgg] = useState(false);
  const easterEgg = (
    <>
      {extraEasterEgg ? (
        <>
          <span className={styles.id}>#9</span>
          <h2>KIDOBA</h2>
          <div className={styles.weightAndHeightContainer}>
            <div className={styles.weightAndHeightChildren}>
              <b>Vekt:</b> Akkurat passe
            </div>
            <div className={styles.weightAndHeightChildren}>
              <b>Høyde:</b> Perfekt lengde
            </div>
          </div>
          {/*Use the isShiny state variable to conditionally render the shiny or regular image*/}

          <p>
            <div className={styles.kidoba}>
              Bonus Easteregg! <br /> Du fant det!
            </div>
          </p>
          <img src={krisnobg} alt="Kidoba" className={styles.imgKidoba}></img>

          <div className={styles.pokeTypesContainer}>
            <div
              className={styles.pokeType}
              style={{
                backgroundColor: "#ffcb05",
                boxShadow: "0 0 10px #ffcb05",
              }}
            >
              Guttebass
            </div>
            <div
              className={styles.pokeType}
              style={{
                backgroundColor: "#ffcb05",
                boxShadow: "0 0 10px #ffcb05",
              }}
            >
              Kuling1
            </div>
          </div>
          <h3>Ferdigheter</h3>

          <div className={styles.pokeStatsContainer}>
            <div className={styles.pokeAbility}>HåndballkeeperChamp</div>
            <div className={styles.pokeAbility}>Snill som dagen er lang</div>
          </div>
          <h2>Stats</h2>
          <div className={styles.pokeStatsContainer}>
            <div className={styles.pokeStats}>
              <b>HP:</b> 13
            </div>
            <div className={styles.pokeStats}>
              <b>Angrep:</b> 90710
            </div>
            <div className={styles.pokeStats}>
              <b>Forsvar:</b> 90710
            </div>
            <div className={styles.pokeStats}>
              <b>Spesialangrep:</b> 90723
            </div>
            <div className={styles.pokeStats}>
              <b>Spesialforsvar:</b> 90723
            </div>
            <div className={styles.pokeStats}>
              <b>Hastighet:</b> Ekstremt rask
            </div>
          </div>
        </>
      ) : (
        <>
          <p>
            <div className={styles.kidoba}>
              DU FANT EASTEREGGET!!! <br /> Eller er det enda et easteregg...
            </div>
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

  const [pokemonIds, setPokemonIds] = useState([]);
  const [pokemonNames, setPokemonNames] = useState([]);
  async function getAllPokemonNames() {
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=1281"
      );
      const pokemonData = response.data.results.map((pokemon: any) => ({
        id: pokemon.url.split("/")[6],
        name: pokemon.name,
      }));
      setPokemonNames(pokemonData.map((pokemon: any) => pokemon.name));
      setPokemonIds(pokemonData);
    } catch (error) {
      console.log(error);
    }
  }

  interface IPokemonNameAndID {
    id: string;
    name: string;
  }

  function logNextPokemonName() {
    const nextpokemon = pokemonIds.find(
      (pokemon: IPokemonNameAndID) =>
        Number(pokemon.id) === Number(currentPokemon.id) + 1
    );

    if (nextpokemon) {
      setPokemonName((nextpokemon as IPokemonNameAndID).name);
    }
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
          types: response.data.types.map((type: any) => type.type.name),
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          specialAttack: response.data.stats[3].base_stat,
          specialDefense: response.data.stats[4].base_stat,
          speed: response.data.stats[5].base_stat,
          weight: response.data.weight,
          height: response.data.height,
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
        types: response.data.types.map((type: any) => type.type.name),
        hp: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        defense: response.data.stats[2].base_stat,
        specialAttack: response.data.stats[3].base_stat,
        specialDefense: response.data.stats[4].base_stat,
        speed: response.data.stats[5].base_stat,
        weight: response.data.weight,
        height: response.data.height,
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
        <span onClick={logNextPokemonName}></span>
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
              freeSolo={true}
            />
            <span className={styles.icon}>
              <BiSearchAlt2 onClick={handleSearch} />
            </span>
            {/*Render a random button */}
            <span className={styles.icon}>
              <GiPerspectiveDiceSixFacesRandom
                onClick={randomPokemon}
                style={{ cursor: "pointer" }}
              />
            </span>
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
              <div className={styles.weightAndHeightContainer}>
                <div className={styles.weightAndHeightChildren}>
                  <b>Vekt:</b>{" "}
                  {(Number(currentPokemon.weight) * 0.1).toFixed(2)} kg
                </div>
                <div className={styles.weightAndHeightChildren}>
                  <b>Høyde:</b>{" "}
                  {(Number(currentPokemon.height) * 0.1).toFixed(2)} m
                </div>
              </div>
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
              <div className={styles.pokeTypesContainer}>
                {currentPokemon.types.map((type) => {
                  const color = getTypeColor(type);

                  return (
                    <div
                      className={styles.pokeType}
                      key={type}
                      style={{
                        backgroundColor: color,
                        boxShadow: `0px 7px 15px 0px ${color}`,
                      }}
                    >
                      {type}
                    </div>
                  );
                })}
              </div>
              <h3>Ferdigheter</h3>
              <div className={styles.pokeStatsContainer}>
                {currentPokemon.abilities.map((ability, index) => (
                  <div key={index} className={styles.pokeAbility}>
                    {ability}
                  </div>
                ))}
              </div>
              <h2>Stats</h2>
              <div className={styles.pokeStatsContainer}>
                <div className={styles.pokeStats}>
                  <b>HP:</b> {currentPokemon.hp}
                </div>
                <div className={styles.pokeStats}>
                  <b>Angrep:</b> {currentPokemon.attack}
                </div>
                <div className={styles.pokeStats}>
                  <b>Forsvar:</b> {currentPokemon.defense}
                </div>
                <div className={styles.pokeStats}>
                  <b>Spesialangrep:</b> {currentPokemon.specialAttack}
                </div>
                <div className={styles.pokeStats}>
                  <b>Spesialforsvar:</b> {currentPokemon.specialDefense}
                </div>
                <div className={styles.pokeStats}>
                  <b>Hastighet:</b> {currentPokemon.speed}
                </div>
              </div>
            </>
          ) : (
            easterEgg
          )}
        </div>
      </div>
    </>
  );
}
