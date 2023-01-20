import "./App.css";
import Catalogue from "./components/catalogue";
import DisplayPie from "./components/displayPie";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Catalogue/>} />
          <Route path="/pieChart" element={<DisplayPie/>} />
        </Routes>
        
      </BrowserRouter>
    </>
  );
}

export default App;
