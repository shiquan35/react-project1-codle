import './App.css';
import React, { useState } from 'react';
import {DisplayGrid} from "./DisplayGrid";
// import { EndGame } from './EndGame';

function App() {
  return (
    <div className="App">
      <nav><h1>🔒 Codle 🔒</h1></nav>
      <br></br>
      <DisplayGrid />
    </div>
  );
}

export default App;
