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
          style={{ width: column.width, fontWeight: "bold", fontSize: 18 }}
          sx={{ backgroundColor: "background.paper" }}>
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

// row content of table
function rowContent(_index: number, row: Move) {
  console.log(row);
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.label}
          align={column.numeric || false ? "right" : "left"}>
          {nestedMoveDetails(row[column.dataKey]) || "-"}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

// for move details which are nested
function nestedMoveDetails(move: any): string {
  if (Array.isArray(move) && move.length > 0) {
    if (move[0].effect.length < 40) {
      return move[0].effect;
    } else {
      return move[0].short_effect;
    }
  } else if (typeof move === "object") {
    return move?.name;
  } else {
    return move || "-"; // You can customize the default value
  }
}

const MovesList = () => {
  const [movesDetails, setMovesDetails] = React.useState<Move[]>([]);

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
          "https://pokeapi.co/api/v2/move?limit=1000&offset=20"
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

  if (movesDetails.length === 0) {
    return <div style={{ marginTop: "100px" }}>Loading...</div>;
  }

  // console.log(movesDetails);

  return (
    <div style={{ marginTop: "100px" }}>
      <h1 style={{ textAlign: "center" }}>Moves List</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}>
        <Paper style={{ height: 600, width: "90%", margin: "20px" }}>
          <TableVirtuoso
            // data={rows}
            data={movesDetails}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
            style={{
              scrollbarWidth: "none",
            }}
          />
        </Paper>
      </div>
    </div>
  );
};

export default MovesList;
