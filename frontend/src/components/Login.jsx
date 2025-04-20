import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/signin.css'
import { ProductContext } from "../context/ProductContext.jsx";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setUserId } = useContext(ProductContext);
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError("All fields are required!");
            return;
        }

        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.userId);
            localStorage.setItem("name", res.data.name);
            localStorage.setItem("image", res.data.image);
            setUserId(res.data.userId);
            navigate("/");
            alert("Login Successfully")
          } catch {
            alert("Login failed");
          }
    };

    return (
        <div className="sign_form">
            <div className="form_details">
                <h2>Log In</h2>
                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                     <div className='input_form'>
                        <input type="email" value={email} placeholder="Enter email" autoComplete='off' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                     <div className='input_form'>
                        <input type="password" value={password} placeholder="Enter password" autoComplete='off' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="register_btn">Log In</button>
                </form>
            </div>
        </div>
    );
};
///////////////
