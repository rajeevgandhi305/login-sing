import React, { useState } from 'react';
import axios from 'axios';

function User() {
const [id, setId] = useState('');
const [userDetails, setUserDetails] = useState(null);
const [error, setError] = useState(null);

const getUserById = () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
    setError('Authentication token not found');
    return;
    }
    const axiosInstance = axios.create({
    headers: {
        Authorization: `Bearer ${token}`
    }
    });
    axiosInstance.get(`http://localhost:4446/api/user/${id}`)
    .then(response => {
        setUserDetails(response.data);
        setError(null);
    })
    .catch(error => {
        setError('Error fetching user by ID');
        setUserDetails(null);
    });
};

return (
    <div>
    <h2>Get User by ID</h2>
    <label>
        Enter User ID:
        <input 
        type="text" 
        value={id} 
        onChange={(e) => setId(e.target.value)} 
        />
    </label>
    <button onClick={getUserById}>Get User</button>

    {error && <p>{error}</p>}
    
    {userDetails && (
  <div>
    <h2>User Details</h2>
    <p>ID: {userDetails.id}</p>
    <p>Name: {userDetails.name}</p>
    {userDetails.roles && Array.isArray(userDetails.roles) && (
      <p>Roles: {userDetails.roles.join(', ')}</p>
    )}
    <p>Email: {userDetails.email}</p>
    <p>Password: {userDetails.password}</p>
    <p>Age: {userDetails.age}</p>
    {/* Add more user details here */}
  </div>
)}
    </div>
);
}

export default User;
