import { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const ProductContext = createContext();

export const ProductProvider = ({children}) => {
    const [id, setId] = useState(null);
    const [cart, setCart] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [clothes, setClothes] = useState([]);
    const [category, setCategory] = useState("mens");
    const [arrivesData, setArrivesData] = useState([]);
    const [UserId, setUserId] = useState(null);

     // UserId //
    useEffect(() => {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        setUserId(storedUserId);
      }
    }, []);

     // Fetch user's cart on load
  useEffect(() => {
    const fetchCart = async () => {
      if (!UserId) return;
      try {
        const response = await axios.get(`http://localhost:5000/api/cart/user/${UserId}`);
        setCart(response.data.cart);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, [UserId]);

 // Add to Cart
 const addToCart = async (product) => {
  if (!UserId) {
    alert("You must sign in to add items to the cart.");
    return;
  }
  const newCart = {
    userId: UserId,
    ProductId: product._id,
    Image: product.front,
    Name: product.name,
    Price: product.price,
    Quantity: 1,
  };
  try {
    const response = await axios.post("http://localhost:5000/api/cart/add", newCart);
    const updatedItem = response.data.cart;

    setCart((prevCart) => {
      const index = prevCart.findIndex((item) => item.ProductId === updatedItem.ProductId);
      if (index !== -1) {
        const newCart = [...prevCart];
        newCart[index] = updatedItem;
        return newCart;
      } else {
        return [...prevCart, updatedItem];
      }
    });

  } catch (error) {
    console.log(`Error adding to cart: ${error.response?.data?.message || error.message}`);
  }
};
   // fetch data //
   const fetchClothesCategory = async (category) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/clothes/category/${category}`);
      setArrivesData(response.data);
    } catch (error) {
      console.error(`Error fetching ${category} clothes:`, error);
    }
  };
// Fetch Data //
useEffect(() => {
  fetchClothesCategory(category);
}, [category]);

  return (
    <ProductContext.Provider
      value={{
        id,
        setId,
        cart,
        category,
        setCategory,
        setCart,
        favorites,
        setFavorites,
        clothes,
        setClothes,
        addToCart,
        arrivesData,
        setArrivesData,
        UserId,
        setUserId,
        fetchClothesCategory,
        }}>
      {children}
    </ProductContext.Provider>
  )
}


 

 
