import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/signin.css";
import { ProductContext } from "../context/ProductContext.jsx";
import { FaUpload, FaUser } from 'react-icons/fa';

const SignIn = () => {
    const [form, setform] = useState({ name: "", email: "", password: "",   confirmPassword: "", terms: false, });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [image, setImage] = useState();
    const [preview, setPreview] = useState(null);
    
    const { setUserId } = useContext(ProductContext);

  // HandleChange //
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setform({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // validate //
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!/^[^]+@[^]+\.[a-z]{2,3}$/.test(form.email)) newErrors.email = "Enter a valid email";
    if (form.password.length < 4) newErrors.password = "Password must be at least 4 characters";
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!form.terms) newErrors.terms = "You must accept the terms and conditions";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

   // handle submit //
const handleSubmit = async (e) => {
  e.preventDefault();
  const formErrors = validate();
  if (Object.keys(formErrors).length > 0) return setErrors(formErrors);

  const data = new FormData();
  Object.entries(form).forEach(([key, value]) => data.append(key, value));
  if (image) data.append("image", image);

  try {
    const response = await axios.post("http://localhost:5000/api/auth/register", data);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("userId", response.data.userId);
    localStorage.setItem("name", response.data.name);
    localStorage.setItem("image", response.data.image);
    console.log("Saved image to localStorage:", response.data.image);

    setUserId(response.data.userId);
    navigate("/");
    alert("Registered Successfully")
  } catch (err) {
    alert("Registration failed");
  }
};
    
return (
  <div className="sign_form">
    <div className="form_details">
      <h2>Sign Up</h2>

        <form onSubmit={handleSubmit}>

      <input type="file" id='file' accept="image/*" onChange={(e) => {const file = e.target.files[0];
        if (file) { 
          setImage(file);
          setPreview(URL.createObjectURL(file)); 
        }}}/>
        
      <label htmlFor="file" className='upload'> <FaUpload/> Upload File</label>

      {preview && (
        <div className='preview'>
          <img src={preview} alt="Preview" />
        </div>
      )}

        <div className="input_form">
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder='Username'/> 
          {errors.name && <p>{errors.name}</p>}
        </div>

        <div className="input_form">
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder='Email'/>
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div className="input_form"> 
          <input type="password" name="password" value={form.password} onChange={handleChange} placeholder='password'/> 
          {errors.password && <p>{errors.password}</p>}
        </div>

        <div className="input_form">
          <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder='confirm password'/>
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>


          <div className="input_term">
            <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} />
            <label>I accept the terms and conditions</label>
          </div>

          {errors.terms && <p >{errors.terms}</p>}
          <button type="submit" className='register_btn'>Register</button>
        </form>
        <p className='acc'>Already have an account ?<Link to="/login" className='log_btn'>Login</Link></p>
      </div>
    </div>
);
}
export default SignIn;
// // // /////////////////////////////////


