import Header from "./components/header/Header";
import "./App.css";
import Footer from "./components/footer/Footer";
// import HomePage from "./components/homepage/HomePage";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <Outlet />
      {/* <HomePage /> */}
      <Footer />
    </div>
  );
}

export default App;
