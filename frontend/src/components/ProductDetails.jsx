// import React, { useContext } from "react"
// import { Link } from 'react-router-dom';
// import '../css/productDetails.css';
// import { FaHeart, FaStar } from 'react-icons/fa';
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import { ProductContext } from '../context/ProductContext.jsx';

// export const ProductDetails = ({ pro }) => {
//     const { setId, favorites, setFavorites, addToCart } = useContext(ProductContext); 
//     // console.log(`thee:${import.meta.env.VITE_BACKEND_URL}/${pro.front}`);
    
// const backendURL = "https://elite-wear.onrender.com";

// return (
//         <div className="product_items">
//         <p className='rating'><FaStar/> {pro.rating}</p>
//         {favorites.some((item) => item.id === pro.id) ? (
//         <button className="heart" onClick={() => setFavorites(favorites.filter((e) => e.id !== pro.id))}>
//         <FaHeart style={{ color: 'red' }} /></button>
//         ) : (
//         <button className="addfav" onClick={() => setFavorites([...favorites, pro])}>
//         <FavoriteBorderIcon />
//         </button>
//         )}
       
//         {/* <Link to="/product/:id" onClick={() => setId(pro._id)}>
//         <img src={`${import.meta.env.VITE_BACKEND_URL}/${pro.front}`} alt={pro.name}
//         onMouseOver={(e) => (e.currentTarget.src = `${import.meta.env.VITE_BACKEND_URL}/${pro.back}`)}
//         onMouseOut={(e) => (e.currentTarget.src = `${import.meta.env.VITE_BACKEND_URL}/${pro.front}`)}/>
//         </Link> */}

// <Link><img src={`${backendURL}${pro.front}`} alt={pro.name} /> </Link>
       

//             <ul>
//             <li><h3>{pro.name}</h3></li>
//             <li><h5>M.R.P : {pro.Oldprice}</h5></li>
//             <li><h4>Price: <span className='price'>₹{pro.price}.00</span></h4></li>
//             <li><button className="add" onClick={() => addToCart(pro)}>Add to Cart</button></li>
//         </ul>
//         </div>
//     );
// };




// // ///////////////
// // import React, { useContext } from "react";
// // import { Link } from 'react-router-dom';
// // import '../css/productDetails.css';
// // import { FaHeart, FaStar } from 'react-icons/fa';
// // import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// // import { ProductContext } from '../context/ProductContext.jsx';

// // export const ProductDetails = ({ pro }) => {
// //   const { setId, favorites, setFavorites, addToCart } = useContext(ProductContext);

// //   // image URL
// //   const formatImageUrl = (path) => {
// //     if (path.startsWith("http")) return path;
// //     return `${import.meta.env.VITE_BACKEND_URL}/${path}`;
// //   };
// //   const frontImage = formatImageUrl(pro.front);
// //   const backImage = formatImageUrl(pro.back);
  
// //   return (
// //     <div className="product_items">
// //       <p className='rating'><FaStar /> {pro.rating}</p>

// //       {favorites.some((item) => item.id === pro.id) ? (
// //         <button className="heart" onClick={() => setFavorites(favorites.filter((e) => e.id !== pro.id))}>
// //           <FaHeart style={{ color: 'red' }} />
// //         </button>
// //       ) : (
// //         <button className="addfav" onClick={() => setFavorites([...favorites, pro])}>
// //           <FavoriteBorderIcon />
// //         </button>
// //       )}

// //       <Link to={`/product/${pro._id}`} onClick={() => setId(pro._id)}>
// //         <img  src={frontImage} alt={pro.name}
// //         onMouseOver={(e) => (e.currentTarget.src = backImage)}
// //         onMouseOut={(e) => (e.currentTarget.src = frontImage)}
// //         />
// //       </Link>

// //       <ul>
// //         <li><h3>{pro.name}</h3></li>
// //         <li><h5>M.R.P : ₹{pro.Oldprice}</h5></li>
// //         <li><h4>Price: <span className='price'>₹{pro.price}.00</span></h4></li>
// //         <li><button className="add" onClick={() => addToCart(pro)}>Add to Cart</button></li>
// //       </ul>
// //     </div>
// //   );
// // };
/////////////////import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import '../css/productDetails.css';
import { FaHeart, FaStar } from 'react-icons/fa';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { ProductContext } from '../context/ProductContext.jsx';

export const ProductDetails = ({ pro }) => {
  const { setId, favorites, setFavorites, addToCart } = useContext(ProductContext);

  // Backend URL from environment OR fallback
  const backendURL = import.meta.env.VITE_BACKEND_URL || "https://elite-wear.onrender.com";

  // Proper Image URL formatting
  const formatImageUrl = (path) => {
    if (!path) return ""; // No path provided
    if (path.startsWith("http")) return path;
    if (path.startsWith("/")) return `${backendURL}${path}`;
    return `${backendURL}/${path}`; // missing slash protection
  };

  const frontImage = formatImageUrl(pro.front);
  const backImage = formatImageUrl(pro.back);

  return (
    <div className="product_items">
      <p className="rating">
        <FaStar /> {pro.rating}
      </p>

      {favorites.some(item => item.id === pro.id) ? (
        <button className="heart" onClick={() => setFavorites(favorites.filter(e => e.id !== pro.id))}>
          <FaHeart style={{ color: 'red' }} />
        </button>
      ) : (
        <button className="addfav" onClick={() => setFavorites([...favorites, pro])}>
          <FavoriteBorderIcon />
        </button>
      )}

      <Link to={`/product/${pro._id}`} onClick={() => setId(pro._id)}>
        <img
          src={frontImage}
          alt={pro.name}
          onMouseOver={(e) => (e.currentTarget.src = backImage)}
          onMouseOut={(e) => (e.currentTarget.src = frontImage)}
        />
      </Link>

      <ul>
        <li><h3>{pro.name}</h3></li>
        <li><h5>M.R.P: ₹{pro.Oldprice}</h5></li>
        <li><h4>Price: <span className="price">₹{pro.price}.00</span></h4></li>
        <li><button className="add" onClick={() => addToCart(pro)}>Add to Cart</button></li>
      </ul>
    </div>
  );
};
