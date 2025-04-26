import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './components/Home.jsx';
import { Allproduct } from './components/Allproduct.jsx';
import { Addcart } from './components/Addcart.jsx';
import { Showdetails } from './components/Showdetails.jsx';
import Categories from './components/Categories.jsx';
import { Favorite } from './components/Favorite.jsx';
import { Footer } from './components/Footer.jsx';
import SignIn from './components/SignIn.jsx';
import Filter from './components/Filter.jsx';
import { Login } from './components/Login.jsx';
import Brand from './components/Brand.jsx';
import Header from './components/Navbar.jsx';
import { ProductProvider } from "./context/ProductContext.jsx";
import { Notfound } from './components/Notfound.jsx';

const App = () => {
  return (
    <ProductProvider>
      <Header />
        <Routes>
          <Route path="/" element={<Home /> } />
          <Route path="/product/arrives" element={<Allproduct /> } /> 
          <Route path="/product/:id" element={<Showdetails /> } />
          <Route path="/brand" element={<Brand /> } />
          <Route path="/addcart" element={<Addcart /> } />
          <Route path="/categories" element={<Categories /> } />
          <Route path="/favorites" element={<Favorite /> } />
          <Route path="/shop" element={<Filter /> } />
          <Route path="/signin" element={<SignIn /> } />
          <Route path="/login" element={<Login /> } />
          <Route path="*" element={<Notfound /> } />
        </Routes>
        <Footer />
    </ProductProvider>
  );
};

export default App;
