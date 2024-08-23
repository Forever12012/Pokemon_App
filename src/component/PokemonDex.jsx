import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Form, Row } from "react-bootstrap";
import PokemonCard from "./PokemonCard";

export const PokemonDex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=100"
        );
        const results = response.data.results;
        const detailedPokemons = await Promise.all(
          results.map(async (pokemon) => {
            const res = await axios.get(pokemon.url);
            return res.data;
          })
        );
        setPokemons(detailedPokemons);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokemons();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="mt-4">
      <h1 className="text-center">Pokémon Gallery</h1>
      <Form.Control
        type="text"
        placeholder="Search Pokémon"
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4"
      />
      <Row>
        {filteredPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </Row>
    </Container>
  );
};
