import Header from "./components/header/Header";
import "./App.css";
import Footer from "./components/footer/Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
