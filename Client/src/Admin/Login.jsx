    import React, { useState } from 'react';
    import axios from 'axios';
    const Login = () => {
    const [formData, setFormData] = useState({
        userid: '',
        password: '',
        district: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const res = await axios.post('http://localhost:5000/api/login', {
            userid: formData.userid,
            password: formData.password,
            district: formData.district
        });
        alert('Login Successful');
        console.log('Login response:', res.data);
        } catch (error) {
        console.error('Login failed:', error.response ? error.response.data : error.message);
        alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="login-container">
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="userid">User ID</label>
                <input
                type="text"
                id="userid"
                name="userid"
                value={formData.userid}
                onChange={handleChange}
                required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                />
            </div>
            <div className="form-group">
                <label htmlFor="district">District</label>
                <select id="district" name="district" value={formData.district} onChange={handleChange} required>
                <option value="">Select District</option>
                <option value="Thanjavur">Thanjavur</option>
                <option value="Trichy">Trichy</option>
                <option value="Chennai">Chennai</option>
                </select>
            </div>
            <button type="submit" className="login-button">
                Login
            </button>
            </form>
        </div>
        </div>
    );
    };

    export default Login;
