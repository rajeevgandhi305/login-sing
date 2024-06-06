import React, { useState } from 'react';
import axios from 'axios';
import './Delete.css';

function Delete() {
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const deleteUser = (id) => {
    axios.delete(`http://localhost:4446/api/delete/${id}`)
      .then(response => {
        setDeleteSuccess(true);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error deleting user:', error);
        setDeleteSuccess(false); // Reset delete success state
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const id = event.target.userIdInput.value;
    deleteUser(id);
  };

  return (
    <div className='Delete'>
      <form onSubmit={handleSubmit}>
        <input type="text" name="userIdInput" placeholder="Enter User ID" />
        <button className='btn' type="submit">Delete User</button>
      </form>
      {deleteSuccess && <p>User deleted successfully!</p>}
    </div>
  );
}

export default Delete;
