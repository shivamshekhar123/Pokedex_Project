import React from "react";
import { useNavigate } from "react-router-dom";
import "./Pokemon.css";

function Pokemon({ name, image, id }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pokemon/${id}`);
  };

  return (
    <div
      className="pokemon-card"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <img src={image} alt={name} className="pokemon-image" />
      <div className="pokemon-name">{name}</div>
      <div className="pokemon-id">#{id}</div>
    </div>
  );
}

export default Pokemon;
