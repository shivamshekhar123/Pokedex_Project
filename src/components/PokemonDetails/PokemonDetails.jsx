import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './PokemonDetails.css'
import Pokedex from '../Pokedex/Pokedex'

function PokemonDetails() {
  const id = useParams().id
  const [pokemon, setPokemon] = React.useState('')
  const navigate = useNavigate();  // useNavigate is a hook that returns a function that lets you navigate programmatically(no reload)

  async function downloadData() {
    const response = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`)
    // console.log("response", response.data)
    setPokemon({
      name: response.data.name,
      id: response.data.id,
      image: response.data.sprites.front_default,
      height: response.data.height,
      weight: response.data.weight,
      abilities: response.data.abilities.map((ability) => ability.ability.name).join(', '), //abilities is an array, we need to join them into a string
      types: response.data.types.map((type) => type.type.name).join(', ')
    })

  }
 
  useEffect(() => {
    downloadData()
  }, [id])

  const handleRedirect = () => {
    navigate('/');
  };

  return (
    <div className='pokemon-details-wrapper'>
      <div
        className='pokedex-title'
        onClick={handleRedirect}
        style={{
          cursor: 'pointer',
          color: '#007bff',
          textDecoration: 'underline',
          transition: 'color 0.2s',
        }}
        onMouseOver={e => e.currentTarget.style.color = '#0056b3'}
        onMouseOut={e => e.currentTarget.style.color = '#007bff'}
        title="Go back to Pokedex"
      >

        Pokedex
      </div>
     
      <div className='pokemon-details'>
        <div className='pokemon-name' style={{ color: 'red', textTransform: 'uppercase' }}>
          Name: {pokemon.name}
        </div>
        <div className='pokemon-image'>
          <img src={pokemon.image} alt={pokemon.name} style={{ height: '150px' }} />
        </div>
        <div className='pokemon-id'>ID: {pokemon.id}</div>
        <div className='pokemon-height'>Height: {pokemon.height}</div>
        <div className='pokemon-weight'>Weight: {pokemon.weight}</div>
        <div className='pokemon-abilities'>Abilities: {pokemon.abilities}</div>
        <div className='pokemon-types'>Types: {pokemon.types}</div>
      </div>
    </div>
  )
}

export default PokemonDetails
