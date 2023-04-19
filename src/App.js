import logo from './logo.svg';
import About from './About';
import './App.css'; 
import Footer from './Footer'; 
import Header from './Header'; 

function App() {
  return (
    <div class="wrapper">
      <Header />
          <About>
            <h1>Content Content Content</h1>
          </About>
        <Footer />
    </div>
  );
}

export default App;
