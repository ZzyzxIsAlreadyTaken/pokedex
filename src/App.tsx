import "./App.css";
import Card from "./components/Card.tsx";
import PokeSearch from "./components/PokeSearch.tsx";

function App() {
  return (
    <>
      <div className="App">
        <h1>Pokemon Search</h1>
        <PokeSearch />
        <Card />
      </div>
    </>
  );
}

export default App;
