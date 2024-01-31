import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Footer = () => {
  const [value, setValue] = React.useState("recents");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      sx={{
        width: "100%",
        backgroundColor: "#323232",
        bottom: 0,
        position: "relative",
      }}
      value={value}
      onChange={handleChange}>
      <BottomNavigationAction
        sx={{
          color: "darkgrey",
          "&.Mui-selected": {
            color: "white",
          },
        }}
        label="Recents"
        value="recents"
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        sx={{
          color: "darkgrey",
          "&.Mui-selected": {
            color: "white",
          },
        }}
        label="Favorites"
        value="favorites"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        sx={{
          color: "darkgrey",
          "&.Mui-selected": {
            color: "white",
          },
        }}
        label="Nearby"
        value="nearby"
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction
        sx={{
          color: "darkgrey",
          "&.Mui-selected": {
            color: "white",
          },
        }}
        label="Folder"
        value="folder"
        icon={<FolderIcon />}
      />
    </BottomNavigation>
  );
};

export default Footer;
