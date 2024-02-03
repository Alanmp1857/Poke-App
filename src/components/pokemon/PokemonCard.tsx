import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Ability, Pokemon, Stat, Type } from "../../models/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <Card sx={{ maxWidth: 345, height: 450 }}>
      {/* pokemon image */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CardMedia
          component="img"
          alt="pokemon"
          style={{ width: 150, height: 150 }}
          image={pokemon.sprites.other.home.front_default}
        />
      </div>

      {/*  */}

      <CardContent>
        {/* pokemon name */}
        <Typography gutterBottom variant="h5" component="div">
          {pokemon.name.slice(0, 1).toUpperCase() + pokemon.name.slice(1)}
        </Typography>
        {/*  */}

        {/* pokemon type */}
        <Typography variant="body2" color="text.secondary">
          Type: {pokemon.types.map((type: Type) => type.type.name).join(", ")}
        </Typography>
        {/*  */}

        {/* pokemon weight */}
        <Typography variant="body2" color="text.secondary">
          Weight: {pokemon.weight / 10} kg
        </Typography>
        {/*  */}

        {/* pokemon ability */}
        <Typography variant="body2" color="text.secondary">
          Abilities:{" "}
          {pokemon.abilities
            .map((ability: Ability) => ability.ability.name)
            .join(", ")}
        </Typography>
        {/*  */}

        {/* pokemon stats */}
        <Typography variant="body2" color="text.secondary">
          {pokemon.stats.map((stat: Stat) => (
            <React.Fragment key={stat.stat.name}>
              {`${stat.stat.name}: ${stat.base_stat}`}
              <br />
            </React.Fragment>
          ))}
        </Typography>
        {/*  */}
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default PokemonCard;
