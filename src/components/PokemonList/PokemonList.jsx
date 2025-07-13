
import { useEffect, useState } from "react";

import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

const POKEDEX_URL = 'https://pokeapi.co/api/v2/pokemon'

function PokemonList() {

    const [PokemonList, setPokimonList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    async function downloadPokemon() {
        const response = await axios.get(POKEDEX_URL); //this downloads list of 20 pokemon

        const pokemonResult = response.data.results //we get the array of pokemon from results(name and url)

        console.log(response.data)

        //iterating over the array of pokimons and using their url,to create an array of promise  
        //that will download those 20 pokemons
        const pokemonResultPromise = pokemonResult.map((pokemon) => axios.get(pokemon.url));

        //passing the array of promises to axios.all to download all pokemons at once and then we can use the data from each promise
        const pokemonData = await axios.all(pokemonResultPromise) //array of 20 pokemon detailed data
        console.log(pokemonData)

        //iterate on the data of each pokemon and extract an array of objects with name, id and image
        const pokeListResult = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data
            return {
                name: pokemon.name,
                id: pokemon.id,
                image: pokemon.sprites.front_default
            }
        })
        console.log(pokeListResult)
        setPokimonList(pokeListResult);



        setIsLoading(false);
    }

    useEffect(() => {
        downloadPokemon();
    }, []);

    return (
        <div className="pokemon-list-wrapper">
            <div>pokemon list</div>
            {(isLoading) ? 'Loading...' : PokemonList.map((p) => (<Pokemon name={p.name} image={p.image} key={p.id}/>))}
        </div>
    );
}

export default PokemonList;
