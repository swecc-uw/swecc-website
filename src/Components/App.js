// import '../CSS/App.css';
import Footer from './Footer.js';
import Header from './Header.js';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './Home.js';
import Events from './Events.js';
import About from './About.js';
import JoinNow from './Join-now.js';
import Navbar from './Navbar.js';

function App() {
  return (
    <HashRouter>
      <Navbar />
      {/* <Header /> */}
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