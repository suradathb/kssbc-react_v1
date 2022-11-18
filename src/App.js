import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import TransOrder from './components/TransOrder';
import ListMapUser from './components/ListMapUser';
import ApproveList from './components/ApproveList';
import AddBonusPoint from './components/AddBonusPoint';
import ProductItem from './components/ProductItem';
import ProductCreate from './components/ProductCreate';
import ProductEdit from './components/ProductEdit';
import ApprovedBonusPoint from './components/ApprovedBonusPoint';
import Login from './components/Login';
import TransBlock from './components/TransBlock';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: ""
    }
  }

  render() {
    console.log(this.props)
    return (
      <>
        <Header />
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path="/" element={ <Home/> }/>
          <Route path='/block' element={<TransBlock/>}/>
          <Route path="/user" element={<ListMapUser/>}/>
          {/* <Route path='/adduser' element={<CreateUser/>} /> */}
          <Route path='/transorder' element={<TransOrder/>}/>
          <Route path='/approve' element={<ApproveList/>}/>
          <Route path='/addbonus' element={ <AddBonusPoint/>} />
          <Route path='/approveed' element={<ApprovedBonusPoint/>}/>
          <Route path='/product' element={<ProductItem/>}/>
          <Route path='/addproduct' element={<ProductCreate/>}/>
          <Route path='/editproduct/:id' element={<ProductEdit/>}/>
        </Routes>
        <Footer />
      </>
    );
  }
}

export default App;
