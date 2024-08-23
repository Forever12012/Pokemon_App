import React from "react";
import { Card, Col } from "react-bootstrap";

const PokemonCard = ({ pokemon }) => {
  return (
    <Col md={6} lg={3} className="mb-4">
      <Card className="h-100 text-center">
        <Card.Img
          variant="top"
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
        <Card.Body>
          <Card.Title>{pokemon.name}</Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default PokemonCard;
