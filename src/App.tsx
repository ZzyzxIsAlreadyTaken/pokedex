import "./App.css";
import Card from "./components/Card.tsx";
import PokeSearch from "./components/PokeSearch.tsx";
import { useState } from "react";
import { IPokemon } from "./components/IPokemon";

function App() {
  const [searchResults, setSearchResults] = useState<IPokemon>();

  function handleSearchResults(results: any) {
    setSearchResults(results);
  }

  console.log(searchResults);

  return (
    <>
      <div className="App">
        <h1>Kristoffers Poké-søk</h1>
        <PokeSearch onSearchResults={handleSearchResults} />
        <Card />
      </div>
    </>
  );
}

export default App;
