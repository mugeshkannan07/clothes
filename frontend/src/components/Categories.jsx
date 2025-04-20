import React, { useContext, useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import '../css/categories.css'
import { FaHeart, FaStar } from "react-icons/fa";
import { Col, Container, Row } from "react-bootstrap";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { ProductContext } from "../context/ProductContext.jsx";
import axios from "axios";

const Categories = () => {
      const { setId, favorites, setFavorites, category, setCategory, addToCart, arrivesData, setArrivesData, fetchClothesCategory } = useContext(ProductContext);

  return (
    <div className="categories">
      <div className="allbtn">
    <div className="btn">
      <button onClick={() => setCategory("mens")}>Men</button>
      <button onClick={() => setCategory("womens")}>Women</button>
      <button onClick={() => setCategory("kids")}>Kids</button>
    </div>
      </div>

      <Container>
    <Row>
      {arrivesData.map((pro) => (
        <Col lg={3} md={6} sm={6} xs={6} key={pro._id}>
        <div className="product_items">
        <p className='rating'><FaStar/> {pro.rating}</p>
        {favorites.some((item) => item.id === pro.id) ? (
        <button className="heart" onClick={() => setFavorites(favorites.filter((e) => e.id !== pro.id))}>
        <FaHeart style={{ color: 'red' }} /></button>
        ) : (
        <button className="addfav" onClick={() => setFavorites([...favorites, pro])}>
        <FavoriteBorderIcon />
        </button>
        )}

        <Link to="/product/:id" onClick={() => setId(pro._id)}>
            <img src={pro.front} alt={pro.name}
            onMouseOver={(e) => (e.currentTarget.src = pro.back)}
            onMouseOut={(e) => (e.currentTarget.src = pro.front)}/>
        </Link>
         
        <ul>
            <li><h3>{pro.name}</h3></li>
            <li><h5>M.R.P : {pro.Oldprice}</h5></li>
            <li><h4>Price: <span className='price'>₹{pro.price}.00</span></h4></li>
            <li><button className="add" onClick={() => addToCart(pro)}>Add to Cart</button></li>
        </ul>
        </div>
        </Col>
      ))}
    </Row>
    </Container>
  </div>
  );
};

export default Categories;



