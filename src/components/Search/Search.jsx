import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Search.css';

function SearchBar() {
  const [pokemonId, setPokemonId] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    const trimmedId = pokemonId.trim();
    if (!trimmedId || isNaN(trimmedId)) {
      alert("Please enter a valid numeric Pokémon ID.");
      return;
    }

    try {
      // Validate the ID with a dummy API call
      await axios.get(`https://pokeapi.co/api/v2/pokemon/${trimmedId}`);

      // Redirect to your route based on ID
      navigate(`/pokemon/${trimmedId}`);
    } catch (error) {
      alert("Pokémon ID not found.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-wrapper">
      <input
        id="pokemon-name-search"
        type="text"
        placeholder="Enter Pokémon ID..."
        value={pokemonId}
        onChange={(e) => setPokemonId(e.target.value)}
      />
    </form>
  );
}

export default SearchBar;
