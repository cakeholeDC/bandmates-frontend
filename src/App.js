import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar'
import MainContainer from './containers/MainContainer'
import { Container } from 'semantic-ui-react'

function App() {
  return (
    <div className="App">
      <NavBar />
      <MainContainer />
    </div>
  );
}

export default App;
