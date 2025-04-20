import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/navbar.css";
import { FaHeart, FaHome, FaMobile } from "react-icons/fa";
import { FaCartShopping, FaRightFromBracket, FaShop } from "react-icons/fa6";
import cloths from "../assets/elitewear.png";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { ProductContext } from "../context/ProductContext.jsx";

 const Header = () => {
  const { cart, favorites } = useContext(ProductContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  // token name image //
  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    const image = localStorage.getItem("image");
    if (token) {
      setLoggedIn(true);
      setName(name);
      setImage(image);
    }
  }, []);

  // Logout //
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      setLoggedIn(false);
      navigate("/");
    }
  };

  return (
    <Navbar expand="lg" className="nav">
        <Navbar.Brand href="/" className="brand">
          <div className="image">
            <img src={cloths} alt="CLOTHINGS"/>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <div className="head">
              <Nav.Link href="/"><FaHome /> Home</Nav.Link>
              <Nav.Link href="/shop"><FaShop /> Shop</Nav.Link>
              <Nav.Link href="/categories"><FaMobile /> Categories</Nav.Link>
            </div>
          </Nav>

          <Nav className="ms-auto">
            <div className="ico">
            <div className="left">
              <div className="center">
              <Link to="/favorites"><FaHeart /> <span>{favorites.length}</span></Link>
              <Link to="/addcart"><FaCartShopping /> <span>{cart.length}</span></Link>
              </div>

            <div className="sign">
            {loggedIn ? (
            <div className="profile-dropdown">
              <div className="profile-info" tabIndex={0}>
              <img src={image ? `http://localhost:5000${image}` : "/default-avatar.png"} alt="Profile" className="profile-img"/>
              <span>{name}</span>
              </div>
              <div className="dropdown-menu">
              <button className="logout-btn" onClick={handleLogout}>Logout <FaRightFromBracket/> </button>
              </div>
            </div>
            ) : (
              <Link to="/signin"><button className="signIn">Sign In</button></Link>
            )}
            </div>
            </div>
            </div>
         
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
