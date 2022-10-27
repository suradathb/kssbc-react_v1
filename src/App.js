import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: ""
    }
  }

  render() {
    return (
      <>
        <Header />
        <Routes>
          <Route path="/" element={ <Home/> }/>
        </Routes>
        <Footer />
      </>
    );
  }
}

export default App;
