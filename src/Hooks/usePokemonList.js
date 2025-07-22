//custom Hooks

import axios from "axios";
import React, { useEffect, useState } from "react";

function usePokemonList(url,type) {
   const [pokemonListState, setpokemonListState] = useState({
        pokemonList: [],
        POKEDEX_URL: url ,
        nextUrl: null,
        prevUrl: null,
        isLoading: true
    })

    async function downloadPokemon() {
        setpokemonListState((state) => ({
            ...state,
            isLoading: true
        }));
        const response = await axios.get(pokemonListState.POKEDEX_URL); //this downloads list of 20 pokemon

        const pokemonResult = response.data.results //we get the array of pokemon from results(name and url)

console.log("pokemonResult", response.data.pokemon)
        //updating the state as we render setpokemonListState many times here ("reducers" can also be used)
        setpokemonListState((state) => ({
            ...state,
            nextUrl: response.data.next,
            prevUrl: response.data.previous
        })) //this is the next & prev url to download next 20 pokemons

        if(type) {
           setpokemonListState((state) => ({
            ...state,
            pokemonList: response.data.pokemon.slice(0, 5)
        })); //set the pokemonListState with the array of objects
        }else{
        //iterating over the array of pokemons and using their url,to create an array of promise  
        //that will download those 20 pokemons
        const pokemonResultPromise = pokemonResult.map((pokemon) => axios.get(pokemon.url));

        //passing the array of promises to Promise.all to download all pokemons at once and then we can use the data from each promise
        const pokemonData = await Promise.all(pokemonResultPromise) //promise return array of 20 pokemon detailed data

        //iterate on the data of each pokemon and extract an array of objects with name, id and image
        const pokeListResult = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data
            return {
                name: pokemon.name,
                id: pokemon.id,
                image: pokemon.sprites.front_default
            }
        })

        setpokemonListState((state) => ({
            ...state,
            pokemonList: pokeListResult,
            isLoading: false
        })); //set the pokemonList state with the array of objects
    }}

    useEffect(() => {
        downloadPokemon();
    }, [pokemonListState.POKEDEX_URL]);  //this will run the downloadPokemon function when the component mounts or when POKEDEX_URL changes
    
    return [pokemonListState,setpokemonListState]
    


}

export default usePokemonList;
