import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import Login from './Login.js';
import Register from './Register.js';
import UserQuery from './UserQuery.js';
import Homepage from './components/Homepage.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/home" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userquery" element={<UserQuery />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
