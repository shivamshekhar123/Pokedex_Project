import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PokemonDetails.css';


function PokemonDetails() {
  const id = useParams().id;
  const [pokemon, setPokemon] = useState('');
  const [typePokemonList, setTypePokemonList] = useState([]);
  const navigate = useNavigate();

  async function downloadData() {
    const response = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const types = response.data.types.map((t) => t.type.name);
    setPokemon({
      name: response.data.name,
      id: response.data.id,
      image: response.data.sprites.front_default,
      height: response.data.height,
      weight: response.data.weight,
      abilities: response.data.abilities.map((ability) => ability.ability.name).join(', '),
      types: types,
    });
  }

  // This will fetch similar type Pokémon after `pokemon.types` is loaded
  useEffect(() => {
    if (pokemon.types && pokemon.types.length > 0) {
      async function fetchTypePokemons() {
        const typeUrl = `https://pokeapi.co/api/v2/type/${pokemon.types[0]}`;
        const response = await axios.get(typeUrl);
        setTypePokemonList(response.data.pokemon.slice(0, 3)); // limit for performance
      }
      fetchTypePokemons();
    }
  }, [pokemon.types]);

  useEffect(() => {
    downloadData();
  }, [id]);

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
        }}
        onMouseOver={(e) => (e.currentTarget.style.color = '#0056b3')}
        onMouseOut={(e) => (e.currentTarget.style.color = '#007bff')}
        title='Go back to Pokedex'
      >
        Pokédex
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
        <div className='pokemon-types'>
          Types:{' '}
          {pokemon.types &&
            pokemon.types.map((t) => <div key={t}>{t}</div>)}
        </div>
      </div>

      {typePokemonList.length > 0 && (
        <div>
          <h3>More {pokemon.types[0]} type Pokémon</h3>
          <ul>
            {typePokemonList.map((p) => (
              <li key={p.pokemon.url}>{p.pokemon.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PokemonDetails;
