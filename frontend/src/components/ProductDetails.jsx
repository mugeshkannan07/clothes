import React, { useContext } from "react"
import { Link } from 'react-router-dom';
import '../css/productDetails.css';
import { FaHeart, FaStar } from 'react-icons/fa';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { ProductContext } from '../context/ProductContext.jsx';

export const ProductDetails = ({ pro }) => {
    const { setId, favorites, setFavorites, addToCart } = useContext(ProductContext); 

return (
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
    );
};




