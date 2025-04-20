import { React, useContext, useEffect, useState } from 'react';
import '../css/showdetail.css';
import { FaTruck } from 'react-icons/fa';
import StarsIcon from '@mui/icons-material/Stars';
import { FaRotate } from 'react-icons/fa6';
import { ProductContext } from '../context/ProductContext.jsx';

export const Showdetails = () => {
  const { id, arrivesData, addToCart } = useContext(ProductContext);
  const [product, setProduct] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    const filtered = arrivesData.filter((product) => product._id === id);
    setProduct(filtered);
      if (filtered.length > 0) {
      setMainImage(filtered[0].front);
    }
  }, [arrivesData, id]);
  return (
    <div className='viewdetails'>
      {
        product.map((pro) => (
          <div className='all' key={pro._id}>
          <div className='imag'>
            <div className='selectImage'>
              <img src={pro.front} alt={pro.name} onClick={() => setMainImage(pro.front)} />
              <img src={pro.back} alt={pro.name} onClick={() => setMainImage(pro.back)} />
            </div>
            <img className="mainImage" src={mainImage} alt={pro.name} />
          </div>

          <div className='detail'>
            <ul>
              <li><h2><span>{pro.name}</span></h2></li>
              <li><h3>M.R.P : {pro.Oldprice}</h3></li>
              <li><h2>₹{pro.price}.00</h2></li>

              <li><div className="fastar"><h4>Rating:{" "}<span className="stars">
                {Array.from({ length: 5 }, (_, index) => (<StarsIcon key={index}
                className={index < pro.rating ? "filled_star" : "empty_star"}/>
                ))}</span>({pro.rating})</h4></div></li>
                
              <li><div className="size">
                <h4>Size :</h4> {pro.size?.map((size, index) => ( <button key={index}
                className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                onClick={() => setSelectedSize(size)}>{size}</button>))}</div></li>

               <li><h4 className='stock'>Stock : {pro.stock}</h4></li>
               <li><p>{pro.description}</p></li>

              <li><h5 className='free'>
                <span><FaTruck className="feature-icon"/></span>
                <span className='delivery'>Free Delivery </span>
                <FaRotate className="feature-icon"/>
                <span className="return">3 Days Return Policy Available.</span></h5></li>
                <li><button className="add" onClick={() => addToCart(pro)}>Add to Cart</button></li>
            </ul>
          </div>
        </div>
        ))
      }
       
       </div>
  );
};

export default Showdetails;
