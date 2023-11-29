import React from 'react'
import { UseState } from './UseState.jsx';
import './App.css';
import { UseReducer } from './UseReducer.jsx';

function App() {
  return (
    <div className="App">
      <UseState name="UseState" />
      <UseReducer name="UseReducer" />
    </div>
  );
}

export default App;
