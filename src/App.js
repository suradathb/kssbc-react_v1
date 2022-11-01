import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import FAQ from './components/FAQ';
import ListUser from './components/ListUser';


class App extends React.Component {
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
          {/* <Route path='/adduser' element={<CreateUser/>} /> */}
          <Route path='/list' element={<ListUser/>}/>
        </Routes>
        <Footer />
      </>
    );
  }
}

export default App;
