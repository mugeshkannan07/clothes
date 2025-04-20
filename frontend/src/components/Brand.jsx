import React from "react";
import { FaLeaf, FaRecycle, FaTshirt } from "react-icons/fa";
import "../css/brand.css";

const Brand = () => {
  return (
    <>
    <div className="brand-container">
      <div className="brand-content">
        <h1 className="brand-title">OUR BRAND</h1>
        <p className="brand-subtitle">Where fashion meets comfort.</p>
        <div className="brand-about">
          <h2>Who We Are</h2>
          <p>EliteWear is a premium clothing brand that blends modern style with sustainability.Our goal is to provide trendy, comfortable, and eco-friendly fashion for everyone.</p>
        </div>
        <div className="brand-features">
          <div className="feature">
            <FaLeaf className="feature-icon" />
            <h3>Eco-Friendly</h3>
            <p>We use organic & recycled materials.</p>
          </div>
          <div className="feature">
            <FaRecycle className="feature-icon" />
            <h3>Sustainable</h3>
            <p>Our production process reduces waste.</p>
          </div>
          <div className="feature">
            <FaTshirt className="feature-icon" />
            <h3>Trendy Designs</h3>
            <p>Modern styles with a comfortable fit.</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Brand;

