import Companies from "@/pages/Companies";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Contacts from "./pages/Contacts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Companies />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </Router>
  );
}

export default App;
