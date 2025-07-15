
import { useEffect, useState } from "react";

import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";



function PokemonList() {
    const [POKEDEX_URL, setPOKEDEX_URL] = useState('https://pokeapi.co/api/v2/pokemon')

    const [nextUrl, setnextUrl] = useState('')
    const [prevUrl, setprevUrl] = useState('')
    const [PokemonList, setPokimonList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    async function downloadPokemon() {
        setIsLoading(true)
        const response = await axios.get(POKEDEX_URL); //this downloads list of 20 pokemon

        const pokemonResult = response.data.results //we get the array of pokemon from results(name and url)

        console.log("response data", response.data)
        setnextUrl(response.data.next) //this is the next url to download next 20 pokemons
        setprevUrl(response.data.previous) //this is the previous url to download previous 20

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
    }, [POKEDEX_URL]);

    return (
        <div className="pokemon-list-wrapper">

            <div className="pokemon-wrapper">
                {(isLoading) ? 'Loading...' : PokemonList.map((p) => (<Pokemon name={p.name} image={p.image} key={p.id} />))}
            </div>
            <div className="controls">
                <button disabled={prevUrl == null} onClick={() => { setPOKEDEX_URL(prevUrl) }}>Prev</button>
                <button disabled={nextUrl == null} onClick={() => { setPOKEDEX_URL(nextUrl) }}>Next</button>
            </div>
        </div>
    );
}

export default PokemonList;
