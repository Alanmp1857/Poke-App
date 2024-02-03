import axios from "axios";
import React, { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import { Grid, Pagination } from "@mui/material";
import { Pokemon } from "../../models/pokemon";

interface PokemonUrl {
  name: string;
  url: string;
}

const PokemonList: React.FC = () => {
  const [pokemonUrl, setPokemonUrl] = useState<PokemonUrl[]>([]);
  const [pokemonDetails, setPokemonDetails] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Function to fetch Pokemon data based on the page
    const fetchPokemonData = async (url: string) => {
      try {
        const response = await axios.get(url);
        setPokemonUrl(response.data.results);
        // Calculate the total number of pages based on the total Pokemon count
        setTotalPages(Math.ceil(response.data.count / 12));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    // Initial fetch for the first page
    fetchPokemonData(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=0`);
  }, []);

  const fetchPokemonDetails = async (url: string): Promise<Pokemon> => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching Pokemon details: ", error);
      throw error;
    }
  };

  // Function to fetch Pokemon list for a specific page
  const fetchPokemonList = async (page: number) => {
    const offset = (page - 1) * 12;
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=12&offset=${offset}`
    );
    setPokemonUrl(response.data.results);
  };

  // Function to handle page change
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
    // Fetch Pokemon list for the selected page
    fetchPokemonList(value);
  };

  useEffect(() => {
    // Function to fetch details of each Pokemon in the current list
    const fetchDetails = async () => {
      const detailsPromises = pokemonUrl.map((pokemon) =>
        fetchPokemonDetails(pokemon.url)
      );

      try {
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
      } catch (error) {
        console.error("Error fetching Pokemon details: ", error);
      }
    };

    if (pokemonUrl.length > 0) {
      // Fetch details when the list of Pokemon is updated
      fetchDetails();
    }
  }, [pokemonUrl]);

  return (
    <div style={{ marginTop: "100px", marginLeft: "20px" }}>
      <h1>Pokemon List</h1>
      <Grid container spacing={3}>
        {pokemonDetails.map((pokemon: Pokemon, id: React.Key) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={id}>
            <PokemonCard pokemon={pokemon} />
          </Grid>
        ))}
      </Grid>
      {/* Pagination component to navigate between pages */}
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          variant="outlined"
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default PokemonList;
