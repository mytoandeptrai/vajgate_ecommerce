import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import HomePage from "./Pages/HomePage";
function App() {
  return (
    <>
      <Router>
        <Header />
        <div style={{ marginTop: "120px" }}>
          <HomePage />
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
