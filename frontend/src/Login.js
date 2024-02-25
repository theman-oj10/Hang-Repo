import React, { useState } from 'react';
import './Login.css';
import axios from 'axios'; // Make sure to install axios

const Login = () => {
    const [username, setUsername] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login', {
                username
            });
            if (response.data.success) {
                // Redirect to homepage if username exists
                window.location.href = '/home'; // Adjust the URL as needed
            } else {
                // Handle case where username does not exist
                alert(response.data.message);
            }
        } catch (error) {
            // Handle server error or network failure
            console.error('Login request failed:', error);
            alert('An error occurred while logging in.');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <br />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="/userquery">Register</a></p>
        </div>
    );
};

export default Login;
