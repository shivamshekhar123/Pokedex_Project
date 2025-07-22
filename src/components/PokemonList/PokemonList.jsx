import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";
import usePokemonList from "../../Hooks/usePokemonList.js";

function PokemonList() {
  
    const [pokemonListState,setpokemonListState] = usePokemonList('https://pokeapi.co/api/v2/pokemon',false);


    return (
        <div className="pokemon-list-wrapper">

            <div className="pokemon-wrapper ">
                {(pokemonListState.isLoading) ? 'Loading...' : pokemonListState.pokemonList.map((p) => (<Pokemon name={p.name} image={p.image} id={p.id} key={p.id} />))}
            </div>
            <div className="controls">
                <button disabled={pokemonListState.prevUrl == null} onClick={() => 
                    { setpokemonListState({ ...pokemonListState, POKEDEX_URL: pokemonListState.prevUrl })}}>Prev</button>
                <button disabled={pokemonListState.nextUrl == null} onClick={() => 
                    { setpokemonListState({ ...pokemonListState, POKEDEX_URL: pokemonListState.nextUrl })}}>Next</button>
            </div>
        </div>
    );
}

export default PokemonList;
