import style from './index'
import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Alert from './components/Alert'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NotesState from "./context/notes/NotesState";


function App() {
  return (
    <>
     <NotesState>
      <Router>
      <Navbar/>
      <Alert message="this is alert"/>
        <div className="container">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
        </Routes>
      </div>
      </Router>
     </NotesState>
    </>
  );
}

export default App;
