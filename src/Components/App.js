// import '../CSS/App.css';
import Footer from "./Footer.js";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./Home.js";
import Events from "./Events.js";
import About from "./About.js";
import JoinNow from "./Join-now.js";
import Navbar from "./Navbar.js";

function App() {
  const link = document.querySelector("link[rel~='icon']");
  link.href = require("../icons/logo-23.png");

  return (
    <HashRouter>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Events" element={<Events />} />
          <Route path="/Join-Now" element={<JoinNow />} />
        </Routes>
      </div>
      <Footer />
    </HashRouter>
  );
}

export default App;
