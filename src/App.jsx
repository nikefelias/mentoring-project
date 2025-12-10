import './App.css';
import './index.css';
import  Header from './assets/components/Header.jsx';
import Footer from './assets/components/Footer.jsx';
import Radar from './assets/components/radar.jsx';

function App() {
 
  return (
    <div className="App">
      <Header />
      <main>
        <Radar />
      </main>

      <Footer />
    </div>
  );
}


export default App
