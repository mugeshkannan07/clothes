import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/filter.css";
import { FaHeart, FaSearch, FaStar } from "react-icons/fa";
import { Col, Container, Row } from "react-bootstrap";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { ProductContext } from "../context/ProductContext.jsx";
import notfound from '../assets/not_found.jpeg'

const Filter = () => {
  const { setId, favorites, setFavorites, arrivesData, setArrivesData, addToCart} = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("mens");
  const [sortOrder, setSortOrder] = useState("");

  const fetchClothesCategory = async (category) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/clothes/category/${category}`);
      setArrivesData(response.data);
    } catch (error) {
      console.error(`Error fetching ${category} clothes:`, error);
    }
  };

  useEffect(() => {
    fetchClothesCategory(category);
  }, [category]);

  const product = arrivesData
    .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === "high") return b.price - a.price;
      if (sortOrder === "low") return a.price - b.price;
      if (sortOrder === "rated") return b.rating - a.rating;
      return 0;
    });
  return (
    <div className="filter">
      <div className="search">
        <div className="icon">
          <FaSearch />
          <input placeholder="Shop Here..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="selected">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="mens">Men</option>
            <option value="womens">Women</option>
            <option value="kids">Kids</option>
          </select>
          <button onClick={() => setSortOrder("high")}>High To Low</button>
          <button onClick={() => setSortOrder("low")}>Low To High</button>
          <button onClick={() => setSortOrder("rated")}>4+ Rated</button>
        </div>
      </div>

        <Container>
        <Row>
          {product.length > 0 ? (
          product.map((pro) => (
         <Col lg={3} md={6} sm={6} xs={6} key={pro._id}>
         <div className="product_items">
         <p className='rating'><FaStar/> {pro.rating}</p>
         {favorites.some((item) => item.id === pro.id) ? (
          <button className="heart" onClick={() => setFavorites(favorites.filter((e) => e.id !== pro.id))}>
            <FaHeart style={{ color: 'red' }} />
          </button>
         ) : (
          <button className="addfav" onClick={() => setFavorites([...favorites, pro])}>
            <FavoriteBorderIcon />
          </button>
         )}

       <Link to="/product/:id" onClick={() => setId(pro._id)}>
          <img src={pro.front} alt={pro.name}
            onMouseOver={(e) => (e.currentTarget.src = pro.back)}
            onMouseOut={(e) => (e.currentTarget.src = pro.front)} />
        </Link>

        <ul>
          <li><h3>{pro.name}</h3></li>
          <li><h5>M.R.P : {pro.Oldprice}</h5></li>
          <li><h4>Price: <span className='price'>₹{pro.price}.00</span></h4></li>
          <li><button className="add" onClick={() => addToCart(pro)}>Add to Cart</button></li>
        </ul>
      </div>
    </Col>
  ))
) : (
  <div className="empty_cart">
           <img src={notfound} alt="Cart is empty" className="empty-cart-img" />
           <p>Oops! No products match your search or filter.</p>

         </div>
)}
          </Row>
        </Container>
   </div>
  );
};

export default Filter;
