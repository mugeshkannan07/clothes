import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import '../css/cart.css';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import RtlCartModal from './modaladd';
import { ProductContext } from '../context/ProductContext.jsx';
import notfound from '../assets/bags.jpg'
import Swal from 'sweetalert2';

// // Add cart //
export const Addcart = () => {
    const { cart, setCart } = useContext(ProductContext);
    const [total, setTotal] = useState(0);
    const [isModalOpen, setModalOpen] = useState(false); 
    const [discount, setDiscount] = useState(0);
    const navigate = useNavigate();

    // Total //
useEffect(() => {
  const subtotal = cart.reduce((previoustotal, current) => previoustotal + current.Price * current.Quantity, 0);
  setTotal(subtotal);
  // Discount //
  const discountAmount = subtotal * 0.05; 
  const finalAmount = subtotal - discountAmount;
  setDiscount(finalAmount);
  setModalOpen(true);
}, [cart]);

// //Remove cart //
  const removeFromCart = async (id) => {
    try {
        await axios.delete(`http://localhost:5000/api/cart/remove/${id}`);
        setCart((prev) => prev.filter((item) => item._id !== id));     
    } catch (error) {
        alert(error.message || "Error removing item");
    }
};

// CheckOut //
const handleCheckOut = async () => {
  Swal.fire({
    title: 'Order Placed!',
    text: 'Your checkout was successfully placed.',
    icon: 'success',
    confirmButtonText: 'OK',
  });
}
    return (
      <RtlCartModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
      {cart.length > 0 ? (
        <div className='cart-page'>
          <h1>Total Amount: ₹ {total}.00</h1>
          <table className='cart-table'>
            <thead>
              <tr>
                <th>No.</th>
                <th>Product</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Remove</th>
              </tr>
            </thead>
             <tbody>
              {cart.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td><img src={product.Image} alt='' /></td>
                  <td>{product.Name}</td>
                  <td>₹ {product.Price}.00</td>
                  <td>{product.Quantity}</td>
                  <td>
                    <button className='remove' onClick={() => removeFromCart(product._id)}>
                      <FaTrash /> 
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="check">
          <h4 className='subtotal'>Subtotal : ₹ {total}.00</h4>
          <h4>Discount (5%) : ₹ {discount} </h4>
          <h2>Total : ₹ {discount}.00</h2>
          <button onClick={handleCheckOut}>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      ) : ( 
        <div className="empty_cart">
          <img src={notfound} alt="Cart is empty" className="empty-cart-img" />
          <h1>Your cart is empty</h1>
          <h3>Add some cart!</h3>
        </div>
      )}
    </RtlCartModal>
    );
};