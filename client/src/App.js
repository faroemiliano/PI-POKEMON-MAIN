import "./App.css";
import Landing from "./components/Landing";
import { Routes, Route } from "react-router-dom";
import Characters from "./components/Characters";
import PokemonDetail from "./components/PokemonDetail";
import FormCreatePokemon from "./components/FormCreatePokemon";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/home" element={<Characters />} />
        <Route exact path="/pokemon/:id/:origen" element={<PokemonDetail />} />
        <Route exact path="/create" element={<FormCreatePokemon />} />
      </Routes>
    </div>
  );
}

export default App;
