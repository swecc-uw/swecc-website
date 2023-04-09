import logo from './logo.svg';
import './App.css';
import SWECClogo from './SWECClogo.jpg';

function Header() {
  return (
    <nav class = "full-nav">
      <div class = "header-logo">
          <img id = "nav-logo" src = {SWECClogo} alt = "SWECC Logo"/>
      </div>
      <div class = "nav-bar">
        <a href="#" class = "header-pages"> HOME   </a>
        <a href="#" class = "header-pages"> EVENTS   </a>
        <a href="#" class = "header-pages"> ABOUT   </a>
        <a href="#" id = "join-now-btn" class = "header-pages"> JOIN NOW </a>
      </div>
    </nav>
  )
}

function App() {
  return (
    <div>
      <Header />
    </div>
  );
}

export default App;
