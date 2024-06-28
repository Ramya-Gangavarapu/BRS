// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import BrewerySearch from './components/BrewerySearch';
import BreweryDetails from './components/BreweryDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<BrewerySearch />} />
          <Route path="/brewery/:id" element={<BreweryDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
