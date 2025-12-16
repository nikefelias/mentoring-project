import "./App.css";
import "./index.css";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { Outlet } from "react-router";

function App() {
  return (
    <div className="App">
      <Header />
      <div style={{ border: "5px solid dodgerblue", padding: 20 }}>
        <Outlet />
      </div>
      <main></main>

      <Footer />
    </div>
  );
}

export default App;
