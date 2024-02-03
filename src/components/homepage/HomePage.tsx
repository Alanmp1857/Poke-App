import LoginIcon from "@mui/icons-material/Login";
import InputIcon from "@mui/icons-material/Input";
import { Button } from "@mui/material";
import image from "../../assets/message.png";

const HomePage = () => {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
      <div
        style={{
          backgroundColor: "#666A6D",
          height: "600px",
          width: "80%",
          margin: "20px",
          borderRadius: "20px",
        }}>
        {/* charizard image */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "10px",
          }}>
          <img
            src="https://e0.pxfuel.com/wallpapers/760/947/desktop-wallpaper-red-s-mega-charizard-x-po-png-pokemon-epic-charizard.jpg"
            alt="charizard-img"
            style={{ height: "300px", width: "50%", borderRadius: "50%" }}
          />
        </div>
        {/*  */}

        {/* Welcome message */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={image} alt="message" style={{ width: "60%" }} />
        </div>
        {/*  */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "30px",
          }}>
          <Button
            startIcon={<InputIcon />}
            variant="contained"
            sx={{
              backgroundColor: "#323232",
              color: "grey",
              "&:hover": {
                backgroundColor: "#323232",
              },
              "&:active": {
                backgroundColor: "#323232",
              },
            }}>
            SignUp
          </Button>
          <Button
            startIcon={<LoginIcon />}
            variant="contained"
            sx={{
              backgroundColor: "#323232",
              color: "grey",
              "&:hover": {
                backgroundColor: "#323232",
              },
              "&:active": {
                backgroundColor: "#323232",
              },
            }}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
