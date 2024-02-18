import axios from "axios";
import React, { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import { Grid, InputBase, Pagination, alpha, styled } from "@mui/material";
import { Pokemon } from "../../models/pokemon";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";

// Interface for Pokemon URL
interface PokemonUrl {
  name: string;
  url: string;
}

// Styling components using Material-UI's styled API
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.grey[500], 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.grey[500], 0.25),
  },
  marginLeft: 0,
  width: "50%", // Adjust width to 50%
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "22ch",
      "&:focus": {
        width: "100%",
      },
    },
  },
}));

// Main component
const PokemonList: React.FC = () => {
  const [pokemonDetails, setPokemonDetails] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetching data from the Pokemon API
  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        // Fetching the list of Pokemon URLs
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=1302`
        );
        const allPokemonUrls: PokemonUrl[] = response.data.results;
        setTotalPages(Math.ceil(allPokemonUrls.length / 12));

        // Fetching details of each Pokemon
        const detailsPromises = allPokemonUrls.map((pokemonUrl) =>
          axios.get(pokemonUrl.url).then((res) => res.data)
        );
        const details = await Promise.all(detailsPromises);
        setPokemonDetails(details);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, []);

  // Filtering Pokemon based on search query
  const filteredPokemon = pokemonDetails.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handling search input change
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset current page when search query changes
  };

  // Handling page change
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  // Rendering loading spinner if data is still loading
  if (loading) {
    return (
      <div
        style={{
          marginTop: "100px",
          display: "flex",
          justifyContent: "center",
        }}>
        <CircularProgress sx={{ color: "#323232" }} disableShrink />
      </div>
    );
  }

  // Calculating the index range for currently displayed Pokemon
  const startIndex = (currentPage - 1) * 12;
  const endIndex = startIndex + 12;
  const displayedPokemon = filteredPokemon.slice(startIndex, endIndex);

  // Rendering Pokemon list with pagination and search functionality
  return (
    <div style={{ marginTop: "80px", marginLeft: "20px" }}>
      <h1>Pokemon List</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Search sx={{ margin: "20px 5px" }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search Pokemon…"
            inputProps={{ "aria-label": "search" }}
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </Search>
      </div>
      <Grid container spacing={3}>
        {displayedPokemon.map((pokemon: Pokemon, id: number) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={id}>
            <PokemonCard pokemon={pokemon} />
          </Grid>
        ))}
      </Grid>
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
