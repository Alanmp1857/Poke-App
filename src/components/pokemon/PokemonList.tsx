import axios from "axios";
import React, { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import { Grid } from "@mui/material";
import { Pokemon } from "../../models/pokemon";

interface PokemonUrl {
  name: string;
  url: string;
}

const PokemonList: React.FC = () => {
  const [pokemonUrl, setPokemonUrl] = useState<PokemonUrl[]>([]);
  const [pokemonDetails, setPokemonDetails] = useState<Pokemon[]>([]);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=10`)
      .then((response) => {
        setPokemonUrl(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const fetchPokemonDetails = (url: string): Promise<Pokemon> => {
    return axios
      .get(url)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching Pokemon details: ", error);
      });
  };

  useEffect(() => {
    const fetchDetails = async () => {
      const detailsPromises = pokemonUrl.map((pokemon) =>
        fetchPokemonDetails(pokemon.url)
      );

      const details = await Promise.all(detailsPromises);
      const pokemonInfo = details.map((pokemon: Pokemon) => ({
        id: pokemon.id,
        name: pokemon.name,
        weight: pokemon.weight,
        abilities: pokemon.abilities,
        types: pokemon.types,
        stats: pokemon.stats,
        sprites: pokemon.sprites,
      }));

      setPokemonDetails(pokemonInfo);
    };

    if (pokemonUrl.length > 0) {
      fetchDetails();
    }
  }, [pokemonUrl]);

  return (
    <div>
      <h1>Pokemon List</h1>
      <Grid container spacing={3}>
        {pokemonDetails.map((pokemon: Pokemon, id: React.Key) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={id}>
            <PokemonCard pokemon={pokemon} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PokemonList;
