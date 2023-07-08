import './App.css';
import Footer from './Footer';
import Header from './Header';
import { HashRouter,  Route, Routes, Redirect } from 'react-router-dom';
import Home from './Home';
import Events from './Events';
import About from './About';
import JoinNow from './Join-now';


const App = () => {
  return (
    <HashRouter>
      <Header />
      <div>
        <Routes>
          <Route path = "/" element={<Home/>} />
          <Route path="/About" element={<About/>} />
          <Route path="/Events" element={<Events/>} />
          <Route path="/Join-Now" element={<JoinNow/>} />
        </Routes>
      </div>
      <Footer />
    </HashRouter>
  );
};

export default App;
