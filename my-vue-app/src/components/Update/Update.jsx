import React, { useState } from 'react';
import axios from 'axios';
// import './Update.css';


function Update() {
  const [updateSuccess, setUpdateSuccess] = useState(false);    
  const [formData, setFormData] = useState({
    id: '', // Default user ID, update as needed
    username: '',
    age: '',
    email: '',
    password: ''
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const updateUser = () => {
    axios.put(`http://localhost:4446/api/update/${formData.id}`, formData)
      .then(response => {
        setUpdateSuccess(true);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
  };

  return (
    <div className='UpdateUser'>
       <label>
       <div className="text_area">
        User ID:
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
        />
        </div>
      </label>
      <label>
      <div className="text_area">
        Age:
        <input
          type="text"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        </div>
      </label>
      <label>
      <div className="text_area">
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        </div>
      </label>
      <label>
      <div className="text_area">
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        </div>
      </label>
      <button className='btn' onClick={updateUser}>Update User</button>
      {updateSuccess && <p>User updated successfully!</p>}
    </div>
  );
}

export default Update;

