import React, { useContext, useEffect } from 'react';
import '../css/favorite.css';
import { FaHeart, FaStar } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { ProductContext } from '../context/ProductContext.jsx';

export const Favorite = () => {
 
  const { favorites, setFavorites } = useContext(ProductContext);
  const navigate = useNavigate();

     useEffect(() => {
      if (favorites.length === 0) {
          navigate(-1); 
      }
  }, [favorites, navigate]);


     function Removecart(productId) {
      setFavorites(favorites.filter((e) => e.id !== productId))
  }


  return (
    <>
    <h1>Your Wishlist</h1>
      <div className='fav'>
            {favorites.map((product) => (
              <div className='product_items' key={product.id}>
                <Link to='/product/id' onClick={()=>setId(product.id)}>
                  <img src={product.front} alt="#"
                    onMouseOver={(e) => (e.currentTarget.src = product.back)}
                    onMouseOut={(e) => (e.currentTarget.src = product.front)} />
              </Link>
              <ul>
                  <li><h4>{product.name}</h4></li>
                  <li><h4>Price: <span className='price'>₹{product.price}.00</span></h4></li>
                   <li><div className="fastar"><h4>Rating : <span className="star"><FaStar/></span>{product.rating}</h4></div></li>
                  <li><button className='remove' onClick={() => Removecart(product.id)}><FaHeart/></button></li>
              </ul>
              </div>
            ))}
      </div>
      </>
  )
}



