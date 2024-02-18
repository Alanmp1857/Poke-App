import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import { ColumnData, MovesUrl, Move } from "../../models/moves";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { colors, physical, special, status } from "../../constants/movesData";

// move column structure
const columns: ColumnData[] = [
  {
    width: 80,
    label: "Move Name",
    dataKey: "name",
  },
  {
    width: 30,
    label: "Type",
    dataKey: "type", // Update dataKey for nested property
  },
  {
    width: 30,
    label: "Category",
    dataKey: "damage_class", // Update dataKey for nested property
  },
  {
    width: 30,
    label: "Power",
    dataKey: "power",
    numeric: true,
  },
  {
    width: 30,
    label: "Accuracy",
    dataKey: "accuracy",
    numeric: true,
  },
  {
    width: 30,
    label: "PP",
    dataKey: "pp",
    numeric: true,
  },
  {
    width: 200,
    label: "Effect",
    dataKey: "effect_entries", // Update dataKey for nested property
  },
  {
    width: 40,
    label: "Chance(%)",
    dataKey: "effect_chance",
    numeric: true,
  },
];

// table structure
const VirtuosoTableComponents: TableComponents<Move> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead,
  TableRow: ({ ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

// header of table using columns
function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.label} // Added key attribute
          variant="head"
          align={column.numeric || false ? "right" : "left"}
          style={{
            width: column.width,
            fontWeight: "bold",
            fontSize: 18,
            textAlign: "center",
            backgroundColor: "lightgray",
            borderRight: "1px solid darkgrey",
          }}
          sx={{ backgroundColor: "background.paper" }}>
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

// fetching nested move details
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function nestedMoveDetails(move: any, column: ColumnData): React.ReactNode {
  if (column.label === "Effect" && move.length > 0) {
    // Regular expression to replace $effect_chance
    const regex = /\$effect_chance%/g;

    if (move[0].effect.length < 40) {
      return <div>{move[0].effect.replace(regex, ``)}</div>;
    } else {
      return <div>{move[0].short_effect.replace(regex, ``)}</div>;
    }
  } else if (typeof move === "object") {
    if (column.label === "Type") {
      // return move?.name.charAt(0).toUpperCase() + move?.name.slice(1);
      return (
        <div
          style={{
            backgroundColor: colors[move?.name],
            height: "30px",
            width: "80px",
            borderRadius: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            textShadow: "2px 2px 4px black",
          }}>
          <h5>{move?.name.charAt(0).toUpperCase() + move?.name.slice(1)}</h5>
        </div>
      );
    } else if (column.label === "Category") {
      if (move?.name === "physical") {
        return (
          <img
            className="img-fixed"
            src={physical}
            width="30"
            height="20"
            alt="Physical"
            title="Physical"
            loading="lazy"
          />
        );
      } else if (move?.name === "special") {
        return (
          <img
            className="img-fixed"
            src={special}
            width="30"
            height="20"
            alt="Special"
            title="Special"
            loading="lazy"
          />
        );
      } else {
        return (
          <img
            className="img-fixed"
            src={status}
            width="30"
            height="20"
            alt="Status"
            title="Status"
            loading="lazy"
          />
        );
      }
    } else {
      return move?.name;
    }
  } else {
    if (column.label === "Accuracy") {
      return `${move}%`;
    } else if (column.label === "Move Name") {
      return (
        <div>
          <h4>{move.charAt(0).toUpperCase() + move.slice(1)}</h4>
        </div>
      );
    } else {
      return move;
    }
  }
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
  width: "100%", // Adjust width to 50%
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

const MovesList = () => {
  const [movesDetails, setMovesDetails] = React.useState<Move[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    const fetchMoveDetails = async (url: string): Promise<Move> => {
      try {
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        console.error("Error fetching Move details: ", error);
        throw error;
      }
    };

    const fetchData = async () => {
      try {
        // Fetch moves data
        const movesResponse = await axios.get(
          "https://pokeapi.co/api/v2/move?limit=1000"
        );

        // Fetch move details
        const detailsPromises = movesResponse.data.results.map(
          (move: MovesUrl) => fetchMoveDetails(move.url)
        );
        const details = await Promise.all(detailsPromises);

        // Map details to the Move type
        const moveInfo: Move[] = details.map((move: Move) => ({
          id: move.id,
          name: move.name,
          type: move.type,
          damage_class: move.damage_class,
          power: move.power,
          accuracy: move.accuracy,
          pp: move.pp,
          effect_entries: move.effect_entries,
          effect_chance: move.effect_chance,
        }));

        setMovesDetails(moveInfo);

        // console.log(details);
        // console.log(moveInfo);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  // console.log(movesDetails);

  // Function to filter moves based on search query
  const filterMoves = (moves: Move[], query: string) => {
    return moves.filter((move) =>
      move.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filteredMoves = filterMoves(movesDetails, searchQuery);

  const rowContent = React.useCallback((_index: number, row: Move) => {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell
            key={column.label}
            align={column.numeric || false ? "right" : "left"}
            style={{ textAlign: "center" }}>
            {nestedMoveDetails(row[column.dataKey], column) || "-"}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }, []);

  if (movesDetails.length === 0) {
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

  // console.log(movesDetails);

  return (
    <div style={{ marginTop: "100px" }}>
      {/* search option */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Search sx={{ margin: "20px 5px" }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search Moves..."
            inputProps={{ "aria-label": "search" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Search>
      </div>
      {/*  */}
      <h1 style={{ textAlign: "center" }}>Moves List</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Paper
          style={{
            height: 600,
            width: "80%",
            margin: "20px",
          }}>
          <TableVirtuoso
            data={filteredMoves}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
          />
        </Paper>
      </div>
    </div>
  );
};

export default MovesList;
