import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Ability, Pokemon, Stat, Type } from "../../models/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <Card
      sx={{
        maxWidth: 300,
        height: 450,
        background: "linear-gradient(147deg, #1B2845 0%, #FFFFFF 70%)",
      }}>
      {/* pokemon image */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
        <CardMedia
          component="img"
          alt="pokemon"
          style={{ width: 120, height: 120 }}
          image={pokemon.sprites.other.home.front_default}
        />
      </div>
      {/*  */}

      <CardContent>
        {/* pokemon name */}
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ textAlign: "center" }}>
          {pokemon.name.slice(0, 1).toUpperCase() + pokemon.name.slice(1)}
        </Typography>
        {/*  */}

        {/* pokemon type */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center" }}>
          <span style={{ fontWeight: "bold" }}>Type</span>:{" "}
          {pokemon.types
            .map(
              (type: Type) =>
                type.type.name.slice(0, 1).toUpperCase() +
                type.type.name.slice(1)
            )
            .join(", ")}
        </Typography>
        {/*  */}

        {/* pokemon weight */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center" }}>
          <span style={{ fontWeight: "bold" }}>Weight</span>:{" "}
          {pokemon.weight / 10} kg
        </Typography>
        {/*  */}

        {/* pokemon ability */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center" }}>
          <span style={{ fontWeight: "bold" }}>Abilities</span>:{" "}
          {pokemon.abilities
            .map(
              (ability: Ability) =>
                ability.ability.name.slice(0, 1).toUpperCase() +
                ability.ability.name.slice(1)
            )
            .join(", ")}
        </Typography>
        {/*  */}

        {/* pokemon stats */}

        <div>
          <h3
            style={{
              textAlign: "center",
              marginLeft: "50px",
              marginTop: "3px",
              marginBottom: "3px",
            }}>
            Base Stats
          </h3>
          <table>
            <tbody>
              {pokemon.stats.map((stat: Stat) => (
                <tr key={stat.stat.name}>
                  <th
                    style={{
                      textAlign: "right",
                      textTransform:
                        stat.stat.name === "hp" ? "uppercase" : "capitalize",
                    }}>
                    {stat.stat.name}
                  </th>
                  <td>
                    <div
                      style={{
                        height: "10px",
                        border:
                          stat.base_stat >= 100
                            ? "1px solid lightgreen"
                            : stat.base_stat >= 60
                            ? "1px solid #ffdf00"
                            : stat.base_stat >= 40
                            ? "1px solid orange"
                            : "1px solid red",
                        borderRadius: "20px",
                        width: `${(stat.base_stat / 200) * 8000}%`, // Adjust the calculation based on your max value
                        backgroundColor:
                          stat.base_stat >= 100
                            ? "lightgreen"
                            : stat.base_stat >= 60
                            ? "#ffdf00"
                            : stat.base_stat >= 40
                            ? "orange"
                            : "red",
                      }}></div>
                  </td>
                  <div
                    style={{
                      textAlign: "right",
                      marginLeft: "120px",
                    }}>
                    {stat.base_stat}
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              backgroundColor: "lightgray",
              mt: 1,
            }}>
            BST: {pokemon.stats.reduce((a, b) => a + b.base_stat, 0)}
          </Typography>
        </div>

        {/*  */}
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
