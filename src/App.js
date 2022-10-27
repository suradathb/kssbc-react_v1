import React, { Component } from 'react';
import { Route, Routes, Router } from "react-router-dom";
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
        <Home />
        <Routes>
          <Route path='/'>
          </Route>
        </Routes>
        <Footer />
      </>
    );
  }
}

export default App;
